import { module, test } from 'qunit';
import Resolver from 'ember-resolver/resolvers/glimmer-wrapper';
import BasicRegistry from '@glimmer/resolver/module-registries/basic-registry';

let resolver;
module('ember-resolver/resolvers/glimmer-wrapper#normalize', {
  beforeEach() {

    let glimmerModuleRegistry = new BasicRegistry();

    resolver = Resolver.create({
      config: {
        app: {
          name: 'example-app'
        }
      },
      glimmerModuleRegistry
    });
  }
});

test('normalization', function(assert) {
  assert.ok(resolver.normalize, 'resolver#normalize is present');

  assert.equal(resolver.normalize('service:myService'), 'service:my-service');

  // `expandLocalLookup` calls this.normalize(options.source) with `source` empty with MU addon
  assert.equal(resolver.normalize(), undefined);

});
