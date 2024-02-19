import Component from '@glimmer/component';
import { task, timeout } from '../../../ember-concurrency/declarations';

export default class extends Component {
  myTask = task(async (ms: number) => {
    await timeout(ms);
    return 'done!';
  });
}
