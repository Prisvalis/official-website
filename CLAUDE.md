# CLAUDE.md

給在這個儲存庫工作的 AI 編輯代理與人類開發者。本文件描述網站的設計規範。

> **華國美學版分支（`claude/roc-aesthetic-website-0q2z6q`）的例外**
>
> 這個分支依站方要求，視覺層改用 [roc-aesthetic](https://github.com/maylogger/roc-aesthetic) 的規則，刻意離開下面「色彩」「字體」「形狀與效果」「版面」各節：多色（中華民國藍、飽和紅、警示黃、銀灰漸層）、漸層與浮雕按鈕、WordArt 標題、跑馬燈、密集的入口網站外框、0.1px 到 1px 的微誤差。因此「驗收」一節前四條視覺 grep 在此分支會有輸出，屬預期。
>
> 仍然適用、不得放寬的：內文對比度 ≥ 4.5、連結加底線、`:focus-visible` 外框、錯誤一定有文字說明、`prefers-reduced-motion`（跑馬燈停止並攤開）、追悼模式、i18n 分檔與型別約束、站內相對路徑、`CONTACT.to` 一致性，以及「宣稱與證據」與「禁用詞彙」。外框文案在 `src/i18n/portal.ts`，每一句都要能在既有內容找到出處。外框元件是 `src/components/PortalShell.astro` 與 `WordArt.astro`。

---

## 色彩

全站只有三個色值。**不得引入第四個色相。**

| 用途 | 淺色模式 | 深色模式 |
|---|---|---|
| 背景 | `#F4F1EA` | `#1A1A1A` |
| 文字 | `#1A1A1A` | `#F4F1EA` |
| 強調 | `#C8411B` | `#C8411B` |

深色模式把背景與文字對調，強調色不變。主題切換鈕保留。

### 允許的衍生

次要文字、分隔線、hover 底色等層次，**只能**由上述三色透過 `color-mix()` 或 alpha 取得：

```css
--text-secondary: color-mix(in srgb, var(--ink) 65%, var(--paper));
--rule: color-mix(in srgb, var(--ink) 18%, var(--paper));
```

不得寫入任何新的 hex、`hsl()` 或具名顏色。

### 強調色的硬限制

實測對比度（WCAG 2.1，內文門檻 4.5、大字門檻 3.0）：

| 組合 | 對比度 | 內文 | 大字 |
|---|---|---|---|
| `#1A1A1A` on `#F4F1EA` | 15.43 | 通過 | 通過 |
| `#C8411B` on `#F4F1EA` | 4.40 | **未達** | 通過 |
| `#F4F1EA` on `#C8411B` | 4.40 | **未達** | 通過 |
| `#C8411B` on `#1A1A1A` | 3.50 | **未達** | 通過 |

因此：

- **強調色不得用於內文級字級的文字。** 上限是大字定義（≥ 24px，或 ≥ 18.66px 且為粗體）。
- 內文中的連結用 `#1A1A1A` 加底線，**不靠顏色區分**。
- 反白按鈕（`#F4F1EA` 字 on `#C8411B` 底）的文字必須 ≥ 18.66px 且粗體。
- 強調色可自由用於：色塊、分隔線、邊框、大標題、圖表標記。

### 錯誤狀態

錯誤狀態使用 `#C8411B`，與強調色同色。因此**錯誤絕不能只靠顏色傳達**。必須有文字說明發生什麼事。現有的表單錯誤橫幅（`src/layouts/Contact.astro` 的 `.banner-err`）已經符合這個原則，改寫時保留該行為。

### Focus 指示器

`:focus-visible` 用 `#C8411B` 的 2px 實線外框，`outline-offset: 2px`。不得移除或改為 `outline: none`。

---

## 字體

| 用途 | 字體 |
|---|---|
| 標題 | LXGW WenKai TC |
| 內文 | Noto Serif TC |
| 程式碼 | JetBrains Mono |

### 載入注意事項

- **Noto Serif TC** 與 **JetBrains Mono** 在 Google Fonts 上，照現有 `BaseHead.astro` 的做法載入即可。
- **LXGW WenKai TC 不在 Google Fonts 上。** 它是開源字型，需自 CDN 載入或自行託管。**它是中日韓字型，完整檔案為數 MB 等級**。直接當標題字型載入會造成明顯的首次繪製延遲。

  實作時必須處理這個成本，擇一：
  1. 子集化（只保留站上實際用到的字元）並自行託管；
  2. 使用提供分片載入的 CDN；
  3. 若前兩者都不做，至少設定 `font-display: swap` 並以系統襯線字體作為 fallback。

  **目前採用 2 加 3**（`src/components/Fonts.astro`）：Fontsource 發佈的分片版本，由 jsDelivr 提供，版本釘死在 5.3.0，只載入 400 一個字重，所以 h1、h2 的 `font-weight` 必須明確寫 400，否則會變成假粗體。h3 以下改用內文字體加粗。換版本或換 CDN 時要重新確認網址有效，不要照抄未經驗證的 URL。

  實測（中文首頁、首次載入、未快取）：LXGW WenKai TC 約 630 KB（stylesheet 35 KB、9 個 CJK 分片 576 KB、Latin 18 KB）；Noto Serif TC 約 1.8 MB（21 個分片，兩個字重共用可變字型檔）。兩者都帶 `font-display: swap`，不擋首次繪製，但流量不小。若要再降，做法是子集化並自行託管。

- 三種字體都必須有完整的 fallback 鏈，且 fallback 不得是無襯線字體（會與襯線內文的視覺調性衝突）。

---

## 形狀與效果

### 禁止

以下項目在這個專案中一律不使用，沒有例外：

- 漸層背景、漸層文字（`linear-gradient`、`radial-gradient`、`background-clip: text`）
- 毛玻璃（`backdrop-filter`）
- 發光陰影、任何裝飾性陰影（`box-shadow`）
- emoji
- 裝飾性圖示，意即只為了填補版面而存在的圖示
- 三欄功能卡片
- Hero 上方的膠囊標籤（pill / badge）
- 每個區塊都套 fade-in 進場動畫

### 圓角

一律 `2px` 或 `0`。沒有第三個值。`border-radius: 50%` 也不行。圓形頭像或圖示框不符合這套設計。

### 允許的圖示

僅限**功能性**圖示：主題切換鈕、外部連結標記、表單狀態。圖示必須是單色線條，用 `currentColor`，不得有填色裝飾。社群連結圖示屬於功能性，可保留。

### 分隔

區塊之間用**留白**或 `1px` 實線分隔，不用卡片、陰影或底色區塊來製造層次。

### 動態

- 允許：`:hover`、`:focus-visible` 的即時狀態變化（顏色、底線、邊框），時長 ≤ 150ms。
- 禁止：進場動畫、視差、捲動觸發的轉場。
- 一律尊重 `prefers-reduced-motion: reduce`。

---

## 版面

- **左對齊。** 不使用置中的區塊標題或置中的段落。
- **非對稱。** 不使用等寬的多欄網格去填滿整行。內容欄與留白的比例可以刻意不均。
- **大量留白是允許且鼓勵的。** 不需要把版面填滿。
- **資訊密度優先於裝飾。** 一個區塊若只能放一句行銷話術，這個區塊就不該存在。
- 中文與英文的行寬用 `em` 而非 `ch` 設定上限。`ch` 以「0」的字寬為基準，中日韓字元約為其兩倍，同一數值在兩種文字下代表的字數會差一倍。

---

## 文案

這一節比視覺規範更重要。版面做錯了看得出來，文案做錯了只會讓讀者說不上來哪裡怪，然後離開。

### 禁用詞彙

- 英文：seamless、elevate、unlock、empower、cutting-edge、revolutionary、game-changing
- 中文：極致、賦能、一站式、全方位、打造、深耕、無縫

### 句型（生成式文案的指紋）

以下句型模式會讓一頁文案讀起來像機器寫的。它們單句看都沒問題，密集出現才是問題，所以**必須在全頁寫完後回頭統計**，不能只看單段。

**1. 「不是 X，而是 Y」全頁最多一次。**

這是中文 LLM 文案最明顯的指紋。連續使用會讓讀者感覺整頁都在反駁一個不存在的對手。

本站首頁改版時，這個句型在一頁內出現七次：「不是把現成平台租給你」、「不是套裝方案」、「不是把程式寫完就結束」、「不是看規格表選硬體」、「不是一包丟給你自己想辦法架的原始碼」、「不會為了用 AI 而用 AI」、「而不是一律推薦最貴的那一台」。

保留最有力的一處（通常是 Hero），其餘改成直接陳述做了什麼。

**2. 破折號「——」全頁最多兩次。**

第二個強烈訊號。大多數破折號可以換成句號或逗號；拆成兩個短句通常比一個長句更有力。

**3. 標題不要清一色是格言式短句加句號。**

「你的需求，不該去遷就別人的方案。」「為什麼我們給得出合理的價格。」「我們實際在做的事。」形式整齊到像同一個模板產出。

至少一半的區塊標題應該是單純的名詞（「服務項目」、「聯絡方式」），節奏上才像人寫的。

**4. 全頁寫完後檢查重複。**

分段生成最容易在不同區塊寫出同一個比喻或近乎逐字的同一句話。首頁改版時「丟給你自己想辦法」出現在兩個區塊，「知道哪些工作負載值得上 GPU、哪些用 CPU 就夠」幾乎逐字出現兩次。

**5. 第一人稱用「我」，英文用 I。**

本公司為一人公司，而「跟你討論的人就是寫程式的人，沒有中間層」正是主要賣點。用「我們」營造規模感會直接削弱它：讀者預期有團隊，發現只有一個人時，落差本身就是信任損失。

因此全站一律用單數第一人稱，兩個語系皆然。「Company of One」這個產品名擺在同一頁上，單數人稱讓整個定位自洽。


### 結構

**不要讓每個區塊都是同一個形狀。**

「小標籤 ＋ 格言式標題 ＋ 卡片列表」，每張卡片又都是「標題 ＋ 一句說明 ＋ 一句安心保證」。這種完全對稱的節奏就是模板感的來源。

不同區塊用不同形式：有的用清單，有的用一整段散文，有的用表格，有的只有一句話加一張圖。

### 宣稱與證據

**這是整節最重要的一條。**

「AI 味」的反面不是換掉幾個詞，是證據。

一頁全是宣稱而沒有任何佐證，讀起來就會像罐頭公司官網，無論用詞多克制：

| 宣稱 | 證據 |
|---|---|
| 「從零到上線的完整應用是我們自己做過的」 | 指名是哪一個，放連結 |
| 「實際部署、調校、踩過坑」 | 描述具體是什麼坑、怎麼解決的 |
| 「有 GPU 實機經驗」 | 一張機器實拍，或一段規格與實測數字 |

規則：

- **每一個能力宣稱都要有可指向的佐證**，否則刪掉。頁面短而可信，勝過長而空洞。
- **一個具體案例勝過六張服務卡片。** 寧可只寫一個做過的專案並講清楚技術決策，也不要列出六項沒有作品的服務。
- **不寫無法驗證的陳述**，尤其是合作關係、技術規格、服務範圍。客戶會當真並追問。
- **講機制，不講形容詞。** 「沒有平台抽成，先確認範圍才報價」可以被檢驗；「最滿意的價格」不能。
- **產品的限制照實說。** 若產品站自己標註是測試站，其他頁面不得講得比它成熟。

### 雙語

兩個語系的文案都要能獨立讀通。英文不是中文的逐句直譯，中文也不是英文的。上述所有句型規則對兩種語言同等適用。

### 適用範圍

「宣稱與證據」與「禁用詞彙」兩節適用於儲存庫的所有產出，包含 commit message、PR 說明與程式碼註解。

句型與結構規則只適用於**讀者會看到的頁面文案**。本文件、註解與技術說明是參考資料而非散文，破折號與並列句在其中有正當用途。

---

## 實作規則

### 設計 token

所有色彩與字體集中在 `src/styles/global.css` 的 `:root`，元件不得寫死色值。改寫後的 token 應為：

```css
:root {
  --paper: #F4F1EA;
  --ink: #1A1A1A;
  --accent: #C8411B;

  --bg: var(--paper);
  --fg: var(--ink);
  --on-accent: var(--paper);   /* 強調色色塊上的文字；追悼模式的暗色版改用 --ink */

  --fg-secondary: color-mix(in srgb, var(--fg) 65%, var(--bg));
  --rule: color-mix(in srgb, var(--fg) 18%, var(--bg));
  --hover: color-mix(in srgb, var(--fg) 7%, var(--bg));

  --font-display: "LXGW WenKai TC", "Noto Serif TC", "Songti TC", …, serif;
  --font-body: "Noto Serif TC", "Songti TC", …, serif;
  --font-mono: "JetBrains Mono", ui-monospace, …, monospace;

  --radius: 2px;
}

:root[data-theme="dark"] {
  --bg: var(--ink);
  --fg: var(--paper);
}
```

完整的 fallback 鏈以 `src/styles/global.css` 為準。三個版面（首頁、聯絡、CoO）共用這一份 token 與 `global.css` 裡的頁首、按鈕、表格、頁尾；`coo.css` 只放產品頁自己的元件，不得再定義平行的色彩變數。

**`border-radius` 一律寫字面值 `2px` 或 `0`，不要寫 `var(--radius)`。** 驗收用 grep 比對字面值，引用變數會被判為違規。

### 延續現有的架構決策

視覺層重寫，但以下既有決策是對的，必須保留：

- **i18n 分檔**：`src/i18n/ui.ts`（共用短字串）、`home.ts`、`coo.ts`（頁面長文案）。新頁面的長文案另開檔案，不要塞回 `ui.ts`。
- **兩個語系的物件形狀必須一致**，由 TypeScript 介面約束。少一個 key 應該是型別錯誤，而不是該語系安靜地少一段內容。
- **站內連結一律用相對路徑**（`src/consts.ts` 的 `LOCALE_HOME_PATH`）。`prisvalis.tw`、`prisvalis.app` 與 `.com` 綁在同一個 Worker 上，絕對路徑會把訪客彈回 `.com`。
- **canonical、hreflang、OG、JSON-LD 維持絕對網址**指向 `SITE`。三個網域各自 self-canonical 會構成重複內容。
- **`CONTACT.to` 與 `wrangler.json` 的 `destination_address` 必須一字不差地一致。** 不一致時寄信會拋例外，訪客只看到「系統暫時無法寄出訊息」，畫面上看不出是設定問題。

## 追悼模式

每年五個日期（一律以台灣時間 UTC+8 判定）整站轉為黑白，並在每頁最上方顯示一行說明。

- 日期清單與文案在 `src/i18n/mourning.ts`，選取標準寫在該檔案的註解裡。**新增日期只改這個檔案**：判定用的內嵌腳本（`components/ThemeInit.astro`）與逐日的顯示規則（`components/MourningNotice.astro`）都從 `MOURNING_DAYS` 產生。
- 黑白是覆寫 token，不是 `filter`：`:root[data-mourning] { --accent: … }` 把唯一的彩色換成由 ink 與 paper 混出的灰。`filter` 加在 `<html>` 上會讓它變成 fixed 子元素的 containing block。Logo 圖片與 Turnstile 嵌入不歸 token 管，另外在 `global.css` 對它們單獨套 `grayscale`。
- 暗色模式的強調色換成淺灰後，紙色文字放在上面只有 2.46，所以 `--on-accent` 在該組合下改用墨色（6.27）。新增放在強調色色塊上的文字時，用 `var(--on-accent)`，不要寫 `var(--paper)`。
- 判定必須用 `getUTCMonth` / `getUTCDate`：偏移已經加進時間戳，用本地方法會被訪客時區再加一次。改動這段腳本後，用假造時間戳在多個時區下驗證（在 Node 程序內設定 `process.env.TZ`；Git Bash 的 `TZ=… node` 前綴在 Windows 上不會生效，會靜默地用本機時區）。
- 開發用覆寫：`?mourning=09-21` 強制開啟該日，`?mourning=0` 強制關閉，值不在清單內則忽略。
- 一天多個事件寫在同一句裡。跨過午夜不會自動更新，不為此加計時器。

## 驗收

改動後執行以下檢查。任何一項有輸出就是還沒改完：

```sh
# 禁用的視覺效果
grep -rnE "backdrop-filter|linear-gradient|radial-gradient|box-shadow" src/

# 圓角只允許 2px 或 0
grep -rnoE "border-radius: *[^;]*" src/ | grep -vE ": *(2px|0)$"

# 只允許三個色值（衍生請用 color-mix，不要寫新 hex）
grep -rnoE "#[0-9a-fA-F]{3,8}" src/ | grep -viE "#(F4F1EA|1A1A1A|C8411B)"

# 行寬不得用 ch
grep -rn "max-width: *[0-9.]*ch" src/

# 行銷套語
grep -rniE "seamless|elevate|unlock|empower|極致|賦能|一站式|無縫" src/
```

建置與型別檢查：

```sh
npm run build
npx tsc --noEmit
npx wrangler deploy --dry-run
```

視覺檢查必須涵蓋：**1280px 與 390px 兩種寬度 × 淺色與深色兩種模式 × 中英兩種語系**，共八種組合。只看一種就宣稱完成是不夠的。過去的改動有兩次是在這一步才發現問題：行動版頁首擠成三列、中文導言被擠斷行。

---

## 專案基本資訊

- Astro 5 + Cloudflare Workers，`@astrojs/cloudflare` adapter。
- 除聯絡表單端點（`src/pages/api/contact.ts`，`prerender = false`）外全站靜態。
- 沒有 CI。`main` 合併後需手動 `npm run build && npm run deploy`。
- 頁面除主題切換與追悼日判定（皆為 `<head>` 或頁尾的內嵌小腳本）、聯絡頁的橫幅狀態與 Turnstile 外，不使用 JavaScript。**新增 JS 前請先確認沒有純 CSS 的做法。**
