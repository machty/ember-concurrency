import RequireJSRegistry from 'ember-resolver/module-registries/requirejs';
import { module, test} from 'qunit';

export let config = {
  app: {
    name: 'example-app',
    rootName: 'example-app'
  },
  types: {
    component: { definitiveCollection: 'components' },
    partial: { definiteCollection: 'partials' },
    service: { definitiveCollection: 'services' },
    route: { definitiveCollection: 'routes' },
    router: { definitiveCollection: 'main' },
    template: { definitiveCollection: 'components' }
  },
  collections: {
    'main': {
      types: ['router']
    },
    components: {
      group: 'ui',
      types: ['component', 'helper', 'template']
    },
    partials: {
      group: 'ui',
      types: [ 'template' ]
    },
    routes: {
      defaultType: 'route',
      group: 'ui',
      privateCollections: ['components'],
      types: ['route', 'controller', 'template']
    },
    services: {
      defaultType: 'service',
      types: ['service']
    }
  }
};

function buildMockRequire() {
  let mockRequire = modulePath => mockRequire.entries[modulePath];
  mockRequire.entries = {};
  return mockRequire;
}

module('RequireJS Registry', {
  beforeEach() {
    this.mockRequire = buildMockRequire();
    this.mockRequire.entries = {};
    this.config = config;
    this.registry = new RequireJSRegistry(this.config, 'src', this.mockRequire);
  },

  addModule(name, module) {
    this.mockRequire.entries[name] = module;
  }

});

test('basic get', function(assert) {
  assert.expect(11);

  [
    /*
     * Over time lets move these general cases into specific tests that
     * describe their aim.
     */
    [ 'router:/my-app/main/main', 'my-app/src/router' ],
    [ 'route:/my-app/routes/application', 'my-app/src/ui/routes/application/route' ],
    [ 'template:/my-app/routes/application', 'my-app/src/ui/routes/application/template' ],
    [ 'component:/my-app/components/my-input', 'my-app/src/ui/components/my-input/component' ],
    [ 'template:/my-app/routes/components/my-input', 'my-app/src/ui/components/my-input/template' ],
    [ 'template:/my-app/components/my-input', 'my-app/src/ui/components/my-input/template' ],
    [ 'component:/my-app/components/my-input/my-button', 'my-app/src/ui/components/my-input/my-button/component' ],
    [ 'template:/my-app/components/my-input/my-button', 'my-app/src/ui/components/my-input/my-button/template' ],
    [ 'service:/my-app/services/main', 'my-app/src/services/main' ],
    [ 'component:/my-app/components/main', 'my-app/src/ui/components/main/component' ],
    [ 'template:/my-app/components/main', 'my-app/src/ui/components/main/template' ],

  ]
  .forEach(([ lookupString, expected ]) => {
    let expectedModule = {};
    this.mockRequire.entries = {
      [expected]: {default: expectedModule}
    };
    let actualModule = this.registry.get(lookupString);
    assert.equal(actualModule, expectedModule, `get ${lookupString} -> ${expected}`);
  });
});

test('typed module name with default export', function(assert) {
  let expectedModule = {};
  this.addModule(`my-app/src/ui/routes/index/route`, {default: expectedModule});

  let actualModule = this.registry.get(`route:/my-app/routes/index`);
  assert.equal(
    actualModule, expectedModule,
    `resolved the module`
  );
});

test('un-typed module name with default export when resolved type is the defaultType', function(assert) {
  let expectedModule = {};
  this.addModule(`my-app/src/ui/routes/index`, {default: expectedModule});

  let actualModule = this.registry.get(`route:/my-app/routes/index`);
  assert.equal(
    actualModule, expectedModule,
    `resolved the module`
  );
});

test('un-typed module name with default export when resolved type is not the defaultType', function(assert) {
  let expectedModule = {};
  this.addModule(`my-app/src/ui/routes/index`, {default: expectedModule});

  let actualModule = this.registry.get(`template:/my-app/routes/index`);
  assert.notOk(
    actualModule,
    `did not resolve the module`
  );
});

test('un-typed module name with named export of resolved type', function(assert) {
  let expectedModule = {};
  this.addModule(`my-app/src/ui/routes/index`, {template: expectedModule});

  let actualModule = this.registry.get(`template:/my-app/routes/index`);
  assert.equal(
    actualModule, expectedModule,
    `did not resolve the module`
  );
});
