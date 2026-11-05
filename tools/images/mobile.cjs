// mobile: portrait versions of the text-heavy diagrams, for phones. Run: node tools/images/mobile.cjs
// The site serves name-m.jpg instead of name.jpg on screens under 640px wide (see build.mjs).
const nodePath = require('path');
const { renderMobile, doc, done } = require('./lib.cjs');
const base = nodePath.join(__dirname, 'sources', 'mobile');
const css = `*{box-sizing:border-box;margin:0;padding:0}html,body{background:#E8EAED}body{font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased;width:400px;padding:32px 24px 36px}
.lab{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#5F6470}h2{font-size:22px;font-weight:600;letter-spacing:-.02em;line-height:1.2;margin:8px 0 20px}
.card{background:#fff;border:1px solid rgba(22,24,29,.1);border-radius:12px;padding:14px 16px}.mut{color:#5A5F69}`;
const B = '#2D4BFF', R = '#BE2A30', V = '#7444E8', T = '#0A6E7E', A = '#8A5A08';
const pages = {}; // 'slug/name': html body

// PMI: six groups
const groups = [['1', 'My Tasks', 'Required and outstanding retailer actions', 'Required · Outstanding'], ['2', 'Smoke-Free Products', 'SFP brands and product information', 'Brands · Product info'], ['3', 'Tobacco Products', 'Tobacco brands and product information', 'Brands · Product info'], ['4', 'Knowledge & Updates', 'Learning, resources, news and programs', 'Learning · Resources · News · Programs'], ['5', 'My Rewards', 'Points, prizes and incentives', 'Points · Prizes · Incentives'], ['6', 'Support & Services', 'FAQs, RAAS and service logistics', 'FAQs · RAAS · Service logistics']];
pages['pmi/s2-ia'] = `<p class="lab">Final information architecture</p><h2>Ten top-level sections became six.</h2>
${groups.map(([n, t, d, s], i) => `${i === 2 ? `<div style="display:flex;align-items:center;gap:8px;margin:10px 0"><span style="flex:1;border-top:2px dashed ${R}"></span><span style="font-size:12px;color:${R};font-weight:600">Compliance line</span><span style="flex:1;border-top:2px dashed ${R}"></span></div>` : ''}
<div class="card" style="margin-bottom:8px;display:grid;grid-template-columns:22px 1fr;gap:4px 8px;${i === 0 ? `border:1.5px solid ${B}` : ''}"><span style="font-size:13px;font-weight:600;color:${B}">${n}</span><div><p style="font-size:16px;font-weight:600">${t}</p><p class="mut" style="font-size:13px;line-height:1.4;margin-top:2px">${d}</p><p style="font-size:12.5px;color:#3D424B;margin-top:8px">${s}</p></div></div>`).join('')}
<p class="mut" style="font-size:13px;margin-top:14px;line-height:1.5">Utility navigation: Online Shop, My Account.<br><span style="color:${R}">Dashed line:</span> tobacco and smoke-free never share a group. <span style="color:${B}">Outlined:</span> most-used first.</p>`;

// PMI: behaviour flow as horizontal bars
const cols = [['Start', 'Login', 276, 51], ['1st interaction', 'Homepage', 224, 48], ['2nd interaction', 'My Tasks', 176, 71], ['3rd interaction', 'Back to homepage', 105, 44]];
pages['pmi/s2-behaviour-flow'] = `<p class="lab">Platform analytics · retailer sessions</p><h2>Retailers came for a task, then left.</h2>
${cols.map(([s, p, n, d], i) => { const w = n / 276 * 100, dw = d / n * 100, hot = i === 2; return `<div style="margin-bottom:18px"><div style="display:flex;justify-content:space-between;align-items:baseline"><p style="font-size:15px;font-weight:600;color:${hot ? B : '#16181D'}">${p}</p><p class="mut" style="font-size:12.5px">${n}K sessions</p></div>
<div style="width:${w}%;height:26px;display:flex;margin-top:6px;border-radius:6px;overflow:hidden"><div style="flex:1;background:${hot ? B : '#C2C7CE'}"></div><div style="width:${dw}%;background:repeating-linear-gradient(135deg,${R}33 0 5px,${R}55 5px 10px);border:1px solid ${R}"></div></div>
<p style="font-size:12.5px;color:${R};font-weight:600;margin-top:4px">${d}K left here</p></div>`; }).join('')}
<p style="border-left:2px solid ${B};padding-left:12px;font-size:14px;line-height:1.5;color:#3D424B;margin-top:8px"><b style="color:#16181D">Almost half</b> of retailers who reached My Tasks left without opening another page.</p>`;

