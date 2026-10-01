---
title: "Q4 2025 Quarterly Report: AI Ecosystem Evolution"
slug: systems_thinking-quarterly-2025-10-01
category: systems_thinking
period_type: quarterly
period_start_date: 2025-10-01
period_end_date: 2025-12-31
published_at: "2025-12-31T17:00:00"
word_count: 4212
reading_time_minutes: 21
source_file: briefs/systems_thinking/quarterly_brief_2025-Q4.md
---

## Executive Summary

The fourth quarter of 2025 witnessed a profound transformation in the artificial intelligence landscape, characterized by the rise of increasingly agentic models, intensifying global competition, massive infrastructure investments, and accelerating enterprise adoption. This period marked a critical inflection point in AI development as systems evolved from passive tools responding to prompts into autonomous agents capable of reasoning, acting, and adapting across complex workflows with minimal human guidance.

For business leaders and decision-makers, these developments signaled both opportunities and challenges. The quarter revealed a narrowing window for new entrants in frontier AI development [1], while simultaneously democratizing access through increasingly capable open models. The massive infrastructure investments—such as OpenAI's partnerships to deploy 16 gigawatts of computing power [2, 3] and its $38 billion collaboration with AWS [4]—underscored how AI development was becoming increasingly capital-intensive, reshaping competitive dynamics across the industry.

Three key trends defined Q4 2025:

1. **Global AI Competition Intensified**: Chinese AI companies emerged as formidable competitors to Western models, with companies like Moonshot AI, DeepSeek, and Qwen demonstrating capabilities comparable to leading closed models [5, 6]. This shift challenged Western dominance in AI development and accelerated the pace of innovation globally.

2. **Agentic AI Transformed Work**: AI systems evolved from tools to agents, capable of reasoning through problems and taking actions with increasing autonomy. This transformation was particularly evident in coding and software development, where AI agents fundamentally changed how software was built [7, 8].

3. **Enterprise AI Adoption Accelerated**: Organizations across sectors integrated AI deeply into their operations, with measurable productivity gains. Financial institutions, airlines, real estate companies, and others deployed AI at scale, with millions of employees worldwide gaining access to frontier AI capabilities [9, 10, 11].

The quarter also saw significant advancements in AI capabilities, with Google DeepMind's Gemini achieving gold-medal performance at both the International Mathematical Olympiad [12] and the International Collegiate Programming Contest [13], while OpenAI released its most advanced models to date with GPT-5.1, GPT-5.2, and specialized Codex variants [14, 15, 16].

As 2025 drew to a close, the AI ecosystem stood at a crossroads, with the technology becoming both more powerful and more accessible, raising important questions about who would shape its future development and how its benefits would be distributed globally.

## The Rise of Chinese Open Models and Global AI Competition

### Chinese Models Challenge Western AI Dominance

Q4 2025 marked a significant shift in the global AI landscape as Chinese models demonstrated capabilities comparable to leading Western models. This trend, which began earlier in the year, accelerated throughout the quarter as Chinese AI labs closed the gap with their Western counterparts.

In October, industry analysts noted that "China has taken the lead in open models" [17], with Qwen achieving dominance while Meta's Llama faded in the open model landscape. Chinese open models improved at an "astonishing rate," coming close to the best closed models in performance [18]. By November, Moonshot AI, one of China's "AI Tigers," released Kimi K2 Thinking, a reasoning Mixture of Experts (MoE) model with 1 trillion total parameters (32 billion active) and a 256K context length [5]. This model outperformed leading closed models on some benchmarks such as Humanity's Last Exam and BrowseComp, though GPT-5 and Claude Sonnet 4.5 still maintained advantages on other evaluations [5].

The gap between closed and open models was estimated at around 4-6+ months in raw performance by the end of the quarter, but Chinese labs were rapidly closing this gap on key benchmarks [5]. Some Chinese companies reportedly started their foundation model efforts after DeepSeek R1 (released in January 2025) and caught up to the open frontier in about six months [5]. By December, open models had dramatically increased in capability, rivaling closed models on most key benchmarks [19]. Qwen had overtaken Meta's Llama in terms of total downloads and as the most-used base model for fine-tuning [19].

### Chinese AI Development Strategy

