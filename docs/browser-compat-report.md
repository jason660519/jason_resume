# 瀏覽器相容性報告

## CSS 變數支援
- 現代瀏覽器（Chromium、Firefox、Safari）：完整支援 `var()` 與 `@supports`
- IE11：不支援 CSS 變數，採用既有樣式與明確回退規則（見主題檔）

## 動畫與過渡
- `transition: all 0.3s ease` 於主流瀏覽器表現一致
- IE11：過渡效果有限，但維持功能完整

## 字體載入
- 透過 Google Fonts 載入 `Roboto`，並以系統字族為回退

## 測試摘要（以 `test/theme-test-suite.js`）
- 單元測試：類名切換、變數可用、localStorage 持久化
- 快照測試：關鍵元件樣式快照（背景色、圓角、陰影）
- 性能測試：50 次切換平均於數十毫秒
- 壓力測試：連續快速切換無阻塞或重大佈局錯誤

## 無障礙考量
- 對比度檢查：以主題診斷工具評估 `--primary-color` 與 `--background-color` 對比
- 字體可讀性：檢查 `line-height / font-size` 比值，建議 ≥ 1.4