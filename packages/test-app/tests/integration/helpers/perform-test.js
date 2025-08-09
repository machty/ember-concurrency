import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Component from '@ember/component';
import { task } from 'ember-concurrency';

module('Integration | helpers | perform', function (hooks) {
  setupRenderingTest(hooks);

  test('can wrap (perform) calls to instrument TaskInstance', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'component:test-swallow-error',
      class extends Component {
        errorGeneratingTask = task(async () => {
          throw new Error('You should not see me!');
        });
      },
    );

    this.owner.register(
      'template:components/test-swallow-error',
      hbs`<button
  type='button'
  {{on 'click' (swallow-error (perform this.errorGeneratingTask))}}
>
  I create an error!
</button>`,
    );

    await render(hbs`<TestSwallowError />`);

    await click('button');

    assert.ok(true);
  });

  test('can pass onError=null to have it swallow errors thrown from task', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'component:test-swallow-error',
      class extends Component {
        errorGeneratingTask = task(async () => {
          throw new Error('You should not see me!');
        })
      },
    );

    this.owner.register(
      'template:components/test-swallow-error',
      hbs`<button
  type='button'
  {{on 'click' (perform this.errorGeneratingTask onError=null)}}
>
  I create an error!
</button>`,
    );

    await render(hbs`<TestSwallowError />`);

    await click('button');

    assert.ok(true);
  });

  test('can pass onError=someFn to have it call someFn(e)', async function (assert) {
    assert.expect(2);

    let error = null;

    this.owner.register(
      'component:test-swallow-error',
      class extends Component {
        errorGeneratingTask = task(async () => {
          throw new Error('You should not see me!');
        })
        errorReport(e) {
          error = e;
        }
      },
    );

    this.owner.register(
      'template:components/test-swallow-error',
      hbs`<button
  type='button'
  {{on 'click' (perform this.errorGeneratingTask onError=this.errorReport)}}
>
  I create an error!
</button>`,
    );

    await render(hbs`<TestSwallowError />`);

    await click('button');

    assert.ok(true);
    assert.ok(error instanceof Error);
  });
});
