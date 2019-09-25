/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:slug
 * @fileoverview Add anchors to mdast heading nodes.
 */

'use strict';

/*
 * Dependencies.
 */

var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var repeat = require('repeat-string');

var slugg = null;
var fs = {};
var path = {};
var proc = {};

try {
    slugg = require('slugg');
} catch (exception) {/* empty */}

try {
    fs = require('fs');
} catch (exception) {/* empty */}

try {
    path = require('path');
} catch (exception) {/* empty */}

/*
 * Hide process use from browserify and component.
 */

/* istanbul ignore else */
if (typeof global !== 'undefined' && global.process) {
    proc = global.process;
}

/*
 * Methods.
 */

var exists = fs.existsSync;
var resolve = path.resolve;

/*
 * Constants.
 */

var MODULES = 'node_modules';
var EXTENSION = '.js';
var NPM = 'npm';
var GITHUB = 'github';
var SLUGG = 'slugg';
var DASH = '-';

var DEFAULT_LIBRARY = GITHUB;

/**
 * Find a library.
 *
 * @param {string} pathlike - File-path-like to load.
 * @return {Object}
 */
function loadLibrary(pathlike) {
    var cwd;
    var local;
    var npm;
    var plugin;

    if (pathlike === SLUGG && slugg) {
        return slugg;
    }

    cwd = proc.cwd && proc.cwd();

    /* istanbul ignore if */
    if (!cwd) {
        throw new Error('Cannot lazy load library when not in node');
    }

    local = resolve(cwd, pathlike);
    npm = resolve(cwd, MODULES, pathlike);

    if (exists(local) || exists(local + EXTENSION)) {
        plugin = local;
    } else if (exists(npm)) {
        plugin = npm;
    } else {
        plugin = pathlike;
    }

    return require(plugin);
}

/**
 * Wraps `slugg` to generate slugs just like npm would.
 *
 * @see https://github.com/npm/marky-markdown/blob/9761c95/lib/headings.js#L17
 *
 * @param {function(string): string} library - Value to
 *   slugify.
 * @return {function(string): string}
 */
function npmFactory(library) {
    /**
     * Generate slugs just like npm would.
     *
     * @param {string} value - Value to slugify.
     * @return {string}
     */
    function npm(value) {
        return library(value).replace(/[<>]/g, '').toLowerCase();
    }

    return npm;
}

/**
 * Wraps `slugg` to generate slugs just like GitHub would.
 *
 * @param {function(string): string} library - Library to
 *   use.
 * @return {function(string): string}
 */
function githubFactory(library) {
    /**
     * Hacky.  Sometimes `slugg` uses `replacement` as an
     * argument to `String#replace()`, and sometimes as
     * a literal string.
     *
     * @param {string} $0 - Value to transform.
     * @return {string}
     */
    function separator($0) {
        var match = $0.match(/\s/g);

        if ($0 === DASH) {
            return $0;
        }

        return repeat(DASH, match ? match.length : 0);
    }

    /**
     * @see seperator
     * @return {string}
     */
    function dash() {
        return DASH;
    }

    separator.toString = dash;

    /**
     * Generate slugs just like GitHub would.
     *
     * @param {string} value - Value to slugify.
     * @return {string}
     */
    function github(value) {
        return library(value, separator).toLowerCase();
    }

    return github;
}

/**
 * Attacher.
 *
 * @return {function(node)}
 */
function attacher(mdast, options) {
    var settings = options || {};
    var library = settings.library || DEFAULT_LIBRARY;
    var isNPM = library === NPM;
    var isGitHub = library === GITHUB;

    if (isNPM || isGitHub) {
        library = SLUGG;
    }

    if (typeof library === 'string') {
        library = loadLibrary(library);
    }

    if (isNPM) {
        library = npmFactory(library);
    } else if (isGitHub) {
        library = githubFactory(library);
    }

    /**
     * Patch `value` on `context` at `key`, if
     * `context[key]` does not already exist.
     */
    function patch(context, key, value) {
        if (!context[key]) {
            context[key] = value;
        }

        return context[key];
    }

    /**
     * Adds an example section based on a valid example
     * JavaScript document to a `Usage` section.
     *
     * @param {Node} ast - Root node.
     */
    function transformer(ast) {
        visit(ast, 'heading', function (node) {
            var id = library(toString(node));
            var data = patch(node, 'data', {});

            patch(data, 'id', id);
            patch(data, 'htmlAttributes', {});
            patch(data.htmlAttributes, 'id', id);
        });
    }

    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
