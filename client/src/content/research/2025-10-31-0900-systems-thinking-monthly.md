---
title: "Systems Thinking Brief: October 2025 - AI Scaling, Open Models, and Infrastructure Expansion"
slug: systems_thinking-monthly-2025-10-01
category: systems_thinking
period_type: monthly
period_start_date: 2025-10-01
period_end_date: 2025-10-31
published_at: "2025-10-31T09:00:00"
word_count: 3076
reading_time_minutes: 15
source_file: briefs/systems_thinking/monthly_brief_2025-10_october_FINAL.md
---

## Executive Summary

The AI landscape is undergoing a profound transformation as companies race to build larger, more capable systems while simultaneously making AI more accessible. This month's developments reveal how AI is becoming both more powerful and more embedded in our daily lives and critical infrastructure.

For business leaders and decision-makers, these developments matter because they signal a closing window of opportunity for new entrants in frontier AI development [26], while simultaneously creating new possibilities for specialized applications. The massive infrastructure investments—like OpenAI's partnerships to deploy 16 gigawatts of computing power [33, 40]—indicate that AI development is becoming increasingly capital-intensive, with implications for who can compete at the cutting edge.

October 2025 saw significant advancements in AI capabilities, with Google DeepMind's Gemini achieving gold-medal performance at both the International Mathematical Olympiad [2] and the International Collegiate Programming Contest [18]. Meanwhile, Chinese open models continued their rise to prominence [3, 27], and major AI companies expanded their global partnerships and infrastructure investments [30, 33, 40, 60]. The month also witnessed a growing focus on AI safety and governance, with new frameworks and tools being introduced to address potential risks [16, 36, 56].

## Key Developments

### AI Scaling and Compute Infrastructure

The race to build larger AI systems accelerated this month with several major infrastructure announcements. OpenAI formed strategic partnerships with AMD and Broadcom to deploy a combined 16 gigawatts of computing power—6 gigawatts of AMD Instinct GPUs [33] and 10 gigawatts of OpenAI-designed AI accelerators manufactured by Broadcom [40]. To put this scale in perspective, 6 gigawatts alone is enough electricity to power approximately 4.5 million American homes. OpenAI also announced the expansion of its Stargate project to Michigan with a new one-gigawatt campus, which aims to strengthen America's AI infrastructure and support economic growth across the Midwest [60].

These massive infrastructure investments reflect what industry experts are calling a "closing window" for new entrants to compete at the frontier of AI development. Nathan Lambert of Interconnects notes that "the time window to be a player at the most cutting edge of LLM technology is actually a closing window, not just what feels like one" [26]. The technical standard for relevance in AI is continuously rising, requiring increasingly focused work and larger investments [26].

This infrastructure buildout is driving extreme work demands in the industry. According to a Wall Street Journal article cited by Lambert, some AI workers are putting in 100-hour workweeks, with several top researchers comparing their circumstances to war [29]. Lambert argues that "training general language models you hope others will adopt—via open weights or API—is becoming very much an all-in or all-out domain. Half-assing it is becoming an expensive way to make a model that no one will use" [29].

### Breakthrough AI Capabilities

October saw remarkable achievements in AI capabilities, particularly in mathematical and programming domains. Google DeepMind announced that an advanced version of Gemini with Deep Think officially achieved gold-medal standard at the International Mathematical Olympiad (IMO) [2], which has been held annually since 1959 and is considered the world's most prestigious competition for young mathematicians. Each participating country is represented by six elite, pre-university mathematicians who solve exceptionally difficult problems covering algebra, combinatorics, geometry, and number theory [2].

In addition to the IMO achievement, Gemini 2.5 Deep Think also reached gold-medal level at the International Collegiate Programming Contest (ICPC) World Finals, described as "the world's most prestigious computer programming competition" [18]. This performance demonstrated "a profound leap in abstract problem solving" [18]. Google DeepMind is now making Deep Think available in the Gemini app for Google AI Ultra subscribers, while also giving select mathematicians access to the full version of the Gemini 2.5 Deep Think model that was entered into the IMO competition [13].

