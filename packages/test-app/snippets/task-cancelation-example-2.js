import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { didCancel, task, timeout } from 'ember-concurrency';

export default class TaskCancelationExampleComponent extends Component {
  @tracked results = null;

  queryServer = task(async () => {
    await timeout(10000);
    return 123;
  });

  @action
  async fetchResults() {
    try {
      let results = await this.queryServer.perform();
      this.results = results;
    } catch (e) {
      if (!didCancel(e)) {
        // re-throw the non-cancelation error
        throw e;
      }
    }
  }
}
