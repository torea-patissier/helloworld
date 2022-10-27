console.log('I am a service worker');

self.addEventListener('install', async ()=>{
    console.log('The worker is installed');
    const cache =  await caches.open('hello-cache')
    await cache.addAll(['index.html','/','assets/cacahuete.jpeg'])
    console.log('The data is cached')
})

self.addEventListener('activate',()=>{
    console.log('The worker is activated');
})