// app/yieldables/idle-callback.js
import { Yieldable } from 'ember-concurrency';

class IdleCallbackYieldable extends Yieldable {
  onYield(state) {
    let callbackId = requestIdleCallback(() => state.next());

    return () => cancelIdleCallback(callbackId);
  }
}

export const idleCallback = () => new IdleCallbackYieldable();

export default idleCallback;
