import { moduleWithDocument } from '@simple-dom/dom-test-helper';

moduleWithDocument('Node', (helper) => {

  QUnit.test('#insertBefore', (assert) => {
    const doc = helper.document;
    const body = doc.body;
    const div = doc.createElement('div');
    const span = doc.createElement('span');
    const p = doc.createElement('p');
    const frag = doc.createDocumentFragment();
    frag.appendChild(p);
    // setup previous sibling
    frag.appendChild(span);
    assert.strictEqual(span.previousSibling, p, 'precond');

    const appendChildReturn = body.appendChild(div);

    assert.strictEqual(appendChildReturn, div, 'appendChild should return the node it is appending');

    body.insertBefore(span, div);
    assert.strictEqual(span.parentNode, body, 'nodes parent is set');
    assert.strictEqual(span.previousSibling, null, 'nodes previous sibling is cleared');
    assert.strictEqual(span.nextSibling, div, 'nodes next sibling is set');
    assert.strictEqual(div.previousSibling, span, 'next sibling\'s previous sibling is set');
    assert.strictEqual(div.nextSibling, null, 'next sibling\'s next sibling is set');
    assert.strictEqual(div.parentNode, body, 'next sibling\'s parent is set');
    assert.strictEqual(body.firstChild, span, 'parents first child is set');
    assert.strictEqual(body.lastChild, div, 'parents last child is set');
  });

  QUnit.test('nodeValue is mutable', (assert) => {
    const doc = helper.document;
    const text = doc.createTextNode('hello world');
    const comment = doc.createComment('goodbye cruel world');

    assert.strictEqual(text.nodeValue, 'hello world', 'precond - node value is set');
    assert.strictEqual(comment.nodeValue, 'goodbye cruel world', 'precond - node value is set');

    text.nodeValue = text.nodeValue.toUpperCase();
    comment.nodeValue = comment.nodeValue.toUpperCase();

    assert.strictEqual(text.nodeValue, 'HELLO WORLD');
    assert.strictEqual(comment.nodeValue, 'GOODBYE CRUEL WORLD', 'precond - node value is set');
  });
});
