# Brand spec：算力有限公司 Prisvalis 官網

本站前端工作的設計依據，規則見 [CLAUDE.md](../CLAUDE.md)。改版計畫見 issue #34。

> **狀態：站方已確認（2026-10-11，#26 檢查點 1）。**

## 1. Design Read

```yaml
Design Read:
  artifact: 公司官網（首頁、沿革、聯絡）＋自有產品介紹頁（Company of One）
  audience: 要找人做系統、架站、AI 雛形上線的中小企業與個人；評估 CoO 的一人公司
  visual-language: 克制的工具派（Linear recipe），以品牌紅取代原 recipe 的紫色
  mode: redesign-overhaul
  visual-variance: 5
  motion-intensity: 3
  information-density: 5
  asset-dependence: 6
  brand-fidelity: 5
```

每個旋鈕對應的實際決定：

| 旋鈕 | 值 | 對設計的影響 |
| :-- | --: | :-- |
| visual-variance | 5 | 全站使用穩定的 12 欄網格；只有首頁開頭與 CoO 截圖區這兩處採不對稱構圖，其他區塊維持對齊 |
| motion-intensity | 3 | 只有 hover、焦點與一次性的短進場（見 §7），沒有捲動綁定、沒有視差 |
| information-density | 5 | 現有文案量全部保留；長段落維持一欄可讀寬度，不為了留白刪內容 |
| asset-dependence | 6 | CoO 頁一定要有真實截圖，到位前放標明的佔位；公司頁用文字與表格撐住，不靠圖 |
| brand-fidelity | 5 | logo、品牌三色、公司名稱、「本公司」的自稱保留，其餘全部重做 |

## 2. 方向與出處

- Recipe：`linear`（`.claude/skills/web-design-engineer/references/style-recipes/linear.md`），屬 Modern Tool / Builder SaaS 派。
- 只用這一個 recipe，不混搭其他 recipe。
- 與 recipe 不同的地方，以及原因：

| Recipe 原設定 | 本站版本 | 原因 |
| :-- | :-- | :-- |
| 強調色是 Linear 紫 `#5E6AD2` | 品牌紅（logo 裡的方塊） | Skill 規定品牌色優先，不另造色相 |
| 偏暖的近黑底 `#08090A` | 由品牌墨色 `#1b1e23` 推出的近黑底 | 讓 logo 的墨色自然融入底色 |
| 只有暗色 | 暗色為主，另有完整的亮色版本 | 主題切換是受保護契約 |
| 內文 14–15px | 內文 16px | 中文筆畫多，小於 16px 不易閱讀 |
| 標題字距 -0.02em | 只套用在拉丁字母 | 中文加負字距會黏在一起 |
| 鍵盤快捷鍵標籤 | 不採用；改用等寬字標籤標示技術名稱與事實 | 本站不是鍵盤操作的工具 |

## 3. 色彩

品牌三色取自 `public/logo.svg` 與 `public/logo-dark.svg`：

| 品牌色 | 值 | 出處 |
| :-- | :-- | :-- |
| 墨 | `#1b1e23` | logo 文字（亮底版） |
| 紙 | `#f7f5f1` | logo 文字（暗底版） |
| 紅 | `#b8322a`（亮底）／`#e45f53`（暗底） | logo 的方塊 |

其他顏色都由這三色推出；需要新的層次時，用 `oklch()` 或 `color-mix()` 從這三色衍生，不得另造色相。

### 暗色（設計主軸）

| Token | 值 | 用途 |
| :-- | :-- | :-- |
| `--ground` | `#111316` | 頁面底色 |
| `--surface-1` | `#1b1e23` | 區塊、輸入框（＝品牌墨） |
| `--surface-2` | `#23272d` | 標籤、表格標題列、hover 底色 |
| `--surface-3` | `#2c3138` | 浮起的面板 |
| `--hairline` | `rgb(247 245 241 / 0.08)` | 所有分隔線與框線 |
| `--text` | `#f7f5f1` | 主要文字（＝品牌紙） |
| `--text-2` | `#a4a8b0` | 次要文字、說明 |
| `--text-3` | `#80858e` | 停用狀態、裝飾性的中繼資訊（限制見下） |
| `--accent` | `#e45f53` | 強調色 |
| `--on-accent` | `#111316` | 強調色底上的文字 |

