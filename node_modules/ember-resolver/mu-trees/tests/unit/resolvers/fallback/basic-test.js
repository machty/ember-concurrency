import { module, test } from 'qunit';
import Resolver from 'ember-resolver/resolvers/fallback';
import BasicRegistry from '@glimmer/resolver/module-registries/basic-registry';

module('ember-resolver/resolvers/fallback', {
  beforeEach() {
    this.main = {};
    let glimmerModuleRegistry = new BasicRegistry({
      'router:/app/main/main': this.main
    });

    this.resolver = Resolver.create({
      config: {
        app: {
          name: 'example-app'
        },
        types: {
          router: { definitiveCollection: 'main' }
        },
        collections: {
          main: {
            types: [ 'router' ]
          }
        }
      },
      glimmerModuleRegistry
    });

    this.classicResolverCalls = [];
    this.classic = {};
    this.resolver._fallback.resolve = (specifier) => {
      this.classicResolverCalls.push(specifier);
      return specifier.indexOf('classic') !== -1 ? this.classic : null;
    };
  }
});

test('resolves from glimmer resolver', function(assert) {
  assert.equal(this.resolver.resolve('router:/app/main/main'), this.main, 'returns glimmer resolver result');
  assert.equal(this.classicResolverCalls.length, 0, 'no calls to classic resolver');
});

test('resolves from classic resolver', function(assert) {
  assert.equal(this.resolver.resolve('router:/app/main/classic', 'referrer'), this.classic, 'returns classic resolver result');
});

test('resolves normalized specifiers classic resolver', function(assert) {
  this.resolver._fallback.resolve = (specifier) => {
    return specifier === 'router:classic-router' ? this.classic : null;
  };

  assert.equal(this.resolver.resolve('router:classicRouter'), this.classic, 'returns classic resolver result');
});

test('returns null if neither resolver resolves', function(assert) {
  let specifier = 'router:/app/main/nowhere';
  let referrer = 'router:/app/main/referrer';
  assert.equal(this.resolver.resolve(specifier, referrer), null, 'returns null when neither resolver resolves');
  assert.deepEqual(this.classicResolverCalls, [ specifier ], 'classic resolver called');
});

test('it sets the correct namespace on the fallback resolver', function(assert) {
  assert.deepEqual(this.resolver._fallback.namespace, { modulePrefix: 'example-app' });
});
