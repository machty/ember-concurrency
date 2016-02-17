import Ember from 'ember';
import { task, timeout, all } from 'ember-concurrency';

const WORDS = ['ember', 'tomster', 'swag', 'yolo', 'turbo', 'ajax'];
function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const ProgressTracker = Ember.Object.extend({
  id: null,
  percent: 0,
  word: null,
});

export default Ember.Controller.extend({
  status: "Waiting...",
  trackers: null,

// BEGIN-SNIPPET joining-tasks
  parent: task(function * () {
    let trackers = [], childTasks = [];
    for (let id = 0; id < 5; ++id) {
      let tracker = ProgressTracker.create({ id });
      trackers.push(tracker);
      childTasks.push(this.get('child').perform(tracker));
    }

    this.set('trackers', trackers);
    this.set('status', "Waiting for child tasks to complete...");
    let words = yield all(childTasks);
    this.set('status', `Done: ${words.join(', ')}`);
  }).restartable(),

  child: task(function * (tracker) {
    let percent = 0;
    yield timeout(500);
    while (percent < 100) {
      percent = Math.min(100, Math.floor(percent + Math.random() * 20));
      tracker.set('percent', percent);
      yield timeout(Math.random() * 100 + 100);
    }
    let word = randomWord();
    tracker.set('word', word);
    return word;
  }).maxConcurrency(3),
// END-SNIPPET

  colors: [ '#ff8888', '#88ff88', '#8888ff' ],
});

