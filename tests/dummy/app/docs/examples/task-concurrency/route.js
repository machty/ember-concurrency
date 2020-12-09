import Route from '@ember/routing/route';

export default class TaskConcurrencyRoute extends Route {
  redirect() {
    this.transitionTo('docs.task-concurrency');
  }
}
