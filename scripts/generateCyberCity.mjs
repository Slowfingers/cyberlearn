// Procedural raster art for the campaign map and the isometric grid.
// Run: node scripts/generateCyberCity.mjs   -> public/art/cyber-city/*.png
// Original art, no downloads: software rasteriser + node:zlib PNG encoder.
import {deflateSync} from 'node:zlib';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'art', 'cyber-city');
const SS = 2;

const crcTable = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = buf => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const sum = Buffer.alloc(4); sum.writeUInt32BE(crc(body));
  return Buffer.concat([len, body, sum]);
};
const encodePng = (w, h, rgba) => {
  const stride = w * 4 + 1;
  const raw = Buffer.alloc(stride * h);
  for (let y = 0; y < h; y++) { raw[y * stride] = 0; rgba.copy(raw, y * stride + 1, y * w * 4, (y + 1) * w * 4); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, {level: 9})), chunk('IEND', Buffer.alloc(0))]);
};

const hash = (x, y, s = 0) => {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 1442695041);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
};
const smooth = t => t * t * (3 - 2 * t);
const vnoise = (x, y, s = 0) => {
  const xi = Math.floor(x), yi = Math.floor(y), fx = smooth(x - xi), fy = smooth(y - yi);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};
const rng = seed => { let s = seed >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; };
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const clamp255 = v => Math.max(0, Math.min(255, v));

class Canvas {
  constructor(w, h) { this.ow = w; this.oh = h; this.w = w * SS; this.h = h * SS; this.px = new Float32Array(this.w * this.h * 4); }
  put(x, y, r, g, b, a) {
    if (a <= 0) return;
    const px = this.px, i = (y * this.w + x) * 4, ia = 1 - a;
    px[i] = r * a + px[i] * ia; px[i + 1] = g * a + px[i + 1] * ia; px[i + 2] = b * a + px[i + 2] * ia; px[i + 3] = a + px[i + 3] * ia;
  }
  paint(x0, y0, x1, y1, fn) {
    const sx0 = Math.max(0, Math.floor(x0 * SS)), sx1 = Math.min(this.w - 1, Math.ceil(x1 * SS));
    const sy0 = Math.max(0, Math.floor(y0 * SS)), sy1 = Math.min(this.h - 1, Math.ceil(y1 * SS));
    for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) {
      const c = fn((x + 0.5) / SS, (y + 0.5) / SS);
      if (c) this.put(x, y, clamp255(c[0]), clamp255(c[1]), clamp255(c[2]), c[3] === undefined ? 1 : Math.max(0, Math.min(1, c[3])));
    }
  }
  poly(pts, shader) {
    let area = 0;
    for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; area += ax * by - bx * ay; }
    const sign = area >= 0 ? 1 : -1;
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    this.paint(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys), (x, y) => {
      for (let i = 0; i < pts.length; i++) {
        const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length];
        if (((bx - ax) * (y - ay) - (by - ay) * (x - ax)) * sign < 0) return null;
      }
      return shader(x, y);
    });
  }
  glow(cx, cy, rx, ry, color, strength) {
    this.paint(cx - rx, cy - ry, cx + rx, cy + ry, (x, y) => {
      const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
      return d >= 1 ? null : [...color, strength * (1 - d) * (1 - d)];
    });
  }
  ring(cx, cy, rx, ry, width, color, alpha = 1) {
    const m = Math.min(rx, ry);
    this.paint(cx - rx - width, cy - ry - width, cx + rx + width, cy + ry + width, (x, y) => {
      const d = Math.abs(Math.hypot((x - cx) / rx, (y - cy) / ry) - 1) * m;
      return d >= width ? null : [...color, alpha * (1 - d / width)];
    });
  }
  line(x1, y1, x2, y2, w, color, alpha = 1) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, nx = -dy / len * w / 2, ny = dx / len * w / 2;
    this.poly([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]], () => [...color, alpha]);
  }
  toPng() {
    const out = Buffer.alloc(this.ow * this.oh * 4), n = SS * SS;
    for (let y = 0; y < this.oh; y++) for (let x = 0; x < this.ow; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
        const i = ((y * SS + sy) * this.w + x * SS + sx) * 4;
        r += this.px[i]; g += this.px[i + 1]; b += this.px[i + 2]; a += this.px[i + 3];
      }
      const o = (y * this.ow + x) * 4, al = a / n;
      out[o] = al > 0 ? clamp255(r / n / al) : 0; out[o + 1] = al > 0 ? clamp255(g / n / al) : 0; out[o + 2] = al > 0 ? clamp255(b / n / al) : 0; out[o + 3] = clamp255(al * 255);
    }
    return encodePng(this.ow, this.oh, out);
  }
}

