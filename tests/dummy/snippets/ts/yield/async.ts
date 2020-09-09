import Component from '@ember/component';
import { task } from 'ember-concurrency-decorators';
import { taskFor } from 'ember-concurrency-ts';
import { JSON } from './utils';

export default class extends Component {
  @task async fetchData(url: string): Promise<JSON> {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  performTask() {
    taskFor(this.fetchData).perform('/api/data.json').then(data => {
      console.log({ data });
    });
  }
}
