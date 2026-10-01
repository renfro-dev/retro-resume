---
title: "Context Orchestration Weekly: Deciding What AI Should Remember and Forget"
slug: context_orchestration-weekly-2025-12-29
category: context_orchestration
period_type: weekly
period_start_date: 2025-12-29
period_end_date: 2026-01-04
published_at: "2026-01-04T15:00:00"
word_count: 1267
reading_time_minutes: 6
source_file: briefs/context_orchestration/weekly_brief_2025-12-29.md
---

## Executive Summary: January 4, 2026

This week's developments reveal a critical shift in how high-velocity leaders manage organizational knowledge. The bottleneck isn't AI capability—it's how effectively humans orchestrate context. From Weaviate's new time-based memory management to Google's distributed agent orchestration breakthrough, we're seeing tools that help leaders decide what information to surface when, what to forget, and how to sequence context for maximum decision velocity [3][9].

The most valuable skill isn't technical implementation but context orchestration—curating, sequencing, and surfacing the right information at the right time to AI systems. This week's developments provide practical tools for leaders to build their context orchestration stack.

## 1. Memory Management: The Forgotten Leverage Point

The most overlooked aspect of context orchestration is deciding what to forget. Weaviate's v1.35 release introduces Object Time-to-Live (TTL), allowing automatic deletion of data after specified time periods [9]. This isn't just a technical feature—it's a strategic context management capability that helps leaders:

- Maintain clean data stores by automatically removing outdated information
- Comply with retention policies without manual intervention
- Reduce storage costs by eliminating unnecessary data [9]

The breakthrough is configurable memory management. Leaders can now set objects to expire based on:
1. Creation time (e.g., delete session logs after 24 hours)
2. Last update time (e.g., remove cache data 7 days after last modification)
3. Date properties (e.g., expire events 30 days after they occur) [9]

This represents a fundamental shift in how organizations manage their memory systems. Rather than treating all information as equally valuable forever, leaders can now orchestrate organizational forgetting—a critical but underappreciated aspect of decision velocity [9].

## 2. Context Preservation: Institutional Knowledge Management

While forgetting is strategic, so is preservation. Simon Willison's experience with the disappearing sqlite-s3vfs repository highlights the fragility of organizational knowledge [1]. When the UK government's Department for Business and Trade removed their MIT-licensed Python library from GitHub, the knowledge appeared lost [1].

Willison discovered the Software Heritage archive had preserved a copy, but retrieving it was "non-obvious" [1]. This prompted him to create a Software Heritage Repository Retriever tool to simplify the process [1].

The context orchestration lesson: Leaders must consider not just what information to give AI access to, but how to ensure that information remains accessible over time. The bottleneck isn't AI capability—it's the preservation and retrieval of critical organizational knowledge [1].

## 3. Distributed Agent Orchestration: The Google Breakthrough

Perhaps the most revealing development came from Google Principal Engineer Jaana Dogan, who shared that Google has been working on distributed agent orchestrators for the past year [3]. The breakthrough wasn't technical but in context orchestration approach:

"I gave Claude Code a description of the problem, it generated what we built last year in an hour," Dogan reported [3].

What's remarkable is that Dogan used just "a three paragraph description" as a prompt, containing "no real details" due to proprietary constraints [3]. This demonstrates the power of effective context orchestration—knowing exactly what information to provide to an AI system to achieve the desired outcome [3].

The meta-skill on display isn't coding but context curation—deciding what information to include in a prompt and what to exclude. This is precisely the skill high-velocity leaders need to develop [3].

## 4. Multimodal Document Orchestration

Weaviate's expansion to support multimodal document embeddings represents another context orchestration breakthrough [9]. This capability allows leaders to build document retrieval systems that understand both text and images, making organizational memory searchable across formats [9].

The context orchestration challenge here is deciding which properties contain images and which model to use for document retrieval [9]. Leaders must make strategic decisions about how to structure their information architecture to maximize AI utility [9].

This capability is currently only available on Weaviate Cloud instances, not for self-hosted deployments, highlighting the tension between control and capability in context orchestration decisions [9].

## 5. The Labor-Puzzle Distinction

Armin Ronacher provided a powerful framing for understanding the value of context orchestration:

"The puzzle is still there. What's gone is the labor... The thinking remains; the hitting of the keys and the frustrating is what's been removed." [4]

