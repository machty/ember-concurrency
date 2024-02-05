import Component from '@ember/component';
import { enqueueTask, task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET ajax-throttling
function loopingAjaxTask(id, color) {
  return function* () {
    while (true) {
      this.log(color, `Task ${id}: making AJAX request`);
      yield this.ajaxTask.perform();
      this.log(color, `Task ${id}: Done, sleeping.`);
      yield timeout(2000);
    }
  };
}

export default class AjaxThrottlingExampleComponent extends Component {
  tagName = '';
  @tracked logs = [];

  ajaxTask = enqueueTask({ maxConcurrency: 3 }, async () => {
    // simulate slow AJAX
    await timeout(2000 + 2000 * Math.random());
    return {};
  });

  @task({ on: 'init' }) task0 = loopingAjaxTask(0, '#0000FF');
  @task({ on: 'init' }) task1 = loopingAjaxTask(1, '#8A2BE2');
  @task({ on: 'init' }) task2 = loopingAjaxTask(2, '#A52A2A');
  @task({ on: 'init' }) task3 = loopingAjaxTask(3, '#DC143C');
  @task({ on: 'init' }) task4 = loopingAjaxTask(4, '#20B2AA');
  @task({ on: 'init' }) task5 = loopingAjaxTask(5, '#FF1493');
  @task({ on: 'init' }) task6 = loopingAjaxTask(6, '#228B22');
  @task({ on: 'init' }) task7 = loopingAjaxTask(7, '#DAA520');

  log(color, message) {
    this.logs = [...this.logs, { color, message }].slice(-7);
  }
}
// END-SNIPPET
