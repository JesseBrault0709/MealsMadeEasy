const CACHE = "base";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

//Install ServiceWorker
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE)).then((cache) => {
    return cache.addAll(urlsToCache);
  });
});
//Requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(() => {
        return fetch(event.request);
      })
      .catch(() => caches.match("offline.html"))
  );
});
//ServiceWorker Activation
self.addEventListener("activate", (event) => {
  const newCache = [];
  newCache.push(CACHE);
  event.waitUntil(caches.keys()).then((cacheNames) =>
    Promise.all(
      cacheNames.forEach((cacheName) => {
        if (!newCache.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    )
  );
});
