import Ember from 'ember';
import { createObservable } from './utils';

export function Cancelation() {}

function forwardToInternalPromise(method) {
  return function(...args) {
    return this.promise[method](...args);
  };
}

function IgnoreCancelation(e) {
  if (e && e.name === 'TaskCancelation') {
    // prevent RSVP onError
  } else {
    return Ember.RSVP.reject(e);
  }
}

export default Ember.Object.extend({
  iterator: null,
  _disposable: null,
  isCanceled: false,
  hasStarted: false,

  isDropped: Ember.computed('isCanceled', 'hasStarted', function() {
    return this.get('isCanceled') && !this.get('hasStarted');
  }),

  _index: 1,
  isIdle: false,

  init() {
    this._super();
    this._defer = Ember.RSVP.defer();
    this.promise = this._defer.promise;
    this.promise.catch(IgnoreCancelation);
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
    this._reject(error);
    this.set('isCanceled', true);
  },

  _reject(error) {
    this._defer.reject(error);
  },

  _defer: null,
  promise: null,

  _proceed(index, nextValue) {
    this._dispose();
    Ember.run.once(this, this._takeStep, index, nextValue);
  },

  _hasBegunShutdown: false,
  _hasResolved: false,

  _finalize(value) {
    this.set('isIdle', true);
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

  _takeStep(index, nextValue) {
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
      result = this._takeSafeStep(nextValue, 'next');
    }

    let { done, value, error } = result;

    if (error) {
      this._finalize(Ember.RSVP.reject(value));
      return;
    } else {
      if (done && value === undefined) {
        this.set('isIdle', true);
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
      Ember.assert("not implemented yet", false);
    }, () => {
      // TODO: test me
      //opsIterator.proceed(index, NEXT, null); // replace with "no value" token?
    });
  },
});

function normalizeObservable(value) {
  if (value && typeof value.then === 'function') {
    return createObservable(publish => {
      value.then(publish, publish.error);
    });
  } else if (value && typeof value.subscribe === 'function') {
    // TODO: check for scheduler interface for Rx rather than
    // creating another wrapping observable to schedule on run loop.
    return createObservable(publish => {
      return value.subscribe(publish, publish.error).dispose;
    });
  } else {
    return null;
  }
}

