// lr-system: case-study images for lucky-riches. Run: node tools/images/lr-system.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'lucky-riches';
const base = nodePath.join(__dirname, 'sources', 'lr-system');
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased;width:1440px;height:810px;overflow:hidden}
.lab{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#5F6470}.n{font-size:13px;color:#2D4BFF;font-weight:600}
.h{font-size:20px;font-weight:600;margin:6px 0 18px}.arrow{color:#B4B9C1;font-size:28px;align-self:center}`;
const sem=['colour/surface/base','colour/surface/raised','colour/surface/selected','colour/text/headings','colour/text/muted','colour/border/focus','colour/text/error','colour/surface/success'];
const body=`<div style="display:grid;grid-template-columns:420px 40px 400px 40px 1fr;gap:0 18px;padding:56px 64px 0;height:700px">
<div><p class="n">1</p><p class="lab">Tokens</p><p class="h">Primitive scales, then role tokens</p>
 <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px">${[...Array(12).keys()].map(i=>`<img src="sw${i}.png" style="width:100%;display:block;border-radius:6px">`).join('')}</div>
 <p style="font-size:12px;color:#5F6470;margin:14px 0 8px">primary/50 → primary/1100, one of 7 ramps</p>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${sem.map(s=>`<div style="font:500 12.5px ui-monospace,Menlo,monospace;color:#3D424B;background:#FFFFFF;border:1px solid rgba(22,24,29,.08);border-radius:6px;padding:7px 9px">${s}</div>`).join('')}</div>
 <p style="font-size:12px;color:#5F6470;margin-top:8px">+ spacing scale/25–1600, radius none–pill, type styles</p></div>
<div class="arrow">→</div>
<div><p class="n">2</p><p class="lab">Component</p><p class="h">Payment method, collapsed and expanded</p>
 <div style="width:320px"><img src="psp-c.png" style="width:100%;display:block;border-radius:12px;margin-bottom:12px"><img src="psp-e.png" style="width:100%;display:block;border-radius:12px"></div>
 <p style="font-size:12px;color:#5F6470;margin-top:10px">Built from preset chips, amount input, bonus progress and button, each its own component</p></div>
<div class="arrow">→</div>
<div><p class="n">3</p><p class="lab">In the product</p><p class="h">The cashier</p>
 <div style="width:290px;border-radius:20px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.12)"><div style="height:560px;overflow:hidden"><img src="cashier-deposit-mobile.png" style="width:100%;display:block"></div></div></div>
</div>
<div style="position:absolute;left:64px;right:64px;bottom:34px;border-top:1px solid rgba(22,24,29,.1);padding-top:16px;display:flex;gap:56px;font-size:15px;color:#3D424B">
 <span><b style="color:#16181D;font-size:22px">~60</b>&nbsp; colour primitives</span><span><b style="color:#16181D;font-size:22px">~35</b>&nbsp; semantic tokens</span><span><b style="color:#16181D;font-size:22px">60+</b>&nbsp; component sets</span><span><b style="color:#16181D;font-size:22px">~470</b>&nbsp; variants</span></div>`;

(async () => {
  await render({ slug, name: 's3-system', base, html: doc(css, body) });
  await done();
})();
