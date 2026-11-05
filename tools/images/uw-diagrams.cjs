// uw-diagrams: case-study images for utility-warehouse. Run: node tools/images/uw-diagrams.cjs
const nodePath = require('path');
const { render, doc, done } = require('./lib.cjs');
const slug = 'utility-warehouse';
const base = nodePath.join(__dirname, 'sources', 'uw-diagrams');
const css=`*{box-sizing:border-box;margin:0;padding:0}body{background:#E8EAED;font-family:Inter,sans-serif;color:#16181D;-webkit-font-smoothing:antialiased}
.lab{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#5F6470}`;
const Y='#2D4BFF',R='#BE2A30',P='#7444E8';
// journey curve from map: x in map px (phase cols 459..8792), y 1000(best)..1201(worst)
const pts=[[650,1192],[800,1131],[950,1070],[1100,1028],[1400,1028],[1550,1035],[1700,1072],[1850,1109],[2000,1147],[2150,1165],[2300,1181],[2450,1197],[2600,1201],[2750,1201],[2900,1198],[3050,1183],[3200,1168],[3350,1153],[3650,1147],[3800,1146],[3950,1156],[4100,1174],[4250,1192],[4400,1196],[4550,1188],[4700,1179],[4850,1157],[5000,1117],[5150,1086],[5300,1102],[5450,1118],[5600,1134],[5750,1150],[5900,1168],[6050,1185],[6200,1199],[6650,1199],[6800,1191],[6950,1182],[7100,1173],[7250,1178],[7400,1186],[7550,1195],[7700,1179],[7850,1119],[8000,1059],[8150,1000],[8600,1000]];
const X0=459,X1=8792, W=1296, Hc=150;
const sx=x=>(x-X0)/(X1-X0)*W, sy=y=>(y-1000)/201*Hc;
const path='M'+pts.map(([x,y])=>`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(' L');
const phases=[['1','Pre-fault identification','Steps 1–4'],['2','First-line troubleshooting','Steps 5–9'],['3','Fault raising','Steps 10–14'],['4','Hand-off to second line','Steps 15–19'],['5','Resolution and close','Steps 20–24']];
const pain=[[2,'No clear prompts to verify critical fields'],[2,'Manual entry of fault details invites errors'],[3,'Wrong fault category sends tickets to the wrong team'],[3,'Engineers get incomplete tickets and chase the adviser']];
const journey=`<div style="padding:60px 72px;height:810px">
 <p class="lab">Operational journey map · 24 steps · 5 phases</p>
 <h2 style="font-size:34px;font-weight:600;letter-spacing:-.02em;margin-top:12px;max-width:1000px">Advisers and customers felt best at the first call. Everything after it dipped until the ticket closed.</h2>
 <div style="position:relative;margin-top:44px;width:${W}px">
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
   ${phases.map(([n,t,s],i)=>`<div style="background:${i==2||i==3?'#FFF7D6':'#FFFFFF'};border:1px solid ${i==2||i==3?Y+'88':'rgba(22,24,29,.08)'};border-radius:12px;padding:14px 16px;height:${Hc+170}px">
    <p style="font-size:13px;color:${Y};font-weight:600">${n}</p><p style="font-size:17px;font-weight:600;line-height:1.25;margin-top:6px">${t}</p><p style="font-size:13px;color:#5F6470;margin-top:4px">${s}</p></div>`).join('')}
  </div>
  <svg width="${W}" height="${Hc+20}" style="position:absolute;left:0;top:130px;overflow:visible">
   <line x1="0" y1="0" x2="${W}" y2="0" stroke="#D3D7DC" stroke-dasharray="3 5"/><line x1="0" y1="${Hc}" x2="${W}" y2="${Hc}" stroke="#D3D7DC" stroke-dasharray="3 5"/>
   <path d="${path}" fill="none" stroke="#16181D" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
   <text x="-8" y="5" fill="#5F6470" font-size="12" text-anchor="end" font-family="Inter">Good</text><text x="-8" y="${Hc+4}" fill="#5F6470" font-size="12" text-anchor="end" font-family="Inter">Poor</text>
  </svg>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:22px">
   ${[0,1,2,3,4].map(i=>`<div>${pain.filter(p=>p[0]==i).map(p=>`<p style="font-size:15px;line-height:1.4;color:#16181D;border-left:2px solid ${R};padding:2px 0 2px 12px;margin-bottom:12px">${p[1]}</p>`).join('')}</div>`).join('')}
  </div>
  <p style="font-size:14px;color:#5A5F69;margin-top:6px"><span style="display:inline-block;width:12px;height:12px;border:1.5px solid ${Y};border-radius:3px;vertical-align:-1px;margin-right:8px"></span>Where the redesign focused: the pain is in the hand-offs, not the first call</p>
 </div></div>`;
const box=(t,sub,c)=>`<div style="background:#FFFFFF;border:1px solid ${c||'rgba(22,24,29,.1)'};border-radius:10px;padding:10px 14px"><p style="font-size:15px;font-weight:600">${t}</p>${sub?`<p style="font-size:12.5px;color:#5A5F69;margin-top:3px">${sub}</p>`:''}</div>`;
const arrow=`<div style="color:#646973;font-size:18px;text-align:center;line-height:1">↓</div>`;
const flow=`<div style="padding:0 72px;height:810px;display:grid;grid-template-columns:1fr 70px 1.15fr;gap:24px;align-items:center">
 <div><p class="lab">Before · BILL (simplified)</p><h3 style="font-size:24px;font-weight:600;margin:10px 0 22px">Four product flows, no shared rules</h3>
  ${['Residential phone','Residential broadband','Business phone','Business broadband'].map(t=>`<div style="display:flex;gap:8px;align-items:center;margin-bottom:12px">
   <div style="width:150px;font-size:14px;color:#3D424B">${t}</div>
   <div style="flex:1;display:flex;gap:6px">${['Free-text notes','Manual code','Escalate'].map((s,i)=>`<div style="flex:1;border:1px dashed ${i==2?R:'#C2C7CE'};border-radius:7px;padding:8px 6px;font-size:12px;color:${i==2?R:'#5A5F69'};text-align:center">${s}</div>`).join('')}</div></div>`).join('')}
  <div style="margin-top:26px;font-size:15px;line-height:1.55;color:#3D424B">
   <p>• No validation before a ticket leaves</p><p>• Category picked by guesswork</p><p>• Six escalation routes, one per team</p><p style="color:${R};font-weight:600;margin-top:10px">Over 40% of fault tickets needed manual correction</p></div></div>
 <div style="display:flex;align-items:center;justify-content:center;font-size:34px;color:#646973">→</div>
 <div><p class="lab">After · William</p><h3 style="font-size:24px;font-weight:600;margin:10px 0 18px">One guided path, one route to second line</h3>
  <div style="display:grid;grid-template-columns:1fr 200px;gap:14px;align-items:start">
   <div style="display:flex;flex-direction:column;gap:6px">
    ${box('Outage check','Known outage? Inform the customer, no ticket')}${arrow}
    ${box('Diagnose','Questions change with the fault type',P)}${arrow}
    ${box('Line test','A fail escalates and captures sync data',P)}${arrow}
    ${box('Classify','Category checked, not guessed',P)}${arrow}
    ${box('Escalate to second line','Only once every required field is complete',Y)}
   </div>
   <div style="display:flex;flex-direction:column;gap:12px;padding-top:4px">
    ${[[P,'1','Conditional questions','Advisers only see what applies'],[P,'2','Inline validation','Checked against what second line needs to dispatch'],[Y,'3','Single escalation','Six routes became one']].map(([c,n,t,s])=>`<div style="border-left:2px solid ${c};padding-left:12px"><p style="font-size:12px;color:${c};font-weight:700">${n}</p><p style="font-size:15px;font-weight:600;margin-top:2px">${t}</p><p style="font-size:13px;color:#5A5F69;line-height:1.4;margin-top:3px">${s}</p></div>`).join('')}
   </div></div></div></div>`;
const pages={'s2-journey':journey,'s3-before-after':flow};

(async () => {
  for (const [name, body] of Object.entries(pages)) await render({ slug, name, base, html: doc(css, body, ' body{width:1440px;height:810px;overflow:hidden}') });
  await done();
})();
