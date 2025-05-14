const CACHE_NAME = 'course-tracker-cache-v1';
const urlsToCache = [
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'icon-192.png',
    'icon-512.png',
    'offline.html'
];
  

// Install and cache assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing and caching files');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve files from cache if available
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match('offline.html');
            }
          })
        );
      })
    );
  });
  

// Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});
