import {
  Namespace,
  NodeType,
  SimpleDocument,
} from '@simple-dom/interface';
import SimpleNodeImpl from './node';

export function createHTMLDocument(): SimpleDocument {
  // dom.d.ts types ownerDocument as Document but for a document ownerDocument is null
  const document = new SimpleNodeImpl(null as any, NodeType.DOCUMENT_NODE, '#document', null, Namespace.HTML);
  const doctype = new SimpleNodeImpl(document, NodeType.DOCUMENT_TYPE_NODE, 'html', null, Namespace.HTML);
  const html = new SimpleNodeImpl(document, NodeType.ELEMENT_NODE, 'HTML', null, Namespace.HTML);
  const head = new SimpleNodeImpl(document, NodeType.ELEMENT_NODE, 'HEAD', null, Namespace.HTML);
  const body = new SimpleNodeImpl(document, NodeType.ELEMENT_NODE, 'BODY', null, Namespace.HTML);
  html.appendChild(head);
  html.appendChild(body);
  document.appendChild(doctype);
  document.appendChild(html);
  return document;
}
