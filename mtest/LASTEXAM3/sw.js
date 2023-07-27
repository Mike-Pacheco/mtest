// imports
importScripts('js/sw-update.js');

const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    './',
    './index.html',        
    './css/styles.css',          
    './img/banner.jpg',
    './img/banner2.jpg',
    './img/client-1.png',
    './img/client-2.png',
    './img/client-3.png',
    './img/gallery-1.jpg',
    './img/gallery-2.jpg',
    './img/gallery-3.jpg',
    './img/gallery-4.jpg',
    './img/gallery-5.jpg',
    './img/gallery-6.jpg',
    './img/gallery-7.jpg',
    './img/gallery-8.jpg',
    './img/logo1.png',
    './img/photoplaylogo.png',
    './img/service-ecommerce.jpg',
    './img/service-ecommerce22.jpg',
    './img/service-editorial.jpg',
    './img/service-editorial2.jpg',
    './img/service-editorial22.jpg',
    './img/service-portraits.jpg',
    './img/service-portraits2.jpg',
    './img/service-portraits22.jpg',
    './img/service-producto.jpg',
    './img/service-producto2.jpg',
    './img/service-producto22.jpg',
    './img/service-sociales.png',
    './js/scripts.js',
    
    './js/sw-update.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css',
    
    
    './js/bootstrap.bundle.min.js',
    './css/swiper-bundle.min.css',
    './css/bootstrap.min.css',
    './css/styles.css.map',  
    './css/normalize.css'
];



self.addEventListener('install', e => {

    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));

    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});




self.addEventListener( 'fetch', e => {

    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });

    e.respondWith( respuesta );

});


