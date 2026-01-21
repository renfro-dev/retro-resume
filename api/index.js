// server/lib/gmail.ts
import { google } from "googleapis";
var CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
var gmail = null;
function getGmailClient() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("Missing Gmail API credentials in environment variables. VibeTube features require GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN.");
  }
  if (!gmail) {
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      "http://localhost:3000/auth/callback"
    );
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    });
    gmail = google.gmail({ version: "v1", auth: oauth2Client });
  }
  return gmail;
}
var NEWSLETTER_SENDERS = [
  "theneuron.ai",
  "aibreakfast",
  "dan@tldrnewsletter.com",
  "tldrnewsletter.com",
  "therundown.ai",
  "neuron"
];
async function fetchNewsletterEmails(fromDate, toDate) {
  try {
    const gmail2 = getGmailClient();
    const afterDate = fromDate.toISOString().split("T")[0];
    const beforeDate = toDate.toISOString().split("T")[0];
    const query = `from:(${NEWSLETTER_SENDERS.join(" OR ")}) after:${afterDate} before:${beforeDate}`;
    console.log(`Fetching Gmail query: ${query}`);
    const response = await gmail2.users.messages.list({
      userId: "me",
      q: query,
      maxResults: 50
      // Reduced per-chunk limit to avoid overwhelming
    });
    if (!response.data.messages) {
      return [];
    }
    const emails = [];
    for (const message of response.data.messages) {
      if (!message.id) continue;
      const emailDetail = await gmail2.users.messages.get({
        userId: "me",
        id: message.id,
        format: "full"
      });
      const email = parseEmailMessage(emailDetail.data);
      if (email) {
        emails.push(email);
      }
    }
    return emails;
  } catch (error) {
    console.error("Error fetching newsletter emails:", error);
    throw error;
  }
}
function parseEmailMessage(message) {
  try {
    const headers = message.payload?.headers || [];
    const subject = headers.find((h) => h.name === "Subject")?.value || "";
    const from = headers.find((h) => h.name === "From")?.value || "";
    const date = new Date(parseInt(message.internalDate));
    const content = extractEmailContent(message.payload);
    const youtubeUrls = extractYouTubeUrls(content);
    return {
      id: message.id,
      sender: from,
      subject,
      date,
      content,
      youtubeUrls
    };
  } catch (error) {
    console.error("Error parsing email message:", error);
    return null;
  }
}
function extractEmailContent(payload) {
  let content = "";
  if (payload.body?.data) {
    content += Buffer.from(payload.body.data, "base64").toString();
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" || part.mimeType === "text/plain") {
        if (part.body?.data) {
          content += Buffer.from(part.body.data, "base64").toString();
        }
      }
      if (part.parts) {
        content += extractEmailContent(part);
      }
    }
  }
  return content;
}
function extractYouTubeUrls(text) {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
  const urls = [];
  let match;
  while ((match = youtubeRegex.exec(text)) !== null) {
    const videoId = match[1];
    const fullUrl = `https://www.youtube.com/watch?v=${videoId}`;
    if (!urls.includes(fullUrl)) {
      urls.push(fullUrl);
    }
  }
  return urls;
}

// server/lib/youtube.ts
import { YoutubeTranscript } from "youtube-transcript";
var YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.GOOGLE_API_KEY;
async function fetchVideoMetadata(videoIds) {
  if (!YOUTUBE_API_KEY || videoIds.length === 0) return [];
  const chunks = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    chunks.push(videoIds.slice(i, i + 50));
  }
  let allItems = [];
  for (const chunk of chunks) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${chunk.join(",")}&key=${YOUTUBE_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.items) {
        allItems = [...allItems, ...data.items];
      }
    } catch (error) {
      console.error("Error fetching YouTube metadata:", error);
    }
  }
  return allItems.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    publishedAt: item.snippet.publishedAt,
    durationSec: parseDuration(item.contentDetails.duration),
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
    viewCount: item.statistics?.viewCount || "0",
    likeCount: item.statistics?.likeCount || "0",
    commentCount: item.statistics?.commentCount || "0",
    tags: item.snippet.tags || [],
    categoryId: item.snippet.categoryId,
    defaultLanguage: item.snippet.defaultLanguage,
    liveBroadcastContent: item.snippet.liveBroadcastContent,
    thumbnails: item.snippet.thumbnails
  }));
}
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0") || 0;
  const minutes = parseInt(match[2] || "0") || 0;
  const seconds = parseInt(match[3] || "0") || 0;
  return hours * 3600 + minutes * 60 + seconds;
}
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}
async function fetchTranscript(videoId) {
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcriptItems.map((item) => item.text).join(" ");
    return fullText;
  } catch (error) {
    console.log(`No transcript found for ${videoId} (or error fetching):`, error);
    return null;
  }
}

