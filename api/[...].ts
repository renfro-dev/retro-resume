import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app, ensureInitialized } from '../server/index';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Wait for routes to be registered before handling request
  await ensureInitialized();
  return app(req as any, res as any);
};
