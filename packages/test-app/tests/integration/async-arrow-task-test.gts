import { getDebugFunction, setDebugFunction } from '@ember/debug';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { click, render, settled } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { task, type Task } from 'ember-concurrency';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

function defer() {
  let resolve: (value: any) => void = () => {};
  let reject: (reason?: any) => void = () => {};

  let promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}

const originalAssert = getDebugFunction('assert');

class ParentTestComponent extends Component {
  @tracked
  resolved: any = null;

  declare myTask: Task<any, any>;

  get isWaiting() {
    return this.myTask.performCount === 0;
  }

  get isRunning() {
    return this.myTask.isRunning;
  }

  get value() {
    return this.myTask.last?.value;
  }

  <template>
    {{#if this.isWaiting}}
      <button
        id='start'
        type='button'
        {{on 'click' (fn this.myTask.perform 'Done!')}}
      >Start!</button>
    {{else if this.isRunning}}
      Running!
    {{else}}
      Finished!
      <span id='state'>{{this.myTask.state}}</span>
      <span id='value'>{{this.value}}</span>
      <span id='resolved'>{{this.resolved}}</span>
    {{/if}}
  </template>
}

async function startTest(assert: any, TestComponent: any) {
  await render(<template><TestComponent /></template>);

  assert.dom('button#start').hasText('Start!');
  assert.dom().doesNotContainText('Running!');
  assert.dom().doesNotContainText('Finished!');

  await click('button#start');

  assert.dom('button#start').doesNotExist();
  assert.dom().containsText('Running!');
  assert.dom().doesNotContainText('Finished!');
}

async function finishTest(assert: any) {
  await settled();

  assert.dom('button#start').doesNotExist();
  assert.dom().doesNotContainText('Running!');
  assert.dom().containsText('Finished!');
  assert.dom('#state').hasText('idle');
  assert.dom('#value').hasText('Done!');
  assert.dom('#resolved').hasText('Wow!');
}

module('Integration | async-arrow-task', function (hooks: any) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    setDebugFunction('assert', originalAssert);
  });

  test('basic task syntax', async function (this: any, assert) {
    assert.expect(13);

    let { promise, resolve } = defer();

    class TestComponent extends ParentTestComponent {
      myTask = task(async (arg: any) => {
        this.resolved = await promise;
        return arg;
      });
    }

    await startTest(assert, TestComponent);

    resolve('Wow!');

    await finishTest(assert);
  });

  test('basic task with drop modifier', async function (assert) {
    assert.expect(13);

    let { promise, resolve } = defer();

    class TestComponent extends ParentTestComponent {
      myTask = task({ drop: true }, async (arg: any) => {
        this.resolved = await promise;
        return arg;
      });
    }

    await startTest(assert, TestComponent);

    resolve('Wow!');

    await finishTest(assert);
  });
});
