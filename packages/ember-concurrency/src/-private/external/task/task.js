import { Taskable } from './taskable';
import {
  PERFORM_TYPE_DEFAULT,
  PERFORM_TYPE_LINKED,
  PERFORM_TYPE_UNLINKED,
  getRunningInstance,
  TaskInstanceExecutor,
} from '../task-instance/executor';

class TaskLinkProxy {
  constructor(task, performType, linkedObject) {
    this.task = task;
    this.performType = performType;
    this.linkedObject = linkedObject;
  }

  perform(...args) {
    return this.task._performShared(args, this.performType, this.linkedObject);
  }
}

export class Task extends Taskable {
  constructor(options) {
    super(options);
    this.generatorFactory = options.generatorFactory;
    this.perform = this._perform.bind(this);
  }

  linked() {
    let linkedObject = getRunningInstance();
    if (!linkedObject) {
      throw new Error(`You can only call .linked() from within a task.`);
    }

    return new TaskLinkProxy(this, PERFORM_TYPE_LINKED, linkedObject);
  }

  unlinked() {
    return new TaskLinkProxy(this, PERFORM_TYPE_UNLINKED, null);
  }

  toString() {
    return `<Task:${this.name}>`;
  }

  _clone() {
    return new Task({
      context: this.context,
      debug: this.debug,
      env: this.env,
      generatorFactory: this.generatorFactory,
      group: this.group,
      hasEnabledEvents: this.hasEnabledEvents,
      name: this.name,
      onStateCallback: this.onStateCallback,
      scheduler: this.scheduler,
    });
  }

  _curry(...args) {
    let task = this._clone();
    task._curryArgs = [...(this._curryArgs || []), ...args];
    return task;
  }

  _perform(...args) {
    return this._performShared(args, PERFORM_TYPE_DEFAULT, null);
  }

  _performShared(args, performType, linkedObject) {
    let fullArgs = this._curryArgs ? [...this._curryArgs, ...args] : args;
    let taskInstance = this._taskInstanceFactory(
      fullArgs,
      performType,
      linkedObject
    );

    if (performType === PERFORM_TYPE_LINKED) {
      linkedObject._expectsLinkedYield = true;
    }

    if (!this._isAlive) {
      // a task linked to a dead lifetime should immediately cancel.
      taskInstance.cancel();
    }

    this.scheduler.perform(taskInstance);
    return taskInstance;
  }

  // eslint-disable-next-line no-unused-vars
  _taskInstanceOptions(args, performType, _linkedObject) {
    let generatorFactory = () => this.generatorFactory(args);
    let taskInstanceOptions = {
      task: this,
      args,
      executor: new TaskInstanceExecutor({
        generatorFactory,
        env: this.env,
        debug: this.debug,
      }),
      performType,
      hasEnabledEvents: this.hasEnabledEvents,
    };

    return taskInstanceOptions;
  }
}
