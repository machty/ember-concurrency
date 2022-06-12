import Component from '@ember/component';
import { TaskGenerator, task, timeout } from 'ember-concurrency';


export default class extends Component {
  myTask = task(this, async (ms: number) => {
    await timeout(ms);
    return 'done!';
  });

  performTask() {
    if (this.myTask.isRunning) {
      return;
    }

    this.myTask.perform(1000).then(value => {
      console.log(value.toUpperCase());
    });
  }
}
