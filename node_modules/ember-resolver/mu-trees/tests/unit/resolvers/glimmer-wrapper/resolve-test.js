import { module, test } from 'qunit';
import Resolver from 'ember-resolver/resolvers/glimmer-wrapper';
import BasicRegistry from '@glimmer/resolver/module-registries/basic-registry';

module('ember-resolver/resolvers/glimmer-wrapper#resolve', {
  beforeEach() {
    this.resolverForEntries = (config, entries) => {
      let glimmerModuleRegistry = new BasicRegistry(entries);
      return Resolver.create({
        config,
        glimmerModuleRegistry
      });
    };
  }
});

/*
 * "Rule 1" of the unification RFC.
 *
 * See: https://github.com/dgeb/rfcs/blob/module-unification/text/0000-module-unification.md#module-type
 */

test('Modules named main', function(assert) {
  let main = {};
  let resolver = this.resolverForEntries({
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
  }, {
    'router:/app/main/main': main
  });

  assert.equal(
    resolver.resolve('router:/app/main/main'),
    main,
    'absolute module specifier resolved'
  );

  assert.equal(
    resolver.resolve('router:main'),
    main,
    'relative module specifier resolved'
  );
});

test('Resolving when a module is not defined', function(assert) {
  let resolver = this.resolverForEntries({
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
  }, {});

  assert.equal(
    resolver.resolve('router:/app/main/main'),
    undefined,
    'absolute module specifier resolved undefined'
  );

  assert.equal(
    resolver.resolve('router:main'),
    undefined,
    'relative module specifier resolved undefined'
  );
});

test('Services with camelCare are normalized', function(assert) {
  let expectedModule = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      service: { definitiveCollection: 'services' }
    },
    collections: {
      services: {
        types: [ 'service' ]
      }
    }
  }, {
    'service:/app/services/camel-case': expectedModule
  });

  assert.equal(
    resolver.resolve('service:camelCase'),
    expectedModule,
    'camelCase services are dasherized'
  );
});

test('Routes with dots are normalized', function(assert) {
  let expectedModule = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      route: { definitiveCollection: 'routes' }
    },
    collections: {
      routes: {
        types: [ 'route' ]
      }
    }
  }, {
    'route:/app/routes/parent/child': expectedModule
  });

  assert.equal(
    resolver.resolve('route:parent.child'),
    expectedModule,
    'route names with dots are slasherized'
  );
});

test('Controllers with dots are normalized', function(assert) {
  let expectedModule = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      controller: { definitiveCollection: 'controllers' }
    },
    collections: {
      controllers: {
        types: [ 'controller' ]
      }
    }
  }, {
    'controller:/app/controllers/parent/child': expectedModule
  });

  assert.equal(
    resolver.resolve('controller:parent.child'),
    expectedModule,
    'controller names with dots are slasherized'
  );
});

/*
 * "Rule 2" of the unification RFC.
 *
 * See: https://github.com/dgeb/rfcs/blob/module-unification/text/0000-module-unification.md#module-type
 */

test('Resolving in a collection', function(assert) {
  let service = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      service: { definitiveCollection: 'services' }
    },
    collections: {
      services: {
        types: [ 'service' ]
      }
    }
  }, {
    'service:/app/services/i18n': service
  });

  assert.equal(
    resolver.resolve('service:/app/services/i18n'),
    service,
    'absolute module specifier resolved'
  );

  assert.equal(
    resolver.resolve('service:i18n'),
    service,
    'relative module specifier resolved'
  );
});

/*
 * "Rule 2" of the unification RFC with a group.
 */

test('Resolving within a definitiveCollection', function(assert) {
  let helper = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      helper: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'helper' ]
      }
    }
  }, {
    'helper:/app/components/capitalize': helper
  });

  assert.equal(
    resolver.resolve('helper:/app/components/capitalize'),
    helper,
    'absolute module specifier resolved'
  );

  assert.equal(
    resolver.resolve('helper:capitalize'),
    helper,
    'relative module specifier resolved'
  );
});

test('Resolving within a definitiveCollection', function(assert) {
  let helper = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      helper: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'helper' ]
      }
    }
  }, {
    'helper:/app/components/capitalize': helper
  });

  assert.equal(
    resolver.resolve('helper:/app/components/capitalize'),
    helper,
    'absolute module specifier resolved'
  );

  assert.equal(
    resolver.resolve('helper:capitalize'),
    helper,
    'relative module specifier resolved'
  );
});

test('Resolving within a definitiveCollection with other defined types', function(assert) {
  let component = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' },
      helper: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component', 'helper' ]
      }
    }
  }, {
    'component:/app/components/capitalize': component
  });

  assert.equal(
    resolver.resolve('component:/app/components/capitalize'),
    component,
    'absolute module specifier resolved'
  );

  assert.equal(
    resolver.resolve('component:capitalize'),
    component,
    'relative module specifier resolved'
  );
});

test('Can resolve with a / in the specifier', function(assert) {
  let route = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      route: { definitiveCollection: 'routes' }
    },
    collections: {
      routes: {
        group: 'ui',
        types: [ 'route' ]
      }
    }
  }, {
    'route:/app/routes/my-form/my-input': route
  });

  assert.equal(
    resolver.resolve('route:/app/routes/my-form/my-input'),
    route,
    'absolute module specifier not resolved'
  );

  assert.equal(
    resolver.resolve('route:my-form/my-input'),
    route,
    'relative module specifier not resolved'
  );
});

/*
 * "Rule 3" of the unification RFC. Rule 3 means a default type for a collection
 * is configured.
 *
 * There is no runtime implementation of this part of the spec.
 */

