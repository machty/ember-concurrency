import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET ajax-throttling
function loopingAjaxTask(id, color) {
  return task(function * () {
    while (true) {
      this.log(color, `Task ${id}: making AJAX request`);
      yield this.get('ajaxTask').perform();
      this.log(color, `Task ${id}: Done, sleeping.`);
      yield timeout(2000);
    }
  }).on('init');
}

export default Component.extend({
  ajaxTask: task(function * () {
    // simulate slow AJAX
    yield timeout(2000 + 2000 * Math.random());
    return {};
  }).enqueue().maxConcurrency(3),

  task0: loopingAjaxTask(0, '#0000FF'),
  task1: loopingAjaxTask(1, '#8A2BE2'),
  task2: loopingAjaxTask(2, '#A52A2A'),
  task3: loopingAjaxTask(3, '#DC143C'),
  task4: loopingAjaxTask(4, '#20B2AA'),
  task5: loopingAjaxTask(5, '#FF1493'),
  task6: loopingAjaxTask(6, '#228B22'),
  task7: loopingAjaxTask(7, '#DAA520'),

  log(color, message) {
    let logs = this.logs || [];
    logs.push({ color, message });
    this.set('logs', logs.slice(-7));
  },

  logs: null,
});
// END-SNIPPET

