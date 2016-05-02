import Ember from 'ember';

import { didCancel } from 'ember-concurrency';

export default Ember.Component.extend({
  click() {
    let val = this.attrs.action(3, 4);
    if (!val) { return; }
    val.then(v => {
      if (v !== 10) {
        throw new Error("returned value wasn't 10");
      }
    }).catch(e => {
      if (!didCancel(e)) {
        throw e;
      }
    });
  }
});

