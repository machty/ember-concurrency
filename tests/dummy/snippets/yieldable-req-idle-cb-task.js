import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import idleCallback from 'my-app/yieldables/idle-callback';

export class MyComponent extends Component {
  backgroundTask = task(this, async () => {
    while (1) {
      await idleCallback();

      const data = this.complicatedNumberCrunching();
      await this.sendData(data);
    }
  });
}
