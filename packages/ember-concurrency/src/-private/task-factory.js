import { assert } from '@ember/debug';
import { TaskFactory as BaseTaskFactory } from './external/task-factory';

import { EMBER_ENVIRONMENT } from './ember-environment';
import EmberScheduler from './scheduler/ember-scheduler';
import { Task } from './task';

export class TaskFactory extends BaseTaskFactory {
  env = EMBER_ENVIRONMENT;

  createTask(context) {
    assert(
      `Cannot create task if a task definition is not provided as generator function`,
      this.taskDefinition,
    );

    let options = this.getTaskOptions(context);

    return new Task(
      Object.assign(
        {
          generatorFactory: (args) => this.taskDefinition.apply(context, args),
        },
        options,
      ),
    );
  }

  getModifier(name) {
    let modifier = super.getModifier(name);

    assert(
      `Task option '${name}' is not recognized as a supported option.`,
      modifier,
    );

    return modifier;
  }

  getScheduler(schedulerPolicy, stateTrackingEnabled) {
    return new EmberScheduler(schedulerPolicy, stateTrackingEnabled);
  }

  // Provided for compatibility with the now-removed ember-concurrency TaskProperty extension
  // methods. TODO: delete this?
  get taskFn() {
    return this.taskDefinition;
  }

  set taskFn(fn) {
    this.setTaskDefinition(fn);
  }
}
