import {
  AttrNamespace,
  ElementNamespace,
  InsertPosition,
  Namespace,
  NodeType,
  SimpleAttr,
  SimpleChildNodes,
  SimpleComment,
  SimpleDocument,
  SimpleDocumentFragment,
  SimpleDocumentType,
  SimpleElement,
  SimpleNode,
  SimpleRawHTMLSection,
  SimpleText,
} from '@simple-dom/interface';
import {
  adjustAttrName,
  EMPTY_ATTRS,
  getAttribute,
  removeAttribute,
  setAttribute,
} from './attributes';
import { ChildNodes } from './child-nodes';
import { cloneNode } from './clone';
import {
  insertBefore,
  removeChild,
} from './mutation';
import {
  parseQualifiedName,
} from './qualified-name';

export type SimpleElementImpl = SimpleNodeImpl<NodeType.ELEMENT_NODE, null, ElementNamespace>;
export type SimpleDocumentImpl = SimpleNodeImpl<NodeType.DOCUMENT_NODE, null, Namespace.HTML>;

export default class SimpleNodeImpl<
  T extends NodeType,
  V extends string | null,
  N extends ElementNamespace | undefined
> {
  public parentNode: SimpleNode | null = null;
  public previousSibling: SimpleNode | null = null;
  public nextSibling: SimpleNode | null = null;
  public firstChild: SimpleNode | null = null;
  public lastChild: SimpleNode | null = null;

  public attributes: SimpleAttr[] = EMPTY_ATTRS;

  /**
   * @internal
   */
  public _childNodes: ChildNodes | undefined = undefined;

  constructor(
    public readonly ownerDocument: SimpleDocument,
    public readonly nodeType: T,
    public readonly nodeName: string,
    public nodeValue: V,
    public readonly namespaceURI: N) {
  }

  public get tagName(): string {
    return this.nodeName;
  }

  public get childNodes(): SimpleChildNodes {
    let children = this._childNodes;
    if (children === undefined) {
      children = this._childNodes = new ChildNodes(this as SimpleNode);
    }
    return children;
  }

  public cloneNode(this: SimpleNode, deep?: boolean): SimpleNode {
    return cloneNode(this, deep === true);
  }

  public appendChild<Node extends SimpleNode>(this: SimpleNode, newChild: Node): Node {
    insertBefore(this, newChild, null);
    return newChild;
  }

  public insertBefore<Node extends SimpleNode>(this: SimpleNode, newChild: Node, refChild: SimpleNode | null): Node {
    insertBefore(this, newChild, refChild);
    return newChild;
  }

  public removeChild<Node extends SimpleNode>(this: SimpleNode, oldChild: Node): Node {
    removeChild(this, oldChild);
    return oldChild;
  }

  public insertAdjacentHTML(this: SimpleElementImpl, position: InsertPosition, html: string): void {
    const raw = new SimpleNodeImpl(this.ownerDocument, NodeType.RAW_NODE, '#raw', html, void 0);
    let parentNode: SimpleNode | null;
    let nextSibling: SimpleNode | null;
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
      throw new Error(`${position} requires a parentNode`);
    }
    insertBefore(parentNode, raw, nextSibling);
  }

  public getAttribute(this: SimpleElementImpl, name: string): string | null {
    const localName = adjustAttrName(this.namespaceURI, name);
    return getAttribute(this.attributes, null, localName);
  }

  public getAttributeNS(this: SimpleElementImpl, namespaceURI: AttrNamespace | null, localName: string): string | null {
    return getAttribute(this.attributes, namespaceURI, localName);
  }

  public setAttribute(this: SimpleElementImpl, name: string, value: string): void {
    const localName = adjustAttrName(this.namespaceURI, name);
    setAttribute(this, null, null, localName, value);
  }

  public setAttributeNS(
    this: SimpleElementImpl,
    namespaceURI: AttrNamespace | null,
    qualifiedName: string,
    value: string,
  ) {
    const [prefix, localName] = parseQualifiedName(qualifiedName);
    setAttribute(this as SimpleElementImpl, namespaceURI, prefix, localName, value);
  }

  public removeAttribute(this: SimpleElementImpl, name: string): void {
    const localName = adjustAttrName(this.namespaceURI, name);
    removeAttribute(this.attributes, null, localName);
  }

  public removeAttributeNS(this: SimpleElementImpl, namespaceURI: AttrNamespace | null, localName: string) {
    removeAttribute(this.attributes, namespaceURI, localName);
  }

  get doctype() {
    return this.firstChild as SimpleDocumentType;
  }

  get documentElement() {
    return this.lastChild as SimpleElement;
  }

  get head() {
    return this.documentElement.firstChild as SimpleElement;
  }

  get body() {
    return this.documentElement.lastChild as SimpleElement;
  }

  public createElement(this: SimpleDocumentImpl, name: string): SimpleElement {
    return new SimpleNodeImpl(this, NodeType.ELEMENT_NODE, name.toUpperCase(), null, Namespace.HTML);
  }

  public createElementNS(this: SimpleDocumentImpl, namespace: ElementNamespace, qualifiedName: string): SimpleElement {
    // Node name is case-preserving in XML contexts, but returns canonical uppercase form in HTML contexts
    // https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-104682815
    const nodeName = namespace === Namespace.HTML ? qualifiedName.toUpperCase() : qualifiedName;
    // we don't care to parse the qualified name because we only support HTML documents
    // which don't support prefixed elements
    return new SimpleNodeImpl(this, NodeType.ELEMENT_NODE, nodeName, null, namespace);
  }

  public createTextNode(this: SimpleDocumentImpl, text: string): SimpleText {
    return new SimpleNodeImpl(this, NodeType.TEXT_NODE, '#text', text, void 0);
  }

  public createComment(this: SimpleDocumentImpl, text: string): SimpleComment {
    return new SimpleNodeImpl(this, NodeType.COMMENT_NODE, '#comment', text, void 0);
  }

  /**
   * Backwards compat
   * @deprecated
   */
  public createRawHTMLSection(this: SimpleDocumentImpl, text: string): SimpleRawHTMLSection {
    return new SimpleNodeImpl(this, NodeType.RAW_NODE, '#raw', text, void 0);
  }

  public createDocumentFragment(this: SimpleDocumentImpl): SimpleDocumentFragment {
    return new SimpleNodeImpl(this, NodeType.DOCUMENT_FRAGMENT_NODE, '#document-fragment', null, void 0);
  }
}
