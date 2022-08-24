import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';

export default class extends Component {
  myTask = task(this, async (ms: number) => {
    await timeout(ms);
    return 'done!';
  });

  @action
  performTask() {
    if (this.myTask.isRunning) {
      return;
    }

    this.myTask.perform(1000).then(value => {
      console.log(value.toUpperCase());
    });
  }
}
