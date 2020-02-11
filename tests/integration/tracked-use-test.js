import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { later } from '@ember/runloop';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { task, timeout } from 'ember-concurrency';
import { gte } from 'ember-compatibility-helpers';

module('Integration | tracked use', function(hooks) {
  setupRenderingTest(hooks);

  if (gte('3.16.0')) {
    test('Issue #343 | tracked use with getter', async function(assert) {
      assert.expect(2);
      const done = assert.async();

      this.owner.register(
        'component:e-c-test',
        class ECTest extends Component {
          layout = hbs`<div>{{#if this.exampleTask.isRunning}}running{{else}}{{this.value}}{{/if}}</div>`;

          constructor() {
            super(...arguments);
            this.exampleTask.perform();
          }

          get value() {
            if (this.exampleTask.last) {
              return this.exampleTask.last.value;
            }

            return null;
          }

          @(task(function*() {
            yield timeout(1000);
            return 'done';
          }).restartable()) exampleTask;
        }
      );

      render(hbs`<ECTest />`);

      later(() => {
        assert.dom('div').hasText('running');
      }, 400);

      later(() => {
        assert.dom('div').hasText('done');

        done();
      }, 1500);
    });
  }
});
