---
title: "Context Orchestration: The Meta-Skill That Unlocked AI Leverage in December 2025"
slug: context_orchestration-monthly-2025-12-01
category: context_orchestration
period_type: monthly
period_start_date: 2025-12-01
period_end_date: 2025-12-31
published_at: "2025-12-31T15:00:00"
word_count: 1983
reading_time_minutes: 10
source_file: briefs/context_orchestration/monthly_brief_2025-12_december.md
---

## Executive Summary

This month marked a significant shift in how high-velocity leaders approach AI: the focus moved from model capabilities to **context orchestration** - the meta-skill of curating, sequencing, and surfacing information to AI systems for better decision-making. The bottleneck isn't AI capability—it's humans' ability to orchestrate context effectively. December's developments revealed that the most successful AI implementations weren't driven by better models, but by better context management strategies. From Boris Cherny's 259 PRs in 30 days [32] to enterprise-wide AI deployments, the differentiator was context orchestration skill, not raw AI power.

## The November Inflection Point: Context Orchestration Becomes Critical

The release of GPT-5.2 and Claude Opus 4.5 in November 2025 represented an inflection point where models crossed an "invisible capability line" [15]. This threshold crossing opened up significantly harder coding problems and use cases [15]. However, the real breakthrough wasn't the models themselves, but how leaders learned to manage the context these models could access.

The most impactful AI development of 2025 wasn't a flashy consumer product but Claude Code, released quietly in February [16]. By December, Anthropic credited Claude Code with $1 billion in run-rate revenue [16]. What made this possible wasn't just model improvements, but the meta-skill it exposed: context orchestration. Boris Cherny shipped 259 PRs in 30 days not by typing faster, but by learning to curate, prune, and sequence the information his AI sees [32].

## Core Concepts: The Context Orchestration Toolkit

### 1. Context Management: The New Leadership Skill

Liz Fong-Jones, a respected engineering leader, observed that "a language model changes you from a programmer who writes lines of code, to a programmer that manages the context the model has access to, prunes irrelevant things, adds useful material to context, and writes detailed specifications" [23]. This insight applies beyond coding - it's the fundamental shift in how all knowledge work is now performed.

The most successful leaders are approaching AI as a context management problem. Will Larson notes that "real AI adoption on real problems is a complex blend of domain context on the problem, domain experience with AI tooling, and old-fashioned IT issues" [13]. Smaller companies have an advantage because they can often find all three necessary aspects in a single person or across two people, while larger companies need three different organizations working together [13].

### 2. Model Context Protocol (MCP): Giving AI Access to Your Systems

The Model Context Protocol (MCP) specification was widely adopted in early 2025, with OpenAI, Anthropic, and Mistral all rolling out API-level support within eight days of each other [16]. MCP allows AI systems to access your tools and data without manual copy-paste, creating a standardized way for models to interact with external systems.

This month, we saw MCP implementations mature as leaders realized its true value isn't technical integration but strategic context management. The protocol enables leaders to decide what systems AI can access, when, and with what permissions - essentially creating a framework for context orchestration at scale [16].

### 3. Retrieval-Augmented Generation (RAG): Surfacing Relevant Knowledge

Vector databases like Weaviate continued to evolve, with Weaviate 1.35 introducing features like Object Time-to-Live (TTL) for automatic deletion of objects after a specified time period [18]. This represents a critical evolution in how organizations manage their knowledge bases for AI retrieval.

The breakthrough insight is that RAG isn't just about technical implementation but about strategic decisions regarding what knowledge to make available to AI systems and when. Weaviate's new operational modes allow organizations to "control what types of operations each node can handle," particularly useful for load balancing, maintenance operations, scaling scenarios, and backup creation [18].

### 4. Memory Systems: Making Organizational Knowledge Searchable

Weaviate 1.35 expanded to support multimodal document embeddings, making it easier to build powerful document retrieval applications [18]. This enables organizations to make their document repositories searchable by AI systems in more sophisticated ways.

The key insight for leaders is that these aren't just technical features but strategic tools for deciding what organizational memory to make available to AI systems. By implementing vector databases with appropriate controls, leaders can make their organizational knowledge searchable while maintaining appropriate access controls [18].

## Practical Applications: Context Orchestration in Action

