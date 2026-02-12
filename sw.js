// Service Worker for ANXRO PWA
// Version 1.3.0 - Fixed network timeout issue for slow connections
// Now uses cache-first with network update strategy for instant loading

const CACHE_NAME = 'anxro-v1.3.0';
const RUNTIME_CACHE = 'anxro-runtime-v1';
const OFFLINE_PAGE = '/Anxro/offline.html';
const NETWORK_TIMEOUT = 3000; // 3 seconds timeout for network requests

// Core files to cache immediately (critical for app functionality)
const CORE_ASSETS = [
  '/Anxro/',
  '/Anxro/index.html',
  '/Anxro/ANXRO.html',
  '/Anxro/offline.html',
  '/Anxro/manifest.json',
  '/Anxro/anxro-logo.png',
  '/Anxro/load.png',
  '/Anxro/Bungee-Regular.ttf'
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
  console.log('[SW v1.3.0] Installing service worker with network timeout fix...');
  
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
  console.log('[SW v1.3.0] Activating service worker...');
  
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

// Helper function: Network request with timeout
function fetchWithTimeout(request, timeout = NETWORK_TIMEOUT) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Network timeout')), timeout)
    )
  ]);
}

// Fetch event - Cache first with network update (FAST & RELIABLE)
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
    // Try cache first for instant loading
    caches.match(request)
      .then((cachedResponse) => {
        // If we have a cached response, return it immediately
        if (cachedResponse) {
          console.log('[SW] ⚡ Serving from cache (instant):', request.url);
          
          // Update cache in background (stale-while-revalidate)
          fetchWithTimeout(request)
            .then((response) => {
              if (response && response.status === 200 && response.type !== 'error') {
                const responseToCache = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => {
                    cache.put(request, responseToCache);
                    console.log('[SW] 🔄 Cache updated in background:', request.url);
                  });
              }
            })
            .catch(() => {
              // Network failed, but we already served from cache, so no problem
              console.log('[SW] 📡 Background update failed (offline), using cached version');
            });
          
          return cachedResponse;
        }
        
        // No cache, try network with timeout
        console.log('[SW] 🌐 Not in cache, fetching from network:', request.url);
        return fetchWithTimeout(request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type === 'error') {
              throw new Error('Invalid response');
            }

            // Clone the response (can only be consumed once)
            const responseToCache = response.clone();
            
            // Update cache with fresh content
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
                console.log('[SW] ✅ Cached new resource:', request.url);
              });
            
            return response;
          })
          .catch((error) => {
            console.log('[SW] ❌ Network failed:', error.message);
            
            // If it's a navigation request, return offline page
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_PAGE)
                .then((offlinePage) => {
                  if (offlinePage) {
                    return offlinePage;
                  }
                  // Fallback if offline page is not cached
                  return new Response('Offline - Please check your connection', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                      'Content-Type': 'text/html'
                    })
                  });
                });
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
    icon: '/Anxro/anxro-logo.png',
    badge: '/Anxro/anxro-logo.png',
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
        .then(() => {
          console.log('[SW] URLs cached successfully');
        })
        .catch((error) => {
          console.error('[SW] Failed to cache URLs:', error);
        })
    );
  }
});

console.log('[SW v1.3.0] Service Worker loaded successfully with network timeout fix ✅');
