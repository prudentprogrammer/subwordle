import { redis } from '@devvit/web/server';
import { getAnswerWords, isValidWord } from '../../shared/words.js';

export async function getDailyWord(postId: string, category: string): Promise<string> {
  const key = `post:${postId}:word`;
  const existing = await redis.get(key);
  if (existing) return existing;

  const word = selectWord(category);
  await redis.set(key, word);
  return word;
}

export function selectWord(category: string): string {
  const words = getAnswerWords(category);
  const index = Math.floor(Math.random() * words.length);
  const word = words[index];
  if (word === undefined) {
    return 'hello';
  }
  return word;
}

export function isValidGuess(word: string): boolean {
  return word.length === 5 && isValidWord(word);
}
