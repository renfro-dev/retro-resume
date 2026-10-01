---
title: "Context Orchestration: From Code to Traces, From Agents to Leverage"
slug: context_orchestration-weekly-2026-01-12
category: context_orchestration
period_type: weekly
period_start_date: 2026-01-12
period_end_date: 2026-01-18
published_at: "2026-01-18T15:00:00"
word_count: 1316
reading_time_minutes: 7
source_file: briefs/context_orchestration/weekly_brief_2026-01-12.md
---

This week saw incremental progress in context orchestration tools, with Anthropic's Claude Cowork extending agent capabilities to non-developers [[1]](#ref-1) and the AI industry grappling with a fundamental shift in how we understand and debug AI systems [[2]](#ref-2). The most notable development: context is no longer just about what information you give AI—it's about understanding the traces AI leaves behind as it makes decisions.

## The Shift from Code to Traces

Harrison Chase articulated a fundamental reframe this week that changes how leaders should think about AI systems [[2]](#ref-2). In traditional software, code documents the system. In AI agents, the code is just scaffolding—the actual decisions happen in the model at runtime [[2]](#ref-2). This means the source of truth shifts from code to traces: the sequence of steps an agent takes, its reasoning at each step, which tools were called and why [[2]](#ref-2).

For leaders, this represents a critical shift in context orchestration. You're not just managing what context goes INTO your AI systems—you need to manage and understand the context that comes OUT. When an AI agent fails, you don't debug code; you analyze traces to see where the reasoning went wrong [[2]](#ref-2). This requires new tools and new meta-skills.

## Claude Cowork: Context Access Beyond Developers

Anthropic released Claude Cowork this week, described as "Claude Code for the rest of your work" [[1]](#ref-1). Currently available only to Max subscribers ($100-$200/month), Cowork extends Claude's capabilities beyond coding to general work tasks [[1]](#ref-1). The system can access files you grant permission to, search the web, and provide recommendations based on complex queries [[1]](#ref-1).

Simon Willison tested Cowork with a revealing prompt: analyze blog drafts from the last three months, check if they were published online, and suggest which are closest to ready [[1]](#ref-1). Cowork executed system commands, ran 44 individual searches against his website, and provided useful recommendations [[1]](#ref-1). This demonstrates sophisticated context orchestration—not just accessing files, but understanding relationships between local and web content.

The security architecture reveals important context management principles. Files are mounted into a containerized environment, and Cowork runs in a filesystem sandbox by default [[1]](#ref-1). Anthropic warns about prompt injection risks, acknowledging they cannot guarantee protection against future attacks [[1]](#ref-1). This surfaces a key tension in context orchestration: the more context you provide, the greater the security risk.

## The Meta-Skill of Model Selection

Nathan Lambert highlighted another dimension of context orchestration this week: using multiple models for different tasks [[4]](#ref-4). He uses GPT 5.2 Pro for research accuracy, Claude Opus 4.5 for editing and data processing, and occasionally Grok for X-specific information [[4]](#ref-4). The key insight: "AI is jagged"—models have strong capabilities spread unevenly across tasks [[4]](#ref-4).

Lambert's workflow demonstrates advanced context orchestration. When one model gets stuck, he passes the same query to another [[4]](#ref-4). He values intelligence over speed because many tasks are "just starting to be possible" with current models [[4]](#ref-4). This multi-model approach requires leaders to understand not just what context to provide, but which AI system to provide it to.

## Enterprise Context at Scale

OpenAI announced several enterprise deployments this week that highlight organizational context management challenges. ChatGPT Health connects health data and apps with privacy protections and physician-informed design [[5]](#ref-5). OpenAI for Healthcare enables HIPAA-compliant AI that reduces administrative burden while supporting clinical workflows [[7]](#ref-7).

Netomi's approach to scaling enterprise AI agents combines concurrency, governance, and multi-step reasoning using GPT-4.1 and GPT-5.2 [[8]](#ref-8). Datadog uses Codex for system-level code review [[9]](#ref-9). These deployments raise a critical question: how do you manage context access for thousands of employees while maintaining security and compliance?

## The Sandboxing Revolution

Simon Willison highlighted Luis Cardoso's guide to sandboxing as essential reading this week [[10]](#ref-10). The guide differentiates between containers (which share the host kernel), microVMs (with their own guest kernel), and WebAssembly/isolates (which constrain everything within a runtime) [[10]](#ref-10). Willison calls sandboxing "one of the most important problems to solve in 2026" [[10]](#ref-10).

This connects directly to context orchestration. As Willison predicts in his 2026 forecast, sandboxing will finally be "solved" this year through technologies like containers and WebAssembly [[14]](#ref-14). This enables a new level of context richness—you can give AI access to more systems and data because you can contain the risks.

## Tensions & Tradeoffs

This week's developments surface several context orchestration tensions:

**Security vs. Capability**: Anthropic's warnings about prompt injection in Cowork highlight this fundamental tradeoff [[1]](#ref-1). The more context you provide, the more attack surface you create. As Willison notes, asking regular users to "watch out for suspicious actions that may indicate prompt injection" is unrealistic [[1]](#ref-1).

**Speed vs. Intelligence**: Lambert's preference for slower but smarter models reflects another tradeoff [[4]](#ref-4). He predicts that as capabilities diffuse in 2026, speed will become more important [[4]](#ref-4). Leaders must decide: do you need the right answer eventually, or a good-enough answer immediately?

**Trace Analysis vs. Privacy**: Chase's framework requires capturing and analyzing traces of AI decisions [[2]](#ref-2). But these traces contain sensitive information about user queries, business logic, and decision patterns. How do you balance the need for observability with privacy requirements?

**Model Diversity vs. Simplicity**: Lambert uses multiple models but acknowledges this creates complexity [[4]](#ref-4). Each model requires different context formatting, has different strengths, and costs different amounts. Is the leverage worth the orchestration overhead?

## Your Context Orchestration Stack

Based on this week's developments, leaders should evaluate:

1. **Trace Infrastructure**: Do you have tools to capture, search, and analyze AI decision traces? As Chase notes, you need structured tracing that shows full reasoning chains, tool calls, timing, and costs [[2]](#ref-2).

2. **Multi-Model Strategy**: Are you locked into one AI provider, or can you route different contexts to different models based on their strengths? Lambert's approach shows the value of model diversity [[4]](#ref-4).

3. **Sandboxing Architecture**: What isolation technology protects your systems when giving AI broader access? Understanding the tradeoffs between containers, microVMs, and WebAssembly becomes critical [[10]](#ref-10).

4. **Security Monitoring**: How do you detect prompt injections and other context manipulation attempts? Can your team realistically monitor for "suspicious actions" as Anthropic suggests [[1]](#ref-1)?

5. **Context Governance**: For enterprise deployments, who decides which employees get access to which organizational context through AI? The healthcare examples show this isn't just a technical question [[5]](#ref-5)[[7]](#ref-7).

The shift from code to traces represents more than a technical change—it's a fundamental reorientation of how we understand and manage AI systems. Leaders who master trace-based debugging and multi-model orchestration will have significant leverage over those still thinking in terms of single models and static prompts. The tools are evolving rapidly, but the meta-skill remains constant: deciding what context to surface, when to surface it, and how to understand what your AI does with it.

## Sources

<a id="ref-1"></a>[1] [Willison, S. (2026, January 12). First impressions of Claude Cowork, Anthropic's general agent](https://simonwillison.net/2026/Jan/12/claude-cowork/#atom-everything)

<a id="ref-2"></a>[2] [Chase, H. (2026, January 10). In software, the code documents the app. In AI, the traces do.](https://blog.langchain.com/in-software-the-code-documents-the-app-in-ai-the-traces-do/)

<a id="ref-3"></a>[3] [Lambert, N. (2026, January 9). Claude Code Hits Different](https://www.interconnects.ai/p/claude-code-hits-different)

<a id="ref-4"></a>[4] [Lambert, N. (2026, January 11). Use multiple models](https://www.interconnects.ai/p/use-multiple-models)

<a id="ref-5"></a>[5] [OpenAI Blog. (2026, January 7). Introducing ChatGPT Health](https://openai.com/index/introducing-chatgpt-health)

<a id="ref-6"></a>[6] [OpenAI Blog. (2026, January 7). How Tolan builds voice-first AI with GPT-5.1](https://openai.com/index/tolan)

<a id="ref-7"></a>[7] [OpenAI Blog. (2026, January 8). OpenAI for Healthcare](https://openai.com/index/openai-for-healthcare)

<a id="ref-8"></a>[8] [OpenAI Blog. (2026, January 8). Netomi's lessons for scaling agentic systems into the enterprise](https://openai.com/index/netomi)

<a id="ref-9"></a>[9] [OpenAI Blog. (2026, January 9). Datadog uses Codex for system-level code review](https://openai.com/index/datadog)

<a id="ref-10"></a>[10] [Willison, S. (2026, January 6). A field guide to sandboxes for AI](https://simonwillison.net/2026/Jan/6/a-field-guide-to-sandboxes-for-ai/#atom-everything)

<a id="ref-11"></a>[11] [Willison, S. (2026, January 7). Quoting Robin Sloan](https://simonwillison.net/2026/Jan/7/robin-sloan/#atom-everything)

<a id="ref-12"></a>[12] [Lambert, N. (2026, January 7). 8 plots that explain the state of open models](https://www.interconnects.ai/p/8-plots-that-explain-the-state-of)

<a id="ref-13"></a>[13] [Willison, S. (2026, January 8). How Google Got Its Groove Back and Edged Ahead of OpenAI](https://simonwillison.net/2026/Jan/8/how-google-got-its-groove-back/#atom-everything)

<a id="ref-14"></a>[14] [Willison, S. (2026, January 8). LLM predictions for 2026, shared with Oxide and Friends](https://simonwillison.net/2026/Jan/8/llm-predictions-for-2026/#atom-everything)
