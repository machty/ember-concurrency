'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var createHTMLDocument = _interopDefault(require('@simple-dom/document'));
var parser = _interopDefault(require('@simple-dom/parser'));
var serializer = _interopDefault(require('@simple-dom/serializer'));
var voidMap = _interopDefault(require('@simple-dom/void-map'));

// tslint:disable:no-shadowed-variable
// tslint:disable:variable-name
var Document = function Document() {
    // for backwards compatibility
    return createHTMLDocument();
};

exports.Document = Document;
exports.createDocument = createHTMLDocument;
exports.HTMLParser = parser;
exports.HTMLSerializer = serializer;
exports.voidMap = voidMap;
//# sourceMappingURL=index.js.map