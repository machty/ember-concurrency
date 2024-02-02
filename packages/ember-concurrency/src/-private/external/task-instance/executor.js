import { GeneratorState } from '../generator-state';
import { INITIAL_STATE } from './initial-state';
import {
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  YIELDABLE_THROW,
  YIELDABLE_RETURN,
  YIELDABLE_CANCEL,
  cancelableSymbol,
} from '../yieldables';

import {
  COMPLETION_SUCCESS,
  COMPLETION_ERROR,
  COMPLETION_CANCEL,
} from './completion-states';
import {
  CancelRequest,
  CANCEL_KIND_YIELDABLE_CANCEL,
  CANCEL_KIND_LIFESPAN_END,
  CANCEL_KIND_PARENT_CANCEL,
  didCancel,
  TASK_CANCELATION_NAME,
} from './cancelation';

export const PERFORM_TYPE_DEFAULT = 'PERFORM_TYPE_DEFAULT';
export const PERFORM_TYPE_UNLINKED = 'PERFORM_TYPE_UNLINKED';
export const PERFORM_TYPE_LINKED = 'PERFORM_TYPE_LINKED';

const CANCEL_RETURN_VALUE_SENTINEL = {};
let TASK_INSTANCE_STACK = [];

export function getRunningInstance() {
  return TASK_INSTANCE_STACK[TASK_INSTANCE_STACK.length - 1];
}

export class TaskInstanceExecutor {
  constructor({ generatorFactory, env, debug }) {
    this.generatorState = new GeneratorState(generatorFactory);
    this.state = Object.assign({}, INITIAL_STATE);
    this.index = 1;
    this.disposers = [];
    this.finalizeCallbacks = [];
    this.env = env;
    this.debug = debug;
    this.cancelRequest = null;
  }

  start() {
    if (this.state.hasStarted || this.cancelRequest) {
      return;
    }
    this.setState({ hasStarted: true });
    this.proceedSync(YIELDABLE_CONTINUE, undefined);
    this.taskInstance.onStarted();
  }

  cancel(cancelRequest) {
    if (!this.requestCancel(cancelRequest)) {
      cancelRequest.finalize();
      return cancelRequest.promise;
    }

    if (this.state.hasStarted) {
      this.proceedWithCancelAsync();
    } else {
      this.finalizeWithCancel();
    }

    return this.cancelRequest.promise;
  }

  setState(state) {
    Object.assign(this.state, state);
    this.taskInstance.setState(this.state);
  }

  proceedChecked(index, yieldResumeType, value) {
    if (this.state.isFinished) {
      return;
    }
    if (!this.advanceIndex(index)) {
      return;
    }

    if (yieldResumeType === YIELDABLE_CANCEL) {
      this.requestCancel(
        new CancelRequest(CANCEL_KIND_YIELDABLE_CANCEL),
        value
      );
      this.proceedWithCancelAsync();
    } else {
      this.proceedAsync(yieldResumeType, value);
    }
  }

  proceedWithCancelAsync() {
    this.proceedAsync(YIELDABLE_RETURN, CANCEL_RETURN_VALUE_SENTINEL);
  }

  proceedAsync(yieldResumeType, value) {
    this.advanceIndex(this.index);
    this.env.async(() => this.proceedSync(yieldResumeType, value));
  }

  proceedSync(yieldResumeType, value) {
    if (this.state.isFinished) {
      return;
    }

    this.dispose();

    if (this.generatorState.done) {
      this.handleResolvedReturnedValue(yieldResumeType, value);
    } else {
      this.handleResolvedContinueValue(yieldResumeType, value);
    }
  }

