'use strict';

var HTMLParser = function HTMLParser(tokenize, document, voidMap) {
    this.tokenize = tokenize;
    this.document = document;
    this.voidMap = voidMap;
    this.tokenize = tokenize;
    this.document = document;
    this.voidMap = voidMap;
    this.parentStack = [];
};
HTMLParser.prototype.isVoid = function isVoid (element) {
    return this.voidMap[element.nodeName] === true;
};
HTMLParser.prototype.pushElement = function pushElement (token) {
    var el = this.document.createElement(token.tagName);
    var attributes = token.attributes;
    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        el.setAttribute(attr[0], attr[1]);
    }
    if (this.isVoid(el)) {
        return this.appendChild(el);
    }
    this.parentStack.push(el);
};
HTMLParser.prototype.popElement = function popElement (token) {
    var el = this.parentStack.pop();
    if (el.nodeName !== token.tagName.toUpperCase()) {
        throw new Error('unbalanced tag');
    }
    this.appendChild(el);
};
HTMLParser.prototype.appendText = function appendText (token) {
    this.appendChild(this.document.createTextNode(token.chars));
};
HTMLParser.prototype.appendComment = function appendComment (token) {
    this.appendChild(this.document.createComment(token.chars));
};
HTMLParser.prototype.appendChild = function appendChild (node) {
    var parentNode = this.parentStack[this.parentStack.length - 1];
    parentNode.appendChild(node);
};
HTMLParser.prototype.parse = function parse (html) {
        var this$1 = this;

    var fragment = this.document.createDocumentFragment();
    this.parentStack.push(fragment);
    var tokens = this.tokenize(html);
    for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i];
        switch (token.type) {
            case 'StartTag':
                this$1.pushElement(token);
                break;
            case 'EndTag':
                this$1.popElement(token);
                break;
            case 'Chars':
                this$1.appendText(token);
                break;
            case 'Comment':
                this$1.appendComment(token);
                break;
        }
    }
    this.parentStack.pop();
    return fragment;
};

module.exports = HTMLParser;
//# sourceMappingURL=index.js.map