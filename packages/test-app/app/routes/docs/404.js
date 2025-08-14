import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class NotFoundRoute extends Route {
  @service router;

  redirect() {
    this.router.transitionTo('docs');
  }
}
