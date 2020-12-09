import Controller from '@ember/controller';
import { task, taskGroup, timeout } from 'ember-concurrency';

function * taskFn() {
  yield timeout(1500);
}

// BEGIN-SNIPPET task-groups
export default class TaskGroupsController extends Controller {
  @taskGroup({ drop: true }) chores;

  @task({ group: 'chores' }) mowLawn = taskFn;
  @task({ group: 'chores' }) doDishes = taskFn;
  @task({ group: 'chores' }) changeDiapers = taskFn;

  get tasks() {
    return [
      this.mowLawn,
      this.doDishes,
      this.changeDiapers,
    ];
  }
}
// END-SNIPPET