Beyond mathematical achievements, Google DeepMind introduced several specialized AI models this month. These include:

- Gemini Robotics 1.5, which aims to bring AI agents into the physical world by enabling robots to "perceive, plan, think, use tools and act" to better solve complex, multi-step tasks [15]
- Gemini 2.5 Computer Use model, designed to power agents that can interact with user interfaces [10]
- Genie 3, which can generate dynamic worlds that users can navigate in real time at 24 frames per second, retaining consistency for a few minutes at a resolution of 720p [20]
- AlphaEarth Foundations, which integrates petabytes of Earth observation data to create a unified data representation that aims to revolutionize global mapping and monitoring [8]

OpenAI also expanded its offerings with several new tools and features, including AgentKit, expanded evals capabilities, and reinforcement fine-tuning for agents [4]. The company introduced ChatGPT Atlas, a browser with ChatGPT built in that provides "instant answers, summaries, and smart web help—right from any page" with privacy settings users can control [42]. Atlas is powered by a new architecture called OWL, which decouples Chromium and enables fast startup, rich UI, and agentic browsing with ChatGPT [58].

### Rise of Chinese Open Models and Global Competition

The landscape of open AI models saw significant shifts this month, with Chinese models continuing their rise to prominence. According to Nathan Lambert, "China has taken the lead in open models" [3], with Qwen achieving dominance while Llama has faded in the open model landscape [3]. Lambert notes that "Chinese open models improve at an astonishing rate, being close to the best closed models" [27].

The Center for AI Standards and Innovation (CAISI) released a report evaluating DeepSeek 3.1 against leading closed models, though Lambert points out that some of CAISI's evaluation scores show discrepancy with accepted results in the community [27]. While MMLU-Pro, GPQA, and HLE scores are close to self-reported scores from DeepSeek, the SWE-bench Verified scores are "off by a wide margin due to a weak harness for the benchmark" [27]. Lambert emphasizes that "the harness is the software framework the model is used in for agentic benchmarks and has as great an impact as the model itself" [27].

Qwen continued to expand its offerings with several new releases, including the VL series updates with small dense and larger Mixture of Experts (MoE) models in both instruct and reasoning versions [27]. Qwen is also exploring different architectures with hybrid attention, releasing an LLM with hybrid attention consisting of Gated DeltaNet and Gated Attention [27]. Qwen3-Next, trained on over 15 trillion tokens, "could be the groundwork for the next generation of Qwen models" [27].

OpenAI contributed to the open model ecosystem with the introduction of gpt-oss-safeguard, described as "open-weight reasoning models for safety classification that let developers apply and iterate on custom policies" [56]. The company released a technical report detailing the performance and baseline evaluations of gpt-oss-safeguard-120b and gpt-oss-safeguard-20b, which are open-weight reasoning models post-trained from the gpt-oss models [7].

### Reinforcement Learning Scaling and Advancements

Reinforcement learning (RL) emerged as a key focus area for improving frontier models this month. Lambert describes "scaling reinforcement learning (RL)" as "the zeitgeisty way to capture the next steps in improving frontier models—everyone is staring at the same hill they plan on climbing" [28]. A paper called ScaleRL, described as "the first definitive paper on scaling RL," proposes a clear method to extrapolate RL learning curves over compute scales and sets a baseline for the order of compute that should be spent to have top-end performance [28].

The ScaleRL approach involves taking base models, running some RL, and predicting endpoints through shape forecasting [28]. The authors define three constants for fitting RL performance curves: A for a measure of peak performance, B for the slope of the sigmoid curve, and C as compute on the x-axis [28]. In practice, the authors fit curves over 1/4 of their training compute to predict the outcome after the remaining 3/4 of GPU hours [28].

