import { assert } from '@ember/debug';

export const GENERATOR_STATE_BEFORE_CREATE = "BEFORE_CREATE";
export const GENERATOR_STATE_HAS_MORE_VALUES = "HAS_MORE_VALUES";
export const GENERATOR_STATE_DONE = "DONE";
export const GENERATOR_STATE_ERRORED = "ERRORED";

export class GeneratorState {
  constructor(generatorBuilder) {
    this.state = GENERATOR_STATE_BEFORE_CREATE;
    this.value = null;
    this.done = false;
    this.generatorBuilder = generatorBuilder;
    this.iterator = null;
  }

  resume(nextValue, iteratorMethod) {
    assert("The task generator function has already run to completion. This is probably an ember-concurrency bug.", !this.done);

    try {
      let iterator = this.getIterator();
      let result = iterator[iteratorMethod](nextValue);

      this.value = result.value;
      if (result.done) {
        this.done = true;
        this.state = GENERATOR_STATE_DONE;
      } else {
        this.state = GENERATOR_STATE_HAS_MORE_VALUES;
      }
    } catch(e) {
      this.value = e;
      this.state = GENERATOR_STATE_ERRORED;
      this.done = true;
    } 
  }

  getIterator() {
    if (!this.iterator) {
      this.iterator = this.generatorBuilder();
    }
    return this.iterator;
  }
}
