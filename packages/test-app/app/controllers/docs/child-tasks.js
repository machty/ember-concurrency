import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask, task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET child-tasks
export default class ChildTasksController extends Controller {
  @tracked status = 'Waiting to start';

  parentTask = restartableTask(async () => {
    this.status = '1. Parent: one moment...';
    await timeout(1000);
    let value = await this.childTask.perform();
    this.status = `5. Parent: child says "${value}"`;
    await timeout(1000);
    this.status = '6. Done!';
  });

  childTask = task(async () => {
    this.status = '2. Child: one moment...';
    await timeout(1000);
    let value = await this.grandchildTask.perform();
    this.status = `4. Child: grandchild says "${value}"`;
    await timeout(1000);
    return "What's up";
  });

  grandchildTask = task(async () => {
    this.status = '3. Grandchild: one moment...';
    await timeout(1000);
    return 'Hello';
  });
}
// END-SNIPPET
