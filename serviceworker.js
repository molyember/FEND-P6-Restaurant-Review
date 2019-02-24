// console.log("service worker registered");

let urlsToCache = [
  "/index.html",
  "/js/restaurant_info.js",
  "/js/main.js",
  "/js/dbhelper.js",
  "/js/restaurant_info.js",
  "/js/main.js",
  "/css/styles.css",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg",
];
let restaurantCache = "restaurantCachev1";


self.addEventListener("install", function (event) {
  event.waitUntil( caches.open(restaurantCache).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(received) {
      if (received) {
        console.log("exists: ", event.request);
      } else {
        console.log("does not exist ", event.request, " ..FETCH");
        return fetch(event.request)
        .then(function(received) {
          caches.open(restaurantCache).then(function(cache){
            cache.put(event.request, received);

          })
          return received;
        })
        .catch function(error) {
          console.log("error: ", error);
        }
      }
    })
  );
});
