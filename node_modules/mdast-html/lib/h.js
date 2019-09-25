/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:html:h
 * @fileoverview
 *   Create HTML nodes. Loosely inspired by
 *   https://github.com/Matt-Esch/virtual-dom/blob/master/
 *   virtual-hyperscript/index.js
 */

'use strict';

/*
 * Dependencies.
 */

var assign = require('object-assign');

/*
 * Constants.
 */

var LINE = '\n';
var EMPTY = '';
var SPACE = ' ';
var GT = '>';
var LT = '<';
var SLASH = '/';
var QUOTE = '"';
var EQUALS = '=';

/*
 * List of self-closing tags.
 */

var CLOSING = ['hr', 'img', 'br'];

/**
 * Compile attributes.
 *
 * @param {Object?} attributes - Map of attributes.
 * @param {function(string): string} encode - Strategy
 *   to use.
 * @param {Node} node - mdast node currently being
 *   compiled.
 * @return {string} - HTML attributes.
 */
function toAttributes(attributes, encode, node) {
    var parameters = [];
    var key;
    var value;

    for (key in attributes) {
        value = attributes[key];

        if (value !== null && value !== undefined) {
            value = encode(String(value || EMPTY), node);
            parameters.push(key + EQUALS + QUOTE + value + QUOTE);
        }
    }

    return parameters.length ? parameters.join(SPACE) : EMPTY;
}

/**
 * Compile a `node`, in `context`, into HTML.
 *
 * @example
 *   h(compiler, {
 *     'type': 'break'
 *     'attributes': {
 *       'id': 'foo'
 *     }
 *   }, 'br') // '<br id="foo">'
 *
 *   h(compiler, {
 *     'type': 'break'
 *   }, 'br', {
 *     'id': 'foo'
 *   }) // '<br id="foo">'
 *
 * @param {HTMLCompiler} context - Context compiler.
 * @param {Node} node - mdast node. Used for positions
 *   on errors.
 * @param {Object?} [defaults] - Default HTML configuration.
 * @param {Object?} [defaults.attributes] - Default Attributes.
 * @param {Object?} [defaults.content] - Default content.
 * @param {Object?} [defaults.name] - Default tag-name.
 * @param {Object?} [data] - Node configuration.
 * @param {Object?} [data.htmlAttributes] - HTML Attributes.
 * @param {Object?} [data.htmlContent] - Content of element.
 * @param {Object?} [data.htmlName] - Tag-name.
 * @param {boolean} [loose] - Whether to add an initial and
 *   a trailing newline character inside the opening and
 *   closing tags.
 * @return {string} - HTML representation of `node`, based
 *   on the given options.
 */
function h(context, node, defaults, data, loose) {
    var name;
    var value;
    var parameters;
    var content;

    if (!data) {
        data = {};
    }

    name = context.encode(data.htmlName || defaults.name);

    if (data.htmlContent && !context.options.sanitize) {
        content = data.htmlContent;
    } else {
        content = defaults.content || EMPTY;
    }

    parameters = toAttributes(
        assign({}, defaults.attributes, data.htmlAttributes
    ), context.encode, node);

    value = LT + name + (parameters ? SPACE + parameters : EMPTY);

    if (CLOSING.indexOf(name) !== -1) {
        return value + (context.options.xhtml ? SPACE + SLASH : EMPTY) + GT;
    }

    return value + GT +
        (loose ? LINE : EMPTY) +
        content +
        (loose && content ? LINE : EMPTY) +
        LT + SLASH + name + GT;
}

/*
 * Expose.
 */

module.exports = h;
