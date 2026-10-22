---
title: Impact of the PHP2Shell Vulnerabilities on this Company's Services
description: On 21 October 2026, PHP patched two critical remote code execution vulnerabilities known as PHP2Shell. This Company has completed an inventory and its services are not affected.
date: 2026-10-22
category: security
sources:
  - title: "Help Net Security: PHP2Shell: Critical PHP vulnerabilities patched, update now!"
    url: https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/
  - title: "SecurityWeek: PHP2Shell: Mass Exploitation Looms for Leaked Critical PHP Flaws"
    url: https://www.securityweek.com/php2shell-mass-exploitation-looms-for-leaked-critical-php-flaws/
  - title: "The Hacker News: PHP2Shell: Two Unpatched Critical PHP RCE Flaws"
    url: https://thehackernews.com/2026/10/php2shell-two-unpatched-critical-php.html
---

## Summary

On 21 October 2026, PHP released updates fixing two critical vulnerabilities known as PHP2Shell.

- The vulnerabilities are CVE-2026-109618 and CVE-2026-109619. An attacker can execute code on the server remotely without signing in. PHP rates both at 9.2 on CVSS v4.0.
- Every PHP environment that serves web requests is affected, including PHP-FPM, Apache mod_php and php-cgi.
- The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35. PHP 8.1 and earlier are no longer officially supported.
- Exploitation attempts were recorded before the vulnerabilities were made public.

## This Company's inventory

- This Company has inventoried all of its assets and currently runs no projects or services that use PHP, so it is not affected by these vulnerabilities.
- All network traffic to this Company's public services passes through Cloudflare for protection.

## If you use PHP

If your systems use PHP, please upgrade to one of the fixed versions above as soon as possible, or check the patch status with your Linux distribution or hosting provider.

For any questions, please reach this Company through the [contact page](/en/contact/).