/*
 * Other tests.
 *
 */
test('Can not resolve a top level template of a non-definitive type', function(assert) {
  let template = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' },
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component', 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'route', 'template' ]
      }
    }
  }, {
    'template:/app/routes/my-input': template
  });

  assert.equal(
    resolver.resolve('template:components/my-input', 'template:/app/routes/posts'),
    undefined,
    'route collection module not resolved'
  );
  assert.equal(
    resolver.resolve('template:components/my-input', 'template:src/ui/routes/posts'),
    undefined,
    'route collection module not resolved'
  );
});

test('Can resolve a top level template of a definitive type', function(assert) {
  let template = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' },
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component', 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'route', 'template' ]
      }
    }
  }, {
    'template:/app/components/my-input': template
  });

  assert.equal(
    resolver.resolve('template:components/my-input', 'template:/app/routes/posts'),
    template,
    'relative module specifier with source resolved'
  );
  assert.equal(
    resolver.resolve('template:components/my-input', 'template:src/ui/routes/posts'),
    template,
    'relative module specifier with source resolved'
  );
});

test('Can resolve component template', function(assert) {
  let template = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'template' ]
      }
    }
  }, {
    'template:/app/components/my-input': template
  });

  assert.equal(
    resolver.resolve('template:components/my-input'),
    template,
    'relative module specifier with source resolved'
  );
});

test('Can resolve a partial', function(assert) {
  let template = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      partial: { definitiveCollection: 'partials' }
    },
    collections: {
      partials: {
        group: 'ui',
        defaultType: 'partial',
        types: ['partial']
      }
    }
  }, {
    'partial:/app/partials/author': template
  });

  assert.equal(
    resolver.resolve('template:_author', ''),
    template,
    'partial resolved'
  );
});

test('Can normalize and resolve a template for route', function(assert) {
  let template = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      routes: {
        group: 'ui',
        defaultType: 'route',
        types: ['route', 'template']
      },
      components: {
        group: 'ui',
        types: ['template']
      }
    }
  }, {
    'template:/app/routes/parent/child': template
  });

  assert.equal(
    resolver.resolve('template:parent/child'),
    template,
    'template resolved'
  );
  assert.equal(
    resolver.resolve('template:parent.child'),
    template,
    'template normalized and resolved'
  );
});

test('Can resolve template in a route correctly', function(assert) {
  let routeTemplate = {};
  let componentTemplate = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'template' ],
        privateCollections: ['components']
      }
    }
  }, {
    'template:/app/routes/my-page': routeTemplate,
    'template:/app/components/my-page': componentTemplate
  });

  assert.equal(
    resolver.resolve('template:my-page'),
    routeTemplate,
    'relative module found in routes'
  );
  assert.equal(
    resolver.resolve('template:components/my-page'),
    componentTemplate,
    'relative module found in routes'
  );
});

test('Does not fall back when resolving route', function(assert) {
  let componentTemplate = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'template' ],
        privateCollections: ['components']
      }
    }
  }, {
    'template:/app/components/my-page': componentTemplate
  });

  assert.equal(
    resolver.resolve('template:my-page'),
    undefined,
    'relative module found in routes'
  );
  assert.equal(
    resolver.resolve('template:components/my-page'),
    componentTemplate,
    'relative module found in routes'
  );
});

test('Can not resolve a local component for a route without source', function(assert) {
  let component = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' },
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component', 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'route', 'template' ]
      }
    }
  }, {
    'component:/app/routes/posts/-components/my-input': component
  });

  assert.equal(
    resolver.resolve('component:my-input'),
    undefined,
    'component not resolved at global level'
  );
});

test('Can not resolve a local component for another component without source', function(assert) {
  let component = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' },
      route: { definitiveCollection: 'routes' },
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component', 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'route', 'template' ]
      }
    }
  }, {
    'component:/app/components/my-parent/my-input': component
  });

  assert.equal(
    resolver.resolve('component:my-input'),
    undefined,
    'component not resolved at global levelt'
  );
});

test('Can not resolve a local helper for another component without source', function(assert) {
  let helper = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' },
      helper: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component', 'template' ]
      },
      routes: {
        group: 'ui',
        types: [ 'route', 'template' ]
      }
    }
  }, {
    'helper:/app/components/my-parent/my-input': helper
  });

  assert.equal(
    resolver.resolve('helper:my-input'),
    undefined,
    'helper not resolved at global levelt'
  );
});

// Main addon component and service

test('Can resolve a namespaced main service lookup', function(assert) {
  let service = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      service: { definitiveCollection: 'services' }
    },
    collections: {
      services: {
        types: [ 'service' ]
      }
    }
  }, {
    'service:/other-namespace/services/main': service
  });

  assert.equal(
    resolver.resolve('service:other-namespace'),
    service,
    'namespaced resolution resolved'
  );
});

test('Can resolve a namespaced main component template', function(assert) {
  let template = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      template: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'template' ]
      }
    }
  }, {
    'template:/other-namespace/components/main': template
  });

  assert.equal(
    resolver.resolve('template:components/other-namespace'),
    template,
    'namespaced resolution resolved'
  );
});

test('Can resolve a namespaced component object', function(assert) {
  let component = {};
  let resolver = this.resolverForEntries({
    app: {
      name: 'example-app'
    },
    types: {
      component: { definitiveCollection: 'components' }
    },
    collections: {
      components: {
        group: 'ui',
        types: [ 'component' ]
      }
    }
  }, {
    'component:/other-namespace/components/main': component
  });

  assert.equal(
    resolver.resolve('component:other-namespace'),
    component,
    'namespaced resolution resolved'
  );
});
