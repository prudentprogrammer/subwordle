import { Hono } from 'hono';
import { context } from '@devvit/web/server';
import { createGamePost } from '../core/post.js';

export const triggers = new Hono();

triggers.post('/on-app-install', async (c) => {
  const subredditName = context.subredditName;

  // OnAppInstall can run without a subreddit context in playtest installs.
  // Skip auto-post creation in that case so the trigger always succeeds.
  if (!subredditName) {
    return c.json({ success: true, skipped: true });
  }

  try {
    await createGamePost('general');
  } catch (e) {
    console.error(`Failed to create initial post on install: ${e}`);
    // Don't fail the install - mods can create posts manually via menu.
  }

  return c.json({ success: true });
});
