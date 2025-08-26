# EmailJS 郵件模板配置指南

## 📧 模板概述

本文檔提供了為您的個人作品集網站設計的 EmailJS 郵件模板，用於處理聯絡表單提交。

## 🎯 模板配置

### 1. 模板基本信息

- **模板名稱**: Contact Form Template
- **模板ID**: `template_contact_form` (建議)
- **用途**: 處理網站聯絡表單提交

### 2. 模板變量

在 EmailJS 控制台中，您需要配置以下變量：

| 變量名 | 描述 | 來源 |
|--------|------|------|
| `{{name}}` | 發件人姓名 | 表單 name 字段 |
| `{{email}}` | 發件人郵箱 | 表單 email 字段 |
| `{{subject}}` | 郵件主題 | 表單 subject 字段 |
| `{{message}}` | 郵件內容 | 表單 message 字段 |
| `{{to_name}}` | 收件人姓名 | 固定值：您的姓名 |

## 📝 郵件模板內容

### 主題行模板
```
來自作品集網站的聯絡: {{subject}}
```

### 郵件正文模板 (HTML 格式)

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>聯絡表單提交</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin-bottom: 20px;
        }
        .field {
            margin-bottom: 15px;
            padding: 15px;
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            border-radius: 4px;
        }
        .field-label {
            font-weight: bold;
            color: #495057;
            margin-bottom: 5px;
        }
        .field-value {
            color: #212529;
            word-wrap: break-word;
        }
        .message-content {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            margin-top: 10px;
            white-space: pre-wrap;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
        }
        .timestamp {
            color: #868e96;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 新的聯絡表單提交</h1>
            <p>來自您的作品集網站</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="field-label">👤 發件人姓名</div>
                <div class="field-value">{{name}}</div>
            </div>
            
            <div class="field">
                <div class="field-label">📧 電子郵箱</div>
                <div class="field-value">{{email}}</div>
            </div>
            
            <div class="field">
                <div class="field-label">📋 主題</div>
                <div class="field-value">{{subject}}</div>
            </div>
            
            <div class="field">
                <div class="field-label">💬 訊息內容</div>
                <div class="message-content">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>此郵件由您的作品集網站聯絡表單自動發送</p>
            <p class="timestamp">發送時間: {{sent_time}}</p>
        </div>
    </div>
</body>
</html>
```

### 純文字版本模板

```
新的聯絡表單提交
==================

發件人姓名: {{name}}
電子郵箱: {{email}}
主題: {{subject}}

訊息內容:
---------
{{message}}

==================
此郵件由您的作品集網站聯絡表單自動發送
發送時間: {{sent_time}}
```

## ⚙️ EmailJS 控制台配置步驟

### 1. 創建新模板

1. 登入 [EmailJS 控制台](https://dashboard.emailjs.com/)
2. 點擊 "Email Templates"
3. 點擊 "Create New Template"
4. 輸入模板名稱: `Contact Form Template`

### 2. 配置模板內容

1. **Subject**: 輸入主題模板
   ```
   來自作品集網站的聯絡: {{subject}}
   ```

2. **Content**: 選擇 "HTML" 格式，貼上上面的 HTML 模板

3. **Settings**: 
   - From Name: `{{name}}`
   - From Email: `{{email}}`
   - To Name: `您的姓名`
   - Reply To: `{{email}}`

### 3. 測試模板

在 EmailJS 控制台中使用以下測試數據：

```json
{
  "name": "張三",
  "email": "test@example.com",
  "subject": "測試聯絡",
  "message": "這是一個測試訊息，用於驗證郵件模板是否正常工作。",
  "to_name": "您的姓名"
}
```

## 🔧 與網站代碼的整合

確保您的 `index.html` 中的 `sendEmail` 函數使用正確的模板ID：

```javascript
// 在 sendEmail 函數中
const templateParams = {
    name: name,
    email: email,
    subject: subject,
    message: message,
    to_name: '您的姓名' // 替換為您的實際姓名
};

// 使用正確的模板ID
emailjs.send('您的服務ID', '您的模板ID', templateParams)
```

## 📱 響應式設計

此模板已針對以下設備進行優化：
- 📧 桌面郵件客戶端 (Outlook, Thunderbird)
- 📱 移動設備 (iOS Mail, Gmail App)
- 🌐 網頁郵件 (Gmail, Yahoo, Outlook.com)

## 🎨 自定義選項

### 顏色主題
您可以修改 CSS 中的顏色變量：
- 主色調: `#667eea`
- 次色調: `#764ba2`
- 背景色: `#f4f4f4`

### 字體
當前使用系統字體堆疊，您也可以引入 Google Fonts：
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
body { font-family: 'Noto Sans TC', sans-serif; }
```

## 🚀 部署檢查清單

- [ ] 在 EmailJS 控制台中創建模板
- [ ] 複製模板ID到網站代碼
- [ ] 測試模板發送
- [ ] 驗證郵件格式在不同客戶端中的顯示
- [ ] 確認所有變量正確映射
- [ ] 設置適當的發件人信息

## 🔍 故障排除

### 常見問題

1. **變量未顯示**: 檢查變量名稱是否與代碼中的參數名稱一致
2. **格式錯亂**: 確保使用 HTML 格式而非純文字
3. **中文顯示問題**: 確認郵件編碼設置為 UTF-8

### 調試技巧

1. 在 EmailJS 控制台中使用測試功能
2. 檢查瀏覽器開發者工具中的網絡請求
3. 驗證所有必需的參數都已傳遞

---

**注意**: 請記得將模板中的佔位符（如 "您的姓名"）替換為實際值，並在 EmailJS 控制台中保存模板後獲取正確的模板ID。