import { defer, reject } from 'rsvp'; // TODO: stub this
import { assert } from '@ember/debug';
import { GeneratorState } from "../generator-state";
import { INITIAL_STATE } from "../task-instance-initial-state";
import { run, join, schedule } from '@ember/runloop';
import {
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  YIELDABLE_THROW,
  YIELDABLE_RETURN,
  YIELDABLE_CANCEL,
  RawValue,
} from '../utils';

export const TASK_CANCELATION_NAME = 'TaskCancelation';

import { 
  COMPLETION_PENDING,
  COMPLETION_SUCCESS,
  COMPLETION_ERROR,
  COMPLETION_CANCEL,
} from "../task-instance-completion-states"

export class TaskInstanceState {
  constructor(generatorBuilder, name, listener) {
    this.generatorState = new GeneratorState(generatorBuilder);
    this.name = name;
    this.listener = listener;
    this.state = Object.assign({}, INITIAL_STATE);
    this.index = 1;
    this.disposer = null;
    this.finalizeCallbacks = [];
    this.completionState = COMPLETION_PENDING;
  }

  async(callback) {
    // TODO: make this pluggable
    join(() => schedule('actions', null, callback));
  }

  start() {
    if (this.state.hasStarted || this.state.isCanceling) { return; }
    this.setState({ hasStarted: true });
    this.proceedSync(YIELDABLE_CONTINUE, undefined);
    this.listener.onStarted();
  }

  cancel(sourceCancelReason) {
    if (this.state.isCanceling || this.state.isFinished) { return; }

    let cancelReason = `TaskInstance '${this.name}' was canceled because ${sourceCancelReason}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`;

    this.setState({
      isCanceling: true,
      cancelReason,
    });

    if (this.state.hasStarted) {
      this.proceedAsync(YIELDABLE_CANCEL, null);
    } else {
      this.finalize(null, COMPLETION_CANCEL);
    }
  }

  setState(state) {
    Object.assign(this.state, state);
    this.listener.setState(state);
  }
  
  proceedSafe(index, yieldResumeType, value) {
    if (this.state.isFinished) { return; }
    if (!this.advanceIndex(index)) { return; }
    this.proceedAsync(yieldResumeType, value);
  }

  proceedAsync(yieldResumeType, value) {
    this.advanceIndex(this.index);
    this.async(() => this.proceedSync(yieldResumeType, value))
  }

  proceedSync(yieldResumeType, value) {
    if (this.state.isFinished) { return; }

    if (this.generatorState.done) {
      this.handleResolvedReturnedValue(yieldResumeType, value);
    } else {
      this.handleResolvedContinueValue(yieldResumeType, value);
    }
  }

  handleResolvedReturnedValue(yieldResumeType, value) {
    // decide what to do in the case of `return maybeYieldable`;
    // value is the resolved value of the yieldable. We just
    // need to decide how to finalize.
    assert("expected completion state to be pending", !this.state.isFinished);

    switch(yieldResumeType) {
      case YIELDABLE_CONTINUE:
      case YIELDABLE_RETURN:
        this.finalize(value, COMPLETION_SUCCESS);
        break;
      case YIELDABLE_THROW:
        this.finalize(value, COMPLETION_ERROR);
        break;
      case YIELDABLE_CANCEL:
        this.finalize(null, COMPLETION_CANCEL);
        break;
    }
  }

  handleResolvedContinueValue(_yieldResumeType, resumeValue) {
    let iteratorMethod = _yieldResumeType;
    if (iteratorMethod === YIELDABLE_CANCEL) {
      this.cancelRequested = true;
      iteratorMethod = YIELDABLE_RETURN;
    }

    this.dispose();

    let beforeIndex = this.index;
    let stepResult = this.generatorStep(resumeValue, iteratorMethod);

    // TODO: what is this doing? write breaking test.
    if (!this.advanceIndex(beforeIndex)) {
      return;
    }

    if (stepResult.errored) {
      this.finalize(stepResult.value, COMPLETION_ERROR);
      return;
    }

    this.handleYieldedValue(stepResult);
  }

  handleYieldedUnknownThenable(thenable) {
    let resumeIndex = this.index;
    thenable.then(value => {
      this.proceedSafe(resumeIndex, YIELDABLE_CONTINUE, value);
    }, error => {
      this.proceedSafe(resumeIndex, YIELDABLE_THROW, error);
    });
  }

  /**
   * The TaskInstance internally tracks an index/sequence number
   * (the `index` property) which gets incremented every time the
   * task generator function iterator takes a step. When a task
   * function is paused at a `yield`, there are two events that
   * cause the TaskInstance to take a step: 1) the yielded value
   * "resolves", thus resuming the TaskInstance's execution, or
   * 2) the TaskInstance is canceled. We need some mechanism to prevent
   * stale yielded value resolutions from resuming the TaskFunction
   * after the TaskInstance has already moved on (either because
   * the TaskInstance has since been canceled or because an
   * implementation of the Yieldable API tried to resume the
   * TaskInstance more than once). The `index` serves as
   * that simple mechanism: anyone resuming a TaskInstance
   * needs to pass in the `index` they were provided that acts
   * as a ticket to resume the TaskInstance that expires once
   * the TaskInstance has moved on.
   *
   * @private
   */
  advanceIndex(index) {
    if (this.index === index) {
      return ++this.index;
    }
  }

