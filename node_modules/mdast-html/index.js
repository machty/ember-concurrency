/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:html
 * @fileoverview Compile Markdown to HTML with mdast.
 */

'use strict';

/*
 * Dependencies.
 */

var compilers = require('./lib/compilers');
var transformer = require('./lib/transformer');

/**
 * Attach an HTML compiler.
 *
 * @param {MDAST} mdast - Instance.
 * @param {Object?} [options] - Configuration.
 */
function plugin(mdast, options) {
    var MarkdownCompiler = mdast.Compiler;
    var ancestor = MarkdownCompiler.prototype;
    var proto;
    var key;

    /**
     * Extensible prototype.
     */
    function HTMLCompilerPrototype() {}

    HTMLCompilerPrototype.prototype = ancestor;

    proto = new HTMLCompilerPrototype();

    proto.options.xhtml = false;
    proto.options.sanitize = false;
    proto.options.entities = 'true';

    /**
     * Extensible constructor.
     */
    function HTMLCompiler(file) {
        if (file.extension) {
            file.move({
                'extension': 'html'
            });
        }

        MarkdownCompiler.apply(this, [file, options]);
    }

    HTMLCompiler.prototype = proto;

    /*
     * Expose compilers.
     */

    for (key in compilers) {
        proto[key] = compilers[key];
    }

    mdast.Compiler = HTMLCompiler;

    return transformer;
}

/*
 * Expose `plugin`.
 */

module.exports = plugin;
