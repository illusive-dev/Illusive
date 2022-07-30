const Bare = require('@tomphttp/bare-server-node');
const Http = require('http');

const fetch = (...args) => new Promise(r=>import('node-fetch').then(e=>r(e.default(...args))));

const bareServer = Bare('/bare/', {
	logErrors: false,
	localAddress: undefined,
	maintainer: {
		email: 'tomphttp@sys32.dev',
		website: 'https://github.com/tomphttp/',
	},
});

const Server = Http.createServer();

Server.on('request', async (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
	    var n = [];
	    req.on('data', (data)=>n.push(data)).on('end', async () => {
	      var init = {headers: req.headers, method: req.method}
	      if (['GET', 'HEAD'].indexOf(req.method.toUpperCase())==-1) init.body = Buffer.concat(n);
	      req.url = req.url.replace('://',':/').replace(':/','://')
	      var request = await fetch('http://localhost:3000'+req.url, init)
	      var blob = new Buffer.from(await req.text());
	    
	      return res.writeHead(request.status, request.headers).end(blob);
	    })
    }
	}
});

Server.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

Server.listen(8080);