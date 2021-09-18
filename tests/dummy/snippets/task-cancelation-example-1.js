import Component from '@ember/component';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class TaskCancelationExampleComponent extends Component {
  @task *queryServer() {
    yield timeout(10000);
    return 123;
  }

  @action
  async fetchResults() {
    let results = await this.queryServer.perform();
    this.set('results', results);
  }
}
