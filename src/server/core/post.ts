import { context, redis, reddit } from '@devvit/web/server';
import { selectWord } from '../services/wordService.js';

export async function createGamePost(category: string): Promise<void> {
  const subredditName = context.subredditName ?? 'unknown';

  // Compute day number
  const dayCounterKey = `subreddit:${subredditName}:dayCounter`;
  const dayNumber = await redis.incrBy(dayCounterKey, 1);

  const post = await reddit.submitCustomPost({
    title: `Sub Word Quest #${dayNumber} — Daily Word Game`,
    subredditName,
    splash: { appDisplayName: 'Sub Word Quest' },
  });

  const postId = post.id;

  // Store word and metadata
  const word = selectWord(category);
  await redis.set(`post:${postId}:word`, word);
  await redis.set(`post:${postId}:category`, category);
  await redis.set(`post:${postId}:dayNumber`, String(dayNumber));
}
