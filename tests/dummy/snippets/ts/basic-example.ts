import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class extends Component {
  myGenericTask = task(async <H, K extends keyof H>(hash: H, key: K): Promise<H[K]> => {
    await timeout(100);
    return hash[key];
  });

  myTask = task(async (ms: number) => {
    await timeout(ms);
    const res = await this.myGenericTask.perform({a: ' done!'}, 'a');
    return res;
  });
}
