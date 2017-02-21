import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let originalAssert = Ember.assert;
moduleForAcceptance('Acceptance | helpers', {
  afterEach() {
    Ember.assert = originalAssert;
  }
});

test('perform and cancel-all', function(assert) {
  assert.expect(3);
  visit('/helpers-test');

  return wait().then(function() {
    assert.equal(currentURL(), '/helpers-test');
    click('.perform-task');
  }).then(() => {
    assert.equal(find('.task-status').text(), '1-2-3-4');
    click('.cancel-task');
  }).then(() => {
    assert.equal(find('.task-status').text(), 'canceled');
  });
});

test('deprecate task.perform action', function(assert) {
  assert.expect(0);
  visit('/deprecation-test');
  click('.deprecated-button');
});

test('setting value="..." should behave like closure actions and rewrite event arg', function(assert) {
  assert.expect(0);
  visit('/helpers-test');
  click('.set-value-option-task');
});

test('passing non-Tasks to (perform) helper only errors when invoked', function(assert) {
  assert.expect(4);

  let assertArgs = [];
  Ember.assert = (message, flag) => {
    if (!flag) {
      assertArgs.push(message);
    }
  };

  visit('/helpers-test');
  return wait().then(() => {
    assert.deepEqual(assertArgs, []);
    click('.maybe-null-task');
  }).then(() => {
    assert.deepEqual(assertArgs, [ "The first argument passed to the `perform` helper should be a Task object (without quotes); you passed null" ]);
    assertArgs.length = 0;
    click('.setup-task');
    click('.maybe-null-task');
  }).then(() => {
    assert.deepEqual(assertArgs, []);
    assert.equal(find('.task-status').text(), 'someTask');
  });
});

