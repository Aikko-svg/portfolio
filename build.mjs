// Zero-dependency static site build.
// Reads content/case-studies/*.md, renders into dist/.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { marked } from "./lib/marked.esm.js";

const ROOT = new URL(".", import.meta.url).pathname;
const OUT = join(ROOT, "dist");
const SITE = {
  name: "Youcef Laraba",
  email: "youcefjlaraba@gmail.com",
  tagline: "Making complex products simpler to use and cheaper to run.",
  lede: "Most of my work is in legacy systems, regulated journeys and platforms run across several markets.",
};

// ---------- content ----------
function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("missing frontmatter");
  const meta = {};
  let key = null;
  for (const line of m[1].split("\n")) {
    const li = line.match(/^\s+-\s+(.*)$/);
    if (li && key) { (meta[key] ||= []).push(li[1].trim()); continue; }
    const kv = line.match(/^([A-Za-z][\w]*):\s*(.*)$/);
    if (kv) { key = kv[1]; const v = kv[2].trim(); meta[key] = v === "" ? [] : v; }
  }
  return { meta, body: m[2] };
}

// Retina: name@2x.jpg sits next to name.jpg when it was rebuilt from 2x Figma exports.
function srcset(slug, f, w, sizes) {
  const x2 = f.replace(/\.jpg$/, "@2x.jpg");
  if (!existsSync(join(ROOT, "public", "images", slug, x2))) return "";
  return ` srcset="/images/${slug}/${f} ${w}w, /images/${slug}/${x2} ${w * 2}w" sizes="${sizes}"`;
}

