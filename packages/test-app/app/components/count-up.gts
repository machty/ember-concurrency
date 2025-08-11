import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

interface CountUpSignature {
  Args: {};
}

export default class CountUpComponent extends Component<CountUpSignature> {
  @tracked count = 0;

  constructor(owner: unknown, args: CountUpSignature['Args']) {
    super(owner, args);
    this.countUp.perform();
  }

  // BEGIN-SNIPPET count-up
  countUp = task(async () => {
    while (true) {
      this.count++;
      await timeout(100);
    }
  });
  // END-SNIPPET

  <template>{{this.count}}</template>
}