Chinese AI companies followed a specific model release playbook that proved effective throughout Q4. This approach included building social media presence, securing launch partners, offering free API access, and developing compatible tooling [20]. The strategy appeared to work, with Zhipu reportedly having over 100,000 international API users and 3 million chatbot users by November [20].

DeepSeek R1, released under the MIT license in January 2025, inspired many Chinese labs to release their models openly [19]. This open approach contributed to China's growing dominance in open AI development throughout the year, culminating in the strong position observed in Q4 [19].

The surge of open models from China put pressure on closed American labs regarding pricing and expectations [5]. Despite benchmark parity, closed models still dominated in real-world usage by the end of the quarter [19]. The best closed models maintained advantages in robustness and richness that open models matching them on benchmarks didn't always demonstrate [19].

### U.S. Response: Open Models and Strategic Partnerships

In response to growing competition, U.S. organizations developed their own open models and formed strategic partnerships throughout Q4. In November, Ai2 released Olmo 3, a family of 7B and 32B fully open language models, which they claimed included "the best 32B base model" and "the first 32B (or larger) fully open reasoning model" [21]. The Olmo 3 32B base model was particularly significant because Qwen3 did not release their 32B base model, likely for competitive reasons [21].

The U.S. had a comparable number of labs releasing high-quality models as China (approximately 20 labs), but many American labs released smaller models with more restrictive licenses, resulting in a more muted impact [20]. Ai2, Nvidia, Arcee, and Reflection were identified as the players with the most mind-share and momentum in the U.S. open models space [20].

Major U.S. companies formed strategic partnerships to secure the computing infrastructure needed for next-generation AI. OpenAI and AWS entered a multi-year, $38 billion partnership to scale advanced AI workloads, with AWS providing infrastructure and compute capacity to power OpenAI's next generation of models [4]. Similarly, OpenAI and Foxconn collaborated to design and manufacture next-generation AI infrastructure hardware in the U.S., developing multiple generations of data-center systems, strengthening U.S. supply chains, and building key components domestically [22].

By December, the open model ecosystem had become incredibly active, with approximately 1,000-2,000 models uploaded to HuggingFace each day [19]. This represented 30,000-60,000 models monthly, highlighting the scale and diversity of development efforts [19]. Models like Moondream became leading players in the vision space, while others like Parakeet 3 for speech-to-text were faster than cloud-based platforms in terms of end-to-end latency [19].

Late December saw Meta acquire Manus, a Singapore-based AI agent startup with Chinese roots, for over $2 billion [63, 64]. The deal highlighted geopolitical tensions in AI development, with Meta explicitly stating that "there will be no continuing Chinese ownership interest in Manus AI following the transaction" [65]. Manus, which had been backed by Chinese investors including Tencent and ZhenFund, would wind down its operations in China following the acquisition [66].

## Evolution of Agentic AI and Coding Agents

### The Rise of Agentic AI

Throughout Q4 2025, AI systems evolved from passive tools that respond to prompts into autonomous agents capable of reasoning through problems and taking actions. This shift was evident across multiple domains and applications.

In November, Notion rebuilt its AI architecture with GPT-5 to create autonomous agents that reason, act, and adapt across workflows, unlocking smarter and more flexible productivity in Notion 3.0 [23]. Similarly, Google DeepMind introduced SIMA 2, a Gemini-powered AI agent that can think, understand, and take actions in interactive environments [24].

These agentic capabilities were particularly evident in coding and reasoning tasks. In October, OpenAI released GPT-5.1-Codex-Max, a faster, more intelligent agentic coding model designed for long-running, project-scale work with enhanced reasoning and token efficiency [25]. The model included both model-level mitigations (like specialized safety training for harmful tasks and prompt injections) and product-level mitigations (such as agent sandboxing and configurable network access) [26].

By December, OpenAI had released GPT-5.2, described as their "most advanced frontier model for everyday professional work" with improved reasoning, long-context understanding, coding, and vision capabilities [15]. They followed this with GPT-5.2-Codex, a version further optimized for coding tasks with enhanced cybersecurity capabilities [16, 27].

### Coding Agents Transform Software Development

Coding agents—AI tools that can actively execute code they're working with to check functionality and iterate on problems—emerged as the most important trend in LLMs in Q4 2025 [28]. These tools fundamentally changed how software was developed, shifting programmers from writing lines of code to managing the context the model has access to, pruning irrelevant information, adding useful material, and writing detailed specifications [29].

