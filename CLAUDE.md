# CLAUDE.md

給在這個儲存庫工作的 AI 編輯代理與人類開發者。

## 設計規範：華國美學 Skill

本站的視覺、版面與介面設計**一律依照「華國美學」Skill**（`roc-aesthetic`）。

- 來源：<https://github.com/maylogger/roc-aesthetic>（MIT 授權）
- 本機副本：`.claude/skills/roc-aesthetic/`，同步自上游 commit（見該資料夾的 `.upstream-commit`）。Claude Code 會自動載入這個 Skill。

**任何前端相關的工作（新增頁面、修改版面或樣式、評審畫面）開始之前，都必須先使用這個 Skill**，並依它的路由讀取對應的規則檔：

1. `SKILL.md`：入口、風格不變量與規則優先順序。
2. `SYSTEM_PROMPT.md` 與 `prompts/style.md`：整體風格基底，每次都要讀。
3. `rules/*.md`：依任務選讀（版面、間距、微瑕疵、字體、色彩、按鈕、表格、橫幅、圖片、文案）。

規則之間有衝突時，依 `SKILL.md`「Precedence and Conflicts」一節的順序處理。

要更新 Skill，從上游重新複製整個資料夾，並更新 `.upstream-commit`。不要只在本機副本裡改規則。
