import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getNewsletters } from '../../server/routes/newsletters';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.split('?')[0] || '';

  // Route to appropriate handler
  if (path === '/api/newsletters' || path === '/api/newsletters/') {
    return getNewsletters(req as any, res as any);
  }

  // Handle /api/assets/* for images
  if (path.startsWith('/api/assets/')) {
    const filename = decodeURIComponent(path.replace('/api/assets/', ''));
    // For now, redirect to a placeholder or return 404
    // Assets should be served from attached_assets in production
    return res.status(404).json({ error: 'Asset serving not available in serverless mode' });
  }

  return res.status(404).json({ error: 'Not found' });
}
