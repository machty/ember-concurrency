import { TaskGroup as TaskGroupBase } from "./external/task/task-group";
import { setTaskableState } from "./utils";

export class TaskGroup extends TaskGroupBase {
  setState(state) {
    setTaskableState(this, state);
  }
}
