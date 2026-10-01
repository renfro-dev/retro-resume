---
title: "Craft-Lovers vs. Make-It-Go Developers in the AI Era"
slug: systems_thinking-weekly-2026-03-10
category: systems_thinking
period_type: weekly
period_start_date: 2026-03-10
period_end_date: 2026-03-16
published_at: "2026-03-16T16:00:00"
word_count: 1339
reading_time_minutes: 7
source_file: briefs/systems_thinking/weekly_brief_2026-03-10.md
---

## Key Developments

### The Great Developer Divide

AI-assisted coding is revealing a fundamental split in the developer community that was previously hidden [1]. Before AI tools, all developers followed identical workflows—writing code by hand, using the same editors, languages, and pull request processes [1]. This uniformity masked different underlying motivations: some developers are "craft-lovers" who enjoy the act of coding itself, while others are "make-it-go people" focused on building functional products [1]. 

Now developers face a fork in the road: they can let machines write code and focus on directing what gets built, or insist on hand-crafting it [1]. This choice makes visible the reason developers got into programming in the first place, as the two camps make different decisions about adopting AI tools [1].

### Agent Architecture and Infrastructure

This week saw significant developments in understanding and deploying AI agents. LangChain defines the fundamental equation as "Agent = Model + Harness" [17]. A harness encompasses every piece of code, configuration, and execution logic that isn't the model itself—including system prompts, tools, orchestration logic, and infrastructure like filesystems and sandboxes [17]. Raw models cannot maintain durable state, execute code, access real-time knowledge, or set up environments [17]. The harness provides these capabilities, transforming a model into a functional agent [17].

The filesystem emerged as arguably the most foundational harness primitive, providing workspace for agents, incremental work storage, collaboration surfaces, and state persistence [17]. The main agent execution pattern today uses a ReAct loop—where models reason, take actions via tool calls, observe results, and repeat [17].

OpenAI demonstrated this architecture in practice by building an agent runtime using their Responses API, shell tools, and hosted containers to run secure, scalable agents with files, tools, and state [9]. Meanwhile, LangChain released new deploy CLI commands within their langgraph-cli package, enabling single-step deployment of agents to LangSmith Deployment [8]. The CLI builds Docker images for local LangGraph projects and provisions infrastructure including Postgres for persistence and Redis for streaming messages [8].

### Enterprise AI Adoption Accelerates

Major enterprises reported significant productivity gains from AI adoption this week. Rakuten announced they're using OpenAI's Codex coding agent to ship software faster and safer, reducing Mean Time To Recovery (MTTR) by 50% [10]. Codex automates CI/CD reviews for Rakuten and enables them to deliver full-stack builds in weeks [10]. 

Wayfair deployed OpenAI models to improve e-commerce support and product catalog accuracy, automating ticket triage and enhancing millions of product attributes at scale [15]. These case studies demonstrate AI moving beyond experimentation into production systems at major companies.

LangChain and NVIDIA announced an enterprise agentic AI platform combining LangChain's frameworks—which have surpassed 1 billion downloads—with NVIDIA's infrastructure [11]. LangSmith has processed over 15 billion traces and 100 trillion tokens, serving over 300 enterprise customers [11]. The partnership includes NVIDIA NIM microservices delivering up to 2.6x higher throughput compared to standard deployments [11].

### Coding Agents Reshape Development Roles

Coding agents are fundamentally changing how Engineering, Product, and Design (EPD) teams operate [13]. In the pre-Claude era, Product wrote PRDs (Product Requirement Documents), Design created mocks, and Engineering turned them into code [13]. Now coding agents can take ideas directly to functional software, making anyone capable of building things [13].

This shifts the bottleneck from implementation to review—the constraint is no longer writing code but evaluating and improving what agents generate [13]. Product managers who adopt coding agents can validate ideas by building prototypes directly, designers can iterate in code rather than just Figma, and engineers can shift focus from implementation to system thinking [13]. The author argues that adopting coding agents is now a requirement because those who don't will be replaced by those who do [13].

### Open Models Face Reality Check

The open model ecosystem experienced significant reflection this week. While 2025 saw many companies take open models seriously following DeepSeek R1's success, very few businesses have real monetary reasons to build open models [16]. Most development is driven by mission, principle, or generosity rather than profit [16].

The open-closed model gap has consistently remained 6-18 months, which the author considers remarkable given open labs' smaller budgets [16]. However, this gap is more likely to grow than shrink as top labs continue improving rapidly [16]. The author argues that developing frontier AI models today requires stacking medium to small wins over time, rewarding organizations that can expand scope while maintaining quality—which is extremely expensive [16].

### Security and Safety Advances

