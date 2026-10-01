---
title: Open Models & Coding Agents
slug: systems_thinking-weekly-2026-03-03
category: systems_thinking
period_type: weekly
period_start_date: 2026-03-03
period_end_date: 2026-03-09
published_at: "2026-03-09T16:00:00"
word_count: 1505
reading_time_minutes: 8
source_file: briefs/systems_thinking/weekly_brief_2026-03-03.md
---

This week saw significant developments in AI coding agents, open model architectures, and the evolving landscape of AI development tools. From LangChain's new skills system dramatically improving agent performance to concerns about the Qwen team's future following key resignations, the AI ecosystem continues to evolve rapidly.

## Key Developments

### Coding Agents Gain New Capabilities

The most striking development this week was the emergence of sophisticated tools and techniques for AI coding agents. LangChain released their first set of skills designed to give AI coding agents expertise in the open source LangChain ecosystem, improving Claude Code's performance on LangChain tasks from 29% to 95% [3]. These skills work through progressive disclosure—the agent only retrieves a skill when it's relevant to the task at hand—avoiding the historical problem where giving too many tools to an agent would cause its performance to degrade [3].

The skills consist of portable markdown files and scripts that can be retrieved on demand, covering three main categories: LangChain guidance on using create_agent(), middleware, and tool patterns; LangGraph primitives with native support for Human In the Loop and durable execution; and Deep Agents package integration [3]. Similarly, LangChain introduced a LangSmith CLI designed to be "agent-native," providing building blocks for coding agents to perform any function within LangSmith, boosting Claude Code's performance on LangSmith tasks from 17% to 92% [13].

Simon Willison highlighted an emerging pattern called "agentic manual testing," noting that "the defining characteristic of a coding agent is that it can execute the code that it writes" [1]. This capability allows agents to confirm their code works as intended or iterate until it does, going beyond simply generating code without verification [1]. Willison emphasized that "just because code passes tests doesn't mean it works as intended," advocating for agents to perform manual testing using tools like Playwright for browser automation [1].

### Open Model Architecture Evolution

The open model landscape saw significant technical advances this week, particularly in hybrid architectures. Nathan Lambert's analysis of Olmo Hybrid revealed that these models represent "about a 2X gain on training efficiency relative to Olmo 3 dense" in pretraining [15]. Hybrid architectures combine traditional transformer attention layers with RNN layers that "avoid the quadratic compute cost of attention by keeping computation compressed in a hidden state" [15].

However, Lambert noted a critical challenge: "The open-source software tooling support for new architectures is horrific," with the 7B hybrid model currently taking more compute to train with reinforcement learning (RL)—a training method where AI learns through trial and error by receiving rewards or penalties—than the 7B dense model, despite theoretical efficiency gains [15]. This tooling gap is expected to take "another 3-6 months to get right for this batch of GDN models" [15].

The Chinese AI ecosystem demonstrated continued momentum with multiple flagship releases. Qwen 3.5 models range from 0.8B to 397B parameters—the individual numerical values that determine the model's behavior, with more parameters generally meaning the model can capture more complexity but requiring more computing power [20]. All models are multimodal, use reasoning by default, and are based on the Qwen-Next architecture with GDN layers [20]. The 2B model is just 4.57GB—or as small as 1.27GB quantized—while still being a full reasoning and multimodal vision model [12].

### Enterprise AI Integration

LangChain shared detailed results from their GTM (Go-To-Market) agent implementation, demonstrating practical enterprise AI deployment. The agent achieved a 250% increase in lead-to-qualified-opportunity conversion rate from December 2025 to March 2026, driving 3x more pipeline dollars [7]. Sales reps reclaimed 40 hours per month each, totaling 1,320 hours across the team, with 50% daily and 86% weekly active usage [7].

The GTM agent operates as an "ambient agent, running as a background process" that automatically researches accounts, drafts personalized emails, and includes sophisticated checks to prevent inappropriate outreach [7]. Unexpectedly, the tool spread beyond sales to other teams: "Engineers checked product usage without writing SQL. Customer success pulled support history before renewal calls. Account executives summarized Gong transcripts before meetings" [7].

### New Model Releases

Google DeepMind introduced Gemini 3.1 Flash-Lite, positioned as "the fastest and most cost-efficient Gemini 3 series model" at $0.25/1M input tokens and $1.50/1M output tokens [2]. The model outperforms 2.5 Flash with "2.5X faster Time to First Answer Token and 45% increase in output speed" while achieving an Elo score of 1432 on the Arena.ai Leaderboard [2]. It scores 86.9% on GPQA Diamond and 76.8% on MMMU Pro, "even surpassing larger Gemini models from prior generations like 2.5 Flash" [2].

OpenAI released GPT-5.4 and GPT-5.4-pro with an August 31st 2025 knowledge cutoff and 1 million token context window [9]. The models are "priced slightly higher than the GPT-5.2 family with a bump in price for both models if you go above 272,000 tokens" [9]. Notably, GPT-5.4 "beats coding specialist GPT-5.3-Codex on all of the relevant benchmarks," raising questions about whether the Codex line will continue [9].

## Tensions & Conflicts

### Qwen Team Uncertainty

A significant development emerged when Junyang Lin, lead researcher building Qwen and "key to releasing their open weight models from 2024 onwards," announced his resignation [12]. This was followed by resignations from "several other key members including Binyuan Hui, Bowen Yu, Kaixin Li, and many young researchers on the same day" [12]. Alibaba Group CEO Wu Yongming held an emergency All Hands meeting at approximately 1:00 PM Beijing time on March 4th, though "no new conclusions were reached at the meeting" regarding Lin's future with the company [12]. Simon Willison noted that "everything is still very much up in the air" [12].

