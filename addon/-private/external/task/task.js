import { Taskable } from "./taskable";

export class Task extends Taskable {
  constructor(context, scheduler, group, generatorFactory, onState) {
    super(context, scheduler, group)
    this.generatorFactory = generatorFactory;
    this.onState = onState;
    this.perform = this._perform.bind(this);
  }

  _perform() {}
}
