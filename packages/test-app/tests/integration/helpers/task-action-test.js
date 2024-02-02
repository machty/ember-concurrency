import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { task } from 'ember-concurrency';
import { click } from '@ember/test-helpers';

module('Integration | Helper | task action', function (hooks) {
  setupRenderingTest(hooks);

  test('task produces a curried version of the task passed into it', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'component:my-component',
      Component.extend({
        myTask: task(function* (...args) {
          assert.deepEqual(args, [1, 2, 3, 4, 5, 6]);
          return 999;
        }),
      })
    );

    this.owner.register(
      'component:inner-component',
      Component.extend({
        click() {
          return this.curriedTask.perform(4, 5, 6).then((v) => {
            assert.strictEqual(v, 999);
          });
        },
      })
    );

    this.owner.register(
      'template:components/my-component',
      hbs`<InnerComponent @id="my-component" @curriedTask={{task (task this.myTask 1 2) 3}} />`
    );

    await render(hbs`<MyComponent/>`);

    await click('#my-component');
  });
});
