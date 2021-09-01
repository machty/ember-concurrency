import Evented from '@ember/object/evented';
import Component from '@ember/component';
import {
  task,
  timeout,
  waitForEvent,
  waitForProperty,
} from 'ember-concurrency';

// Pretending to be jQuery for a very narrow snippet
const $ = (selector) => document.querySelector(selector);

export default class EventsExampleComponent extends Component.extend(Evented) {
  // BEGIN-SNIPPET waitForEvent
  domEvent = null;
  @task *domEventLoop() {
    while (true) {
      let event = yield waitForEvent(document.body, 'click');
      this.set('domEvent', event);
      this.trigger('fooEvent', { v: Math.random() });
    }
  }

  jQueryEvent = null;
  @task *jQueryEventLoop() {
    let $body = $('body');
    while (true) {
      let event = yield waitForEvent($body, 'click');
      this.set('jQueryEvent', event);
    }
  }

  emberEvent = null;
  @task *emberEventedLoop() {
    while (true) {
      let event = yield waitForEvent(this, 'fooEvent');
      this.set('emberEvent', event);
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.domEventLoop.perform();
    this.jQueryEventLoop.perform();
    this.emberEventedLoop.perform();
    this.waiterLoop.perform();
  }
  // END-SNIPPET

  // BEGIN-SNIPPET waitForEvent-derived-state
  @task *waiterLoop() {
    while (true) {
      yield this.waiter.perform();
      yield timeout(1500);
    }
  }

  @task *waiter() {
    let event = yield waitForEvent(document.body, 'click');
    return event;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET waitForProperty
  @task *startAll() {
    this.set('bazValue', 1);
    this.set('state', 'Start.');
    this.foo.perform();
    this.bar.perform();
    this.baz.perform();
  }

  @task *foo() {
    yield timeout(500);
  }

  @task *bar() {
    yield waitForProperty(this, 'foo.isIdle');
    this.set('state', `${this.state} Foo is idle.`);
    yield timeout(500);
    this.set('bazValue', 42);
    this.set('state', `${this.state} Bar.`);
  }

  bazValue = 1;
  @task *baz() {
    let val = yield waitForProperty(this, 'bazValue', (v) => v % 2 === 0);
    yield timeout(500);
    this.set('state', `${this.state} Baz got even value ${val}.`);
  }
  // END-SNIPPET
}
