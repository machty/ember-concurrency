import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: EncapsulatedTask', function() {
  test("tasks can be specified via a pojos with perform methods", function(assert) {
    assert.expect(2);

    let defer;
    let Obj = EmberObject.extend({
      myTask: task({
        perform: function * (...args) {
          assert.deepEqual(args, [1,2,3]);
          defer = RSVP.defer();
          yield defer.promise;
          return 123;
        }
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('myTask').perform(1,2,3).then(v => {
        assert.equal(v, 123);
      });
    });
    run(defer, 'resolve');
  });
});