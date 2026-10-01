---
title: "Year One Reflections at the Frontier"
slug: year-one-reflections-at-the-frontier
category: essay
period_type: essay
published_at: "2026-09-30T09:00:00"
---

My first three years building with AI were a mixture of obsessive dopamine seeking and disciplined commitment to aggressively evolving my skills to stay ahead of the curve. This year I owned delivery of AI as a service to over 20 middle market clients across a wide variety of projects, and had exposure to many more.

These are my distilled observations, hot takes, and hypotheses on where we go from here.

## 1. Value arbitrage got inverted

No, Fable or Astra did not build that on their own.

Consumers of AI services not only think they know what is possible with AI, but they think it's a lot easier than it actually is. AI operators now have to operate at an inverse of what I would consider value arbitrage, which is a huge shift from the last few years when I was performing miracles with little energy and no one understood how. Our media feeds are filled with narratives that reinforce this to a lot of the end consumers of AI services.

## 2. Hybrid AI x Human Workspaces are the next big thing

A lot of the biggest players converged on the same interface this year, and it's a chat window with teammates in it. Like slack, but with literal agents with specific roles that you chat with.

I can't unsee how powerful this is after playing around with it for the last few months with a few releases by non-frontier models like Grok Bot and Buzz, building GTM teams.

My general observation is that if you give frontier models a lens through which to see a problem, the right tools (this is key), browser use, computer use, a server / can run crons, configure env variables, you have the world at your fingertips. I have really enjoyed using these tools on mobile while I'm exercising or when an idea comes.

I've been really impressed with the outcomes that are produced when you have a "jury" of agents (rather than a judge) with their own tools and bias reasoning through a problem together, when applied to GTM. Imagine one agent that governs your database, one agent that has all of your data provider API keys (for building prospect lists), a copywriter, an agent that governs your CRM, one that handles deliverability, and a coding agent that has access to your context harness, all collaborating towards producing an outcome. I'm running that today, and it works. I literally ran to the ocean yesterday, sat down, and drafted a prospecting campaign in 5 minutes.

It's truly not the same as giving one agent multiple tools. The outcomes are superior, and you'll just need to try it to see. I will warn you, it burns token more aggressively so keep an eye on it and don't always configure Astra/Fable or even Opus. The right model for the right "job".

