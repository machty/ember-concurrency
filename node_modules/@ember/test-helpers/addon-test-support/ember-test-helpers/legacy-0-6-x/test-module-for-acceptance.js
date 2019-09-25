import { run } from '@ember/runloop';
import AbstractTestModule from './abstract-test-module';
import { getContext } from '@ember/test-helpers';

export default class extends AbstractTestModule {
  setupContext() {
    super.setupContext({ application: this.createApplication() });
  }

  teardownContext() {
    run(() => {
      getContext().application.destroy();
    });

    super.teardownContext();
  }

  createApplication() {
    let { Application, config } = this.callbacks;
    let application;

    run(() => {
      application = Application.create(config);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
}
