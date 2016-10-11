"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('dummy/adapters/user', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].Adapter.extend({
    query: function query() {
      return new _ember['default'].RSVP.Promise(function (resolve) {
        _ember['default'].run.later(function () {
          return resolve([{ id: 1, username: "machty" }, { id: 2, username: "snoop" }]);
        }, 200);
      });
    }
  });
});
define('dummy/app', ['exports', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _dummyResolver, _emberLoadInitializers, _dummyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix,
    Resolver: _dummyResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _dummyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('dummy/application/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.router.on('didTransition', function () {
        window.scrollTo(0, 0);
      });
    }
  });
});
define("dummy/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container navbar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"ten columns\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"one columns\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nav-bar-link-outer\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/api\"],[\"flush-element\"],[\"text\",\"API\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"one columns\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nav-bar-link-outer\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/machty/ember-concurrency\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"GitHub\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"ember-notify\"]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/application/template.hbs" } });
});
define('dummy/components/ajax-throttling-example/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET ajax-throttling
  function loopingAjaxTask(id, color) {
    return (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$1$0() {
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!true) {
              context$2$0.next = 9;
              break;
            }

            this.log(color, 'Task ' + id + ': making AJAX request');
            context$2$0.next = 4;
            return this.get('ajaxTask').perform();

          case 4:
            this.log(color, 'Task ' + id + ': Done, sleeping.');
            context$2$0.next = 7;
            return (0, _emberConcurrency.timeout)(2000);

          case 7:
            context$2$0.next = 0;
            break;

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })).on('init');
  }

  exports['default'] = _ember['default'].Component.extend({
    ajaxTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.next = 2;
            return (0, _emberConcurrency.timeout)(2000 + 2000 * Math.random());

          case 2:
            return context$1$0.abrupt('return', {});

          case 3:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).enqueue().maxConcurrency(3),

    task0: loopingAjaxTask(0, '#0000FF'),
    task1: loopingAjaxTask(1, '#8A2BE2'),
    task2: loopingAjaxTask(2, '#A52A2A'),
    task3: loopingAjaxTask(3, '#DC143C'),
    task4: loopingAjaxTask(4, '#20B2AA'),
    task5: loopingAjaxTask(5, '#FF1493'),
    task6: loopingAjaxTask(6, '#228B22'),
    task7: loopingAjaxTask(7, '#DAA520'),

    log: function log(color, message) {
      var logs = this.logs || [];
      logs.push({ color: color, message: message });
      this.set('logs', logs.slice(-7));
    },

    logs: null
  });

  // END-SNIPPET
});

