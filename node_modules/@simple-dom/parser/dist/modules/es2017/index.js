class HTMLParser {
    constructor(tokenize, document, voidMap) {
        this.tokenize = tokenize;
        this.document = document;
        this.voidMap = voidMap;
        this.tokenize = tokenize;
        this.document = document;
        this.voidMap = voidMap;
        this.parentStack = [];
    }
    isVoid(element) {
        return this.voidMap[element.nodeName] === true;
    }
    pushElement(token) {
        const el = this.document.createElement(token.tagName);
        const attributes = token.attributes;
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            el.setAttribute(attr[0], attr[1]);
        }
        if (this.isVoid(el)) {
            return this.appendChild(el);
        }
        this.parentStack.push(el);
    }
    popElement(token) {
        const el = this.parentStack.pop();
        if (el.nodeName !== token.tagName.toUpperCase()) {
            throw new Error('unbalanced tag');
        }
        this.appendChild(el);
    }
    appendText(token) {
        this.appendChild(this.document.createTextNode(token.chars));
    }
    appendComment(token) {
        this.appendChild(this.document.createComment(token.chars));
    }
    appendChild(node) {
        const parentNode = this.parentStack[this.parentStack.length - 1];
        parentNode.appendChild(node);
    }
    parse(html) {
        const fragment = this.document.createDocumentFragment();
        this.parentStack.push(fragment);
        const tokens = this.tokenize(html);
        for (let i = 0, l = tokens.length; i < l; i++) {
            const token = tokens[i];
            switch (token.type) {
                case 'StartTag':
                    this.pushElement(token);
                    break;
                case 'EndTag':
                    this.popElement(token);
                    break;
                case 'Chars':
                    this.appendText(token);
                    break;
                case 'Comment':
                    this.appendComment(token);
                    break;
            }
        }
        this.parentStack.pop();
        return fragment;
    }
}

export default HTMLParser;
//# sourceMappingURL=index.js.map