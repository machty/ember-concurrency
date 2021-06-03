import { INITIAL_STATE } from './initial-state';
import { yieldableSymbol } from '../yieldables';
import { CancelRequest, CANCEL_KIND_EXPLICIT } from './cancelation';
const EXPLICIT_CANCEL_REASON = '.cancel() was explicitly called';

export class BaseTaskInstance {
  constructor({ task, args, executor, performType, hasEnabledEvents }) {
    this.task = task;
    this.args = args;
    this.performType = performType;
    this.executor = executor;
    this.executor.taskInstance = this;
    this.hasEnabledEvents = hasEnabledEvents;
  }

  setState() {}
  onStarted() {}
  onSuccess() {}
  onError() {}
  onCancel() {}
  formatCancelReason() {}
  selfCancelLoopWarning() {}

  onFinalize(callback) {
    this.executor.onFinalize(callback);
  }

  proceed(index, yieldResumeType, value) {
    this.executor.proceedChecked(index, yieldResumeType, value);
  }

  [yieldableSymbol](parentTaskInstance, resumeIndex) {
    return this.executor.onYielded(parentTaskInstance, resumeIndex);
  }

  cancel(cancelReason = EXPLICIT_CANCEL_REASON) {
    this.executor.cancel(new CancelRequest(CANCEL_KIND_EXPLICIT, cancelReason));
  }

  then(...args) {
    return this.executor.promise().then(...args);
  }

  catch(...args) {
    return this.executor.promise().catch(...args);
  }

  finally(...args) {
    return this.executor.promise().finally(...args);
  }

  toString() {
    return `${this.task} TaskInstance`;
  }

  start() {
    this.executor.start();
    return this;
  }
}

Object.assign(BaseTaskInstance.prototype, INITIAL_STATE);
Object.assign(BaseTaskInstance.prototype, {
  state: 'waiting',
  isDropped: false,
  isRunning: true,
});
