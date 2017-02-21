import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | injections on encapsulated tests');

test('encapsulated tasks support injections', function(assert) {
  assert.expect(1);

  visit('/task-injection-test');

  let buttonSel = `[data-test-selector="perform-task-w-injection-button"]`;

  return wait().then(() => {
    click(buttonSel);
  }).then(() => {
    assert.equal(Ember.$(`[data-test-selector="perform-task-result"]`).text(), "123-246");
  });
});

