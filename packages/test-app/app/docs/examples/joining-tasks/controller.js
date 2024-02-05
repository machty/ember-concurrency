import { makeArray } from '@ember/array';
import Controller from '@ember/controller';
import { randomWord } from 'test-app/utils';

// BEGIN-SNIPPET joining-tasks
import { task, timeout, all, race } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
const methods = { all, race };

export default class JoiningTasksController extends Controller {
  @tracked childTasks = null;
  @tracked colors = ['#ff8888', '#88ff88', '#8888ff'];
  @tracked status = 'Waiting...';
  @tracked id = null;
  @tracked percent = null;

  parent = task({ restartable: true }, async (methodName) => {
    let allOrRace = methods[methodName];
    let childTasks = [];

    for (let id = 0; id < 5; ++id) {
      childTasks.push(this.child.perform(id));
    }

    this.childTasks = childTasks;
    this.status = 'Waiting for child tasks to complete...';
    let words = await allOrRace(childTasks);
    this.status = `Done: ${makeArray(words).join(', ')}`;
  });

  @task({ enqueue: true, maxConcurrency: 3 })
  child = {
    percent: 0,
    id: null,

    *perform(id) {
      this.id = id;
      while (this.percent < 100) {
        yield timeout(Math.random() * 100 + 100);
        let newPercent = Math.min(
          100,
          Math.floor(this.percent + Math.random() * 20),
        );
        this.percent = newPercent;
      }
      return randomWord();
    },
  };
}
// END-SNIPPET
