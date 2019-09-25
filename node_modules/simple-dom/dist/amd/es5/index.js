define('simple-dom', ['exports', '@simple-dom/document', '@simple-dom/parser', '@simple-dom/serializer', '@simple-dom/void-map'], function (exports, createHTMLDocument, parser, serializer, voidMap) { 'use strict';

createHTMLDocument = createHTMLDocument && createHTMLDocument.hasOwnProperty('default') ? createHTMLDocument['default'] : createHTMLDocument;
parser = parser && parser.hasOwnProperty('default') ? parser['default'] : parser;
serializer = serializer && serializer.hasOwnProperty('default') ? serializer['default'] : serializer;
voidMap = voidMap && voidMap.hasOwnProperty('default') ? voidMap['default'] : voidMap;

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

Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=index.js.map