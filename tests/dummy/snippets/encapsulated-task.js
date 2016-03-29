import { task } from 'ember-concurrency';

export default Component.extend({
  outerFoo: 123,
  regularTask: task(function * () {
    console.log(this.outerFoo); // => 123

    yield doSomeAsync();

    // This prints undefined if encapsulatedTask hasn't yet
    // been performed, otherwise it prints "BAR".
    //
    // This demonstrates how it's possible to reach in and read
    // properties of encapsulated tasks from the outside, but
    // encapsulated tasks don't have access to anything from
    // the "outside world"
    //
    // `encapsulatedTask.last` refers to the most recently
    // perform()ed instance of encapsulatedTask
    console.log(this.get('encapsulatedTask.last.innerBar'));
  }),

  encapsulatedTask: task({
    // `perform` must use generator function syntax
    perform: function * (value) {
      console.log(this.innerFoo); // => 456

      yield doSomeAsync();

      // there is no way to access `outerFoo` without
      // it being explicitly passed in in some way

      // set innerFoo to whatever was
      this.set('innerFoo', value);
    },

    innerFoo: 456,
    innerBar: "BAR",
  })
});

