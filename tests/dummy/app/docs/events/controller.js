import Ember from 'ember';
import { task, waitForEvent, timeout } from 'ember-concurrency';

const { $ } = Ember;

export default Ember.Controller.extend(Ember.Evented, {
// BEGIN-SNIPPET waitForEvent
  jQueryEvent: null,
  jQueryEventLoop: task(function * () {
    let $body = $('body');
    while(true) {
      let event = yield waitForEvent($body, 'click');
      this.set('jQueryEvent', event);
      this.trigger('fooEvent', { v: Math.random() });
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
    let event = yield waitForEvent($('body'), 'click');
    return event;
  }),
// END-SNIPPET
});