The paper endorses several recent algorithmic advancements as essential, including truncated importance sampling (TIS), Group Sequence Policy Optimization (GSPO), and Clipped IS-weight Policy Optimization (CISPO) via the MiniMax M1 paper [28]. It also highlights PipeLine RL, which combines in-flight updates and continuous batching for 4X+ improvements over standard RL implementations [28]. Importance sampling is described as "essential to getting modern RL infrastructure right, as without it, scaling to more complex systems is hard to get numerical stability with" [28].

A key finding is that larger base models perform better with RL. The authors acknowledge that "the larger 17B×16 MoE exhibits much higher asymptotic RL performance than the 8B dense model, outperforming the 8B's performance using only 1/6 of its RL training compute" [28].

### Global AI Partnerships and Governance

Major AI companies expanded their global partnerships and governance initiatives this month. OpenAI announced strategic collaborations with Japan's Digital Agency [30], the UK Ministry of Justice [6], and Argentina's Sur Energy [41]. The Japan partnership aims to "advance generative AI in public services, support international AI governance, and promote safe, trustworthy AI adoption worldwide" [30]. OpenAI also released economic blueprints for Japan [44] and South Korea [45], outlining how these countries can harness AI to boost innovation, strengthen competitiveness, and enable sustainable and inclusive growth.

In the UK, OpenAI expanded its existing partnership through a new agreement with the Ministry of Justice that will make ChatGPT available to civil servants [6]. The company is also introducing UK data residency for ChatGPT Enterprise, ChatGPT Edu, and the API Platform to support trusted and secure AI adoption [6].

OpenAI and Allied for Startups released the Hacktivate AI report, which contains 20 actionable policy ideas to accelerate AI adoption, boost competitiveness, and empower innovators in Europe [32]. The company also announced a recapitalization that "strengthens mission-focused governance" and aims to ensure AI benefits everyone while advancing innovation responsibly [52]. Additionally, Microsoft and OpenAI signed a new agreement that "strengthens its long-term partnership, expands innovation, and ensures responsible AI progress" [53].

Google DeepMind announced it is strengthening its Frontier Safety Framework (FSF), which helps identify and mitigate severe risks from advanced AI models [16]. The company also introduced Game Arena, a new, open-source platform for rigorous evaluation of AI models that allows for head-to-head comparison of frontier systems using environments with clear winning conditions [12].

## Tensions & Conflicts

Several notable tensions emerged in this month's developments. One significant conflict concerns the quality and value of AI-generated code. Vicki Boykis argues that "generative code models produce average quality code" that is "quite literally, mid, the compressed and weighted average of every excellent Stack Overflow answer" [61]. She contends that humans are still better than AI at "software reasoning, aesthetic judgment, and architecture" [61]. This view conflicts with the tech industry's increasing embrace of AI coding assistants and automated code generation, as evidenced by OpenAI's announcement that Codex is now generally available with new features for developers [35].

Another tension exists around the approach to hybrid reasoning in AI models. Lambert notes that "hybrid reasoning—i.e., a toggle of thinking tokens on and off—adds a major complexity cost in training that lowers the peak performance of both modes" [27]. This conflicts with the trend of companies adopting this approach, with IBM following "Qwen's lead" and planning to "release a separate reasoning model later in the year" [27].

There are also conflicting perspectives on the evaluation of open models. Lambert points out that CAISI's evaluation scores for DeepSeek 3.1 conflict with self-reported scores and community-accepted results, particularly for SWE-bench Verified scores [27]. Different organizations (CAISI, ATOM Project, HuggingFace) report significantly different download numbers for the same models due to different methodologies [27].

Finally, there is tension around the extreme work culture in AI development. While some top researchers have compared their circumstances to war, Lambert argues this is out of touch, especially with actual wars happening simultaneously [29]. There's also disagreement about whether starting a new AI lab with a clean codebase is an advantage, with Lambert dismissing this idea as "cope" [29].

