import { on } from '@ember/modifier';
import { click, render } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | helpers | perform', function (hooks) {
  setupRenderingTest(hooks);

  test('can wrap (perform) calls to instrument TaskInstance', async function (assert) {
    assert.expect(1);

    class TestSwallowError extends Component {
      errorGeneratingTask = task(async () => {
        throw new Error('You should not see me!');
      });

      <template>
        <button
          type='button'
          {{on 'click' (swallowError (perform this.errorGeneratingTask))}}
        >
          I create an error!
        </button>
      </template>
    }

    await render(<template><TestSwallowError /></template>);

    await click('button');

    assert.ok(true);
  });

  test('can pass onError=null to have it swallow errors thrown from task', async function (assert) {
    assert.expect(1);

    class TestSwallowError extends Component {
      errorGeneratingTask = task(async () => {
        throw new Error('You should not see me!');
      });

      <template>
        <button
          type='button'
          {{on 'click' (perform this.errorGeneratingTask onError=null)}}
        >
          I create an error!
        </button>
      </template>
    }

    await render(<template><TestSwallowError /></template>);

    await click('button');

    assert.ok(true);
  });

  test('can pass onError=someFn to have it call someFn(e)', async function (assert) {
    assert.expect(2);

    let error = null;

    class TestSwallowError extends Component {
      errorGeneratingTask = task(async () => {
        throw new Error('You should not see me!');
      });

      errorReport = (e: any) => {
        error = e;
      };

      <template>
        <button
          type='button'
          {{on
            'click'
            (perform this.errorGeneratingTask onError=this.errorReport)
          }}
        >
          I create an error!
        </button>
      </template>
    }

    await render(<template><TestSwallowError /></template>);

    await click('button');

    assert.ok(true);
    assert.ok(error instanceof Error);
  });
});

function swallowError(fn: any) {
  return function callAndSwallowError(...args: any[]) {
    try {
      const response = fn(...args);

      if (response.catch) {
        return response.catch(function () {
          // Swallow async error
        });
      }

      return response;
    } catch (e) {
      // Swallow synchronous error
    }
  };
}
