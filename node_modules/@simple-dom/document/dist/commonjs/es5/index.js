'use strict';

var EMPTY_ATTRS = [];
function indexOfAttribute(attributes, namespaceURI, localName) {
    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        if (attr.namespaceURI === namespaceURI && attr.localName === localName) {
            return i;
        }
    }
    return -1;
}
function adjustAttrName(namespaceURI, localName) {
    return namespaceURI === "http://www.w3.org/1999/xhtml" /* HTML */ ? localName.toLowerCase() : localName;
}
function getAttribute(attributes, namespaceURI, localName) {
    var index = indexOfAttribute(attributes, namespaceURI, localName);
    return index === -1 ? null : attributes[index].value;
}
function removeAttribute(attributes, namespaceURI, localName) {
    var index = indexOfAttribute(attributes, namespaceURI, localName);
    if (index !== -1) {
        attributes.splice(index, 1);
    }
}
// https://dom.spec.whatwg.org/#dom-element-setattributens
function setAttribute(element, namespaceURI, prefix, localName, value) {
    if (typeof value !== 'string') {
        value = '' + value;
    }
    var attributes = element.attributes;
    if (attributes === EMPTY_ATTRS) {
        attributes = element.attributes = [];
    }
    else {
        var index = indexOfAttribute(attributes, namespaceURI, localName);
        if (index !== -1) {
            attributes[index].value = value;
            return;
        }
    }
    attributes.push({
        localName: localName,
        name: prefix === null ? localName : prefix + ':' + localName,
        namespaceURI: namespaceURI,
        prefix: prefix,
        specified: true,
        value: value,
    });
}

var ChildNodes = function ChildNodes(node) {
    this.node = node;
    this.stale = true;
    this._length = 0;
};

var prototypeAccessors$1 = { length: { configurable: true } };
prototypeAccessors$1.length.get = function () {
        var this$1 = this;

    if (this.stale) {
        this.stale = false;
        var len = 0;
        var child = this.node.firstChild;
        for (; child !== null; len++) {
            this$1[len] = child;
            child = child.nextSibling;
        }
        var oldLen = this._length;
        this._length = len;
        for (; len < oldLen; len++) {
            delete this$1[len];
        }
    }
    return this._length;
};
ChildNodes.prototype.item = function item (index) {
    return index < this.length ? this[index] : null;
};

Object.defineProperties( ChildNodes.prototype, prototypeAccessors$1 );

function cloneNode(node, deep) {
    var clone = nodeFrom(node);
    if (deep) {
        var child = node.firstChild;
        var nextChild = child;
        while (child !== null) {
            nextChild = child.nextSibling;
            clone.appendChild(child.cloneNode(true));
            child = nextChild;
        }
    }
    return clone;
}
function nodeFrom(node) {
    var namespaceURI;
    if (node.nodeType === 1 /* ELEMENT_NODE */) {
        namespaceURI = node.namespaceURI;
    }
    var clone = new SimpleNodeImpl(node.ownerDocument, node.nodeType, node.nodeName, node.nodeValue, namespaceURI);
    if (node.nodeType === 1 /* ELEMENT_NODE */) {
        clone.attributes = copyAttrs(node.attributes);
    }
    return clone;
}
function copyAttrs(attrs) {
    if (attrs === EMPTY_ATTRS) {
        return EMPTY_ATTRS;
    }
    var copy = [];
    for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        copy.push({
            localName: attr.localName,
            name: attr.name,
            namespaceURI: attr.namespaceURI,
            prefix: attr.prefix,
            specified: true,
            value: attr.value,
        });
    }
    return copy;
}

