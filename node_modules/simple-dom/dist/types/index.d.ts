import { SimpleDocument } from '@simple-dom/interface';
export { default as createDocument } from '@simple-dom/document';
export { default as HTMLParser } from '@simple-dom/parser';
export { default as HTMLSerializer } from '@simple-dom/serializer';
export { default as voidMap } from '@simple-dom/void-map';
export { SimpleChildNodes as NodeList, NodeType, SimpleAttr as Attr } from '@simple-dom/interface';
export declare const Document: {
    new (): SimpleDocument;
    prototype: SimpleDocument;
};
