import { on } from '@ember/modifier';
import { click, render } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { default as taskHelper } from 'ember-concurrency/helpers/task';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Helper | task action', function (hooks) {
  setupRenderingTest(hooks);

  test('task produces a curried version of the task passed into it', async function (assert) {
    assert.expect(2);

    interface InnerComponentSignature {
      Args: {
        id: string;
        curriedTask: any;
      };
    }

    class InnerComponent extends Component<InnerComponentSignature> {
      handleClick = () => {
        return this.args.curriedTask.perform(4, 5, 6).then((v: any) => {
          assert.strictEqual(v, 999);
        });
      };

      <template>
        <button id={{@id}} type='button' {{on 'click' this.handleClick}}>
          Click me
        </button>
      </template>
    }

    class MyComponent extends Component {
      myTask = task(async (...args: any[]) => {
        assert.deepEqual(args, [1, 2, 3, 4, 5, 6]);
        return 999;
      });

      <template>
        <InnerComponent
          @id='my-component'
          @curriedTask={{taskHelper this.myTask 1 2 3}}
        />
      </template>
    }

    await render(<template><MyComponent /></template>);

    await click('#my-component');
  });
});
