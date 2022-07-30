importScripts('/dip/dip.worker.js');
importScripts('/uv/uv.sw.js');
importScripts('/encoding.js');

var DIP = new DIPServiceWorker('/dip/dip.config.js');
var UV = new UVServiceWorker();

// UV.blockList(['www.google.com'], 'Page Blocked by Site Admin')

async function fetchHandler(event) {
  var request = event.request;

  if (request.mode=='navigate') {
    console.log('[SW]', 'Malware Test')
    
    if (event.request.url.startsWith(location.origin+'/service/dip/')) var req = await fetch('/api/malware?url='+dbase64.decode(request.url.replace(location.origin+'/service/dip/', '')));

    if (event.request.url.startsWith(location.origin+'/service/uv/')) var req = await fetch('/api/malware?url='+dbase64.decode(request.url.replace(location.origin+'/service/uv/', '')));

    console.log('[SW]', "Malware Test (Google): ")

    console.log(await req.json());
  }

  if (event.request.url.startsWith(location.origin+'/service/dip')) return await DIP.fetch(event);
  if (event.request.url.startsWith(location.origin+'/service/uv')) return await UV.fetch(event);

  return fetch(request);
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetchHandler(event)
  )
})