// simulate slow AJAX
define("dummy/components/ajax-throttling-example/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"logs\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"style\",[\"helper\",[\"color\"],[[\"get\",[\"log\",\"color\"]]],null],null],[\"flush-element\"],[\"append\",[\"unknown\",[\"log\",\"message\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"log\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/ajax-throttling-example/template.hbs" } });
});
define('dummy/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'dummy/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _dummyConfigEnvironment) {

  var name = _dummyConfigEnvironment['default'].APP.name;
  var version = _dummyConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('dummy/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _emberBasicDropdownComponentsBasicDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdown['default'];
    }
  });
});
define('dummy/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _emberBasicDropdownComponentsBasicDropdownContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContent['default'];
    }
  });
});
define('dummy/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _emberBasicDropdownComponentsBasicDropdownTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownTrigger['default'];
    }
  });
});
define('dummy/components/caps-marquee/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  function capitalizeAt(text, i) {
    var capsLetter = text.charAt(i).toUpperCase();
    var before = text.slice(0, i);
    var after = text.slice(i + 1);
    return before + capsLetter + after;
  }

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    text: null,
    scrambledText: null,
    // BEGIN-SNIPPET caps-marquee
    marqueeLoop: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var text, i;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            text = this.get('text');

          case 1:
            if (!true) {
              context$1$0.next = 15;
              break;
            }

            this.set('formattedText', text);
            context$1$0.next = 5;
            return (0, _emberConcurrency.timeout)(1500);

          case 5:
            i = 0;

          case 6:
            if (!(i < text.length)) {
              context$1$0.next = 13;
              break;
            }

            this.set('formattedText', capitalizeAt(text, i));
            context$1$0.next = 10;
            return (0, _emberConcurrency.timeout)(50);

          case 10:
            ++i;
            context$1$0.next = 6;
            break;

          case 13:
            context$1$0.next = 1;
            break;

          case 15:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).on('init')
  });
});
// END-SNIPPET
define("dummy/components/caps-marquee/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"append\",[\"unknown\",[\"formattedText\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/caps-marquee/template.hbs" } });
});
define("dummy/components/code-snippet", ["exports", "ember", "dummy/snippets"], function (exports, _ember, _dummySnippets) {

  /* global require */
  var Highlight = require('highlight.js');

  exports["default"] = _ember["default"].Component.extend({
    tagName: 'pre',
    classNameBindings: ['language'],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get('unindent')) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n");
      for (var i = 0; i < lines.length; i++) {
        match = /^\s*/.exec(lines[i]);
        if (match && (typeof min === 'undefined' || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== 'undefined' && min > 0) {
        src = src.replace(new RegExp("(\\n|^)\\s{" + min + "}", 'g'), "$1");
      }
      return src;
    },

    source: _ember["default"].computed('name', function () {
      return this._unindent((_dummySnippets["default"][this.get('name')] || "").replace(/^(\s*\n)*/, '').replace(/\s*$/, ''));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get('element'));
    },

    language: _ember["default"].computed('name', function () {
      var m = /\.(\w+)$/i.exec(this.get('name'));
      if (m) {
        switch (m[1].toLowerCase()) {
          case 'js':
            return 'javascript';
          case 'coffee':
            return 'coffeescript';
          case 'hbs':
            return 'htmlbars';
          case 'css':
            return 'css';
          case 'scss':
            return 'scss';
          case 'less':
            return 'less';
          case 'emblem':
            return 'emblem';
          case 'ts':
            return 'typescript';
        }
      }
    })
  });
});
define('dummy/components/concurrency-graph/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var computed = _ember['default'].computed;

  var Tracker = _ember['default'].Object.extend({
    id: null,
    performTime: null,
    startTime: null,
    endTime: computed.oneWay('comp.timeElapsed'),
    comp: null,
    taskInstance: null,
    isCanceled: computed.oneWay('taskInstance.isCanceled'),
    state: computed('taskInstance.state', function () {
      return _ember['default'].String.capitalize(this.get('taskInstance.state'));
    }),
    hasStarted: false
  });

  exports['default'] = _ember['default'].Component.extend({
    task: null,
    trackers: null,
    timeElapsed: 0,
    startTime: null,
    nextId: 0,

    lowerLimit: _ember['default'].computed('trackers.[]', function () {
      var trackers = this.get('trackers');
      if (!trackers) {
        return 0;
      }
      var v = Math.min.apply(Math, _toConsumableArray(trackers.mapBy('performTime')));
      return v;
    }),

    upperLimit: _ember['default'].computed('timeElapsed', function () {
      var timeElapsed = this.get('timeElapsed');
      return Math.max(10000, timeElapsed);
    }),

    colors: ['red', 'green', 'blue'],

    labelHeights: [0, 20, 40, 60, 80, 100],

    ticker: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var now, defer;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            if (!true) {
              context$1$0.next = 9;
              break;
            }

            now = +new Date();

            this.set('timeElapsed', now - this.startTime);

            defer = _ember['default'].RSVP.defer();

            window.requestAnimationFrame(defer.resolve);
            context$1$0.next = 7;
            return defer.promise;

          case 7:
            context$1$0.next = 0;
            break;

          case 9:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).drop(),

    restart: _ember['default'].on('init', function () {
      this.nextId = 0;
      this.set('trackers', _ember['default'].A());
      this.get('ticker').cancelAll();
      this.set('timeElapsed', 0);
      this.startTime = 0;
    }),

    actions: {
      startTask: function startTask() {
        var _this = this;

        this.startTime = this.startTime || +new Date();
        var tracker = Tracker.create({
          id: this.nextId++,
          performTime: this.timeElapsed,
          comp: this,
          start: function start() {
            tracker.set('hasStarted', true);
            tracker.set('startTime', _this.timeElapsed || 1);
          },
          end: function end() {
            tracker.set('endTime', _this.timeElapsed);
          }
        });

        var task = this.get('task');
        var taskInstance = task.perform(tracker);
        tracker.set('taskInstance', taskInstance);

        this.get('trackers').pushObject(tracker);
        this.get('ticker').perform();
      },

      restart: function restart() {
        this.restart();
      }
    }
  });
});
define("dummy/components/concurrency-graph/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"startTask\"]],[\"flush-element\"],[\"text\",\"task.perform()\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"restart\"]],[\"flush-element\"],[\"text\",\"Clear Timeline\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"task\",\"isRunning\"]]],null,6],[\"text\",\"\\n\"],[\"open-element\",\"style\",[]],[\"static-attr\",\"type\",\"text/css\"],[\"flush-element\"],[\"text\",\"\\ng:hover {\\n  stroke-width: 3px;\\n  font-weight: 700;\\n}\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"svg\",[]],[\"static-attr\",\"style\",\"width: 100%; padding: 5px;\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"trackers\"]]],null,5],[\"text\",\"\\n\"],[\"block\",[\"with\"],[[\"helper\",[\"scale\"],[[\"get\",[\"timeElapsed\"]],[\"get\",[\"lowerLimit\"]],[\"get\",[\"upperLimit\"]]],null]],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"line\",[]],[\"dynamic-attr\",\"x1\",[\"concat\",[[\"unknown\",[\"x\"]],\"%\"]]],[\"static-attr\",\"y1\",\"0\"],[\"dynamic-attr\",\"x2\",[\"concat\",[[\"unknown\",[\"x\"]],\"%\"]]],[\"static-attr\",\"y2\",\"100\"],[\"static-attr\",\"stroke\",\"black\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"x\"]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"line\",[]],[\"dynamic-attr\",\"x1\",[\"concat\",[[\"unknown\",[\"x\"]],\"%\"]]],[\"dynamic-attr\",\"y1\",[\"unknown\",[\"y\"]],null],[\"dynamic-attr\",\"x2\",[\"concat\",[[\"unknown\",[\"x\"]],\"%\"]]],[\"dynamic-attr\",\"y2\",[\"helper\",[\"sum\"],[20,[\"get\",[\"y\"]]],null],null],[\"dynamic-attr\",\"stroke\",[\"unknown\",[\"color\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"y\"]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"text\",[]],[\"dynamic-attr\",\"x\",[\"concat\",[[\"helper\",[\"sum\"],[0.5,[\"get\",[\"x\"]]],null],\"%\"]]],[\"dynamic-attr\",\"y\",[\"helper\",[\"sum\"],[15,[\"helper\",[\"pick-from\"],[[\"get\",[\"labelHeights\"]],[\"get\",[\"tracker\",\"id\"]]],null]],null],null],[\"static-attr\",\"font-family\",\"Raleway\"],[\"dynamic-attr\",\"fill\",[\"unknown\",[\"color\"]],null],[\"static-attr\",\"font-size\",\"14\"],[\"dynamic-attr\",\"text-decoration\",[\"helper\",[\"if\"],[[\"get\",[\"tracker\",\"isCanceled\"]],\"line-through\",\"none\"],null],null],[\"dynamic-attr\",\"font-style\",[\"helper\",[\"if\"],[[\"get\",[\"tracker\",\"startTime\"]],\"normal\",\"italic\"],null],null],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"unknown\",[\"tracker\",\"state\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"with\"],[[\"helper\",[\"pick-from\"],[[\"get\",[\"labelHeights\"]],[\"get\",[\"tracker\",\"id\"]]],null]],null,1]],\"locals\":[\"x\"]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"rect\",[]],[\"dynamic-attr\",\"x\",[\"concat\",[[\"helper\",[\"scale\"],[[\"helper\",[\"subtract\"],[[\"get\",[\"tracker\",\"startTime\"]],[\"get\",[\"lowerLimit\"]]],null],[\"get\",[\"lowerLimit\"]],[\"get\",[\"upperLimit\"]]],null],\"%\"]]],[\"dynamic-attr\",\"y\",[\"helper\",[\"pick-from\"],[[\"get\",[\"labelHeights\"]],[\"get\",[\"tracker\",\"id\"]]],null],null],[\"static-attr\",\"height\",\"20px\"],[\"dynamic-attr\",\"width\",[\"concat\",[[\"helper\",[\"scale\"],[[\"helper\",[\"width\"],[[\"get\",[\"tracker\",\"startTime\"]],[\"get\",[\"tracker\",\"endTime\"]],[\"get\",[\"upperLimit\"]]],null],[\"get\",[\"lowerLimit\"]],[\"get\",[\"upperLimit\"]]],null],\"%\"]]],[\"static-attr\",\"stroke\",\"black\"],[\"dynamic-attr\",\"fill\",[\"unknown\",[\"color\"]],null],[\"static-attr\",\"fill-opacity\",\"0.3\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"tracker\",\"hasStarted\"]]],null,3],[\"text\",\"\\n\"],[\"block\",[\"with\"],[[\"helper\",[\"scale\"],[[\"helper\",[\"subtract\"],[[\"get\",[\"tracker\",\"performTime\"]],[\"get\",[\"lowerLimit\"]]],null],[\"get\",[\"lowerLimit\"]],[\"get\",[\"upperLimit\"]]],null]],null,2]],\"locals\":[\"color\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"g\",[]],[\"static-attr\",\"height\",\"20px\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"with\"],[[\"helper\",[\"pick-from\"],[[\"get\",[\"colors\"]],[\"get\",[\"tracker\",\"id\"]]],null]],null,4],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"tracker\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"cancelAll\"],[[\"target\"],[[\"get\",[\"task\"]]]]],[\"flush-element\"],[\"text\",\"Cancel All\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/concurrency-graph/template.hbs" } });
});
define('dummy/components/count-up/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    count: 0,
    // BEGIN-SNIPPET count-up
    countUp: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            if (!true) {
              context$1$0.next = 6;
              break;
            }

            this.incrementProperty('count');
            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(100);

          case 4:
            context$1$0.next = 0;
            break;

          case 6:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).on('init')
  });
});
// END-SNIPPET
define("dummy/components/count-up/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"append\",[\"unknown\",[\"count\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/count-up/template.hbs" } });
});
define('dummy/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _emberModalDialogComponentsPositionedContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsPositionedContainer['default'];
    }
  });
});
define('dummy/components/ember-notify', ['exports', 'ember-notify/components/ember-notify'], function (exports, _emberNotifyComponentsEmberNotify) {
  exports['default'] = _emberNotifyComponentsEmberNotify['default'];
});
define('dummy/components/ember-notify/message', ['exports', 'ember-notify/components/ember-notify/message'], function (exports, _emberNotifyComponentsEmberNotifyMessage) {
  exports['default'] = _emberNotifyComponentsEmberNotifyMessage['default'];
});
define('dummy/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('dummy/components/fa-icon', ['exports', 'ember-cli-font-awesome/components/fa-icon'], function (exports, _emberCliFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('dummy/components/fa-list-icon', ['exports', 'ember-cli-font-awesome/components/fa-list-icon'], function (exports, _emberCliFontAwesomeComponentsFaListIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaListIcon['default'];
    }
  });
});
define('dummy/components/fa-list', ['exports', 'ember-cli-font-awesome/components/fa-list'], function (exports, _emberCliFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaList['default'];
    }
  });
});
define('dummy/components/fa-stack', ['exports', 'ember-cli-font-awesome/components/fa-stack'], function (exports, _emberCliFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('dummy/components/github-edit/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'a',
    classNames: 'github-edit',
    attributeBindings: ['href', 'title'],

    routing: _ember['default'].inject.service('-routing'),
    href: _ember['default'].computed('routing.currentPath', function () {
      var path = this.get('routing.currentPath').replace(/\./g, '/');
      return 'https://github.com/machty/ember-concurrency/edit/master/tests/dummy/app/' + path + '/template.hbs';
    }),
    title: "Edit on Github"
  });
});
define("dummy/components/github-edit/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"icon-pencil\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/github-edit/template.hbs" } });
});
define('dummy/components/intro-task-oldschool/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    count: 0,

    startCounting: function startCounting() {
      this.cancelTimer();
      this.set('count', 0);
      this.step();
    },

    step: function step() {
      if (this.count < 5) {
        this.incrementProperty('count');
        this.timerId = _ember['default'].run.later(this, this.step, 300);
      } else {
        this.set('count', "DONE!");
      }
    },

    willDestroy: function willDestroy() {
      this.cancelTimer();
    },

    cancelTimer: function cancelTimer() {
      if (this.timerId) {
        _ember['default'].run.cancel(this.timerId);
        this.timerId = null;
      }
    },

    actions: {
      startCounting: function startCounting() {
        this.startCounting();
      }
    }
  });

  // END-SNIPPET
});
// BEGIN-SNIPPET intro-task-oldschool
define("dummy/components/intro-task-oldschool/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Count: \"],[\"append\",[\"unknown\",[\"count\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"startCounting\"]],[\"flush-element\"],[\"text\",\"Start Over\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/intro-task-oldschool/template.hbs" } });
});
define('dummy/components/intro-task/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    count: 0,

    countingTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('count', 0);

          case 1:
            if (!(this.count < 5)) {
              context$1$0.next = 7;
              break;
            }

            this.incrementProperty('count');
            context$1$0.next = 5;
            return (0, _emberConcurrency.timeout)(300);

          case 5:
            context$1$0.next = 1;
            break;

          case 7:
            this.set('count', "DONE!");

          case 8:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable()
  });

  // END-SNIPPET
});
// BEGIN-SNIPPET intro-task
define("dummy/components/intro-task/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Count: \"],[\"append\",[\"unknown\",[\"count\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"countingTask\"]]],null],null],[\"flush-element\"],[\"text\",\"Start Over\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/intro-task/template.hbs" } });
});
define('dummy/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _emberModalDialogComponentsModalDialogOverlay) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialogOverlay['default'];
    }
  });
});
define('dummy/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _emberModalDialogComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialog['default'];
    }
  });
});
define('dummy/components/my-button/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    click: function click() {
      var val = this.attrs.action(3, 4);
      if (!val) {
        return;
      }
      val.then(function (v) {
        if (v !== 10) {
          throw new Error("returned value wasn't 10");
        }
      })['catch'](function (e) {
        if (!(0, _emberConcurrency.didCancel)(e)) {
          throw e;
        }
      });
    }
  });
});
define('dummy/components/nav-header/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: ''
  });
});
define("dummy/components/nav-header/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"prevTopic\"]]],null,3],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"nextTopic\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"unknown\",[\"nextTopic\",\"title\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"u-pull-right\"],[\"flush-element\"],[\"text\",\"\\n      Next: \"],[\"block\",[\"link-to\"],[[\"get\",[\"nextTopic\",\"route\"]]],null,0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"append\",[\"unknown\",[\"prevTopic\",\"title\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"u-pull-left\"],[\"flush-element\"],[\"text\",\"\\n      Previous: \"],[\"block\",[\"link-to\"],[[\"get\",[\"prevTopic\",\"route\"]]],null,2],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/nav-header/template.hbs" } });
});
define('dummy/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
    }
  });
});
define('dummy/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleTrigger['default'];
    }
  });
});
define('dummy/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _emberPowerSelectComponentsPowerSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelect['default'];
    }
  });
});
define('dummy/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _emberPowerSelectComponentsPowerSelectBeforeOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectBeforeOptions['default'];
    }
  });
});
define('dummy/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _emberPowerSelectComponentsPowerSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectOptions['default'];
    }
  });
});
define('dummy/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _emberPowerSelectComponentsPowerSelectSearchMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectSearchMessage['default'];
    }
  });
});
define('dummy/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
    }
  });
});
define('dummy/components/press-and-hold-button/component', ['exports', 'ember'], function (exports, _ember) {

  // BEGIN-SNIPPET increment-button
  function sendPress() {
    this.sendAction('press');
  }

  function sendRelease() {
    this.sendAction('release');
  }

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',

    touchStart: sendPress,
    mouseDown: sendPress,
    touchEnd: sendRelease,
    mouseLeave: sendRelease,
    mouseUp: sendRelease
  });

  // END-SNIPPET
});
define('dummy/components/scrambled-text/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // from http://stackoverflow.com/a/3943985/914123
  function scramble(word) {
    var a = word.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  }

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    text: null,
    scrambledText: null,
    // BEGIN-SNIPPET scrambled-text
    startScrambling: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var text, pauseTime;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            text = this.get('text');

          case 1:
            if (!true) {
              context$1$0.next = 15;
              break;
            }

            pauseTime = 140;

          case 3:
            if (!(pauseTime > 5)) {
              context$1$0.next = 10;
              break;
            }

            this.set('scrambledText', scramble(text));
            context$1$0.next = 7;
            return (0, _emberConcurrency.timeout)(pauseTime);

          case 7:
            pauseTime = pauseTime * 0.95;
            context$1$0.next = 3;
            break;

          case 10:
            this.set('scrambledText', text);
            context$1$0.next = 13;
            return (0, _emberConcurrency.timeout)(1500);

          case 13:
            context$1$0.next = 1;
            break;

          case 15:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).on('init')
  });
});
// END-SNIPPET
define("dummy/components/scrambled-text/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"append\",[\"unknown\",[\"scrambledText\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/scrambled-text/template.hbs" } });
});
define('dummy/components/start-task-example/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    status: null,

    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var msg = arguments.length <= 0 || arguments[0] === undefined ? "init" : arguments[0];
      var status;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            status = 'myTask.perform(' + msg + ')...';

            this.set('status', status);

            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(500);

          case 4:
            this.set('status', status + ' Done');

          case 5:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).on('init', 'foo'),

    actions: {
      performTask: function performTask(msg) {
        // This demonstrates how you can .get() a reference
        // to a task and then run it with .perform(), but
        // ideally you should just invoke myTask directly
        // from the template using the `perform` helper.
        this.get('myTask').perform(msg);
      },
      triggerFoo: function triggerFoo(msg) {
        this.trigger('foo', msg);
      }
    }
  });

  // END-SNIPPET
});
// BEGIN-SNIPPET start-task-example
define("dummy/components/start-task-example/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"performTask\",\"one\"]],[\"flush-element\"],[\"text\",\"\\n    1. task.perform(...)\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]],\"two\"],null],null],[\"flush-element\"],[\"text\",\"\\n    2. (perform taskName)\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"triggerFoo\",\"three\"]],[\"flush-element\"],[\"text\",\"\\n    3. .on('foo')\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]]],[[\"value\"],[\"target.checked\"]]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  4. Checkbox\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Status: \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"JavaScript\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"start-task-example.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Template\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"start-task-example-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/start-task-example/template.hbs" } });
});
define('dummy/components/task-function-syntax-1/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-1
    waitAFewSeconds: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('status', "Gimme one second...");
            context$1$0.next = 3;
            return (0, _emberConcurrency.timeout)(1000);

          case 3:
            this.set('status', "Gimme one more second...");
            context$1$0.next = 6;
            return (0, _emberConcurrency.timeout)(1000);

          case 6:
            this.set('status', "OK, I'm done.");

          case 7:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });
});
// END-SNIPPET
define("dummy/components/task-function-syntax-1/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"waitAFewSeconds\"]]],null],null],[\"flush-element\"],[\"text\",\"Wait A Few Seconds\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-1/template.hbs" } });
});
define('dummy/components/task-function-syntax-2/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-2
    pickRandomNumbers: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var nums, i;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            nums = [];

            for (i = 0; i < 3; i++) {
              nums.push(Math.floor(Math.random() * 10));
            }

            this.set('status', 'My favorite numbers: ' + nums.join(', '));

          case 3:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });
});
// END-SNIPPET
define("dummy/components/task-function-syntax-2/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"pickRandomNumbers\"]]],null],null],[\"flush-element\"],[\"text\",\"Pick Random Number\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-2/template.hbs" } });
});
define('dummy/components/task-function-syntax-3/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-3
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var promise, resolvedValue;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('status', 'Thinking...');
            promise = (0, _emberConcurrency.timeout)(1000).then(function () {
              return 123;
            });
            context$1$0.next = 4;
            return promise;

          case 4:
            resolvedValue = context$1$0.sent;

            this.set('status', 'The value is ' + resolvedValue);

          case 6:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });
});
// END-SNIPPET
define("dummy/components/task-function-syntax-3/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]]],null],null],[\"flush-element\"],[\"text\",\"Perform myTask\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-3/template.hbs" } });
});
define('dummy/components/task-function-syntax-4/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-4
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('status', 'Thinking...');
            context$1$0.prev = 1;
            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(1000).then(function () {
              throw "Ahhhhh!!!!";
            });

          case 4:
            this.set('status', 'This does not get used!');
            context$1$0.next = 10;
            break;

          case 7:
            context$1$0.prev = 7;
            context$1$0.t0 = context$1$0['catch'](1);

            this.set('status', 'Caught value: ' + context$1$0.t0);

          case 10:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[1, 7]]);
    }))
  });
});
// END-SNIPPET
define("dummy/components/task-function-syntax-4/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]]],null],null],[\"flush-element\"],[\"text\",\"Perform myTask\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-4/template.hbs" } });
});
define('dummy/components/task-group-example/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  var marked0$0 = [shortPause].map(regeneratorRuntime.mark);

  function shortPause() {
    return regeneratorRuntime.wrap(function shortPause$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return (0, _emberConcurrency.timeout)(2000);

        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  // BEGIN-SNIPPET task-group-component
  exports['default'] = _ember['default'].Component.extend({
    taskGroup: null, // passed-in

    chores: (0, _emberConcurrency.taskGroup)().group('taskGroup'),
    changeDiapers: (0, _emberConcurrency.task)(shortPause).group('chores'),
    doDishes: (0, _emberConcurrency.task)(shortPause).group('chores'),
    mowTheLawn: (0, _emberConcurrency.task)(shortPause).group('chores'),

    fun: (0, _emberConcurrency.taskGroup)().group('taskGroup'),
    playGames: (0, _emberConcurrency.task)(shortPause).group('fun'),
    dance: (0, _emberConcurrency.task)(shortPause).group('fun'),
    sing: (0, _emberConcurrency.task)(shortPause).group('fun'),

    tasks: _ember['default'].computed(function () {
      return [this.get('changeDiapers'), this.get('doDishes'), this.get('mowTheLawn'), this.get('playGames'), this.get('dance'), this.get('sing')];
    })
  });

  // END-SNIPPET
});
define("dummy/components/task-group-example/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"taskGroup\",\"name\"]],false],[\"text\",\": \"],[\"append\",[\"unknown\",[\"taskGroup\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"cancel-all\"],[[\"get\",[\"taskGroup\"]]],null],null],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"taskGroup\",\"isRunning\"]],\"button-primary\"],null],null],[\"flush-element\"],[\"text\",\"\\n  Cancel \"],[\"append\",[\"unknown\",[\"taskGroup\",\"name\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"u-full-width\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Perform\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"State\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Group\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Group State\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tasks\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"task\"]]],null],null],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"unknown\",[\"task\",\"name\"]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"task\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"task\",\"group\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"task\",\"group\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"task\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-group-example/template.hbs" } });
});
define('dummy/components/tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _emberModalDialogComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsTetherDialog['default'];
    }
  });
});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/data-test/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Controller.extend({
    users: null,
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var users;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('users', null);
            context$1$0.next = 3;
            return this.store.query('user', {});

          case 3:
            users = context$1$0.sent;

            this.set('users', users);

          case 5:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });
});
define("dummy/data-test/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Ember Data Test\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]]],null],null],[\"static-attr\",\"data-test-selector\",\"load-data-button\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"myTask\",\"isRunning\"]]],null,2,1],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"data-test-selector\",\"loaded-users\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"users\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"u\",\"username\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"u\"]},{\"statements\":[[\"text\",\"    Load\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    Loading\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/data-test/template.hbs" } });
});
define('dummy/deprecation-test/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Controller.extend({
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });
});
define("dummy/deprecation-test/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Deprecation test\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"deprecated-button\"],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],[\"get\",[\"myTask\",\"perform\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/deprecation-test/template.hbs" } });
});
define('dummy/docs/404/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs');
    }
  });
});
define('dummy/docs/cancelation/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET cancelation
  var WAIT_HERE_FOREVER = _ember['default'].RSVP.defer().promise;
  exports['default'] = _ember['default'].Controller.extend({
    count: 0,
    mostRecent: null,

    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.prev = 0;

            this.incrementProperty('count');
            context$1$0.next = 4;
            return WAIT_HERE_FOREVER;

          case 4:
            context$1$0.prev = 4;

            // finally blocks always get called,
            // even when the task is being canceled
            this.decrementProperty('count');
            return context$1$0.finish(4);

          case 7:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[0,, 4, 7]]);
    })),

    actions: {
      performTask: function performTask() {
        var task = this.get('myTask');
        var taskInstance = task.perform();
        this.set('mostRecent', taskInstance);
      },

      cancelAll: function cancelAll() {
        this.get('myTask').cancelAll();
      },

      cancelMostRecent: function cancelMostRecent() {
        this.get('mostRecent').cancel();
      }
    }
  });

  // END-SNIPPET
});
define("dummy/docs/cancelation/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Cancelation\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" tasks can be canceled either\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"explicitly\"],[\"close-element\"],[\"text\",\" (by calling one of the cancel methods\\n  on a task or task instance) or \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"implicitly\"],[\"close-element\"],[\"text\",\" (based on\\n  how the task is configured, or because the task's host object\\n  was destroyed).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Generally speaking, it is \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"much\"],[\"close-element\"],[\"text\",\" better to configure your tasks properly\\n  (via \"],[\"block\",[\"link-to\"],[\"docs.task-concurrency\"],null,2],[\"text\",\")\\n  such that they'll be implicitly/automatically canceled at\\n  the right time, but there are still some cases where\\n  explicit cancelation is the only option.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Explicit Cancelation\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  There are two ways to explicitly cancel a task:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Call \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task.cancelAll()\"],[\"close-element\"],[\"text\",\" on the Task object —\\n    this will cancel all running or enqueued Task Instances for that\\n    task.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Call \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"taskInstance.cancel()\"],[\"close-element\"],[\"text\",\" on a Task Instance\\n    (the object returned from a prior call to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task.perform()\"],[\"close-element\"],[\"text\",\")\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Running tasks: \"],[\"append\",[\"unknown\",[\"count\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"performTask\"]],[\"flush-element\"],[\"text\",\"Perform Task\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"count\"]]],null,1],[\"block\",[\"if\"],[[\"get\",[\"mostRecent\",\"isRunning\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    Tip: You can also use the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".concurrency\"],[\"close-element\"],[\"text\",\" property to get\\n    the current number of running task instances for a given task,\\n    e.g. \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"{{myTask.concurrency}}\"],[\"close-element\"],[\"text\",\": \"],[\"append\",[\"unknown\",[\"myTask\",\"concurrency\"]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"cancelation-template.hbs\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"cancelation.js\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"cancelMostRecent\"]],[\"flush-element\"],[\"text\",\"Cancel Most Recent\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"cancelAll\"]],[\"flush-element\"],[\"text\",\"Cancel All\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Task Modifiers\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/cancelation/template.hbs" } });
});
define('dummy/docs/child-tasks/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET child-tasks
  exports['default'] = _ember['default'].Controller.extend({
    status: "Waiting to start",

    parentTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var value;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('status', "1. Parent: one moment...");
            context$1$0.next = 3;
            return (0, _emberConcurrency.timeout)(1000);

          case 3:
            context$1$0.next = 5;
            return this.get('childTask').perform();

          case 5:
            value = context$1$0.sent;

            this.set('status', '5. Parent: child says "' + value + '"');
            context$1$0.next = 9;
            return (0, _emberConcurrency.timeout)(1000);

          case 9:
            this.set('status', "6. Done!");

          case 10:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable(),

    childTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var value;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('status', "2. Child: one moment...");
            context$1$0.next = 3;
            return (0, _emberConcurrency.timeout)(1000);

          case 3:
            context$1$0.next = 5;
            return this.get('grandchildTask').perform();

          case 5:
            value = context$1$0.sent;

            this.set('status', '4. Child: grandchild says "' + value + '"');
            context$1$0.next = 9;
            return (0, _emberConcurrency.timeout)(1000);

          case 9:
            return context$1$0.abrupt('return', "What's up");

          case 10:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })),

    grandchildTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('status', "3. Grandchild: one moment...");
            context$1$0.next = 3;
            return (0, _emberConcurrency.timeout)(1000);

          case 3:
            return context$1$0.abrupt('return', "Hello");

          case 4:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });

  // END-SNIPPET
});
define("dummy/docs/child-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Child Tasks\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Tasks can call other tasks by \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\"ing the\\n  result of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"anotherTask.perform()\"],[\"close-element\"],[\"text\",\". When this happens,\\n  the Parent task will wait for the Child task to complete before\\n  proceeding. If the Parent task is canceled, the Child task will\\n  automatically be canceled as well.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Parent Task:     \"],[\"append\",[\"unknown\",[\"parentTask\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Child Task:      \"],[\"append\",[\"unknown\",[\"childTask\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Grandchild Task: \"],[\"append\",[\"unknown\",[\"grandchildTask\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"parentTask\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"parentTask\",\"isRunning\"]]],null,1,0],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"child-tasks.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"child-tasks-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    Perform Parent Task\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    Restart Parent Task\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/child-tasks/template.hbs" } });
});
define("dummy/docs/controller", ["exports", "ember"], function (exports, _ember) {
  var computed = _ember["default"].computed;
  exports["default"] = _ember["default"].Controller.extend({
    appController: _ember["default"].inject.controller('application'),

    tableOfContents: [{ route: "docs", title: "Introduction" }, { route: "docs.installation", title: "Installation" }, { route: "docs.writing-tasks", title: "Your First Task" }, { route: "docs.task-function-syntax", title: "Task Function Syntax" }, { route: "docs.task-concurrency", title: "Managing Task Concurrency",
      children: [{ route: "docs.task-concurrency-advanced", title: "Using maxConcurrency" }]
    }, { route: "docs.cancelation", title: "Cancelation",
      children: [{ route: "docs.error-vs-cancelation", title: "Errors vs. Cancelation (try/catch/finally)" }]
    },
    //{ route: "docs.lifetime", title: "Lifetime"},
    { route: "docs.child-tasks", title: "Child Tasks" }, { route: "docs.task-groups", title: "Task Groups" }, { route: "docs.derived-state", title: "Derived State" }, { route: "docs.testing-debugging", title: "Testing & Debugging" }, { title: "Examples", route: "docs.examples",
      children: [{ route: "docs.examples.loading-ui", title: "Loading UI" }, { route: "docs.examples.autocomplete", title: "Auto-Search & ember-power-select" }, { route: "docs.examples.increment-buttons", title: "Accelerating Increment Buttons" }, { route: "docs.examples.ajax-throttling", title: "AJAX Throttling" }, { route: "docs.examples.route-tasks", title: "Route Tasks" }, { route: "docs.examples.joining-tasks", title: "Awaiting Multiple Child Tasks" }]
    }],

    //{route: "docs.examples.decorating-tasks", title: "Decorating Other Tasks"},
    flatContents: computed(function () {
      var flattened = [];
      this.get('tableOfContents').forEach(function (entry) {
        flattened.push(entry);
        if (entry.children) {
          flattened = flattened.concat(entry.children);
        }
      });
      return flattened;
    }),

    currentIndex: computed('appController.currentRouteName', 'flatContents', function () {
      var contents = this.get('flatContents'),
          current = this.get('appController.currentRouteName'),
          bestMatch,
          entry;

      for (var i = 0; i < contents.length; i++) {
        entry = contents[i];
        if (entry.route && new RegExp('^' + entry.route.replace(/\./g, '\\.')).test(current)) {
          if (typeof bestMatch === 'undefined' || contents[bestMatch].route.length < entry.route.length) {
            bestMatch = i;
          }
        }
      }
      return bestMatch;
    }),

    nextTopic: computed('currentIndex', 'flatContents', function () {
      var contents = this.get('flatContents'),
          index = this.get('currentIndex');
      if (typeof index !== "undefined") {
        return contents[index + 1];
      }
    }),

    prevTopic: computed('currentIndex', 'flatContents', function () {
      var contents = this.get('flatContents'),
          index = this.get('currentIndex');
      if (typeof index !== "undefined") {
        return contents[index - 1];
      }
    })
  });
});
define("dummy/docs/derived-state/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Derived State\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  One of the core goals of ember-concurrency is to provide as much\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Derived State\"],[\"close-element\"],[\"text\",\" as possible; for example, instead\\n  of requiring you to set and then later unset your own \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isRunning\"],[\"close-element\"],[\"text\",\"\\n  flag at the beginning and end of a task, ember-concurrency gives you\\n  an \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isRunning\"],[\"close-element\"],[\"text\",\" (and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isIdle\"],[\"close-element\"],[\"text\",\") property for free so that\\n  you don't have to manage your own state (which is a common source of bugs\\n  and boilerplate).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  ember-concurrency gives you the concept of \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Tasks\"],[\"close-element\"],[\"text\",\", and\\n  when you \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\" a Task, it produces a\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Task Instance\"],[\"close-element\"],[\"text\",\", which represents a single execution\\n  of that task. Both of these objects expose a lot of derived state,\\n  which is described below.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Less commonly-used properties are \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"italicized\"],[\"close-element\"],[\"text\",\". Also, keep in\\n  mind that there are \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/api\"],[\"flush-element\"],[\"text\",\"API docs\"],[\"close-element\"],[\"text\",\" for everything described below.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Properties on \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/api/Task.html\"],[\"flush-element\"],[\"text\",\"Task\"],[\"close-element\"],[\"text\",\" objects\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isRunning\"],[\"close-element\"],[\"text\",\":\\n    true when there is at least one instance of the task running, false otherwise.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isIdle\"],[\"close-element\"],[\"text\",\": the opposite of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isRunning\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"concurrency\"],[\"close-element\"],[\"close-element\"],[\"text\",\": an integer representing the number of currently\\n    running task instances. If you're using a task modifier like\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop/enqueue/restartable\"],[\"close-element\"],[\"text\",\" (without specifying \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"maxConcurrency\"],[\"close-element\"],[\"text\",\")\\n    this number will never be greater than 1. This property is mostly useful for\\n    debugging.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"state\"],[\"close-element\"],[\"close-element\"],[\"text\",\": a string description of the task's state; can\\n    either by \\\"running\\\" or \\\"idle\\\". Useful for debugging.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Accessing Task Instances from the Task object\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Tasks also expose properties for accessing specific\\n  Task Instances (which are created every time you call \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform()\"],[\"close-element\"],[\"text\",\"\\n  on a task).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"last\"],[\"close-element\"],[\"text\",\": the last Task Instance that started executing.\\n    This property will never point to a \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop\"],[\"close-element\"],[\"text\",\"ped Task Instance,\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"lastSuccessful\"],[\"close-element\"],[\"text\",\": the last Task Instance that ran to completion\\n    (it returned a value that wasn't a rejecting promise).\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  In addition to these properties, keep in mind that at any point you can\\n  also just save the TaskInstance returned from \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform()\"],[\"close-element\"],[\"text\",\"\\n  to some property for later access in case the above properties don't\\n  hit your use cases (but please open a GitHub issue if you find yourself\\n  doing this often because this might suggest room for improvement in\\n  ember-concurrency's API).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Properties on \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/api/TaskInstance.html\"],[\"flush-element\"],[\"text\",\"Task Instances\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"value\"],[\"close-element\"],[\"text\",\": the value returned from the task function. Is\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"null\"],[\"close-element\"],[\"text\",\" before a value is returned, and remains null\\n    if the task never completes (throws an error or is canceled).\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"error\"],[\"close-element\"],[\"text\",\": the error/exception thrown from the task function\\n    (might also be the value of a rejected promise that was yielded).\\n    \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"Note: until \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/machty/ember-concurrency/issues/40\"],[\"flush-element\"],[\"text\",\"this issue\"],[\"close-element\"],[\"text\",\"\\n      is resolved, unless you write code to explicitly \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".catch()\"],[\"close-element\"],[\"text\",\"\\n      an error thrown from a performed task, this error will bubble\\n      to the browser (so error reporters like Bugsnag will see it).\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Put the two together...\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Given a task named \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask\"],[\"close-element\"],[\"text\",\", if you need to display a success banner\\n  with the value returned from the most recent execution of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask\"],[\"close-element\"],[\"text\",\",\\n  you can simply reference \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"{{myTask.last.value}}\"],[\"close-element\"],[\"text\",\". If want this banner\\n  to persist until the next time the task runs to completion, you can\\n  just change it to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"{{myTask.lastSuccessful.value}}\"],[\"close-element\"],[\"text\",\". There are other\\n  combinations as well that might better suit your UI needs.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/derived-state/template.hbs" } });
});
define('dummy/docs/error-vs-cancelation/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET error-vs-cancelation
  exports['default'] = _ember['default'].Controller.extend({
    numCompletions: 0,
    numErrors: 0,
    numFinallys: 0,

    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(doError) {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.prev = 0;
            context$1$0.next = 3;
            return (0, _emberConcurrency.timeout)(1000);

          case 3:
            if (!doError) {
              context$1$0.next = 5;
              break;
            }

            throw new Error("Boom");

          case 5:
            context$1$0.next = 10;
            break;

          case 7:
            context$1$0.prev = 7;
            context$1$0.t0 = context$1$0['catch'](0);

            this.incrementProperty('numErrors');

          case 10:
            context$1$0.prev = 10;

            this.incrementProperty('numFinallys');
            return context$1$0.finish(10);

          case 13:
            this.incrementProperty('numCompletions');

          case 14:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[0, 7, 10, 13]]);
    })).restartable()
  });

  // END-SNIPPET
});
define("dummy/docs/error-vs-cancelation/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Errors vs Cancelation (try/catch/finally)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  When you \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield aPromise\"],[\"close-element\"],[\"text\",\",\\n  your task function will pause execution until one of three things happens:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"The promise fulfills, and your task will continue executing from that point.\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"The promise rejects, and your task will automatically `throw` an error from that point.\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Something causes the task to be canceled, which has the behavior described below.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The \"],[\"block\",[\"link-to\"],[\"docs.task-function-syntax\"],null,1],[\"text\",\"\\n  demonstrates how you can use standard JavaScript \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"try/catch\"],[\"close-element\"],[\"text\",\" blocks\\n  to catch exceptions thrown when you yield a rejecting promise, but\\n  what about cancelation?\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Prior to version 0.7.0 of ember-concurrency, cancelations were treated as\\n  exceptions that you could catch within \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"catch(e) {}\"],[\"close-element\"],[\"text\",\" blocks,\\n  but since 0.7.0, cancelation is treated as a\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/domenic/cancelable-promise/blob/master/Third%20State.md\"],[\"flush-element\"],[\"text\",\"Third State\"],[\"close-element\"],[\"text\",\"\\n  — in other words, instead of treating cancelation like a \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"kind\"],[\"close-element\"],[\"text\",\" of exception,\\n  we treat it like a third and separate way to resume/terminate execution of a task\\n  from a \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\", alongside fulfillment and rejection.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Specifically, this means that if a task is canceled while it is paused on a\\n  yield, the task will essentially return from that point,\\n  it will skip any \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"catch(e) {}\"],[\"close-element\"],[\"text\",\" blocks it is in, but it \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"will\"],[\"close-element\"],[\"text\",\"\\n  execute any \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"finally {}\"],[\"close-element\"],[\"text\",\" blocks. The benefit of this behavior is that:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"finally\"],[\"close-element\"],[\"text\",\" blocks will always run and can be used for cleanup logic *\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    You don't have to distinguish between cancelation and thrown exceptions\\n    in your \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"catch\"],[\"close-element\"],[\"text\",\" blocks (which you'd annoyingly have to do\\n    if cancelation were considered just another type of error).\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    * While \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"finally\"],[\"close-element\"],[\"text\",\" blocks are nice for cleanup logic, make\\n    sure you're leveraging the power of\\n    \"],[\"block\",[\"link-to\"],[\"docs.task-concurrency\"],null,0],[\"text\",\" and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isRunning / .isIdle\"],[\"close-element\"],[\"text\",\"\\n    task properties as much as possible so that you're not manually re-implementing\\n    a lot of the implicit state that ember-concurrency provides you for free, e.g.\\n    you should should avoid manually toggling the visibility of a loading spinner within\\n    a task if you could accomplish the same thing using the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isRunning\"],[\"close-element\"],[\"text\",\"\\n    property on a task.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Both of the buttons below will (re)start \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask\"],[\"close-element\"],[\"text\",\" when clicked.\\n  If you click the buttons quickly, it will cause the currently running task\\n  to cancel from the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" where it is paused. Notice how\\n  cancelations don't increment the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"numErrors\"],[\"close-element\"],[\"text\",\" property because\\n  cancelations skip the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"catch\"],[\"close-element\"],[\"text\",\" block.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]],false],null],null],[\"flush-element\"],[\"text\",\"\\n  Run to Completion\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]],true],null],null],[\"flush-element\"],[\"text\",\"\\n  Throw an Error\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Task State: \"],[\"append\",[\"unknown\",[\"myTask\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Completions: \"],[\"append\",[\"unknown\",[\"numCompletions\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Errors: \"],[\"append\",[\"unknown\",[\"numErrors\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Finally block runs: \"],[\"append\",[\"unknown\",[\"numFinallys\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"error-vs-cancelation-template.hbs\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"error-vs-cancelation.js\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Task Modifiers\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Task Function Syntax docs\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/error-vs-cancelation/template.hbs" } });
});
define("dummy/docs/examples/ajax-throttling/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Example: AJAX Throttling\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Limiting the number of simultaneous AJAX requests\\n  (or the number of any kind of global, shared resource)\\n  can be accomplished using the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".maxConcurrency()\"],[\"close-element\"],[\"text\",\" task modifier.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  In the example belong, we render a component with 8 different\\n  concurrently running tasks that each, within an infinite loop,\\n  make (fake) AJAX requests. We've wrapped the code that actually\\n  performs the (fake) AJAX request in a task, and we've annotated\\n  that task with \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".maxConcurrency(3)\"],[\"close-element\"],[\"text\",\" to ensure that\\n  no more than 3 AJAX requests can be run at a time (so that\\n  we don't overload the browser).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"ajax-throttling-example\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"ajax-throttling.js\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/ajax-throttling/template.hbs" } });
});
define('dummy/docs/examples/autocomplete/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET debounced-search-with-cancelation
  var DEBOUNCE_MS = 250;
  exports['default'] = _ember['default'].Controller.extend({
    searchRepo: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(term) {
      var url, json;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            if (!_ember['default'].isBlank(term)) {
              context$1$0.next = 2;
              break;
            }

            return context$1$0.abrupt('return', []);

          case 2:
            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(DEBOUNCE_MS);

          case 4:
            url = 'https://api.github.com/search/repositories?q=' + term;
            context$1$0.next = 7;
            return this.get('getJSON').perform(url);

          case 7:
            json = context$1$0.sent;
            return context$1$0.abrupt('return', json.items);

          case 9:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable(),

    getJSON: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(url) {
      var xhr, result;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            xhr = undefined;
            context$1$0.prev = 1;

            xhr = _ember['default'].$.getJSON(url);
            context$1$0.next = 5;
            return xhr.promise();

          case 5:
            result = context$1$0.sent;
            return context$1$0.abrupt('return', result);

          case 7:
            context$1$0.prev = 7;

            xhr.abort();
            return context$1$0.finish(7);

          case 10:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[1,, 7, 10]]);
    }))
  });

  // END-SNIPPET
});

