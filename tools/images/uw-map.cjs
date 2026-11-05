// uw-map: case-study images for utility-warehouse. Run: node tools/images/uw-map.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'utility-warehouse';
const base = nodePath.join(__dirname, 'sources', 'uw-map');
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased}.lab{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#5F6470}`;
const body=`<div style="display:grid;grid-template-columns:852px 1fr;gap:56px;align-items:center;padding:0 72px;height:900px">
 <div style="border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.1)"><img src="map-crop.png" style="display:block;width:852px"></div>
 <div><p class="lab">The original map</p><h2 style="font-size:34px;font-weight:600;letter-spacing:-.02em;line-height:1.15;margin:14px 0 22px">Every pain point paired with an opportunity.</h2>
 <p style="font-size:18px;line-height:1.55;color:#3D424B">24 steps across 5 phases, built with every department the fault touched.</p>
 <p style="font-size:18px;line-height:1.55;color:#3D424B;margin-top:14px">Shown: phase 3, fault raising. Pain points in red, opportunities in purple. Several became the redesign: fewer fields, auto-populated details, better routing.</p></div></div>`;

(async () => {
  await render({ slug, name: 's2-map', h: 900, base, html: doc(css, body, ' body{width:1440px;height:900px;overflow:hidden}') });
  await done();
})();
