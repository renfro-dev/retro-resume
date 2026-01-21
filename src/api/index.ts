import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getNewsletters } from '../../server/routes/newsletters';
import { createClient } from '@supabase/supabase-js';

// VibeTube OG Tags handling
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

interface VideoMetadata {
  id: string;
  title: string;
  description?: string;
  channel: string;
  thumbnail: string;
  vibe: string;
}

async function getVideoMetadata(videoId: string): Promise<VideoMetadata | null> {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    return null;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('videos')
      .select('id, title, description, channel, vibe, metadata')
      .eq('id', videoId)
      .single();

    if (error || !data) {
      console.log(`Video not found: ${videoId}`);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      channel: data.channel,
      thumbnail: data.metadata?.thumbnails?.high?.url ||
                 data.metadata?.thumbnails?.medium?.url ||
                 `https://i.ytimg.com/vi/${data.id}/hqdefault.jpg`,
      vibe: data.vibe
    };
  } catch (err) {
    console.error('Error fetching video:', err);
    return null;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateOgTags(video: VideoMetadata): string {
  const videoUrl = `https://renfro.dev/vibetube/${video.id}`;
  const title = escapeHtml(video.title);
  const description = escapeHtml(video.description || `${video.vibe} video from ${video.channel} on VibeTube`);

  return `
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${video.thumbnail}">
    <meta property="og:url" content="${videoUrl}">
    <meta property="og:type" content="video.other">
    <meta property="og:site_name" content="Renfro.dev">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${video.thumbnail}">
    <meta name="description" content="${description}">
    <title>${title} | VibeTube</title>`;
}

// Minimal HTML for social crawlers - only bots hit this endpoint (via conditional rewrite)
function generateBotHtml(ogTags: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${ogTags}
  </head>
  <body>
    <p>VibeTube - AI-curated video feed</p>
  </body>
</html>`;
}

const defaultOgTags = `
    <title>VibeTube | Renfro.dev</title>
    <meta name="description" content="AI-curated video feed from tech newsletters on Renfro.dev">
    <meta property="og:title" content="VibeTube | Renfro.dev">
    <meta property="og:description" content="AI-curated video feed from tech newsletters">
    <meta property="og:image" content="https://renfro.dev/og-vibetube.png">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://renfro.dev/vibetube">
    <meta name="twitter:card" content="summary_large_image">`;

async function handleVibetubeVideo(videoId: string, res: VercelResponse) {
  const video = await getVideoMetadata(videoId);

  const ogTags = video ? generateOgTags(video) : defaultOgTags;
  const html = generateBotHtml(ogTags);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.status(200).send(html);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.split('?')[0] || '';

  // Route to appropriate handler
  if (path === '/api/newsletters' || path === '/api/newsletters/') {
    return getNewsletters(req as any, res as any);
  }

  // Handle VibeTube video pages for OG tags (e.g., /api/vibetube/VIDEO_ID)
  const vibetubeMatch = path.match(/^\/api\/vibetube\/([a-zA-Z0-9_-]+)$/);
  if (vibetubeMatch) {
    const videoId = vibetubeMatch[1];
    return handleVibetubeVideo(videoId, res);
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
