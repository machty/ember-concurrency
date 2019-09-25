// eslint-disable-next-line require-jsdoc
export function isElement(target) {
    return target.nodeType === Node.ELEMENT_NODE;
}
// eslint-disable-next-line require-jsdoc
export function isDocument(target) {
    return target.nodeType === Node.DOCUMENT_NODE;
}
