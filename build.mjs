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
  tagline: "Product designer. I decipher complex systems into clear, scalable, commercially effective experiences.",
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

function renderBody(body, slug) {
  // Custom image directives:
  //   ::image full file.jpg        (next line = caption)
  //   ::image pair a.jpg b.jpg     (next line = caption)
  const lines = body.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const d = lines[i].match(/^::image\s+(full|pair)\s+(.*)$/);
    if (!d) { out.push(lines[i]); continue; }
    const files = d[2].trim().split(/\s+/);
    const caption = (lines[i + 1] || "").trim();
    const alt = caption.replace(/[*_`]/g, "").split(/(?<=\.)\s/)[0];
    i += 1;
    const img = (f, w, h) => {
      const p = join(ROOT, "public", "images", slug, f);
      const exists = existsSync(p);
      return exists
        ? `<img src="/images/${slug}/${f}" width="${w}" height="${h}" loading="lazy" alt="${esc(alt)}">`
        : `<div class="ph" style="aspect-ratio:${w}/${h}"><span>${f}<br>${w} × ${h}</span></div>`;
    };
    const inner = d[1] === "full"
      ? img(files[0], 1440, 810)
      : `<div class="pair">${img(files[0], 1440, 960)}${img(files[1], 1440, 960)}</div>`;
    out.push(`<figure class="fig fig-${d[1]}">${inner}${caption ? `<figcaption>${marked.parseInline(caption)}</figcaption>` : ""}</figure>`);
  }
  return marked.parse(out.join("\n"));
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
<meta name="description" content="${esc(SITE.tagline)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="nav">
  <div class="wrap nav-in">
    <a class="brand" href="/">${esc(SITE.name)}</a>
    <nav>
      <a href="/"${path === "/" ? ' aria-current="page"' : ""}>Work</a>
      <a href="/about/"${path === "/about/" ? ' aria-current="page"' : ""}>About</a>
      <a href="mailto:${SITE.email}">Email</a>
    </nav>
  </div>
</header>
<main>
${body}
</main>
<footer class="foot">
  <div class="wrap foot-in">
    <span>${esc(SITE.name)}</span>
    <a href="mailto:${SITE.email}">${SITE.email}</a>
  </div>
</footer>
</body>
</html>`;
}

function heroImg(s) {
  const p = join(ROOT, "public", "images", s.slug, s.hero || "");
  return existsSync(p)
    ? `<img src="/images/${s.slug}/${s.hero}" width="1440" height="810" alt="${esc(s.heroAlt || "")}" fetchpriority="high">`
    : `<div class="ph" style="aspect-ratio:1440/810"><span>hero · 1440 × 810</span></div>`;
}

function panel(s) {
  const row = (k, v) => v ? `<div class="row"><dt>${k}</dt><dd>${esc(v)}</dd></div>` : "";
  return `<aside class="panel">
  <p class="panel-desc">${esc(s.description)}</p>
  <dl>
    ${row("Year", s.year)}${row("Client", s.client)}${row("Role", s.role)}${row("Team", s.team)}
  </dl>
</aside>`;
}

// Outcomes strip: lines that start with a figure become big tiles, the rest a short list.
function metrics(s) {
  const items = s.outcomes || [];
  const big = [], small = [];
  for (const o of items) {
    const m = o.match(/^([£$]?\d[\d,.]*[%KMk]?(?:\s?(?:to|→)\s?\d+)?)\s+(.*)$/);
    if (m && big.length < 4) big.push([m[1], m[2]]); else small.push(o);
  }
  if (!items.length) return "";
  return `<section class="metrics" aria-label="Outcomes">
  ${big.length ? `<div class="metrics-big">${big.map(([n, t]) => `<div class="metric"><strong>${esc(n)}</strong><span>${esc(t)}</span></div>`).join("")}</div>` : ""}
  ${small.length ? `<ul class="metrics-small">${small.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
</section>`;
}

function caseStudyPage(s, prev, next) {
  const link = (x, label) => x ? `<a href="/work/${x.slug}/"><span>${label}</span><strong>${esc(x.title)}</strong></a>` : `<span></span>`;
  return shell({
    title: `${s.title} — ${SITE.name}`,
    path: `/work/${s.slug}/`,
    body: `
<article class="study">
  <div class="wrap">
    <p class="eyebrow">${esc(s.tags)} · ${esc(s.year)}</p>
    <h1 class="study-title">${esc(s.title)}</h1>
    <p class="study-lede">${esc(s.oneLiner)}</p>
    ${metrics(s)}
    <div class="hero">${heroImg(s)}</div>
    <div class="body">
      <div class="narrative">${s.html}</div>
      ${panel(s)}
    </div>
    <nav class="prevnext">${link(prev, "Previous")}${link(next, "Next")}</nav>
  </div>
</article>`,
  });
}

function card(s) {
  return `<a class="card" href="/work/${s.slug}/">
  <div class="card-img">${heroImg(s)}</div>
  <div class="card-text">
    <p class="eyebrow">${esc(s.tags)} · ${esc(s.year)}</p>
    <h2>${esc(s.title)}</h2>
    <p class="hook">${esc(s.hook)}</p>
    <p class="card-line">${esc(s.oneLiner)}</p>
  </div>
</a>`;
}

function homePage(studies) {
  return shell({
    title: `${SITE.name} — Product Designer`,
    path: "/",
    body: `
<section class="intro wrap">
  <h1>${esc(SITE.tagline)}</h1>
  <p>Seven years across insurance, utilities, B2B retail and regulated gaming. Based in London.</p>
</section>
<section class="cards wrap">
  ${studies.map(card).join("\n")}
</section>`,
  });
}

function aboutPage() {
  return shell({
    title: `About — ${SITE.name}`,
    path: "/about/",
    body: `
<section class="about wrap">
  <h1>About</h1>
  <div class="about-body">
    <p>I'm a UK-based product designer with seven years' experience, specialising in deciphering complex systems into clear, scalable and commercially effective experiences, mostly through customer journey work, service design and making sense of legacy or tangled problem spaces.</p>
    <p>Recent work includes leading design for Lucky Riches, an investor-backed online casino, end to end from discovery through QA. Before that: a unified B2B retailer platform for Philip Morris International, a fault-raising redesign at Utility Warehouse, and the quote journey at Hastings Direct.</p>
    <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</section>`,
  });
}

// ---------- write ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, "public"), OUT, { recursive: true });
cpSync(join(ROOT, "src", "styles.css"), join(OUT, "styles.css"));

const studies = loadStudies();
writeFileSync(join(OUT, "index.html"), homePage(studies));
mkdirSync(join(OUT, "about"), { recursive: true });
writeFileSync(join(OUT, "about", "index.html"), aboutPage());
studies.forEach((s, i) => {
  const dir = join(OUT, "work", s.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), caseStudyPage(s, studies[i - 1], studies[i + 1]));
});
console.log(`built ${studies.length} case studies → dist/`);