### 亮色

| Token | 值 | 用途 |
| :-- | :-- | :-- |
| `--ground` | `#f7f5f1` | 頁面底色（＝品牌紙） |
| `--surface-1` | `#ffffff` | 區塊、輸入框 |
| `--surface-2` | `#efece6` | 標籤、表格標題列、hover 底色 |
| `--surface-3` | `#e6e2da` | 浮起的面板 |
| `--hairline` | `rgb(27 30 35 / 0.10)` | 所有分隔線與框線 |
| `--text` | `#1b1e23` | 主要文字（＝品牌墨） |
| `--text-2` | `#555a63` | 次要文字、說明 |
| `--text-3` | `#767b84` | 停用狀態、裝飾性的中繼資訊（限制見下） |
| `--accent` | `#b8322a` | 強調色 |
| `--on-accent` | `#ffffff` | 強調色底上的文字 |

### 對比度（WCAG 2.1，實算）

| 組合 | ground | surface-1 | surface-2 | surface-3 |
| :-- | --: | --: | --: | --: |
| 暗 `--text` | 17.09 | 15.35 | 13.78 | 12.03 |
| 暗 `--text-2` | 7.80 | 7.01 | 6.29 | 5.49 |
| 暗 `--text-3` | 5.02 | 4.51 | **4.05** | **3.53** |
| 暗 `--accent` | 5.37 | 4.82 | **4.33** | **3.78** |
| 亮 `--text` | 15.35 | 16.71 | 14.17 | 12.94 |
| 亮 `--text-2` | 6.37 | 6.93 | 5.88 | 5.37 |
| 亮 `--text-3` | **3.91** | **4.25** | **3.61** | **3.29** |
| 亮 `--accent` | 5.47 | 5.95 | 5.05 | 4.61 |

按鈕：`--on-accent` 在 `--accent` 上，暗色 5.37、亮色 5.95。

由此得出的硬限制：

- **`--text-3` 不得用於需要閱讀的文字。** 只能用在停用狀態（WCAG 豁免）與純裝飾的元素上。
- **暗色模式下，強調色文字只能放在 `--ground` 或 `--surface-1` 上。** 在 `--surface-2`、`--surface-3` 上未達 4.5。
- 內文連結用 `--text` 加底線，不用強調色。強調色是點綴，不是連結色。

### 強調色的使用範圍

依 recipe，強調色只占畫面面積的 5% 以下。只用在：

- 主要行動按鈕（每個畫面最多一個）
- `:focus-visible` 外框
- 導覽列中目前所在頁面的指示
- 品牌方塊記號（見 §9）

不得用在大面積底色、內文、標題或裝飾性漸層上。

## 4. 字體

| 角色 | 字體 | 套件（固定版本） | 用途 |
| :-- | :-- | :-- | :-- |
| 標題（拉丁） | Inter Tight，字重 600 | `@fontsource-variable/inter-tight@5.3.0` | h1～h3 的英文與數字 |
| 內文（拉丁） | Inter，字重 400／500 | `@fontsource-variable/inter@5.3.0` | 內文、介面文字 |
| 中文 | Noto Sans TC（思源黑體），字重 400／500／700 | `@fontsource-variable/noto-sans-tc@5.3.0` | 所有中文 |
| 等寬 | JetBrains Mono，字重 400 | `@fontsource-variable/jetbrains-mono@5.3.0` | 技術名稱標籤、統一編號、方案代號、程式碼 |

四個套件都是 OFL-1.1 授權。`noto-sans-tc` 的 5.3.1 在 2026-10-11 才發布，太新，固定用 5.3.0。

