# Web3Forms 設置指南

## 什麼是 Web3Forms？

Web3Forms 是一個完全免費的聯絡表單服務，無需後端代碼即可處理表單提交並發送郵件。與 EmailJS 不同，Web3Forms 提供：

- ✅ **完全免費** - 每月 1000 次提交
- ✅ **無需註冊信用卡**
- ✅ **簡單易用** - 只需一個 access key
- ✅ **無廣告** - 乾淨的郵件內容
- ✅ **支援文件上傳**
- ✅ **垃圾郵件防護**
- ✅ **自定義重定向**

## 設置步驟

### 1. 獲取 Access Key

1. 前往 [Web3Forms 官網](https://web3forms.com/)
2. 點擊 "Get Started for Free"
3. 輸入您的郵箱地址：`a04045142777@gmail.com`
4. 點擊 "Create Access Key"
5. 複製生成的 access key（格式類似：`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`）

### 2. 更新網站配置

在 `index.html` 文件中找到以下行：

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
```

將 `YOUR_ACCESS_KEY_HERE` 替換為您獲得的實際 access key。

### 3. 測試表單

1. 保存文件並重新載入網站
2. 填寫聯絡表單
3. 提交後檢查您的郵箱（包括垃圾郵件資料夾）

## 表單配置說明

### 隱藏欄位

```html
<!-- Web3Forms 必需的 access key -->
<input type="hidden" name="access_key" value="您的access_key">

<!-- 郵件主題 -->
<input type="hidden" name="subject" value="來自個人網站的新聯絡訊息">

<!-- 發送者名稱 -->
<input type="hidden" name="from_name" value="Jason Resume Website">

<!-- 提交後重定向的頁面 -->
<input type="hidden" name="redirect" value="https://jason660519.github.io/jason_resume/#contact">
```

### 表單欄位

- `name` - 聯絡人姓名
- `email` - 聯絡人郵箱
- `user_subject` - 用戶輸入的主題
- `message` - 訊息內容

## 優勢對比

| 功能 | Web3Forms | EmailJS |
|------|-----------|----------|
| 價格 | 完全免費 | 免費版有限制，付費版 $15/月起 |
| 每月提交次數 | 1000 次 | 200 次（免費版） |
| 設置複雜度 | 簡單 | 複雜（需要模板配置） |
| 郵件送達率 | 高 | 中等 |
| 垃圾郵件防護 | 內建 | 需要額外配置 |
| 文件上傳 | 支援 | 不支援 |

## 故障排除

### 常見問題

1. **郵件未收到**
   - 檢查垃圾郵件資料夾
   - 確認 access key 正確
   - 驗證郵箱地址格式

2. **提交失敗**
   - 檢查網路連接
   - 確認表單 action 屬性正確
   - 查看瀏覽器控制台錯誤訊息

3. **重定向不工作**
   - 確認 redirect 欄位的 URL 正確
   - 檢查 URL 是否可訪問

### 調試技巧

在瀏覽器開發者工具的 Console 中查看錯誤訊息：

```javascript
// 成功提交會顯示
console.log('表單提交成功');

// 失敗會顯示錯誤訊息
console.error('發送錯誤:', error);
```

## 進階功能

### 自定義郵件模板

Web3Forms 支援自定義郵件模板，您可以在控制台中設置：

1. 登入 Web3Forms 控制台
2. 選擇您的表單
3. 自定義郵件模板和樣式

### 添加驗證碼

```html
<!-- 添加 hCaptcha 驗證 -->
<input type="hidden" name="captcha" value="true">
```

### 文件上傳

```html
<input type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.png">
```

## 總結

Web3Forms 是 EmailJS 的優秀免費替代方案，設置簡單，功能強大，完全免費。只需要一個 access key 即可開始使用，非常適合個人網站和小型項目。

---

**注意**：請妥善保管您的 access key，不要在公開的代碼庫中暴露它。如果需要在 GitHub 等平台分享代碼，請使用環境變量或配置文件來管理敏感信息。