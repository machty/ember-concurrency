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

  domEventLoop = task(this, async () => {
    while (true) {
      let event = await waitForEvent(document.body, 'click');
      this.set('domEvent', event);
      this.trigger('fooEvent', { v: Math.random() });
    }
  });

  jQueryEvent = null;

  jQueryEventLoop = task(this, async () => {
    let $body = $('body');
    while (true) {
      let event = await waitForEvent($body, 'click');
      this.set('jQueryEvent', event);
    }
  });

  emberEvent = null;

  emberEventedLoop = task(this, async () => {
    while (true) {
      let event = await waitForEvent(this, 'fooEvent');
      this.set('emberEvent', event);
    }
  });

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.domEventLoop.perform();
    this.jQueryEventLoop.perform();
    this.emberEventedLoop.perform();
    this.waiterLoop.perform();
  }

  // END-SNIPPET

  // BEGIN-SNIPPET waitForEvent-derived-state
  waiterLoop = task(this, async () => {
    while (true) {
      await this.waiter.perform();
      await timeout(1500);
    }
  });

  waiter = task(this, async () => {
    let event = await waitForEvent(document.body, 'click');
    return event;
  });

  // END-SNIPPET

  // BEGIN-SNIPPET waitForProperty
  startAll = task(this, async () => {
    this.set('bazValue', 1);
    this.set('state', 'Start.');
    this.foo.perform();
    this.bar.perform();
    this.baz.perform();
  });

  foo = task(this, async () => {
    await timeout(500);
  });

  bar = task(this, async () => {
    await waitForProperty(this, 'foo.isIdle');
    this.set('state', `${this.state} Foo is idle.`);
    await timeout(500);
    this.set('bazValue', 42);
    this.set('state', `${this.state} Bar.`);
  });

  bazValue = 1;

  baz = task(this, async () => {
    let val = await waitForProperty(this, 'bazValue', (v) => v % 2 === 0);
    await timeout(500);
    this.set('state', `${this.state} Baz got even value ${val}.`);
  });
  // END-SNIPPET
}
