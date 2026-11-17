const V="al-tony-v20",FILES=["./","./manifest.json","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin||u.pathname.endsWith("/version.json"))return;
 e.respondWith(fetch(r).then(res=>{if(res.ok&&!res.redirected){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match("./"))))});
