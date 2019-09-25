import { moduleWithDocument } from '@simple-dom/dom-test-helper';
import { Namespace, NodeType } from '@simple-dom/interface';

moduleWithDocument('Document', (helper) => {

  QUnit.test('creating a document node', (assert) => {
    const { document } = helper;

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    assert.strictEqual(document.nodeType, NodeType.DOCUMENT_NODE, 'document has node type of 9');
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
    assert.strictEqual(document.nodeName, '#document', 'document node has the name #document');
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue
    assert.strictEqual(document.nodeValue, null, 'for the document itself, nodeValue returns null');

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument
    assert.strictEqual(document.ownerDocument, null, 'for the document itself, ownerDocument returns null');

    /* istanbul ignore if */
    if (document.firstChild === null) {
      assert.ok(false, 'document has firstChild');
    } else {
      assert.strictEqual(document.firstChild.ownerDocument, document);
      assert.strictEqual(document.firstChild.nodeType, 10);
      assert.strictEqual(document.firstChild.nodeName, 'html');
      assert.strictEqual(document.doctype, document.firstChild, 'doctype is document.firstChild');
    }

    /* istanbul ignore if */
    if (document.lastChild === null) {
      assert.ok(false, 'document has lastChild');
    } else {
      /* istanbul ignore else */
      if (document.lastChild.nodeType === NodeType.ELEMENT_NODE) {
        assert.strictEqual(document.lastChild.namespaceURI, Namespace.HTML, 'documentElement is HTML namespace');
      }
      assert.strictEqual(document.lastChild.ownerDocument, document);
      assert.strictEqual(document.lastChild.nodeType, 1);
      assert.strictEqual(document.lastChild.nodeName, 'HTML');
      assert.strictEqual(document.documentElement, document.lastChild, 'documentElement is document.lastChild');

      /* istanbul ignore if */
      if (document.documentElement.firstChild === null) {
        assert.ok(false, 'documentElement has firstChild');
      } else {
        assert.strictEqual(document.documentElement.firstChild.ownerDocument, document);
        assert.strictEqual(document.documentElement.firstChild.nodeType, 1);
        assert.strictEqual(document.documentElement.firstChild.nodeName, 'HEAD');
        assert.strictEqual(document.documentElement.firstChild.firstChild, null);
        assert.strictEqual(document.head, document.documentElement.firstChild, 'head is documentElement.firstChild');
      }

      /* istanbul ignore if */
      if (document.documentElement.lastChild === null) {
        assert.ok(false, 'documentElement has firstChild');
      } else {
        assert.strictEqual(document.documentElement.lastChild.ownerDocument, document);
        assert.strictEqual(document.documentElement.lastChild.nodeType, 1);
        assert.strictEqual(document.documentElement.lastChild.nodeName, 'BODY');
        assert.strictEqual(document.documentElement.lastChild.firstChild, null);
        assert.strictEqual(document.body, document.documentElement.lastChild, 'body is documentElement.firstChild');
      }
    }
  });

});
