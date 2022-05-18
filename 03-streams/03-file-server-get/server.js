const url = require("url");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = new http.Server();

server.on("request", (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname.slice(1);

	const filepath = path.join(__dirname, 'files', pathname);

	switch (req.method) {
		case "GET":
      if(url.pathname.split('/').length > 2){
        res.statusCode = 400;
        res.end();
        return;
      }
      const readStream = fs.createReadStream(filepath);
      let data = '';
      readStream.on('data', chunk => data+=chunk);
      readStream.on('end', () => res.end(data));
      readStream.on('error', (err) => {
        res.statusCode = 404;
        res.end(`${err}`)
      })
      break;

		default:
			res.statusCode = 501;
			res.end("Not implemented");
	}
});

module.exports = server;
