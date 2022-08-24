import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import type { Task } from 'ember-concurrency';

// Define a Type task that takes a single number argument and returns a string
type MyTaskType = Task<string, [ms: number]>;

interface Args {
  fooTask: MyTaskType;
}

export default class extends Component<Args> {
  slowlyComputeStringLength: MyTaskType = task(this, async (ms: number) => {
    await timeout(ms);

    const length = await this.args.fooTask.perform(ms);

    return length;
  });
}
