import { makeArray } from '@ember/array';
import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { randomWord } from 'dummy/utils';

// BEGIN-SNIPPET joining-tasks
import { task, timeout, all, race } from 'ember-concurrency';
const methods = { all, race };

const ProgressTracker = EmberObject.extend({
  id: null,
  percent: 0,
  word: null,
});

export default Controller.extend({
  status: "Waiting...",
  trackers: null,

  parent: task(function * (methodName) {
    let allOrRace = methods[methodName];
    let trackers = [], childTasks = [];

    for (let id = 0; id < 5; ++id) {
      let tracker = ProgressTracker.create({ id });
      trackers.push(tracker);
      childTasks.push(this.get('child').perform(tracker));
    }

    this.set('trackers', trackers);
    this.set('status', "Waiting for child tasks to complete...");
    let words = yield allOrRace(childTasks);
    this.set('status', `Done: ${makeArray(words).join(', ')}`);
  }).restartable(),

  child: task(function * (tracker) {
    let percent = 0;
    while (percent < 100) {
      yield timeout(Math.random() * 100 + 100);
      percent = Math.min(100, Math.floor(percent + Math.random() * 20));
      tracker.set('percent', percent);
    }
    let word = randomWord();
    tracker.set('word', word);
    return word;
  }).enqueue().maxConcurrency(3),

  colors: [ '#ff8888', '#88ff88', '#8888ff' ],
});
// END-SNIPPET

