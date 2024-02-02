import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default class ExampleComponent extends Component {
  @task
  doStuff = {
    privateState: 123,
    *perform() {
      // ...
    }
  };

  // and then elsewhere
  executeTheTask() {
    // `doStuff` is still a `Task` object that can be `.perform()`ed
    this.doStuff.perform();
    console.log(this.doStuff.isRunning);
  }
}
