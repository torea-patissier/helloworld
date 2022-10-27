console.log('I am a service worker');

self.addEventListener('install', ()=>{
    console.log('The worker is installed');
})

self.addEventListener('activate',()=>{
    console.log('The worker is activated');
})