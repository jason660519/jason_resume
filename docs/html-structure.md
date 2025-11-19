# HTML 結構更新說明

## 載入順序
- `assets/css/style.css`：原始樣式基底
- `themes/classic-theme.css`：傳統（Classic）主題變數與覆寫
- `themes/modern-theme.css`：現代（Modern）主題變數與覆寫

## 主題切換元素
- 切換按鈕：`<button id="themeToggle" data-theme-toggle>`（置於各頁面 header 區塊的語系按鈕旁）
- 切換方式：點擊按鈕在 `document.documentElement.classList` 上切換 `theme-modern`／`theme-classic`

## 腳本載入
- `js/theme-switcher.js`：主題控制器與診斷工具
- `test/theme-test-suite.js`：瀏覽端自動化測試（單元、快照、性能與壓力測試）

## 關聯頁面
- `index.html`／`index-en.html`／`index-zh.html`／`index-zh-hans.html`：皆已整合主題切換與測試腳本
- `inner-page.html`：已整合主題切換與測試腳本

## 屬性與狀態
- `document.documentElement[data-theme]`：反映目前主題（`modern`／`classic`）
- `localStorage.userThemePreference`：持久化使用者偏好（`modern`／`classic`）