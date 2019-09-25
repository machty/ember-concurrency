node-line-stream
================

simple line parsing string emitting stream. tired of implementing line delimited streams ;)

example
-------

```js
var linestream = require('linstream');
var s = linestream();

s.on('data',function(line){
  console.log('line of data ',line);
})

fs.createReadStream(somefile).pipe(s);

```
