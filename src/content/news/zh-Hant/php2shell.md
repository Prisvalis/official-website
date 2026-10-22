---
title: PHP2Shell 漏洞對本公司服務之影響說明
description: PHP 官方於 2026 年 10 月 21 日修補兩個可遠端執行程式碼的重大漏洞，通稱 PHP2Shell。本公司已完成盤點，本公司的服務不受影響。
date: 2026-10-22
category: security
sources:
  - title: "Help Net Security：PHP2Shell: Critical PHP vulnerabilities patched, update now!"
    url: https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/
  - title: "SecurityWeek：PHP2Shell: Mass Exploitation Looms for Leaked Critical PHP Flaws"
    url: https://www.securityweek.com/php2shell-mass-exploitation-looms-for-leaked-critical-php-flaws/
  - title: "The Hacker News：PHP2Shell: Two Unpatched Critical PHP RCE Flaws"
    url: https://thehackernews.com/2026/10/php2shell-two-unpatched-critical-php.html
---

## 事件概要

PHP 官方於 2026 年 10 月 21 日發布更新，修補兩個重大漏洞，通稱 PHP2Shell。

- 漏洞編號為 CVE-2026-109618 與 CVE-2026-109619。攻擊者不需登入，即可在伺服器上遠端執行程式碼，PHP 官方評為 CVSS v4.0 9.2 分。
- 影響所有處理網頁請求的 PHP 環境，包括 PHP-FPM、Apache mod_php 與 php-cgi。
- 已修補的版本為 8.5.12、8.4.27、8.3.36 與 8.2.35。PHP 8.1 以前的版本已停止官方支援。
- 漏洞公開前，已有攻擊嘗試的紀錄。

## 本公司的盤點結果

- 本公司已盤點所有資產，目前沒有使用 PHP 的專案或服務，因此不受此漏洞影響。
- 本公司對外服務的網路流量，皆經過 Cloudflare 進行防護。

## 給使用 PHP 的讀者

若您的系統使用 PHP，請盡速升級至上述已修補的版本，或向您的 Linux 發行版、主機供應商確認修補進度。

如有疑問，請透過[聯絡頁](/contact/)與本公司聯繫。
