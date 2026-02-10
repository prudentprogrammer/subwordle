import { Hono } from 'hono';
import type { UiResponse } from '@devvit/web/shared';
import { createGamePost } from '../core/post.js';

const menu = new Hono();

menu.post('/post-create', async (c) => {
  const response: UiResponse = {
    showForm: {
      name: 'categoryForm',
      form: {
        title: 'Create SubWordle Game',
        fields: [
          {
            type: 'select',
            name: 'category',
            label: 'Category',
            options: [
              { label: 'General', value: 'general' },
              { label: 'Food & Cooking', value: 'food' },
              { label: 'Technology', value: 'tech' },
              { label: 'Sports', value: 'sports' },
              { label: 'Science', value: 'science' },
              { label: 'Movies & TV', value: 'movies' },
              { label: 'Music', value: 'music' },
            ],
          },
        ],
      },
    },
  };
  return c.json(response);
});

export { menu, createGamePost };
export default menu;
