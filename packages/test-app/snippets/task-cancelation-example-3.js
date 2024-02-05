import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class TaskCancelationExampleComponent extends Component {
  @tracked results = null;

  queryServer = task(async () => {
    await timeout(10000);
    return 123;
  });

  fetchResults = task(async () => {
    let results = await this.queryServer.perform();
    this.results = results;
  });
}
