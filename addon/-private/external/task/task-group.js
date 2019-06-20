import { Taskable } from "./taskable";

export class TaskGroup extends Taskable {
  constructor(context, scheduler, group) {
    super(context, scheduler, group)
  }
}
