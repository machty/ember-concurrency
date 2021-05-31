import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import idleCallback from 'my-app/yieldables/idle-callback';

export class MyComponent extends Component {
  @task *backgroundTask() {
    while (1) {
      yield idleCallback();

      const data = this.complicatedNumberCrunching();
      yield this.sendData(data);
    }
  }
}
