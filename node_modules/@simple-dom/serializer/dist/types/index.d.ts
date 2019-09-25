import { SerializableAttr, SerializableAttrs, SerializableElement, SerializableNode } from '@simple-dom/interface';
export default class HTMLSerializer {
    private voidMap;
    constructor(voidMap: {
        [tagName: string]: boolean;
    });
    openTag(element: SerializableElement): string;
    closeTag(element: SerializableElement): string;
    tagName(element: SerializableElement): string;
    isVoid(element: SerializableElement): boolean;
    attributes(attributes: SerializableAttrs): string;
    escapeAttrValue(attrValue: string): string;
    attr(attr: SerializableAttr): string;
    escapeText(textNodeValue: string): string;
    text(text: SerializableNode): string;
    rawHTMLSection(text: SerializableNode): string;
    comment(comment: SerializableNode): string;
    serializeChildren(node: SerializableNode): string;
    serialize(node: SerializableNode): string;
}
