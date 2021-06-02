export class GeneratorStepResult {
  constructor(value, done, errored) {
    this.value = value;
    this.done = done;
    this.errored = errored;
  }
}

export class GeneratorState {
  constructor(generatorFactory) {
    this.done = false;
    this.generatorFactory = generatorFactory;
    this.iterator = null;
  }

  step(resolvedValue, iteratorMethod) {
    try {
      let iterator = this.getIterator();
      let { value, done } = iterator[iteratorMethod](resolvedValue);

      if (done) {
        return this.finalize(value, false);
      } else {
        return new GeneratorStepResult(value, false, false);
      }
    } catch (e) {
      return this.finalize(e, true);
    }
  }

  getIterator() {
    if (!this.iterator && !this.done) {
      this.iterator = this.generatorFactory();
    }
    return this.iterator;
  }

  finalize(value, errored) {
    this.done = true;
    this.iterator = null;
    return new GeneratorStepResult(value, true, errored);
  }
}
