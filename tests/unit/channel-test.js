import Ember from 'ember';
import startApp from '../helpers/start-app';
import { csp, channel } from 'ember-processes';

module('Unit: Channels');

let MyObject = Ember.Object.extend({
  myChannel: channel(),
  myChannelBuffered: channel(5),
  myChannelSlidingBuffered: channel(csp.buffers.sliding, 5),
});

test('channel() is a CP constructor that creates channels', function(assert) {
  let obj = MyObject.create();

  let c0 = obj.get('myChannel');
  assert.equal(c0.closed, false);
  assert.ok(!c0.buf);

  let c1 = obj.get('myChannelBuffered');
  assert.equal(c1.closed, false);
  assert.equal(c1.buf.n, 5);

  let c2 = obj.get('myChannelSlidingBuffered');
  assert.equal(c2.closed, false);
  assert.equal(c2.buf.n, 5);
});

test('channel() CPs get auto-closed on host object destruction', function(assert) {

  QUnit.stop();

  let obj = MyObject.create();

  csp.go(function * () {
    let value = yield obj.get('myChannel');
    assert.equal(value, csp.CLOSED);
    QUnit.start();
  });

  Ember.run(() => {
    obj.destroy();
  });
});


