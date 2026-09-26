# 算力有限公司 Prisvalis 官方網站

算力有限公司（Prisvalis LTD.）的官方網站，正式網址 <https://www.prisvalis.com>。

- 繁體中文在 `/`，英文在 `/en/`。
- 內容：公司首頁、公司沿革（`/about`）、聯絡表單（`/contact`），以及自有產品 Company of One 的介紹頁（`/CoO/`、功能、方案）。
- 視覺與版面一律依照「華國美學」Skill，規則見 [CLAUDE.md](CLAUDE.md)。

## 技術架構

- [Astro 5](https://docs.astro.build) 搭配 `@astrojs/cloudflare`，部署為 Cloudflare Worker（`wrangler.json`）。
- 頁面在建置時產生靜態檔。唯一的伺服器端路由是 `src/pages/api/contact.ts`：它驗證 Cloudflare Turnstile，再經 Email Routing 的 `send_email` 綁定把表單寄到 `support@mail.prisvalis.com`。
- `prisvalis.com`、`prisvalis.tw` 與 `prisvalis.app` 綁在同一個 Worker 上，所以站內連結一律用相對路徑（見 `src/consts.ts` 的 `LOCALE_HOME_PATH`）。

## 目錄

| 路徑 | 內容 |
| :-- | :-- |
| `src/pages/` | 路由。`en/` 底下是英文版，與中文版一一對應 |
| `src/layouts/` | 各頁面版面（`Home`、`About`、`Contact`、`CoO`） |
| `src/components/` | 共用元件；`coo/` 為 Company of One 介紹頁專用 |
| `src/i18n/` | 所有文案。兩個語系的物件形狀由 TypeScript 介面約束，少一個 key 就是型別錯誤 |
| `src/consts.ts` | 公司資料（名稱、統編、電話）、聯絡表單設定、社群連結 |
| `src/data/plans.json` | Company of One 的方案內容 |
| `src/i18n/mourning.ts` | 追悼日清單與選取標準；這幾天全站以台灣時間轉為黑白 |
| `src/styles/` | `global.css` 為全站樣式，`coo.css` 為產品頁樣式 |
| `.claude/skills/roc-aesthetic/` | 「華國美學」Skill 的本機副本，更新方式見 CLAUDE.md |

## 指令

| 指令 | 作用 |
| :-- | :-- |
| `npm ci` | 安裝相依套件（Node 22 以上） |
| `npm run dev` | 開發伺服器，`localhost:4321` |
| `npm run build` | 建置到 `./dist/` |
| `npx tsc --noEmit` | 型別檢查 |
| `npm run check` | 建置、型別檢查，再以 `wrangler deploy --dry-run` 確認可部署 |
| `npm run preview` | 建置後以 `wrangler dev` 在 Worker 環境中預覽 |
| `npm run deploy` | 部署到 Cloudflare |

## 測試環境

不要在本機執行專案。建置、型別檢查與預覽都 `ssh net2` 到測試機上執行：

```sh
ssh net2
cd ~/website-ci
git fetch origin && git checkout -B <分支> origin/<分支>
npm ci && npm run build && npx tsc --noEmit
```

net2 上的 Node 由 nvm 安裝，以非互動方式執行時要經過登入 shell，例如 `ssh net2 'bash -lc "cd ~/website-ci && npm run build"'`。

## 設定與密鑰

聯絡表單需要 Turnstile 的 secret，它不進版本控制：

- 本機或測試機：把 `.dev.vars.example` 複製成 `.dev.vars`，裡面是 Cloudflare 官方的測試 secret。
- 正式環境：`npx wrangler secret put TURNSTILE_SECRET`。

寄件網域 `mail.prisvalis.com` 必須已接上 Cloudflare Email Routing；收件位址 `CONTACT.to`（`src/consts.ts`）必須與 `wrangler.json` 的 `destination_address` 一致，且在 Cloudflare 帳號中已驗證。

## 授權

程式碼版權屬算力有限公司所有。`.claude/skills/roc-aesthetic/` 來自 [maylogger/roc-aesthetic](https://github.com/maylogger/roc-aesthetic)，依 MIT 授權使用。
