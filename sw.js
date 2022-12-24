self.addEventListener('install', e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./css/style.css", "./image/icon4.png"])
        })
    );
});
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(Response => {
            return Response || fetch(e.request);
        })
    );
});