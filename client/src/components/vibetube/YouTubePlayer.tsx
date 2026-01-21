import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import YouTube, { YouTubeProps } from 'react-youtube';
import { Link2, Check } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onEnded?: () => void;
  onShare?: () => void;
  isLinkCopied?: boolean;
}

export function YouTubePlayer({ videoId, isOpen, onClose, title, onEnded, onShare, isLinkCopied }: YouTubePlayerProps) {
  if (!videoId) return null;

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black/90 border border-[var(--terminal-dark-gray)]">
        <DialogHeader className="p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto flex flex-row items-start justify-between">
          <div className="pointer-events-none">
            <DialogTitle className="text-[var(--terminal-green)] terminal-glow">{title || 'YouTube Video'}</DialogTitle>
            <DialogDescription className="text-[var(--terminal-gray)]">
              Playing video
            </DialogDescription>
          </div>
          {onShare && (
            <button
              onClick={onShare}
              className="mr-8 p-2 rounded-md bg-black/60 hover:bg-black/80 transition-colors"
              title="Copy shareable link"
            >
              {isLinkCopied ? (
                <Check className="w-4 h-4 text-[var(--terminal-green)]" />
              ) : (
                <Link2 className="w-4 h-4 text-[var(--terminal-cyan)]" />
              )}
            </button>
          )}
        </DialogHeader>
        <div className="aspect-video w-full">
          <YouTube
            key={videoId}
            videoId={videoId}
            opts={opts}
            className="w-full h-full"
            iframeClassName="w-full h-full"
            onEnd={onEnded}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
