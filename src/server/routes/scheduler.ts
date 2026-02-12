import { Hono } from 'hono';
import { redis } from '@devvit/web/server';
import { createGamePost } from '../core/post.js';
import { CATEGORIES } from '../../shared/api.js';

export const scheduler = new Hono();

scheduler.post('/daily-game', async (c) => {
  try {
    // Pick a random category for the daily game
    const categoryIndex = Math.floor(Math.random() * CATEGORIES.length);
    const category = CATEGORIES[categoryIndex]?.id ?? 'general';

    await createGamePost(category);

    // Track the last auto-post time
    await redis.set('scheduler:lastDailyGame', String(Date.now()));

    return c.json({ success: true, category });
  } catch (e) {
    console.error(`Failed to create daily game post: ${e}`);
    return c.json({ success: false, error: String(e) }, 500);
  }
});
