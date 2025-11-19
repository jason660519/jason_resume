(() => {
  const params = new URLSearchParams(location.search);
  const shouldShow = params.has('themeTest') || params.get('debug') === 'theme' || (typeof localStorage !== 'undefined' && localStorage.getItem('enableThemeTestOverlay') === '1');
  if (!shouldShow) return;
  const resultsEl = document.createElement('div');
  resultsEl.id = 'theme-test-results';
  resultsEl.style.position = 'fixed';
  resultsEl.style.right = '16px';
  resultsEl.style.bottom = '16px';
  resultsEl.style.zIndex = '99999';
  resultsEl.style.maxWidth = '360px';
  resultsEl.style.background = 'rgba(0,0,0,0.7)';
  resultsEl.style.color = '#fff';
  resultsEl.style.padding = '12px 16px';
  resultsEl.style.borderRadius = '8px';
  resultsEl.style.fontSize = '12px';
  resultsEl.style.lineHeight = '1.4';
  resultsEl.style.pointerEvents = 'none';
  document.body.appendChild(resultsEl);

  function log(title, ok, detail) {
    const item = document.createElement('div');
    item.textContent = `${ok ? '✅' : '❌'} ${title}${detail ? ' - ' + detail : ''}`;
    resultsEl.appendChild(item);
  }

  function getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function runUnit() {
    try {
      const before = document.documentElement.classList.contains('theme-modern');
      (window.themeSwitcher || { applyTheme: () => {} }).applyTheme(before ? 'classic' : 'modern', true);
      const after = document.documentElement.classList.contains('theme-modern');
      log('主題切換類名切換', before !== after);
      const primary = getVar('--primary-color');
      log('CSS 變數有效', !!primary, primary);
      const stored = localStorage.getItem('userThemePreference');
      log('localStorage 持久化', !!stored, stored);
    } catch (e) {
      log('單元測試執行', false, String(e));
    }
  }

  function snapshotStyles() {
    const selectors = ['.mobile-nav-toggle', '.skills .progress-bar', '.services .icon', '.portfolio .portfolio-wrap'];
    const snap = {};
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      const cs = getComputedStyle(el);
      snap[sel] = {
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
      };
    });
    log('樣式快照', true, JSON.stringify(snap));
  }

  function performanceBenchmark() {
    try {
      const N = 50;
      const t0 = performance.now();
      for (let i = 0; i < N; i++) {
        (window.themeSwitcher || { applyTheme: () => {} }).applyTheme(i % 2 ? 'modern' : 'classic', false);
      }
      const t1 = performance.now();
      log('切換性能（50 次）', true, `${Math.round(t1 - t0)} ms`);
    } catch (e) { log('切換性能', false, String(e)); }
  }

  function accessibilityChecks() {
    try {
      const progressbars = document.querySelectorAll('[role="progressbar"]');
      log('ARIA progressbar 存在', progressbars.length > 0, `count=${progressbars.length}`);
      const header = document.getElementById('header');
      const headerContrast = (window.ThemeDiagnostics || { checkContrast: () => ({ ratio: 0 }) }).checkContrast();
      log('主色對比度 AA', headerContrast.passAA, `ratio=${headerContrast.ratio.toFixed(2)}`);
      const font = (window.ThemeDiagnostics || { checkFontReadability: () => ({ pass: true }) }).checkFontReadability();
      log('字體可讀性', font.pass, `lineHeightRatio=${font.lineHeightRatio}`);
    } catch (e) { log('無障礙檢查', false, String(e)); }
  }

  function pressureTest() {
    try {
      const N = 20;
      for (let i = 0; i < N; i++) {
        setTimeout(() => (window.themeSwitcher || { applyTheme: () => {} }).applyTheme(i % 2 ? 'modern' : 'classic', false), i * 10);
      }
      log('壓力測試啟動', true, `迭代 ${N}`);
    } catch (e) { log('壓力測試', false, String(e)); }
  }

  function boot() {
    runUnit();
    snapshotStyles();
    performanceBenchmark();
    accessibilityChecks();
    pressureTest();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();