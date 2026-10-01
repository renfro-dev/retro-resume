---
title: AI Development Tools Accelerate Software Creation and Preservation
slug: systems_thinking-weekly-2025-12-29
category: systems_thinking
period_type: weekly
period_start_date: 2025-12-29
period_end_date: 2026-01-04
published_at: "2026-01-04T16:00:00"
word_count: 1250
reading_time_minutes: 6
source_file: briefs/systems_thinking/weekly_brief_2025-12-29.md
---

## Executive Summary

This week's developments highlight how AI tools are transforming software development by automating tedious tasks while preserving the creative problem-solving aspects that developers value. The emergence of powerful coding agents like Claude Code and OpenAI's Codex is enabling developers to accomplish in hours what previously took months [3]. Meanwhile, digital preservation tools are ensuring valuable open-source software doesn't disappear when repositories are abandoned [1]. These developments matter because they represent a fundamental shift in how software is created, maintained, and preserved—potentially democratizing access to development capabilities while ensuring long-term sustainability of digital resources.

Key developments include a Google engineer's revelation about Claude Code generating a distributed agent orchestrator in an hour that matched what Google built over a year [3], OpenAI's rebranding of "Codex cloud" to "Codex web" [8], and new tools for retrieving archived repositories from Software Heritage [1]. Additionally, Weaviate released version 1.35 with significant enhancements to its vector database capabilities [9], and OpenAI announced applications for the second cohort of its Grove founder program [5].

## Key Developments

### AI Coding Agents Dramatically Accelerate Development

AI coding agents are demonstrating remarkable capabilities in generating complex software systems with minimal human input. Jaana Dogan, a Principal Engineer at Google, revealed that Claude Code generated in an hour what Google had been trying to build for a year—a distributed agent orchestrator [3]. Dogan noted that she provided Claude Code with just "a three paragraph description" that contained "no real details" due to proprietary constraints, yet it produced a working system comparable to Google's internal development [3]. This suggests AI coding agents can now generate complex distributed systems with minimal prompting.

The field of AI coding agents continues to evolve rapidly, with OpenAI quietly rebranding its "Codex cloud" product to "Codex web" [8]. According to Thibault Sottiaux, OpenAI's Codex engineering lead, this change was made to "align the documentation with how folks refer to it" [8]. OpenAI now differentiates between "cloud tasks" (which run on their hosted runtime and include features like code review and GitHub integration) and "Codex web" (the web application interface) [8]. The company also uses the term "Codex iOS" for the version in their iPhone app [8].

These developments align with programmer Armin Ronacher's observation that AI tools are transforming software development by removing tedious labor while preserving the intellectual challenge: "The puzzle is still there. What's gone is the labor... The thinking remains; the hitting of the keys and the frustrating is what's been removed" [4]. Ronacher specifically noted that AI tools eliminate frustrating tasks like "hitting keys, writing minimal repro cases with little insight, digging through debug logs, or trying to decipher some obscure AWS IAM permission error" [4].

### Digital Preservation Tools Ensure Software Sustainability

New tools are emerging to address the challenge of preserving valuable open-source software when repositories disappear. Simon Willison discovered that the UK government's Department for Business and Trade had released a useful Python library called sqlite-s3vfs (for accessing SQLite databases hosted in S3 buckets) as MIT-licensed open source, but the GitHub repository had disappeared [1]. Fortunately, Willison found that the Software Heritage archive had preserved a complete copy of the repository [1].

Finding the process of retrieving archives from Software Heritage "non-obvious," Willison created and published a new tool called "Software Heritage Repository Retriever" to simplify the process [1]. This tool leverages Software Heritage's CORS-enabled APIs to make retrieval easier [1]. Willison was able to restore the repository and archive it at simonw/sqlite-s3vfs, ensuring this valuable taxpayer-funded open-source software remains available [1].

This development highlights the growing importance of digital preservation infrastructure like Software Heritage in maintaining access to valuable software resources, even when the original repositories are removed or abandoned [1].

### Vector Database Enhancements Support Advanced AI Applications

