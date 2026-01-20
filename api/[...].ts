import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server/index';

export default async (req: VercelRequest, res: VercelResponse) => {
  return new Promise((resolve) => {
    app(req, res as any, () => {
      res.status(404).json({ error: 'Not found' });
      resolve(undefined);
    });
  });
};
