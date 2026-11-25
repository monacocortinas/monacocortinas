const CACHE_NAME = "monaco-cortinas-v2"
const STATIC_CACHE = "monaco-static-v2"
const DYNAMIC_CACHE = "monaco-dynamic-v2"
const IMAGE_CACHE = "monaco-images-v2"

const STATIC_ASSETS = [
  "/",
  "/cotizador",
  "/tablillas",
  "/images/hero-cortinas-metalicas.jpg",
  "/images/logo-monaco.webp",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
]

const CRITICAL_IMAGES = ["/images/hero-cortinas-metalicas.jpg", "/images/logo-monaco.webp"]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      }),
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.addAll(CRITICAL_IMAGES)
      }),
    ]).then(() => {
      return self.skipWaiting()
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== IMAGE_CACHE) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        return self.clients.claim()
      }),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") return

  // Skip external requests except for critical CDNs
  if (
    url.origin !== location.origin &&
    !url.hostname.includes("fonts.googleapis.com") &&
    !url.hostname.includes("fonts.gstatic.com")
  )
    return

  if (request.destination === "image" || url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|gif|ico)$/)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            fetch(request)
              .then((fetchResponse) => {
                if (fetchResponse.ok) {
                  cache.put(request, fetchResponse.clone())
                }
              })
              .catch(() => {})
            return response
          }

          return fetch(request)
            .then((fetchResponse) => {
              if (fetchResponse.ok) {
                cache.put(request, fetchResponse.clone())
              }
              return fetchResponse
            })
            .catch(() => {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="#9ca3af">Imagen no disponible</text></svg>',
                {
                  headers: { "Content-Type": "image/svg+xml" },
                },
              )
            })
        })
      }),
    )
    return
  }

  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return (
            response ||
            fetch(request).then((fetchResponse) => {
              if (fetchResponse.ok) {
                cache.put(request, fetchResponse.clone())
              }
              return fetchResponse
            })
          )
        })
      }),
    )
    return
  }

  if (request.headers.get("accept").includes("text/html")) {
    event.respondWith(
      Promise.race([
        fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Network timeout")), 3000)),
      ]).catch(() => {
        return caches.match(request).then((response) => {
          return response || caches.match("/")
        })
      }),
    )
  } else {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          fetch(request)
            .then((fetchResponse) => {
              if (fetchResponse.ok) {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, fetchResponse.clone())
                })
              }
            })
            .catch(() => {})
          return response
        }

        return fetch(request).then((fetchResponse) => {
          if (fetchResponse.ok) {
            const responseClone = fetchResponse.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return fetchResponse
        })
      }),
    )
  }
})

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAN_CACHE") {
    caches.open(DYNAMIC_CACHE).then((cache) => {
      cache.keys().then((keys) => {
        if (keys.length > 100) {
          // Eliminar los 20 más antiguos
          keys.slice(0, 20).forEach((key) => cache.delete(key))
        }
      })
    })
  }
})