// PMI: decision
pages['pmi/s3-decision'] = `<p class="lab">Market requests</p><h2>One question decided what got built.</h2>
<div class="card" style="background:#F6F7F8;margin-bottom:8px"><p class="mut" style="font-size:12.5px">One market</p><p style="font-size:15px;font-weight:500;line-height:1.35;margin-top:4px">A separate task-management component to push mandatory actions</p></div>
<div class="card" style="background:#F6F7F8"><p class="mut" style="font-size:12.5px">Other markets</p><p style="font-size:15px;font-weight:500;line-height:1.35;margin-top:4px">Campaigns and incentives at the top of the dashboard</p></div>
<p style="text-align:center;color:#646973;font-size:18px;margin:8px 0">↓</p>
<div style="border:1.5px solid ${B};border-radius:12px;padding:16px;text-align:center;background:#fff"><p style="font-size:17px;font-weight:600;line-height:1.3">Can an existing component do this with styling?</p>
<p style="font-size:14px;margin-top:10px"><span style="color:${B};font-weight:600">Yes</span> → approved variant &nbsp;·&nbsp; <span class="mut">No → must-build list for HQ</span></p></div>
<p style="text-align:center;color:#646973;font-size:18px;margin:8px 0">↓</p>
<p class="lab" style="margin-bottom:8px">Shipped: the shared task card</p>
<div style="border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.1)"><img src="c-taskcard.png" style="display:block;width:100%"></div>
<p style="font-size:14px;line-height:1.45;margin-top:12px"><span style="color:${B};font-weight:600">Required tag + due date</span> mark the mandatory action. Same card, same build.</p>`;

// UW: journey as a vertical list
const phases = [['1', 'Pre-fault identification', 'Steps 1–4', 'Felt best', []], ['2', 'First-line troubleshooting', 'Steps 5–9', 'Dips', []], ['3', 'Fault raising', 'Steps 10–14', 'Lowest', ['No clear prompts to verify critical fields', 'Manual entry of fault details invites errors']], ['4', 'Hand-off to second line', 'Steps 15–19', 'Low', ['Wrong fault category sends tickets to the wrong team', 'Engineers get incomplete tickets and chase the adviser']], ['5', 'Resolution and close', 'Steps 20–24', 'Recovers', []]];
const mood = [92, 45, 8, 18, 70];
pages['utility-warehouse/s2-journey'] = `<p class="lab">Operational journey map · 24 steps</p><h2>Advisers and customers felt best at the first call. Everything after it dipped until the ticket closed.</h2>
${phases.map(([n, t, s, m, pain], i) => { const hot = i === 2 || i === 3; return `<div class="card" style="margin-bottom:8px;${hot ? `background:#FFF7D6;border-color:${B}88` : ''}">
<div style="display:flex;justify-content:space-between;gap:8px"><div><p style="font-size:12px;color:${B};font-weight:600">${n} · ${s}</p><p style="font-size:16px;font-weight:600;margin-top:2px">${t}</p></div>
<p style="flex:none;font-size:12px;font-weight:600;color:${i===0||i===4?'#1A7445':R};margin-top:2px">${m}</p></div>
${pain.map(p => `<p style="font-size:13.5px;line-height:1.4;border-left:2px solid ${R};padding-left:10px;margin-top:10px">${p}</p>`).join('')}</div>`; }).join('')}
<p class="mut" style="font-size:13px;margin-top:12px;line-height:1.45">Highlighted: where the redesign focused, the hand-offs. Tap the image for the full curve.</p>`;

