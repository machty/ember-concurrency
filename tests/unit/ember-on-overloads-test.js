import Ember from 'ember';
import { interval, _numIntervals } from 'ember-concurrency';

module('Unit: overloaded Ember.on');

const Observable = window.Rx.Observable;

test("Ember.on ", function(assert) {
  assert.expect(3);

  let Obj = Ember.Object.extend({
    oldschool: Ember.on('init', function() {
      assert.ok(this instanceof Obj);
    }),

    newschool: Ember.on('init', function * () {
      assert.ok(this instanceof Obj);
      yield 1;
      yield 1;
      yield 1;
      assert.ok(true, "done");
    }),
  });

  Ember.run(() => {
    Obj.create({ });
  });
});

