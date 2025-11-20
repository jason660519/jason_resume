class ThemeSwitcher {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'theme';
    this.defaultTheme = options.defaultTheme || 'theme-classic';
    this.root = document.documentElement;
    this.body = document.body;
    this.toggleSelector = options.toggleSelector || '[data-theme-toggle],#themeToggle';
    this.selectSelector = options.selectSelector || '[data-style-switcher],#styleSwitcher';
    this.transitionClass = options.transitionClass || 'theme-animating';
    this.transitionMs = 200;
    this.themeClasses = ['theme-classic','theme-modern','theme-minimal','theme-vintage','theme-futuristic'];
  }

  init() {
    const pref = this.getPreference() || this.defaultTheme;
    this.applyTheme(pref, false);
    this.bindEvents();
    window.themeSwitcher = this;
    window.ThemeDiagnostics = new ThemeDiagnostics();
  }

  bindEvents() {
    document.addEventListener('click', e => {
      const t = e.target.closest(this.toggleSelector);
      if (!t) return;
      const next = this.nextTheme(this.currentTheme());
      this.applyTheme(next, true);
    });
    document.addEventListener('change', e => {
      const t = e.target.closest(this.selectSelector);
      if (!t) return;
      const value = String(t.value || '').trim();
      if (this.themeClasses.includes(value)) this.applyTheme(value, true);
    });
  }

  getPreference() {
    try { return localStorage.getItem(this.storageKey); } catch { return null; }
  }

  setPreference(theme) {
    try { localStorage.setItem(this.storageKey, theme); } catch {}
  }

  currentTheme() {
    for (const cls of this.themeClasses) if (this.root.classList.contains(cls)) return cls;
    return this.defaultTheme;
  }

  nextTheme(current) {
    const i = this.themeClasses.indexOf(current);
    const ni = i >= 0 ? (i + 1) % this.themeClasses.length : 0;
    return this.themeClasses[ni];
  }

  applyTheme(theme, persist) {
    this.themeClasses.forEach(c => { this.root.classList.remove(c); this.body.classList.remove(c); });
    this.root.classList.add(theme);
    this.body.classList.add(theme);
    this.root.setAttribute('data-theme', theme);
    this.animateTransition();
    if (persist) this.setPreference(theme);
  }

  animateTransition() {
    this.root.classList.add(this.transitionClass);
    this.body.classList.add(this.transitionClass);
    setTimeout(() => { this.root.classList.remove(this.transitionClass); this.body.classList.remove(this.transitionClass); }, this.transitionMs);
  }
}

class ThemeDiagnostics {
  contrastRatio(hex1, hex2) {
    const l1 = this.luminance(hex1);
    const l2 = this.luminance(hex2);
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
  }

  luminance(hex) {
    const rgb = this.hexToRgb(hex);
    const srgb = rgb.map(v => v / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  hexToRgb(hex) {
    const h = hex.replace('#', '');
    const v = h.length === 3 ? h.split('').map(x => x + x).join('') : h;
    return [parseInt(v.substring(0, 2), 16), parseInt(v.substring(2, 4), 16), parseInt(v.substring(4, 6), 16)];
  }

  getVar(name) {
    const s = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return s || '#000000';
  }

  checkContrast() {
    const p = this.getVar('--primary-color');
    const bg = this.getVar('--background-color');
    const ratio = this.contrastRatio(p, bg);
    return { primary: p, background: bg, ratio, passAA: ratio >= 4.5, passAAA: ratio >= 7 };
  }

  checkFontReadability() {
    const cs = getComputedStyle(document.body);
    const size = parseFloat(cs.fontSize);
    const lh = parseFloat(cs.lineHeight);
    const ratio = lh / size;
    return { fontFamily: cs.fontFamily, fontSizePx: size, lineHeightPx: lh, lineHeightRatio: ratio, recommendedMin: 1.4, pass: ratio >= 1.4 };
  }

  checkLayoutIntegrity() {
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const okHeader = header ? header.offsetWidth > 0 && header.offsetHeight > 0 : true;
    const okMain = main ? main.offsetWidth > 0 && main.offsetHeight > 0 : true;
    return { headerOk: okHeader, mainOk: okMain };
  }
}

function boot() {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => new ThemeSwitcher().init());
  else new ThemeSwitcher().init();
}

boot();