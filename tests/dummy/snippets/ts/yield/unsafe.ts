import Component from '@ember/component';
import { TaskGenerator } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import { taskFor } from 'ember-concurrency-ts';
import { JSON } from './utils';

export default class extends Component {
  @task *fetchData(url: string): TaskGenerator<JSON> {
    let response: Response = yield fetch(url);
    let data: JSON = yield response.json();
    return data;
  }

  performTask() {
    taskFor(this.fetchData).perform('/api/data.json').then(data => {
      console.log({ data });
    });
  }
}
