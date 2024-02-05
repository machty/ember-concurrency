import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import BasicTemplateImports from 'test-app/components/tests/basic-template-imports';
// import { settled } from '@ember/test-helpers';
import {
  click,
  getSettledState,
  render,
  settled,
  waitUntil,
} from '@ember/test-helpers';

module('Integration | template imports / SFC test', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    await render(<template><BasicTemplateImports /></template>);

    await click('button');

    assert.dom().hasText('Click Me');
  });
});
