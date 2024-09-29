// src/mocks/handlers.js

import { rest } from 'msw';

export const handlers = [
  rest.get('/api/messages', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          original_text: 'Привет, как дела?',
          translated_text: 'Hello, how are you?',
        },
        {
          id: 2,
          original_text: 'Этот бот распространяет вредоносное ПО.',
          translated_text: 'This bot spreads malware.',
        },
        // Add more sample messages as needed
      ])
    );
  }),
];

