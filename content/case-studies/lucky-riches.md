---
slug: lucky-riches
order: 4
title: Lucky Riches
panelTitle: Lucky Riches casino platform
hook: Sole designer, zero to launch. 90% registration completion, 79% deposit completion.
oneLiner: Designing a regulated casino platform from zero to launch as the sole designer: the cashier, verification, and the design system underneath.
tags: Product Design, Design Systems, 0 to 1
year: 2026
description: A bespoke build on a white-label platform where every payment touched three parties. I designed eleven flows, the behaviour specs the developers built from, and the design system underneath.
client: Lucky Riches, investor-backed
role: Lead Product Designer, sole designer, discovery through QA
team: Product manager, who set priorities and owned conversion calls. The platform provider's developers, who built it. The payment provider and compliance, who signed off anything touching money or regulation
hero: hero.jpg
heroAlt: The cashier on desktop with a withdrawal under review on mobile
outcomes:
  - 90% registration completion, from starting sign-up to account created
  - 79% deposit completion, from opening the cashier to payment success
  - 74% KYC completion among players who started verification
  - 28% of new accounts made a first deposit
  - Live since the end of August 2026. Figures reported by the founders, covering launch to early November
---

Most white-label casinos are a logo and a colour swap. Here the investors also owned the platform provider and wanted a product of their own, so where the platform's components didn't fit, the developers rebuilt them. I was the only designer, from discovery to QA, and every payment involved three parties: our screens, the provider's shell, and an external payment provider.

### 1. One cashier for every player

The product manager wanted a separate quick-deposit pop-up for returning players. On paper it was a conversion win. In practice it meant two deposit journeys to build, test and keep in sync, and a third branch the moment a returning player wanted a new card.

I argued for one cashier with the last-used method pre-selected. Returning players got the speed without a second build, and pending withdrawals could be reversed from the same screen. That's what shipped: 79% of players who open the cashier complete a deposit.

::image full s2-one-flow.jpg
New and returning players on the same screen. The saved method and pending withdrawals only appear when they exist.

Because the developers were rebuilding components, screens weren't enough. Every flow shipped with numbered behaviour rules, 86 for the cashier alone, so every state from waiting on the payment provider to each failure was designed, not left to chance.

::image full s3-states.jpg
Every deposit outcome designed up front, next to the real spec the developers built from.

### 2. The argument I lost, and what it got me

I pushed back on sending new players straight to the cashier after sign-up. I wanted them to see the product first. The product manager had conversion data from a comparable platform, and it was better evidence than my instinct, so I let it go.

What I got in return was the shape of verification. Registration asks only what's needed to open an account. Players complete their profile before they play, and full identity checks only come when money leaves. Extra checks switch on when risk rules say so, not for everyone. After launch, 90% of people who started registering finished, and 28% of new accounts made a first deposit. Before launch, 11 of 12 people completed every key task in usability testing, from registration and deposit limits to withdrawals.

::image full s2-timeline.jpg
What each player is asked, and when. Full KYC sits at withdrawal, with risk triggers able to bring checks forward.

::image full s4-verification.jpg
The verification hub, with a clear status for each level, and Take a Break showing its exact start and end time before you confirm.

### 3. The system underneath

I built the design system from the first week: primitive colour scales in Tailwind-style steps, role tokens on top for surfaces, text and borders, plus spacing, radius and type. The developers built from the same token names, so a variant in Figma was a variant in code. Components were built from other components, so the payment method row is made of the same chips, input and button used everywhere else.

::image full s3-system.jpg
From token to component to the shipped cashier.

::image full s3-missions.jpg
Missions shows the range: one template in four tiers, where the tier token sets the colour and each tier gets its own vault and jackpot.

### 4. What I'd do next

KYC is the number I'd go after next. 74% finish it once they start, and I'd want to know exactly where the rest stop before redesigning anything.
