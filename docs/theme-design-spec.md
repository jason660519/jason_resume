# 主題設計規範（Modern / Classic）

## 色彩系統（CSS 變數）
- 基底變數（Classic 預設於 `:root`，Modern 於 `.theme-modern`）：
  - `--primary-color`、`--secondary-color`、`--accent-color`
  - `--background-color`、`--background-alt`
  - `--text-color`、`--muted-text-color`
  - `--link-color`、`--link-hover-color`
  - `--section-title-color`、`--section-highlight`
  - `--header-bg`、`--profile-border-color`

## 字體
- 無襯線字族（Sans-serif）：`"SF Pro Text", "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif`
- 於主題檔覆寫 `body { font-family: var(--font-sans); }`

## 圓角與陰影
- 圓角：`--border-radius: 8px`
- 陰影：`--box-shadow: 0 4px 12px rgba(0,0,0,0.1)`

## 響應式間距
- 基準 8px：`--space-1: 8px`、`--space-2: 16px`、`--space-3: 24px`、`--space-4: 32px`
- 例：`.nav-menu a { margin-bottom: var(--space-1); }`、`.section-title { padding-bottom: var(--space-3); }`

## 變數覆寫機制
- 根變數：Classic 置於 `:root`
- 主題變數：Modern 置於 `.theme-modern`，Classic 於 `.theme-classic`
- 元件覆寫：於主題檔以既有選擇器覆寫（如 `.services .icon`、`.portfolio .portfolio-wrap`）

## 動畫與過渡
- 過渡時間：`--transition-fast: all 0.3s ease`
- 切換時套用：`html.theme-animating *, html.theme-animating, body.theme-animating { transition: all 0.3s ease !important; }`

## 漸進式增強
- `@supports (color: var(--primary-color))`：支援變數時套用主題覆寫
- 不支援時沿用原有 `assets/css/style.css` 與 IE11 回退設定

## IE11 回退
- 條件媒體查詢：`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`
- 實作：提供預設色彩與連結樣式，以確保可用性