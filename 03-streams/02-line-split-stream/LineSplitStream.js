const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback){
     let chunks = chunk.toString().split(os.EOL);
     chunks.map(item => this.push(item))
      callback()
    }
    _flush(callback){
      callback()
    }
  }

  module.exports = LineSplitStream







