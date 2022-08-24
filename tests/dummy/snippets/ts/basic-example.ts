import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class extends Component {
  myTask = task(async (ms: number) => {
    await timeout(ms);
    return 'done!';
  });
}
