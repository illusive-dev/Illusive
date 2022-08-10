if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/service'}).then(e=>location.reload())

  console.log('register osana')
}