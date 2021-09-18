import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class TaskCancelationExampleComponent extends Component {
  @task *queryServer() {
    yield timeout(10000);
    return 123;
  }

  @task *fetchResults() {
    let results = yield this.queryServer.perform();
    this.set('results', results);
  }
}
