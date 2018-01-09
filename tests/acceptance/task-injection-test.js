import { click, visit } from '@ember/test-helpers';
import { find } from 'ember-native-dom-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | injections on encapsulated tests', function(hooks) {
  setupApplicationTest(hooks);

  test('encapsulated tasks support injections', async function(assert) {
    assert.expect(1);

    await visit('/task-injection-test');

    let buttonSel = `[data-test-selector="perform-task-w-injection-button"]`;

    await click(buttonSel);
    assert.equal(find(`[data-test-selector="perform-task-result"]`).textContent, "123-246");
  });
});
