export interface Video {
  id: string;
  url: string;
  title: string;
  channel: string;
  durationSec: number;
  durationFormatted: string;
  thumbnail: string;
  group: string;
  sharedAt: string;
  vibe: string;
  reason?: string;
  tags?: string[];
  source?: string;
}

export interface Group {
  name: string;
  videoIds: string[];
  count: number;
}

export interface NewsletterData {
  videos: Video[];
  groups: Group[];
  metadata?: {
    emailsProcessed: number;
    uniqueVideos: number;
    lastUpdated: string;
    sources: string[];
    error?: string;
  };
}

import {
  Video as VideoIcon,
  Code2,
  Sparkles,
  Bot,
  Activity,
  UserCircle,
  Shuffle
} from 'lucide-react';

export const VIBES = [
  { id: 'All', label: 'All Vibes', icon: VideoIcon },
  { id: 'Vibe Coding', label: 'Vibe Coding', icon: Code2 },
  { id: 'Model Upgrades', label: 'Model Upgrades', icon: Sparkles },
  { id: 'Robots', label: 'Robots', icon: Bot },
  { id: 'Hype', label: 'Hype', icon: Activity },
  { id: 'Human in the Loop', label: 'Human in the Loop', icon: UserCircle },
  { id: 'Random', label: 'Random', icon: Shuffle },
] as const;