// Parallelogram face p0->p1 is u, p0->p3 is v.
const face = (c, [p0, p1, p2, p3], shade) => {
  const ux = p1[0] - p0[0], uy = p1[1] - p0[1], vx = p3[0] - p0[0], vy = p3[1] - p0[1], det = ux * vy - uy * vx;
  c.poly([p0, p1, p2, p3], (x, y) => {
    const dx = x - p0[0], dy = y - p0[1];
    return shade((dx * vy - vx * dy) / det, (ux * dy - uy * dx) / det, x, y);
  });
};

// Beveled stone/metal material with seams and optional lit windows.
const surface = (base, light, seed, {accents = null, cols = 4, rows = 3, windows = false, glass = 0.55, bands = false} = {}) => (u, v, x, y) => {
  if (windows && accents && bands) {
    const k = light * (1.08 - 0.3 * v) + vnoise(x * 0.3, y * 0.3, seed) * 0.08 - 0.1, row = Math.floor(v * rows), fv = (v * rows) % 1;
    const seg = hash(Math.floor(u * cols * 1.5), row, seed), lit = hash(row, 3, seed) > glass - 0.1 && fv > 0.3 && fv < 0.72 && u > 0.05 && u < 0.95;
    if (lit && seg > 0.25) return mix(accents[hash(row, 9, seed) > 0.7 ? 1 : 0], [255, 255, 255], 0.2 + 0.25 * (1 - fv));
    return base.map(c => c * k * (fv < 0.08 ? 1.35 : fv > 0.92 ? 0.6 : 1));
  }
  let k = light * (1.05 - 0.22 * v) + vnoise(x * 0.3, y * 0.3, seed) * 0.14 + vnoise(x * 1.3, y * 1.3, seed + 7) * 0.06 - 0.1;
  const edge = Math.min(u, 1 - u, v, 1 - v);
  if (edge < 0.04) k *= 1 + (Math.min(u, v) < Math.min(1 - u, 1 - v) ? 0.5 : -0.35) * (1 - edge / 0.04);
  const fu = (u * cols) % 1, fv = (v * rows) % 1;
  if (Math.min(fu, 1 - fu) / cols < 0.012 || Math.min(fv, 1 - fv) / rows < 0.012) k *= 0.68;
  let col = base.map(c => c * k);
  if (windows && accents && fu > 0.2 && fu < 0.8 && fv > 0.22 && fv < 0.78) {
    const id = hash(Math.floor(u * cols), Math.floor(v * rows), seed);
    col = id > glass ? mix(accents[id > 0.8 ? 1 : 0].map(c => c * 0.9), [255, 255, 255], (1 - fv) * 0.25) : [10, 18, 36];
  }
  return col;
};

// Isometric box: (cx,cy) is the centre of the base diamond, hw half width, h height.
const cube = (c, cx, cy, hw, h, pal, seed, opts = {}) => {
  const hh = hw / 2;
  const L = [cx - hw, cy - h], T = [cx, cy - hh - h], R = [cx + hw, cy - h], B = [cx, cy + hh - h];
  const bl = [cx - hw, cy], bb = [cx, cy + hh], br = [cx + hw, cy];
  const cols = opts.cols ?? Math.max(2, Math.round(hw / 12)), rows = opts.rows ?? Math.max(2, Math.round(h / 18));
  const mat = (light, s) => { const f = surface(pal.base, light, seed + s, {accents: pal.accents, cols, rows, windows: opts.windows, glass: opts.glass, bands: opts.bands}); return (u, v, x, y) => { const col = f(u, v, x, y); return [col[0], col[1], col[2], 1]; }; };
  face(c, [L, B, bb, bl], mat(0.82, 1));
  face(c, [B, R, br, bb], mat(0.55, 2));
  const top = surface(pal.base, 1.22, seed + 3, {cols: 2, rows: 2});
  face(c, [L, T, R, B], (u, v, x, y) => { const col = top(u, v, x, y); return [col[0], col[1], col[2], 1]; });
  c.line(cx, cy - hh - h + hh * 2, cx, cy + hh, 1.4, pal.accents[0], 0.55);
  c.line(L[0], L[1], B[0], B[1], 1.1, pal.accents[0], 0.45);
  c.line(B[0], B[1], R[0], R[1], 1.1, pal.accents[1], 0.45);
};

