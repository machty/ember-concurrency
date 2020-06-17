import Component from '@ember/component';
import { TaskGenerator } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import { taskFor } from 'ember-concurrency-ts';
import { JSON } from './utils';

type Resolved<T> = T extends PromiseLike<infer R> ? R : T;

export default class extends Component {
  @task *fetchData(url: string): TaskGenerator<JSON> {
    let fetchPromise = fetch(url);
    let response: Resolved<typeof fetchPromise> = yield fetchPromise;

    let dataPromise = response.json();
    let data: Resolved<typeof dataPromise> = yield dataPromise;

    return data;
  }

  performTask() {
    taskFor(this.fetchData).perform('/api/data.json').then(data => {
      console.log({ data });
    });
  }
}
