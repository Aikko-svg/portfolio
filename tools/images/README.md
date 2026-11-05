# Case-study images

Most diagrams and composites on the site are drawn here as HTML and rendered to JPEG. Change the words or numbers in a script, run it, and the site picks up the new images on the next build.

## Run

```
npm i -D playwright        # once
npx playwright install chromium   # once
npm run images             # rebuild everything
node tools/images/pmi-diagrams.cjs   # or just one script
```

The scripts use the **Inter** font. Install it on your machine first, or the text will fall back to a system font and look different.

## What each script makes

| Script | Writes to `public/images/…` | Needs files in `sources/` |
| --- | --- | --- |
| `pmi-screens.cjs` | `pmi/` hero, hero-m, s1-problem, s3-decision, s4-ordering | yes |
| `pmi-diagrams.cjs` | `pmi/` s2-behaviour-flow, s2-ia | no |
| `uw-diagrams.cjs` | `utility-warehouse/` s2-journey, s3-before-after | no |
| `uw-map.cjs` | `utility-warehouse/` s2-map | yes |
| `lr-screens.cjs` | `lucky-riches/` hero, hero-m, s2-one-flow, s3-states, s3-missions, s4-verification | yes |
| `lr-system.cjs` | `lucky-riches/` s3-system | yes |
| `lr-timeline.cjs` | `lucky-riches/` s2-timeline | no |
| `mobile.cjs` | the `-m.jpg` phone versions of seven diagrams | yes (one file) |

Each desktop image is saved twice: `name@2x.jpg` (2880 wide) and `name.jpg` (1440 wide).

## Phone versions

Wide diagrams are unreadable on a phone, so some have a portrait partner, `name-m.jpg`, drawn in `mobile.cjs` on a 400px canvas at 3x. The build serves it automatically on screens under 640px wide whenever the file exists. There is nothing to configure per page.

**If you change a diagram, change its phone version in `mobile.cjs` too.** They hold the same words twice.

## Sources

`sources/` holds the cropped screens from Figma that the composites are built from. It is **not in git**, because this repo is public and these are client screens. Keep a copy somewhere private; Figma is the original.

## Not generated here

These are finished images, so edit them by replacing the file:

- Utility Warehouse: hero, s1-legacy-form, s4-fault-form, s4-raised-ticket, s5-tracker
- Hastings Direct: everything (s1-journey-map is the real map, kept dark on purpose)

`once/` holds the one-off scripts used on them: `relight.py` moved the screenshots from the dark design onto the light background, and `uw-hero-m.py` cuts the Utility Warehouse phone hero from the desktop one.
