import { later } from '@ember/runloop';
import { render } from '@ember/test-helpers';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | classic', function (hooks) {
  setupRenderingTest(hooks);

  test('used with legacy EmberObject.extend({})', async function (assert) {
    assert.expect(2);
    const done = assert.async();

    // eslint-disable-next-line ember/require-tagless-components
    class ECTest extends Component.extend({
      example: task(async () => {
        await timeout(1000);
        return 'done';
      }),
    }) {
      <template>
        <div>
          {{#if this.exampleTask.isRunning}}
            running
          {{else}}
            {{this.value}}
          {{/if}}
        </div>
      </template>
    }

    render(ECTest);

    later(() => {
      assert.dom('div').hasText('running');
    }, 400);

    later(() => {
      assert.dom('div').hasText('done');
      done();
    }, 1500);
  });
});
