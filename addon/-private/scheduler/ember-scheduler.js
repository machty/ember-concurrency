import Scheduler from './scheduler';
import { once } from '@ember/runloop';

class EmberScheduler extends Scheduler {
  scheduleRefresh() {
    once(this, this.refresh);
  }
}

export default EmberScheduler;
