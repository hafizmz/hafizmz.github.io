/* Penang Hill Trail Guide: offline service worker.
   When you change any file, bump VERSION so phones fetch the update. */
const VERSION = "beta-2.9.1";
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
] .concat(["0697_t.jpg", "0699_t.jpg", "0701_t.jpg", "0702_t.jpg", "0703_t.jpg", "0708_t.jpg", "0713_t.jpg", "0716_t.jpg", "0750_t.jpg", "0751_t.jpg", "0754_t.jpg", "0763_t.jpg", "0777_t.jpg", "1591_t.jpg", "1601_t.jpg", "1628_t.jpg", "1663_t.jpg", "2017_t.jpg", "2023_t.jpg", "2024_t.jpg", "2027_t.jpg", "3124_t.jpg", "3125_t.jpg", "3128_t.jpg", "3140_t.jpg", "3142_t.jpg", "3170_t.jpg", "3184_t.jpg", "6036_t.jpg", "6046_t.jpg", "6049_t.jpg", "6058_t.jpg", "6060_t.jpg", "6065_t.jpg", "6079_t.jpg", "8309_t.jpg", "8338_t.jpg", "9158_t.jpg", "9162_t.jpg", "9165_t.jpg", "9168_t.jpg", "BOARDI_t.jpg", "DCA8C602_t.jpg", "DECKW_t.jpg", "FORKV_t.jpg", "GAZV_t.jpg", "HABEX_t.jpg", "HEXB_t.jpg", "HUTI_t.jpg", "KM07_t.jpg", "OWLSW_t.jpg", "PEARL_t.jpg", "SHC2_t.jpg", "WAGON1_t.jpg", "WAGON2_t.jpg"].map(f => "./photos/" + f)); // trail photo thumbnails, so the strips work offline

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
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    // keep full-size trail photos once viewed, so they open again offline
    if (res.ok && new URL(req.url).pathname.includes("/photos/")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
