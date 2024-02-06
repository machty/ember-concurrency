import type cancelAll from './helpers/cancel-all';
import type perform from './helpers/perform';
import type task from './helpers/task';

export default interface Registry {
  perform: typeof perform;
  'cancel-all': typeof cancelAll;
  task: typeof task;
}
