// lr-screens: case-study images for lucky-riches. Run: node tools/images/lr-screens.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'lucky-riches';
const base = nodePath.join(__dirname, 'sources', 'lr-screens');
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased}
.lab{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#5F6470}
.scr{border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.12),0 30px 60px rgba(22,24,29,.16)}.scr img{display:block;width:100%}
.desk{border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.12),0 30px 60px rgba(22,24,29,.14)}.desk img{display:block;width:100%}`;
const T='#0A6E7E',A='#8A5A08',R='#BE2A30',G='#1A7445';
const node=(t,s,c)=>`<div style="background:#FFFFFF;border:1px solid ${c||'rgba(22,24,29,.12)'};border-radius:10px;padding:11px 14px"><p style="font-size:15px;font-weight:600">${t}</p>${s?`<p style="font-size:12.5px;color:#5A5F69;margin-top:3px;line-height:1.35">${s}</p>`:''}</div>`;
const ar=`<div style="color:#646973;text-align:center;font-size:16px;line-height:1;margin:5px 0">↓</div>`;
const pages={
 hero:[1440,810,`<div style="position:absolute;left:110px;top:70px;width:980px" class="desk"><div style="height:670px;overflow:hidden"><img src="desk-deposit.png"></div></div>
   <div style="position:absolute;left:1030px;top:120px;width:300px" class="scr"><div style="height:640px;overflow:hidden"><img src="cashier-withdraw-pending-mobile.png"></div></div>`],
 'hero-m':[800,1000,`<div style="position:absolute;left:60px;top:50px;width:420px" class="scr"><div style="height:900px;overflow:hidden"><img src="cashier-withdraw-mobile.png"></div></div>
   <div style="position:absolute;left:400px;top:150px;width:340px" class="scr"><div style="height:736px;overflow:hidden"><img src="cashier-withdraw-pending-mobile.png"></div></div>`],
 's2-one-flow':[1440,810,`<div style="display:grid;grid-template-columns:330px 330px 1fr;gap:56px;align-items:center;height:810px;padding:0 90px">
  ${[['First deposit','cashier-deposit-mobile.png','Bonus and methods chosen fresh'],['Returning player','cashier-deposit-saved-mobile.png','Same screen: last method pre-selected, pending withdrawals reversible in place']].map(([t,f,s])=>`<div><p style="font-size:19px;font-weight:600">${t}</p><p style="font-size:14px;color:#5A5F69;margin:4px 0 16px;min-height:38px;line-height:1.4">${s}</p><div class="scr"><div style="height:600px;overflow:hidden"><img src="${f}"></div></div></div>`).join('')}
  <div><p class="lab">The decision</p><h2 style="font-size:36px;font-weight:600;letter-spacing:-.02em;line-height:1.15;margin:14px 0 22px">One deposit flow instead of a separate quick-deposit build.</h2>
  <p style="font-size:18px;line-height:1.55;color:#3D424B">One set of transaction states for the developers and the payment provider to build and test, not two journeys to keep in sync.</p></div></div>`],
 's3-states':[1440,810,`<div style="display:grid;grid-template-columns:560px 1fr;gap:56px;align-items:center;height:810px;padding:0 72px">
  <div><p class="lab">Deposit states, from the spec</p><h2 style="font-size:30px;font-weight:600;letter-spacing:-.02em;margin:12px 0 24px">Every outcome designed, not left to the developers.</h2>
   ${node('Amount entered','CTA gated until every required field is valid')}${ar}
   ${node('Waiting','External payment flow open',T)}${ar}
   ${node('Pending','Awaiting confirmation; transaction ID copyable',A)}${ar}
   <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">${node('Success','Amount and bonus confirmed',G)}${node('Insufficient funds','New amount, or switch method',R)}${node('Other error','Retry with details kept, or switch',R)}</div></div>
  <div><p class="lab" style="margin-bottom:14px">The real spec · 86 numbered rules for Cashier</p><div class="desk" style="border-radius:10px"><img src="spec.png"></div></div></div>`],
 's3-missions':[1440,810,`<div style="padding:56px 80px 0"><p class="lab">Missions · one tier token, four tiers</p></div>
  <div style="display:flex;gap:28px;justify-content:center;margin-top:28px">
  ${[['Casual','mission-hub-casual'],['Challenger','mission-hub-challenger'],['Elite','mission-hub-elite'],['Legendary','mission-hub-legendary']].map(([t,f])=>`<div style="width:290px"><div class="scr" style="border-radius:18px"><div style="height:560px;overflow:hidden"><img src="${f}.png"></div></div><p style="font-size:16px;font-weight:600;margin-top:14px;text-align:center">${t}</p></div>`).join('')}</div>`],
 's4-verification':[1440,810,`<div style="position:absolute;left:90px;top:80px;width:1000px" class="desk"><div style="height:640px;overflow:hidden"><img src="desk-verify-top.png"></div></div>
   <div style="position:absolute;left:1040px;top:250px;width:310px" class="scr" ><img src="take-a-break-confirm-mobile.png"></div>
   <p class="lab" style="position:absolute;left:1040px;top:212px">Take a break</p><p class="lab" style="position:absolute;left:90px;top:46px">Tiered verification</p>`],
};

(async () => {
  for (const [name, [w, h, body]] of Object.entries(pages)) await render({ slug, name, w, h, base, html: doc(css, body, ` body{width:${w}px;height:${h}px;overflow:hidden;position:relative}`) });
  await done();
})();
