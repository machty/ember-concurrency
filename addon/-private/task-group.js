import { TaskGroup as TaskGroupBase } from "./external/task/task-group";
import { TASKABLE_MIXIN } from "./taskable-mixin";
import { TRACKED_INITIAL_TASK_STATE } from "./tracked-state";

export class TaskGroup extends TaskGroupBase { }

if (TRACKED_INITIAL_TASK_STATE) {
  Object.defineProperties(TaskGroup.prototype, TRACKED_INITIAL_TASK_STATE);
}

Object.assign(TaskGroup.prototype, TASKABLE_MIXIN);
