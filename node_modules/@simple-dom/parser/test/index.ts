import { moduleWithDocument } from '@simple-dom/dom-test-helper';
import { SimpleElement, SimpleText } from '@simple-dom/interface';
import Parser, { Tokenizer } from '@simple-dom/parser';
import voidMap from '@simple-dom/void-map';
import { tokenize } from 'simple-html-tokenizer';

moduleWithDocument('Basic HTML parsing', (helper, hooks) => {

  let parser: Parser;

  hooks.beforeEach(() => {
    parser = new Parser(tokenize as Tokenizer, helper.document, voidMap);
  });

  hooks.afterEach(() => {
    parser = undefined as any;
  });

  QUnit.test('simple parse', (assert) => {
    const fragment = parser.parse('<div>Hello</div>')!;
    assert.ok(fragment);

    const node = fragment.firstChild!;
    assert.ok(node);
    assert.equal(node.nodeType, 1);
    assert.equal(node.nodeName.toLowerCase(), 'div');
    assert.ok(node.firstChild);
    assert.equal(node.firstChild!.nodeType, 3);
    assert.equal(node.firstChild!.nodeValue, 'Hello');
  });

  QUnit.test('nested parse', (assert) => {
    // tslint:disable-next-line:max-line-length
    const fragment = parser.parse('text before<div>Hello</div>text between<div id=foo title="Hello World">World</div>text after');
    assert.ok(fragment);

    let node: SimpleText | SimpleElement | null = null;
    node = fragment!.firstChild as SimpleText;
    assert.ok(node);
    assert.equal(node.nodeType, 3);
    assert.equal(node.nodeValue, 'text before');

    node = node.nextSibling as SimpleElement;
    assert.ok(node);
    assert.equal(node.nodeType, 1);
    assert.equal(node.nodeName, 'DIV');
    assert.ok(node.firstChild);
    assert.equal(node.firstChild!.nodeType, 3);
    assert.equal(node.firstChild!.nodeValue, 'Hello');

    node = node.nextSibling as SimpleText;
    assert.ok(node);
    assert.equal(node.nodeType, 3);
    assert.equal(node.nodeValue, 'text between');

    node = (node.nextSibling as SimpleElement);
    assert.ok(node);
    assert.equal(node.nodeType, 1);
    assert.equal(node.nodeName, 'DIV');
    const expectedValues: { [attr: string]: string } = {
      id: 'foo',
      title: 'Hello World',
    };
    assert.equal(node.attributes.length, 2);
    assert.equal(node.attributes[0].value, expectedValues[node.attributes[0].name]);
    assert.equal(node.attributes[1].value, expectedValues[node.attributes[1].name]);
    assert.equal(node.attributes.length, 2);
    assert.ok(node.firstChild);
    assert.equal(node.firstChild!.nodeType, 3);
    assert.equal(node.firstChild!.nodeValue, 'World');

    node = node.nextSibling as SimpleText;
    assert.ok(node);
    assert.equal(node.nodeType, 3);
    assert.equal(node.nodeValue, 'text after');
  });

  QUnit.test('void tags', (assert) => {
    const fragment = parser.parse('<div>Hello<br>World<img src="http://example.com/image.png"></div>')!;
    assert.ok(fragment);
    let node: SimpleText | SimpleElement = fragment.firstChild as SimpleElement;
    assert.ok(node);
    assert.equal(node.nodeType, 1);
    assert.equal(node.nodeName, 'DIV');
    node = node.firstChild as SimpleText;
    assert.ok(node);
    assert.equal(node.nodeType, 3);
    assert.equal(node.nodeValue, 'Hello');
    node = node.nextSibling as SimpleElement;
    assert.ok(node);
    assert.equal(node.nodeType, 1);
    assert.equal(node.nodeName, 'BR');
    node = node.nextSibling as SimpleText;
    assert.ok(node);
    assert.equal(node.nodeType, 3);
    assert.equal(node.nodeValue, 'World');
    node = node.nextSibling as SimpleElement;
    assert.ok(node);
    assert.equal(node.nodeType, 1);
    assert.equal(node.nodeName, 'IMG');
    assert.equal(node.getAttribute('src'), 'http://example.com/image.png');
    assert.equal(node.nextSibling, null);
  });

});
