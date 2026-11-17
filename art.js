/* Story Cards: hand-drawn ink art, all original SVG.
   art(word, state)  -> drawing used on the stage and on the cards
   scene(place)      -> panel background
   Every drawing sits in a 100 x 120 box with the ground at y = 114. */

const INK = "#4a3426";
const C = {
  skin:"#f2d0b0", skin2:"#e2b48e", cheek:"#e39a80", mouth:"#8a3b2e",
  red:"#c4573f", blue:"#5f7f98", green:"#7f9a5c", yellow:"#e3bd58", purple:"#8c6b8f",
  brown:"#7a5236", dark:"#4f3524", cream:"#f4ead6", grey:"#cfc6b8", sand:"#e8cf98", sea:"#8fb3bd"
};
const st = (w=2.4) => `stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const shadow = (cx=50, rx=22) => `<ellipse cx="${cx}" cy="115" rx="${rx}" ry="4" fill="${INK}" opacity=".16"/>`;
const svgWrap = (inner, vb="0 0 100 120", cls="") =>
  `<svg class="drw ${cls}" viewBox="${vb}" aria-hidden="true"><g filter="url(#wob)">${inner}</g></svg>`;

/* ---------- faces ---------- */
function face(cx, cy, s, o={}) {
  const m = o.mood || "neutral";
  let eyes = o.asleep ? "closed" : ({tired:"half", scared:"wide"}[m] || "open");
  if (o.mouth === "open" && eyes === "half") eyes = "open";
  const ex = 8*s; let g = "";
  g += `<circle cx="${cx-11*s}" cy="${cy+6*s}" r="${3.2*s}" fill="${C.cheek}" opacity=".55"/><circle cx="${cx+11*s}" cy="${cy+6*s}" r="${3.2*s}" fill="${C.cheek}" opacity=".55"/>`;
  for (const sx of [-1, 1]) {
    const x = cx + sx*ex;
    if (eyes === "open") g += `<ellipse class="blink" cx="${x}" cy="${cy}" rx="${2.3*s}" ry="${3.1*s}" fill="${INK}"/>`;
    if (eyes === "closed") g += `<path d="M${x-3.2*s} ${cy} Q${x} ${cy+3.4*s} ${x+3.2*s} ${cy}" fill="none" ${st(2)}/>`;
    if (eyes === "half") g += `<path d="M${x-3.4*s} ${cy} L${x+3.4*s} ${cy}" ${st(2)}/><ellipse cx="${x}" cy="${cy+1.2*s}" rx="${2*s}" ry="${1.4*s}" fill="${INK}"/>`;
    if (eyes === "wide") g += `<circle cx="${x}" cy="${cy}" r="${3.8*s}" fill="#fff" ${st(1.6)}/><circle cx="${x}" cy="${cy+.6*s}" r="${1.6*s}" fill="${INK}"/>`;
    if (m === "sad") g += `<path d="M${x - sx*3.5*s} ${cy-8*s} L${x + sx*3.5*s} ${cy-5*s}" ${st(1.8)}/>`;
    if (m === "scared") g += `<path d="M${x-3*s} ${cy-7*s} Q${x} ${cy-10*s} ${x+3*s} ${cy-7*s}" fill="none" ${st(1.8)}/>`;
  }
  const my = cy + 9*s;
  if (o.mouth === "open") g += `<ellipse cx="${cx}" cy="${my+1*s}" rx="${3.6*s}" ry="${4.2*s}" fill="${C.mouth}" ${st(1.8)}/>`;
  else if (m === "happy") g += `<path d="M${cx-6*s} ${my-1*s} Q${cx} ${my+7*s} ${cx+6*s} ${my-1*s} Z" fill="${C.mouth}" ${st(1.8)}/>`;
  else if (m === "sad") g += `<path d="M${cx-5*s} ${my+3*s} Q${cx} ${my-2.5*s} ${cx+5*s} ${my+3*s}" fill="none" ${st(2)}/>`;
  else if (m === "scared") g += `<path d="M${cx-6*s} ${my+1*s} q${2*s} ${-3*s} ${4*s} 0 t${4*s} 0 t${4*s} 0" fill="none" ${st(1.8)}/>`;
  else if (m === "tired") g += `<ellipse cx="${cx}" cy="${my+1*s}" rx="${2.2*s}" ry="${3*s}" fill="${C.mouth}" ${st(1.6)}/>`;
  else if (m === "hungry") g += `<path d="M${cx-5*s} ${my} Q${cx} ${my+5*s} ${cx+5*s} ${my}" fill="none" ${st(2)}/><path d="M${cx+3*s} ${my+2*s} q${1.5*s} ${4*s} 0 ${6*s} q${-1.5*s} ${-2*s} 0 ${-6*s}" fill="#bfe0ec" ${st(1.2)}/>`;
  else g += `<path d="M${cx-4*s} ${my} Q${cx} ${my+3*s} ${cx+4*s} ${my}" fill="none" ${st(2)}/>`;
  if (m === "sad" && !o.asleep) g += `<path d="M${cx+ex+2*s} ${cy+4*s} q${2.2*s} ${4*s} 0 ${6.5*s} q${-2.2*s} ${-2.5*s} 0 ${-6.5*s}" fill="#9cc3d6" ${st(1.3)}/>`;
  return g;
}
const zz = o => o.asleep ? `<text x="72" y="22" class="zzz">z</text><text x="82" y="10" class="zzz small">z</text>` : "";
const thought = (o, inner) => `<g class="bubble"><circle cx="70" cy="30" r="2.5" fill="#fff" ${st(1.4)}/><circle cx="76" cy="22" r="3.5" fill="#fff" ${st(1.4)}/><ellipse cx="86" cy="8" rx="13" ry="10" fill="#fff" ${st(1.6)}/><g transform="translate(77 -2) scale(.18)">${inner}</g></g>`;

/* ---------- people ---------- */
const HAIR = {
  grandma:{front:`<path d="M27 38 Q29 15 50 15 Q71 15 73 38 Q66 25 50 25 Q34 25 27 38Z" fill="#ddd5c8" ${st()}/><circle cx="50" cy="12" r="8" fill="#ddd5c8" ${st()}/>`,
           extra:`<circle cx="42" cy="41" r="6.2" fill="none" ${st(1.8)}/><circle cx="58" cy="41" r="6.2" fill="none" ${st(1.8)}/><path d="M48 41 L52 41" ${st(1.8)}/>`, shirt:C.purple, skirt:true},
  mom:{back:`<path d="M27 38 Q22 66 32 76 L68 76 Q78 66 73 38Z" fill="${C.brown}" ${st()}/>`,
       front:`<path d="M27 40 Q29 16 50 16 Q71 16 73 40 Q64 27 50 29 Q38 26 27 40Z" fill="${C.brown}" ${st()}/>`, shirt:C.blue, skirt:true},
  boy:{front:`<path d="M27 37 Q28 15 50 16 Q72 15 73 37 L67 28 L61 33 L55 25 L49 31 L43 25 L37 32 L32 27Z" fill="${C.dark}" ${st()}/>`, shirt:C.green, skirt:false},
  girl:{back:`<circle cx="24" cy="46" r="9" fill="${C.yellow}" ${st()}/><circle cx="76" cy="46" r="9" fill="${C.yellow}" ${st()}/>`,
        front:`<path d="M27 39 Q30 16 50 16 Q70 16 73 39 Q62 25 50 28 Q38 25 27 39Z" fill="${C.yellow}" ${st()}/><circle cx="29" cy="40" r="3" fill="${C.red}" ${st(1.4)}/><circle cx="71" cy="40" r="3" fill="${C.red}" ${st(1.4)}/>`, shirt:C.red, skirt:true},
  you:{front:`<path d="M27 38 Q28 15 50 15 Q72 15 73 38 Q66 31 58 32 Q48 26 40 32 Q32 30 27 38Z" fill="#3b2a20" ${st()}/><path d="M26 30 Q30 8 50 8 Q70 8 74 30 Q62 22 50 22 Q38 22 26 30Z" fill="${C.yellow}" ${st()}/><path d="M28 28 Q50 18 72 28" fill="none" ${st(1.4)} opacity=".5"/><circle cx="50" cy="7" r="4" fill="${C.yellow}" ${st(1.6)}/>`, shirt:"#5f9284", skirt:false},
  friend:{skin:"#c98f62",front:`<path d="M26 40 Q22 30 30 26 Q30 14 42 16 Q48 8 58 14 Q70 12 72 24 Q80 30 74 40 Q68 28 50 28 Q34 28 26 40Z" fill="#2c211b" ${st()}/>`, shirt:"#d08a4a", skirt:false},
  barista:{skin:"#e7b892",back:`<circle cx="50" cy="16" r="9" fill="#9a5b34" ${st()}/>`,front:`<path d="M27 40 Q29 16 50 17 Q71 16 73 40 Q66 28 54 28 Q40 26 27 40Z" fill="#9a5b34" ${st()}/>`, shirt:"#f4ead6", skirt:false, apron:"#4f6b4a"},
  stranger:{skin:"#efc6a6",front:`<path d="M28 40 Q26 30 30 28 M72 40 Q74 30 70 28" fill="none" ${st(4)} stroke="#d8d0c4"/><path d="M26 30 Q28 12 50 12 Q72 12 74 30 L80 32 Q50 24 22 32Z" fill="#7a5a3c" ${st()}/>`, extra:`<path d="M42 50 Q50 46 58 50 Q54 54 50 51 Q46 54 42 50Z" fill="#d8d0c4" ${st(1.4)}/>`, shirt:"#8d8a80", skirt:false},
  guest:{skin:"#a8714a",back:`<path d="M20 50 Q10 34 22 22 Q26 6 46 8 Q60 2 72 14 Q88 20 82 38 Q90 52 78 58 L22 58Z" fill="#2f2218" ${st()}/>`,front:`<path d="M28 34 Q36 22 50 24 Q64 22 72 34 Q64 30 50 31 Q36 30 28 34Z" fill="#2f2218" ${st(1.6)}/>`, shirt:C.yellow, skirt:true},
  boss:{skin:"#f0cba8",front:`<path d="M27 36 Q28 16 50 16 Q72 16 73 36 Q70 26 56 25 Q40 22 27 36Z" fill="#6d6259" ${st()}/>`, extra:`<rect x="35" y="36" width="12" height="9" rx="2" fill="none" ${st(1.8)}/><rect x="53" y="36" width="12" height="9" rx="2" fill="none" ${st(1.8)}/><path d="M47 40 L53 40" ${st(1.6)}/>`, shirt:"#3f4f6b", skirt:false, tie:C.red},
  waiter:{skin:"#d9a77f",front:`<path d="M27 38 Q28 16 50 16 Q72 16 73 38 Q70 24 54 24 Q36 22 27 38Z" fill="#231a15" ${st()}/>`, shirt:"#f4ead6", skirt:false, vest:"#2f2a2a", bow:"#2f2a2a"},
  cashier:{skin:"#f0c9a5",back:`<path d="M70 30 Q90 40 82 64 Q78 50 70 44Z" fill="#8a5a32" ${st()}/>`,front:`<path d="M27 40 Q29 16 50 16 Q71 16 73 40 Q66 28 52 28 Q38 26 27 40Z" fill="#8a5a32" ${st()}/>`, shirt:C.red, skirt:false, badge:1},
  doctor:{skin:"#b77d55",front:`<path d="M28 36 Q29 17 50 17 Q71 17 72 36 Q66 26 50 26 Q34 26 28 36Z" fill="#3a3a3a" ${st()}/>`, shirt:"#f7f4ee", skirt:true, steth:1},
  receptionist:{skin:"#f3d4b8",back:`<path d="M26 38 Q22 58 30 62 L70 62 Q78 58 74 38Z" fill="#e3bd58" ${st()}/>`,front:`<path d="M26 40 Q28 15 50 15 Q72 15 74 40 Q70 26 46 26 Q34 28 26 40Z" fill="#e3bd58" ${st()}/>`, shirt:"#3f7a7a", skirt:true, badge:1},
  manager:{skin:"#ecc29c",back:`<circle cx="50" cy="15" r="9" fill="#3b2a20" ${st()}/>`,front:`<path d="M27 40 Q29 17 50 17 Q71 17 73 40 Q66 26 50 27 Q34 26 27 40Z" fill="#3b2a20" ${st()}/>`, extra:`<circle cx="42" cy="41" r="6" fill="none" ${st(1.8)}/><circle cx="58" cy="41" r="6" fill="none" ${st(1.8)}/><path d="M48 41 L52 41" ${st(1.6)}/>`, shirt:"#8a3b4a", skirt:true},
  bartender:{skin:"#e8b58c",front:`<path d="M27 36 Q28 16 50 16 Q72 16 73 36 Q64 24 50 25 Q36 24 27 36Z" fill="#6b4630" ${st()}/>`, extra:`<path d="M30 46 Q32 66 50 66 Q68 66 70 46 Q66 56 58 54 Q50 58 42 54 Q34 56 30 46Z" fill="#6b4630" ${st(1.8)}/>`, shirt:"#3b3a40", skirt:false, apron:"#8a5f40"},
  roommate:{skin:"#e9bf98",front:`<path d="M26 40 Q24 18 40 14 L44 22 L50 12 L56 22 L62 13 L66 22 Q78 24 74 40 Q68 28 56 30 Q42 26 26 40Z" fill="#9a6a3c" ${st()}/>`, shirt:"#9a9a9a", skirt:false},
  neighbor:{skin:"#f0cba8",front:`<path d="M28 34 Q30 18 50 18 Q70 18 72 34 Q66 26 50 26 Q34 26 28 34Z" fill="#cfc6b8" ${st()}/>${[34,44,56,66].map(x=>`<circle cx="${x}" cy="20" r="4.5" fill="#e7b9c7" ${st(1.4)}/>`).join("")}`, shirt:"#a9c4d6", skirt:true},
  partner:{skin:"#d7a07a",back:`<path d="M24 40 Q18 62 26 76 Q34 70 32 58 L68 58 Q66 70 74 76 Q82 62 76 40Z" fill="#3a2418" ${st()}/>`,front:`<path d="M26 42 Q26 15 50 15 Q74 15 74 42 Q68 24 50 26 Q36 24 26 42Z" fill="#3a2418" ${st()}/>`, shirt:"#5f9284", skirt:true},
  dad:{skin:"#f0c9a5",front:`<path d="M28 34 Q26 26 32 24 M72 34 Q74 26 68 24" fill="none" ${st(5)} stroke="#8d7a68"/>`, extra:`<path d="M42 49 Q50 45 58 49 Q55 53 50 50 Q45 53 42 49Z" fill="#8d7a68" ${st(1.4)}/>`, shirt:"#7a3b4a", skirt:false},
  coworker:{skin:"#f3d4b8",back:`<path d="M22 46 Q14 30 26 20 Q34 8 50 10 Q66 8 74 20 Q86 30 78 46Z" fill="#c4673f" ${st()}/>`,front:`<path d="M27 38 Q32 22 50 22 Q68 22 73 38 Q64 30 50 31 Q36 30 27 38Z" fill="#c4673f" ${st(1.6)}/>`, extra:`<rect x="35" y="36" width="12" height="10" rx="4" fill="none" ${st(1.8)}/><rect x="53" y="36" width="12" height="10" rx="4" fill="none" ${st(1.8)}/><path d="M47 40 L53 40" ${st(1.6)}/>`, shirt:"#8c6b8f", skirt:false},
  date:{skin:"#c98f62",front:`<path d="M27 38 Q26 16 46 14 Q66 10 74 30 Q62 22 54 30 Q46 24 40 30 Q32 28 27 38Z" fill="#1f1712" ${st()}/>`, shirt:"#7a64a6", skirt:false},
  kid:{front:`<path d="M28 37 Q30 16 50 16 Q70 16 72 37 Q62 26 50 27 Q38 26 28 37Z" fill="${C.brown}" ${st()}/>`, shirt:"#b9a77a", skirt:false}
};
function arm(sx, deg, hand="", skin=C.skin) {
  const a = deg*Math.PI/180, x0 = sx<0?39:61, y0 = 68;
  const x = x0 + sx*Math.sin(a)*23, y = y0 + Math.cos(a)*23;
  return `<path d="M${x0} ${y0} L${x.toFixed(1)} ${y.toFixed(1)}" ${st(5.5)} stroke="${INK}"/><path d="M${x0} ${y0} L${x.toFixed(1)} ${y.toFixed(1)}" stroke="${skin}" stroke-width="2.2" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${skin}" ${st(1.8)}/>${hand}`;
}
function legs(mode) {
  const L = {
    stand:[[45,96,44,113],[55,96,56,113]],
    run:[[45,96,34,110],[55,96,63,104]],
    run2:[[45,96,38,104],[55,96,66,110]],
    jump:[[45,96,38,104],[55,96,62,104]],
    kick:[[45,96,44,113],[55,96,70,104]]
  }[mode||"stand"];
  return L.map(([a,b,c,d]) => `<path d="M${a} ${b} L${c} ${d}" ${st(6)}/><path d="M${a} ${b} L${c} ${d}" stroke="#6b5a4a" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="${c+(c<50?-2:2)}" cy="${d+1}" rx="5" ry="3" fill="${INK}"/>`).join("");
}
const POSES = {
  eat:{armR:150,mouth:"open"}, sing:{armL:60,armR:60,mouth:"open"}, laugh:{armL:28,armR:28,mouth:"open",mood:"happy"},
  run:{armL:-40,armR:50,legs:"run",run:1}, walk:{armL:-20,armR:25,legs:"run",run:1},
  jump:{armL:160,armR:160,legs:"jump"}, hop:{armL:40,armR:40}, hug:{armL:85,armR:85},
  hide:{armL:165,armR:165,mood:"scared"}, climb:{armL:170,armR:150,legs:"jump"}, swim:{armL:150,armR:-10},
  bake:{armL:40,armR:40}, play:{armL:40,armR:30,legs:"kick"}, read:{armL:55,armR:55},
  dance:{armL:140,armR:30,legs:"kick",dance:1}, think:{armR:160,armL:10}, point:{armR:90}, fly:{armL:100,armR:100}, feel:{}
};
function person(who, o={}) {
  const h = HAIR[who], skin = h.skin || C.skin;
  const P = POSES[o.pose] || {};
  o = {...o, ...P, mood: P.mood || o.mood};
  if (o.run && o.frame) o.legs = "run2";
  if (o.dance && o.frame) { const t=o.armL; o.armL=o.armR; o.armR=t; }
  const body = h.skirt
    ? `<path d="M40 62 Q50 58 60 62 L66 98 Q50 103 34 98Z" fill="${h.shirt}" ${st()}/>`
    : `<path d="M40 62 Q50 58 60 62 L62 92 L38 92Z" fill="${h.shirt}" ${st()}/><path d="M38 92 L62 92 L61 99 L39 99Z" fill="${who==="boss"?"#2e3a50":C.blue}" ${st()}/>`;
  const apron = h.apron ? `<path d="M42 66 L58 66 L60 96 L40 96Z" fill="${h.apron}" ${st(1.8)}/>` : "";
  const vest = h.vest ? `<path d="M40 62 L46 62 L50 76 L54 62 L60 62 L62 92 L38 92Z" fill="${h.vest}" ${st(1.8)}/>` : "";
  const bow = h.bow ? `<path d="M44 61 L50 64 L56 61 L56 67 L50 64 L44 67Z" fill="${h.bow}" ${st(1.2)}/>` : "";
  const badge = h.badge ? `<rect x="52" y="70" width="9" height="6" rx="1" fill="#fbf7ee" ${st(1.2)}/>` : "";
  const steth = h.steth ? `<path d="M43 62 Q40 78 48 82 Q56 78 57 62" fill="none" ${st(1.8)}/><circle cx="48" cy="84" r="3" fill="${C.grey}" ${st(1.4)}/>` : "";
  const tie = h.tie ? `<path d="M50 62 L53 66 L51 80 L50 83 L49 80 L47 66Z" fill="${h.tie}" ${st(1.4)}/>` : "";
  const held = o.pose==="read" ? `<g transform="translate(26 50) scale(.48)">${OBJ.book().replace(/<ellipse cx="50" cy="115"[^>]*\/>/,"")}</g>`
    : o.pose==="bake" ? `<path d="M30 84 Q50 100 70 84Z" fill="${C.cream}" ${st()}/>` : "";
  const aL = o.armL ?? 12, aR = o.armR ?? 12;
  return (o.noShadow?"":shadow()) + legs(o.legs) + (h.back||"") + arm(-1,aL,o.handL,skin) + arm(1,aR,o.handR,skin) + body + vest + apron + tie + bow + badge + steth
    + `<path d="M44 60 L56 60 L54 66 L46 66Z" fill="${skin}" ${st(1.6)}/>`
    + `<circle cx="50" cy="40" r="22" fill="${skin}" ${st()}/>` + h.front
    + face(50, 42, 1, o) + (h.extra||"") + (o.top||"") + held + zz(o)
    + (o.pose==="think" ? `<text x="78" y="22" class="zzz">?</text>` : "")
    + (o.pose==="laugh" ? `<text x="72" y="20" class="bang">ha ha</text>` : "");
}

