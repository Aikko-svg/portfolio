// lr-timeline: case-study images for lucky-riches. Run: node tools/images/lr-timeline.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'lucky-riches';
const base = nodePath.join(__dirname, 'sources', 'lr-timeline');
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased;width:1440px;height:810px;overflow:hidden}.lab{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#5F6470}`;
const T='#0A6E7E',A='#8A5A08';
const st=[['Register','Name, email, phone, country, password','Restricted countries never listed','Minimum to get in'],
['Deposit','Cashier opens after sign-up','Deposit before any documents','The PM’s call, kept'],
['Play','Level 1: complete your profile','Date of birth and address','Needed before play'],
['Withdraw','Level 2: identity and address','Documents only when money leaves','Where full KYC sits']];
const body=`<div style="padding:110px 72px 0">
<p class="lab">Player journey · what is asked, and when</p>
<h2 style="font-size:34px;font-weight:600;letter-spacing:-.02em;margin:12px 0 54px">Full checks only when money leaves.</h2>
<div style="position:relative">
 <div style="position:absolute;left:0;right:0;top:15px;height:2px;background:linear-gradient(90deg,${T},${T} 70%,${A})"></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:28px;position:relative">
 ${st.map(([t,a,b,c],i)=>`<div><div style="width:32px;height:32px;border-radius:50%;background:#E8EAED;border:2px solid ${i==3?A:T};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${i==3?A:T}">${i+1}</div>
  <p style="font-size:24px;font-weight:600;margin:22px 0 14px">${t}</p>
  <div style="background:#FFFFFF;border:1px solid rgba(22,24,29,.1);border-radius:12px;padding:16px 18px;min-height:120px">
   <p style="font-size:16px;font-weight:600;line-height:1.35">${a}</p><p style="font-size:14px;color:#5A5F69;margin-top:8px;line-height:1.4">${b}</p></div>
  <p style="font-size:13px;color:${i==3?A:T};margin-top:12px;font-weight:600">${c}</p></div>`).join('')}
 </div></div>
<div style="margin-top:48px;border:1px dashed ${A}88;border-radius:12px;padding:16px 20px;display:flex;gap:18px;align-items:center">
 <span style="font-size:13px;font-weight:700;color:${A};letter-spacing:.06em;text-transform:uppercase;white-space:nowrap">Risk triggers</span>
 <p style="font-size:16px;color:#3D424B;line-height:1.45">Level 3, proof of payment, and level 4, source of funds, switch on at any stage when account activity, payment method or regulation calls for them.</p></div>
</div>`;

(async () => {
  await render({ slug, name: 's2-timeline', base, html: doc(css, body) });
  await done();
})();
