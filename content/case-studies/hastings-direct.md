---
slug: hastings-direct
order: 4
title: Hastings Direct
panelTitle: Hastings Direct
hook: Ease of use up 33%, task success up 14%. Same 42 questions.
oneLiner: Restructuring a 42-question car insurance quote journey that underwriting would not let us shorten. I owned the journey map, the competitor grouping audit and the user testing behind the new structure, and the auto-renewal test.
tags: UX Design, User Research
year: 2020
description: Redesigning the online quote journey to reduce drop-off and restore confidence, inside underwriting and regulatory constraints that fixed most of the questions in place.
client: Hastings Direct, via Wunderman Thompson
role: UX Designer
team: Head of UX, two senior UX designers, UX researcher, UI designer, account manager. Client side: directors, heads of department, in-house UX team, product owners, project managers, marketing, compliance and underwriting
hero: hero.jpg
heroAlt: The customer journey map for purchasing car insurance direct, with the emotional curve across discovery, get a price, customise and buy
outcomes:
  - 33% increase in reported ease of use, six months post-launch
  - 14% increase in users finding what they needed
  - 42 questions kept; none of the gains came from cutting them
  - Auto-renewal control moved to where customers expected it, after testing with six users
---

### 1. Bottom quartile, and nobody knew why

Industry benchmarking put Hastings Direct in the bottom quartile for start-to-quote conversion. The numbers behind that were stark: 63% of users did not complete the form, 38% of those who did still failed to get a quote, and the average feedback rating was 6.54. The assumption going in was that 42 questions was simply too many; a benchmark competitor asked 23.

::image full s1-before.jpg
The journey we inherited. Left, the registration lookup that returns a wall of fields; centre, a quote buried among plan tables; right, the same action labelled and placed differently from screen to screen.

The research said something more useful. Eleven usability tests, a round of customer interviews and a customer survey went into a single customer journey map, which I was responsible for building with the UX researcher. Only 7 of the 11 testers reached a price. Average time to a quote was 17 minutes 53 seconds. In the survey, 75% had negative feelings about buying insurance and only 4% called it easy. But the number of questions was not what people complained about. Fields were grouped without logic, jargon went unexplained, and the four-step progress bar lied: "It says it has four steps, but it keeps adding and adding questions. I want to see exactly how long I have left."

::image full s1-journey-map.jpg
The middle of the map: the never-ending form, the 23-versus-42 question comparison, and the point where the emotional curve bottoms out at a failed quote. Every pain point carries a user quote, a stakeholder constraint and a competitor doing it better.

### 2. Underwriting said no. That turned out to be the useful answer

Our first proposal cut questions. Compliance were open to it, which surprised us. Underwriting were not, and they were right: the only way to price a quote lower is to ask the questions that legitimately change a customer's risk profile, and a shorter form means a more expensive quote. There was a genuine back and forth, and we won a handful of removals, but they were marginal questions. The big ask, cutting the journey materially, was lost.

That changed the design question from "how many" to "how". If the questions had to stay, the work was in how they were grouped, paced and explained. That part was mine. I audited how direct and indirect competitors grouped the same questions, identified the groupings that recurred and the ones that only existed because of a back-office system, and built alternative structures from them. We then tested those versions with users to see which grouping felt shortest for the same number of questions. The one that won became the three-stage journey: Details, Cover, Quote, with a visible indicator that never added a step. Each section got a clear purpose. Jargon was rewritten with compliance in the room. Error states became recovery paths instead of dead ends.

We also brought the client's in-house UX team into decisions early, consulting them on how Hastings would approach each change before anything reached the directors. The point was that the people who would own the journey after we left felt listened to and had shaped it.

::image pair s2-found-it.jpg s2-progress.jpg
Not a single mandatory question was cut. The journey got clearer, not shorter. Left, the registration lookup: one field, and the car comes back named, so the first thing the form does is prove it already knows something about you. Right, the progress indicator across three screens: its position never moves, only its state does.

### 3. Six people looked in the same place. It was not there

Partway through, a regulatory change meant customers had to be able to switch off auto-renewal. The client's first instinct was to put the control deep inside a sub-menu in settings. Renewals are revenue, and the pull was understandable.

Rather than argue the point, I tested it. I built the task into the prototype: understand what auto-renewal is, then find it and turn it off, with no help from me. Most of the six participants could not find it. What made the finding persuasive was not the failure rate but the pattern: when asked where they expected it to be, almost everyone named the same place, and it was not where the client had put it.

I took the screen recordings, the frustration moments and the verbatim quotes back to the director-level review and made the case: this was not an opinion about hierarchy, it was six customers all looking in one spot. The client moved the control out of the buried sub-menu and into the place users had pointed to. On a regulated product, that is the difference between technically compliant and actually usable.

::image pair s3-test-session.jpg s3-auto-renew.jpg
Evidence beats opinion in a room full of directors. Left, usability-test notes with frequency and severity scored per finding. Right, where the client first put it in the app: a row inside Settings, opening its own screen, with an "Are you sure?" step before opting out.

### 4. Pressure, parallel streams and the results

All of this ran inside a six-month deadline, with My Account and live-site fixes going out in parallel, and holding two rounds of usability testing inside it was a deliberate choice; the auto-renewal finding is why it was worth it.

One argument we expected and did not get: marketing agreed quickly to replace promotional messaging at the quote reveal with reassurance, once they saw that every tester said they would drop off at the upsell page and the map's lowest point was a failed quote delivered coldly.

Six months after launch, reported ease of use was up 33% and task success 14% on the pre- and post-launch survey. NPS rose too, but I won't claim a company metric for one journey. None of it came from removing questions. It came from restructuring how the same questions were presented, and from one room full of directors watching six customers fail the same task.

::image full s4-policy-comparison.jpg
The same 42 questions, restructured around how people actually decide. The policy step: excess and start date first, then one choice between two policies, with the cheaper one pre-selected and the difference spelled out.
