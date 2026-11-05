// Shared renderer for the case-study images.
// Each page is plain HTML rendered in Chromium, saved straight into public/images/<slug>/ as
//   name@2x.jpg (retina) and name.jpg (standard), or name-m.jpg for the phone version.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', '..', 'public', 'images');
let browser;
const used = new Set();
process.on('exit', () => { if (process.env.LIST_SOURCES) console.log('SOURCES ' + [...used].join('|')); });

async function shot(html, base, viewport, scale, file, opts = {}) {
  browser = browser || await chromium.launch();
  fs.mkdirSync(base, { recursive: true });
  const tmp = path.join(base, '.render.html');
  fs.writeFileSync(tmp, html.replace('<head>', `<head><base href="file://${base}/">`));
  const page = await browser.newPage({ viewport, deviceScaleFactor: scale });
  page.on('request', (r) => { if (r.url().startsWith('file://') && !r.url().endsWith('.render.html')) used.add(decodeURIComponent(r.url().slice(7))); });
  page.on('requestfailed', (r) => console.warn('  missing source:', r.url()));
  await page.goto('file://' + tmp); await page.waitForTimeout(opts.wait || 400);
  await page.screenshot({ path: file, type: 'jpeg', quality: opts.quality || 88, fullPage: !!opts.fullPage });
  await page.close(); fs.unlinkSync(tmp);
}

// Desktop image: 1440-wide canvas, saved at 2x and 1x.
async function render({ slug, name, w = 1440, h = 810, html, base }) {
  const dir = path.join(OUT, slug); fs.mkdirSync(dir, { recursive: true });
  await shot(html, base, { width: w, height: h }, 2, path.join(dir, `${name}@2x.jpg`), { quality: 88 });
  await shot(html, base, { width: w, height: h }, 1, path.join(dir, `${name}.jpg`), { quality: 90 });
  console.log('  ' + slug + '/' + name);
}

// Phone image: 400-wide canvas at 3x, as tall as its content.
async function renderMobile({ slug, name, html, base }) {
  const dir = path.join(OUT, slug); fs.mkdirSync(dir, { recursive: true });
  await shot(html, base, { width: 400, height: 100 }, 3, path.join(dir, `${name}-m.jpg`), { quality: 86, fullPage: true, wait: 300 });
  console.log('  ' + slug + '/' + name + '-m');
}

const doc = (css, body, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${css}${extra}</style></head><body>${body}</body></html>`;
async function done() { if (browser) await browser.close(); browser = null; }
module.exports = { render, renderMobile, doc, done, used };
