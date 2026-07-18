/* Brew Card service worker — v3 (auto-update fix) */
const CACHE = 'brewcard-v7';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())   // take over immediately, don't wait
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())   // take control of all open tabs
      .then(() => {
        // tell every open tab to reload so they get the new version
        self.clients.matchAll({type:'window'}).then(clients =>
          clients.forEach(c => c.postMessage({type:'SW_UPDATED'}))
        );
      })
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage) {
    // network-first: always get the freshest page when online
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => { c.put(req, copy); c.put('./index.html', res.clone()); }).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then(h => h || caches.match('./index.html')))
    );
    return;
  }
  // assets: cache-first
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
