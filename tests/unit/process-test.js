import Ember from 'ember';
import { csp, channel, process } from 'ember-processes';

module('Unit: Processes');

test('.autoStart()', function(assert) {
  QUnit.stop();
  assert.expect(2);

  let stops = csp.chan();
  let MyObject = Ember.Object.extend({
    myChannel: channel(),
    doStuff: process(function * () {
      try {
        yield this.get('myChannel');
      } finally {
        csp.putAsync(stops, true);
      }
    }).autoStart(),
  });

  let obj0 = MyObject.create();
  let obj1 = MyObject.create();

  csp.go(function * () {
    assert.ok(yield stops);
    assert.ok(yield stops);
    QUnit.start();
  });

  Ember.run(() => {
    obj0.destroy();
    obj1.destroy();
  });

  // TODO: what happens to processes that the same time
  // as the channels they're blocked on? (this will usually
  // happen if the chan and proc are the same obj).
});

