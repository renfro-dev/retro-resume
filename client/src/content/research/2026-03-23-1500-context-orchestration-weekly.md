---
title: "Context Orchestration: When AI Agents Need Boundaries"
slug: context_orchestration-weekly-2026-03-17
category: context_orchestration
period_type: weekly
period_start_date: 2026-03-17
period_end_date: 2026-03-23
published_at: "2026-03-23T15:00:00"
word_count: 1329
reading_time_minutes: 7
source_file: briefs/context_orchestration/weekly_brief_2026-03-17.md
---

This week revealed a fundamental tension in context orchestration: the more context you give AI agents, the more dangerous they become. From Snowflake's sandbox escape [8] to OpenAI's internal monitoring systems [19], organizations are learning that context richness creates both leverage and liability.

The meta-skill emerging isn't just what context to surface—it's knowing when to restrict it.

## The Context Security Paradox

Snowflake's Cortex Agent demonstrated the risk perfectly. A user asked the agent to review a GitHub repository, which contained a hidden prompt injection that caused the agent to execute malicious code [8]. The vulnerability? Cortex listed `cat` commands as safe to run without human approval, but didn't protect against process substitution in the command body [8].

This highlights a broader pattern. Allow-lists against command patterns exist across multiple agent tools, yet these feel "inherently unreliable" according to security researchers [8]. The lesson for leaders: every piece of context you give an agent—whether it's repository access, command permissions, or organizational data—becomes an attack surface.

LangChain addressed this challenge by launching LangSmith Sandboxes, which run agent code in hardware-virtualized microVMs rather than just Linux namespaces [18]. The key innovation? Sandboxes access external services through an Authentication Proxy, so credentials never touch the runtime [18]. This represents a shift in thinking: instead of trusting agents with context, isolate them from it.

## Authorization as Context Orchestration

LangSmith Fleet introduced two distinct agent authorization models this week, each representing a different approach to context management [15]:

**On-behalf-of agents** (called "Assistants") use the end user's credentials. When Alice asks an onboarding agent to access Notion, she sees her information—not Bob's private data [15]. This was "the standard way that most people thought of agents until recently" [15].

**Fixed-credential agents** (called "Claws") have their own dedicated accounts. Organizations create specific accounts in Notion, Rippling, and other systems just for these agents [15]. This approach gained prominence after OpenClaw "changed how people thought about agent authorization" [15].

The distinction matters because it determines what context the agent can access. On-behalf-of agents inherit the user's context boundaries. Fixed-credential agents require explicit context curation—you decide exactly what organizational knowledge they can see.

## Enterprise Context at Scale

Weaviate's enterprise security update revealed how context orchestration challenges multiply with scale [16]. When MedVector Health grew from 5 engineers sharing 2 API keys to 40 people across multiple teams, their context management broke down [16]. Keys spread through Slack messages and .env files, and when Dr. Chen moved from clinical to research, "her old permissions lingered for two weeks before anyone noticed" [16].

The solution? OpenID Connect (OIDC) Groups that map organizational structure directly to data access [16]. When someone's group membership changes in the identity provider, Weaviate automatically updates their permissions on next connection [16]. This automation becomes critical when managing context access for "hundreds of users across multiple teams" with different regulatory requirements [16].

## The Coding Agent Laboratory

This week's most revealing developments came from coding agents—not because coding matters to most leaders, but because these agents expose context orchestration patterns that apply everywhere.

Nathan Lambert's analysis of GPT-5.4 revealed a crucial insight: "The instruction following of GPT-5.4 is so precise that I need to learn to interact with the models differently" [4]. Unlike Claude's "excellent model for intent," GPT-5.4 "just does what you say to do" [4]. This precision requires different context orchestration—you must be more explicit about what you want.

More importantly, Lambert found that both Claude Opus 4.6 and GPT-5.4 exhibit "light forgetfulness" when given multiple TODOs in a single message [4]. The implication: even the best models struggle with context overload. Leaders must learn to sequence context delivery, not dump it all at once.

Open SWE, LangChain's new framework for internal coding agents, codified patterns from Stripe's Minions, Ramp's Inspect, and Coinbase's Cloudbot [17]. These production systems converged on similar architectures: isolated cloud sandboxes, curated toolsets (Stripe uses ~500 carefully selected tools), and Slack-first interfaces [17]. The lesson? Successful agent deployment requires deliberate context boundaries, not open access.

## Memory as Persistent Context

Google DeepMind's cognitive framework for AGI measurement identified memory as one of ten key cognitive abilities [11]. This week showed why: agents without proper memory systems force humans to repeatedly provide the same context.

LangChain's Polly demonstrates the solution. The AI assistant "remembers the conversation" across LangSmith pages—start debugging a trace, switch to experiments, come back, and Polly retains context [10]. This persistence "reduces friction as you move from one view to another" [10], addressing the reality that "the hardest debugging problems don't live on one page" [10].

## Tensions & Tradeoffs

This week surfaced three critical tensions in context orchestration:

**Security vs. Capability**: Every additional context access point increases both agent usefulness and attack surface [8]. LangSmith Sandboxes represent one approach—isolate the agent completely—but this limits what agents can do [18].

