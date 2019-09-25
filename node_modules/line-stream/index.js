var through = require('through');

module.exports = function(opts){
  var buf = "";
  var s = through(function data(data){

    var i, start = 0,line;
    if(Buffer.isBuffer(data)) data = data.toString('utf8');
    buf += data;

    while ((i = buf.indexOf("\n",start)) >= 0) {
      line = buf.substr(0,i);
      if(line.length) this.queue(line);
      buf = buf.substr(i+1);
    }

  },function end(){
     if(buf.length) this.queue(buf);
     buf = "";
     this.queue(null);
  });
  return s;
}