const rooftop = (c, cx, cy, hw, h, pal, seed, rand) => {
  const top = cy - h;
  const n = 1 + Math.floor(rand() * 2);
  for (let i = 0; i < n; i++) {
    const ox = (rand() - 0.5) * hw * 0.9, oy = (rand() - 0.5) * hw * 0.35, s = hw * (0.16 + rand() * 0.16);
    cube(c, cx + ox, top + oy, s, s * 0.9, pal, seed + i * 11, {cols: 1, rows: 1});
  }
  if (rand() > 0.35) {
    const ax = cx + (rand() - 0.5) * hw * 0.6, ay = top + (rand() - 0.5) * hw * 0.2, ah = 20 + rand() * 26;
    c.line(ax, ay, ax, ay - ah, 1.4, [120, 140, 170], 0.9);
    c.glow(ax, ay - ah, 6, 6, pal.accents[rand() > 0.5 ? 0 : 1], 0.9);
  }
};

const THEMES = [
  {base: [58, 78, 112], accents: [[0, 243, 255], [150, 100, 255]], sky: [[7, 13, 30], [18, 34, 66]]},
  {base: [62, 70, 118], accents: [[170, 110, 255], [0, 230, 255]], sky: [[10, 10, 32], [28, 22, 70]]},
  {base: [50, 82, 100], accents: [[40, 230, 210], [90, 140, 255]], sky: [[6, 16, 28], [14, 40, 62]]},
  {base: [64, 74, 106], accents: [[90, 170, 255], [230, 90, 220]], sky: [[8, 12, 30], [22, 30, 68]]},
];
const dim = (pal, f) => ({...pal, base: pal.base.map(v => v * f)});

// Tiered skyscraper: 1-3 shrinking cubes stacked on each other, beacon on top.
const tower = (c, cx, cy, hw, h, pal, seed, rand) => {
  const tiers = h > 110 ? 3 : h > 70 ? 2 : 1;
  const share = tiers === 3 ? [0.5, 0.3, 0.2] : tiers === 2 ? [0.62, 0.38] : [1];
  let y = cy, w = hw;
  for (let t = 0; t < tiers; t++) {
    const th = h * share[t];
    cube(c, cx, y, w, th, pal, seed + t * 17, {windows: true, glass: 0.5 + rand() * 0.2, bands: rand() > 0.5, cols: Math.max(2, Math.round(w / 14))});
    y = y - th - w / 2;
    w *= 0.72;
  }
  const topY = y + w / 2;
  rooftop(c, cx, topY, w, 0, pal, seed + 90, rand);
  // Светящийся шпиль-маяк на макушке
  const bh = 8 + rand() * 14;
  c.line(cx, topY, cx, topY - bh, 1.3, pal.accents[0], 0.95);
  c.glow(cx, topY - bh, 7, 7, pal.accents[rand() > 0.5 ? 0 : 1], 0.95);
  return {topY, x: cx};
};

