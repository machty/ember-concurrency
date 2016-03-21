import Ember from 'ember';
import { task, Performable } from 'ember-concurrency';

module('Unit: Performable');

test("Performables can be used instead of generator functions", function(assert) {
  assert.expect(2);

  let defer;
  let MyPerformable = Performable.extend({
    perform: function * (...args) {
      assert.deepEqual(args, [1,2,3]);
      defer = Ember.RSVP.defer();
      yield defer.promise;
      return 123;
    }
  });

  let Obj = Ember.Object.extend({
    myTask: task(MyPerformable),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('myTask').perform(1,2,3).then(v => {
      assert.equal(v, 123);
    });
  });
  Ember.run(defer, 'resolve');
});

