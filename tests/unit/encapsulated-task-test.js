import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { gte } from 'ember-compatibility-helpers';
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

  if (gte('3.10.0')) {
    test("encapsulated tasks work with native ES classes and decorators", function(assert) {
      assert.expect(2);

      let defer;

      class FakeGlimmerComponent {
        @(task({
          *perform(...args) {
            assert.deepEqual(args, [1,2,3]);
            defer = RSVP.defer();
            yield defer.promise;
            return 123;
          }
        })) myTask;
      }

      let obj;
      run(() => {
        obj = new FakeGlimmerComponent();
        obj.myTask.perform(1,2,3).then(v => {
          assert.equal(v, 123);
        });
      });
      run(defer, 'resolve');
    });
  }
});
