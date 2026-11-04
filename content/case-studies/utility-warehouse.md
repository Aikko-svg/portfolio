---
slug: utility-warehouse
order: 3
title: Utility Warehouse
panelTitle: William: Utility Warehouse
hook: £1M a year in fines. £184K saved in three months.
oneLiner: Replacing a fault-raising system that bounced tickets back to advisers and angry customers, during a CRM migration that wanted it copied as it was.
tags: Product Design, UX Research
year: 2016 to 2019
description: Owning the redesign of the fault-raising and triage template from first principles during the migration from BILL to William, instead of rebuilding broken logic in a new shell.
client: Utility Warehouse, in-house
timeline: 12 months
role: Product Designer
team: Programme lead, a director-level sponsor, first-line advisers, head of second line, second-line engineers, Learning and Development, and the William platform engineers
hero: hero.jpg
heroAlt: The structured ticket submission view with guided fault entry and inline validation
outcomes:
  - 56% reduction in ticket quality errors reaching second line
  - £184K saved within three months from reduced engineer misdispatch
  - 17% reduction in average handling time on fault calls
  - Six escalation pathways consolidated into one structured flow
  - Fault flow and the adviser training programme designed together, not in sequence
---

### 1. A ticket that came back the next day

A first-line adviser at Utility Warehouse took a call about a fault, filled in the legacy BILL form, and raised it to second line. The form was built on pre-selected templates with outdated questions and no validation, so nothing stopped an incomplete ticket going through. A day later, sometimes sooner, it came back marked incorrectly raised.

The adviser then had to ring the customer again, explain that an engineer was not coming yet and that more checks were needed, and ask questions the customer believed they had already answered. The customer wanted it fixed yesterday. The adviser took the anger for a system that had given them no way to get it right first time.

At the business level, the head of second line, who managed external engineer dispatch and reported on fines, put the previous year's cost of misdispatched engineers at £1 million. Over 40% of fault submissions needed manual correction. Six separate escalation pathways were applied inconsistently. It looked like a training problem. It was an architecture problem.

::image full s1-legacy-form.jpg
The legacy BILL fault form: dense, template-driven, manual fault codes. No validation, no guidance, no way to know whether a ticket was complete before it left your screen.

### 2. The fight over like-for-like

Utility Warehouse was migrating from BILL to William, a new cloud platform. The programme lead and a director-level sponsor wanted the existing fault workflows replicated in William on the faster timeline a straight copy allowed. The migration deadline was real and the argument was reasonable.

As a design team we pushed back: copying the workflow would copy the £1 million. The migration was the one moment the fault architecture could be rebuilt from first principles, and that window would not come again. We did not win it clean, but the principle held: William would get a redesigned fault and triage flow, not a lift and shift.

::image pair s2-journey-map.jpg s2-pathways.jpg
Six routes to second line, each with its own owner and its own logic. Left, the end-to-end operational journey map; right, the six legacy escalation pathways side by side.

### 3. We got the process wrong, then fixed it

Our first approach was to consult each department separately: first line, then second line, then the next. It did not work. Feedback from one group contradicted the last, and every round trip meant going back to a department that had already signed off and reopening the decision.

So we changed how we worked. We ran a single workshop with representatives from every part of the business the fault flow touched: first-line advisers, second-line engineers, the head of second line, and Learning and Development. Decisions were made in the room with the people who would live with them, and alignment that had taken weeks took an afternoon.

Bringing L&D in was the decision that mattered most and the one we nearly missed. New advisers spent around a week in a classroom before taking live calls, and L&D owned that programme. Designing the new fault flow with them meant the training was rebuilt alongside the product. Advisers learned one system in the classroom and met the same system on the floor.

We then ran smaller workshops with the advisers themselves, not to train them but to show what a validated, guided flow meant for their day: raise it right, answer every question, and the ticket does not come back. For a group used to taking the call-back, that landed.

::image pair s3-workshop.jpg s3-validation-rules.jpg
One room, every department, decisions made once. Left, a workshop artefact; right, the validation rules mapped against the second-line checklist.

### 4. Structure in, errors out

The fault-raising and triage template was mine. I took the contradictory requirements from first line, second line and L&D and restructured them into one guided fault entry: progressive questions driven by the fault type, inline validation on every required field, and a single structured escalation path replacing the previous six. I tested each iteration with first-line advisers before it went anywhere near the platform engineers, then worked with them through implementation. A split-panel ticket status screen gave advisers visibility of where a ticket was and whether it was complete, which the legacy system had never offered.

Within three months, engineer misdispatch costs had fallen by £184K, reported by the same head of second line who had tracked the fines. Ticket quality errors reaching second line dropped 56%. Average handling time on fault calls fell 17%, because advisers were no longer re-raising the same fault twice.

The interface changed. What actually fixed it was the architecture underneath, and the decision to design the training with the product rather than after it.

::image full s4-william-dashboard.jpg
Fewer errors, no call-backs, one escalation path. The detail worth looking at is the validation: each question is checked against what second line actually needs to dispatch, so the ticket cannot be raised until it is complete, and the adviser sees why a field matters at the moment they are filling it in, not in a rejection the next day.
