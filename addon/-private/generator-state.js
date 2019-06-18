import { assert } from '@ember/debug';

export const GENERATOR_STATE_HAS_MORE_VALUES = "HAS_MORE_VALUES";
export const GENERATOR_STATE_DONE_COMPLETE = "COMPLETE";
export const GENERATOR_STATE_DONE_ERRORED = "ERRORED";

export class GeneratorState {
  constructor(generatorBuilder) {
    this.state = GENERATOR_STATE_HAS_MORE_VALUES;
    this.value = null;
    this.done = false;
    this.generatorBuilder = generatorBuilder;
    this.iterator = null;
  }

  resume(nextValue, iteratorMethod) {
    this.assertNotFinished();

    try {
      let iterator = this.getIterator();
      let result = iterator[iteratorMethod](nextValue);

      this.value = result.value;
      if (result.done) {
        this.finalize(GENERATOR_STATE_DONE_COMPLETE);
      } else {
        this.state = GENERATOR_STATE_HAS_MORE_VALUES;
      }
    } catch(e) {
      this.value = e;
      this.finalize(GENERATOR_STATE_DONE_ERRORED);
    } 
  }

  getIterator() {
    if (!this.iterator) {
      this.iterator = this.generatorBuilder();
    }
    return this.iterator;
  }

  finalize(finalState) {
    this.state = finalState;
    this.done = true;
    this.iterator = null;
  }

  assertNotFinished() {
    assert("The task generator function has already run to completion. This is probably an ember-concurrency bug.", !this.done);
  }
}
