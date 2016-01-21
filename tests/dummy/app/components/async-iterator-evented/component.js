import Ember from 'ember';
import { process, sleep, asyncIterator } from 'ember-concurrency';

export default Ember.Component.extend(Ember.Evented, {
  bufferType: null,

  myProcess: process(function * () {
    this.set('value', "START");

    let ai = asyncIterator.fromEvent(this, 'onEvent');
    if (this.bufferType) {
      ai[this.bufferType]();
    }

    while (true) {
      let { value, done } = yield ai.next();
      if (done) { break; }
      this.set('value', value.foo);
      yield sleep(800); // pretend to be some async work
    }
  }).autoStart(),

  value: "INIT",

  cachedValue: 0,

  actions: {
    buttonClick() {
      this.incrementProperty('cachedValue');
      this.trigger('onEvent', {
        foo: this.get('cachedValue')
      });
    }
  }
});

