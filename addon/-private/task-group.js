import { TaskGroup as TaskGroupBase } from "./external/task/task-group";
import { TASKABLE_MIXIN } from "./taskable-mixin";

export class TaskGroup extends TaskGroupBase { }

Object.assign(TaskGroup.prototype, TASKABLE_MIXIN);
