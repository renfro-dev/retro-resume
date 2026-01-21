import { supabase } from './supabase';

export interface VideoMetadata {
  id: string;
  title: string;
  description?: string;
  channel: string;
  thumbnail: string;
  vibe: string;
}

export async function getVideoMetadata(videoId: string): Promise<VideoMetadata | null> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('id, title, description, channel, vibe, metadata')
      .eq('id', videoId)
      .single();

    if (error || !data) {
      console.log(`Video not found in DB: ${videoId}`);
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
    console.error('Error fetching video metadata:', err);
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

export function generateOgTags(video: VideoMetadata, baseUrl: string): string {
  const videoUrl = `${baseUrl}/vibetube/${video.id}`;
  const title = escapeHtml(video.title);
  const description = escapeHtml(video.description || `${video.vibe} video from ${video.channel} on VibeTube`);

  return `
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${video.thumbnail}">
    <meta property="og:url" content="${videoUrl}">
    <meta property="og:type" content="video.other">
    <meta property="og:site_name" content="Jus' Tryna Vibe">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${video.thumbnail}">
    <meta name="description" content="${description}">
    <title>${title} | VibeTube</title>`;
}

export function injectOgTags(html: string, ogTags: string): string {
  // Remove existing OG-related tags
  let modifiedHtml = html
    .replace(/<meta property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="description"[^>]*>/g, '')
    .replace(/<title>[^<]*<\/title>/g, '');

  // Inject new tags before </head>
  modifiedHtml = modifiedHtml.replace('</head>', `${ogTags}\n  </head>`);

  return modifiedHtml;
}
