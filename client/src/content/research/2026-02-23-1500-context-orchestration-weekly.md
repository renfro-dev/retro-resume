---
title: "Context Orchestration: When Security Meets Scale"
slug: context_orchestration-weekly-2026-02-17
category: context_orchestration
period_type: weekly
period_start_date: 2026-02-17
period_end_date: 2026-02-23
published_at: "2026-02-23T15:00:00"
word_count: 1686
reading_time_minutes: 8
source_file: briefs/context_orchestration/weekly_brief_2026-02-17.md
---

This week's developments reveal a fundamental shift in how organizations approach context orchestration. The challenge isn't just giving AI access to information—it's deciding what context to surface, to whom, and under what conditions. From Weaviate's security framework to LangChain's harness engineering, the meta-skill emerging is **controlled context exposure**: orchestrating information access while maintaining security boundaries.

## The Security Layer of Context Orchestration

Weaviate's new authentication and authorization guide exposes a critical context orchestration question: how do you give AI systems access to organizational knowledge without creating security nightmares? The horror stories are real—an intern accidentally exposes customer PII through a search API, or an agentic application deletes an entire production database [1]. These aren't just security failures; they're context orchestration failures.

The solution requires thinking about context access in layers. A collection containing product information should be treated differently from one containing customer service conversations [1]. This is context orchestration at its most practical: deciding not just what information to make available, but establishing different access levels for different contexts. A search API should read product information but not write, while a data scientist may access development data but not production [1].

What makes this a context orchestration challenge rather than just a security problem? Vector databases now contain embeddings of sensitive customer data, proprietary documents, and regulated information [1]. When you give an AI agent access to these embeddings, you're not just sharing data—you're providing semantic understanding of your entire knowledge base. The stakes for context curation have never been higher.

## Agent Skills as Context Templates

The proliferation of coding agents has created a new problem: while tools like Claude Code, Cursor, and GitHub Copilot excel at general tasks, they struggle with specialized infrastructure [2]. Agents hallucinate legacy syntax, guess at parameters, or fail to implement efficient strategies [2]. This isn't a model capability problem—it's a context orchestration problem.

Enter Agent Skills, developed by Anthropic and now adopted across Claude Code, Cursor, GitHub Copilot, and other tools [2]. These aren't just documentation; they're context orchestration templates that teach agents how to work with specific systems. When you tell an agent to "Create a Weaviate collection for my JSON data called 'Products'" [2], the skill provides the exact context needed for successful execution.

This represents a shift in how we think about context. Instead of dumping documentation into an agent's context window, Agent Skills provide structured, actionable context that agents can immediately use. It's the difference between giving someone a manual and giving them a checklist—both contain information, but only one provides immediately actionable context.

## Harness Engineering: The Meta-Skill of Context Control

LangChain's breakthrough on Terminal Bench 2.0—jumping from Top 30 to Top 5 by only changing the harness [3]—demonstrates that context orchestration is becoming a competitive advantage. They improved their coding agent from 52.8 to 66.5 on the benchmark without changing the model, just by engineering better context management [3].

The key insight: today's models are "exceptional self-improvement machines" [3], but only when given the right context at the right time. The most common failure pattern was agents writing solutions, re-reading their own code, confirming it looked okay, and stopping [3]. The solution? Deterministic context injection through middleware that intercepts agents before they exit and reminds them to verify their work [3].

This is context orchestration as a design pattern. LocalContextMiddleware maps the working directory at agent start [3]. LoopDetectionMiddleware tracks per-file edit counts to prevent doom loops [3]. Each middleware component orchestrates specific context at specific moments, creating what they call a "reasoning sandwich" [3].

## Production Context: Learning What You Don't Know

Monday Service's experience building AI service agents reveals another dimension of context orchestration: the gap between development and production contexts. They made evaluation a "Day 0 requirement" [4] rather than treating it as a last-mile check, achieving 8.7x faster evaluation feedback loops [4].

The challenge with ReAct agents is that each reasoning step depends on the last—a minor deviation can cascade into incorrect outcomes [4]. Their solution was to build a dual-layer evaluation system: offline evaluations as a "safety net" using curated datasets, and online evaluations as a "monitor" for real-time performance [4].

This highlights a crucial aspect of context orchestration: you don't know what context matters until you see how agents behave in production. Monday Service started with just 30 sanitized IT tickets covering common categories like access management and VPN issues [4], then expanded based on what they learned from production usage.

## The Agent Builder Evolution: Context Through Conversation

LangSmith's Agent Builder update this week fundamentally reimagines how context gets transferred to agents. Instead of prompt engineering and if/then logic, the new approach lets you work with agents "like working with a teammate" [5]. You can ask "What are my open Linear tickets?" or "Summarize today's requests in #support" [5], and the agent accesses every tool connected to your workspace.

The breakthrough is in how context accumulates. Any conversation can be converted into a reusable agent by selecting "Turn this conversation into a reusable agent" [5]. The agent learns from the conversation itself, extracting the context needed to repeat similar tasks. This is context orchestration through demonstration rather than configuration.

Memory management becomes explicit in this model. Agent Builder uses standard Markdown files for memory storage [6], with short-term memory lasting for a single conversation and long-term memory persisting across sessions [6]. Skills are loaded selectively—only when tasks call for them [6]. This addresses a critical warning: "More context isn't always better. An agent trying to hold onto everything at once can lose focus on what matters for the current task" [6].

## Observability as Context Discovery

LangChain's analysis of agent observability reveals why traditional software monitoring fails for AI systems. Pre-LLMs, software was deterministic—same input, same output [7]. AI agents break this assumption. The source of truth shifts from code to traces showing what agents actually did [7].