## Implications

The developments this month highlight the increasing capital intensity of frontier AI development, with massive infrastructure investments creating barriers to entry for new players. At the same time, the release of more open models and specialized tools is democratizing access to AI capabilities for specific applications.

The achievements in mathematical and programming domains demonstrate AI's growing ability to excel in complex reasoning tasks, while the focus on safety and governance reflects an awareness of potential risks as these systems become more powerful and widely deployed.

For organizations looking to leverage AI, the expanding ecosystem of tools and models offers more options, but also requires careful evaluation of capabilities, limitations, and alignment with specific use cases.

## Source Cards

[1] Elhage, N. (2025, October 21). Solving Regex Crosswords with Z3. Nelson Elhage (Made of Bugs). https://blog.nelhage.com/post/regex-crosswords-z3/

[2] Google DeepMind Blog. (2025, October 24). Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad. https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/

[3] Lambert, N. (2025, October 16). The State of Open Models. Interconnects (Nathan Lambert). https://www.interconnects.ai/p/state-of-open-models-2025

[4] OpenAI Blog. (2025, October 6). Introducing AgentKit, new Evals, and RFT for agents. https://openai.com/index/introducing-agentkit

[5] OpenAI Blog. (2025, October 14). Expert Council on Well-Being and AI. https://openai.com/index/expert-council-on-well-being-and-ai

[6] OpenAI Blog. (2025, October 22). The next chapter for UK sovereign AI. https://openai.com/index/the-next-chapter-for-uk-sovereign-ai

[7] OpenAI Blog. (2025, October 29). Technical Report: Performance and baseline evaluations of gpt-oss-safeguard-120b and gpt-oss-safeguard-20b. https://openai.com/index/gpt-oss-safeguard-technical-report

[8] Google DeepMind Blog. (2025, October 24). AlphaEarth Foundations helps map our planet in unprecedented detail. https://deepmind.google/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/

[9] Google DeepMind Blog. (2025, October 23). How a Gemma model helped discover a new potential cancer therapy pathway. https://deepmind.google/blog/how-a-gemma-model-helped-discover-a-new-potential-cancer-therapy-pathway/

[10] Google DeepMind Blog. (2025, October 23). Introducing the Gemini 2.5 Computer Use model. https://deepmind.google/blog/introducing-the-gemini-25-computer-use-model/

[11] Google DeepMind Blog. (2025, October 23). Introducing Gemma 3 270M: The compact model for hyper-efficient AI. https://deepmind.google/blog/introducing-gemma-3-270m-the-compact-model-for-hyper-efficient-ai/

[12] Google DeepMind Blog. (2025, October 23). Rethinking how we measure AI intelligence. https://deepmind.google/blog/rethinking-how-we-measure-ai-intelligence/

[13] Google DeepMind Blog. (2025, October 23). Try Deep Think in the Gemini app. https://deepmind.google/blog/try-deep-think-in-the-gemini-app/

[14] Google DeepMind Blog. (2025, October 23). Bringing AI to the next generation of fusion energy. https://deepmind.google/blog/bringing-ai-to-the-next-generation-of-fusion-energy/

[15] Google DeepMind Blog. (2025, October 23). Gemini Robotics 1.5 brings AI agents into the physical world. https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/

[16] Google DeepMind Blog. (2025, October 23). Strengthening our Frontier Safety Framework. https://deepmind.google/blog/strengthening-our-frontier-safety-framework/

[17] Google DeepMind Blog. (2025, October 24). Discovering new solutions to century-old problems in fluid dynamics. https://deepmind.google/blog/discovering-new-solutions-to-century-old-problems-in-fluid-dynamics/

[18] Google DeepMind Blog. (2025, October 24). Gemini achieves gold-medal level at the International Collegiate Programming Contest World Finals. https://deepmind.google/blog/gemini-achieves-gold-medal-level-at-the-international-collegiate-programming-contest-world-finals/

