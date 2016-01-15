import Ember from 'ember';
import { channel, process, makePublisher } from 'ember-processes';

module('Unit: Publishers');

test('publishers offer an Observable-esque API for construction / disposal', function(assert) {
  QUnit.stop();
  assert.expect(2);

  let MyObject = Ember.Object.extend(Ember.Evented, {
    myChannel: channel(),
    doStuff: process(function * () {
      // TODO: what about a buffer? maybe first arg?

      // TODO: do we want to require that this is yielded?
      // so that we can scope to parent process and auto close on return.
      // could do something like .autoClose() or .keepAlive() depending
      // on which way we go. Also, would ownership be to process, or
      // host object?
      let channel = makePublisher(publish => {
        // TODO: review this for Zalgo
        let i = 5;
        let handler = (value) => {
          i--;
          if (i === 0) {
            publish.close();
          } else {
            publish(value + 5);
          }
        };

        this.on('foo', handler);
        return () => {
          assert.ok(true);
          this.off('foo', handler);
          QUnit.start();
        };
      });

      let values = [];
      for (;;) {
        let val = yield channel;
        if (!val) { break; }
        values.push(val);
      }

      assert.deepEqual(values, [6,7,8,9]);
    }).autoStart(),
  });

  let obj = MyObject.create();

  Ember.run(() => {
    obj.trigger('foo', 1);
    obj.trigger('foo', 2);
    obj.trigger('foo', 3);
    obj.trigger('foo', 4);
    obj.trigger('foo', 5);
    obj.trigger('foo', 6);
  });

  Ember.run(obj, 'destroy');
});

/*
test('publisher constructors can be generators', function(assert) {
  QUnit.stop();
  let MyObject = Ember.Object.extend({
    myChannel: channel(),
    funSignal: publisher(function * (p) {
      p(1);
      p(yield this.get('myChannel'));
    }),
  });

  let obj = MyObject.create();

  csp.go(function * () {
    let funSignal = obj.get('funSignal');
    let values = [];
    assert.equal(yield funSignal, 1);
    csp.putAsync(obj.get('myChannel'), 2);
    assert.equal(yield funSignal, 2);
    QUnit.start();
  });

  // so the difference between a signal and channel is that...
  //
});


// TODO: do we actually want this?
test('publishers accept an optional buffer', function(assert) {
  let chan = makePublisher(csp.buffers.sliding(33), () => {})
  assert.equal(chan.buf.n, 33);
  chan.close();
});
*/