// Pause here for DEBOUNCE_MS milliseconds. Because this
// task is `restartable`, if the user starts typing again,
// the current search will be canceled at this point and
// start over from the beginning. This is the
// ember-concurrency way of debouncing a task.

// We yield an AJAX request and wait for it to complete. If the task
// is restarted before this request completes, the XHR request
// is aborted (open the inspector and see for yourself :)

// NOTE: could also write this as
// return yield xhr;
//
// either way, the important thing is to yield before returning
// so that the `finally` block doesn't run until after the
// promise resolves (or the task is canceled).
define("dummy/docs/examples/autocomplete/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Auto-Search + ember-power-select + debouncing\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This example improves upon\\n  the \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://www.ember-power-select.com/cookbook/debounce-searches\"],[\"flush-element\"],[\"text\",\"Debounced Search\"],[\"close-element\"],[\"text\",\"\\n  example in the ember-power-select docs, which, while reasonably succinct,\\n  involves somewhat confusing usage of the\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://emberjs.com/api/classes/Ember.run.html#method_debounce\"],[\"flush-element\"],[\"text\",\"Ember.run.debounce API\"],[\"close-element\"],[\"close-element\"],[\"text\",\",\\n  and doesn't cancel previous AJAX requests when a new search begins.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  (Please mind the GitHub API quota :)\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"power-select\"],null,[[\"search\",\"selected\",\"onchange\"],[[\"helper\",[\"perform\"],[[\"get\",[\"searchRepo\"]]],null],[\"get\",[\"selected\"]],[\"helper\",[\"action\"],[[\"get\",[\"\"]],[\"helper\",[\"mut\"],[[\"get\",[\"selected\"]]],null]],null]]],0],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"JavaScript\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"debounced-search-with-cancelation.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Template\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"debounced-search-with-cancelation-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"unknown\",[\"repo\",\"full_name\"]],false],[\"text\",\"\\n\"]],\"locals\":[\"repo\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/autocomplete/template.hbs" } });
});
define('dummy/docs/examples/completion-state/controller', ['exports', 'ember', 'ember-concurrency', 'dummy/utils'], function (exports, _ember, _emberConcurrency, _dummyUtils) {
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var marked0$0 = [sharedFn].map(regeneratorRuntime.mark);

  var i = 0;
  function sharedFn(shouldError) {
    var words, wordsString;
    return regeneratorRuntime.wrap(function sharedFn$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          i++;

          context$1$0.next = 3;
          return (0, _emberConcurrency.timeout)(1000);

        case 3:
          words = [(0, _dummyUtils.randomWord)(), (0, _dummyUtils.randomWord)(), (0, _dummyUtils.randomWord)()];
          wordsString = i + ': ' + words;

          if (!shouldError) {
            context$1$0.next = 9;
            break;
          }

          throw new Error(wordsString);

        case 9:
          return context$1$0.abrupt('return', wordsString);

        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  // BEGIN-SNIPPET completion-state-controller
  exports['default'] = _ember['default'].Controller.extend({
    doStuff: (0, _emberConcurrency.task)(sharedFn),
    doStuffDrop: (0, _emberConcurrency.task)(sharedFn).drop(),
    doStuffEnqueue: (0, _emberConcurrency.task)(sharedFn).enqueue(),
    doStuffRestartable: (0, _emberConcurrency.task)(sharedFn).restartable(),

    showLessCommon: false,

    tasks: ["doStuff", "doStuffDrop", "doStuffEnqueue", "doStuffRestartable"],

    taskProperties: _ember['default'].computed('showLessCommon', function () {
      return [].concat(_toConsumableArray(this.get('commonTaskProperties')), _toConsumableArray(this.get('showLessCommon') ? this.get('lessCommonTaskProperties') : []));
    }),

    commonTaskProperties: ["last", "lastSuccessful", "lastErrored"],

    lessCommonTaskProperties: ["lastComplete", "lastPerformed", "lastIncomplete", "lastCanceled"],

    actions: {
      performAll: function performAll() {}
    }
  });

  // END-SNIPPET
});
define("dummy/docs/examples/completion-state/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Beta: Completion State\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"\\n    INCUBATING FEATURE: we definitely want this feature but there are\\n    a few things to sort out before it's shipped (and @machty would\\n    appreciate feedback :)\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    Outstanding Issue 1: right now taskInstances expose .value and .error,\\n    which allows for idiomatic myTask.last.value, etc., but it's not clear\\n    whether cancelations should should show up within .error, or some other\\n    property name.\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    Outstanding Issue 2: erroring tasks still bubble exceptions to the top\\n    unless you manually do myTask.perform().then(..., ...), which opts you\\n    into handling errors yourself. This opt-in behavior makes sense, but\\n    now that we expose .error as a template-bindable property, and now that\\n    we're advertising Completion State as idiomatic ember-concurrency usage,\\n    there should be some way to opt-in/out of these errors bubbling to the top.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  If you want to display the result of a task (e.g. displaying a success\\n  or \\\"Try Again\\\" banner), generally speaking, you have two options:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".set\"],[\"close-element\"],[\"text\",\" the success or error result to some property from within the task\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Use the Completion State properties automatically supplied by the Task object,\\n      as described below.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"TaskInstance.value and TaskInstance.error\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The value returned from \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"someTask.perform()\"],[\"close-element\"],[\"text\",\" is\\n  a \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"TaskInstance\"],[\"close-element\"],[\"text\",\" — a single execution of that task.\\n  When a TaskInstance finishes running, it will set one of two\\n  properties, depending on whether it ran to completion, was canceled,\\n  or an error was thrown:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".value\"],[\"close-element\"],[\"text\",\": the value returned from the task\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".error\"],[\"close-element\"],[\"text\",\": the error thrown from the task or a TaskCancelation error\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Assuming you've saved the TaskInstance returned from a \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform()\"],[\"close-element\"],[\"text\",\"\\n  to some property that the template can see, you could use\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".value\"],[\"close-element\"],[\"text\",\" or \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".error\"],[\"close-element\"],[\"text\",\" to display success or error\\n  banners, e.g. when a form is submitted. But while there may be some use\\n  cases that require manually stashing the TaskInstance, Task objects\\n  already expose properties that give you access to that TaskInstance\\n  so that you don't have to stash it yourself.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"TaskInstance properties on the Task object\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The Task object, in addition to exposing helpful properties like\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isRunning\"],[\"close-element\"],[\"text\",\" and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isIdle\"],[\"close-element\"],[\"text\",\", exposes a handful\\n  of properties to point to TaskInstances that have been performed.\\n  Because there are many different use cases for when to display and hide\\n  success and error UI, there cannot just be one single property to\\n  rule them all, but the following list has been ordered by the\\n  most common task instances you'd want to use.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"last\"],[\"close-element\"],[\"text\",\": this points to the most recent TaskInstance that\\n    started running (so any \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop\"],[\"close-element\"],[\"text\",\"ped task instances won't show up here,\\n    and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"enqueue\"],[\"close-element\"],[\"text\",\"d task instances will only show up once they start\\n    running). \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.last.value\"],[\"close-element\"],[\"text\",\" and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.last.error\"],[\"close-element\"],[\"text\",\"\\n    start off null when the task instance starts running, and then get set\\n    when the task instance returns/throws/is canceled.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"lastSuccessful\"],[\"close-element\"],[\"text\",\": this gets set when the task\\n    runs to completion, i.e. it returned a value.\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.lastSuccessful.value\"],[\"close-element\"],[\"text\",\" is the value returned from\\n    the most recent \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.perform\"],[\"close-element\"],[\"text\",\".\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"lastErrored\"],[\"close-element\"],[\"text\",\": this gets set when the task\\n    threw an error (or yielded a promise that rejected).\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.lastErrored.error\"],[\"close-element\"],[\"text\",\" is the error of the\\n    the most recent \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.perform\"],[\"close-element\"],[\"text\",\".\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    The other less common properties available are\\n    \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"lastComplete\"],[\"close-element\"],[\"text\",\", \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"lastPerformed\"],[\"close-element\"],[\"text\",\",\\n    \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"lastIncomplete\"],[\"close-element\"],[\"text\",\", and \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"lastCanceled\"],[\"close-element\"],[\"text\",\".\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[\"get\",[\"showLessCommon\"]]]]],false],[\"text\",\" Show less common properties\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tasks\"]]],null,4],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"completion-status completion-error\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"v\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"v\"]},{\"statements\":[[\"text\",\"              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"completion-status completion-success\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"v\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"v\"]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"myTask.\"],[\"append\",[\"unknown\",[\"tp\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"with\"],[[\"helper\",[\"get\"],[[\"get\",[\"task\"]],[\"helper\",[\"concat\"],[[\"get\",[\"tp\"]],\".value\"],null]],null]],null,1],[\"text\",\"          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"with\"],[[\"helper\",[\"get\"],[[\"get\",[\"task\"]],[\"helper\",[\"concat\"],[[\"get\",[\"tp\"]],\".error\"],null]],null]],null,0],[\"text\",\"          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"tp\"]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"task\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"task\"]],false],null],null],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[\"flush-element\"],[\"text\",\"\\n        Run to Completion\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"task\"]],true],null],null],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[\"flush-element\"],[\"text\",\"\\n        Run until Error\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"cancel-all\"],[[\"get\",[\"task\"]]],null],null],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"isRunning\"]],\"button-primary\"],null],null],[\"flush-element\"],[\"text\",\"\\n        Cancel\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"u-full-width completion-state-table\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Completion Property\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\".value\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\".error\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"taskProperties\"]]],null,2],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"task\"]},{\"statements\":[[\"block\",[\"with\"],[[\"helper\",[\"get\"],[[\"get\",[null]],[\"get\",[\"taskName\"]]],null]],null,3]],\"locals\":[\"taskName\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/completion-state/template.hbs" } });
});
define('dummy/docs/examples/decorating-tasks/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET decorating-tasks
  function taskWithCooldown(taskPath, ms) {
    return (0, _emberConcurrency.task)(taskPath, regeneratorRuntime.mark(function callee$1$0(otherTask) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return otherTask.perform.apply(otherTask, args);

          case 2:
            context$2$0.next = 4;
            return (0, _emberConcurrency.timeout)(ms);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })).drop();
  }

  exports['default'] = _ember['default'].Controller.extend({
    sharedTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.next = 2;
            return (0, _emberConcurrency.timeout)(1000);

          case 2:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).drop(),

    halfSecond: taskWithCooldown('sharedTask', 500),
    oneSecond: taskWithCooldown('sharedTask', 1000),
    twoSeconds: taskWithCooldown('sharedTask', 2000),

    tasks: _ember['default'].computed(function () {
      return [this.get('halfSecond'), this.get('oneSecond'), this.get('twoSeconds')];
    })
  });

  // END-SNIPPET
});

// perform the task...

