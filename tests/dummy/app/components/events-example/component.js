import Evented from '@ember/object/evented';
import Component from '@ember/component';
import $ from 'jquery';
import { task, waitForEvent, waitForProperty, timeout } from 'ember-concurrency';

export default Component.extend(Evented, {
// BEGIN-SNIPPET waitForEvent
  domEvent: null,
  domEventLoop: task(function * () {
    while(true) {
      let event = yield waitForEvent(document.body, 'click');
      this.set('domEvent', event);
      this.trigger('fooEvent', { v: Math.random() });
    }
  }).on('didInsertElement'),

  jQueryEvent: null,
  jQueryEventLoop: task(function * () {
    let $body = $('body');
    while(true) {
      let event = yield waitForEvent($body, 'click');
      this.set('jQueryEvent', event);
    }
  }).on('didInsertElement'),

  emberEvent: null,
  emberEventedLoop: task(function * () {
    while(true) {
      let event = yield waitForEvent(this, 'fooEvent');
      this.set('emberEvent', event);
    }
  }).on('didInsertElement'),
// END-SNIPPET


// BEGIN-SNIPPET waitForEvent-derived-state
  waiterLoop: task(function * () {
    while(true) {
      yield this.get('waiter').perform();
      yield timeout(1500);
    }
  }).on('didInsertElement'),

  waiter: task(function * () {
    let event = yield waitForEvent(document.body, 'click');
    return event;
  }),
// END-SNIPPET

// BEGIN-SNIPPET waitForProperty
  startAll: task(function * () {
    this.set('bazValue', 1);
    this.set('state', "Start.");
    this.get('foo').perform();
    this.get('bar').perform();
    this.get('baz').perform();
  }),

  foo: task(function * () {
    yield timeout(500);
  }),

  bar: task(function * () {
    yield waitForProperty(this, 'foo.isIdle');
    this.set('state', `${this.state} Foo is idle.`);
    yield timeout(500);
    this.set('bazValue', 42);
    this.set('state', `${this.state} Bar.`);
  }),

  bazValue: 1,
  baz: task(function * () {
    let val = yield waitForProperty(this, 'bazValue', (v) => v % 2 === 0);
    yield timeout(500);
    this.set('state', `${this.state} Baz got even value ${val}.`);
  }),
// END-SNIPPET
});
