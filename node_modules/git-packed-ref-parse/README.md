# git-packed-ref-parse

parse packed-ref file streams into javascript objects.

```javascript
// after git gc in a git repo
var fs = require('fs')
  , parse = require('git-packed-ref-parse')

fs.createReadStream('.git/packed-refs')
  .pipe(parse())
  .on('data', console.log)

``` 

## API

#### parse() -> parse stream

create a parse stream. when piped to, it will set
the encoding of the source stream to `utf8`.

#### data event

the parse stream will emit data events for each
ref contained in the `packed-ref` file.

they take this form:

```javascript
{ "hash": "40 character git hash"
, "name": "ref name"
, "commit": null | "40 character git hash" }
```

`commit` will usually be `null`, except for annotated
`tag` references.

## License

MIT
