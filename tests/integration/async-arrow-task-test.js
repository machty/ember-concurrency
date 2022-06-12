import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed, set } from '@ember/object';
import { click, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { task } from 'ember-concurrency';
import Component from '@glimmer/component';

function defer() {
  let resolve, reject;

  let promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}

class TestComponent extends Component {
  resolved = null;

  @computed('myTask.performCount')
  get isWaiting() {
    return this.myTask.performCount === 0;
  }

  @computed('myTask.isRunning')
  get isRunning() {
    return this.myTask.isRunning;
  }

  @computed('myTask.last.value')
  get value() {
    return this.myTask.last.value;
  }
}

async function startTest(assert) {
  await render(hbs`<TestAsyncArrowTask />`);

  assert.dom('button#start').hasText('Start!');
  assert.dom().doesNotContainText('Running!');
  assert.dom().doesNotContainText('Finished!');

  await click('button#start');

  assert.dom('button#start').doesNotExist();
  assert.dom().containsText('Running!');
  assert.dom().doesNotContainText('Finished!');
}

async function finishTest(assert) {
  await settled();

  assert.dom('button#start').doesNotExist();
  assert.dom().doesNotContainText('Running!');
  assert.dom().containsText('Finished!');
  assert.dom('#state').hasText('idle');
  assert.dom('#value').hasText('Done!');
  assert.dom('#resolved').hasText('Wow!');
}

module('Integration | async-arrow-task', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'template:components/test-async-arrow-task',
      hbs`
      {{#if this.isWaiting}}
        <button id="start" {{on "click" (perform this.myTask "Done!")}}>Start!</button>
      {{else if this.isRunning}}
        Running!
        {{else}}
        Finished!
        <span id="state">{{this.myTask.state}}</span>
        <span id="value">{{this.value}}</span>
        <span id="resolved">{{this.resolved}}</span>
      {{/if}}
    `
    );
  });

  test('it works', async function (assert) {
    assert.expect(12);

    let { promise, resolve } = defer();

    this.owner.register(
      'component:test-async-arrow-task',
      class extends TestComponent {
        myTask = task(this, async (arg) => {
          set(this, 'resolved', await promise);
          return arg;
        });
      }
    );

    await startTest(assert);

    resolve('Wow!');

    await finishTest(assert);
  });
});
