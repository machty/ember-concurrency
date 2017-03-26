import Ember from 'ember';

import { isEventedObject } from './utils';

import {
  yieldableSymbol,
  YIELDABLE_CONTINUE
} from './utils';

class WaitForQueueYieldable {
  constructor(queueName) {
    this.queueName = queueName;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    Ember.run.schedule(this.queueName, () => {
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, null);
    });
  }
}

class WaitForEventYieldable {
  constructor(object, eventName) {
    this.object = object;
    this.eventName = eventName;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let fn = (event) => {
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, event);
    };
    this.object.one(this.eventName, fn);
    return () => {
      this.object.off(this.eventName, fn);
    };
  }
}

export function waitForQueue(queueName) {
  return new WaitForQueueYieldable(queueName);
}

export function waitForEvent(object, eventName) {
  Ember.assert(`${object} must include Ember.Evented (or support \`.on()\`, \`.one()\`, and \`.off()\`) to be able to use \`waitForEvent\``, isEventedObject(object));
  return new WaitForEventYieldable(object, eventName);
}

