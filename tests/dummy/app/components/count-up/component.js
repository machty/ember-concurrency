import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class CountUpComponent extends Component {
  tagName = '';
  count = 0;

  // BEGIN-SNIPPET count-up
  countUp = task({ on: 'init' }, async () => {
    while (true) {
      this.incrementProperty('count');
      await timeout(100);
    }
  });
  // END-SNIPPET
}
