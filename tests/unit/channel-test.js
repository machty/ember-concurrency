import Ember from 'ember';
import { csp, channel } from 'ember-processes';

module('Unit: Channels');

let MyObject = Ember.Object.extend({
  myChannel: channel(),
  myChannelBuffered: channel(5),
  myChannelSlidingBuffered: channel(csp.buffers.sliding, 5),

  one: channel(),
  two: channel('one', function({foo, bar}) {
    return {
      foobar: foo+bar
    };
  }),
  three: channel('two'),
  four: channel('three', function (foo, bar) {
    return { foo, bar };
  }),
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

/*
test('passing args to channel makes it a mapping proxy', function(assert) {
  QUnit.stop();

  let obj = MyObject.create();

  let one = obj.get('one');
  let two = obj.get('two');
  let three = obj.get('three');
  let four = obj.get('four');

  assert.ok(!one.hasTakers);
  assert.ok(!two.hasTakers);
  assert.ok(!three.hasTakers);
  assert.ok(!four.hasTakers);

  Ember.run(() => {
    // TODO: csp should have an "is generator running fn"
    // it should be able to detect if csp.put happened
    // in a yield or not. It should maintain a queue
    // and then loop through them on latest yield.
    // If the last element in this queue is a put
    // then treat it as a put (and throw an error
    // if it supplies a callback, since that's only
    // for put async).
    // note: we could extend this further to the
    // alts api; rather than array syntax you do:
    // csp.alts([ chan0.put(123), chan1.take() ])
    csp.go(function * () {
      let value = yield obj.get('one');
      assert.deepEqual({ foobar: 7 });
      QUnit.start();
    });
  });

  assert.ok(one.hasTakers);
  assert.ok(two.hasTakers);
  assert.ok(three.hasTakers);
  assert.ok(four.hasTakers);

  // TODO: I can't do this until I spice up js-csp to
  // work with a more general interface of blockables.
  // or perhaps takeables and put-ables, not sure yet.

  Ember.run(() => {
    // TODO: csp should have an "is generator running fn"
    // it should be able to detect if csp.put happened
    // in a yield or not. It should maintain a queue
    // and then loop through them on latest yield.
    // If the last element in this queue is a put
    // then treat it as a put (and throw an error
    // if it supplies a callback, since that's only
    // for put async).
    // note: we could extend this further to the
    // alts api; rather than array syntax you do:
    // csp.alts([ chan0.put(123), chan1.take() ])
    csp.go(function * () {
      let value = yield obj.get('one');
      assert.deepEqual({ foobar: 7 });
      QUnit.start();
    });
  });
});
*/

