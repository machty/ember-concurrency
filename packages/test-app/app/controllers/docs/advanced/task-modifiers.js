import Controller from '@ember/controller';

// BEGIN-SNIPPET task-modifier-benchmark-on-task
import { task, timeout } from 'ember-concurrency';

// registerModifer is called in the module defining the modifier,
// so we're really just importing it here for the side-effect. This is mostly for
// terseness in this illustration. You may want to separate defining the modifier
// and registering it with registerModifier, and be explicit about where you
// register (e.g. addon, library, or app initialization)
import 'test-app/task-modifiers/benchmark';

let performance =
  typeof window !== 'undefined' && window.performance
    ? window.performance
    : { getEntriesByName() {} };

export default class TaskModifiersController extends Controller {
  doWork = task({ drop: true, benchmark: true }, async () => {
    await timeout(20000 * Math.random());
  });

  get perfEntries() {
    if (this.doWork.isRunning) {
      return [];
    } else {
      return performance.getEntriesByName(
        'ember-concurrency.doWork.runtime',
        'measure',
      );
    }
  }
}
// END-SNIPPET
