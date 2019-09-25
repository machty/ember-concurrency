import { createModule } from './qunit-module';
import { TestModuleForModel } from 'ember-test-helpers';
import { deprecate } from '@ember/application/deprecations';

export default function moduleForModel(name, description, callbacks) {
  deprecate(
    `The usage "moduleForModel" is deprecated. Please migrate the "${name}" module to the new test APIs.`,
    false,
    {
      id: 'ember-qunit.deprecate-legacy-apis',
      until: '5.0.0',
      url: 'https://github.com/emberjs/ember-qunit/blob/master/docs/migration.md',
    }
  );
  createModule(TestModuleForModel, name, description, callbacks);
}
