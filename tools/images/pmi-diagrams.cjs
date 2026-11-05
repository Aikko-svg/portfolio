// pmi-diagrams: case-study images for pmi. Run: node tools/images/pmi-diagrams.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'pmi';
const base = nodePath.join(__dirname, 'sources', 'pmi-diagrams');
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased}
.lab{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#5F6470}`;
const Y='#2D4BFF', R='#BE2A30';
const groups=[
 ['1','My Tasks','Required and outstanding retailer actions',['Required','Outstanding']],
 ['2','Smoke-Free Products','SFP brands and product information',['Brands','Product info']],
 ['3','Tobacco Products','Tobacco brands and product information',['Brands','Product info']],
 ['4','Knowledge & Updates','Learning, resources, news and programs',['Learning','Resources','News','Programs']],
 ['5','My Rewards','Points, prizes and incentives',['Points','Prizes','Incentives']],
 ['6','Support & Services','FAQs, RAAS and service logistics',['FAQs','RAAS','Service logistics']]];
const ia=`<div style="padding:150px 72px;height:810px;position:relative">
 <div style="display:flex;justify-content:space-between;align-items:flex-end">
  <div><p class="lab">Final information architecture</p><h2 style="font-size:36px;font-weight:600;letter-spacing:-.02em;margin-top:12px">Ten top-level sections became six.</h2></div>
  <div style="display:flex;gap:10px;align-items:center"><span class="lab" style="margin-right:6px">Utility</span>
   <span style="border:1px solid rgba(22,24,29,.18);border-radius:999px;padding:8px 16px;font-size:15px">Online Shop</span>
   <span style="border:1px solid rgba(22,24,29,.18);border-radius:999px;padding:8px 16px;font-size:15px">My Account</span></div></div>
 <div style="display:flex;justify-content:center;margin-top:44px"><div style="background:#16181D;color:#E8EAED;border-radius:10px;padding:12px 28px;font-weight:600;font-size:17px">Homepage</div></div>
 <div style="position:relative;height:40px"><div style="position:absolute;left:50%;top:0;width:1px;height:20px;background:#B4B9C1"></div>
  <div style="position:absolute;left:calc(100%/12);right:calc(100%/12);top:20px;height:1px;background:#B4B9C1"></div>
  ${groups.map((g,i)=>`<div style="position:absolute;left:calc(${(i*2+1)}*100%/12);top:20px;width:1px;height:20px;background:#B4B9C1"></div>`).join('')}</div>
 <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px;position:relative">
  ${groups.map(([n,t,p,s],i)=>`<div style="background:#FFFFFF;border:1px solid ${i===0?Y:'rgba(22,24,29,.1)'};border-radius:14px;padding:18px 18px 20px;min-height:300px">
   <p style="font-size:13px;color:${Y};font-weight:600">${n}</p><p style="font-size:19px;font-weight:600;line-height:1.25;margin:8px 0 10px;min-height:48px">${t}</p>
   <p style="font-size:14px;line-height:1.45;color:#5A5F69;min-height:62px">${p}</p>
   <div style="border-top:1px solid rgba(22,24,29,.08);margin-top:14px;padding-top:12px">${s.map(x=>`<p style="font-size:14px;color:#3D424B;padding:4px 0">${x}</p>`).join('')}</div></div>`).join('')}
  <div style="position:absolute;left:calc(200%/6 - 8px);top:-14px;bottom:-14px;width:0;border-left:2px dashed ${R}"></div>
 </div>
 <div style="display:flex;gap:40px;margin-top:30px;font-size:15px;color:#5A5F69">
  <span><span style="display:inline-block;width:18px;border-top:2px dashed ${R};vertical-align:middle;margin-right:10px"></span>Compliance: tobacco and smoke-free never share a group</span>
  <span><span style="display:inline-block;width:12px;height:12px;border:1.5px solid ${Y};border-radius:3px;vertical-align:middle;margin-right:10px"></span>Most-used first: where retailers actually went</span></div>
</div>`;
const cols=[['Start','Login',276,51],['1st interaction','Homepage',224,48],['2nd interaction','My Tasks',176,71],['3rd interaction','Back to homepage',105,44]];
const maxH=430;
const flow=`<div style="padding:64px 72px;height:810px">
 <p class="lab">Platform analytics · retailer sessions</p>
 <h2 style="font-size:36px;font-weight:600;letter-spacing:-.02em;margin-top:12px">Retailers came for a task, then left.</h2>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin-top:54px;align-items:end;height:${maxH+110}px">
 ${cols.map(([step,page,s,d],i)=>{const h=Math.round(s/276*maxH), dh=Math.round(d/276*maxH); const hot=i===2;
  return `<div><div style="display:flex;flex-direction:column;justify-content:flex-end;height:${maxH}px">
   <div style="display:flex;justify-content:space-between;font-size:15px;margin-bottom:8px"><span style="color:${R};font-weight:600">${d}K left</span></div>
   <div style="height:${dh}px;background:repeating-linear-gradient(135deg,${R}33 0 6px,${R}55 6px 12px);border:1px solid ${R};border-bottom:0;border-radius:8px 8px 0 0"></div>
   <div style="height:${h-dh}px;background:${hot?Y:'#D3D7DC'};border-radius:0 0 8px 8px"></div></div>
   <p class="lab" style="margin-top:16px">${step}</p><p style="font-size:20px;font-weight:600;margin-top:4px;color:${hot?Y:'#16181D'}">${page}</p>
   <p style="font-size:15px;color:#5A5F69;margin-top:2px">${s}K sessions</p></div>`}).join('')}
 </div></div>`;
const anno=`<div style="position:absolute;right:72px;top:84px;width:430px;font-size:17px;line-height:1.5;color:#3D424B">
 <p style="border-left:2px solid ${Y};padding-left:16px;margin-bottom:18px"><b style="color:#16181D">Almost half</b> of retailers who reached My Tasks left without opening another page.</p>
 <p style="border-left:2px solid #B4B9C1;padding-left:16px">About a third went back to the homepage looking for more. Half of those then left.</p></div>`;
const pages={'s2-behaviour-flow':flow.replace('<div style="padding:64px 72px;height:810px">','<div style="padding:84px 72px;height:810px;position:relative">'+anno),'s2-ia':ia};

(async () => {
  for (const [name, body] of Object.entries(pages)) await render({ slug, name, base, html: doc(css, body, ' body{width:1440px;height:810px;overflow:hidden}') });
  await done();
})();
