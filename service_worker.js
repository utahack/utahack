// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
const CACHE_NAME = 'aukara-cache-v1';
const urlsToCache = ['/index.html',
    '/manifest.json',
    '/service_worker.js',
    '/aukaraokecp/index.html',
    '/aukaraokecp/coupon/utahiro/index.html',
    '/css/wrapper.css',
    '/css/aukaraokecp/colorbox.css',
    '/css/aukaraokecp/default.css',
    '/css/aukaraokecp/mogimae.css',
    '/css/aukaraokecp/print.css',
    '/css/aukaraokecp/sp.css',
    '/images/aukaraokecp/apple-touch-icon-120x120.png',
    '/images/aukaraokecp/apple-touch-icon-152x152.png',
    '/images/aukaraokecp/apple-touch-icon-180x180.png',
    '/images/aukaraokecp/apple-touch-icon-76x76.png',
    '/images/aukaraokecp/apple-touch-icon.png',
    '/images/aukaraokecp/au_icon.png',
    '/images/aukaraokecp/btn_01.png',
    '/images/aukaraokecp/btn_02.png',
    '/images/aukaraokecp/btn_03a.png',
    '/images/aukaraokecp/btn_03b.png',
    '/images/aukaraokecp/btn_03c.png',
    '/images/aukaraokecp/btn_04.png',
    '/images/aukaraokecp/btn_05.png',
    '/images/aukaraokecp/btn_06.png',
    '/images/aukaraokecp/btn_07.png',
    '/images/aukaraokecp/btn_08.png',
    '/images/aukaraokecp/btn_09.png',
    '/images/aukaraokecp/btn_10.png',
    '/images/aukaraokecp/btn_11.png',
    '/images/aukaraokecp/btn_12.png',
    '/images/aukaraokecp/btn_13.png',
    '/images/aukaraokecp/btn_14.png',
    '/images/aukaraokecp/btn_15.png',
    '/images/aukaraokecp/btn_16.png',
    '/images/aukaraokecp/btn_17.png',
    '/images/aukaraokecp/btn_18.png',
    '/images/aukaraokecp/btn_19.png',
    '/images/aukaraokecp/btn_20.png',
    '/images/aukaraokecp/btn_21.png',
    '/images/aukaraokecp/btn_22.png',
    '/images/aukaraokecp/btn_23.png',
    '/images/aukaraokecp/btn_24.png',
    '/images/aukaraokecp/btn_coupon_close.png',
    '/images/aukaraokecp/btn_coupon_open.png',
    '/images/aukaraokecp/btn_coupon_space.png',
    '/images/aukaraokecp/btn_drink.png',
    '/images/aukaraokecp/controls.png',
    '/images/aukaraokecp/coupon-bottom.png',
    '/images/aukaraokecp/coupon-title.png',
    '/images/aukaraokecp/coupon-top.png',
    '/images/aukaraokecp/coupon_sumi.png',
    '/images/aukaraokecp/coupon_title.png',
    '/images/aukaraokecp/favicon.ico',
    '/images/aukaraokecp/fig_howto_01.png',
    '/images/aukaraokecp/fig_howto_02.png',
    '/images/aukaraokecp/fig_howto_03.png',
    '/images/aukaraokecp/fig_howto_04.png',
    '/images/aukaraokecp/fig_howto_04_600.png',
    '/images/aukaraokecp/ico_close.gif',
    '/images/aukaraokecp/ico_open.gif',
    '/images/aukaraokecp/img_auPAY_0210_01.gif',
    '/images/aukaraokecp/img_auPAY_0210_02.png',
    '/images/aukaraokecp/img_auPAY_2001_560x220.jpg',
    '/images/aukaraokecp/img_auPAY_2010_btn.png',
    '/images/aukaraokecp/img_header01_mog.png',
    '/images/aukaraokecp/img_main02.png',
    '/images/aukaraokecp/img_main02_600.png',
    '/images/aukaraokecp/img_main03_mog.png',
    '/images/aukaraokecp/img_main_mog02.jpg',
    '/images/aukaraokecp/img_main_mog02_600.png',
    '/images/aukaraokecp/loading_background.png',
    '/images/aukaraokecp/loading.gif',
    '/images/aukaraokecp/modal_btn_close.png',
    '/images/aukaraokecp/tueseday_bullet6.png',
    '/images/aukaraokecp/tueseday_cur.png',
    '/images/aukaraokecp/shop_btn.png',
    '/images/aukaraokecp/shop_title.png',
    '/images/aukaraokecp/top_cou_evtue_01.png',
    '/images/aukaraokecp/top_cou_info_01.png',
    '/images/aukaraokecp/top_cou_info_01_600.png',
    '/images/aukaraokecp/top_cou_info_02.png',
    '/images/aukaraokecp/shop/borabora/logo_01.png',
    '/images/aukaraokecp/shop/joysound/logo_01.png',
    '/images/aukaraokecp/shop/karaokekan/logo_01.png',
    '/images/aukaraokecp/shop/pasela/logo_01.png',
    '/images/aukaraokecp/shop/shidax/logo_01.png',
    '/images/aukaraokecp/shop/utahiro/logo_01.png',
    '/images/autuesday/shop/borabora/btn_01.png',
    '/images/autuesday/shop/borabora/logo_01.png',
    '/images/autuesday/shop/joysound/btn_01.png',
    '/images/autuesday/shop/joysound/logo_01.png',
    '/images/autuesday/shop/karaokekan/btn_01.png',
    '/images/autuesday/shop/karaokekan/logo_01.png',
    '/images/autuesday/shop/pasela/btn_01.png',
    '/images/autuesday/shop/pasela/logo_01.png',
    '/images/autuesday/shop/shidax/btn_01.png',
    '/images/autuesday/shop/shidax/logo_01.png',
    '/images/autuesday/shop/utahiro/btn_01.png',
    '/images/autuesday/shop/utahiro/logo_01.png',
    '/images/autuesday/shop/utahiro/coupon/a_utahiro_20190430_detail.png',
    '/images/autuesday/shop/utahiro/coupon/a_utahiro_20200211_detail.png',
    '/images/autuesday/shop/utahiro/coupon/b_utahiro_20190430_detail.png',
    '/images/autuesday/shop/utahiro/coupon/b_utahiro_20200211_detail.png',
    '/images/icon/back_bar_button.png',
    '/images/icon/button_sidemenu.png',
    '/images/icon/button_sidemenu_close.png',
    '/images/icon/icon_menu_anshin.png',
    '/images/icon/icon_menu_anshin_on.png',
    '/images/icon/icon_menu_app.png',
    '/images/icon/icon_menu_app_on.png',
    '/images/icon/icon_menu_home.png',
    '/images/icon/icon_menu_home_on.png',
    '/images/icon/icon_menu_point.png',
    '/images/icon/icon_menu_point_on.png',
    '/images/icon/icon_menu_tokuten.png',
    '/images/icon/icon_menu_tokuten_on.png',
    '/images/icon/mypage_bar_button.png',
    '/images/icon/search_bar_button.png',
    '/js/mod.js',
    '/js/aukaraokecp/common.js',
    '/js/aukaraokecp/jquery-3.4.1.min.js',
    '/js/aukaraokecp/jquery-ui.min.js',
    '/js/aukaraokecp/jquery.colorbox.js',
    '/js/aukaraokecp/jquery.cookie.js',
    '/js/aukaraokecp/jquery.easing.js',
    '/js/aukaraokecp/jquery.layerBoard.js',
    '/js/aukaraokecp/jquery.switchHat.js',
    '/js/aukaraokecp/scroll.js',
    '/js/aukaraokecp/stamping.js'
];

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