Yesterday OpenAI launched [Dots](https://siliconangle.com/2026/09/29/openai-launches-dots-always-on-ai-agents-in-chatgpt-with-their-own-cloud-computers/), always-on agents with their own cloud computers, alongside a shared ChatGPT Space where [teammates can tag a Dot](https://venturebeat.com/technology/openai-launches-dots-always-on-ai-agent-coworkers-and-chatgpt-space-where-they-can-collaborate-with-human-teams) for help. I think this is the PR that helps this cross the chasm.

I'm very bullish on this modality and very eager to build more on it.

## 3. We're in a RevOps Renaissance

AI engineering innovation moved upstream into GTM and RevOps.

For GTM, it's well on it's way to commoditize the top of the funnel (linkedin/email), which I think will force people to be more creative, write about topics people care about, create tools that people value, etc, rather than sending personalized AI slopspam with hard CTAs. It will also drive a values shift back to in person, events, real relationships, and real content. Win for humanity, loss for growth hackers. Long live salesmanship. This year, leading the GTM team at Cadre, I saw a lot of people looking for a silver bullet. There are no cheat codes, just good strategy, the right tools, and hard work. The stack evolved, and operators are catching up.

Caveat on GTM: It has so far commoditized the "vanilla" applications of GTM, but that still collapses performance. There are still a lot of really cool GTM angles, they just live in bespoke / custom solutions that are hard to productize to VC appetites.

RevOps on the other side, I believe is undergoing a renaissance period.

AI-Native CRM is making data entry, ICP scoring, follow ups, deep research, sales coaching, revenue forecasting, etc etc, tremendously more simple. I love a future where sales people aren't relied on to produce structured data, you know who you're meeting with, your CRM is listening for intent signals / news that matters, every prospect is scored against ICP criteria, there is a "brain" built in, enrichment happens automatically. I honestly feel bad for the companies that have invested heavily in legacy CRMs and are trying to bolt on AI (and not just an AI SDR). Incumbents and SMBs that can pivot quickly have a huge advantage in my opinion.

## 4. Open source is so back

The ecosystem around your product is now arguably more important than the software. This movement embodies the values of the DeFi movement, but without the extremely attractive incentive mechanisms. Same culture, ethos, and some players. Long live DeFi.

There are three examples this month I've seen that absolutely slap.

Jack Dorsey's Buzz is the cleanest example. Block released it on [July 21](https://techcrunch.com/2026/07/21/jack-dorsey-is-taking-on-slack-with-buzz-a-group-chat-platform-for-teams-and-their-ai-agents/) as a free workspace where people and AI agents share the same chat, positioned against Slack and GitHub. I've been building in Buzz since it's release, and I love it. Ten weeks since launch, their [repo](https://github.com/block/buzz) has around 4,700 forks, and roughly 2,000 open pull requests _from the public_ being merged by Block devs. Block is running a product roadmap, ideation, QA, and R&D through strangers. Think about that.

Eric Nowoslawski of GrowthEngineX is the same story at a smaller scale. I saw him and Brendan Short flip the entire GTM world to Grok Bot and Cursor overnight a few weeks ago, and this clicked for me. He gives his playbooks, skill libraries, and prospect lists away for free. His IP is literally his marketing. The community that forms around it is the business.

Higgsfield, the AI video company (epic tool), opened an API and then released a studio app that plugs into it. I saw it in Buzz the next week. It's a bit of a cheeky play, since the video models stay closed, but it made it easy for the ecosystem to build distribution around it.

## 5. Pirates Get Pirated

Nobody starts from a blank page anymore. The indie move now is to find an open source repo, clone it, and build on top of it. You can watch it happen in real time. xAI's Grok Bot, for example, is a closed product, and GitHub's [grokbot topic](https://github.com/topics/grokbot) already lists 39 public repos, from playbooks to full clones (this enhances my point earlier about the value of the ecosystem).

The catch is that everyone else has figured this out too, including the people who want to pirate *you*. A solo researcher mapped a campaign of [10,000+ fake repositories](https://cybernews.com/security/10k-repos-github-malware-campaign-targets-ai-agents/) on GitHub doing just this. The attackers clone new repos rather than established ones, plant malware, and often outrank star ratings of the originals in search. They churn commits every few hours to dodge detection, and GitHub's takedowns are inconsistent. Be careful out there, especially if you're using your hobby computer to push code to enterprise. Be a pirate and participate in the acceleration of our collection technological (de*?)volution.

## 6. Open models & geopolitics

Stanford's 2026 AI Index found the top US model beating the top Chinese model by just [2.7% on Arena in March](https://digitalinasia.com/china-vs-us-ai-race/) with API costs on the open Chinese model (DeepSeek) at ~50x lower. The US government is watching closely, and we're approaching nuclear arms / space race territory, and humorously the models themselves are a microcosm for the ideology they protect.

Frontier American labs keep models closed and are approaching IPO's with unprecedented valuations, literally pursuing data centers in outer space to support the compute, while top Chinese labs give away something [close to their best](https://www.techpolicy.press/will-china-crack-down-on-open-weight-models/) and are generally available on consumer hardware. Wild.

In April, China [blocked Meta's $2 billion purchase of Manus](https://www.cnbc.com/2026/04/27/meta-manus-china-blocks-acquisition-ai-startup.html) an agent startup founded in China that had relocated to Singapore, and ordered the deal unwound. By August Manus was [independent again](https://www.infoworld.com/article/4228301/metas-ex-launches-agent-rival-to-metas-muse.html) and competing with Meta's own agent, Muse. One write-up summed up the pattern: ["China will let its models travel, but not its companies."](https://thenextweb.com/news/manus-meta-acquisition-blocked-china-independent-data-deletion)

Meanwhile, the US has pushed proposals to ban Chinese models. Two world superpowers, two techno-ideologies, and one big game of geopolitics that is shaping out without a ton of noise around it.

## 7. Addiction and Anxiety

I experienced a new emotional phenomenon this year, which I will call "Compute Seperation Anxiety". It's the experience of feeling anxious if your cloud agent or server is not working while you are sleeping or engaged in other work. Weird one, but it's real, and I'm not alone. I think it's a bi-product of three things. A highly demanding work environment, being highly ambitious , and being dopamine dis-regulated. AI work is a trifecta of all three.

## 8. These three mediums will change how we interface with LLMs

Remote Control + Interactive podcasts + Interactive Ephemeral HTML will change how we interface with this technology. This doesn't count the "Hybrid Workspace" I cover in #2 above.

If you don't use remote control, you're missing out. You can basically build anything on your phone now. I'm addicted to this, and while it is a trivial productivity gain, it's a massive lifestyle gain. What most people miss here is that this allows you to build your thoughts into a code repository, which is really where knowledge work needs to live.

Here's my flow. I use the voice chat feature with Astra while going on a walk or run to brainstorm or work through ideas. These conversations become tasks, to-dos, blog post ideas, campaign ideas, etc. I've one built it one way for now, but there is a not so far away world where a lot of the meetings you couldn't attend, the metrics you care about today, the messages that need attending to, your open tasks, are all presented, worked through, and reprioritized in a daily podcast style medium. My idealized version of this looks like going on a walk or hike and working through a decent portion of my admin. I'm doing the work, AI is just facilitating it through a medium that allows me to be more human. I'm particularly obsessed with what this medium could mean for owner-operators that want to retire out of their business and not be stuck in the day to day. It's a two way street without the scheduled meetings.

After a massive brainstorm or session (especially when you're running a multiplayer workflow with multiple agents in a hybrid workspace), you need an answer questions. Historically, LLMs produce an md file and you have to generate descriptive prose to give context to what you're even giving an answer to. The end of sessions will start to contain html that simply is a visually appealing format to convey and present information, and AI is very good at producing it. You answer the questions, maybe make some comments on specific sections if you're brainstorming a visual, and it incorporates your feedback into the next revision. The HTML disappears. If you don't know what I'm talking about you'll see it soon. If you want it on demand, I use the [Lavish](https://github.com/kunchenguid/lavish-axi) CLI which works great.

## 9. AI may be crypto's actual end user

I'll end with a weird one.

For years we thought we were building crypto for humans and for transparency. We may have been building it for AI and hidden transactions.

Start with Circle, creator of stablecoin USDC, which is officially govt regulated infra as of July. In May, Circle launched [Agent Stack](https://www.circle.com/pressroom/circle-launches-ai-infrastructure-to-power-the-agentic-economy): a CLI, wallets for agents, an agent marketplace, and nanopayments that move USDC gas-free. CEO Jeremy Allaire framed it as the first suite where ["AI agents themselves are the customers"](https://www.circle.com/pressroom/circle-launches-ai-infrastructure-to-power-the-agentic-economy), not just developers and enterprises. Card networks across the board are staffing up for agents as the end user.

Now the dangerous part. The privacy layer is arriving right on schedule. NEAR AI added [confidential USDC payments](https://www.cryptotimes.io/2026/05/15/near-ai-integrates-private-usdc-payments-for-agentic-commerce/) to its agent marketplace, arguing that agents need onchain security without public exposure of every transaction.

Put it together and you get autonomous software transacting privately at machine speed with no human in the loop. That completely undermines the ethos of the movement. The whole pitch was transparency. We may be building the opposite: a world where AI is the end user and the transactions can be private.

This is foundational to some techno-apocalyptic narratives, but I don't hear anyone talking about it.

## 10. Your turn.

Tell me your hot take, observation, or alpha on the space. Share some fresh perspective.