```css
--font-display: "Inter Tight Variable", "Noto Sans TC Variable", "PingFang TC", "Microsoft JhengHei", sans-serif;
--font-body: "Inter Variable", "Noto Sans TC Variable", "PingFang TC", "Microsoft JhengHei", sans-serif;
--font-mono: "JetBrains Mono Variable", ui-monospace, "SFMono-Regular", Consolas, monospace;
```

拉丁字母排在前面，所以英文與數字由 Inter 顯示，中文自動落到 Noto Sans TC。

**載入方式：自行託管**，透過 npm 安裝 Fontsource 套件，由本站的 Worker 提供，不向 Google 發出第三方請求。Noto Sans TC 依 `unicode-range` 切成多個分片，瀏覽器只下載頁面實際用到的字元所在的分片，不會下載整個 4.7 MB 的套件。所有字體設定 `font-display: swap`。實際傳輸大小在 #28 實作時量測並記錄。

### 字級

| 角色 | 大小 | 行高 | 其他 |
| :-- | :-- | :-- | :-- |
| h1 | `clamp(2.25rem, 6vw, 4rem)`（36～64px） | 1.15 | 字重 600；拉丁字距 -0.02em；最小 36px 是為了讓九個中文字放進手機的一行（2026-10-11 調整） |
| h2 | `clamp(1.75rem, 3.5vw, 2.5rem)`（28～40px） | 1.25 | 字重 600 |
| h3 | 1.25rem（20px） | 1.4 | 字重 600 |
| 內文 | 1rem（16px） | 1.75 | 字重 400；`text-wrap: pretty` |
| 小字 | 0.875rem（14px） | 1.6 | 說明、頁尾 |
| 等寬標籤 | 0.8125rem（13px） | 1 | 字重 400 |

h1 與內文的比例是 4 倍，落在 Skill 建議的 4～6 倍之間。中文內文一行最寬 40em（約 38 個中文字）。

**中文換行**：標題、導言、按鈕、標籤等短文字只在標點與空白處換行（`word-break: keep-all`），一段沒有標點、整段放不下時才退回逐字斷行（`overflow-wrap: anywhere`）。長篇內文維持逐字換行，不用 `text-wrap: pretty`，它為了避免孤行會讓前一行提早結束。

## 5. 間距與版面

- 間距階梯：4／8／12／16／24／40／64／96 px，不使用階梯以外的值。
- 區塊上下間距：桌機 96px，手機 64px。
- 內容最大寬度 1200px，左右留白手機 16px、桌機 24px。
- 12 欄網格，欄間距 24px。

## 6. 圓角與陰影

- 圓角：6px（按鈕、標籤、輸入框）、12px（區塊、截圖框）、16px（大型面板）。**不得超過 16px**，也不使用 `50%` 的圓形。
- 陰影：只用在浮起的面板上。暗色 `0 1px 2px rgb(0 0 0 / 0.3)`，亮色 `0 1px 2px rgb(27 30 35 / 0.06)`。不用發光效果，不用彩色陰影。
- 層次主要靠 surface 的明度差與細框線，不靠陰影。

## 7. 動態

| 動態 | 時間 | 曲線 |
| :-- | :-- | :-- |
| hover、按下 | 150ms | `ease-out` |
| 版面變化（展開、收合） | 400ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| 進場（只播一次） | 400ms，位移 8px | 同上；同一區塊最多錯開 3 個元素 |

- 不用彈跳或彈性曲線。
- `prefers-reduced-motion: reduce` 時，所有位移與進場動畫都關閉，只保留顏色變化。
- 追悼模式下同樣關閉進場動畫。

## 8. 元件原則