const buildScene = (theme, index) => {
  const W = 1280, H = 720, c = new Canvas(W, H), rand = rng(1000 + index * 77);
  const pal = THEMES[theme];
  const haze = (y0, y1, a0, a1) => c.paint(0, y0, W, y1, (x, y) => [...mix(pal.sky[0], pal.sky[1], y / H), a0 + (a1 - a0) * ((y - y0) / Math.max(1, y1 - y0))]);
  c.paint(0, 0, W, H, (x, y) => { const t = y / H; const col = mix(pal.sky[0], pal.sky[1], Math.pow(t, 1.3)); const star = hash(Math.floor(x / 2), Math.floor(y / 2), 5) > 0.9985 && y < H * 0.5 ? 120 : 0; return [col[0] + star, col[1] + star, col[2] + star, 1]; });
  c.glow(W * 0.5, H * 0.5, 620, 260, pal.accents[1], 0.22);

  const skyline = (count, hwRange, hRange, yRange, factor, seed) => {
    const items = Array.from({length: count}, () => ({x: rand() * W, y: yRange[0] + rand() * (yRange[1] - yRange[0]), hw: hwRange[0] + rand() * (hwRange[1] - hwRange[0]), h: hRange[0] + rand() * (hRange[1] - hRange[0])})).sort((a, b) => a.y - b.y);
    items.forEach((b, i) => {
      const p = dim(pal, factor);
      tower(c, b.x, b.y, b.hw, b.h, p, seed + i * 5, rand);
    });
  };
  skyline(26, [16, 30], [80, 210], [250, 330], 0.4, 100);
  haze(270, 350, 0.25, 0.35);
  skyline(16, [26, 46], [70, 180], [325, 400], 0.6, 300);
  haze(370, 430, 0.2, 0.32);

  const cx = 640, cy = 430, hw = 440, hh = 220, thick = 52;
  const slab = {base: pal.base.map(v => v * 0.8), accents: pal.accents};
  const sT = [cx, cy - hh], sR = [cx + hw, cy], sB = [cx, cy + hh], sL = [cx - hw, cy];
  const sideShade = light => { const f = surface(slab.base, light, 40 + index, {cols: 22, rows: 2, windows: true, accents: pal.accents, glass: 0.7}); return (u, v, x, y) => { const col = f(u, v, x, y); return [col[0], col[1], col[2], 1]; }; };
  face(c, [sL, sB, [cx, cy + hh + thick], [cx - hw, cy + thick]], sideShade(0.75));
  face(c, [sB, sR, [cx + hw, cy + thick], [cx, cy + hh + thick]], sideShade(0.5));
  const topF = surface(slab.base, 1.1, 60 + index, {cols: 14, rows: 14});
  face(c, [sL, sT, sR, sB], (u, v, x, y) => { const col = topF(u, v, x, y); return [col[0] * 0.8, col[1] * 0.85, col[2] * 0.95, 1]; });
  c.line(sL[0], sL[1], sB[0], sB[1], 2, pal.accents[0], 0.8);
  c.line(sB[0], sB[1], sR[0], sR[1], 2, pal.accents[1], 0.8);
  c.glow(cx, cy + hh + thick, 460, 40, pal.accents[0], 0.3);

  const iso = (gx, gy) => [cx + (gx - gy) * 36, cy + (gx + gy) * 18];
  for (let k = -7; k <= 7; k += 2) {
    const [ax, ay] = iso(k, -7), [bx, by] = iso(k, 7), [dx, dy] = iso(-7, k), [ex, ey] = iso(7, k);
    c.line(ax, ay, bx, by, 1.2, pal.accents[0], 0.14);
    c.line(dx, dy, ex, ey, 1.2, pal.accents[1], 0.12);
  }

  // Улицы: четыре проспекта вдоль gx=±3 и gy=±3 — асфальт, неоновые кромки, пунктир, свечение перекрёстков
  const roadHalf = 5;
  const road = (a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), nx = -dy / len * roadHalf, ny = dx / len * roadHalf;
    c.poly([[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]], () => [12, 18, 32, 1]);
    c.line(a[0] + nx, a[1] + ny, b[0] + nx, b[1] + ny, 1.4, pal.accents[0], 0.85);
    c.line(a[0] - nx, a[1] - ny, b[0] - nx, b[1] - ny, 1.4, pal.accents[1], 0.85);
    for (let t = 0.06; t < 0.98; t += 0.09) c.line(a[0] + dx * t, a[1] + dy * t, a[0] + dx * (t + 0.04), a[1] + dy * (t + 0.04), 1.2, [160, 190, 220], 0.5);
  };
  const E = 6.4;
  road(iso(-3, -E), iso(-3, E)); road(iso(3, -E), iso(3, E));
  road(iso(-E, -3), iso(E, -3)); road(iso(-E, 3), iso(E, 3));
  for (const rx of [-3, 3]) for (const ry of [-3, 3]) { const [px, py] = iso(rx, ry); c.glow(px, py, 26, 14, pal.accents[0], 0.5); }

  // Центральная площадь: светящийся рисунок и только низкие постройки — под ней читается маршрут UI
  const plaza = iso(0, 0);
  c.glow(plaza[0], plaza[1], 130, 62, pal.accents[1], 0.35);
  c.ring(plaza[0], plaza[1], 110, 52, 3, pal.accents[0], 0.8);
  c.ring(plaza[0], plaza[1], 78, 37, 2, pal.accents[1], 0.7);
  c.ring(plaza[0], plaza[1], 44, 21, 2, pal.accents[0], 0.55);
  c.glow(plaza[0], plaza[1], 26, 13, pal.accents[0], 0.5);
  const lowSpots = [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5], [0, -2], [0, 2], [-2, 0], [2, 0]];
  lowSpots.forEach(([gx, gy], i) => {
    if (rand() > 0.75) return;
    const [bx, by] = iso(gx, gy), h = 20 + rand() * 25;
    cube(c, bx, by, 16 + rand() * 10, h, pal, 600 + i * 7, {windows: true, bands: rand() > 0.5, glass: 0.6});
  });

  // Здания только во внешних кварталах; сзади выше, спереди ниже — передние не закрывают плиту
  const spots = [];
  for (let gx = -6.5; gx <= 6.5; gx += 1.5) for (let gy = -6.5; gy <= 6.5; gy += 1.5) {
    if (Math.abs(gx - gy) > 11.5 || Math.abs(gx + gy) > 11.5) continue;
    if (!(Math.abs(gx) > 3.4 || Math.abs(gy) > 3.4)) continue;
    if (rand() > 0.62) continue;
    spots.push([gx + (rand() - 0.5) * 0.7, gy + (rand() - 0.5) * 0.7]);
  }
  spots.sort((a, b) => a[0] + a[1] - (b[0] + b[1])).forEach(([gx, gy], i) => {
    const [bx, by] = iso(gx, gy);
    const depth = Math.max(0, Math.min(1, (gx + gy + 11) / 22));
    const h = 170 - depth * 135 + rand() * 30;
    tower(c, bx, by, 17 + rand() * 13, Math.max(35, h), pal, 500 + i * 13, rand);
  });

  // Bloom над самыми яркими башнями
  for (const [bx, by] of [iso(-6, -5), iso(5, -6), iso(-5, 4)]) c.glow(bx, by - 120, 90, 60, pal.accents[0], 0.3);

  // Прожектора с крыш в небо
  for (const [gx, gy] of [[-5, -6], [6, -4], [-6, 5]]) {
    const [bx, by] = iso(gx, gy), lean = (rand() - 0.5) * 90;
    c.poly([[bx - 4, by - 100], [bx + 4, by - 100], [bx + lean + 40, by - 320], [bx + lean - 40, by - 320]], (x, y) => [...pal.accents[1], 0.05 * (1 - (by - 100 - y) / 220)]);
  }

  // Летающие огни вдоль дорог и над городом
  for (let i = 0; i < 10; i++) {
    const gx = -5 + rand() * 10, gy = rand() > 0.5 ? 3 : -3, lift = 30 + rand() * 60;
    const [ax, ay] = iso(gx, gy), dx = 14 + rand() * 22;
    c.line(ax, ay - lift, ax + dx, ay - lift - 3, 2, pal.accents[i % 2], 0.9);
    c.glow(ax + dx / 2, ay - lift - 2, 10, 5, pal.accents[i % 2], 0.6);
  }
  for (let i = 0; i < 8; i++) {
    const ax = 80 + rand() * (W - 160), ay = 180 + rand() * 160, dx = 12 + rand() * 20;
    c.line(ax, ay, ax + dx, ay - 2, 1.5, pal.accents[i % 2], 0.8);
    c.glow(ax + dx / 2, ay - 1, 8, 4, pal.accents[i % 2], 0.5);
  }
  // Свечение под нижней кромкой плиты
  c.glow(cx, cy + hh + thick + 10, 380, 26, pal.accents[1], 0.35);
  c.paint(0, 0, W, H, (x, y) => { const d = Math.hypot((x - W / 2) / (W * 0.62), (y - H / 2) / (H * 0.7)); return d > 0.6 ? [4, 8, 18, Math.min(0.75, (d - 0.6) * 1.1)] : null; });
  return c;
};

