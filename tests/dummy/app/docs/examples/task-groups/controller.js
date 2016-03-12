import Ember from 'ember';
import { task, taskGroup, timeout } from 'ember-concurrency';

function * shortPause() {
  yield timeout(1500);
}

// BEGIN-SNIPPET task-groups
export default Ember.Controller.extend({
  everything:    taskGroup().drop(),

  chores:        taskGroup().group('everything'),
  changeDiapers: task(shortPause).group('chores'),
  doDishes:      task(shortPause).group('chores'),
  mowTheLawn:    task(shortPause).group('chores'),

  fun:           taskGroup().group('everything'),
  playGames:     task(shortPause).group('fun'),
  dance:         task(shortPause).group('fun'),
  sing:          task(shortPause).group('fun'),

  tasks: Ember.computed(function() {
    return [
      this.get('changeDiapers'),
      this.get('doDishes'),
      this.get('mowTheLawn'),
      this.get('playGames'),
      this.get('dance'),
      this.get('sing'),
    ];
  }),
});
// END-SNIPPET