// ...and wait for cooldown timer.
define("dummy/docs/examples/decorating-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Decorating (or Composing) Tasks\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Sometimes you'll want to write a task that simply runs\\n  another task, but with some added behavior. One example\\n  is a button with a cooldown period after the underyling\\n  task has finished running. In such a case, it might be\\n  tempting to put the cooldown timer on the underlying\\n  task, but if the underlying task is shared between many\\n  consumers that \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"don't\"],[\"close-element\"],[\"text\",\" require that cooldown time,\\n  then you'd be foisting your cooldown needs on everyone\\n  else who might depend on that shared resource.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  ember-concurrency task are composable, such that it's\\n  easy to write tasks that decorate another task with added\\n  behavior, as shown in the example below:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Shared Task: \"],[\"append\",[\"unknown\",[\"sharedTask\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The following buttons use the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isIdle\"],[\"close-element\"],[\"text\",\" property of Task\\n  to stylize the buttons as clickable. \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isIdle\"],[\"close-element\"],[\"text\",\" is false only\\n  when the task is actively running, which explains why, when clicking\\n  buttons in the top row, only the one you click is stylized as inactive,\\n  while the others still look clickable (because they both perform different\\n  tasks). In fact, clicking these active-looking\\n  buttons while \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"sharedTask\"],[\"close-element\"],[\"text\",\" is still running will result in those\\n  clicks being ignored since the both \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"sharedTask\"],[\"close-element\"],[\"text\",\" and the tasks\\n  with cooldown applied, are configured to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop\"],[\"close-element\"],[\"text\",\" performs while\\n  they're running.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tasks\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The buttons below use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".performWillSucceed\"],[\"close-element\"],[\"text\",\" instead of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isIdle\"],[\"close-element\"],[\"text\",\"\\n  to stylize the buttons as clickable. \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".performWillSucceed\"],[\"close-element\"],[\"text\",\" is true\\n  when the state of the task is such that calling \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform()\"],[\"close-element\"],[\"text\",\" on it\\n  will immediately execute (rather than being dropped or enqueued). While \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"isIdle\"],[\"close-element\"],[\"text\",\"\\n  only takes into considering whether the specified task is running,\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".performWillSucceed\"],[\"close-element\"],[\"text\",\" takes into consideration whether the linked task\\n  (via the string arg path to the task) can be performed at this time.\\n  This explains why the buttons below \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"all\"],[\"close-element\"],[\"text\",\" are stylized as unclickable when\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"anyone\"],[\"close-element\"],[\"text\",\" is performing \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"sharedTask\"],[\"close-element\"],[\"text\",\".\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tasks\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"decorating-tasks.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"decorating-tasks-template-isIdle.hbs\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"decorating-tasks-template-performWillSucceed.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"performWillSucceed\"]],\"button-primary\"],null],null],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],[\"get\",[\"task\",\"perform\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"task\",\"name\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"task\"]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],[\"get\",[\"task\",\"perform\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"task\",\"name\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"task\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/decorating-tasks/template.hbs" } });
});
define('dummy/docs/examples/encapsulated-task-fun/controller', ['exports', 'ember', 'dummy/utils', 'ember-concurrency'], function (exports, _ember, _dummyUtils, _emberConcurrency) {
  var marked0$0 = [sharedFn].map(regeneratorRuntime.mark);

  function sharedFn() {
    return regeneratorRuntime.wrap(function sharedFn$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return (0, _emberConcurrency.timeout)(Math.random() * 2000);

        case 2:
          return context$1$0.abrupt('return', (0, _dummyUtils.randomWord)());

        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  exports['default'] = _ember['default'].Controller.extend({
    doStuff: (0, _emberConcurrency.task)({
      perform: regeneratorRuntime.mark(function perform() {
        return regeneratorRuntime.wrap(function perform$(context$1$0) {
          while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
              return context$1$0.abrupt('return', (0, _emberConcurrency.all)([this.get('foo').perform(), this.get('bar').perform(), this.get('baz').perform()]));

            case 1:
            case 'end':
              return context$1$0.stop();
          }
        }, perform, this);
      }),

      foo: (0, _emberConcurrency.task)(sharedFn),
      bar: (0, _emberConcurrency.task)(sharedFn),
      baz: (0, _emberConcurrency.task)(sharedFn)
    }).restartable()
  });

  // END-SNIPPET
});

// BEGIN-SNIPPET encapsulated-task-fun-controller
define("dummy/docs/examples/encapsulated-task-fun/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Experimental: EncapsulatedTasks\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Normally, you define tasks by passing a generator function to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task(...)\"],[\"close-element\"],[\"text\",\".\\n  Sometimes though, blah blah blah here is an example.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"doStuff\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n    Do Stuff\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"with\"],[[\"get\",[\"doStuff\",\"last\"]]],null,0],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-fun-controller.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-fun-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"value: \"],[\"append\",[\"unknown\",[\"t\",\"value\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"foo:   \"],[\"append\",[\"unknown\",[\"t\",\"foo\",\"last\",\"value\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"bar:   \"],[\"append\",[\"unknown\",[\"t\",\"bar\",\"last\",\"value\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"baz:   \"],[\"append\",[\"unknown\",[\"t\",\"baz\",\"last\",\"value\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"t\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/encapsulated-task-fun/template.hbs" } });
});
define('dummy/docs/examples/encapsulated-task/controller', ['exports', 'ember', 'dummy/utils', 'ember-concurrency'], function (exports, _ember, _dummyUtils, _emberConcurrency) {
  exports['default'] = _ember['default'].Controller.extend({
    uploadFile: (0, _emberConcurrency.task)({
      progress: 0,
      url: null,
      perform: regeneratorRuntime.mark(function perform(makeUrl) {
        var newProgress;
        return regeneratorRuntime.wrap(function perform$(context$1$0) {
          while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
              this.set('url', makeUrl());

            case 1:
              if (!(this.progress < 100)) {
                context$1$0.next = 8;
                break;
              }

              context$1$0.next = 4;
              return (0, _emberConcurrency.timeout)(100);

            case 4:
              newProgress = this.progress + Math.floor(Math.random() * 6) + 5;

              this.set('progress', Math.min(100, newProgress));
              context$1$0.next = 1;
              break;

            case 8:
              return context$1$0.abrupt('return', "Success!");

            case 9:
            case 'end':
              return context$1$0.stop();
          }
        }, perform, this);
      })
    }).enqueue(),

    makeRandomUrl: function makeRandomUrl() {
      return 'https://www.' + (0, _dummyUtils.randomWord)() + '.edu';
    }
  });

  // END-SNIPPET
});

// BEGIN-SNIPPET encapsulated-task-controller
define("dummy/docs/examples/encapsulated-task/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Experimental: Encapsulated Tasks\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Normally, you define tasks by passing a generator function to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task(...)\"],[\"close-element\"],[\"text\",\".\\n  Often though, you want to be able to expose additional state of the task,\\n  e.g. you might want to show the percentage progress of an \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"uploadFile\"],[\"close-element\"],[\"text\",\" task,\\n  but unless you're using the techniques describes below there's no good\\n  place to expose that data to the template other than to set some properties\\n  on the host object, but then you lose a lot of the benefits of encapsulation\\n  in the process.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  In cases like these, you can use Encapsulated Tasks, which behave just\\n  like regular tasks, except that they don't have access to the object\\n  they're attached to, but rather can only set properties (or emit events)\\n  on themselves. Defining Encapsulated Tasks is easy: instead of passing\\n  a generator function directly to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task(...)\"],[\"close-element\"],[\"text\",\", you pass an\\n  object with a \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\" method.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\\n\\n\\n\\n  pass an object with a\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\" method to the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task(...)\"],[\"close-element\"],[\"text\",\" function\\n\\n\\n  instead of passing\\n  a generator function to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task(...)\"],[\"close-element\"],[\"text\",\", you pass an object\\n  with a \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\" method.\\n\\n  , which are objects with\\n  a \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\" method and other state that you can use in the\\n  place of the generator function you normally supply to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task()\"],[\"close-element\"],[\"text\",\".\\n  When you use a EncapsulatedTask, the value of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"this\"],[\"close-element\"],[\"text\",\" in the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\"\\n  generator function is the EncapsulatedTask object, which means it's a good place to\\n  set encapsulated values specific to that running task instance.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"uploadFile\"]],[\"get\",[\"makeRandomUrl\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n    Start Upload\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Queued Uploads: \"],[\"append\",[\"unknown\",[\"uploadFile\",\"numQueued\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"uploadFile\",\"last\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"uploadFile\",\"lastSuccessful\"]]],null,0],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-controller.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"style\",\"color: green;\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"\\n    Upload to \"],[\"append\",[\"unknown\",[\"uploadFile\",\"lastSuccessful\",\"url\"]],false],[\"text\",\":\\n    \"],[\"append\",[\"unknown\",[\"uploadFile\",\"lastSuccessful\",\"value\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"\\n    Uploading to \"],[\"append\",[\"unknown\",[\"uploadFile\",\"last\",\"url\"]],false],[\"text\",\":\\n    \"],[\"append\",[\"unknown\",[\"uploadFile\",\"last\",\"progress\"]],false],[\"text\",\"%\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/encapsulated-task/template.hbs" } });
});
define('dummy/docs/examples/increment-buttons/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET increment-button-task
  exports['default'] = _ember['default'].Controller.extend({
    count: 0,
    incrementBy: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(inc) {
      var speed;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            speed = 400;

          case 1:
            if (!true) {
              context$1$0.next = 8;
              break;
            }

            this.incrementProperty('count', inc);
            context$1$0.next = 5;
            return (0, _emberConcurrency.timeout)(speed);

          case 5:
            speed = Math.max(50, speed * 0.8);
            context$1$0.next = 1;
            break;

          case 8:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });

  // END-SNIPPET
});
define("dummy/docs/examples/increment-buttons/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Accelerating Increment / Decrement Buttons\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This example demonstrates a few different concepts:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Tricky time-based operations like acceleration are simplified\\n      by the sequential style of task functions\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    You can use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"(perform taskName)\"],[\"close-element\"],[\"text\",\" in place of anywhere you\\n    might want to use a classic Ember action.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Num: \"],[\"append\",[\"unknown\",[\"count\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"(Hold down the buttons to accelerate.)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"press-and-hold-button\"],null,[[\"press\",\"release\"],[[\"helper\",[\"perform\"],[[\"get\",[\"incrementBy\"]],-1],null],[\"helper\",[\"cancel-all\"],[[\"get\",[\"incrementBy\"]]],null]]],1],[\"text\",\"\\n\"],[\"block\",[\"press-and-hold-button\"],null,[[\"press\",\"release\"],[[\"helper\",[\"perform\"],[[\"get\",[\"incrementBy\"]],1],null],[\"helper\",[\"cancel-all\"],[[\"get\",[\"incrementBy\"]]],null]]],0],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"JavaScript (task)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"increment-button-task.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"JavaScript (button component)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"increment-button.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Template\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"press-and-hold-buttons.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      Increase++\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      --Decrease\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/increment-buttons/template.hbs" } });
});
define("dummy/docs/examples/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Examples\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  What better way to familiarize yourself with\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" than to check out\\n  the slew of examples on the left?\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Also, if you can't find the example or answer you're looking for,\\n  please \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/machty/ember-concurrency/issues\"],[\"flush-element\"],[\"text\",\"open an issue\"],[\"close-element\"],[\"text\",\"\\n  or \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://twitter.com/machty\"],[\"flush-element\"],[\"text\",\"ping @machty on Twitter\"],[\"close-element\"],[\"text\",\" and\\n  he'll cook one up for you :).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/index/template.hbs" } });
});
define('dummy/docs/examples/joining-tasks-2/controller', ['exports', 'ember', 'dummy/utils', 'ember-concurrency'], function (exports, _ember, _dummyUtils, _emberConcurrency) {
  var methods = { all: _emberConcurrency.all, race: _emberConcurrency.race };

  exports['default'] = _ember['default'].Controller.extend({
    status: "Waiting...",
    childTasks: null,

    parent: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(methodName) {
      var allOrRace, childTasks, id, words;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            allOrRace = methods[methodName];
            childTasks = [];

            for (id = 0; id < 5; ++id) {
              childTasks.push(this.get('child').perform(id));
            }

            this.set('childTasks', childTasks);
            this.set('status', "Waiting for child tasks to complete...");
            context$1$0.next = 7;
            return allOrRace(childTasks);

          case 7:
            words = context$1$0.sent;

            this.set('status', 'Done: ' + _ember['default'].makeArray(words).join(', '));

          case 9:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable(),

    child: (0, _emberConcurrency.task)({
      percent: 0,
      id: null,

      perform: regeneratorRuntime.mark(function perform(id) {
        var newPercent;
        return regeneratorRuntime.wrap(function perform$(context$1$0) {
          while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
              this.set('id', id);

            case 1:
              if (!(this.percent < 100)) {
                context$1$0.next = 8;
                break;
              }

              context$1$0.next = 4;
              return (0, _emberConcurrency.timeout)(Math.random() * 100 + 100);

            case 4:
              newPercent = Math.min(100, Math.floor(this.percent + Math.random() * 20));

              this.set('percent', newPercent);
              context$1$0.next = 1;
              break;

            case 8:
              return context$1$0.abrupt('return', (0, _dummyUtils.randomWord)());

            case 9:
            case 'end':
              return context$1$0.stop();
          }
        }, perform, this);
      })
    }).enqueue().maxConcurrency(3),

    colors: ['#ff8888', '#88ff88', '#8888ff']
  });

  // END-SNIPPET
});