const GRID_PAL = THEMES[0];
const tile = start => {
  const c = new Canvas(128, 96);
  cube(c, 64, 52, 62, 20, {base: [64, 84, 118], accents: GRID_PAL.accents}, start ? 9 : 3, {cols: 8, rows: 1});
  const hw = 50, hh = 25, cy = 32;
  const inner = [[64, cy - hh], [64 + hw, cy], [64, cy + hh], [64 - hw, cy]];
  const accent = start ? [170, 110, 255] : [0, 243, 255];
  c.poly(inner, (x, y) => { const k = 0.9 + vnoise(x * 0.5, y * 0.5, 4) * 0.2; const d = Math.abs(x - 64) / hw + Math.abs(y - cy) / hh; const g = Math.max(0, d - 0.75) * 3; return [30 * k + accent[0] * g * 0.18, 44 * k + accent[1] * g * 0.18, 72 * k + accent[2] * g * 0.18, 1]; });
  for (let i = 0; i < 4; i++) { const a = inner[i], b = inner[(i + 1) % 4]; c.line(a[0], a[1], b[0], b[1], 1.5, accent, 0.75); }
  c.line(64 - 20, cy - 10, 64 + 20, cy + 10, 1, accent, 0.25);
  c.line(64 - 20, cy + 10, 64 + 20, cy - 10, 1, accent, 0.25);
  if (start) { c.ring(64, cy, 20, 10, 2, accent, 0.9); c.glow(64, cy, 26, 13, accent, 0.45); }
  for (const [px, py] of [[64, 4], [124, 32], [64, 60], [4, 32]]) c.glow(px, py, 3.5, 2.5, [200, 230, 255], 0.9);
  return c;
};