[19] Google DeepMind Blog. (2025, October 24). How AI is helping advance the science of bioacoustics to save endangered species. https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/

[20] Google DeepMind Blog. (2025, October 24). Genie 3: A new frontier for world models. https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/

[21] Google DeepMind Blog. (2025, October 24). Aeneas transforms how historians connect the past. https://deepmind.google/blog/aeneas-transforms-how-historians-connect-the-past/

[22] Google DeepMind Blog. (2025, October 25). Behind "ANCESTRA": combining Veo with live-action filmmaking. https://deepmind.google/blog/behind-ancestra-combining-veo-with-live-action-filmmaking/

[23] Google DeepMind Blog. (2025, October 25). Gemini 2.5 Flash-Lite is now ready for scaled production use. https://deepmind.google/blog/gemini-25-flash-lite-is-now-ready-for-scaled-production-use/

[24] Google DeepMind Blog. (2025, October 25). MedGemma: Our most capable open models for health AI development. https://deepmind.google/blog/medgemma-our-most-capable-open-models-for-health-ai-development/

[25] Google DeepMind Blog. (2025, October 29). Accelerating discovery with the AI for Math Initiative. https://deepmind.google/blog/accelerating-discovery-with-the-ai-for-math-initiative/

[26] Lambert, N. (2025, October 7). Thoughts on The Curve. Interconnects (Nathan Lambert). https://www.interconnects.ai/p/thoughts-on-the-curve

