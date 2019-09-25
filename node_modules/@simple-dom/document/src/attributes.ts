import { AttrNamespace, ElementNamespace, Namespace, SimpleAttr, SimpleAttrs } from '@simple-dom/interface';
import { SimpleElementImpl } from './node';

export const EMPTY_ATTRS: SimpleAttr[] = [];

function indexOfAttribute(
  attributes: SimpleAttrs,
  namespaceURI: AttrNamespace | null,
  localName: string,
): number {
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (attr.namespaceURI === namespaceURI && attr.localName === localName) {
      return i;
    }
  }
  return -1;
}

export function adjustAttrName(namespaceURI: ElementNamespace, localName: string) {
  return namespaceURI === Namespace.HTML ? localName.toLowerCase() : localName;
}

export function getAttribute(
  attributes: SimpleAttrs,
  namespaceURI: AttrNamespace | null,
  localName: string,
) {
  const index = indexOfAttribute(attributes, namespaceURI, localName);
  return index === -1 ? null : attributes[index].value;
}

export function removeAttribute(
  attributes: SimpleAttr[],
  namespaceURI: AttrNamespace | null,
  localName: string,
): void {
  const index = indexOfAttribute(attributes, namespaceURI, localName);
  if (index !== -1) {
    attributes.splice(index, 1);
  }
}

// https://dom.spec.whatwg.org/#dom-element-setattributens
export function setAttribute(
  element: SimpleElementImpl,
  namespaceURI: AttrNamespace | null,
  prefix: string | null,
  localName: string,
  value: string,
) {
  if (typeof value !== 'string') {
    value = '' + value;
  }
  let { attributes } = element;
  if (attributes === EMPTY_ATTRS) {
    attributes = element.attributes = [];
  } else {
    const index = indexOfAttribute(attributes, namespaceURI, localName);
    if (index !== -1) {
      attributes[index].value = value;
      return;
    }
  }
  attributes.push({
    localName,
    name: prefix === null ? localName : prefix + ':' + localName,
    namespaceURI,
    prefix,
    specified: true, // serializer compat with old IE
    value,
  });
}