// BEGIN-SNIPPET joining-tasks-2
define("dummy/docs/examples/joining-tasks-2/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Awaiting Multiple Child Tasks (or, cancelable Promise.all, Promise.race)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This is a rewrite of the \"],[\"block\",[\"link-to\"],[\"docs.examples.joining-tasks\"],null,2],[\"text\",\"\\n  example, using encapsulated-tasks and completion state on task objects.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Status: \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"parent\"]],\"all\"],null],null],[\"flush-element\"],[\"text\",\"all()\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"parent\"]],\"race\"],null],null],[\"flush-element\"],[\"text\",\"race()\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"childTasks\"]]],null,1],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks-2.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks-2-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        Word: \"],[\"append\",[\"unknown\",[\"ti\",\"value\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"progress-outer\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"progress-inner\"],[\"dynamic-attr\",\"style\",[\"helper\",[\"progress-style\"],[[\"get\",[\"ti\",\"percent\"]],[\"get\",[\"ti\",\"id\"]],[\"get\",[\"colors\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n      Progress: \"],[\"append\",[\"unknown\",[\"ti\",\"percent\"]],false],[\"text\",\"%\\n\"],[\"block\",[\"if\"],[[\"get\",[\"ti\",\"value\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"ti\"]},{\"statements\":[[\"text\",\"Awaiting Multiple Child Tasks\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/joining-tasks-2/template.hbs" } });
});
define('dummy/docs/examples/joining-tasks/controller', ['exports', 'ember', 'dummy/utils', 'ember-concurrency'], function (exports, _ember, _dummyUtils, _emberConcurrency) {
  var methods = { all: _emberConcurrency.all, race: _emberConcurrency.race };

  var ProgressTracker = _ember['default'].Object.extend({
    id: null,
    percent: 0,
    word: null
  });

  exports['default'] = _ember['default'].Controller.extend({
    status: "Waiting...",
    trackers: null,

    parent: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(methodName) {
      var allOrRace, trackers, childTasks, id, tracker, words;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            allOrRace = methods[methodName];
            trackers = [], childTasks = [];

            for (id = 0; id < 5; ++id) {
              tracker = ProgressTracker.create({ id: id });

              trackers.push(tracker);
              childTasks.push(this.get('child').perform(tracker));
            }

            this.set('trackers', trackers);
            this.set('status', "Waiting for child tasks to complete...");
            context$1$0.next = 7;
            return allOrRace(childTasks);

          case 7:
            words = context$1$0.sent;

            this.set('status', 'Done: ' + _ember['default'].makeArray(words).join(', '));

          case 9:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable(),

    child: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(tracker) {
      var percent, word;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            percent = 0;

          case 1:
            if (!(percent < 100)) {
              context$1$0.next = 8;
              break;
            }

            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(Math.random() * 100 + 100);

          case 4:
            percent = Math.min(100, Math.floor(percent + Math.random() * 20));
            tracker.set('percent', percent);
            context$1$0.next = 1;
            break;

          case 8:
            word = (0, _dummyUtils.randomWord)();

            tracker.set('word', word);
            return context$1$0.abrupt('return', word);

          case 11:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).enqueue().maxConcurrency(3),

    colors: ['#ff8888', '#88ff88', '#8888ff']
  });

  // END-SNIPPET
});

// BEGIN-SNIPPET joining-tasks
define("dummy/docs/examples/joining-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Awaiting Multiple Child Tasks (or, cancelable Promise.all, Promise.race)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" provides Task-aware variants of\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all\"],[\"flush-element\"],[\"text\",\"Promise.all\"],[\"close-element\"],[\"text\",\" and\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race\"],[\"flush-element\"],[\"text\",\"Promise.race\"],[\"close-element\"],[\"text\",\",\\n  which can be used in cases where a parent task wants to wait\\n  for multiple child tasks to run to completion (or throw an error)\\n  before continuing onward. The \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\"\\n  variants both have the added benefit that if the parent task is canceled (or restarts),\\n  all of the child tasks will be automatically canceled. Similarly,\\n  in the case of \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"all()\"],[\"close-element\"],[\"text\",\",\\n  if any of the child tasks throws an error, all other child tasks\\n  are immediately canceled.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The example below can be started (or restarted) using either\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"all()\"],[\"close-element\"],[\"text\",\" to wait for all child tasks to run to completion,\\n  or \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"race()\"],[\"close-element\"],[\"text\",\" to wait for the first. Note that how, in both cases,\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".maxConcurrency(3)\"],[\"close-element\"],[\"text\",\" ensures that only 3 progress tasks\\n  run at a time, but if you restart the task while it's running, it immediately\\n  starts 3 tasks after canceling the previous ones.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Status: \"],[\"append\",[\"unknown\",[\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"parent\"]],\"all\"],null],null],[\"flush-element\"],[\"text\",\"all()\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"parent\"]],\"race\"],null],null],[\"flush-element\"],[\"text\",\"race()\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"trackers\"]]],null,1],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        Word: \"],[\"append\",[\"unknown\",[\"tracker\",\"word\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"progress-outer\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"progress-inner\"],[\"dynamic-attr\",\"style\",[\"helper\",[\"progress-style\"],[[\"get\",[\"tracker\",\"percent\"]],[\"get\",[\"tracker\",\"id\"]],[\"get\",[\"colors\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n      Progress: \"],[\"append\",[\"unknown\",[\"tracker\",\"percent\"]],false],[\"text\",\"%\\n\"],[\"block\",[\"if\"],[[\"get\",[\"tracker\",\"word\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"tracker\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/joining-tasks/template.hbs" } });
});
define('dummy/docs/examples/loading-ui/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET loading-ui-controller
  exports['default'] = _ember['default'].Controller.extend({
    askQuestion: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.next = 2;
            return (0, _emberConcurrency.timeout)(1000);

          case 2:
            this.set('result', Math.random());

          case 3:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).drop(),

    result: null
  });

  // END-SNIPPET
});
define("dummy/docs/examples/loading-ui/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loading UI While a Task is Running\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Reigning in undesired concurrency is partly what \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\"\\n  has to offer. The other part is making it easy to build UI around\\n  asynchronous tasks.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  For simple cases where you just need to display a loading dialog or disable a button\\n  while a task is running, you can make use of the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".isIdle\"],[\"close-element\"],[\"text\",\" property of\\n  a task, which is false when the task is running, and true otherwise. This eliminates\\n  a lot of the boilerplate of setting a property at the beginning of some async operation,\\n  and unsetting when the operation completes. Also, because the task in the example\\n  below uses the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop()\"],[\"close-element\"],[\"text\",\" modifier\\n  (see \"],[\"block\",[\"link-to\"],[\"docs.task-concurrency\"],null,3],[\"text\",\"),\\n  there's no need to write a guard at the beginning of the task to return early if\\n  the task is already running.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  What is the meaning of life?\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"result\"]]],null,2],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"askQuestion\",\"isIdle\"]],\"button-primary\"],null],null],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"askQuestion\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"askQuestion\",\"isIdle\"]]],null,1,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"loading-ui-controller.js\"]]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"ask-button.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          Thinking...\\n          \"],[\"append\",[\"helper\",[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          Ask\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\" Answer: \"],[\"append\",[\"unknown\",[\"result\"]],false],[\"text\",\" \"]],\"locals\":[]},{\"statements\":[[\"text\",\"Managing Task Concurrency\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/loading-ui/template.hbs" } });
});
define('dummy/docs/examples/modal-fun/controller', ['exports', 'ember', 'ember-concurrency/utils', 'ember-concurrency'], function (exports, _ember, _emberConcurrencyUtils, _emberConcurrency) {
  var computed = _ember['default'].computed;
  var alias = computed.alias;

  function reverse(s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--) {
      o += s[i];
    }
    return o;
  }

  // BEGIN-SNIPPET modal-fun-controller

  var PAUSE_FOREVER = _ember['default'].RSVP.defer().promise;

  exports['default'] = _ember['default'].Controller.extend({
    openWizard: (0, _emberConcurrency.task)({
      perform: regeneratorRuntime.mark(function perform() {
        return regeneratorRuntime.wrap(function perform$(context$1$0) {
          while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
              this.get('stepOne').perform();
              context$1$0.next = 3;
              return PAUSE_FOREVER;

            case 3:
            case 'end':
              return context$1$0.stop();
          }
        }, perform, this);
      }),

      states: (0, _emberConcurrency.taskGroup)().restartable(),
      currentState: alias('states.last'),

      next: taskByName('next'),
      prev: taskByName('prev'),

      stepOne: state({
        title: "Step 1",
        next: 'stepTwo',
        index: 0
      }),

      stepTwo: state({
        perform: regeneratorRuntime.mark(function perform() {
          return regeneratorRuntime.wrap(function perform$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
              case 0:
                if (!true) {
                  context$1$0.next = 6;
                  break;
                }

                context$1$0.next = 3;
                return (0, _emberConcurrency.timeout)(500);

              case 3:
                this.set('title', reverse(this.title));
                context$1$0.next = 0;
                break;

              case 6:
              case 'end':
                return context$1$0.stop();
            }
          }, perform, this);
        }),

        title: "Step 2",
        prev: 'stepOne',
        next: 'stepThree',
        index: 1
      }),

      stepThree: state({
        title: "Step 3",
        prev: 'stepTwo',
        index: 2
      })
    })
  });

  function state(attrs) {
    var defaultAttrs = {
      perform: regeneratorRuntime.mark(function perform() {
        return regeneratorRuntime.wrap(function perform$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return PAUSE_FOREVER;

            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, perform, this);
      })
    };
    (0, _emberConcurrencyUtils.objectAssign)(defaultAttrs, attrs);
    return (0, _emberConcurrency.task)(defaultAttrs).group('states');
  }

  function taskByName(key) {
    var currentKey = 'currentState.' + key;
    return computed(currentKey, function () {
      var name = this.get(currentKey);
      if (!name) {
        return null;
      }
      return this.get(name);
    });
  }

  // END-SNIPPET
});
define("dummy/docs/examples/modal-fun/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Experimental: Modals\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Bear with me here.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This is an experiment combining many different concepts of ember-concurrency,\\n  some old, some new/unrelease.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  State machines generally operate on the principle that you can\\n  only be in a single (possible nested) state at a time.\\n  Given that \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" makes it possible/easy\\n  to constrain the concurrency of tasks (and between tasks using\\n  task groups), what's the fundamental difference between a state\\n  in a state machine vs a task that can't run at the same time\\n  as sibling tasks? Answer: not a whole lot!\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The following ember-concurrency concepts are used to implement\\n  the example below:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Using taskGroups to group tasks (states) that shouldn't\\n    be allowed to run at the same time.\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"POJO tasks / encapsulated tasks / stateful tasks / whatever we end up calling them\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    Accessing the most recent performed task (entered state) via nameOfTask.last*\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"openWizard\"]]],null],null],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"openWizard\",\"isIdle\"]],\"clickable\"],null],null],[\"flush-element\"],[\"text\",\"\\n    Open Wizard\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"with\"],[[\"get\",[\"openWizard\",\"lastRunning\"]]],null,3],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"modal-fun-controller.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"modal-fun-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"u-pull-right\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"modal\",\"next\"]]],null],null],[\"flush-element\"],[\"text\",\"Next\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"u-pull-left\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"modal\",\"prev\"]]],null],null],[\"flush-element\"],[\"text\",\"Prev\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"fun-modal-container\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"u-pull-right\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"cancel-all\"],[[\"get\",[\"modal\",\"task\"]]],null],null],[\"flush-element\"],[\"text\",\"Close\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"modal\",\"currentState\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Wat wat wat\"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"modal\",\"prev\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"modal\",\"next\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"modal-dialog\"],null,null,2]],\"locals\":[\"modal\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/modal-fun/template.hbs" } });
});
define('dummy/docs/examples/observables/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  var Observable = window.Rx.Observable;

  var range = Observable.range;
  exports['default'] = _ember['default'].Controller.extend(_ember['default'].Evented, {
    values: null,

    // BEGIN-SNIPPET observables-timetable
    computeStuff: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var values;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            values = _ember['default'].A();

            this.set('values', values);
            context$1$0.next = 4;
            return (0, _emberConcurrency.subscribe)(range(5, 5), regeneratorRuntime.mark(function callee$1$0(x) {
              return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                  case 0:
                    context$2$0.next = 2;
                    return (0, _emberConcurrency.subscribe)(range(10, 3), regeneratorRuntime.mark(function callee$2$0(y) {
                      return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                          case 0:
                            values.pushObject({ message: 'What is ' + x + ' x ' + y + ' ? ' });
                            context$3$0.next = 3;
                            return (0, _emberConcurrency.timeout)(200);

                          case 3:
                            values.pushObject({ message: x * y + '. ' });

                          case 4:
                          case 'end':
                            return context$3$0.stop();
                        }
                      }, callee$2$0, this);
                    })).enqueue();

                  case 2:
                    values.pushObject({ message: "\n" });

                  case 3:
                  case 'end':
                    return context$2$0.stop();
                }
              }, callee$1$0, this);
            })).enqueue();

          case 4:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable(),
    // END-SNIPPET

    // BEGIN-SNIPPET observables-evented
    fooStatus: null,
    listenForFooInternally: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.set('fooStatus', 'Waiting for values...');

            context$1$0.next = 3;
            return (0, _emberConcurrency.subscribe)((0, _emberConcurrency.events)(this, 'foo'), regeneratorRuntime.mark(function callee$1$0(x) {
              return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                  case 0:
                    this.set('fooStatus', 'Got value ' + x + ', thinking...');
                    context$2$0.next = 3;
                    return (0, _emberConcurrency.timeout)(1500);

                  case 3:
                    this.set('fooStatus', this.fooStatus + ' Done');
                    context$2$0.next = 6;
                    return (0, _emberConcurrency.timeout)(200);

                  case 6:
                  case 'end':
                    return context$2$0.stop();
                }
              }, callee$1$0, this);
            })).enqueue();

          case 3:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).on('init'),

    actions: {
      triggerFoo: function triggerFoo() {
        this.trigger('foo', Math.floor(100 * Math.random()));
      }
    }
    // END-SNIPPET
  });
});
define("dummy/docs/examples/observables/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Experimental: Observables\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" integrates with Observables\\n  and lets you apply the same concurrency constraints to\\n  subscriptions to Observables that you could apply to a task —\\n  just as you can configure a Task to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop()\"],[\"close-element\"],[\"text\",\" new\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform()\"],[\"close-element\"],[\"text\",\"s while the task is already running, so can\\n  you configure the subscription to an async sequence of events\\n  (the Observable) to \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop()\"],[\"close-element\"],[\"text\",\" events while the\\n  previous event is being handled (or use any other task modifier\\n  you like).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Nested loop of Observable range of numbers\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"computeStuff\"]]],null],null],[\"flush-element\"],[\"text\",\"Compute Stuff\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"pre\",[]],[\"flush-element\"],[\"block\",[\"each\"],[[\"get\",[\"values\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"observables-timetable.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Subscribing to Observable of Evented events\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Status: \"],[\"append\",[\"unknown\",[\"fooStatus\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"triggerFoo\"]],[\"flush-element\"],[\"text\",\"Trigger Foo\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"observables-evented.js\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"unknown\",[\"v\",\"message\"]],false]],\"locals\":[\"v\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/observables/template.hbs" } });
});
define('dummy/docs/examples/route-tasks/controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    ids: [1, 2, 3, 4, 10, 50, 200]
  });
});
define('dummy/docs/examples/route-tasks/detail/route', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET detail-route
  exports['default'] = _ember['default'].Route.extend({
    notify: _ember['default'].inject.service('notify'),

    setupController: function setupController(controller, model) {
      this.get('pollServerForChanges').perform(model.id);
    },

    pollServerForChanges: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(id) {
      var notify;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            notify = this.get('notify');
            context$1$0.next = 3;
            return (0, _emberConcurrency.timeout)(500);

          case 3:
            context$1$0.prev = 3;

            notify.info('Thing ' + id + ': Starting to poll for changes');

          case 5:
            if (!true) {
              context$1$0.next = 11;
              break;
            }

            context$1$0.next = 8;
            return (0, _emberConcurrency.timeout)(5000);

          case 8:
            notify.info('Thing ' + id + ': Polling now...');
            context$1$0.next = 5;
            break;

          case 11:
            context$1$0.prev = 11;

            notify.warning('Thing ' + id + ': No longer polling for changes');
            return context$1$0.finish(11);

          case 14:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[3,, 11, 14]]);
    })).cancelOn('deactivate').restartable()
  });

  // END-SNIPPET
});
define('dummy/docs/examples/route-tasks/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs.examples.route-tasks.detail', 1);
    }
  });
});
define("dummy/docs/examples/route-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Tasks on Ember.Route (and other long-lived objects)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" tasks are scoped to the lifetime of\\n  the object they live on, so if that object is destroyed, all of the\\n  tasks attached to it are canceled.  This is very convenient when\\n  writing tasks on object with finite lifetimes, like Components, but certain Ember objects, like\\n  Routes (and Controllers), are never actually destroyed, but even\\n  if you can't rely on object destruction to cancel a task,\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" makes it easy to run\\n  tasks between lifecycle events other than \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"init\"],[\"close-element\"],[\"text\",\"\\n  and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"destroy\"],[\"close-element\"],[\"text\",\".\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Try clicking the links below. As the URL changes, you should see\\n  notifications about the server polling status changing. If you\\n  leave this route (by going to another page on this site), you'll\\n  see that the polling task is being properly canceled.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"ids\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    We use the \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/aexmachina/ember-notify\"],[\"flush-element\"],[\"text\",\"ember-notify\"],[\"close-element\"],[\"text\",\" Ember Addon\\n    to display notifications using the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"notify\"],[\"close-element\"],[\"text\",\" service it provides.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"setupController\"],[\"close-element\"],[\"text\",\" kicks off the task with the current model id\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"pollServerForChanges\"],[\"close-element\"],[\"text\",\" task polls the server in a loop,\\n    and uses the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"finally\"],[\"close-element\"],[\"text\",\" block to notify when it is being canceled.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    We use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"restartable\"],[\"close-element\"],[\"text\",\" to ensure that only one instance of the\\n    task is running at a time, hence any time \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"setupController\"],[\"close-element\"],[\"text\",\"\\n    performs the task, any prior instances are canceled.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    We use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".cancelOn('deactivate')\"],[\"close-element\"],[\"text\",\" to make sure the task cancels\\n    when the user leaves the route.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"detail-route.js\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      Thing \"],[\"append\",[\"unknown\",[\"id\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"docs.examples.route-tasks.detail\",[\"get\",[\"id\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"id\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/route-tasks/template.hbs" } });
});
define('dummy/docs/examples/task-concurrency/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs.task-concurrency');
    }
  });
});
define('dummy/docs/examples/task-groups/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET task-groups
  exports['default'] = _ember['default'].Controller.extend({
    everything: (0, _emberConcurrency.taskGroup)(),
    everythingDropped: (0, _emberConcurrency.taskGroup)().drop(),
    everythingEnqueue: (0, _emberConcurrency.taskGroup)().enqueue(),
    everythingRestart: (0, _emberConcurrency.taskGroup)().restartable(),
    everythingDropped3: (0, _emberConcurrency.taskGroup)().maxConcurrency(3).drop(),
    everythingEnqueue3: (0, _emberConcurrency.taskGroup)().maxConcurrency(3).enqueue(),
    everythingRestart3: (0, _emberConcurrency.taskGroup)().maxConcurrency(3).restartable(),

    taskGroups: _ember['default'].computed(function () {
      return [this.get('everything'), this.get('everythingDropped'), this.get('everythingEnqueue'), this.get('everythingRestart'), this.get('everythingDropped3'), this.get('everythingEnqueue3'), this.get('everythingRestart3')];
    })
  });

  // END-SNIPPET
});
define("dummy/docs/examples/task-groups/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Task Groups (beta)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  To constrain the concurrency of a single task,\\n  you use \"],[\"block\",[\"link-to\"],[\"docs.task-concurrency\"],null,2],[\"text\",\",\\n  but what if you want to ensure that\\n  two (or more) separate tasks don't run at the same time?\\n  In these cases, you use \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Task Groups\"],[\"close-element\"],[\"text\",\":\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Declare a task group via \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"nameOfGroup: taskGroup()\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    Apply any desired \"],[\"block\",[\"link-to\"],[\"docs.task-concurrency\"],null,1],[\"text\",\"\\n    to that task group (just as you would with a normal task).\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    Append \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".group('nameOfGroup')\"],[\"close-element\"],[\"text\",\" to any tasks you want to\\n    be considered part of the group.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Whereas using a modifier like \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop()\"],[\"close-element\"],[\"text\",\" on a single task\\n  prevents that single task from running concurrently, using\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop()\"],[\"close-element\"],[\"text\",\" on a Task Group ensures that only one\\n  task in that Task Group can be running at any given time.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Cancelation\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Additionally, just as you can \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"cancelAll\"],[\"close-element\"],[\"text\",\" running\\n  instances of a task, the Task Group object exposes the\\n  same \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"cancelAll\"],[\"close-element\"],[\"text\",\" method (and \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"cancel-all\"],[\"close-element\"],[\"text\",\"\\n  template helper) which will cancel any running task instances\\n  that belong to that group.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Nested Task Groups\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Task Groups can be \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\".group()\"],[\"close-element\"],[\"text\",\"ed to other\\n  Task Groups, forming a hierarchy with Tasks at the leaves.\\n  In such a hierarchy, all Tasks will share the concurrency\\n  constraints of the root task group\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Examples\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The following examples demonstrate nested task groups\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-groups.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-group-component.js\"]]],false],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"taskGroups\"]]],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"task-group-example\"],null,[[\"taskGroup\"],[[\"get\",[\"group\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"group\"]},{\"statements\":[[\"text\",\"Task Modifiers\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Task Modifiers\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/task-groups/template.hbs" } });
});
define("dummy/docs/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Introduction\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" is a small but powerful library that supplements\\n  Ember's existing tools and conventions for handling concurrency and\\n  asynchrony.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  For a high-level view of what ember-concurrency can do for your app,\\n  check out this article:\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://medium.com/@machty/ember-concurrency-the-solution-to-so-many-problems-you-never-knew-you-had-cce6d7731ba9#.e6r0iv44u\"],[\"flush-element\"],[\"text\",\"\\n    ember-concurrency: the solution to so many problems you never knew you had\"],[\"close-element\"],[\"text\",\".\\n  If you'd prefer a video introduction to the ideas and concepts behind ember-concurrency,\\n  check out the video below from the\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://twitter.com/EmberMeetup\"],[\"flush-element\"],[\"text\",\"Ember Global Meetup\"],[\"close-element\"],[\"text\",\"\\n  (\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://alexmatchneer.com/ember-concurrency-global-meetup-slides/\"],[\"flush-element\"],[\"text\",\"slides available here\"],[\"close-element\"],[\"text\",\"):\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"text-align: center\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"iframe\",[]],[\"static-attr\",\"src\",\"https://player.vimeo.com/video/162329769\"],[\"static-attr\",\"width\",\"500\"],[\"static-attr\",\"height\",\"281\"],[\"static-attr\",\"frameborder\",\"0\"],[\"static-attr\",\"webkitallowfullscreen\",\"\"],[\"static-attr\",\"mozallowfullscreen\",\"\"],[\"static-attr\",\"allowfullscreen\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Key Ideas / Goals\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"It should be easy to write \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"cancelable\"],[\"close-element\"],[\"text\",\" asynchronous operations (this is hard to do with Promises).\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"It should be easy to prevent two or more async operations from happening at the same time (this is hard to do with Promises and Observables).\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Minimize boilerplate\"],[\"close-element\"],[\"text\",\" and \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"maximize implicit state\"],[\"close-element\"],[\"text\",\" so that common UI tasks like\\n      displaying loading spinners or styling inactive buttons require as little code as possible.\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"The API should feel familiar and \\\"at home\\\" for Ember developers.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Tasks\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" enables you to write \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Tasks\"],[\"close-element\"],[\"text\",\", which are asynchronous,\\n  cancelable operations that are bound to the lifetime of the object they live on,\\n  which means when the host object is destroyed (e.g. a component is unrendered),\\n  the task is automatically canceled. Here is an example of a task:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"intro-task\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"intro-task.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The example above demonstrates a few things:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    Tasks are implemented using\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*\"],[\"flush-element\"],[\"text\",\"ES6 Generator Function syntax\"],[\"close-element\"],[\"text\",\"\\n    and the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" keyword\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    This syntax enables writing async code in a synchronous looking manner\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    It is trivial to restart a task without having to manually cancel the previous task.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Without Tasks\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  If you were to rewrite the above example without using tasks,\\n  it would look something like this:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"intro-task-oldschool\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"intro-task-oldschool.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  As you can see, it takes a surprising amount of code to handle\\n  all of the corner cases when dealing with async code:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    You have to stop the currently running operation before starting a new\\n    operation in its place; in other words, you need to constrain concurrency\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    You have to stop the operation when the parent object is destroyed\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    You have to break down each step of the asynchronous operation into\\n    individually cancelable units\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/index/template.hbs" } });
});
define("dummy/docs/installation/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Installation\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Within your ember-cli project folder, run the following:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"ember-install.sh\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/installation/template.hbs" } });
});
define('dummy/docs/task-concurrency-advanced/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  var marked0$0 = [SHARED_TASK_FN].map(regeneratorRuntime.mark);

  function SHARED_TASK_FN(tracker) {
    return regeneratorRuntime.wrap(function SHARED_TASK_FN$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          tracker.start();
          context$1$0.prev = 1;
          context$1$0.next = 4;
          return (0, _emberConcurrency.timeout)(1500);

        case 4:
          context$1$0.prev = 4;

          tracker.end();
          return context$1$0.finish(4);

        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this, [[1,, 4, 7]]);
  }

  // BEGIN-SNIPPET shared-tasks-concurrent
  exports['default'] = _ember['default'].Controller.extend({
    restartableTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).restartable(),
    enqueuedTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
    droppingTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).drop(),
    keepLatestTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).keepLatest()
  });

  // END-SNIPPET
});

// simulate async work
define("dummy/docs/task-concurrency-advanced/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Using \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".maxConcurrency(N)\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The examples on the previous page limit the concurrency of a task to 1 — only\\n  one instance of a task can run at a time. Most of the time, this\\n  is exactly what you want.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  There are some cases, however, when you might want to limit\\n  the number of concurrently running task instances to a number greater\\n  than 1.  In such cases, you can use the task modifier\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".maxConcurrency(n)\"],[\"close-element\"],[\"text\",\" to opt into a specific maximum\\n  concurrency other than 1.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The examples below use the same task modifiers as the ones on the previous\\n  page, but with \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".maxConcurrency(3)\"],[\"close-element\"],[\"text\",\" applied to them: they each\\n  allow 3 running instances before enqueuing, canceling, or dropping\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform()\"],[\"close-element\"],[\"text\",\"s.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"shared-tasks-concurrent.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"restartable with .maxConcurrency(3)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  When concurrency exceeds maxConcurrency, the oldest running task is canceled.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"restartableTask3\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    TODO: while restartable is an excellent name when maxConcurrency\\n    is 1, it poorly describes the behavior for values greater than 1.\\n    A better name in this case might be .sliding(), as in sliding buffer.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"enqueue with .maxConcurrency(3)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"enqueuedTask3\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"drop with .maxConcurrency(3)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"droppingTask3\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\".keepLatest() with .maxConcurrency(3)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"keepLatestTask3\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    Thanks to \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/ef4\"],[\"flush-element\"],[\"text\",\"Edward Faulkner\"],[\"close-element\"],[\"text\",\" for providing\\n    a starting point for the graphs :)\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-concurrency-advanced/template.hbs" } });
});
define('dummy/docs/task-concurrency/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  var marked0$0 = [SHARED_TASK_FN].map(regeneratorRuntime.mark);

  function SHARED_TASK_FN(tracker) {
    return regeneratorRuntime.wrap(function SHARED_TASK_FN$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          tracker.start();
          context$1$0.prev = 1;
          context$1$0.next = 4;
          return (0, _emberConcurrency.timeout)(1500);

        case 4:
          context$1$0.prev = 4;

          tracker.end();
          return context$1$0.finish(4);

        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this, [[1,, 4, 7]]);
  }

  // BEGIN-SNIPPET shared-tasks
  exports['default'] = _ember['default'].Controller.extend({
    defaultTask: (0, _emberConcurrency.task)(SHARED_TASK_FN),
    restartableTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).restartable(),
    enqueuedTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).enqueue(),
    droppingTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).drop(),
    keepLatestTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).keepLatest()
  });

  // END-SNIPPET
});

