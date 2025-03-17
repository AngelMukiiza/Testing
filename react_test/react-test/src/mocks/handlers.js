// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, title: 'Test Post 1', body: 'This is a test post.' },
                { id: 2, title: 'Test Post 2', body: 'This is another test post.' },
            ])
        );
    }),
];
