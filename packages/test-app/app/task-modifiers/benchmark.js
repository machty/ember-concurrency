// BEGIN-SNIPPET task-modifier-benchmark
// app/task-modifiers/benchmark.js
import { registerModifier } from 'ember-concurrency';

function benchmarkModifier(taskFactory, option) {
  if (!window && !window.performance) {
    return;
  }

  if (option) {
    let taskDefinition = taskFactory.taskDefinition;
    let benchmarkedDefinition = function* (...args) {
      let taskName = taskFactory.name;
      let namespace = `ember-concurrency.${taskName}`;
      window.performance.mark(`${namespace}.start`);

      try {
        yield* taskDefinition(...args);
        window.performance.measure(
          `${namespace}.success`,
          `${namespace}.start`,
        );
      } catch (e) {
        window.performance.measure(`${namespace}.error`, `${namespace}.start`);
        throw e;
      } finally {
        window.performance.measure(
          `${namespace}.runtime`,
          `${namespace}.start`,
        );
      }
    };

    taskFactory.setTaskDefinition(benchmarkedDefinition);
  }
}

registerModifier('benchmark', benchmarkModifier);

export default benchmarkModifier;
// END-SNIPPET
