/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:html:compilers
 * @fileoverview Compilers to transform mdast nodes to HTML.
 */

'use strict';

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');

/*
 * Constants.
 */

var FIRST_WORD = /^[^\ \t]+(?=[\ \t]|$)/;

/**
 * Helper to get/set `htmlAttributes`.
 *
 * @param {Node} node - Node to get data from.
 * @return {Object} - Attributes.
 */
function getAttributes(node) {
    var data = node.data || (node.data = {});
    return data.htmlAttributes || (data.htmlAttributes = {});
}

/**
 * Augment a code node.
 *
 * @param {Node} node - Code node.
 */
function code(node) {
    var lang = node.lang && node.lang.match(FIRST_WORD);
    var attrs;

    if (!lang) {
        return;
    }

    attrs = getAttributes(node);
    attrs.class = (attrs.class ? attrs.class + ' ' : '') + 'language-' + lang;
}

/*
 * Map of node-type handlers.
 */

var handlers = {};

handlers.code = code;

/**
 * Transform `ast`.
 *
 * @param {Node} ast - Tree.
 */
function transformer(ast) {
    visit(ast, function (node) {
        if (node.type in handlers) {
            handlers[node.type](node);
        }
    });
}

/*
 * Expose.
 */

module.exports = transformer;