  /**
   * This method is called when a previously yielded value from
   * the generator has been resolved, and now it's time to pass
   * it back into the generator. There are 3 ways to "resume" a
   * generator:
   *
   * - call `.next(value)` on it, which is used to pass in a resolved
   *   value (the fulfilled value of a promise), e.g. if a task generator fn
   *   does `yield Promise.resolve(5)`, then we take that promise yielded
   *   by the generator, detect that it's a promise, resolve it, and then
   *   pass its fulfilled value `5` back into the generator function so
   *   that it can continue executing.
   * - call `.throw(error)` on it, which throw an exception from where the
   *   the generator previously yielded. We do this when the previously
   *   yielded value resolves to an error value (e.g. a rejected promise
   *   or a TaskInstance that finished with an error). Note that when you
   *   resume a generator with a `.throw()`, it can still recover from that
   *   thrown error and continue executing normally so long as the `yield`
   *   was inside a `try/catch` statement.
   * - call `.return(value)` on it, causes the generator function to return
   *   from where it previously `yield`ed. We use `.return()` when cancelling
   *   a TaskInstance; by `.return`ing, rather than `.throw`ing, it allows
   *   the generator function to skip `catch(e) {}` blocks, which is usually
   *   reserved for actual errors/exceptions; if we `.throw`'d cancellations,
   *   it would require all tasks that used try/catch to conditionally ignore
   *   cancellations, which is annoying. So we `.return()` from generator functions
   *   in the case of errors as a matter of convenience.
   *
   * @private
   */
  handleResolvedContinueValue(iteratorMethod, resumeValue) {
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

  /**
   * This method is called when the generator function is all
   * out of values, and the last value returned from the function
   * (possible a thenable/yieldable/promise/etc) has been resolved.
   *
   * Possible cases:
   * - `return "simple value";` // resolved value is "simple value"
   * - `return undefined;` // (or omitted return) resolved value is undefined
   * - `return someTask.perform()` // resolved value is the value returned/resolved from someTask
   *
   * @private
   */
  handleResolvedReturnedValue(yieldResumeType, value) {
    switch (yieldResumeType) {
      case YIELDABLE_CONTINUE:
      case YIELDABLE_RETURN:
        this.finalize(value, COMPLETION_SUCCESS);
        break;
      case YIELDABLE_THROW:
        this.finalize(value, COMPLETION_ERROR);
        break;
    }
  }

  handleYieldedUnknownThenable(thenable) {
    let resumeIndex = this.index;
    thenable.then(
      (value) => {
        this.proceedChecked(resumeIndex, YIELDABLE_CONTINUE, value);
      },
      (error) => {
        this.proceedChecked(resumeIndex, YIELDABLE_THROW, error);
      }
    );
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

    this.addDisposer(yieldedValue[cancelableSymbol]);

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
  dispose() {
    let disposers = this.disposers;
    if (disposers.length === 0) {
      return;
    }
    this.disposers = [];
    disposers.forEach((disposer) => disposer());
  }

  /**
   * Calls .next()/.throw()/.return() on the task's generator function iterator,
   * essentially taking a single step of execution on the task function.
   *
   * @private
   */
  generatorStep(nextValue, iteratorMethod) {
    TASK_INSTANCE_STACK.push(this);
    let stepResult = this.generatorState.step(nextValue, iteratorMethod);
    TASK_INSTANCE_STACK.pop();

    // TODO: fix this!
    if (this._expectsLinkedYield) {
      let value = stepResult.value;
      if (!value || value.performType !== PERFORM_TYPE_LINKED) {
        // eslint-disable-next-line no-console
        console.warn(
          'You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency).'
        );
      }
      this._expectsLinkedYield = false;
    }

    return stepResult;
  }

  maybeResolveDefer() {
    if (!this.defer || !this.state.isFinished) {
      return;
    }

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
    this.finalizeCallbacks.forEach((cb) => cb());
    this.finalizeCallbacks = [];
    this.maybeResolveDefer();
    this.maybeThrowUnhandledTaskErrorLater();
  }

  promise() {
    if (!this.defer) {
      this.defer = this.env.defer();
      this.asyncErrorsHandled = true;
      this.maybeResolveDefer();
    }
    return this.defer.promise;
  }

  maybeThrowUnhandledTaskErrorLater() {
    if (
      !this.asyncErrorsHandled &&
      this.state.completionState === COMPLETION_ERROR &&
      !didCancel(this.state.error)
    ) {
      this.env.async(() => {
        if (!this.asyncErrorsHandled) {
          this.env.reportUncaughtRejection(this.state.error);
        }
      });
    }
  }

  requestCancel(request) {
    if (this.cancelRequest || this.state.isFinished) {
      return false;
    }
    this.cancelRequest = request;
    return true;
  }

  finalize(value, completionState) {
    if (this.cancelRequest) {
      return this.finalizeWithCancel();
    }

    let state = { completionState };

    if (completionState === COMPLETION_SUCCESS) {
      state.isSuccessful = true;
      state.value = value;
    } else if (completionState === COMPLETION_ERROR) {
      state.isError = true;
      state.error = value;
    } else if (completionState === COMPLETION_CANCEL) {
      state.error = value;
    }

    this.finalizeShared(state);
  }

  finalizeWithCancel() {
    let cancelReason = this.taskInstance.formatCancelReason(
      this.cancelRequest.reason
    );
    let error = new Error(cancelReason);

    if (this.debugEnabled()) {
      // eslint-disable-next-line no-console
      console.log(cancelReason);
    }

    error.name = TASK_CANCELATION_NAME;

    this.finalizeShared({
      isCanceled: true,
      completionState: COMPLETION_CANCEL,
      error,
      cancelReason,
    });

    this.cancelRequest.finalize();
  }

  debugEnabled() {
    return this.debug || this.env.globalDebuggingEnabled();
  }

  finalizeShared(state) {
    this.index++;
    state.isFinished = true;
    this.setState(state);
    this.runFinalizeCallbacks();
    this.dispatchFinalizeEvents(state.completionState);
  }

  dispatchFinalizeEvents(completionState) {
    switch (completionState) {
      case COMPLETION_SUCCESS:
        this.taskInstance.onSuccess();
        break;
      case COMPLETION_ERROR:
        this.taskInstance.onError(this.state.error);
        break;
      case COMPLETION_CANCEL:
        this.taskInstance.onCancel(this.state.cancelReason);
        break;
    }
  }

  invokeYieldable(yieldedValue) {
    try {
      let maybeDisposer = yieldedValue[yieldableSymbol](
        this.taskInstance,
        this.index
      );
      this.addDisposer(maybeDisposer);
    } catch (e) {
      this.env.reportUncaughtRejection(e);
    }
  }

  /**
   * `onYielded` is called when this task instance has been
   * yielded in another task instance's execution. We take
   * this opportunity to conditionally link up the tasks
   * so that when the parent or child cancels, the other
   * is cancelled.
   *
   * Given the following case:
   *
   * ```js
   * parentTask: task(function * () {
   *   yield otherTask.perform();
   * })
   * ```
   *
   * Then the `parent` param is the task instance that is executing, `this`
   * is the `otherTask` task instance that was yielded.
   *
   * @private
   */
  onYielded(parent, resumeIndex) {
    this.asyncErrorsHandled = true;

    this.onFinalize(() => {
      let completionState = this.state.completionState;
      if (completionState === COMPLETION_SUCCESS) {
        parent.proceed(resumeIndex, YIELDABLE_CONTINUE, this.state.value);
      } else if (completionState === COMPLETION_ERROR) {
        parent.proceed(resumeIndex, YIELDABLE_THROW, this.state.error);
      } else if (completionState === COMPLETION_CANCEL) {
        parent.proceed(resumeIndex, YIELDABLE_CANCEL, null);
      }
    });

    let performType = this.getPerformType();
    if (performType === PERFORM_TYPE_UNLINKED) {
      return;
    }

    return () => {
      this.detectSelfCancelLoop(performType, parent);
      this.cancel(new CancelRequest(CANCEL_KIND_PARENT_CANCEL));
    };
  }

  getPerformType() {
    return this.taskInstance.performType || PERFORM_TYPE_DEFAULT;
  }

  detectSelfCancelLoop(performType, parent) {
    if (performType !== PERFORM_TYPE_DEFAULT) {
      return;
    }

    let parentCancelRequest = parent.executor && parent.executor.cancelRequest;

    // Detect that the parent was cancelled by a lifespan ending and
    // that the child is still running and not cancelled.
    if (
      parentCancelRequest &&
      parentCancelRequest.kind === CANCEL_KIND_LIFESPAN_END &&
      !this.cancelRequest &&
      !this.state.isFinished
    ) {
      this.taskInstance.selfCancelLoopWarning(parent);
    }
  }
}
