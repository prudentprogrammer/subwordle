import { redis, context } from '@devvit/web/server';
import { getAnswerWords, isValidWord } from '../../shared/words.js';

export async function getDailyWord(postId: string, category: string): Promise<string> {
  const key = `post:${postId}:word`;
  const existing = await redis.get(key);
  if (existing) return existing;

  const word = await selectWord(category);
  await redis.set(key, word);
  return word;
}

/**
 * Select a word for a new game. Checks the community word bank first,
 * then falls back to the built-in word list for the given category.
 */
export async function selectWord(category: string): Promise<string> {
  // Try community word bank first
  const communityWord = await popCommunityWord(category);
  if (communityWord) return communityWord;

  // Fall back to built-in word list
  const words = getAnswerWords(category);
  const index = Math.floor(Math.random() * words.length);
  const word = words[index];
  if (word === undefined) {
    return 'hello';
  }
  return word;
}

/**
 * Pop the next approved community word for the given category.
 * Returns undefined if no community words are available.
 */
async function popCommunityWord(category: string): Promise<string | undefined> {
  const subredditName = context.subredditName ?? 'unknown';
  const bankKey = `subreddit:${subredditName}:wordbank:${category}`;

  // Get all words in the bank for this category
  const entries = await redis.hGetAll(bankKey);
  if (!entries) return undefined;

  const words = Object.keys(entries);
  if (words.length === 0) return undefined;

  // Pick a random word and remove it from the bank so it's not reused
  const index = Math.floor(Math.random() * words.length);
  const word = words[index];
  if (word === undefined) return undefined;

  await redis.hDel(bankKey, [word]);
  return word;
}

/**
 * Add a word to the community word bank (mod-approved).
 */
export async function addToWordBank(
  subredditName: string,
  word: string,
  category: string,
  submittedBy: string,
): Promise<void> {
  const bankKey = `subreddit:${subredditName}:wordbank:${category}`;
  await redis.hSet(bankKey, {
    [word]: JSON.stringify({ submittedBy, addedAt: Date.now() }),
  });
}

export function isValidGuess(word: string): boolean {
  return word.length === 5 && isValidWord(word);
}
