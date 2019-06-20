export class BaseTaskInstance {
  constructor(task, executor) {
    this.task = task;
    this.executor = executor;
    this.executor.taskInstance = this;
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
}
