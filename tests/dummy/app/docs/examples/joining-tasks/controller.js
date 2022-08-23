import { makeArray } from '@ember/array';
import Controller from '@ember/controller';
import { randomWord } from 'dummy/utils';

// BEGIN-SNIPPET joining-tasks
import { task, timeout, all, race } from 'ember-concurrency';
const methods = { all, race };

export default class JoiningTasksController extends Controller {
  childTasks = null;
  colors = ['#ff8888', '#88ff88', '#8888ff'];
  status = 'Waiting...';

  parent = task(this, { restartable: true }, async (methodName) => {
    let allOrRace = methods[methodName];
    let childTasks = [];

    for (let id = 0; id < 5; ++id) {
      childTasks.push(this.child.perform(id));
    }

    this.set('childTasks', childTasks);
    this.set('status', 'Waiting for child tasks to complete...');
    let words = await allOrRace(childTasks);
    this.set('status', `Done: ${makeArray(words).join(', ')}`);
  });

  @task({ enqueue: true, maxConcurrency: 3 })
  child = {
    percent: 0,
    id: null,

    *perform(id) {
      this.set('id', id);
      while (this.percent < 100) {
        yield timeout(Math.random() * 100 + 100);
        let newPercent = Math.min(
          100,
          Math.floor(this.percent + Math.random() * 20)
        );
        this.set('percent', newPercent);
      }
      return randomWord();
    },
  };
}
// END-SNIPPET