Agent traces can reach hundreds of megabytes for complex, long-running agents [7]. This isn't just logging—it's capturing the entire context flow through an agent's decision-making process. When an agent takes 200 steps over two minutes and makes a mistake, there's no stack trace because no code failed [7]. The reasoning failed, and understanding why requires examining the context at each decision point.

This changes how we think about production systems. With traditional software, production catches edge cases after comprehensive offline testing. With agents, "production plays a different role" [7]—it reveals failure modes you couldn't predict and shows what correct behavior looks like for real user interactions.

## Tensions & Tradeoffs

Several tensions emerge in context orchestration this week:

**Security vs. Accessibility**: Weaviate's security framework highlights the fundamental tension between making context available to AI systems and protecting sensitive data [1]. Every piece of context you expose increases both capability and risk.

**Context Richness vs. Focus**: Agent Builder's warning that "more context isn't always better" [6] reveals a core tradeoff. Rich context enables sophisticated reasoning but can lead to hallucinations when agents lose focus on the current task.

**Automation vs. Control**: The shift from deterministic software to probabilistic agents [7] creates tension between the desire for autonomous systems and the need for human oversight. Context orchestration must balance giving agents enough information to act independently while maintaining boundaries.

**Speed vs. Understanding**: Nathan Lambert's observation about "cognitive debt" from AI-accelerated development [18] points to a meta-tension: as context orchestration tools make development faster, developers understand less about how their systems actually work.

## Your Context Orchestration Stack

Based on this week's developments, leaders should evaluate:

1. **Security-First Context Design**: How are you controlling which contexts different users and agents can access? Weaviate's approach of role-based access control for vector databases [1] provides a template.

2. **Context Templates**: Are you using Agent Skills or similar patterns to provide structured context to AI systems? The ability to say "Create a Weaviate collection for my JSON data" [2] instead of explaining the entire process represents a new efficiency frontier.

3. **Production Learning Systems**: Do you have mechanisms to learn from production agent behavior? Monday Service's dual-layer evaluation approach [4] shows how to build this capability.

4. **Conversation-Based Context Transfer**: Can your teams create specialized agents through natural conversation? LangSmith's Agent Builder [5] demonstrates this pattern at scale.

5. **Context Observability**: Are you capturing not just what agents do, but the context that led to each decision? The shift from code to traces as source of truth [7] requires new tooling and practices.

The meta-skill emerging across all these developments is **controlled context exposure**—knowing not just what information to make available, but when, to whom, and under what constraints. This week's tools provide the building blocks, but the orchestration remains a human responsibility.

## Sources

[1] [Weaviate Blog. (2026, February 18). Weaviate Authentication & Authorization: A Complete Security Guide](https://weaviate.io/blog/weaviate-security-authn-authz)

[2] [Weaviate Blog. (2026, February 18). Introducing Weaviate Agent Skills](https://weaviate.io/blog/weaviate-agent-skills)

[3] [LangChain Accounts. (2026, February 17). Improving Deep Agents with harness engineering](https://blog.langchain.com/improving-deep-agents-with-harness-engineering/)

[4] [LangChain Accounts. (2026, February 18). monday Service + LangSmith: Building a Code-First Evaluation Strategy from Day 1](https://blog.langchain.com/customers-monday/)

[5] [LangChain Accounts. (2026, February 18). New in Agent Builder: all new agent chat, file uploads + tool registry](https://blog.langchain.com/new-in-agent-builder-all-new-agent-chat-file-uploads-tool-registry/)

[6] [LangChain Accounts. (2026, February 19). How to Use Memory in Agent Builder](https://blog.langchain.com/how-to-use-memory-in-agent-builder/)

[7] [LangChain Accounts. (2026, February 22). Agent Observability Powers Agent Evaluation](https://blog.langchain.com/agent-observability-powers-agent-evaluation/)

[8] [Google DeepMind Blog. (2026, February 17). Accelerating discovery in India through AI-powered science and education](https://deepmind.google/blog/accelerating-discovery-in-india-through-ai-powered-science-and-education/)

[9] [Lambert, N. (2026, February 17). Open models in perpetual catch-up](https://www.interconnects.ai/p/open-models-in-perpetual-catch-up)

[10] [OpenAI Blog. (2026, February 18). Introducing EVMbench](https://openai.com/index/introducing-evmbench)

[11] [OpenAI Blog. (2026, February 18). Introducing OpenAI for India](https://openai.com/index/openai-for-india)

[12] [OpenAI Blog. (2026, February 19). Advancing independent research on AI alignment](https://openai.com/index/advancing-independent-research-ai-alignment)

[13] [OpenAI Blog. (2026, February 20). Our First Proof submissions](https://openai.com/index/first-proof-submissions)

[14] [Boykis, V. (2026, February 21). Querying 3 billion vectors](https://veekaybee.github.io/2026/02/21/querying-3-billion-vectors/)

[15] [Willison, S. (2026, February 16). Rodney and Claude Code for Desktop](https://simonwillison.net/2026/Feb/16/rodney-claude-code/#atom-everything)

[16] [Willison, S. (2026, February 17). Two new Showboat tools: Chartroom and datasette-showboat](https://simonwillison.net/2026/Feb/17/chartroom-and-datasette-showboat/#atom-everything)

[17] [Willison, S. (2026, February 17). Qwen3.5: Towards Native Multimodal Agents](https://simonwillison.net/2026/Feb/17/qwen35/#atom-everything)

[18] [Willison, S. (2026, February 17). Nano Banana Pro diff to webcomic](https://simonwillison.net/2026/Feb/17/release-notes-webcomic/#atom-everything)

[19] [Willison, S. (2026, February 17). Quoting Dimitris Papailiopoulos](https://simonwillison.net/2026/Feb/17/dimitris-papailiopoulos/#atom-everything)
