'use strict';

// inlined from
// https://github.com/ember-cli/ember-rfc176-data/blob/v0.2.7/old-shims.json
// the newer format of ember-rfc176-data no longer supports the distinction
// between "old shim" and "generally deprecated"
const oldShimsData = {
  'ember-application': {
    default: ['@ember/application'],
  },
  'ember-array': {
    default: ['@ember/array'],
  },
  'ember-array/mutable': {
    default: ['@ember/array/mutable'],
  },
  'ember-array/utils': {
    A: ['@ember/array', 'A'],
    isEmberArray: ['@ember/array', 'isArray'],
    wrap: ['@ember/array', 'makeArray'],
  },
  'ember-component': {
    default: ['@ember/component'],
  },
  'ember-components/checkbox': {
    default: ['@ember/component/checkbox'],
  },
  'ember-components/text-area': {
    default: ['@ember/component/text-area'],
  },
  'ember-components/text-field': {
    default: ['@ember/component/text-field'],
  },
  'ember-controller': {
    default: ['@ember/controller'],
  },
  'ember-controller/inject': {
    default: ['@ember/controller', 'inject'],
  },
  'ember-controller/proxy': {
    default: ['@ember/array/proxy'],
  },
  'ember-controllers/sortable': {
    default: null,
  },
  'ember-debug': {
    log: ['@ember/debug', 'debug'],
    inspect: ['@ember/debug', 'inspect'],
    run: ['@ember/debug', 'runInDebug'],
    warn: ['@ember/debug', 'warn'],
  },
  'ember-debug/container-debug-adapter': {
    default: ['@ember/debug/container-debug-adapter'],
  },
  'ember-debug/data-adapter': {
    default: ['@ember/debug/data-adapter'],
  },
  'ember-deprecations': {
    deprecate: ['@ember/application/deprecations', 'deprecate'],
    deprecateFunc: ['@ember/application/deprecations', 'deprecateFunc'],
  },
  'ember-enumerable': {
    default: ['@ember/enumerable'],
  },
  'ember-evented': {
    default: ['@ember/object/evented'],
  },
  'ember-evented/on': {
    default: ['@ember/object/evented', 'on'],
  },
  'ember-globals-resolver': {
    default: ['@ember/application/globals-resolver', null, 'GlobalsResolver'],
  },
  'ember-helper': {
    default: ['@ember/component/helper'],
    helper: ['@ember/component/helper', 'helper'],
  },
  'ember-instrumentation': {
    instrument: ['@ember/instrumentation', 'instrument'],
    reset: ['@ember/instrumentation', 'reset'],
    subscribe: ['@ember/instrumentation', 'subscribe'],
    unsubscribe: ['@ember/instrumentation', 'unsubscribe'],
  },
  'ember-locations/hash': {
    default: ['@ember/routing/hash-location'],
  },
  'ember-locations/history': {
    default: ['@ember/routing/history-location'],
  },
  'ember-locations/none': {
    default: ['@ember/routing/none-location'],
  },
  'ember-map': {
    default: ['@ember/map'],
    withDefault: ['@ember/map/with-default'],
  },
  'ember-metal/destroy': {
    default: null,
  },
  'ember-metal/events': {
    addListener: ['@ember/object/events', 'addListener'],
    removeListener: ['@ember/object/events', 'removeListener'],
    send: ['@ember/object/events', 'sendEvent'],
  },
  'ember-metal/get': {
    default: ['@ember/object', 'get'],
    getProperties: ['@ember/object', 'getProperties'],
  },
  'ember-metal/mixin': {
    default: ['@ember/object/mixin'],
  },
  'ember-metal/observer': {
    default: ['@ember/object', 'observer'],
    addObserver: ['@ember/object/observers', 'addObserver'],
    removeObserver: ['@ember/object/observers', 'removeObserver'],
  },
  'ember-metal/on-load': {
    default: ['@ember/application', 'onLoad'],
    run: ['@ember/application', 'runLoadHooks'],
  },
  'ember-metal/set': {
    default: ['@ember/object', 'set'],
    setProperties: ['@ember/object', 'setProperties'],
    trySet: ['@ember/object', 'trySet'],
  },
  'ember-metal/utils': {
    aliasMethod: ['@ember/object', 'aliasMethod'],
    assert: ['@ember/debug', 'assert'],
    cacheFor: ['@ember/object/internals', 'cacheFor'],
    copy: ['@ember/object/internals', 'copy'],
    guidFor: ['@ember/object/internals', 'guidFor'],
  },
  'ember-object': {
    default: ['@ember/object'],
  },
  'ember-owner/get': {
    default: ['@ember/application', 'getOwner'],
  },
  'ember-owner/set': {
    default: ['@ember/application', 'setOwner'],
  },
  'ember-platform': {
    assign: ['@ember/polyfills', 'assign'],
    create: ['@ember/polyfills', 'create'],
    hasAccessors: ['@ember/polyfills', 'hasPropertyAccessors'],
    keys: ['@ember/polyfills', 'keys'],
  },
  'ember-route': {
    default: ['@ember/routing/route'],
  },
  'ember-router': {
    default: ['@ember/routing/router'],
  },
  'ember-runloop': {
    default: ['@ember/runloop', 'run'],
    begin: ['@ember/runloop', 'begin'],
    bind: ['@ember/runloop', 'bind'],
    cancel: ['@ember/runloop', 'cancel'],
    debounce: ['@ember/runloop', 'debounce'],
    end: ['@ember/runloop', 'end'],
    join: ['@ember/runloop', 'join'],
    later: ['@ember/runloop', 'later'],
    next: ['@ember/runloop', 'next'],
    once: ['@ember/runloop', 'once'],
    schedule: ['@ember/runloop', 'schedule'],
    scheduleOnce: ['@ember/runloop', 'scheduleOnce'],
    throttle: ['@ember/runloop', 'throttle'],
  },
  'ember-service': {
    default: ['@ember/service'],
  },
  'ember-service/inject': {
    default: ['@ember/service', 'inject'],
  },
  'ember-set/ordered': {
    default: null,
  },
  'ember-string': {
    camelize: ['@ember/string', 'camelize'],
    capitalize: ['@ember/string', 'capitalize'],
    classify: ['@ember/string', 'classify'],
    dasherize: ['@ember/string', 'dasherize'],
    decamelize: ['@ember/string', 'decamelize'],
    fmt: ['@ember/string', 'fmt'],
    htmlSafe: ['@ember/string', 'htmlSafe'],
    loc: ['@ember/string', 'loc'],
    underscore: ['@ember/string', 'underscore'],
    w: ['@ember/string', 'w'],
  },
  'ember-utils': {
    isBlank: ['@ember/utils', 'isBlank'],
    isEmpty: ['@ember/utils', 'isEmpty'],
    isNone: ['@ember/utils', 'isNone'],
    isPresent: ['@ember/utils', 'isPresent'],
    tryInvoke: ['@ember/utils', 'tryInvoke'],
    typeOf: ['@ember/utils', 'typeOf'],
  },
  'ember-computed': {
    default: ['@ember/object', 'computed'],
    empty: ['@ember/object/computed', 'empty'],
    notEmpty: ['@ember/object/computed', 'notEmpty'],
    none: ['@ember/object/computed', 'none'],
    not: ['@ember/object/computed', 'not'],
    bool: ['@ember/object/computed', 'bool'],
    match: ['@ember/object/computed', 'match'],
    equal: ['@ember/object/computed', 'equal'],
    gt: ['@ember/object/computed', 'gt'],
    gte: ['@ember/object/computed', 'gte'],
    lt: ['@ember/object/computed', 'lt'],
    lte: ['@ember/object/computed', 'lte'],
    alias: ['@ember/object/computed', 'alias'],
    oneWay: ['@ember/object/computed', 'oneWay'],
    reads: ['@ember/object/computed', 'reads'],
    readOnly: ['@ember/object/computed', 'readOnly'],
    deprecatingAlias: ['@ember/object/computed', 'deprecatingAlias'],
    and: ['@ember/object/computed', 'and'],
    or: ['@ember/object/computed', 'or'],
    collect: ['@ember/object/computed', 'collect'],
    sum: ['@ember/object/computed', 'sum'],
    min: ['@ember/object/computed', 'min'],
    max: ['@ember/object/computed', 'max'],
    map: ['@ember/object/computed', 'map'],
    sort: ['@ember/object/computed', 'sort'],
    setDiff: ['@ember/object/computed', 'setDiff'],
    mapBy: ['@ember/object/computed', 'mapBy'],
    mapProperty: ['@ember/object/computed', 'mapProperty'],
    filter: ['@ember/object/computed', 'filter'],
    filterBy: ['@ember/object/computed', 'filterBy'],
    filterProperty: ['@ember/object/computed', 'filterProperty'],
    uniq: ['@ember/object/computed', 'uniq'],
    union: ['@ember/object/computed', 'union'],
    intersect: ['@ember/object/computed', 'intersect'],
  },
  'ember-test': {
    default: null,
  },
  'ember-test/adapter': {
    default: ['@ember/test/adapter'],
  },
  'ember-test/qunit-adapter': {
    default: null,
  },
};

//------------------------------------------------------------------------------
// General rule - Don't use import paths from ember-cli-shims
//------------------------------------------------------------------------------

const { buildFix } = require('../utils/new-module');

module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of old shims for modules',
      category: 'Best Practices',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-old-shims.md',
    },
    fixable: 'code',
  },

  create(context) {
    const message = "Don't use import paths from ember-cli-shims";

    return {
      ImportDeclaration(node) {
        if (!(node.source.value in oldShimsData)) {
          return;
        }

        const fix = buildFix(node, oldShimsData);
        context.report({ node, message, fix });
      },
    };
  },
};