Weaviate released version 1.35 of its vector database this week with several significant enhancements that support more sophisticated AI applications [9]. The release introduces Object Time-to-Live (TTL) as a technical preview, enabling automatic deletion of objects after a specified time period—a feature that helps maintain clean data stores, comply with retention policies, and reduce storage costs [9]. This feature is currently available only for self-hosted Weaviate instances, not yet for Weaviate Cloud instances [9].

The release also makes the Java v6 client generally available, providing "a modern, idiomatic API that makes working with Weaviate more intuitive and enjoyable for Java developers" [9]. Additionally, the flat index with RQ quantization, previously introduced as a preview, is now generally available [9]. This feature allows developers to configure different levels of vector compression, from 8-bit quantization for high recall to 1-bit quantization for maximum compression [9].

Other enhancements include zstd compression support for backups (offering better compression performance compared to the default gzip), operational modes for controlling node operations (useful for load balancing, maintenance, scaling, and backup creation), and expanded Weaviate Embeddings to support multimodal document embeddings [9]. The release also enhances security flexibility by making OIDC authentication settings runtime-configurable, allowing updates to certificates and authentication parameters without restarting Weaviate instances [9].

### AI Founder Support Programs Expand

OpenAI announced that applications are now open for the second cohort of its Grove founder program [5]. This 5-week program is designed for individuals at any stage of development, from pre-idea to product [5]. Participants receive $50,000 in API credits, early access to AI tools, and hands-on mentorship from the OpenAI team [5]. This program represents OpenAI's continued investment in fostering the AI startup ecosystem and helping founders leverage its technology [5].

## Tensions & Conflicts

There appears to be some skepticism about the capabilities of coding agents, despite the impressive results reported by Google's Jaana Dogan. Simon Willison acknowledges this skepticism while suggesting that people should test coding agents in domains they know well to form their own opinions [3]. This tension between skepticism and reported successes suggests the field is still evolving, with varying experiences depending on use cases and implementation details.

Within Google itself, there seems to be a lack of consensus on approaches to distributed agent orchestrators. Dogan noted, "There are various options, not everyone is aligned..." [3], indicating internal disagreement about the best technical approach. This reflects broader uncertainty in the industry about optimal architectures for agent systems.

Additionally, there's an implicit tension between the quality and refinement of AI-generated code. While Dogan was impressed by Claude Code's ability to generate a complex system quickly, she also noted, "It's not perfect and I'm iterating on it but this is where we are right now" [3]. This suggests that while AI coding agents can produce impressive results rapidly, human refinement is still necessary for production-quality systems.

## Source Cards

[1] Willison, S. (2025, December 30). TIL: Downloading archived Git repositories from archive.softwareheritage.org. Simon Willison's Weblog. https://simonwillison.net/2025/Dec/30/software-heritage/#atom-everything

[2] Willison, S. (2026, January 2). December 2025 sponsors-only newsletter. Simon Willison's Weblog. https://simonwillison.net/2026/Jan/2/december/#atom-everything

[3] Willison, S. (2026, January 4). Quoting Jaana Dogan. Simon Willison's Weblog. https://simonwillison.net/2026/Jan/4/jaana-dogan/#atom-everything

[4] Willison, S. (2025, December 30). Quoting Armin Ronacher. Simon Willison's Weblog. https://simonwillison.net/2025/Dec/30/armin-ronacher/#atom-everything

[5] OpenAI Blog. (2026, January 2). Announcing OpenAI Grove Cohort 2. OpenAI Blog. https://openai.com/index/openai-grove

[6] Raschka, S. (2025, December 30). LLM Research Papers: The 2025 List (July to December). Sebastian Raschka's Blog. https://sebastianraschka.com/blog/2025/llm-research-papers-2025-part2.html

[7] Raschka, S. (2025, December 30). The State Of LLMs 2025: Progress, Problems, and Predictions. Sebastian Raschka's Blog. https://sebastianraschka.com/blog/2025/state-of-llms-2025.html

[8] Willison, S. (2025, December 31). Codex cloud is now called Codex web. Simon Willison's Weblog. https://simonwillison.net/2025/Dec/31/codex-cloud-is-now-called-codex-web/#atom-everything

[9] Weaviate Blog. (2025, December 29). Weaviate 1.35 Release. Weaviate Blog. https://weaviate.io/blog/weaviate-1-35-release
