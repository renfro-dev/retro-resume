const VIBETUBE_API_URL = import.meta.env.VITE_VIBETUBE_API_URL || 'http://localhost:3001';

export const vibetubeApi = {
  async getNewsletters() {
    const response = await fetch(`${VIBETUBE_API_URL}/api/newsletters`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch newsletters');
    return response.json();
  },

  async checkAuth() {
    const response = await fetch(`${VIBETUBE_API_URL}/api/auth/check`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Auth check failed');
    return response.json();
  },

  async login(password: string) {
    const response = await fetch(`${VIBETUBE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password })
    });
    return response;
  },

  async recategorize(videoId: string, newVibe: string) {
    const response = await fetch(`${VIBETUBE_API_URL}/api/recategorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ videoId, newVibe })
    });
    if (!response.ok) throw new Error('Failed to recategorize');
    return response.json();
  },

  async deleteVideo(videoId: string) {
    const response = await fetch(`${VIBETUBE_API_URL}/api/videos/delete?id=${videoId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete video');
    return response.json();
  }
};
