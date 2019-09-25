import { module, test } from 'qunit';
import Resolver from 'ember-resolver/resolvers/glimmer-wrapper';
import BasicRegistry from '@glimmer/resolver/module-registries/basic-registry';

module('ember-resolver/resolvers/glimmer-wrapper#expandLocalLookup', {
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

test('Can expand private component template', function(assert) {
  let template = {};
  let notTemplate = {};
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
        types: [ 'template' ],
        privateCollections: ['components']
      }
    }
  }, {
    'template:/app/routes/my-page/my-input': notTemplate,
    'template:/app/routes/my-page/-components/my-input': template
  });


  assert.equal(
    resolver.expandLocalLookup('template:components/my-input', 'template:src/ui/routes/my-page'),
    'template:/app/routes/my-page/-components/my-input',
    'relative module specifier with source resolved w/ normalization'
  );
});

test('Can expand a local component for a route', function(assert) {
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
    resolver.expandLocalLookup('component:my-input', 'template:src/ui/routes/posts'),
    'component:/app/routes/posts/-components/my-input',
    'component resolved'
  );
  assert.equal(
    resolver.expandLocalLookup('component:my-input'),
    'component:my-input',
    'component not resolved at global level'
  );
});

test('Can expand a namespaced service lookup', function(assert) {
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
    'service:/other-namespace/services/i18n': service
  });

  assert.equal(
    resolver.expandLocalLookup('service:i18n', null, 'other-namespace'),
    'service:/other-namespace/services/i18n',
    'namespaced resolution resolved'
  );
});

test('Can expand a namespaced component template', function(assert) {
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
    'template:/other-namespace/components/my-component': template
  });

  assert.equal(
    resolver.expandLocalLookup('template:components/my-component', null, 'other-namespace'),
    'template:/other-namespace/components/my-component',
    'namespaced resolution resolved'
  );
});

test('Can expand a namespaced component object', function(assert) {
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
    'component:/other-namespace/components/my-component': component
  });

  assert.equal(
    resolver.expandLocalLookup('component:my-component', null, 'other-namespace'),
    'component:/other-namespace/components/my-component',
    'namespaced resolution resolved'
  );
});

test('Can expand a local component for another component', function(assert) {
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
    resolver.expandLocalLookup('component:my-input', 'template:src/ui/components/my-parent'),
    'component:/app/components/my-parent/my-input',
    'component resolved'
  );
  assert.equal(
    resolver.expandLocalLookup('component:my-input'),
    'component:my-input',
    'component not resolved at global levelt'
  );
});

test('Can expand a local helper for another component', function(assert) {
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
    resolver.expandLocalLookup('helper:my-input', 'template:src/ui/components/my-parent'),
    'helper:/app/components/my-parent/my-input',
    'helper resolved'
  );
  assert.equal(
    resolver.expandLocalLookup('helper:my-input'),
    'helper:my-input',
    'helper not resolved at global levelt'
  );
});

// Main addon component and service

test('Can expand a namespaced main service lookup', function(assert) {
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
    resolver.expandLocalLookup('service:other-namespace'),
    'service:other-namespace',
    'namespaced resolution resolved'
  );
});

test('Can expand a namespaced main component template', function(assert) {
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
    resolver.expandLocalLookup('template:components/other-namespace'),
    'template:components/other-namespace',
    'namespaced resolution resolved'
  );
});

test('Can expand a namespaced component object', function(assert) {
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
    resolver.expandLocalLookup('component:other-namespace'),
    'component:other-namespace',
    'namespaced resolution resolved'
  );
});
