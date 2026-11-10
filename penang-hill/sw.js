/* Penang Hill Trail Guide: offline service worker.
   When you change any file, bump VERSION so phones fetch the update. */
const VERSION = "beta-1.8.0";
const CACHE = "phtg-" + VERSION;
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./privacy.html",
  "./fonts/Inter-Regular.woff",
  "./fonts/Inter-SemiBold.woff",
  "./fonts/Inter-Bold.woff",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("phtg-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // outside links go straight to the web
  if (req.mode === "navigate") {
    // Pages: try the network first (to get updates), fall back to the saved copy offline
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  // Everything else: saved copy first, then network
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
