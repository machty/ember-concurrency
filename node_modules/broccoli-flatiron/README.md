# Broccoli Flatiron

## Usage

Create a payload file based upon directory structure.

```javascript
var flatiron = require("broccoli-flatiron");

var options = {
    outputFile: 'path/to/output/file'
};

var tree = flatiron(targetDirectory, options);
```

## Documentation

### Available options

- `outputFile` - path of the generated file
- `trimExtensions` - trim file extensions object keys or not
- `prefix` - use custom prefix, `default: export default`
- `suffix` - use custom suffix, `default: ;`
- `persistentOutput`: boolean flag passed to [broccoli-plugin](https://github.com/broccolijs/broccoli-plugin#reference).
- `needCache`: boolean flag passed to [broccoli-plugin](https://github.com/broccolijs/broccoli-plugin#reference).

## ZOMG!!! TESTS?!?!!?

Yeah, I know.

```javascript
npm install
npm test
```

## License

This project is distributed under the MIT license.