[27] Lambert, N. (2025, October 18). Latest open artifacts (#15): It's Qwen's world and we get to live in it, on CAISI's report, & GPT-OSS update. Interconnects (Nathan Lambert). https://www.interconnects.ai/p/latest-open-models-15-its-qwens-world

[28] Lambert, N. (2025, October 20). How to scale RL. Interconnects (Nathan Lambert). https://www.interconnects.ai/p/the-new-rl-scaling-laws

[29] Lambert, N. (2025, October 25). Burning out. Interconnects (Nathan Lambert). https://www.interconnects.ai/p/burning-out

[30] OpenAI Blog. (2025, October 2). OpenAI announces strategic collaboration with Japan's Digital Agency. https://openai.com/global-affairs/strategic-collaboration-with-japan-digital-agency

[31] OpenAI Blog. (2025, October 2). With GPT-5, Wrtn builds lifestyle AI for millions in Korea. https://openai.com/index/wrtn

[32] OpenAI Blog. (2025, October 6). Accelerating AI adoption in Europe. https://openai.com/global-affairs/accelerating-ai-uptake-in-europe

[33] OpenAI Blog. (2025, October 6). AMD and OpenAI announce strategic partnership to deploy 6 gigawatts of AMD GPUs. https://openai.com/index/openai-amd-strategic-partnership

[34] OpenAI Blog. (2025, October 6). Introducing apps in ChatGPT and the new Apps SDK. https://openai.com/index/introducing-apps-in-chatgpt

[35] OpenAI Blog. (2025, October 6). Codex is now generally available. https://openai.com/index/codex-now-generally-available

[36] OpenAI Blog. (2025, October 7). Disrupting malicious uses of AI: October 2025. https://openai.com/global-affairs/disrupting-malicious-uses-of-ai-october-2025

[37] OpenAI Blog. (2025, October 8). Growing impact and scale with ChatGPT. https://openai.com/index/hibob

[38] OpenAI Blog. (2025, October 9). Defining and evaluating political bias in LLMs. https://openai.com/index/defining-and-evaluating-political-bias-in-llms

[39] OpenAI Blog. (2025, October 10). HYGH powers next-gen digital ads with ChatGPT Business. https://openai.com/index/hygh

[40] OpenAI Blog. (2025, October 13). OpenAI and Broadcom announce strategic collaboration to deploy 10 gigawatts of OpenAI-designed AI accelerators. https://openai.com/index/openai-and-broadcom-announce-strategic-collaboration

[41] OpenAI Blog. (2025, October 14). Argentina's AI opportunity. https://openai.com/global-affairs/argentinas-ai-opportunity

[42] OpenAI Blog. (2025, October 21). Introducing ChatGPT Atlas, the browser with ChatGPT built in. https://openai.com/index/introducing-chatgpt-atlas

[43] OpenAI Blog. (2025, October 21). Continue your ChatGPT experience beyond WhatsApp. https://openai.com/index/chatgpt-whatsapp-transition

[44] OpenAI Blog. (2025, October 22). AI in Japan—OpenAI's Japan Economic Blueprint. https://openai.com/index/japan-economic-blueprint

[45] OpenAI Blog. (2025, October 23). AI in South Korea—OpenAI's Economic Blueprint. https://openai.com/index/south-korea-economic-blueprint

[46] OpenAI Blog. (2025, October 23). Consensus accelerates research with GPT-5 and Responses API. https://openai.com/index/consensus

[47] OpenAI Blog. (2025, October 23). OpenAI acquires Software Applications Incorporated, maker of Sky. https://openai.com/index/openai-acquires-software-applications-incorporated

[48] OpenAI Blog. (2025, October 27). A law and tax firm redefines efficiency with ChatGPT Business. https://openai.com/index/steuerrecht

[49] OpenAI Blog. (2025, October 27). Strengthening ChatGPT's responses in sensitive conversations. https://openai.com/index/strengthening-chatgpt-responses-in-sensitive-conversations

[50] OpenAI Blog. (2025, October 27). Addendum to GPT-5 System Card: Sensitive conversations. https://openai.com/index/gpt-5-system-card-sensitive-conversations

[51] OpenAI Blog. (2025, October 27). Seizing the AI opportunity. https://openai.com/global-affairs/seizing-the-ai-opportunity

[52] OpenAI Blog. (2025, October 28). Built to benefit everyone. https://openai.com/index/built-to-benefit-everyone

[53] OpenAI Blog. (2025, October 28). The next chapter of the Microsoft–OpenAI partnership. https://openai.com/index/next-chapter-of-microsoft-openai-partnership

[54] OpenAI Blog. (2025, October 28). Doppel's AI defense system stops attacks before they spread. https://openai.com/index/doppel

[55] OpenAI Blog. (2025, October 28). Knowledge preservation powered by ChatGPT. https://openai.com/index/dai-nippon-printing

[56] OpenAI Blog. (2025, October 29). Introducing gpt-oss-safeguard. https://openai.com/index/introducing-gpt-oss-safeguard

[57] OpenAI Blog. (2025, October 23). Work smarter with your company knowledge in ChatGPT. https://openai.com/index/introducing-company-knowledge

[58] OpenAI Blog. (2025, October 30). How we built OWL, the new architecture behind our ChatGPT-based browser, Atlas. https://openai.com/index/building-chatgpt-atlas

[59] OpenAI Blog. (2025, October 30). Introducing Aardvark: OpenAI's agentic security researcher. https://openai.com/index/introducing-aardvark

[60] OpenAI Blog. (2025, October 30). Expanding Stargate to Michigan. https://openai.com/index/expanding-stargate-to-michigan

[61] Boykis, V. (2025, October 20). I want to see the claw. Vicki Boykis. https://veekaybee.github.io/2025/10/20/i-want-to-see-the-claw/

[62] Raschka, S. (2025, October 29). DGX Spark and Mac Mini for Local PyTorch Development. Sebastian Raschka's Blog. https://sebastianraschka.com/blog/2025/dgx-impressions.html

[63] OpenAI Blog. (2025, October 15). Plex Coffee delivers fast service and personal connections with ChatGPT Business. https://openai.com/index/plex-coffee