| 元件 | 做法 |
| :-- | :-- |
| 頁首 | 固定在頂端；底色為 `--ground` 的 80% 不透明度加 `backdrop-filter: blur(12px)`，底部一條細框線 |
| 主要按鈕 | `--accent` 底、`--on-accent` 字，高 40px，圓角 6px |
| 次要按鈕 | `--surface-2` 底、細框線、`--text` 字 |
| 文字連結 | `--text` 加底線（`text-underline-offset: 0.2em`），hover 時底線加粗 |
| 等寬標籤 | `--surface-2` 底、細框線、圓角 6px，用來標示技術名稱（Astro、Cloudflare Workers、Docker、vLLM）與事實（統一編號） |
| 表格 | 只有橫向細框線、不用斑馬紋；數字用 `font-variant-numeric: tabular-nums` |
| 表單欄位 | `--surface-1` 底、細框線、圓角 6px；focus 時用強調色外框；錯誤訊息用文字說明，不只靠顏色 |
| 焦點 | `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`，不得移除 |
| 截圖框 | 細框線、圓角 12px、`--surface-1` 底；只放真實截圖 |

不要什麼都放進卡片。依 Skill 的 `failure-patterns.md`，分組優先靠留白、對齊與細框線；只有在分組有實際意義時才用 surface 框起來。

## 9. 招牌手法

依 recipe 的招牌手法，改成本站的版本：

1. **細框線無所不在**：所有面板之間都用 1px `--hairline` 分隔。
2. **品牌方塊記號**：logo 右下的紅色方塊（10×10 的正方形）縮小成 6px，當作清單項目符號、區塊編號旁的記號，以及導覽列目前頁面的指示。這是全站唯一的裝飾元素，取自品牌，不是另外發明的。
3. **等寬標籤**：技術名稱與事實資料用等寬字標籤呈現，讓讀者一眼看出哪些是具體、可查證的東西。
4. **頁首的微光**：只在首頁開頭的頂端，用品牌紅做一層不透明度不超過 6% 的放射狀微光。其他地方不用漸層。追悼模式下移除。
5. **產品截圖壓底**：CoO 介紹頁開頭的底部，放一張真實的產品截圖，下緣被下一個區塊截斷，呈現「產品就在這裡」的感覺。

## 10. 禁止事項

- emoji
- 彈跳、彈性動畫
- 第二個強調色（包括「成功綠」以外的任何飽和色；表單狀態的成功與失敗用文字與圖示表達）
- 超過 16px 的圓角
- 人物圖庫照片
- 紫粉藍漸層、霓虹發光
- 每個區塊都是「小標籤＋標題＋卡片列」的模板節奏
- 置中的英雄區加兩個按鈕的預設構圖
- 捏造的數據、客戶 logo 牆、評價
- 用 CSS 或 SVG 畫出來的假產品介面

## 11. 品牌素材

| 素材 | 路徑 | 狀態 |
| :-- | :-- | :-- |
| Logo（亮底用） | `public/logo.svg` | 已有 |
| Logo（暗底用） | `public/logo-dark.svg` | 已有 |
| Favicon | `public/favicon.svg`、`favicon-32.png`、`favicon-180.png` | 已有；favicon 自帶 12px 圓角的墨色底，維持原樣 |
| 社群分享圖 | `public/og.svg`、`public/og.png` | 已依本規格重做（#33）；改 SVG 後要重新輸出 1200×630 的 PNG |
| CoO 介面截圖 | 預計放 `public/coo/` | **缺，需站方提供** |
| GPU 機器實拍 | 未定 | **缺，需站方提供** |
| 具體案例 | — | **缺，需站方提供** |

缺的素材一律放標明的佔位，例如 `[CoO 儀表板截圖 16:9]`，不用 CSS 或手繪 SVG 代替。

## 12. 主題與追悼模式

- **主題預設行為不變**：先看 `localStorage` 的設定，沒有的話跟隨系統偏好（`ThemeInit.astro`）。設計以暗色為主軸，但亮色版本同樣完整。
- **追悼模式**：`<html data-mourning>` 時整頁轉灰階的機制沿用。強調色會跟著變灰，這是預期效果；首頁的微光與進場動畫在追悼模式下移除。

## 13. 文案語氣

- 自稱「本公司」／this Company。
- 不用「e化」，句尾不用驚嘆號，不用公告式的過度客套。
- 每個能力宣稱都要有可指向的公開佐證，沒有就不寫。
- 詳見 #27。
