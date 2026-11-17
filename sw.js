const CACHE='bible-pwa-v9';
const ASSETS=['./','index.html','riverbackground.png','style.css','core.js','app.js','manifest.webmanifest','icons/icon-192.png?v=2','icons/icon-512.png?v=2','data/zh.json','data/en.json','data/ja.json','data/schedule.json','data/goldverse.json'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('bible-pwa-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 const isShell=request.mode==='navigate'||/\/(?:index\.html|app\.js|core\.js|style\.css|manifest\.webmanifest)$/.test(url.pathname);
 if(isShell){event.respondWith(fetch(request).then(response=>{if(!response.ok)throw new Error('Network response failed');return response}).catch(async()=>await caches.match(request)||(request.mode==='navigate'?await caches.match('./'):undefined)));return}
 event.respondWith(caches.match(request).then(hit=>hit||fetch(request)));
});
