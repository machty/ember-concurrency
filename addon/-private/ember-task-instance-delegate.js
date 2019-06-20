import { TaskInstanceDelegate } from "./external/task-instance/delegate";

export class EmberTaskInstanceDelegate extends TaskInstanceDelegate {
  constructor(taskInstance) {
    super();
    this.taskInstance = taskInstance;
  }

  setState(state) {
    this.taskInstance.setProperties(state);
  }

  onStarted() {
    this.triggerEvent("started", this.taskInstance);
  }

  onSuccess() {
    this.triggerEvent("succeeded", this.taskInstance);
  }

  onError(error) {
    this.triggerEvent("errored", this.taskInstance, error);
  }

  onCancel(cancelReason) {
    this.triggerEvent("canceled", this.taskInstance, cancelReason);
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
    return `TaskInstance '${this.getName()}' was canceled because ${reason}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`;
  }

  getName() {
    if (!this.name) {
      this.name = this.taskInstance.get("task._propertyName") || "<unknown>";
    }
    return this.name;
  }

  selfCancelLoopWarning(parent) {
    let parentName = `\`${parent.getName()}\``;
    let childName = `\`${this.getName()}\``;
    // eslint-disable-next-line no-console
    console.warn(
      `ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${parentName} and child task ${childName}. If you want child task ${childName} to be canceled when parent task ${parentName} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${childName} to keep running after parent task ${parentName} is canceled, change it to \`.unlinked().perform()\``
    );
  }
}