The impact of these tools on productivity was substantial. Boris Cherny, creator of Claude Code, reported landing 259 pull requests and making 497 commits in thirty days using Claude Code with Opus 4.5 [30]. This represented a dramatic improvement from a year earlier, when Claude struggled with basic tasks like generating bash commands without escaping issues [30].

Junior developers used AI coding assistants effectively, not just accepting whatever the AI produced but using it to accelerate learning while maintaining quality [31]. These tools helped by collapsing the search space—instead of spending hours figuring out which API to use, developers spent minutes evaluating options the AI surfaced [31]. This compression of the learning curve made hiring junior developers a better bet for engineering managers [31].

However, concerns emerged about how these tools were used. Some junior engineers empowered by LLM tools deposited large, untested pull requests and expected the code review process to handle the rest [28]. This approach was considered inappropriate and a waste of other people's time [28]. The fundamental responsibility remained with the human developer: "Your job is to deliver code you have proven to work" [28].

### "Vibe Engineering" Emerges as Collaborative Approach

By December, a new approach to software development called "vibe engineering" had emerged, where expert programmers used coding agents professionally to produce high-quality results [32]. This differed from "vibe coding," which referred to uncritically accepting AI-generated code without proper review [32].

JustHTML, a Python library for parsing HTML released by Emil Stenström, exemplified this approach [32]. Stenström used VS Code with Github Copilot in Agent mode along with several AI models including Claude Sonnet 3.7, Gemini 3 Pro, and Claude Opus to build the library [32]. He worked on it for a couple of months during off-hours, designing the core API himself while letting the AI handle implementation details [32].

This approach inspired others to create similar libraries in different programming languages. Simon Willison ported JustHTML from Python to JavaScript using Codex CLI and GPT-5.2 in about 4.5 hours [33]. Anil Madhavapeddy created html5rw in OCaml, and Kyle Howells built a dependency-free HTML5 parser for Swift [34]. These projects all passed the comprehensive html5lib-tests conformance suite, demonstrating that AI-assisted development could produce high-quality, standards-compliant code.

## Infrastructure Investments and Strategic Partnerships

### Massive Computing Infrastructure Buildout

Q4 2025 saw unprecedented investments in AI computing infrastructure as companies raced to build larger, more capable systems. OpenAI formed strategic partnerships with AMD and Broadcom to deploy a combined 16 gigawatts of computing power—6 gigawatts of AMD Instinct GPUs [2] and 10 gigawatts of OpenAI-designed AI accelerators manufactured by Broadcom [3]. To put this scale in perspective, 6 gigawatts alone was enough electricity to power approximately 4.5 million American homes.

OpenAI also announced the expansion of its Stargate project to Michigan with a new one-gigawatt campus, which aimed to strengthen America's AI infrastructure and support economic growth across the Midwest [35]. These massive infrastructure investments reflected what industry experts called a "closing window" for new entrants to compete at the frontier of AI development. Nathan Lambert of Interconnects noted that "the time window to be a player at the most cutting edge of LLM technology is actually a closing window, not just what feels like one" [1].

The infrastructure buildout drove extreme work demands in the industry. According to a Wall Street Journal article cited by Lambert, some AI workers were putting in 100-hour workweeks, with several top researchers comparing their circumstances to war [36]. Lambert argued that "training general language models you hope others will adopt—via open weights or API—is becoming very much an all-in or all-out domain. Half-assing it is becoming an expensive way to make a model that no one will use" [36].

### Strategic Partnerships for Next-Generation AI

Throughout the quarter, major companies formed strategic partnerships to secure the computing infrastructure needed for next-generation AI. In November, OpenAI and AWS entered a multi-year, $38 billion partnership to scale advanced AI workloads, with AWS providing infrastructure and compute capacity to power OpenAI's next generation of models [4]. Similarly, OpenAI and Foxconn collaborated to design and manufacture next-generation AI infrastructure hardware in the U.S., developing multiple generations of data-center systems, strengthening U.S. supply chains, and building key components domestically [22].

Google DeepMind established a research presence in Singapore to advance AI development in the Asia-Pacific region [37]. These infrastructure investments enabled AI applications across various domains, including weather forecasting, healthcare, and financial services.

