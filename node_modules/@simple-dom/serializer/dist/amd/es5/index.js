define('@simple-dom/serializer', function () { 'use strict';

var ESC = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
};
function matcher(char) {
    return ESC[char];
}
function toLowerCase(name) {
    return name === 'DIV' ? 'div' : name === 'SPAN' ? 'span' : name.toLowerCase();
}
var HTMLSerializer = function HTMLSerializer(voidMap) {
    this.voidMap = voidMap;
};
HTMLSerializer.prototype.openTag = function openTag (element) {
    return '<' + this.tagName(element) + this.attributes(element.attributes) + '>';
};
HTMLSerializer.prototype.closeTag = function closeTag (element) {
    return '</' + this.tagName(element) + '>';
};
HTMLSerializer.prototype.tagName = function tagName (element) {
    return element.namespaceURI === "http://www.w3.org/1999/xhtml" /* HTML */ ? toLowerCase(element.nodeName) : element.nodeName;
};
HTMLSerializer.prototype.isVoid = function isVoid (element) {
    return this.voidMap[element.nodeName] === true;
};
HTMLSerializer.prototype.attributes = function attributes (attributes$1) {
        var this$1 = this;

    var buffer = '';
    for (var i = 0, l = attributes$1.length; i < l; i++) {
        buffer += this$1.attr(attributes$1[i]);
    }
    return buffer;
};
HTMLSerializer.prototype.escapeAttrValue = function escapeAttrValue (attrValue) {
    if (attrValue.indexOf('&') > -1 || attrValue.indexOf('"') > -1) {
        return attrValue.replace(/[&"]/g, matcher);
    }
    return attrValue;
};
HTMLSerializer.prototype.attr = function attr (attr$1) {
    if (!attr$1.specified) {
        return '';
    }
    if (attr$1.value) {
        return ' ' + attr$1.name + '="' + this.escapeAttrValue(attr$1.value) + '"';
    }
    return ' ' + attr$1.name;
};
HTMLSerializer.prototype.escapeText = function escapeText (textNodeValue) {
    if (textNodeValue.indexOf('>') > -1 ||
        textNodeValue.indexOf('<') > -1 ||
        textNodeValue.indexOf('&') > -1) {
        return textNodeValue.replace(/[&<>]/g, matcher);
    }
    return textNodeValue;
};
HTMLSerializer.prototype.text = function text (text$1) {
    return this.escapeText(text$1.nodeValue);
};
HTMLSerializer.prototype.rawHTMLSection = function rawHTMLSection (text) {
    return text.nodeValue;
};
HTMLSerializer.prototype.comment = function comment (comment$1) {
    return '<!--' + comment$1.nodeValue + '-->';
};
HTMLSerializer.prototype.serializeChildren = function serializeChildren (node) {
        var this$1 = this;

    var buffer = '';
    var next = node.firstChild;
    while (next !== null) {
        buffer += this$1.serialize(next);
        next = next.nextSibling;
    }
    return buffer;
};
HTMLSerializer.prototype.serialize = function serialize (node) {
    var buffer = '';
    // open
    switch (node.nodeType) {
        case 1:
            buffer += this.openTag(node);
            break;
        case 3:
            buffer += this.text(node);
            break;
        case -1:
            buffer += this.rawHTMLSection(node);
            break;
        case 8:
            buffer += this.comment(node);
            break;
        default:
            break;
    }
    buffer += this.serializeChildren(node);
    if (node.nodeType === 1 && !this.isVoid(node)) {
        buffer += this.closeTag(node);
    }
    return buffer;
};

return HTMLSerializer;

});
//# sourceMappingURL=index.js.map