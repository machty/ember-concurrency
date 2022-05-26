import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed, set } from '@ember/object';
import { click, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { task } from 'ember-concurrency';
import { taskFor } from 'ember-concurrency-ts';
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
  await render(hbs`<Test />`);

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

module('Integration | async-task-functions', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'template:components/test',
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
    let { promise, resolve } = defer();

    this.owner.register(
      'component:test',
      class extends TestComponent {
        @task async myTask(arg) {
          set(this, 'resolved', await promise);
          return arg;
        }
      }
    );

    await startTest(assert);

    resolve('Wow!');

    await finishTest(assert);
  });

  test('it works when containing an async function', async function (assert) {
    let { promise, resolve } = defer();

    this.owner.register(
      'component:test',
      class extends TestComponent {
        @task async myTask(arg) {
          const result = await Promise.all(
            [promise].map(async function (p) {
              const r = await p;
              return r;
            })
          );
          set(this, 'resolved', result[0]);
          return arg;
        }
      }
    );

    await startTest(assert);

    let { promise: promise2, resolve: resolve2 } = defer();
    resolve(promise2);
    resolve2('Wow!');

    await finishTest(assert);
  });

  test('it works when containing an async arrow function', async function (assert) {
    let { promise, resolve } = defer();

    this.owner.register(
      'component:test',
      class extends TestComponent {
        @task async myTask(arg) {
          const result = await Promise.all(
            [promise].map(async (p) => {
              const r = await p;
              return r;
            })
          );
          set(this, 'resolved', result[0]);
          return arg;
        }
      }
    );

    await startTest(assert);

    let { promise: promise2, resolve: resolve2 } = defer();
    resolve(promise2);
    resolve2('Wow!');

    await finishTest(assert);
  });

  module('taskFor', function () {
    test('it works when using taskFor', async function (assert) {
      let { promise, resolve } = defer();

      this.owner.register(
        'component:test',
        class extends TestComponent {
          @task myTask = taskFor(async function (arg) {
            set(this, 'resolved', await promise);
            return arg;
          });
        }
      );

      await startTest(assert);

      resolve('Wow!');

      await finishTest(assert);
    });

    test('it works when using taskFor containing an async function', async function (assert) {
      let { promise, resolve } = defer();

      this.owner.register(
        'component:test',
        class extends TestComponent {
          @task myTask = taskFor(async function (arg) {
            const result = await Promise.all(
              [promise].map(async function (p) {
                const r = await p;
                return r;
              })
            );
            set(this, 'resolved', result[0]);
            return arg;
          });
        }
      );

      await startTest(assert);

      let { promise: promise2, resolve: resolve2 } = defer();
      resolve(promise2);
      resolve2('Wow!');

      await finishTest(assert);
    });

    test('it works when using taskFor containing an async arrow function', async function (assert) {
      let { promise, resolve } = defer();

      this.owner.register(
        'component:test',
        class extends TestComponent {
          @task myTask = taskFor(async function (arg) {
            const result = await Promise.all(
              [promise].map(async (p) => {
                const r = await p;
                return r;
              })
            );
            set(this, 'resolved', result[0]);
            return arg;
          });
        }
      );

      await startTest(assert);

      let { promise: promise2, resolve: resolve2 } = defer();
      resolve(promise2);
      resolve2('Wow!');

      await finishTest(assert);
    });

    module('arrow function', function () {
      test('it works when using taskFor with an arrow function', async function (assert) {
        let { promise, resolve } = defer();

        this.owner.register(
          'component:test',
          class extends TestComponent {
            @task myTask = taskFor(async (arg) => {
              set(this, 'resolved', await promise);
              return arg;
            });
          }
        );

        await startTest(assert);

        resolve('Wow!');

        await finishTest(assert);
      });

      test('it works when using taskFor with an arrow function containing an async function', async function (assert) {
        let { promise, resolve } = defer();

        this.owner.register(
          'component:test',
          class extends TestComponent {
            @task myTask = taskFor(async (arg) => {
              const result = await Promise.all(
                [promise].map(async function (p) {
                  const r = await p;
                  return r;
                })
              );
              set(this, 'resolved', result[0]);
              return arg;
            });
          }
        );

        await startTest(assert);

        let { promise: promise2, resolve: resolve2 } = defer();
        resolve(promise2);
        resolve2('Wow!');

        await finishTest(assert);
      });

      test('it works when using taskFor with an arrow function containing an async arrow function', async function (assert) {
        let { promise, resolve } = defer();

        this.owner.register(
          'component:test',
          class extends TestComponent {
            @task myTask = taskFor(async (arg) => {
              const result = await Promise.all(
                [promise].map(async (p) => {
                  const r = await p;
                  return r;
                })
              );
              set(this, 'resolved', result[0]);
              return arg;
            });
          }
        );

        await startTest(assert);

        let { promise: promise2, resolve: resolve2 } = defer();
        resolve(promise2);
        resolve2('Wow!');

        await finishTest(assert);
      });
    });
  });
});