OpenAI formed strategic partnerships to accelerate enterprise AI adoption. They took an ownership stake in Thrive Holdings to embed frontier research and engineering into accounting and IT services [38], partnered with Accenture to help enterprises bring agentic AI capabilities into their business core [39], and collaborated with Deutsche Telekom to bring advanced, multilingual AI experiences to millions across Europe [40].

## Enterprise AI Adoption

### Accelerating Integration Across Industries

Enterprise AI adoption accelerated rapidly throughout Q4 2025, with deeper integration and measurable productivity gains across industries [41]. OpenAI reported that more than one million customers around the world were using their services to empower teams and unlock new opportunities [42].

Major financial institutions implemented AI at scale. Commonwealth Bank of Australia rolled out ChatGPT Enterprise to 50,000 employees to build AI fluency and improve customer service and fraud response [43]. BBVA expanded its work with OpenAI through a multi-year AI transformation program, rolling out ChatGPT Enterprise to all 120,000 employees [44]. BNY used OpenAI technology to expand AI adoption enterprise-wide, with over 20,000 employees building AI agents through their Eliza platform to enhance efficiency and improve client outcomes [45].

Beyond financial services, companies across sectors integrated AI into their operations. Virgin Atlantic used AI to speed up development, improve decision-making, and elevate customer experience [46]. Scout24 created a GPT-5 powered conversational assistant that reimagined real-estate search, guiding users with clarifying questions, summaries, and tailored listing recommendations [47]. Podium implemented GPT-5 to build "Jerry," an AI teammate that drove 300% growth and transformed how small businesses serve customers [48].

The shift toward agentic AI changed how organizations approached marketing and productivity. Vineet Mehra, Chief Marketing Officer at Chime, described how AI was reshaping marketing into an agent-driven discipline, suggesting that CMOs who champion AI literacy and thoughtful adoption would lead in the new era of growth [49]. This transformation extended beyond marketing to entire organizations, with companies like Philips scaling AI literacy with ChatGPT Enterprise across 70,000 employees to improve healthcare outcomes worldwide [50].

### Productivity and Workforce Transformation

The impact of AI on productivity and workforce transformation became increasingly evident throughout Q4. Organizations reported significant productivity gains from AI adoption, with some employees achieving dramatic improvements in output. The case of Boris Cherny, who reported landing 259 pull requests and making 497 commits in thirty days using Claude Code [30], exemplified the potential productivity benefits of AI tools.

Junior developers used AI coding assistants to accelerate learning while maintaining quality [31]. These tools helped by collapsing the search space—instead of spending hours figuring out which API to use, developers spent minutes evaluating options the AI surfaced [31]. This compression of the learning curve made hiring junior developers a better bet for engineering managers [31].

However, concerns emerged about how these tools were used and their impact on work practices. Some junior engineers empowered by LLM tools deposited large, untested pull requests and expected the code review process to handle the rest [28]. This highlighted the need for new norms and practices around AI-assisted work.

## Breakthrough AI Capabilities

### Mathematical and Programming Achievements

October saw remarkable achievements in AI capabilities, particularly in mathematical and programming domains. Google DeepMind announced that an advanced version of Gemini with Deep Think officially achieved gold-medal standard at the International Mathematical Olympiad (IMO) [12], which has been held annually since 1959 and is considered the world's most prestigious competition for young mathematicians.

In addition to the IMO achievement, Gemini 2.5 Deep Think also reached gold-medal level at the International Collegiate Programming Contest (ICPC) World Finals, described as "the world's most prestigious computer programming competition" [13]. This performance demonstrated "a profound leap in abstract problem solving" [13]. Google DeepMind made Deep Think available in the Gemini app for Google AI Ultra subscribers, while also giving select mathematicians access to the full version of the Gemini 2.5 Deep Think model that was entered into the IMO competition [51].

### Specialized AI Models and Applications

Beyond mathematical achievements, Google DeepMind introduced several specialized AI models during the quarter. These included:

- Gemini Robotics 1.5, which aimed to bring AI agents into the physical world by enabling robots to "perceive, plan, think, use tools and act" to better solve complex, multi-step tasks [52]
- Gemini 2.5 Computer Use model, designed to power agents that can interact with user interfaces [53]
- Genie 3, which could generate dynamic worlds that users can navigate in real time at 24 frames per second, retaining consistency for a few minutes at a resolution of 720p [54]
- AlphaEarth Foundations, which integrated petabytes of Earth observation data to create a unified data representation that aimed to revolutionize global mapping and monitoring [55]

