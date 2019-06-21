import { Taskable } from "./taskable";
import { PERFORM_TYPE_LINKED, PERFORM_TYPE_UNLINKED, getRunningInstance } from "../task-instance/executor";

class PerformProxy {
  constructor(task, performType, linkedObject) {
    this.task = task;
    this.performType = performType;
    this.linkedObject = linkedObject;
  }

  perform(...args) {
    debugger;
    return this.task._performShared(
      args,
      this.performType,
      this.linkedObject
    );
  }
}

export class Task extends Taskable {
  constructor(options) {
    super(options)
    this.perform = this._perform.bind(this);
  }

  linked() {
    let linkedObject = getRunningInstance();
    if (!linkedObject) {
      throw new Error(`You can only call .linked() from within a task.`);
    }

    return new PerformProxy(this, PERFORM_TYPE_LINKED, linkedObject);
  }

  unlinked() {
    return new PerformProxy(this, PERFORM_TYPE_UNLINKED, null);
  }

  _perform() {}
}
