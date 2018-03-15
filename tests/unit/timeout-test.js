import { defer } from 'rsvp';
import { A } from '@ember/array';
import Evented from '@ember/object/evented';
import { run, later } from '@ember/runloop';
import EmberObject, { computed } from '@ember/object';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: timeouts', function() {
  test("works with tagged timers", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      timerLoop: task(function * () {
        while(true) {
          // yield timeout(5000, 'my-tag');
          debugger;
          yield timeout(5000);
        }
      })
    });

    let taskInstance;
    run(() => {
      taskInstance = Obj.create().get('timerLoop').perform();
    });

    assert.ok(taskInstance.get('isRunning'));
  });
});

