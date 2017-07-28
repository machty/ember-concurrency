import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller) {
    controller.get('showButtonSoon').perform();
  }
});

