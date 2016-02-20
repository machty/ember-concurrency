import Ember from 'ember';
import { task, timeout, subscribe, events } from 'ember-concurrency';

const Observable = window.Rx.Observable;

const range = Observable.range;
export default Ember.Controller.extend(Ember.Evented, {
  values: null,

// BEGIN-SNIPPET observables-timetable
  computeStuff: task(function * () {
    let values = Ember.A();
    this.set('values', values);
    yield subscribe(range(5,5), function * (x) {
      yield subscribe(range(10,3), function * (y) {
        values.pushObject({ message: `What is ${x} x ${y} ? ` });
        yield timeout(200);
        values.pushObject({ message: `${x*y}. `});
      }).enqueue();
      values.pushObject({ message: "\n" });
    }).enqueue();
  }).restartable(),
// END-SNIPPET

// BEGIN-SNIPPET observables-evented
  fooStatus: null,
  listenForFooInternally: task(function * () {
    this.set('fooStatus', `Waiting for values...`);

    yield subscribe(events(this, 'foo'), function * (x) {
      this.set('fooStatus', `Got value ${x}, thinking...`);
      yield timeout(1500);
      this.set('fooStatus', `${this.fooStatus} Done`);
      yield timeout(200);
    }).enqueue();
  }).on('init'),

  actions: {
    triggerFoo() {
      this.trigger('foo', Math.floor(100*Math.random()));
    },
  }
// END-SNIPPET
});

