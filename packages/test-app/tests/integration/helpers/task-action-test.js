import Component from '@ember/component';
import { click, render } from '@ember/test-helpers';
import { task } from 'ember-concurrency';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Helper | task action', function (hooks) {
  setupRenderingTest(hooks);

  test('task produces a curried version of the task passed into it', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'component:my-component',
      class extends Component {
        myTask = task(async (...args) => {
          assert.deepEqual(args, [1, 2, 3, 4, 5, 6]);
          return 999;
        });
      },
    );

    this.owner.register(
      'component:inner-component',
      class extends Component {
        click() {
          return this.curriedTask.perform(4, 5, 6).then((v) => {
            assert.strictEqual(v, 999);
          });
        }
      },
    );

    this.owner.register(
      'template:components/my-component',
      hbs`<InnerComponent
  @id='my-component'
  @curriedTask={{task (task this.myTask 1 2) 3}}
/>`,
    );

    await render(hbs`<MyComponent />`);

    await click('#my-component');
  });
});