// server/lib/classifier.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
var CODING_KEYWORDS = [
  "cursor",
  "bolt",
  "replit",
  "vscode",
  "coding",
  "engineer",
  "software",
  "devin",
  "stackblitz",
  "copilot",
  "programming",
  "ide",
  "git",
  "mcp",
  "context protocol",
  "server",
  "typescript",
  "python",
  "shadcn",
  "nextjs",
  "react",
  "api",
  "sdk",
  "database",
  "evals",
  "observability",
  "infra",
  "deployment",
  "testing",
  "debug"
];
var MODEL_KEYWORDS = [
  "gpt-4",
  "claude",
  "gemini",
  "llama",
  "deepseek",
  "mistral",
  "grok",
  "openai",
  "anthropic",
  "google",
  "meta",
  "benchmark",
  "sota",
  "multimodal",
  "reasoning",
  "flash",
  "pro",
  "ultra",
  "3.5",
  "o1",
  "v4",
  "llm"
];
var ROBOT_KEYWORDS = [
  "humanoid",
  "tesla bot",
  "optimus",
  "figure",
  "boston dynamics",
  "robot",
  "robotics",
  "servo",
  "actuator",
  "1x",
  "neo",
  "atlas",
  "unitree",
  "cyberdog",
  "spot",
  "digit",
  "agility"
];
var HYPE_KEYWORDS = [
  "agi",
  "singularity",
  "doom",
  "revolution",
  "trillion",
  "game over",
  "end of",
  "insane",
  "mind blowing",
  "scary",
  "dangerous",
  "warning",
  "urgent",
  "huge news",
  "breakthrough",
  "changed everything"
];
var SUSTAINABILITY_KEYWORDS = [
  "climate",
  "energy",
  "carbon",
  "power",
  "green",
  "nuclear",
  "fusion",
  "environment",
  "solar",
  "sustainable",
  "grid",
  "battery",
  "emissions"
];
var SECURITY_KEYWORDS = [
  "security",
  "hack",
  "exploit",
  "vulnerability",
  "injection",
  "jailbreak",
  "red team",
  "privacy",
  "safety",
  "cyber",
  "auth",
  "penetration",
  "attack"
];
var FAIL_KEYWORDS = [
  "hallucination",
  "wrong answer",
  "fail",
  "error",
  "confused",
  "nonsense",
  "glitch",
  "stupid ai",
  "broken",
  "mess up",
  "failure",
  "lying"
];
var MUSIC_EXCLUSIONS = [
  "official video",
  "lyrics",
  "music video",
  "ft.",
  "feat.",
  "concert",
  "live performance",
  "album",
  "song",
  "remix",
  "fall out boy",
  "vevo",
  "records",
  "mv",
  "soundtrack"
];
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function calculateScore(text, keywords) {
  let score = 0;
  keywords.forEach((word) => {
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    if (regex.test(text)) {
      score += 1;
    }
  });
  return score;
}
async function classifyVideoAgent(title, description = "", tags = [], transcript = null) {
  const text = `${title} ${description} ${tags.join(" ")}`.toLowerCase();
  for (const block of MUSIC_EXCLUSIONS) {
    if (text.includes(block)) {
      return {
        category: "Random",
        reason: `Blocked term: "${block}" detected.`
      };
    }
  }
  const apiKey = process.env.GOOGLE_API_KEY;
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const transcriptSnippet = transcript ? transcript.slice(0, 15e3) : "No transcript available.";
      const prompt = `
        You are a strict video curator for an AI Engineering Newsletter. 
        Analyze the following video metadata AND transcript to classify it into EXACTLY ONE category.
        Provide a short reason for your decision.

        Categories:
        1. "Vibe Coding": Software engineering, coding tools, IDEs (Cursor, Replit), MCP, Evals, CI/CD, Observability, Infra.
        2. "Model Upgrades": New LLM releases, benchmarks, GPT-4, Claude, Gemini, model architecture decisions.
        3. "Robots": Physical humanoid robots, hardware robotics, Tesla Optimus.
        4. "Hype": AGI predictions, doomerism, singularity talk, "changed everything" type sentiment.
        5. "Sustainability": Energy, Nuclear Fusion, Climate Tech, Power Grids, Green AI.
        6. "Security": AI Safety, Jailbreaks, Prompt Injection, Hacking, Cyber Security.
        7. "AI Fail": AI Hallucinations, logic errors, funny failures. STRICTLY EXCLUDE Physical/Robot failures.
        8. "Human in the Loop": Tech/AI related, but vague or doesn't fit clearly into above categories. (Use this for uncertainty).
        9. "Random": STRICTLY for Non-AI content. Music, Politics, Funny videos, Animals, General Tech news not specifically about AI engineering.

        Critical Rules:
        - If I don't know, or it's vague: Choose "Random".
        - "Dog saves child" -> Random. (NOT Model Upgrades).
        - "Interview with Sam Altman" -> Random (unless he announces a specific Model).
        - "Evals and Observability" -> Vibe Coding.
        - "MCP Demos" -> Vibe Coding.
        - "Fall Out Boy" -> Random.
        - "Robot falling down" -> Robots (NOT AI Fail).
        - "ChatGPT can't do math" -> AI Fail.
        - If unsure between Tech categories -> Human in the Loop.

        Output JSON format only:
        {
          "category": "Category Name",
          "reason": "Max 10 words explanation."
        }

        Video Title: ${title}
        Video Description: ${description.slice(0, 300)}...
        Tags: ${tags.join(", ")}
        Transcript Start: ${transcriptSnippet}...
      `;
      const result = await model.generateContent(prompt);
      const outputText = result.response.text().trim();
      const jsonStr = outputText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(jsonStr);
      const validCategories = ["Vibe Coding", "Model Upgrades", "Robots", "Hype", "Random", "Human in the Loop", "Sustainability", "Security", "AI Fail"];
      if (validCategories.includes(parsed.category)) {
        return {
          category: parsed.category,
          reason: parsed.reason || "AI Classification"
        };
      }
    } catch (error) {
      console.error("Gemini Classification failed, falling back to heuristic:", error);
    }
  }
  console.log(`[Classifier] Using Heuristic for: "${title.slice(0, 30)}..."`);
  const scores = {
    "Vibe Coding": calculateScore(text, CODING_KEYWORDS),
    "Model Upgrades": calculateScore(text, MODEL_KEYWORDS),
    "Robots": calculateScore(text, ROBOT_KEYWORDS),
    "Hype": calculateScore(text, HYPE_KEYWORDS),
    "Sustainability": calculateScore(text, SUSTAINABILITY_KEYWORDS),
    "Security": calculateScore(text, SECURITY_KEYWORDS),
    "AI Fail": calculateScore(text, FAIL_KEYWORDS)
  };
  let bestCategory = "Random";
  let maxScore = 0;
  Object.entries(scores).forEach(([cat, score]) => {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat;
    }
  });
  if (maxScore < 1) {
    return { category: "Random", reason: "No specific keywords matched." };
  }
  return {
    category: bestCategory,
    reason: `Matched keywords for ${bestCategory} (Score: ${maxScore})`
  };
}

