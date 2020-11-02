import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | injections on encapsulated tests', function(hooks) {
  setupApplicationTest(hooks);

  test('encapsulated tasks support injections', async function(assert) {
    assert.expect(2);

    await visit('/task-injection-test');

    await click(`[data-test-selector="perform-task-w-injection-button"]`);
    assert.dom(`[data-test-selector="perform-task-result"]`).hasText('123-246');

    await click(`[data-test-selector="perform-task-w-injection-button-part-2"]`);
    assert.dom(`[data-test-selector="perform-task-result"]`).hasText('123-456');
  });
});
