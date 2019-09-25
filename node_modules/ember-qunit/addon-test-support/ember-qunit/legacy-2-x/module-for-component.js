import { createModule } from './qunit-module';
import { TestModuleForComponent } from 'ember-test-helpers';
import { deprecate } from '@ember/application/deprecations';

export default function moduleForComponent(name, description, callbacks) {
  createModule(TestModuleForComponent, name, description, callbacks);
  deprecate(
    `The usage "moduleForComponent" is deprecated. Please migrate the "${name}" module to use "setupRenderingTest".`,
    false,
    {
      id: 'ember-qunit.deprecate-legacy-apis',
      until: '5.0.0',
      url: 'https://github.com/emberjs/ember-qunit/blob/master/docs/migration.md',
    }
  );
}
