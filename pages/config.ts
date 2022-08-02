import * as enc from './encoding.ts';

const Encoding = {...enc.default}

export default {
  proxy: 'Dynamic',
  config: {
    'Ultraviolet': {
      prefix: '/service/uv/',
      bare: 'https://incog.dev/bare',
      encodeUrl: (e=>encodeURIComponent(decodeURIComponent(Encoding.base64.encode(e).replace(/\/$/g,'')))),
      decodeUrl: (e=>decodeURIComponent(Encoding.base64.decode(e).replace(/\/$/g,''))),
      handler: '/uv/uv.handler.js',
      bundle: '/uv/uv.bundle.js',
      config: '/uv/uv.config.js',
      sw: '/uv/uv.sw.js',
    },
    'Dynamic': {
      prefix: '/service/dip/',
      encoding: 'base64',
      ws: true,
      encodeUrl: (e=>(decodeURIComponent(Encoding.base64.encode(e)))),
      decodeUrl: (e=>decodeURIComponent(Encoding.base64.decode(e))),
      cookies: true,
      worker: true,
      bare: {
        version: 2,
        path: 'https://uv.holyub.xyz/',
      },
      tab: {
        title: 'Dynamic Interception Proxy',
        icon: 'https://google.com/favicon.ico',
        ua: 'Mozilla/5.0 (X11; CrOS x86_64 14388.61.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.107 Safari/537.36'
      }
    },
    'Rammerhead': {},
  }
}