function insertBefore(parentNode, newChild, refChild) {
    invalidate(parentNode);
    insertBetween(parentNode, newChild, refChild === null ? parentNode.lastChild : refChild.previousSibling, refChild);
}
function removeChild(parentNode, oldChild) {
    invalidate(parentNode);
    removeBetween(parentNode, oldChild, oldChild.previousSibling, oldChild.nextSibling);
}
function invalidate(parentNode) {
    var childNodes = parentNode._childNodes;
    if (childNodes !== undefined) {
        childNodes.stale = true;
    }
}
function insertBetween(parentNode, newChild, previousSibling, nextSibling) {
    if (newChild.nodeType === 11 /* DOCUMENT_FRAGMENT_NODE */) {
        insertFragment(newChild, parentNode, previousSibling, nextSibling);
        return;
    }
    if (newChild.parentNode !== null) {
        removeChild(newChild.parentNode, newChild);
    }
    newChild.parentNode = parentNode;
    newChild.previousSibling = previousSibling;
    newChild.nextSibling = nextSibling;
    if (previousSibling === null) {
        parentNode.firstChild = newChild;
    }
    else {
        previousSibling.nextSibling = newChild;
    }
    if (nextSibling === null) {
        parentNode.lastChild = newChild;
    }
    else {
        nextSibling.previousSibling = newChild;
    }
}
function removeBetween(parentNode, oldChild, previousSibling, nextSibling) {
    oldChild.parentNode = null;
    oldChild.previousSibling = null;
    oldChild.nextSibling = null;
    if (previousSibling === null) {
        parentNode.firstChild = nextSibling;
    }
    else {
        previousSibling.nextSibling = nextSibling;
    }
    if (nextSibling === null) {
        parentNode.lastChild = previousSibling;
    }
    else {
        nextSibling.previousSibling = previousSibling;
    }
}
function insertFragment(fragment, parentNode, previousSibling, nextSibling) {
    var firstChild = fragment.firstChild;
    if (firstChild === null) {
        return;
    }
    fragment.firstChild = null;
    fragment.lastChild = null;
    var lastChild = firstChild;
    var newChild = firstChild;
    firstChild.previousSibling = previousSibling;
    if (previousSibling === null) {
        parentNode.firstChild = firstChild;
    }
    else {
        previousSibling.nextSibling = firstChild;
    }
    while (newChild !== null) {
        newChild.parentNode = parentNode;
        lastChild = newChild;
        newChild = newChild.nextSibling;
    }
    lastChild.nextSibling = nextSibling;
    if (nextSibling === null) {
        parentNode.lastChild = lastChild;
    }
    else {
        nextSibling.previousSibling = lastChild;
    }
}

function parseQualifiedName(qualifiedName) {
    var localName = qualifiedName;
    var prefix = null;
    var i = qualifiedName.indexOf(':');
    if (i !== -1) {
        prefix = qualifiedName.slice(0, i);
        localName = qualifiedName.slice(i + 1);
    }
    return [prefix, localName];
}

var SimpleNodeImpl = function SimpleNodeImpl(ownerDocument, nodeType, nodeName, nodeValue, namespaceURI) {
    this.ownerDocument = ownerDocument;
    this.nodeType = nodeType;
    this.nodeName = nodeName;
    this.nodeValue = nodeValue;
    this.namespaceURI = namespaceURI;
    this.parentNode = null;
    this.previousSibling = null;
    this.nextSibling = null;
    this.firstChild = null;
    this.lastChild = null;
    this.attributes = EMPTY_ATTRS;
    /**
     * @internal
     */
    this._childNodes = undefined;
};

