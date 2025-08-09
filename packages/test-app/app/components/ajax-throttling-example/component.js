import Component from '@glimmer/component';
import { enqueueTask, task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET ajax-throttling
export default class AjaxThrottlingExampleComponent extends Component {
  tagName = '';
  @tracked logs = [];

  constructor() {
    super(...arguments);
    this.loopingAjaxTask.perform('#0000FF');
    this.loopingAjaxTask.perform('#8A2BE2');
    this.loopingAjaxTask.perform('#A52A2A');
    this.loopingAjaxTask.perform('#DC143C');
    this.loopingAjaxTask.perform('#20B2AA');
    this.loopingAjaxTask.perform('#FF1493');
    this.loopingAjaxTask.perform('#228B22');
    this.loopingAjaxTask.perform('#DAA520');
  }

  enqueuedAjaxTask = enqueueTask({ maxConcurrency: 3 }, async () => {
    // simulate slow AJAX
    await timeout(2000 + 2000 * Math.random());
    return {};
  });

  loopingAjaxTask = task(async (color) => {
    while (true) {
      this.log(color, `Task ${id}: making AJAX request`);
      await this.enqueuedAjaxTask.perform();
      this.log(color, `Task ${id}: Done, sleeping.`);
      await timeout(2000);
    }
  });

  log(color, message) {
    this.logs = [...this.logs, { color, message }].slice(-7);
  }
}
// END-SNIPPET
