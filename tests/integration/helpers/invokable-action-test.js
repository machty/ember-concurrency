import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { task } from 'ember-concurrency';
import { gte } from 'ember-compatibility-helpers';

module('Integration | Helper | invokable action test', function(hooks) {
  setupRenderingTest(hooks);

  if (!gte("3.20.0")) {
    test('passing a task to the action helper performs it like a regular function', async function(assert) {
      assert.expect(1);

      this.owner.register('component:my-component', Component.extend({
        someTask: task(function * () {
          this.set('status', 'someTask');
        }),
      }));

      this.owner.register('template:components/my-component', hbs`
        <p class="task-status">{{status}}</p>
        <button onclick={{action someTask}} class="action-task">
          Action Task
        </button>
      `);

      await render(hbs`{{my-component}}`);

      await click('.action-task');
      assert.equal(find('.task-status').textContent, 'someTask');
    });
  }
});