// server/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
var supabaseUrl = process.env.VITE_SUPABASE_URL || "https://tpffsajfxoqbyzevvwnu.supabase.co";
var supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
var _supabase = null;
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase Environment Variables. VibeTube features require VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseKey);
  }
  return _supabase;
}
var supabase = new Proxy({}, {
  get(target, prop) {
    const client = getSupabaseClient();
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  }
});

// server/routes/newsletters.ts
function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([^&\s?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
function getWeekStartDate(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });
}
function transformDbVideosToUI(dbVideos) {
  return dbVideos.map((v) => {
    const weekStart = getWeekStartDate(new Date(v.shared_at));
    return {
      id: v.id,
      url: v.url,
      title: v.title,
      channel: v.channel,
      durationSec: v.metadata?.durationSec || 0,
      durationFormatted: v.metadata?.formattedDuration || "0:00",
      thumbnail: v.metadata?.thumbnails?.medium?.url || v.metadata?.thumbnails?.default?.url || `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`,
      group: weekStart,
      sharedAt: v.shared_at,
      vibe: v.vibe,
      reason: v.reason,
      source: v.source,
      description: v.description,
      viewCount: v.metadata?.viewCount,
      likeCount: v.metadata?.likeCount,
      publishedAt: v.published_at,
      tags: v.metadata?.tags,
      transcript: v.metadata?.transcript
    };
  });
}
function buildResponse(videos, emailsProcessed) {
  const uniqueGroups = Array.from(new Set(videos.map((v) => v.group)));
  uniqueGroups.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
  const groupArray = uniqueGroups.map((groupName) => {
    const groupVideos = videos.filter((v) => v.group === groupName);
    return {
      name: `Week of ${groupName}`,
      startDate: groupName,
      videoIds: groupVideos.map((v) => v.id),
      count: groupVideos.length
    };
  });
  return {
    videos,
    groups: groupArray,
    metadata: {
      emailsProcessed,
      uniqueVideos: videos.length,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      sources: Array.from(new Set(videos.filter((v) => v.source).map((v) => v.source)))
    }
  };
}
async function getNewsletters(req, res) {
  try {
    const shouldRefresh = req.query.refresh === "true";
    let dbVideos = [];
    try {
      const { data, error } = await supabase.from("videos").select("*");
      if (error) throw error;
      dbVideos = data || [];
      console.log(`Loaded ${dbVideos.length} videos from Supabase.`);
    } catch (error) {
      console.log("Error loading from Supabase, starting fresh cache:", error);
    }
    if (!shouldRefresh && dbVideos.length > 0) {
      console.log("Returning cached data (fast path)");
      const cachedVideos = transformDbVideosToUI(dbVideos);
      return res.json(buildResponse(cachedVideos, 0));
    }
    const incompleteVideos = dbVideos.filter(
      (v) => !v.metadata?.durationSec || v.metadata.durationSec === 0 || v.title.startsWith("AI Video") || v.channel === "Unknown Channel"
    );
    if (incompleteVideos.length > 0) {
      const idsToFix = incompleteVideos.map((v) => v.id);
      console.log(`Self-healing: Refreshing metadata for ${idsToFix.length} incomplete videos...`);
      const fixedData = await fetchVideoMetadata(idsToFix);
      const updates = [];
      fixedData.forEach((newMeta) => {
        const idx = dbVideos.findIndex((v) => v.id === newMeta.id);
        if (idx !== -1) {
          dbVideos[idx].title = newMeta.title;
          dbVideos[idx].description = newMeta.description;
          dbVideos[idx].channel = newMeta.channelTitle;
          dbVideos[idx].published_at = newMeta.publishedAt;
          dbVideos[idx].metadata = {
            ...dbVideos[idx].metadata,
            durationSec: newMeta.durationSec,
            formattedDuration: formatDuration(newMeta.durationSec),
            thumbnails: newMeta.thumbnails,
            channelId: newMeta.channelId,
            tags: newMeta.tags,
            viewCount: newMeta.viewCount,
            likeCount: newMeta.likeCount
          };
          updates.push(dbVideos[idx]);
        }
      });
      if (updates.length > 0) {
        await supabase.from("videos").upsert(updates, { onConflict: "id" });
        console.log(`Healed ${updates.length} videos.`);
      }
    }
    const existingClassifications = /* @__PURE__ */ new Map();
    const allKnownVideoIds = /* @__PURE__ */ new Set();
    dbVideos.forEach((v) => {
      if (v.id) {
        allKnownVideoIds.add(v.id);
        if (v.vibe) {
          existingClassifications.set(v.id, { vibe: v.vibe, reason: v.reason || "" });
        }
      }
    });
    const allVideosFromSupabase = transformDbVideosToUI(dbVideos);
    try {
      let emails = [];
      const now = /* @__PURE__ */ new Date();
      const weeksToFetch = 12;
      console.log(`Starting batched fetch for ${weeksToFetch} weeks...`);
      for (let i = 0; i < weeksToFetch; i++) {
        const toDate = new Date(now);
        toDate.setDate(now.getDate() - i * 7);
        const fromDate = new Date(toDate);
        fromDate.setDate(toDate.getDate() - 7);
        try {
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          const batchEmails = await fetchNewsletterEmails(fromDate, toDate);
          emails = [...emails, ...batchEmails];
        } catch (err) {
          console.error(`  -> Error fetching batch ${i + 1}:`, err);
        }
      }
      console.log(`Total emails found: ${emails.length}`);
      const newUrls = [];
      const newSeenIds = /* @__PURE__ */ new Set();
      emails.forEach((email) => {
        email.youtubeUrls.forEach((url) => {
          const id = extractYouTubeId(url);
          if (id && !allKnownVideoIds.has(id) && !newSeenIds.has(id)) {
            newSeenIds.add(id);
            newUrls.push({
              url,
              source: email.sender,
              date: email.date
            });
          }
        });
      });
      console.log(`Found ${newUrls.length} unique NEW videos from emails`);
      const allVideoIdsToFetchMetadata = newUrls.map((item) => extractYouTubeId(item.url)).filter(Boolean);
      let newVideos = [];
      if (allVideoIdsToFetchMetadata.length > 0) {
        console.log(`Fetching metadata for ${allVideoIdsToFetchMetadata.length} NEW videos...`);
        const youtubeData = await fetchVideoMetadata(allVideoIdsToFetchMetadata);
        const videoPromises = newUrls.map(async (item) => {
          const id = extractYouTubeId(item.url);
          if (!id) return null;
          const ytData = youtubeData.find((yt) => yt.id === id);
          const weekStart = getWeekStartDate(new Date(item.date));
          if (ytData) {
            let vibe = "Random";
            let reason = "Auto-classified";
            let transcript = null;
            const cached = existingClassifications.get(id);
            if (cached) {
              vibe = cached.vibe;
              reason = cached.reason;
            } else {
              console.log(`[Transcript] Fetching for: "${ytData.title.slice(0, 30)}..."`);
              transcript = await fetchTranscript(id);
              console.log(`[Agent] Classifying: "${ytData.title.slice(0, 30)}..."`);
              const classification = await classifyVideoAgent(
                ytData.title,
                ytData.description,
                ytData.tags,
                transcript
              );
              vibe = classification.category;
              reason = classification.reason;
            }
            return {
              id,
              url: item.url,
              title: ytData.title,
              channel: ytData.channelTitle,
              channelId: ytData.channelId,
              durationSec: ytData.durationSec,
              durationFormatted: formatDuration(ytData.durationSec),
              thumbnail: ytData.thumbnail,
              group: weekStart,
              sharedAt: item.date instanceof Date ? item.date.toISOString() : new Date(item.date).toISOString(),
              vibe,
              reason,
              source: item.source,
              description: ytData.description,
              viewCount: ytData.viewCount,
              likeCount: ytData.likeCount,
              commentCount: ytData.commentCount,
              publishedAt: ytData.publishedAt,
              tags: ytData.tags,
              categoryId: ytData.categoryId,
              defaultLanguage: ytData.defaultLanguage,
              liveBroadcastContent: ytData.liveBroadcastContent,
              thumbnails: ytData.thumbnails,
              transcript
            };
          } else {
            return {
              id,
              url: item.url,
              title: `AI Video ${id}`,
              channel: "Unknown Channel",
              durationSec: 300,
              durationFormatted: "5:00",
              thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
              group: weekStart,
              sharedAt: item.date instanceof Date ? item.date.toISOString() : new Date(item.date).toISOString(),
              vibe: "Random",
              reason: "Metadata check failed",
              source: item.source,
              tags: []
            };
          }
        });
        newVideos = (await Promise.all(videoPromises)).filter(Boolean);
        const records = newVideos.map((v) => ({
          id: v.id,
          title: v.title,
          description: v.description || "",
          channel: v.channel,
          url: v.url,
          published_at: v.publishedAt ? new Date(v.publishedAt).toISOString() : null,
          shared_at: v.sharedAt,
          vibe: v.vibe,
          reason: v.reason,
          source: v.source,
          metadata: {
            channelId: v.channelId,
            thumbnails: v.thumbnails,
            tags: v.tags,
            durationSec: v.durationSec,
            viewCount: v.viewCount,
            likeCount: v.likeCount,
            commentCount: v.commentCount,
            categoryId: v.categoryId,
            defaultLanguage: v.defaultLanguage,
            liveBroadcastContent: v.liveBroadcastContent,
            formattedDuration: v.durationFormatted,
            transcript: v.transcript
          }
        }));
        if (records.length > 0) {
          const { error: upsertError } = await supabase.from("videos").upsert(records, { onConflict: "id" });
          if (upsertError) console.error("Supabase Upsert Error:", upsertError);
          else console.log(`Successfully upserted ${records.length} new videos to Supabase.`);
        }
      } else {
        console.log("No new videos found to process or upsert.");
      }
      const allProcessedVideos = [...allVideosFromSupabase, ...newVideos];
      return res.json(buildResponse(allProcessedVideos, emails.length));
    } catch (gmailError) {
      console.error("API error:", gmailError);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// src/api/index.ts
import { createClient as createClient2 } from "@supabase/supabase-js";
var supabaseUrl2 = process.env.VITE_SUPABASE_URL || "";
var supabaseKey2 = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
async function getVideoMetadata(videoId) {
  if (!supabaseUrl2 || !supabaseKey2) {
    console.error("Missing Supabase credentials");
    return null;
  }
  try {
    const supabase2 = createClient2(supabaseUrl2, supabaseKey2);
    const { data, error } = await supabase2.from("videos").select("id, title, description, channel, vibe, metadata").eq("id", videoId).single();
    if (error || !data) {
      console.log(`Video not found: ${videoId}`);
      return null;
    }
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      channel: data.channel,
      thumbnail: data.metadata?.thumbnails?.high?.url || data.metadata?.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${data.id}/hqdefault.jpg`,
      vibe: data.vibe
    };
  } catch (err) {
    console.error("Error fetching video:", err);
    return null;
  }
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function generateOgTags(video) {
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
var cachedBaseHtml = null;
var cacheTime = 0;
var CACHE_TTL = 60 * 60 * 1e3;
async function getBaseHtml() {
  const now = Date.now();
  if (cachedBaseHtml && now - cacheTime < CACHE_TTL) {
    return cachedBaseHtml;
  }
  try {
    const response = await fetch("https://renfro.dev/index.html");
    if (response.ok) {
      cachedBaseHtml = await response.text();
      cacheTime = now;
      return cachedBaseHtml;
    }
  } catch (err) {
    console.error("Failed to fetch base HTML:", err);
  }
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {{OG_TAGS}}
  </head>
  <body>
    <div id="root"></div>
    <p>Loading VibeTube...</p>
  </body>
</html>`;
}
function injectOgTags(html, ogTags) {
  let modified = html.replace(/<title>[^<]*<\/title>/i, "").replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "").replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "").replace(/<meta\s+name="description"[^>]*>/gi, "");
  modified = modified.replace(/<head>/i, `<head>
${ogTags}`);
  return modified;
}
var defaultOgTags = `
    <title>VibeTube | Renfro.dev</title>
    <meta name="description" content="AI-curated video feed from tech newsletters on Renfro.dev">
    <meta property="og:title" content="VibeTube | Renfro.dev">
    <meta property="og:description" content="AI-curated video feed from tech newsletters">
    <meta property="og:image" content="https://renfro.dev/og-vibetube.png">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://renfro.dev/vibetube">
    <meta name="twitter:card" content="summary_large_image">`;
async function handleVibetubeVideo(videoId, res) {
  const [video, baseHtml] = await Promise.all([
    getVideoMetadata(videoId),
    getBaseHtml()
  ]);
  const ogTags = video ? generateOgTags(video) : defaultOgTags;
  const html = baseHtml.includes("{{OG_TAGS}}") ? baseHtml.replace("{{OG_TAGS}}", ogTags) : injectOgTags(baseHtml, ogTags);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  return res.status(200).send(html);
}
async function handler(req, res) {
  const path = req.url?.split("?")[0] || "";
  if (path === "/api/newsletters" || path === "/api/newsletters/") {
    return getNewsletters(req, res);
  }
  const videoIdFromQuery = req.query.videoId;
  if (videoIdFromQuery) {
    return handleVibetubeVideo(videoIdFromQuery, res);
  }
  const vibetubeMatch = path.match(/^\/api\/vibetube\/([a-zA-Z0-9_-]+)$/);
  if (vibetubeMatch) {
    const videoId = vibetubeMatch[1];
    return handleVibetubeVideo(videoId, res);
  }
  if (path.startsWith("/api/assets/")) {
    const filename = decodeURIComponent(path.replace("/api/assets/", ""));
    return res.status(404).json({ error: "Asset serving not available in serverless mode" });
  }
  return res.status(404).json({ error: "Not found" });
}
export {
  handler as default
};