  handleYieldedValue(stepResult) {
    let yieldedValue = stepResult.value;
    if (!yieldedValue) {
      this.proceedWithSimpleValue(yieldedValue);
      return;
    }

    if (yieldedValue instanceof RawValue) {
      this.proceedWithSimpleValue(yieldedValue.value);
      return;
    }

    this.addDisposer(yieldedValue.__ec_cancel__);

    if (yieldedValue[yieldableSymbol]) {
      this.invokeYieldable(yieldedValue);
    } else if (typeof yieldedValue.then === 'function') {
      this.handleYieldedUnknownThenable(yieldedValue);
    } else {
      this.proceedWithSimpleValue(yieldedValue);
    }
  }

  proceedWithSimpleValue(yieldedValue) {
    this.proceedAsync(YIELDABLE_CONTINUE, yieldedValue);
  }

  addDisposer(maybeDisposer) {
    if (typeof maybeDisposer === 'function') {
      let priorDisposer = this.disposer;
      if (priorDisposer) {
        this.disposer = () => {
          priorDisposer();
          maybeDisposer();
        };
      } else {
        this.disposer = maybeDisposer;
      }
    }
  }

  /**
   * Runs any disposers attached to the task's most recent `yield`.
   * For instance, when a task yields a TaskInstance, it registers that
   * child TaskInstance's disposer, so that if the parent task is canceled,
   * dispose() will run that disposer and cancel the child TaskInstance.
   *
   * @private
   */
  dispose() {
    if (this.disposer) {
      let disposer = this.disposer;
      this.disposer = null;

      // TODO: test erroring disposer
      disposer();
    }
  }

  /**
   * Calls .next()/.throw()/.return() on the task's generator function iterator,
   * essentially taking a single step of execution on the task function.
   *
   * @private
   */
  generatorStep(nextValue, iteratorMethod) {
    // TASK_INSTANCE_STACK.push(this);
    let stepResult = this.generatorState.step(nextValue, iteratorMethod);
    // TASK_INSTANCE_STACK.pop();

    // TODO: fix this
    if (this._expectsLinkedYield) {
      let value = stepResult.value;
      if (!value || value._performType !== PERFORM_TYPE_LINKED) {
        // eslint-disable-next-line no-console
        console.warn("You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency).");
      }
      this._expectsLinkedYield = false;
    }

    return stepResult;
  }

  maybeResolveDefer() {
    if (!this.defer || this.state.isFinished) { return; }

    if (this.completionState === COMPLETION_SUCCESS) {
      this.defer.resolve(this.value);
    } else {
      this.defer.reject(this.error);
    }
  }

  onFinalize(callback) {
    this.finalizeCallbacks.push(callback);

    if (this.state.isFinished) {
      this.runFinalizeCallbacks();
    }
  }

  runFinalizeCallbacks() {
    this.finalizeCallbacks.forEach(cb => cb());
    this.finalizeCallbacks = [];
    this.maybeResolveDefer();
    this.maybeThrowUnhandledTaskErrorLater();
  }

  getPromise() {
    if (!this.defer) {
      this.defer = defer();
      this.maybeResolveDefer();
    }
    return this.defer.promise;
  }

  maybeThrowUnhandledTaskErrorLater() {
    // this backports the Ember 2.0+ RSVP _onError 'after' microtask behavior to Ember < 2.0
    if (!this.hasSubscribed && this.state.completionState === COMPLETION_ERROR) {
      schedule(
        run.backburner.queueNames[run.backburner.queueNames.length - 1],
        () => {
          if (!this._hasSubscribed && !didCancel(this.error)) {
            reject(this.error);
          }
        }
      );
    }
  }

  finalize(value, completionState) {
    this.index++;
    let state = {};

    // we probably track this because the yieldable state might be different.
    // some cancel teardowns are slow and async. 
    if (this.isCanceling || completionState === COMPLETION_CANCEL) {
      state.isCanceling = true;
      completionState = COMPLETION_CANCEL;
      value = new Error(this.cancelReason);

      if (this._debug || Ember.ENV.DEBUG_TASKS) {
        // eslint-disable-next-line no-console
        console.log(this.cancelReason);
      }

      value.name = TASK_CANCELATION_NAME;
      // value.taskInstance = this;
    }

    state.completionState = completionState;

    if (completionState === COMPLETION_SUCCESS) {
      state.isSuccessful = true;
      state.value = value;
    } else if (completionState === COMPLETION_ERROR) {
      state.isError = true;
      state.error = value;
    } else if (completionState === COMPLETION_CANCEL) {
      state.error = value;
    }

    state.isFinished = true;

    this.setState(state);
    this.dispose();
    this.runFinalizeCallbacks();
    this.dispatchFinalizeEvents(completionState);
  }

  dispatchFinalizeEvents(completionState) {
    switch(completionState) {
      case COMPLETION_SUCCESS:
        this.listener.onSuccess();
        break;
      case COMPLETION_ERROR:
        this.listener.onError(this.state.error);
        break;
      case COMPLETION_CANCEL:
        this.listener.onCancel(this.state.cancelReason);
        break;
    }
  }

  invokeYieldable(yieldedValue) {
    try {
      let maybeDisposer = yieldedValue[yieldableSymbol](this, this.index);
      this._addDisposer(maybeDisposer);
    } catch(e) {
      // TODO: handle erroneous yieldable implementation
    }
  }
}