// simulate async work
define("dummy/docs/task-concurrency/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Managing Task Concurrency\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  By default, \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" tasks run concurrently\\n  — if you call \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask.perform(); myTask.perform();\"],[\"close-element\"],[\"text\",\",\\n  two instances of the task will run at the same time (unless the object\\n  they live on is destroyed, in which case they'll be canceled).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Often, you want to guarantee that no more than one instance of a task\\n  runs at the same time; for instance, if you have a task that saves\\n  model state to the server, you probably don't want that task to run\\n  concurrently — you want it to run sequentially, or you might\\n  want to ignore attempts to perform the task if it's already running.\\n  Manually enforcing these constraints is tricky and often results\\n  in redundant, error-prone boilerplate, but ember-concurrency\\n  makes it easy to reign in this undesired concurrency with the\\n  modifiers described below.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Examples\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  All of the examples below run the same task function (which\\n  just pauses for a moment and then completes), but with\\n  different task modifiers applied:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"shared-tasks.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Default Behavior: Tasks Run Concurrently\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Tap the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task.perform()\"],[\"close-element\"],[\"text\",\" button a few times. Note how\\n  the lifetimes of each task overlap, and each task runs to completion.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"defaultTask\"]]]]],false],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"restartable\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"restartable\"],[\"close-element\"],[\"text\",\" modifier ensures that only one instance\\n  of a task is running by canceling any currently-running tasks and starting\\n  a new task instance immediately. Note how there is no task overlap,\\n  and how currently running tasks get canceled\\n  if a new task starts before a prior one completes.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    Check out \"],[\"block\",[\"link-to\"],[\"docs.examples.autocomplete\"],null,1],[\"text\",\" for\\n    a practical example of restartable\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"restartableTask\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"enqueue\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"enqueue\"],[\"close-element\"],[\"text\",\" modifier ensures that only one instance\\n  of a task is running be maintaining a queue of pending tasks and\\n  running them sequentially. Note how there is no task overlap, but no\\n  tasks are canceled either.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"enqueuedTask\"]]]]],false],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"drop\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop\"],[\"close-element\"],[\"text\",\" modifier drops tasks that are \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform\"],[\"close-element\"],[\"text\",\"ed\\n  while another is already running. Dropped tasks' functions are never even called.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    Check out the \"],[\"block\",[\"link-to\"],[\"docs.examples.loading-ui\"],null,0],[\"text\",\" example for a common\\n    use case for \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"droppingTask\"]]]]],false],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\".keepLatest()\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".keepLatest()\"],[\"close-element\"],[\"text\",\" will drop all by the most recent intermediate \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".perform()\"],[\"close-element\"],[\"text\",\",\\n  which is enqueued to run later.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    Use case: you poll the server in a loop, but during the server request,\\n    you get some other indication (say, via websockets) that the data is stale\\n    and you need to query the server again when the initial request completed.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"keepLatestTask\"]]]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Loading UI\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Debounced Auto-Search\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-concurrency/template.hbs" } });
});
define("dummy/docs/task-function-syntax/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Task Function Syntax\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  When a task is performed, it runs the code in the task function\\n  you passed into \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task()\"],[\"close-element\"],[\"text\",\". This function must\\n  be a \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*\"],[\"flush-element\"],[\"text\",\"generator function\"],[\"close-element\"],[\"text\",\"\\n  — it must use the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"function *\"],[\"close-element\"],[\"text\",\" syntax, and cannot\\n  be just a regular JavaScript function.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This example demonstrates how, in ember-concurrency, generator\\n  functions behave \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"just like regular functions\"],[\"close-element\"],[\"text\",\". Anything you can\\n  do in a regular function, you can do in a generator function.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"task-function-syntax-2\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-2.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Using the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" keyword\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Much of the power of Tasks is unleashed once you start making\\n  use of the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" keyword within generator functions.\\n  The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" keyword, when used with a promise, lets you\\n  pause execution of your task function until that promise resolves, at\\n  which point the task function will continue running from where it\\n  had paused.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This example demonstrates how you can \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield timeout(1000)\"],[\"close-element\"],[\"text\",\"\\n  to pause execution for 1000 ms (one second). The \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"timeout()\"],[\"close-element\"],[\"text\",\"\\n  helper function, which \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"ember-concurrency\"],[\"close-element\"],[\"text\",\" provides,\\n  simply returns a promise that resolves after the specified number of milliseconds.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"task-function-syntax-1\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-1.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  When you \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" a promise, the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" expression\\n  evaluates to the resolved value of the promise. In other words, you can\\n  set a variable equal to a yielded promise, and when the promise resolves,\\n  the task function will resume and the value stored into that variable will\\n  be the resolved value of the promise.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"task-function-syntax-3\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-3.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  If you \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\" a promise that rejects, the task function will\\n  throw the rejected value (likely an exception object) from the point in\\n  task function where the rejecting promise was yielded. This means you can\\n  use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"try {} catch(e) {} finally {}\"],[\"close-element\"],[\"text\",\" blocks, just as you would\\n  for code that runs synchronously.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"task-function-syntax-4\"]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-4.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The behavior of yielding promises within task generator functions\\n  is designed to closely follow the behavior of the proposed\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/tc39/ecmascript-asyncawait\"],[\"flush-element\"],[\"text\",\"async/await\"],[\"close-element\"],[\"text\",\"\\n  syntax, but instead of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"async function\"],[\"close-element\"],[\"text\",\", you use\\n  \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"function *\"],[\"close-element\"],[\"text\",\", and instead of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"await\"],[\"close-element\"],[\"text\",\", you\\n  use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"yield\"],[\"close-element\"],[\"text\",\".\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-function-syntax/template.hbs" } });
});
define('dummy/docs/task-groups/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  var marked0$0 = [taskFn].map(regeneratorRuntime.mark);

  function taskFn() {
    return regeneratorRuntime.wrap(function taskFn$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return (0, _emberConcurrency.timeout)(1500);

        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  // BEGIN-SNIPPET task-groups
  exports['default'] = _ember['default'].Controller.extend({
    chores: (0, _emberConcurrency.taskGroup)().drop(),

    mowLawn: (0, _emberConcurrency.task)(taskFn).group('chores'),
    doDishes: (0, _emberConcurrency.task)(taskFn).group('chores'),
    changeDiapers: (0, _emberConcurrency.task)(taskFn).group('chores'),

    tasks: _ember['default'].computed(function () {
      return [this.get('mowLawn'), this.get('doDishes'), this.get('changeDiapers')];
    })
  });

  // END-SNIPPET
});
define("dummy/docs/task-groups/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Task Groups\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  While \"],[\"block\",[\"link-to\"],[\"docs.task-concurrency\"],null,2],[\"text\",\"\\n  prevent a single task from running concurrently, \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Task Groups\"],[\"close-element\"],[\"text\",\"\\n  make it possible to prevent \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"multiple tasks\"],[\"close-element\"],[\"text\",\" from running at the same time.\\n  Using Task Groups is a two-step process:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Define the task group property, e.g. \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"nameOfGroup: taskGroup()\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"For each task in the group, use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".group()\"],[\"close-element\"],[\"text\",\" to associate\\n      the task with the group, e.g. \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"myTask: task(...).group('nameOfGroup')\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Once you define a task as part of a task group, you can no longer use\\n  other task modifiers like \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"drop()\"],[\"close-element\"],[\"text\",\" or \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"restartable()\"],[\"close-element\"],[\"text\",\"\\n  on that task; instead, just apply those task modifiers to the task group property instead,\\n  as demonstrated in the example below.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  In this example, we group related \\\"chores\\\" tasks and by using the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".drop()\"],[\"close-element\"],[\"text\",\"\\n  modifier on the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"taskGroup\"],[\"close-element\"],[\"text\",\" property we ensure that only one\\n  chore task runs at a time. In addition to preventing concurrency between multiple\\n  tasks, this example also demonstrates how having access to both the\\n  state of the task group, as well as its individual members,\\n  makes it very easy to build out common UI patterns, such as active/idle states\\n  of related buttons in a button bar.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tasks\"]]],null,1],[\"text\",\"\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Chores group state: \"],[\"append\",[\"unknown\",[\"chores\",\"state\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"\\n  Most Recent Chore:\\n\"],[\"block\",[\"with\"],[[\"get\",[\"chores\",\"last\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-groups.js\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"task-groups-template.hbs\"]]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"unknown\",[\"taskInstance\",\"task\",\"name\"]],false],[\"text\",\" (\"],[\"append\",[\"unknown\",[\"taskInstance\",\"state\"]],false],[\"text\",\")\\n\"]],\"locals\":[\"taskInstance\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"get\",[\"task\",\"isIdle\"]],\"clickable\"],null],null],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"task\"]]],null],null],[\"flush-element\"],[\"append\",[\"unknown\",[\"task\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"task\"]},{\"statements\":[[\"text\",\"Task Modifiers\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-groups/template.hbs" } });
});
define("dummy/docs/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"docs row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"three columns\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"side-menu\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tableOfContents\"]]],[[\"key\"],[\"route\"]],6],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nine columns\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"nav-header\"],null,[[\"nextTopic\",\"prevTopic\"],[[\"get\",[\"nextTopic\"]],[\"get\",[\"prevTopic\"]]]]],false],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"github-edit\"]],false],[\"text\",\"\\n\\n      \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n      \"],[\"append\",[\"helper\",[\"nav-header\"],null,[[\"nextTopic\",\"prevTopic\"],[[\"get\",[\"nextTopic\"]],[\"get\",[\"prevTopic\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"unknown\",[\"child\",\"title\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"block\",[\"link-to\"],[[\"get\",[\"child\",\"route\"]]],null,0],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"child\"]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"entry\",\"children\"]]],[[\"key\"],[\"route\"]],1],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"unknown\",[\"entry\",\"title\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"append\",[\"unknown\",[\"entry\",\"title\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"block\",[\"link-to\"],[[\"get\",[\"entry\",\"route\"]]],null,4],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"entry\",\"route\"]]],null,5,3],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"entry\",\"children\"]]],null,2],[\"text\",\"          \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"entry\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/template.hbs" } });
});
define("dummy/docs/testing-debugging/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Testing\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Ember doesn't yet have strong conventions for testing\\n  long-term timers and polling loops, and since many of the use cases\\n  that ember-concurrency addresses involves heavy use of \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"timeout()\"],[\"close-element\"],[\"text\",\",\\n  and often times within a (possibly infinite) loop, it can be difficult\\n  to figure out how to test code that makes heavy use of such things\\n  within ember-concurrency tasks.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"\\n    NOTE: this is an area of active development within the Ember community,\\n    particularly amongst ember-concurrency users; in due time we will probably\\n    have more official API (possibly in the form of another addon) to help\\n    make testing time more manageable, but in the meantime, this page documents\\n    some common approaches to testing time with present-day tooling.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"The Problem\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Consider the following (common) pattern for polling a server for changes:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"poll-loop.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The above example uses ember-concurrency tasks; to demonstrate that these\\n  issues aren't limited to ember-concurrency tasks, here is how the same\\n  logic might be written without ember-concurrency:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"poll-loop-classic.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Both of these cases involve a \\\"poll loop\\\": on every iteration, do something asynchronous,\\n  then pause for some period of time, then repeat.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  If, within an acceptance test, you \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"visit()\"],[\"close-element\"],[\"text\",\"ed the page that\\n  causes this loop to start, your acceptance test case would \\\"hang\\\" and eventually\\n  fail with a QUnit test timeout. The reason this happens is that the Ember testing\\n  tools are aware of all timers created via \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"Ember.run.later\"],[\"close-element\"],[\"text\",\" (and\\n  ember-concurrency's \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"timeout()\"],[\"close-element\"],[\"text\",\" helper internally uses \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"Ember.run.later\"],[\"close-element\"],[\"text\",\"),\\n  and will wait for all timers to \\\"settle\\\" before allowing the test to proceed.\\n  But if you have a timer within a loop, the timers will never settle, and hence\\n  your test will hang.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The solution, one way or another, is to \\\"break\\\" the timer loop when in a testing environment.\\n  Here are all the ways to do that, each with their own problems / tradeoffs:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Insert \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"Ember.testing\"],[\"close-element\"],[\"text\",\" checks in your code\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"poll-loop-break-1.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This is sufficient when it's satisfactory to just test a single\\n  iteration of a loop, but a) it won't test that the task continues\\n  to loop, and b) it's unfortunate to have to riddle your actual\\n  code with testing logic.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"Ember.run.cancelTimers\"],[\"close-element\"],[\"text\",\" in your test case\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This is the approach used by the ember-concurrency\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/machty/ember-concurrency/blob/72f70b6c327f5242ca623d61ea0595b5f9093896/tests/helpers/start-app.js#L17-L19\"],[\"flush-element\"],[\"text\",\"documentation site tests\"],[\"close-element\"],[\"text\",\";\\n  since any of the pages on this docs site might demonstrate a live\\n  ember-concurrency task with a timer loop, all of the acceptance tests\\n  automatically cancel all outstanding timers after 500ms to effectively\\n  stop all tasks wherever they're paused.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"No loops, but long timers\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  If you're testing code that just uses long timers, but not necessarily loops,\\n  you might still run into the problem of test cases that take too long to complete,\\n  or might hit the QUnit timeout. A common solution to this problem is to use much\\n  smaller millisecond timer values in a testing environment. You can either do this\\n  by checking \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"Ember.testing\"],[\"close-element\"],[\"text\",\" wherever you set a timer, or, more elegantly, you can\\n  define common timer values in a config file, import the timer values\\n  wherever you need to set a timer, and in test environments, the config\\n  file specifies much smaller values so that the timers elapse more quickly.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"The Future\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The above solutions leave much to be desired. Hopefully a definitive solution\\n  that produces clear, deterministic, consistent results will emerge from the\\n  community. There are some \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://gist.github.com/machty/574457b1f2d993cc5959a1d6d6c74e5b\"],[\"flush-element\"],[\"text\",\"ideas\"],[\"close-element\"],[\"text\",\"\\n  floating around, and if you're interested in contributing to the discussion\\n  please join the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"#e-concurrency\"],[\"close-element\"],[\"text\",\" channel on the Ember Community Slack.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Also, if you're finding success with a testing approach that wasn't mentioned here,\\n  please open a GitHub issue with your ideas or open a Pull Request to add\\n  additional docs to \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/machty/ember-concurrency/blob/master/tests/dummy/app/docs/testing-debugging/template.hbs\"],[\"flush-element\"],[\"text\",\"this page\"],[\"close-element\"],[\"text\",\".\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Debugging\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://vanderwijk.info/blog/how-disable-es6-transpilation-emberjs-in-order-have-better-debugging-experience/\"],[\"flush-element\"],[\"text\",\"This article\"],[\"close-element\"],[\"text\",\"\\n  provides some nice ideas as to how to improve the debugging experience within ember-concurrency:\\n  in particular, by blacklisting \\\"regenerator\\\" in your app's Babel configuration,\\n  you can avoid Ember transpiling your task generator functions into a somewhat\\n  unrecognizable format. Just keep in mind that you should probably only enable\\n  this configuration in a development environment, and that whatever browser\\n  you're testing on needs to have a spec-compliant implementation of generator\\n  functions (Chrome's implementation only became spec-compliant around June, 2016).\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/testing-debugging/template.hbs" } });
});
define("dummy/docs/writing-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Writing Your First Task\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Step 1: Deciding where the Task will live\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Should you define a task on a Component? Or perhaps a Service?\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  This choice is important because \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Tasks get automatically canceled\\n  when they object they live on is destroyed\"],[\"close-element\"],[\"text\",\".\\n  So if you want the task to cancel when a component is unrendered, define\\n  it on a Component class, but if you need it to outlive a component's lifespan,\\n  it probably belongs on a Service or Controller.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Step 2: Implementing the task\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Once you've decided where you want a task to live, you can start implementing\\n  your task.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"code-snippet\"],null,[[\"name\"],[\"writing-tasks.js\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The next section on \"],[\"block\",[\"link-to\"],[\"docs.task-function-syntax\"],null,0],[\"text\",\" goes\\n  into greater detail about the generator function syntax and how you can use it\\n  to write tasks.\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Step 3: Performing the task\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  Now that you've implemented your Task, you'll need some way to actually\\n  perform it. You have three options:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ol\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    In JavaScript, get a reference to the task and call \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task.perform(...)\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    In your Handlebars template, use the \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"perform\"],[\"close-element\"],[\"text\",\" helper\\n    (e.g. \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"(perform myTask)\"],[\"close-element\"],[\"text\",\").\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n    In JavaScript, specify the Ember Events that should cause the task to\\n    run using \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"task(...).on(eventName)\"],[\"close-element\"],[\"text\",\". You can use \"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\".on('init')\"],[\"close-element\"],[\"text\",\"\\n    to create a task the runs as soon as the object it lives on is initialized.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  The following example demonstrates all three variants:\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Live Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"start-task-example\"]],false],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Task Function Syntax\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/writing-tasks/template.hbs" } });
});
define('dummy/experimental-prediction/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  var marked0$0 = [SHARED_TASK_FN].map(regeneratorRuntime.mark);

  function SHARED_TASK_FN(tracker) {
    return regeneratorRuntime.wrap(function SHARED_TASK_FN$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          tracker.start();
          context$1$0.prev = 1;
          context$1$0.next = 4;
          return (0, _emberConcurrency.timeout)(1500);

        case 4:
          context$1$0.prev = 4;

          tracker.end();
          return context$1$0.finish(4);

        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, marked0$0[0], this, [[1,, 4, 7]]);
  }

  exports['default'] = _ember['default'].Controller.extend({
    defaultTask: (0, _emberConcurrency.task)(SHARED_TASK_FN),
    restartableTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).restartable(),
    enqueuedTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).enqueue(),
    droppingTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).drop(),
    restartableTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).restartable(),
    enqueuedTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
    droppingTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).drop(),

    tasks: _ember['default'].computed(function () {
      return [this.get('defaultTask'), this.get('restartableTask'), this.get('enqueuedTask'), this.get('droppingTask'), this.get('restartableTask3'), this.get('enqueuedTask3'), this.get('droppingTask3')];
    })
  });
});

