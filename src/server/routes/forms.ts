import { Hono } from 'hono';
import { createGamePost } from '../core/post.js';

const forms = new Hono();

forms.post('/category-submit', async (c) => {
  const body = await c.req.json();
  const category = body?.values?.category ?? 'general';
  await createGamePost(category);
  return c.json({ type: 'toast', text: `SubWordle created with ${category} category!` });
});

export default forms;
