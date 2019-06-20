import { Taskable } from "./taskable";

export class Task extends Taskable {
  constructor(options) {
    super(options)
    this.perform = this._perform.bind(this);
  }

  _perform() {}
}
