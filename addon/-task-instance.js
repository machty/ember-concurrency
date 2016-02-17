import Ember from 'ember';
import { createObservable } from './utils';

export function Cancelation() {}

function forwardToInternalPromise(method) {
  return function(...args) {
    this._ignorePromiseErrors = true;
    return this._defer.promise[method](...args);
  };
}

let TaskInstance = Ember.Object.extend({
  iterator: null,
  _disposable: null,
  isCanceled: false,
  hasStarted: false,
  _ignorePromiseErrors: false,

  state: Ember.computed('isDropped', 'isCanceled', 'hasStarted', 'isFinished', function() {
    if (this.get('isDropped')) {
      return 'dropped';
    } else if (this.get('isCanceled')) {
      return 'canceled';
    } else if (this.get('isFinished')) {
      return 'finished';
    } else if (this.get('hasStarted')) {
      return 'running';
    } else {
      return 'waiting';
    }
  }),

  isDropped: Ember.computed('isCanceled', 'hasStarted', function() {
    return this.get('isCanceled') && !this.get('hasStarted');
  }),

  _index: 1,
  isFinished: false,
  isRunning: Ember.computed.not('isFinished'),

  init() {
    this._super();
    this._defer = Ember.RSVP.defer();
    this._cancelationIgnorer = this._defer.promise.catch(e => {
      if (this._ignorePromiseErrors) { return; }

      if (e && e.name === 'TaskCancelation' && e.taskInstance === this) {
        // swallow cancelations that belong to the same task.
      } else {
        return Ember.RSVP.reject(e);
      }
    });
    this.iterator = this.fn.apply(this.context, this.args);
  },

  _start() {
    if (this.hasStarted || this.isCanceled) { return this; }
    this.set('hasStarted', true);
    this._proceed(1, undefined);
    return this;
  },

  cancel() {
    if (this.isCanceled) { return; }
    this._rejectWithCancelation();

    // eagerly advance index so that pending promise resolutions
    // are ignored
    this._index++;
    this._proceed(this._index, undefined);
  },

  then:    forwardToInternalPromise('then'),
  catch:   forwardToInternalPromise('catch'),
  finally: forwardToInternalPromise('finally'),

  _rejectWithCancelation() {
    if (this.isCanceled) { return; }
    let error = new Error("TaskCancelation");
    error.name = "TaskCancelation";
    error.taskInstance = this;
    this._reject(error);
    this.set('isCanceled', true);
  },

  _reject(error) {
    this._defer.reject(error);
  },

  _defer: null,
  promise: null,

  _proceed(index, nextValue, method) {
    this._dispose();
    Ember.run.once(this, this._takeStep, index, nextValue, method);
  },

  _hasBegunShutdown: false,
  _hasResolved: false,

  _finalize(value) {
    this.set('isFinished', true);
    this._defer.resolve(value);
    this._dispose();
  },

  _dispose() {
    if (this._disposable) {
      this._disposable.dispose();
      this._disposable = null;
    }
  },

  _takeSafeStep(nextValue, iteratorMethod) {
    try {
      return this.iterator[iteratorMethod](nextValue);
    } catch(e) {
      return { value: e, error: true };
    }
  },

  _takeStep(index, nextValue, method) {
    if (index !== this._index) { return; }

    let result;
    if (this.isCanceled && !this._hasBegunShutdown) {
      this._hasBegunShutdown = true;
      if (this.hasStarted) {
        result = this._takeSafeStep(nextValue, 'return');
      } else {
        // calling .return on an unstarted generator iterator
        // doesn't do the intuitive thing, so just skip it.
        result = { done: true, value: undefined };
      }
    } else {
      result = this._takeSafeStep(nextValue, method || 'next');
    }

    let { done, value, error } = result;

    if (error) {
      this._finalize(Ember.RSVP.reject(value));
      return;
    } else {
      if (done && value === undefined) {
        this.set('isFinished', true);
        this._finalize(nextValue);
        return;
      }
    }

    let observable = normalizeObservable(value);
    if (!observable) {
      // TODO: assert that user is doing something weird?
      this._proceed(index, value);
      return;
    }

    this._disposable = observable.subscribe(v => {
      this._proceed(index, v);
    }, error => {
      this._proceed(index, error, 'throw');
    }, () => {
      // TODO: test, and figure out what it means to yield
      // something that completes without producing a value.
    });
  },
});

function normalizeObservable(value) {
  if (!value) { return null; }

  if (value instanceof TaskInstance) {
    return createObservable(publish => {
      value.then(publish, publish.error);
      return () => {
        value.cancel();
      };
    });
  } else if (typeof value.then === 'function') {
    return createObservable(publish => {
      value.then(publish, publish.error);
      return value.__ec_dispose__;
    });
  } else if (typeof value.subscribe === 'function') {
    // TODO: check for scheduler interface for Rx rather than
    // creating another wrapping observable to schedule on run loop.
    return createObservable(publish => {
      return value.subscribe(publish, publish.error).dispose;
    });
  } else {
    return null;
  }
}

export default TaskInstance;

