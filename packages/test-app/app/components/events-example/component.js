import Evented from '@ember/object/evented';
import Component from '@ember/component';
import {
  task,
  timeout,
  waitForEvent,
  waitForProperty,
} from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

// Pretending to be jQuery for a very narrow snippet
const $ = (selector) => document.querySelector(selector);

export default class EventsExampleComponent extends Component.extend(Evented) {
  // BEGIN-SNIPPET waitForEvent
  @tracked domEvent = null;
  @tracked jQueryEvent = null;
  @tracked emberEvent = null;

  domEventLoop = task(async () => {
    while (true) {
      let event = await waitForEvent(document.body, 'click');
      this.domEvent = event;
      this.trigger('fooEvent', { v: Math.random() });
    }
  });

  jQueryEvent = null;

  jQueryEventLoop = task(async () => {
    let $body = $('body');
    while (true) {
      let event = await waitForEvent($body, 'click');
      this.jQueryEvent = event;
    }
  });

  emberEvent = null;

  emberEventedLoop = task(async () => {
    while (true) {
      let event = await waitForEvent(this, 'fooEvent');
      this.emberEvent = event;
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
  waiterLoop = task(async () => {
    while (true) {
      await this.waiter.perform();
      await timeout(1500);
    }
  });

  waiter = task(async () => {
    let event = await waitForEvent(document.body, 'click');
    return event;
  });

  // END-SNIPPET

  // BEGIN-SNIPPET waitForProperty
  startAll = task(async () => {
    this.bazValue = 1;
    this.state = 'Start.';
    this.foo.perform();
    this.bar.perform();
    this.baz.perform();
  });

  foo = task(async () => {
    await timeout(500);
  });

  bar = task(async () => {
    await waitForProperty(this, 'foo.isIdle');
    this.state = `${this.state} Foo is idle.`;
    await timeout(500);
    this.bazValue = 42;
    this.state = `${this.state} Bar.`;
  });

  @tracked bazValue = 1;
  @tracked state = '';

  baz = task(async () => {
    let val = await waitForProperty(this, 'bazValue', (v) => v % 2 === 0);
    await timeout(500);
    this.state = `${this.state} Baz got even value ${val}.`;
  });
  // END-SNIPPET
}
