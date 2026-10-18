const CACHE = 'salon-v7';
const FILES = ['index.html', 'admin.html', 'style.css', 'postavke.js', 'app.js', 'jezik.js', 'kalendar.js', 'manifest.json', 'manifest-admin.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'upute.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
