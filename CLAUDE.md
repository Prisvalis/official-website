# CLAUDE.md

給在這個儲存庫工作的 AI 編輯代理與人類開發者。

## 設計規範：web-design-engineer Skill

本站的視覺、版面與介面設計**一律依照 `web-design-engineer` Skill**。

- 來源：<https://github.com/ConardLi/web-design-skill>（上游已改名為 Garden Skills，本站只取其中的 `skills/web-design-engineer`；MIT 授權）
- 本機副本：`.claude/skills/web-design-engineer/`，同步自上游 commit（見該資料夾的 `.upstream-commit`）。Claude Code 會自動載入這個 Skill。

**任何前端相關的工作（新增頁面、修改版面或樣式、評審畫面）開始之前，都必須先使用這個 Skill**，照它的流程走，並依它的「References Routing」表只讀需要的參考檔，不要一次全部載入。

### 本站的設計依據：`docs/brand-spec.md`

Skill 本身不規定風格，它要求先定方向、再宣告設計系統。本站把定案結果寫在 `docs/brand-spec.md`：設計方向（選定的 style recipe）、色彩、字體、間距、圓角、陰影、動態，以及 logo 等品牌素材的路徑。

- 前端工作一律以 `docs/brand-spec.md` 為準，不要另起爐灶，也不要混用兩個 recipe。
- `docs/brand-spec.md` 還沒定案之前，不要動版面與樣式。改版計畫與進度見 issue #34。
- 要改 `docs/brand-spec.md` 本身，必須先經站方同意。

### 必須遵守的 Skill 流程

- **檢查點**：宣告設計系統（Skill Step 3）與交出 v0（Step 4）之後都要停下來，等站方確認再繼續，不要說完就自己往下做。
- **Design Read 與五個旋鈕**（Step 2b）：每次改版或新增頁面都要寫，數值必須對應到實際的設計決定。
- **改既有頁面**：先依 `references/redesign-protocol.md` 判定是 Extension、Preserve 還是 Overhaul，並列出下面的受保護契約。
- **不捏造**：不寫假數據、假客戶、假評價、假 logo 牆。缺素材就放標明「需要真實素材」的佔位，並向站方要。這與本站「每個能力宣稱都要有公開佐證」的原則一致。

### 受保護的契約

以下項目不得在改版中順手更動，要改必須先取得站方同意：

- 路由與網址：`/`、`/en/`、`/about`、`/contact`、`/CoO/`（含 `features`、`pricing`）及其英文版。
- 聯絡表單的欄位名稱、順序與送出行為（`src/pages/api/contact.ts`、Cloudflare Turnstile）。
- SEO：canonical、hreflang、Open Graph、結構化資料（`src/components/BaseHead.astro`）。
- 品牌素材：`public/logo.svg`、`public/logo-dark.svg`、`public/favicon*`。一律引用原檔，不要用 CSS 或手繪 SVG 重畫。
- 主題切換（`<html data-theme>`，`ThemeInit.astro`、`ThemeToggle.astro`）與追悼模式（`<html data-mourning>`，全站轉灰階，日期見 `src/i18n/mourning.ts`）。
- 雙語結構：兩個語系的文案物件形狀由 TypeScript 介面約束，必須一致。
- 公司登記資料、方案價格與其他有出處的事實。

### 與本站技術架構的對應

Skill 預設的產出是單一 HTML 檔，本站是 Astro。以下 Skill 規則**不適用**，改用本站的做法：

| Skill 的規則 | 本站的做法 |
| :-- | :-- |
| React + Babel CDN、單檔 HTML、`Object.assign(window, …)` | Astro 元件（`src/components/`、`src/layouts/`），樣式在 `src/styles/` |
| 大改版時另存 `v2`、`v3` 檔案 | 用 git 分支 |
| Tweaks 面板 | 只能用在 v0 草稿與比稿，不得出現在正式站 |
| 從 CDN 載入字體與函式庫 | 依 `docs/brand-spec.md`；字體優先自行託管或子集化，並考慮中文字型的檔案大小 |

### 規則衝突時的優先順序

1. 無障礙（對比度、鍵盤操作、焦點、`prefers-reduced-motion`）。
2. 上面列出的受保護契約與事實正確性。
3. `docs/brand-spec.md`。
4. `web-design-engineer` Skill 的一般規則。

## 測試

不要在本機執行專案。建置、型別檢查與預覽一律在測試機 net2 上進行，步驟見 [README.md](README.md)「測試環境」一節。

## 更新 Skill

要更新 Skill，從上游重新複製整個 `skills/web-design-engineer` 資料夾，並更新 `.upstream-commit`。不要只在本機副本裡改規則；本站專屬的規定寫在這份文件或 `docs/brand-spec.md`。
