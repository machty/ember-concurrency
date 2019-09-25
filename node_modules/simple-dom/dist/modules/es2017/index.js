import createHTMLDocument from '@simple-dom/document';
import parser from '@simple-dom/parser';
import serializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';

// tslint:disable:no-shadowed-variable
// tslint:disable:variable-name
const Document = function Document() {
    // for backwards compatibility
    return createHTMLDocument();
};

export { Document };
export { createDocument } from '@simple-dom/document';
export { HTMLParser } from '@simple-dom/parser';
export { HTMLSerializer } from '@simple-dom/serializer';
export { voidMap } from '@simple-dom/void-map';
//# sourceMappingURL=index.js.map