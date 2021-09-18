import Component from '@ember/component';
import { addListener, removeListener } from '@ember/object/events';
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

function loopingAjaxTask(id) {
  return function* () {
    while (true) {
      try {
        yield this.ajaxTask.perform(id);
      } catch (e) {
        // Ignoring AJAX failures because we're being naughty.
      }
      yield timeout(2000);
    }
  };
}

export default class TaskLifecycleEventsExample extends Component {
  tagName = '';

  logs = [];

  constructor() {
    super(...arguments);

    addListener(this, 'ajaxTask:started', this, this.ajaxTaskStarted);
    addListener(this, 'ajaxTask:succeeded', this, this.ajaxTaskSucceeded);
    addListener(this, 'ajaxTask:errored', this, this.ajaxTaskErrored);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    removeListener(this, 'ajaxTask:started', this, this.ajaxTaskStarted);
    removeListener(this, 'ajaxTask:succeeded', this, this.ajaxTaskSucceeded);
    removeListener(this, 'ajaxTask:errored', this, this.ajaxTaskErrored);
  }

  @task({ enqueue: true, maxConcurrency: 3, evented: true })
  *ajaxTask() {
    // simulate slow AJAX
    const ms = 2000 + 2000 * Math.random();
    yield timeout(ms);

    if (parseInt(ms) % 7 === 0) {
      throw new Error('Unexpected matrix glitch');
    }
    return {};
  }

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
      `Task ${id}: AJAX failed because of '${error.message}'`
    );
  }

  @task({ on: 'init' }) task0 = loopingAjaxTask(0);
  @task({ on: 'init' }) task1 = loopingAjaxTask(1);
  @task({ on: 'init' }) task2 = loopingAjaxTask(2);
  @task({ on: 'init' }) task3 = loopingAjaxTask(3);
  @task({ on: 'init' }) task4 = loopingAjaxTask(4);
  @task({ on: 'init' }) task5 = loopingAjaxTask(5);
  @task({ on: 'init' }) task6 = loopingAjaxTask(6);
  @task({ on: 'init' }) task7 = loopingAjaxTask(7);

  log(color, message) {
    let logs = this.logs;
    logs.push({ color, message });
    this.set('logs', logs.slice(-7));
  }
}
// END-SNIPPET
