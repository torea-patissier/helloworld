console.log('I am a service worker');

self.addEventListener('install', async () => { // Feed the cache
    console.log('The worker is installed');
    const cache = await caches.open('hello-cache')
    await cache.addAll(['index.html', '/', 'assets/cacahuete.jpeg', 'offline.html'])
    console.log('The data is cached')
})

self.addEventListener('activate', () => {
    console.log('The worker is activated');
})

self.addEventListener('fetch', (event: FetchEvent) => { // Use the cache if no connexion

    const promise = async () => {
        const cache = await caches.open('hello-cache')
        const cachedResponse = await cache.match(event.request)
        if (cachedResponse) {
            return cachedResponse
        }

        try {
            const networkResponse = await fetch(event.request)  // if network
            return networkResponse
        } catch (e) {
            return (await cache.match('offline.html'))! // return offline if no network
        }

        /**
         * Use the data in the cache
         * or the data from the network if network
         */
    }
    event.respondWith(promise())
})