/**
 * Service Worker for China Cafe Menu
 * Provides offline support with cache-first strategy for static assets
 * and network-first strategy for menu data
 */

const CACHE_NAME = 'china-cafe-menu-v2';
const STATIC_CACHE = 'static-v2';
const DATA_CACHE = 'data-v1';

// Static assets to cache immediately on install
// Use relative paths for GitHub Pages compatibility
const STATIC_ASSETS = [
  './',
  './index.html',
  './admin.html',
  './css/common.css',
  './js/firebase-config.js',
  './js/utils/normalize.js',
  './js/utils/formatters.js',
  './js/utils/error-handling.js',
  './js/utils/sanitize.js'
];

// External resources to cache
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://cdn.tailwindcss.com'
];

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        // Cache static assets, but don't fail if some are missing
        return Promise.allSettled(
          STATIC_ASSETS.map(url => 
            cache.add(url).catch(err => console.warn(`[SW] Failed to cache: ${url}`, err))
          )
        );
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Install failed:', error);
      })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old versions of our caches
            if (cacheName !== STATIC_CACHE && cacheName !== DATA_CACHE && cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - serve from cache or network
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle Firebase/Firestore requests - network only (don't cache API calls)
  if (url.hostname.includes('firestore.googleapis.com') || 
      url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis.com')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          // Return cached menu data if available when offline
          if (url.pathname.includes('menu')) {
            return caches.match('/offline-menu.json');
          }
          return new Response(JSON.stringify({ error: 'Offline' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }
  
  // Handle static assets - cache first, then network
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Handle HTML pages - network first, then cache
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Default: try cache first, then network
  event.respondWith(cacheFirst(request));
});

/**
 * Check if URL is a static asset
 */
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext)) ||
         url.hostname === 'fonts.googleapis.com' ||
         url.hostname === 'fonts.gstatic.com' ||
         url.hostname === 'cdn.tailwindcss.com';
}

/**
 * Cache-first strategy
 * Try cache first, fall back to network, cache the response
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Return cached response and update cache in background
    updateCache(request);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network request failed:', request.url);
    // Return offline fallback for HTML
    if (request.headers.get('Accept')?.includes('text/html')) {
      return caches.match('/index.html');
    }
    throw error;
  }
}

/**
 * Network-first strategy
 * Try network first, fall back to cache
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network request failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return caches.match('/index.html');
  }
}

/**
 * Update cache in background
 */
async function updateCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse);
    }
  } catch (error) {
    // Silently fail - we already have cached version
  }
}

/**
 * Handle messages from clients
 */
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'clearCache') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

console.log('[SW] Service worker loaded');
