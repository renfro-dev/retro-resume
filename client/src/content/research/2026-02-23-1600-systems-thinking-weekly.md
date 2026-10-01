---
title: AI Agents & Open Models
slug: systems_thinking-weekly-2026-02-17
category: systems_thinking
period_type: weekly
period_start_date: 2026-02-17
period_end_date: 2026-02-23
published_at: "2026-02-23T16:00:00"
word_count: 1782
reading_time_minutes: 9
source_file: briefs/systems_thinking/weekly_brief_2026-02-17.md
---

This week saw significant developments in AI agent infrastructure and evaluation, with companies releasing new tools to address the growing complexity of autonomous systems. Meanwhile, the open model ecosystem continued its rapid evolution, with Chinese models gaining prominence and new benchmarks emerging to evaluate specialized AI capabilities.

## Agent Infrastructure Matures

The challenge of building reliable AI agents dominated technical discussions this week. LangChain revealed how their coding agent jumped from Top 30 to Top 5 on Terminal Bench 2.0—a standard benchmark for evaluating agentic coding across 89 tasks—by focusing entirely on "harness engineering" [3]. Harness engineering involves creating middleware and guardrails that shape how AI models interact with their environment, similar to how a harness directs a horse's movement [3]. Without changing the underlying model (gpt-5.2-codex), they improved performance from 52.8 to 66.5 points through systematic improvements [3].

The most common failure pattern they identified was agents writing solutions, re-reading their own code, confirming it looked correct, and then stopping—without actually testing their work [3]. To address this, they developed PreCompletionChecklistMiddleware that intercepts agents before they exit and reminds them to run verification passes [3]. They also created LoopDetectionMiddleware to track per-file edit counts and prevent agents from getting stuck in "doom loops"—repeatedly making small variations to the same broken approach [3].

Monday Service shared their experience building an AI service workforce with evaluation embedded from day one, achieving 8.7x faster evaluation feedback loops (from 162 seconds to 18 seconds) [4]. Their approach treats evaluation not as a "last-mile check" but as a "Day 0 requirement" [4]. They constructed a dataset of approximately 30 real sanitized IT tickets from their internal help desk, covering common categories like access and identity issues, VPN problems, and device support [4]. By optimizing their Vitest and LangSmith integration to distribute load across local workers and remote API calls, they achieved massive speed increases [4].

LangChain also emphasized that agent observability differs fundamentally from traditional software observability [7]. While traditional software is largely deterministic—given the same input, you get the same output—AI agents break these assumptions [7]. The source of truth shifts from code to runtime traces showing what the agent actually did [7]. Agent traces can reach hundreds of megabytes for complex, long-running agents, compared to typical distributed traces of a few hundred bytes [7]. Production plays a different role with agents: it's where you discover what to test for offline, since you can't anticipate how users will phrase requests or what edge cases exist [7].

## Tools for Agent Development

Several new tools emerged to support the growing agent ecosystem. Weaviate introduced Agent Skills, addressing the problem that while tools like Claude Code, Cursor, and GitHub Copilot have made "vibe coding" possible, this speed "hits a wall when it meets specialized infrastructure" [2]. Agents often "hallucinate legacy v3 Weaviate syntax, guess at hybrid search alpha parameters, or fail to implement efficient multivector embedding strategies" [2]. The Agent Skills format, developed by Anthropic, provides structured documentation that helps coding agents write better code for specialized tools [2].

LangSmith rebuilt Agent Builder around the philosophy that "working with an agent should feel like working with a teammate" [5]. The update introduces an always-available agent called 'Chat' that can access every tool connected to your workspace—Slack, Gmail, Linear, Pylon, and others connected via remote MCP server [5]. Users can run multiple chats simultaneously, with each running independently [5]. Any conversation can be converted into a reusable agent by selecting "Turn this conversation into a reusable agent" [5]. The system now supports direct file uploads, allowing agents to act on CSVs, screenshots, or style guides [5].

Agent Builder's memory system, built on Deep Agents (LangChain's open source agent harness), stores memory using standard Markdown files [6]. Short-term memory exists for the duration of a conversation but doesn't persist across conversations, while long-term memory files in the `/memories/` path stick around across every conversation [6]. Skills are only loaded when tasks call for them, because "more context isn't always better"—agents trying to hold onto everything at once can lose focus and lead to hallucinations [6].

