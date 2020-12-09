import Route from '@ember/routing/route';

export default class NotFoundRoute extends Route {
  redirect() {
    this.transitionTo('docs');
  }
}
