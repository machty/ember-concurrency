import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { setDebugFunction, getDebugFunction } from '@ember/debug';

const originalAssert = getDebugFunction('assert');

module('Acceptance | helpers', function (hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    setDebugFunction('assert', originalAssert);
  });

  test('perform and cancel-all', async function (assert) {
    assert.expect(3);
    await visit('/helpers-test');
    assert.strictEqual(currentURL(), '/helpers-test');

    await click('.perform-task');
    assert.dom('.task-status').hasText('1-2-3-4');
    await click('.cancel-task');
    assert.dom('.task-status').hasText('canceled');
  });

  test('setting value="..." should behave like closure actions and rewrite event arg', async function (assert) {
    assert.expect(0);
    await visit('/helpers-test');
    await click('.set-value-option-task');
  });
});
