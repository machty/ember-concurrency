import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | helpers');

test('visiting /', function(assert) {
  assert.expect(3);
  visit('/helpers-test');

  andThen(function() {
    assert.equal(currentURL(), '/helpers-test');
    click('.perform-task');
  }).then(() => {
    assert.equal(find('.task-status').text(), '1-2-3-4');
    click('.cancel-task');
  }).then(() => {
    assert.equal(find('.task-status').text(), 'canceled');
  });
});

