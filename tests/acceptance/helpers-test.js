import { click, visit, currentURL } from '@ember/test-helpers';
import Ember from 'ember';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import {
  macroCondition,
  dependencySatisfies,
  importSync,
} from '@embroider/macros';

function getDebugFunction(type) {
  if (macroCondition(dependencySatisfies('ember-source', '^3.26.0'))) {
    return importSync('@ember/debug').getDebugFunction(type);
  } else {
    return Ember[type];
  }
}

function setDebugFunction(type, fn) {
  if (macroCondition(dependencySatisfies('ember-source', '^3.26.0'))) {
    return importSync('@ember/debug').setDebugFunction(type, fn);
  } else {
    Ember[type] = fn;
  }
}

const originalAssert = getDebugFunction('assert');

module('Acceptance | helpers', function (hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    setDebugFunction('assert', originalAssert);
  });

  test('perform and cancel-all', async function (assert) {
    assert.expect(3);
    await visit('/helpers-test');
    assert.equal(currentURL(), '/helpers-test');

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

  test('passing non-Tasks to (perform) helper only errors when invoked', async function (assert) {
    assert.expect(2);

    await visit('/helpers-test');

    setDebugFunction('assert', function (desc, test) {
      if (!test) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.deepEqual(
          desc,
          'The first argument passed to the `perform` helper should be a Task object (without quotes); you passed null'
        );
      }
    });

    await click('.maybe-null-task');

    setDebugFunction('assert', originalAssert);

    await click('.setup-task');
    await click('.maybe-null-task');

    assert.dom('.task-status').hasText('someTask');
  });
});
