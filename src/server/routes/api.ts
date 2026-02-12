import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import type {
  GameState,
  GuessRequest,
  GuessResponse,
  InitResponse,
  SubmitWordRequest,
  SubmitWordResponse,
} from '../../shared/api.js';
import { evaluateGuess, isGameOver, isWin } from '../../shared/gameLogic.js';
import { getDailyWord, isValidGuess, addToWordBank } from '../services/wordService.js';
import { recordResult, getStats, getLeaderboard } from '../services/statsService.js';

const api = new Hono();

api.get('/init', async (c) => {
  const postId = context.postId!;
  const userId = context.userId!;
  const username = (await reddit.getCurrentUsername()) ?? 'anonymous';

  const category = (await redis.get(`post:${postId}:category`)) ?? 'general';
  const dayNumber = parseInt((await redis.get(`post:${postId}:dayNumber`)) ?? '1', 10);

  // Ensure word exists
  await getDailyWord(postId, category);

  // Load or create game state
  const gameKey = `post:${postId}:user:${userId}:game`;
  const existing = await redis.get(gameKey);

  let gameState: GameState;
  if (existing) {
    gameState = JSON.parse(existing);
  } else {
    gameState = {
      guesses: [],
      evaluations: [],
      status: 'playing',
      dayNumber,
      category,
    };
    await redis.set(gameKey, JSON.stringify(gameState));
  }

  // Reveal answer if game is over
  if (gameState.status !== 'playing') {
    gameState.answer = await getDailyWord(postId, category);
  }

  const response: InitResponse = { type: 'init', postId, gameState, username };
  return c.json(response);
});

api.post('/guess', async (c) => {
  const postId = context.postId!;
  const userId = context.userId!;
  const username = (await reddit.getCurrentUsername()) ?? 'anonymous';

  const { guess } = (await c.req.json()) as GuessRequest;
  const normalizedGuess = guess.toLowerCase().trim();

  // Load game state
  const gameKey = `post:${postId}:user:${userId}:game`;
  const existing = await redis.get(gameKey);
  if (!existing) {
    return c.json({ type: 'error', error: 'Game not initialized' } as const, 400);
  }

  const gameState: GameState = JSON.parse(existing);

  if (gameState.status !== 'playing') {
    return c.json({ type: 'error', error: 'Game is already over' } as const, 400);
  }

  if (!isValidGuess(normalizedGuess)) {
    const response: GuessResponse = {
      type: 'guess',
      result: [],
      gameState,
      error: 'Not a valid word',
    };
    return c.json(response, 400);
  }

  const category = (await redis.get(`post:${postId}:category`)) ?? 'general';
  const answer = await getDailyWord(postId, category);
  const result = evaluateGuess(normalizedGuess, answer);

  gameState.guesses.push(normalizedGuess);
  gameState.evaluations.push(result);

  if (isWin(result)) {
    gameState.status = 'won';
    gameState.answer = answer;
    await recordResult(postId, userId, username, gameState.guesses.length, true);
  } else if (isGameOver(gameState.evaluations)) {
    gameState.status = 'lost';
    gameState.answer = answer;
    await recordResult(postId, userId, username, gameState.guesses.length, false);
  }

  await redis.set(gameKey, JSON.stringify(gameState));

  const response: GuessResponse = { type: 'guess', result, gameState };
  return c.json(response);
});

api.get('/stats', async (c) => {
  const postId = context.postId!;
  const stats = await getStats(postId);
  return c.json(stats);
});

api.get('/leaderboard', async (c) => {
  const postId = context.postId!;
  const lb = await getLeaderboard(postId);
  return c.json(lb);
});

api.post('/submit-word', async (c) => {
  const { word, category } = (await c.req.json()) as SubmitWordRequest;
  const normalized = word.toLowerCase().trim();
  const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
  const subredditName = context.subredditName ?? 'unknown';

  if (normalized.length !== 5) {
    const response: SubmitWordResponse = {
      type: 'submitWord',
      success: false,
      error: 'Word must be exactly 5 letters',
    };
    return c.json(response, 400);
  }

  if (!/^[a-z]+$/.test(normalized)) {
    const response: SubmitWordResponse = {
      type: 'submitWord',
      success: false,
      error: 'Word must contain only letters',
    };
    return c.json(response, 400);
  }

  // Add directly to the word bank for future games
  await addToWordBank(subredditName, normalized, category, username);

  // Also record the submission for tracking
  const submission = JSON.stringify({
    word: normalized,
    category,
    submittedBy: username,
    timestamp: Date.now(),
  });

  const submissionKey = `subreddit:${subredditName}:submissions`;
  const submissionId = `${normalized}:${Date.now()}`;
  await redis.hSet(submissionKey, { [submissionId]: submission });

  const response: SubmitWordResponse = { type: 'submitWord', success: true };
  return c.json(response);
});

export default api;
