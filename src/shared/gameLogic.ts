import { TileState, MAX_GUESSES, WORD_LENGTH } from './api.js';

/**
 * Evaluate a guess against the answer, returning tile states.
 * Handles duplicate letters correctly using Wordle's standard algorithm.
 */
export function evaluateGuess(guess: string, answer: string): TileState[] {
  const g = guess.toLowerCase();
  const a = answer.toLowerCase();
  const result: TileState[] = new Array(WORD_LENGTH).fill('absent');

  // Track which answer letters are still available for 'present' marking
  const answerLetterCounts: Record<string, number> = {};
  for (const ch of a) {
    answerLetterCounts[ch] = (answerLetterCounts[ch] ?? 0) + 1;
  }

  // First pass: mark correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = g[i];
    if (letter !== undefined && letter === a[i]) {
      result[i] = 'correct';
      const count = answerLetterCounts[letter];
      if (count !== undefined) {
        answerLetterCounts[letter] = count - 1;
      }
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    const letter = g[i];
    const count = letter !== undefined ? answerLetterCounts[letter] : undefined;
    if (letter !== undefined && count !== undefined && count > 0) {
      result[i] = 'present';
      answerLetterCounts[letter] = count - 1;
    }
  }

  return result;
}

export function isWin(evaluation: TileState[]): boolean {
  return evaluation.every((t) => t === 'correct');
}

export function isGameOver(evaluations: TileState[][]): boolean {
  if (evaluations.length === 0) return false;
  const lastEvaluation = evaluations[evaluations.length - 1];
  if (lastEvaluation !== undefined && isWin(lastEvaluation)) return true;
  return evaluations.length >= MAX_GUESSES;
}

export function isValidLength(word: string): boolean {
  return word.length === WORD_LENGTH;
}