### Coding Agents as Context Orchestration Training Grounds

This month saw multiple examples of coding agents being used not just for code production but as training grounds for context orchestration skills:

1. **Jaana Dogan at Google** gave Claude Code a three-paragraph description of a distributed agent orchestrator problem, and it generated in an hour what Google had built over the past year [3]. The key wasn't the model's raw capability but Dogan's ability to provide the right context in those three paragraphs.

2. **Simon Willison** used Claude Code to port the MicroQuickJS C library to Python using only his iPhone [16]. This demonstrates how effective context orchestration can happen even on mobile devices with limited interfaces.

3. **Boris Cherny** landed 259 PRs and made 497 commits in thirty days using Claude Code + Opus 4.5 [32]. This extraordinary productivity wasn't about typing speed but about Cherny's skill in managing the context available to his AI assistant.

### Cooking as Context Orchestration Practice

Simon Willison demonstrated how context orchestration skills transfer across domains by using Claude to create a custom application for timing a complicated meal preparation [37]. By providing Claude with photos of recipe cards and specific requirements, he was able to generate a functional cooking timer application that successfully coordinated the preparation of two complex recipes simultaneously [37].

This example shows how the meta-skill of context orchestration transfers across domains - whether you're building software or cooking dinner, the key is providing the right context at the right time to your AI assistant.

## Tensions & Tradeoffs in Context Orchestration

### 1. Process vs. Outcome Orientation

Ben Werdmuller predicts a split in the tech industry between outcome-driven and process-driven people - those excited to test with users faster versus those who derive meaning from the engineering process itself [9]. This tension will define how organizations approach context orchestration: as a means to faster outcomes or as a threat to valued processes.

### 2. Security vs. Accessibility

The author of "2025: The year in LLMs" expresses deep concern about the security implications of AI-enabled browsers, which conflicts with the industry trend of rapidly deploying such tools [16]. This highlights the fundamental tension in context orchestration between giving AI systems access to more context (for better results) and limiting access (for security).

OpenAI is strengthening ChatGPT Atlas against prompt injection attacks using automated red teaming trained with reinforcement learning [28]. This represents the ongoing challenge of balancing AI access to context with security concerns.

### 3. Organizational Coordination Challenges

Will Larson notes that while earlier stage companies can often find domain context, AI experience, and IT knowledge in a single person or across two people, larger companies need three different organizations working together on AI adoption [13]. This coordination requirement makes AI adoption "objectively hard" in larger companies [13].

## Your Context Orchestration Stack: What to Evaluate This Quarter

1. **Context Management Frameworks**: Assess how your organization decides what information to give AI access to and when. Consider formalizing these decisions.

2. **Vector Database Implementation**: Evaluate solutions like Weaviate 1.35 that offer features like multimodal document embeddings and operational modes for controlling access [18].

3. **MCP Integration Strategy**: Determine which systems should be accessible via MCP and with what permissions. The protocol enables strategic context management at scale [16].

4. **Training for Context Orchestration Skills**: Recognize that managing AI agents is "really a management problem" with "teachable skills" [10]. Consider formal training programs for these skills.

5. **Security Protocols**: Implement continuous hardening against prompt injection using approaches like OpenAI's "discover-and-patch loop" [28].

## Conclusion: The Meta-Skill That Creates Leverage

The most important insight from December 2025 is that context orchestration is the meta-skill that creates leverage. As Aaron Levie notes, "By making it far cheaper to take on any type of task that we can possibly imagine, we're ultimately going to be doing far more" [20]. The vast majority of AI tokens in the future will be used on things we don't even do today as workers [20].

The leaders who master context orchestration - deciding what information to give AI access to, when to surface it, and how to structure it - will achieve unprecedented leverage in their organizations. This isn't about technical implementation; it's about strategic decision-making regarding context.

---

## Sources

[1] Simon Willison. (2025, December 30). TIL: Downloading archived Git repositories from archive.softwareheritage.org. Simon Willison's Weblog.

[2] Simon Willison. (2026, January 2). December 2025 sponsors-only newsletter. Simon Willison's Weblog.

[3] Simon Willison. (2026, January 4). Quoting Jaana Dogan. Simon Willison's Weblog.

