---
title: "Holiday Open-Model Releases Rival Proprietary Systems"
slug: systems_thinking-weekly-2026-01-05
category: systems_thinking
period_type: weekly
period_start_date: 2026-01-05
period_end_date: 2026-01-11
published_at: "2026-01-11T16:00:00"
word_count: 1048
reading_time_minutes: 5
source_file: briefs/systems_thinking/weekly_brief_2026-01-05.md
---

This week saw significant developments in open-source AI models, with Chinese and other international teams releasing models that increasingly rival proprietary systems. Multiple organizations launched new architectures and training approaches, while industry observers noted the rapid pace at which AI coding assistants can now replicate complex engineering work.

## Open Models Reach New Performance Milestones

The open-source AI ecosystem showed no signs of slowing during the holiday period, with several teams releasing models that approach or match the capabilities of closed systems [6]. GLM-4.7 from Chinese company Zhipu represents a particularly notable release, performing well enough that one researcher preferred its website UI generation outputs over Anthropic's Claude Opus in certain cases [6]. While the model doesn't match state-of-the-art performance on academic benchmarks like GPQA or SWE-bench Verified, it maintains strong performance across broader task suites including GPVal-AA and DesignArena [6]. However, the model has limitations in speed and long-context performance, particularly after 100,000 tokens [6].

Chinese AI company DeepSeek pushed boundaries further with the release of V3.2 and V3.2 Speciale, with the latter claiming to achieve gold-medal performance on the 2025 International Mathematical Olympiad (IMO) and International Olympiad in Informatics (IOI) [6]. This represents a significant milestone for open models in specialized reasoning tasks. The timing is notable as Zhipu, the company behind GLM-4.7, is set to go public on January 8th [6].

## New Architectures and Scale Emerge

NVIDIA released an update to their Nemotron series featuring a novel Mamba2-Transformer architecture combined with mixture-of-experts (MoE)—a design where multiple specialized sub-models work together, allowing the system to activate only the relevant experts for each task [6]. The company plans to release two additional model sizes in the first half of 2026: Super (~100B-A10B) and Ultra (~500B-A50B), which will incorporate Latent MoE and multi-token prediction capabilities [6].

Other organizations are also pushing architectural boundaries. LLM360 from MBZUAI released K2-V2, a 70 billion parameter dense model with fully open-source data, including 12 trillion tokens of pre-training data and supervised fine-tuning data generated using GPT-OSS 120B [6]. Arcee released two models—Nano (6B-A1B MoE) and Mini (26B-A3B MoE)—trained on 10 trillion tokens, with plans to release a massive Large model (420B-A13B MoE) trained on 20 trillion tokens in the coming weeks [6].

Xiaomi surprised the community by releasing MiMo-V2-Flash, a 309B-A15B MoE model, a significant jump from their initial 7 billion parameter dense model [6]. Early users praised its writing style but found it lacking in agentic performance and function calling capabilities [6].

## AI Coding Assistants Demonstrate Rapid Development Capabilities

A striking example of AI coding capabilities emerged this week when Jaana Dogan, a Principal Engineer at Google, revealed that Claude Code generated in one hour what her team had built over the course of last year [4]. Dogan had been working on distributed agent orchestrators—systems that coordinate multiple AI agents working together—at Google, where various teams had different approaches without full alignment [4]. Using just a three-paragraph description without proprietary details, she asked Claude Code to build a toy version, and it produced comparable results to a year's worth of engineering effort [4]. While Dogan noted the output wasn't perfect and required iteration, the demonstration highlights the accelerating capabilities of AI coding assistants [4].

## Design Critiques and Software Preservation

In the design world, Nikita Prokopov delivered what one observer called a "devastating critique" of the new menu icons in macOS Tahoe [1]. The critique referenced Apple's own 1992 Human Interface Guidelines rule about not overloading users with complex icons, suggesting that Apple's attempt to add an icon to every menu item was an "impossible task" due to insufficient good metaphors [1]. The criticism extends beyond the concept to execution, with observers noting that Apple did a poor job consistently applying metaphors and designing the icons [1].

On the software preservation front, a UK government open-source project highlighted the importance of code archiving. The sqlite-s3vfs repository—a Python library for accessing SQLite databases hosted in S3 buckets that was released as MIT-licensed open source by the UK's Department for Business and Trade—disappeared from GitHub, returning a 404 error [2]. However, the Software Heritage archive had captured a full copy, though the retrieval process proved non-obvious [2]. This led to the creation of a new Software Heritage Repository Retriever tool that takes advantage of the archive's CORS-enabled APIs to simplify the retrieval process [2].

## Tensions & Conflicts

The rapid advancement of open models, particularly from Chinese companies, creates tension with the traditional dominance of closed, Western AI systems. While DeepSeek claims gold-medal performance on mathematical olympiads [6], these specialized achievements don't necessarily translate to general-purpose capabilities that most users need.

There's also an implicit conflict in the AI development landscape between the year-long efforts of established tech giants and the hour-long generation capabilities of modern AI assistants [4]. This raises questions about the future of traditional software development processes and team structures.

Apple's design decisions in macOS Tahoe represent a conflict between their historical design principles—specifically their 1992 guideline against icon overload—and their current approach of universal iconography [1].

## Implications

This week's developments suggest that the gap between open and closed AI models continues to narrow, with open models becoming "good enough" for many practical applications [6]. The ability of AI coding assistants to rapidly prototype complex systems that previously required extensive engineering effort indicates we may be approaching a fundamental shift in how software is developed. Meanwhile, the disappearance of government-funded open-source projects underscores the ongoing need for robust archiving systems to preserve publicly-funded code.

## Sources

[1] [Willison, S. (2026, January 5). It's hard to justify Tahoe icons](https://simonwillison.net/2026/Jan/5/its-hard-to-justify-tahoe-icons/#atom-everything)

[2] [Willison, S. (2025, December 30). TIL: Downloading archived Git repositories from archive.softwareheritage.org](https://simonwillison.net/2025/Dec/30/software-heritage/#atom-everything)

[3] [Willison, S. (2026, January 2). December 2025 sponsors-only newsletter](https://simonwillison.net/2026/Jan/2/december/#atom-everything)

[4] [Willison, S. (2026, January 4). Quoting Jaana Dogan](https://simonwillison.net/2026/Jan/4/jaana-dogan/#atom-everything)

[5] [Willison, S. (2026, January 5). Oxide and Friends Predictions 2026, today at 4pm PT](https://simonwillison.net/2026/Jan/5/oxide-and-friends-predictions-2026/#atom-everything)

[6] [Brand, F. (2026, January 5). Latest open artifacts (#17): NVIDIA, Arcee, Minimax, DeepSeek, Z.ai and others close an eventful year on a high note](https://www.interconnects.ai/p/latest-open-artifacts-17-nvidia-arcee)

[7] [OpenAI Blog. (2026, January 2). Announcing OpenAI Grove Cohort 2](https://openai.com/index/openai-grove)

[8] [Raschka, S. (2025, December 30). LLM Research Papers: The 2025 List (July to December)](https://sebastianraschka.com/blog/2025/llm-research-papers-2025-part2.html)

[9] [Raschka, S. (2025, December 30). The State Of LLMs 2025: Progress, Problems, and Predictions](https://sebastianraschka.com/blog/2025/state-of-llms-2025.html)