/* ---------- animals & creatures ---------- */
function dog(o={}) {
  return shadow(54,26)
   + `<path d="M76 84 Q90 70 86 60" fill="none" ${st(4)}/>`
   + [36,46,62,72].map(x=>`<path d="M${x} 98 L${x} 112" ${st(5)}/><ellipse cx="${x+1}" cy="113" rx="4" ry="2.4" fill="${INK}"/>`).join("")
   + `<ellipse cx="54" cy="90" rx="25" ry="14" fill="#c99a63" ${st()}/><ellipse cx="64" cy="86" rx="7" ry="5" fill="#8f6436" opacity=".85"/>`
   + `<ellipse cx="20" cy="60" rx="6" ry="13" transform="rotate(18 20 60)" fill="#8f6436" ${st()}/>`
   + `<circle cx="34" cy="64" r="17" fill="#c99a63" ${st()}/>`
   + `<ellipse cx="48" cy="60" rx="6" ry="13" transform="rotate(-18 48 60)" fill="#8f6436" ${st()}/>`
   + `<ellipse cx="34" cy="73" rx="9" ry="6.5" fill="${C.cream}" ${st(1.8)}/><ellipse cx="34" cy="69.5" rx="3.2" ry="2.2" fill="${INK}"/>`
   + face(34, 62, .72, {...o, mouth:(o.pose==="eat"||o.pose==="laugh")?"open":o.mouth}) .replace(/<circle[^>]*e39a80[^>]*\/>/g,"")
   + zz(o) + (o.mood==="hungry" ? thought(o, OBJ.cake()) : "");
}
function cat(o={}) {
  return shadow(50,18)
   + `<path d="M64 108 Q86 104 82 84 Q80 76 74 80" fill="none" ${st(4.5)}/>`
   + `<path d="M36 112 Q30 84 50 78 Q70 84 64 112Z" fill="#a9a399" ${st()}/><path d="M44 86 L48 90 M44 96 L49 99 M58 88 L54 92" ${st(1.6)}/>`
   + `<path d="M34 54 L36 36 L46 46Z" fill="#a9a399" ${st()}/><path d="M66 54 L64 36 L54 46Z" fill="#a9a399" ${st()}/>`
   + `<circle cx="50" cy="60" r="17" fill="#a9a399" ${st()}/>`
   + face(50, 58, .78, o)
   + `<path d="M30 64 L40 65 M30 69 L40 67 M70 64 L60 65 M70 69 L60 67" ${st(1.2)}/><path d="M48 63 L52 63 L50 65Z" fill="${C.cheek}" ${st(1.2)}/>`
   + zz(o);
}
function bird(o={}) {
  const wing = o.flying ? `<path d="M48 82 Q30 50 14 58 Q26 70 44 90Z" fill="#567ea3" ${st()}/>` : `<path d="M44 88 Q32 96 40 106 Q52 104 54 92Z" fill="#567ea3" ${st()}/>`;
  return shadow(50,14) + `<path d="M46 108 L44 114 M54 108 L56 114" ${st(2)}/>`
   + `<circle cx="50" cy="90" r="19" fill="#6f93b5" ${st()}/><ellipse cx="54" cy="96" rx="10" ry="9" fill="${C.cream}" opacity=".9"/>`
   + wing + `<path d="M66 84 L78 88 L66 92Z" fill="${C.yellow}" ${st(1.8)}/>` + face(56, 84, .55, o) + zz(o);
}
function crab(o={}) {
  return shadow(50,28)
   + [[30,100,18,112],[34,104,26,114],[70,100,82,112],[66,104,74,114]].map(([a,b,c,d])=>`<path d="M${a} ${b} L${c} ${d}" ${st(3)}/>`).join("")
   + `<path d="M30 92 L20 82 M70 92 L80 82" ${st(3.5)}/>`
   + `<path d="M8 76 Q12 64 24 70 L18 76 L26 80 Q16 90 8 76Z" fill="${C.red}" ${st()}/><path d="M92 76 Q88 64 76 70 L82 76 L74 80 Q84 90 92 76Z" fill="${C.red}" ${st()}/>`
   + `<path d="M42 84 L40 70 M58 84 L60 70" ${st(2.4)}/>`
   + `<ellipse cx="50" cy="96" rx="24" ry="14" fill="${C.red}" ${st()}/>`
   + `<circle cx="40" cy="68" r="5" fill="#fff" ${st(1.6)}/><circle cx="60" cy="68" r="5" fill="#fff" ${st(1.6)}/>`
   + (o.asleep ? `<path d="M37 68 L43 68 M57 68 L63 68" ${st(1.8)}/>` : `<circle class="blink" cx="40" cy="69" r="2" fill="${INK}"/><circle class="blink" cx="60" cy="69" r="2" fill="${INK}"/>`)
   + (o.mood==="happy" ? `<path d="M44 98 Q50 104 56 98" fill="none" ${st(2)}/>` : `<path d="M45 100 L55 100" ${st(2)}/>`) + zz(o);
}
function monster(o={}) {
  return shadow(50,22)
   + `<path d="M30 112 Q24 70 40 52 L44 36 L50 48 Q70 46 74 72 Q80 100 70 112Z" fill="#9a86bd" ${st()}/>`
   + `<circle cx="38" cy="90" r="3" fill="#7d68a3"/><circle cx="64" cy="98" r="4" fill="#7d68a3"/><circle cx="60" cy="84" r="2.4" fill="#7d68a3"/>`
   + `<path d="M28 84 Q18 86 20 96 M74 84 Q84 84 84 94" fill="none" ${st(3.5)}/>`
   + face(53, 68, .85, o) + `<path d="M48 80 L50 84 L52 80 M56 80 L58 84 L60 80" fill="#fff" ${st(1.3)}/>` + zz(o);
}

