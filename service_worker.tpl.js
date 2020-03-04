// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
const CACHE_NAME = 'aukara-cache-v1';
const urlsToCache = $cacheURLs;

// インストール処理
self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', event => {
    event.respondWith(
        caches
            .match(event.request)
            .then(response => (response || fetch(event.request)))
    );
});