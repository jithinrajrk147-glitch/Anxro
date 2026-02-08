// Service Worker for ANXRO PWA
// Version 1.1.0 - Enhanced offline support with live updates

const CACHE_NAME = 'anxro-v1.1.0';
const RUNTIME_CACHE = 'anxro-runtime-v1';
const OFFLINE_PAGE = '/Anxro/offline.html';

// Core files to cache immediately (critical for app functionality)
const CORE_ASSETS = [
  '/Anxro/',
  '/Anxro/index.html',
  '/Anxro/ANXRO.html',
  '/Anxro/offline.html',
  '/Anxro/manifest.json',
  '/Anxro/load.png',
  '/Anxro/app.png',
  '/Anxro/logo.png',
  '/Anxro/Bungee-Regular.ttf',
  '/Anxro/icon-192',
  '/Anxro/icon-512'
];

// Extended assets to cache (tools and features)
const EXTENDED_ASSETS = [
  '/Anxro/mainprof.html',
  '/Anxro/ai.html',
  '/Anxro/calculator.html',
  '/Anxro/calandar.html',
  '/Anxro/barcode.html',
  '/Anxro/code.html',
  '/Anxro/crpconvert.html',
  '/Anxro/dotoday.html',
  '/Anxro/habit.html',
  '/Anxro/note.html',
  '/Anxro/libary.html',
  '/Anxro/apps.json',
  '/Anxro/blog.json',
  '/Anxro/courses.json',
  '/Anxro/audio.json',
  '/Anxro/papers.json'
];

// Images to cache
const IMAGE_ASSETS = [
  '/Anxro/ai.png',
  '/Anxro/calculator.png',
  '/Anxro/calendar.png',
  '/Anxro/blockchain.png',
  '/Anxro/code.png',
  '/Anxro/note.png',
  '/Anxro/library.png',
  '/Anxro/home.png'
];

// Install event - cache core assets immediately
self.addEventListener('install', (event) => {
  console.log('[SW v1.1.0] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Core assets cached successfully');
        // Cache extended assets in background
        return caches.open(CACHE_NAME)
          .then((cache) => {
            // Add extended assets without blocking installation
            cache.addAll(EXTENDED_ASSETS).catch(err => {
              console.warn('[SW] Some extended assets failed to cache:', err);
            });
            // Add images without blocking
            cache.addAll(IMAGE_ASSETS).catch(err => {
              console.warn('[SW] Some images failed to cache:', err);
            });
          });
      })
      .then(() => {
        console.log('[SW] Installation complete, activating...');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  console.log('[SW v1.1.0] Activating service worker...');
  
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
      .then(() => {
        console.log('[SW] Activation complete, claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - Network first with cache fallback (for live updates)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (external APIs, CDNs, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    // Try network first for live updates
    fetch(request)
      .then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response (can only be consumed once)
        const responseToCache = response.clone();
        
        // Update runtime cache with fresh content
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
              return caches.match(OFFLINE_PAGE);
            }
            
            // For other requests, return a generic offline response
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

// Background sync for updates (when connection is restored)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-anxro') {
    event.waitUntil(
      // Update all cached resources
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('[SW] Syncing cached resources...');
          return cache.addAll([...CORE_ASSETS, ...EXTENDED_ASSETS, ...IMAGE_ASSETS])
            .then(() => {
              console.log('[SW] Sync complete');
            })
            .catch((error) => {
              console.error('[SW] Sync failed:', error);
            });
        })
    );
  }
});

// Push notifications support (ready for future features)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available in ANXRO!',
    icon: '/Anxro/app.png',
    badge: '/Anxro/app.png',
    vibrate: [200, 100, 200],
    tag: 'anxro-notification',
    requireInteraction: false,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ANXRO', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/Anxro/')
    );
  }
});

// Message handler for communication with app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
});

console.log('[SW v1.1.0] Service Worker loaded successfully ✅');