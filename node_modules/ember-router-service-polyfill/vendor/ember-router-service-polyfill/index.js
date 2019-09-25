/* globals Ember */
(() => {
  'use strict';

  const { Service, computed } = Ember;
  const { readOnly, or } = computed;

  function shallowEqual(a, b) {
    let k;
    for (k in a) {
      if (a.hasOwnProperty(k) && a[k] !== b[k]) { return false; }
    }
    for (k in b) {
      if (b.hasOwnProperty(k) && a[k] !== b[k]) { return false; }
    }
    return true;
  }

  const RouterService = Service.extend({
    currentRouteName: readOnly('_router.currentRouteName'),
    currentURL: or('_router.currentURL', '_router.url'),
    location: readOnly('_router.location'),
    rootURL: readOnly('_router.rootURL'),
    _router: null,

    transitionTo(...args) {
      let queryParams;
      let arg = args[0];
      if (resemblesURL(arg)) {
        return this._router._doURLTransition('transitionTo', arg);
      }

      let possibleQueryParams = args[args.length - 1];
      if (possibleQueryParams && possibleQueryParams.hasOwnProperty('queryParams')) {
        queryParams = args.pop().queryParams;
      } else {
        queryParams = {};
      }

      let targetRouteName = args.shift();
      let transition = this._router._doTransition(targetRouteName, args, queryParams, true);
      transition._keepDefaultQueryParamValues = true;

      return transition;
    },

    replaceWith(/* routeNameOrUrl, ...models, options */) {
      return this.transitionTo(...arguments).method('replace');
    },

    urlFor(/* routeName, ...models, options */) {
      return this._router.generate(...arguments);
    },

    isActive(/* routeName, ...models, options */) {
      let { routeName, models, queryParams } = this._extractArguments(...arguments);
      // this._router._routerMicrolib => 2.13+
      // this._router.router => < 2.13
      let routerMicrolib = this._router._routerMicrolib || this._router.router;
      let state = routerMicrolib.state;

      if (!routerMicrolib.isActiveIntent(routeName, models, null)) { return false; }
      let hasQueryParams = Object.keys(queryParams).length > 0;

      if (hasQueryParams) {
        this._router._prepareQueryParams(routeName, models, queryParams, true /* fromRouterService */);
        return shallowEqual(queryParams, state.queryParams);
      }

      return true;
    },

    _extractArguments(routeName, ...models) {
      let possibleQueryParams = models[models.length - 1];
      let queryParams = {};

      if (possibleQueryParams && possibleQueryParams.hasOwnProperty('queryParams')) {
        let options = models.pop();
        queryParams = options.queryParams;
      }

      return { routeName, models, queryParams };
    }
  });

  function resemblesURL(str) {
    return typeof str === 'string' && (str === '' || str[0] === '/');
  }

  Ember.Application.reopenClass({
    buildRegistry() {
      let registry = this._super(...arguments);

      registry.register('service:router', RouterService);
      registry.injection('service:router', '_router', 'router:main');

      return registry;
    }
  });

})();
