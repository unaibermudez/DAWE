importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.1/workbox-sw.js');

if (workbox) {
    // Precaching: guardamos en caché todo lo que necesitemos
    workbox.precaching.precacheAndRoute([
        { url: 'css/estilos.css', revision: null },
        { url: 'js/main.js', revision: null },
        { url: 'js/tienda.js', revision: null },
        { url: 'js/agricolas.js', revision: null },
        { url: 'js/deportes.js', revision: null },
        { url: 'js/muebles.js', revision: null },
        { url: 'js/producto.js', revision: null },
       
        { url: '/offline.html', revision: null },
    ]);

    // Estrategia por defecto: intentar descargar el recurso
    workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());
    // Estrategia por defecto ante pérdida de conexión: mostrar offline.html
    workbox.recipes.offlineFallback({pageFallback: '/offline.html'});

    // Conseguir de la cache los ficheros .css y .js
    workbox.routing.registerRoute(
        /\.(?:css|js|html)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'mi-aplicacion' 
        })
    )
}