### Open Source Sustainability vs. Economic Reality

Dean Ball and Nathan Lambert's discussion surfaced fundamental tensions about open model development. Lambert argued that "AI models cost closer to a trillion dollars than a hundred million," making it difficult to commoditize complements [21]. He stated that "AI won't be meaningful economically if everything is open and models are truly commoditized" [21]. This conflicts with Ball's view that "open weight is the insurance policy" against government control and power-seeking behavior in AI systems [21].

### Coding Agent Technology Preferences

Research by Edwin Ong and Alex Vikati found that Claude Code showed "a strong bias towards build-over-buy" with GitHub Actions, Stripe, and shadcn/ui seeing "near monopoly" in their respective categories [8]. However, Simon Willison challenged the concern that LLMs would push technology choices toward well-represented tools, stating that "with the latest models running in good coding agent harnesses, this bias towards well-represented tools no longer continues to hold up" [8]. He noted that models can now "consume quite a lot of documentation before they start working on a problem" [8].

## Implications

The rapid improvement in coding agent capabilities through skills and better tooling suggests a shift in how developers will interact with AI assistants. The 95% success rates achieved through progressive skill loading demonstrate that context-aware assistance can dramatically improve agent performance without overwhelming them with too many tools.

The challenges with hybrid model architectures highlight a critical gap between theoretical advances and practical deployment. While these models show 2X training efficiency gains, the lack of proper tooling support means they currently require more resources for post-training, illustrating the importance of ecosystem development alongside model innovation.

The Qwen team situation underscores the fragility of open model development, particularly when key personnel depart. Combined with the economic arguments about trillion-dollar training costs, this raises questions about the long-term sustainability of truly open AI development outside of major corporate or government backing.

## Sources

[1] [Willison, S. (2026, March 6). Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/#atom-everything)

[2] [Google DeepMind Blog. (2026, March 3). Gemini 3.1 Flash-Lite: Built for intelligence at scale](https://deepmind.google/blog/gemini-3-1-flash-lite-built-for-intelligence-at-scale/)

[3] [LangChain Accounts. (2026, March 4). LangChain Skills](https://blog.langchain.com/langchain-skills/)

[4] [LangChain Accounts. (2026, March 5). Evaluating Skills](https://blog.langchain.com/evaluating-skills/)

[5] [OpenAI Blog. (2026, March 4). How Axios uses AI to help deliver high-impact local journalism](https://openai.com/index/axios-allison-murphy)

[6] [Google DeepMind Blog. (2026, March 9). From games to biology and beyond: 10 years of AlphaGo's impact](https://deepmind.google/blog/10-years-of-alphago/)

[7] [LangChain Accounts. (2026, March 9). How we built LangChain's GTM Agent](https://blog.langchain.com/how-we-built-langchains-gtm-agent/)

[8] [Willison, S. (2026, March 9). Perhaps not Boring Technology after all](https://simonwillison.net/2026/Mar/9/not-so-boring/#atom-everything)

[9] [Willison, S. (2026, March 5). Introducing GPT‑5.4](https://simonwillison.net/2026/Mar/5/introducing-gpt54/#atom-everything)

[10] [LangChain Accounts. (2026, March 4). February 2026: LangChain Newsletter](https://blog.langchain.com/febraury-2026-langchain-newsletter/)

[11] [OpenAI Blog. (2026, March 4). Understanding AI and learning outcomes](https://openai.com/index/understanding-ai-and-learning-outcomes)

[12] [Willison, S. (2026, March 4). Something is afoot in the land of Qwen](https://simonwillison.net/2026/Mar/4/qwen/#atom-everything)

[13] [LangChain Accounts. (2026, March 4). LangSmith CLI & Skills](https://blog.langchain.com/langsmith-cli-skills/)

[14] [Willison, S. (2026, March 8). Quoting Joseph Weizenbaum](https://simonwillison.net/2026/Mar/8/joseph-weizenbaum/#atom-everything)

[15] [Lambert, N. (2026, March 5). Olmo Hybrid and future LLM architectures](https://www.interconnects.ai/p/olmo-hybrid-and-future-llm-architectures)

[16] [OpenAI Blog. (2026, March 4). Extending single-minus amplitudes to gravitons](https://openai.com/index/extending-single-minus-amplitudes-to-gravitons)

[17] [OpenAI Blog. (2026, March 6). Codex Security: now in research preview](https://openai.com/index/codex-security-now-in-research-preview)

[18] [Boykis, V. (2026, March 4). Antidote](https://vickiboykis.com/2026/03/04/antidote/)

[19] [OpenAI Blog. (2026, March 5). Introducing GPT-5.4](https://openai.com/index/introducing-gpt-5-4)

[20] [Brand, F. (2026, March 3). Latest open artifacts (#19): Qwen 3.5, GLM 5, MiniMax 2.5 — Chinese labs' latest push of the frontier](https://www.interconnects.ai/p/latest-open-artifacts-19-qwen-35)

[21] [Lambert, N. (2026, March 6). Dean Ball on open models and government control](https://www.interconnects.ai/p/how-anthropic-vs-dow-impacts-open)

[22] [Weaviate Blog. (2026, March 3). Weaviate 1.36 Release](https://weaviate.io/blog/weaviate-1-36-release)
