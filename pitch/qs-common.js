/* Quick Style — Brand Pitch shared helpers */
(function () {
  var SUPABASE_URL = 'https://ufmvwyjkadzcyiehovhq.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_UfnJPeP_gprFhvMxTdD7SA_Te4T2HLK';
  var QS = (window.QS = window.QS || {});
  QS.SUPABASE_URL = SUPABASE_URL;
  QS.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  QS.LOGO = './assets/Quick-Style_Symbol_Black_RGB.png';

  // Proof numbers (from the Legacy script / strategy doc). Keys are what pitches store.
  QS.STATS = {
    years:     { value: '20',   label: 'Years since Oslo, 2006' },
    countries: { value: '50+',  label: 'Countries performed in' },
    yt_views:  { value: '1.1B', label: 'YouTube views' },
    reach:     { value: '7.6B', label: 'Total reach' },
    followers: { value: '12M',  label: 'Followers' },
    weekly:    { value: '40M',  label: 'Weekly views' },
    bwl:       { value: '1.8B', label: 'Views — BTS “Boy With Luv”' },
    ed:        { value: '770M', label: 'Views in one month — Ed Sheeran' }
  };

  QS.VERTICALS = [
    'Performance & Entertainment', 'Fashion & Runway', 'Gaming & Motion Capture',
    'Sports Performance', 'Environment & Space Design', 'Camera Production & Movement Direction',
    'Wellness & Education', 'Quick Style Studio'
  ];

  QS.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  QS.paras = function (s) {
    return String(s || '').split(/\n\s*\n/).filter(Boolean).map(function (p) { return '<p>' + QS.esc(p.trim()) + '</p>'; }).join('');
  };

  QS.ytId = function (url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,15})/);
    return m ? m[1] : null;
  };
  QS.vimeoId = function (url) {
    var m = String(url || '').match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
  };
  QS.isVideoFile = function (url) { return /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url || ''); };
  QS.thumbFor = function (m) {
    if (m.thumb_url) return m.thumb_url;
    var y = QS.ytId(m.url);
    if (y) return 'https://img.youtube.com/vi/' + y + '/hqdefault.jpg';
    if (!QS.isVideoFile(m.url) && !QS.vimeoId(m.url)) return m.url;
    return null;
  };
  QS.embedFor = function (url) {
    var y = QS.ytId(url);
    if (y) return 'https://www.youtube-nocookie.com/embed/' + y + '?autoplay=1&rel=0&modestbranding=1';
    var v = QS.vimeoId(url);
    if (v) return 'https://player.vimeo.com/video/' + v + '?autoplay=1';
    return null;
  };

  // Glow palette derived from the site's accent colour (same maths as thequickstyle.com)
  function hexToRgb(hex) { hex = hex.replace('#', ''); if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join(''); var n = parseInt(hex, 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; }
  function rgbToHex(r, g, b) { return '#' + [r, g, b].map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }).join(''); }
  function rgbToHsl(r, g, b) { r /= 255; g /= 255; b /= 255; var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2; if (max === min) { h = s = 0; } else { var d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; default: h = (r - g) / d + 4; } h /= 6; } return { h: h, s: s, l: l }; }
  function hslToRgb(h, s, l) { var r, g, b; if (s === 0) { r = g = b = l; } else { var hue2rgb = function (p, q, t) { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }; var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q; r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3); } return { r: r * 255, g: g * 255, b: b * 255 }; }
  function mixHex(a, b, t) { var x = hexToRgb(a), y = hexToRgb(b); return rgbToHex(x.r + (y.r - x.r) * t, x.g + (y.g - x.g) * t, x.b + (y.b - x.b) * t); }
  QS.applyAccent = function (hex) {
    if (!hex || !/^#?[0-9a-f]{3,6}$/i.test(hex)) return;
    if (hex[0] !== '#') hex = '#' + hex;
    var hsl = rgbToHsl.apply(null, Object.values(hexToRgb(hex)));
    var g2 = hslToRgb(hsl.h, hsl.s, hsl.l * 0.507), g1 = hslToRgb(hsl.h, hsl.s, hsl.l * 0.178);
    var glow2 = rgbToHex(g2.r, g2.g, g2.b), glow1 = rgbToHex(g1.r, g1.g, g1.b);
    var root = document.documentElement.style;
    root.setProperty('--glow-3', hex); root.setProperty('--glow-2', glow2); root.setProperty('--glow-1', glow1);
    root.setProperty('--glow-edge', mixHex(glow2, hex, 0.082));
  };

  QS.usernameToEmail = function (v) { v = String(v || '').trim(); return v.indexOf('@') === -1 ? v + '@thequickstyle.com' : v; };
  QS.slugify = function (s) {
    return String(s || 'brand').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 48) || 'brand';
  };
  QS.pitchUrl = function (slug) {
    var base = location.href.replace(/[^/]*([?#].*)?$/, '');
    return base + '?b=' + encodeURIComponent(slug);
  };
})();
