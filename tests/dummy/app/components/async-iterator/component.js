import Ember from 'ember';
import { task, sleep, asyncIterator } from 'ember-concurrency';

export default Ember.Component.extend({
  bufferType: null,

  myTask: task(function * () {
    this.set('value', "START");
    let obs = window.Rx.Observable.interval(100).take(50 + 1).do(v => {
      if (!this.isDestroyed) {
        this.set('obsValue', v);
      }
    });

    let ai = asyncIterator(obs);
    if (this.bufferType) {
      ai[this.bufferType]();
    }

    while (true) {
      let { value, done } = yield ai.next();
      if (done) { break; }
      this.set('value', value);
      yield sleep(300); // pretend to be some async work
    }
  }).autoStart(),

  obsValue: "NONE",
  value: "INIT",
});