[4] Simon Willison. (2025, December 30). Quoting Armin Ronacher. Simon Willison's Weblog.

[5] OpenAI Blog. (2026, January 2). Announcing OpenAI Grove Cohort 2. OpenAI Blog.

[6] Sebastian Raschka. (2025, December 30). LLM Research Papers: The 2025 List (July to December). Sebastian Raschka's Blog.

[7] Sebastian Raschka. (2025, December 30). The State Of LLMs 2025: Progress, Problems, and Predictions. Sebastian Raschka's Blog.

[8] Simon Willison. (2025, December 31). Codex cloud is now called Codex web. Simon Willison's Weblog.

[9] Simon Willison. (2026, January 2). Quoting Ben Werdmuller. Simon Willison's Weblog.

[10] Simon Willison. (2026, January 4). Helping people write code again. Simon Willison's Weblog.

[11] Simon Willison. (2026, January 4). Quoting Addy Osmani. Simon Willison's Weblog.

[12] Simon Willison. (2026, January 2). The most popular blogs of Hacker News in 2025. Simon Willison's Weblog.

[13] Simon Willison. (2026, January 2). Quoting Will Larson. Simon Willison's Weblog.

[14] Simon Willison. (2026, January 3). Was Daft Punk Having a Laugh When They Chose the Tempo of Harder, Better, Faster, Stronger? Simon Willison's Weblog.

[15] Simon Willison. (2026, January 4). The November 2025 inflection point. Simon Willison's Weblog.

[16] Simon Willison. (2025, December 31). 2025: The year in LLMs. Simon Willison's Weblog.

[17] Simon Willison. (2026, January 1). Introducing gisthost.github.io. Simon Willison's Weblog.

[18] Weaviate Blog. (2025, December 29). Weaviate 1.35 Release. Weaviate Blog.

[19] Simon Willison. (2025, December 28). actions-latest. Simon Willison's Weblog.

[20] Simon Willison. (2025, December 29). Quoting Aaron Levie. Simon Willison's Weblog.

[21] Simon Willison. (2025, December 29). Quoting Jason Gorman. Simon Willison's Weblog.

[22] Simon Willison. (2025, December 29). shot-scraper 1.9. Simon Willison's Weblog.

[23] Simon Willison. (2025, December 30). Quoting Liz Fong-Jones. Simon Willison's Weblog.

[24] Vicki Boykis. (2025, December 26). Favorite Books of 2025. Vicki Boykis.

[25] Simon Willison. (2025, December 29). Quoting D. Richard Hipp. Simon Willison's Weblog.

[26] Simon Willison. (2025, December 27). textarea.my on GitHub. Simon Willison's Weblog.

[27] Simon Willison. (2025, December 28). Substack Network error = security content they don't allow to be sent. Simon Willison's Weblog.

[28] OpenAI Blog. (2025, December 22). Continuously hardening ChatGPT Atlas against prompt injection. OpenAI Blog.

[29] OpenAI Blog. (2025, December 22). One in a million: celebrating the customers shaping AI's future. OpenAI Blog.

[30] Simon Willison. (2025, December 26). How uv got so fast. Simon Willison's Weblog.

[31] Simon Willison. (2025, December 27). Pluribus training data. Simon Willison's Weblog.

[32] Simon Willison. (2025, December 27). Quoting Boris Cherny. Simon Willison's Weblog.

[33] Simon Willison. (2025, December 23). Quoting Salvatore Sanfilippo. Simon Willison's Weblog.

[34] Vicki Boykis. (2025, December 22). 2025 in review. Vicki Boykis.

[35] Simon Willison. (2025, December 24). uv-init-demos. Simon Willison's Weblog.

[36] Simon Willison. (2025, December 22). Using Claude in Chrome to navigate out the Cloudflare dashboard. Simon Willison's Weblog.

[37] Simon Willison. (2025, December 23). Cooking with Claude. Simon Willison's Weblog.

[38] Simon Willison. (2025, December 23). MicroQuickJS. Simon Willison's Weblog.

[39] Simon Willison. (2025, December 25). A new way to extract detailed transcripts from Claude Code. Simon Willison's Weblog.

[40] Simon Willison. (2025, December 26). How Rob Pike got spammed with an AI slop "act of kindness". Simon Willison's Weblog.