Simon Willison released several tools for his Showboat documentation system, including Chartroom—a wrapper around matplotlib designed for coding agents—and datasette-showboat, a plugin for viewing and receiving Showboat documents [16]. Showboat v0.6.0 adds a 'remote' feature that POSTs document fragments to API endpoints, allowing real-time viewing of work in progress [16].

## Open Model Competition Intensifies

The open model landscape saw major releases this week. Alibaba's Qwen released the first two models in the Qwen 3.5 series—one open weights, one proprietary [17]. The open weight model, Qwen3.5-397B-A17B, is a Mixture of Experts model comprising 397 billion total parameters, with just 17 billion activated per forward pass [17]. It uses a hybrid architecture fusing linear attention via Gated Delta Networks with sparse mixture-of-experts, optimizing speed and cost [17]. At 807GB on Hugging Face, it represents a significant computational requirement [17].

Nathan Lambert argued that despite periodic excitement, open models remain in "perpetual catch-up" with closed models [9]. Every 4-6 months a new open-weights model causes discussion about how open models are closer than ever to frontier closed models, but "the ~6month gap is holding steady" [9]. He noted that "in the last 12 months the new part of this story is that all of the open models of discussion are coming from China, where previously they were almost always Meta's Llamas" [9].

Lambert highlighted that "the frontier of AI has never been harder to capture in public benchmarks" [9]. Building benchmarks is now "super expensive and requires extreme knowledge regarding the latest models" [9]. He cited examples like SWE-Bench being "almost 3/4 Django" and Terminal Bench 2 being "crowdsourced and a bit noisy" [9]. Despite China having "many labs building models on top of their peers' innovations," Lambert predicts "the most likely (by far) outcome is for the status quo to continue and for the best open models to lag the best closed models by 6-9months" [9].

## Security and Evaluation Infrastructure

Weaviate published a comprehensive security guide addressing the risks as vector databases—data structures that store numerical representations of text, images, or other content for similarity search—move from prototype to production [1]. They warned of scenarios like "an intern accidentally exposes a customer's personally identifying information (PII) through a search API" or "an agentic application deletes an entire database in production" [1]. Vector databases often contain "embeddings of sensitive customer data, proprietary documents, or regulated information" [1].

The guide emphasizes that "anonymous access should only be used in local development environments" and should "never use anonymous access in production or with any data that requires protection" [1]. With Weaviate's user management (v1.30+), users can "create, delete, and manage users at runtime — no restart required" [1]. For enterprise deployments, Weaviate Cloud's Premium plan offers "dedicated infrastructure with SSO/SAML support, PrivateLink, and compliance certifications (SOC II, HIPAA)" [1].

OpenAI and Paradigm introduced EVMbench, a benchmark evaluating AI agents' ability to detect, patch, and exploit high-severity smart contract vulnerabilities [10]. This represents the growing focus on specialized evaluation tools for domain-specific AI applications.

## Global AI Initiatives

Both Google DeepMind and OpenAI announced major initiatives in India this week. Google DeepMind revealed that India is now the fourth largest adopter of AlphaFold globally, with over 180,000 researchers using it [8]. India also "leads the world in daily Gemini usage by students" [8]. In a randomized control study at City Montessori School, "in almost three out of every four conversations on Gemini, students sought to develop their understanding rather than a quick answer or shortcut" [8].

Google's partnerships include working with PM Publishers to transform "two million static textbooks into AI-powered interactive journeys across more than 250 titles and 2,000 schools" [8]. They're also collaborating with Atal Tinkering Labs serving "more than 10,000 Indian schools and 11 million students" [8]. On the infrastructure side, they're working with Open Climate Fix to integrate WeatherNext AI models, showing "up to 8% accuracy improvement in forecast performance" for wind generation [8].

OpenAI announced "OpenAI for India," focusing on building local infrastructure, powering enterprises, and advancing workforce skills [11]. The company also committed $7.5M to The Alignment Project to fund independent AI alignment research, strengthening global efforts to address AGI safety and security risks [12].

## Tensions & Conflicts

