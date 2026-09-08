type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

// Worker secret 不會出現在 wrangler.json，所以 `wrangler types` 生不出來。
// Env 是全域 interface，這裡用宣告合併補上。
interface Env {
	TURNSTILE_SECRET: string;
}
