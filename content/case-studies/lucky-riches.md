---
slug: lucky-riches
order: 4
title: Lucky Riches
panelTitle: Lucky Riches casino platform
hook: One deposit flow instead of two, and verification players only meet when it matters. 11 of 12 testers completed every key task.
oneLiner: Designing a regulated real-money platform end to end, from discovery to QA, where the hard parts were money, verification and responsible play.
tags: Product Design, Design Systems, Developer Handoff
year: 2026
description: Leading design for a bespoke build on a white-label platform: eleven product flows, a tokenised design system that maps to code, and behaviour specs the provider's developers built from.
client: Lucky Riches, investor-backed
role: Lead Product Designer, sole designer, fixed-fee engagement from discovery through QA
team: Product manager, who set priorities and owned conversion calls. Data analyst, marketing, the platform provider's developers, who built it. The payment provider and compliance, who signed off anything touching money or regulation
hero: hero.jpg
heroAlt: The cashier on desktop with a withdrawal under review on mobile
outcomes:
  - 11 of 12 usability participants completed every key task, from registration to withdrawal
  - 1 deposit flow for new and returning players, instead of a second quick-deposit build
  - 4 verification levels, triggered by risk, so players register and deposit before full KYC
  - Live in 2026. Deposit success, registration and KYC completion are being collected now
---

### 1. Not a reskin

Most white-label casinos are a logo and a colour swap on the provider's platform. Lucky Riches was different: the investors also owned the provider, and wanted a product that was theirs. So the brief became "design this" rather than "skin this", and where the platform's components didn't fit, the developers rebuilt them.

I led design end to end as the only designer, from discovery through to QA sign-off, across eleven flows: sign-in, registration, home, search, bonuses, cashier, in-game, errors, missions, my account and an affiliate page.

### 2. One deposit flow, not two

The deposit didn't belong to any one party. The screens were ours, the shell was the provider's, and once a player confirmed an amount they went off to the payment provider. A lot of the cashier work was getting all three to agree on what each screen did.

The product manager proposed a separate quick-deposit pop-up for returning players. On paper it was a conversion win. In practice it meant two deposit journeys to build, test and keep in sync, and a third branch as soon as a returning player wanted a new card. I argued for one flow with the last-used method pre-selected, so returning players got the speed without a second build. That's what shipped, with pending withdrawals reversible from the same screen.

::image full s2-one-flow.jpg
New and returning players on the same screen. The saved method and pending withdrawals appear when they exist, nothing more.

### 3. The spec is the design

Because the developers were rebuilding components, screens on their own weren't enough. Every flow came with numbered behaviour rules, 86 for the cashier alone, covering every state from waiting on the payment provider to each failure. Sign-in uses a generic error so it can't be used to check whether an account exists. In-game, the game never stops: search and deposit open over it.

::image full s3-states.jpg
Every deposit outcome designed up front, next to the real spec the developers built from.

The design system is tokenised and matched to the developers' component library, so a variant in Figma is a variant in code. Missions shows why that mattered: one tier token drives every component across four tiers, so a new tier is a token change, not new screens.

::image full s3-missions.jpg
The same Missions hub in four tiers, driven by one colour token.

### 4. Compliance you can see

Regulated gambling puts verification and responsible-play rules on the product that most apps never face. I treated them as design problems, not legal copy. Verification has four levels, each with a clear status, and the checks are switched on by risk rules the operator controls. Take a Break confirms the exact start and end time before it suspends the account. Restricted countries never appear at registration.

One argument I lost: I pushed back on sending new players straight to the cashier after registration. The product manager had conversion data from a comparable platform, and it was better evidence than my instinct. What I got in return was the shape of verification. Registration asks the minimum, and full documents are only needed at withdrawal. We tested registration, deposits, deposit limits, transaction errors and withdrawals with 12 people, and 11 completed every task.

::image full s4-verification.jpg
Tiered verification with a clear status per level, and Take a Break with its exact times shown before you confirm.
