import Controller from '@ember/controller';
import { restartableTask, task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET child-tasks
export default class ChildTasksController extends Controller {
  status = "Waiting to start";

  @restartableTask *parentTask() {
    this.set('status', "1. Parent: one moment...");
    yield timeout(1000);
    let value = yield this.childTask.perform();
    this.set('status', `5. Parent: child says "${value}"`);
    yield timeout(1000);
    this.set('status', "6. Done!");
  }

  @task *childTask() {
    this.set('status', "2. Child: one moment...");
    yield timeout(1000);
    let value = yield this.grandchildTask.perform();
    this.set('status', `4. Child: grandchild says "${value}"`);
    yield timeout(1000);
    return "What's up";
  }

  @task *grandchildTask() {
    this.set('status', "3. Grandchild: one moment...");
    yield timeout(1000);
    return "Hello";
  }
}
// END-SNIPPET