OpenAI introduced IH-Challenge (Instruction Hierarchy Challenge), a training method that helps models prioritize trusted instructions [14]. This improves instruction hierarchy, safety steerability, and resistance to prompt injection attacks [14]. 

In a departure from traditional approaches, OpenAI's Codex Security doesn't include a SAST (Static Application Security Testing) report, instead using AI-driven constraint reasoning and validation [3]. This approach reportedly finds real vulnerabilities with fewer false positives [3].

Apple's MacBook Neo demonstrates hardware-software security integration with its camera indicator light running in the secure exclave part of the chip [7]. Even kernel-level exploits cannot turn on the camera without the light appearing on screen, as the indicator runs in a privileged environment separate from the kernel and blits directly onto screen hardware [7].

## Tensions & Conflicts

Several significant conflicts emerged this week. OpenAI's claim that traditional SAST should not be relied upon conflicts with established security practices that commonly include SAST as a standard component [3]. 

The assertion that "anyone can write code now" due to coding agents conflicts with traditional views about programming requiring specialized skills [13]. Similarly, the claim that tests are "no longer optional" with AI conflicts with traditional engineering trade-offs about when testing is necessary [17].

StrongDM's reported policy where "nobody writes any code, nobody reads any code" was described as "clear insanity" and "wildly irresponsible" for a security company [4]. This conflicts fundamentally with traditional software engineering practices emphasizing code review and understanding.

The open model community faces internal tensions about strategy. While some believe open models will catch up to closed ones, others argue the gap will likely grow due to the expensive infrastructure required for frontier development [16]. There's also conflict about whether to compete on general capabilities or focus on specialized, task-specific models [16].

## Implications

This week's developments reveal AI agents transitioning from experimental tools to production systems reshaping entire industries. The divide between developers who embrace AI assistance and those who prefer traditional craftsmanship will likely deepen as tools improve. Organizations face pressure to adopt these technologies or risk being outpaced by competitors who do.

The emphasis on harnesses and infrastructure shows that making AI useful requires significant engineering beyond the models themselves. As enterprises report substantial productivity gains, the question shifts from whether to adopt AI agents to how quickly organizations can integrate them effectively.

## Sources

[1] [Willison, S. (2026, March 12). Quoting Les Orchard](https://simonwillison.net/2026/Mar/12/les-orchard/#atom-everything)

[2] [Willison, S. (2026, March 15). John M. Mossman Lock Collection](https://simonwillison.net/2026/Mar/15/john-m-mossman-lock-collection/#atom-everything)

[3] [OpenAI Blog. (2026, March 16). Why Codex Security Doesn't Include a SAST Report](https://openai.com/index/why-codex-security-doesnt-include-sast)

[4] [Willison, S. (2026, March 14). My fireside chat about agentic engineering at the Pragmatic Summit](https://simonwillison.net/2026/Mar/14/pragmatic-summit/#atom-everything)

[5] [Willison, S. (2026, March 15). What is agentic engineering?](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/#atom-everything)

[6] [Raschka, S. (2026, March 14). New LLM Architecture Gallery](https://sebastianraschka.com/blog/2026/llm-architecture-gallery.html)

[7] [Willison, S. (2026, March 16). Quoting Guilherme Rambo](https://simonwillison.net/2026/Mar/16/guilherme-rambo/#atom-everything)

[8] [LangChain Accounts. (2026, March 16). Introducing deploy cli](https://blog.langchain.com/introducing-deploy-cli/)

[9] [OpenAI Blog. (2026, March 11). From model to agent: Equipping the Responses API with a computer environment](https://openai.com/index/equip-responses-api-computer-environment)

[10] [OpenAI Blog. (2026, March 11). Rakuten fixes issues twice as fast with Codex](https://openai.com/index/rakuten)

[11] [LangChain Accounts. (2026, March 16). LangChain Announces Enterprise Agentic AI Platform Built with NVIDIA](https://blog.langchain.com/nvidia-enterprise/)

[12] [LangChain Accounts. (2026, March 11). Autonomous context compression](https://blog.langchain.com/autonomous-context-compression/)

[13] [Chase, H. (2026, March 10). How Coding Agents Are Reshaping Engineering, Product and Design](https://blog.langchain.com/how-coding-agents-are-reshaping-engineering-product-and-design/)

[14] [OpenAI Blog. (2026, March 10). Improving instruction hierarchy in frontier LLMs](https://openai.com/index/instruction-hierarchy-challenge)

[15] [OpenAI Blog. (2026, March 11). Wayfair boosts catalog accuracy and support speed with OpenAI](https://openai.com/index/wayfair)

[16] [Lambert, N. (2026, March 16). What comes next with open models](https://www.interconnects.ai/p/the-next-phase-of-open-models)

[17] [LangChain Accounts. (2026, March 11). The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)
