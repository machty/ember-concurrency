import Component from '@ember/component';
import { enqueueTask, task, timeout } from 'ember-concurrency';

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
  logs = [];

  @enqueueTask({ maxConcurrency: 3 })
  *ajaxTask() {
    // simulate slow AJAX
    yield timeout(2000 + 2000 * Math.random());
    return {};
  }

  @task({ on: 'init' }) task0 = loopingAjaxTask(0, '#0000FF');
  @task({ on: 'init' }) task1 = loopingAjaxTask(1, '#8A2BE2');
  @task({ on: 'init' }) task2 = loopingAjaxTask(2, '#A52A2A');
  @task({ on: 'init' }) task3 = loopingAjaxTask(3, '#DC143C');
  @task({ on: 'init' }) task4 = loopingAjaxTask(4, '#20B2AA');
  @task({ on: 'init' }) task5 = loopingAjaxTask(5, '#FF1493');
  @task({ on: 'init' }) task6 = loopingAjaxTask(6, '#228B22');
  @task({ on: 'init' }) task7 = loopingAjaxTask(7, '#DAA520');

  log(color, message) {
    let logs = this.logs;
    logs.push({ color, message });
    this.set('logs', logs.slice(-7));
  }
}
// END-SNIPPET