// UW: before and after
const box = (t, s, c) => `<div style="background:#fff;border:1px solid ${c || 'rgba(22,24,29,.1)'};border-radius:10px;padding:10px 12px"><p style="font-size:14.5px;font-weight:600">${t}</p><p class="mut" style="font-size:12.5px;margin-top:2px">${s}</p></div>`;
const ar = `<p style="text-align:center;color:#646973;font-size:14px;line-height:1;margin:4px 0">↓</p>`;
pages['utility-warehouse/s3-before-after'] = `<p class="lab">Before · BILL (simplified)</p><h2 style="font-size:19px;margin-bottom:14px">Four product flows, no shared rules</h2>
${['Residential phone', 'Residential broadband', 'Business phone', 'Business broadband'].map(t => `<div style="margin-bottom:10px"><p style="font-size:13px;color:#3D424B;margin-bottom:4px">${t}</p><div style="display:flex;gap:5px">${['Free-text notes', 'Manual code', 'Escalate'].map((s, i) => `<span style="flex:1;border:1px dashed ${i == 2 ? R : '#C2C7CE'};border-radius:6px;padding:6px 4px;font-size:11.5px;color:${i == 2 ? R : '#5A5F69'};text-align:center">${s}</span>`).join('')}</div></div>`).join('')}
<p style="font-size:13.5px;color:${R};font-weight:600;margin:12px 0 0">Over 40% of fault tickets needed manual correction</p>
<div style="border-top:1px solid #C2C7CE;margin:24px 0"></div>
<p class="lab">After · William</p><h2 style="font-size:19px;margin-bottom:14px">One guided path, one route to second line</h2>
${box('Outage check', 'Known outage? Inform the customer, no ticket')}${ar}${box('Diagnose', 'Questions change with the fault type', V)}${ar}${box('Line test', 'A fail escalates and captures sync data', V)}${ar}${box('Classify', 'Category checked, not guessed', V)}${ar}${box('Escalate to second line', 'Only once every required field is complete', B)}
<p style="font-size:13.5px;line-height:1.5;color:#3D424B;margin-top:14px"><b style="color:${B}">Six escalation routes became one.</b> Conditional questions, and inline checks against what second line needs to dispatch.</p>`;

// LR: timeline vertical
const st = [['Register', 'Name, email, phone, country, password', 'Restricted countries never listed', 'Minimum to get in'], ['Deposit', 'Cashier opens after sign-up', 'Deposit before any documents', 'The PM’s call, kept'], ['Play', 'Level 1: complete your profile', 'Date of birth and address', 'Needed before play'], ['Withdraw', 'Level 2: identity and address', 'Documents only when money leaves', 'Where full KYC sits']];
pages['lucky-riches/s2-timeline'] = `<p class="lab">Player journey · what is asked, and when</p><h2>Full checks only when money leaves.</h2>
<div style="position:relative;padding-left:40px"><div style="position:absolute;left:13px;top:6px;bottom:24px;width:2px;background:linear-gradient(${T},${T} 70%,${A})"></div>
${st.map(([t, a, b, c], i) => `<div style="position:relative;margin-bottom:16px"><div style="position:absolute;left:-40px;top:0;width:28px;height:28px;border-radius:50%;background:#E8EAED;border:2px solid ${i == 3 ? A : T};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${i == 3 ? A : T}">${i + 1}</div>
<p style="font-size:17px;font-weight:600;line-height:28px">${t}</p><div class="card" style="margin-top:6px"><p style="font-size:14.5px;font-weight:600;line-height:1.35">${a}</p><p class="mut" style="font-size:13px;margin-top:4px">${b}</p></div><p style="font-size:12.5px;color:${i == 3 ? A : T};font-weight:600;margin-top:6px">${c}</p></div>`).join('')}</div>
<div style="border:1px dashed ${A}88;border-radius:12px;padding:12px 14px;margin-top:4px"><p style="font-size:11.5px;font-weight:700;color:${A};letter-spacing:.06em;text-transform:uppercase">Risk triggers</p><p style="font-size:13.5px;color:#3D424B;line-height:1.45;margin-top:4px">Level 3, proof of payment, and level 4, source of funds, switch on at any stage when account activity, payment method or regulation calls for them.</p></div>`;

// LR: deposit states
const node = (t, s, c) => `<div class="card" style="padding:10px 12px;${c ? `border-color:${c}` : ''}"><p style="font-size:14.5px;font-weight:600">${t}</p><p class="mut" style="font-size:12.5px;margin-top:2px">${s}</p></div>`;
pages['lucky-riches/s3-states'] = `<p class="lab">Deposit states, from the spec</p><h2>Every outcome designed, not left to the developers.</h2>
${node('Amount entered', 'CTA gated until every required field is valid')}${ar}${node('Waiting', 'External payment flow open', T)}${ar}${node('Pending', 'Awaiting confirmation; transaction ID copyable', A)}${ar}
<div style="display:grid;gap:6px">${node('Success', 'Amount and bonus confirmed', '#1A7445')}${node('Insufficient funds', 'New amount, or switch method', R)}${node('Other error', 'Retry with details kept, or switch', R)}</div>
<p class="mut" style="font-size:13px;margin-top:14px;line-height:1.45">From 86 numbered behaviour rules for the cashier. Tap the image to see the real spec.</p>`;

(async () => {
  for (const [key, body] of Object.entries(pages)) {
    const [slug, name] = key.split('/');
    await renderMobile({ slug, name, base, html: doc(css, body) });
  }
  await done();
})();
