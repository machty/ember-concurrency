import { click, visit, find } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | injections on encapsulated tests');

test('encapsulated tasks support injections', async function(assert) {
  assert.expect(1);

  await visit('/task-injection-test');

  let buttonSel = `[data-test-selector="perform-task-w-injection-button"]`;

  await click(buttonSel);
  assert.equal(find(`[data-test-selector="perform-task-result"]`).textContent, "123-246");
});

