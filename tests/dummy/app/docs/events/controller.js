import Evented from '@ember/object/evented';
import Controller from '@ember/controller';
import $ from 'jquery';
import { task, waitForEvent, timeout } from 'ember-concurrency';

export default Controller.extend(Evented, {
// BEGIN-SNIPPET waitForEvent
  domEvent: null,
  domEventLoop: task(function * () {
    while(true) {
      let event = yield waitForEvent(document.body, 'click');
      this.set('domEvent', event);
      this.trigger('fooEvent', { v: Math.random() });
    }
  }).on('init'),

  jQueryEvent: null,
  jQueryEventLoop: task(function * () {
    let $body = $('body');
    while(true) {
      let event = yield waitForEvent($body, 'click');
      this.set('jQueryEvent', event);
    }
  }).on('init'),

  emberEvent: null,
  emberEventedLoop: task(function * () {
    while(true) {
      let event = yield waitForEvent(this, 'fooEvent');
      this.set('emberEvent', event);
    }
  }).on('init'),
// END-SNIPPET


// BEGIN-SNIPPET waitForEvent-derived-state
  waiterLoop: task(function * () {
    while(true) {
      yield this.get('waiter').perform();
      yield timeout(1500);
    }
  }).on('init'),

  waiter: task(function * () {
    let event = yield waitForEvent(document.body, 'click');
    return event;
  }),
// END-SNIPPET
});
