importScripts('/dip/dip.worker.js');
importScripts('/uv/uv.sw.js');
importScripts('/encoding.js');

var DIP = new DIPServiceWorker('/dip/dip.config.js');
var UV = new UVServiceWorker();

self.addEventListener('install', event => {
  self.skipWaiting();
})

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// UV.blockList(['www.google.com'], 'Page Blocked by Site Admin')

async function fetchHandler(event) {
  var request = event.request;

  if (request.mode=='navigate'&&(new URL(request.url).search!=='?safe')) {
    console.log('[SW]', 'Malware Test')
    
    if (event.request.url.startsWith(location.origin+'/service/dip/')) var req = await fetch('/api/malware?url='+dbase64.decode(request.url.split('?')[0].replace(location.origin+'/service/dip/', '')));

    if (event.request.url.startsWith(location.origin+'/service/uv/')) var req = await fetch('/api/malware?url='+dbase64.decode(request.url.split('?')[0].replace(location.origin+'/service/uv/', '')));

    console.log('[SW]', "Malware Test (Google): "+req.url)

    var res = (await req.json());

    if (Object.entries(res).length==0) console.log("[SW] Malware Text (Google): PASS");

    if (Object.entries(res).length!==0) return new Response('', {status: 301, headers: {location: `/unsafe?url=${request.url}&err=${JSON.stringify(res.matches[0])}`}}) 
  }

  event.request.url = event.request.url.split('?')[0];

  request = new Request(event.request.url.split('?')[0], {...request});

  if (event.request.url.startsWith(location.origin+'/service/dip')) return await DIP.fetch({request});
  if (event.request.url.startsWith(location.origin+'/service/uv')) return await UV.fetch({request});

  return fetch(event.request);
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetchHandler(event)
  )
})