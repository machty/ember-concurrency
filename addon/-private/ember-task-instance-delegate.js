import { TaskInstanceDelegate } from "./external/task-instance-delegate";

export class EmberTaskInstanceDelegate extends TaskInstanceDelegate {
  constructor(taskInstance) {
    super();
    this.taskInstance = taskInstance;
  }

  setState(state) {
    this.taskInstance.setProperties(state);
  }

  onStarted() {
    this.triggerEvent('started', this.taskInstance);
  }

  onSuccess() {
    this.triggerEvent('succeeded', this.taskInstance);
  }

  onError(error) {
    this.triggerEvent('errored', this.taskInstance, error);
  }

  onCancel(cancelReason) {
    this.triggerEvent('canceled', this.taskInstance, cancelReason);
  }

  getYieldContext() {
    return this.taskInstance;
  }

  triggerEvent(...allArgs) {
    if (!this.taskInstance._hasEnabledEvents) {
      return;
    }

    let taskInstance = this.taskInstance;
    let task = taskInstance.task;
    let host = task.context;
    let eventNamespace = task && task._propertyName;

    if (host && host.trigger && eventNamespace) {
      let [eventType, ...args] = allArgs;
      host.trigger(`${eventNamespace}:${eventType}`, ...args);
    }
  }

  formatCancelReason(reason) {
    return `TaskInstance '${this.getName()}' was canceled because ${reason}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`
  }

  getName() {
    if (!this.name) {
      this.name = this.taskInstance.get('task._propertyName') || "<unknown>";
    }
    return this.name;
  }
}
