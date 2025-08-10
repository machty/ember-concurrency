import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class TaskLifecycleEventsRoute extends Route {
  @service router;

  redirect() {
    this.router.transitionTo('docs.advanced.lifecycle-events');
  }
}
