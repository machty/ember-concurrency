import Ember from 'ember';
import { task } from 'ember-concurrency';

module('Unit: EncapsulatedTask');

test("tasks can be specified via a pojos with perform methods", function(assert) {
  assert.expect(2);

  let defer;
  let Obj = Ember.Object.extend({
    myTask: task({
      perform: function * (...args) {
        assert.deepEqual(args, [1,2,3]);
        defer = Ember.RSVP.defer();
        yield defer.promise;
        return 123;
      }
    }),
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

