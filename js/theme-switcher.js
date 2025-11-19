class ThemeSwitcher {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'userThemePreference';
    this.defaultTheme = options.defaultTheme || 'classic';
    this.root = document.documentElement;
    this.toggleSelector = options.toggleSelector || '[data-theme-toggle],#themeToggle';
    this.transitionClass = options.transitionClass || 'theme-animating';
    this.transitionMs = 300;
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
      const next = this.currentTheme() === 'modern' ? 'classic' : 'modern';
      this.applyTheme(next, true);
    });
    document.addEventListener('change', e => {
      const t = e.target.closest('[data-theme-select]');
      if (!t) return;
      const value = String(t.value || '').toLowerCase();
      if (value === 'modern' || value === 'classic') this.applyTheme(value, true);
    });
  }

  getPreference() {
    try { return localStorage.getItem(this.storageKey); } catch { return null; }
  }

  setPreference(theme) {
    try { localStorage.setItem(this.storageKey, theme); } catch {}
  }

  currentTheme() {
    return this.root.classList.contains('theme-modern') ? 'modern' : 'classic';
  }

  applyTheme(theme, persist) {
    this.root.classList.remove('theme-modern', 'theme-classic');
    if (theme === 'modern') this.root.classList.add('theme-modern'); else this.root.classList.add('theme-classic');
    this.root.setAttribute('data-theme', theme);
    this.animateTransition();
    if (persist) this.setPreference(theme);
  }

  animateTransition() {
    this.root.classList.add(this.transitionClass);
    setTimeout(() => { this.root.classList.remove(this.transitionClass); }, this.transitionMs);
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