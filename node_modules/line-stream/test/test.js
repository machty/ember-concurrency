var test = require('tap').test;
var lstream = require('../index.js');

test("can parse lines",function(t){
   
  var str = "a\nb\n\nc\ndef\ng";  
  var s = lstream();
  var out = "";

  s.on('data',function(str){
    out += str;
  });

  s.write(str);
  s.end();

  t.equals(out,'abcdefg');
  t.end();

});
