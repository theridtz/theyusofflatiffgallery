import { ROOMS, DEFAULT_PORTRAITS, TOUR, LEGACY_ROOMS, PLACE_ROOMS } from './data.js';
{
/* =====================================================================
   THE PORTRAIT GALLERY — engine
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const paras = t => String(t || '').split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
const wait = ms => new Promise(r => setTimeout(r, ms));
const body = document.body;
const ROOM = {}; ROOMS.forEach((r, i) => ROOM[r.id] = { ...r, index: i });
const roomLabel = id => { const r = ROOM[id]; return r ? (r.numeral ? `Room ${r.numeral} · ${r.name}` : r.name) : ''; };

/* ---------- visitor progress (this browser only) ---------- */
const KEY = 'tpg-visitor-v1';
const visitor = (() => {
  const base = { discovered: [], favs: [], cabinet: false, low: null };
  try { return Object.assign(base, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { return base; }
})();
const saveVisitor = () => { try { localStorage.setItem(KEY, JSON.stringify(visitor)); } catch { } };

/* ---------- app state ---------- */
const S = {
  portraits: [], list: [], byId: new Map(), mode: 'boot', three: false, low: false, mobile: false, touch: false,
  story: null, panel: null, tourIdx: -1, room: 'foyer', editor: false, db: null, user: null, assets: null,
  dbLive: false, seeded: false, lastFocus: null, seqIdx: 0
};

/* ---------- data normalisation (database content is untrusted) ---------- */
const hash = s => { let h = 2166136261; for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const safeUrl = u => (typeof u === 'string' && (/^assets\/[\w.-]+$/.test(u) || /^\/_blob\/[\w.-]+$/.test(u))) ? u : '';
const num = (v, d) => (v === null || v === undefined || v === '' || !Number.isFinite(+v)) ? d : +v;
function norm(d, id) {
  const s = (v, m = 4000) => typeof v === 'string' ? v.slice(0, m) : '';
  const rooms = Array.isArray(d.rooms) ? [...new Set(d.rooms.map(r => LEGACY_ROOMS[r] || r).filter(r => ROOM[r]))] : [];
  return {
    id, name: s(d.name, 120) || 'Untitled portrait', dates: s(d.dates, 80), descriptor: s(d.descriptor, 140),
    identity: s(d.identity, 300), period: s(d.period, 120), opening: s(d.opening, 400), story: s(d.story, 8000),
    moment: s(d.moment, 4000), asideTitle: s(d.asideTitle, 80), aside: s(d.aside, 4000), legacy: s(d.legacy, 4000),
    quote: s(d.quote, 600), quoteBy: s(d.quoteBy, 160), rooms: rooms.length ? rooms : ['pioneers'],
    frame: ['gold', 'bronze', 'wood'].includes(d.frame) ? d.frame : 'gold', orient: d.orient === 'landscape' ? 'landscape' : 'portrait', order: num(d.order, 99),
    published: d.published !== false, alt: s(d.alt, 400), image: safeUrl(d.image), imageAsset: s(d.imageAsset, 120),
    focusX: clamp(num(d.focusX, .5), 0, 1), focusY: clamp(num(d.focusY, .4), 0, 1), zoom: clamp(num(d.zoom, 1), 1, 2.5),
    credit: s(d.credit, 300), demo: !!d.demo, seed: num(d.seed, hash(id) % 997)
  };
}
const primaryIndex = p => Math.min(...p.rooms.map(r => r === 'foyer' && p.rooms.length > 1 ? 99 : ROOM[r].index));
function setPortraits(arr) {
  S.portraits = arr;
  S.byId = new Map(arr.map(p => [p.id, p]));
  S.list = arr.filter(p => p.published).sort((a, b) => primaryIndex(a) - primaryIndex(b) || a.order - b.order || a.name.localeCompare(b.name));
}
const isSealed = p => S.three && !visitor.cabinet && p.rooms.every(r => r === 'secret');
const visibleList = () => S.list.filter(p => !isSealed(p));
const primaryRoom = p => p.rooms.find(r => r !== 'foyer') || p.rooms[0];

/* ---------- placeholder art (painted, clearly a placeholder) ---------- */
function rng(seed) { let a = (seed >>> 0) || 1; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
function drawSpaced(g, text, x, y, sp, maxW) {
  const chars = [...text]; const w = () => chars.reduce((s, ch) => s + g.measureText(ch).width, 0) + sp * (chars.length - 1);
  let tw = w();
  if (maxW && tw > maxW) { const m = g.font.match(/(\d+(?:\.\d+)?)px/); if (m) { const sz = +m[1] * maxW / tw; g.font = g.font.replace(m[0], sz.toFixed(1) + 'px'); sp *= maxW / tw; tw = w(); } }
  let cx = x - tw / 2; const al = g.textAlign; g.textAlign = 'left';
  for (const ch of chars) { g.fillText(ch, cx, y); cx += g.measureText(ch).width + sp; }
  g.textAlign = al;
}
const artCache = new Map();
function paintPlaceholder(p, W = 480, H = 640) {
  const k = p.id + ':' + W + ':' + p.rooms[0];
  if (artCache.has(k)) return artCache.get(k);
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'); const R = rng(p.seed * 9973 + 7);
  const wall = hexRgb(ROOM[p.rooms[0]]?.wall || '#351B24'), paper = [238, 228, 207], gold = [196, 164, 106];
  g.fillStyle = rgba(paper, 1); g.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) {
    const x = R() * W, y = R() * H * .85, r = (.22 + R() * .5) * W;
    const col = mix(mix(wall, gold, R() * .7), paper, .1 + R() * .3);
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, rgba(col, .2 + R() * .22)); gr.addColorStop(.65, rgba(col, .07)); gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  const fb = g.createLinearGradient(0, H * .7, 0, H); fb.addColorStop(0, rgba(paper, 0)); fb.addColorStop(1, rgba(paper, .9));
  g.fillStyle = fb; g.fillRect(0, 0, W, H);
  if (PLACE_ROOMS.includes(p.rooms[0])) { paintScene(g, W, H, R, wall, gold, paper, p.rooms[0]); artCache.set(k, c); return c; }
  const sil = mix(wall, [12, 9, 8], .3);
  const cx = W * (.5 + (R() - .5) * .06), hy = H * (.36 + (R() - .5) * .03), hr = W * .16, tilt = (R() - .5) * .14;
  g.save(); g.shadowColor = rgba(sil, .45); g.shadowBlur = W * .05; g.fillStyle = rgba(sil, .88);
  g.beginPath(); g.moveTo(W * .05, H); g.bezierCurveTo(W * .07, H * .75, W * .27, H * .66, cx - W * .085, H * .6);
  g.lineTo(cx + W * .085, H * .6); g.bezierCurveTo(W * .73, H * .66, W * .93, H * .75, W * .95, H); g.closePath(); g.fill();
  g.fillRect(cx - W * .07, hy + hr * .7, W * .14, H * .6 - (hy + hr * .7) + 2);
  g.beginPath(); g.ellipse(cx, hy, hr, hr * 1.24, tilt, 0, Math.PI * 2); g.fill(); g.restore();
  const n = Math.round(W * H / 80);
  for (let i = 0; i < n; i++) { g.fillStyle = R() < .5 ? 'rgba(255,255,255,.06)' : 'rgba(60,40,20,.05)'; g.fillRect(R() * W, R() * H, 1.3, 1.3); }
  g.strokeStyle = rgba(gold, .6); g.lineWidth = Math.max(1, W / 300);
  g.beginPath(); g.ellipse(W / 2, H * .46, W * .41, H * .41, 0, 0, Math.PI * 2); g.stroke();
  g.fillStyle = 'rgba(70,52,32,.78)'; g.font = `500 ${Math.round(W * .036)}px Cinzel, Georgia, serif`;
  drawSpaced(g, 'PORTRAIT FORTHCOMING', W / 2, H * .955, W * .012, W * .8);
  artCache.set(k, c); return c;
}
function paintScene(g, W, H, R, wall, gold, paper, kind) {
  const ink = mix(wall, [10, 8, 7], .35), mid = mix(wall, gold, .35);
  if (kind === 'beautiful') {
    const sky = g.createLinearGradient(0, 0, 0, H * .62); sky.addColorStop(0, rgba(mix(paper, gold, .25), .9)); sky.addColorStop(1, rgba(mix(gold, [230, 140, 90], .45), .75));
    g.fillStyle = sky; g.fillRect(0, 0, W, H * .62);
    g.fillStyle = rgba([255, 236, 200], .85); g.beginPath(); g.arc(W * (.3 + R() * .4), H * .36, W * .09, 0, Math.PI * 2); g.fill();
    let x = W * .04; g.fillStyle = rgba(mix(mid, paper, .25), .75);
    while (x < W * .96) { const bw = W * (.04 + R() * .07), bh = H * (.08 + R() * .2); g.fillRect(x, H * .58 - bh, bw, bh + 2); x += bw + W * .008; }
    g.fillStyle = rgba(mix(gold, ink, .4), .55); g.fillRect(0, H * .58, W, H * .08);
    for (let i = 0; i < 22; i++) { g.fillStyle = `rgba(255,236,200,${.15 + R() * .25})`; g.fillRect(R() * W, H * (.6 + R() * .05), W * (.04 + R() * .1), 1.5); }
    for (let i = 0; i < 9; i++) { const tx = R() * W, ty = H * (.66 + R() * .06), tr = W * (.1 + R() * .12); g.fillStyle = rgba(mix(ink, [40, 70, 50], .4), .82); g.beginPath(); g.ellipse(tx, ty, tr, tr * .62, 0, 0, Math.PI * 2); g.fill(); g.fillRect(tx - 2.5, ty, 5, H * .1); }
  } else {
    const base = H * .82, cx = W / 2, bw = W * (.5 + R() * .14), form = Math.floor(R() * 3);
    g.fillStyle = rgba(ink, .86);
    g.fillRect(cx - bw / 2 - W * .04, base, bw + W * .08, H * .04);
    g.fillRect(cx - bw / 2, base - H * .03, bw, H * .03);
    const top = base - H * (.3 + R() * .06), cols = 6;
    for (let i = 0; i < cols; i++) { const x = cx - bw / 2 + bw * (i + .2) / cols; g.fillRect(x, top, bw / cols * .55, base - top - H * .03); }
    g.fillRect(cx - bw / 2 - W * .02, top - H * .035, bw + W * .04, H * .035);
    g.beginPath();
    if (form === 0) { g.moveTo(cx - bw / 2 - W * .02, top - H * .035); g.lineTo(cx, top - H * .14); g.lineTo(cx + bw / 2 + W * .02, top - H * .035); }
    else if (form === 1) { g.rect(cx - bw * .18, top - H * .1, bw * .36, H * .065); g.moveTo(cx + bw * .22, top - H * .1); g.arc(cx, top - H * .1, bw * .22, 0, Math.PI, true); }
    else { g.rect(cx - bw * .09, top - H * .26, bw * .18, H * .23); g.moveTo(cx - bw * .11, top - H * .26); g.lineTo(cx, top - H * .34); g.lineTo(cx + bw * .11, top - H * .26); }
    g.fill();
    if (form === 2) { g.fillStyle = rgba(mix(paper, gold, .3), .8); g.beginPath(); g.arc(cx, top - H * .17, bw * .05, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = rgba(mix(gold, paper, .3), .18); for (let i = 0; i < cols; i++) { const x = cx - bw / 2 + bw * (i + .2) / cols; g.fillRect(x, top, 3, base - top - H * .03); }
  }
  const n = Math.round(W * H / 80);
  for (let i = 0; i < n; i++) { g.fillStyle = R() < .5 ? 'rgba(255,255,255,.06)' : 'rgba(60,40,20,.05)'; g.fillRect(R() * W, R() * H, 1.3, 1.3); }
  g.fillStyle = 'rgba(70,52,32,.78)'; g.font = `500 ${Math.round(W * .036)}px Cinzel, Georgia, serif`;
  drawSpaced(g, 'IMAGE FORTHCOMING', W / 2, H * .955, W * .012, W * .8);
}
const thumbCache = new Map();
function imgSrc(p) {
  if (p.image) return p.image;
  const k = p.id + p.rooms[0];
  if (!thumbCache.has(k)) thumbCache.set(k, paintPlaceholder(p).toDataURL('image/jpeg', .86));
  return thumbCache.get(k);
}
const cropStyle = p => `object-position:${(p.focusX * 100).toFixed(1)}% ${(p.focusY * 100).toFixed(1)}%;transform:scale(${p.zoom});transform-origin:${(p.focusX * 100).toFixed(1)}% ${(p.focusY * 100).toFixed(1)}%`;

/* ---------- sound (synthesised, off until the visitor turns it on) ---------- */
const Snd = {
  ctx: null, on: false, master: null, noise: null,
  init() {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    const ctx = this.ctx = new AC(); this.master = ctx.createGain(); this.master.gain.value = 0; this.master.connect(ctx.destination);
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; this.noise = buf;
    const bb = ctx.createBuffer(1, len * 2, ctx.sampleRate), bd = bb.getChannelData(0); let last = 0;
    for (let i = 0; i < bd.length; i++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; bd[i] = last * 3.2; }
    const src = ctx.createBufferSource(); src.buffer = bb; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 340;
    const g = ctx.createGain(); g.gain.value = .07; src.connect(lp).connect(g).connect(this.master); src.start();
    const hum = ctx.createOscillator(); hum.frequency.value = 58; const hg = ctx.createGain(); hg.gain.value = .006; hum.connect(hg).connect(this.master); hum.start();
    return true;
  },
  set(v) {
    if (v && !this.ctx && !this.init()) return;
    this.on = v;
    if (this.ctx) { if (v && this.ctx.state === 'suspended') this.ctx.resume().catch(() => { }); this.master.gain.setTargetAtTime(v ? .9 : 0, this.ctx.currentTime, .25); }
  },
  burst({ dur = .1, type = 'bandpass', f = 900, q = 1, gain = .2, f2 = null, attack = .005 }) {
    if (!this.on || !this.ctx) return; const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.noise; const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
    if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(fl).connect(g).connect(this.master); s.start(t, Math.random()); s.stop(t + dur + .05);
  },
  step() { this.burst({ dur: .09, f: 700 + Math.random() * 300, q: 1.4, gain: .12 }); setTimeout(() => this.burst({ dur: .05, type: 'lowpass', f: 300, gain: .08 }), 18); },
  whoosh() { this.burst({ dur: 1.3, f: 260, f2: 1300, q: .7, gain: .05, attack: .5 }); },
  page() { this.burst({ dur: .28, type: 'highpass', f: 2200, gain: .06, attack: .02 }); setTimeout(() => this.burst({ dur: .18, type: 'highpass', f: 3200, gain: .04 }), 120); },
  chime() {
    if (!this.on || !this.ctx) return; const c = this.ctx;
    [[880, 0], [1318.5, .16], [1760, .34]].forEach(([fq, dl]) => {
      const t = c.currentTime + dl, o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = fq;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.05, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + 2.6);
      o.connect(g).connect(this.master); o.start(t); o.stop(t + 2.7);
    });
  }
};
function setSound(v) {
  Snd.set(v);
  const on = Snd.on;
  $('#soundBtn').setAttribute('aria-pressed', on); $('#soundBtn').textContent = on ? 'Sound on' : 'Sound';
  $('#introSound').setAttribute('aria-pressed', on); $('#introSound').textContent = on ? 'Sound: on' : 'Sound: off';
}

/* ---------- small UI helpers ---------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3200); }
const announce = msg => { $('#live').textContent = msg; };
let idleT;
function poke() { body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => body.classList.add('idle'), 3800); }
let roomT;
function showRoomTitle(id) {
  const r = ROOM[id]; if (!r) return; const el = $('#roomTitle');
  el.querySelector('.num').textContent = r.numeral ? 'Room ' + r.numeral : (id === 'secret' ? 'A hidden room' : 'Entrance hall');
  el.querySelector('.nm').textContent = r.name; el.querySelector('.bl').textContent = r.blurb;
  el.classList.add('on'); clearTimeout(roomT); roomT = setTimeout(() => el.classList.remove('on'), 3000);
}
function setLow(v) {
  S.low = v; visitor.low = v; saveVisitor();
  body.classList.toggle('lowmotion', v);
  $('#motionBtn').setAttribute('aria-pressed', v); $('#motionBtn').textContent = v ? 'Low motion: on' : 'Low motion';
  if (T) T.particles && (T.particles.visible = !v);
}
function trapFocus(e, root) {
  const f = $$('button:not([disabled]),[href],input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', root).filter(el => el.offsetParent !== null || el === document.activeElement);
  if (!f.length) return; const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
function markDiscovered(id) {
  if (!visitor.discovered.includes(id)) { visitor.discovered.push(id); saveVisitor(); }
}

/* =====================================================================
   STORY VIEW (editorial portrait detail)
   ===================================================================== */
function storyHTML(p) {
  const words = p.name.split(/\s+/); const cut = words.length > 1 ? Math.ceil(words.length / 2) : 1;
  const lines = words.length > 1 ? [words.slice(0, cut).join(' '), words.slice(cut).join(' ')] : [p.name];
  let d = .18; const nd = () => (d += .08).toFixed(2) + 's';
  const roomsTxt = p.rooms.filter(r => r !== 'foyer').map(roomLabel).join(' · ') || roomLabel(p.rooms[0]);
  const sec = (title, text, cls = '') => text ? `<section class="sec ${cls} rv" style="--d:${nd()}"><h2>${esc(title)}</h2>${paras(text).map(t => `<p>${esc(t)}</p>`).join('')}</section>` : '';
  const fav = visitor.favs.includes(p.id);
  const nxt = nextToExplore(p);
  return `
  <div class="eyebrow rv" style="--d:.1s">${esc(roomsTxt)}${p.demo ? '<span class="demo-badge">Demo content</span>' : ''}</div>
  <h1 id="sName">${lines.map((l, i) => `<span class="ln"><span style="--d:${(.2 + i * .1).toFixed(2)}s">${esc(l)}</span></span>`).join('')}</h1>
  ${p.identity ? `<p class="ident rv" style="--d:.42s">${esc(p.identity)}</p>` : ''}
  ${p.period ? `<p class="period rv" style="--d:.48s">${esc(p.period)}</p>` : ''}
  <div class="orn" aria-hidden="true" style="--d:.5s"><i></i><svg><use href="#diam"/></svg><i></i></div>
  ${p.opening ? `<p class="opening rv" style="--d:.58s">${esc(p.opening)}</p>` : ''}
  ${(d = .62, '')}
  ${sec('The Story', p.story, 'story')}
  ${sec('The Defining Moment', p.moment)}
  ${p.aside ? sec(p.asideTitle || 'In Their Words', p.aside, 'aside') : ''}
  ${sec('The Legacy', p.legacy)}
  ${p.quote ? `<blockquote class="rv" style="--d:${nd()}">“${esc(p.quote)}”${p.quoteBy ? `<cite>${esc(p.quoteBy)}</cite>` : ''}</blockquote>` : ''}
  ${p.credit ? `<p class="credit rv" style="--d:${nd()}">Image: ${esc(p.credit)}</p>` : ''}
  <div class="foot rv" style="--d:${nd()}">
    <button class="lnk fav" type="button" aria-pressed="${fav}" data-fav="${esc(p.id)}"><svg aria-hidden="true"><use href="#${fav ? 'star' : 'starO'}"/></svg>${fav ? 'In your favourites' : 'Add to favourites'}</button>
    <span class="eyebrow" style="color:var(--ink-3)">Story ${visibleList().findIndex(x => x.id === p.id) + 1} of ${visibleList().length}</span>
  </div>
  ${nxt ? `<button class="next-link rv" type="button" style="--d:${nd()}" data-go="${esc(nxt.id)}"><small>Explore another portrait</small><span>${esc(nxt.name)} →</span></button>` : ''}`;
}
function nextToExplore(p) {
  const L = visibleList(); if (L.length < 2) return null;
  const i = L.findIndex(x => x.id === p.id);
  for (let k = 1; k < L.length; k++) { const q = L[(i + k) % L.length]; if (!visitor.discovered.includes(q.id)) return q; }
  return L[(i + 1) % L.length];
}
function fillStory(p) {
  const room = ROOM[primaryRoom(p)];
  $('#story').style.setProperty('--room', room?.wall || '#351B24');
  const fr = $('#sFrame'); fr.dataset.frame = p.frame; fr.dataset.orient = p.orient;
  const img = $('#sImg'); img.src = imgSrc(p); img.alt = p.alt || `Portrait of ${p.name}`; img.style.cssText = cropStyle(p);
  $('#sCap').textContent = [p.name, p.dates].filter(Boolean).join(' · ');
  const art = $('#sArt'); art.innerHTML = storyHTML(p); art.classList.remove('out');
  $('#sTxt').scrollTop = 0; $('#story').scrollTop = 0;
}
function openStory(p, inst = null, { teleport = false } = {}) {
  if (!p) return;
  S.story = { id: p.id, inst };
  if (S.panel) closePanel(true);
  if (S.three && inst && teleport) T.placeAt(T.closeView(inst));
  fillStory(p);
  markDiscovered(p.id);
  const st = $('#story'); st.classList.add('on'); body.classList.add('storyopen');
  $('#veil').classList.add('on');
  Snd.page();
  setHash(p.id);
  S.lastFocus = S.lastFocus || document.activeElement;
  setTimeout(() => $('#storyBack').focus({ preventScroll: true }), 60);
  announce(`${p.name}. ${p.descriptor || ''}`);
  S.mode = S.three ? 'focus' : 'flat';
}
function closeStory() {
  if (!S.story) return;
  const { inst } = S.story; S.story = null;
  $('#story').classList.remove('on'); body.classList.remove('storyopen');
  setHash('');
  if (S.three && inst) {
    $('#veil').classList.remove('on');
    S.mode = 'travel';
    T.travel(T.station(inst, S.mobile ? 3 : 2.6), { dur: 1.2, look: 'blend', done: () => { S.mode = S.tourIdx >= 0 ? 'tour' : 'explore'; if (S.tourIdx >= 0) showTourCard(); } });
  } else { $('#veil').classList.remove('on'); S.mode = S.three ? 'explore' : 'flat'; }
  const lf = S.lastFocus; S.lastFocus = null; if (lf && lf.isConnected) lf.focus({ preventScroll: true });
  renderJournalIfOpen();
}
async function storyStep(dir, toId) {
  if (!S.story) return;
  const L = visibleList(); const i = L.findIndex(x => x.id === S.story.id);
  const p = toId ? S.byId.get(toId) : L[(i + dir + L.length) % L.length]; if (!p || p.id === S.story.id) return;
  $('#sArt').classList.add('out'); $('#sFrame').classList.add('out');
  Snd.page();
  await wait(S.low ? 80 : 330);
  const inst = S.three ? T.instFor(p.id) : null;
  if (S.three && inst) T.placeAt(T.closeView(inst));
  S.story = { id: p.id, inst };
  fillStory(p); markDiscovered(p.id); setHash(p.id);
  requestAnimationFrame(() => $('#sFrame').classList.remove('out'));
  $('#sName').setAttribute('tabindex', '-1'); $('#sName').focus({ preventScroll: true });
  announce(`${p.name}. ${p.descriptor || ''}`);
}
// parallax on the portrait spread
const par = { x: 0, y: 0, tx: 0, ty: 0 };
$('#story').addEventListener('pointermove', e => { if (S.touch) return; par.tx = (e.clientX / innerWidth - .5) * 2; par.ty = (e.clientY / innerHeight - .5) * 2; });
function parallaxTick() {
  if (!S.story || S.low) return;
  par.x += (par.tx - par.x) * .06; par.y += (par.ty - par.y) * .06;
  $('#sGlow').style.transform = `translate(${(-par.x * 10).toFixed(2)}px,${(-par.y * 8).toFixed(2)}px)`;
  if (!$('#sFrame').classList.contains('out')) $('#sFrame').style.transform = `translate(${(par.x * 12).toFixed(2)}px,${(par.y * 9).toFixed(2)}px)`;
  const p = S.byId.get(S.story.id); if (p) $('#sImg').style.transform = `translate(${(-par.x * 5).toFixed(2)}px,${(-par.y * 4).toFixed(2)}px) scale(${(p.zoom * 1.04).toFixed(3)})`;
}

/* =====================================================================
   PANELS: map, collections (2D catalogue), journal, curator
   ===================================================================== */
const PANEL_BTN = { map: '#mapBtn', cat: '#catBtn', jr: '#jrBtn', cur: '#curatorBtn', art: '#artistBtn' };
function openPanel(id) {
  if (S.panel === id) { closePanel(); return; }
  if (S.panel) closePanel(true);
  if (S.story && id !== 'cur') closeStory();
  S.panel = id; S.lastFocus = S.lastFocus || document.activeElement;
  ({ map: renderMap, cat: renderCatalogue, jr: renderJournal, cur: renderCurator, art: renderArtist })[id]();
  $('#' + id).classList.add('on'); body.classList.add('panelopen');
  $(PANEL_BTN[id])?.setAttribute('aria-expanded', 'true');
  setHash({ map: 'map', cat: 'catalogue', jr: 'journal', cur: 'curator', art: 'artist' }[id]);
  setTimeout(() => $('#' + id + ' [data-close]')?.focus({ preventScroll: true }), 40);
}
function closePanel(silent) {
  if (!S.panel) return; const id = S.panel; S.panel = null;
  $('#' + id).classList.remove('on'); body.classList.remove('panelopen');
  $(PANEL_BTN[id])?.setAttribute('aria-expanded', 'false');
  if (!silent) { setHash(''); const lf = S.lastFocus; S.lastFocus = null; if (lf && lf.isConnected) lf.focus({ preventScroll: true }); }
}
const renderJournalIfOpen = () => { if (S.panel === 'jr') renderJournal(); if (S.panel === 'cat') renderCatalogue(); };

/* ---------- the artist ---------- */
function renderArtist() {
  const L = visibleList(), rooms = ROOMS.filter(r => r.id !== 'foyer' && r.id !== 'secret');
  const count = id => L.filter(p => p.rooms.includes(id)).length;
  const canWalk = !!S.three;
  $('#artBody').innerHTML = `
    <div class="hero">
      <figure style="margin:0">
        <div class="pf"><div><img src="assets/yusoff-abdul-latiff.jpg" alt="Watercolour portrait of Yusoff Abdul Latiff in a grey flat cap and a mustard shirt against an orange wash"></div></div>
        <figcaption class="cap">Yusoff Abdul Latiff · watercolour, 2022</figcaption>
      </figure>
      <div>
        <div class="k">About the Artist</div>
        <h2 id="artH">Yusoff Abdul Latiff</h2>
        <p class="dates">b. 1946, Singapore · Watercolourist · Educator</p>
        <p class="lede">A watercolour artist, retired educator and passionate chronicler of Singapore’s cultural heritage, who turns familiar places and treasured memories into enduring works of art.</p>
        <div class="stats">
          <div><b>${L.length}</b><span>Works on view</span></div>
          <div><b>${rooms.length}</b><span>Galleries</span></div>
          <div><b>5</b><span>Exhibiting venues &amp; publications</span></div>
        </div>
      </div>
    </div>
    <div class="body">
      <h3>Artist Profile</h3>
      <div class="t first">
        <p>Yusoff Abdul Latiff (b. 1946, Singapore) is a Singaporean watercolour artist, retired educator and passionate chronicler of the nation’s cultural heritage. Through his intricate and evocative paintings, he captures the architectural beauty, everyday life and fading landscapes of Singapore.</p>
        <p>With a keen eye for detail and a deep appreciation for history, his practice spans heritage architecture, nostalgic kampong scenes, vibrant landscapes and expressive portraits. His watercolours are distinguished by their meticulous rendering of architectural detail, rich compositions and sensitivity to the stories embedded within their subjects. He signs his work <em>al-Yus</em>.</p>
      </div>
      <h3>Painting the Singapore We Remember</h3>
      <div class="t">
        <p>At the heart of his work is a desire to preserve the Singapore of yesterday while celebrating the character of the Singapore of today. His paintings return again and again to the streets of Katong, the colourful façades of Peranakan shophouses, traditional Malay kampongs and historic landmarks. Each composition is more than a picture: it is a window into the social and cultural history of a rapidly changing nation.</p>
        <p>Drawing on personal memory and a deep knowledge of Singapore’s heritage, he brings authenticity and narrative depth to his work. His old neighbourhoods, traditional homes and scenes of community life invite viewers to rediscover the places, people and traditions that have shaped Singapore’s collective identity.</p>
      </div>
    </div>
    <blockquote>Behind every building lies a history, behind every landscape a memory, and behind every ordinary scene a story worth preserving.</blockquote>
    <div class="body" style="margin-top:0">
      <h3>Artist, Educator, Storyteller</h3>
      <div class="t">
        <p>His years as an educator shape his thoughtful approach to art. Beyond their visual appeal, his paintings carry historical insight, cultural observation and personal recollection that enrich the viewer’s understanding of each subject. They show how art can be a bridge between generations, connecting personal memories with a wider sense of shared heritage.</p>
      </div>
      <h3>Exhibitions &amp; Contributions</h3>
      <div class="t">
        <ul class="ex">
          <li>Singapore Watercolour Society<small>Group exhibitions, including the 48th Annual Exhibition, 2017</small></li>
          <li>Angkatan Pelukis Aneka Daya (APAD)<small>Group exhibitions, including Kontemporari 2017 and the 2026 annual exhibition</small></li>
          <li>Maya Gallery<small>Homeland, 2023</small></li>
          <li>Kamal Gallery, Wisma Geylang Serai<small>SeniKita II, 2022 · SeniLukis III, 2023</small></li>
          <li><em>Passage</em>, Friends of the Museums Singapore<small>Watercolour illustrations and heritage narratives</small></li>
        </ul>
        <p>Beyond exhibiting, he shares his knowledge through community engagement and watercolour workshops, encouraging others to appreciate and document Singapore’s heritage through art.</p>
      </div>
      <h3>An Enduring Legacy</h3>
      <div class="t">
        <p>For Yusoff Abdul Latiff, watercolour is more than a medium. It is a way of remembering, documenting and celebrating the places and people that define Singapore, and of making sure their colours and stories continue to resonate with generations to come.</p>
      </div>
      <h3>Explore the Collection</h3>
      <div class="t">
        <div class="rooms">${rooms.map(r => `<button type="button" data-room="${r.id}"><i>Room ${esc(r.numeral || '')}</i><b>${esc(r.name)}</b><span>${count(r.id)} work${count(r.id) === 1 ? '' : 's'} · ${canWalk ? 'Walk there' : 'View in the catalogue'}</span></button>`).join('')}</div>
        <div class="sig">al-Yus<small>Yusoff Abdul Latiff</small></div>
      </div>
    </div>`;
  $$('#artBody .rooms button').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.room; closePanel();
    if (canWalk) goRoom(id); else { catTab = id; openPanel('cat'); }
  }));
}

/* ---------- catalogue ---------- */
let catTab = 'all';
function renderCatalogue() {
  const tabs = [['all', 'All portraits'], ...ROOMS.filter(r => r.id !== 'secret' || visitor.cabinet || !S.three).map(r => [r.id, r.numeral ? `${r.numeral} · ${r.short}` : r.short])];
  if (!tabs.some(t => t[0] === catTab)) catTab = 'all';
  $('#catTabs').innerHTML = tabs.map(([id, l]) => `<button role="tab" type="button" aria-selected="${id === catTab}" data-tab="${id}">${esc(l)}</button>`).join('');
  const L = visibleList().filter(p => catTab === 'all' || p.rooms.includes(catTab));
  $('#catList').innerHTML = L.length ? L.map(p => `
    <article class="entry">
      <div class="thumb" data-frame="${p.frame}" data-orient="${p.orient}"><div><img src="${esc(imgSrc(p))}" alt="${esc(p.alt || 'Portrait of ' + p.name)}" loading="lazy" style="${cropStyle(p)}"></div></div>
      <div>
        <h3>${esc(p.name)}</h3>
        <div class="dt">${esc(p.dates)}</div>
        <div class="ds">${esc(p.descriptor)}</div>
        <div class="chips">${p.rooms.map(r => `<span class="chip">${esc(ROOM[r].numeral ? 'Room ' + ROOM[r].numeral + ' · ' + ROOM[r].short : ROOM[r].short)}</span>`).join('')}${p.demo ? '<span class="chip">Demo</span>' : ''}${visitor.discovered.includes(p.id) ? '<span class="chip found">Discovered</span>' : ''}</div>
        <div class="acts"><button type="button" data-read="${esc(p.id)}">Read the story</button>${S.three ? `<button type="button" data-visit="${esc(p.id)}">See it in the gallery</button>` : ''}</div>
      </div>
    </article>`).join('') : `<p class="note">No published portraits in this room yet.</p>`;
  $('#catNote').textContent = (S.three && !visitor.cabinet) ? 'One room of this museum is not on the plan. Visitors who look carefully in Room III sometimes find it.' : '';
}
$('#catTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { catTab = b.dataset.tab; renderCatalogue(); $(`#catTabs [data-tab="${catTab}"]`)?.focus(); } });
$('#catTabs').addEventListener('keydown', e => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; const bs = $$('#catTabs button'); const i = bs.indexOf(document.activeElement);
  if (i < 0) return; e.preventDefault(); bs[(i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length].click();
});
$('#catList').addEventListener('click', e => {
  const r = e.target.closest('[data-read]'), v = e.target.closest('[data-visit]');
  if (r) { const p = S.byId.get(r.dataset.read); closePanel(true); openStory(p, S.three ? T.instFor(p.id) : null, { teleport: true }); }
  if (v) { const p = S.byId.get(v.dataset.visit); closePanel(); if (S.tourIdx >= 0) endTour(); const inst = T.instFor(p.id); S.mode = 'travel'; T.travel(T.station(inst, S.mobile ? 3 : 2.6), { done: () => { S.mode = 'explore'; S.seqIdx = Math.max(0, T.seq.indexOf(inst)); updateMBar(); } }); }
});

/* ---------- journal ---------- */
function renderJournal() {
  const L = S.list; const total = L.length; const found = L.filter(p => visitor.discovered.includes(p.id));
  const circ = 2 * Math.PI * 54, frac = total ? found.length / total : 0;
  const favs = visitor.favs.map(id => S.byId.get(id)).filter(Boolean);
  const yet = L.filter(p => !visitor.discovered.includes(p.id));
  const roomsProg = ROOMS.filter(r => r.id !== 'secret' || visitor.cabinet).map(r => {
    const inR = L.filter(p => p.rooms.includes(r.id)); if (!inR.length) return '';
    const f = inR.filter(p => visitor.discovered.includes(p.id)).length;
    return `<div class="rp"><span>${esc(r.numeral ? r.numeral + ' · ' + r.name : r.name)}</span><span>${f} / ${inR.length}</span><div class="bar"><i style="width:${(f / inR.length * 100).toFixed(1)}%"></i></div></div>`;
  }).join('');
  const item = p => `<li><button type="button" data-jopen="${esc(p.id)}">${esc(p.name)}<small>${esc(ROOM[primaryRoom(p)].numeral ? 'Room ' + ROOM[primaryRoom(p)].numeral : ROOM[primaryRoom(p)].short)}</small></button></li>`;
  $('#jrBody').innerHTML = `
    <h2 id="jrH">Discovery Journal</h2>
    <div class="prog">
      <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="bgc" cx="60" cy="60" r="54"/><circle class="fgc" cx="60" cy="60" r="54" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${(circ * (1 - frac)).toFixed(1)}"/></svg>
      <div><div class="big">${found.length} <span style="font-size:.5em;color:var(--ink-3)">of ${total}</span></div><div class="lbl">Stories discovered</div></div>
    </div>
    <div class="rooms-prog">${roomsProg}</div>
    <p style="margin:18px 0 0;font:italic 400 17px/1.4 var(--serif);color:var(--ink-2)">${visitor.cabinet ? 'You have found the Curator’s Cabinet.' : 'There is a room you have not found yet.'}</p>
    <div class="jlist">
      <h3>Favourites</h3>${favs.length ? `<ul>${favs.map(item).join('')}</ul>` : '<p class="empty">Mark a story as a favourite to keep it here.</p>'}
      <h3>Discovered</h3>${found.length ? `<ul>${found.map(item).join('')}</ul>` : '<p class="empty">Open a portrait’s story to record it here.</p>'}
      <h3>Yet to explore</h3>${yet.length ? `<ul>${yet.map(p => isSealed(p) ? `<li class="sealed">A sealed portrait, somewhere unlisted</li>` : item(p)).join('')}</ul>` : '<p class="empty">Every story in the gallery has been discovered.</p>'}
    </div>
    <div class="reset"><button class="lnk" type="button" id="jReset">Reset my progress</button>
      <div class="confirm" id="jConfirm"><span>Clear discoveries and favourites on this device?</span><button type="button" id="jYes">Clear</button><button type="button" id="jNo">Keep</button></div></div>
    <p style="margin-top:18px;font:400 12px/1.5 var(--ui);color:var(--ink-3)">Progress is saved in this browser only.</p>`;
}
$('#jr').addEventListener('click', e => {
  const o = e.target.closest('[data-jopen]');
  if (o) { const p = S.byId.get(o.dataset.jopen); closePanel(true); openStory(p, S.three ? T.instFor(p.id) : null, { teleport: true }); return; }
  if (e.target.id === 'jReset') $('#jConfirm').classList.add('on');
  if (e.target.id === 'jNo') $('#jConfirm').classList.remove('on');
  if (e.target.id === 'jYes') { visitor.discovered = []; visitor.favs = []; saveVisitor(); renderJournal(); toast('Your journal has been cleared.'); }
});

/* ---------- map ---------- */
const RECT = {
  foyer: { x0: -9, x1: 9, z0: 0, z1: -16, h: 9 },
  pioneers: { x0: -7, x1: 7, z0: -16, z1: -34, h: 7.2 },
  gamechangers: { x0: -7, x1: 7, z0: -34, z1: -52, h: 7.2 },
  heroes: { x0: -7, x1: 7, z0: -52, z1: -70, h: 7.2 },
  monuments: { x0: -7, x1: 7, z0: -70, z1: -88, h: 7.2 },
  beautiful: { x0: -7, x1: 7, z0: -88, z1: -106, h: 7.2 },
  peranakan: { x0: -7, x1: 7, z0: -106, z1: -124, h: 7.2 },
  secret: { x0: 7.3, x1: 15, z0: -56, z1: -66, h: 4.6 }
};
const SECRET_DOOR = { x: 7.15, z: -61, w: 1.3, h: 2.6 };
const DOORS = [
  { a: 'foyer', b: 'pioneers', x: 0, z: -16, w: 4.2, spring: 3.6, axis: 'z' },
  { a: 'pioneers', b: 'gamechangers', x: 0, z: -34, w: 3.6, spring: 3.4, axis: 'z' },
  { a: 'gamechangers', b: 'heroes', x: 0, z: -52, w: 3.6, spring: 3.4, axis: 'z' },
  { a: 'heroes', b: 'monuments', x: 0, z: -70, w: 3.6, spring: 3.4, axis: 'z' },
  { a: 'monuments', b: 'beautiful', x: 0, z: -88, w: 3.6, spring: 3.4, axis: 'z' },
  { a: 'beautiful', b: 'peranakan', x: 0, z: -106, w: 3.6, spring: 3.4, axis: 'z' },
  { a: 'heroes', b: 'secret', x: SECRET_DOOR.x, z: SECRET_DOOR.z, w: SECRET_DOOR.w, axis: 'x', secret: true }
];
const ENTRY = { foyer: [0, -3, 0], pioneers: [0, -19, 0], gamechangers: [0, -37, 0], heroes: [0, -55, 0], monuments: [0, -73, 0], beautiful: [0, -91, 0], peranakan: [0, -109, 0], secret: [9.2, -61, -Math.PI / 2] };
let mapVertical = false;
function toPlan(x, z) { return mapVertical ? [x + 10, -z + 2] : [-z + 2, x + 10]; }
function planRect(r) { const [a, b] = toPlan(r.x0, r.z0), [c, d] = toPlan(r.x1, r.z1); return { x: Math.min(a, c), y: Math.min(b, d), w: Math.abs(c - a), h: Math.abs(d - b) }; }
function renderMap() {
  mapVertical = innerWidth < 700;
  const svg = $('#plan'); const W = mapVertical ? 28 : 132, H = mapVertical ? 132 : 28;
  svg.setAttribute('viewBox', `-1 -1 ${W + 2} ${H + 2}`);
  if (mapVertical) { svg.style.maxHeight = '70vh'; svg.style.width = 'auto'; svg.style.margin = '0 auto'; } else { svg.style.maxHeight = ''; svg.style.width = '100%'; }
  const ink = '#3b2a18';
  let out = `<defs><pattern id="hatch" width="1.2" height="1.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="1.2" stroke="${ink}" stroke-width=".12" opacity=".35"/></pattern></defs>`;
  const rooms = ROOMS.filter(r => r.id !== 'secret' || visitor.cabinet);
  out += rooms.map(r => {
    const q = planRect(RECT[r.id]); const cx = q.x + q.w / 2, cy = q.y + q.h / 2;
    const label = r.numeral ? r.numeral : (r.id === 'foyer' ? 'Foyer' : 'Cabinet');
    const nm = r.id === 'foyer' ? 'Entrance' : r.short;
    return `<g class="room" tabindex="0" role="button" aria-label="Walk to ${esc(r.name)}" data-room="${r.id}">
      <rect class="fill" x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" fill="rgba(255,250,235,.25)"/>
      <rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" fill="none" stroke="${ink}" stroke-width=".45"/>
      <rect x="${q.x + .55}" y="${q.y + .55}" width="${q.w - 1.1}" height="${q.h - 1.1}" fill="none" stroke="${ink}" stroke-width=".1" opacity=".6"/>
      <text x="${cx}" y="${cy - .6}" text-anchor="middle" font-family="Cinzel,serif" font-size="${r.numeral ? 2.4 : 1.6}" fill="${ink}">${esc(label)}</text>
      <text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="'Cormorant Garamond',serif" font-style="italic" font-size="1.45" fill="${ink}" opacity=".85">${esc(nm)}</text></g>`;
  }).join('');
  // door gaps
  out += DOORS.filter(d => !d.secret || visitor.cabinet).map(d => {
    const half = d.w / 2;
    const [x1, y1] = d.axis === 'z' ? toPlan(d.x - half, d.z + .35) : toPlan(d.x - .5, d.z + half);
    const [x2, y2] = d.axis === 'z' ? toPlan(d.x + half, d.z - .35) : toPlan(d.x + .5, d.z - half);
    return `<rect x="${Math.min(x1, x2)}" y="${Math.min(y1, y2)}" width="${Math.abs(x2 - x1)}" height="${Math.abs(y2 - y1)}" fill="#ead9b4"/>`;
  }).join('');
  // portraits as wall ticks
  if (S.three) out += T.insts.filter(i => i.room !== 'secret' || visitor.cabinet).map(i => {
    const [px, py] = toPlan(i.center.x - i.n.x * .25, i.center.z - i.n.z * .25);
    const along = Math.abs(i.n.x) > .5; const vert = mapVertical ? along : !along;
    const L = i.size === 'L' ? 1.6 : 1.2, t = .5;
    return `<rect x="${px - (vert ? t / 2 : L / 2)}" y="${py - (vert ? L / 2 : t / 2)}" width="${vert ? t : L}" height="${vert ? L : t}" fill="#9a7a3c"><title>${esc(i.p.name)}</title></rect>`;
  }).join('');
  // compass + scale
  const [cx, cy] = mapVertical ? [24, 126] : [127, 4.5];
  out += `<g transform="translate(${cx} ${cy})" fill="${ink}" opacity=".85"><circle r="2.6" fill="none" stroke="${ink}" stroke-width=".12"/><path d="${mapVertical ? 'M0 -3.2L.7 0L0 .6L-.7 0z' : 'M3.2 0L0 .7L-.6 0L0 -.7z'}"/><text ${mapVertical ? 'x="0" y="-3.8"' : 'x="4.2" y=".6"'} font-family="Cinzel,serif" font-size="1.3" text-anchor="middle">${mapVertical ? 'N' : 'N'}</text></g>`;
  const [sx, sy] = mapVertical ? [2, 128] : [3, 26.4];
  out += `<g transform="translate(${sx} ${sy})" fill="${ink}"><rect width="5" height=".35"/><rect x="5" width="5" height=".35" fill="none" stroke="${ink}" stroke-width=".1"/><text x="0" y="-.6" font-family="Inter,sans-serif" font-size="1">0</text><text x="9.4" y="-.6" font-family="Inter,sans-serif" font-size="1">10 m</text></g>`;
  out += `<g id="me" pointer-events="none"><path id="meCone" fill="rgba(160,40,20,.25)"/><circle id="meDot" r=".75" fill="#a2321c" stroke="#fff6dd" stroke-width=".22"/></g>`;
  svg.innerHTML = out;
  $('#mapLegend').innerHTML = `<span><b>You are in:</b> ${esc(ROOM[S.room]?.name || '')}</span><span>Gold marks show where portraits hang.</span>${visitor.cabinet ? '' : '<span>Not every room appears on this plan.</span>'}`;
  updateMapMarker();
}
function updateMapMarker() {
  if (S.panel !== 'map' || !S.three) return;
  const p = T.camPos(); const [x, y] = toPlan(p.x, p.z);
  const dot = $('#meDot'), cone = $('#meCone'); if (!dot) return;
  dot.setAttribute('cx', x); dot.setAttribute('cy', y);
  const dir = [-Math.sin(T.cam.yaw), -Math.cos(T.cam.yaw)];
  const pt = (ang, r) => { const c = Math.cos(ang), s = Math.sin(ang); const dx = dir[0] * c - dir[1] * s, dz = dir[0] * s + dir[1] * c; const q = toPlan(p.x + dx * r, p.z + dz * r); return q.map(v => v.toFixed(2)).join(' '); };
  cone.setAttribute('d', `M${x} ${y}L${pt(-.45, 4.2)}L${pt(.45, 4.2)}Z`);
}
$('#plan').addEventListener('click', e => { const g = e.target.closest('[data-room]'); if (g) goRoom(g.dataset.room); });
$('#plan').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-room]')) { e.preventDefault(); goRoom(e.target.closest('[data-room]').dataset.room); } });
function goRoom(id) {
  closePanel(); if (S.tourIdx >= 0) endTour();
  const [x, z, yaw] = ENTRY[id]; S.mode = 'travel';
  T.travel({ x, z, yaw, pitch: 0 }, { done: () => { S.mode = 'explore'; } });
}

/* ---------- tour ---------- */
function tourStops() {
  let L = TOUR.map(id => S.byId.get(id)).filter(p => p && p.published && !isSealed(p));
  if (L.length < 3) L = ROOMS.filter(r => r.id !== 'secret').map(r => visibleList().find(p => p.rooms.includes(r.id))).filter(Boolean);
  return [...new Set(L)];
}
function startTour() {
  if (!S.three) return; if (S.panel) closePanel(true); if (S.story) closeStory();
  S.tourIdx = 0; body.classList.add('touring'); $('#tourBtn').setAttribute('aria-pressed', 'true'); $('#tourBtn').textContent = 'Exit guided tour';
  $('#tour').classList.add('on'); goTour(0);
}
function endTour() {
  S.tourIdx = -1; body.classList.remove('touring'); $('#tour').classList.remove('on'); $('#tourBtn').setAttribute('aria-pressed', 'false'); $('#tourBtn').textContent = 'Enter guided tour';
  if (S.mode === 'tour') S.mode = 'explore';
  $('#tourBtn').focus({ preventScroll: true });
}
function goTour(i) {
  const L = tourStops(); if (!L.length) return; S.tourIdx = (i + L.length) % L.length; const p = L[S.tourIdx];
  const inst = T.instFor(p.id, true);
  $('#tour').classList.add('moving'); $('#tourK').textContent = 'Walking to ' + (roomLabel(inst.room));
  $('#tourCount').textContent = `${S.tourIdx + 1} of ${L.length}`; $('#tourName').textContent = p.name; $('#tourText').textContent = '';
  S.mode = 'travel';
  T.travel(T.station(inst, S.mobile ? 3 : 2.3), { look: 'path', done: () => { if (S.tourIdx < 0) return; S.mode = 'tour'; showTourCard(); } });
}
function showTourCard() {
  const L = tourStops(); const p = L[S.tourIdx]; if (!p) return; const inst = T.instFor(p.id, true);
  $('#tour').classList.remove('moving'); $('#tour').classList.add('on');
  $('#tourK').textContent = roomLabel(inst.room) + (p.demo ? ' · Demo content' : '');
  $('#tourName').textContent = p.name; $('#tourText').textContent = p.opening || p.descriptor;
  $('#tourCount').textContent = `${S.tourIdx + 1} of ${L.length}`;
}

/* ---------- mobile walkthrough bar ---------- */
function updateMBar() {
  if (!S.three || !T.seq.length) return; const i = T.seq[clamp(S.seqIdx, 0, T.seq.length - 1)];
  $('#mName').textContent = i.p.name; $('#mRoom').textContent = roomLabel(i.room);
}
function seqGo(d) {
  if (!S.three || S.mode === 'travel' || S.mode === 'focus') return; const n = T.seq.length; if (!n) return;
  S.seqIdx = (S.seqIdx + d + n) % n; updateMBar(); const inst = T.seq[S.seqIdx]; S.mode = 'travel';
  T.travel(T.station(inst, 3), { look: 'path', done: () => { S.mode = 'explore'; } });
}

/* =====================================================================
   CURATOR'S DESK (owner & editors; database + uploaded assets)
   ===================================================================== */
const CUR = { id: null, draft: null, q: '', confirmDel: false, saving: false, status: '' };
const blankDraft = () => ({ id: null, name: '', dates: '', descriptor: '', identity: '', period: '', opening: '', story: '', moment: '', asideTitle: '', aside: '', legacy: '', quote: '', quoteBy: '', rooms: ['pioneers'], frame: 'gold', orient: 'portrait', order: 50, published: false, alt: '', image: '', imageAsset: '', focusX: .5, focusY: .4, zoom: 1, credit: '', demo: false, seed: Math.floor(Math.random() * 900) });
function renderCurator() {
  const head = `<h2 id="curH">The Curator’s Desk</h2><p class="lede">Add, edit and hang portraits. Changes are saved to the gallery’s database and appear for every visitor.</p>`;
  if (!S.db) { $('#curBody').innerHTML = head + `<div class="cur-msg">The collection database isn’t available in this view. Open the gallery on claude.ai while signed in as its owner or an editor.</div>`; return; }
  if (!S.editor) { $('#curBody').innerHTML = head + `<div class="cur-msg">Only the gallery’s owner and editors can manage the collection.</div>`; return; }
  if (!CUR.draft) selectCur(S.portraits[0]?.id || null, true);
  const items = [...S.portraits].sort((a, b) => primaryIndex(a) - primaryIndex(b) || a.order - b.order)
    .filter(p => !CUR.q || (p.name + ' ' + p.descriptor).toLowerCase().includes(CUR.q.toLowerCase()));
  const importBtn = (!S.dbLive || (!S.seeded && S.source === 'built-in')) ? `<div class="cur-msg">The database ${S.dbLive ? 'is empty' : 'has not answered yet'}, so the gallery is showing its built-in collection. Your first save copies the whole collection in automatically, or <button class="btn" type="button" id="cImport" style="margin-left:8px">copy it in now</button></div>` : '';
  $('#curBody').innerHTML = head + importBtn + `
  <div class="cur-grid">
    <div class="cur-list">
      <div class="tools"><label class="sr" for="cSearch">Search portraits</label><input id="cSearch" type="text" placeholder="Search" value="${esc(CUR.q)}"><button class="btn" type="button" id="cNew">New</button></div>
      <ul>${items.map(p => `<li><button type="button" data-cid="${esc(p.id)}" aria-current="${p.id === CUR.id}"><span class="dot ${p.published ? '' : 'off'}" title="${p.published ? 'Published' : 'Draft'}"></span>${esc(p.name)}<small>${esc(ROOM[primaryRoom(p)].numeral || ROOM[primaryRoom(p)].short)}</small></button></li>`).join('')}</ul>
    </div>
    <div id="cFormWrap"></div>
  </div>`;
  renderCurForm();
}
function selectCur(id, quiet) {
  const p = id ? S.byId.get(id) : null;
  CUR.id = p ? p.id : null; CUR.draft = p ? JSON.parse(JSON.stringify(p)) : blankDraft(); CUR.confirmDel = false; CUR.status = '';
  if (!quiet) renderCurator();
}
function renderCurForm() {
  const d = CUR.draft; const w = $('#cFormWrap'); if (!w) return;
  const ta = (k, label, help = '', rows = 4) => `<div class="full"><label for="f_${k}">${label}</label><textarea id="f_${k}" data-k="${k}" rows="${rows}">${esc(d[k])}</textarea>${help ? `<div class="help">${help}</div>` : ''}</div>`;
  const tx = (k, label, req, help = '', full) => `<div class="${full ? 'full' : ''}"><label for="f_${k}">${label}${req ? ' <i>*</i>' : ''}</label><input id="f_${k}" data-k="${k}" type="text" value="${esc(d[k])}"${req ? ' aria-required="true"' : ''}>${help ? `<div class="help">${help}</div>` : ''}<div class="err" id="e_${k}" hidden></div></div>`;
  const prev = d.image || imgSrc({ ...d, id: d.id || 'draft', rooms: d.rooms.length ? d.rooms : ['pioneers'] });
  w.innerHTML = `
  <form class="cf" id="cForm" novalidate>
    <div class="full"><label>Portrait photograph</label>
      <div class="crop">
        <div class="cropbox" id="cCrop" data-orient="${d.orient}" aria-label="Click or drag to set the focal point"><img id="cPrev" src="${esc(prev)}" alt="" style="${cropStyle(d)}"><span class="fp" id="cFp" style="left:${d.focusX * 100}%;top:${d.focusY * 100}%"></span></div>
        <div>
          <input id="cFile" type="file" accept="image/jpeg,image/png,image/webp" class="sr"><label for="cFile" class="btn" style="cursor:pointer;text-transform:uppercase">Upload image</label>
          ${d.image ? `<button class="btn" type="button" id="cClearImg" style="margin-left:8px">Remove image</button>` : ''}
          <div class="help">JPEG, PNG or WebP up to 15 MB. Images are resized to 1600 px and compressed before upload. Use real, authorised photographs: never generated likenesses of real people.</div>
          <div class="err" id="e_image" ${CUR.status ? '' : 'hidden'}>${esc(CUR.status)}</div>
          <label for="cZoom" style="margin-top:16px">Crop zoom</label><input id="cZoom" type="range" min="1" max="2.5" step=".05" value="${d.zoom}" style="width:100%;accent-color:#7a5a20">
          <div class="help">Click or drag on the preview to set the focal point. The frame shows a ${d.orient === 'landscape' ? '3 : 2 landscape' : '3 : 4 portrait'} crop.</div>
        </div>
      </div></div>
    ${tx('name', 'Name of subject', true)}
    ${tx('dates', 'Dates or era', false, 'e.g. 1815–1852, or Nominated MP · 2009–2011')}
    ${tx('descriptor', 'Short descriptor (plaque)', false, '', true)}
    ${tx('identity', 'Identity', false, 'Who this person is, in one line.', true)}
    ${tx('period', 'Lifespan or period')}
    ${tx('credit', 'Image credit')}
    ${ta('opening', 'Opening statement', 'One compelling sentence.', 2)}
    ${ta('story', 'The story', 'About 150–250 words. Leave a blank line between paragraphs.', 9)}
    ${ta('moment', 'The defining moment', '', 5)}
    ${tx('asideTitle', 'Optional extra section title', false, 'e.g. A Story He Tells', true)}
    ${ta('aside', 'Optional extra section', '', 4)}
    ${ta('legacy', 'The legacy', '', 5)}
    ${ta('quote', 'Verified quote', 'Only a quote you can verify. Leave empty to omit the section.', 2)}
    ${tx('quoteBy', 'Quote attribution and source', false, '', true)}
    <fieldset class="full"><legend>Gallery rooms <i style="color:#9a3b22">*</i></legend><div class="checks">${ROOMS.map(r => `<label><input type="checkbox" data-room="${r.id}" ${d.rooms.includes(r.id) ? 'checked' : ''}>${esc(r.numeral ? r.numeral + ' · ' + r.name : r.name)}</label>`).join('')}</div><div class="err" id="e_rooms" hidden></div><div class="help">A portrait hangs in every room it is assigned to.</div></fieldset>
    <div><label for="f_orient">Frame shape</label><select id="f_orient" data-k="orient">${[['portrait', 'Portrait (3 : 4)'], ['landscape', 'Landscape (3 : 2)']].map(([v, l]) => `<option value="${v}" ${d.orient === v ? 'selected' : ''}>${l}</option>`).join('')}</select><div class="help">Use landscape for buildings, scenes and wide paintings.</div></div>
    <div><label for="f_frame">Frame style</label><select id="f_frame" data-k="frame">${[['gold', 'Antique gold'], ['bronze', 'Bronze'], ['wood', 'Carved dark wood']].map(([v, l]) => `<option value="${v}" ${d.frame === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
    <div><label for="f_order">Display order</label><input id="f_order" data-k="order" type="number" step="1" value="${esc(d.order)}"><div class="help">Lower numbers hang first in each room.</div></div>
    ${ta('alt', 'Alternative text <i>*</i>', 'Describe the image for visitors using screen readers.', 2)}<div class="err full" id="e_alt" hidden></div>
    <fieldset class="full"><legend>Status</legend><div class="checks"><label><input type="checkbox" id="f_published" ${d.published ? 'checked' : ''}>Published (visible to visitors)</label><label><input type="checkbox" id="f_demo" ${d.demo ? 'checked' : ''}>Mark as demo content</label></div></fieldset>
    <div class="acts">
      <button class="btn pri" type="submit" id="cSave">${CUR.saving ? 'Saving…' : (CUR.id ? 'Save changes' : 'Add to collection')}</button>
      <button class="btn" type="button" id="cRevert">Discard changes</button>
      ${CUR.id ? `<button class="btn dan" type="button" id="cDel">Delete</button>` : ''}
      <span id="cDelConfirm" ${CUR.confirmDel ? '' : 'hidden'} style="font:400 14px var(--ui)">Delete “${esc(d.name)}” for everyone? <button class="btn dan" type="button" id="cDelYes">Delete</button> <button class="btn" type="button" id="cDelNo">Keep</button></span>
    </div>
  </form>`;
}
function curPreviewRefresh() {
  const d = CUR.draft; const img = $('#cPrev'); if (!img) return;
  img.style.cssText = cropStyle(d); const fp = $('#cFp'); fp.style.left = d.focusX * 100 + '%'; fp.style.top = d.focusY * 100 + '%';
}
async function processUpload(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Choose a JPEG, PNG or WebP image.');
  if (file.size > 15e6) throw new Error('That file is larger than 15 MB.');
  if (!S.assets) throw new Error('Uploads need editor access to this gallery.');
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('That image could not be read.')); i.src = url; });
    const sc = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * sc); c.height = Math.round(img.naturalHeight * sc);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', .86));
    const res = await S.assets.upload(blob);
    return res;
  } finally { URL.revokeObjectURL(url); }
}
const slug = s => (s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 48) || 'portrait');
function dbBody(d) { const o = { ...d }; delete o.id; o.order = num(o.order, 50); return o; }
async function saveCur() {
  const d = CUR.draft; let bad = null;
  const err = (k, m) => { const e = $('#e_' + k); if (e) { e.textContent = m; e.hidden = !m; } if (m && !bad) bad = k; };
  err('name', d.name.trim() ? '' : 'Add the subject’s name.');
  err('rooms', d.rooms.length ? '' : 'Choose at least one room.');
  err('alt', d.alt.trim() ? '' : 'Add alternative text describing the image.');
  if (bad) { ($('#f_' + bad) || $('#cForm [data-room]'))?.focus(); return; }
  const id = CUR.id || (slug(d.name) + '-' + Math.random().toString(36).slice(2, 6));
  CUR.saving = true; const btn = $('#cSave'); btn.disabled = true; btn.textContent = 'Saving…';
  try {
    if (!S.seeded && S.source === 'built-in') await importBuiltIn(true);
    await S.db.doc('portraits/' + id).set(dbBody(d));
    if (!S.seeded) { S.seeded = true; await S.db.doc('meta/state').set({ seeded: true }); }
    CUR.id = id; toast(`Saved “${d.name}” to the collection.`);
  } catch (e) { toast(e?.code === 'invalid_argument' ? 'You don’t have permission to change the collection.' : 'Couldn’t save. Please try again.'); }
  CUR.saving = false; btn.disabled = false; btn.textContent = 'Save changes';
}
async function importBuiltIn(quiet) {
  if (!S.db) return; const b = $('#cImport'); if (b) { b.disabled = true; b.textContent = 'Copying…'; }
  try {
    for (const p of DEFAULT_PORTRAITS) { await S.db.doc('portraits/' + p.id).set(dbBody(norm(p, p.id))); }
    await S.db.doc('meta/state').set({ seeded: true }); S.seeded = true; if (!quiet) toast('The built-in collection is now in the database.');
  } catch (e) { toast('Couldn’t copy the collection. Check you are an editor.'); if (b) { b.disabled = false; b.textContent = 'Try again'; } if (quiet) throw e; }
}
$('#cur').addEventListener('input', e => {
  const t = e.target; const d = CUR.draft; if (!d) return;
  if (t.id === 'cSearch') { CUR.q = t.value; const pos = t.selectionStart; renderCurator(); const s = $('#cSearch'); s.focus(); s.setSelectionRange(pos, pos); return; }
  if (t.dataset.k) d[t.dataset.k] = t.dataset.k === 'order' ? t.value : t.value;
  if (t.id === 'cZoom') { d.zoom = +t.value; curPreviewRefresh(); }
});
$('#cur').addEventListener('change', async e => {
  const t = e.target; const d = CUR.draft; if (!d) return;
  if (t.dataset.room) { d.rooms = $$('#cForm [data-room]').filter(c => c.checked).map(c => c.dataset.room); }
  if (t.id === 'f_published') d.published = t.checked;
  if (t.id === 'f_demo') d.demo = t.checked;
  if (t.id === 'f_frame') d.frame = t.value;
  if (t.id === 'f_orient') { d.orient = t.value; renderCurForm(); }
  if (t.id === 'cFile' && t.files[0]) {
    CUR.status = 'Uploading…'; const st = $('#e_image'); st.hidden = false; st.textContent = 'Uploading…';
    try { const r = await processUpload(t.files[0]); d.image = '/_blob/' + r.id; d.imageAsset = r.id; d.focusX = .5; d.focusY = .4; d.zoom = 1; CUR.status = 'Uploaded. Set the focal point, then save.'; }
    catch (er) { CUR.status = er.message || 'Upload failed.'; }
    renderCurForm();
  }
});
$('#cur').addEventListener('click', e => {
  const t = e.target;
  const li = t.closest('[data-cid]'); if (li) { selectCur(li.dataset.cid); return; }
  if (t.id === 'cNew') { selectCur(null); $('#f_name')?.focus(); }
  if (t.id === 'cRevert') selectCur(CUR.id);
  if (t.id === 'cImport') importBuiltIn();
  if (t.id === 'cClearImg') { CUR.draft.image = ''; CUR.draft.imageAsset = ''; renderCurForm(); }
  if (t.id === 'cDel') { CUR.confirmDel = true; $('#cDelConfirm').hidden = false; $('#cDelNo').focus(); }
  if (t.id === 'cDelNo') { CUR.confirmDel = false; $('#cDelConfirm').hidden = true; }
  if (t.id === 'cDelYes') { const id = CUR.id; (S.seeded || S.source !== 'built-in' ? Promise.resolve() : importBuiltIn(true)).then(() => S.db.doc('portraits/' + id).delete()).then(() => { toast('Portrait deleted.'); CUR.draft = null; CUR.id = null; renderCurator(); }).catch(() => toast('Couldn’t delete. Check you are an editor.')); }
});
$('#cur').addEventListener('submit', e => { e.preventDefault(); if (!CUR.saving) saveCur(); });
(() => {
  let dragging = false;
  const setFp = e => { const box = $('#cCrop'); if (!box) return; const r = box.getBoundingClientRect(); CUR.draft.focusX = clamp((e.clientX - r.left) / r.width, 0, 1); CUR.draft.focusY = clamp((e.clientY - r.top) / r.height, 0, 1); curPreviewRefresh(); };
  $('#cur').addEventListener('pointerdown', e => { if (e.target.closest('#cCrop')) { dragging = true; e.target.closest('#cCrop').setPointerCapture(e.pointerId); setFp(e); } });
  $('#cur').addEventListener('pointermove', e => { if (dragging) setFp(e); });
  $('#cur').addEventListener('pointerup', () => { dragging = false; });
})();

/* ---------- database connection ---------- */
async function connectDb() {
  if (!window.claude?.use) return;
  try {
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    S.db = db; S.user = user;
    if (user) {
      try { S.editor = !!(await Promise.resolve(user.canEdit?.())); } catch { S.editor = false; }
      if (S.editor) { body.classList.add('editor'); $('#curSep').hidden = false; S.assets = await window.claude.use('assets').catch(() => null); }
    }
    if (!db) return;
    try { const m = await db.doc('meta/state').get(); S.seeded = !!(m.exists && m.data()?.seeded); } catch { }
    const timer = setTimeout(() => { if (!S.dbLive && S.panel === 'cur') renderCurator(); }, 10000);
    db.collection('portraits').onSnapshot(snap => {
      if (!snap.metadata.fromCache) { S.dbLive = true; clearTimeout(timer); }
      if (snap.empty && !S.seeded) { S.source = 'built-in'; if (S.panel === 'cur') renderCurator(); return; }
      S.source = 'db';
      setPortraits(snap.docs.map(d => norm(d.data() || {}, d.id)));
      if (S.three) T.rebuild(); else S.dirty = true;
      if (S.panel === 'cat') renderCatalogue(); if (S.panel === 'jr') renderJournal(); if (S.panel === 'map') renderMap();
      if (S.panel === 'cur') { const keep = CUR.draft; renderCurator(); if (keep) { CUR.draft = keep; } }
      if (S.story && !S.byId.get(S.story.id)) closeStory();
    }, () => { clearTimeout(timer); });
  } catch (e) { console.warn('db unavailable', e); }
}

/* =====================================================================
   3D MUSEUM
   ===================================================================== */
let THREE, T = null;
const EYE = 1.62;
async function initThree() {
  THREE = await import('three');
  const { Reflector } = await import('three/addons/objects/Reflector.js');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
  const { mergeGeometries } = await import('three/addons/utils/BufferGeometryUtils.js');
  const V3 = THREE.Vector3; const UP = new V3(0, 1, 0);

  const quality = S.mobile ? 'low' : ((navigator.hardwareConcurrency || 8) <= 4 ? 'mid' : 'high');
  const renderer = new THREE.WebGLRenderer({ antialias: quality !== 'low', powerPreference: 'high-performance' });
  if (!renderer.getContext()) throw new Error('no webgl');
  const maxDpr = quality === 'high' ? 1.75 : 1.35; let dpr = Math.min(devicePixelRatio || 1, maxDpr);
  renderer.setPixelRatio(dpr); renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0;
  $('#stage').appendChild(renderer.domElement); renderer.domElement.setAttribute('tabindex', '-1');
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); enterFlat('The 3D gallery stopped unexpectedly, so the catalogue is shown instead.'); });

  const scene = new THREE.Scene(); scene.background = new THREE.Color('#060505');
  scene.fog = new THREE.FogExp2('#0b0908', .024);
  const camera = new THREE.PerspectiveCamera(S.mobile ? 66 : 56, innerWidth / innerHeight, .05, 150); camera.rotation.order = 'YXZ';
  const pmrem = new THREE.PMREMGenerator(renderer); const env = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  /* ----- textures ----- */
  const ctex = (c, rep) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(8, maxAniso); if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; } return t; };
  const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
  function wallTex(hex) {
    const [c, g] = cv(256, 256); const R = rng(hash(hex)); const base = mix(hexRgb(hex), [255, 235, 210], .14), lt = mix(base, [255, 230, 190], .25), dk = mix(base, [0, 0, 0], .25);
    g.fillStyle = rgba(base, 1); g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 128; i++) { g.fillStyle = rgba(R() < .5 ? lt : dk, .05 + R() * .05); g.fillRect(i * 2, 0, 1, 256); }
    g.strokeStyle = rgba(lt, .16); g.lineWidth = 1.4;
    for (const [ox, oy] of [[0, 0], [128, 128], [256, 0], [0, 256], [256, 256]]) {
      g.beginPath(); g.ellipse(ox, oy, 26, 44, 0, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(ox, oy - 62); g.bezierCurveTo(ox + 34, oy - 30, ox + 34, oy + 30, ox, oy + 62); g.bezierCurveTo(ox - 34, oy + 30, ox - 34, oy - 30, ox, oy - 62); g.stroke();
    }
    g.fillStyle = rgba(lt, .14); for (const [ox, oy] of [[128, 0], [0, 128], [256, 128], [128, 256]]) { g.beginPath(); g.arc(ox, oy, 5, 0, Math.PI * 2); g.fill(); }
    for (let i = 0; i < 2600; i++) { g.fillStyle = rgba(R() < .5 ? lt : dk, .06); g.fillRect(R() * 256, R() * 256, 1, 1); }
    const t = ctex(c, true); t.repeat.set(1 / 1.7, 1 / 1.7); return t;
  }
  function wainsTex(hex) {
    const [c, g] = cv(256, 192); const base = mix(hexRgb(hex), [0, 0, 0], .32), lt = mix(base, [255, 225, 180], .22), dk = mix(base, [0, 0, 0], .45);
    g.fillStyle = rgba(base, 1); g.fillRect(0, 0, 256, 192);
    g.strokeStyle = rgba(dk, .9); g.lineWidth = 6; g.strokeRect(22, 26, 212, 140);
    g.strokeStyle = rgba(lt, .55); g.lineWidth = 2; g.strokeRect(26, 30, 204, 132);
    g.strokeStyle = rgba(lt, .25); g.lineWidth = 1; g.strokeRect(40, 44, 176, 104);
    const t = ctex(c, true); t.repeat.set(1 / 1.3, 1 / .9); t.offset.y = -.12 / .9; return t;
  }
  function floorTex(kind) {
    const [c, g] = cv(512, 512); const R = rng(hash(kind));
    if (kind === 'marble') {
      for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
        const dark = (x + y) % 2 === 1; g.fillStyle = dark ? '#1d2a24' : '#e2d6bf'; g.fillRect(x * 256, y * 256, 256, 256);
        for (let v = 0; v < 9; v++) {
          g.strokeStyle = dark ? `rgba(200,190,160,${.08 + R() * .1})` : `rgba(90,80,60,${.07 + R() * .12})`; g.lineWidth = .6 + R() * 1.8;
          g.beginPath(); let px = x * 256 + R() * 256, py = y * 256; g.moveTo(px, py);
          for (let s = 0; s < 6; s++) { px += (R() - .5) * 90; py += 44 + R() * 10; g.lineTo(px, py); } g.stroke();
        }
        g.strokeStyle = 'rgba(40,30,20,.5)'; g.lineWidth = 1.5; g.strokeRect(x * 256, y * 256, 256, 256);
      }
      g.fillStyle = '#b8964f'; for (const [x, y] of [[0, 0], [256, 0], [0, 256], [256, 256], [512, 0], [0, 512], [512, 512], [256, 512], [512, 256]]) { g.save(); g.translate(x, y); g.rotate(Math.PI / 4); g.fillRect(-9, -9, 18, 18); g.restore(); }
    } else if (kind === 'tile') {
      const T = 128, cols = [['#e9dcc0', '#2f6b5e', '#c8524a', '#e2b54c'], ['#efe3c8', '#2a5f73', '#d07a8a', '#d9a441']];
      for (let ty = 0; ty < 4; ty++) for (let tx = 0; tx < 4; tx++) {
        const [bg, a, b, c2] = cols[(tx + ty) % 2], x0 = tx * T, y0 = ty * T, cx = x0 + T / 2, cy = y0 + T / 2;
        g.fillStyle = bg; g.fillRect(x0, y0, T, T);
        g.fillStyle = a; for (const [qx, qy] of [[x0, y0], [x0 + T, y0], [x0, y0 + T], [x0 + T, y0 + T]]) { g.beginPath(); g.arc(qx, qy, T * .3, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = b; for (let i = 0; i < 4; i++) { g.save(); g.translate(cx, cy); g.rotate(i * Math.PI / 2 + Math.PI / 4); g.beginPath(); g.ellipse(0, -T * .2, T * .09, T * .17, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
        g.fillStyle = c2; g.beginPath(); g.arc(cx, cy, T * .08, 0, Math.PI * 2); g.fill();
        g.strokeStyle = a; g.lineWidth = 3; g.strokeRect(x0 + 6, y0 + 6, T - 12, T - 12);
        g.strokeStyle = 'rgba(40,30,20,.45)'; g.lineWidth = 2; g.strokeRect(x0, y0, T, T);
      }
      for (let i = 0; i < 2200; i++) { g.fillStyle = `rgba(${R() < .5 ? '255,255,255' : '40,30,20'},${R() * .05})`; g.fillRect(R() * 512, R() * 512, 2, 2); }
    } else {
      const tones = kind === 'walnut' ? [[70, 44, 28], [82, 53, 34], [62, 39, 24], [76, 48, 30]] : kind === 'ebony' ? [[30, 22, 17], [38, 28, 21], [26, 19, 15], [34, 25, 19]] : [[118, 82, 48], [131, 92, 55], [106, 73, 42], [124, 87, 51]];
      const n = 6, bw = 512 / n;
      for (let b = 0; b < n; b++) {
        let y = -R() * 300;
        while (y < 512) {
          const len = 180 + R() * 260, tn = tones[Math.floor(R() * tones.length)], j = (R() - .5) * 10;
          const x0 = b * bw;
          const gr = g.createLinearGradient(x0, 0, x0 + bw, 0);
          gr.addColorStop(0, `rgb(${tn[0] + j - 6},${tn[1] + j - 5},${tn[2] + j - 4})`); gr.addColorStop(.5, `rgb(${tn[0] + j + 6},${tn[1] + j + 4},${tn[2] + j + 3})`); gr.addColorStop(1, `rgb(${tn[0] + j - 6},${tn[1] + j - 5},${tn[2] + j - 4})`);
          g.fillStyle = gr; g.fillRect(x0, y, bw, len);
          for (let l = 0; l < 7; l++) { const gx = x0 + 6 + R() * (bw - 12); g.strokeStyle = `rgba(${R() < .5 ? '255,225,180' : '30,18,8'},${.05 + R() * .06})`; g.lineWidth = .6 + R() * 1.2; g.beginPath(); g.moveTo(gx, y); g.bezierCurveTo(gx + (R() - .5) * 8, y + len * .33, gx + (R() - .5) * 8, y + len * .66, gx + (R() - .5) * 6, y + len); g.stroke(); }
          g.fillStyle = 'rgba(10,6,3,.55)'; g.fillRect(x0, y, bw, 2);
          y += len;
        }
        g.fillStyle = 'rgba(10,6,3,.6)'; g.fillRect(b * bw, 0, 2, 512);
      }
    }
    const t = ctex(c, true); return t;
  }
  function ceilTex(hex) {
    const [c, g] = cv(256, 256); const base = mix(hexRgb(hex), [10, 8, 7], .55), lt = mix(base, [255, 230, 190], .14);
    g.fillStyle = rgba(base, 1); g.fillRect(0, 0, 256, 256); g.strokeStyle = rgba(lt, .6); g.lineWidth = 8; g.strokeRect(0, 0, 256, 256);
    g.strokeStyle = rgba(mix(base, [0, 0, 0], .4), .9); g.lineWidth = 3; g.strokeRect(18, 18, 220, 220);
    g.fillStyle = rgba(lt, .35); g.beginPath(); g.arc(128, 128, 14, 0, Math.PI * 2); g.fill();
    const t = ctex(c, true); t.repeat.set(1 / 2.4, 1 / 2.4); return t;
  }
  function radialTex(kind) {
    const [c, g] = cv(256, 256);
    if (kind === 'pool') { const gr = g.createRadialGradient(128, 104, 4, 128, 118, 128); gr.addColorStop(0, 'rgba(255,226,170,1)'); gr.addColorStop(.35, 'rgba(255,205,140,.55)'); gr.addColorStop(.7, 'rgba(255,190,120,.14)'); gr.addColorStop(1, 'rgba(255,180,110,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }
    else { g.shadowColor = kind === 'glow' ? 'rgba(255,214,140,1)' : 'rgba(0,0,0,1)'; g.shadowBlur = kind === 'glow' ? 26 : 34; g.shadowOffsetX = 1000; g.fillStyle = '#000'; g.fillRect(-1000 + 40, 40, 176, 176); }
    const t = new THREE.CanvasTexture(c); return t;
  }
  function textTex(text, { w = 1024, h = 128, size = 62, color = '#c4a46a', sp = 18, font = 'Cinzel' } = {}) {
    const [c, g] = cv(w, h); g.fillStyle = color; g.font = `500 ${size}px ${font}, Georgia, serif`; g.textBaseline = 'middle';
    drawSpaced(g, text, w / 2, h / 2 + 4, sp, w * .94); const t = ctex(c); return t;
  }
  function plaqueTex(p) {
    const [c, g] = cv(512, 184);
    const gr = g.createLinearGradient(0, 0, 512, 184); gr.addColorStop(0, '#8d7040'); gr.addColorStop(.45, '#d8bd80'); gr.addColorStop(.6, '#b99a5c'); gr.addColorStop(1, '#7a5f33');
    g.fillStyle = gr; g.fillRect(0, 0, 512, 184);
    g.strokeStyle = 'rgba(60,40,15,.7)'; g.lineWidth = 4; g.strokeRect(8, 8, 496, 168); g.strokeStyle = 'rgba(255,240,200,.45)'; g.lineWidth = 1.5; g.strokeRect(14, 14, 484, 156);
    const eng = (txt, y, font, sp) => { g.font = font; g.fillStyle = 'rgba(255,240,205,.5)'; drawSpaced(g, txt, 256, y + 1.5, sp, 440); g.font = font; g.fillStyle = '#2e2010'; drawSpaced(g, txt, 256, y, sp, 440); };
    g.textBaseline = 'middle';
    eng(p.name.toUpperCase(), 58, '600 34px Cinzel, Georgia, serif', 5);
    if (p.dates) eng(p.dates, 100, '500 22px Inter, sans-serif', 2);
    if (p.descriptor) eng(p.descriptor, 138, 'italic 500 27px "Cormorant Garamond", Georgia, serif', .5);
    return ctex(c);
  }
  const TEX = { pool: radialTex('pool'), glow: radialTex('glow'), shadow: radialTex('shadow') };

  /* ----- materials ----- */
  const matCache = {};
  const mat = (key, make) => matCache[key] || (matCache[key] = make());
  const trimMat = mat('trim', () => new THREE.MeshStandardMaterial({ color: '#9b7b45', metalness: .75, roughness: .4, envMap: env, envMapIntensity: .6 }));
  const baseMat = mat('base', () => new THREE.MeshStandardMaterial({ color: '#1a110b', roughness: .6 }));
  const stoneMat = mat('stone', () => new THREE.MeshStandardMaterial({ color: '#a8997c', roughness: .42, envMap: env, envMapIntensity: .3 }));
  const lampMat = mat('lamp', () => new THREE.MeshStandardMaterial({ color: '#b08d50', metalness: .85, roughness: .3, envMap: env, envMapIntensity: .8, emissive: '#ffcf8a', emissiveIntensity: .0 }));
  const roomMats = {};
  ROOMS.forEach(r => {
    roomMats[r.id] = {
      wall: new THREE.MeshStandardMaterial({ map: wallTex(r.wall), roughness: .93 }),
      wains: new THREE.MeshStandardMaterial({ map: wainsTex(r.wall), roughness: .7 }),
      ceil: new THREE.MeshStandardMaterial({ map: ceilTex(r.wall), roughness: .95 }),
      floorT: floorTex(r.floor)
    };
  });
  const frameMats = {
    gold: new THREE.MeshStandardMaterial({ color: '#b8914a', metalness: .9, roughness: .32, envMap: env, envMapIntensity: 1.1 }),
    bronze: new THREE.MeshStandardMaterial({ color: '#7e5328', metalness: .85, roughness: .42, envMap: env, envMapIntensity: .9 }),
    wood: new THREE.MeshStandardMaterial({ color: '#2a170c', metalness: .1, roughness: .5, envMap: env, envMapIntensity: .4 })
  };
  const lipMats = { gold: frameMats.gold, bronze: frameMats.gold, wood: frameMats.gold };
  const linenMat = new THREE.MeshStandardMaterial({ color: '#e6dcc4', roughness: .95 });
  const hitMat = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, transparent: true, opacity: 0 });
  const revealMats = [new THREE.MeshBasicMaterial({ visible: false }), stoneMat];

  /* ----- architecture batching ----- */
  const batches = new Map();
  const add = (m, geo) => { const g = geo.index ? geo.toNonIndexed() : geo; if (!batches.has(m)) batches.set(m, []); batches.get(m).push(g); };
  const arch = new THREE.Group(); scene.add(arch);
  function flush() {
    for (const [m, list] of batches) {
      for (const g of list) { for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k); g.clearGroups(); }
      const merged = mergeGeometries(list, false); if (merged) arch.add(new THREE.Mesh(merged, m));
    }
    batches.clear();
  }
  function wallBasis(C, n, L) { const u = new V3().crossVectors(UP, n).normalize(); const A = C.clone().addScaledVector(u, -L / 2); const m = new THREE.Matrix4().makeBasis(u, UP.clone(), n.clone()).setPosition(A); return { m, u, A }; }
  function uShape(L, H, ops, y0 = 0) {
    const s = new THREE.Shape(); s.moveTo(0, y0);
    for (const o of [...ops].sort((a, b) => a.c - b.c)) { s.lineTo(o.c - o.w / 2, y0); s.lineTo(o.c - o.w / 2, o.h); if (o.arch) s.absarc(o.c, o.h, o.w / 2, Math.PI, 0, true); else s.lineTo(o.c + o.w / 2, o.h); s.lineTo(o.c + o.w / 2, y0); }
    s.lineTo(L, y0); s.lineTo(L, H); s.lineTo(0, H); s.closePath(); return s;
  }
  const segs = (L, ops, pad = 0) => { const out = []; let a = 0; for (const o of [...ops].sort((p, q) => p.c - q.c)) { const b = o.c - o.w / 2 - pad; if (b > a + .05) out.push([a, b]); a = o.c + o.w / 2 + pad; } if (L > a + .05) out.push([a, L]); return out; };
  function boxAt(m, cx, cy, cz, w, h, d) { const g = new THREE.BoxGeometry(w, h, d); g.translate(cx, cy, cz); g.applyMatrix4(m); return g; }
  function wall(roomId, C, n, L, H, ops = []) {
    const { m } = wallBasis(C, n, L); const rm = roomMats[roomId];
    const g = new THREE.ShapeGeometry(uShape(L, H, ops), 20); g.applyMatrix4(m); add(rm.wall, g);
    for (const [a, b] of segs(L, ops, .32)) {
      const ws = new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(a, .14), new THREE.Vector2(b, .14), new THREE.Vector2(b, 1.0), new THREE.Vector2(a, 1.0)]));
      ws.translate(0, 0, .012); ws.applyMatrix4(m); add(rm.wains, ws);
      add(baseMat, boxAt(m, (a + b) / 2, .08, .03, b - a, .16, .06));
      add(trimMat, boxAt(m, (a + b) / 2, 1.02, .03, b - a, .05, .06));
    }
    add(trimMat, boxAt(m, L / 2, H - .14, .05, L, .12, .1));
    add(rm.wall, boxAt(m, L / 2, H - .32, .03, L, .2, .06));
    for (const o of ops) {
      if (o.secret) continue;
      for (const sx of [-1, 1]) {
        const x = o.c + sx * (o.w / 2 + .16);
        add(stoneMat, boxAt(m, x, (o.h) / 2, .05, .32, o.h, .1));
        add(stoneMat, boxAt(m, x, o.h + .08, .07, .44, .16, .14));
      }
      if (o.arch) {
        const tor = new THREE.TorusGeometry(o.w / 2 + .14, .07, 8, 40, Math.PI); tor.translate(o.c, o.h, .06); tor.applyMatrix4(m); add(trimMat, tor);
        add(stoneMat, boxAt(m, o.c, o.h + o.w / 2 + .2, .08, .34, .44, .16));
      }
    }
    return m;
  }
  function reveal(d) {
    const ops = [{ c: d.w / 2 + .6, w: d.w, h: d.secret ? SECRET_DOOR.h : d.spring, arch: !d.secret }];
    const top = d.secret ? SECRET_DOOR.h + .4 : d.spring + d.w / 2 + .4;
    const shape = uShape(d.w + 1.2, top, ops);
    const g = new THREE.ExtrudeGeometry(shape, { depth: d.secret ? .3 : .3, bevelEnabled: false, curveSegments: 24 });
    const n = d.axis === 'z' ? new V3(0, 0, 1) : new V3(-1, 0, 0);
    const C = d.axis === 'z' ? new V3(d.x, 0, d.z - .15) : new V3(7.3, 0, d.z);
    const { m } = wallBasis(C, n, d.w + 1.2); g.applyMatrix4(m);
    const mesh = new THREE.Mesh(g, d.secret ? [revealMats[0], roomMats.secret.wall] : revealMats); arch.add(mesh);
  }
  const ceilLights = [];
  function roomShell(id) {
    const r = RECT[id]; const w = r.x1 - r.x0, dp = r.z0 - r.z1, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, H = r.h; const rm = roomMats[id];
    // floor
    const ft = rm.floorT.clone(); ft.needsUpdate = true; const tile = ROOM[id].floor === 'tile', tw = id === 'foyer' || tile ? 2.4 : 1.2, td = 2.4; ft.repeat.set(w / tw, dp / td); ft.wrapS = ft.wrapT = THREE.RepeatWrapping;
    const fm = new THREE.MeshStandardMaterial({ map: ft, roughness: id === 'foyer' ? .22 : .36, metalness: 0, envMap: env, envMapIntensity: .35, transparent: T_reflect, opacity: T_reflect ? .84 : 1 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(w, dp), fm); floor.rotation.x = -Math.PI / 2; floor.position.set(cx, 0, cz); floor.userData.floor = true; arch.add(floor); floors.push(floor);
    // ceiling
    const cg = new THREE.PlaneGeometry(w, dp); cg.rotateX(Math.PI / 2); cg.translate(cx, H, cz);
    const uv = cg.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w, uv.getY(i) * dp);
    add(rm.ceil, cg);
    // skylight lantern
    const sw = Math.min(w * .42, 6), sd = Math.min(dp * .5, 8);
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(sw, sd), skyMat); sky.rotation.x = Math.PI / 2; sky.position.set(cx, H - .02, cz); arch.add(sky);
    for (const [dx, dz, ww, dd] of [[0, sd / 2, sw + .3, .16], [0, -sd / 2, sw + .3, .16], [sw / 2, 0, .16, sd], [-sw / 2, 0, .16, sd]]) { const b = new THREE.BoxGeometry(ww, .22, dd); b.translate(cx + dx, H - .11, cz + dz); add(trimMat, b); }
    const L = new THREE.PointLight('#ffd7a3', id === 'foyer' ? 70 : id === 'secret' ? 18 : 52, 0, 1.6); L.position.set(cx, H - 1.6, cz); scene.add(L); ceilLights.push(L);
  }
  const floors = [];
  const T_reflect = quality === 'high';
  const skyMat = new THREE.MeshBasicMaterial({ color: '#f3dfb8', toneMapped: true, fog: false });
  (() => { // skylight texture: mullions
    const [c, g] = cv(256, 256); const gr = g.createRadialGradient(128, 128, 10, 128, 128, 180); gr.addColorStop(0, '#fff3da'); gr.addColorStop(1, '#c9a978'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = 'rgba(70,50,25,.85)'; g.lineWidth = 4; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, 256); g.stroke(); g.beginPath(); g.moveTo(0, i * 64); g.lineTo(256, i * 64); g.stroke(); }
    skyMat.map = ctex(c); skyMat.color.set('#c9b48e');
  })();

  // ---- build rooms ----
  ROOMS.forEach(r => roomShell(r.id));
  const zN = new V3(0, 0, 1), zS = new V3(0, 0, -1), xE = new V3(1, 0, 0), xW = new V3(-1, 0, 0);
  // foyer
  wall('foyer', new V3(0, 0, -.0), zS, 18, 9);
  wall('foyer', new V3(-9, 0, -8), xE, 16, 9);
  wall('foyer', new V3(9, 0, -8), xW, 16, 9);
  const grand = DOORS[0];
  wall('foyer', new V3(0, 0, -15.85), zN, 18, 9, [{ c: 9, w: grand.w, h: grand.spring, arch: true }]);
  // galleries
  const gal = ['pioneers', 'gamechangers', 'heroes', 'monuments', 'beautiful', 'peranakan'];
  gal.forEach((id, k) => {
    const r = RECT[id]; const H = r.h; const z0 = r.z0, z1 = r.z1, cz = (z0 + z1) / 2;
    wall(id, new V3(0, 0, z0 - .15), zS, 14, H, [{ c: 7, w: DOORS[k].w, h: DOORS[k].spring, arch: true }]);
    if (k < gal.length - 1) wall(id, new V3(0, 0, z1 + .15), zN, 14, H, [{ c: 7, w: DOORS[k + 1].w, h: DOORS[k + 1].spring, arch: true }]);
    else wall(id, new V3(0, 0, z1 + .02), zN, 14, H);
    wall(id, new V3(-7, 0, cz), xE, 18, H);
    if (id === 'heroes') wall(id, new V3(7, 0, cz), xW, 18, H, [{ c: 9 + (SECRET_DOOR.z - cz), w: SECRET_DOOR.w, h: SECRET_DOOR.h, secret: true }]);
    else wall(id, new V3(7, 0, cz), xW, 18, H);
  });
  // secret cabinet
  { const r = RECT.secret, cz = (r.z0 + r.z1) / 2, H = r.h;
    wall('secret', new V3(r.x0, 0, cz), xE, 10, H, [{ c: 5 - (SECRET_DOOR.z - cz), w: SECRET_DOOR.w, h: SECRET_DOOR.h, secret: true }]);
    wall('secret', new V3(r.x1, 0, cz), xW, 10, H);
    wall('secret', new V3((r.x0 + r.x1) / 2, 0, r.z0), zS, r.x1 - r.x0, H);
    wall('secret', new V3((r.x0 + r.x1) / 2, 0, r.z1), zN, r.x1 - r.x0, H);
  }
  DOORS.forEach(reveal);
  // foyer columns
  for (const [x, z] of [[-3.6, -14.6], [3.6, -14.6], [-6.6, -1.6], [6.6, -1.6]]) {
    const c = new THREE.CylinderGeometry(.34, .4, 7.6, 28); c.translate(x, 4.1, z); add(stoneMat, c);
    add(stoneMat, (() => { const b = new THREE.BoxGeometry(1, .3, 1); b.translate(x, .15, z); return b; })());
    add(trimMat, (() => { const b = new THREE.BoxGeometry(.98, .4, .98); b.translate(x, 8.1, z); return b; })());
  }
  flush();

  // inscriptions
  const insc = (text, pos, rotY, w = 6, size = 62) => { const t = textTex(text, { size }); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 8), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false, opacity: .82, color: '#d9bd85' })); m.position.copy(pos); m.rotation.y = rotY; m.raycast = () => { }; arch.add(m); };
  insc(`ROOM I · ${ROOM.pioneers.name.toUpperCase()}`, new V3(0, 6.6, -15.82), 0, 7);
  insc('THE PORTRAIT GALLERY', new V3(0, 6.2, -.03), Math.PI, 9);
  insc('THE GRAND FOYER', new V3(0, 5.9, -16.18), Math.PI, 5);
  gal.forEach((id, k) => {
    const r = RECT[id];
    if (k < gal.length - 1) { const nx = ROOM[gal[k + 1]]; insc(`ROOM ${nx.numeral} · ${nx.name.toUpperCase()}`, new V3(0, 6.0, r.z1 + .18), 0, nx.name.length > 22 ? 9 : 6.5); }
    if (k > 0) { const pv = ROOM[gal[k - 1]]; insc(`ROOM ${pv.numeral} · ${pv.name.toUpperCase()}`, new V3(0, 6.0, r.z0 - .18), Math.PI, pv.name.length > 22 ? 9 : 6.5); }
  });

  // grand doors + fanlight
  const doorTex = (() => { const [c, g] = cv(256, 440); g.fillStyle = '#2a170c'; g.fillRect(0, 0, 256, 440); const R = rng(9);
    for (let i = 0; i < 80; i++) { g.strokeStyle = `rgba(${R() < .5 ? '70,40,20' : '15,8,4'},.35)`; g.beginPath(); const x = R() * 256; g.moveTo(x, 0); g.lineTo(x + (R() - .5) * 8, 440); g.stroke(); }
    g.strokeStyle = '#b8914a'; g.lineWidth = 4; g.strokeRect(26, 26, 204, 170); g.strokeRect(26, 226, 204, 188);
    g.lineWidth = 1.5; g.strokeRect(40, 40, 176, 142); g.strokeRect(40, 240, 176, 160);
    g.fillStyle = '#c4a46a'; g.beginPath(); g.arc(214, 214, 8, 0, Math.PI * 2); g.fill(); return ctex(c); })();
  const doorMat = new THREE.MeshStandardMaterial({ map: doorTex, roughness: .55, metalness: .1, envMap: env, envMapIntensity: .3 });
  const leaves = [];
  for (const s of [-1, 1]) {
    const piv = new THREE.Group(); piv.position.set(s * grand.w / 2, 0, -16); scene.add(piv);
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(grand.w / 2 - .02, grand.spring, .1), doorMat);
    leaf.position.set(-s * (grand.w / 4), grand.spring / 2, 0); if (s > 0) leaf.scale.x = -1; piv.add(leaf); leaves.push({ piv, s });
  }
  const fan = new THREE.Mesh(new THREE.CircleGeometry(grand.w / 2, 40, 0, Math.PI), new THREE.MeshBasicMaterial({ color: '#ffe2ae', transparent: true, opacity: .5, side: THREE.DoubleSide, toneMapped: false, fog: false }));
  fan.position.set(0, grand.spring, -16); scene.add(fan);
  let doorOpen = 0, doorTarget = 0;

  // secret door (pocket panel)
  const secretPanel = new THREE.Group(); scene.add(secretPanel);
  { const pm = new THREE.Mesh(new THREE.BoxGeometry(.06, SECRET_DOOR.h, SECRET_DOOR.w), roomMats.heroes.wall); pm.position.set(SECRET_DOOR.x, SECRET_DOOR.h / 2, SECRET_DOOR.z); secretPanel.add(pm); pm.userData.secret = true;
    const seam = new THREE.Mesh(new THREE.BoxGeometry(.02, SECRET_DOOR.h, .015), trimMat); seam.position.set(SECRET_DOOR.x - .04, SECRET_DOOR.h / 2, SECRET_DOOR.z - SECRET_DOOR.w / 2 + .02); secretPanel.add(seam);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(.03, 12, 8), trimMat); knob.position.set(SECRET_DOOR.x - .05, 1.05, SECRET_DOOR.z + SECRET_DOOR.w / 2 - .14); secretPanel.add(knob);
  }
  { const fp = new THREE.Mesh(new THREE.PlaneGeometry(.5, SECRET_DOOR.w + .2), floors[ROOM.heroes.index].material); fp.rotation.x = -Math.PI / 2; fp.position.set(7.15, .001, SECRET_DOOR.z); fp.userData.floor = true; arch.add(fp); floors.push(fp); }
  const leak = new THREE.Mesh(new THREE.PlaneGeometry(SECRET_DOOR.w - .1, .05), new THREE.MeshBasicMaterial({ color: '#ffd28a', transparent: true, opacity: .55, toneMapped: false }));
  leak.rotation.y = -Math.PI / 2; leak.position.set(6.98, .025, SECRET_DOOR.z); scene.add(leak);
  const secretHit = new THREE.Mesh(new THREE.BoxGeometry(.3, SECRET_DOOR.h, SECRET_DOOR.w), hitMat); secretHit.position.set(7.0, SECRET_DOOR.h / 2, SECRET_DOOR.z); secretHit.userData.secretDoor = true; scene.add(secretHit);
  let secretOpen = 0, secretTarget = 0;

  // reflections
  let mirror = null;
  if (T_reflect) {
    mirror = new Reflector(new THREE.PlaneGeometry(40, 130), { textureWidth: innerWidth * dpr * .5, textureHeight: innerHeight * dpr * .5, color: 0x6a6a6a, clipBias: .003 });
    mirror.rotation.x = -Math.PI / 2; mirror.position.set(3, -.004, -52); scene.add(mirror);
  }
  scene.add(new THREE.HemisphereLight('#ffe6c4', '#2b1a10', .55));

  /* ----- portraits ----- */
  let tagElReady = false;
  const geoCache = {};
  function frameGeos(size, orient = 'portrait') {
    const gk = size + orient; if (geoCache[gk]) return geoCache[gk];
    const land = orient === 'landscape';
    const iw = land ? (size === 'L' ? 1.95 : 1.65) : (size === 'L' ? 1.2 : .9), ih = land ? iw * 2 / 3 : iw * 4 / 3, k = (land ? ih : iw) / .9, mt = .085 * Math.min(k, 1.25), fw = .12 * Math.min(k, 1.25);
    const ow = iw + 2 * mt, oh = ih + 2 * mt, FW = ow + 2 * fw, FH = oh + 2 * fw;
    const rect = (w, h) => { const s = new THREE.Shape(); s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2); s.closePath(); return s; };
    const holed = (w, h, hw, hh) => { const s = rect(w, h); const p = new THREE.Path(); p.moveTo(-hw / 2, -hh / 2); p.lineTo(-hw / 2, hh / 2); p.lineTo(hw / 2, hh / 2); p.lineTo(hw / 2, -hh / 2); p.closePath(); s.holes.push(p); return s; };
    const frame = new THREE.ExtrudeGeometry(holed(FW - .06, FH - .06, ow + .06, oh + .06), { depth: .05, bevelEnabled: true, bevelThickness: .03, bevelSize: .03, bevelSegments: 3, curveSegments: 4 }); frame.translate(0, 0, .03);
    const outer = new THREE.ExtrudeGeometry(holed(FW, FH, FW - .07, FH - .07), { depth: .03, bevelEnabled: true, bevelThickness: .012, bevelSize: .012, bevelSegments: 2 }); outer.translate(0, 0, .012);
    const lip = new THREE.ExtrudeGeometry(holed(iw + .035, ih + .035, iw, ih), { depth: .012, bevelEnabled: false }); lip.translate(0, 0, .024);
    const matG = new THREE.PlaneGeometry(ow, oh); matG.translate(0, 0, .02);
    const img = new THREE.PlaneGeometry(iw, ih); img.translate(0, 0, .027);
    const shadow = new THREE.PlaneGeometry(FW + .7, FH + .8); shadow.translate(0, -.13, .003);
    const glow = new THREE.PlaneGeometry(FW + .5, FH + .5); glow.translate(0, 0, .005);
    const pool = new THREE.PlaneGeometry(FW + 2.6, FH + 3.2); pool.translate(0, .45, .007);
    const hit = new THREE.BoxGeometry(FW, FH + .6, .25); hit.translate(0, -.22, .1);
    const plaque = new THREE.PlaneGeometry(.46, .165);
    const bar = new THREE.CylinderGeometry(.028, .028, FW * .55, 16); bar.rotateZ(Math.PI / 2); bar.translate(0, FH / 2 + .16, .3);
    const arm = new THREE.CylinderGeometry(.011, .011, .3, 8); arm.rotateX(Math.PI / 2); arm.translate(0, FH / 2 + .16, .15);
    const plate = new THREE.BoxGeometry(.12, .08, .02); plate.translate(0, FH / 2 + .16, .01);
    const lampG = mergeGeometries([bar, arm, plate].map(g => g.index ? g.toNonIndexed() : g));
    return geoCache[gk] = { iw, ih, FW, FH, frame, outer, lip, matG, img, shadow, glow, pool, hit, plaque, lampG };
  }
  const texCache = new Map();
  function portraitTexture(p) {
    const key = p.id + '|' + p.image + '|' + p.rooms[0];
    if (texCache.has(key)) return texCache.get(key);
    const entry = { tex: null, aspect: .75, ready: false, waiters: [] };
    texCache.set(key, entry);
    const finish = (img, aspect) => { const t = new THREE.Texture(img); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(8, maxAniso); t.needsUpdate = true; entry.tex = t; entry.aspect = aspect; entry.ready = true; entry.waiters.forEach(f => f()); entry.waiters = []; };
    if (p.image) {
      const im = new Image(); im.decoding = 'async';
      im.onload = () => finish(im, im.naturalWidth / im.naturalHeight);
      im.onerror = () => { const c = paintPlaceholder(p); finish(c, .75); };
      im.src = p.image;
    } else { requestAnimationFrame(() => finish(paintPlaceholder(p), .75)); }
    return entry;
  }
  function applyCrop(tex, aspect, p) {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    const A = p.orient === 'landscape' ? 1.5 : .75;
    let fx = 1, fy = 1; if (aspect > A) fx = A / aspect; else fy = aspect / A;
    fx /= p.zoom; fy /= p.zoom;
    tex.repeat.set(fx, fy);
    tex.offset.set(clamp(p.focusX - fx / 2, 0, 1 - fx), clamp((1 - p.focusY) - fy / 2, 0, 1 - fy));
  }
  const portraitsGroup = new THREE.Group(); scene.add(portraitsGroup);
  let insts = [], hits = [], seq = [];
  const blankImg = new THREE.MeshBasicMaterial({ color: '#2a2420', toneMapped: false });
  function makeInst(p, room, center, n, size) {
    const G = frameGeos(size, p.orient); const g = new THREE.Group();
    const u = new V3().crossVectors(UP, n).normalize();
    g.matrixAutoUpdate = true; g.position.copy(center); g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(u, UP, n));
    const artG = new THREE.Group(); g.add(artG);
    artG.add(new THREE.Mesh(G.frame, frameMats[p.frame]));
    artG.add(new THREE.Mesh(G.outer, p.frame === 'wood' ? frameMats.gold : frameMats[p.frame]));
    artG.add(new THREE.Mesh(G.lip, lipMats[p.frame]));
    artG.add(new THREE.Mesh(G.matG, linenMat));
    const imgMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(.5, .5, .5), toneMapped: false, map: null });
    const imgMesh = new THREE.Mesh(G.img, blankImg); artG.add(imgMesh);
    const shadow = new THREE.Mesh(G.shadow, new THREE.MeshBasicMaterial({ map: TEX.shadow, transparent: true, opacity: .62, depthWrite: false, color: '#000' })); g.add(shadow);
    const glowMat = new THREE.MeshBasicMaterial({ map: TEX.glow, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, color: '#ffcf86', toneMapped: false });
    g.add(new THREE.Mesh(G.glow, glowMat));
    const poolMat = new THREE.MeshBasicMaterial({ map: TEX.pool, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending, color: '#ffcf96', fog: false });
    const pool = new THREE.Mesh(G.pool, poolMat); pool.renderOrder = 1; g.add(pool);
    const plaqueMat = new THREE.MeshStandardMaterial({ map: plaqueTex(p), metalness: .55, roughness: .35, envMap: env, envMapIntensity: .7, emissive: '#ffffff', emissiveIntensity: .08 });
    plaqueMat.emissiveMap = plaqueMat.map;
    const plaque = new THREE.Mesh(G.plaque, plaqueMat); plaque.position.set(0, -G.FH / 2 - .24, .012); g.add(plaque);
    const lampM = lampMat.clone(); g.add(new THREE.Mesh(G.lampG, lampM));
    const hit = new THREE.Mesh(G.hit, hitMat); g.add(hit);
    portraitsGroup.add(g); g.updateMatrixWorld(true);
    const inst = { p, room, center: center.clone(), n: n.clone(), u, size, G, group: g, art: artG, imgMesh, imgMat, glowMat, poolMat, plaqueMat, lampM, hover: 0, near: 0, tex: null, wanted: false, ht: 0 };
    hit.userData.inst = inst; hits.push(hit);
    return inst;
  }
  function wantTexture(inst) {
    if (inst.wanted) return; inst.wanted = true;
    const e = portraitTexture(inst.p);
    const apply = () => { const t = e.tex.clone(); t.needsUpdate = true; applyCrop(t, e.aspect, inst.p); inst.imgMat.map = t; inst.imgMat.needsUpdate = true; inst.imgMesh.material = inst.imgMat; inst.tex = t; };
    if (e.ready) apply(); else e.waiters.push(apply);
  }
  const nicheMat = new THREE.MeshStandardMaterial({ color: '#241015', roughness: .95 });
  let niches = [];
  function slotPositions(room, k) {
    const r = RECT[room]; const out = [];
    if (room === 'secret') {
      const cz = (r.z0 + r.z1) / 2, cx = (r.x0 + r.x1) / 2;
      const spots = [[new V3(r.x1, 0, cz), xW], [new V3(cx, 0, r.z0), zS], [new V3(cx, 0, r.z1), zN], [new V3(r.x1, 0, cz - 2.8), xW], [new V3(r.x1, 0, cz + 2.8), xW]];
      for (let i = 0; i < k; i++) { const [c, n] = spots[i % spots.length]; out.push({ c: c.clone(), n, size: 'S' }); }
      return out;
    }
    let list = k, end = null;
    if (room === gal[gal.length - 1] && k > 0) { end = { c: new V3(0, 0, r.z1 + .02), n: zN, size: 'L' }; list = k - 1; }
    const left = Math.ceil(list / 2), right = list - left;
    const edge = left >= 8 ? .7 : left >= 6 ? 1.2 : left >= 5 ? 1.8 : 3.2; // crowded rooms use more of the wall
    const span = room === 'foyer' ? [-4.2, -11.8] : [r.z0 - edge, r.z1 + edge];
    const sideSize = room === 'foyer' ? 'L' : 'S';
    const place = (cnt, x, n, avoidDoor) => {
      if (cnt >= 9) { // salon hang: two staggered tiers for very full walls
        const lo = Math.ceil(cnt / 2), hi = cnt - lo, a = r.z0 - 1.2, b = r.z1 + 1.2, tier = [];
        for (let i = 0; i < lo; i++) tier.push({ z: a + (b - a) * (i + .5) / lo, y: 1.62 });
        for (let i = 0; i < hi; i++) tier.push({ z: a + (b - a) * (i + 1) / lo, y: 3.72 });
        tier.sort((u, v) => v.z - u.z).forEach(t => out.push({ c: new V3(x, 0, t.z), n, size: sideSize, y: t.y }));
        return;
      }
      let slots = cnt; if (avoidDoor && cnt % 2 === 1) slots = cnt + 1;
      const zs = []; for (let i = 0; i < slots; i++) zs.push(span[0] + (span[1] - span[0]) * (i + .5) / slots);
      let use = zs; if (avoidDoor && slots !== cnt) { let bi = 0; zs.forEach((z, i) => { if (Math.abs(z - SECRET_DOOR.z) < Math.abs(zs[bi] - SECRET_DOOR.z)) bi = i; }); use = zs.filter((_, i) => i !== bi); }
      use.forEach(z => out.push({ c: new V3(x, 0, z), n, size: sideSize }));
    };
    const wx = room === 'foyer' ? 9 : 7;
    // interleave so order alternates left / right along the walk
    const L = [], Rr = []; out.length = 0;
    place(left, -wx, xE, false); L.push(...out.splice(0));
    place(right, wx, xW, room === 'heroes'); Rr.push(...out.splice(0));
    const merged = []; for (let i = 0; i < Math.max(L.length, Rr.length); i++) { if (L[i]) merged.push(L[i]); if (Rr[i]) merged.push(Rr[i]); }
    if (end) merged.push(end);
    return merged;
  }
  function buildPortraits() {
    // dispose
    insts.forEach(i => { i.plaqueMat.map?.dispose(); i.plaqueMat.dispose(); i.imgMat.dispose(); i.tex?.dispose(); i.glowMat.dispose(); i.poolMat.dispose(); i.lampM.dispose(); });
    portraitsGroup.clear(); niches.forEach(m => { m.geometry.dispose(); arch.remove(m); }); niches = [];
    insts = []; hits = []; if (typeof setHover === 'function' && tagElReady) { hovered = null; setHover(null); }
    const byRoom = {}; S.list.forEach(p => p.rooms.forEach(r => (byRoom[r] = byRoom[r] || []).push(p)));
    Object.values(byRoom).forEach(a => a.sort((x, y) => x.order - y.order || x.name.localeCompare(y.name)));
    for (const room of ROOMS.map(r => r.id)) {
      const ps = byRoom[room] || []; const slots = slotPositions(room, ps.length);
      ps.forEach((p, i) => {
        const s = slots[i];
        const cy = s.y ?? (s.size === 'L' ? 2.02 : (room === 'secret' ? 1.7 : 1.78));
        const center = s.c.clone().setY(cy).addScaledVector(s.n, .0);
        insts.push(makeInst(p, room, center, s.n, s.size));
        if (room === 'foyer') { // classical niche
          const { m } = wallBasis(center.clone().setY(0), s.n, 2.6);
          const sh = new THREE.Shape(); sh.moveTo(0, .4); sh.lineTo(2.6, .4); sh.lineTo(2.6, 3.25); sh.absarc(1.3, 3.25, 1.3, 0, Math.PI, false); sh.lineTo(0, .4);
          const g2 = new THREE.ShapeGeometry(sh, 24); g2.translate(0, 0, .006); g2.applyMatrix4(m);
          const mesh = new THREE.Mesh(g2, nicheMat); arch.add(mesh); niches.push(mesh);
          const tor = new THREE.TorusGeometry(1.36, .06, 8, 40, Math.PI); tor.translate(1.3, 3.25, .04); tor.applyMatrix4(m); const tm = new THREE.Mesh(tor, trimMat); arch.add(tm); niches.push(tm);
        }
      });
    }
    // walking sequence (room order, along the route)
    seq = insts.filter(i => i.room !== 'secret' || visitor.cabinet).slice().sort((a, b) => ROOM[a.room].index - ROOM[b.room].index || (b.center.z - a.center.z) || (a.center.x - b.center.x));
    if (ROOM.secret) { const sec = seq.filter(i => i.room === 'secret'); if (sec.length) { seq = seq.filter(i => i.room !== 'secret'); const at = seq.findIndex(i => i.room === 'monuments'); seq.splice(at < 0 ? seq.length : at, 0, ...sec); } }
    buildParticles();
    T.insts = insts; T.seq = seq; S.seqIdx = clamp(S.seqIdx, 0, Math.max(0, seq.length - 1));
    renderKbd();
    lazyTick(true);
  }

  /* ----- dust particles ----- */
  let particles = null;
  const pMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPR: { value: dpr }, uSize: { value: 26 } },
    vertexShader: `attribute float aSeed; uniform float uTime; uniform float uPR; uniform float uSize; varying float vA;
      void main(){ vec3 p=position; float t=uTime*.6;
        p.x+=sin(t*.21+aSeed*6.28)*.16; p.y+=sin(t*.13+aSeed*12.1)*.22+mod(t*.02+aSeed,1.)*.25; p.z+=cos(t*.17+aSeed*4.7)*.16;
        vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv;
        gl_PointSize=uSize*uPR*(.45+aSeed*.7)/max(.5,-mv.z); vA=(.45+.55*sin(t*.7+aSeed*40.))*smoothstep(14.,3.,-mv.z); }`,
    fragmentShader: `varying float vA; void main(){ vec2 c=gl_PointCoord-.5; float d=length(c); float a=smoothstep(.5,.0,d); gl_FragColor=vec4(1.,.86,.62,a*vA*.42); }`
  });
  function buildParticles() {
    if (particles) { particles.geometry.dispose(); scene.remove(particles); }
    const per = quality === 'low' ? 10 : 26; const pos = [], seed = [];
    const R = rng(77);
    insts.forEach(i => { for (let k = 0; k < per; k++) { const v = i.center.clone().addScaledVector(i.n, .25 + R() * 1.6).addScaledVector(i.u, (R() - .5) * 1.8).add(new V3(0, (R() - .4) * 2.2, 0)); pos.push(v.x, v.y, v.z); seed.push(R()); } });
    Object.keys(RECT).forEach(id => { const r = RECT[id]; const n = quality === 'low' ? 18 : 50; for (let k = 0; k < n; k++) { pos.push(lerp(r.x0 + 2, r.x1 - 2, R()) * .5 + (r.x0 + r.x1) / 4, .6 + R() * (r.h - 1.2), lerp(r.z0 - 2, r.z1 + 2, R())); seed.push(R()); } });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
    particles = new THREE.Points(g, pMat); particles.frustumCulled = false; particles.visible = !S.low; scene.add(particles); T.particles = particles;
  }

  /* ----- navigation: collision, rooms, routes ----- */
  function roomAt(x, z) {
    const s = RECT.secret; if (x > 7.2 && z <= s.z0 && z >= s.z1) return 'secret';
    if (z > -16) return 'foyer';
    return gal[clamp(Math.floor((-16 - z) / 18), 0, gal.length - 1)];
  }
  function walkable(x, z) {
    const m = .55;
    if (z <= -m && z >= -16 + m && Math.abs(x) <= 9 - m) return true;
    for (let k = 0; k < gal.length; k++) { const z0 = -16 - 18 * k, z1 = z0 - 18; if (z <= z0 - m && z >= z1 + m && Math.abs(x) <= 7 - m) return true; }
    for (let k = 0; k < gal.length; k++) { const zz = -16 - 18 * k; if (Math.abs(z - zz) <= 1.1 && Math.abs(x) <= (k === 0 ? 1.75 : 1.45)) return true; }
    if (secretOpen > .8) {
      if (x >= 6.3 && x <= 7.9 && Math.abs(z - SECRET_DOOR.z) <= .42) return true;
      const s = RECT.secret; if (x >= s.x0 + .5 && x <= s.x1 - .55 && z <= s.z0 - .55 && z >= s.z1 + .55) return true;
    }
    return false;
  }
  const GRAPH = { foyer: ['pioneers'], pioneers: ['foyer', 'gamechangers'], gamechangers: ['pioneers', 'heroes'], heroes: ['gamechangers', 'monuments', 'secret'], monuments: ['heroes', 'beautiful'], beautiful: ['monuments', 'peranakan'], peranakan: ['beautiful'], secret: ['heroes'] };
  function route(a, b) {
    const prev = { [a]: null }, q = [a];
    while (q.length) { const c = q.shift(); if (c === b) break; for (const n of GRAPH[c]) if (!(n in prev)) { prev[n] = c; q.push(n); } }
    const path = []; let c = b; while (c) { path.unshift(c); c = prev[c]; } return path;
  }
  function doorBetween(a, b) { return DOORS.find(d => (d.a === a && d.b === b) || (d.a === b && d.b === a)); }
  const rectCenter = id => { const r = RECT[id]; return new V3((r.x0 + r.x1) / 2, 0, (r.z0 + r.z1) / 2); };

  /* ----- camera rig ----- */
  const cam = { x: 0, z: -2, yaw: 0, pitch: .04, tYaw: 0, tPitch: .04, vx: 0, vz: 0, wheel: 0, bob: 0, travel: null, stepT: 0 };
  function station(inst, dist = 2.6) {
    const p = inst.center.clone().addScaledVector(inst.n, dist);
    const yaw = Math.atan2(inst.n.x, inst.n.z);
    const pitch = Math.atan2(inst.center.y - (S.mobile ? .2 : 0) - EYE, dist) * .8;
    return { x: p.x, z: p.z, yaw, pitch };
  }
  function closeView(inst) {
    if (S.mobile) { const d = innerWidth < innerHeight ? 3.4 : 2.4; const p = inst.center.clone().addScaledVector(inst.n, d); return { x: p.x, z: p.z, y: inst.center.y - .55, yaw: Math.atan2(inst.n.x, inst.n.z), pitch: 0 }; }
    const dist = inst.p.orient === 'landscape' ? 2.75 : inst.size === 'L' ? 2.6 : 2.0, half = dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect, shift = .55 * half;
    const p = inst.center.clone().addScaledVector(inst.n, dist).addScaledVector(inst.u, shift);
    return { x: p.x, z: p.z, y: inst.center.y, yaw: Math.atan2(inst.n.x, inst.n.z), pitch: 0 };
  }
  let camY = EYE, camYT = EYE;
  function placeAt(v) { cam.travel = null; cam.x = v.x; cam.z = v.z; cam.yaw = cam.tYaw = v.yaw; cam.pitch = cam.tPitch = v.pitch || 0; camY = camYT = v.y ?? EYE; cam.vx = cam.vz = 0; }
  function travel(dest, { dur, look = 'blend', done } = {}) {
    const from = new V3(cam.x, 0, cam.z), to = new V3(dest.x, 0, dest.z);
    const ra = roomAt(cam.x, cam.z), rb = roomAt(dest.x, dest.z);
    if (rb === 'secret' || ra === 'secret') secretTarget = 1;
    if (S.low) {
      $('#fade').classList.add('on');
      setTimeout(() => { placeAt(dest); $('#fade').classList.remove('on'); done && done(); }, 340);
      cam.travel = { hold: true }; return;
    }
    const pts = [from];
    const path = route(ra, rb);
    for (let i = 0; i < path.length - 1; i++) {
      const d = doorBetween(path[i], path[i + 1]); const c = new V3(d.axis === 'z' ? d.x : 7.15, 0, d.z);
      const dir = rectCenter(path[i + 1]).sub(rectCenter(path[i])); if (d.axis === 'z') dir.set(0, 0, Math.sign(dir.z)); else dir.set(Math.sign(dir.x), 0, 0);
      pts.push(c.clone().addScaledVector(dir, -1.3), c.clone().addScaledVector(dir, 1.3));
    }
    pts.push(to);
    const clean = pts.filter((p, i) => i === 0 || p.distanceTo(pts[i - 1]) > .05);
    const curve = clean.length > 1 ? new THREE.CatmullRomCurve3(clean, false, 'centripetal') : null;
    const len = curve ? curve.getLength() : 0;
    const d = dur ?? clamp(len / 3.1, 1.2, 7);
    camYT = dest.y ?? EYE;
    cam.travel = { curve, len, t: 0, dur: d, y0: camY, sYaw: cam.yaw, sPitch: cam.pitch, eYaw: dest.yaw, ePitch: dest.pitch || 0, look: len < 3 ? 'blend' : look, done };
    if (len > 2) Snd.whoosh();
  }
  function updateTravel(dt) {
    const tr = cam.travel; if (!tr || tr.hold) return;
    tr.t = Math.min(1, tr.t + dt / tr.dur); const e = easeIO(tr.t);
    if (tr.curve) { const p = tr.curve.getPointAt(e); cam.x = p.x; cam.z = p.z; }
    camY = lerp(tr.y0, camYT, e);
    if (tr.look === 'path' && tr.curve && tr.t < .72) {
      const tg = tr.curve.getTangentAt(Math.min(.999, e + .02)); const want = Math.atan2(-tg.x, -tg.z);
      cam.yaw += angDiff(want, cam.yaw) * (1 - Math.exp(-dt * 3)); cam.pitch += (0 - cam.pitch) * (1 - Math.exp(-dt * 3));
    } else if (tr.look === 'path') {
      const k = smooth(.72, 1, tr.t); cam.yaw += angDiff(tr.eYaw, cam.yaw) * Math.max(k, 1 - Math.exp(-dt * 4)); cam.pitch += (tr.ePitch - cam.pitch) * Math.max(k, 1 - Math.exp(-dt * 4));
    } else { cam.yaw = tr.sYaw + angDiff(tr.eYaw, tr.sYaw) * e; cam.pitch = lerp(tr.sPitch, tr.ePitch, e); }
    const spd = tr.curve ? tr.len / tr.dur : 0; if (spd > .6) footsteps(dt);
    if (tr.t >= 1) { cam.yaw = tr.eYaw; cam.pitch = tr.ePitch; cam.tYaw = cam.yaw; cam.tPitch = cam.pitch; cam.travel = null; tr.done && tr.done(); }
  }
  function footsteps(dt) { cam.stepT -= dt; if (cam.stepT <= 0) { Snd.step(); cam.stepT = .52; } }
  const keys = new Set();
  function updateExplore(dt) {
    let f = 0, s = 0, turn = 0;
    if (keys.has('KeyW') || keys.has('ArrowUp')) f += 1; if (keys.has('KeyS') || keys.has('ArrowDown')) f -= 1;
    if (keys.has('KeyA')) s -= 1; if (keys.has('KeyD')) s += 1;
    if (keys.has('ArrowLeft') || keys.has('KeyQ')) turn += 1; if (keys.has('ArrowRight') || keys.has('KeyE')) turn -= 1;
    cam.tYaw += turn * 1.4 * dt;
    cam.wheel *= Math.exp(-dt * 3); f += clamp(cam.wheel, -1.4, 1.4);
    const sp = 2.3; const sy = Math.sin(cam.yaw), cy = Math.cos(cam.yaw);
    const tvx = (-sy * f + cy * s * .8) * sp, tvz = (-cy * f - sy * s * .8) * sp;
    const k = 1 - Math.exp(-dt * 5); cam.vx += (tvx - cam.vx) * k; cam.vz += (tvz - cam.vz) * k;
    const nx = cam.x + cam.vx * dt, nz = cam.z + cam.vz * dt;
    if (walkable(nx, nz)) { cam.x = nx; cam.z = nz; } else if (walkable(nx, cam.z)) { cam.x = nx; cam.vz *= .5; } else if (walkable(cam.x, nz)) { cam.z = nz; cam.vx *= .5; } else { cam.vx = cam.vz = 0; }
    const speed = Math.hypot(cam.vx, cam.vz); if (speed > .5) { footsteps(dt); if (!S.low) cam.bob += dt * speed * 3.4; }
    const lk = 1 - Math.exp(-dt * 9); cam.yaw += angDiff(cam.tYaw, cam.yaw) * lk; cam.pitch += (cam.tPitch - cam.pitch) * lk;
    camY += (EYE - camY) * (1 - Math.exp(-dt * 4));
  }

  /* ----- pointer + raycasting ----- */
  const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2();
  const canvas = renderer.domElement;
  let hovered = null, ptr = { down: false, x: 0, y: 0, sx: 0, sy: 0, t: 0, drag: false, id: null }, mouse = { x: -999, y: -999, cx: -999, cy: -999 };
  function pick(cx, cy, list) { const r = canvas.getBoundingClientRect(); ndc.set((cx - r.left) / r.width * 2 - 1, -(cy - r.top) / r.height * 2 + 1); ray.setFromCamera(ndc, camera); const h = ray.intersectObjects([...list, ...occluders()], false)[0] || null; return h && (h.object.userData.inst || h.object.userData.secretDoor || h.object.userData.floor) ? h : null; }
  const occluders = () => arch.children.filter(o => o.isMesh && !o.userData.floor);
  const interactive = () => S.mode === 'explore' || S.mode === 'tour';
  canvas.addEventListener('pointerdown', e => { if (!interactive() && S.mode !== 'intro') return; ptr = { down: true, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), drag: false, id: e.pointerId }; try { canvas.setPointerCapture(e.pointerId); } catch { } poke(); });
  canvas.addEventListener('pointermove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY; poke();
    if (ptr.down && e.pointerId === ptr.id) {
      const dx = e.clientX - ptr.x, dy = e.clientY - ptr.y; ptr.x = e.clientX; ptr.y = e.clientY;
      if (!ptr.drag && Math.hypot(e.clientX - ptr.sx, e.clientY - ptr.sy) > 6) ptr.drag = true;
      if (ptr.drag && S.mode === 'explore' && !S.mobile) { const k = e.pointerType === 'touch' ? .0042 : .0028; cam.tYaw += dx * k; cam.tPitch = clamp(cam.tPitch + dy * k * .8, -.42, .32); }
    }
  });
  canvas.addEventListener('pointerup', e => {
    if (!ptr.down || e.pointerId !== ptr.id) return; ptr.down = false;
    const dx = e.clientX - ptr.sx, dt = performance.now() - ptr.t;
    if (S.mobile && ptr.drag && Math.abs(dx) > 40 && Math.abs(dx) / dt > .25) { seqGo(dx < 0 ? 1 : -1); return; }
    if (ptr.drag || !interactive()) return;
    const h = pick(e.clientX, e.clientY, [...hits, secretHit, ...floors, secretPanel.children[0]]);
    if (!h) return;
    if (h.object.userData.inst) { selectInst(h.object.userData.inst); return; }
    if (h.object.userData.secretDoor) { travel({ x: 9.3, z: SECRET_DOOR.z, yaw: -Math.PI / 2, pitch: 0 }, { look: 'path', done: () => { S.mode = S.tourIdx >= 0 ? 'tour' : 'explore'; } }); S.mode = 'travel'; return; }
    if (h.object.userData.floor && S.mode === 'explore') {
      let { x, z } = h.point; if (!walkable(x, z)) return;
      const dist = Math.hypot(x - cam.x, z - cam.z); if (dist < .4) return;
      const yaw = Math.atan2(-(x - cam.x), -(z - cam.z));
      S.mode = 'travel'; showRing(h.point);
      travel({ x, z, yaw, pitch: cam.pitch }, { look: 'blend', dur: clamp(dist / 2.4, .8, 6), done: () => { S.mode = 'explore'; } });
    }
  });
  canvas.addEventListener('pointercancel', () => { ptr.down = false; });
  canvas.addEventListener('wheel', e => { if (S.mode !== 'explore') return; e.preventDefault(); cam.wheel = clamp(cam.wheel - e.deltaY * .0024, -1.6, 1.6); poke(); }, { passive: false });
  canvas.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  // floor target ring
  const ring = new THREE.Mesh(new THREE.RingGeometry(.22, .26, 40), new THREE.MeshBasicMaterial({ color: '#e2c88f', transparent: true, opacity: 0, toneMapped: false, depthWrite: false })); ring.rotation.x = -Math.PI / 2; scene.add(ring);
  let ringT = 0; function showRing(p) { ring.position.set(p.x, .01, p.z); ringT = 1; }

  function selectInst(inst) {
    if (!inst || S.mode === 'travel' || S.mode === 'focus') return;
    hovered = null; setHover(null);
    const fromTour = S.mode === 'tour'; if (fromTour) $('#tour').classList.remove('on');
    S.mode = 'travel'; $('#veil').classList.add('on'); S.seqIdx = Math.max(0, seq.indexOf(inst)); updateMBar();
    inst.ht = 1;
    S.lastFocus = document.activeElement;
    travel(closeView(inst), { look: 'path', dur: undefined, done: () => openStory(inst.p, inst) });
  }

  /* ----- hover presentation ----- */
  const tagEl = $('#tag'), curEl = $('#cursor'); let hoverN = 0; tagElReady = true;
  function setHover(inst) {
    insts.forEach(i => i.ht = (i === inst) ? 1 : 0);
    body.classList.toggle('hovering', !!inst);
    tagEl.classList.toggle('on', !!inst); curEl.classList.toggle('on', !!inst);
    if (inst) tagEl.querySelector('.n').textContent = inst.p.name;
  }
  function hoverTick() {
    if (S.touch || !interactive() || cam.travel || ptr.drag || mouse.x < -900) { if (hovered) { hovered = null; setHover(null); } return; }
    if ((hoverN = (hoverN + 1) % 3) !== 0) return;
    const h = pick(mouse.x, mouse.y, [...hits, secretHit]);
    const inst = h?.object.userData.inst || null;
    if (inst !== hovered) { hovered = inst; setHover(inst); }
    if (h?.object.userData.secretDoor && !hovered) { body.classList.add('hovering'); curEl.classList.add('on'); curEl.querySelector('span').textContent = 'Enter'; }
    else curEl.querySelector('span').textContent = 'View';
    if (!h && !hovered) { body.classList.remove('hovering'); curEl.classList.remove('on'); }
  }
  const tmpV = new V3();
  function placeTag() {
    mouse.cx += (mouse.x - mouse.cx) * .35; mouse.cy += (mouse.y - mouse.cy) * .35;
    curEl.style.transform = `translate(${mouse.cx}px,${mouse.cy}px)`;
    if (!hovered) return;
    tmpV.copy(hovered.center).addScaledVector(UP, -hovered.G.FH / 2 - .5).addScaledVector(hovered.n, .05).project(camera);
    tagEl.style.left = ((tmpV.x + 1) / 2 * innerWidth) + 'px'; tagEl.style.top = ((1 - tmpV.y) / 2 * innerHeight) + 'px';
  }

  /* ----- lazy textures + lighting response ----- */
  let lazyAcc = 0;
  function lazyTick(force) {
    const here = roomAt(cam.x, cam.z);
    insts.forEach(i => { if (i.wanted) return; const d = Math.hypot(i.center.x - cam.x, i.center.z - cam.z); if (force && d < 30 || d < 30 || i.room === here || GRAPH[here].includes(i.room)) wantTexture(i); });
  }
  function lightTick(dt) {
    const k = 1 - Math.exp(-dt * 7.5); const focus = S.mode === 'focus' || (S.mode === 'travel' && $('#veil').classList.contains('on'));
    for (const i of insts) {
      i.hover += (i.ht - i.hover) * k;
      const d = Math.hypot(i.center.x - cam.x, i.center.z - cam.z); const nearT = smooth(9, 2.4, d); i.near += (nearT - i.near) * k;
      const dim = focus && i.ht < .5 ? .45 : 1;
      i.poolMat.opacity = (.38 + i.near * .22 + i.hover * .3) * dim;
      i.glowMat.opacity = i.hover * .55;
      const b = (.74 + i.near * .14 + i.hover * .1) * (dim < 1 ? .7 : 1); i.imgMat.color.setScalar(b);
      i.plaqueMat.emissiveIntensity = .06 + i.hover * .38 + i.near * .06;
      i.lampM.emissiveIntensity = .4 + i.hover * .6;
      i.art.position.z = i.hover * .035; i.art.scale.setScalar(1 + i.hover * .012);
    }
  }

  /* ----- loop ----- */
  let last = performance.now(), frameAcc = 0, frames = 0, introDrift = 0;
  const clock = { t: 0 };
  let curRoom = null;
  function loop(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; clock.t += dt;
    if (S.mode === 'explore') updateExplore(dt);
    updateTravel(dt);
    if (S.mode === 'intro' && !S.low) { introDrift += dt; cam.yaw = Math.sin(introDrift * .25) * .035; cam.pitch = .05 + Math.sin(introDrift * .19) * .01; }
    // doors
    doorOpen += (doorTarget - doorOpen) * (1 - Math.exp(-dt * (S.low ? 20 : 1.7)));
    leaves.forEach(({ piv, s }) => piv.rotation.y = -s * doorOpen * 1.62);
    const sd = Math.hypot(cam.x - SECRET_DOOR.x, cam.z - SECRET_DOOR.z); if (sd < 3.4) secretTarget = 1; else if (sd > 7 && roomAt(cam.x, cam.z) !== 'secret' && !(cam.travel && !cam.travel.hold)) secretTarget = 0;
    secretOpen += (secretTarget - secretOpen) * (1 - Math.exp(-dt * (S.low ? 20 : 2.4)));
    secretPanel.position.z = secretOpen * (SECRET_DOOR.w + .05); leak.material.opacity = .25 + (1 - secretOpen) * .3;
    // room tracking
    const r = roomAt(cam.x, cam.z);
    if (r !== curRoom) {
      curRoom = r; S.room = r;
      if (S.mode !== 'intro' && S.mode !== 'boot') { showRoomTitle(r); announce(`You are in ${ROOM[r].name}.`); }
      renderKbd(); lazyTick();
      if (r === 'secret' && !visitor.cabinet) { visitor.cabinet = true; saveVisitor(); toast('You have found the Curator’s Cabinet.'); seq = []; buildPortraitsSeqOnly(); }
    }
    lazyAcc += dt; if (lazyAcc > .5) { lazyAcc = 0; lazyTick(); }
    lightTick(dt); hoverTick(); placeTag();
    if (ringT > 0) { ringT = Math.max(0, ringT - dt * .9); ring.material.opacity = ringT * .8; ring.scale.setScalar(1 + (1 - ringT) * .6); }
    if (!S.low) pMat.uniforms.uTime.value = clock.t;
    // camera
    const bob = S.low ? 0 : Math.sin(cam.bob) * .012;
    camera.position.set(cam.x, camY + bob, cam.z); camera.rotation.set(cam.pitch, cam.yaw, 0);
    // exposure
    renderer.toneMappingExposure += (T.exposure - renderer.toneMappingExposure) * (1 - Math.exp(-dt * (S.low ? 20 : 1.1)));
    renderer.render(scene, camera);
    parallaxTick(); updateMapMarker();
    // adaptive resolution
    frameAcc += dt; frames++;
    if (frameAcc > 2) { const avg = frameAcc / frames; if (avg > .026 && dpr > .8) { dpr = Math.max(.8, dpr - .2); applySize(); } else if (avg < .013 && dpr < Math.min(devicePixelRatio || 1, maxDpr)) { dpr = Math.min(maxDpr, dpr + .1); applySize(); } frameAcc = 0; frames = 0; }
    requestAnimationFrame(loop);
  }
  function buildPortraitsSeqOnly() {
    seq = insts.slice().sort((a, b) => ROOM[a.room].index - ROOM[b.room].index || (b.center.z - a.center.z));
    const sec = seq.filter(i => i.room === 'secret'); seq = seq.filter(i => i.room !== 'secret'); const at = seq.findIndex(i => i.room === 'monuments'); seq.splice(at < 0 ? seq.length : at, 0, ...sec);
    T.seq = seq;
  }
  function applySize() {
    renderer.setPixelRatio(dpr); renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    pMat.uniforms.uPR.value = dpr; if (mirror) mirror.getRenderTarget().setSize(innerWidth * dpr * .5, innerHeight * dpr * .5);
  }
  addEventListener('resize', applySize);

  /* ----- keyboard ----- */
  addEventListener('keydown', e => {
    if (e.target.closest('input,textarea,select')) return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && S.mode === 'explore' && !S.panel && !S.story) {
      keys.add(e.code); e.preventDefault(); poke();
    }
  });
  addEventListener('keyup', e => keys.delete(e.code));
  addEventListener('blur', () => keys.clear());

  function renderKbd() {
    const here = insts.filter(i => i.room === S.room);
    $('#kbd').innerHTML = here.map((i, k) => `<button type="button" data-ki="${insts.indexOf(i)}">Portrait ${k + 1} of ${here.length}: ${esc(i.p.name)}</button>`).join('');
  }
  $('#kbd').addEventListener('click', e => { const b = e.target.closest('[data-ki]'); if (b) selectInst(insts[+b.dataset.ki]); });

  T = {
    cam, insts, seq, particles, exposure: 0, station, closeView, placeAt, travel, rebuild: buildPortraits,
    camPos: () => ({ x: cam.x, z: cam.z }),
    instFor(id, first) {
      const L = insts.filter(i => i.p.id === id); if (!L.length) return null; if (first || L.length === 1) return L.slice().sort((a, b) => ROOM[a.room].index - ROOM[b.room].index)[0];
      return L.sort((a, b) => Math.hypot(a.center.x - cam.x, a.center.z - cam.z) - Math.hypot(b.center.x - cam.x, b.center.z - cam.z))[0];
    },
    openDoors(v = 1) { doorTarget = v; }, selectInst,
    start() { requestAnimationFrame(t => { last = t; loop(t); }); }
  };
  buildPortraits();
  // pre-load the foyer and first gallery
  insts.filter(i => i.room === 'foyer' || i.room === 'pioneers').forEach(wantTexture);
  // warm up shaders
  renderer.compile(scene, camera);
}

/* =====================================================================
   INTRO, FLAT FALLBACK, HASH ROUTING, BINDINGS, BOOT
   ===================================================================== */
function enterFlat(msg) {
  S.three = false; S.mode = 'flat'; body.classList.add('flat', 'ready');
  if (msg) $('#fallbackMsg').textContent = msg;
  $('#intro').classList.add('gone'); $('#loader').classList.add('done');
  $('#stage').innerHTML = '';
}
async function runIntro() {
  S.mode = 'intro'; const intro = $('#intro');
  T.placeAt({ x: 0, z: -2.2, yaw: 0, pitch: .05 });
  await wait(250); intro.classList.add('lit'); T.exposure = 1;
  await wait(S.low ? 100 : 1100); intro.classList.add('t1');
  await wait(S.low ? 100 : 900); intro.classList.add('t2');
  await wait(S.low ? 100 : 800); intro.classList.add('t3');
}
let entered = false;
function enterGallery(skip) {
  if (entered) return; entered = true;
  const intro = $('#intro'); intro.classList.add('lit', 'gone');
  T.exposure = 1;
  const firstRoom = T.insts.find(i => i.room === 'pioneers');
  const dest = S.mobile && firstRoom ? T.station(firstRoom, 3) : { x: 0, z: -21.5, yaw: firstRoom ? Math.atan2(-(firstRoom.center.x - 0), -(firstRoom.center.z + 21.5)) * .85 : .28, pitch: .02 };
  if (S.mobile && firstRoom) S.seqIdx = Math.max(0, T.seq.indexOf(firstRoom));
  const finish = () => { S.mode = 'explore'; body.classList.add('ready'); poke(); updateMBar(); routeHash(); setTimeout(() => { if (!S.story && !S.panel) $('#stage canvas')?.focus({ preventScroll: true }); }, 100); };
  if (skip) { T.openDoors(1); T.placeAt(dest); finish(); return; }
  Snd.chime(); T.openDoors(1); S.mode = 'travel';
  setTimeout(() => T.travel(dest, { dur: 4.6, look: 'path', done: finish }), S.low ? 0 : 700);
}
let hashLock = false;
function setHash(h) { hashLock = true; try { history.replaceState(null, '', h ? '#' + h : location.pathname + location.search); } catch { } setTimeout(() => hashLock = false, 0); }
function routeHash() {
  if (hashLock) return; const h = decodeURIComponent(location.hash.slice(1)); if (!h) return;
  if (h === 'artist') openPanel('art'); else if (h === 'catalogue') openPanel('cat'); else if (h === 'journal') openPanel('jr'); else if (h === 'map' && S.three) openPanel('map'); else if (h === 'curator') openPanel('cur');
  else if (S.byId.has(h)) { const p = S.byId.get(h); if (!isSealed(p)) openStory(p, S.three ? T.instFor(p.id) : null, { teleport: true }); }
}
addEventListener('hashchange', routeHash);

function bind() {
  $('#enter').addEventListener('click', () => enterGallery(false));
  $('#skipIntro').addEventListener('click', () => enterGallery(true));
  $('#introSound').addEventListener('click', () => setSound(!Snd.on));
  $('#soundBtn').addEventListener('click', () => setSound(!Snd.on));
  $('#motionBtn').addEventListener('click', () => setLow(!S.low));
  $('#artistBtn').addEventListener('click', () => openPanel('art'));
  $('#mapBtn').addEventListener('click', () => openPanel('map'));
  $('#catBtn').addEventListener('click', () => openPanel('cat'));
  $('#jrBtn').addEventListener('click', () => openPanel('jr'));
  $('#curatorBtn').addEventListener('click', () => openPanel('cur'));
  $$('[data-open="cat"]').forEach(b => b.addEventListener('click', () => openPanel('cat')));
  $$('[data-close]').forEach(b => b.addEventListener('click', () => closePanel()));
  $('#scrim').addEventListener('click', () => closePanel());
  $('#brandBtn').addEventListener('click', () => { if (S.three && S.mode === 'explore') goRoom('foyer'); });
  $('#tourBtn').addEventListener('click', () => S.tourIdx >= 0 ? endTour() : startTour());
  $('#tourNext').addEventListener('click', () => goTour(S.tourIdx + 1));
  $('#tourPrev').addEventListener('click', () => goTour(S.tourIdx - 1));
  $('#tourExit').addEventListener('click', endTour);
  $('#tourRead').addEventListener('click', () => { const p = tourStops()[S.tourIdx]; if (p && S.mode === 'tour') T.selectInst(T.instFor(p.id, true)); });
  $('#storyBack').addEventListener('click', closeStory);
  $('#sNext').addEventListener('click', () => storyStep(1));
  $('#sPrev').addEventListener('click', () => storyStep(-1));
  $('#sArt').addEventListener('click', e => {
    const f = e.target.closest('[data-fav]'); const g = e.target.closest('[data-go]');
    if (f) { const id = f.dataset.fav; const on = !visitor.favs.includes(id); visitor.favs = on ? [...visitor.favs, id] : visitor.favs.filter(x => x !== id); saveVisitor(); f.setAttribute('aria-pressed', on); f.innerHTML = `<svg aria-hidden="true"><use href="#${on ? 'star' : 'starO'}"/></svg>${on ? 'In your favourites' : 'Add to favourites'}`; toast(on ? 'Added to your favourites.' : 'Removed from your favourites.'); }
    if (g) storyStep(0, g.dataset.go);
  });
  $('#mPrev').addEventListener('click', () => seqGo(-1));
  $('#mNext').addEventListener('click', () => seqGo(1));
  $('#mOpen').addEventListener('click', () => { const i = T?.seq[S.seqIdx]; if (i && S.mode === 'explore') T.selectInst(i); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (S.panel) { closePanel(); e.preventDefault(); return; }
      if (S.story) { closeStory(); e.preventDefault(); return; }
      if (S.tourIdx >= 0) { endTour(); e.preventDefault(); return; }
    }
    if (e.key === 'Tab') { if (S.panel) trapFocus(e, $('#' + S.panel)); else if (S.story) trapFocus(e, $('#story')); }
    if (S.story && !e.target.closest('input,textarea') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.target.closest('.txt')) { storyStep(e.key === 'ArrowRight' ? 1 : -1); }
    if (S.mode === 'tour' && !S.panel && !S.story && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.target.closest('button')) goTour(S.tourIdx + (e.key === 'ArrowRight' ? 1 : -1));
    poke();
  });
  addEventListener('pointermove', poke, { passive: true });
}

async function boot() {
  S.touch = matchMedia('(pointer: coarse)').matches;
  S.mobile = (S.touch && Math.min(innerWidth, innerHeight) < 600) || innerWidth < 600;
  body.classList.toggle('mobile', S.mobile);
  if (S.mobile) $('#hintKeys').textContent = 'Swipe to walk · Tap a portrait';
  else if (S.touch) $('#hintKeys').textContent = 'Drag to look · Tap the floor to walk · Tap a portrait';
  setLow(visitor.low ?? matchMedia('(prefers-reduced-motion: reduce)').matches);
  setPortraits(DEFAULT_PORTRAITS.map(p => norm(p, p.id))); S.source = 'built-in';
  bind();
  connectDb();
  await Promise.race([document.fonts?.ready, wait(2500)]);
  try { await initThree(); S.three = true; }
  catch (e) { console.warn('3D unavailable:', e); enterFlat(); routeHash(); return; }
  if (S.dirty) T.rebuild();
  T.start();
  await wait(400);
  $('#loader').classList.add('done');
  runIntro();
}
boot();
}
