import { StrictMode, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { useGame } from './hooks/useGame.js';
import Board from './components/Board.js';
import Keyboard from './components/Keyboard.js';
import Header from './components/Header.js';
import Stats from './components/Stats.js';
import Leaderboard from './components/Leaderboard.js';
import HowToPlay from './components/HowToPlay.js';
import SubmitWord from './components/SubmitWord.js';

function App() {
  const game = useGame();
  const [showHelp, setShowHelp] = useState(false);
  const [showSubmitWord, setShowSubmitWord] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Auto-show stats when game ends
  const gameOver = game.gameState?.status === 'won' || game.gameState?.status === 'lost';
  const didAutoShowStats = useRef(false);

  useEffect(() => {
    if (gameOver && !didAutoShowStats.current) {
      didAutoShowStats.current = true;
      const timeout = setTimeout(() => setShowStats(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [gameOver]);

  if (game.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121213]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!game.gameState) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121213]">
        <div className="text-red-400 text-lg">Failed to load game</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen bg-[#121213] overflow-hidden">
      <Header
        category={game.gameState.category}
        onHelpClick={() => setShowHelp(true)}
        onSubmitWordClick={() => setShowSubmitWord(true)}
      />

      {game.error && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white text-black text-sm font-bold px-4 py-2 rounded z-40">
          {game.error}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center py-2">
        <Board
          guesses={game.gameState.guesses}
          evaluations={game.gameState.evaluations}
          currentGuess={game.currentGuess}
          revealingRow={game.revealingRow}
          shakeRow={game.shakeRow}
          popTile={game.popTile}
        />
      </div>

      <div className="pb-2 sm:pb-4 w-full flex justify-center">
        <Keyboard
          colors={game.keyboardColors}
          onKey={game.addLetter}
          onEnter={game.submitGuess}
          onBackspace={game.removeLetter}
        />
      </div>

      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}

      {showSubmitWord && <SubmitWord onClose={() => setShowSubmitWord(false)} />}

      {showStats && game.gameState.status !== 'playing' && (
        <Stats
          evaluations={game.gameState.evaluations}
          dayNumber={game.gameState.dayNumber}
          won={game.gameState.status === 'won'}
          guessCount={game.gameState.guesses.length}
          answer={game.gameState.answer ?? ''}
          onClose={() => setShowStats(false)}
          onShowLeaderboard={() => {
            setShowStats(false);
            setShowLeaderboard(true);
          }}
        />
      )}

      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}

      {gameOver && !showStats && !showLeaderboard && (
        <button
          onClick={() => setShowStats(true)}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-[#538d4e] text-white text-xs font-bold px-4 py-2 rounded touch-manipulation"
        >
          View Results
        </button>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
