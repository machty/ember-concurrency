import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class CountUpComponent extends Component {
  tagName = '';
  count = 0;
  // BEGIN-SNIPPET count-up
  @task({ on: 'init' })
  *countUp() {
    while (true) {
      this.incrementProperty('count');
      yield timeout(100);
    }
  }
  // END-SNIPPET
}
