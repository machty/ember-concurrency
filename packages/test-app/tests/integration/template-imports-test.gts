import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import BasicTemplateImports from 'test-app/components/tests/basic-template-imports';
import { settled } from '@ember/test-helpers';

module('Integration | template imports / SFC test', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    await render(<template><BasicTemplateImports /></template>);

    assert.dom().doesNotContainText('hello');

    await settled();
    assert.dom().hasText('hello');
  });
});
