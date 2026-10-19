---
title: "Building AI Workspaces with Grok Bot, Buzz, and Dots"
slug: "building-ai-workspaces-grok-bot-buzz-dots"
category: "essay"
period_type: "essay"
published_at: "2026-10-15T10:40:00"
word_count: 1404
reading_time_minutes: 8
file: "2026-10-15-1040-building-ai-workspaces-grok-bot-buzz-dots.md"
source_url: "https://www.linkedin.com/feed/update/urn:li:activity:7516226125606477824"
source_id: "linkedin:activity:7516226125606477824"
bundle_sha256: "4a4d46fb8d0966c080e2a2165cdc01ef6cb512b95cdc431d83a2cfc34497b083"
---

I approached Grok Bot, Buzz, and OpenAI's Dots thinking I was comparing three versions of the same product. An agent with a computer. Give it tools, give it a job, see what happens.

After building with all three, I came away with three different answers. Each had something I wanted, and each had something I'd need to work around. None had everything I wanted.

The interesting question for me is what I can build on top of them, and how close that gets the person who knows the business to the tools doing the work.

## Shorten the feedback loop

A lot of custom AI software still lives inside a long chain of handoffs. A founder has a question. It goes to an account manager, then a ticket, then a PM, then a developer, then a model. The answer makes its way back through the same people.

That can be a silly amount of distance between the person who understands the problem and the system that could help solve it.

AI workspaces create an opportunity to shorten that loop. Ask the question where the team already works. Get an answer, inspect the work, approve the next step, and escalate to a developer when necessary. Keep more of the conversation, context, and feedback in Slack, Teams, or the channels people already use.

That's why I'm interested in designing these systems for clients. The interface matters because it changes who can participate.

## Tools and roles determine the value

A workspace is about as good as its operator, their willingness to adopt it, the tools they provision, and the skills they give their agents.

In my GTM workflows, agents work with tools such as Parallel, Deepline, Ocean, Apollo, my CRM, Bounceban, Smartlead, LinkedIn, DataforSEO, Google Keyword Planner, Google Search Console, and Supabase. These are purpose-built tools connected for specific jobs. Giving an agent the right API can change what it can deliver.

Why use several agents with different roles instead of giving one agent all those tools?

First, I've had better outcomes with focused roles. Each agent brings its own context window, narrower attention to its tools, and a perspective on the job. That's an observation from my workflows, not a controlled benchmark.

Second, people already think in roles. They know who owns the CRM, who writes the copy, and who checks the data. That makes it easier to imagine a founder launching a campaign or reporting a bug from their phone without learning a new system.

Third, adoption is part of the engineering. I learned this migrating a 100-person pen-and-paper law firm to HubSpot. We eventually got the workflow into Microsoft Teams, where they wanted to work. Less friction made a difference.

That is the lens I brought to these three products.

## Grok Bot: low friction, quick value

The agent computer was the part I liked most. It felt like a real part of the experience.

From inside Grok Bot, I set up a DigitalOcean account, worked through payment using Link, and configured a server for a specific scraping job. That's fairly technical work, and I wasn't doing the technical steps myself. I could coordinate it from the product.

As a GTM engineer, I spend a lot of time signing up for tools, topping up API credits, and connecting services. Having an agent help with those steps matters. I even created a dedicated agent to track spending across my GTM tools.

Then I hit my plan's usage limit sooner than I expected.

I found a model breakdown in Cursor that showed mostly Sonnet 4.5. My takeaway was that much of the usage I could see was on the cheaper model family, while I wanted more compute on some of those runs. I wanted more visibility into routing and more control over when a task deserved a stronger model.

Before depending on this for recurring work, I'd run a workflow long enough to understand the allowance. What consumes it? What happens when it runs out? What control do I have over the model doing the work?

I also need to be comfortable with the data policy before putting sensitive client workflows into it. My early inclination is to start with low-stakes GTM work.

Getting something running was compelling. Understanding what it would take to keep it running is the next question.

## Buzz: own the system, manage it like a fleet

Buzz scratched a different itch.

I want to build useful agent teams, improve them over time, and reuse what works. I want to choose the models and tools behind them, inspect their configuration, and carry the work forward as meaningful IP.

I was able to build and train a team, then move it to another community with selected instructions carried over. That made the idea of managing a fleet of reusable agents feel tangible.

The tradeoff was that I had more to assemble.

For my setup, I configured remote infrastructure using Kubernetes and added Browser Use for recurring browser workflows. Those were costs in both money and time. Open-source software can be free while the system you operate around it still costs something.

Some workflows also behaved differently after I configured the infrastructure. The hangups I ran into were around governance, which meant maintenance and learning. Owning the setup gave me more ability to shape the guardrails, but it also made more of the work my responsibility.

There are days I regret how much I took on. I'm ideological and stubborn enough to keep building with it anyway.

I like the participation around the public repository and being able to shape the system myself. The experiments and repository-focused projects also make me interested in how much more repeatable these workflows could become.

I wouldn't put a client on my current instance as-is. I'm treating it as a learning project with real potential for building and reusing teams. The question is how much operating burden I'm willing to own, and how much friction a client should have to inherit.

## Dots: one proactive agent can still matter

I expected Dots to feel like a fleet of specialist agents I could organize around separate jobs.

My experience felt closer to one persistent assistant keeping track of things and coordinating work in the background. It could delegate, but I wanted more visibility into those responsibilities and how the work was organized. That initially felt underwhelming.

Then my dot flagged an overdue insurance item I'd missed in my inbox. An important one.

I sorted it out, wasn't clear when I'd hear back, and later my dot let me know it was resolved. I hadn't built an elaborate system to make that happen. It caught an open end that mattered and followed through.

That made the value much clearer to me.

A lot of people don't want to design an orchestrator or manage a fleet. They want help remembering what needs attention and closing the loop. I can get behind that.

Being able to call my dot from my phone was another highlight. I'd like to see that help more people go for a walk, think creatively, or get organized before they start the day.

My early experience felt buggy in places. As I gave it more to handle, I wanted more control over organization and more visibility into the work. I'm still learning where that experience fits best.

## What I'd test before committing

I went looking for interchangeable products and found different things I wanted to build.

Grok Bot made me think about how quickly I could get something running, with questions about privacy, limits, and model routing.

Buzz made me think about how much of the system I could shape and reuse, with questions about maintenance and client onboarding.

Dots made me think about how useful one proactive assistant could be, with questions about organization and visibility.

Before choosing a workspace for a real workflow, I'd ask:

- Can I use the models and tools that matter for this job?
- Can I inspect what happened and recover from a failed run?
- Can I reuse the setup somewhere else?
- How are data privacy and retention handled?
- What happens when I hit a limit?
- How much maintenance am I signing up for?
- Can the people who need the system actually adopt it?

The right fit depends on the work, the people doing it, and how much of the system you want to own. Those are the things I'd evaluate before committing to a build.

---

Originally published on [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7516226125606477824).
