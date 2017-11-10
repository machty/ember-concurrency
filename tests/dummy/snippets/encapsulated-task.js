import { task } from 'ember-concurrency';

export default Component.extend({
  outerFoo: 123,
  regularTask: task(function * (value) {
    // this is a classic/regular ember-concurrency task,
    // which has direct access to the host object that it
    // lives on via `this`
    console.log(this.outerFoo); // => 123
    yield doSomeAsync();
    this.set('outerFoo', value);
  }),

  encapsulatedTask: task({
    innerFoo: 456,

    // this `*perform() {}` syntax is valid JavaScript shorthand
    // syntax for `perform: function * () {}`

    *perform(value) {
      // this is an encapulated task. It does NOT have
      // direct access to the host object it lives on, but rather
      // only the properties defined within the POJO passed
      // to the `task()` constructor.
      console.log(this.innerFoo); // => 456

      // `this` is the currently executing TaskInstance, so
      // you can also get classic TaskInstance properties
      // provided by ember-concurrency.
      console.log(this.get('isRunning')); // => true

      yield doSomeAsync();
      this.set('innerFoo', value);
    },
  })
});

