import { click, visit, currentURL } from '@ember/test-helpers';
import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

let originalAssert = Ember.assert;

module('Acceptance | helpers', function(hooks) {
  setupApplicationTest(hooks)

  hooks.afterEach(function() {
    Ember.assert = originalAssert;
  });

  test('perform and cancel-all', async function(assert) {
    assert.expect(3);
    await visit('/helpers-test');
    assert.equal(currentURL(), '/helpers-test');

    await click('.perform-task');
    assert.equal(find('.task-status').textContent, '1-2-3-4');
    await click('.cancel-task');
    assert.equal(find('.task-status').textContent, 'canceled');
  });

  test('setting value="..." should behave like closure actions and rewrite event arg', async function(assert) {
    assert.expect(0);
    await visit('/helpers-test');
    await click('.set-value-option-task');
  });

  test('passing non-Tasks to (perform) helper only errors when invoked', async function(assert) {
    assert.expect(4);

    let assertArgs = [];
    Ember.assert = (message, flag) => {
      if (!flag) {
        assertArgs.push(message);
      }
    };

    await visit('/helpers-test');
    assert.deepEqual(assertArgs, []);
    await click('.maybe-null-task');
    assert.deepEqual(assertArgs, [ "The first argument passed to the `perform` helper should be a Task object (without quotes); you passed null" ]);
    assertArgs.length = 0;
    await click('.setup-task');
    await click('.maybe-null-task');
    assert.deepEqual(assertArgs, []);
    assert.equal(find('.task-status').textContent, 'someTask');
  });
});