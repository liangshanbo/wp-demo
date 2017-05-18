const dns = require('dns');

// console.log(dns);

dns.lookup('baidu.com', (err, address, family) => {
	console.log(`address:${address},family:${family}`);
});

dns.resolve4('baidu.com', (err, addresses) => {
	console.log(addresses);
	if (Array.isArray(addresses) && addresses.length > 0) {
		addresses.forEach((item, index) => {
			console.log(`key:${index},ip:${item}`);
		});
	}
});

dns.getServers('baidu.com', (err, addresses) => {
	console.log(addresses);
});

dns.lookupService('123.125.114.144', 80, (err, hostname, service) => {
	console.log(err);
	console.log(`hostName:${hostname},service:${service}`);
});