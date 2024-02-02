import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RouteTasksRoute extends Route {
  @service router;

  redirect() {
    this.router.transitionTo('docs.examples.route-tasks.detail', 1);
  }
}