Several tensions emerged across this week's developments. Lambert's analysis directly contradicts popular narratives about open models catching up to closed models, asserting that despite excitement, "open models are not meaningfully accelerating towards matching the best closed models in absolute performance" [9]. This conflicts with the enthusiasm around new releases like Qwen3.5.

In agent development, there's tension between autonomy and control. While LangChain advocates for autonomous agents, they also note that "a human can be pretty helpful" in verification loops, though "not required" [3]. Similarly, Agent Builder warns that giving agents too much context can cause them to "lose focus on what matters" and lead to hallucinations [6].

The shift in how we evaluate AI systems represents another conflict. Traditional software development treats production as a place to catch edge cases after comprehensive offline testing, but with agents, "production plays a different role" as the primary source for discovering what to test [7]. This fundamentally challenges established software engineering practices.

## Sources

[1] [Weaviate Blog. (2026, February 18). Weaviate Authentication & Authorization: A Complete Security Guide](https://weaviate.io/blog/weaviate-security-authn-authz)

[2] [Weaviate Blog. (2026, February 18). Introducing Weaviate Agent Skills](https://weaviate.io/blog/weaviate-agent-skills)

[3] [LangChain Accounts. (2026, February 17). Improving Deep Agents with harness engineering](https://blog.langchain.com/improving-deep-agents-with-harness-engineering/)

[4] [LangChain Accounts. (2026, February 18). monday Service + LangSmith: Building a Code-First Evaluation Strategy from Day 1](https://blog.langchain.com/customers-monday/)

[5] [LangChain Accounts. (2026, February 18). New in Agent Builder: all new agent chat, file uploads + tool registry](https://blog.langchain.com/new-in-agent-builder-all-new-agent-chat-file-uploads-tool-registry/)

[6] [LangChain Accounts. (2026, February 19). How to Use Memory in Agent Builder](https://blog.langchain.com/how-to-use-memory-in-agent-builder/)

[7] [LangChain Accounts. (2026, February 22). Agent Observability Powers Agent Evaluation](https://blog.langchain.com/agent-observability-powers-agent-evaluation/)

[8] [Google DeepMind Blog. (2026, February 17). Accelerating discovery in India through AI-powered science and education](https://deepmind.google/blog/accelerating-discovery-in-india-through-ai-powered-science-and-education/)

[9] [Nathan Lambert. (2026, February 17). Open models in perpetual catch-up](https://www.interconnects.ai/p/open-models-in-perpetual-catch-up)

[10] [OpenAI Blog. (2026, February 18). Introducing EVMbench](https://openai.com/index/introducing-evmbench)

[11] [OpenAI Blog. (2026, February 18). Introducing OpenAI for India](https://openai.com/index/openai-for-india)

[12] [OpenAI Blog. (2026, February 19). Advancing independent research on AI alignment](https://openai.com/index/advancing-independent-research-ai-alignment)

[13] [OpenAI Blog. (2026, February 20). Our First Proof submissions](https://openai.com/index/first-proof-submissions)

[14] [Vicki Boykis. (2026, February 21). Querying 3 billion vectors](https://veekaybee.github.io/2026/02/21/querying-3-billion-vectors/)

[15] [Simon Willison's Weblog. (2026, February 16). Rodney and Claude Code for Desktop](https://simonwillison.net/2026/Feb/16/rodney-claude-code/#atom-everything)

[16] [Simon Willison's Weblog. (2026, February 17). Two new Showboat tools: Chartroom and datasette-showboat](https://simonwillison.net/2026/Feb/17/chartroom-and-datasette-showboat/#atom-everything)

[17] [Simon Willison's Weblog. (2026, February 17). Qwen3.5: Towards Native Multimodal Agents](https://simonwillison.net/2026/Feb/17/qwen35/#atom-everything)

[18] [Simon Willison's Weblog. (2026, February 17). Nano Banana Pro diff to webcomic](https://simonwillison.net/2026/Feb/17/release-notes-webcomic/#atom-everything)

[19] [Simon Willison's Weblog. (2026, February 17). Quoting Dimitris Papailiopoulos](https://simonwillison.net/2026/Feb/17/dimitris-papailiopoulos/#atom-everything)
