import $ from 'jquery';
import { timeout } from 'ember-concurrency';
import { test } from '../../tests/helpers/generator-tests';
import { module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { resumeTimers } from 'ember-concurrency/testing';

module('ember-concurrency testing utilities', function() {
  test('sync tests work', function * (assert) {
    assert.expect(1);
    assert.ok(true);
  });

  test('async tests work', function * (assert) {
    assert.expect(1);
    yield timeout(100);
    assert.ok(true);
  });
});

module('Acceptance | testing utilities', function(hooks) {
  setupApplicationTest(hooks);

  test('find() waits for element to exist', function * (assert) {
    assert.expect(2);
    this.visit('/testing-ergo/foo');

    let sel = `.eventual-button:contains('Eventual Button')`;
    assert.equal($(sel).length, 0);
    let $loadedSel = yield this.find(sel);
    assert.equal($loadedSel.length, 1);
  });

  test('find() with count 0 waits for element to not exist', function * (assert) {
    assert.expect(1);
    this.visit('/testing-ergo/foo');

    yield this.find(`.disappearing-content`);
    let $sel = yield this.find(`.disappearing-content`, { count: 0 });
    assert.equal($sel.length, 0);
  });

  test('click() waits for element to exist', function * (assert) {
    assert.expect(0);
    this.visit('/testing-ergo/foo');
    yield this.click(`.eventual-button`);
    yield this.find(`.value:contains('value=123')`);
  });

  test('find() fails eagerly if waiters settle', function * (assert) {
    assert.expect(1);
    this.visit('/testing-ergo/foo-settimeout');

    try {
      yield this.find(`.eventual-button`);
    } catch(e) {
      assert.equal(e.message, "Tried to find 1 occurrence(s) of \".eventual-button\" before test waiters settled, instead found 0");
    }
  });

  test('find() can wait beyond settlement using timeout option', function * (assert) {
    assert.expect(2);
    this.visit('/testing-ergo/foo-settimeout');

    try {
      yield this.find(`.nonexistent-button`, { timeout: 100 });
    } catch(e) {
      assert.equal(e.message, "Tried to find 1 occurrence(s) of \".nonexistent-button\" within 100ms, instead found 0");
    }

    let $el = yield this.find(`.eventual-button`, { timeout: 1000 });
    assert.equal($el.length, 1);
  });

  test('it is easy to test loading routes by yielding selectors rather than awaiting "settledness"', function * (assert) {
    assert.expect(2);
    this.visit('/testing-ergo/slow');

    let $loadingBanner = yield this.find('.loading-message');
    assert.equal($loadingBanner.text(), "I am a loading route.");

    let $slowBanner = yield this.find('.slow-banner');
    assert.equal($slowBanner.text(), "Welcome to slow route.");
  });
});


module('ember-concurrency testing utilities (async await)', function(hooks) {
  setupApplicationTest(hooks);

  test('sync tests work', async function(assert) {
    assert.expect(1);
    assert.ok(true);
  });

  test('find() waits for element to exist', async function(assert) {
    assert.expect(2);
    this.visit('/testing-ergo/foo');

    let sel = `.eventual-button:contains('Eventual Button')`;
    assert.equal($(sel).length, 0);
    let $loadedSel = await this.find(sel);
    assert.equal($loadedSel.length, 1);
  });

  test('find() with count 0 waits for element to not exist', async function (assert) {
    assert.expect(1);
    this.visit('/testing-ergo/foo');

    await this.find(`.disappearing-content`);
    let $sel = await this.find(`.disappearing-content`, { count: 0 });
    assert.equal($sel.length, 0);
  });

  test('click() waits for element to exist', async function(assert) {
    assert.expect(0);
    this.visit('/testing-ergo/foo');
    await this.click(`.eventual-button`);
    await this.find(`.value:contains('value=123')`);
  });

  test('find() fails eagerly if waiters settle', async function(assert) {
    assert.expect(1);
    this.visit('/testing-ergo/foo-settimeout');

    try {
      await this.find(`.eventual-button`);
    } catch(e) {
      assert.equal(e.message, "Tried to find 1 occurrence(s) of \".eventual-button\" before test waiters settled, instead found 0");
    }
  });

  test('find() can wait beyond settlement using timeout option', async function(assert) {
    assert.expect(2);
    this.visit('/testing-ergo/foo-settimeout');

    try {
      await this.find(`.nonexistent-button`, { timeout: 100 });
    } catch(e) {
      assert.equal(e.message, "Tried to find 1 occurrence(s) of \".nonexistent-button\" within 100ms, instead found 0");
    }

    let $el = await this.find(`.eventual-button`, { timeout: 1000 });
    assert.equal($el.length, 1);
  });

  test('it is easy to test loading routes by yielding selectors rather than awaiting "settledness"', async function(assert) {
    assert.expect(2);
    this.visit('/testing-ergo/slow');

    let $loadingBanner = await this.find('.loading-message');
    assert.equal($loadingBanner.text(), "I am a loading route.");

    let $slowBanner = await this.find('.slow-banner');
    assert.equal($slowBanner.text(), "Welcome to slow route.");
  });

  test('it is easy to test timer loops with tagged timers', async function(assert) {
    assert.expect(6);

    await this.visit('/testing-ergo/timer-loop');

    assert.equal(resumeTimers('nonexistent'), 0);
    assert.equal($('.timer-loop-message').text(), 'foo=1');

    assert.equal(resumeTimers('test-tag'), 1);
    assert.equal($('.timer-loop-message').text(), 'foo=2');

    assert.equal(resumeTimers('test-tag'), 1);
    assert.equal($('.timer-loop-message').text(), 'foo=3');
  });
});
