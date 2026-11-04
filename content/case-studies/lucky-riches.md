---
slug: lucky-riches
order: 1
title: Lucky Riches
panelTitle: Lucky Riches casino platform
hook: 250 screens, 480+ behaviour rules, one design system. Live.
oneLiner: Designing an investor-backed online casino end to end on a fixed fee, from discovery to QA, with a three-party deposit flow and a regulated-market KYC model to get right.
tags: Product Design, Design Systems, Developer Handoff
year: 2026
description: Leading design for a bespoke casino build on Terragon's white-label platform: eleven product flows, a tokenised design system aligned to shadcn and Tailwind, and 21 behaviour-spec documents that let the provider's developers rebuild components rather than reuse the shell.
client: Lucky Riches, investor-backed; platform by Terragon
timeline: 2026
role: Lead Product Designer, fixed-fee engagement, discovery through QA
team: Product manager, data analyst, marketing team, Terragon's development team, the payment provider, and compliance
hero: hero.jpg
heroAlt: The Missions hub across its four tier colours
outcomes:
  - Live and taking deposits
  - 250 full-page comps handed over across 11 flows, mobile and desktop
  - 21 behaviour-spec documents, roughly 480 numbered rules, written alongside the screens
  - Deposit and withdrawal collapsed into one flow with the last-used method pre-selected
  - Tiered, risk-triggered KYC so players can register and deposit before full verification, but not play or withdraw
---

### 1. Not a reskin

Most white-label casinos are a logo and a colour swap on the provider's platform. Lucky Riches was different because the investors owned the provider, Terragon, and wanted a product that was theirs. That changed the brief from "skin this" to "design this", and it changed what the developers were prepared to do: where the platform's components did not fit the design, Terragon rebuilt them.

I was brought in on a fixed fee to lead design end to end, from discovery through to QA sign-off. The working group was a product manager, a data analyst, the marketing team, Terragon's developers and, for anything that touched money, an off-site payment provider and compliance. Eleven product flows were in scope: sign-in and password recovery, registration, home, search, bonuses, cashier, in-game, error states, missions, my account and an affiliate landing page.

::image full s1-overview.jpg
The handoff file. Eleven flows, 250 screens, 21 behaviour specs. The numbers are the deliverable, not the story.

### 2. One deposit flow, not two

The deposit was the hardest piece because it did not belong to any one party. The screens were ours, the shell was Terragon's, and the moment a player confirmed an amount they went off-site to the payment provider. That provider had to be brought up to date on what we were building, shown the flow, and persuaded it could support what we needed inside it. A lot of the design work on Cashier was negotiation.

Into that, the product manager proposed a quick-deposit pop-up for returning players: a different modal with their previous card already selected. On paper it was a conversion win. In practice it meant two parallel deposit journeys to design, build and keep in sync, and a third branch the moment a returning player wanted to add a card we had not saved. I argued for one flow instead, with whatever method the player used last pre-selected on entry. New players and returning players would walk the same path and the pre-selection would do the quick-deposit job without a second build. That is what shipped, with the withdrawal reversal surfaced inside the same flow so a player with a pending withdrawal could cancel it and play without leaving the cashier.

::image pair s2-deposit-new.jpg s2-deposit-saved.jpg
One journey, one set of transactional states, one thing for Terragon and the payment provider to test. Left, a first deposit; right, the same flow for a returning player with the saved method pre-selected.

### 3. The spec is the design

Because the developers were rebuilding components rather than reusing them, screens alone would not have been enough. Every flow shipped with a behaviour-spec document of numbered rules: 21 documents and roughly 480 rules across the file, 86 of them for Cashier alone, covering transactional states from "connecting" through "card expired" to "pending review". Sign-in uses a generic authentication error so the form cannot be used to enumerate accounts. Password reset is rate-limited invisibly. In-game, the rule is that the game never stops: search and deposit open as overlays with play continuing behind them.

The design system underneath is tokenised and aligned to shadcn and Tailwind so that a variant in Figma maps to a variant in code. Missions is the clearest example of why that mattered: one tier colour token drives every component in the hub across four tiers, the countdown switches to an hh:mm:ss urgent state under 24 hours and fires the failed modal itself at zero, and the six-page mobile explainer condenses to three on desktop. All of that is a handful of rules, not a hundred extra screens.

::image pair s3-cashier-spec.jpg s3-missions.jpg
86 rules for the money, one colour token for the game. Left, the Cashier behaviour spec; right, the Missions hub in two tier colours.

### 4. Compliance you can see

Regulated gambling puts responsible-play and verification requirements on the product that most apps never face, and I treated them as design problems rather than legal copy. Verification is tiered and risk-triggered: four levels, each with a Verified, Required, Pending, Optional or Not-required-yet status, with identity, proof of payment and source-of-wealth checks switched on by operator-configurable risk rules. Players can register and deposit before full verification but are gated from play and withdrawal until their profile is complete, and when verification is done the success screen sends them back to wherever they came from, game, withdrawal or hub. Take a Break confirms, logs the player out and suspends the account with start and end times computed in real time. Restricted territories never appear in the country index at registration.

The registration-to-cashier redirect is the one I lost. I pushed back on dropping a new player straight into the cashier before they had seen a game. The product manager had conversion data from another platform in the group showing it was the best-performing flow, and the evidence was better than my instinct. What I got in exchange was the shape of verification: registration asks the minimum, the deposit comes first, and the full profile and documents are only demanded at withdrawal, when the player is already invested. That is where the four-level, risk-triggered model came from. The business kept its conversion; the player got a short sign-up and a KYC burden deferred to the point it made sense. Both decisions, and the never-empty Featured tab, are written into the specs as deliberate commercial calls so nobody later mistakes them for defaults.

The product is live.

::image full s4-verification.jpg
The regulated bits are where the design judgement shows, not where it stops. The verification hub and the Take a Break confirmation, mobile and desktop.
