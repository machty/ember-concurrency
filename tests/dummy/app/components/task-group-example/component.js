import { computed } from '@ember/object';
import Component from '@ember/component';
import { task, timeout, taskGroup } from 'ember-concurrency';

function * shortPause() {
  yield timeout(2000);
}

// BEGIN-SNIPPET task-group-component
export default Component.extend({
  taskGroup: null, // passed-in

  chores:        taskGroup().group('taskGroup'),
  changeDiapers: task(shortPause).group('chores'),
  doDishes:      task(shortPause).group('chores'),
  mowTheLawn:    task(shortPause).group('chores'),

  fun:           taskGroup().group('taskGroup'),
  playGames:     task(shortPause).group('fun'),
  dance:         task(shortPause).group('fun'),
  sing:          task(shortPause).group('fun'),

  tasks: computed(function() {
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

