import { registerDestructor } from '@ember/destroyable';
import { addListener, removeListener } from '@ember/object/events';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET task-lifecycle-events
const COLORS = [
  '#0000FF',
  '#8A2BE2',
  '#A52A2A',
  '#DC143C',
  '#20B2AA',
  '#FF1493',
  '#228B22',
  '#DAA520',
];

export default class TaskLifecycleEventsExample extends Component {
  tagName = '';

  @tracked logs = [];

  constructor() {
    super(...arguments);

    addListener(this, 'ajaxTask:started', this, this.ajaxTaskStarted);
    addListener(this, 'ajaxTask:succeeded', this, this.ajaxTaskSucceeded);
    addListener(this, 'ajaxTask:errored', this, this.ajaxTaskErrored);

    registerDestructor(this, () => {
      removeListener(this, 'ajaxTask:started', this, this.ajaxTaskStarted);
      removeListener(this, 'ajaxTask:succeeded', this, this.ajaxTaskSucceeded);
      removeListener(this, 'ajaxTask:errored', this, this.ajaxTaskErrored);
    });

    this.loopingAjaxTask.perform(0);
    this.loopingAjaxTask.perform(1);
    this.loopingAjaxTask.perform(2);
    this.loopingAjaxTask.perform(3);
    this.loopingAjaxTask.perform(4);
    this.loopingAjaxTask.perform(5);
    this.loopingAjaxTask.perform(6);
    this.loopingAjaxTask.perform(7);
  }

  ajaxTask = task(
    this,
    { enqueue: true, maxConcurrency: 3, evented: true },
    async () => {
      // simulate slow AJAX
      const ms = 2000 + 2000 * Math.random();
      await timeout(ms);

      if (parseInt(ms) % 7 === 0) {
        throw new Error('Unexpected matrix glitch');
      }
      return {};
    },
  );

  loopingAjaxTask = task(async (id) => {
    while (true) {
      try {
        await this.ajaxTask.perform(id);
      } catch (e) {
        // Ignoring AJAX failures because we're being naughty.
      }
      await timeout(2000);
    }
  });

  ajaxTaskStarted(taskInstance) {
    const [id] = taskInstance.args;
    this.log(COLORS[id], `Task ${id}: making AJAX request`);
  }

  ajaxTaskSucceeded(taskInstance) {
    const [id] = taskInstance.args;
    this.log(COLORS[id], `Task ${id}: AJAX done`);
  }

  ajaxTaskErrored(taskInstance, error) {
    const [id] = taskInstance.args;
    this.log(
      COLORS[id],
      `Task ${id}: AJAX failed because of '${error.message}'`,
    );
  }

  log(color, message) {
    this.logs = [...this.logs, { color, message }].slice(-7);
  }
}
// END-SNIPPET
