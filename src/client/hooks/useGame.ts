import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, TileState, InitResponse, GuessResponse } from '../../shared/api.js';
import { WORD_LENGTH } from '../../shared/api.js';
import { useAnimations } from './useAnimations.js';

type KeyColor = 'correct' | 'present' | 'absent' | undefined;

export function useGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentGuess, setCurrentGuess] = useState('');
  const [username, setUsername] = useState('');
  const [postId, setPostId] = useState('');
  const [keyboardColors, setKeyboardColors] = useState<Record<string, KeyColor>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const animations = useAnimations();
  const errorTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showError = useCallback((msg: string) => {
    if (errorTimeout.current) clearTimeout(errorTimeout.current);
    setError(msg);
    errorTimeout.current = setTimeout(() => setError(''), 2000);
  }, []);

  // Update keyboard colors from evaluations
  const updateKeyboardColors = useCallback(
    (guesses: string[], evaluations: TileState[][]) => {
      const colors: Record<string, KeyColor> = {};
      for (let i = 0; i < guesses.length; i++) {
        const word = guesses[i];
        const eval_ = evaluations[i];
        if (word === undefined || eval_ === undefined) continue;
        for (let j = 0; j < word.length; j++) {
          const letter = word[j];
          const state = eval_[j];
          if (letter === undefined || state === undefined) continue;
          const current = colors[letter];
          // Priority: correct > present > absent
          if (state === 'correct') {
            colors[letter] = 'correct';
          } else if (state === 'present' && current !== 'correct') {
            colors[letter] = 'present';
          } else if (!current) {
            colors[letter] = 'absent';
          }
        }
      }
      setKeyboardColors(colors);
    },
    [],
  );

  // Init game
  useEffect(() => {
    fetch('/api/init')
      .then((r) => r.json())
      .then((data: InitResponse) => {
        setGameState(data.gameState);
        setUsername(data.username);
        setPostId(data.postId);
        updateKeyboardColors(data.gameState.guesses, data.gameState.evaluations);
        setLoading(false);
      })
      .catch(() => {
        showError('Failed to load game');
        setLoading(false);
      });
  }, [updateKeyboardColors, showError]);

  const addLetter = useCallback(
    (letter: string) => {
      if (!gameState || gameState.status !== 'playing') return;
      setCurrentGuess((prev) => {
        if (prev.length >= WORD_LENGTH) return prev;
        const next = prev + letter.toLowerCase();
        animations.triggerPop(gameState.guesses.length, next.length - 1);
        return next;
      });
    },
    [gameState, animations],
  );

  const removeLetter = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  const submitGuess = useCallback(async () => {
    if (!gameState || gameState.status !== 'playing') return;
    if (currentGuess.length !== WORD_LENGTH) {
      showError('Not enough letters');
      animations.triggerShake(gameState.guesses.length);
      return;
    }

    try {
      const res = await fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = (await res.json()) as GuessResponse;
      if (data.error) {
        showError(data.error);
        animations.triggerShake(gameState.guesses.length);
        return;
      }

      setGameState(data.gameState);
      setCurrentGuess('');
      animations.triggerReveal(data.gameState.guesses.length - 1);
      // Defer keyboard color update until after flip animation finishes
      setTimeout(() => {
        updateKeyboardColors(data.gameState.guesses, data.gameState.evaluations);
      }, 1500);
    } catch {
      showError('Failed to submit guess');
    }
  }, [gameState, currentGuess, showError, animations, updateKeyboardColors]);

  const giveUp = useCallback(async () => {
    if (!gameState || gameState.status !== 'playing') return;
    try {
      const res = await fetch('/api/give-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.gameState) {
        setGameState(data.gameState);
        setCurrentGuess('');
      }
    } catch {
      showError('Failed to give up');
    }
  }, [gameState, showError]);

  // Physical keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        void submitGuess();
      } else if (e.key === 'Backspace') {
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [submitGuess, removeLetter, addLetter]);

  return {
    gameState,
    currentGuess,
    username,
    postId,
    keyboardColors,
    error,
    loading,
    addLetter,
    removeLetter,
    submitGuess,
    giveUp,
    ...animations,
  };
}
