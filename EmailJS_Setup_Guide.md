# EmailJS 設置指南

## 📧 EmailJS 簡介
EmailJS 是一個允許您直接從前端 JavaScript 發送郵件的服務，無需後端服務器。非常適合靜態網站如 GitHub Pages。

## 🚀 設置步驟

### 1. 註冊 EmailJS 帳號
1. 訪問 [EmailJS 官網](https://www.emailjs.com/)
2. 點擊 "Sign Up" 註冊免費帳號
3. 驗證您的郵箱地址

### 2. 創建郵件服務
1. 登入 EmailJS 控制台
2. 點擊 "Add New Service"
3. 選擇您的郵件提供商（推薦 Gmail）
4. 按照指示連接您的郵箱帳號
5. 記下 **Service ID**（例如：service_abc123）

### 3. 創建郵件模板
1. 在控制台點擊 "Email Templates"
2. 點擊 "Create New Template"
3. 設置模板內容：

```
主題：{{subject}}

發件人：{{from_name}}
郵箱：{{from_email}}

消息內容：
{{message}}

---
此郵件來自您的個人網站聯絡表單
```

4. 記下 **Template ID**（例如：template_xyz789）

### 4. 獲取公鑰
1. 在控制台點擊 "Account"
2. 找到 "API Keys" 部分
3. 複製 **Public Key**（例如：user_abcdefghijk）

### 5. 更新網站代碼
在 `index.html` 文件中找到以下三個地方並替換：

```javascript
// 1. 替換公鑰
publicKey: "YOUR_PUBLIC_KEY", // 替換為您的實際公鑰

// 2. 替換服務ID和模板ID
emailjs.send(
  'YOUR_SERVICE_ID',    // 替換為您的服務ID
  'YOUR_TEMPLATE_ID',   // 替換為您的模板ID
  templateParams
)
```

### 6. 測試郵件功能
1. 保存文件並刷新網頁
2. 填寫聯絡表單
3. 點擊 "Send Message"
4. 檢查您的郵箱是否收到郵件

## 🔧 故障排除

### 常見問題：
1. **郵件未收到**：檢查垃圾郵件文件夾
2. **發送失敗**：確認 Service ID、Template ID 和 Public Key 正確
3. **CORS 錯誤**：確保在 EmailJS 控制台中添加了您的網域

### 調試技巧：
- 打開瀏覽器開發者工具查看控制台錯誤
- 確認 EmailJS 服務狀態正常
- 檢查模板變量名稱是否匹配

## 📊 免費額度
EmailJS 免費計劃提供：
- 每月 200 封郵件
- 基本模板功能
- 社區支持

## 🎯 優勢
✅ 無需後端服務器  
✅ 適合靜態網站  
✅ 支持 GitHub Pages  
✅ 免費額度充足  
✅ 設置簡單快速  

---

**注意**：請妥善保管您的 API 密鑰，不要在公開代碼庫中暴露私密信息。