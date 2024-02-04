import { getOwner } from '@ember/application';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'test-app/config/environment';

export default class ApplicationRoute extends Route {
  @service router;

  beforeModel() {
    const fastboot = getOwner(this).lookup('service:fastboot');

    if (ENV.environment !== 'test' && (!fastboot || !fastboot.isFastBoot)) {
      this.router.on('didTransition', () => {
        window.scrollTo(0, 0);
      });
    }
  }
}