const block = () => {
  const c = new Canvas(128, 160);
  const pal = {base: [74, 62, 112], accents: [[255, 90, 190], [170, 110, 255]]};
  c.glow(64, 128, 58, 30, [255, 60, 150], 0.35);
  cube(c, 64, 128, 56, 74, pal, 21, {cols: 4, rows: 4, windows: true, glass: 0.45});
  rooftop(c, 64, 128, 56, 74, pal, 22, rng(77));
  return c;
};

const portal = () => {
  const c = new Canvas(128, 192);
  const base = [[64, 160 - 30], [64 + 60, 160], [64, 160 + 30], [64 - 60, 160]];
  c.poly(base, (x, y) => { const d = Math.abs(x - 64) / 60 + Math.abs(y - 160) / 30; return [40 + 60 * (1 - d), 50 + 40 * (1 - d), 110 + 100 * (1 - d), 1]; });
  for (let i = 0; i < 4; i++) { const a = base[i], b = base[(i + 1) % 4]; c.line(a[0], a[1], b[0], b[1], 1.6, [0, 255, 150], 0.85); }
  c.glow(64, 160, 70, 34, [0, 255, 140], 0.6);
  c.glow(64, 100, 52, 74, [60, 255, 190], 0.35);
  c.ring(64, 98, 30, 58, 6, [0, 255, 150], 0.95);
  c.ring(64, 98, 22, 48, 3, [200, 255, 240], 0.7);
  c.paint(30, 30, 98, 170, (x, y) => { const d = Math.hypot((x - 64) / 25, (y - 98) / 52); if (d >= 1) return null; const sw = vnoise(x * 0.12 + d * 3, y * 0.08, 8); return [20 + 60 * sw, 160 + 80 * sw, 120 + 100 * (1 - d), 0.5 + 0.35 * (1 - d)]; });
  cube(c, 64, 112, 14, 22, {base: [60, 110, 100], accents: [[0, 255, 150], [0, 243, 255]]}, 31, {cols: 1, rows: 1});
  c.glow(64, 98, 26, 26, [220, 255, 240], 0.45);
  return c;
};

