import Route from '@ember/routing/route';

export default class RouteTasksRoute extends Route {
  redirect() {
    this.transitionTo('docs.examples.route-tasks.detail', 1);
  }
}
