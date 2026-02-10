import type { TileState } from '../../shared/api.js';

const TILE_EMOJIS: Record<TileState, string> = {
  correct: '🟩',
  present: '🟨',
  absent: '⬛',
};

export function generateEmojiGrid(
  evaluations: TileState[][],
  dayNumber: number,
  won: boolean,
): string {
  const guessCount = won ? evaluations.length : 'X';
  const header = `SubWordle #${dayNumber} ${guessCount}/6`;
  const grid = evaluations
    .map((row) => row.map((tile) => TILE_EMOJIS[tile]).join(''))
    .join('\n');
  return `${header}\n\n${grid}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
