import {
  ElementNamespace,
  Namespace,
  NodeType,
  SimpleAttr,
  SimpleAttrs,
  SimpleDocument,
  SimpleNode,
} from '@simple-dom/interface';
import { EMPTY_ATTRS } from './attributes';
import SimpleNodeImpl from './node';

export { Namespace, SimpleDocument, NodeType };

export function cloneNode(
  node: SimpleNode,
  deep: boolean,
) {
  const clone = nodeFrom(node);

  if (deep) {
    let child = node.firstChild;
    let nextChild = child;

    while (child !== null) {
      nextChild = child.nextSibling;
      clone.appendChild(child.cloneNode(true));
      child = nextChild;
    }
  }

  return clone;
}

function nodeFrom(node: SimpleNode): SimpleNode {

  let namespaceURI: ElementNamespace | undefined;
  if (node.nodeType === NodeType.ELEMENT_NODE) {
    namespaceURI = node.namespaceURI;
  }

  const clone = new SimpleNodeImpl(
    node.ownerDocument,
    node.nodeType,
    node.nodeName,
    node.nodeValue,
    namespaceURI,
  );

  if (node.nodeType === NodeType.ELEMENT_NODE) {
    clone.attributes = copyAttrs(node.attributes);
  }

  return clone as SimpleNode;
}

function copyAttrs(attrs: SimpleAttrs): SimpleAttr[] {
  if (attrs === EMPTY_ATTRS) {
    return EMPTY_ATTRS;
  }

  const copy: SimpleAttr[] = [];
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
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
