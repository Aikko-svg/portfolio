# Build brief for Claude Code

Proposals are marked \[proposed\]. Everything else is decided. Source copy for all four case studies is in the "Portfolio case studies" tab of this doc; treat it as the content source of truth.

## 1. Stack

- Next.js (App Router), TypeScript, Tailwind. \[proposed\]
- Case studies as MDX files in `/content/case-studies/`, one file per study, with frontmatter for the sticky panel fields and the card. Copy is never hard-coded in components.
- Images in `/public/images/<study-slug>/`, referenced by filename from the MDX. Build with placeholders at the sizes in section 5; real exports dropped in later.
- Deploy on Vercel.

## 2. Site map

- `/` Home: short intro, then four case-study cards in this order: Lucky Riches, PMI, Utility Warehouse, Hastings Direct. \[proposed order: most recent and most owned first\]
- `/work/<slug>` Case study page, one per study.
- `/about` Short bio, CV download link, contact.
- No blog, no separate contact page. Contact is an email link in nav and footer.

## 3. Page structures

**Card (home)**

Title, one-liner, year, type tag, one hero image. Whole card is the link. No hover animation beyond a subtle image lift. \[proposed\]

**Case study page**

1. Hero image, full width, above everything.
2. Two-column body below the hero: left column scrolling narrative, right column sticky panel.
3. Sticky panel fields, in order: Title, Description, Year, Client, Timeline, Role, Team, Outcomes block.
4. Narrative: numbered sections with H3 headings, body paragraphs, image slots with italic captions, exactly as laid out in the case-studies tab.
5. Footer: previous and next case study links.

**Sticky panel behaviour**

- Desktop (1024px and up): panel is position sticky, top offset equal to nav height plus 32px, right column, roughly one third width.
- Tablet and mobile (below 1024px): panel renders as a static block directly under the hero and above the narrative. It does not stick. Outcomes block stays with it.

## 4. Design system \[proposed, Linear-style dark\]

**Colour**

- Background: #0A0A0B (near-black, not pure black).
- Surface (cards, panel): #121214.
- Border: #232326.
- Text primary: #EDEDEF.
- Text secondary: #9A9AA3.
- Text muted (captions, metadata labels): #6B6B74.
- Accent: none. Links are text primary with underline; hover goes to #FFFFFF. Outcomes numbers are text primary, not coloured.

**Type**

- Display: Instrument Serif (Google Fonts), used for page titles, case study titles, and H3 section headings only.
- Body: Inter (Google Fonts), everything else.
- Fallback if the pairing is rejected: Geist Sans and Geist Mono throughout, mono for sticky panel labels and outcomes numbers.
- Scale: body 17px / 1.6; captions 14px / 1.5; panel labels 12px uppercase tracked; H3 32px; case study title 56px; home intro 40px.
- Measure: narrative column max 68ch.

**Spacing and layout**

- Base unit 8px. Scale: 8, 16, 24, 32, 48, 64, 96, 128.
- Max content width 1280px, centred, 24px side padding on mobile, 48px on desktop.
- Case study split: narrative 2fr, panel 1fr, 64px gutter.
- Section spacing in narrative: 96px between numbered sections, 32px between paragraph and image.

**Surfaces**

- Border radius 8px on images and cards, 0 on everything else.
- No shadows. Depth comes from the surface colour step and 1px borders.
- Images get a 1px border in the border colour so dark screens read against the dark background.

## 5. Image slots

- Hero: 1440 x 810.
- Full width in narrative: 1440 x 810.
- Two columns: each 1440 x 960.
- Seven slots per study. Build with grey placeholders labelled with the slot name and size.

## 6. Build order

1. Scaffold, design tokens, nav, footer.
2. Lucky Riches case study end to end with placeholders. Stop for review on desktop and mobile.
3. After review, remaining three studies from MDX.
4. Home, about, deploy.

## 7. Not in scope

- Light mode.
- Animation beyond hover and smooth scroll.
- CMS.
- Password-protected studies.

## 8. Open before build

- Confirm font pairing.
- Confirm case study order on home.
- Lucky Riches post-launch number, if received, goes into the outcomes block and card.
- Image exports.
