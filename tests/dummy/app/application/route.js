import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'dummy/config/environment';

export default class ApplicationRoute extends Route {
  @service fastboot;
  @service router;

  beforeModel() {
    if (ENV.environment !== "test" && !this.get('fastboot.isFastBoot')) {
      this.router.on('didTransition', () => {
        window.scrollTo(0,0);
      });
    }
  }
}
