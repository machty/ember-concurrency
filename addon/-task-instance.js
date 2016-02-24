import Ember from 'ember';
import { createObservable, yieldableSymbol } from './utils';

function forwardToInternalPromise(method) {
  return function(...args) {
    this._ignorePromiseErrors = true;
    return this._defer.promise[method](...args);
  };
}

let CURRENT_TASK_INSTANCE;
export function _getRunningTaskInstance() {
  return CURRENT_TASK_INSTANCE;
}

/**
  A `TaskInstance` represent a single execution of a
  {@linkcode Task}. Every call to {@linkcode Task#perform} returns
  a `TaskInstance`.

  `TaskInstance`s are cancelable, either explicitly
  via {@linkcode TaskInstance#cancel} or {@linkcode Task#cancelAll},
  or automatically due to the host object being destroyed, or
  because concurrency policy enforced by a
  {@linkcode TaskProperty Task Modifier} canceled the task instance.

  <style>
    .ignore-this--this-is-here-to-hide-constructor,
    #TaskInstance { display: none }
  </style>

  @class TaskInstance
*/
let taskInstanceAttrs = {
  iterator: null,
  _disposable: null,
  _ignorePromiseErrors: false,
  task: null,

  /**
   * True if the task instance was canceled before it could run to completion.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  isCanceled: false,

  /**
   * True if the task instance has started, else false.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  hasStarted: false,

  /**
   * True if the task has run to completion.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  isFinished: false,

  /**
   * True if the task is still running.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  isRunning: Ember.computed.not('isFinished'),

  /**
   * Describes the state that the task instance is in. Can be used for debugging,
   * or potentially driving some UI state. Possible values are:
   *
   * - `"dropped"`: task instance was canceled before it started
   * - `"canceled"`: task instance was canceled before it could finish
   * - `"finished"`: task instance ran to completion (even if an exception was thrown)
   * - `"running"`: task instance is currently running (returns true even if
   *     is paused on a yielded promise)
   * - `"waiting"`: task instance hasn't begun running yet (usually
   *     because the task is using the {@linkcode TaskProperty#enqueue .enqueue()}
   *     task modifier)
   *
   * The animated timeline examples on the [Task Concurrency](/#/docs/task-concurrency)
   * docs page make use of this property.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
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

  /**
   * True if the TaskInstance was canceled before it could
   * ever start running. For example, calling
   * {@linkcode Task#perform .perform()} twice on a
   * task with the {@linkcode TaskProperty#drop .drop()} modifier applied
   * will result in the second task instance being dropped.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  isDropped: Ember.computed('isCanceled', 'hasStarted', function() {
    return this.get('isCanceled') && !this.get('hasStarted');
  }),

  _index: 1,

  init() {
    this._super(...arguments);
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

  toString() {
    return `<TaskInstance:${Ember.guidFor(this)}> of ${this._origin}`;
  },

  /**
   * Cancels the task instance. Has no effect if the task instance has
   * already been canceled or has already finished running.
   *
   * @method cancel
   * @memberof TaskInstance
   * @instance
   */
  cancel() {
    if (this.isCanceled) { return; }
    this._rejectWithCancelation();

    // eagerly advance index so that pending promise resolutions
    // are ignored
    this._index++;
    this._proceed(this._index, undefined);
  },

  /**
   * Returns a promise that resolves with the value returned
   * from the task's (generator) function, or rejects with
   * either the exception thrown from the task function, or
   * an error with a `.name` property with value `"TaskCancelation"`.
   *
   * @method then
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  then:    forwardToInternalPromise('then'),

  /**
   * @method catch
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  catch:   forwardToInternalPromise('catch'),

  /**
   * @method finally
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
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
      CURRENT_TASK_INSTANCE = this;
      return this.iterator[iteratorMethod](nextValue);
    } catch(e) {
      return { value: e, error: true };
    } finally {
      CURRENT_TASK_INSTANCE = null;
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
};

taskInstanceAttrs[yieldableSymbol] = function () {
  return createObservable(publish => {
    this.then(publish, publish.error);
    return () => {
      this.cancel();
    };
  });
};

let TaskInstance = Ember.Object.extend(taskInstanceAttrs);

function normalizeObservable(value) {
  if (!value) { return null; }

  if (value[yieldableSymbol]) {
    return value[yieldableSymbol]();
  } else if (typeof value.then === 'function') {
    return createObservable(publish => {
      value.then(publish, publish.error);
      return value.__ec_cancel__;
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

