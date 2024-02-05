import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import BasicTemplateImports from 'test-app/components/tests/basic-template-imports';
import { click, render } from '@ember/test-helpers';

module('Integration | template imports / SFC test', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    await render(<template><BasicTemplateImports /></template>);

    assert.dom().containsText('idle');

    await click('button#perform-curried');
    assert.dom().containsText('foo');

    await click('button#perform-promise');
    assert.dom().containsText('running');

    await click('button#cancel-all');

    assert.dom().containsText('idle');
  });
});
