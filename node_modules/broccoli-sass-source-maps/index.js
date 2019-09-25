var path = require('path');
var mkdirp = require('mkdirp');
var includePathSearcher = require('include-path-searcher');
var CachingWriter = require('broccoli-caching-writer');
var assign = require('object-assign');
var rsvp = require('rsvp');
var Promise = rsvp.Promise;
var fs = require('fs');
var writeFile = rsvp.denodeify(fs.writeFile);

module.exports = function(sass) {
  SassCompiler.prototype = Object.create(CachingWriter.prototype);
  SassCompiler.prototype.constructor = SassCompiler;

  function SassCompiler (inputNodes, inputFile, outputFile, options) {
    if (!(this instanceof SassCompiler)) { return new SassCompiler(inputNodes, inputFile, outputFile, options); }
    if (!Array.isArray(inputNodes)) { throw new Error('Expected array for first argument - did you mean [tree] instead of tree?'); }

    options = options || {};

    CachingWriter.call(this, inputNodes, {
      annotation: options.annotation,
      cacheInclude: options.cacheInclude,
      cacheExclude: options.cacheExclude
    });

    this.inputFile = inputFile;
    this.outputFile = outputFile;

    this.renderSass = rsvp.denodeify(sass.render);

    this.sassOptions = {
      importer: options.importer,
      functions: options.functions,
      indentedSyntax: options.indentedSyntax,
      omitSourceMapUrl: options.omitSourceMapUrl,
      outputStyle: options.outputStyle,
      precision: options.precision,
      sourceComments: options.sourceComments,
      sourceMap: options.sourceMap,
      sourceMapEmbed: options.sourceMapEmbed,
      sourceMapContents: options.sourceMapContents,
      sourceMapRoot: options.sourceMapRoot,
      fiber: options.fiber
    };
  }

  /**
   * Mutates the error to include properties expected by Ember CLI.
   * See https://github.com/ember-cli/ember-cli/blob/master/docs/ERRORS.md#error-object
   * @param {Error} error
   */
  function rethrowBuildError(error) {
    if (typeof error === 'string') {
      throw new Error('[string exception] ' + error);
    } else {
      error.type = 'Sass Syntax Error';
      error.message = error.formatted;
      error.location = {
        line: error.line,
        column: error.column
      };

      throw error;
    }
  }

  SassCompiler.prototype.build = function() {
    var destFile = path.join(this.outputPath, this.outputFile);
    var sourceMapFile = this.sassOptions.sourceMap;

    if (typeof sourceMapFile !== 'string') {
      sourceMapFile = destFile + '.map';
    }

    mkdirp.sync(path.dirname(destFile));

    var sassOptions = {
      file: includePathSearcher.findFileSync(this.inputFile, this.inputPaths),
      includePaths: this.inputPaths,
      outFile: destFile
    };

    assign(sassOptions, this.sassOptions);

    return this.renderSass(sassOptions).then(function(result) {
      var files = [
        writeFile(destFile, result.css)
      ];

      if (this.sassOptions.sourceMap && !this.sassOptions.sourceMapEmbed) {
        files.push(writeFile(sourceMapFile, result.map));
      }

      return Promise.all(files);
    }.bind(this)).catch(rethrowBuildError);
  };

  return SassCompiler;
};
