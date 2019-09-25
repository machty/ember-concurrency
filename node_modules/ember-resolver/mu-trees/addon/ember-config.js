/*
 * This config describes canonical Ember, as described in the
 * module unification spec:
 *
 *   https://github.com/emberjs/rfcs/blob/master/text/0143-module-unification.md
 *
 */
export default function generateConfig(name) {
  return {
    app: {
      name,
      rootName: name
    },
    types: {
      adapter: { definitiveCollection: 'models' },
      application: { definitiveCollection: 'main' },
      config: { definitiveCollection: 'config' },
      controller: { definitiveCollection: 'routes' },
      component: { definitiveCollection: 'components' },
      'component-lookup': { definitiveCollection: 'main' },
      'component-manager': { definitiveCollection: 'component-managers' },
      event_dispatcher: { definitiveCollection: 'main' },
      helper: { definitiveCollection: 'components' },
      initializer: { definitiveCollection: 'initializers' },
      'instance-initializers': { definitiveCollection: 'instance-initializer' },
      location: { definitiveCollection: 'main' },
      model: { definitiveCollection: 'models' },
      modifier: { definitiveCollection: 'components' },
      'modifier-manager': { definitiveCollection: 'modifier-managers' },
      partial: { definitiveCollection: 'partials' },
      renderer: { definitiveCollection: 'main' },
      route: { definitiveCollection: 'routes' },
      router: { definitiveCollection: 'main' },
      'route-map': { definitiveCollection: 'main' },
      serializer: { definitiveCollection: 'models' },
      service: { definitiveCollection: 'services' },
      template: { definitiveCollection: 'components' },
      'template-compiler': { definitiveCollection: 'main' },
      transform: { definitiveCollection: 'transforms' },
      view: { definitiveCollection: 'views' },
      '-view-registry': { definitiveCollection: 'main' },
      '-bucket-cache': { definitiveCollection: 'main' },
      '-environment': { definitiveCollection: 'main' },
      '-application-instance': { definitiveCollection: 'main' }
    },
    collections: {
      'main': {
        types: ['router', '-bucket-cache', 'component-lookup', '-view-registry', 'event_dispatcher', 'application', 'location', 'renderer', '-environment', '-application-instance', 'route-map']
      },
      components: {
        group: 'ui',
        privateCollections: ['utils'],
        types: ['component', 'helper', 'template', 'modifier']
      },
      'component-managers': {
        types: ['component-manager']
      },
      config: {
        unresolvable: true
      },
      initializers: {
        group: 'init',
        defaultType: 'initializer',
        privateCollections: ['utils'],
        types: ['initializer']
      },
      'instance-initializers': {
        group: 'init',
        defaultType: 'instance-initializer',
        privateCollections: ['utils'],
        types: ['instance-initializers']
      },
      models: {
        group: 'data',
        defaultType: 'model',
        privateCollections: ['utils'],
        types: ['model', 'adapter', 'serializer']
      },
      'modifier-managers': {
        types: ['modifier-manager']
      },
      partials: {
        group: 'ui',
        defaultType: 'partial',
        privateCollections: ['utils'],
        types: ['partial']
      },
      routes: {
        group: 'ui',
        defaultType: 'route',
        privateCollections: ['components', 'utils'],
        types: ['route', 'controller', 'template']
      },
      services: {
        defaultType: 'service',
        privateCollections: ['utils'],
        types: ['service']
      },
      utils: {
        unresolvable: true
      },
      views: {
        defaultType: 'view',
        privateCollections: ['utils'],
        types: ['view']
      },
      transforms: {
        group: 'data',
        defaultType: 'transform',
        privateCollections: ['utils'],
        types: ['transform']
      }
    }
  };
}
