import Component from '@ember/component';
import { action } from '@ember/object';
import { didCancel } from 'ember-concurrency';

export default class MyButtonComponent extends Component {
  tagName = '';

  @action onClick() {
    let val = this.action(3, 4);
    if (!val) {
      return;
    }
    val
      .then((v) => {
        if (v !== 10) {
          throw new Error("returned value wasn't 10");
        }
      })
      .catch((e) => {
        if (!didCancel(e)) {
          throw e;
        }
      });
  }
}
