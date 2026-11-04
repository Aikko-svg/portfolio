---
slug: utility-warehouse
order: 1
title: Utility Warehouse
panelTitle: William: Utility Warehouse
hook: Misdispatched engineers cost £1M a year. Three months after launch: £184K back, 56% fewer bad tickets.
oneLiner: Replacing a fault-raising system that bounced tickets back to advisers and angry customers, during a CRM migration that wanted it copied as it was.
tags: UX Design, UX Research
year: 2019
description: Owning the redesign of the fault-raising and triage template from first principles during the migration from BILL to William, instead of rebuilding broken logic in a new shell.
client: Utility Warehouse, in-house
role: UX Designer
team: Programme lead, a director-level sponsor, first-line advisers, head of second line, second-line engineers, Learning and Development, and the William platform engineers
hero: hero.jpg
heroAlt: The William ticket status panel beside the adviser's actions list, with SLA and resolution progress
outcomes:
  - 56% reduction in ticket quality errors reaching second line
  - £184K saved within three months from reduced engineer misdispatch
  - 17% reduction in average handling time on fault calls
  - Six escalation pathways consolidated into one structured flow
  - Fault flow and the adviser training programme designed together, not in sequence
---

### 1. A ticket that came back the next day

A first-line adviser at Utility Warehouse took a call about a fault, filled in the legacy BILL form, and raised it to second line. The form was a dense editing window built on pre-selected templates: a manual fault code, outdated questions pasted into a free-text box, no validation. Nothing stopped an incomplete ticket going through. A day later, sometimes sooner, it came back marked incorrectly raised.

The adviser then had to ring the customer again, explain that an engineer was not coming yet and that more checks were needed, and ask questions the customer believed they had already answered. The customer wanted it fixed yesterday. The adviser took the anger for a system that had given them no way to get it right first time.

At the business level, the head of second line, who managed external engineer dispatch and reported on fines, put the previous year's cost of misdispatched engineers, including the fines they attracted, at £1 million. Over 40% of fault submissions needed manual correction. Six separate escalation pathways were applied inconsistently. It looked like a training problem. It was an architecture problem.

::image full s1-legacy-form.jpg
The legacy BILL enquiry window. A manual code, a fault type, and the diagnostic questions as a paragraph of text in a scrolling box. No validation, no guidance, no way to know whether a ticket was complete before it left your screen.

### 2. Twenty-four steps, five hand-offs, six ways to escalate

Before touching the form, I mapped the whole journey: from the customer's first call, through first-line troubleshooting, fault raising, hand-off to second line, and back to the customer at ticket close. Twenty-four steps across five phases, with the goal, the pain points and the opportunities for each, built with every department that touched it.

The map made the diagnosis unarguable. The pain was not in any one step; it was in the hand-offs. First line gathered details second line did not need and missed the ones they did. Fault categories were chosen by guesswork. Nobody could see where a ticket was once it left them, so duplicates were raised and customers were called back with nothing new to say. Six escalation routes existed because six teams had each built their own.

::image full s2-journey-map.jpg
The operational journey map, which I owned: 24 steps, five phases, pain points and opportunities per step. The curve bottoms out at fault raising and hand-off, not at the customer's first call.

### 3. Copying the workflow would copy the £1 million

Utility Warehouse was migrating from BILL to William, a new cloud platform. The programme lead and a director-level sponsor wanted the existing fault workflows replicated in William on the faster timeline a straight copy allowed. The migration deadline was real and the argument was reasonable.

As a design team we pushed back: copying the workflow would copy the £1 million. The migration was the one moment the fault architecture could be rebuilt from first principles, and that window would not come again. We did not win it clean, but the principle held: William would get a redesigned fault and triage flow, not a lift and shift.

Our first approach to the redesign was to consult each department separately. It did not work; feedback from one group contradicted the last, and every round trip reopened a decision someone had already signed off. So we changed how we worked: one workshop, every part of the business the fault flow touched in the room, decisions made once. Bringing Learning and Development in was the decision that mattered most. New advisers spent a week in a classroom before taking live calls, and designing the flow with L&D meant the training was rebuilt alongside the product. Advisers learned one system in the classroom and met the same system on the floor.

::image pair s3-legacy-vs-new.jpg s3-user-flow.jpg
Left, the legacy manual fault model against the validation-led architecture that replaced it. Right, the operational logic restructured: four product flows reduced to one guided path with a single conditional branch for outages.

### 4. The ticket cannot leave until it is complete

The fault-raising and triage template was mine. I took the contradictory requirements from first line, second line and L&D and restructured them into one guided entry: Outage, Diagnostic, Classify, Review. Progressive questions driven by the fault type, so an adviser only sees what applies. Inline validation on every required field, checked against what second line actually needs to dispatch. A line test result that fails triggers the escalation path and captures the sync data automatically, instead of relying on the adviser to remember. And a review step that will not let the ticket escalate until every requirement is met, with the diagnostic path written into the ticket so the engineer can see how the adviser got there.

I tested each iteration with first-line advisers before it went near the platform engineers, then worked with them through implementation. The detail I would point to is the validation: the adviser sees why a field matters at the moment they are filling it in, not in a rejection the next day.

::image pair s4-guided-entry.jpg s4-escalation-gate.jpg
Left, guided fault entry: the stepper, the symptom choice, and a failed line test that tells the adviser what happens next. Right, the review gate: six escalation requirements, all met, before the ticket can go to an engineer.

### 5. Structure in, errors out

The other half was visibility. A split-panel ticket status gave advisers the SLA clock, the resolution stage and who held the ticket, inside the customer record, which the legacy system had never offered. Fewer duplicates were raised because advisers could see a fault was already open; fewer customers were called back with nothing to say.

Within three months, engineer misdispatch costs had fallen by £184K, reported by the same head of second line who had tracked the fines. Ticket quality errors reaching second line dropped 56%. Average handling time on fault calls fell 17%, because advisers were no longer re-raising the same fault twice.

The interface changed. What actually fixed it was the architecture underneath, and the decision to design the training with the product rather than after it.

::image full s5-tracker.jpg
The fault ticketing tracker: open, critical and in-progress counts, priority and progress per ticket, and the same status panel on the right. One escalation path, visible end to end.
