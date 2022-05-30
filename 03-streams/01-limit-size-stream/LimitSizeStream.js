const stream = require("stream");
const LimitExceededError = require("./LimitExceededError");

class LimitSizeStream extends stream.Transform {
	constructor(options) {
		super(options);
		this.limit = options.limit;
		this.size = 0;
	}

	_transform(chunk, encoding, callback) {
		const chunkSize = Buffer.byteLength(chunk)
		this.size += chunkSize;
		if (this.size > this.limit) {
			callback(new LimitExceededError())
		  } else {
			callback(null, chunk);
		  }
}
}

module.exports = LimitSizeStream;
