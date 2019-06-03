import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { waitForQueue, task } from 'ember-concurrency';
import EmberObject from '@ember/object';
import { reads } from '@ember/object/computed';

module("Integration | reads('task.last.value')", function(hooks) {
  setupRenderingTest(hooks);

  test('Ember Object Model', async function(assert) {
    this.subject = EmberObject.extend({
      task: task(function*() {
        yield waitForQueue('afterRender');
        return 1337;
      }),

      otherTask: task(function*() {
        yield waitForQueue('afterRender');
        return 1337;
      }),

      lastValue: reads('task.last.value')
    }).create();

    await render(
      hbs`reads: {{this.subject.lastValue}}; direct: {{this.subject.task.last.value}};`
    );

    assert.strictEqual(this.element.textContent.trim(), 'reads: ; direct: ;');

    this.subject.otherTask.perform(); // toggle this line
    this.subject.task.perform();

    await settled();

    assert.strictEqual(this.subject.task.last.value, 1337);
    assert.strictEqual(this.subject.lastValue, 1337);
    assert.strictEqual(
      this.element.textContent.trim(),
      'reads: 1337; direct: 1337;'
    );
  });
});