/* ---------- things ---------- */
const OBJ = {
  cake:()=>`${shadow(50,30)}<ellipse cx="50" cy="110" rx="34" ry="6" fill="#fff" ${st()}/><rect x="22" y="80" width="56" height="28" rx="4" fill="#d9a47a" ${st()}/><path d="M22 86 Q30 94 36 86 Q44 96 50 86 Q58 94 64 86 Q72 94 78 86 L78 82 L22 82Z" fill="#f4e6ef" ${st(2)}/><rect x="30" y="60" width="40" height="22" rx="4" fill="#e7b9c7" ${st()}/>${[38,50,62].map(x=>`<path d="M${x} 60 L${x} 50" ${st(4)} stroke="${C.yellow}"/><path d="M${x} 60 L${x} 50" ${st(1.2)} opacity=".4"/><path class="flame" d="M${x} 48 q-3 -5 0 -10 q3 5 0 10Z" fill="#f0a23a" ${st(1.4)}/>`).join("")}`,
  gift:()=>`${shadow(50,26)}<rect x="24" y="64" width="52" height="48" rx="3" fill="${C.red}" ${st()}/><rect x="20" y="56" width="60" height="12" rx="2" fill="#d36a52" ${st()}/><path d="M50 56 L50 112" ${st(7)} stroke="${C.yellow}"/><path d="M50 56 Q34 38 38 50 Q40 58 50 56 Q66 38 62 50 Q60 58 50 56Z" fill="${C.yellow}" ${st()}/>`,
  book:()=>`${shadow(50,30)}<path d="M50 74 Q34 66 16 70 L18 108 Q34 104 50 110 Q66 104 82 108 L84 70 Q66 66 50 74Z" fill="${C.blue}" ${st()}/><path d="M50 72 Q36 62 20 66 L20 102 Q36 98 50 106Z M50 72 Q64 62 80 66 L80 102 Q64 98 50 106Z" fill="${C.cream}" ${st()}/>${[74,80,86,92].map(y=>`<path d="M27 ${y} L44 ${y+2} M56 ${y+2} L73 ${y}" ${st(1.2)} opacity=".6"/>`).join("")}`,
  ball:()=>`${shadow(50,18)}<circle cx="50" cy="94" r="19" fill="#fbf6ea" ${st()}/><path d="M50 86 L57 91 L54 99 L46 99 L43 91Z" fill="${INK}"/><path d="M50 86 L50 76 M57 91 L67 87 M54 99 L60 108 M46 99 L40 108 M43 91 L33 87" ${st(1.6)}/>`,
  kite:()=>`<path d="M50 96 Q40 104 52 110 Q62 114 54 120" fill="none" ${st(1.6)}/><path d="M50 30 L72 60 L50 96 L28 60Z" fill="${C.red}" ${st()}/><path d="M50 30 L50 96 M28 60 L72 60" ${st(1.8)}/><path d="M44 104 l6 -3 l0 6Z M52 112 l6 -3 l0 6Z" fill="${C.yellow}" ${st(1.2)}/>`,
  tree:()=>`${shadow(50,26)}<path d="M44 114 L46 70 L54 70 L56 114Z" fill="${C.brown}" ${st()}/><path d="M50 84 L40 74" ${st(3)}/><path d="M20 62 Q10 46 24 38 Q24 18 44 20 Q54 6 68 18 Q88 18 84 38 Q96 50 82 64 Q74 76 58 70 Q46 80 34 72 Q22 74 20 62Z" fill="${C.green}" ${st()}/><path d="M34 46 q4 -4 8 0 M58 36 q4 -4 8 0 M62 56 q4 -4 8 0" fill="none" ${st(1.6)} opacity=".6"/>`,
  umbrella:()=>`<path d="M50 50 L50 104 Q50 112 42 110" fill="none" ${st(3)}/><path d="M14 52 Q16 18 50 16 Q84 18 86 52 Q80 46 74 52 Q68 46 62 52 Q56 46 50 52 Q44 46 38 52 Q32 46 26 52 Q20 46 14 52Z" fill="${C.red}" ${st()}/><path d="M50 16 L50 52 M50 16 Q36 30 38 52 M50 16 Q64 30 62 52" fill="none" ${st(1.4)} opacity=".6"/>`,
  sandcastle:()=>`${shadow(50,40)}<path d="M14 114 L14 76 L20 76 L20 70 L26 70 L26 76 L32 76 L32 114Z M68 114 L68 76 L74 76 L74 70 L80 70 L80 76 L86 76 L86 114Z" fill="${C.sand}" ${st()}/><path d="M30 114 L30 62 L38 62 L38 56 L46 56 L46 62 L54 62 L54 56 L62 56 L62 62 L70 62 L70 114Z" fill="#f0daa8" ${st()}/><path d="M42 114 L42 98 Q50 88 58 98 L58 114" fill="${INK}" opacity=".75"/><path d="M50 56 L50 34" ${st(2)}/><path d="M50 34 L64 39 L50 44Z" fill="${C.red}" ${st(1.6)}/>`,
  treasure:()=>`${shadow(50,32)}<rect x="20" y="78" width="60" height="34" rx="3" fill="#9a6a3c" ${st()}/><path d="M20 80 Q50 56 80 80Z" fill="#b07c48" ${st()}/><circle cx="34" cy="76" r="5" fill="${C.yellow}" ${st(1.6)}/><circle cx="46" cy="72" r="5" fill="${C.yellow}" ${st(1.6)}/><circle cx="58" cy="74" r="5" fill="${C.yellow}" ${st(1.6)}/><rect x="45" y="86" width="10" height="12" rx="2" fill="${C.yellow}" ${st(1.6)}/><path class="spark" d="M76 54 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2Z" fill="#fff6c8" ${st(1.4)}/>`,
  lamp:()=>`${shadow(50,16)}<ellipse cx="50" cy="111" rx="16" ry="5" fill="${C.brown}" ${st()}/><path d="M50 108 L50 66" ${st(3)}/><path d="M32 66 L40 36 L60 36 L68 66Z" fill="${C.yellow}" ${st()}/><path d="M24 74 L14 80 M76 74 L86 80 M50 74 L50 84" ${st(1.6)} opacity=".5"/>`,
  wave:()=>`<path d="M4 114 Q8 70 40 54 Q76 40 92 66 Q78 58 68 66 Q82 76 70 86 Q58 70 44 82 Q34 96 40 114Z" fill="#7fa9b7" ${st()}/><path d="M92 66 Q78 58 68 66 Q74 72 70 78" fill="#f4f1e6" ${st(1.8)}/><path d="M14 104 q6 -4 12 0 M24 92 q6 -4 12 0" fill="none" ${st(1.6)} opacity=".6"/>`,
  dream:()=>`<path d="M20 70 Q8 66 14 52 Q12 36 30 38 Q36 22 54 28 Q70 20 78 36 Q94 38 88 54 Q96 70 78 72 Q66 84 50 74 Q34 84 20 70Z" fill="#fbf7ee" ${st()}/><path d="M38 48 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z M62 44 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5Z" fill="${C.yellow}" ${st(1.2)}/><path d="M52 60 a6 6 0 1 0 6 -8 a5 5 0 1 1 -6 8Z" fill="${C.yellow}" ${st(1.2)}/><circle cx="16" cy="90" r="5" fill="#fbf7ee" ${st(1.6)}/><circle cx="10" cy="104" r="3" fill="#fbf7ee" ${st(1.6)}/>`,
  coffee:()=>`${shadow(50,16)}<path d="M34 62 L66 62 L62 112 L38 112Z" fill="#fbf7ee" ${st()}/><path d="M35 76 L65 76 L63 96 L37 96Z" fill="#b07c48" ${st(1.8)}/><rect x="30" y="54" width="40" height="10" rx="3" fill="#6b4a34" ${st()}/><path class="steam" d="M44 46 q-5 -8 0 -14 q5 -6 0 -12 M56 46 q-5 -8 0 -14" fill="none" ${st(1.6)} opacity=".6"/>`,
  phone:()=>`${shadow(50,14)}<rect x="32" y="38" width="36" height="72" rx="7" fill="#3b3a40" ${st()}/><rect x="36" y="46" width="28" height="54" rx="2" fill="#9fc3d0" ${st(1.4)}/><path d="M41 56 L58 56 M41 64 L54 64 M41 72 L57 72" ${st(1.4)} opacity=".5"/><circle cx="50" cy="104" r="2" fill="#fbf7ee"/>`,
  map:()=>`${shadow(50,32)}<path d="M14 60 L36 52 L64 60 L86 52 L86 104 L64 112 L36 104 L14 112Z" fill="#efe0b8" ${st()}/><path d="M36 52 L36 104 M64 60 L64 112" ${st(1.6)}/><path d="M20 90 Q34 70 50 84 Q62 94 78 72" fill="none" ${st(1.8)} stroke-dasharray="4 4"/><path d="M72 66 l8 8 M80 66 l-8 8" ${st(2.4)} stroke="${C.red}"/>`,
  bus:()=>`${shadow(50,46)}<rect x="4" y="48" width="92" height="56" rx="8" fill="${C.yellow}" ${st()}/><path d="M4 86 L96 86" ${st(2)}/>${[10,30,50].map(x=>`<rect x="${x}" y="56" width="16" height="18" rx="2" fill="#bfe0ec" ${st(1.8)}/>`).join("")}<rect x="72" y="56" width="18" height="30" rx="2" fill="#bfe0ec" ${st(1.8)}/><circle cx="24" cy="106" r="9" fill="${INK}"/><circle cx="76" cy="106" r="9" fill="${INK}"/><circle cx="24" cy="106" r="3" fill="${C.grey}"/><circle cx="76" cy="106" r="3" fill="${C.grey}"/>`,
  popcorn:()=>`${shadow(50,18)}${[[38,56],[50,50],[62,56],[44,46],[56,44]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="#fbf3d6" ${st(1.8)}/>`).join("")}<path d="M30 58 L70 58 L64 112 L36 112Z" fill="#fbf7ee" ${st()}/><path d="M38 58 L41 112 M50 58 L50 112 M62 58 L59 112" ${st(5)} stroke="${C.red}"/><path d="M30 58 L70 58 L64 112 L36 112Z" fill="none" ${st()}/>`,
  tv:()=>`${shadow(50,30)}<path d="M40 112 L46 98 M60 112 L54 98" ${st(3)}/><rect x="10" y="44" width="80" height="56" rx="5" fill="#3b3a40" ${st()}/><rect x="16" y="50" width="68" height="44" rx="2" fill="#8fb3bd" ${st(1.6)}/><path d="M22 86 L36 70 L46 80 L58 62 L78 86Z" fill="#7f9a5c" ${st(1.4)} opacity=".8"/>`,
  pizza:()=>`${shadow(50,32)}<rect x="12" y="98" width="76" height="12" rx="2" fill="#c9a274" ${st()}/><ellipse cx="50" cy="96" rx="36" ry="12" fill="#e6b45c" ${st()}/><ellipse cx="50" cy="95" rx="30" ry="9" fill="#d9623f" ${st(1.4)}/>${[[38,94],[54,92],[64,97],[46,99]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4" ry="2.2" fill="#9a2f22"/>`).join("")}<path d="M30 92 q4 2 8 0 M58 99 q4 2 8 0" fill="none" stroke="#fbf3d6" stroke-width="2.5" stroke-linecap="round"/>`,
  menu:()=>`${shadow(50,22)}<path d="M28 50 L50 56 L72 50 L72 110 L50 114 L28 110Z" fill="#7a3b2e" ${st()}/><path d="M50 56 L50 114" ${st(1.8)}/><text x="39" y="80" class="chalk" text-anchor="middle" style="font-size:9px">MENU</text><path d="M56 70 L67 68 M56 78 L67 76 M56 86 L64 85" stroke="#efe6d6" stroke-width="2" stroke-linecap="round"/>`,
  check:()=>`${shadow(50,24)}<rect x="24" y="100" width="52" height="10" rx="2" fill="#3b3a40" ${st()}/><path d="M34 100 L36 54 L66 52 L66 100Z" fill="#fbf7ee" ${st()}/><path d="M42 64 L60 63 M42 72 L58 71 M42 80 L60 79" ${st(1.4)} opacity=".6"/><path d="M42 90 L60 89" ${st(2.2)}/>`,
  burger:()=>`${shadow(50,28)}<ellipse cx="50" cy="106" rx="30" ry="6" fill="#fbf7ee" ${st()}/><path d="M24 98 Q50 106 76 98 L76 102 Q50 110 24 102Z" fill="#d9a066" ${st()}/><path d="M22 92 Q50 98 78 92 L78 97 Q50 103 22 97Z" fill="#7a4a2c" ${st()}/><path d="M20 88 Q30 92 36 88 Q44 93 50 88 Q58 93 64 88 Q72 92 80 88 L78 92 L22 92Z" fill="#8bb05a" ${st(1.6)}/><path d="M24 88 Q24 64 50 64 Q76 64 76 88Z" fill="#e3a650" ${st()}/><path d="M38 72 l2 1 M50 70 l2 1 M60 74 l2 1" ${st(1.6)}/>`,
  cart:()=>`${shadow(50,36)}<path d="M6 52 L16 52 L26 92 L80 92" fill="none" ${st(3)}/><path d="M18 60 L90 60 L82 86 L26 86Z" fill="#c9d3d6" ${st()}/><path d="M34 60 L36 86 M50 60 L50 86 M66 60 L64 86 M22 73 L86 73" ${st(1.4)} opacity=".7"/><circle cx="32" cy="104" r="7" fill="${INK}"/><circle cx="74" cy="104" r="7" fill="${INK}"/>`,
  milk:()=>`${shadow(50,16)}<path d="M34 62 L50 46 L66 62 L66 112 L34 112Z" fill="#fbf7ee" ${st()}/><path d="M34 62 L66 62" ${st(1.8)}/><rect x="38" y="76" width="24" height="18" rx="2" fill="#7fa9c9" ${st(1.4)}/><path d="M44 46 L44 40 L56 40 L56 46" fill="#7fa9c9" ${st(1.6)}/>`,
  bag:()=>`${shadow(50,24)}<path d="M26 60 L74 60 L78 112 L22 112Z" fill="#c9a274" ${st()}/><path d="M26 60 L30 54 L70 54 L74 60" fill="#b28c5c" ${st(1.8)}/><path d="M60 54 L66 26" ${st(7)} stroke="#e3bd78"/><path d="M60 54 L66 26" ${st(1.4)}/><circle cx="40" cy="50" r="7" fill="${C.red}" ${st(1.6)}/>`,
  suitcase:()=>`${shadow(50,26)}<path d="M40 58 L40 46 L60 46 L60 58" fill="none" ${st(3)}/><rect x="22" y="58" width="56" height="52" rx="6" fill="#5f7f98" ${st()}/><path d="M36 58 L36 110 M64 58 L64 110" ${st(2)}/><circle cx="30" cy="112" r="3" fill="${INK}"/><circle cx="70" cy="112" r="3" fill="${INK}"/>`,
  key:()=>`${shadow(50,16)}<rect x="30" y="74" width="40" height="28" rx="3" fill="#fbf7ee" ${st()}/><rect x="30" y="74" width="40" height="8" fill="${C.red}" ${st(1.6)}/><text x="50" y="96" text-anchor="middle" class="bang" style="font-size:10px">504</text>`,
  beer:()=>`${shadow(50,16)}<path d="M34 58 L62 58 L60 112 L36 112Z" fill="#e3a83a" ${st()}/><path d="M62 70 Q76 72 74 86 Q72 98 60 96" fill="none" ${st(3)}/><path d="M30 60 Q30 46 40 48 Q46 40 54 46 Q64 42 66 54 Q66 62 60 60Z" fill="#fbf7ee" ${st(1.8)}/><circle cx="44" cy="84" r="2" fill="#fbf3d6"/><circle cx="52" cy="96" r="1.6" fill="#fbf3d6"/>`,
  sandwich:()=>`${shadow(50,26)}<path d="M20 104 L50 72 L80 104Z" fill="#e8c98e" ${st()}/><path d="M24 98 L50 70 L76 98" fill="none" stroke="#8bb05a" stroke-width="5" stroke-linejoin="round"/><path d="M22 92 L50 62 L78 92 L72 96 L50 72 L28 96Z" fill="#e3a650" ${st(1.8)}/><path d="M18 88 L50 54 L82 88 L76 92 L50 64 L24 92Z" fill="#f0dcae" ${st()}/>`,
  note:()=>`${shadow(50,16)}<rect x="30" y="54" width="40" height="44" fill="#f5e27a" transform="rotate(-6 50 76)" ${st()}/><path d="M38 66 L62 63 M38 74 L60 72 M38 82 L56 80" ${st(1.6)} transform="rotate(-6 50 76)"/>`,
  wine:()=>`${shadow(50,12)}<path d="M38 50 L62 50 Q64 74 50 78 Q36 74 38 50Z" fill="#fbf7ee" ${st()}/><path d="M39 60 L61 60 Q60 74 50 76 Q40 74 39 60Z" fill="#8a2f3a"/><path d="M50 78 L50 106 M40 108 L60 108" ${st(2.4)}/>`,
  wind:()=>`<path d="M10 50 L60 50 Q76 50 74 36 Q70 26 60 32 M10 70 L80 70 Q94 70 92 84 Q88 94 78 88 M18 90 L52 90" fill="none" ${st(3)}/><path d="M66 58 q8 -6 14 2" fill="none" ${st(1.6)} opacity=".5"/>`,
  rain:()=>`<path d="M22 56 Q10 54 14 42 Q14 28 30 30 Q36 16 54 22 Q70 16 76 32 Q92 32 88 48 Q90 58 78 58Z" fill="#c9cdd0" ${st()}/>${[[28,68],[46,74],[64,66],[38,90],[58,92],[76,82]].map(([x,y])=>`<path d="M${x} ${y} q3 6 0 9 q-3 -3 0 -9Z" fill="#8fb3bd" ${st(1.4)}/>`).join("")}`,
  night:()=>`<path d="M58 22 A34 34 0 1 0 84 80 A28 28 0 1 1 58 22Z" fill="${C.yellow}" ${st()}/><path d="M22 30 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z M34 90 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5Z" fill="#fff6c8" ${st(1.2)}/>`,
  noise:()=>`<path d="M50 20 L58 42 L82 34 L68 54 L88 70 L62 70 L64 96 L48 76 L30 92 L34 68 L12 62 L32 50 L22 30 L42 40Z" fill="${C.yellow}" ${st()}/><text x="50" y="64" text-anchor="middle" class="bang">BANG</text>`
};

/* ---------- feelings (a face) and actions (a kid doing it) ---------- */
const bigFace = mood => `<circle cx="50" cy="60" r="38" fill="${C.skin}" ${st()}/>`
  + `<path d="M13 54 Q16 18 50 18 Q84 18 87 54 Q72 34 50 36 Q28 34 13 54Z" fill="${C.brown}" ${st()}/>`
  + face(50, 62, 1.7, {mood}) + (mood==="hungry" ? thought({}, OBJ.cake()).replace('translate(77 -2)','translate(74 -6)') : "")
  + (mood==="tired" ? `<text x="78" y="34" class="zzz">z</text>` : "")
  + (mood==="scared" ? `<path d="M86 40 q4 7 0 11 q-4 -4 0 -11Z" fill="#bfe0ec" ${st(1.4)}/>` : "");
const note = (x,y) => `<path d="M${x} ${y} L${x} ${y-14} L${x+8} ${y-17} L${x+8} ${y-3}" fill="none" ${st(1.8)}/><ellipse cx="${x-2}" cy="${y}" rx="3.2" ry="2.4" fill="${INK}"/><ellipse cx="${x+6}" cy="${y-3}" rx="3.2" ry="2.4" fill="${INK}"/>`;
const ACT = {
  eat:()=>person("kid",{armR:150,mouth:"open",handR:`<circle cx="66" cy="44" r="7" fill="${C.red}" ${st(1.8)}/><path d="M66 37 l2 -4" ${st(1.6)}/>`}),
  sleep:()=>`<path d="M4 104 L96 104" ${st(2)}/><rect x="4" y="96" width="92" height="8" rx="3" fill="#7f9ec0" ${st(2)}/><g transform="translate(0 4) rotate(-90 50 65)">${person("kid",{asleep:true,noShadow:true}).replace(/<text[^>]*>z<\/text>/g,"")}</g><text x="74" y="30" class="zzz">z</text><text x="84" y="16" class="zzz small">z</text>`,
  jump:()=>`<g transform="translate(0 -14)">${person("kid",{armL:160,armR:160,legs:"jump",mood:"happy",noShadow:true})}</g>${shadow(50,14)}<path d="M30 112 L36 108 M70 112 L64 108" ${st(1.6)}/>`,
  run:()=>person("kid",{armL:-40,armR:50,legs:"run",mood:"happy"})+`<path d="M8 70 L22 70 M4 82 L18 82 M10 94 L24 94" ${st(2)} opacity=".6"/>`,
  sing:()=>person("kid",{armL:60,armR:60,mouth:"open"})+note(80,32)+note(14,24),
  hide:()=>`${person("kid",{mood:"scared"})}<path d="M6 114 L6 66 Q50 58 94 66 L94 114Z" fill="#b28a5c" ${st()}/><path d="M6 80 L94 80 M6 96 L94 96 M30 66 L30 114 M64 64 L64 114" ${st(1.4)} opacity=".5"/>`,
  bake:()=>person("kid",{armL:40,armR:40,mood:"happy",handL:"",handR:""})+`<path d="M28 82 Q50 100 72 82Z" fill="${C.cream}" ${st()}/><path d="M60 70 L72 52" ${st(2)}/><path d="M70 50 q6 -6 10 2 q-4 6 -10 -2Z" fill="none" ${st(1.6)}/><path d="M38 80 q4 -6 8 0 q4 -6 8 0" fill="#e7b9c7" ${st(1.4)}/>`,
  hug:()=>`<g transform="translate(-16 0)">${person("kid",{armR:80,mood:"happy"})}</g><g transform="translate(16 0)">${person("girl",{armL:80,mood:"happy"})}</g><path d="M50 12 C44 2 32 10 50 24 C68 10 56 2 50 12Z" fill="${C.red}" ${st(1.6)}/>`,
  read:()=>person("kid",{armL:50,armR:50})+`<g transform="translate(0 -12) scale(1)">${OBJ.book().replace(/<ellipse cx="50" cy="115"[^>]*\/>/,"")}</g>`,
  play:()=>person("kid",{armL:40,armR:30,legs:"kick",mood:"happy"})+`<g transform="translate(34 6) scale(.6)">${OBJ.ball()}</g>`,
  fly:()=>`<g transform="translate(0 -20)">${bird({flying:true,mood:"happy"}).replace(/<ellipse cx="50" cy="115"[^>]*\/>/,"")}</g><path d="M70 30 q10 -8 20 0 M8 46 q8 -6 16 0" fill="none" ${st(1.8)} opacity=".6"/>`,
  climb:()=>`<path d="M30 4 L30 116 M70 4 L70 116 M30 24 L70 24 M30 48 L70 48 M30 72 L70 72 M30 96 L70 96" ${st(3)} stroke="${C.brown}"/><g transform="translate(0 -16) scale(.92)">${person("kid",{armL:170,armR:150,legs:"jump",noShadow:true})}</g>`,
  swim:()=>`<g transform="translate(0 30)">${person("kid",{armL:150,armR:-10,mood:"happy",noShadow:true})}</g><path d="M0 96 Q12 88 24 96 T48 96 T72 96 T96 96 L100 120 L0 120Z" fill="#8fb3bd" ${st()}/>`,
  build:()=>`${shadow(50,30)}${[[20,96],[50,96],[35,78],[65,78],[50,60]].map(([x,y])=>`<rect x="${x-14}" y="${y}" width="28" height="16" rx="2" fill="${C.red}" ${st()}/>`).join("")}<path d="M74 40 L90 24" ${st(4)} stroke="${C.brown}"/><rect x="84" y="14" width="14" height="10" rx="2" transform="rotate(-45 91 19)" fill="${C.grey}" ${st(1.8)}/>`,
  dig:()=>`${shadow(50,34)}<path d="M10 114 Q30 86 50 92 Q72 84 90 114Z" fill="${C.sand}" ${st()}/><path d="M58 30 L46 84" ${st(4)} stroke="${C.brown}"/><path d="M38 80 L54 84 L48 104 Q38 102 38 80Z" fill="${C.grey}" ${st()}/><circle cx="72" cy="78" r="3" fill="${C.sand}" ${st(1.2)}/><circle cx="80" cy="70" r="2.4" fill="${C.sand}" ${st(1.2)}/>`,
  walk:()=>person("kid",{pose:"walk"})+`<path d="M6 74 L18 74 M2 86 L14 86" ${st(2)} opacity=".5"/>`,
  dance:()=>person("kid",{pose:"dance",mood:"happy"})+note(82,30)+note(12,40),
  laugh:()=>person("kid",{pose:"laugh"}),
  left:()=>`<path d="M50 112 L50 40" ${st(4)} stroke="${C.brown}"/><path d="M14 44 L30 26 L84 26 L84 62 L30 62Z" fill="${C.cream}" ${st()}/><path d="M66 44 L36 44 M44 36 L36 44 L44 52" fill="none" ${st(3)}/>`,
  right:()=>`<path d="M50 112 L50 40" ${st(4)} stroke="${C.brown}"/><path d="M86 44 L70 26 L16 26 L16 62 L70 62Z" fill="${C.cream}" ${st()}/><path d="M34 44 L64 44 M56 36 L64 44 L56 52" fill="none" ${st(3)}/>`,
  pinch:()=>`<path d="M60 30 L84 20 Q94 30 84 40 L70 44" fill="${C.skin}" ${st()}/><path d="M8 70 Q14 44 40 52 L30 64 L44 72 Q26 92 8 70Z" fill="${C.red}" ${st()}/><path d="M48 46 L56 36 M50 56 L60 54 M44 38 L46 28" ${st(2)}/>`
};

/* ---------- places: small card picture + panel background ---------- */
const SCENES = {
  kitchen:`<rect width="400" height="240" fill="#efdcb8"/>${Array.from({length:14},(_,i)=>`<path d="M${i*30+10} 0 L${i*30+10} 176" stroke="#e2c99c" stroke-width="10"/>`).join("")}
    <rect x="34" y="34" width="86" height="70" rx="3" fill="#cfe0dc" ${st()}/><path d="M77 34 L77 104 M34 69 L120 69" ${st()}/><path d="M28 30 Q60 50 30 110 M126 30 Q94 50 124 110" fill="#d98c6c" ${st(2)} opacity=".95"/>
    <rect x="0" y="176" width="400" height="64" fill="#c99e6c"/><path d="M0 176 L400 176" ${st()}/>${[40,120,200,280,360].map(x=>`<path d="M${x} 176 L${x-10} 240" ${st(1.4)} opacity=".4"/>`).join("")}
    <rect x="214" y="160" width="160" height="12" rx="2" fill="#e9e1cf" ${st()}/><path d="M214 172 Q224 182 234 172 Q244 182 254 172 Q264 182 274 172 Q284 182 294 172 Q304 182 314 172 Q324 182 334 172 Q344 182 354 172 Q364 182 374 172" fill="#e9e1cf" ${st(2)}/><path d="M228 176 L228 232 M360 176 L360 232" ${st(5)} stroke="${C.brown}"/>
    <path d="M150 60 L196 60 L196 120 L150 120Z" fill="${C.cream}" ${st()}/><path d="M156 66 L190 66 M156 76 L182 76 M156 86 L188 86" ${st(1.4)} opacity=".5"/>`,
  park:`<rect width="400" height="240" fill="#d9e4dc"/><path d="M0 150 Q80 110 170 140 Q260 104 400 146 L400 240 L0 240Z" fill="#a9b97e" ${st()}/><path d="M0 186 Q120 160 230 184 Q320 166 400 182 L400 240 L0 240Z" fill="#93a86a" ${st()}/>
    <path d="M130 240 Q170 200 240 186 Q262 182 270 190 Q220 210 210 240Z" fill="#e3cf9f" ${st(2)}/>
    <path d="M40 44 Q36 28 54 28 Q60 14 78 22 Q96 20 94 36 Q104 46 88 50 L46 50 Q34 50 40 44Z" fill="#fbf7ee" ${st(2)}/><path d="M220 30 Q216 16 232 18 Q240 6 256 14 Q272 12 270 26 Q280 34 266 38 L226 38 Q214 38 220 30Z" fill="#fbf7ee" ${st(2)}/>
    <path d="M300 168 L300 150 L356 150 L356 168 M296 168 L360 168 M304 168 L304 184 M352 168 L352 184 M300 142 L356 142" fill="none" ${st(3)} stroke="${C.brown}"/>
    ${[[30,200],[70,214],[110,196]].map(([x,y])=>`<path d="M${x} ${y} l-4 -8 M${x} ${y} l4 -8 M${x} ${y} l0 -9" ${st(1.4)}/>`).join("")}`,
  beach:`<rect width="400" height="240" fill="#e4e4d6"/><circle cx="330" cy="48" r="22" fill="${C.yellow}" ${st()}/>${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<path d="M${330+Math.cos(a)*30} ${48+Math.sin(a)*30} L${330+Math.cos(a)*40} ${48+Math.sin(a)*40}" ${st(2)}/>`}).join("")}
    <rect x="0" y="108" width="400" height="56" fill="#8fb3bd"/><path d="M0 108 L400 108" ${st()}/>${[30,110,190,270,350].map(x=>`<path d="M${x} 126 q8 -6 16 0 M${x+40} 144 q8 -6 16 0" fill="none" ${st(1.6)} opacity=".6"/>`).join("")}
    <path d="M120 90 L150 90 L144 100 L126 100Z M135 90 L135 64 L150 84Z" fill="#fbf7ee" ${st(2)}/>
    <path d="M0 160 Q100 148 200 158 Q300 148 400 158 L400 240 L0 240Z" fill="#ead39f" ${st()}/>${[[60,200],[150,222],[260,206],[340,226]].map(([x,y])=>`<path d="M${x} ${y} q3 -3 6 0" fill="none" ${st(1.4)} opacity=".5"/>`).join("")}`,
  bedroom:`<rect width="400" height="240" fill="#cbc1dc"/>${Array.from({length:10},(_,i)=>`<circle cx="${i*44+20}" cy="${(i%2)*40+40}" r="3" fill="#b8acd0"/>`).join("")}
    <rect x="250" y="30" width="96" height="80" rx="3" fill="#3f4a6e" ${st()}/><path d="M298 30 L298 110 M250 70 L346 70" ${st()}/><path d="M318 46 a10 10 0 1 0 10 14 a8 8 0 1 1 -10 -14Z" fill="${C.yellow}" ${st(1.4)}/>
    <path d="M244 26 Q262 70 240 116 M352 26 Q334 70 356 116" fill="#9a7fb0" ${st(2)}/>
    <rect x="0" y="182" width="400" height="58" fill="#a98b6c"/><path d="M0 182 L400 182" ${st()}/>
    <path d="M10 196 L10 120 Q10 108 22 108 L40 108 Q52 108 52 120 L52 150 L190 150 L190 196" fill="#e9dfc9" ${st()}/><path d="M52 150 L190 150 L190 170 L52 170Z" fill="#7f9ec0" ${st(2)}/><rect x="20" y="132" width="36" height="16" rx="7" fill="#fbf7ee" ${st(2)}/>
    <rect x="206" y="150" width="34" height="34" fill="${C.brown}" ${st(2)}/>`
};
SCENES.cafe = `<rect width="400" height="240" fill="#e9d7b8"/>${Array.from({length:9},(_,i)=>`<path d="M0 ${i*22+6} L400 ${i*22+6}" stroke="#dcc6a0" stroke-width="2"/>`).join("")}
  <rect x="30" y="30" width="110" height="78" rx="3" fill="#3d4a40" ${st()}/><path d="M42 48 L96 48 M42 62 L120 62 M42 76 L108 76 M42 90 L90 90" stroke="#efe6d6" stroke-width="2.4" stroke-linecap="round" opacity=".85"/><text x="86" y="44" class="chalk" text-anchor="middle">MENU</text>
  ${[190,300].map(x=>`<path d="M${x} 0 L${x} 30" ${st(1.6)}/><path d="M${x-16} 44 Q${x} 22 ${x+16} 44Z" fill="${C.yellow}" ${st(2)}/>`).join("")}
  <rect x="0" y="176" width="400" height="64" fill="#a98463"/><path d="M0 176 L400 176" ${st()}/>
  <rect x="214" y="160" width="186" height="80" fill="#8a5f40" ${st()}/><rect x="208" y="152" width="192" height="12" rx="2" fill="#d9c2a0" ${st()}/>
  <rect x="330" y="112" width="44" height="40" rx="4" fill="#9aa0a6" ${st()}/><path d="M344 152 L344 140 M360 152 L360 140" ${st(2)}/>`;
SCENES.city = `<rect width="400" height="240" fill="#dfe3dc"/>
  ${[[10,60,60,"#c7b79c"],[74,30,54,"#b5a58b"],[132,80,70,"#cbbda2"],[206,40,58,"#b9aa8f"],[268,70,64,"#c7b79c"],[336,24,64,"#b0a088"]].map(([x,y,w,c])=>`<rect x="${x}" y="${y}" width="${w}" height="${190-y}" fill="${c}" ${st()}/>${Array.from({length:Math.floor((150-y)/24)},(_,r)=>`<rect x="${x+10}" y="${y+12+r*24}" width="12" height="12" fill="#efe3c6" ${st(1.4)}/><rect x="${x+w-22}" y="${y+12+r*24}" width="12" height="12" fill="#efe3c6" ${st(1.4)}/>`).join("")}`).join("")}
  <rect x="0" y="186" width="400" height="54" fill="#a7a29a"/><path d="M0 186 L400 186 M0 204 L400 204" ${st()}/>${[30,110,190,270,350].map(x=>`<path d="M${x} 222 L${x+36} 222" stroke="#efe6d6" stroke-width="4"/>`).join("")}
  <path d="M190 186 L190 120" ${st(3)}/><rect x="182" y="96" width="16" height="30" rx="3" fill="#3b3a40" ${st(2)}/><circle cx="190" cy="104" r="3.5" fill="${C.red}"/><circle cx="190" cy="117" r="3.5" fill="#7f9a5c"/>`;
SCENES.livingroom = `<rect width="400" height="240" fill="#c9d1bd"/>${Array.from({length:13},(_,i)=>`<path d="M${i*32+12} 0 L${i*32+12} 180" stroke="#bcc6ae" stroke-width="6"/>`).join("")}
  <rect x="220" y="34" width="80" height="70" rx="3" fill="#2f3a55" ${st()}/><path d="M260 34 L260 104 M220 69 L300 69" ${st()}/><circle cx="240" cy="50" r="2" fill="#fff"/><circle cx="284" cy="86" r="1.6" fill="#fff"/>
  <rect x="0" y="180" width="400" height="60" fill="#9c7b5c"/><path d="M0 180 L400 180" ${st()}/><ellipse cx="160" cy="214" rx="120" ry="14" fill="#c4673f" opacity=".55" ${st(1.6)}/>
  <path d="M20 182 L20 126 Q20 112 34 112 L176 112 Q190 112 190 126 L190 182Z" fill="#7a64a6" ${st()}/><rect x="10" y="140" width="24" height="44" rx="8" fill="#6c5797" ${st()}/><rect x="176" y="140" width="24" height="44" rx="8" fill="#6c5797" ${st()}/><path d="M36 150 L174 150" ${st(1.6)} opacity=".5"/><rect x="40" y="122" width="34" height="22" rx="8" fill="${C.yellow}" ${st(2)}/>`;
SCENES.party = `<rect width="400" height="240" fill="#d9c8de"/>
  <path d="M0 30 Q100 60 200 30 Q300 60 400 30" fill="none" ${st(1.6)}/>${Array.from({length:12},(_,i)=>{const x=i*34+14;const y=30+Math.sin((x/400)*Math.PI*2)*-12+12;return `<path d="M${x-8} ${y} L${x+8} ${y} L${x} ${y+16}Z" fill="${[C.red,C.yellow,"#5f9284","#7a64a6"][i%4]}" ${st(1.6)}/>`}).join("")}
  ${[[40,100,C.red],[64,90,C.yellow],[350,96,"#5f9284"]].map(([x,y,c])=>`<path d="M${x} ${y+22} Q${x+4} ${y+50} ${x-4} ${y+80}" fill="none" ${st(1.4)}/><ellipse cx="${x}" cy="${y}" rx="14" ry="18" fill="${c}" ${st(2)}/>`).join("")}
  <rect x="0" y="182" width="400" height="58" fill="#8d6f8f"/><path d="M0 182 L400 182" ${st()}/>
  <rect x="250" y="150" width="120" height="10" rx="2" fill="#efe6d6" ${st(2)}/><path d="M262 160 L262 196 M358 160 L358 196" ${st(4)} stroke="${C.brown}"/>${[270,300,330].map(x=>`<path d="M${x} 150 L${x+10} 130 L${x+20} 150Z" fill="#e6b45c" ${st(1.6)}/>`).join("")}`;
SCENES.apartment = SCENES.bedroom.replace('fill="#3f4a6e"','fill="#bfe0ec"').replace(/<path d="M318 46 a10[^>]*\/>/, `<circle cx="322" cy="52" r="10" fill="${C.yellow}" ${st(1.6)}/>`).replace('<rect x="206" y="150" width="34" height="34" fill="${C.brown}" ${st(2)}/>','')
  + `<rect x="206" y="150" width="34" height="34" fill="${C.brown}" ${st(2)}/><circle cx="223" cy="136" r="12" fill="#fbf7ee" ${st(2)}/><path d="M223 136 L223 129 M223 136 L228 138" ${st(1.6)}/><path d="M212 126 l-4 -4 M234 126 l4 -4" ${st(2)}/>`;
SCENES.restaurant = `<rect width="400" height="240" fill="#a8564a"/>${Array.from({length:10},(_,i)=>`<path d="M${i*42+20} 0 L${i*42+20} 176" stroke="#9a4b40" stroke-width="14"/>`).join("")}
  ${[[40,40],[120,56]].map(([x,y])=>`<rect x="${x}" y="${y}" width="56" height="42" fill="#e9dcbc" ${st()}/><path d="M${x+8} ${y+34} L${x+22} ${y+18} L${x+34} ${y+28} L${x+48} ${y+12}" fill="none" ${st(1.6)}/>`).join("")}
  ${[230,330].map(x=>`<path d="M${x} 0 L${x} 24" ${st(1.6)}/><path d="M${x-14} 38 Q${x} 18 ${x+14} 38Z" fill="${C.yellow}" ${st(2)}/>`).join("")}
  <rect x="0" y="176" width="400" height="64" fill="#6b4630"/><path d="M0 176 L400 176" ${st()}/>
  <rect x="190" y="160" width="190" height="12" rx="2" fill="#fbf7ee" ${st()}/><path d="M190 172 L196 196 L374 196 L380 172" fill="#fbf7ee" ${st(2)}/><path d="M210 196 L210 236 M360 196 L360 236" ${st(5)} stroke="${C.dark}"/><path d="M284 160 L284 146" ${st(3)} stroke="#fbf7ee"/><path class="flame" d="M284 144 q-3 -5 0 -10 q3 5 0 10Z" fill="#f0a23a" ${st(1.4)}/>`;
SCENES.supermarket = `<rect width="400" height="240" fill="#e8ece4"/><rect x="0" y="0" width="400" height="16" fill="#7f9a5c" ${st()}/>
  ${[[10,"#c4673f"],[150,"#5f7f98"]].map(([x,c])=>`<rect x="${x}" y="40" width="130" height="140" fill="#d9d2c2" ${st()}/>${[60,100,140].map(y=>`<path d="M${x} ${y+20} L${x+130} ${y+20}" ${st(2)}/>${Array.from({length:6},(_,k)=>`<rect x="${x+6+k*20}" y="${y-8}" width="14" height="${20+(k%2)*4}" rx="2" transform="translate(0 ${-((k%2)*4)})" fill="${[c,C.yellow,"#f4ead6","#7f9a5c"][(k+Math.round(y/40))%4]}" ${st(1.4)}/>`).join("")}`).join("")}`).join("")}
  <rect x="96" y="22" width="76" height="16" rx="2" fill="${C.yellow}" ${st(1.8)}/><text x="134" y="34" text-anchor="middle" class="bang" style="font-size:11px">AISLE 5</text>
  <rect x="0" y="180" width="400" height="60" fill="#d8d4c8"/><path d="M0 180 L400 180" ${st()}/>${Array.from({length:10},(_,i)=>`<path d="M${i*44} 180 L${i*44-14} 240" ${st(1.2)} opacity=".35"/>`).join("")}
  <rect x="300" y="128" width="96" height="58" fill="#5f9284" ${st()}/><rect x="292" y="122" width="108" height="10" rx="2" fill="#efe6d6" ${st()}/><rect x="344" y="98" width="34" height="24" rx="3" fill="#3b3a40" ${st()}/>`;
SCENES.clinic = `<rect width="400" height="240" fill="#d6e6e2"/><rect x="0" y="120" width="400" height="60" fill="#c3d9d4"/><path d="M0 120 L400 120" ${st(2)}/>
  <rect x="40" y="30" width="44" height="62" fill="#fbf7ee" ${st()}/>${["E","F P","T O Z","L P E D"].map((t,i)=>`<text x="62" y="${46+i*12}" text-anchor="middle" style="font:700 ${12-i*2}px sans-serif;fill:${INK}">${t}</text>`).join("")}
  <rect x="120" y="36" width="50" height="40" fill="#fbf7ee" ${st()}/><path d="M145 66 C130 52 136 42 145 50 C154 42 160 52 145 66Z" fill="${C.red}" ${st(1.6)}/>
  <rect x="0" y="180" width="400" height="60" fill="#b9c4c2"/><path d="M0 180 L400 180" ${st()}/>
  <rect x="200" y="140" width="150" height="20" rx="4" fill="#fbf7ee" ${st()}/><rect x="200" y="128" width="40" height="14" rx="6" fill="#fbf7ee" ${st(2)}/><path d="M210 160 L210 196 M340 160 L340 196" ${st(4)} stroke="#8d8a80"/>
  <rect x="360" y="70" width="36" height="110" fill="#efe6d6" ${st()}/><path d="M360 110 L396 110" ${st(1.6)}/>`;
SCENES.hotel = `<rect width="400" height="240" fill="#e5d4b0"/>${Array.from({length:8},(_,i)=>`<path d="M${i*54} 0 L${i*54} 176" stroke="#d9c49a" stroke-width="3"/>`).join("")}
  <rect x="240" y="30" width="120" height="60" fill="#8a5f40" ${st()}/>${Array.from({length:10},(_,i)=>`<circle cx="${254+(i%5)*22}" cy="${48+Math.floor(i/5)*22}" r="4" fill="${C.yellow}" ${st(1.2)}/>`).join("")}
  <path d="M30 176 L40 130 L64 130 L74 176Z" fill="#b07c48" ${st()}/><path d="M52 130 Q30 96 40 70 Q50 90 52 100 Q56 74 74 66 Q64 96 52 130" fill="#7f9a5c" ${st(2)}/>
  <rect x="0" y="176" width="400" height="64" fill="#7a3b4a"/><path d="M0 176 L400 176" ${st()}/><path d="M0 200 L400 200" stroke="#e3bd58" stroke-width="2" opacity=".5"/>
  <rect x="210" y="160" width="190" height="80" fill="#5c3b28" ${st()}/><rect x="204" y="152" width="196" height="12" rx="2" fill="#d9c2a0" ${st()}/><path d="M240 150 Q248 138 256 150Z" fill="${C.yellow}" ${st(1.6)}/><circle cx="248" cy="137" r="2" fill="${C.yellow}" ${st(1.2)}/>`;
SCENES.office = `<rect width="400" height="240" fill="#dfe0d8"/>
  <rect x="40" y="30" width="140" height="90" fill="#bfd6e0" ${st()}/><path d="M110 30 L110 120 M40 75 L180 75" ${st()}/>${[[52,92,20,28],[78,84,18,36],[124,88,22,32],[150,80,18,40]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#9fb3bd" ${st(1.4)}/>`).join("")}
  <path d="M330 176 L336 140 L354 140 L360 176Z" fill="#b07c48" ${st()}/><path d="M345 140 Q326 110 334 90 Q344 106 345 116 Q350 92 366 86 Q356 112 345 140" fill="#7f9a5c" ${st(2)}/>
  <rect x="0" y="180" width="400" height="60" fill="#a7a29a"/><path d="M0 180 L400 180" ${st()}/>
  <rect x="200" y="160" width="160" height="12" rx="2" fill="#b07c48" ${st()}/><path d="M212 172 L212 228 M348 172 L348 228" ${st(5)} stroke="${C.brown}"/><rect x="236" y="130" width="44" height="30" rx="2" fill="#3b3a40" ${st()}/><path d="M228 160 L288 160" ${st(3)}/>`;
SCENES.bar = `<rect width="400" height="240" fill="#3d2f2a"/>${Array.from({length:3},(_,r)=>`<path d="M200 ${50+r*36} L400 ${50+r*36}" ${st(3)} stroke="#8a5f40"/>${Array.from({length:7},(_,k)=>`<path d="M${214+k*26} ${50+r*36} L${214+k*26} ${34+r*36} Q${214+k*26} ${26+r*36} ${218+k*26} ${24+r*36} L${218+k*26} ${18+r*36} L${222+k*26} ${18+r*36} L${222+k*26} ${24+r*36} Q${226+k*26} ${26+r*36} ${226+k*26} ${34+r*36} L${226+k*26} ${50+r*36}Z" fill="${["#7f9a5c","#c4673f","#e3bd58","#9fc3d0"][(k+r)%4]}" ${st(1.4)}/>`).join("")}`).join("")}
  <rect x="40" y="40" width="100" height="40" rx="8" fill="none" stroke="#f0a23a" stroke-width="3"/><text x="90" y="68" text-anchor="middle" style="font:700 20px sans-serif;fill:#f0a23a">OPEN</text>
  ${[120,170].map(x=>`<path d="M${x} 0 L${x} 100" ${st(1.6)} stroke="#c9b89b"/><circle cx="${x}" cy="106" r="7" fill="#f0c45a" ${st(1.6)}/>`).join("")}
  <rect x="0" y="176" width="400" height="64" fill="#2a201b"/><path d="M0 176 L400 176" ${st()}/>
  <rect x="196" y="160" width="204" height="80" fill="#6b4630" ${st()}/><rect x="188" y="152" width="212" height="12" rx="2" fill="#a5774f" ${st()}/>`;
SCENES.home = SCENES.kitchen.replace('<path d="M150 60 L196 60 L196 120 L150 120Z"','<rect x="140" y="56" width="60" height="120" rx="4" fill="#e9eef0" stroke="#4a3426" stroke-width="2.4"/><path d="M140 100 L200 100 M192 70 L192 88 M192 108 L192 130" stroke="#4a3426" stroke-width="2.4" stroke-linecap="round"/><path d="M0 0 L0 0Z"');
SCENES.hallway = `<rect width="400" height="240" fill="#d9cfb8"/><rect x="0" y="0" width="400" height="20" fill="#c9bea4"/>
  ${[30,170,310].map((x,i)=>`<rect x="${x}" y="62" width="64" height="118" rx="2" fill="${["#7a5236","#5f7f98","#7a5236"][i]}" ${st()}/><circle cx="${x+52}" cy="124" r="3.5" fill="${C.yellow}" ${st(1.4)}/><rect x="${x+20}" y="44" width="24" height="14" rx="2" fill="#fbf7ee" ${st(1.6)}/><text x="${x+32}" y="55" text-anchor="middle" style="font:700 10px sans-serif;fill:${INK}">${["3A","3B","3C"][i]}</text>`).join("")}
  ${[120,260].map(x=>`<path d="M${x-10} 70 L${x+10} 70 L${x+6} 84 L${x-6} 84Z" fill="${C.yellow}" ${st(1.8)}/>`).join("")}
  <rect x="0" y="180" width="400" height="60" fill="#8a6a50"/><path d="M0 180 L400 180" ${st()}/><rect x="166" y="182" width="72" height="12" rx="2" fill="#a5774f" ${st(1.6)}/>`;
SCENES.diningroom = `<rect width="400" height="240" fill="#c7d3b5"/>${Array.from({length:12},(_,i)=>`<path d="M${i*36+10} 0 L${i*36+10} 176" stroke="#b9c6a5" stroke-width="3"/><circle cx="${i*36+28}" cy="${(i%2)*50+40}" r="3" fill="#a9b893"/>`).join("")}
  <path d="M200 0 L200 20" ${st(1.6)}/><path d="M176 20 L224 20 L214 36 L186 36Z" fill="${C.yellow}" ${st(2)}/>
  ${[[40,50],[310,44]].map(([x,y])=>`<rect x="${x}" y="${y}" width="50" height="60" fill="#e9dcbc" ${st()}/><circle cx="${x+25}" cy="${y+24}" r="10" fill="#c9a274" ${st(1.4)}/><path d="M${x+12} ${y+52} Q${x+25} ${y+36} ${x+38} ${y+52}" fill="#c9a274" ${st(1.4)}/>`).join("")}
  <rect x="0" y="178" width="400" height="62" fill="#8a5f40"/><path d="M0 178 L400 178" ${st()}/>
  <rect x="60" y="160" width="290" height="12" rx="2" fill="#fbf7ee" ${st()}/><path d="M60 172 Q70 182 80 172 L80 190 L330 190 L330 172 Q340 182 350 172" fill="#fbf7ee" ${st(2)}/>${[110,180,250,300].map((x,i)=>`<ellipse cx="${x}" cy="160" rx="16" ry="4" fill="#fff" ${st(1.4)}/>`).join("")}<path d="M200 160 Q200 140 214 140 Q228 140 228 160Z" fill="#c4673f" ${st(1.6)}/>`;
SCENES.breakroom = `<rect width="400" height="240" fill="#e2e4dc"/>
  <rect x="30" y="30" width="90" height="70" fill="#c9a274" ${st()}/>${[[40,40,"#f5e27a"],[70,46,"#bfe0ec"],[92,38,"#f1c2b5"],[48,68,"#cfe3b0"],[80,70,"#f5e27a"]].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="20" height="20" fill="${c}" ${st(1.2)}/>`).join("")}
  <rect x="150" y="40" width="56" height="140" rx="4" fill="#efeee8" ${st()}/><path d="M150 96 L206 96 M198 56 L198 80 M198 106 L198 140" ${st(2)}/>
  <rect x="0" y="180" width="400" height="60" fill="#b7b3a8"/><path d="M0 180 L400 180" ${st()}/>
  <rect x="230" y="160" width="170" height="80" fill="#8d8a80" ${st()}/><rect x="224" y="152" width="176" height="12" rx="2" fill="#d9d2c2" ${st()}/><rect x="340" y="104" width="40" height="48" rx="4" fill="#3b3a40" ${st()}/><rect x="350" y="114" width="20" height="10" rx="2" fill="#9fc3d0"/>`;
SCENES.theater = `<rect width="400" height="240" fill="#2e2230"/>
  <path d="M0 0 L60 0 Q50 90 70 180 L0 180Z M400 0 L340 0 Q350 90 330 180 L400 180Z" fill="#8a2f3a" ${st()}/><path d="M20 0 Q14 90 26 180 M380 0 Q386 90 374 180" ${st(1.4)} opacity=".5"/>
  <rect x="90" y="20" width="220" height="110" fill="#e8eef0" ${st()}/><path d="M120 110 L160 70 L190 96 L230 56 L280 110Z" fill="#c9d3d6" opacity=".7"/>
  <rect x="0" y="176" width="400" height="64" fill="#3b2a30"/><path d="M0 176 L400 176" ${st()}/>${Array.from({length:9},(_,i)=>`<path d="M${i*46} 240 L${i*46} 206 Q${i*46+21} 196 ${i*46+42} 206 L${i*46+42} 240Z" fill="#7a2f3a" ${st(1.8)}/>`).join("")}`;
const scene = p => `<svg class="bg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g filter="url(#wobS)">${SCENES[p]}</g></svg>`;
const placeIcon = p => `<svg class="drw" viewBox="40 0 320 240" aria-hidden="true"><g filter="url(#wobS)">${SCENES[p]}</g></svg>`;

/* ---------- entry point ---------- */
const PEOPLE = {grandma:1, mom:1, boy:1, girl:1, you:1, friend:1, barista:1, stranger:1, guest:1, boss:1, roommate:1, neighbor:1, partner:1, dad:1, coworker:1, date:1, waiter:1, cashier:1, doctor:1, receptionist:1, manager:1, bartender:1};
const ANIMALS = {dog, cat, bird, crab, monster};
function art(w, o={}) {
  if (SCENES[w]) return placeIcon(w);
  if (PEOPLE[w]) return svgWrap(person(w, o) + (o.mood==="hungry" ? thought(o, OBJ.cake()) : ""));
  if (ANIMALS[w]) return svgWrap(ANIMALS[w]({...o, mouth: (o.pose==="eat"||o.pose==="sing"||o.pose==="laugh") ? "open" : o.mouth}));
  if (OBJ[w]) return svgWrap(OBJ[w]());
  if (ACT[w]) return svgWrap(ACT[w]());
  if (["happy","sad","hungry","tired","scared"].includes(w)) return svgWrap(bigFace(w), "0 0 100 110");
  return "";
}

/* ---------- little ink particles ---------- */
const PART = {
  heart:`<path d="M10 6 C7 0 0 3 10 13 C20 3 13 0 10 6Z" fill="${C.red}" ${st(1.4)}/>`,
  note:`<path d="M8 15 L8 3 L15 1 L15 12" fill="none" ${st(1.6)}/><ellipse cx="6" cy="15" rx="3" ry="2.2" fill="${INK}"/><ellipse cx="13" cy="12" rx="3" ry="2.2" fill="${INK}"/>`,
  crumb:`<circle cx="10" cy="10" r="3.4" fill="#d9a47a" ${st(1.2)}/>`,
  drop:`<path d="M10 3 q5 8 0 12 q-5 -4 0 -12Z" fill="#9cc3d6" ${st(1.2)}/>`,
  dust:`<circle cx="10" cy="10" r="5" fill="#efe3c8" ${st(1.2)}/>`,
  star:`<path d="M10 1 l2.4 6 l6.4 .6 l-5 4 l1.6 6.4 l-5.4 -3.6 l-5.4 3.6 l1.6 -6.4 l-5 -4 l6.4 -.6Z" fill="${C.yellow}" ${st(1.2)}/>`,
  sand:`<circle cx="10" cy="10" r="2.8" fill="${C.sand}" ${st(1)}/>`
};
const particleSvg = k => `<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">${PART[k]}</svg>`;

if (typeof module !== "undefined") module.exports = { art, scene, particleSvg, SCENES };
