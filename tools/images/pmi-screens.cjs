// pmi-screens: case-study images for pmi. Run: node tools/images/pmi-screens.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'pmi';
const base = nodePath.join(__dirname, 'sources', 'pmi-screens');
const css = `*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased}
.scr{border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.08)}.scr img{display:block;width:100%}
.lab{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#5F6470}
.note{font-size:17px;line-height:1.45;color:#3D424B}`;
const pages = {
 hero: [1440,810,`<div style="display:flex;gap:40px;justify-content:center;padding-top:48px">
  ${['c-hp-top','c-tk-top','c-rw-top'].map(f=>`<div class="scr" style="width:380px;height:714px"><img src="${f}.png"></div>`).join('')}</div>`],
 'hero-m': [800,1000,`<div style="display:flex;gap:30px;justify-content:center;padding-top:40px">
  ${['c-hp-m','c-tk-m'].map(f=>`<div class="scr" style="width:340px;height:920px"><img src="${f}.png"></div>`).join('')}</div>`],
 's1-problem': [1440,810,`<div style="display:grid;grid-template-columns:640px 1fr;gap:72px;align-items:center;height:810px;padding:0 72px">
  <div><p class="lab" style="margin-bottom:18px">Before · the German platform</p><div class="scr" style="border-radius:16px"><img src="c-old.png"></div></div>
  <div><p class="lab">Market interviews · 25 interviews · 5 markets</p>
  <h2 style="font-size:38px;font-weight:600;letter-spacing:-.02em;line-height:1.12;margin:18px 0 34px">The markets were already asking for a standard.</h2>
  ${[['01','Inconsistent UX and UI from market to market, with no shared standards.'],
     ['02','Global content was unknown to markets or didn’t fit their retailers.'],
     ['03','Every market said it would welcome one shared design system.']].map(([n,t])=>`
    <div style="border-top:1px solid rgba(22,24,29,.14);padding:16px 0 18px;display:flex;gap:18px"><span style="font-size:15px;color:#2D4BFF;font-weight:600;padding-top:4px">${n}</span><p style="font-size:22px;line-height:1.35;font-weight:500">${t}</p></div>`).join('')}
  </div></div>`],
 's2-behaviour-flow': [1440,810,`<img src="c-flow.png" style="display:block;width:1440px;height:810px">`],
 's3-decision': [1440,810,`<div style="padding:0 80px;display:grid;grid-template-columns:380px 40px 300px 40px 1fr;gap:20px;align-items:center;height:810px">
  <div><p class="lab" style="margin-bottom:20px">Market requests</p>
   <div style="background:#F6F7F8;border:1px solid rgba(22,24,29,.1);border-radius:14px;padding:22px 24px;margin-bottom:16px"><p style="font-size:14px;color:#5F6470;margin-bottom:8px">One market</p><p style="font-size:21px;line-height:1.35;font-weight:500">A separate task-management component to push mandatory actions</p></div>
   <div style="background:#F6F7F8;border:1px solid rgba(22,24,29,.1);border-radius:14px;padding:22px 24px"><p style="font-size:14px;color:#5F6470;margin-bottom:8px">Other markets</p><p style="font-size:21px;line-height:1.35;font-weight:500">Campaigns and incentives at the top of the dashboard</p></div></div>
  <div style="font-size:30px;color:#646973;text-align:center">→</div>
  <div style="text-align:center"><div style="border:1.5px solid #2D4BFF;border-radius:14px;padding:24px 20px;font-size:22px;line-height:1.35;font-weight:600">Can an existing component do this with styling?</div>
   <p style="font-size:18px;line-height:1.6;margin-top:20px"><span style="color:#2D4BFF;font-weight:600">Yes</span> → approved variant<br><span style="color:#5F6470">No → must-build list for HQ</span></p></div>
  <div style="font-size:30px;color:#646973;text-align:center">→</div>
  <div><p class="lab" style="margin-bottom:20px">Shipped: the shared task card</p>
   <div class="scr" style="border-radius:16px"><img src="c-taskcard.png"></div>
   <p class="note" style="margin-top:22px;font-size:18px"><span style="color:#2D4BFF;font-weight:600">Required tag + due date</span> mark the mandatory action. Same card, same build: an approved urgency variant.</p></div></div>`],
 's4-ordering': [1440,810,`<div style="display:grid;grid-template-columns:330px 330px 1fr;gap:56px;align-items:start;height:810px;padding:28px 90px 0">
  ${[['Market A','Mandatory actions first',['c-taskcard','c-discover','c-news']],['Market B','Campaigns first',['c-campaign','c-discover','c-taskcard']]].map(([m,sub,fs])=>`
   <div><p style="font-size:19px;font-weight:600">${m}</p><p style="font-size:15px;color:#5A5F69;margin:4px 0 16px">${sub}</p>
   ${fs.map(f=>`<div class="scr" style="border-radius:13px;margin-bottom:12px"><img src="${f}.png"></div>`).join('')}</div>`).join('')}
  <div style="align-self:center"><p class="lab">Illustration</p><h2 style="font-size:38px;font-weight:600;letter-spacing:-.02em;line-height:1.14;margin:18px 0 24px">The order is a market setting. The card isn’t.</h2>
  <p class="note" style="font-size:20px">Same components, same build. One market leads with compliance tasks, another with a points campaign. Each sets the order for its own priorities.</p></div></div>`],
};

(async () => {
  for (const [name, [w, h, body]] of Object.entries(pages)) {
    if (name === 's2-behaviour-flow') continue; // drawn by pmi-diagrams.cjs
    await render({ slug, name, w, h, base, html: doc(css, body, ` body{width:${w}px;height:${h}px;overflow:hidden}`) });
  }
  await done();
})();
