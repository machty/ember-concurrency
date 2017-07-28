import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { taskGroup } from 'ember-concurrency';

// BEGIN-SNIPPET task-groups
export default Controller.extend({
  everything:         taskGroup(),
  everythingDropped:  taskGroup().drop(),
  everythingEnqueue:  taskGroup().enqueue(),
  everythingRestart:  taskGroup().restartable(),
  everythingDropped3: taskGroup().maxConcurrency(3).drop(),
  everythingEnqueue3: taskGroup().maxConcurrency(3).enqueue(),
  everythingRestart3: taskGroup().maxConcurrency(3).restartable(),

  taskGroups: computed(function () {
    return [
      this.get('everything'),
      this.get('everythingDropped'),
      this.get('everythingEnqueue'),
      this.get('everythingRestart'),
      this.get('everythingDropped3'),
      this.get('everythingEnqueue3'),
      this.get('everythingRestart3'),
    ];
  }),
});
// END-SNIPPET

