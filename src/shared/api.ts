export type TileState = 'correct' | 'present' | 'absent';

export type GameStatus = 'playing' | 'won' | 'lost';

export type GameState = {
  guesses: string[];
  evaluations: TileState[][];
  status: GameStatus;
  answer?: string; // only revealed when game over
  dayNumber: number;
  category: string;
};

export type InitResponse = {
  type: 'init';
  postId: string;
  gameState: GameState;
  username: string;
};

export type GuessRequest = {
  guess: string;
};

export type GuessResponse = {
  type: 'guess';
  result: TileState[];
  gameState: GameState;
  error?: string;
};

export type StatsResponse = {
  type: 'stats';
  distribution: number[];
  totalPlayers: number;
  winRate: number;
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  guesses: number;
};

export type LeaderboardResponse = {
  type: 'leaderboard';
  entries: LeaderboardEntry[];
};

export type SubmitWordRequest = {
  word: string;
  category: string;
};

export type SubmitWordResponse = {
  type: 'submitWord';
  success: boolean;
  error?: string;
};

export type ErrorResponse = {
  type: 'error';
  error: string;
};

export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

export const CATEGORIES = [
  { id: 'general', label: 'General', emoji: '📝' },
  { id: 'food', label: 'Food & Cooking', emoji: '🍳' },
  { id: 'tech', label: 'Technology', emoji: '💻' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'movies', label: 'Movies & TV', emoji: '🎬' },
  { id: 'music', label: 'Music', emoji: '🎵' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