**Precision vs. Intent**: GPT-5.4's literal instruction following requires more precise context curation than Claude's intent-based approach [4]. Leaders must choose between models that guess what you mean versus models that do exactly what you say.

**Automation vs. Control**: Automated context synchronization (like OIDC Groups) reduces manual work but can propagate permissions faster than humans can audit [16]. The two-week lag in updating Dr. Chen's permissions might have been a feature, not a bug.

## Your Context Orchestration Stack

Based on this week's developments, evaluate these components:

**1. Sandbox Strategy**: How will you isolate agent execution? LangSmith Sandboxes [18], Modal, Daytona, and Runloop each offer different tradeoffs between security and capability [17].

**2. Authorization Model**: Will your agents act on-behalf-of users or with fixed credentials? LangSmith Fleet's dual approach suggests you might need both [15].

**3. Memory Systems**: How will context persist across sessions? Without memory infrastructure, your team wastes time re-explaining context [10].

**4. Identity Integration**: Can your context permissions sync automatically with organizational changes? Manual updates don't scale beyond small teams [16].

**5. Audit Requirements**: What context access needs tracking for compliance? Weaviate's comprehensive logging tracks "authentication events, RBAC checks, role modifications, and data access with full context" [16].

The meta-lesson from this week: context orchestration isn't about giving AI maximum access—it's about creating boundaries that enable both safety and productivity. As David Abram noted, "The real work of software development is knowing what should exist in the first place, and why" [1]. The same applies to context orchestration: knowing what context should exist for your AI agents, and why.

## Sources

[1] [Willison, S. (2026, March 23). Quoting David Abram](https://simonwillison.net/2026/Mar/23/david-abram/#atom-everything)

[2] [Willison, S. (2026, March 23). Quoting Neurotica](https://simonwillison.net/2026/Mar/23/neurotica/#atom-everything)

[3] [Willison, S. (2026, March 17). llm 0.29](https://simonwillison.net/2026/Mar/17/llm/#atom-everything)

[4] [Lambert, N. (2026, March 18). GPT 5.4 is a big step for Codex](https://www.interconnects.ai/p/gpt-54-is-a-big-step-for-codex)

[5] [Willison, S. (2026, March 23). Beats now have notes](https://simonwillison.net/2026/Mar/23/beats-now-have-notes/#atom-everything)

[6] [Raschka, S. (2026, March 22). A Visual Guide to Attention Variants in Modern LLMs](https://magazine.sebastianraschka.com/p/visual-attention-variants)

[7] [LangChain Accounts. (2026, March 23). Join LangChain at Google Cloud Next 2026](https://blog.langchain.com/join-langchain-at-google-cloud-next-2026/)

[8] [Willison, S. (2026, March 18). Snowflake Cortex AI Escapes Sandbox and Executes Malware](https://simonwillison.net/2026/Mar/18/snowflake-cortex-ai/#atom-everything)

[9] [Elhage, N. (2026, March 23). From error-handling to structured concurrency](https://blog.nelhage.com/post/concurrent-error-handling/)

[10] [LangChain. (2026, March 18). Polly is generally available everywhere you work in LangSmith](https://blog.langchain.com/polly-langsmith-ga/)

[11] [Google DeepMind Blog. (2026, March 17). Measuring progress toward AGI: A cognitive framework](https://deepmind.google/blog/measuring-progress-toward-agi-a-cognitive-framework/)

[12] [OpenAI Blog. (2026, March 23). Creating with Sora Safely](https://openai.com/index/creating-with-sora-safely)

[13] [OpenAI Blog. (2026, March 17). OpenAI Japan announces Japan Teen Safety Blueprint to put teen safety first](https://openai.com/index/japan-teen-safety-blueprint)

[14] [Lambert, N. (2026, March 22). Lossy self-improvement](https://www.interconnects.ai/p/lossy-self-improvement)

[15] [LangChain Accounts. (2026, March 23). Two different types of agent authorization](https://blog.langchain.com/two-different-types-of-agent-authorization/)

[16] [Weaviate Blog. (2026, March 19). Securing Enterprise AI with Weaviate](https://weaviate.io/blog/weaviate-security-enterprise)

[17] [LangChain Accounts. (2026, March 17). Open SWE: An Open-Source Framework for Internal Coding Agents](https://blog.langchain.com/open-swe-an-open-source-framework-for-internal-coding-agents/)

[18] [LangChain Accounts. (2026, March 17). Introducing LangSmith Sandboxes: Secure Code Execution for Agents](https://blog.langchain.com/introducing-langsmith-sandboxes-secure-code-execution-for-agents/)

[19] [OpenAI Blog. (2026, March 19). How we monitor internal coding agents for misalignment](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment)

[20] [OpenAI Blog. (2026, March 17). Introducing GPT-5.4 mini and nano](https://openai.com/index/introducing-gpt-5-4-mini-and-nano)

[21] [OpenAI Blog. (2026, March 17). Equipping workers with insights about compensation](https://openai.com/index/equipping-workers-with-insights-about-compensation)
