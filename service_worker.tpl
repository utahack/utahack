// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
const CACHE_NAME = 'aukara-cache-v1';
const urlsToCache = $cacheURLs;

// インストール処理
self.addEventListener('install', e => {
    e.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting())
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', e => {
    // 外部リソース取得時
    console.log('fetch', e.request.url);
    e.respondWith(
        caches.match(e.request, {
            ignoreSearch: true
        })
        .then(response => {
            return response || fetch(e.request);
        })
    );
});