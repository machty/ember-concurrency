import {Promise} from 'rsvp';
import {later, cancel} from '@ember/runloop';
import {yieldableSymbol, YIELDABLE_CONTINUE} from './yieldables';

export class TimeoutPromise {
  constructor(ms) {
    this.ms = ms;
  }

  then() {
    let timerId;
    let promise = new Promise(r => {
      timerId = later(() => {
        r();
      }, this.ms);
    });
    promise.__ec_cancel__ = () => {
      cancel(timerId);
    };
    return promise;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let timerId = later(() => {
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, null);
    }, this.ms);
    return () => {
      cancel(timerId);
    };
  }
}
