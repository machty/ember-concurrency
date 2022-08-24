import Controller from '@ember/controller';
import { restartableTask, task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET child-tasks
export default class ChildTasksController extends Controller {
  status = 'Waiting to start';

  parentTask = restartableTask(async () => {
    this.set('status', '1. Parent: one moment...');
    await timeout(1000);
    let value = await this.childTask.perform();
    this.set('status', `5. Parent: child says "${value}"`);
    await timeout(1000);
    this.set('status', '6. Done!');
  });

  childTask = task(async () => {
    this.set('status', '2. Child: one moment...');
    await timeout(1000);
    let value = await this.grandchildTask.perform();
    this.set('status', `4. Child: grandchild says "${value}"`);
    await timeout(1000);
    return "What's up";
  });

  grandchildTask = task(async () => {
    this.set('status', '3. Grandchild: one moment...');
    await timeout(1000);
    return 'Hello';
  });
}
// END-SNIPPET
