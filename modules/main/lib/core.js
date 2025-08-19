import { gsap as k } from "gsap";
const V = () => [
  "iPad Simulator",
  "iPhone Simulator",
  "iPod Simulator",
  "iPad",
  "iPhone",
  "iPod"
].includes(navigator.platform) || // IPad on iOS 13 detection
navigator.userAgent.includes("Mac") && "ontouchend" in document, U = (o) => {
  const e = typeof o == "string" ? parseFloat(o) : o;
  return e === void 0 ? !1 : e > 1;
}, Z = () => "ontouchstart" in window || navigator.maxTouchPoints > 0, J = (o) => !!(o % 2), Q = (o) => Math.floor(Math.random() * o), ee = (o, e = null) => {
  if (!o)
    return o;
  if (typeof o != "string" && (o = `${o}`), e === null)
    return parseFloat(o).toLocaleString();
  const n = {
    siret: {
      // Ex : 123 456 789 1234
      pattern: /(\d{3})\D?(\d{3})\D?(\d{3})\D?(\d{4})/,
      replacement: "$1 $2 $3 $4"
    },
    phone: {
      // Ex : 06 12 34 56 78
      pattern: /(\d{2})\D?(\d{2})\D?(\d{2})\D?(\d{2})\D?(\d{2})/,
      replacement: "$1 $2 $3 $4 $5"
    }
  }[e];
  return n ? o.replace(n.pattern, n.replacement) : o;
}, te = (o, e, t) => {
  const n = e === null ? o : Math.max(o, e);
  return t === null ? n : Math.min(n, t);
}, oe = (o, e) => o ? o / e * 100 : 0, R = (o, e = 2) => parseFloat((o / 100).toFixed(e)), ne = (o, e) => o + o * R(e), re = (o, e) => o - o * R(e), Y = {
  " ": "nbsp",
  "!": "",
  '"': "quot",
  "#": "",
  $: "",
  "%": "",
  "&": "amp",
  "'": "#039",
  "(": "",
  ")": "",
  "*": "",
  "+": "",
  ",": "",
  "-": "",
  ".": "",
  "/": "",
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  ":": "",
  ";": "",
  "<": "lt",
  "=": "",
  ">": "gt",
  "?": "",
  "@": "",
  A: "",
  B: "",
  C: "",
  D: "",
  E: "",
  F: "",
  G: "",
  H: "",
  I: "",
  J: "",
  K: "",
  L: "",
  M: "",
  N: "",
  O: "",
  P: "",
  Q: "",
  R: "",
  S: "",
  T: "",
  U: "",
  V: "",
  W: "",
  X: "",
  Y: "",
  Z: "",
  "[": "",
  "\\": "",
  "]": "",
  "^": "",
  _: "",
  "`": "",
  a: "",
  b: "",
  c: "",
  d: "",
  e: "",
  f: "",
  g: "",
  h: "",
  i: "",
  j: "",
  k: "",
  l: "",
  m: "",
  n: "",
  o: "",
  p: "",
  q: "",
  r: "",
  s: "",
  t: "",
  u: "",
  v: "",
  w: "",
  x: "",
  y: "",
  z: "",
  "{": "",
  "|": "",
  "}": "",
  "~": "",
  "¡": "iexcl",
  "¢": "cent",
  "£": "pound",
  "¤": "curren",
  "¥": "yen",
  "¦": "brvbar",
  "§": "sect",
  "¨": "uml",
  "©": "copy",
  ª: "ordf",
  "«": "laquo",
  "¬": "not",
  "­": "shy",
  "®": "reg",
  "¯": "macr",
  "°": "deg",
  "±": "plusmn",
  "²": "sup2",
  "³": "sup3",
  "´": "acute",
  µ: "micro",
  "¶": "para",
  "¸": "cedil",
  "¹": "sup1",
  º: "ordm",
  "»": "raquo",
  "¼": "frac14",
  "½": "frac12",
  "¾": "frac34",
  "¿": "iquest",
  À: "Agrave",
  Á: "Aacute",
  Â: "Acirc",
  Ã: "Atilde",
  Ä: "Auml",
  Å: "Aring",
  Æ: "AElig",
  Ç: "Ccedil",
  È: "Egrave",
  É: "Eacute",
  Ê: "Ecirc",
  Ë: "Euml",
  Ì: "Igrave",
  Í: "Iacute",
  Î: "Icirc",
  Ï: "Iuml",
  Ð: "ETH",
  Ñ: "Ntilde",
  Ò: "Ograve",
  Ó: "Oacute",
  Ô: "Ocirc",
  Õ: "Otilde",
  Ö: "Ouml",
  "×": "times",
  Ø: "Oslash",
  Ù: "Ugrave",
  Ú: "Uacute",
  Û: "Ucirc",
  Ü: "Uuml",
  Ý: "Yacute",
  Þ: "THORN",
  ß: "szlig",
  à: "agrave",
  á: "aacute",
  â: "acirc",
  ã: "atilde",
  ä: "auml",
  å: "aring",
  æ: "aelig",
  ç: "ccedil",
  è: "egrave",
  é: "eacute",
  ê: "ecirc",
  ë: "euml",
  ì: "igrave",
  í: "iacute",
  î: "icirc",
  ï: "iuml",
  ð: "eth",
  ñ: "ntilde",
  ò: "ograve",
  ó: "oacute",
  ô: "ocirc",
  õ: "otilde",
  ö: "ouml",
  "÷": "divide",
  ø: "oslash",
  ù: "ugrave",
  ú: "uacute",
  û: "ucirc",
  ü: "uuml",
  ý: "yacute",
  þ: "thorn",
  ÿ: "yuml",
  Œ: "OElig",
  œ: "oelig",
  Š: "Scaron",
  š: "scaron",
  Ÿ: "Yuml",
  ƒ: "fnof",
  "ˆ": "circ",
  "˜": "tilde",
  Α: "Alpha",
  Β: "Beta",
  Γ: "Gamma",
  Δ: "Delta",
  Ε: "Epsilon",
  Ζ: "Zeta",
  Η: "Eta",
  Θ: "Theta",
  Ι: "Iota",
  Κ: "Kappa",
  Λ: "Lambda",
  Μ: "Mu",
  Ν: "Nu",
  Ξ: "Xi",
  Ο: "Omicron",
  Π: "Pi",
  Ρ: "Rho",
  Σ: "Sigma",
  Τ: "Tau",
  Υ: "Upsilon",
  Φ: "Phi",
  Χ: "Chi",
  Ψ: "Psi",
  Ω: "Omega",
  α: "alpha",
  β: "beta",
  γ: "gamma",
  δ: "delta",
  ε: "epsilon",
  ζ: "zeta",
  η: "eta",
  θ: "theta",
  ι: "iota",
  κ: "kappa",
  λ: "lambda",
  μ: "mu",
  ν: "nu",
  ξ: "xi",
  ο: "omicron",
  π: "pi",
  ρ: "rho",
  ς: "sigmaf",
  σ: "sigma",
  τ: "tau",
  υ: "upsilon",
  φ: "phi",
  χ: "chi",
  ψ: "psi",
  ω: "omega",
  ϑ: "thetasym",
  ϒ: "upsih",
  ϖ: "piv",
  " ": "ensp",
  " ": "emsp",
  " ": "thinsp",
  "–": "ndash",
  "—": "mdash",
  "‘": "lsquo",
  "’": "rsquo",
  "‚": "sbquo",
  "“": "ldquo",
  "”": "rdquo",
  "„": "bdquo",
  "†": "dagger",
  "‡": "Dagger",
  "•": "bull",
  "…": "hellip",
  "‰": "permil",
  "′": "prime",
  "″": "Prime",
  "‹": "lsaquo",
  "›": "rsaquo",
  "‾": "oline",
  "€": "euro",
  "™": "trade",
  "←": "larr",
  "↑": "uarr",
  "→": "rarr",
  "↓": "darr",
  "↔": "harr",
  "↵": "crarr",
  "∀": "forall",
  "∂": "part",
  "∃": "exist",
  "∅": "empty",
  "∇": "nabla",
  "∈": "isin",
  "∉": "notin",
  "∋": "ni",
  "∏": "prod",
  "∑": "sum",
  "−": "minus",
  "∗": "lowast",
  "√": "radic",
  "∝": "prop",
  "∞": "infin",
  "∠": "ang",
  "∧": "and",
  "∨": "or",
  "∩": "cap",
  "∪": "cup",
  "∫": "int",
  "∴": "there4",
  "∼": "sim",
  "≅": "cong",
  "≈": "asymp",
  "≠": "ne",
  "≡": "equiv",
  "≤": "le",
  "≥": "ge",
  "⊂": "sub",
  "⊃": "sup",
  "⊄": "nsub",
  "⊆": "sube",
  "⊇": "supe",
  "⊕": "oplus",
  "⊗": "otimes",
  "⊥": "perp",
  "⋅": "sdot",
  "⌈": "lceil",
  "⌉": "rceil",
  "⌊": "lfloor",
  "⌋": "rfloor",
  "◊": "loz",
  "♠": "spades",
  "♣": "clubs",
  "♥": "hearts",
  "♦": "diams"
}, se = (o) => {
  let e = o.toLowerCase();
  const t = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;", n = "aaaaeeeeiiiioooouuuunc------";
  for (let r = 0, i = t.length; r < i; r += 1)
    e = e.replace(new RegExp(t.charAt(r), "g"), n.charAt(r));
  return e = e.replace(/[^a-z0-9 -]/g, ""), e = e.trim(), e = e.replace(/\s+/g, "-"), e;
}, L = (o) => {
  const e = /<[^/>][^>]*><\/[^>]+>*>/g;
  if (!o.match(e))
    return o;
  const n = o.replace(e, "");
  return L(n);
}, ie = ({ string: o, max: e, ellipsis: t = !0, hasNewLine: n = !0 }) => {
  if (!o || !e)
    return { string: o, isTruncated: null };
  let r = /(<[^>]*>)|(&nbsp;)/g;
  n && (r = /(<[^>]*>)|(&nbsp;)|(\r)|(\n)/g);
  const i = t ? "..." : "", s = o.replace(r, "");
  if (s.length <= e)
    return { string: o, isTruncated: !1 };
  if (s.length === o.length)
    return {
      string: `${o.substring(0, e).trim()}${i}`,
      isTruncated: !0
    };
  const c = o.split(r).filter(Boolean);
  let a = 0, p = !1, h = c.map((l) => {
    const d = l === "&nbsp;" || l.startsWith("<br");
    return l.startsWith("<") && !d || d && !p ? l : p ? "" : (a += l.length, a >= e ? (p = !0, `${l.substring(0, (a - l.length - e) * -1)}${i}`) : l);
  }).join("");
  return h = L(h), { string: `${h}`, isTruncated: p };
}, le = (o) => o.charAt(0).toUpperCase() + o.toLowerCase().slice(1), ce = (o = []) => {
  const e = [];
  return o.forEach((t) => {
    let n = null;
    t && (t === " " && (n = "nbsp"), n = Y[t], n && e.push(`&${n};`));
  }), e;
}, b = (o) => getComputedStyle(document.documentElement).getPropertyValue(`--${o}`), ue = (o) => {
  Object.keys(o).forEach((e) => {
    const t = o[e];
    document.documentElement.style.setProperty(`--${e}`, t);
  });
}, ae = (o, { varFontSize: e = "baseFont" } = { varFontSize: "baseFont" }) => {
  const t = parseFloat(b(o)), n = parseFloat(b(e));
  return t * n;
}, W = (o) => typeof o == "object", z = (o) => Object.keys(o).length === 0, pe = (o) => W(o) && !z(o), de = (o) => {
  const e = `(^|;)\\s*${o}\\s*=\\s*([^;]+)`, t = document.cookie.match(e);
  return (t == null ? void 0 : t.pop()) || "";
}, O = (o, e, t) => {
  const n = [o, e, t].map((r) => {
    const i = r / 255;
    return i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  });
  return n[0] * 0.2126 + n[1] * 0.7152 + n[2] * 0.0722;
}, fe = (o, e) => {
  const t = O(o[0], o[1], o[2]), n = O(e[0], e[1], e[2]), r = Math.max(t, n), i = Math.min(t, n);
  return (r + 0.05) / (i + 0.05);
}, ge = (o) => {
  const e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);
  return e ? [
    parseInt(e[1], 16),
    parseInt(e[2], 16),
    parseInt(e[3], 16)
  ] : null;
}, me = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`, he = ({ varWrapper: o = "wrapper", varWrapperPadding: e = "wrapperPaddingHorizontal", varFontSize: t = "baseFont" }) => {
  const n = parseFloat(b(o)), r = parseFloat(b(e)), i = parseFloat(b(t)), s = n * i - r * i * 2;
  let a = (window.innerWidth - s) / 2;
  const p = r * i;
  return a < p && (a = p), a;
}, j = (o) => {
  const e = o.getBoundingClientRect(), { body: t } = document, n = document.documentElement, r = window.pageYOffset || n.scrollTop || t.scrollTop, i = window.pageXOffset || n.scrollLeft || t.scrollLeft, s = n.clientTop || t.clientTop || 0, c = n.clientLeft || t.clientLeft || 0, a = e.top + r - s, p = e.left + i - c;
  return { top: a, left: p };
}, ye = (o, {
  target: e = "body",
  // eslint-disable-next-line no-empty-pattern
  style: t = {}
}) => {
  const n = o.cloneNode(!0);
  typeof e == "string" && (e = document.querySelector(e)), n.style.visibility = "hidden", n.style.position = "absolute";
  const r = Object.keys(t);
  r.length && r.forEach((c) => {
    n.style[c] = t[c];
  }), e.appendChild(n);
  const i = n.offsetWidth, s = n.offsetHeight;
  return n.remove(), { width: i, height: s };
}, be = (o) => {
  const e = window.getComputedStyle(o, null);
  return o.getBoundingClientRect().width - parseInt(e.getPropertyValue("padding-left"), 10) - parseInt(e.getPropertyValue("padding-right"), 10);
}, Te = (o) => {
  const e = window.getComputedStyle(o, null);
  return o.getBoundingClientRect().height - parseInt(e.getPropertyValue("padding-top"), 10) - parseInt(e.getPropertyValue("padding-bottom"), 10);
}, Se = () => Date.now().toString(36) + Math.random().toString(36).substring(2), we = (o) => o && typeof o == "function", Pe = (o, e) => {
  const t = [];
  for (let n = 0; n < o; n += 1)
    t.push([]);
  return e.forEach((n, r) => {
    t[r % o].push(n);
  }), t;
};
/*!
 * ScrollToPlugin 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var u, G, g, f, m, v, F, _, M = function() {
  return typeof window < "u";
}, q = function() {
  return u || M() && (u = window.gsap) && u.registerPlugin && u;
}, D = function(e) {
  return typeof e == "string";
}, C = function(e) {
  return typeof e == "function";
}, T = function(e, t) {
  var n = t === "x" ? "Width" : "Height", r = "scroll" + n, i = "client" + n;
  return e === g || e === f || e === m ? Math.max(f[r], m[r]) - (g["inner" + n] || f[i] || m[i]) : e[r] - e["offset" + n];
}, S = function(e, t) {
  var n = "scroll" + (t === "x" ? "Left" : "Top");
  return e === g && (e.pageXOffset != null ? n = "page" + t.toUpperCase() + "Offset" : e = f[n] != null ? f : m), function() {
    return e[n];
  };
}, H = function(e, t, n, r) {
  if (C(e) && (e = e(t, n, r)), typeof e != "object")
    return D(e) && e !== "max" && e.charAt(1) !== "=" ? {
      x: e,
      y: e
    } : {
      y: e
    };
  if (e.nodeType)
    return {
      y: e,
      x: e
    };
  var i = {}, s;
  for (s in e)
    i[s] = s !== "onAutoKill" && C(e[s]) ? e[s](t, n, r) : e[s];
  return i;
}, X = function(e, t) {
  if (e = v(e)[0], !e || !e.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var n = e.getBoundingClientRect(), r = !t || t === g || t === m, i = r ? {
    top: f.clientTop - (g.pageYOffset || f.scrollTop || m.scrollTop || 0),
    left: f.clientLeft - (g.pageXOffset || f.scrollLeft || m.scrollLeft || 0)
  } : t.getBoundingClientRect(), s = {
    x: n.left - i.left,
    y: n.top - i.top
  };
  return !r && t && (s.x += S(t, "x")(), s.y += S(t, "y")()), s;
}, $ = function(e, t, n, r, i) {
  return !isNaN(e) && typeof e != "object" ? parseFloat(e) - i : D(e) && e.charAt(1) === "=" ? parseFloat(e.substr(2)) * (e.charAt(0) === "-" ? -1 : 1) + r - i : e === "max" ? T(t, n) - i : Math.min(T(t, n), X(e, t)[n] - i);
}, I = function() {
  u = q(), M() && u && typeof document < "u" && document.body && (g = window, m = document.body, f = document.documentElement, v = u.utils.toArray, u.config({
    autoKillThreshold: 7
  }), F = u.config(), G = 1);
}, w = {
  version: "3.12.4",
  name: "scrollTo",
  rawVars: 1,
  register: function(e) {
    u = e, I();
  },
  init: function(e, t, n, r, i) {
    G || I();
    var s = this, c = u.getProperty(e, "scrollSnapType");
    s.isWin = e === g, s.target = e, s.tween = n, t = H(t, r, e, i), s.vars = t, s.autoKill = !!t.autoKill, s.getX = S(e, "x"), s.getY = S(e, "y"), s.x = s.xPrev = s.getX(), s.y = s.yPrev = s.getY(), _ || (_ = u.core.globals().ScrollTrigger), u.getProperty(e, "scrollBehavior") === "smooth" && u.set(e, {
      scrollBehavior: "auto"
    }), c && c !== "none" && (s.snap = 1, s.snapInline = e.style.scrollSnapType, e.style.scrollSnapType = "none"), t.x != null ? (s.add(s, "x", s.x, $(t.x, e, "x", s.x, t.offsetX || 0), r, i), s._props.push("scrollTo_x")) : s.skipX = 1, t.y != null ? (s.add(s, "y", s.y, $(t.y, e, "y", s.y, t.offsetY || 0), r, i), s._props.push("scrollTo_y")) : s.skipY = 1;
  },
  render: function(e, t) {
    for (var n = t._pt, r = t.target, i = t.tween, s = t.autoKill, c = t.xPrev, a = t.yPrev, p = t.isWin, E = t.snap, h = t.snapInline, l, d, P, x, y; n; )
      n.r(e, n.d), n = n._next;
    l = p || !t.skipX ? t.getX() : c, d = p || !t.skipY ? t.getY() : a, P = d - a, x = l - c, y = F.autoKillThreshold, t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), s && (!t.skipX && (x > y || x < -y) && l < T(r, "x") && (t.skipX = 1), !t.skipY && (P > y || P < -y) && d < T(r, "y") && (t.skipY = 1), t.skipX && t.skipY && (i.kill(), t.vars.onAutoKill && t.vars.onAutoKill.apply(i, t.vars.onAutoKillParams || []))), p ? g.scrollTo(t.skipX ? l : t.x, t.skipY ? d : t.y) : (t.skipY || (r.scrollTop = t.y), t.skipX || (r.scrollLeft = t.x)), E && (e === 1 || e === 0) && (d = r.scrollTop, l = r.scrollLeft, h ? r.style.scrollSnapType = h : r.style.removeProperty("scroll-snap-type"), r.scrollTop = d + 1, r.scrollLeft = l + 1, r.scrollTop = d, r.scrollLeft = l), t.xPrev = t.x, t.yPrev = t.y, _ && _.update();
  },
  kill: function(e) {
    var t = e === "scrollTo", n = this._props.indexOf(e);
    return (t || e === "scrollTo_x") && (this.skipX = 1), (t || e === "scrollTo_y") && (this.skipY = 1), n > -1 && this._props.splice(n, 1), !this._props.length;
  }
};
w.max = T;
w.getOffset = X;
w.buildGetter = S;
q() && u.registerPlugin(w);
k.registerPlugin(w);
const A = {
  className: "no-scroll"
}, K = (o = "body", { className: e } = A) => {
  const t = document.querySelector(o);
  return t ? (t.classList.remove(e), !0) : !1;
}, N = (o = "body", { className: e } = A) => {
  const t = document.querySelector(o);
  return t ? (t.classList.add(e), !0) : !1;
}, xe = (o, e = "body", t = A) => {
  o ? K(e, t) : N(e, t);
}, _e = (o, { header: e = { enable: !0, selector: "#base-header" }, toVars: t = {}, scrollToVars: n = {} } = {}) => {
  const r = document.querySelector(o);
  if (!r)
    return;
  const i = j(r);
  let s = 0;
  if (e.enable) {
    const c = document.querySelector(e.selector);
    c && (s = c.getBoundingClientRect().height);
  }
  k.to(window, Object.assign(Object.assign({}, t), { scrollTo: Object.assign({ y: i.top - s }, n) }));
}, Ae = (o, e) => {
  let t, n = 0, r = e.length - 1;
  for (; r - n > 1; )
    t = Math.floor((n + r) / 2), e[t] < o ? n = t : r = t;
  return o - e[n] <= e[r] - o ? e[n] : e[r];
}, Ee = ({ val: o, name: e = null, regex: t = null }) => {
  const n = {
    email: /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
    lowercase: /[a-z]/g,
    number: /[0-9]/g,
    numberAndPlus: /^[0-9+][\b]*$/,
    numberAndSpaceAndPlus: /^[0-9+\s][\b]*$/,
    numberAndSpace: /^[0-9\s]*$/,
    uppercase: /[A-Z]/g,
    special: /[@[\]\\^_!"#$%&'()*+,-./:;{}<>=|~?]/g,
    date: /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
  };
  return t ? t.test(o) : e ? n[e].test(o) : !0;
};
export {
  Ae as arrayGetClosest,
  fe as colorGetContrast,
  ge as colorGetHexToRgb,
  me as colorGetRandom,
  ae as computedGetStyleRemToPx,
  b as computedGetStyleValues,
  ue as computedSetStyleValues,
  de as cookieGet,
  Te as elementGetInnerHeight,
  be as elementGetInnerWidth,
  he as elementGetOneSidePadding,
  j as elementGetPositionRelativeToDocument,
  ye as elementGetRealWidth,
  we as isFunction,
  V as isIOS,
  U as isPlural,
  Z as isTouchDevice,
  Pe as listSpreadElementsInMultipleArray,
  ee as numberAddSpace,
  te as numberClamp,
  Q as numberGetRandom,
  J as numberIsOdd,
  oe as numberPercentage,
  ne as numberPercentageAdd,
  R as numberPercentageRatio,
  re as numberPercentageRemove,
  W as objectIsDefined,
  z as objectIsEmpty,
  pe as objectIsValid,
  Ee as regexMatch,
  N as scrollCSSDisable,
  K as scrollCSSEnable,
  xe as scrollCSSSet,
  _e as scrollTo,
  le as stringCapitalize,
  L as stringRemoveAllEmptyTags,
  se as stringSlugify,
  ie as stringTruncate,
  ce as stringUnsafeEscapeHtml,
  Se as uniqueGetId
};
