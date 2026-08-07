/**
 * Run this once to get a new Google refresh token:
 *   node scripts/get-refresh-token.mjs
 *
 * Then paste the new GOOGLE_REFRESH_TOKEN into .env and Vercel env vars.
 */

import { createServer } from 'http';
import { readFileSync } from 'fs';
import { google } from 'googleapis';

// Read credentials from .env manually
const env = readFileSync('.env', 'utf8');
const get = (key) => env.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();

const CLIENT_ID = get('GOOGLE_CLIENT_ID');
const CLIENT_SECRET = get('GOOGLE_CLIENT_SECRET');
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent', // forces refresh token to be returned
  scope: ['https://www.googleapis.com/auth/gmail.readonly'],
});

console.log('\n1. Open this URL in your browser:\n');
console.log(authUrl);
console.log('\n2. Authorize the app, then wait...\n');

// Spin up a temporary server to catch the callback
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:4000');
  const code = url.searchParams.get('code');

  if (!code) {
    res.end('No code found.');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.end('<h2>Success! Check your terminal for the new refresh token.</h2>');
    server.close();

    console.log('\n✅ New refresh token generated!\n');
    console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
    console.log('\nUpdate this in:');
    console.log('  1. .env file');
    console.log('  2. Vercel → Project Settings → Environment Variables');
  } catch (err) {
    res.end('Error: ' + err.message);
    console.error(err);
    server.close();
  }
});

server.listen(3000, () => {
  console.log('Waiting for OAuth callback on http://localhost:3000...');
});