// simulate async work
define("dummy/experimental-prediction/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Experimental: all derivable state about a task\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    Because the \\\"buffering policy\\\" for a task is declaratively\\n    specified up front (via task modifiers like drop, enqueue),\\n    someone who wants to .perform a task can know up front whether\\n    perform()ing that task right now would 1) immediately execute\\n    the task instance, 2) immediately cancel (drop) the task\\n    instance, or 3) enqueue the task instance for later execution.\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    This experiment is part of my attempt to squeeze out the maximal\\n    amount of derivable state from the declarative ember-concurrency\\n    API. Once we have all the derivable state we can coalesce\\n    into more reasonable APIs/patterns to expose to the user.\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"tasks\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"task\",\"name\"]],false],[\"text\",\", maxConcurrency=\"],[\"append\",[\"unknown\",[\"task\",\"_maxConcurrency\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"isRunning: \"],[\"append\",[\"helper\",[\"caps-bool\"],[[\"get\",[\"task\",\"isRunning\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"concurrency: \"],[\"append\",[\"unknown\",[\"task\",\"concurrency\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"nextPerformState: \"],[\"append\",[\"unknown\",[\"task\",\"nextPerformState\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"performWillSucceed: \"],[\"append\",[\"helper\",[\"caps-bool\"],[[\"get\",[\"task\",\"performWillSucceed\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"performWillDrop: \"],[\"append\",[\"helper\",[\"caps-bool\"],[[\"get\",[\"task\",\"performWillDrop\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"performWillEnqueue: \"],[\"append\",[\"helper\",[\"caps-bool\"],[[\"get\",[\"task\",\"performWillEnqueue\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"performWillCancelPrevious: \"],[\"append\",[\"helper\",[\"caps-bool\"],[[\"get\",[\"task\",\"performWillCancelPrevious\"]]],null],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"concurrency-graph\"],null,[[\"task\"],[[\"get\",[\"task\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"task\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/experimental-prediction/template.hbs" } });
});
define('dummy/helpers-test/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Controller.extend({
    status: null,
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var _len,
          args,
          _key,
          args$1$0 = arguments;

      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.prev = 0;

            for (_len = args$1$0.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = args$1$0[_key];
            }

            this.set('status', args.join('-'));
            context$1$0.next = 5;
            return _ember['default'].RSVP.defer().promise;

          case 5:
            context$1$0.prev = 5;

            this.set('status', 'canceled');
            return context$1$0.finish(5);

          case 8:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[0,, 5, 8]]);
    })),

    valueTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(value) {
      var expected;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            expected = "Set value option";

            if (!(value !== expected)) {
              context$1$0.next = 3;
              break;
            }

            throw new Error('value !== ' + expected);

          case 3:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })),

    returnValue: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            return context$1$0.abrupt('return', 10);

          case 1:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    }))
  });
});
define("dummy/helpers-test/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Helpers Test\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"task-status\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"my-button\"],null,[[\"action\",\"class\"],[[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]],1,2],null],\"perform-task\"]],2],[\"text\",\"\\n\"],[\"block\",[\"my-button\"],null,[[\"action\",\"class\"],[[\"helper\",[\"cancel-all\"],[[\"get\",[\"myTask\"]],1,2],null],\"cancel-task\"]],1],[\"text\",\"\\n\"],[\"block\",[\"my-button\"],null,[[\"action\",\"class\"],[[\"helper\",[\"perform\"],[[\"get\",[\"returnValue\"]]],null],\"value-task\"]],0],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"valueTask\"]]],[[\"value\"],[\"target.innerHTML\"]]],null],[\"static-attr\",\"class\",\"set-value-option-task\"],[\"flush-element\"],[\"text\",\"Set value option\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Return a Value\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Cancel\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Perform\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/helpers-test/template.hbs" } });
});
define('dummy/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.cancelHelper = cancelHelper;

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember['default'].assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _emberConcurrencyHelpers.taskHelperClosure)('cancelAll', args);
  }

  exports['default'] = _ember['default'].Helper.helper(cancelHelper);
});
define("dummy/helpers/caps-bool", ["exports", "ember"], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

  exports.capsBool = capsBool;

  function capsBool(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 1);

    var bool = _ref2[0];

    return bool ? "YES" : "no";
  }

  exports["default"] = _ember["default"].Helper.helper(capsBool);
});
define('dummy/helpers/color', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.colorString = colorString;

  function colorString(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 1);

    var color = _ref2[0];

    return new _ember['default'].String.htmlSafe('color: ' + color + ';');
  }

  exports['default'] = _ember['default'].Helper.helper(colorString);
});
define('dummy/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsSelected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('dummy/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('dummy/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/perform', ['exports', 'ember', 'ember-concurrency/-task-property', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyTaskProperty, _emberConcurrencyHelpers) {
  exports.performHelper = performHelper;

  function performHelper(args, hash) {
    var task = args[0];
    if (!(task instanceof _emberConcurrencyTaskProperty.Task)) {
      _ember['default'].assert('The first argument passed to the `perform` helper should be a Task object (without quotes); you passed ' + task, false);
    }

    return (0, _emberConcurrencyHelpers.taskHelperClosure)('perform', args, hash);
  }

  exports['default'] = _ember['default'].Helper.helper(performHelper);
});
define('dummy/helpers/pick-from', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.pickFrom = pickFrom;

  function pickFrom(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 2);

    var list = _ref2[0];
    var index = _ref2[1];

    return list[index % list.length];
  }

  exports['default'] = _ember['default'].Helper.helper(pickFrom);
});
define('dummy/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('dummy/helpers/progress-style', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.progressStyleHelper = progressStyleHelper;

  function progressStyleHelper(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 3);

    var percent = _ref2[0];
    var id = _ref2[1];
    var colors = _ref2[2];

    var color = colors[id % colors.length];
    return new _ember['default'].String.htmlSafe('width: ' + percent + '%; background-color: ' + color + ';');
  }

  exports['default'] = _ember['default'].Helper.helper(progressStyleHelper);
});
define('dummy/helpers/scale', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.scale = scale;

  /*
  export function scale([value, lowLimit, highLimit]) {
    if (value === Infinity) {
      value = highLimit;
    }
  
    let denom = (highLimit - lowLimit);
    if (denom === 0) {
      return 0;
    }
  
    let val = 100 * (value - lowLimit) / denom;
  
    if (val < 0) {
      debugger;
    }
  
    return Math.min(100, val);
  }
  */

  function scale(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 3);

    var value = _ref2[0];
    var lowLimit = _ref2[1];
    var highLimit = _ref2[2];

    var v = 100 * value / (highLimit + 1000 - lowLimit);

    // the 0.001 gets around the annoying fact that {{with falsy}}
    // behaves like {{if falsy}} :(
    return v + 0.001;
  }

  exports['default'] = _ember['default'].Helper.helper(scale);
});
define('dummy/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('dummy/helpers/subtract', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.subtract = subtract;

  function subtract(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 2);

    var a = _ref2[0];
    var b = _ref2[1];

    return a - b;
  }

  exports['default'] = _ember['default'].Helper.helper(subtract);
});
define('dummy/helpers/sum', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.sum = sum;

  function sum(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 2);

    var a = _ref2[0];
    var b = _ref2[1];

    return a + b;
  }

  exports['default'] = _ember['default'].Helper.helper(sum);
});
define('dummy/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref);

    var task = _ref2[0];

    var args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports['default'] = _ember['default'].Helper.helper(taskHelper);
});
define('dummy/helpers/width', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.computeWidth = computeWidth;

  function computeWidth(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 3);

    var start = _ref2[0];
    var end = _ref2[1];
    var upper = _ref2[2];

    return end === Infinity ? upper - start : end - start;
  }

  exports['default'] = _ember['default'].Helper.helper(computeWidth);
});
define('dummy/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('dummy/index/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs');
    }
  });
});
define('dummy/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _emberModalDialogInitializersAddModalsContainer) {
  exports['default'] = {
    name: 'add-modals-container',
    initialize: _emberModalDialogInitializersAddModalsContainer['default']
  };
});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _dummyConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_dummyConfigEnvironment['default'].APP.name, _dummyConfigEnvironment['default'].APP.version)
  };
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('dummy/initializers/ember-cli-fastclick', ['exports', 'ember'], function (exports, _ember) {

  var EmberCliFastclickInitializer = {
    name: 'fastclick',

    initialize: function initialize() {
      _ember['default'].run.schedule('afterRender', function () {
        FastClick.attach(document.body);
      });
    }
  };

  exports['default'] = EmberCliFastclickInitializer;
});
define('dummy/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  exports['default'] = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
// This initializer exists only to make sure that the following
// imports happen before the app boots.
define('dummy/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_dummyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _dummyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_dummyConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('dummy/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('dummy/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('dummy/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("dummy/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('dummy/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    username: _emberData['default'].attr('string')
  });
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _dummyConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('docs', function () {
      this.route('installation');
      this.route('writing-tasks');
      this.route('task-function-syntax');
      this.route('task-concurrency');
      this.route('task-concurrency-advanced');
      this.route('cancelation');
      this.route('error-vs-cancelation');
      this.route('child-tasks');
      this.route('task-groups');
      this.route('derived-state');
      this.route('testing-debugging');
      this.route('examples', function () {
        this.route('increment-buttons');
        this.route('loading-ui');
        this.route('autocomplete');
        this.route('task-concurrency');
        this.route('ajax-throttling');
        this.route('route-tasks', function () {
          this.route('detail', { path: ':id' });
        });
        this.route('joining-tasks');
        this.route('joining-tasks-2');
        this.route('decorating-tasks');
        this.route('observables');
        this.route('task-groups');
        this.route('completion-state');
        this.route('encapsulated-task');
        this.route('encapsulated-task-fun');
        this.route('modal-fun');
      });
      this.route('404', { path: '*path' });
    });
    this.route('experimental-prediction');
    this.route('helpers-test');
    this.route('deprecation-test');
    this.route('data-test');
    this.route('task-injection-test');
  });

  exports['default'] = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('dummy/services/fun', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    foo: 123
  });
});
define('dummy/services/modal-dialog', ['exports', 'ember-modal-dialog/services/modal-dialog'], function (exports, _emberModalDialogServicesModalDialog) {
  exports['default'] = _emberModalDialogServicesModalDialog['default'];
});
define('dummy/services/notify', ['exports', 'ember-notify'], function (exports, _emberNotify) {
  exports['default'] = _emberNotify['default'];
});
define('dummy/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _emberTextMeasurerServicesTextMeasurer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTextMeasurerServicesTextMeasurer['default'];
    }
  });
});
define("dummy/snippets", ["exports"], function (exports) {
  exports["default"] = {
    "ajax-throttling.js": "function loopingAjaxTask(id, color) {\n  return task(function * () {\n    while (true) {\n      this.log(color, `Task ${id}: making AJAX request`);\n      yield this.get('ajaxTask').perform();\n      this.log(color, `Task ${id}: Done, sleeping.`);\n      yield timeout(2000);\n    }\n  }).on('init');\n}\n\nexport default Ember.Component.extend({\n  ajaxTask: task(function * () {\n    // simulate slow AJAX\n    yield timeout(2000 + 2000 * Math.random());\n    return {};\n  }).enqueue().maxConcurrency(3),\n\n  task0: loopingAjaxTask(0, '#0000FF'),\n  task1: loopingAjaxTask(1, '#8A2BE2'),\n  task2: loopingAjaxTask(2, '#A52A2A'),\n  task3: loopingAjaxTask(3, '#DC143C'),\n  task4: loopingAjaxTask(4, '#20B2AA'),\n  task5: loopingAjaxTask(5, '#FF1493'),\n  task6: loopingAjaxTask(6, '#228B22'),\n  task7: loopingAjaxTask(7, '#DAA520'),\n\n  log(color, message) {\n    let logs = this.logs || [];\n    logs.push({ color, message });\n    this.set('logs', logs.slice(-7));\n  },\n\n  logs: null,\n});",
    "ask-button.hbs": "  <button class={{if askQuestion.isIdle 'button-primary'}}\n    onclick={{perform askQuestion}}>\n        {{#if askQuestion.isIdle}}\n          Ask\n        {{else}}\n          Thinking...\n          {{fa-icon \"spinner\" spin=true}}\n        {{/if}}\n  </button>",
    "cancelation-template.hbs": "<h5>Running tasks: {{count}}</h5>\n\n<button {{action 'performTask'}}>Perform Task</button>\n{{#if count}}\n  <button {{action 'cancelAll'}}>Cancel All</button>\n{{/if}}\n{{#if mostRecent.isRunning}}\n  <button {{action 'cancelMostRecent'}}>Cancel Most Recent</button>\n{{/if}}",
    "cancelation.js": "const WAIT_HERE_FOREVER = Ember.RSVP.defer().promise;\nexport default Ember.Controller.extend({\n  count: 0,\n  mostRecent: null,\n\n  myTask: task(function * () {\n    try {\n      this.incrementProperty('count');\n      yield WAIT_HERE_FOREVER;\n    } finally {\n      // finally blocks always get called,\n      // even when the task is being canceled\n      this.decrementProperty('count');\n    }\n  }),\n\n  actions: {\n    performTask() {\n      let task = this.get('myTask');\n      let taskInstance = task.perform();\n      this.set('mostRecent', taskInstance);\n    },\n\n    cancelAll() {\n      this.get('myTask').cancelAll();\n    },\n\n    cancelMostRecent() {\n      this.get('mostRecent').cancel();\n    },\n  }\n});",
    "caps-marquee.js": "  marqueeLoop: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      this.set('formattedText', text);\n      yield timeout(1500);\n      for (let i = 0; i < text.length; ++i) {\n        this.set('formattedText', capitalizeAt(text, i));\n        yield timeout(50);\n      }\n    }\n  }).on('init'),",
    "child-tasks-template.hbs": "<h5>{{status}}</h5>\n\n<ul>\n  <li>Parent Task:     {{parentTask.state}}</li>\n  <li>Child Task:      {{childTask.state}}</li>\n  <li>Grandchild Task: {{grandchildTask.state}}</li>\n</ul>\n\n<button onclick={{perform parentTask}}>\n  {{#if parentTask.isRunning}}\n    Restart Parent Task\n  {{else}}\n    Perform Parent Task\n  {{/if}}\n</button>",
    "child-tasks.js": "export default Ember.Controller.extend({\n  status: \"Waiting to start\",\n\n  parentTask: task(function * () {\n    this.set('status', \"1. Parent: one moment...\");\n    yield timeout(1000);\n    let value = yield this.get('childTask').perform();\n    this.set('status', `5. Parent: child says \"${value}\"`);\n    yield timeout(1000);\n    this.set('status', \"6. Done!\");\n  }).restartable(),\n\n  childTask: task(function * () {\n    this.set('status', \"2. Child: one moment...\");\n    yield timeout(1000);\n    let value = yield this.get('grandchildTask').perform();\n    this.set('status', `4. Child: grandchild says \"${value}\"`);\n    yield timeout(1000);\n    return \"What's up\";\n  }),\n\n  grandchildTask: task(function * () {\n    this.set('status', \"3. Grandchild: one moment...\");\n    yield timeout(1000);\n    return \"Hello\";\n  }),\n});",
    "completion-state-controller.js": "export default Ember.Controller.extend({\n  doStuff:            task(sharedFn),\n  doStuffDrop:        task(sharedFn).drop(),\n  doStuffEnqueue:     task(sharedFn).enqueue(),\n  doStuffRestartable: task(sharedFn).restartable(),\n\n  showLessCommon: false,\n\n  tasks: [\n    \"doStuff\",\n    \"doStuffDrop\",\n    \"doStuffEnqueue\",\n    \"doStuffRestartable\",\n  ],\n\n  taskProperties: Ember.computed('showLessCommon', function() {\n    return [\n      ...this.get('commonTaskProperties'),\n      ...(this.get('showLessCommon') ? this.get('lessCommonTaskProperties') : [])\n    ];\n  }),\n\n  commonTaskProperties: [\n    \"last\",\n    \"lastSuccessful\",\n    \"lastErrored\",\n  ],\n\n  lessCommonTaskProperties: [\n    \"lastComplete\",\n    \"lastPerformed\",\n    \"lastIncomplete\",\n    \"lastCanceled\",\n  ],\n\n  actions: {\n    performAll() {\n    }\n  }\n});",
    "count-up.js": "  countUp: task(function * () {\n    while (true) {\n      this.incrementProperty('count');\n      yield timeout(100);\n    }\n  }).on('init'),",
    "debounced-search-with-cancelation-template.hbs": "  {{#power-select search=(perform searchRepo)\n                  selected=selected\n                  onchange=(action (mut selected)) as |repo|}}\n    {{repo.full_name}}\n  {{/power-select}}",
    "debounced-search-with-cancelation.js": "const DEBOUNCE_MS = 250;\nexport default Ember.Controller.extend({\n  searchRepo: task(function * (term) {\n    if (Ember.isBlank(term)) { return []; }\n\n    // Pause here for DEBOUNCE_MS milliseconds. Because this\n    // task is `restartable`, if the user starts typing again,\n    // the current search will be canceled at this point and\n    // start over from the beginning. This is the\n    // ember-concurrency way of debouncing a task.\n    yield timeout(DEBOUNCE_MS);\n\n    let url = `https://api.github.com/search/repositories?q=${term}`;\n\n    // We yield an AJAX request and wait for it to complete. If the task\n    // is restarted before this request completes, the XHR request\n    // is aborted (open the inspector and see for yourself :)\n    let json = yield this.get('getJSON').perform(url);\n    return json.items;\n  }).restartable(),\n\n  getJSON: task(function * (url) {\n    let xhr;\n    try {\n      xhr = Ember.$.getJSON(url);\n      let result = yield xhr.promise();\n      return result;\n\n      // NOTE: could also write this as\n      // return yield xhr;\n      //\n      // either way, the important thing is to yield before returning\n      // so that the `finally` block doesn't run until after the\n      // promise resolves (or the task is canceled).\n    } finally {\n      xhr.abort();\n    }\n  }),\n});",
    "decorating-tasks-template-isIdle.hbs": "<p>\n  {{#each tasks as |task|}}\n    <button {{action task.perform}} class={{if task.isIdle 'button-primary'}}>\n      {{task.name}}\n    </button>\n  {{/each}}\n</p>",
    "decorating-tasks-template-performWillSucceed.hbs": "<p>\n  {{#each tasks as |task|}}\n    <button {{action task.perform}} class={{if task.performWillSucceed 'button-primary'}}>\n      {{task.name}}\n    </button>\n  {{/each}}\n</p>",
    "decorating-tasks.js": "function taskWithCooldown(taskPath, ms) {\n  return task(taskPath, function * (otherTask, ...args) {\n    // perform the task...\n    yield otherTask.perform(...args);\n\n    // ...and wait for cooldown timer.\n    yield timeout(ms);\n  }).drop();\n}\n\nexport default Ember.Controller.extend({\n  sharedTask: task(function * () {\n    yield timeout(1000);\n  }).drop(),\n\n  halfSecond: taskWithCooldown('sharedTask', 500),\n  oneSecond:  taskWithCooldown('sharedTask', 1000),\n  twoSeconds: taskWithCooldown('sharedTask', 2000),\n\n  tasks: Ember.computed(function() {\n    return [\n      this.get('halfSecond'),\n      this.get('oneSecond'),\n      this.get('twoSeconds')\n    ];\n  }),\n});",
    "detail-route.js": "export default Ember.Route.extend({\n  notify: Ember.inject.service('notify'),\n\n  setupController(controller, model) {\n    this.get('pollServerForChanges').perform(model.id);\n  },\n\n  pollServerForChanges: task(function * (id) {\n    let notify = this.get('notify');\n    yield timeout(500);\n    try {\n      notify.info(`Thing ${id}: Starting to poll for changes`);\n      while (true) {\n        yield timeout(5000);\n        notify.info(`Thing ${id}: Polling now...`);\n      }\n    } finally {\n      notify.warning(`Thing ${id}: No longer polling for changes`);\n    }\n  }).cancelOn('deactivate').restartable(),\n});",
    "ember-install.sh": "ember install ember-concurrency\n",
    "encapsulated-task-controller.js": "import { task, timeout } from 'ember-concurrency';\n\nexport default Ember.Controller.extend({\n  uploadFile: task({\n    progress: 0,\n    url: null,\n    perform: function * (makeUrl) {\n      this.set('url', makeUrl());\n\n      while (this.progress < 100) {\n        yield timeout(100);\n        let newProgress = this.progress + Math.floor(Math.random() * 6) + 5;\n        this.set('progress', Math.min(100, newProgress));\n      }\n\n      return \"Success!\";\n    },\n  }).enqueue(),\n\n  makeRandomUrl() {\n    return `https://www.${randomWord()}.edu`;\n  }\n});",
    "encapsulated-task-fun-controller.js": "import { task, timeout, all } from 'ember-concurrency';\n\nfunction * sharedFn() {\n  yield timeout(Math.random() * 2000);\n  return randomWord();\n}\n\nexport default Ember.Controller.extend({\n  doStuff: task({\n    perform: function * () {\n      return all([\n        this.get('foo').perform(),\n        this.get('bar').perform(),\n        this.get('baz').perform(),\n      ]);\n    },\n\n    foo: task(sharedFn),\n    bar: task(sharedFn),\n    baz: task(sharedFn),\n  }).restartable(),\n});",
    "encapsulated-task-fun-template.hbs": "<p>\n  <button onclick={{perform doStuff}}>\n    Do Stuff\n  </button>\n</p>\n\n{{#with doStuff.last as |t|}}\n  <h5>value: {{t.value}}</h5>\n  <h5>foo:   {{t.foo.last.value}}</h5>\n  <h5>bar:   {{t.bar.last.value}}</h5>\n  <h5>baz:   {{t.baz.last.value}}</h5>\n{{/with}}",
    "encapsulated-task-template.hbs": "<p>\n  <button onclick={{perform uploadFile makeRandomUrl}}>\n    Start Upload\n  </button>\n</p>\n\n<h5>Queued Uploads: {{uploadFile.numQueued}}</h5>\n\n{{#if uploadFile.last}}\n  <h5>\n    Uploading to {{uploadFile.last.url}}:\n    {{uploadFile.last.progress}}%\n  </h5>\n{{/if}}\n\n{{#if uploadFile.lastSuccessful}}\n  <h5 style=\"color: green;\">\n    <strong>\n    Upload to {{uploadFile.lastSuccessful.url}}:\n    {{uploadFile.lastSuccessful.value}}\n    </strong>\n  </h5>\n{{/if}}\n",
    "encapsulated-task.js": "import { task } from 'ember-concurrency';\n\nexport default Component.extend({\n  outerFoo: 123,\n  regularTask: task(function * () {\n    console.log(this.outerFoo); // => 123\n\n    yield doSomeAsync();\n\n    // This prints undefined if encapsulatedTask hasn't yet\n    // been performed, otherwise it prints \"BAR\".\n    //\n    // This demonstrates how it's possible to reach in and read\n    // properties of encapsulated tasks from the outside, but\n    // encapsulated tasks don't have access to anything from\n    // the \"outside world\"\n    //\n    // `encapsulatedTask.last` refers to the most recently\n    // perform()ed instance of encapsulatedTask\n    console.log(this.get('encapsulatedTask.last.innerBar'));\n  }),\n\n  encapsulatedTask: task({\n    // `perform` must use generator function syntax\n    perform: function * (value) {\n      console.log(this.innerFoo); // => 456\n\n      yield doSomeAsync();\n\n      // there is no way to access `outerFoo` without\n      // it being explicitly passed in in some way\n\n      // set innerFoo to whatever was\n      this.set('innerFoo', value);\n    },\n\n    innerFoo: 456,\n    innerBar: \"BAR\",\n  })\n});\n\n",
    "error-vs-cancelation-template.hbs": "<button onclick={{perform myTask false}}>\n  Run to Completion\n</button>\n\n<button onclick={{perform myTask true}}>\n  Throw an Error\n</button>\n\n<ul>\n  <li>Task State: {{myTask.state}}</li>\n  <li>Completions: {{numCompletions}}</li>\n  <li>Errors: {{numErrors}}</li>\n  <li>Finally block runs: {{numFinallys}}</li>\n</ul>\n",
    "error-vs-cancelation.js": "export default Ember.Controller.extend({\n  numCompletions: 0,\n  numErrors: 0,\n  numFinallys: 0,\n\n  myTask: task(function * (doError) {\n    try {\n      yield timeout(1000);\n      if (doError) {\n        throw new Error(\"Boom\");\n      }\n    } catch(e) {\n      this.incrementProperty('numErrors');\n    } finally {\n      this.incrementProperty('numFinallys');\n    }\n    this.incrementProperty('numCompletions');\n  }).restartable(),\n});",
    "increment-button-task.js": "export default Ember.Controller.extend({\n  count: 0,\n  incrementBy: task(function * (inc) {\n    let speed = 400;\n    while (true) {\n      this.incrementProperty('count', inc);\n      yield timeout(speed);\n      speed = Math.max(50, speed * 0.8);\n    }\n  })\n});",
    "increment-button.js": "function sendPress() {\n  this.sendAction('press');\n}\n\nfunction sendRelease() {\n  this.sendAction('release');\n}\n\nexport default Ember.Component.extend({\n  tagName: 'button',\n\n  touchStart: sendPress,\n  mouseDown:  sendPress,\n  touchEnd:   sendRelease,\n  mouseLeave: sendRelease,\n  mouseUp:    sendRelease,\n});",
    "intro-task-oldschool.js": "import Ember from 'ember';\n\nexport default Ember.Component.extend({\n  count: 0,\n\n  startCounting() {\n    this.cancelTimer();\n    this.set('count', 0);\n    this.step();\n  },\n\n  step() {\n    if (this.count < 5) {\n      this.incrementProperty('count');\n      this.timerId = Ember.run.later(this, this.step, 300);\n    } else {\n      this.set('count', \"DONE!\");\n    }\n  },\n\n  willDestroy() {\n    this.cancelTimer();\n  },\n\n  cancelTimer() {\n    if (this.timerId) {\n      Ember.run.cancel(this.timerId);\n      this.timerId = null;\n    }\n  },\n\n  actions: {\n    startCounting() {\n      this.startCounting();\n    }\n  }\n});",
    "intro-task.js": "import Ember from 'ember';\nimport { task, timeout } from 'ember-concurrency';\n\nexport default Ember.Component.extend({\n  count: 0,\n\n  countingTask: task(function * () {\n    this.set('count', 0);\n    while (this.count < 5) {\n      this.incrementProperty('count');\n      yield timeout(300);\n    }\n    this.set('count', \"DONE!\");\n  }).restartable()\n});",
    "joining-tasks-2-template.hbs": "<p>\n  <button onclick={{perform parent 'all'}}>all()</button>\n  <button onclick={{perform parent 'race'}}>race()</button>\n</p>",
    "joining-tasks-2.js": "import { task, timeout, all, race } from 'ember-concurrency';\nconst methods = { all, race };\n\nexport default Ember.Controller.extend({\n  status: \"Waiting...\",\n  childTasks: null,\n\n  parent: task(function * (methodName) {\n    let allOrRace = methods[methodName];\n    let childTasks = [];\n\n    for (let id = 0; id < 5; ++id) {\n      childTasks.push(this.get('child').perform(id));\n    }\n\n    this.set('childTasks', childTasks);\n    this.set('status', \"Waiting for child tasks to complete...\");\n    let words = yield allOrRace(childTasks);\n    this.set('status', `Done: ${Ember.makeArray(words).join(', ')}`);\n  }).restartable(),\n\n  child: task({\n    percent: 0,\n    id: null,\n\n    perform: function * (id) {\n      this.set('id', id);\n      while (this.percent < 100) {\n        yield timeout(Math.random() * 100 + 100);\n        let newPercent = Math.min(100, Math.floor(this.percent + Math.random() * 20));\n        this.set('percent', newPercent);\n      }\n      return randomWord();\n    },\n  }).enqueue().maxConcurrency(3),\n\n  colors: [ '#ff8888', '#88ff88', '#8888ff' ],\n});",
    "joining-tasks-template.hbs": "<p>\n  <button onclick={{perform parent 'all'}}>all()</button>\n  <button onclick={{perform parent 'race'}}>race()</button>\n</p>",
    "joining-tasks.js": "import { task, timeout, all, race } from 'ember-concurrency';\nconst methods = { all, race };\n\nconst ProgressTracker = Ember.Object.extend({\n  id: null,\n  percent: 0,\n  word: null,\n});\n\nexport default Ember.Controller.extend({\n  status: \"Waiting...\",\n  trackers: null,\n\n  parent: task(function * (methodName) {\n    let allOrRace = methods[methodName];\n    let trackers = [], childTasks = [];\n\n    for (let id = 0; id < 5; ++id) {\n      let tracker = ProgressTracker.create({ id });\n      trackers.push(tracker);\n      childTasks.push(this.get('child').perform(tracker));\n    }\n\n    this.set('trackers', trackers);\n    this.set('status', \"Waiting for child tasks to complete...\");\n    let words = yield allOrRace(childTasks);\n    this.set('status', `Done: ${Ember.makeArray(words).join(', ')}`);\n  }).restartable(),\n\n  child: task(function * (tracker) {\n    let percent = 0;\n    while (percent < 100) {\n      yield timeout(Math.random() * 100 + 100);\n      percent = Math.min(100, Math.floor(percent + Math.random() * 20));\n      tracker.set('percent', percent);\n    }\n    let word = randomWord();\n    tracker.set('word', word);\n    return word;\n  }).enqueue().maxConcurrency(3),\n\n  colors: [ '#ff8888', '#88ff88', '#8888ff' ],\n});",
    "loading-ui-controller.js": "export default Ember.Controller.extend({\n  askQuestion: task(function * () {\n    yield timeout(1000);\n    this.set('result', Math.random());\n  }).drop(),\n\n  result: null,\n});",
    "modal-fun-controller.js": "import { task, timeout, taskGroup } from 'ember-concurrency';\n\nlet PAUSE_FOREVER = Ember.RSVP.defer().promise;\n\nexport default Ember.Controller.extend({\n  openWizard: task({\n    perform: function * () {\n      this.get('stepOne').perform();\n      yield PAUSE_FOREVER;\n    },\n\n    states: taskGroup().restartable(),\n    currentState: alias('states.last'),\n\n    next: taskByName('next'),\n    prev: taskByName('prev'),\n\n    stepOne: state({\n      title: \"Step 1\",\n      next: 'stepTwo',\n      index: 0,\n    }),\n\n    stepTwo: state({\n      perform: function * () {\n        while (true) {\n          yield timeout(500);\n          this.set('title', reverse(this.title));\n        }\n      },\n\n      title: \"Step 2\",\n      prev: 'stepOne',\n      next: 'stepThree',\n      index: 1,\n    }),\n\n    stepThree: state({\n      title: \"Step 3\",\n      prev: 'stepTwo',\n      index: 2,\n    }),\n  }),\n});\n\nfunction state(attrs) {\n  let defaultAttrs = {\n    perform: function * () {\n      yield PAUSE_FOREVER;\n    }\n  };\n  objectAssign(defaultAttrs, attrs);\n  return task(defaultAttrs).group('states');\n}\n\nfunction taskByName(key) {\n  let currentKey = `currentState.${key}`;\n  return computed(currentKey, function() {\n    let name = this.get(currentKey);\n    if (!name) { return null; }\n    return this.get(name);\n  });\n}\n",
    "modal-fun-template.hbs": "<p>\n  <button onclick={{perform openWizard}}\n          class={{if openWizard.isIdle 'clickable'}}>\n    Open Wizard\n  </button>\n</p>\n\n{{#with openWizard.lastRunning as |modal|}}\n  {{#modal-dialog}}\n    <div class=\"fun-modal-container\">\n      <div class=\"row\">\n        <div class=\"u-pull-right\">\n          <button onclick={{cancel-all modal.task}}>Close</button>\n        </div>\n      </div>\n\n      <h1>{{modal.currentState.title}}</h1>\n      <p>Wat wat wat</p>\n\n      <div class=\"row\">\n        {{#if modal.prev}}\n          <div class=\"u-pull-left\">\n            <button onclick={{perform modal.prev}}>Prev</button>\n          </div>\n        {{/if}}\n\n        {{#if modal.next}}\n          <div class=\"u-pull-right\">\n            <button onclick={{perform modal.next}}>Next</button>\n          </div>\n        {{/if}}\n      </div>\n    </div>\n  {{/modal-dialog}}\n{{/with}}\n",
    "observables-evented.js": "  fooStatus: null,\n  listenForFooInternally: task(function * () {\n    this.set('fooStatus', `Waiting for values...`);\n\n    yield subscribe(events(this, 'foo'), function * (x) {\n      this.set('fooStatus', `Got value ${x}, thinking...`);\n      yield timeout(1500);\n      this.set('fooStatus', `${this.fooStatus} Done`);\n      yield timeout(200);\n    }).enqueue();\n  }).on('init'),\n\n  actions: {\n    triggerFoo() {\n      this.trigger('foo', Math.floor(100*Math.random()));\n    },\n  }",
    "observables-timetable.js": "  computeStuff: task(function * () {\n    let values = Ember.A();\n    this.set('values', values);\n    yield subscribe(range(5,5), function * (x) {\n      yield subscribe(range(10,3), function * (y) {\n        values.pushObject({ message: `What is ${x} x ${y} ? ` });\n        yield timeout(200);\n        values.pushObject({ message: `${x*y}. `});\n      }).enqueue();\n      values.pushObject({ message: \"\\n\" });\n    }).enqueue();\n  }).restartable(),",
    "poll-loop-break-1.js": "  pollForChanges: task(function * () {\n    while(true) {\n      yield pollServerForChanges();\n      if (Ember.testing) { return; }\n      yield timeout(5000);\n    }\n  })\n",
    "poll-loop-classic.js": "  pollForChanges() {\n    if (this.isDestroyed) { return; }\n    pollServerForChanges().then(() => {\n      Ember.run.later(this, 'pollForChanges', 5000);\n    });\n  }\n",
    "poll-loop.js": "  pollForChanges: task(function * () {\n    while(true) {\n      yield pollServerForChanges();\n      yield timeout(5000);\n    }\n  })\n",
    "press-and-hold-buttons.hbs": "<p>\n  {{#press-and-hold-button\n    press=(perform incrementBy -1)\n    release=(cancel-all incrementBy)}}\n      --Decrease\n  {{/press-and-hold-button}}\n\n  {{#press-and-hold-button\n    press=(perform incrementBy 1)\n    release=(cancel-all incrementBy)}}\n      Increase++\n  {{/press-and-hold-button}}\n</p>",
    "scrambled-text.js": "  startScrambling: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      let pauseTime = 140;\n      while (pauseTime > 5) {\n        this.set('scrambledText', scramble(text));\n        yield timeout(pauseTime);\n        pauseTime = pauseTime * 0.95;\n      }\n      this.set('scrambledText', text);\n      yield timeout(1500);\n    }\n  }).on('init'),",
    "shared-tasks-concurrent.js": "export default Ember.Controller.extend({\n  restartableTask3: task(SHARED_TASK_FN).maxConcurrency(3).restartable(),\n  enqueuedTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueue(),\n  droppingTask3:    task(SHARED_TASK_FN).maxConcurrency(3).drop(),\n  keepLatestTask3:  task(SHARED_TASK_FN).maxConcurrency(3).keepLatest(),\n});",
    "shared-tasks.js": "export default Ember.Controller.extend({\n  defaultTask:     task(SHARED_TASK_FN),\n  restartableTask: task(SHARED_TASK_FN).restartable(),\n  enqueuedTask:    task(SHARED_TASK_FN).enqueue(),\n  droppingTask:    task(SHARED_TASK_FN).drop(),\n  keepLatestTask:  task(SHARED_TASK_FN).keepLatest(),\n});",
    "start-task-example-template.hbs": "  <button {{action 'performTask' \"one\"}}>\n    1. task.perform(...)\n  </button>\n\n  <button onclick={{perform myTask \"two\"}}>\n    2. (perform taskName)\n  </button>\n\n  <button {{action \"triggerFoo\" \"three\"}}>\n    3. .on('foo')\n  </button>\n\n  <input type=\"checkbox\"\n         onchange={{perform myTask value=\"target.checked\"}} />\n  4. Checkbox",
    "start-task-example.js": "import Ember from 'ember';\nimport { task, timeout } from 'ember-concurrency';\n\nexport default Ember.Component.extend({\n  status: null,\n\n  myTask: task(function * (msg = \"init\") {\n    let status = `myTask.perform(${msg})...`;\n    this.set('status', status);\n\n    yield timeout(500);\n    this.set('status', `${status} Done`);\n  }).on('init', 'foo'),\n\n  actions: {\n    performTask(msg) {\n      // This demonstrates how you can .get() a reference\n      // to a task and then run it with .perform(), but\n      // ideally you should just invoke myTask directly\n      // from the template using the `perform` helper.\n      this.get('myTask').perform(msg);\n    },\n    triggerFoo(msg) {\n      this.trigger('foo', msg);\n    }\n  }\n});",
    "task-function-syntax-1.js": "  waitAFewSeconds: task(function * () {\n    this.set('status', \"Gimme one second...\");\n    yield timeout(1000);\n    this.set('status', \"Gimme one more second...\");\n    yield timeout(1000);\n    this.set('status', \"OK, I'm done.\");\n  }),",
    "task-function-syntax-2.js": "  pickRandomNumbers: task(function * () {\n    let nums = [];\n    for (let i = 0; i < 3; i++) {\n      nums.push(Math.floor(Math.random() * 10));\n    }\n\n    this.set('status', `My favorite numbers: ${nums.join(', ')}`);\n  }),",
    "task-function-syntax-3.js": "  myTask: task(function * () {\n    this.set('status', `Thinking...`);\n    let promise = timeout(1000).then(() => 123);\n    let resolvedValue = yield promise;\n    this.set('status', `The value is ${resolvedValue}`);\n  }),",
    "task-function-syntax-4.js": "  myTask: task(function * () {\n    this.set('status', `Thinking...`);\n    try {\n      yield timeout(1000).then(() => {\n        throw \"Ahhhhh!!!!\";\n      });\n      this.set('status', `This does not get used!`);\n    } catch(e) {\n      this.set('status', `Caught value: ${e}`);\n    }\n  }),",
    "task-group-component.js": "export default Ember.Component.extend({\n  taskGroup: null, // passed-in\n\n  chores:        taskGroup().group('taskGroup'),\n  changeDiapers: task(shortPause).group('chores'),\n  doDishes:      task(shortPause).group('chores'),\n  mowTheLawn:    task(shortPause).group('chores'),\n\n  fun:           taskGroup().group('taskGroup'),\n  playGames:     task(shortPause).group('fun'),\n  dance:         task(shortPause).group('fun'),\n  sing:          task(shortPause).group('fun'),\n\n  tasks: Ember.computed(function() {\n    return [\n      this.get('changeDiapers'),\n      this.get('doDishes'),\n      this.get('mowTheLawn'),\n      this.get('playGames'),\n      this.get('dance'),\n      this.get('sing'),\n    ];\n  }),\n});",
    "task-groups-template.hbs": "{{#each tasks as |task|}}\n  <button class={{if task.isIdle 'clickable'}}\n          onclick={{perform task}}>{{task.name}}</button>\n{{/each}}\n\n<h5>Chores group state: {{chores.state}}</h5>\n\n<h5>\n  Most Recent Chore:\n  {{#with chores.last as |taskInstance|}}\n    {{taskInstance.task.name}} ({{taskInstance.state}})\n  {{/with}}\n</h5>",
    "task-groups.js": "import { task, taskGroup } from 'ember-concurrency';\n\nexport default Ember.Controller.extend({\n  chores: taskGroup().drop(),\n\n  mowLawn:       task(taskFn).group('chores'),\n  doDishes:      task(taskFn).group('chores'),\n  changeDiapers: task(taskFn).group('chores'),\n\n  tasks: Ember.computed(function() {\n    return [\n      this.get('mowLawn'),\n      this.get('doDishes'),\n      this.get('changeDiapers'),\n    ];\n  }),\n});",
    "writing-tasks.js": "import Ember from 'ember';\nimport { task } from 'ember-concurrency';\n\nexport default Ember.Component.extend({\n  myTask: task(function * () {\n    alert(\"hello!\");\n  })\n});\n\n"
  };
});
define('dummy/task-injection-test/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Controller.extend({
    users: null,

    myTask: (0, _emberConcurrency.task)({
      fun: _ember['default'].inject.service(),
      perform: regeneratorRuntime.mark(function perform() {
        var value;
        return regeneratorRuntime.wrap(function perform$(context$1$0) {
          while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
              context$1$0.next = 2;
              return this.get('subtask').perform();

            case 2:
              value = context$1$0.sent;
              return context$1$0.abrupt('return', this.get('fun.foo') + '-' + value);

            case 4:
            case 'end':
              return context$1$0.stop();
          }
        }, perform, this);
      }),

      subtask: (0, _emberConcurrency.task)({
        fun: _ember['default'].inject.service(),
        wat: 2,
        perform: regeneratorRuntime.mark(function perform() {
          return regeneratorRuntime.wrap(function perform$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
              case 0:
                return context$1$0.abrupt('return', this.get('fun.foo') * this.wat);

              case 1:
              case 'end':
                return context$1$0.stop();
            }
          }, perform, this);
        })
      })
    })
  });
});
define("dummy/task-injection-test/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Task injection test\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"perform\"],[[\"get\",[\"myTask\"]]],null],null],[\"static-attr\",\"data-test-selector\",\"perform-task-w-injection-button\"],[\"flush-element\"],[\"text\",\"clickme\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"data-test-selector\",\"perform-task-result\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"myTask\",\"last\",\"value\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/task-injection-test/template.hbs" } });
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": null, "block": "{\"statements\":[[\"append\",[\"unknown\",[\"source\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/code-snippet.hbs" } });
});
define('dummy/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, _emberModalDialogTemplatesComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsModalDialog['default'];
    }
  });
});
define('dummy/templates/components/tether-dialog', ['exports', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _emberModalDialogTemplatesComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsTetherDialog['default'];
    }
  });
});
define('dummy/utils', ['exports'], function (exports) {
  exports.randomWord = randomWord;
  var WORDS = ['ember', 'tomster', 'swag', 'yolo', 'turbo', 'ajax'];

  function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-concurrency","version":"0.7.10+b5da4e67"});
}

/* jshint ignore:end */
