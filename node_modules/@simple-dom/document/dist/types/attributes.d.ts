import { AttrNamespace, ElementNamespace, SimpleAttr, SimpleAttrs } from '@simple-dom/interface';
import { SimpleElementImpl } from './node';
export declare const EMPTY_ATTRS: SimpleAttr[];
export declare function adjustAttrName(namespaceURI: ElementNamespace, localName: string): string;
export declare function getAttribute(attributes: SimpleAttrs, namespaceURI: AttrNamespace | null, localName: string): string | null;
export declare function removeAttribute(attributes: SimpleAttr[], namespaceURI: AttrNamespace | null, localName: string): void;
export declare function setAttribute(element: SimpleElementImpl, namespaceURI: AttrNamespace | null, prefix: string | null, localName: string, value: string): void;
