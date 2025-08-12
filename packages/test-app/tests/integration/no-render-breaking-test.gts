import { on } from '@ember/modifier';
import { render } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { modifier } from 'ember-modifier';

const autofocusModifier = modifier(function autofocus(element: HTMLInputElement) {
  element.focus();
});

module('Integration | no render breaking', function (hooks) {
  setupRenderingTest(hooks);

  test('Issue #337 | internal task state updates do not trigger re-render assertions w/ auto-tracking', async function (assert) {
    assert.expect(1);

    class ECTest extends Component {
      focusIn = () => {
        this.exampleTask.perform();
      };

      exampleTask = task(async () => {
        await timeout(100);
      });

      <template><input {{autofocusModifier}} {{on 'focusin' this.focusIn}} /></template>
    }

    await render(<template><ECTest /></template>);
    assert.ok(true, 'Renders');
  });

  test('Issue #340 | internal task state updates in cancellation do not trigger re-render assertions w/ auto-tracking', async function (assert) {
    assert.expect(1);

    class ECTest extends Component {
      get value() {
        this.exampleTask.perform();
        this.exampleTask.perform();
        return 'value';
      }

      exampleTask = task({ restartable: true }, async () => {
        await timeout(100);
      });

      <template>
        <div>{{this.value}}</div>
      </template>
    }

    await render(<template><ECTest /></template>);
    assert.ok(true, 'Renders');
  });
});
