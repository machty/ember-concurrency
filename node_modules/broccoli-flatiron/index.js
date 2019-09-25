var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    Plugin = require('broccoli-plugin');

Flatiron.prototype = Object.create(Plugin.prototype);
Flatiron.prototype.constructor = Flatiron;

function Flatiron (inputTree, options) {
  if (!(this instanceof Flatiron)) return new Flatiron(inputTree, options);

  Plugin.call(this, [inputTree], {
    name: 'Flatiron',
    annotation: `Flatiron output: ${options.outputFile}`,
    persistentOutput: options.persistentOutput,
    needCache: options.needCache
  });

  this.options = {
    trimExtensions: Boolean(options.trimExtensions),
    prefix: options.prefix === undefined ? 'export default ' : String(options.prefix),
    suffix: options.suffix === undefined ? ';' : String(options.suffix),
    outputFile: options.outputFile
  };
}

Flatiron.prototype.build = function () {
    var obj = readDirectory(this.inputPaths[0], this.options),
        output;

    function readDirectory (srcDir, options) {
      var obj = {},
          entries = fs.readdirSync(srcDir);

      Array.prototype.forEach.call(entries, function(entry) {
        if (fs.statSync(path.join(srcDir, entry)).isDirectory())
          obj[entry] = readDirectory(path.join(srcDir, entry), options);
        else
          obj[options.trimExtensions ? entry.split('.')[0] : entry] =
            fs.readFileSync(path.join(srcDir, entry), { encoding: 'utf8' });
      });

      return obj;
    }

    output = this.options.prefix + JSON.stringify(obj, null, 2) + this.options.suffix;
    mkdirp.sync(path.join(this.outputPath, path.dirname(this.options.outputFile)));
    fs.writeFileSync(path.join(this.outputPath, this.options.outputFile), output);
}

module.exports = Flatiron;