function renderBody(body, slug) {
  // Custom image directives:
  //   ::image full file.jpg        (next line = caption)
  //   ::image pair a.jpg b.jpg     (next line = caption)
  body = body.replace(/^(###\s+)\d+\.\s+/gm, "$1");
  const lines = body.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const d = lines[i].match(/^::image\s+(full|pair)\s+(.*)$/);
    if (!d) { out.push(lines[i]); continue; }
    const files = d[2].trim().split(/\s+/);
    const caption = (lines[i + 1] || "").trim();
    const alt = caption.replace(/[*_`]/g, "").split(/(?<=\.)\s/)[0];
    i += 1;
    const img = (f, w, h, sizes) => {
      const p = join(ROOT, "public", "images", slug, f);
      const exists = existsSync(p);
      if (exists) { const d = jpegSize(p); if (d) { h = Math.round(d[1] * w / d[0]); } }
      return exists
        ? `<img src="/images/${slug}/${f}"${srcset(slug, f, w, sizes)} width="${w}" height="${h}" loading="lazy" alt="${esc(alt)}">`
        : `<div class="ph" style="aspect-ratio:${w}/${h}"><span>${f}<br>${w} × ${h}</span></div>`;
    };
    const inner = d[1] === "full"
      ? img(files[0], 1440, 810, "(min-width: 1400px) 1320px, 100vw")
      : `<div class="pair">${img(files[0], 1440, 960, "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw")}${img(files[1], 1440, 960, "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw")}</div>`;
    out.push(`<figure class="wide fig fig-${d[1]}">${inner}${caption ? `<figcaption>${marked.parseInline(caption)}</figcaption>` : ""}</figure>`);
  }
  return marked.parse(out.join("\n"));
}

// Read width/height from a JPEG's SOF marker so figures reserve the right aspect ratio.
function jpegSize(p) {
  const b = readFileSync(p); let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) return null;
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return null;
}

function loadStudies() {
  const dir = join(ROOT, "content", "case-studies");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { meta, body } = parseFrontmatter(readFileSync(join(dir, f), "utf8"));
      return { ...meta, html: renderBody(body, meta.slug) };
    })
    .sort((a, b) => Number(a.order) - Number(b.order));
}

// ---------- templates ----------
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function shell({ title, body, path = "/" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc("Senior product designer, London. " + SITE.tagline + " " + SITE.lede)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
<script src="/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="nav">
  <div class="wrap nav-in">
    <a class="brand" href="/">${esc(SITE.name)}</a>
    <nav aria-label="Main">
      <a href="/"${path === "/" ? ' aria-current="page"' : ""}>Work</a>
      <a href="/about/"${path === "/about/" ? ' aria-current="page"' : ""}>About</a>
      <a href="mailto:${SITE.email}" class="copy-email" data-email="${SITE.email}">Copy email</a>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-in">
    <a href="mailto:${SITE.email}">${SITE.email}</a>
    <span>London</span>
  </div>
</footer>
</body>
</html>`;
}

function heroImg(s, withMobile = false) {
  const p = join(ROOT, "public", "images", s.slug, s.hero || "");
  const m = join(ROOT, "public", "images", s.slug, "hero-m.jpg");
  const sizes = withMobile ? "(min-width: 1400px) 1320px, 100vw" : "(min-width: 1024px) 560px, 100vw";
  const img = `<img src="/images/${s.slug}/${s.hero}"${srcset(s.slug, s.hero || "", 1440, sizes)} width="1440" height="810" alt="${esc(s.heroAlt || "")}" fetchpriority="high">`;
  const m2 = existsSync(join(ROOT, "public", "images", s.slug, "hero-m@2x.jpg")) ? `, /images/${s.slug}/hero-m@2x.jpg 1600w` : "";
  return existsSync(p)
    ? (withMobile && existsSync(m) ? `<picture><source media="(max-width: 639px)" srcset="/images/${s.slug}/hero-m.jpg 800w${m2}" sizes="100vw" width="800" height="1000">${img}</picture>` : img)
    : `<div class="ph" style="aspect-ratio:1440/810"><span>hero · 1440 × 810</span></div>`;
}

function facts(s) {
  const row = (k, v) => v ? `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>` : "";
  return `<dl class="facts">${row("Role", s.role)}${row("Client", s.client)}${row("Year", s.year)}${row("Team", s.team)}</dl>`;
}

// Outcomes: lines that start with a figure become the big numbers, the rest a note underneath.
function metrics(s) {
  const items = s.outcomes || [];
  const big = [], small = [];
  for (const o of items) {
    const m = o.match(/^([+−-]?[£$]?\d[\d,.]*[%KMk]?(?:\s?(?:to|→)\s?\d+)?)\s+(.*)$/);
    if (m && big.length < 4) big.push([m[1], m[2]]); else small.push(o);
  }
  if (!items.length) return "";
  return `<section class="outcomes" aria-label="Outcomes">
  ${big.length ? `<ul class="outcomes-big">${big.map(([n, t]) => `<li><strong>${esc(n)}</strong><span>${esc(t)}</span></li>`).join("")}</ul>` : ""}
  ${small.length ? small.map((o) => `<p class="outcomes-note">${esc(o)}</p>`).join("") : ""}
</section>`;
}

function caseStudyPage(s, prev, next) {
  return shell({
    title: `${s.title} — ${SITE.name}`,
    path: `/work/${s.slug}/`,
    body: `
<article class="study">
  <header class="wrap study-head">
    <a class="back" href="/">Work</a>
    <h1>${esc(s.title)}</h1>
    <p class="study-lede">${esc(s.oneLiner)}</p>
    ${metrics(s)}
  </header>
  <figure class="wrap hero"><div style="view-transition-name: img-${s.slug}">${heroImg(s, true)}</div></figure>
  <div class="wrap">
    ${facts(s)}
    <div class="narrative">${s.html}</div>
  </div>
  <nav class="wrap prevnext" aria-label="More work">
    <a href="/work/${prev.slug}/" rel="prev" data-key="ArrowLeft"><span>Previous</span>${esc(prev.title)}</a>
    <a href="/work/${next.slug}/" rel="next" data-key="ArrowRight"><span>Next</span>${esc(next.title)}</a>
  </nav>
</article>`,
  });
}

function row(s) {
  return `<li class="work-row">
  <a href="/work/${s.slug}/">
    <span class="w-text">
      <span class="w-year">${esc(s.year)}</span>
      <span class="w-title">${esc(s.title)}</span>
      <span class="w-hook">${esc(s.hook)}</span>
    </span>
    <span class="w-img" style="view-transition-name: img-${s.slug}">${heroImg(s)}</span>
  </a>
</li>`;
}

function homePage(studies) {
  return shell({
    title: `${SITE.name} — Senior Product Designer`,
    path: "/",
    body: `
<section class="intro wrap">
  <p class="intro-role">Senior product designer in London</p>
  <h1>${esc(SITE.tagline)}</h1>
  <p class="lede">${esc(SITE.lede)}</p>
  <p class="intro-meta">7+ years across insurance, utilities, B2B commerce and regulated consumer platforms. Agency and in-house.</p>
</section>
<section class="wrap work" aria-label="Selected work">
  <h2 class="work-h">Selected work</h2>
  <ul class="work-list">
  ${studies.map(row).join("\n")}
  </ul>
</section>
`,
  });
}

function aboutPage() {
  const clients = ["Sky", "Spotify", "Vodafone", "London Stock Exchange", "NHS", "Nissan", "Volkswagen", "Cisco", "Unilever (Dove)", "Philip Morris International", "BAT", "Hastings Direct", "Utility Warehouse", "Keywords Studios", "UserTesting", "Blue Prism", "Optimum Nutrition", "CUBE", "Morae"];
  const recognition = ["The Drum Awards, Rebrand/Relaunch, 2023", "Global ACE Awards, 2022", "B2B Marketing Awards, 2021"];
  return shell({
    title: `About — ${SITE.name}`,
    path: "/about/",
    body: `
<section class="about wrap">
  <h1>About</h1>
  <div class="about-grid">
    <div class="about-body">
      <p>I'm Youcef, a senior product designer in London with 7+ years across B2B, B2C, SaaS and enterprise, agency-side, in-house and independently.</p>
      <p>I studied psychology before moving into design, and it still shapes how I work. I'm drawn to the structural side of a problem: why people behave the way they do, where a system breaks down, and how to fix the logic underneath rather than repaint the interface on top.</p>
      <p>Most of my work sits where research meets delivery. I run workshops, map journeys, dig into the data and use what I find to make decisions that hold up in a room full of stakeholders. I judge the work by what it changes: £184K back in misdispatch costs at Utility Warehouse, ease of use up 33% at Hastings Direct, retailer task completion up 21% across PMI's markets.</p>
      <p>I've led projects from discovery through to QA, worked day to day with engineers, product managers and compliance teams, and mentored junior designers along the way.</p>
      <p>Outside work, I'm usually on a football pitch or building a side project.</p>
      <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
    </div>
    <img class="about-photo" src="/images/about/youcef.jpg" width="591" height="591" alt="Youcef Laraba">
  </div>
  <dl class="about-list">
    <div><dt>Clients and brands</dt><dd><ul>${clients.map((c) => `<li>${c}</li>`).join("")}</ul></dd></div>
    <div><dt>Recognition</dt><dd><ul class="single">${recognition.map((c) => `<li>${c}</li>`).join("")}</ul></dd></div>
  </dl>
</section>`,
  });
}

// ---------- write ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, "public"), OUT, { recursive: true });
cpSync(join(ROOT, "src", "styles.css"), join(OUT, "styles.css"));
cpSync(join(ROOT, "src", "site.js"), join(OUT, "site.js"));

const studies = loadStudies();
writeFileSync(join(OUT, "index.html"), homePage(studies));
mkdirSync(join(OUT, "about"), { recursive: true });
writeFileSync(join(OUT, "about", "index.html"), aboutPage());
studies.forEach((s, i) => {
  const dir = join(OUT, "work", s.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), caseStudyPage(s, studies[(i - 1 + studies.length) % studies.length], studies[(i + 1) % studies.length]));
});
console.log(`built ${studies.length} case studies → dist/`);
