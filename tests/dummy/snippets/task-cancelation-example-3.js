import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class TaskCancelationExampleComponent extends Component {
  queryServer = task(this, async () => {
    await timeout(10000);
    return 123;
  });

  fetchResults = task(this, async () => {
    let results = await this.queryServer.perform();
    this.set('results', results);
  });
}
