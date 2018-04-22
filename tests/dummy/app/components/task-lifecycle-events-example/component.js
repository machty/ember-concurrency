import Component from '@ember/component';
import { on } from '@ember/object/evented';
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
  '#DAA520'
];

function loopingAjaxTask(id) {
  return task(function * () {
    while (true) {
      try {
        yield this.get('ajaxTask').perform(id);
      } catch(e) {
        // Ignoring AJAX failures because we're being naughty.
      }
      yield timeout(2000);
    }
  }).on('init');
}

export default Component.extend({
  ajaxTask: task(function * () {
    // simulate slow AJAX
    const ms = 2000 + 2000 * Math.random();
    yield timeout(ms);

    if (parseInt(ms) % 7 === 0) {
      throw new Error("Unexpected matrix glitch");
    }
    return {};
  }).enqueue().maxConcurrency(3).evented(),

  ajaxTaskStarted: on('ajaxTask:started', function(taskInstance) {
    const [id] = taskInstance.args;
    this.log(COLORS[id], `Task ${id}: making AJAX request`);
  }),

  ajaxTaskSucceeded: on('ajaxTask:succeeded', function(taskInstance) {
    const [id] = taskInstance.args;
    this.log(COLORS[id], `Task ${id}: AJAX done`);
  }),

  ajaxTaskErrored: on('ajaxTask:errored', function(taskInstance, error) {
    const [id] = taskInstance.args;
    this.log(COLORS[id], `Task ${id}: AJAX failed because of '${error.message}'`);
  }),

  task0: loopingAjaxTask(0),
  task1: loopingAjaxTask(1),
  task2: loopingAjaxTask(2),
  task3: loopingAjaxTask(3),
  task4: loopingAjaxTask(4),
  task5: loopingAjaxTask(5),
  task6: loopingAjaxTask(6),
  task7: loopingAjaxTask(7),

  log(color, message) {
    let logs = this.logs || [];
    logs.push({ color, message });
    this.set('logs', logs.slice(-7));
  },

  logs: null,
});
// END-SNIPPET

