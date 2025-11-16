## 專案概況
- 目前結構為純前端靜態網站：`index.html`、`assets/css`、`assets/js`、`assets/img` 等。
- 專案內含 `forms/contact.php` 等 PHP 檔案；若需表單功能，需以支援 PHP 的伺服器啟動。

## 推薦啟動方式
- 若僅需預覽前端頁面：使用 Python 的 `http.server`（最快、免安裝依賴）。
- 若需啟用 `contact.php` 等後端表單：使用 PHP 內建伺服器 `php -S`。
- 替代方案：安裝 Node.js 後使用 `http-server` 或 VS Code Live Server 外掛。

## Python 靜態伺服器（不含 PHP）
1. 在終端機切換到專案根目錄：
   - PowerShell：`cd "c:\Users\a0922\OneDrive\Desktop\Jason Resume\jason_resume"`
2. 依規範提醒：請先確保已用 `uv venv` 建立並以 `uv shell` 進入 Python 虛擬環境（此指令不需額外套件，但建議維持一致流程）。
3. 啟動伺服器：`python -m http.server 8000`
4. 以瀏覽器開啟：`http://localhost:8000/`

## PHP 內建伺服器（支援 `contact.php`）
1. 確認本機已安裝 PHP（Windows 可用安裝包或套件管理器）。
2. 在終端機切換到專案根目錄：`cd "c:\Users\a0922\OneDrive\Desktop\Jason Resume\jason_resume"`
3. 啟動伺服器（指定文件根目錄）：`php -S 127.0.0.1:8000 -t .`
4. 以瀏覽器開啟：`http://localhost:8000/`

## Node.js `http-server`（僅靜態）
1. 安裝 Node.js。
2. 全域安裝工具：`npm i -g http-server`
3. 在專案根目錄執行：`http-server -p 8000 .`
4. 開啟：`http://localhost:8000/`

## 注意事項
- Windows 路徑含空白，請使用引號或先 `cd` 進入目錄再啟動伺服器。
- 若遇到防火牆提示，請允許應用程式使用私有網路。
- 若 8000 端口被占用，可改用 `8080` 或其他端口（例如 `python -m http.server 8080`、`php -S 127.0.0.1:8080 -t .`）。
- 使用 Python/Node 靜態伺服器時，`contact.php` 不會被執行；需選擇 PHP 方案或安裝如 XAMPP/WAMP。

## 驗證與下一步
- 啟動後以瀏覽器開啟 `http://localhost:8000/`，首頁與圖片、樣式、腳本皆正常載入即代表成功。
- 一經您確認偏好方案，我可代為在您的環境啟動伺服器並提供可點擊的預覽連結。