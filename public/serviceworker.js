"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('I am a service worker');
self.addEventListener('install', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('The worker is installed');
    const cache = yield caches.open('hello-cache');
    yield cache.addAll(['index.html', '/', 'assets/cacahuete.jpeg']);
    console.log('The data is cached');
}));
self.addEventListener('activate', () => {
    console.log('The worker is activated');
});
self.addEventListener('fetch', (event) => {
    const promise = () => __awaiter(void 0, void 0, void 0, function* () {
        const cache = yield caches.open('hello-cache');
        const cachedResponse = yield cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        const networkResponse = yield fetch(event.request);
        return networkResponse;
        /**
         * Use the data in the cache
         * or the data from the network if network
         */
    });
    event.respondWith(promise());
});
