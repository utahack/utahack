// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'aukara-cache-v1';
var urlsToCache = [
    'https://utahack.github.io/service_worker.js',
    'https://utahack.github.io/aukaraokecp/index.html',
    'https://utahack.github.io/aukaraokecp/coupon/utahiro/index.html',
    'https://utahack.github.io/css/aukaraokecp/colorbox.css',
    'https://utahack.github.io/css/aukaraokecp/default.css',
    'https://utahack.github.io/css/aukaraokecp/mogimae.css',
    'https://utahack.github.io/css/aukaraokecp/print.css',
    'https://utahack.github.io/css/aukaraokecp/sp.css',
    'https://utahack.github.io/images/aukaraokecp/apple-touch-icon-120x120.png',
    'https://utahack.github.io/images/aukaraokecp/apple-touch-icon-152x152.png',
    'https://utahack.github.io/images/aukaraokecp/apple-touch-icon-180x180.png',
    'https://utahack.github.io/images/aukaraokecp/apple-touch-icon-76x76.png',
    'https://utahack.github.io/images/aukaraokecp/apple-touch-icon.png',
    'https://utahack.github.io/images/aukaraokecp/au_icon.png',
    'https://utahack.github.io/images/aukaraokecp/btn_03a.png',
    'https://utahack.github.io/images/aukaraokecp/btn_03b.png',
    'https://utahack.github.io/images/aukaraokecp/btn_03c.png',
    'https://utahack.github.io/images/aukaraokecp/btn_04.png',
    'https://utahack.github.io/images/aukaraokecp/btn_05.png',
    'https://utahack.github.io/images/aukaraokecp/btn_11.png',
    'https://utahack.github.io/images/aukaraokecp/btn_13.png',
    'https://utahack.github.io/images/aukaraokecp/btn_15.png',
    'https://utahack.github.io/images/aukaraokecp/btn_18.png',
    'https://utahack.github.io/images/aukaraokecp/btn_19.png',
    'https://utahack.github.io/images/aukaraokecp/btn_20.png',
    'https://utahack.github.io/images/aukaraokecp/btn_21.png',
    'https://utahack.github.io/images/aukaraokecp/btn_22.png',
    'https://utahack.github.io/images/aukaraokecp/btn_23.png',
    'https://utahack.github.io/images/aukaraokecp/btn_drink.png',
    'https://utahack.github.io/images/aukaraokecp/coupon-bottom.png',
    'https://utahack.github.io/images/aukaraokecp/coupon-title.png',
    'https://utahack.github.io/images/aukaraokecp/coupon-top.png',
    'https://utahack.github.io/images/aukaraokecp/coupon_sumi.png',
    'https://utahack.github.io/images/aukaraokecp/coupon_title.png',
    'https://utahack.github.io/images/aukaraokecp/fig_howto_01.png',
    'https://utahack.github.io/images/aukaraokecp/fig_howto_02.png',
    'https://utahack.github.io/images/aukaraokecp/fig_howto_03.png',
    'https://utahack.github.io/images/aukaraokecp/fig_howto_04.png',
    'https://utahack.github.io/images/aukaraokecp/img_header01_mog.png',
    'https://utahack.github.io/images/aukaraokecp/img_main02.png',
    'https://utahack.github.io/images/aukaraokecp/img_main03_mog.png',
    'https://utahack.github.io/images/aukaraokecp/img_main_mog02.jpg',
    'https://utahack.github.io/images/aukaraokecp/shop_btn.png',
    'https://utahack.github.io/images/aukaraokecp/shop_title.png',
    'https://utahack.github.io/images/aukaraokecp/top_cou_evtue_01.png',
    'https://utahack.github.io/images/aukaraokecp/top_cou_info_01.png',
    'https://utahack.github.io/images/aukaraokecp/top_cou_info_02.png',
    'https://utahack.github.io/images/aukaraokecp/shop/borabora/logo_01.png',
    'https://utahack.github.io/images/aukaraokecp/shop/joysound/logo_01.png',
    'https://utahack.github.io/images/aukaraokecp/shop/karaokekan/logo_01.png',
    'https://utahack.github.io/images/aukaraokecp/shop/pasela/logo_01.png',
    'https://utahack.github.io/images/aukaraokecp/shop/shidax/logo_01.png',
    'https://utahack.github.io/images/aukaraokecp/shop/utahiro/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/borabora/btn_01.png',
    'https://utahack.github.io/images/autuesday/shop/borabora/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/joysound/btn_01.png',
    'https://utahack.github.io/images/autuesday/shop/joysound/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/karaokekan/btn_01.png',
    'https://utahack.github.io/images/autuesday/shop/karaokekan/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/pasela/btn_01.png',
    'https://utahack.github.io/images/autuesday/shop/pasela/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/shidax/btn_01.png',
    'https://utahack.github.io/images/autuesday/shop/shidax/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/utahiro/btn_01.png',
    'https://utahack.github.io/images/autuesday/shop/utahiro/logo_01.png',
    'https://utahack.github.io/images/autuesday/shop/utahiro/coupon/a_utahiro_20190430_detail.png',
    'https://utahack.github.io/images/autuesday/shop/utahiro/coupon/b_utahiro_20190430_detail.png',
    'https://utahack.github.io/js/aukaraokecp/common.js',
    'https://utahack.github.io/js/aukaraokecp/jquery.layerBoard.js',
    'https://utahack.github.io/js/aukaraokecp/jquery.switchHat.js',
    'https://utahack.github.io/js/aukaraokecp/scroll.js',
    'https://utahack.github.io/js/aukaraokecp/stamping.js',
    'https://utahack.github.io/images/icon/app.svg',
    'https://utahack.github.io/images/icon/back.svg',
    'https://utahack.github.io/images/icon/menu.svg',
    'https://utahack.github.io/images/icon/mypage.svg',
    'https://utahack.github.io/images/icon/privilege.svg',
    'https://utahack.github.io/images/icon/search.svg',
    'https://utahack.github.io/images/icon/secure.svg',
    'https://utahack.github.io/images/icon/top.svg',
    'https://utahack.github.io/wrapper.css',
    'https://utahack.github.io/wrapper/index.html',
    'https://utahack.github.io/aukaraokecp2/index.html',
    'https://utahack.github.io/aukaraokecp2/coupon/utahiro/index.html',
    'https://utahack.github.io/wrapper2.css',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
