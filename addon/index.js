import Ember from 'ember';
import { isGeneratorIterator, createObservable } from './utils';
import { TaskProperty, forEach } from './-task-property';
import { EventedObservable } from './-evented-observable';
import { Cancelation } from './-task-instance';

let testGenFn = function * () {};
let testIter = testGenFn();
Ember.assert(`ember-concurrency requires that you set babel.includePolyfill to true in your ember-cli-build.js (or Brocfile.js) to ensure that the generator function* syntax is properly transpiled, e.g.:

  var app = new EmberApp({
    babel: {
      includePolyfill: true,
    }
  });`, isGeneratorIterator(testIter));

export function task(func) {
  return new TaskProperty(func);
}

Ember.Evented.reopen({
  on() {
    if (arguments.length === 1) {
      return EventedObservable.create({ obj: this, eventName: arguments[0] });
    } else {
      return this._super.apply(this, arguments);
    }
  },
});

export let _numIntervals = 0;
export function interval(ms) {
  return createObservable(publish => {
    let intervalId = setInterval(publish, ms);
    _numIntervals++;
    return () => {
      clearInterval(intervalId);
      _numIntervals--;
    };
  });
}

export function timeout(ms) {
  return interval(ms);
}

export { createObservable, forEach, Cancelation };


