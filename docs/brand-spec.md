# Brand spec：算力有限公司 Prisvalis 官網（Vignelli／瑞士風版）

本站前端工作的設計依據，規則見 [CLAUDE.md](../CLAUDE.md)。改版計畫見 issue #34。

> **狀態：站方已確認（2026-10-11，#26 檢查點 1）。** 這是 `dev` 分支（dev 環境）的設計依據；`main` 分支（prod 環境）採用 Linear 版本。兩條分支長期並存，不互相合併。

## 1. Design Read

```yaml
Design Read:
  artifact: 公司官網（首頁、沿革、聯絡）＋自有產品介紹頁（Company of One）
  audience: 要找人做系統、架站、AI 雛形上線的中小企業與個人；評估 CoO 的一人公司
  visual-language: 制度化的瑞士國際主義（Vignelli recipe），以品牌紅為唯一強調色
  mode: redesign-overhaul
  visual-variance: 4
  motion-intensity: 1
  information-density: 6
  asset-dependence: 5
  brand-fidelity: 5
```

每個旋鈕對應的實際決定：

| 旋鈕 | 值 | 對設計的影響 |
| :-- | --: | :-- |
| visual-variance | 4 | 全站嚴格對齊 12 欄網格；唯一的構圖變化是每個區塊左上角的大號編號，以及色條標題 |
| motion-intensity | 1 | 沒有動畫；hover 與焦點的變化是瞬間切換 |
| information-density | 6 | 登記資料、服務範圍、方案、流程都改用表格與編號清單，資訊比現在更集中 |
| asset-dependence | 5 | 版面靠字體與網格撐住；CoO 頁仍需要真實截圖，到位前放標明的佔位 |
| brand-fidelity | 5 | logo、品牌三色、公司名稱、「本公司」的自稱保留，其餘全部重做 |

## 2. 方向與出處

- Recipe：`vignelli-swiss-helvetica`（`.claude/skills/web-design-engineer/references/style-recipes/vignelli-swiss-helvetica.md`），屬 Information Architecture 派。
- 只用這一個 recipe，不混搭其他 recipe。
- 與 recipe 不同的地方，以及原因：

| Recipe 原設定 | 本站版本 | 原因 |
| :-- | :-- | :-- |
| 純黑 `#000000`、純白 `#FFFFFF` | 品牌墨 `#1b1e23`、品牌紙 `#f7f5f1` | Skill 規定品牌色優先；兩者對比 15.35，仍是黑白的效果 |
| 強調色四選一（紅、黃、藍、橘） | 品牌紅 | logo 本身就是紅色方塊，與 recipe 的紅色選項一致 |
| 次要文字灰 `#8A8A8A` | 亮色 `#5f6267`、暗色 `#9a9da2` | `#8A8A8A` 在紙色上只有 3.17，未達內文 4.5 |
| 只有 Helvetica | Helvetica 加中文黑體，見 §4 | 中文需要另一套字體；Helvetica 不能免費散布，需要替代 |
| 字級 72／48／32／24／16／12 | 最小字級改為 14 | 中文 12px 不易閱讀 |
| 靜態設計，沒有暗色 | 另有完整的暗色版本 | 主題切換是受保護契約 |

## 3. 色彩

品牌三色取自 `public/logo.svg` 與 `public/logo-dark.svg`：墨 `#1b1e23`、紙 `#f7f5f1`、紅 `#b8322a`（亮底）／`#e45f53`（暗底）。

全站只有這幾個顏色，**不得另外衍生層次色**。瑞士風的層次靠字級與網格，不靠灰階色階。

| Token | 亮色 | 暗色 | 用途 |
| :-- | :-- | :-- | :-- |
| `--ground` | `#f7f5f1` | `#1b1e23` | 頁面底色 |
| `--text` | `#1b1e23` | `#f7f5f1` | 主要文字、標題、粗分隔線 |
| `--text-2` | `#5f6267` | `#9a9da2` | 次要文字、說明、表格中的次要欄位 |
| `--rule` | `#1b1e23` | `#f7f5f1` | 分隔線（與文字同色，以粗細區分層級） |
| `--accent` | `#b8322a` | `#e45f53` | 強調色文字、焦點外框 |
| `--bar` | `#b8322a` | `#b8322a` | 色條標題的底色（兩種模式相同） |
| `--on-bar` | `#f7f5f1` | `#f7f5f1` | 色條上的文字 |

### 對比度（WCAG 2.1，實算）

| 組合 | 亮色 | 暗色 |
| :-- | --: | --: |
| `--text` 在 `--ground` | 15.35 | 15.35 |
| `--text-2` 在 `--ground` | 5.62 | 6.14 |
| `--accent` 在 `--ground` | 5.47 | 4.82 |
| `--on-bar` 在 `--bar` | 5.47 | 5.47 |