var prototypeAccessors = { tagName: { configurable: true },childNodes: { configurable: true },doctype: { configurable: true },documentElement: { configurable: true },head: { configurable: true },body: { configurable: true } };
prototypeAccessors.tagName.get = function () {
    return this.nodeName;
};
prototypeAccessors.childNodes.get = function () {
    var children = this._childNodes;
    if (children === undefined) {
        children = this._childNodes = new ChildNodes(this);
    }
    return children;
};
SimpleNodeImpl.prototype.cloneNode = function cloneNode$1 (deep) {
    return cloneNode(this, deep === true);
};
SimpleNodeImpl.prototype.appendChild = function appendChild (newChild) {
    insertBefore(this, newChild, null);
    return newChild;
};
SimpleNodeImpl.prototype.insertBefore = function insertBefore$1 (newChild, refChild) {
    insertBefore(this, newChild, refChild);
    return newChild;
};
SimpleNodeImpl.prototype.removeChild = function removeChild$1 (oldChild) {
    removeChild(this, oldChild);
    return oldChild;
};
SimpleNodeImpl.prototype.insertAdjacentHTML = function insertAdjacentHTML (position, html) {
    var raw = new SimpleNodeImpl(this.ownerDocument, -1 /* RAW_NODE */, '#raw', html, void 0);
    var parentNode;
    var nextSibling;
    switch (position) {
        case 'beforebegin':
            parentNode = this.parentNode;
            nextSibling = this;
            break;
        case 'afterbegin':
            parentNode = this;
            nextSibling = this.firstChild;
            break;
        case 'beforeend':
            parentNode = this;
            nextSibling = null;
            break;
        case 'afterend':
            parentNode = this.parentNode;
            nextSibling = this.nextSibling;
            break;
        default: throw new Error('invalid position');
    }
    if (parentNode === null) {
        throw new Error((position + " requires a parentNode"));
    }
    insertBefore(parentNode, raw, nextSibling);
};
SimpleNodeImpl.prototype.getAttribute = function getAttribute$1 (name) {
    var localName = adjustAttrName(this.namespaceURI, name);
    return getAttribute(this.attributes, null, localName);
};
SimpleNodeImpl.prototype.getAttributeNS = function getAttributeNS (namespaceURI, localName) {
    return getAttribute(this.attributes, namespaceURI, localName);
};
SimpleNodeImpl.prototype.setAttribute = function setAttribute$1 (name, value) {
    var localName = adjustAttrName(this.namespaceURI, name);
    setAttribute(this, null, null, localName, value);
};
SimpleNodeImpl.prototype.setAttributeNS = function setAttributeNS (namespaceURI, qualifiedName, value) {
    var ref = parseQualifiedName(qualifiedName);
        var prefix = ref[0];
        var localName = ref[1];
    setAttribute(this, namespaceURI, prefix, localName, value);
};
SimpleNodeImpl.prototype.removeAttribute = function removeAttribute$1 (name) {
    var localName = adjustAttrName(this.namespaceURI, name);
    removeAttribute(this.attributes, null, localName);
};
SimpleNodeImpl.prototype.removeAttributeNS = function removeAttributeNS (namespaceURI, localName) {
    removeAttribute(this.attributes, namespaceURI, localName);
};
prototypeAccessors.doctype.get = function () {
    return this.firstChild;
};
prototypeAccessors.documentElement.get = function () {
    return this.lastChild;
};
prototypeAccessors.head.get = function () {
    return this.documentElement.firstChild;
};
prototypeAccessors.body.get = function () {
    return this.documentElement.lastChild;
};
SimpleNodeImpl.prototype.createElement = function createElement (name) {
    return new SimpleNodeImpl(this, 1 /* ELEMENT_NODE */, name.toUpperCase(), null, "http://www.w3.org/1999/xhtml" /* HTML */);
};
SimpleNodeImpl.prototype.createElementNS = function createElementNS (namespace, qualifiedName) {
    // Node name is case-preserving in XML contexts, but returns canonical uppercase form in HTML contexts
    // https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-104682815
    var nodeName = namespace === "http://www.w3.org/1999/xhtml" /* HTML */ ? qualifiedName.toUpperCase() : qualifiedName;
    // we don't care to parse the qualified name because we only support HTML documents
    // which don't support prefixed elements
    return new SimpleNodeImpl(this, 1 /* ELEMENT_NODE */, nodeName, null, namespace);
};
SimpleNodeImpl.prototype.createTextNode = function createTextNode (text) {
    return new SimpleNodeImpl(this, 3 /* TEXT_NODE */, '#text', text, void 0);
};
SimpleNodeImpl.prototype.createComment = function createComment (text) {
    return new SimpleNodeImpl(this, 8 /* COMMENT_NODE */, '#comment', text, void 0);
};
/**
 * Backwards compat
 * @deprecated
 */
SimpleNodeImpl.prototype.createRawHTMLSection = function createRawHTMLSection (text) {
    return new SimpleNodeImpl(this, -1 /* RAW_NODE */, '#raw', text, void 0);
};
SimpleNodeImpl.prototype.createDocumentFragment = function createDocumentFragment () {
    return new SimpleNodeImpl(this, 11 /* DOCUMENT_FRAGMENT_NODE */, '#document-fragment', null, void 0);
};

Object.defineProperties( SimpleNodeImpl.prototype, prototypeAccessors );

function createHTMLDocument() {
    // dom.d.ts types ownerDocument as Document but for a document ownerDocument is null
    var document = new SimpleNodeImpl(null, 9 /* DOCUMENT_NODE */, '#document', null, "http://www.w3.org/1999/xhtml" /* HTML */);
    var doctype = new SimpleNodeImpl(document, 10 /* DOCUMENT_TYPE_NODE */, 'html', null, "http://www.w3.org/1999/xhtml" /* HTML */);
    var html = new SimpleNodeImpl(document, 1 /* ELEMENT_NODE */, 'HTML', null, "http://www.w3.org/1999/xhtml" /* HTML */);
    var head = new SimpleNodeImpl(document, 1 /* ELEMENT_NODE */, 'HEAD', null, "http://www.w3.org/1999/xhtml" /* HTML */);
    var body = new SimpleNodeImpl(document, 1 /* ELEMENT_NODE */, 'BODY', null, "http://www.w3.org/1999/xhtml" /* HTML */);
    html.appendChild(head);
    html.appendChild(body);
    document.appendChild(doctype);
    document.appendChild(html);
    return document;
}

module.exports = createHTMLDocument;
//# sourceMappingURL=index.js.map