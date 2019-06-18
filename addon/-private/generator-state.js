import { assert } from '@ember/debug';

export class GeneratorStepResult {
  constructor(value, done, errored) {
    this.value = value;
    this.done = done;
    this.errored = errored;
  }
}

export class GeneratorState {
  constructor(generatorBuilder) {
    this.done = false;
    this.generatorBuilder = generatorBuilder;
    this.iterator = null;
  }

  step(resolvedValue, iteratorMethod) {
    this.assertNotFinished();

    try {
      let iterator = this.getIterator();
      let { value, done } = iterator[iteratorMethod](resolvedValue);

      if (done) {
        return this.finalize(value, false);
      } else {
        return new GeneratorStepResult(value, false, false);
      }
    } catch(e) {
      return this.finalize(e, true);
    } 
  }

  getIterator() {
    if (!this.iterator) {
      this.iterator = this.generatorBuilder();
    }
    return this.iterator;
  }

  finalize(value, errored) {
    this.done = true;
    this.iterator = null;
    return new GeneratorStepResult(value, true, errored);
  }

  assertNotFinished() {
    assert("The task generator function has already run to completion. This is probably an ember-concurrency bug.", !this.done);
  }
}
