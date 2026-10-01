---
title: "Context Orchestration: When AI Recreates a Year's Work in an Hour"
slug: context_orchestration-weekly-2026-01-05
category: context_orchestration
period_type: weekly
period_start_date: 2026-01-05
period_end_date: 2026-01-11
published_at: "2026-01-11T15:00:00"
word_count: 1059
reading_time_minutes: 5
source_file: briefs/context_orchestration/weekly_brief_2026-01-05.md
---

This week brought a striking example of context orchestration's power: a Google Principal Engineer gave Claude Code a three-paragraph description and watched it recreate in one hour what her team built over a year [4]. This isn't about AI replacing engineers—it's about the meta-skill that made this possible: knowing exactly what context to provide and when.

## The Context Orchestration Breakthrough

Jaana Dogan's experience at Google reveals the core leverage point for leaders. She didn't feed Claude Code thousands of pages of documentation or proprietary details. Instead, she provided a carefully curated three-paragraph description of a distributed agent orchestrator [4]. The result matched what Google's team had built through traditional development processes.

This demonstrates context orchestration in its purest form: the ability to distill complex systems into the essential information an AI needs to be effective. Dogan notes she was "building a toy version on top of some of the existing ideas to evaluate Claude Code" [4]—treating the AI as a rapid prototyping partner rather than a replacement for human judgment.

The lesson for leaders is clear: your competitive advantage isn't in hoarding information but in knowing what context to surface. Dogan couldn't share proprietary details, yet Claude Code still generated useful output [4]. This suggests that context orchestration skill—knowing what to include and what to omit—matters more than having access to every possible piece of information.

## Open Models Reach "Good Enough" Territory

This week's model releases signal an important shift for context orchestration: open models are becoming viable alternatives for real work. Florian Brand notes that models like GLM 4.7 and MiniMax M2.1 "are starting to be 'good enough' in the Claude Code form factor" [6]. This matters because it gives leaders more options for where and how they orchestrate context.

GLM-4.7, released by Zhipu just before their January 8th IPO, shows particular promise for practical applications [6]. While it doesn't match closed models on academic benchmarks, Brand found its UI generation for websites "better than Opus in some cases" [6]. The tradeoff: it's slower and struggles with contexts over 100,000 tokens [6].

These limitations actually highlight a key context orchestration principle: knowing your tool's constraints helps you curate better. If your AI struggles past 100,000 tokens, you learn to be more selective about what context you provide. This forced curation often leads to better results than dumping everything into a massive context window.

## The Software Heritage Pattern: Context Preservation

Simon Willison's experience recovering a lost GitHub repository demonstrates another context orchestration pattern: preservation infrastructure [2]. When the UK government's sqlite-s3vfs repository disappeared from GitHub, Willison found it preserved in the Software Heritage archive [2]. He then built a retrieval tool using Claude Code to make the process easier for others [2].

This highlights an overlooked aspect of context orchestration: ensuring your context remains accessible. As organizations increasingly rely on AI systems that reference external code, documentation, and data, the ability to preserve and retrieve that context becomes critical. Willison's tool takes advantage of Software Heritage's CORS-enabled APIs [2], showing how modern context orchestration often involves chaining together multiple systems.

## Practical Applications

Leaders can apply these context orchestration patterns immediately:

**For rapid prototyping**: Follow Dogan's approach—write a three-paragraph description of what you need before engaging AI [4]. This forces clarity about objectives and constraints.

**For tool selection**: The availability of "good enough" open models means you can now orchestrate context locally for sensitive projects [6]. Brand's experience using Gemini 3.0 Flash as a subagent to overcome GLM-4.7's text-only limitation shows how leaders can compose multiple AIs for better results [6].

**For knowledge preservation**: Consider what happens to your orchestrated context over time. The Software Heritage example shows that critical resources can disappear [2]. Building retrieval and preservation into your context orchestration stack prevents future disruption.

## Tensions & Tradeoffs

This week's developments surface key tensions in context orchestration:

**Speed vs. completeness**: GLM-4.7's slower performance compared to other models [6] illustrates a common tradeoff. More sophisticated context processing often takes longer. Leaders must decide when speed matters more than comprehensive analysis.

**Open vs. closed models**: While open models are becoming "good enough" [6], they still lag closed models on certain benchmarks. The choice depends on whether you need cutting-edge performance or prefer the control and privacy of running models locally.

**Curation effort vs. AI capability**: Dogan's success with a three-paragraph prompt [4] suggests that careful curation can compensate for less sophisticated AI. But this requires human expertise to know what to include and exclude.

## Your Context Orchestration Stack

Based on this week's developments, leaders should evaluate:

1. **Rapid prototyping tools**: Can you articulate complex systems in three paragraphs like Dogan did [4]? This skill becomes more valuable as AI capabilities increase.

2. **Model flexibility**: With open models reaching practical utility [6], consider whether you need alternatives to closed API models for sensitive contexts.

3. **Context preservation**: Do you have a plan for when external resources disappear? Willison's Software Heritage tool [2] offers one approach, but every organization needs a context preservation strategy.

4. **Composition patterns**: Brand's use of multiple models together [6] points toward a future where leaders orchestrate teams of specialized AIs rather than relying on single systems.

The meta-lesson from this week is that context orchestration skill compounds. Dogan's ability to distill a year's work into three paragraphs [4] didn't happen overnight—it required deep understanding of both the problem domain and how to communicate with AI. As these tools proliferate, the leaders who master context orchestration will see exponential returns on their time investment.

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