OpenAI expanded its offerings with several new tools and features, including AgentKit, expanded evals capabilities, and reinforcement fine-tuning for agents [56]. The company introduced ChatGPT Atlas, a browser with ChatGPT built in that provided "instant answers, summaries, and smart web help—right from any page" with privacy settings users can control [57]. Atlas was powered by a new architecture called OWL, which decoupled Chromium and enabled fast startup, rich UI, and agentic browsing with ChatGPT [58].

## Safety, Governance, and Model Understanding

### Character Training and Model Personalization

Researchers made progress in understanding how to train AI models for specific personalities and behaviors. Character training—actually fine-tuning a model to have a certain personality—proved better at giving models personality than prompting or activation steering, and produced more expressive and aligned personalities [59]. This approach became a fundamental area of study for AI for many of the same reasons as reinforcement learning from human feedback (RLHF) [59].

Character training was easy to imprint into the model, but making sure data aligned with intentions was challenging [59]. Some base models like Qwen had more rigidly defined internal personalities that were harder to edit [59]. While character training could be used to create models that are helpful or intellectually curious, they were also being used to create models that are seductive and sycophantic [59].

This research was particularly relevant as companies introduced more personalized AI experiences. OpenAI upgraded the GPT-5 series with warmer, more capable models and new ways to customize ChatGPT's tone and style [60]. These developments suggested that character training would be a fundamental part of the future of AI, even as models became more capable [59].

### Safety Tools and Frameworks

The quarter witnessed a growing focus on AI safety and governance, with new frameworks and tools being introduced to address potential risks. OpenAI contributed to the open model ecosystem with the introduction of gpt-oss-safeguard, described as "open-weight reasoning models for safety classification that let developers apply and iterate on custom policies" [61]. The company released a technical report detailing the performance and baseline evaluations of gpt-oss-safeguard-120b and gpt-oss-safeguard-20b, which were open-weight reasoning models post-trained from the gpt-oss models [62].

OpenAI's GPT-5.1-Codex-Max included both model-level mitigations (like specialized safety training for harmful tasks and prompt injections) and product-level mitigations (such as agent sandboxing and configurable network access) [26]. These safety measures reflected the growing recognition of the need for robust safeguards as AI systems became more capable and autonomous.

## Conclusion and Future Outlook

As 2025 drew to a close, the AI ecosystem stood at a critical juncture. The developments of Q4 highlighted several key trends that were likely to shape the future of AI:

1. **Global Competition Will Intensify**: The rise of Chinese open models challenged Western dominance in AI development, suggesting a more distributed future for AI innovation. This competition was likely to accelerate the pace of development while raising important questions about global governance and standards.

2. **Agentic AI Will Transform Work**: The evolution of AI from tools to agents was fundamentally changing how work gets done across industries. This transformation was particularly evident in software development but was spreading to marketing, customer service, healthcare, and other domains.

3. **Infrastructure Will Be a Key Differentiator**: The massive investments in AI computing infrastructure highlighted the capital-intensive nature of frontier AI development. Strategic partnerships and infrastructure buildout would continue to shape competitive dynamics in the industry.

4. **Enterprise Adoption Will Accelerate**: Organizations across sectors were integrating AI deeply into their operations, with measurable productivity gains. This trend was likely to continue as AI capabilities improved and integration became more seamless.

5. **Safety and Governance Will Gain Importance**: As AI systems became more capable and autonomous, the need for robust safety measures and governance frameworks would increase. The development of open-weight safety models and product-level mitigations reflected this growing focus on responsible AI development.

The quarter's developments suggested that AI was entering a new phase of maturity, with more powerful models, more diverse applications, and more widespread adoption. For business leaders and decision-makers, navigating this rapidly evolving landscape would require careful attention to both the opportunities and challenges presented by increasingly capable AI systems.

## Source Cards

