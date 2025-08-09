import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { task, timeout } from 'ember-concurrency';

module('Integration | no render breaking', function (hooks) {
  setupRenderingTest(hooks);

  test('Issue #337 | internal task state updates do not trigger re-render assertions w/ auto-tracking', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'component:e-c-test',
      class extends Component {
        layout = hbs`<input />`,

        focusIn() {
          this.exampleTask.perform();
        }

        exampleTask = task(async () => {
          await timeout(100);
        });
      }
    );

    await render(hbs`<ECTest {{autofocus}} />`);
    assert.ok(true, 'Renders');
  });

  test('Issue #340 | internal task state updates in cancellation do not trigger re-render assertions w/ auto-tracking', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'component:e-c-test',
      class extends Component {
        layout = hbs`<div>{{this.value}}</div>`;

        get value() {
          this.exampleTask.perform();
          this.exampleTask.perform();

          return 'value';
        }

        exampleTask = task({ restartable: true }, async () => {
          await timeout(100);
        });
      },
    );

    await render(hbs`<ECTest />`);
    assert.ok(true, 'Renders');
  });
});
