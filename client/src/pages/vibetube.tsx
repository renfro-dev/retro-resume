import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { YouTubePlayer } from "@/components/vibetube/YouTubePlayer";
import { RefreshCw, Trash2, Lock, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { vibetubeApi } from "@/lib/vibetube-api";
import type { Video, NewsletterData } from "@/types/vibetube";
import { VIBES } from "@/types/vibetube";

export default function VibeTube() {
  const [data, setData] = useState<NewsletterData>({ videos: [], groups: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [activeVibe, setActiveVibe] = useState<string>('All');
  const [isUpdating, setIsUpdating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // URL routing for shareable links
  const [, params] = useRoute("/vibetube/:videoId");
  const [, setLocation] = useLocation();

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchNewsletters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await vibetubeApi.getNewsletters();
      setData(result);
      if (result.groups.length > 0 && activeGroup === 'All') {
        setActiveGroup(result.groups[0].name);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      setError(error instanceof Error ? error.message : 'Failed to load videos');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const { isAdmin: adminStatus } = await vibetubeApi.checkAuth();
      setIsAdmin(adminStatus);
    } catch (e) {
      console.error('Auth check failed:', e);
    }
  };

  useEffect(() => {
    fetchNewsletters();
    checkAuth();
  }, []);

  // Auto-open video from URL parameter
  useEffect(() => {
    if (params?.videoId && data.videos.length > 0) {
      const video = data.videos.find(v => v.id === params.videoId);
      if (video) {
        setSelectedVideo(video);
      }
    }
  }, [params?.videoId, data.videos]);

  const copyVideoLink = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/vibetube/${videoId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(videoId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setLocation(`/vibetube/${video.id}`);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
    setLocation('/vibetube');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await vibetubeApi.login(password);
      if (res.ok) {
        setIsAdmin(true);
        setShowLogin(false);
        setPassword('');
      } else {
        alert('Incorrect password');
      }
    } catch (e) {
      alert('Login failed');
    }
  };

  const handleRecategorize = async (videoId: string, newVibe: string) => {
    // Optimistic Update
    const updatedVideos = data.videos.map(v =>
      v.id === videoId ? { ...v, vibe: newVibe, reason: 'Manually Updated' } : v
    );
    setData(prev => ({ ...prev, videos: updatedVideos }));

    // API Call
    try {
      setIsUpdating(true);
      await vibetubeApi.recategorize(videoId, newVibe);
    } catch (error) {
      console.error('Failed to recategorize:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    // Optimistic Update
    const updatedVideos = data.videos.filter(v => v.id !== videoId);
    setData(prev => ({ ...prev, videos: updatedVideos }));

    // API Call
    try {
      await vibetubeApi.deleteVideo(videoId);
    } catch (error) {
      console.error('Delete failed', error);
      fetchNewsletters(); // Revert on failure
    }
  };

  const filteredVideos = data.videos.filter(video => {
    const matchesGroup = activeGroup === 'All' ? true : video.group === activeGroup.replace('Week of ', '');
    const matchesVibe = activeVibe === 'All' ? true : video.vibe === activeVibe;
    return matchesGroup && matchesVibe;
  });

  const handleVideoEnd = () => {
    if (!selectedVideo) return;
    const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo.id);

    if (currentIndex >= 0 && currentIndex < filteredVideos.length - 1) {
      const nextVideo = filteredVideos[currentIndex + 1];
      handleVideoSelect(nextVideo);
    } else {
      handleVideoClose();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-terminal pattern-grid">
        <div className="container mx-auto px-4 py-8 max-w-7xl relative pb-24">
          <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              {/* Mobile logo */}
              <pre className="md:hidden text-[var(--terminal-cyan)] text-xs terminal-glow mb-2">
{`
╔═══════════════════╗
║    VIBETUBE       ║
╚═══════════════════╝
`}
              </pre>
              {/* Desktop logo */}
              <pre className="hidden md:block text-[var(--terminal-cyan)] text-xs terminal-glow mb-2">
{`
██╗   ██╗██╗██████╗ ███████╗████████╗██╗   ██╗██████╗ ███████╗
██║   ██║██║██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝
██║   ██║██║██████╔╝█████╗     ██║   ██║   ██║██████╔╝█████╗
╚██╗ ██╔╝██║██╔══██╗██╔══╝     ██║   ██║   ██║██╔══██╗██╔══╝
 ╚████╔╝ ██║██████╔╝███████╗   ██║   ╚██████╔╝██████╔╝███████╗
  ╚═══╝  ╚═╝╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝
`}
              </pre>
              <p className="text-[var(--terminal-gray)] font-mono text-sm">
                weekly discovery videos for vibe coders and AI enthusiasts, designed for your side monitor
              </p>
            </div>

            <div className="flex items-center gap-4">
              {data.groups.length > 0 && (
                <div className="w-[200px]">
                  <Select value={activeGroup} onValueChange={setActiveGroup}>
                    <SelectTrigger className="border-[var(--terminal-dark-gray)] bg-[var(--terminal-bg)] text-[var(--terminal-green)]">
                      <SelectValue placeholder="Select Week" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--terminal-bg)] border-[var(--terminal-dark-gray)]">
                      <SelectItem value="All">All Weeks</SelectItem>
                      {data.groups.map(group => (
                        <SelectItem key={group.name} value={group.name}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                onClick={fetchNewsletters}
                disabled={isLoading}
                variant="outline"
                className="gap-2 border-[var(--terminal-dark-gray)] bg-[var(--terminal-bg)] text-[var(--terminal-green)] hover:bg-[var(--terminal-dark-gray)] hover:text-[var(--terminal-yellow)]"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Refresh
              </Button>
            </div>
          </header>

          {/* Vibe Filter Chips */}
          <div className="mb-8 space-y-4">
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-3 min-w-max">
                {VIBES.map(vibe => {
                  const Icon = vibe.icon;
                  const isActive = activeVibe === vibe.id;
                  return (
                    <button
                      key={vibe.id}
                      onClick={() => setActiveVibe(vibe.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium font-mono transition-all border",
                        isActive
                          ? "bg-[var(--terminal-yellow)] text-black border-[var(--terminal-yellow)] terminal-glow scale-105"
                          : "bg-[var(--terminal-bg)] text-[var(--terminal-green)] border-[var(--terminal-dark-gray)] hover:border-[var(--terminal-yellow)]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {vibe.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context Banner for Human in the Loop */}
            {activeVibe === 'Human in the Loop' && (() => {
              const HumanIcon = VIBES.find(v => v.id === 'Human in the Loop')!.icon;
              return (
                <div className="bg-[var(--terminal-yellow)]/10 border border-[var(--terminal-yellow)]/20 rounded-lg p-4 flex items-start gap-4 text-[var(--terminal-yellow)]">
                  <HumanIcon className="w-6 h-6 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1 font-mono">Human in the Loop Required</h3>
                    <p className="text-sm opacity-90 font-mono">
                      Claude didn't know how to categorize these videos. If videos exist in this section,
                      consider recategorizing them manually, <strong>for the culture.</strong>
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          <main>
            {error ? (
              <div className="text-center py-20 terminal-card rounded-xl border border-[var(--terminal-red)]">
                <div className="text-[var(--terminal-red)] font-mono">
                  Error: {error}
                </div>
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map(video => (
                  <Card
                    key={video.id}
                    className="cursor-pointer hover:shadow-xl hover:shadow-[var(--terminal-yellow)]/20 transition-all hover:-translate-y-1 group border-[var(--terminal-dark-gray)] bg-[var(--terminal-bg)]"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('.edit-trigger')) return;
                      if ((e.target as HTMLElement).closest('.delete-trigger')) return;
                      if ((e.target as HTMLElement).closest('.share-trigger')) return;
                      handleVideoSelect(video);
                    }}
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="aspect-video relative rounded-t-lg overflow-hidden isolate">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-[var(--terminal-green)] text-[10px] px-1.5 py-0.5 rounded font-mono">
                          {video.durationFormatted}
                        </div>

                        {/* EDITABLE VIBE BADGE */}
                        <div className="absolute top-2 left-2 z-20 edit-trigger" onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={video.vibe}
                            onValueChange={(val) => handleRecategorize(video.id, val)}
                          >
                            <SelectTrigger className="h-6 text-[10px] gap-1 px-2 pr-1 border-none bg-[var(--terminal-yellow)] text-black rounded-md shadow-sm hover:bg-[var(--terminal-bright-green)] focus:ring-0 focus:ring-offset-0 w-auto min-w-[80px] font-mono">
                              <span className="truncate max-w-[100px]">{video.vibe}</span>
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--terminal-bg)] border-[var(--terminal-dark-gray)]">
                              {VIBES.filter(v => v.id !== 'All').map(v => (
                                <SelectItem key={v.id} value={v.id} className="text-xs font-mono">
                                  {v.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* SHARE LINK BUTTON */}
                        <div
                          className={cn(
                            "absolute top-2 z-20 share-trigger",
                            isAdmin ? "right-10" : "right-2"
                          )}
                        >
                          <button
                            onClick={(e) => copyVideoLink(video.id, e)}
                            className="h-6 w-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm bg-black/60 hover:bg-black/80"
                            title="Copy shareable link"
                          >
                            {copiedId === video.id ? (
                              <Check className="w-3 h-3 text-[var(--terminal-green)]" />
                            ) : (
                              <Link2 className="w-3 h-3 text-[var(--terminal-cyan)]" />
                            )}
                          </button>
                        </div>

                        {/* ADMIN DELETE BUTTON */}
                        {isAdmin && (
                          <div
                            className="absolute top-2 right-2 z-20 delete-trigger"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-6 w-6 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm bg-[var(--terminal-red)]"
                              onClick={() => handleDelete(video.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <h3
                          className="font-semibold text-sm line-clamp-2 mb-2 leading-tight text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)] transition-colors font-mono"
                          title={video.title}
                        >
                          {video.title}
                        </h3>

                        <div className="mt-auto pt-3 border-t border-[var(--terminal-dark-gray)] flex justify-between items-center text-xs text-[var(--terminal-gray)]">
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="truncate max-w-[100px] font-medium text-[var(--terminal-green)] font-mono">
                              {video.channel}
                            </span>
                          </div>
                          <span className="shrink-0 opacity-70 font-mono">
                            {new Date(video.sharedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 terminal-card rounded-xl border border-dashed border-[var(--terminal-dark-gray)]">
                <div className="text-[var(--terminal-gray)] font-mono">
                  {isLoading ? 'Curating your feed...' : 'No videos found looking like that vibe.'}
                </div>
              </div>
            )}
          </main>

          {/* Stats Footer + Admin Login */}
          <footer className="mt-16 text-center text-xs text-[var(--terminal-gray)] border-t border-[var(--terminal-dark-gray)] pt-8">
            {data.metadata && (
              <p className="mb-4 font-mono">
                Scanned {data.metadata.emailsProcessed} emails • Found {data.metadata.uniqueVideos} videos
              </p>
            )}

            <div className="flex justify-center items-center gap-2">
              {isAdmin ? (
                <span className="inline-flex items-center gap-2 text-[var(--terminal-yellow)] font-medium cursor-pointer font-mono terminal-glow" onClick={() => setIsAdmin(false)}>
                  <Lock className="w-3 h-3" /> Admin Active
                </span>
              ) : (
                <>
                  {!showLogin ? (
                    <button onClick={() => setShowLogin(true)} className="opacity-50 hover:opacity-100 transition-opacity text-[var(--terminal-green)]">
                      <Lock className="w-3 h-3" />
                    </button>
                  ) : (
                    <form onSubmit={handleLogin} className="flex items-center gap-2">
                      <Input
                        type="password"
                        placeholder="Admin Password"
                        className="h-6 w-32 text-xs bg-[var(--terminal-bg)] border-[var(--terminal-dark-gray)] text-[var(--terminal-green)] font-mono"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button type="submit" size="sm" variant="ghost" className="h-6 w-6 p-0 text-[var(--terminal-green)]">
                        →
                      </Button>
                    </form>
                  )}
                </>
              )}
            </div>
          </footer>

          {selectedVideo && (
            <YouTubePlayer
              videoId={selectedVideo.id}
              isOpen={!!selectedVideo}
              onClose={handleVideoClose}
              title={selectedVideo.title}
              onEnded={handleVideoEnd}
              onShare={() => {
                const url = `${window.location.origin}/vibetube/${selectedVideo.id}`;
                navigator.clipboard.writeText(url);
                setCopiedId(selectedVideo.id);
                setTimeout(() => setCopiedId(null), 2000);
              }}
              isLinkCopied={copiedId === selectedVideo.id}
            />
          )}
        </div>
      </div>
    </>
  );
}