const energyCell = powered => {
  const c = new Canvas(160, 200), accent = powered ? [255, 210, 92] : [72, 102, 130];
  c.glow(80, 169, 72, 24, accent, powered ? 0.4 : 0.1);
  cube(c, 80, 170, 62, 20, {base:[47, 65, 87], accents:[accent, [80, 170, 205]]}, 41, {cols:3, rows:1});
  c.poly([[45, 136], [40, 45], [51, 28], [109, 28], [120, 45], [115, 136]], (x, y) => {
    const edge = Math.min(x - 40, 120 - x), shine = Math.max(0, 1 - Math.abs(x - 54) / 7);
    return [17 + 28 * shine, 35 + 45 * shine, 55 + 55 * shine, 0.92];
  });
  c.line(40, 45, 45, 136, 4, [114, 157, 180]);
  c.line(120, 45, 115, 136, 4, [54, 89, 121]);
  c.line(51, 28, 109, 28, 4, [155, 185, 200]);
  for (let i = 0; i < 5; i++) {
    const y = 114 - i * 15;
    c.poly([[55, y], [104, y], [104, y + 9], [55, y + 9]], () => [...accent, powered ? 0.95 : 0.35]);
    if (powered) c.glow(80, y + 4, 40, 19, accent, 0.25);
  }
  cube(c, 80, 140, 40, 12, {base:[64, 81, 100], accents:[[141, 176, 195], accent]}, 42, {cols:2, rows:1});
  cube(c, 80, 28, 33, 9, {base:[83, 106, 130], accents:[[180, 201, 210], accent]}, 43, {cols:2, rows:1});
  c.line(49, 48, 54, 111, 3, [230, 245, 255], 0.5);
  return c;
};

const cargoCrate = () => {
  const c = new Canvas(160, 160), pal = {base:[61, 92, 120], accents:[[69, 205, 224], [112, 143, 200]]};
  c.glow(80, 132, 73, 26, [15, 25, 43], 0.9);
  cube(c, 80, 113, 65, 67, pal, 61, {cols:1, rows:1});
  for (const offset of [-37, 37]) {
    c.line(80 + offset, 64 + Math.abs(offset) / 2, 80 + offset, 131 - Math.abs(offset) / 2, 6, [17, 37, 60]);
    c.line(80 + offset - 2, 65 + Math.abs(offset) / 2, 80 + offset - 2, 130 - Math.abs(offset) / 2, 1, [118, 170, 198]);
  }
  c.poly([[47, 83], [79, 99], [79, 121], [47, 105]], () => [14, 30, 46, 1]);
  for (let i = 0; i < 5; i++) c.line(54 + i * 4, 91 + i * 2, 54 + i * 4, 104 + i * 2, 1, [138, 189, 204]);
  c.line(86, 94, 118, 78, 4, [61, 222, 230], 0.9);
  return c;
};

const logicChip = () => {
  const c = new Canvas(192, 160), pal = {base:[40, 55, 85], accents:[[76, 208, 223], [175, 142, 250]]};
  for (let i = 0; i < 6; i++) {
    c.line(23, 46 + i * 12, 44, 46 + i * 12, 5, [136, 161, 176]);
    c.line(147, 46 + i * 12, 169, 46 + i * 12, 5, [136, 161, 176]);
  }
  c.poly([[39, 31], [151, 31], [157, 37], [157, 128], [151, 134], [39, 134], [33, 128], [33, 37]], (x, y) => {
    const k = 0.8 + vnoise(x * 0.2, y * 0.2, 80) * 0.3;
    return [36 * k, 53 * k, 83 * k, 1];
  });
  for (const [x1, y1, x2, y2] of [[40, 32, 150, 32], [34, 38, 34, 127], [39, 134, 151, 134], [157, 38, 157, 127]]) c.line(x1, y1, x2, y2, 2, [71, 135, 162]);
  c.poly([[52, 48], [138, 48], [138, 116], [52, 116]], surface(pal.base, 1.1, 90, {cols:1, rows:1}));
  c.ring(43, 42, 3, 3, 2, [202, 186, 118]);
  c.line(62, 106, 128, 106, 2, pal.accents[1]);
  return c;
};

