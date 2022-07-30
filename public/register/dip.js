if ('serviceWorker' in navigator) {
navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  (registration.unregister()).then(e=>navigator.serviceWorker.register('/sw.js', {scope: '/service'})).then(e=>location.reload())
} })

  console.log('register dip')
}