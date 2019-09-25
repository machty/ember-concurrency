export const enum NodeType {
  RAW_NODE = -1,
  ELEMENT_NODE = 1,
  TEXT_NODE = 3,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
}

export const enum InsertPosition {
  beforebegin = 'beforebegin',
  afterbegin = 'afterbegin',
  beforeend = 'beforeend',
  afterend = 'afterend',
}

/**
 * https://infra.spec.whatwg.org/#namespaces
 */
export const enum Namespace {
  HTML = 'http://www.w3.org/1999/xhtml',
  MathML = 'http://www.w3.org/1998/Math/MathML',
  SVG = 'http://www.w3.org/2000/svg',
  XLink = 'http://www.w3.org/1999/xlink',
  XML = 'http://www.w3.org/XML/1998/namespace',
  XMLNS = 'http://www.w3.org/2000/xmlns/'
}

/**
 * elements that are supported in HTML5 that have a namespace but no prefix
 */
export type ElementNamespace = Namespace.HTML | Namespace.SVG | Namespace.MathML;

/**
 * attributes handled in HTML5 that get prefix and namespace
 */
export type AttrNamespace = Namespace.XLink | Namespace.XMLNS | Namespace.XML;

export type SimpleNode =
  SimpleRawHTMLSection |
  SimpleElement |
  SimpleText |
  SimpleComment |
  SimpleDocument |
  SimpleDocumentType |
  SimpleDocumentFragment;

export interface SimpleNodeBase {
  readonly ownerDocument: SimpleDocument;
  readonly nodeType: NodeType;
  readonly nodeName: string;

  nodeValue: string | null;

  // in the Element iterface these are readonly but we need them read/write
  // we could check ownerDocument === this and cast them.
  parentNode: SimpleNode | null;
  previousSibling: SimpleNode | null;
  nextSibling: SimpleNode | null;
  firstChild: SimpleNode | null;
  lastChild: SimpleNode | null;

  appendChild<T extends SimpleNode>(newChild: T): T;
  insertBefore<T extends SimpleNode>(newChild: T, refChild: SimpleNode | null): T;
  removeChild<T extends SimpleNode>(oldChild: T): T;

  cloneNode(deep?: boolean): SimpleNode;

  /**
   * This is pretty useless as implemented without length,
   * this was only used by htmlbars.
   */
  readonly childNodes: SimpleChildNodes;
}

export interface SimpleAttr {
  readonly namespaceURI: AttrNamespace | null;
  readonly prefix: string | null;
  readonly localName: string;
  readonly name: string;
  readonly specified: true;
  value: string;
}

export interface SimpleAttrs {
  readonly length: number;
  [index: number]: SimpleAttr;
}

export interface SimpleElement extends SimpleNodeBase {
  readonly nodeType: NodeType.ELEMENT_NODE;
  readonly nodeValue: null;

  readonly namespaceURI: ElementNamespace;
  readonly tagName: string;
  readonly attributes: SimpleAttrs;

  insertAdjacentHTML(position: InsertPosition, html: string): void;

  getAttribute(name: string): string | null;
  getAttributeNS(namespaceURI: AttrNamespace | null, localName: string): string | null;

  removeAttribute(name: string): void;
  removeAttributeNS(namespaceURI: AttrNamespace | null, qualifiedName: string): void;

  setAttribute(name: string, value: string): void;
  setAttributeNS(namespaceURI: AttrNamespace | null, qualifiedName: string, value: string): void;
}

export interface SimpleDocumentType extends SimpleNodeBase {
  readonly nodeType: NodeType.DOCUMENT_TYPE_NODE;
  readonly nodeValue: null;
}

export interface SimpleDocumentFragment extends SimpleNodeBase {
  readonly nodeType: NodeType.DOCUMENT_FRAGMENT_NODE;
  readonly nodeValue: null;
}

export interface SimpleDocument extends SimpleNodeBase {
  readonly nodeType: NodeType.DOCUMENT_NODE;
  readonly nodeValue: null;

  readonly doctype: SimpleDocumentType;
  readonly documentElement: SimpleElement;
  readonly head: SimpleElement;
  readonly body: SimpleElement;

  createElement(tag: string): SimpleElement;
  createElementNS(namespace: ElementNamespace, name: string): SimpleElement;

  createTextNode(text: string): SimpleText;
  createComment(data: string): SimpleComment;

  createDocumentFragment(): SimpleDocumentFragment;

  /**
   * @deprecated
   */
  createRawHTMLSection?(html: string): SimpleRawHTMLSection;
}

export interface SimpleRawHTMLSection extends SimpleNodeBase {
  readonly nodeType: NodeType.RAW_NODE;
  readonly nodeValue: string;
}

export interface SimpleText extends SimpleNodeBase {
  readonly nodeType: NodeType.TEXT_NODE;
  nodeValue: string;
}

export interface SimpleComment extends SimpleNodeBase {
  readonly nodeType: NodeType.COMMENT_NODE;
  nodeValue: string;
}

/**
 * This is pretty useless as implemented without length,
 * this was only used by htmlbars.
 *
 * @deprecated
 */
export interface SimpleChildNodes {
  readonly length: number;
  [index: number]: SimpleNode;
  item(index: number): SimpleNode | null;
}

export interface SerializableNode {
  readonly nodeType: number;
  readonly nodeName: string;
  readonly nodeValue: string | null;

  readonly nextSibling: SerializableNode | null;
  readonly firstChild: SerializableNode | null;
}

export interface SerializableAttrs {
  readonly length: number;
  readonly [index: number]: SerializableAttr;
}

export interface SerializableAttr {
  readonly specified: boolean;
  readonly name: string;
  readonly value: string;
}

export interface SerializableElement extends SerializableNode {
  readonly namespaceURI: string | null;
  readonly attributes: SerializableAttrs;
}
