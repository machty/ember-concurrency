var docs = require('./globals-docs.json');

/**
 * Docs: an object of documentation as a plain-old-javascript object.
 *
 * Has keys that correspond to environments:
 *
 * - builtin
 * - nonstandard
 * - browser
 * - worker
 * - node
 */
module.exports.docs = docs;

function buildLowerCased() {
    var lowercased = {};
    for (var k in docs) {
        lowercased[k] = {};
        for (var name in docs[k]) {
            lowercased[k][name.toLowerCase()] = docs[k][name];
        }
    }
    return lowercased;
}

var lowerCased = buildLowerCased();

/**
 * Lowercased docs: the same as the original docs array, but with lowercased
 * names.
 */
module.exports.lowerCased = lowerCased;

/**
 * Get a URL for a global object.
 *
 * @param {string} name name of the global object
 * @param {Array<string>} env environments that will be reached. By default tries all environments
 * @returns {string|undefined} the URL of the documentation resource, if found
 * @example
 * getDoc('Array'); // yields MDC documentation for Array
 */
module.exports.getDoc = function(name, env) {
    if (!env) env = Object.keys(lowerCased);

    for (var i = 0; i < env.length; i++) {
        var d = lowerCased[env[i]][name.toLowerCase()];
        if (d) return d;
    }
};