[1] Nathan Lambert of Interconnects notes on closing window for new entrants in frontier AI development
[2] OpenAI's partnership with AMD for 6 gigawatts of computing power
[3] OpenAI's partnership with Broadcom for 10 gigawatts of AI accelerators
[4] OpenAI and AWS $38 billion partnership to scale advanced AI workloads
[5] Moonshot AI's release of Kimi K2 Thinking reasoning MoE model
[6] Chinese open models improving at an astonishing rate
[7] OpenAI's release of GPT-5.1-Codex-Max for agentic coding
[8] AI systems evolving from passive tools to autonomous agents
[9] Commonwealth Bank of Australia rolling out ChatGPT Enterprise to 50,000 employees
[10] BBVA expanding work with OpenAI through multi-year AI transformation program
[11] BNY using OpenAI technology to expand AI adoption enterprise-wide
[12] Google DeepMind's Gemini achieving gold-medal standard at International Mathematical Olympiad
[13] Gemini 2.5 Deep Think reaching gold-medal level at International Collegiate Programming Contest
[14] OpenAI's release of GPT-5.1
[15] OpenAI's release of GPT-5.2
[16] OpenAI's release of GPT-5.2-Codex
[17] Nathan Lambert's observation that China has taken the lead in open models
[18] Chinese open models improving at an astonishing rate
[19] Open models dramatically increasing in capability during 2025
[20] Chinese AI companies' model release playbook
[21] Ai2's release of Olmo 3 family of open language models
[22] OpenAI and Foxconn collaboration on next-generation AI infrastructure hardware
[23] Notion rebuilding AI architecture with GPT-5 for autonomous agents
[24] Google DeepMind's introduction of SIMA 2
[25] Details on GPT-5.1-Codex-Max capabilities
[26] Safety mitigations in GPT-5.1-Codex-Max
[27] Enhanced cybersecurity capabilities in GPT-5.2-Codex
[28] Coding agents as most important trend in LLMs in 2025
[29] Shift in programmers' role with AI coding agents
[30] Boris Cherny's productivity using Claude Code with Opus 4.5
[31] Junior developers using AI coding assistants effectively
[32] "Vibe engineering" approach with JustHTML Python library
[33] Simon Willison porting JustHTML to JavaScript
[34] Creation of html5rw in OCaml and HTML5 parser for Swift
[35] OpenAI's Stargate project expansion to Michigan
[36] WSJ article on extreme work demands in AI industry
[37] Google DeepMind establishing research presence in Singapore
[38] OpenAI taking ownership stake in Thrive Holdings
[39] OpenAI partnering with Accenture for enterprise AI capabilities
[40] OpenAI collaborating with Deutsche Telekom
[41] Enterprise AI adoption accelerating with deeper integration
[42] OpenAI reporting one million customers worldwide
[43] Commonwealth Bank of Australia's ChatGPT Enterprise deployment
[44] BBVA's ChatGPT Enterprise rollout to 120,000 employees
[45] BNY's Eliza platform for AI agent building
[46] Virgin Atlantic using AI for development and customer experience
[47] Scout24's GPT-5 powered conversational assistant
[48] Podium implementing GPT-5 to build "Jerry" AI teammate
[49] Vineet Mehra on AI reshaping marketing
[50] Philips scaling AI literacy with ChatGPT Enterprise
[51] Google DeepMind making Deep Think available in Gemini app
[52] Gemini Robotics 1.5 capabilities
[53] Gemini 2.5 Computer Use model
[54] Genie 3 dynamic world generation capabilities
[55] AlphaEarth Foundations for Earth observation data
[56] OpenAI's AgentKit and expanded evals capabilities
[57] ChatGPT Atlas browser introduction
[58] OWL architecture for ChatGPT Atlas
[59] Character training for AI model personalities
[60] OpenAI upgrading GPT-5 series with customization options
[61] OpenAI's gpt-oss-safeguard introduction
[62] Technical report on gpt-oss-safeguard models
[63] Meta's acquisition of Manus for over $2 billion - https://techcrunch.com/2025/12/29/meta-just-bought-manus-an-ai-startup-everyone-has-been-talking-about/
[64] Meta acquires Manus AI startup - https://www.cnbc.com/2025/12/30/meta-acquires-singapore-ai-agent-firm-manus-china-butterfly-effect-monicai.html
[65] Meta statement on no continuing Chinese ownership interest in Manus - https://www.cbc.ca/news/business/meta-manus-acquisition-two-billion-explained-9.7030180
[66] Manus winding down China operations following Meta acquisition - https://www.aljazeera.com/economy/2025/12/30/tech-giant-meta-buys-chinese-founded-ai-firm-manus
