import { moduleWithDocument } from '@simple-dom/dom-test-helper';
import { InsertPosition, Namespace, SimpleDocumentFragment } from '@simple-dom/interface';
import Serializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';

moduleWithDocument('Element', (helper) => {

  // See http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core.html#ID-B63ED1A3
  // tslint:disable-next-line:max-line-length
  QUnit.test('appending a document fragment appends the fragment\'s children and not the fragment itself', (assert) => {
    const { document } = helper;

    const frag = document.createDocumentFragment();
    const elem = document.createElement('div');
    const body = document.body;

    assert.strictEqual(body.firstChild, null, 'body has no children');

    frag.appendChild(elem);
    body.appendChild(frag);

    assert.strictEqual(body.firstChild!.nodeName, 'DIV', 'fragment\'s child is added as child of document');
  });

  QUnit.test('create HTML-namespaced div element', (assert) => {
    const { document } = helper;

    const svg = document.createElementNS(Namespace.HTML, 'div');

    assert.strictEqual(svg.namespaceURI, Namespace.HTML, 'has HTML namespace');

    assert.strictEqual(svg.nodeName, 'DIV', 'nodeName is uppercased');
    assert.strictEqual(svg.tagName, 'DIV', 'tagName is uppercased');
  });

  QUnit.test('create svg element', (assert) => {
    const { document } = helper;

    const svg = document.createElementNS(Namespace.SVG, 'svg');

    assert.strictEqual(svg.namespaceURI, Namespace.SVG, 'has svg namespace');

    assert.strictEqual(svg.nodeName, 'svg', 'nodeName is svg');
    assert.strictEqual(svg.tagName, 'svg', 'tagName is svg');
  });

  // See http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core.html#ID-B63ED1A3
  // tslint:disable-next-line:max-line-length
  QUnit.test('appending a document fragment (via insertBefore) appends the fragment\'s children and not the fragment itself', (assert) => {
    const { document } = helper;

    const frag = document.createDocumentFragment();
    const elem = document.createElement('div');
    const existing = document.createElement('main');
    const body = document.body;
    body.appendChild(existing);

    assert.strictEqual(body.firstChild!.nodeName, 'MAIN', 'sanity check: the main element was actually inserted');
    assert.strictEqual(body.lastChild!.nodeName, 'MAIN', 'sanity check: the main element was actually inserted');

    frag.appendChild(elem);
    body.insertBefore(frag, existing);

    assert.strictEqual(body.firstChild!.nodeName, 'DIV', 'The body\'s first child is now DIV');
    assert.strictEqual(body.lastChild!.nodeName, 'MAIN', 'The body\'s last child is now MAIN');
  });

  QUnit.test('insert a document fragment before a node with a previousSibling', (assert) => {
    const { document } = helper;

    const parent = document.createElement('div');
    const before = document.createComment('before');
    const after = document.createComment('after');
    parent.appendChild(before);
    parent.appendChild(after);

    const frag = document.createDocumentFragment();
    const child1 = document.createElement('p');
    const child2 = document.createElement('p');
    frag.appendChild(child1);
    frag.appendChild(child2);

    assert.strictEqual(after.previousSibling, before);

    parent.insertBefore(frag, after);

    assert.strictEqual(frag.firstChild, null);
    assert.strictEqual(frag.lastChild, null);

    assert.strictEqual(child1.parentNode, parent);
    assert.strictEqual(child2.parentNode, parent);

    assert.strictEqual(before.previousSibling, null);
    assert.strictEqual(before.nextSibling,     child1);
    assert.strictEqual(child1.previousSibling, before);
    assert.strictEqual(child1.nextSibling,     child2);
    assert.strictEqual(child2.previousSibling, child1);
    assert.strictEqual(child2.nextSibling,     after);
    assert.strictEqual(after.previousSibling,  child2);
    assert.strictEqual(after.nextSibling,      null);
  });

  QUnit.test('insert an empty document fragment does nothing', (assert) => {
    const { document } = helper;

    const parent = document.createElement('div');
    const before = document.createComment('before');
    const after = document.createComment('after');
    parent.appendChild(before);
    parent.appendChild(after);

    const frag = document.createDocumentFragment();

    parent.insertBefore(frag, after);

    assert.strictEqual(parent.firstChild, before);
    assert.strictEqual(parent.lastChild, after);
    assert.strictEqual(before.nextSibling,     after);
    assert.strictEqual(after.previousSibling,  before);
    assert.strictEqual(after.nextSibling,      null);
  });

  // http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-536297177
  QUnit.test('child nodes can be access via item()', (assert) => {
    const { document } = helper;

    const parent = document.createElement('div');

    const child1 = document.createElement('p');
    const child2 = document.createElement('img');

    // tslint:disable-next-line:max-line-length
    assert.strictEqual(parent.childNodes.item(0), null, 'attempting to access an item that doesn\'t exist returns null');

    parent.appendChild(child1);
    parent.appendChild(child2);

    assert.strictEqual(parent.childNodes.item(0), child1);
    assert.strictEqual(parent.childNodes.item(1), child2);
    assert.strictEqual(parent.childNodes.item(2), null);

    parent.removeChild(child1);
    assert.strictEqual(parent.childNodes.item(0), child2);
    assert.strictEqual(parent.childNodes.item(1), null);

    parent.removeChild(child2);

    assert.strictEqual(parent.childNodes.item(0), null);
    assert.strictEqual(parent.childNodes.item(1), null);
  });

  QUnit.test('insertBefore can insert before the last child node', (assert) => {
    const { document } = helper;

    const parent = document.createElement('div');

    const child1 = document.createElement('p');
    const child2 = document.createElement('img');
    const child3 = document.createElement('span');

    parent.appendChild(child1);
    parent.appendChild(child2);

    parent.insertBefore(child3, child2);

    assert.strictEqual(parent.childNodes.item(1), child3);
  });

  QUnit.test('insertBefore removes the node from its parent before inserting', (assert) => {
    const { document } = helper;

    const body = document.body;

    const parent = document.createElement('div');
    const child =  document.createElement('span');
    parent.appendChild(child);
    body.appendChild(parent);

    assert.strictEqual(parent.firstChild, child, 'precond - parent.firstChild === child');
    assert.strictEqual(parent.lastChild, child, 'precond - parent.lastChild === child');
    assert.strictEqual(body.firstChild, parent, 'precond - body.firstChild === parent');

    document.body.insertBefore(child, body.firstChild);

    assert.strictEqual(body.firstChild, child, 'body firstChild replaced with child');
    assert.strictEqual(child.parentNode, body, 'child parentNode updated to body');
    assert.strictEqual(parent.firstChild, null, 'child removed from parent (firstChild)');
    assert.strictEqual(parent.lastChild, null, 'child removed from parent (lastChild)');
  });

  QUnit.test('cloneNode(true) recursively clones nodes', (assert) => {
    const { document } = helper;

    const parent = document.createElement('div');

    const child1 = document.createElement('p');
    const child2 = document.createElement('img');
    child2.setAttribute('src', 'hamster.png');
    const child3 = document.createElement('span');
    const child31 = document.createComment('');
    child3.appendChild(child31);

    child3.insertAdjacentHTML(InsertPosition.beforeend, '<p data-attr="herp">derp</p>');

    parent.appendChild(child1);
    parent.appendChild(child2);
    parent.appendChild(child3);

    const child11 = document.createTextNode('hello');
    const child12 = document.createElement('span');
    child12.appendChild(document.createTextNode(' world'));
    const child13 = document.createTextNode('!');

    child1.appendChild(child11);
    child1.appendChild(child12);
    child1.appendChild(child13);

    const clone = parent.cloneNode(true);

    assert.notEqual(parent.firstChild, null);
    assert.notStrictEqual(clone.firstChild, parent.firstChild);

    const clone2 = parent.cloneNode(true);

    assert.notEqual(parent.firstChild, null);
    assert.notStrictEqual(clone2.firstChild, clone.firstChild);
    assert.notStrictEqual(clone2.firstChild, parent.firstChild);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(clone);

    fragment = fragment.cloneNode(true) as SimpleDocumentFragment;

    const actual = new Serializer(voidMap).serialize(fragment);

    // tslint:disable-next-line:max-line-length
    assert.equal(actual, '<div><p>hello<span> world</span>!</p><img src="hamster.png"><span><!----><p data-attr="herp">derp</p></span></div>');
  });

  QUnit.test('head + metatags', (assert) => {
    const { document } = helper;

    const meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', 'something here');

    const head = document.head;
    head.appendChild(meta);

    const actual = new Serializer(voidMap).serialize(head.firstChild!);

    assert.strictEqual(head.firstChild!.nodeName, 'META', 'sanity check: the meta element was actually inserted');
    assert.equal(actual, '<meta name="description" content="something here">');
  });

  QUnit.test('setAttribute converts non strings', (assert) => {
    const { document } = helper;

    const div = document.createElement('div');
    div.setAttribute('a', 0 as any);
    assert.strictEqual(div.getAttribute('a'), '0');
    div.setAttribute('a', 1 as any);
    assert.strictEqual(div.getAttribute('a'), '1');
    div.setAttribute('a', null as any);
    assert.strictEqual(div.getAttribute('a'), 'null');
    div.setAttribute('a', undefined as any);
    assert.strictEqual(div.getAttribute('a'), 'undefined');
    div.setAttribute('a', true as any);
    assert.strictEqual(div.getAttribute('a'), 'true');
    div.setAttribute('a', false as any);
    assert.strictEqual(div.getAttribute('a'), 'false');
  });

  QUnit.test('removeAttribute', (assert) => {
    const { document } = helper;
    const div = document.createElement('div');
    div.setAttribute('a', 'something');
    div.setAttribute('b', 'something else');
    assert.strictEqual(div.getAttribute('a'), 'something');
    assert.strictEqual(div.getAttribute('b'), 'something else');
    div.removeAttribute('b');
    assert.strictEqual(div.getAttribute('a'), 'something');
    assert.strictEqual(div.getAttribute('b'), null);
    div.removeAttribute('a');
    assert.strictEqual(div.getAttribute('a'), null);
    assert.strictEqual(div.getAttribute('b'), null);
  });

  QUnit.test('setAttribute case normalization', (assert) => {
    const div = helper.document.createElement('div');
    div.setAttribute('onClick', 'doSomething()');
    const svg = helper.document.createElementNS(Namespace.SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');

    assert.equal(div.attributes[0].name, 'onclick', 'HTML case is ascii lowered');
    assert.equal(div.getAttribute('onclick'), 'doSomething()', 'can getAttribute("onclick")');
    assert.equal(div.getAttribute('onClick'), 'doSomething()', 'HTML is case insensitive');
    assert.equal(svg.attributes[0].name, 'viewBox', 'non HTML case is preserved');
    assert.equal(svg.getAttribute('viewBox'), '0 0 100 100', 'can getAttribute("viewBox")');
    assert.strictEqual(svg.getAttribute('viewbox'), null, 'non HTML is case sensitive');

    div.setAttribute('OnClick', 'doSomethingElse()');
    svg.setAttribute('viewbox', '0 0 400 10');

    assert.equal(div.attributes.length, 1);
    assert.equal(div.getAttribute('onclick'), 'doSomethingElse()');
    assert.equal(svg.attributes.length, 2);
    assert.equal(svg.getAttribute('viewBox'), '0 0 100 100');
    assert.equal(svg.getAttribute('viewbox'), '0 0 400 10');

    svg.setAttribute('viewBox', '0 0 200 200');

    assert.equal(svg.getAttribute('viewBox'), '0 0 200 200');

    svg.removeAttribute('viewbox');

    assert.equal(svg.attributes.length, 1);
    assert.equal(svg.getAttribute('viewBox'), '0 0 200 200');

  });

  QUnit.test('setAttributeNS', (assert) => {
    const svg = helper.document.createElementNS(Namespace.SVG, 'svg');

    svg.setAttributeNS(Namespace.XMLNS, 'xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttributeNS(Namespace.XMLNS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');

    assert.equal(svg.attributes.length, 2);

    assert.equal(svg.getAttributeNS(Namespace.XMLNS, 'xmlns'), 'http://www.w3.org/2000/svg');
    assert.equal(svg.getAttributeNS(Namespace.XMLNS, 'xlink'), 'http://www.w3.org/1999/xlink');

    assert.strictEqual(svg.attributes[0].prefix, null);
    assert.equal(svg.attributes[0].localName, 'xmlns');
    assert.equal(svg.attributes[0].name, 'xmlns');
    assert.equal(svg.attributes[0].namespaceURI, Namespace.XMLNS);
    assert.equal(svg.attributes[0].value, 'http://www.w3.org/2000/svg');

    assert.equal(svg.attributes[1].prefix, 'xmlns');
    assert.equal(svg.attributes[1].localName, 'xlink');
    assert.equal(svg.attributes[1].name, 'xmlns:xlink');
    assert.equal(svg.attributes[1].namespaceURI, Namespace.XMLNS);
    assert.equal(svg.attributes[1].value, 'http://www.w3.org/1999/xlink');
  });

});
