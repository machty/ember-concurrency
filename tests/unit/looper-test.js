import Ember from 'ember';
import { csp, channel, looper } from 'ember-processes';

module('Unit: Loopers');

test('loopers take a channel name', function(assert) {
  QUnit.stop();
  assert.expect(3);

  let outch = csp.chan();

  let MyObject = Ember.Object.extend({
    myChannel: channel(),
    doStuff: looper('myChannel', function * (value) {
      yield csp.putAsync(outch, value);
    }),
  });

  let obj;
  Ember.run(() => {
    obj = MyObject.create();
    let chan = obj.get('myChannel');

    csp.putAsync(chan, 1);
    csp.putAsync(chan, 2);
    csp.putAsync(chan, 3);
  });

  csp.go(function * () {
    assert.equal(yield outch, 1);
    assert.equal(yield outch, 2);
    assert.equal(yield outch, 3);
    QUnit.start();
  });

  Ember.run(obj, 'destroy');
});