四組都達到內文 AA 4.5。

### 強調色的使用範圍

只用在：

- 色條標題（§9 的招牌手法 1）
- 主要行動按鈕
- `:focus-visible` 外框
- 導覽列中目前所在頁面的指示
- 區塊編號

**同一個畫面裡，色條標題最多一條。** 其他區塊的標題用 `--text` 色與粗分隔線。紅色用多了就不是瑞士風，會變成警示。

## 4. 字體

Recipe 規定全站只用 Helvetica，依字級而非字重分層。

| 角色 | 字體 | 字重 |
| :-- | :-- | :-- |
| 拉丁字母（全站） | Helvetica Neue／Helvetica；不存在時用 Arimo，`@fontsource-variable/arimo@5.3.0` | 400、500、700，不用斜體 |
| 中文（全站） | Noto Sans TC（思源黑體），`@fontsource-variable/noto-sans-tc@5.3.0` | 400、500、700 |

```css
--font-sans: "Helvetica Neue", "Arimo Variable", Helvetica, "Noto Sans TC Variable", "PingFang TC", "Microsoft JhengHei", sans-serif;
```

順序是 Helvetica Neue、Arimo、Helvetica：Windows 內建的字體替換會把 `Helvetica` 對應到 Arial，若 Helvetica 排在 Arimo 前面，Windows 上永遠輪不到 Arimo。

`noto-sans-tc` 的 5.3.1 在 2026-10-11 才發布，太新，固定用 5.3.0。Noto Sans TC 依 `unicode-range` 切成多個分片，瀏覽器只下載用到的分片。全站不使用等寬字體與襯線字體。

### Helvetica 的替代字體（站方已選 A）

Apple 裝置內建 Helvetica Neue，但 Windows 與 Android 沒有。Helvetica 是商業字體，不能放在網站上免費散布。替代方案：

| 選項 | 說明 | 優點 | 缺點 |
| :-- | :-- | :-- | :-- |
| **A. Arimo（建議）** | `@fontsource/arimo@5.3.0`，OFL-1.1 | 與 Arial／Helvetica 的字寬相容，切換時版面不會跳動；npm 安裝即可 | 字形是 Arial 系，`R`、`G`、`t` 等字母的收筆與 Helvetica 不同 |
| B. TeX Gyre Heros | GUST Font License，Helvetica 的開源複刻 | 字形最接近 Helvetica | 不在 npm 上，要從 CTAN 下載字型檔並自行轉成 woff2 |
| C. 不載入替代字體 | 直接落到系統的 Arial | 零載入成本 | Windows 上就是 Arial，瑞士風的味道打折 |

### 字級

全站對齊 8px 基線網格。依 recipe，**層級靠字級區分，不靠字重或顏色。**

| 角色 | 大小 | 行高 | 字重 |
| :-- | :-- | :-- | :-- |
| 區塊編號 | `clamp(3rem, 8vw, 4.5rem)`（48～72px） | 1 | 700 |
| h1 | `clamp(2.25rem, 6vw, 4.5rem)`（36～72px） | 1.1 | 700 |
| h2 | `clamp(2rem, 4vw, 3rem)`（32～48px） | 1.2 | 700 |
| h3 | 1.5rem（24px） | 1.33 | 700 |
| 內文 | 1rem（16px） | 1.75（28px，對齊基線） | 400 |
| 小字 | 0.875rem（14px） | 1.71（24px） | 400 |

- 文字一律靠左對齊，不置中。
- h1 在手機上最小 36px，讓九個沒有標點的中文字放進 375px 寬的一行（2026-10-11 調整）。
- **中文換行**：標題、導言、按鈕、標籤等短文字只在標點與空白處換行（`word-break: keep-all`），一段沒有標點、整段放不下時才退回逐字斷行（`overflow-wrap: anywhere`）。長篇內文維持逐字換行，不用 `text-wrap: pretty`。
- 中文內文一行最寬 36em（約 34 個中文字），英文約 65 個字元。
- 拉丁標題字距 -0.01em；中文不調整字距。
- 使用 `text-wrap: pretty`。

## 5. 網格與間距

- 8px 基線網格；間距只用 8 的倍數：8／16／24／32／48／64／96 px。
- 12 欄網格，欄間距 24px，內容最大寬度 1200px，左右留白手機 16px、桌機 24px。
- 區塊上下間距：桌機 96px，手機 64px。
- 網格在有助於閱讀時**可以畫出來**：例如表格與流程步驟之間，用 1px 的細線標出欄界。
- 手機上 12 欄收成 4 欄，區塊編號移到標題上方。

## 6. 圓角、陰影、分隔線

- 圓角：**一律 0**，包括按鈕、輸入框、截圖框。
- 陰影：**一律不用**。
- 分隔線分兩級，與文字同色：
  - 粗線 4px：區塊之間
  - 細線 1px：表格列、清單項目之間
