import Component from '@ember/component';
import { TaskGenerator, timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
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
