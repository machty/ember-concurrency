import Component from '@ember/component';
import { task, taskGroup } from 'ember-concurrency';

export default class ExampleComponent extends Component {
  @taskGroup
  someTaskGroup;

  @task({ group: 'someTaskGroup' })
  *doStuff() {
    // ...
  }

  @task({ group: 'someTaskGroup' })
  *doOtherStuff() {
    // ...
  }

  // and then elsewhere
  executeTheTask() {
    // `doStuff` is still a `Task `object that can be `.perform()`ed
    this.doStuff.perform();

    // `someTaskGroup` is still a `TaskGroup` object
    console.log(this.someTaskGroup.isRunning);
  }
}
