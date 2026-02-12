import { Hono } from 'hono';
import type { UiResponse } from '@devvit/web/shared';
import { createGamePost } from '../core/post.js';

const forms = new Hono();

forms.post('/category-submit', async (c) => {
  const body = await c.req.json();
  console.log('[category-submit] full body:', JSON.stringify(body));

  // Extract category - try multiple possible structures
  const raw = body?.values?.category ?? body?.category ?? body?.data?.category ?? body?.results?.category;
  const category = Array.isArray(raw) ? (raw[0] ?? 'general') : (raw ?? 'general');
  console.log('[category-submit] extracted category:', category);

  await createGamePost(category);
  const response: UiResponse = {
    showToast: `SubWordle created with ${category} category!`,
  };
  return c.json(response);
});

export default forms;
