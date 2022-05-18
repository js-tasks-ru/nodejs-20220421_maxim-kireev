const url = require("url");
const http = require("http");
const path = require("path");
const fs = require("fs");
const LimitSizeStream = require("./LimitSizeStream");
const limitedSizeStream = new LimitSizeStream({
	limit: 1024,
	encoding: "utf-8",
})


const server = new http.Server();

server.on("request", (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname.slice(1);

	const filepath = path.join(__dirname, "files", pathname);
	
	const handleError = (error) => {
		switch(error.code){
			case 'EEXIST':
				res.statusCode = 409;
				res.end('файл уже есть на диске');
				break;
			case 'LIMIT_EXCEEDED':
				res.statusCode = 413;
				res.end('Превышен максимальный размер загружаемого файла');	
				break;
			default:
				res.statusCode = 500;
				res.end('Неизвестная ошибка сервера');	
		}
	}

	switch (req.method) {
		
		case "POST":
			if (pathname.split("/").length > 1) {
				res.statusCode = 400;
				res.end(`Вложенные папки не поддерживаются, ${res.statusCode}`);
				return;
			}
			if (pathname.length === 0) {
				res.statusCode = 200;
				res.end();
				return;
			}
			
			const writeStream = fs.createWriteStream(filepath, {flags: 'wx'});

			limitedSizeStream.pipe(writeStream)
			limitedSizeStream.write(pathname);
			writeStream.on('error', err => handleError(err))
			writeStream.on('finish', () => {
				res.statusCode = 200;
				res.end('Всё хоршо, файл записан')
			})
			writeStream.end()
						
				
					
					
					req.on("close", () => {
					fs.unlink(filepath);
					res.end('request aborted')
			});

			break;
		default:
			res.statusCode = 501;
			res.end("Not implemented");
	}

});

module.exports = server;
