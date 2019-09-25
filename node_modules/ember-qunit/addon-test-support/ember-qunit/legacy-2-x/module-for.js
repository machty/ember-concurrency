import { createModule } from './qunit-module';
import { TestModule } from 'ember-test-helpers';
import { deprecate } from '@ember/application/deprecations';

export default function moduleFor(name, description, callbacks) {
  deprecate(
    `The usage "moduleFor" is deprecated. Please migrate the "${name}" module to use "module"`,
    false,
    {
      id: 'ember-qunit.deprecate-legacy-apis',
      until: '5.0.0',
      url: 'https://github.com/emberjs/ember-qunit/blob/master/docs/migration.md',
    }
  );
  createModule(TestModule, name, description, callbacks);
}
