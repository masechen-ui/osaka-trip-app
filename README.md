# ✈️ 大阪回憶製造所 — Trip App

日系手帳風旅遊 Web App（PWA）for 2026 京阪神奈 5天4夜 6人旅行團

## 🛠 Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS（自定義手帳色系）
- Firebase v10（Firestore + Storage + Auth）
- Zustand（全域狀態管理）
- Vite PWA Plugin（離線支援）

## 🚀 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 建立 Firebase 專案
1. 前往 [Firebase Console](https://console.firebase.google.com)
2. 新增專案 → 輸入名稱（例：osaka-trip-2026）
3. 啟用以下服務：
   - **Firestore Database** → 選 production mode
   - **Storage** → 選 production mode
   - **Authentication** → 啟用「匿名」登入方式
4. 取得 Web App 設定（Project Settings → Your apps → SDK setup）

### 3. 設定環境變數
```bash
cp .env.local.example .env.local
# 編輯 .env.local，填入你的 Firebase 設定
```

### 4. 設定 Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{tripId}/{collection}/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. 啟動開發伺服器
```bash
npm run dev
# 打開 http://localhost:5173
```

### 6. 建置發布
```bash
npm run build
# dist/ 資料夾可部署至 Vercel / Netlify / Firebase Hosting
```

## 📱 功能模組

| 分頁 | 功能 |
|------|------|
| 📅 行程 | 日期切換、天氣卡片、時間軸（景點/美食/交通/住宿）、倒數計時 |
| 🎫 預訂 | 登機證視覺卡片、飯店訂單、票券清單（PIN 保護） |
| 💰 記帳 | 多幣別換算、支出環形圖、新增記帳、全員分帳 |
| 📷 日誌 | 圖文記錄、多圖上傳（Firebase Storage + 前端壓縮）|
| ✅ 準備 | 行李清單、待辦事項、互動式 Checkbox（即時同步）|

## 🎨 設計特色
- **日系手帳風**：米色紋理背景 (#F5F0E8)、點狀 pattern
- **手寫字體**：Caveat 用於標題，Noto Sans TC 用於內文
- **板印陰影**：`3px 3px 0px #D8D0C0` 硬陰影
- **烙印橙色**：`#C4735A` 模擬橡皮章色彩

## 🔒 PIN 保護
預訂頁面預設 PIN：`007`（可在 `PinGuard.tsx` 修改 `CORRECT_PIN`）

## 💡 自訂旅程
1. 修改 `src/data/scheduleData.ts` — 替換行程資料
2. 修改 `src/lib/store.ts` — 更新成員名單
3. 修改 `src/App.tsx` — 更新旅程標題日期
4. 修改 `.env.local` — 連結你的 Firebase 專案
