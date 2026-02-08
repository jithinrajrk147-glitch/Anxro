// Service Worker for ANXRO PWA
// Version 1.0.0 - Full offline support with live updates

const CACHE_NAME = 'anxro-v1.0.0';
const RUNTIME_CACHE = 'anxro-runtime-v1';

// Core files to cache immediately
const CORE_ASSETS = [
  '/Anxro/',
  '/Anxro/ANXRO.html',
  '/Anxro/index.html',
  '/Anxro/manifest.json',
  '/Anxro/load.png',
  '/Anxro/app.png',
  '/Anxro/Bungee-Regular.ttf'
];

// Extended assets to cache (tools and features)
const EXTENDED_ASSETS = [
  '/Anxro/ai.html',
  '/Anxro/calculator.html',
  '/Anxro/calandar.html',
  '/Anxro/barcode.html',
  '/Anxro/code.html',
  '/Anxro/crpconvert.html',
  '/Anxro/dotoday.html',
  '/Anxro/apps.json',
  '/Anxro/blog.json',
  '/Anxro/courses.json',
  '/Anxro/audio.json'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Core assets cached, caching extended assets in background');
        return caches.open(CACHE_NAME)
          .then((cache) => cache.addAll(EXTENDED_ASSETS).catch(err => {
            console.warn('[SW] Some extended assets failed to cache:', err);
          }));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Network first, fallback to cache (for live updates)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    // Try network first for live updates
    fetch(request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();
        
        // Update cache with fresh content
        caches.open(RUNTIME_CACHE)
          .then((cache) => {
            cache.put(request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[SW] Serving from cache:', request.url);
              return cachedResponse;
            }
            
            // If not in cache and it's a navigation request, return offline page
            if (request.mode === 'navigate') {
              return caches.match('/Anxro/ANXRO.html');
            }
            
            return new Response('Offline - Content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync for updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-anxro') {
    event.waitUntil(
      // Update all cached resources
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll([...CORE_ASSETS, ...EXTENDED_ASSETS]);
        })
    );
  }
});

// Push notifications support (for future features)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/Anxro/app.png',
    badge: '/Anxro/app.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('ANXRO', options)
  );
});

console.log('[SW] Service Worker loaded successfully');