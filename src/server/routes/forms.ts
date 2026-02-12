import { Hono } from 'hono';
import type { UiResponse } from '@devvit/web/shared';
import { createGamePost } from '../core/post.js';

const forms = new Hono();

forms.post('/category-submit', async (c) => {
  const body = await c.req.json();
  const rawCategory = body?.values?.category;
  const category = Array.isArray(rawCategory) ? rawCategory[0] ?? 'general' : rawCategory ?? 'general';
  await createGamePost(category);
  const response: UiResponse = {
    showToast: `SubWordle created with ${category} category!`,
  };
  return c.json(response);
});

export default forms;
