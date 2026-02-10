import { redis } from '@devvit/web/server';
import type { StatsResponse, LeaderboardEntry, LeaderboardResponse } from '../../shared/api.js';

export async function recordResult(
  postId: string,
  userId: string,
  username: string,
  guessCount: number,
  won: boolean,
): Promise<void> {
  const totalKey = `post:${postId}:stats:totalPlayers`;
  const winsKey = `post:${postId}:stats:wins`;
  const distKey = `post:${postId}:stats:distribution`;

  await redis.incrBy(totalKey, 1);
  if (won) {
    await redis.incrBy(winsKey, 1);
    await redis.hIncrBy(distKey, String(guessCount), 1);
    await updateLeaderboard(postId, userId, username, guessCount);
  }
}

export async function getStats(postId: string): Promise<StatsResponse> {
  const totalKey = `post:${postId}:stats:totalPlayers`;
  const winsKey = `post:${postId}:stats:wins`;
  const distKey = `post:${postId}:stats:distribution`;

  const [totalStr, winsStr, distMap] = await Promise.all([
    redis.get(totalKey),
    redis.get(winsKey),
    redis.hGetAll(distKey),
  ]);

  const totalPlayers = parseInt(totalStr ?? '0', 10);
  const wins = parseInt(winsStr ?? '0', 10);
  const winRate = totalPlayers > 0 ? Math.round((wins / totalPlayers) * 100) : 0;

  const distribution = [0, 0, 0, 0, 0, 0];
  for (const [key, val] of Object.entries(distMap)) {
    const idx = parseInt(key, 10) - 1;
    if (idx >= 0 && idx < 6) {
      distribution[idx] = parseInt(val, 10);
    }
  }

  return { type: 'stats', distribution, totalPlayers, winRate };
}

async function updateLeaderboard(
  postId: string,
  userId: string,
  username: string,
  guessCount: number,
): Promise<void> {
  const lbKey = `post:${postId}:leaderboard`;
  const namesKey = `post:${postId}:leaderboard:names`;

  await redis.zAdd(lbKey, { member: userId, score: guessCount });
  await redis.hSet(namesKey, { [userId]: username });
}

export async function getLeaderboard(postId: string): Promise<LeaderboardResponse> {
  const lbKey = `post:${postId}:leaderboard`;
  const namesKey = `post:${postId}:leaderboard:names`;

  const members = await redis.zRange(lbKey, 0, 19, { by: 'rank' });

  const entries: LeaderboardEntry[] = [];
  for (let i = 0; i < members.length; i++) {
    const entry = members[i];
    if (entry === undefined) continue;
    const { member, score } = entry;
    const username = (await redis.hGet(namesKey, member)) ?? 'Unknown';
    entries.push({ rank: i + 1, username, guesses: score });
  }

  return { type: 'leaderboard', entries };
}
