import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | helpers');

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

test('setting value="..." should behave like closure actions and rewrite event arg', function(assert) {
  assert.expect(0);
  visit('/helpers-test');
  click('.set-value-option-task');
});

