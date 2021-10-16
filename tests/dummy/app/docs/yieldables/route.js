import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class YieldablesRoute extends Route {
  @service router;

  redirect() {
    this.router.transitionTo('docs.advanced.yieldables');
  }
}
