import { later } from '@ember/runloop';
import { render } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | tracked use', function (hooks) {
  setupRenderingTest(hooks);

  test('Issue #343 | Task: tracked use with getter', async function (assert) {
    assert.expect(2);
    const done = assert.async();

    class ECTest extends Component {
      constructor(owner: unknown, args: any) {
        super(owner, args);
        debugger;
        this.exampleTask.perform();
      }

      get value() {
        if (this.exampleTask.last) {
          return this.exampleTask.last.value;
        }
        return null;
      }

      exampleTask = task({ restartable: true }, async () => {
        await timeout(1000);
        return 'done';
      });

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

    render(<template><ECTest /></template>);

    later(() => {
      assert.dom('div').hasText('running');
    }, 400);

    later(() => {
      assert.dom('div').hasText('done');
      done();
    }, 1500);
  });
});
