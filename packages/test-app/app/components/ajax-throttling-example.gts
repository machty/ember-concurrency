import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { enqueueTask, task, timeout } from 'ember-concurrency';

export function color(color) {
  return htmlSafe(`color: ${color};`);
}

// BEGIN-SNIPPET ajax-throttling
export default class AjaxThrottlingExample extends Component {
  @tracked logs: Array<{ color: string; message: string }> = [];

  constructor(...args: ConstructorParameters<typeof Component>) {
    super(...args);
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

  loopingAjaxTask = task(async (color: string) => {
    let id = color; // Use color as the id since that's what was likely intended
    while (true) {
      this.log(color, `Task ${id}: making AJAX request`);
      await this.enqueuedAjaxTask.perform();
      this.log(color, `Task ${id}: Done, sleeping.`);
      await timeout(2000);
    }
  });

  log(color: string, message: string) {
    this.logs = [...this.logs, { color, message }].slice(-7);
  }

  <template>
    <div>
      <ul>
        {{#each this.logs as |log|}}
          <li
            style={{color log.color}}
            {{! template-lint-disable no-inline-styles }}
          >{{log.message}}</li>
        {{/each}}
      </ul>
    </div>
  </template>
}
// END-SNIPPET