- 不用漸層、斜體、任何柔化效果。

## 7. 動態

- **沒有動畫。** 沒有進場、沒有捲動效果、沒有轉場。
- hover 與焦點的變化是瞬間切換（不設 `transition`）。
- 因為沒有動畫，`prefers-reduced-motion` 與追悼模式不需要另外處理動態。

## 8. 元件原則

| 元件 | 做法 |
| :-- | :-- |
| 頁首 | 不固定在頂端；logo 靠左，導覽靠右，下方一條 4px 粗線 |
| 主要按鈕 | `--bar` 底、`--on-bar` 字、高 48px、圓角 0；hover 時底色換成 `--text` |
| 次要按鈕 | 透明底、2px `--text` 框線、`--text` 字；hover 時反白（`--text` 底、`--ground` 字） |
| 文字連結 | `--text` 加底線；hover 時改為 `--accent` |
| 表格 | 主要的資訊呈現方式。表頭下一條粗線，各列之間細線，不用斑馬紋，不畫直線；數字用 `font-variant-numeric: tabular-nums` 並靠右對齊 |
| 編號清單 | 流程、服務範圍用「大號數字＋標題＋說明」的三欄排列，數字對齊同一欄 |
| 表單欄位 | 透明底、只有下框線 2px、圓角 0；focus 時下框線改為 `--accent` 並加焦點外框；錯誤訊息用文字說明，不只靠顏色 |
| 焦點 | `:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }`，不得移除 |
| 截圖框 | 1px `--rule` 框線、圓角 0；只放真實截圖 |

不用卡片。分組靠網格位置與分隔線。

## 9. 招牌手法

依 recipe 的招牌手法，改成本站的版本：

1. **色條標題**：每頁最重要的一個區塊，標題放在整欄寬的品牌紅色條上，文字為紙色、左對齊。例如首頁的「服務範圍」、CoO 頁的產品名稱。
2. **區塊左上的大號編號**：每個區塊左上角放 `01`、`02` 這樣的大號數字（品牌紅），標題與內容從第 3 欄開始排。
3. **表格化的資訊**：登記資料、服務範圍、方案比較、流程步驟、聯絡方式，一律用嚴格對齊的表格或編號清單，不寫成卡片。
4. **看得見的網格**：流程與方案等需要比較的內容，用 1px 細線標出欄界。
5. **品牌方塊**：logo 右下的紅色方塊是全站唯一的圖形元素，用在頁尾與分享圖上，不另外發明圖示。

## 10. 禁止事項

- 襯線字體、斜體
- 第二個強調色
- 圓角、陰影、漸層、模糊、半透明
- 動畫與轉場
- 置中對齊的內文或標題
- 卡片、圖示庫、emoji
- 「親切」的口語文案（瑞士風就事論事）
- 捏造的數據、客戶 logo 牆、評價
- 用 CSS 或 SVG 畫出來的假產品介面

## 11. 品牌素材

| 素材 | 路徑 | 狀態 |
| :-- | :-- | :-- |
| Logo（亮底用） | `public/logo.svg` | 已有 |
| Logo（暗底用） | `public/logo-dark.svg` | 已有 |
| Favicon | `public/favicon.svg`、`favicon-32.png`、`favicon-180.png` | 已有；favicon 自帶 12px 圓角，屬於 logo 素材，維持原樣 |
| 社群分享圖 | `public/og.svg`、`public/og.png` | 已依本規格重做（#33）；改 SVG 後要重新輸出 1200×630 的 PNG |
| CoO 介面截圖 | 預計放 `public/coo/` | **缺，需站方提供** |
| GPU 機器實拍 | 未定 | **缺，需站方提供** |
| 具體案例 | — | **缺，需站方提供** |

缺的素材一律放標明的佔位，例如 `[CoO 儀表板截圖 16:9]`，不用 CSS 或手繪 SVG 代替。

## 12. 主題與追悼模式

- **主題預設行為不變**：先看 `localStorage` 的設定，沒有的話跟隨系統偏好（`ThemeInit.astro`）。
- **追悼模式**：`<html data-mourning>` 時整頁轉灰階的機制沿用。色條與編號會變成灰色，這是預期效果。

## 13. 文案語氣

- 自稱「本公司」／this Company。
- 不用「e化」，句尾不用驚嘆號，不用公告式的過度客套。
- 瑞士風就事論事：標題用名詞或直述句，不用格言式短句。
- 每個能力宣稱都要有可指向的公開佐證，沒有就不寫。
- 詳見 #27。

## 14. 站方決定紀錄

1. 整份設計系統（檢查點 1）：已確認（2026-10-11）。
2. Helvetica 的替代字體：已選 A（Arimo）。
