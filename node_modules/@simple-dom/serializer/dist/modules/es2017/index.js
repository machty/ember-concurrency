const ESC = {
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
class HTMLSerializer {
    constructor(voidMap) {
        this.voidMap = voidMap;
    }
    openTag(element) {
        return '<' + this.tagName(element) + this.attributes(element.attributes) + '>';
    }
    closeTag(element) {
        return '</' + this.tagName(element) + '>';
    }
    tagName(element) {
        return element.namespaceURI === "http://www.w3.org/1999/xhtml" /* HTML */ ? toLowerCase(element.nodeName) : element.nodeName;
    }
    isVoid(element) {
        return this.voidMap[element.nodeName] === true;
    }
    attributes(attributes) {
        let buffer = '';
        for (let i = 0, l = attributes.length; i < l; i++) {
            buffer += this.attr(attributes[i]);
        }
        return buffer;
    }
    escapeAttrValue(attrValue) {
        if (attrValue.indexOf('&') > -1 || attrValue.indexOf('"') > -1) {
            return attrValue.replace(/[&"]/g, matcher);
        }
        return attrValue;
    }
    attr(attr) {
        if (!attr.specified) {
            return '';
        }
        if (attr.value) {
            return ' ' + attr.name + '="' + this.escapeAttrValue(attr.value) + '"';
        }
        return ' ' + attr.name;
    }
    escapeText(textNodeValue) {
        if (textNodeValue.indexOf('>') > -1 ||
            textNodeValue.indexOf('<') > -1 ||
            textNodeValue.indexOf('&') > -1) {
            return textNodeValue.replace(/[&<>]/g, matcher);
        }
        return textNodeValue;
    }
    text(text) {
        return this.escapeText(text.nodeValue);
    }
    rawHTMLSection(text) {
        return text.nodeValue;
    }
    comment(comment) {
        return '<!--' + comment.nodeValue + '-->';
    }
    serializeChildren(node) {
        let buffer = '';
        let next = node.firstChild;
        while (next !== null) {
            buffer += this.serialize(next);
            next = next.nextSibling;
        }
        return buffer;
    }
    serialize(node) {
        let buffer = '';
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
    }
}

export default HTMLSerializer;
//# sourceMappingURL=index.js.map