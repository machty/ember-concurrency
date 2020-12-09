import Component from '@ember/component';
import { TaskGenerator, task, timeout } from 'ember-concurrency';
import { taskFor } from 'ember-concurrency-ts';
export default class extends Component {
  @task *myTask(ms: number): TaskGenerator<string> {
    yield timeout(ms);
    return 'done!';
  }

  performTask() {
    if (taskFor(this.myTask).isRunning) {
      return;
    }

    taskFor(this.myTask).perform(1000).then(value => {
      console.log(value.toUpperCase());
    });
  }
}
