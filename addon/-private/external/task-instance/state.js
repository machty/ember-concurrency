import { GeneratorState } from "../../generator-state";
import { INITIAL_STATE } from "./initial-state";
import {
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  YIELDABLE_THROW,
  YIELDABLE_RETURN,
  YIELDABLE_CANCEL,
  RawValue,
} from '../../utils';


export const PERFORM_TYPE_DEFAULT  = "PERFORM_TYPE_DEFAULT";
export const PERFORM_TYPE_UNLINKED = "PERFORM_TYPE_UNLINKED";
export const PERFORM_TYPE_LINKED   = "PERFORM_TYPE_LINKED";

export const TASK_CANCELATION_NAME = 'TaskCancelation';

/**
 * Returns true if the object passed to it is a TaskCancelation error.
 * If you call `someTask.perform().catch(...)` or otherwise treat
 * a {@linkcode TaskInstance} like a promise, you may need to
 * handle the cancelation of a TaskInstance differently from
 * other kinds of errors it might throw, and you can use this
 * convenience function to distinguish cancelation from errors.
 *
 * ```js
 * click() {
 *   this.get('myTask').perform().catch(e => {
 *     if (!didCancel(e)) { throw e; }
 *   });
 * }
 * ```
 *
 * @param {Object} error the caught error, which might be a TaskCancelation
 * @returns {Boolean}
 */
export function didCancel(e) {
  return e && e.name === TASK_CANCELATION_NAME;
}

import { 
  COMPLETION_SUCCESS,
  COMPLETION_ERROR,
  COMPLETION_CANCEL,
} from "./completion-states"

export class TaskInstanceState {
  constructor(generatorBuilder, name, listener, env) {
    this.generatorState = new GeneratorState(generatorBuilder);
    this.name = name;
    this.listener = listener;
    this.state = Object.assign({}, INITIAL_STATE);
    this.index = 1;
    this.disposers = [];
    this.finalizeCallbacks = [];
    this.env = env;
    this.performType = PERFORM_TYPE_DEFAULT; // TODO
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
  
  proceedChecked(index, yieldResumeType, value) {
    if (this.state.isFinished) { return; }
    if (!this.advanceIndex(index)) { return; }
    this.proceedAsync(yieldResumeType, value);
  }

  proceedAsync(yieldResumeType, value) {
    this.advanceIndex(this.index);
    this.env.async(() => this.proceedSync(yieldResumeType, value))
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
    this.env.assert("expected completion state to be pending", !this.state.isFinished);

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
      this.proceedChecked(resumeIndex, YIELDABLE_CONTINUE, value);
    }, error => {
      this.proceedChecked(resumeIndex, YIELDABLE_THROW, error);
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
    if (typeof maybeDisposer !== 'function') {
      return;
    }

    this.disposers.push(maybeDisposer);
  }

  /**
   * Runs any disposers attached to the task's most recent `yield`.
   * For instance, when a task yields a TaskInstance, it registers that
   * child TaskInstance's disposer, so that if the parent task is canceled,
   * dispose() will run that disposer and cancel the child TaskInstance.
   *
   * @private
   */
  dispose(reason) {
    let disposers = this.disposers;
    if (disposers.length === 0) {
      return;
    }
    this.disposers = [];
    disposers.forEach(disposer => disposer(reason));
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
    if (!this.defer || !this.state.isFinished) { return; }

    if (this.state.completionState === COMPLETION_SUCCESS) {
      this.defer.resolve(this.state.value);
    } else {
      this.defer.reject(this.state.error);
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

  promise() {
    if (!this.defer) {
      this.defer = this.env.defer();
      this.asyncHandlerAttached = true;
      this.maybeResolveDefer();
    }
    return this.defer.promise;
  }

  maybeThrowUnhandledTaskErrorLater() {
    if (!this.asyncHandlerAttached &&
         this.state.completionState === COMPLETION_ERROR &&
         !didCancel(this.state.error)) {
      this.env.async(() => {
        if (!this.asyncHandlerAttached) {
          this.env.reportUncaughtRejection(this.state.error);
        }
      });
    }
  }

  finalize(value, completionState) {
    this.index++;
    let state = {};

    // we probably track this because the yieldable state might be different.
    // some cancel teardowns are slow and async. 
    if (this.state.isCanceling || completionState === COMPLETION_CANCEL) {
      state.isCanceling = true;
      state.isCanceled = true;
      completionState = COMPLETION_CANCEL;
      value = new Error(this.state.cancelReason);

      if (this._debug || Ember.ENV.DEBUG_TASKS) {
        // eslint-disable-next-line no-console
        console.log(this.cancelReason);
      }

      value.name = TASK_CANCELATION_NAME;
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
      let yieldContext = this.listener.getYieldContext();
      let maybeDisposer = yieldedValue[yieldableSymbol](yieldContext, this.index);
      this._addDisposer(maybeDisposer);
    } catch(e) {
      // TODO: handle erroneous yieldable implementation
    }
  }

  onYielded(parent, resumeIndex) {
    this.asyncHandlerAttached = true;

    this.onFinalize(() => {
      let completionState = this.state.completionState;
      if (completionState === COMPLETION_SUCCESS) {
        parent.proceedChecked(resumeIndex, YIELDABLE_CONTINUE, this.state.value);
      } else if (completionState === COMPLETION_ERROR) {
        parent.proceedChecked(resumeIndex, YIELDABLE_THROW, this.state.error);
      } else if (completionState === COMPLETION_CANCEL) {
        parent.proceedChecked(resumeIndex, YIELDABLE_CANCEL, null);
      }
    });

    if (this.performType === PERFORM_TYPE_UNLINKED) {
      return;
    }

    return (reason) => {
      this.detectSelfCancelLoop(reason, parent);
      this.cancel(); // TODO: cancel reason?
    };
  }

  detectSelfCancelLoop(reason, parent) {
    if (this.performType !== PERFORM_TYPE_DEFAULT) {
      return;
    }

    // let parentObj = get(parentTaskInstance, 'task.context');
    // let childObj = get(thisTaskInstance, 'task.context');

    // if (parentObj && childObj &&
    //     parentObj !== childObj &&
    //     parentObj.isDestroying &&
    //     get(thisTaskInstance, 'isRunning')) {
    //   let parentName = `\`${parentTaskInstance.task._propertyName}\``;
    //   let childName = `\`${thisTaskInstance.task._propertyName}\``;
    //   // eslint-disable-next-line no-console
    //   console.warn(`ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${parentName} and child task ${childName}. If you want child task ${childName} to be canceled when parent task ${parentName} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${childName} to keep running after parent task ${parentName} is canceled, change it to \`.unlinked().perform()\``);
    // }
  }
}
