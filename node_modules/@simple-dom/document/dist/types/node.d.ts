import { AttrNamespace, ElementNamespace, InsertPosition, Namespace, NodeType, SimpleAttr, SimpleChildNodes, SimpleComment, SimpleDocument, SimpleDocumentFragment, SimpleDocumentType, SimpleElement, SimpleNode, SimpleRawHTMLSection, SimpleText } from '@simple-dom/interface';
import { ChildNodes } from './child-nodes';
export declare type SimpleElementImpl = SimpleNodeImpl<NodeType.ELEMENT_NODE, null, ElementNamespace>;
export declare type SimpleDocumentImpl = SimpleNodeImpl<NodeType.DOCUMENT_NODE, null, Namespace.HTML>;
export default class SimpleNodeImpl<T extends NodeType, V extends string | null, N extends ElementNamespace | undefined> {
    readonly ownerDocument: SimpleDocument;
    readonly nodeType: T;
    readonly nodeName: string;
    nodeValue: V;
    readonly namespaceURI: N;
    parentNode: SimpleNode | null;
    previousSibling: SimpleNode | null;
    nextSibling: SimpleNode | null;
    firstChild: SimpleNode | null;
    lastChild: SimpleNode | null;
    attributes: SimpleAttr[];
    /**
     * @internal
     */
    _childNodes: ChildNodes | undefined;
    constructor(ownerDocument: SimpleDocument, nodeType: T, nodeName: string, nodeValue: V, namespaceURI: N);
    readonly tagName: string;
    readonly childNodes: SimpleChildNodes;
    cloneNode(this: SimpleNode, deep?: boolean): SimpleNode;
    appendChild<Node extends SimpleNode>(this: SimpleNode, newChild: Node): Node;
    insertBefore<Node extends SimpleNode>(this: SimpleNode, newChild: Node, refChild: SimpleNode | null): Node;
    removeChild<Node extends SimpleNode>(this: SimpleNode, oldChild: Node): Node;
    insertAdjacentHTML(this: SimpleElementImpl, position: InsertPosition, html: string): void;
    getAttribute(this: SimpleElementImpl, name: string): string | null;
    getAttributeNS(this: SimpleElementImpl, namespaceURI: AttrNamespace | null, localName: string): string | null;
    setAttribute(this: SimpleElementImpl, name: string, value: string): void;
    setAttributeNS(this: SimpleElementImpl, namespaceURI: AttrNamespace | null, qualifiedName: string, value: string): void;
    removeAttribute(this: SimpleElementImpl, name: string): void;
    removeAttributeNS(this: SimpleElementImpl, namespaceURI: AttrNamespace | null, localName: string): void;
    readonly doctype: SimpleDocumentType;
    readonly documentElement: SimpleElement;
    readonly head: SimpleElement;
    readonly body: SimpleElement;
    createElement(this: SimpleDocumentImpl, name: string): SimpleElement;
    createElementNS(this: SimpleDocumentImpl, namespace: ElementNamespace, qualifiedName: string): SimpleElement;
    createTextNode(this: SimpleDocumentImpl, text: string): SimpleText;
    createComment(this: SimpleDocumentImpl, text: string): SimpleComment;
    /**
     * Backwards compat
     * @deprecated
     */
    createRawHTMLSection(this: SimpleDocumentImpl, text: string): SimpleRawHTMLSection;
    createDocumentFragment(this: SimpleDocumentImpl): SimpleDocumentFragment;
}