const workshopDeck = conveyor => {
  const W = 960, H = 480, c = new Canvas(W, H);
  c.paint(0, 0, W, H, (x, y) => {
    const n = vnoise(x * 0.3, y * 0.3, 100), seams = x % 160 < 2 || y % 120 < 2;
    return seams ? [9, 24, 38, 1] : [15 + n * 6, 30 + n * 8, 47 + n * 10, 1];
  });
  for (let i = 0; i < 8; i++) {
    const x = 40 + i * 124;
    c.line(x, 18, x + 30, 18, 3, [64, 116, 146], 0.5);
    c.ring(x, 445, 4, 4, 2, [84, 115, 135]);
  }
  if (conveyor) {
    c.poly([[0, 280], [960, 280], [960, 426], [0, 426]], () => [8, 18, 31, 1]);
    for (let x = 20; x < W; x += 42) {
      c.line(x, 297, x, 393, 20, [37, 57, 73]);
      c.line(x - 5, 299, x - 5, 391, 3, [78, 108, 127], 0.5);
    }
    c.line(0, 282, W, 282, 9, [98, 141, 162]);
    c.line(0, 409, W, 409, 11, [34, 67, 89]);
    c.line(0, 415, W, 415, 2, [65, 219, 226]);
    for (let x = 0; x < W; x += 70) c.poly([[x, 428], [x + 16, 428], [x + 40, 458], [x + 24, 458]], () => [190, 154, 64, 0.65]);
  } else {
    for (let i = 0; i < 7; i++) {
      const y = 65 + i * 49, x = 15 + i * 13;
      c.line(x, y, 280, y, 2, [64, 136, 145], 0.25);
      c.line(280, y, 305, y + 25, 2, [64, 136, 145], 0.25);
      c.line(305, y + 25, 935 - i * 17, y + 25, 2, [64, 136, 145], 0.25);
      c.ring(x, y, 4, 4, 1.5, [100, 167, 160], 0.4);
    }
  }
  return c;
};

const archiveNode = () => {
  const c = new Canvas(160, 160), pal = {base:[51, 80, 103], accents:[[110, 219, 226], [172, 154, 237]]};
  cube(c, 80, 128, 62, 16, pal, 121, {cols:2, rows:1});
  c.poly([[28, 26], [122, 26], [132, 36], [132, 111], [28, 111]], surface(pal.base, 1.2, 122, {cols:1, rows:1}));
  c.poly([[36, 37], [117, 37], [117, 93], [36, 93]], () => [6, 19, 31, 1]);
  c.line(39, 40, 113, 40, 2, [52, 137, 155]);
  for (let i = 0; i < 5; i++) c.line(37 + i * 14, 102, 45 + i * 14, 102, 3, [132, 171, 186]);
  c.glow(124, 105, 5, 5, [95, 235, 207], 0.8);
  return c;
};
const routerNode = () => {
  const c = new Canvas(160, 160), pal = {base:[56, 81, 102], accents:[[105, 213, 226], [121, 154, 215]]};
  cube(c, 80, 109, 64, 30, pal, 131, {cols:2, rows:1});
  for (const x of [42, 112]) {
    c.line(x, 72, x, 18, 5, [68, 97, 122]);
    c.line(x - 1, 70, x - 1, 18, 1, [153, 189, 200]);
    c.glow(x, 19, 5, 5, [115, 236, 221], 0.6);
  }
  for (let i = 0; i < 4; i++) c.line(36 + i * 10, 101 + i * 5, 36 + i * 10, 111 + i * 5, 3, [24, 41, 59]);
  c.line(94, 104, 122, 90, 3, [77, 214, 212]);
  return c;
};
const hanoiModule = () => {
  const c = new Canvas(256, 48);
  c.poly([[10, 4], [244, 4], [254, 14], [254, 36], [244, 46], [10, 46], [2, 36], [2, 14]], (x, y) => {
    const k = 1 - y / 80 + vnoise(x * 0.4, y * 0.4, 140) * 0.12;
    return [66 * k, 102 * k, 131 * k, 1];
  });
  c.line(12, 5, 244, 5, 2, [171, 209, 225]);
  c.line(12, 44, 244, 44, 3, [22, 42, 62]);
  for (const x of [17, 235]) {
    c.ring(x, 23, 4, 4, 2, [153, 184, 201]);
    c.line(x - 3, 23, x + 3, 23, 1, [14, 32, 46]);
  }
  return c;
};

mkdirSync(OUT, {recursive: true});
const files = {'tile.png': tile(false), 'tile-start.png': tile(true), 'block.png': block(), 'portal.png': portal(),
  'energy-cell-on.png':energyCell(true), 'energy-cell-off.png':energyCell(false), 'cargo-crate.png':cargoCrate(),
  'logic-chip.png':logicChip(), 'circuit-board.png':workshopDeck(false), 'conveyor-deck.png':workshopDeck(true),
  'archive-node.png':archiveNode(), 'router-node.png':routerNode(), 'hanoi-module.png':hanoiModule()};
THEMES.forEach((_, i) => { files[`city-${i}.png`] = buildScene(i, i); });
for (const [name, canvas] of Object.entries(files)) { writeFileSync(join(OUT, name), canvas.toPng()); console.log('wrote', name); }