Ronacher distinguishes between the intellectual challenge of problem-solving (the puzzle) and the mechanical work of implementation (the labor) [4]. AI tools are removing the friction—"hitting keys, writing minimal repro cases with little insight, digging through debug logs, or trying to decipher some obscure AWS IAM permission error" [4].

This reframes how leaders should think about AI adoption. The goal isn't to replace thinking but to eliminate friction that slows down decision velocity [4].

## 6. Operational Modes: Context Access Control

Weaviate's introduction of operational modes provides a powerful context orchestration capability for leaders [9]. This feature allows controlling what types of operations each node can handle, enabling:

- Load balancing by separating read and write traffic
- Maintenance operations by taking nodes offline for writes while serving reads
- Scaling by adding read-only replicas for query workloads
- Creating backups without impacting write performance [9]

The context orchestration lesson: Leaders must consider not just what information AI systems can access, but how that access is structured across their organization [9]. This is particularly relevant for enterprise-wide AI deployments where different teams need different levels of read/write access to organizational knowledge [9].

## Tensions & Tradeoffs

Several key tensions emerged in this week's developments:

1. **Preservation vs. Forgetting**: Leaders must balance preserving institutional knowledge (as seen in the Software Heritage example [1]) with strategic forgetting (as enabled by Weaviate's TTL feature [9]).

2. **Alignment vs. Velocity**: Google's distributed agent orchestrator development showed internal tensions—"There are various options, not everyone is aligned..." [3]—highlighting the challenge of balancing consensus with speed.

3. **Cloud vs. Self-Hosted**: Weaviate's multimodal document embeddings are only available on cloud instances [9], while their TTL feature is only available for self-hosted deployments [9], forcing leaders to choose between control and capability.

4. **Compression vs. Fidelity**: Weaviate's new compression options for backups present a classic context orchestration tradeoff between storage efficiency and information fidelity [9].

## Your Context Orchestration Stack

Based on this week's developments, leaders should evaluate these tools for their context orchestration stack:

1. **Memory Management System**: Implement time-based data retention policies using tools like Weaviate's TTL feature [9]

2. **Knowledge Preservation Strategy**: Consider how to archive critical organizational knowledge using services like Software Heritage [1]

3. **Distributed Agent Framework**: Explore how to orchestrate multiple AI agents working together, following Google's lead [3]

4. **Multimodal Document System**: Plan for document retrieval that understands both text and images [9]

5. **Operational Mode Controls**: Implement systems that allow different levels of read/write access across your organization [9]

The bottleneck isn't AI capability—it's your ability to orchestrate context effectively. These tools provide the foundation for building that meta-skill.

## Sources

[1] Willison, S. (2025, December 30). TIL: Downloading archived Git repositories from archive.softwareheritage.org. Simon Willison's Weblog. https://simonwillison.net/2025/Dec/30/software-heritage/

[2] Willison, S. (2026, January 2). December 2025 sponsors-only newsletter. Simon Willison's Weblog. https://simonwillison.net/2026/Jan/2/december/

[3] Willison, S. (2026, January 4). Quoting Jaana Dogan. Simon Willison's Weblog. https://simonwillison.net/2026/Jan/4/jaana-dogan/

[4] Willison, S. (2025, December 30). Quoting Armin Ronacher. Simon Willison's Weblog. https://simonwillison.net/2025/Dec/30/armin-ronacher/

[5] OpenAI Blog. (2026, January 2). Announcing OpenAI Grove Cohort 2. OpenAI Blog. https://openai.com/index/openai-grove

[6] Raschka, S. (2025, December 30). LLM Research Papers: The 2025 List (July to December). Sebastian Raschka's Blog. https://sebastianraschka.com/blog/2025/llm-research-papers-2025-part2.html

[7] Raschka, S. (2025, December 30). The State Of LLMs 2025: Progress, Problems, and Predictions. Sebastian Raschka's Blog. https://sebastianraschka.com/blog/2025/state-of-llms-2025.html

[8] Willison, S. (2025, December 31). Codex cloud is now called Codex web. Simon Willison's Weblog. https://simonwillison.net/2025/Dec/31/codex-cloud-is-now-called-codex-web/

[9] Weaviate Blog. (2025, December 29). Weaviate 1.35 Release. Weaviate Blog. https://weaviate.io/blog/weaviate-1-35-release
