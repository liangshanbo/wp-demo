const url = require('url');
const http = require('http');

const server = http.createServer((req,res) => {
	// console.dir(req.headers);
	let pathname = url.parse(req.url).pathname;
	if(/ico/.test(pathname)){
		return;
	}
	console.dir(__filename);
	console.dir(__dirname);
	console.log(`pathname:${pathname}`);
	console.log(`current dir:${process.cwd()}`);
	console.dir(process);
	res.write('<h1>Hello Node</h1>');
	res.end();
});

server.listen(8586);

console.log('Server running at 8586');