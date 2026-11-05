---
slug: utility-warehouse
order: 1
title: Utility Warehouse
panelTitle: William: Utility Warehouse
hook: Misdispatched engineers were costing £1M a year. Three months after launch: £184K back, 56% fewer bad tickets.
oneLiner: Redesigning how advisers raise broadband faults, during a CRM migration that wanted the old process copied as it was.
tags: UX Design, UX Research
year: 2019
description: Redesigning the fault-raising and triage flow from first principles during the move from BILL to William, instead of rebuilding broken logic in a new system.
client: Utility Warehouse, in-house
role: UX Designer. I owned the new fault-raising and triage flow and the journey map, ran the cross-department workshops, and supported the wider fault tooling
team: Programme lead and director-level sponsor, who set the migration scope. Head of second line, who defined what a dispatchable ticket needed. First-line advisers, second-line engineers, Learning and Development, and the William platform engineers
hero: hero.jpg
heroAlt: Guided fault entry in the adviser's customer record: a failed line test triggers second-line escalation and captures the sync data
outcomes:
  - 56% fewer ticket errors reaching second line
  - £184K saved in three months on engineer misdispatch, reported by the head of second line
  - 17% shorter handling time on fault calls
  - 6 escalation routes reduced to 1 guided flow
---

### 1. A ticket that came back the next day

An adviser takes a call about a broadband fault, fills in the old BILL form and raises it to second line. The form was a free-text box with a manual fault code and no validation, so nothing stopped an incomplete ticket going through. A day later it came back marked "incorrectly raised", and the adviser had to ring an already angry customer to ask questions they thought they'd answered.

Across the business, the head of second line put the previous year's cost of sending engineers to the wrong jobs, fines included, at £1 million. Over 40% of fault submissions needed manual correction.

::image full s1-legacy-form.jpg
The old BILL form: a manual code and the diagnostic questions pasted into a scrolling text box. Nothing told the adviser a ticket was incomplete.

### 2. Twenty-four steps, five hand-offs, six ways to escalate

Before touching the form, I mapped the whole journey with every department involved, from the customer's first call to the ticket closing. Twenty-four steps across five phases.

The problems weren't in any one screen. They were in the hand-offs. First line collected details second line didn't need and missed the ones they did. Nobody could see where a ticket was once it left them, so duplicates got raised. And there were six escalation routes because six teams had each built their own.

::image full s2-journey.jpg
Redrawn from the journey map I built with every department involved. The first call wasn't the problem; what came after it was.

::image full s2-map.jpg
A section of the original map: each pain point sits above the opportunity it pointed to.

### 3. Copying the workflow would copy the £1 million

Utility Warehouse was moving from BILL to a new platform, William. The programme lead and sponsor wanted the old fault workflows copied across, the quickest route to the migration deadline. Fair on timing, but copying the workflow meant copying the cost. As a design team we pushed back, and William got a redesigned fault flow instead of a lift and shift.

Our first go at the redesign was consulting each department separately. It didn't work: every group contradicted the last and decisions kept reopening. So I ran cross-department workshops instead, with first line, second line, engineers, L&D and the platform team in one room, deciding things once. Bringing L&D in mattered most. New advisers had a week in the classroom before going live, so we rebuilt the training alongside the product and they learned the same system they'd use on the floor.

::image full s3-before-after.jpg
Four product flows and six escalation routes became one guided path, with one branch for outages and one route to second line.

### 4. The ticket can't leave until it's complete

The fault-raising and triage flow was mine. The questions change with the fault type, so advisers only see what applies. Every required field is checked against what second line needs to send an engineer. If the line test fails, the flow escalates and captures the sync data itself, instead of relying on the adviser to remember.

I tested each version with first-line advisers before it went to the platform engineers. The part I'd point to is the validation: advisers see why a field matters while they're filling it in, not in a rejection the next day.

::image pair s4-fault-form.jpg s4-raised-ticket.jpg
Left, a broadband fault in progress: the fault type sets the questions. Right, the raised ticket, with SLA, stage and adviser–engineer notes in one panel.

### 5. Results

Within three months, misdispatch costs were down £184K, reported by the same head of second line who had tracked the fines. Ticket errors reaching second line fell 56%. Handling time on fault calls dropped 17%, mostly because advisers stopped re-raising the same fault. Seeing a ticket's status inside the customer record helped too: advisers could tell a fault was already open before raising another.

What I'd do differently: start with the cross-department workshop instead of ending up there. We lost weeks consulting each team separately before we learned that one room, deciding things once, was the only way decisions stuck.

::image full s5-tracker.jpg
The fault tracker: every open ticket, its priority and progress, and the same status panel on the right.
