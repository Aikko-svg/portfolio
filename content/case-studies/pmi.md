---
slug: pmi
order: 2
title: PMI
panelTitle: PMI retailer platform
hook: Retailer task completion up 21%, market launches 38% faster. One component system, 4 markets to 14.
oneLiner: One component system for a retailer platform that had grown differently in every European market. 4 markets at launch, 14 while I was there, worldwide since.
tags: Product Design, Design Systems, IA
year: 2023
description: One shared component system and information architecture for PMI's B2B retailer platform, balancing what head office would fund against what each market wanted.
client: Philip Morris International, via The Croc
role: Senior UX Designer and project lead. I led two designers and owned the IA and component work
team: The Croc design and delivery team. Client side: PMI head office digital team, market leads, IQOS brand team, compliance. HQ held scope and budget, markets owned their catalogues, compliance set the hard rules
hero: hero.jpg
heroAlt: The redesigned homepage and Rewards screens on two phones
outcomes:
  - +21% retailer task completion, 62% to 75% averaged across launch markets (Salesforce Einstein Analytics)
  - 38% faster market launches, 16 weeks to 10, because every component was built once for all markets
  - +32% time on platform, which was the goal on a platform built to train retailers as well as sell
  - 14 markets while I was there, from 4 at launch, and worldwide since
---

### 1. Same products, a different platform in every country

PMI's retailer platform had grown up separately in each European market. Same company, same products, but every country's site had been built around its own catalogue and priorities. Retailers use it to complete tasks, training and selling activities that earn rewards. HQ wanted one component system every market could reuse and reorder, instead of paying for a separate build each time.

Germany was the hard one. It already had a site that worked, so ours had to beat it before they would switch. We made Germany the bar for everyone.

::image full s1-before-state.jpg
The legacy German platform: a feed of promotions, a system notice as the welcome, and banners with no hierarchy between them.

### 2. We had the evidence before the brief arrived

I had worked on the platform market by market for two years before this, so we didn't start cold. A review of nine live markets showed the same problems everywhere: ten or eleven items in the main menu, related content scattered, support buried. The analytics told the rest. In one market the tasks page took over three quarters of all views, and almost half of those people left without opening anything else. Retailers came for a task and went.

That led to a six-group architecture, which we tested by walking eight real user stories through it screen by screen. It took three rounds before it held. By the time the markets were in the room, "what do retailers actually do here?" had an answer that wasn't anyone's opinion.

::image pair s2-menus.jpg s2-analytics.jpg
Left, three markets' menus from the nine-market review. Right, the analytics: almost half of retailers who reached My Tasks left without visiting another page.

### 3. Finding the sweet spot between HQ and the markets

This was the political part. The markets wanted a lot of components, each tuned to their own catalogue. HQ wanted as few new builds as possible, to protect the timeline and keep the system maintainable. Both had a point.

Honestly, I wanted more components too. My workaround was to put every market request through one question first: can an existing component do this with a CSS change to colour, layout, order or density? Most could. That left a short list that genuinely needed building, and I took that list to HQ with the research behind it.

A good example: one market asked for a separate task-management component to push mandatory retailer actions, while others wanted campaigns and incentives at the top. Building for both meant new components to maintain for every market. I kept the shared dashboard card and recommended approved variants based on the type and urgency of the content, so a mandatory action looks and behaves like one without a new build.

We agreed the short list in regional workshops with the markets and HQ together. Some markets gave up control over layouts and content they had asked for. In return they got a system that shipped on time and that HQ could keep running.

::image pair s3-component-library.jpg s3-variants.jpg
Left, the shared design system. Right, the same Rewards template in two market configurations: restyled, not rebuilt.

### 4. One hierarchy, rearranged per market

Three groups pulled at the IA. The IQOS brand team wanted products in the main navigation. Compliance ruled that some product groups could not appear together. Every market wanted the hierarchy that suited its own catalogue.

Compliance set the hard lines, the research settled the rest, and inside that each market could reorder. The same homepage card carries a different task order in every market, because the order is a market setting and the card isn't.

::image pair s3-ia.jpg s4-same-component.jpg
Left, the six-group architecture. Right, the homepage and My Tasks built from the same card component.

### 5. Results

Retailer task completion rose from 62% to 75% on average, and new markets launched in 10 weeks instead of 16 because they configured what already existed. Time on platform went up 32%. That matters here: the platform exists to educate retailers about the products as much as to sell them, which is why the learning sits inside tasks with rewards. We launched with four markets and reached fourteen before I left. The system has since gone worldwide.

What I'd do differently: lock in HQ's limits sooner. If we had agreed early which components and features mattered most, the markets would have had a clear frame from day one, instead of us working it out request by request.

::image full s5-live-platform.jpg
One system, fourteen hierarchies: every market reorders the same cards for its own catalogue.
