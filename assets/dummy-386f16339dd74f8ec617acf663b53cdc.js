"use strict";



define('dummy/app', ['exports', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/application/controller', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;


  var versionRegExp = /\d[.]\d[.]\d/;
  var version = _environment.default.APP.version;
  exports.default = Controller.extend({
    addonVersion: version.match(versionRegExp)[0]
  });
});
define('dummy/application/route', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = _ember.default.Route;
  exports.default = Route.extend({
    beforeModel: function beforeModel() {
      if (!_ember.default.testing) {
        this.router.on('didTransition', function () {
          window.scrollTo(0, 0);
        });
      }
    }
  });
});
define("dummy/application/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rK9jhwXp", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container navbar\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"ten columns\"],[13],[0,\"\\n      \"],[11,\"h3\",[]],[15,\"style\",\"float:left;\"],[13],[0,\"\\n        ember-concurrency\\n\\n        \"],[11,\"span\",[]],[15,\"style\",\"font-size: 0.5em;\"],[13],[0,\"\\n          (v \"],[1,[26,[\"addonVersion\"]],false],[0,\")\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"one columns\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-bar-link-outer\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"/api\"],[13],[0,\"API\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"one columns\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-bar-link-outer\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/machty/ember-concurrency\"],[15,\"target\",\"_blank\"],[13],[0,\"GitHub\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[1,[26,[\"ember-notify\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/application/template.hbs" } });
});
define('dummy/components/ajax-throttling-example/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


  // BEGIN-SNIPPET ajax-throttling
  function loopingAjaxTask(id, color) {
    return (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!true) {
                _context.next = 9;
                break;
              }

              this.log(color, 'Task ' + id + ': making AJAX request');
              _context.next = 4;
              return this.get('ajaxTask').perform();

            case 4:
              this.log(color, 'Task ' + id + ': Done, sleeping.');
              _context.next = 7;
              return (0, _emberConcurrency.timeout)(2000);

            case 7:
              _context.next = 0;
              break;

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).on('init');
  }

  exports.default = Component.extend({
    ajaxTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _emberConcurrency.timeout)(2000 + 2000 * Math.random());

            case 2:
              return _context2.abrupt('return', {});

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
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
});
define("dummy/components/ajax-throttling-example/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u5Mr2NT9", "block": "{\"statements\":[[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"logs\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[16,\"style\",[33,[\"color\"],[[28,[\"log\",\"color\"]]],null],null],[13],[1,[28,[\"log\",\"message\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"log\"]},null],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/ajax-throttling-example/template.hbs" } });
});
define('dummy/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'dummy/config/environment'], function (exports, _appVersion, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = _environment.default.APP.name;
  var version = _environment.default.APP.version;

  exports.default = _appVersion.default.extend({
    version: version,
    name: name
  });
});
define('dummy/components/caps-marquee/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


  function capitalizeAt(text, i) {
    var capsLetter = text.charAt(i).toUpperCase();
    var before = text.slice(0, i);
    var after = text.slice(i + 1);
    return before + capsLetter + after;
  }

  exports.default = Component.extend({
    tagName: '',
    text: null,
    scrambledText: null,
    // BEGIN-SNIPPET caps-marquee
    marqueeLoop: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var text, i;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = this.get('text');

            case 1:
              if (!true) {
                _context.next = 15;
                break;
              }

              this.set('formattedText', text);
              _context.next = 5;
              return (0, _emberConcurrency.timeout)(1500);

            case 5:
              i = 0;

            case 6:
              if (!(i < text.length)) {
                _context.next = 13;
                break;
              }

              this.set('formattedText', capitalizeAt(text, i));
              _context.next = 10;
              return (0, _emberConcurrency.timeout)(50);

            case 10:
              ++i;
              _context.next = 6;
              break;

            case 13:
              _context.next = 1;
              break;

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).on('init')
  });
});
define("dummy/components/caps-marquee/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nzWOMTEm", "block": "{\"statements\":[[1,[26,[\"formattedText\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/caps-marquee/template.hbs" } });
});
define("dummy/components/code-snippet", ["exports", "ember", "dummy/snippets"], function (exports, _ember, _snippets) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /* global require */
  var Highlight = self.require('highlight.js');

  exports.default = _ember.default.Component.extend({
    tagName: 'pre',
    classNameBindings: ['language'],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get('unindent')) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n").filter(function (l) {
        return l !== '';
      });
      for (var i = 0; i < lines.length; i++) {
        match = /^[ \t]*/.exec(lines[i]);
        if (match && (typeof min === 'undefined' || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== 'undefined' && min > 0) {
        src = src.replace(new RegExp("^[ \t]{" + min + "}", 'gm'), "");
      }
      return src;
    },

    source: _ember.default.computed('name', function () {
      return this._unindent((_snippets.default[this.get('name')] || "").replace(/^(\s*\n)*/, '').replace(/\s*$/, ''));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get('element'));
    },

    language: _ember.default.computed('name', function () {
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
define('dummy/components/code-template-toggle/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var schedule = Ember.run.schedule;
  var Component = Ember.Component;
  exports.default = Component.extend({
    classNames: ["code-template-toggle"],
    toggleDescription: "Toggle JS / Template",

    showCode: true,

    didInsertElement: function didInsertElement() {
      var _this = this;

      schedule('afterRender', null, function () {
        var maxHeight = Math.max.apply(null, _this.$('.code-template-toggle-section').map(function () {
          return $(this).height();
        }).get());
        _this.$().css({ height: maxHeight + 'px' });
      });
    },


    actions: {
      toggle: function toggle() {
        this.toggleProperty('showCode');
      }
    }
  });
});
define("dummy/components/code-template-toggle/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sUitVX3e", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"code-template-toggle-section \",[33,[\"if\"],[[28,[\"showCode\"]],\"hidden\"],null]]]],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[[28,[\"templateSnippet\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"code-template-toggle-section \",[33,[\"if\"],[[28,[\"showCode\"]],\"\",\"hidden\"],null]]]],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[[28,[\"codeSnippet\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"span\",[]],[15,\"class\",\"button code-template-toggle-button\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"toggle\"],null],null],[13],[0,\"\\n  \"],[1,[26,[\"toggleDescription\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/code-template-toggle/template.hbs" } });
});
define('dummy/components/concurrency-graph/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var A = Ember.A;
  var on = Ember.on;
  var RSVP = Ember.RSVP;
  var Component = Ember.Component;
  var capitalize = Ember.String.capitalize;
  var EmberObject = Ember.Object;
  var computed = Ember.computed;


  var Tracker = EmberObject.extend({
    id: null,
    performTime: null,
    startTime: null,
    endTime: computed.oneWay('comp.timeElapsed'),
    comp: null,
    taskInstance: null,
    isCanceled: computed.oneWay('taskInstance.isCanceled'),
    state: computed('taskInstance.state', function () {
      return capitalize(this.get('taskInstance.state'));
    }),
    hasStarted: false
  });

  exports.default = Component.extend({
    task: null,
    trackers: null,
    timeElapsed: 0,
    startTime: null,
    nextId: 0,

    lowerLimit: computed('trackers.[]', function () {
      var trackers = this.get('trackers');
      if (!trackers) {
        return 0;
      }
      var v = Math.min.apply(Math, _toConsumableArray(trackers.mapBy('performTime')));
      return v;
    }),

    upperLimit: computed('timeElapsed', function () {
      var timeElapsed = this.get('timeElapsed');
      return Math.max(10000, timeElapsed);
    }),

    colors: ['red', 'green', 'blue'],

    labelHeights: [0, 20, 40, 60, 80, 100],

    ticker: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var now, defer;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!true) {
                _context.next = 9;
                break;
              }

              now = +new Date();

              this.set('timeElapsed', now - this.startTime);

              defer = RSVP.defer();

              window.requestAnimationFrame(defer.resolve);
              _context.next = 7;
              return defer.promise;

            case 7:
              _context.next = 0;
              break;

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).drop(),

    restart: on('init', function () {
      this.nextId = 0;
      this.set('trackers', A());
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
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZUOQJEln", "block": "{\"statements\":[[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"startTask\"]],[13],[0,\"task.perform()\"],[14],[0,\"\\n\"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"restart\"]],[13],[0,\"Clear Timeline\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"task\",\"isRunning\"]]],null,{\"statements\":[[0,\"  \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"cancelAll\"],[[\"target\"],[[28,[\"task\"]]]]],[13],[0,\"Cancel All\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"style\",[]],[15,\"type\",\"text/css\"],[13],[0,\"\\ng:hover {\\n  stroke-width: 3px;\\n  font-weight: 700;\\n}\\n\"],[14],[0,\"\\n\\n\"],[11,\"svg\",[]],[15,\"style\",\"width: 100%; padding: 5px;\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"trackers\"]]],null,{\"statements\":[[0,\"  \"],[11,\"g\",[]],[15,\"height\",\"20px\"],[13],[0,\"\\n\"],[6,[\"with\"],[[33,[\"pick-from\"],[[28,[\"colors\"]],[28,[\"tracker\",\"id\"]]],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"tracker\",\"hasStarted\"]]],null,{\"statements\":[[0,\"        \"],[11,\"rect\",[]],[16,\"x\",[34,[[33,[\"scale\"],[[33,[\"subtract\"],[[28,[\"tracker\",\"startTime\"]],[28,[\"lowerLimit\"]]],null],[28,[\"lowerLimit\"]],[28,[\"upperLimit\"]]],null],\"%\"]]],[16,\"y\",[33,[\"pick-from\"],[[28,[\"labelHeights\"]],[28,[\"tracker\",\"id\"]]],null],null],[15,\"height\",\"20px\"],[16,\"width\",[34,[[33,[\"scale\"],[[33,[\"width\"],[[28,[\"tracker\",\"startTime\"]],[28,[\"tracker\",\"endTime\"]],[28,[\"upperLimit\"]]],null],[28,[\"lowerLimit\"]],[28,[\"upperLimit\"]]],null],\"%\"]]],[15,\"stroke\",\"black\"],[16,\"fill\",[28,[\"color\"]],null],[15,\"fill-opacity\",\"0.3\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"with\"],[[33,[\"scale\"],[[33,[\"subtract\"],[[28,[\"tracker\",\"performTime\"]],[28,[\"lowerLimit\"]]],null],[28,[\"lowerLimit\"]],[28,[\"upperLimit\"]]],null]],null,{\"statements\":[[0,\"        \"],[11,\"text\",[]],[16,\"x\",[34,[[33,[\"sum\"],[0.5,[28,[\"x\"]]],null],\"%\"]]],[16,\"y\",[33,[\"sum\"],[15,[33,[\"pick-from\"],[[28,[\"labelHeights\"]],[28,[\"tracker\",\"id\"]]],null]],null],null],[15,\"font-family\",\"Raleway\"],[16,\"fill\",[28,[\"color\"]],null],[15,\"font-size\",\"14\"],[16,\"text-decoration\",[33,[\"if\"],[[28,[\"tracker\",\"isCanceled\"]],\"line-through\",\"none\"],null],null],[16,\"font-style\",[33,[\"if\"],[[28,[\"tracker\",\"startTime\"]],\"normal\",\"italic\"],null],null],[13],[0,\"\\n          \"],[1,[28,[\"tracker\",\"state\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"with\"],[[33,[\"pick-from\"],[[28,[\"labelHeights\"]],[28,[\"tracker\",\"id\"]]],null]],null,{\"statements\":[[0,\"          \"],[11,\"line\",[]],[16,\"x1\",[34,[[28,[\"x\"]],\"%\"]]],[16,\"y1\",[28,[\"y\"]],null],[16,\"x2\",[34,[[28,[\"x\"]],\"%\"]]],[16,\"y2\",[33,[\"sum\"],[20,[28,[\"y\"]]],null],null],[16,\"stroke\",[28,[\"color\"]],null],[13],[14],[0,\"\\n\"]],\"locals\":[\"y\"]},null]],\"locals\":[\"x\"]},null]],\"locals\":[\"color\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[\"tracker\"]},null],[0,\"\\n\"],[6,[\"with\"],[[33,[\"scale\"],[[28,[\"timeElapsed\"]],[28,[\"lowerLimit\"]],[28,[\"upperLimit\"]]],null]],null,{\"statements\":[[0,\"  \"],[11,\"line\",[]],[16,\"x1\",[34,[[28,[\"x\"]],\"%\"]]],[15,\"y1\",\"0\"],[16,\"x2\",[34,[[28,[\"x\"]],\"%\"]]],[15,\"y2\",\"100\"],[15,\"stroke\",\"black\"],[13],[14],[0,\"\\n\"]],\"locals\":[\"x\"]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/concurrency-graph/template.hbs" } });
});
define('dummy/components/count-up/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    tagName: '',
    count: 0,
    // BEGIN-SNIPPET count-up
    countUp: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!true) {
                _context.next = 6;
                break;
              }

              this.incrementProperty('count');
              _context.next = 4;
              return (0, _emberConcurrency.timeout)(100);

            case 4:
              _context.next = 0;
              break;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).on('init')
  });
});
define("dummy/components/count-up/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "X6TOKOBD", "block": "{\"statements\":[[1,[26,[\"count\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/count-up/template.hbs" } });
});
define('dummy/components/ember-notify', ['exports', 'ember-notify/components/ember-notify'], function (exports, _emberNotify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberNotify.default;
});
define('dummy/components/ember-notify/message', ['exports', 'ember-notify/components/ember-notify/message'], function (exports, _message) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _message.default;
});
define('dummy/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _faIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faIcon.default;
    }
  });
});
define('dummy/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _faList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faList.default;
    }
  });
});
define('dummy/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _faStack) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faStack.default;
    }
  });
});
define('dummy/components/github-edit/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;
  var service = Ember.inject.service;
  var Component = Ember.Component;
  exports.default = Component.extend({
    tagName: 'a',
    classNames: 'github-edit',
    attributeBindings: ['href', 'title'],

    routing: service('-routing'),
    href: computed('routing.currentPath', function () {
      var path = this.get('routing.currentPath');
      if (!path) {
        // `routing` doesn't exist for old ember versions via ember-try
        return;
      }
      path = path.replace(/\./g, '/');
      return 'https://github.com/machty/ember-concurrency/edit/master/tests/dummy/app/' + path + '/template.hbs';
    }),
    title: "Edit on Github"
  });
});
define("dummy/components/github-edit/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6TfDow2R", "block": "{\"statements\":[[11,\"i\",[]],[15,\"class\",\"icon-pencil\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/github-edit/template.hbs" } });
});
define('dummy/components/my-button/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    click: function click() {
      var val = this.attrs.action(3, 4);
      if (!val) {
        return;
      }
      val.then(function (v) {
        if (v !== 10) {
          throw new Error("returned value wasn't 10");
        }
      }).catch(function (e) {
        if (!(0, _emberConcurrency.didCancel)(e)) {
          throw e;
        }
      });
    }
  });
});
define('dummy/components/nav-header/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    tagName: ''
  });
});
define("dummy/components/nav-header/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PSgkciq7", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"prevTopic\"]]],null,{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"u-pull-left\"],[13],[0,\"\\n      Previous: \"],[6,[\"link-to\"],[[28,[\"prevTopic\",\"route\"]]],null,{\"statements\":[[1,[28,[\"prevTopic\",\"title\"]],false]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"nextTopic\"]]],null,{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"u-pull-right\"],[13],[0,\"\\n      Next: \"],[6,[\"link-to\"],[[28,[\"nextTopic\",\"route\"]]],null,{\"statements\":[[1,[28,[\"nextTopic\",\"title\"]],false]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/nav-header/template.hbs" } });
});
define('dummy/components/press-and-hold-button/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


  // BEGIN-SNIPPET increment-button
  function sendPress() {
    this.sendAction('press');
  }

  function sendRelease() {
    this.sendAction('release');
  }

  exports.default = Component.extend({
    tagName: 'button',

    touchStart: sendPress,
    mouseDown: sendPress,
    touchEnd: sendRelease,
    mouseLeave: sendRelease,
    mouseUp: sendRelease
  });
});
define('dummy/components/scrambled-text/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


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

  exports.default = Component.extend({
    tagName: '',
    text: null,
    scrambledText: null,
    // BEGIN-SNIPPET scrambled-text
    startScrambling: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var text, pauseTime;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = this.get('text');

            case 1:
              if (!true) {
                _context.next = 15;
                break;
              }

              pauseTime = 140;

            case 3:
              if (!(pauseTime > 5)) {
                _context.next = 10;
                break;
              }

              this.set('scrambledText', scramble(text));
              _context.next = 7;
              return (0, _emberConcurrency.timeout)(pauseTime);

            case 7:
              pauseTime = pauseTime * 0.95;
              _context.next = 3;
              break;

            case 10:
              this.set('scrambledText', text);
              _context.next = 13;
              return (0, _emberConcurrency.timeout)(1500);

            case 13:
              _context.next = 1;
              break;

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).on('init')
  });
});
define("dummy/components/scrambled-text/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kvlvjpXq", "block": "{\"statements\":[[1,[26,[\"scrambledText\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/scrambled-text/template.hbs" } });
});
define('dummy/components/shared-tutorial/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var A = Ember.A;
  var Component = Ember.Component;


  var PREFIXES = ["Tomster", "Glimmer", "Transclusion", "Zoey", "Flux", "Reducer"];

  var SUFFIXES = ["Mart", " Central", "s ᴙ Us", "beds n stuff", "potle", " Donuts"];

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  var store = {
    getNearbyStores: function getNearbyStores(coords) {
      var num = 3; //Math.floor(Math.random() * 2) + 5;
      var stores = [];
      for (var i = 0; i < num; ++i) {
        var name = randomFrom(PREFIXES) + randomFrom(SUFFIXES);
        stores.push({
          lat: Math.random * 60,
          long: Math.random * 60,
          name: name,
          distance: Math.random().toFixed(2)
        });
      }

      return (0, _emberConcurrency.timeout)(800).then(function () {
        return { stores: stores };
      });
    }
  };

  var geolocation = {
    getCoords: function getCoords() {
      return (0, _emberConcurrency.timeout)(800).then(function () {
        return {
          lat: Math.random * 60,
          long: Math.random * 60
        };
      });
    }
  };

  exports.default = Component.extend({
    init: function init() {
      this._super();
      this.set('logs', A());
      this.set('formData', {
        user: "machty",
        amount: "9.99"
      });
    },

    logs: null,
    formData: null,

    showTemplate: false,

    geolocation: geolocation,
    store: store,

    actions: {
      toggleTemplate: function toggleTemplate() {
        this.toggleProperty('showTemplate');
      }
    }
  });
});
define('dummy/components/start-task-example/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    status: null,

    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "init";
      var status;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              status = 'myTask.perform(' + msg + ')...';

              this.set('status', status);

              _context.next = 4;
              return (0, _emberConcurrency.timeout)(500);

            case 4:
              this.set('status', status + ' Done');

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
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
});
define("dummy/components/start-task-example/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "50rS4+oC", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n\"],[0,\"  \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"performTask\",\"one\"]],[13],[0,\"\\n    1. task.perform(...)\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"myTask\"]],\"two\"],null],null],[13],[0,\"\\n    2. (perform taskName)\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"triggerFoo\",\"three\"]],[13],[0,\"\\n    3. .on('foo')\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"input\",[]],[15,\"type\",\"checkbox\"],[16,\"onchange\",[33,[\"perform\"],[[28,[\"myTask\"]]],[[\"value\"],[\"target.checked\"]]],null],[13],[14],[0,\"\\n  4. Checkbox\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Status: \"],[1,[26,[\"status\"]],false],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"JavaScript\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"start-task-example.js\"]]],false],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Template\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"start-task-example-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/start-task-example/template.hbs" } });
});
define('dummy/components/task-function-syntax-1/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-1
    waitAFewSeconds: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.set('status', "Gimme one second...");
              _context.next = 3;
              return (0, _emberConcurrency.timeout)(1000);

            case 3:
              this.set('status', "Gimme one more second...");
              _context.next = 6;
              return (0, _emberConcurrency.timeout)(1000);

            case 6:
              this.set('status', "OK, I'm done.");

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/components/task-function-syntax-1/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "73bvQlhz", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"waitAFewSeconds\"]]],null],null],[13],[0,\"Wait A Few Seconds\"],[14],[0,\"\\n  \"],[1,[26,[\"status\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-1/template.hbs" } });
});
define('dummy/components/task-function-syntax-2/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-2
    pickRandomNumbers: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var nums, i;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              nums = [];

              for (i = 0; i < 3; i++) {
                nums.push(Math.floor(Math.random() * 10));
              }

              this.set('status', 'My favorite numbers: ' + nums.join(', '));

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/components/task-function-syntax-2/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jEe2MGuf", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"pickRandomNumbers\"]]],null],null],[13],[0,\"Pick Random Number\"],[14],[0,\"\\n  \"],[1,[26,[\"status\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-2/template.hbs" } });
});
define('dummy/components/task-function-syntax-3/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-3
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var promise, resolvedValue;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.set('status', 'Thinking...');
              promise = (0, _emberConcurrency.timeout)(1000).then(function () {
                return 123;
              });
              _context.next = 4;
              return promise;

            case 4:
              resolvedValue = _context.sent;

              this.set('status', 'The value is ' + resolvedValue);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/components/task-function-syntax-3/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QbWZvmqx", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"myTask\"]]],null],null],[13],[0,\"Perform myTask\"],[14],[0,\"\\n  \"],[1,[26,[\"status\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-3/template.hbs" } });
});
define('dummy/components/task-function-syntax-4/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    status: null,

    // BEGIN-SNIPPET task-function-syntax-4
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.set('status', 'Thinking...');
              _context.prev = 1;
              _context.next = 4;
              return (0, _emberConcurrency.timeout)(1000).then(function () {
                throw "Ahhhhh!!!!";
              });

            case 4:
              this.set('status', 'This does not get used!');
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);

              this.set('status', 'Caught value: ' + _context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 7]]);
    }))
  });
});
define("dummy/components/task-function-syntax-4/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "C2iZKXs5", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"myTask\"]]],null],null],[13],[0,\"Perform myTask\"],[14],[0,\"\\n  \"],[1,[26,[\"status\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-function-syntax-4/template.hbs" } });
});
define('dummy/components/task-group-example/component', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marked = [shortPause].map(regeneratorRuntime.mark);

  var computed = Ember.computed;
  var Component = Ember.Component;


  function shortPause() {
    return regeneratorRuntime.wrap(function shortPause$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _emberConcurrency.timeout)(2000);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  // BEGIN-SNIPPET task-group-component
  exports.default = Component.extend({
    taskGroup: null, // passed-in

    chores: (0, _emberConcurrency.taskGroup)().group('taskGroup'),
    changeDiapers: (0, _emberConcurrency.task)(shortPause).group('chores'),
    doDishes: (0, _emberConcurrency.task)(shortPause).group('chores'),
    mowTheLawn: (0, _emberConcurrency.task)(shortPause).group('chores'),

    fun: (0, _emberConcurrency.taskGroup)().group('taskGroup'),
    playGames: (0, _emberConcurrency.task)(shortPause).group('fun'),
    dance: (0, _emberConcurrency.task)(shortPause).group('fun'),
    sing: (0, _emberConcurrency.task)(shortPause).group('fun'),

    tasks: computed(function () {
      return [this.get('changeDiapers'), this.get('doDishes'), this.get('mowTheLawn'), this.get('playGames'), this.get('dance'), this.get('sing')];
    })
  });
});
define("dummy/components/task-group-example/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pTwrYzso", "block": "{\"statements\":[[11,\"h4\",[]],[13],[1,[28,[\"taskGroup\",\"name\"]],false],[0,\": \"],[1,[28,[\"taskGroup\",\"state\"]],false],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"cancel-all\"],[[28,[\"taskGroup\"]]],null],null],[16,\"class\",[33,[\"if\"],[[28,[\"taskGroup\",\"isRunning\"]],\"button-primary\"],null],null],[13],[0,\"\\n  Cancel \"],[1,[28,[\"taskGroup\",\"name\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"table\",[]],[15,\"class\",\"u-full-width\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Perform\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"State\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Group\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Group State\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"tasks\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n          \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"task\"]]],null],null],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[13],[0,\"\\n            \"],[1,[28,[\"task\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"task\",\"state\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"task\",\"group\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"task\",\"group\",\"state\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"task\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/task-group-example/template.hbs" } });
});
define('dummy/components/tutorial-0/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component'], function (exports, _ember, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    actions: {
      findStores: function findStores() {
        var _this = this;

        var geolocation = this.get('geolocation');
        var store = this.get('store');

        geolocation.getCoords().then(function (coords) {
          return store.getNearbyStores(coords);
        }).then(function (result) {
          _this.set('result', result);
        });
      }
    }
  });
});
define("dummy/components/tutorial-0/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "orXZn8JP", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"findStores\"],null],null],[13],[0,\"\\n    Find Nearby Stores\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-0/template.hbs" } });
});
define('dummy/components/tutorial-1/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component'], function (exports, _ember, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    isFindingStores: false, // ++
    actions: {
      findStores: function findStores() {
        var _this = this;

        var geolocation = this.get('geolocation');
        var store = this.get('store');

        this.set('isFindingStores', true); // ++
        geolocation.getCoords().then(function (coords) {
          return store.getNearbyStores(coords);
        }).then(function (result) {
          _this.set('result', result);
          _this.set('isFindingStores', false); // ++
        });
      }
    }
  });
});
define("dummy/components/tutorial-1/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mnJ6JGcm", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"findStores\"],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"isFindingStores\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-1/template.hbs" } });
});
define('dummy/components/tutorial-2/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component'], function (exports, _ember, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    isFindingStores: false,
    actions: {
      findStores: function findStores() {
        var _this = this;

        if (this.isFindingStores) {
          return;
        } // ++

        var geolocation = this.get('geolocation');
        var store = this.get('store');

        this.set('isFindingStores', true);
        geolocation.getCoords().then(function (coords) {
          return store.getNearbyStores(coords);
        }).then(function (result) {
          _this.set('result', result);
          _this.set('isFindingStores', false);
        });
      }
    }
  });
});
define("dummy/components/tutorial-2/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YFEj0mwV", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"findStores\"],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"isFindingStores\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-2/template.hbs" } });
});
define('dummy/components/tutorial-3/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component'], function (exports, _ember, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    isFindingStores: false,
    actions: {
      findStores: function findStores() {
        var _this = this;

        if (this.isFindingStores) {
          return;
        }

        var geolocation = this.get('geolocation');
        var store = this.get('store');

        this.set('isFindingStores', true);
        geolocation.getCoords().then(function (coords) {
          return store.getNearbyStores(coords);
        }).then(function (result) {
          if (_this.isDestroyed) {
            return;
          } // ++
          _this.set('result', result);
          _this.set('isFindingStores', false);
        });
      }
    }
  });
});
define("dummy/components/tutorial-3/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "khhjitll", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"findStores\"],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"isFindingStores\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-3/template.hbs" } });
});
define('dummy/components/tutorial-4/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component'], function (exports, _ember, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    isFindingStores: false,
    actions: {
      findStores: function findStores() {
        var _this = this;

        if (this.isFindingStores) {
          return;
        }

        var geolocation = this.get('geolocation');
        var store = this.get('store');

        this.set('isFindingStores', true);
        geolocation.getCoords().then(function (coords) {
          return store.getNearbyStores(coords);
        }).then(function (result) {
          if (_this.isDestroyed) {
            return;
          }
          _this.set('result', result);
        }).finally(function () {
          // ++
          if (_this.isDestroyed) {
            return;
          } // ++
          _this.set('isFindingStores', false); // ++
        });
      }
    }
  });
});
define("dummy/components/tutorial-4/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WM0UWcxU", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"findStores\"],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"isFindingStores\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-4/template.hbs" } });
});
define('dummy/components/tutorial-5/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component'], function (exports, _ember, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    isFindingStores: false,
    actions: {
      findStores: function findStores() {
        var _this = this;

        if (this.isFindingStores) {
          return;
        }

        var geolocation = this.get('geolocation');
        var store = this.get('store');

        this.set('isFindingStores', true);
        geolocation.getCoords().then(function (coords) {
          return store.getNearbyStores(coords);
        }).then(function (result) {
          if (_this.isDestroyed) {
            return;
          }
          _this.set('result', result);
        }).finally(function () {
          if (_this.isDestroyed) {
            return;
          }
          _this.set('isFindingStores', false);
        });
      }
    }
  });
});
define("dummy/components/tutorial-5/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MCp/qI11", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"findStores\"],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"isFindingStores\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-5/template.hbs" } });
});
define('dummy/components/tutorial-6/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component', 'ember-concurrency'], function (exports, _ember, _component, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,

    findStores: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var geolocation, store, coords, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              geolocation = this.get('geolocation');
              store = this.get('store');
              _context.next = 4;
              return geolocation.getCoords();

            case 4:
              coords = _context.sent;
              _context.next = 7;
              return store.getNearbyStores(coords);

            case 7:
              result = _context.sent;

              this.set('result', result);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/components/tutorial-6/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/3gytAxj", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"findStores\"]]],null],null],[13],[0,\" \"],[0,\"\\n    Find Nearby Stores\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-6/template.hbs" } });
});
define('dummy/components/tutorial-7/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component', 'ember-concurrency'], function (exports, _ember, _component, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,

    findStores: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var geolocation, store, coords, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              geolocation = this.get('geolocation');
              store = this.get('store');
              _context.next = 4;
              return geolocation.getCoords();

            case 4:
              coords = _context.sent;
              _context.next = 7;
              return store.getNearbyStores(coords);

            case 7:
              result = _context.sent;

              this.set('result', result);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/components/tutorial-7/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4zbhUaIe", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"findStores\"]]],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"findStores\",\"isRunning\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-7/template.hbs" } });
});
define('dummy/components/tutorial-8/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component', 'ember-concurrency'], function (exports, _ember, _component, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,

    findStores: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var geolocation, store, coords, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              geolocation = this.get('geolocation');
              store = this.get('store');
              _context.next = 4;
              return geolocation.getCoords();

            case 4:
              coords = _context.sent;
              _context.next = 7;
              return store.getNearbyStores(coords);

            case 7:
              result = _context.sent;

              this.set('result', result);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).drop() });
});
define("dummy/components/tutorial-8/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O+DiOiz2", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"findStores\"]]],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"findStores\",\"isRunning\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-8/template.hbs" } });
});
define('dummy/components/tutorial-9/component', ['exports', 'ember', 'dummy/components/shared-tutorial/component', 'ember-concurrency'], function (exports, _ember, _component, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _component.default.extend({
    result: null,
    findStores: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var geolocation, store, coords, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              geolocation = this.get('geolocation');
              store = this.get('store');
              _context.next = 4;
              return geolocation.getCoords();

            case 4:
              coords = _context.sent;
              _context.next = 7;
              return store.getNearbyStores(coords);

            case 7:
              result = _context.sent;

              this.set('result', result);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).drop()
  });
});
define("dummy/components/tutorial-9/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MhPWkdGN", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"tutorial-example\"],[13],[0,\"\\n\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"findStores\"]]],null],null],[13],[0,\"\\n    Find Nearby Stores\\n\"],[6,[\"if\"],[[28,[\"findStores\",\"isRunning\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"result\",\"stores\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\":\\n        \"],[1,[28,[\"s\",\"distance\"]],false],[0,\" miles away\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"tutorial-example-label\"],[13],[0,\"Example\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/components/tutorial-9/template.hbs" } });
});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller;
});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller;
});
define('dummy/docs/404/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs');
    }
  });
});
define('dummy/docs/cancelation/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  var defer = Ember.RSVP.defer;


  // BEGIN-SNIPPET cancelation
  var WAIT_HERE_FOREVER = defer().promise;
  exports.default = Controller.extend({
    count: 0,
    mostRecent: null,

    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              this.incrementProperty('count');
              _context.next = 4;
              return WAIT_HERE_FOREVER;

            case 4:
              _context.prev = 4;

              // finally blocks always get called,
              // even when the task is being canceled
              this.decrementProperty('count');
              return _context.finish(4);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0,, 4, 7]]);
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
});
define("dummy/docs/cancelation/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9F9q+B5p", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Cancelation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" tasks can be canceled either\\n  \"],[11,\"em\",[]],[13],[0,\"explicitly\"],[14],[0,\" (by calling one of the cancel methods\\n  on a task or task instance) or \"],[11,\"em\",[]],[13],[0,\"implicitly\"],[14],[0,\" (based on\\n  how the task is configured, or because the task's host object\\n  was destroyed).\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Generally speaking, it is \"],[11,\"em\",[]],[13],[0,\"much\"],[14],[0,\" better to configure your tasks properly\\n  (via \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifiers\"]],\"locals\":[]},null],[0,\")\\n  such that they'll be implicitly/automatically canceled at\\n  the right time, but there are still some cases where\\n  explicit cancelation is the only option.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Explicit Cancelation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  There are two ways to explicitly cancel a task:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Call \"],[11,\"code\",[]],[13],[0,\"task.cancelAll()\"],[14],[0,\" on the Task object —\\n    this will cancel all running or enqueued Task Instances for that\\n    task.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Call \"],[11,\"code\",[]],[13],[0,\"taskInstance.cancel()\"],[14],[0,\" on a Task Instance\\n    (the object returned from a prior call to \"],[11,\"code\",[]],[13],[0,\"task.perform()\"],[14],[0,\")\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Example\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Running tasks: \"],[1,[26,[\"count\"]],false],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"performTask\"]],[13],[0,\"Perform Task\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"count\"]]],null,{\"statements\":[[0,\"  \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"cancelAll\"]],[13],[0,\"Cancel All\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"mostRecent\",\"isRunning\"]]],null,{\"statements\":[[0,\"  \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"cancelMostRecent\"]],[13],[0,\"Cancel Most Recent\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    Tip: You can also use the \"],[11,\"code\",[]],[13],[0,\".concurrency\"],[14],[0,\" property to get\\n    the current number of running task instances for a given task,\\n    e.g. \"],[11,\"code\",[]],[13],[0,\"{{myTask.concurrency}}\"],[14],[0,\": \"],[1,[28,[\"myTask\",\"concurrency\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"cancelation-template.hbs\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"cancelation.js\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/cancelation/template.hbs" } });
});
define('dummy/docs/child-tasks/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    status: "Waiting to start",

    parentTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var value;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.set('status', "1. Parent: one moment...");
              _context.next = 3;
              return (0, _emberConcurrency.timeout)(1000);

            case 3:
              _context.next = 5;
              return this.get('childTask').perform();

            case 5:
              value = _context.sent;

              this.set('status', '5. Parent: child says "' + value + '"');
              _context.next = 9;
              return (0, _emberConcurrency.timeout)(1000);

            case 9:
              this.set('status', "6. Done!");

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable(),

    childTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2() {
      var value;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.set('status', "2. Child: one moment...");
              _context2.next = 3;
              return (0, _emberConcurrency.timeout)(1000);

            case 3:
              _context2.next = 5;
              return this.get('grandchildTask').perform();

            case 5:
              value = _context2.sent;

              this.set('status', '4. Child: grandchild says "' + value + '"');
              _context2.next = 9;
              return (0, _emberConcurrency.timeout)(1000);

            case 9:
              return _context2.abrupt('return', "What's up");

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })),

    grandchildTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.set('status', "3. Grandchild: one moment...");
              _context3.next = 3;
              return (0, _emberConcurrency.timeout)(1000);

            case 3:
              return _context3.abrupt('return', "Hello");

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }))
  });
});
define("dummy/docs/child-tasks/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hXs5BRsS", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Child Tasks\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Tasks can call other tasks by \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\"ing the\\n  result of \"],[11,\"code\",[]],[13],[0,\"anotherTask.perform()\"],[14],[0,\". When this happens,\\n  the Parent task will wait for the Child task to complete before\\n  proceeding. If the Parent task is canceled, the Child task will\\n  automatically be canceled as well.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Example\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[1,[26,[\"status\"]],false],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Parent Task:     \"],[1,[28,[\"parentTask\",\"state\"]],false],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Child Task:      \"],[1,[28,[\"childTask\",\"state\"]],false],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Grandchild Task: \"],[1,[28,[\"grandchildTask\",\"state\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"parentTask\"]]],null],null],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"parentTask\",\"isRunning\"]]],null,{\"statements\":[[0,\"    Restart Parent Task\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    Perform Parent Task\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"child-tasks.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"child-tasks-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/child-tasks/template.hbs" } });
});
define('dummy/docs/controller', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  var controller = Ember.inject.controller;
  var computed = Ember.computed;
  exports.default = Controller.extend({
    appController: controller('application'),

    tableOfContents: [{ route: "docs.introduction", title: "Home" }, { route: "docs.installation", title: "Installation" }, { section: "Introduction" }, { route: "docs.tutorial.index", title: "Writing Code Without Tasks" }, { route: "docs.tutorial.discussion", title: "Post-Mortem" }, { route: "docs.tutorial.refactor", title: "Refactoring With Tasks" }, { section: "Reference" }, { route: "docs.task-function-syntax", title: "Task Function Syntax" }, { route: "docs.task-concurrency", title: "Managing Task Concurrency",
      children: [{ route: "docs.task-concurrency-advanced", title: "Advanced" }]
    }, { route: "docs.cancelation", title: "Cancelation" }, { route: "docs.error-vs-cancelation", title: "Handling Errors" }, { route: "docs.child-tasks", title: "Child Tasks" }, { route: "docs.task-groups", title: "Task Groups" }, { route: "docs.derived-state", title: "Derived State" }, { route: "docs.events", title: "Ember / jQuery Events" }, { route: "docs.testing-debugging", title: "Testing & Debugging" }, { route: "docs.faq", title: "FAQ & Fact Sheet" }, { section: "Examples" }, { route: "docs.examples.loading-ui", title: "Loading UI" }, { route: "docs.examples.autocomplete", title: "Type-Ahead Search" }, { route: "docs.examples.increment-buttons", title: "Accelerating Increment Buttons" }, { route: "docs.examples.ajax-throttling", title: "AJAX Throttling" }, { route: "docs.examples.route-tasks", title: "Route Tasks" }, { route: "docs.examples.joining-tasks", title: "Awaiting Multiple Child Tasks" }],

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
      return this.findNext(+1);
    }),

    prevTopic: computed('currentIndex', 'flatContents', function () {
      return this.findNext(-1);
    }),

    findNext: function findNext(inc) {
      var currentIndex = this.get('currentIndex');
      if (typeof currentIndex === "undefined") {
        return;
      }

      var contents = this.get('flatContents');
      for (var i = currentIndex + inc; i >= 0 && i < contents.length; i += inc) {
        var value = contents[i];
        if (value.route) {
          return value;
        }
      }
    }
  });
});
define('dummy/docs/derived-state/controller', ['exports', 'ember-concurrency', 'dummy/utils'], function (exports, _emberConcurrency, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _marked = [sharedFn].map(regeneratorRuntime.mark);

  var computed = Ember.computed;
  var Controller = Ember.Controller;


  var i = 0;
  function sharedFn(shouldError) {
    var words, wordsString;
    return regeneratorRuntime.wrap(function sharedFn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i++;

            _context.next = 3;
            return (0, _emberConcurrency.timeout)(1000);

          case 3:
            words = [(0, _utils.randomWord)(), (0, _utils.randomWord)(), (0, _utils.randomWord)()];
            wordsString = i + ': ' + words;

            if (!shouldError) {
              _context.next = 9;
              break;
            }

            throw new Error(wordsString);

          case 9:
            return _context.abrupt('return', wordsString);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  // BEGIN-SNIPPET completion-state-controller
  exports.default = Controller.extend({
    doStuff: (0, _emberConcurrency.task)(sharedFn),
    doStuffDrop: (0, _emberConcurrency.task)(sharedFn).drop(),
    doStuffEnqueue: (0, _emberConcurrency.task)(sharedFn).enqueue(),
    doStuffRestartable: (0, _emberConcurrency.task)(sharedFn).restartable(),

    showLessCommon: false,

    tasks: ["doStuff", "doStuffDrop", "doStuffEnqueue", "doStuffRestartable"],

    taskProperties: computed('showLessCommon', function () {
      return [].concat(_toConsumableArray(this.get('commonTaskProperties')), _toConsumableArray(this.get('showLessCommon') ? this.get('lessCommonTaskProperties') : []));
    }),

    commonTaskProperties: ["last", "lastSuccessful", "lastErrored"],

    lessCommonTaskProperties: ["lastComplete", "lastPerformed", "lastIncomplete", "lastCanceled"],

    actions: {
      performAll: function performAll() {}
    }
  });
});
define("dummy/docs/derived-state/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IHZg5/B9", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Derived State\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  One of the core goals of ember-concurrency is to provide as much\\n  \"],[11,\"strong\",[]],[13],[0,\"Derived State\"],[14],[0,\" as possible; for example, instead\\n  of requiring you to set and then later unset your own \"],[11,\"code\",[]],[13],[0,\"isRunning\"],[14],[0,\"\\n  flag at the beginning and end of a task, ember-concurrency gives you\\n  an \"],[11,\"code\",[]],[13],[0,\".isRunning\"],[14],[0,\" (and \"],[11,\"code\",[]],[13],[0,\".isIdle\"],[14],[0,\") property for free so that\\n  you don't have to manage your own state (which is a common source of bugs\\n  and boilerplate).\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  ember-concurrency gives you the concept of \"],[11,\"strong\",[]],[13],[0,\"Tasks\"],[14],[0,\", and\\n  when you \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\" a Task, it produces a\\n  \"],[11,\"strong\",[]],[13],[0,\"Task Instance\"],[14],[0,\", which represents a single execution\\n  of that task. Both of these objects expose a lot of derived state,\\n  which is described below.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Less commonly-used properties are \"],[11,\"em\",[]],[13],[0,\"italicized\"],[14],[0,\". Also, keep in\\n  mind that there are \"],[11,\"a\",[]],[15,\"href\",\"/api\"],[13],[0,\"API docs\"],[14],[0,\" for everything described below.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Properties on \"],[11,\"a\",[]],[15,\"href\",\"/api/Task.html\"],[13],[0,\"Task\"],[14],[0,\" objects\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"isRunning\"],[14],[0,\":\\n    true when there is at least one instance of the task running, false otherwise.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"isIdle\"],[14],[0,\": the opposite of \"],[11,\"code\",[]],[13],[0,\"isRunning\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"em\",[]],[13],[11,\"code\",[]],[13],[0,\"performCount\"],[14],[14],[0,\": The number of times the task has been performed\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"em\",[]],[13],[11,\"code\",[]],[13],[0,\"concurrency\"],[14],[14],[0,\": an integer representing the number of currently\\n    running task instances. If you're using a task modifier like\\n    \"],[11,\"code\",[]],[13],[0,\"drop/enqueue/restartable\"],[14],[0,\" (without specifying \"],[11,\"code\",[]],[13],[0,\"maxConcurrency\"],[14],[0,\")\\n    this number will never be greater than 1. This property is mostly useful for\\n    debugging.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"em\",[]],[13],[11,\"code\",[]],[13],[0,\"state\"],[14],[14],[0,\": a string description of the task's state; can\\n    either by \\\"running\\\" or \\\"idle\\\". Useful for debugging.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Accessing Task Instances from the Task object\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Tasks also expose properties for accessing specific\\n  Task Instances (which are created every time you call \"],[11,\"code\",[]],[13],[0,\".perform()\"],[14],[0,\"\\n  on a task).\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"last\"],[14],[0,\": the last Task Instance that started executing.\\n    This property will never point to a \"],[11,\"code\",[]],[13],[0,\"drop\"],[14],[0,\"ped Task Instance,\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"lastSuccessful\"],[14],[0,\": the last Task Instance that ran to completion\\n    (it returned a value that wasn't a rejecting promise).\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"isSuccessful\"],[14],[0,\": true if the Task Instance ran to completion\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"isError\"],[14],[0,\": true if Task Instance failed to run to completion due to an exception\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  In addition to these properties, keep in mind that at any point you can\\n  also just save the TaskInstance returned from \"],[11,\"code\",[]],[13],[0,\".perform()\"],[14],[0,\"\\n  to some property for later access in case the above properties don't\\n  hit your use cases (but please open a GitHub issue if you find yourself\\n  doing this often because this might suggest room for improvement in\\n  ember-concurrency's API).\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Properties on \"],[11,\"a\",[]],[15,\"href\",\"/api/TaskInstance.html\"],[13],[0,\"Task Instances\"],[14],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"value\"],[14],[0,\": the value returned from the task function. Is\\n    \"],[11,\"code\",[]],[13],[0,\"null\"],[14],[0,\" before a value is returned, and remains null\\n    if the task never completes (throws an error or is canceled).\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"error\"],[14],[0,\": the error/exception thrown from the task function\\n    (might also be the value of a rejected promise that was yielded).\\n    \"],[11,\"em\",[]],[13],[0,\"Note: until \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/machty/ember-concurrency/issues/40\"],[13],[0,\"this issue\"],[14],[0,\"\\n      is resolved, unless you write code to explicitly \"],[11,\"code\",[]],[13],[0,\".catch()\"],[14],[0,\"\\n      an error thrown from a performed task, this error will bubble\\n      to the browser (so error reporters like Bugsnag will see it).\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Put the two together...\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Given a task named \"],[11,\"code\",[]],[13],[0,\"myTask\"],[14],[0,\", if you need to display a success banner\\n  with the value returned from the most recent execution of \"],[11,\"code\",[]],[13],[0,\"myTask\"],[14],[0,\",\\n  you can simply reference \"],[11,\"code\",[]],[13],[0,\"{{myTask.last.value}}\"],[14],[0,\". If want this banner\\n  to persist until the next time the task runs to completion, you can\\n  just change it to \"],[11,\"code\",[]],[13],[0,\"{{myTask.lastSuccessful.value}}\"],[14],[0,\". There are other\\n  combinations as well that might better suit your UI needs.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"showLessCommon\"]]]]],false],[0,\" Show less common properties\\n\"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"tasks\"]]],null,{\"statements\":[[6,[\"with\"],[[33,[\"get\"],[[28,[null]],[28,[\"taskName\"]]],null]],null,{\"statements\":[[0,\"    \"],[11,\"h5\",[]],[13],[1,[28,[\"task\",\"name\"]],false],[0,\" (performCount=\"],[1,[28,[\"task\",\"performCount\"]],false],[0,\" concurrency=\"],[1,[28,[\"task\",\"concurrency\"]],false],[0,\")\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"task\"]],false],null],null],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[13],[0,\"\\n        Run to Completion\\n      \"],[14],[0,\"\\n      \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"task\"]],true],null],null],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[13],[0,\"\\n        Run until Error\\n      \"],[14],[0,\"\\n      \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"cancel-all\"],[[28,[\"task\"]]],null],null],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"isRunning\"]],\"button-primary\"],null],null],[13],[0,\"\\n        Cancel\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"table\",[]],[15,\"class\",\"u-full-width completion-state-table\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"th\",[]],[13],[0,\"Completion Property\"],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[0,\".value\"],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[0,\".error\"],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[0,\".isSuccessful\"],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[0,\".isError\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"taskProperties\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n            \"],[11,\"strong\",[]],[13],[0,\"myTask.\"],[1,[28,[\"tp\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"with\"],[[33,[\"get\"],[[28,[\"task\"]],[33,[\"concat\"],[[28,[\"tp\"]],\".value\"],null]],null]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"completion-status completion-success\"],[13],[1,[28,[\"v\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"v\"]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"with\"],[[33,[\"get\"],[[28,[\"task\"]],[33,[\"concat\"],[[28,[\"tp\"]],\".error\"],null]],null]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"completion-status completion-error\"],[13],[1,[28,[\"v\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"v\"]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"with\"],[[33,[\"get\"],[[28,[\"task\"]],[33,[\"concat\"],[[28,[\"tp\"]],\".isSuccessful\"],null]],null]],null,{\"statements\":[[0,\"              \"],[1,[28,[\"v\"]],false],[0,\"\\n\"]],\"locals\":[\"v\"]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"with\"],[[33,[\"get\"],[[28,[\"task\"]],[33,[\"concat\"],[[28,[\"tp\"]],\".isError\"],null]],null]],null,{\"statements\":[[0,\"              \"],[1,[28,[\"v\"]],false],[0,\"\\n\"]],\"locals\":[\"v\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"tp\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n\"]],\"locals\":[\"task\"]},null]],\"locals\":[\"taskName\"]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/derived-state/template.hbs" } });
});
define('dummy/docs/error-vs-cancelation/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    numCompletions: 0,
    numErrors: 0,
    numFinallys: 0,

    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(doError) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _emberConcurrency.timeout)(1000);

            case 3:
              if (!doError) {
                _context.next = 5;
                break;
              }

              throw new Error("Boom");

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              this.incrementProperty('numErrors');

            case 10:
              _context.prev = 10;

              this.incrementProperty('numFinallys');
              return _context.finish(10);

            case 13:
              this.incrementProperty('numCompletions');

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7, 10, 13]]);
    })).restartable()
  });
});
define("dummy/docs/error-vs-cancelation/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hpyam1EN", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Errors vs Cancelation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  When you \"],[11,\"code\",[]],[13],[0,\"yield aPromise\"],[14],[0,\",\\n  your task function will pause execution until one of three things happens:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"The promise fulfills, and your task will continue executing from that point.\"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"The promise rejects, and your task will automatically `throw` an error from that point.\"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Something causes the task to be canceled, which has the behavior described below.\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The \"],[6,[\"link-to\"],[\"docs.task-function-syntax\"],null,{\"statements\":[[0,\"Task Function Syntax docs\"]],\"locals\":[]},null],[0,\"\\n  demonstrates how you can use standard JavaScript \"],[11,\"code\",[]],[13],[0,\"try/catch\"],[14],[0,\" blocks\\n  to catch exceptions thrown when you yield a rejecting promise, but\\n  what about cancelation? Are cancelations considered exceptions/errors, or something else?\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  In ember-concurrency, cancelation is considered a third kind of \\\"completion\\\"\\n  (the other two being a successful return from a function, and throwing an exception\\n  from a function).\\n  Specifically, this means that if a task is canceled while it is paused on a\\n  yield, the task will essentially return from that point,\\n  it will skip any \"],[11,\"code\",[]],[13],[0,\"catch(e) {}\"],[14],[0,\" blocks it is in, but it \"],[11,\"em\",[]],[13],[0,\"will\"],[14],[0,\"\\n  execute any \"],[11,\"code\",[]],[13],[0,\"finally {}\"],[14],[0,\" blocks. The benefit of this behavior is that:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[11,\"code\",[]],[13],[0,\"finally\"],[14],[0,\" blocks will always run and can be used for cleanup logic *\"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    You don't have to distinguish between cancelation and thrown exceptions\\n    in your \"],[11,\"code\",[]],[13],[0,\"catch\"],[14],[0,\" blocks (which you'd annoyingly have to do\\n    if cancelation were considered just another type of error).\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    * While \"],[11,\"code\",[]],[13],[0,\"finally\"],[14],[0,\" blocks are nice for cleanup logic, make\\n    sure you're leveraging the power of\\n    \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifiers\"]],\"locals\":[]},null],[0,\" and \"],[11,\"code\",[]],[13],[0,\".isRunning / .isIdle\"],[14],[0,\"\\n    task properties as much as possible so that you're not manually re-implementing\\n    a lot of the implicit state that ember-concurrency provides you for free, e.g.\\n    you should should avoid manually toggling the visibility of a loading spinner within\\n    a task if you could accomplish the same thing using the \"],[11,\"code\",[]],[13],[0,\".isRunning\"],[14],[0,\"\\n    property on a task.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Both of the buttons below will (re)start \"],[11,\"code\",[]],[13],[0,\"myTask\"],[14],[0,\" when clicked.\\n  If you click the buttons quickly, it will cause the currently running task\\n  to cancel from the \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" where it is paused. Notice how\\n  cancelations don't increment the \"],[11,\"code\",[]],[13],[0,\"numErrors\"],[14],[0,\" property because\\n  cancelations skip the \"],[11,\"code\",[]],[13],[0,\"catch\"],[14],[0,\" block.\\n\"],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"myTask\"]],false],null],null],[13],[0,\"\\n  Run to Completion\\n\"],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"myTask\"]],true],null],null],[13],[0,\"\\n  Throw an Error\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Task State: \"],[1,[28,[\"myTask\",\"state\"]],false],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Completions: \"],[1,[26,[\"numCompletions\"]],false],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Errors: \"],[1,[26,[\"numErrors\"]],false],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Finally block runs: \"],[1,[26,[\"numFinallys\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"error-vs-cancelation-template.hbs\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"error-vs-cancelation.js\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/error-vs-cancelation/template.hbs" } });
});
define('dummy/docs/events/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Evented = Ember.Evented;
  var Controller = Ember.Controller;
  var $ = Ember.$;
  exports.default = Controller.extend(Evented, {
    // BEGIN-SNIPPET waitForEvent
    jQueryEvent: null,
    jQueryEventLoop: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var $body, event;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $body = $('body');

            case 1:
              if (!true) {
                _context.next = 9;
                break;
              }

              _context.next = 4;
              return (0, _emberConcurrency.waitForEvent)($body, 'click');

            case 4:
              event = _context.sent;

              this.set('jQueryEvent', event);
              this.trigger('fooEvent', { v: Math.random() });
              _context.next = 1;
              break;

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).on('init'),

    emberEvent: null,
    emberEventedLoop: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2() {
      var event;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!true) {
                _context2.next = 7;
                break;
              }

              _context2.next = 3;
              return (0, _emberConcurrency.waitForEvent)(this, 'fooEvent');

            case 3:
              event = _context2.sent;

              this.set('emberEvent', event);
              _context2.next = 0;
              break;

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })).on('init'),
    // END-SNIPPET


    // BEGIN-SNIPPET waitForEvent-derived-state
    waiterLoop: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!true) {
                _context3.next = 7;
                break;
              }

              _context3.next = 3;
              return this.get('waiter').perform();

            case 3:
              _context3.next = 5;
              return (0, _emberConcurrency.timeout)(1500);

            case 5:
              _context3.next = 0;
              break;

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })).on('init'),

    waiter: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee4() {
      var event;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _emberConcurrency.waitForEvent)($('body'), 'click');

            case 2:
              event = _context4.sent;
              return _context4.abrupt('return', event);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }))
  });
});
define("dummy/docs/events/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WsA9kijr", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Waiting for Ember / jQuery Events\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  You can use \"],[11,\"code\",[]],[13],[0,\"waitForEvent\"],[14],[0,\" to pause your task until\\n  an Ember.Evented or jQuery Event fires.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This is useful for when you want to dynamically wait for an event to fire\\n  within a task, but you don't want to have to set up a Promise that\\n  resolves when the event fires.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Try clicking around the page; \"],[11,\"code\",[]],[13],[0,\"waitForEvent\"],[14],[0,\" will install\\n  handlers and wait for the specified Ember or jQuery event to fire;\\n  the value returned from \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" is the event that was fired.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"\\n  jqueryEvent: (x=\"],[1,[28,[\"jQueryEvent\",\"offsetX\"]],false],[0,\", y=\"],[1,[28,[\"jQueryEvent\",\"offsetX\"]],false],[0,\")\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"\\n  emberEvent: (v=\"],[1,[28,[\"emberEvent\",\"v\"]],false],[0,\")\\n\"],[14],[0,\"\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"waitForEvent.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"waitForEvent.hbs\"]]],false],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Example with Derived State\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Sometimes, it's desirable to know whether a certain part of a task\\n  is executing, rather than the whole task. For instance, in the example\\n  below, the \"],[11,\"code\",[]],[13],[0,\"waiterLoop\"],[14],[0,\" task has an infinite loop, so\\n  \"],[11,\"code\",[]],[13],[0,\"waiterLoop.isRunning\"],[14],[0,\" will always be true. If you want\\n  to know whether a specific part of that loop is running, then you\\n  can just extract some of that logic into another task and check\\n  if that subtask's \"],[11,\"code\",[]],[13],[0,\"isRunning\"],[14],[0,\" property in the template.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"waiter\",\"isRunning\"]]],null,{\"statements\":[[0,\"    Please click somewhere...\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    Thanks!\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"waitForEvent-derived-state.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"waitForEvent-derived-state.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/events/template.hbs" } });
});
define("dummy/docs/examples/ajax-throttling/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UYeztdcV", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Example: AJAX Throttling\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Limiting the number of simultaneous AJAX requests\\n  (or the number of any kind of global, shared resource)\\n  can be accomplished using the \"],[11,\"code\",[]],[13],[0,\".maxConcurrency()\"],[14],[0,\" task modifier.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  In the example below, we render a component with 8 different\\n  concurrently running tasks that each, within an infinite loop,\\n  make (fake) AJAX requests. We've wrapped the code that actually\\n  performs the (fake) AJAX request in a task, and we've annotated\\n  that task with \"],[11,\"code\",[]],[13],[0,\".maxConcurrency(3)\"],[14],[0,\" to ensure that\\n  no more than 3 AJAX requests can be run at a time (so that\\n  we don't overload the browser).\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[1,[26,[\"ajax-throttling-example\"]],false],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"ajax-throttling.js\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/ajax-throttling/template.hbs" } });
});
define('dummy/docs/examples/autocomplete/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var $ = Ember.$;
  var isBlank = Ember.isBlank;
  var Controller = Ember.Controller;


  // BEGIN-SNIPPET debounced-search-with-cancelation
  var DEBOUNCE_MS = 250;
  exports.default = Controller.extend({
    searchRepo: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(term) {
      var url, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!isBlank(term)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', []);

            case 2:
              _context.next = 4;
              return (0, _emberConcurrency.timeout)(DEBOUNCE_MS);

            case 4:
              url = 'https://api.github.com/search/repositories?q=' + term;

              // We yield an AJAX request and wait for it to complete. If the task
              // is restarted before this request completes, the XHR request
              // is aborted (open the inspector and see for yourself :)

              _context.next = 7;
              return this.get('getJSON').perform(url);

            case 7:
              json = _context.sent;
              return _context.abrupt('return', json.items.slice(0, 10));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable(),

    getJSON: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2(url) {
      var xhr, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              xhr = void 0;
              _context2.prev = 1;

              xhr = $.getJSON(url);
              _context2.next = 5;
              return xhr.promise();

            case 5:
              result = _context2.sent;
              return _context2.abrupt('return', result);

            case 7:
              _context2.prev = 7;

              xhr.abort();
              return _context2.finish(7);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1,, 7, 10]]);
    }))
  });
});
define("dummy/docs/examples/autocomplete/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fuo+XpRL", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Debounced Type-Ahead Search\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This advanced example combines multiple ember-concurrency concepts\\n  to build a basic type-ahead search field with the following features:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Debouncing: the browser won't make network requests until the user has\\n    stopped typing for more than 250ms. This is accomplished by combining the\\n    \"],[11,\"code\",[]],[13],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\".restartable()\"]],\"locals\":[]},null],[14],[0,\" task modifier\\n    with a \"],[11,\"code\",[]],[13],[0,\"yield timeout(250)\"],[14],[0,\" at the beginning of the task.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    XHR cancelation: if the user starts typing while a prior XHR request\\n    is underway, that XHR request will be canceled to save network resources\\n    (this is accomplished via the \"],[6,[\"link-to\"],[\"docs.error-vs-cancelation\"],null,{\"statements\":[[0,\"try / finally cancelation pattern\"]],\"locals\":[]},null],[0,\").\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Use \"],[6,[\"link-to\"],[\"docs.derived-state\"],null,{\"statements\":[[0,\"Derived State\"]],\"locals\":[]},null],[0,\" to display\\n    both a loading spinner and the final search results without using\\n    a single \"],[11,\"code\",[]],[13],[0,\".set()\"],[14],[0,\".\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  (Please mind the GitHub API quota :)\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[0,\"  \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"perform\"],[[28,[\"searchRepo\"]]],[[\"value\"],[\"target.value\"]]],null],[15,\"placeholder\",\"Search GitHub...\"],[13],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"searchRepo\",\"isRunning\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"searchRepo\",\"lastSuccessful\",\"value\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[1,[28,[\"repo\",\"full_name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"repo\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"h5\",[]],[13],[0,\"JavaScript\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"debounced-search-with-cancelation.js\"]]],false],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Template\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"debounced-search-with-cancelation-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/autocomplete/template.hbs" } });
});
define('dummy/docs/examples/decorating-tasks/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;
  var Controller = Ember.Controller;


  // BEGIN-SNIPPET decorating-tasks
  function taskWithCooldown(taskPath, ms) {
    return (0, _emberConcurrency.task)(taskPath, regeneratorRuntime.mark(function _callee(otherTask) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return otherTask.perform.apply(otherTask, args);

            case 2:
              _context.next = 4;
              return (0, _emberConcurrency.timeout)(ms);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).drop();
  }

  exports.default = Controller.extend({
    sharedTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _emberConcurrency.timeout)(1000);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })).drop(),

    halfSecond: taskWithCooldown('sharedTask', 500),
    oneSecond: taskWithCooldown('sharedTask', 1000),
    twoSeconds: taskWithCooldown('sharedTask', 2000),

    tasks: computed(function () {
      return [this.get('halfSecond'), this.get('oneSecond'), this.get('twoSeconds')];
    })
  });
});
define("dummy/docs/examples/decorating-tasks/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8V73zwUv", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Decorating (or Composing) Tasks\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Sometimes you'll want to write a task that simply runs\\n  another task, but with some added behavior. One example\\n  is a button with a cooldown period after the underyling\\n  task has finished running. In such a case, it might be\\n  tempting to put the cooldown timer on the underlying\\n  task, but if the underlying task is shared between many\\n  consumers that \"],[11,\"em\",[]],[13],[0,\"don't\"],[14],[0,\" require that cooldown time,\\n  then you'd be foisting your cooldown needs on everyone\\n  else who might depend on that shared resource.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  ember-concurrency task are composable, such that it's\\n  easy to write tasks that decorate another task with added\\n  behavior, as shown in the example below:\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Shared Task: \"],[1,[28,[\"sharedTask\",\"state\"]],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The following buttons use the \"],[11,\"code\",[]],[13],[0,\".isIdle\"],[14],[0,\" property of Task\\n  to stylize the buttons as clickable. \"],[11,\"code\",[]],[13],[0,\"isIdle\"],[14],[0,\" is false only\\n  when the task is actively running, which explains why, when clicking\\n  buttons in the top row, only the one you click is stylized as inactive,\\n  while the others still look clickable (because they both perform different\\n  tasks). In fact, clicking these active-looking\\n  buttons while \"],[11,\"code\",[]],[13],[0,\"sharedTask\"],[14],[0,\" is still running will result in those\\n  clicks being ignored since the both \"],[11,\"code\",[]],[13],[0,\"sharedTask\"],[14],[0,\" and the tasks\\n  with cooldown applied, are configured to \"],[11,\"code\",[]],[13],[0,\"drop\"],[14],[0,\" performs while\\n  they're running.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"tasks\"]]],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"isIdle\"]],\"button-primary\"],null],null],[5,[\"action\"],[[28,[null]],[28,[\"task\",\"perform\"]]]],[13],[0,\"\\n      \"],[1,[28,[\"task\",\"name\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"task\"]},null],[14],[0,\"\\n\"],[0,\"\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The buttons below use \"],[11,\"code\",[]],[13],[0,\".performWillSucceed\"],[14],[0,\" instead of \"],[11,\"code\",[]],[13],[0,\".isIdle\"],[14],[0,\"\\n  to stylize the buttons as clickable. \"],[11,\"code\",[]],[13],[0,\".performWillSucceed\"],[14],[0,\" is true\\n  when the state of the task is such that calling \"],[11,\"code\",[]],[13],[0,\".perform()\"],[14],[0,\" on it\\n  will immediately execute (rather than being dropped or enqueued). While \"],[11,\"code\",[]],[13],[0,\"isIdle\"],[14],[0,\"\\n  only takes into considering whether the specified task is running,\\n  \"],[11,\"code\",[]],[13],[0,\".performWillSucceed\"],[14],[0,\" takes into consideration whether the linked task\\n  (via the string arg path to the task) can be performed at this time.\\n  This explains why the buttons below \"],[11,\"em\",[]],[13],[0,\"all\"],[14],[0,\" are stylized as unclickable when\\n  \"],[11,\"em\",[]],[13],[0,\"anyone\"],[14],[0,\" is performing \"],[11,\"code\",[]],[13],[0,\"sharedTask\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"tasks\"]]],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"performWillSucceed\"]],\"button-primary\"],null],null],[5,[\"action\"],[[28,[null]],[28,[\"task\",\"perform\"]]]],[13],[0,\"\\n      \"],[1,[28,[\"task\",\"name\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"task\"]},null],[14],[0,\"\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"decorating-tasks.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"decorating-tasks-template-isIdle.hbs\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"decorating-tasks-template-performWillSucceed.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/decorating-tasks/template.hbs" } });
});
define('dummy/docs/examples/encapsulated-task-fun/controller', ['exports', 'dummy/utils', 'ember-concurrency'], function (exports, _utils, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marked = [sharedFn].map(regeneratorRuntime.mark);

  var Controller = Ember.Controller;


  function sharedFn() {
    return regeneratorRuntime.wrap(function sharedFn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _emberConcurrency.timeout)(Math.random() * 2000);

          case 2:
            return _context.abrupt('return', (0, _utils.randomWord)());

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  exports.default = Controller.extend({
    doStuff: (0, _emberConcurrency.task)({
      perform: regeneratorRuntime.mark(function perform() {
        return regeneratorRuntime.wrap(function perform$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', (0, _emberConcurrency.all)([this.get('foo').perform(), this.get('bar').perform(), this.get('baz').perform()]));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, perform, this);
      }),

      foo: (0, _emberConcurrency.task)(sharedFn),
      bar: (0, _emberConcurrency.task)(sharedFn),
      baz: (0, _emberConcurrency.task)(sharedFn)
    }).restartable()
  });
});
define("dummy/docs/examples/encapsulated-task-fun/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GggKbjgC", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Experimental: EncapsulatedTasks\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Normally, you define tasks by passing a generator function to \"],[11,\"code\",[]],[13],[0,\"task(...)\"],[14],[0,\".\\n  Sometimes though, blah blah blah here is an example.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"doStuff\"]]],null],null],[13],[0,\"\\n    Do Stuff\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"with\"],[[28,[\"doStuff\",\"last\"]]],null,{\"statements\":[[0,\"  \"],[11,\"h5\",[]],[13],[0,\"value: \"],[1,[28,[\"t\",\"value\"]],false],[14],[0,\"\\n  \"],[11,\"h5\",[]],[13],[0,\"foo:   \"],[1,[28,[\"t\",\"foo\",\"last\",\"value\"]],false],[14],[0,\"\\n  \"],[11,\"h5\",[]],[13],[0,\"bar:   \"],[1,[28,[\"t\",\"bar\",\"last\",\"value\"]],false],[14],[0,\"\\n  \"],[11,\"h5\",[]],[13],[0,\"baz:   \"],[1,[28,[\"t\",\"baz\",\"last\",\"value\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"t\"]},null],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-fun-controller.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-fun-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/encapsulated-task-fun/template.hbs" } });
});
define('dummy/docs/examples/encapsulated-task/controller', ['exports', 'dummy/utils', 'ember-concurrency'], function (exports, _utils, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    uploadFile: (0, _emberConcurrency.task)({
      progress: 0,
      url: null,
      perform: regeneratorRuntime.mark(function perform(makeUrl) {
        var newProgress;
        return regeneratorRuntime.wrap(function perform$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.set('url', makeUrl());

              case 1:
                if (!(this.progress < 100)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return (0, _emberConcurrency.timeout)(100);

              case 4:
                newProgress = this.progress + Math.floor(Math.random() * 6) + 5;

                this.set('progress', Math.min(100, newProgress));
                _context.next = 1;
                break;

              case 8:
                return _context.abrupt('return', "Success!");

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, perform, this);
      })
    }).enqueue(),

    makeRandomUrl: function makeRandomUrl() {
      return 'https://www.' + (0, _utils.randomWord)() + '.edu';
    }
  });
});
define("dummy/docs/examples/encapsulated-task/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vIPzcAPa", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Experimental: Encapsulated Tasks\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Normally, you define tasks by passing a generator function to \"],[11,\"code\",[]],[13],[0,\"task(...)\"],[14],[0,\".\\n  Often though, you want to be able to expose additional state of the task,\\n  e.g. you might want to show the percentage progress of an \"],[11,\"code\",[]],[13],[0,\"uploadFile\"],[14],[0,\" task,\\n  but unless you're using the techniques describes below there's no good\\n  place to expose that data to the template other than to set some properties\\n  on the host object, but then you lose a lot of the benefits of encapsulation\\n  in the process.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  In cases like these, you can use Encapsulated Tasks, which behave just\\n  like regular tasks, except that they don't have access to the object\\n  they're attached to, but rather can only set properties (or emit events)\\n  on themselves. Defining Encapsulated Tasks is easy: instead of passing\\n  a generator function directly to \"],[11,\"code\",[]],[13],[0,\"task(...)\"],[14],[0,\", you pass an\\n  object with a \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\" method.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\\n\\n\\n\\n  pass an object with a\\n  \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\" method to the \"],[11,\"code\",[]],[13],[0,\"task(...)\"],[14],[0,\" function\\n\\n\\n  instead of passing\\n  a generator function to \"],[11,\"code\",[]],[13],[0,\"task(...)\"],[14],[0,\", you pass an object\\n  with a \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\" method.\\n\\n  , which are objects with\\n  a \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\" method and other state that you can use in the\\n  place of the generator function you normally supply to \"],[11,\"code\",[]],[13],[0,\"task()\"],[14],[0,\".\\n  When you use a EncapsulatedTask, the value of \"],[11,\"code\",[]],[13],[0,\"this\"],[14],[0,\" in the \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\"\\n  generator function is the EncapsulatedTask object, which means it's a good place to\\n  set encapsulated values specific to that running task instance.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"uploadFile\"]],[28,[\"makeRandomUrl\"]]],null],null],[13],[0,\"\\n    Start Upload\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Queued Uploads: \"],[1,[28,[\"uploadFile\",\"numQueued\"]],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"uploadFile\",\"last\"]]],null,{\"statements\":[[0,\"  \"],[11,\"h5\",[]],[13],[0,\"\\n    Uploading to \"],[1,[28,[\"uploadFile\",\"last\",\"url\"]],false],[0,\":\\n    \"],[1,[28,[\"uploadFile\",\"last\",\"progress\"]],false],[0,\"%\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"uploadFile\",\"lastSuccessful\"]]],null,{\"statements\":[[0,\"  \"],[11,\"h5\",[]],[15,\"style\",\"color: green;\"],[13],[0,\"\\n    \"],[11,\"strong\",[]],[13],[0,\"\\n    Upload to \"],[1,[28,[\"uploadFile\",\"lastSuccessful\",\"url\"]],false],[0,\":\\n    \"],[1,[28,[\"uploadFile\",\"lastSuccessful\",\"value\"]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-controller.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"encapsulated-task-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/encapsulated-task/template.hbs" } });
});
define('dummy/docs/examples/increment-buttons/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    count: 0,
    incrementBy: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(inc) {
      var speed;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              speed = 400;

            case 1:
              if (!true) {
                _context.next = 8;
                break;
              }

              this.incrementProperty('count', inc);
              _context.next = 5;
              return (0, _emberConcurrency.timeout)(speed);

            case 5:
              speed = Math.max(50, speed * 0.8);
              _context.next = 1;
              break;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/docs/examples/increment-buttons/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ssqA6RoD", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Accelerating Increment / Decrement Buttons\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This example demonstrates a few different concepts:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Tricky time-based operations like acceleration are simplified\\n      by the sequential style of task functions\"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    You can use \"],[11,\"code\",[]],[13],[0,\"(perform taskName)\"],[14],[0,\" in place of anywhere you\\n    might want to use a classic Ember action.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"h1\",[]],[13],[0,\"Num: \"],[1,[26,[\"count\"]],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"(Hold down the buttons to accelerate.)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[6,[\"press-and-hold-button\"],null,[[\"press\",\"release\"],[[33,[\"perform\"],[[28,[\"incrementBy\"]],-1],null],[33,[\"cancel-all\"],[[28,[\"incrementBy\"]]],null]]],{\"statements\":[[0,\"      --Decrease\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"press-and-hold-button\"],null,[[\"press\",\"release\"],[[33,[\"perform\"],[[28,[\"incrementBy\"]],1],null],[33,[\"cancel-all\"],[[28,[\"incrementBy\"]]],null]]],{\"statements\":[[0,\"      Increase++\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[0,\"\\n\"],[11,\"h5\",[]],[13],[0,\"JavaScript (task)\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"increment-button-task.js\"]]],false],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"JavaScript (button component)\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"increment-button.js\"]]],false],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Template\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"press-and-hold-buttons.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/increment-buttons/template.hbs" } });
});
define("dummy/docs/examples/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "H4ksj9/o", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Examples\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  What better way to familiarize yourself with\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" than to check out\\n  the slew of examples on the left?\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Also, if you can't find the example or answer you're looking for,\\n  please \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/machty/ember-concurrency/issues\"],[13],[0,\"open an issue\"],[14],[0,\"\\n  or \"],[11,\"a\",[]],[15,\"href\",\"https://twitter.com/machty\"],[13],[0,\"ping @machty on Twitter\"],[14],[0,\" and\\n  he'll cook one up for you :).\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/index/template.hbs" } });
});
define('dummy/docs/examples/joining-tasks-2/controller', ['exports', 'dummy/utils', 'ember-concurrency'], function (exports, _utils, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var makeArray = Ember.makeArray;
  var Controller = Ember.Controller;

  var methods = { all: _emberConcurrency.all, race: _emberConcurrency.race };

  exports.default = Controller.extend({
    status: "Waiting...",
    childTasks: null,

    parent: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(methodName) {
      var allOrRace, childTasks, id, words;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              allOrRace = methods[methodName];
              childTasks = [];


              for (id = 0; id < 5; ++id) {
                childTasks.push(this.get('child').perform(id));
              }

              this.set('childTasks', childTasks);
              this.set('status', "Waiting for child tasks to complete...");
              _context.next = 7;
              return allOrRace(childTasks);

            case 7:
              words = _context.sent;

              this.set('status', 'Done: ' + makeArray(words).join(', '));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable(),

    child: (0, _emberConcurrency.task)({
      percent: 0,
      id: null,

      perform: regeneratorRuntime.mark(function perform(id) {
        var newPercent;
        return regeneratorRuntime.wrap(function perform$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.set('id', id);

              case 1:
                if (!(this.percent < 100)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 4;
                return (0, _emberConcurrency.timeout)(Math.random() * 100 + 100);

              case 4:
                newPercent = Math.min(100, Math.floor(this.percent + Math.random() * 20));

                this.set('percent', newPercent);
                _context2.next = 1;
                break;

              case 8:
                return _context2.abrupt('return', (0, _utils.randomWord)());

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, perform, this);
      })
    }).enqueue().maxConcurrency(3),

    colors: ['#ff8888', '#88ff88', '#8888ff']
  });
});
define("dummy/docs/examples/joining-tasks-2/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ovH/qenj", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Awaiting Multiple Child Tasks (or, cancelable Promise.all, Promise.race)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This is a rewrite of the \"],[6,[\"link-to\"],[\"docs.examples.joining-tasks\"],null,{\"statements\":[[0,\"Awaiting Multiple Child Tasks\"]],\"locals\":[]},null],[0,\"\\n  example, using encapsulated-tasks and completion state on task objects.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Status: \"],[1,[26,[\"status\"]],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"parent\"]],\"all\"],null],null],[13],[0,\"all()\"],[14],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"parent\"]],\"race\"],null],null],[13],[0,\"race()\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[0,\"\\n\"],[6,[\"each\"],[[28,[\"childTasks\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"progress-outer\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"progress-inner\"],[16,\"style\",[33,[\"progress-style\"],[[28,[\"ti\",\"percent\"]],[28,[\"ti\",\"id\"]],[28,[\"colors\"]]],null],null],[13],[0,\"\\n      Progress: \"],[1,[28,[\"ti\",\"percent\"]],false],[0,\"%\\n\"],[6,[\"if\"],[[28,[\"ti\",\"value\"]]],null,{\"statements\":[[0,\"        Word: \"],[1,[28,[\"ti\",\"value\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[\"ti\"]},null],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks-2.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks-2-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/joining-tasks-2/template.hbs" } });
});
define('dummy/docs/examples/joining-tasks/controller', ['exports', 'dummy/utils', 'ember-concurrency'], function (exports, _utils, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var makeArray = Ember.makeArray;
  var Controller = Ember.Controller;
  var EmberObject = Ember.Object;

  var methods = { all: _emberConcurrency.all, race: _emberConcurrency.race };

  var ProgressTracker = EmberObject.extend({
    id: null,
    percent: 0,
    word: null
  });

  exports.default = Controller.extend({
    status: "Waiting...",
    trackers: null,

    parent: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(methodName) {
      var allOrRace, trackers, childTasks, id, tracker, words;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
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
              _context.next = 7;
              return allOrRace(childTasks);

            case 7:
              words = _context.sent;

              this.set('status', 'Done: ' + makeArray(words).join(', '));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable(),

    child: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2(tracker) {
      var percent, word;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              percent = 0;

            case 1:
              if (!(percent < 100)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 4;
              return (0, _emberConcurrency.timeout)(Math.random() * 100 + 100);

            case 4:
              percent = Math.min(100, Math.floor(percent + Math.random() * 20));
              tracker.set('percent', percent);
              _context2.next = 1;
              break;

            case 8:
              word = (0, _utils.randomWord)();

              tracker.set('word', word);
              return _context2.abrupt('return', word);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })).enqueue().maxConcurrency(3),

    colors: ['#ff8888', '#88ff88', '#8888ff']
  });
});
define("dummy/docs/examples/joining-tasks/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KWV53POo", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Awaiting Multiple Child Tasks (or, cancelable Promise.all, Promise.race)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" provides Task-aware variants of\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all\"],[13],[0,\"Promise.all\"],[14],[0,\" and\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race\"],[13],[0,\"Promise.race\"],[14],[0,\",\\n  which can be used in cases where a parent task wants to wait\\n  for multiple child tasks to run to completion (or throw an error)\\n  before continuing onward. The \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\"\\n  variants both have the added benefit that if the parent task is canceled (or restarts),\\n  all of the child tasks will be automatically canceled. Similarly,\\n  in the case of \"],[11,\"strong\",[]],[13],[0,\"all()\"],[14],[0,\",\\n  if any of the child tasks throws an error, all other child tasks\\n  are immediately canceled.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The example below can be started (or restarted) using either\\n  \"],[11,\"code\",[]],[13],[0,\"all()\"],[14],[0,\" to wait for all child tasks to run to completion,\\n  or \"],[11,\"code\",[]],[13],[0,\"race()\"],[14],[0,\" to wait for the first. Note that how, in both cases,\\n  \"],[11,\"code\",[]],[13],[0,\".maxConcurrency(3)\"],[14],[0,\" ensures that only 3 progress tasks\\n  run at a time, but if you restart the task while it's running, it immediately\\n  starts 3 tasks after canceling the previous ones.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Status: \"],[1,[26,[\"status\"]],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"parent\"]],\"all\"],null],null],[13],[0,\"all()\"],[14],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"parent\"]],\"race\"],null],null],[13],[0,\"race()\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[0,\"\\n\"],[6,[\"each\"],[[28,[\"trackers\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"progress-outer\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"progress-inner\"],[16,\"style\",[33,[\"progress-style\"],[[28,[\"tracker\",\"percent\"]],[28,[\"tracker\",\"id\"]],[28,[\"colors\"]]],null],null],[13],[0,\"\\n      Progress: \"],[1,[28,[\"tracker\",\"percent\"]],false],[0,\"%\\n\"],[6,[\"if\"],[[28,[\"tracker\",\"word\"]]],null,{\"statements\":[[0,\"        Word: \"],[1,[28,[\"tracker\",\"word\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[\"tracker\"]},null],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"joining-tasks-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/joining-tasks/template.hbs" } });
});
define('dummy/docs/examples/loading-ui/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    askQuestion: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _emberConcurrency.timeout)(1000);

            case 2:
              this.set('result', Math.random());

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).drop(),

    result: null
  });
});
define("dummy/docs/examples/loading-ui/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NUH0WcB6", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Loading UI While a Task is Running\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Reining in undesired concurrency is partly what \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\"\\n  has to offer. The other part is making it easy to build UI around\\n  asynchronous tasks.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  For simple cases where you just need to display a loading dialog or disable a button\\n  while a task is running, you can make use of the \"],[11,\"code\",[]],[13],[0,\".isIdle\"],[14],[0,\" property of\\n  a task. This property is false when the task is running, and true otherwise. This eliminates\\n  a lot of the boilerplate of setting a property at the beginning of some async operation,\\n  and unsetting when the operation completes. Also, because the task in the example\\n  below uses the \"],[11,\"code\",[]],[13],[0,\"drop()\"],[14],[0,\" modifier\\n  (see \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Managing Task Concurrency\"]],\"locals\":[]},null],[0,\"),\\n  there's no need to write a guard at the beginning of the task to return early if\\n  the task is already running.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  What is the meaning of life?\\n  \"],[6,[\"if\"],[[28,[\"result\"]]],null,{\"statements\":[[0,\" Answer: \"],[1,[26,[\"result\"]],false],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[0,\"  \"],[11,\"button\",[]],[16,\"class\",[33,[\"if\"],[[28,[\"askQuestion\",\"isIdle\"]],\"button-primary\"],null],null],[16,\"onclick\",[33,[\"perform\"],[[28,[\"askQuestion\"]]],null],null],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"askQuestion\",\"isIdle\"]]],null,{\"statements\":[[0,\"          Ask\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          Thinking...\\n          \"],[1,[33,[\"fa-icon\"],[\"spinner\"],[[\"spin\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"loading-ui-controller.js\"]]],false],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"ask-button.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/loading-ui/template.hbs" } });
});
define("dummy/docs/examples/observables/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VwNYc/7t", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Experimental: Observables\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" integrates with Observables\\n  and lets you apply the same concurrency constraints to\\n  subscriptions to Observables that you could apply to a task —\\n  just as you can configure a Task to \"],[11,\"code\",[]],[13],[0,\"drop()\"],[14],[0,\" new\\n  \"],[11,\"code\",[]],[13],[0,\".perform()\"],[14],[0,\"s while the task is already running, so can\\n  you configure the subscription to an async sequence of events\\n  (the Observable) to \"],[11,\"code\",[]],[13],[0,\"drop()\"],[14],[0,\" events while the\\n  previous event is being handled (or use any other task modifier\\n  you like).\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Nested loop of Observable range of numbers\"],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"computeStuff\"]]],null],null],[13],[0,\"Compute Stuff\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[13],[6,[\"each\"],[[28,[\"values\"]]],null,{\"statements\":[[1,[28,[\"v\",\"message\"]],false]],\"locals\":[\"v\"]},null],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"observables-timetable.js\"]]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Subscribing to Observable of Evented events\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Status: \"],[1,[26,[\"fooStatus\"]],false],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"triggerFoo\"]],[13],[0,\"Trigger Foo\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"observables-evented.js\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/observables/template.hbs" } });
});
define('dummy/docs/examples/route-tasks/controller', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    ids: [1, 2, 3, 4, 10, 50, 200]
  });
});
define('dummy/docs/examples/route-tasks/detail/route', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var service = Ember.inject.service;
  var Route = Ember.Route;
  exports.default = Route.extend({
    notify: service('notify'),

    setupController: function setupController(controller, model) {
      this._super.apply(this, arguments);
      this.get('pollServerForChanges').perform(model.id);
    },


    pollServerForChanges: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(id) {
      var notify;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              notify = this.get('notify');
              _context.next = 3;
              return (0, _emberConcurrency.timeout)(500);

            case 3:
              _context.prev = 3;

              notify.info('Thing ' + id + ': Starting to poll for changes');

            case 5:
              if (!true) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return (0, _emberConcurrency.timeout)(5000);

            case 8:
              notify.info('Thing ' + id + ': Polling now...');
              _context.next = 5;
              break;

            case 11:
              _context.prev = 11;

              notify.warning('Thing ' + id + ': No longer polling for changes');
              return _context.finish(11);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3,, 11, 14]]);
    })).cancelOn('deactivate').restartable()
  });
});
define('dummy/docs/examples/route-tasks/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs.examples.route-tasks.detail', 1);
    }
  });
});
define("dummy/docs/examples/route-tasks/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GncTBL3G", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Tasks on Ember.Route (and other long-lived objects)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" tasks are scoped to the lifetime of\\n  the object they live on, so if that object is destroyed, all of the\\n  tasks attached to it are canceled.  This is very convenient when\\n  writing tasks on object with finite lifetimes, like Components, but certain Ember objects, like\\n  Routes (and Controllers), are never actually destroyed. Even\\n  if you can't rely on object destruction to cancel a task,\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" makes it easy to run\\n  tasks between lifecycle events other than \"],[11,\"code\",[]],[13],[0,\"init\"],[14],[0,\"\\n  and \"],[11,\"code\",[]],[13],[0,\"destroy\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Try clicking the links below. As the URL changes, you should see\\n  notifications about the server polling status changing. If you\\n  leave this route (by going to another page on this site), you'll\\n  see that the polling task is being properly canceled.\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"ids\"]]],null,{\"statements\":[[0,\"  \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"docs.examples.route-tasks.detail\",[28,[\"id\"]]],null,{\"statements\":[[0,\"      Thing \"],[1,[28,[\"id\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[\"id\"]},null],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    We use the \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/aexmachina/ember-notify\"],[13],[0,\"ember-notify\"],[14],[0,\" Ember Addon\\n    to display notifications using the \"],[11,\"code\",[]],[13],[0,\"notify\"],[14],[0,\" service it provides.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"code\",[]],[13],[0,\"setupController\"],[14],[0,\" kicks off the task with the current model id\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    The \"],[11,\"code\",[]],[13],[0,\"pollServerForChanges\"],[14],[0,\" task polls the server in a loop,\\n    and uses the \"],[11,\"code\",[]],[13],[0,\"finally\"],[14],[0,\" block to notify when it is being canceled.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    We use \"],[11,\"code\",[]],[13],[0,\"restartable\"],[14],[0,\" to ensure that only one instance of the\\n    task is running at a time, hence any time \"],[11,\"code\",[]],[13],[0,\"setupController\"],[14],[0,\"\\n    performs the task, any prior instances are canceled.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    We use \"],[11,\"code\",[]],[13],[0,\".cancelOn('deactivate')\"],[14],[0,\" to make sure the task cancels\\n    when the user leaves the route.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"detail-route.js\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/route-tasks/template.hbs" } });
});
define('dummy/docs/examples/task-concurrency/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs.task-concurrency');
    }
  });
});
define('dummy/docs/examples/task-groups/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    everything: (0, _emberConcurrency.taskGroup)(),
    everythingDropped: (0, _emberConcurrency.taskGroup)().drop(),
    everythingEnqueue: (0, _emberConcurrency.taskGroup)().enqueue(),
    everythingRestart: (0, _emberConcurrency.taskGroup)().restartable(),
    everythingDropped3: (0, _emberConcurrency.taskGroup)().maxConcurrency(3).drop(),
    everythingEnqueue3: (0, _emberConcurrency.taskGroup)().maxConcurrency(3).enqueue(),
    everythingRestart3: (0, _emberConcurrency.taskGroup)().maxConcurrency(3).restartable(),

    taskGroups: computed(function () {
      return [this.get('everything'), this.get('everythingDropped'), this.get('everythingEnqueue'), this.get('everythingRestart'), this.get('everythingDropped3'), this.get('everythingEnqueue3'), this.get('everythingRestart3')];
    })
  });
});
define("dummy/docs/examples/task-groups/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LuHirs11", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Task Groups (beta)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  To constrain the concurrency of a single task,\\n  you use \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifiers\"]],\"locals\":[]},null],[0,\",\\n  but what if you want to ensure that\\n  two (or more) separate tasks don't run at the same time?\\n  In these cases, you use \"],[11,\"strong\",[]],[13],[0,\"Task Groups\"],[14],[0,\":\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Declare a task group via \"],[11,\"code\",[]],[13],[0,\"nameOfGroup: taskGroup()\"],[14],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Apply any desired \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifiers\"]],\"locals\":[]},null],[0,\"\\n    to that task group (just as you would with a normal task).\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Append \"],[11,\"code\",[]],[13],[0,\".group('nameOfGroup')\"],[14],[0,\" to any tasks you want to\\n    be considered part of the group.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Whereas using a modifier like \"],[11,\"code\",[]],[13],[0,\"drop()\"],[14],[0,\" on a single task\\n  prevents that single task from running concurrently, using\\n  \"],[11,\"code\",[]],[13],[0,\"drop()\"],[14],[0,\" on a Task Group ensures that only one\\n  task in that Task Group can be running at any given time.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Cancelation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Additionally, just as you can \"],[11,\"code\",[]],[13],[0,\"cancelAll\"],[14],[0,\" running\\n  instances of a task, the Task Group object exposes the\\n  same \"],[11,\"code\",[]],[13],[0,\"cancelAll\"],[14],[0,\" method (and \"],[11,\"code\",[]],[13],[0,\"cancel-all\"],[14],[0,\"\\n  template helper) which will cancel any running task instances\\n  that belong to that group.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Nested Task Groups\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Task Groups can be \"],[11,\"strong\",[]],[13],[0,\".group()\"],[14],[0,\"ed to other\\n  Task Groups, forming a hierarchy with Tasks at the leaves.\\n  In such a hierarchy, all Tasks will share the concurrency\\n  constraints of the root task group\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Examples\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The following examples demonstrate nested task groups\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-groups.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-group-component.js\"]]],false],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"taskGroups\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"task-group-example\"],null,[[\"taskGroup\"],[[28,[\"group\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"group\"]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/examples/task-groups/template.hbs" } });
});
define("dummy/docs/faq/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "G70ay5PS", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"FAQ & Fact Sheet\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Why am I seeing TaskCancelation errors in my logs?\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nSee \"],[6,[\"link-to\"],[\"docs.task-cancelation-help\"],null,{\"statements\":[[0,\"this link\"]],\"locals\":[]},null],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Does ember-concurrency work with older browsers?\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Yes. The \"],[11,\"a\",[]],[15,\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*\"],[13],[0,\"ES6 Generator Function syntax\"],[14],[0,\"\\n  that ember-concurrency relies on is automatically transpiled using Babel\\n  and \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/facebook/regenerator\"],[13],[0,\"regenerator\"],[14],[0,\", so\\n  it'll work on all browsers supported by Ember.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"How do ember-concurrency Tasks compare to...\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Promises?\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Promises aren't cancelable, and as of 12/2016, there is no active TC39 specification\\n  under development for adding cancelation to promises.\\n  EC Tasks, in contrast, are cancelable.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The design of Promises is such that once a Promise has been created, it's not\\n  possible to externally reach in and resolve/reject a Promise. This constraint\\n  encourages a clear, unidirectional, structured architecture for building\\n  asynchronous chains of logic.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Like Promises, the return/reject value of an EC Task cannot be externally\\n  set / overridden; in other words, once a Task has been performed, there's\\n  no way to externally force it to return/reject early, with the exception of\\n  cancelation. When you \"],[11,\"code\",[]],[13],[0,\".cancel()\"],[14],[0,\" a task instance, the task\\n  will \\\"return\\\" from wherever it is currently paused (e.g. at a \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\").\\n  Presently, there is no API to \\\"delay\\\" the cancelation of a Task once a cancel\\n  has been requested, but this functionality might be added to future APIs.\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"docs.cancelation\"],null,{\"statements\":[[0,\"Docs: implicit vs explicit cancelation\"]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/machty/ember-concurrency/issues/98\"],[13],[0,\"\\n      API discussion: cancel tokens, non-preemptive APIs\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Observables?\"],[14],[0,\"\\n\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[11,\"strong\",[]],[13],[0,\"Cancelability\"],[14],[0,\"\\n    Both Observable subscriptions and Task instances are cancelable. Observables\\n    can be canceled implicitly when all subscribers have unsubscribed, or explicitly\\n    by calling \"],[11,\"code\",[]],[13],[0,\".dispose()\"],[14],[0,\" (though this approach is frowned up in favor\\n    of explicitly specifying when an observable should terminate -- e.g. via \"],[11,\"code\",[]],[13],[0,\"takeUntil()\"],[14],[0,\").\\n    \"],[6,[\"link-to\"],[\"docs.cancelation\"],null,{\"statements\":[[0,\"Tasks can be canceled\"]],\"locals\":[]},null],[0,\" implicitly (via 1. host object destruction, 2. the\\n    \"],[11,\"code\",[]],[13],[0,\".restartable()\"],[14],[0,\" task modifier) or explicitly (via \"],[11,\"code\",[]],[13],[0,\".cancel() / .cancelAll()\"],[14],[0,\"), though,\\n    like Observables, the implicit approach is preferable.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[11,\"strong\",[]],[13],[0,\"Multiple / Single Values\"],[14],[0,\"\\n    Observables can emit multiple values over time. Tasks don't really \\\"emit\\\" values,\\n    but can \"],[11,\"code\",[]],[13],[0,\".set()\"],[14],[0,\" values on the object the task lives on so that those\\n    values can be easily displayed in the template. Tasks also expose the value / error\\n    returned from the task function (see \"],[6,[\"link-to\"],[\"docs.derived-state\"],null,{\"statements\":[[0,\"Derived State\"]],\"locals\":[]},null],[0,\"),\\n    which are preferable to \"],[11,\"code\",[]],[13],[0,\".set()\"],[14],[0,\"s where possible.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[11,\"strong\",[]],[13],[0,\"Composability\"],[14],[0,\"\\n    The degree to which an abstraction \\\"composes\\\" depends highly on the problems\\n    it is trying to solve and the constraints therein. Observables as a low-level\\n    primitive aren't designed to solve specific problems but rather to be as flexible\\n    and composable as possible so that developers can build almost anything on top of\\n    them to model just about any domain logic under the sun. So, in a sense,\\n    Observables can be considered more composable (compositional?) than Tasks,\\n    which, by the time they exist, are bound to the lifetime of the Ember Object\\n    they live on, which constrains how and where Tasks can be used, but this tradeoff\\n    is deliberate and enables some of the patterns described below.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[11,\"strong\",[]],[13],[0,\"Marble Diagrams vs Block Diagrams\"],[14],[0,\"\\n    The behavior of Observables and their various combinators can be\\n    visualized by \"],[11,\"a\",[]],[15,\"href\",\"http://rxmarbles.com/\"],[13],[0,\"Marble Diagrams\"],[14],[0,\", where each\\n    marble represents a discrete event emitted. Tasks don't emit multiple values,\\n    and instead make a greater emphasis on the concept of task/object lifespans, hence\\n    are more easily visualized as\\n    \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"possibly overlapping blocks\"]],\"locals\":[]},null],[0,\" over time.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[11,\"strong\",[]],[13],[0,\"Readability\"],[14],[0,\"\\n    Warning: highly subjective. ember-concurrency tasks are designed to \\\"feel\\\" like\\n    an Ember-y API; among other design goals, it should be relatively easy for a\\n    newcomer to the code base come along and understand the flow and various steps\\n    taken from the start to the end of the task. It is the contention of @machty,\\n    who is biased but also well-versed in both observables and tasks,\\n    that understanding the flow of an ember-concurrency\\n    task is much \\\"easier\\\" than untangling a mess of Observable combinators for\\n    an observable that does the same amount of work and exposes the same amount\\n    of derived state as an ember-concurrency task (and @machty has written plenty\\n    of apps with Observables). This clarity is due to 1) the pausable/resumable nature\\n    of the generator function syntax that ember-concurrency tasks use,\\n    2) the fact that tasks expose a lot of commonplace derivable state that you'd\\n    otherwise have to split out / filter / merge yourself using observables\\n    (e.g. \"],[11,\"code\",[]],[13],[0,\".isIdle / .isRunning / .concurrency\"],[14],[0,\") and 3)\\n    it's often easier to model domain state as bindable values rather than\\n    discrete events.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/faq/template.hbs" } });
});
define('dummy/docs/index/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs.introduction');
    }
  });
});
define("dummy/docs/installation/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+jRKANBt", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Installation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Within your ember-cli project folder, run the following:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"ember-install.sh\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/installation/template.hbs" } });
});
define("dummy/docs/introduction/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aZzlcCw9", "block": "{\"statements\":[[11,\"p\",[]],[15,\"style\",\"font-size: 20px;\"],[13],[0,\"\\n  \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" is an Ember Addon that\\n  makes it easy to write concise, robust, and beautiful\\n  asynchronous code.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  It provides you with a powerful \"],[11,\"strong\",[]],[13],[0,\"Task\"],[14],[0,\" primitive,\\n  which offers the following benefits:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Tasks, unlike Promises, support cancelation.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Tasks expose their underlying state (whether they're running or idle)\\n    which makes it trivial to build loading indicators without\\n    having to manually track / mutate state yourself.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifiers\"]],\"locals\":[]},null],[0,\" make it trivial\\n    to prevent two executions of the same task from running at the same time, e.g.\\n    you can prevent double form submissions using the \"],[11,\"code\",[]],[13],[0,\".drop()\"],[14],[0,\" modifier,\\n    or you can configure a task to be \"],[11,\"code\",[]],[13],[0,\".restartable()\"],[14],[0,\" so that it starts over\\n    when you click a \\\"Restart\\\" button. Implementing this logic without tasks requires\\n    a lot of boilerplate code and defensive programming.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    Tasks that live on Components are automatically canceled when that\\n    Component is unrendered; no more \"],[11,\"code\",[]],[13],[0,\"if(this.isDestroyed)\"],[14],[0,\"\\n    checks to prevent timers or ajax responses causing\\n    \"],[11,\"code\",[]],[13],[0,\"\\\"set on destroyed object\\\"\"],[14],[0,\" errors.\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    ...and much more\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Additional Learning Resources\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  In addition to the comprehesive documentation on this site,\\n  you might find the following links useful for learning about\\n  ember-concurrency.\\n\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://www.youtube.com/watch?v=VEzVDOmY-dc\"],[13],[0,\"\\n      EmberConf 2017 presentation on ember-concurrency\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://embermap.com/topics/ember-concurrency\"],[13],[0,\"\\n      EmberMap's paid course on ember-concurrency\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://medium.com/@machty/ember-concurrency-the-solution-to-so-many-problems-you-never-knew-you-had-cce6d7731ba9#.e6r0iv44u\"],[13],[0,\"\\n      Article: ember-concurrency, the solution to so many problems you never knew you had\\n    \"],[14],[0,\".\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://player.vimeo.com/video/162329769\"],[13],[0,\"\\n      Global Ember Meetup presentation\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/introduction/template.hbs" } });
});
define("dummy/docs/task-cancelation-help/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lqmbimMA", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Why am I seeing TaskCancelation errors in my logs?\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nIf you're seeing \"],[11,\"code\",[]],[15,\"style\",\"color:red;\"],[13],[0,\"TaskCancelation\"],[14],[0,\" errors show\\nup in your error logs,\\nit means that somewhere in your code, a Task that you \"],[11,\"code\",[]],[13],[0,\".perform()\"],[14],[0,\"ed\\nis being cast to a Promise (either by calling\\n\"],[11,\"a\",[]],[15,\"href\",\"/api/TaskInstance.html#then\"],[13],[11,\"code\",[]],[13],[0,\".then()\"],[14],[14],[0,\" on\\nthe task instance, or \"],[11,\"code\",[]],[13],[0,\"await\"],[14],[0,\"ing the task instance in an\\nasync function),\\nand since Promises have no built-in support for\\ncancelation, the task cancelation is being treated as a\\npromise rejection, which needs to be explicitly caught and handled\\n(otherwise it'll show up in your logs as an unhandled Promise rejection).\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nHere is an example that demonstrates the issue:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-cancelation-example-1.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nIn this example, the \"],[11,\"code\",[]],[13],[0,\"fetchResults\"],[14],[0,\" action performs\\nthe \"],[11,\"code\",[]],[13],[0,\"queryServer\"],[14],[0,\" task and then immediately calls\\n\"],[11,\"a\",[]],[15,\"href\",\"/api/TaskInstance.html#then\"],[13],[11,\"code\",[]],[13],[0,\".then()\"],[14],[14],[0,\",\\nwhich internally generates a Promise that will reject if\\n\"],[11,\"code\",[]],[13],[0,\"queryServer\"],[14],[0,\" is canceled. If \"],[11,\"code\",[]],[13],[0,\"queryServer\"],[14],[0,\"\\nis canceled before it runs to completion, you'll see a\\n\"],[11,\"code\",[]],[15,\"style\",\"color:red;\"],[13],[0,\"TaskCancelation\"],[14],[0,\" error in the logs.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nOne approach to fixing this would be to add a \"],[11,\"code\",[]],[13],[0,\".catch()\"],[14],[0,\"\\nhandler and using ember-concurrency's \"],[11,\"code\",[]],[13],[0,\"didCancel()\"],[14],[0,\" helper\\nfunction to check if the error was a task cancelation, and ignore it\\nif so:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-cancelation-example-2.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nBut this is exactly the kind of cluttered, defensive programming\\nthat ember-concurrency was designed to avoid.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThe ideal solution here is to never call \"],[11,\"code\",[]],[13],[0,\".then()\"],[14],[0,\" on your\\nown task instances and instead try and find a way to express what\\nyou're doing using only the ember-concurrency Task API, which has\\nbuilt-in robust support for cancelation:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-cancelation-example-3.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nAnd in your templates, you'd replace any instance of\\n\"],[11,\"code\",[]],[13],[0,\"action \\\"fetchResults\\\"\"],[14],[0,\" with \"],[11,\"code\",[]],[13],[0,\"perform fetchResults\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nWhen structured this way, the potential for task cancelation stays\\nwithin ember-concurrency's domain, where cancelation is routine and\\nhandled gracefully.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nFor more information, see\\n\"],[6,[\"link-to\"],[\"docs.cancelation\"],null,{\"statements\":[[0,\"Cancelation\"]],\"locals\":[]},null],[0,\" and\\n\"],[6,[\"link-to\"],[\"docs.error-vs-cancelation\"],null,{\"statements\":[[0,\"Handling Errors\"]],\"locals\":[]},null],[0,\".\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-cancelation-help/template.hbs" } });
});
define('dummy/docs/task-concurrency-advanced/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marked = [SHARED_TASK_FN].map(regeneratorRuntime.mark);

  var Controller = Ember.Controller;


  function SHARED_TASK_FN(tracker) {
    return regeneratorRuntime.wrap(function SHARED_TASK_FN$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tracker.start();
            _context.prev = 1;
            _context.next = 4;
            return (0, _emberConcurrency.timeout)(1500);

          case 4:
            _context.prev = 4;

            tracker.end();
            return _context.finish(4);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[1,, 4, 7]]);
  }

  // BEGIN-SNIPPET shared-tasks-concurrent
  exports.default = Controller.extend({
    restartableTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).restartable(),
    enqueuedTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
    droppingTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).drop(),
    keepLatestTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).keepLatest()
  });
});
define("dummy/docs/task-concurrency-advanced/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "OX/pF5Us", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Using \"],[11,\"code\",[]],[13],[0,\".maxConcurrency(N)\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The examples on the previous page limit the concurrency of a task to 1 — only\\n  one instance of a task can run at a time. Most of the time, this\\n  is exactly what you want.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  There are some cases, however, when you might want to limit\\n  the number of concurrently running task instances to a number greater\\n  than 1.  In such cases, you can use the task modifier\\n  \"],[11,\"code\",[]],[13],[0,\".maxConcurrency(n)\"],[14],[0,\" to opt into a specific maximum\\n  concurrency other than 1.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The examples below use the same task modifiers as the ones on the previous\\n  page, but with \"],[11,\"code\",[]],[13],[0,\".maxConcurrency(3)\"],[14],[0,\" applied to them: they each\\n  allow 3 running instances before enqueuing, canceling, or dropping\\n  \"],[11,\"code\",[]],[13],[0,\"perform()\"],[14],[0,\"s.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"shared-tasks-concurrent.js\"]]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"restartable with .maxConcurrency(3)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  When concurrency exceeds maxConcurrency, the oldest running task is canceled.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"restartableTask3\"]]]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    TODO: while restartable is an excellent name when maxConcurrency\\n    is 1, it poorly describes the behavior for values greater than 1.\\n    A better name in this case might be .sliding(), as in sliding buffer.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"h4\",[]],[13],[0,\"enqueue with .maxConcurrency(3)\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"enqueuedTask3\"]]]]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"drop with .maxConcurrency(3)\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"droppingTask3\"]]]]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\".keepLatest() with .maxConcurrency(3)\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"keepLatestTask3\"]]]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    Thanks to \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/ef4\"],[13],[0,\"Edward Faulkner\"],[14],[0,\" for providing\\n    a starting point for the graphs :)\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-concurrency-advanced/template.hbs" } });
});
define('dummy/docs/task-concurrency/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marked = [SHARED_TASK_FN].map(regeneratorRuntime.mark);

  var Controller = Ember.Controller;


  function SHARED_TASK_FN(tracker) {
    return regeneratorRuntime.wrap(function SHARED_TASK_FN$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tracker.start();
            _context.prev = 1;
            _context.next = 4;
            return (0, _emberConcurrency.timeout)(1500);

          case 4:
            _context.prev = 4;

            tracker.end();
            return _context.finish(4);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[1,, 4, 7]]);
  }

  // BEGIN-SNIPPET shared-tasks
  exports.default = Controller.extend({
    defaultTask: (0, _emberConcurrency.task)(SHARED_TASK_FN),
    restartableTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).restartable(),
    enqueuedTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).enqueue(),
    droppingTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).drop(),
    keepLatestTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).keepLatest()
  });
});
define("dummy/docs/task-concurrency/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6YiL4KfI", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Managing Task Concurrency\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  By default, \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" tasks run concurrently\\n  — if you call \"],[11,\"code\",[]],[13],[0,\"myTask.perform(); myTask.perform();\"],[14],[0,\",\\n  two instances of the task will run at the same time (unless the object\\n  they live on is destroyed, in which case they'll be canceled).\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Often, you want to guarantee that no more than one instance of a task\\n  runs at the same time; for instance, if you have a task that saves\\n  model state to the server, you probably don't want that task to run\\n  concurrently — you want it to run sequentially, or you might\\n  want to ignore attempts to perform the task if it's already running.\\n  Manually enforcing these constraints is tricky and often results\\n  in redundant, error-prone boilerplate, but ember-concurrency\\n  makes it easy to rein in this undesired concurrency with the\\n  modifiers described below.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Examples\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  All of the examples below run the same task function (which\\n  just pauses for a moment and then completes), but with\\n  different task modifiers applied:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"shared-tasks.js\"]]],false],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Default Behavior: Tasks Run Concurrently\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Tap the \"],[11,\"code\",[]],[13],[0,\"task.perform()\"],[14],[0,\" button a few times. Note how\\n  the lifetimes of each task overlap, and each task runs to completion.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"defaultTask\"]]]]],false],[0,\"\\n\\n\\n\"],[11,\"h4\",[]],[13],[0,\"restartable\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The \"],[11,\"code\",[]],[13],[0,\"restartable\"],[14],[0,\" modifier ensures that only one instance\\n  of a task is running by canceling any currently-running tasks and starting\\n  a new task instance immediately. Note how there is no task overlap,\\n  and how currently running tasks get canceled\\n  if a new task starts before a prior one completes.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    Check out \"],[6,[\"link-to\"],[\"docs.examples.autocomplete\"],null,{\"statements\":[[0,\"Debounced Auto-Search\"]],\"locals\":[]},null],[0,\" for\\n    a practical example of restartable\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"restartableTask\"]]]]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"enqueue\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The \"],[11,\"code\",[]],[13],[0,\"enqueue\"],[14],[0,\" modifier ensures that only one instance\\n  of a task is running be maintaining a queue of pending tasks and\\n  running them sequentially. Note how there is no task overlap, but no\\n  tasks are canceled either.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"enqueuedTask\"]]]]],false],[0,\"\\n\\n\\n\"],[11,\"h4\",[]],[13],[0,\"drop\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The \"],[11,\"code\",[]],[13],[0,\"drop\"],[14],[0,\" modifier drops tasks that are \"],[11,\"code\",[]],[13],[0,\".perform\"],[14],[0,\"ed\\n  while another is already running. Dropped tasks' functions are never even called.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    Check out the \"],[6,[\"link-to\"],[\"docs.examples.loading-ui\"],null,{\"statements\":[[0,\"Loading UI\"]],\"locals\":[]},null],[0,\" example for a common\\n    use case for \"],[11,\"code\",[]],[13],[0,\"drop\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"droppingTask\"]]]]],false],[0,\"\\n\\n\\n\"],[11,\"h4\",[]],[13],[0,\".keepLatest()\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The \"],[11,\"code\",[]],[13],[0,\".keepLatest()\"],[14],[0,\" will drop all but the most recent intermediate \"],[11,\"code\",[]],[13],[0,\".perform()\"],[14],[0,\",\\n  which is enqueued to run later.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    Use case: you poll the server in a loop, but during the server request,\\n    you get some other indication (say, via websockets) that the data is stale\\n    and you need to query the server again when the initial request completed.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"keepLatestTask\"]]]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-concurrency/template.hbs" } });
});
define("dummy/docs/task-function-syntax/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WvYRaihf", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Task Function Syntax\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  When a task is performed, it runs the code in the task function\\n  you passed into \"],[11,\"code\",[]],[13],[0,\"task()\"],[14],[0,\". This function must\\n  be a \"],[11,\"a\",[]],[15,\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*\"],[13],[0,\"generator function\"],[14],[0,\"\\n  — it must use the \"],[11,\"code\",[]],[13],[0,\"function *\"],[14],[0,\" syntax, and cannot\\n  be just a regular JavaScript function.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This example demonstrates how, in ember-concurrency, generator\\n  functions behave \"],[11,\"em\",[]],[13],[0,\"just like regular functions\"],[14],[0,\". Anything you can\\n  do in a regular function, you can do in a generator function.\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"task-function-syntax-2\"]],false],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-2.js\"]]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Using the \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" keyword\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Much of the power of Tasks is unleashed once you start making\\n  use of the \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" keyword within generator functions.\\n  The \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" keyword, when used with a promise, lets you\\n  pause execution of your task function until that promise resolves, at\\n  which point the task function will continue running from where it\\n  had paused.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This example demonstrates how you can \"],[11,\"code\",[]],[13],[0,\"yield timeout(1000)\"],[14],[0,\"\\n  to pause execution for 1000 ms (one second). The \"],[11,\"code\",[]],[13],[0,\"timeout()\"],[14],[0,\"\\n  helper function, which \"],[11,\"strong\",[]],[13],[0,\"ember-concurrency\"],[14],[0,\" provides,\\n  simply returns a promise that resolves after the specified number of milliseconds.\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"task-function-syntax-1\"]],false],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-1.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  When you \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" a promise, the \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" expression\\n  evaluates to the resolved value of the promise. In other words, you can\\n  set a variable equal to a yielded promise, and when the promise resolves,\\n  the task function will resume and the value stored into that variable will\\n  be the resolved value of the promise.\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"task-function-syntax-3\"]],false],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-3.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  If you \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" a promise that rejects, the task function will\\n  throw the rejected value (likely an exception object) from the point in\\n  task function where the rejecting promise was yielded. This means you can\\n  use \"],[11,\"code\",[]],[13],[0,\"try {} catch(e) {} finally {}\"],[14],[0,\" blocks, just as you would\\n  for code that runs synchronously.\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"task-function-syntax-4\"]],false],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-function-syntax-4.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The behavior of yielding promises within task generator functions\\n  is designed to closely follow the behavior of the proposed\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/tc39/ecmascript-asyncawait\"],[13],[0,\"async/await\"],[14],[0,\"\\n  syntax, but instead of \"],[11,\"code\",[]],[13],[0,\"async function\"],[14],[0,\", you use\\n  \"],[11,\"code\",[]],[13],[0,\"function *\"],[14],[0,\", and instead of \"],[11,\"code\",[]],[13],[0,\"await\"],[14],[0,\", you\\n  use \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-function-syntax/template.hbs" } });
});
define('dummy/docs/task-groups/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marked = [taskFn].map(regeneratorRuntime.mark);

  var computed = Ember.computed;
  var Controller = Ember.Controller;


  function taskFn() {
    return regeneratorRuntime.wrap(function taskFn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _emberConcurrency.timeout)(1500);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  // BEGIN-SNIPPET task-groups
  exports.default = Controller.extend({
    chores: (0, _emberConcurrency.taskGroup)().drop(),

    mowLawn: (0, _emberConcurrency.task)(taskFn).group('chores'),
    doDishes: (0, _emberConcurrency.task)(taskFn).group('chores'),
    changeDiapers: (0, _emberConcurrency.task)(taskFn).group('chores'),

    tasks: computed(function () {
      return [this.get('mowLawn'), this.get('doDishes'), this.get('changeDiapers')];
    })
  });
});
define("dummy/docs/task-groups/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jpwV2EQ1", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Task Groups\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  While \"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifiers\"]],\"locals\":[]},null],[0,\"\\n  prevent a single task from running concurrently, \"],[11,\"strong\",[]],[13],[0,\"Task Groups\"],[14],[0,\"\\n  make it possible to prevent \"],[11,\"em\",[]],[13],[0,\"multiple tasks\"],[14],[0,\" from running at the same time.\\n  Using Task Groups is a two-step process:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"Define the task group property, e.g. \"],[11,\"code\",[]],[13],[0,\"nameOfGroup: taskGroup()\"],[14],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"For each task in the group, use \"],[11,\"code\",[]],[13],[0,\".group()\"],[14],[0,\" to associate\\n      the task with the group, e.g. \"],[11,\"code\",[]],[13],[0,\"myTask: task(...).group('nameOfGroup')\"],[14],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Once you define a task as part of a task group, you can no longer use\\n  other task modifiers like \"],[11,\"code\",[]],[13],[0,\"drop()\"],[14],[0,\" or \"],[11,\"code\",[]],[13],[0,\"restartable()\"],[14],[0,\"\\n  on that task; instead, just apply those task modifiers to the task group property instead,\\n  as demonstrated in the example below.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Example\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  In this example, we group related \\\"chores\\\" tasks and by using the \"],[11,\"code\",[]],[13],[0,\".drop()\"],[14],[0,\"\\n  modifier on the \"],[11,\"code\",[]],[13],[0,\"taskGroup\"],[14],[0,\" property we ensure that only one\\n  chore task runs at a time. In addition to preventing concurrency between multiple\\n  tasks, this example also demonstrates how having access to both the\\n  state of the task group, as well as its individual members,\\n  makes it very easy to build out common UI patterns, such as active/idle states\\n  of related buttons in a button bar.\\n\"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"tasks\"]]],null,{\"statements\":[[0,\"  \"],[11,\"button\",[]],[16,\"class\",[33,[\"if\"],[[28,[\"task\",\"isIdle\"]],\"clickable\"],null],null],[16,\"onclick\",[33,[\"perform\"],[[28,[\"task\"]]],null],null],[13],[1,[28,[\"task\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"task\"]},null],[0,\"\\n\"],[11,\"h5\",[]],[13],[0,\"Chores group state: \"],[1,[28,[\"chores\",\"state\"]],false],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"\\n  Most Recent Chore:\\n\"],[6,[\"with\"],[[28,[\"chores\",\"last\"]]],null,{\"statements\":[[0,\"    \"],[1,[28,[\"taskInstance\",\"task\",\"name\"]],false],[0,\" (\"],[1,[28,[\"taskInstance\",\"state\"]],false],[0,\")\\n\"]],\"locals\":[\"taskInstance\"]},null],[14],[0,\"\\n\"],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-groups.js\"]]],false],[0,\"\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"task-groups-template.hbs\"]]],false],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/task-groups/template.hbs" } });
});
define("dummy/docs/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dmrCn3KL", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"docs row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"three columns\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"side-menu\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"tableOfContents\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"entry\",\"section\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"toc-section-title\"],[13],[0,\"\\n              \"],[1,[28,[\"entry\",\"section\"]],false],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"toc-entry\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"entry\",\"route\"]]],null,{\"statements\":[[0,\"                \"],[6,[\"link-to\"],[[28,[\"entry\",\"route\"]]],null,{\"statements\":[[1,[28,[\"entry\",\"title\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[1,[28,[\"entry\",\"title\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[28,[\"entry\",\"children\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"entry\",\"children\"]]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"toc-entry toc-subentry\"],[13],[0,\"\\n                  \"],[6,[\"link-to\"],[[28,[\"child\",\"route\"]]],null,{\"statements\":[[1,[28,[\"child\",\"title\"]],false]],\"locals\":[]},null],[0,\"\\n                  \"],[14],[0,\"\\n\"]],\"locals\":[\"child\"]},null]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[\"entry\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"nine columns\"],[13],[0,\"\\n      \"],[1,[33,[\"nav-header\"],null,[[\"nextTopic\",\"prevTopic\"],[[28,[\"nextTopic\"]],[28,[\"prevTopic\"]]]]],false],[0,\"\\n      \"],[1,[26,[\"github-edit\"]],false],[0,\"\\n\\n      \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n      \"],[11,\"br\",[]],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\" \\n\\n      \"],[1,[33,[\"nav-header\"],null,[[\"nextTopic\",\"prevTopic\"],[[28,[\"nextTopic\"]],[28,[\"prevTopic\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/template.hbs" } });
});
define("dummy/docs/testing-debugging/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RoJztJf6", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Testing\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Ember doesn't yet have strong conventions for testing\\n  long-term timers and polling loops, and since many of the use cases\\n  that ember-concurrency addresses involves heavy use of \"],[11,\"code\",[]],[13],[0,\"timeout()\"],[14],[0,\",\\n  and often times within a (possibly infinite) loop, it can be difficult\\n  to figure out how to test code that makes heavy use of such things\\n  within ember-concurrency tasks.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"em\",[]],[13],[0,\"\\n    NOTE: this is an area of active development within the Ember community,\\n    particularly amongst ember-concurrency users; in due time we will probably\\n    have more official API (possibly in the form of another addon) to help\\n    make testing time more manageable, but in the meantime, this page documents\\n    some common approaches to testing time with present-day tooling.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"The Problem\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Consider the following (common) pattern for polling a server for changes:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"poll-loop.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The above example uses ember-concurrency tasks; to demonstrate that these\\n  issues aren't limited to ember-concurrency tasks, here is how the same\\n  logic might be written without ember-concurrency:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"poll-loop-classic.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Both of these cases involve a \\\"poll loop\\\": on every iteration, do something asynchronous,\\n  then pause for some period of time, then repeat.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  If, within an acceptance test, you \"],[11,\"code\",[]],[13],[0,\"visit()\"],[14],[0,\"ed the page that\\n  causes this loop to start, your acceptance test case would \\\"hang\\\" and eventually\\n  fail with a QUnit test timeout. The reason this happens is that the Ember testing\\n  tools are aware of all timers created via \"],[11,\"code\",[]],[13],[0,\"Ember.run.later\"],[14],[0,\" (and\\n  ember-concurrency's \"],[11,\"code\",[]],[13],[0,\"timeout()\"],[14],[0,\" helper internally uses \"],[11,\"code\",[]],[13],[0,\"Ember.run.later\"],[14],[0,\"),\\n  and will wait for all timers to \\\"settle\\\" before allowing the test to proceed.\\n  But if you have a timer within a loop, the timers will never settle, and hence\\n  your test will hang.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The solution, one way or another, is to \\\"break\\\" the timer loop when in a testing environment.\\n  Here are all the ways to do that, each with their own problems / tradeoffs:\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Insert \"],[11,\"code\",[]],[13],[0,\"Ember.testing\"],[14],[0,\" checks in your code\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"poll-loop-break-1.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This is sufficient when it's satisfactory to just test a single\\n  iteration of a loop, but a) it won't test that the task continues\\n  to loop, and b) it's unfortunate to have to riddle your actual\\n  code with testing logic.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Use \"],[11,\"code\",[]],[13],[0,\"Ember.run.cancelTimers\"],[14],[0,\" in your test case\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This is the approach used by the ember-concurrency\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/machty/ember-concurrency/blob/72f70b6c327f5242ca623d61ea0595b5f9093896/tests/helpers/start-app.js#L17-L19\"],[13],[0,\"documentation site tests\"],[14],[0,\";\\n  since any of the pages on this docs site might demonstrate a live\\n  ember-concurrency task with a timer loop, all of the acceptance tests\\n  automatically cancel all outstanding timers after 500ms to effectively\\n  stop all tasks wherever they're paused.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"No loops, but long timers\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  If you're testing code that just uses long timers, but not necessarily loops,\\n  you might still run into the problem of test cases that take too long to complete,\\n  or might hit the QUnit timeout. A common solution to this problem is to use much\\n  smaller millisecond timer values in a testing environment. You can either do this\\n  by checking \"],[11,\"code\",[]],[13],[0,\"Ember.testing\"],[14],[0,\" wherever you set a timer, or, more elegantly, you can\\n  define common timer values in a config file, import the timer values\\n  wherever you need to set a timer, and in test environments, the config\\n  file specifies much smaller values so that the timers elapse more quickly.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"The Future\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The above solutions leave much to be desired. Hopefully a definitive solution\\n  that produces clear, deterministic, consistent results will emerge from the\\n  community. There are some \"],[11,\"a\",[]],[15,\"href\",\"https://gist.github.com/machty/574457b1f2d993cc5959a1d6d6c74e5b\"],[13],[0,\"ideas\"],[14],[0,\"\\n  floating around, and if you're interested in contributing to the discussion\\n  please join the \"],[11,\"code\",[]],[13],[0,\"#e-concurrency\"],[14],[0,\" channel on the Ember Community Slack.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Also, if you're finding success with a testing approach that wasn't mentioned here,\\n  please open a GitHub issue with your ideas or open a Pull Request to add\\n  additional docs to \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/machty/ember-concurrency/blob/master/tests/dummy/app/docs/testing-debugging/template.hbs\"],[13],[0,\"this page\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Debugging\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"a\",[]],[15,\"href\",\"http://vanderwijk.info/blog/how-disable-es6-transpilation-emberjs-in-order-have-better-debugging-experience/\"],[13],[0,\"This article\"],[14],[0,\"\\n  provides some nice ideas as to how to improve the debugging experience within ember-concurrency:\\n  in particular, by blacklisting \\\"regenerator\\\" in your app's Babel configuration,\\n  you can avoid Ember transpiling your task generator functions into a somewhat\\n  unrecognizable format. Just keep in mind that you should probably only enable\\n  this configuration in a development environment, and that whatever browser\\n  you're testing on needs to have a spec-compliant implementation of generator\\n  functions (Chrome's implementation only became spec-compliant around June, 2016).\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Unexpected Cancelation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Sometimes it's not obvious why a Task was canceled; in these cases you\\n  can use the \"],[11,\"code\",[]],[13],[0,\".debug()\"],[14],[0,\" Task Modifier on a specific task e.g.\\n  \"],[11,\"code\",[]],[13],[0,\"nameOfTask: task(...).debug()\"],[14],[0,\",\\n  which will provide some logging about the task's lifecycle, e.g.\\n  \"],[11,\"code\",[]],[13],[0,\"TaskInstance 'nameOfTask' was canceled because the object it lives on was destroyed or unrendered \"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  To enable lifecycle logging on ALL ember-concurrency tasks, you can enable the \"],[11,\"code\",[]],[13],[0,\"DEBUG_TASKS\"],[14],[0,\"\\n  flag on \"],[11,\"code\",[]],[13],[0,\"EmberENV\"],[14],[0,\" in your project's \"],[11,\"code\",[]],[13],[0,\"config/environment.js\"],[14],[0,\" file.\\n\"],[14],[0,\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/testing-debugging/template.hbs" } });
});
define("dummy/docs/tutorial/discussion/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hMKNdxw0", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"A Quick Post-Mortem\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nIn the previous part of the tutorial, we built a component that\\nfetches and displays nearby retail stores. As you can see, it takes\\nquite a bit of code to cover all of the corner cases and build\\nsomething that is actually production-ready:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-6.js\",\"better-syntax-6.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-5\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThis is not the beautiful Ember code we all thought we'd be writing,\\nand unfortunately this kind of code is extremely commonplace.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Alternative: Move tricky code to an object with a long lifespan\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nComponents have limited lifespans: they're rendered, and then\\neventually they're unrendered and destroyed. Controllers, Services, Ember-Data\\nStores, and Routes, on the other hand, live forever (or at least until\\nthe app is torn down in a testing environment).\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nAs such, one approach\\nto avoiding \"],[11,\"code\",[]],[13],[0,\"\\\"set on destroyed object\\\"\"],[14],[0,\" errors is to move\\ntricky async logic into a method/action on a Controller or Service that\\nis invoked by a Component. Sometimes this works, but it's often the case\\nthat even though you no longer see exceptions in the console, you still need to\\nclean up / stop / cancel some operation on a long lived object in response\\nto a Component being destroyed. There are Component lifecycle hooks\\nlike \"],[11,\"code\",[]],[13],[0,\"willDestroyElement\"],[14],[0,\" that you can use for these kinds of things,\\nbut then you still end up with the same amount of code, but now it's smeared\\nbetween Component and Controller.\\n\"],[14],[0,\"\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/tutorial/discussion/template.hbs" } });
});
define("dummy/docs/tutorial/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XeC4azkW", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Introduction to ember-concurrency\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nTo demonstrate the kinds of problems ember-concurrency\\nis designed to solve, we'll first implement a basic example of\\nloading data in a Component using only core Ember APIs. Then\\nwe'll introduce ember-concurrency tasks as part of a refactor.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThis tutorial (and ember-concurrency itself) assumes that you have\\nreasonable familiarity with Ember's core APIs, particularly surrounding\\nComponents, templates, actions, and Promises.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nFor our use case, we're going to implement a Component that\\nfetches and displays nearby retail stores. This involves\\na two-step asynchronous process:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    It uses geolocation to find the user's latitude/longitude coordinates, and then:\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    It forwards those coordinates to the server to fetch a list of nearby restaurants.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[11,\"em\",[]],[13],[0,\"\\nThis is basically the same example demonstrated in the\\n\"],[11,\"a\",[]],[15,\"href\",\"https://youtu.be/VEzVDOmY-dc?t=123\"],[13],[0,\"EmberConf 2017 ember-concurrency talk\"],[14],[0,\";\\ntake a look if you prefer a video alternative to this tutorial.\\n\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 1: Bare Minimum Implementation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nWe'll start off a bare-bones implementation of the feature: within\\nan action called \"],[11,\"code\",[]],[13],[0,\"findStores\"],[14],[0,\", we'll create a Promise\\nchain that fetches the coordinates from a geolocation service\\nand passes those coordinates to a store's \"],[11,\"code\",[]],[13],[0,\"getNearbyStores\"],[14],[0,\"\\nmethod, which eventually gives us an array of stores that we stash\\non the \"],[11,\"code\",[]],[13],[0,\"result\"],[14],[0,\" property so that the stores can be displayed\\nin the template.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-1.js\",\"better-syntax-1.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-0\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThis first implementation \"],[11,\"em\",[]],[13],[0,\"works\"],[14],[0,\", but it's not really production-ready.\\nThe most immediate problem is that there's no loading UI; the user clicks\\nthe button and it seems like nothing is happening until the results come back.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 2: Add a Loading Spinner\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nWe'd like to display a loading spinner while the code is fetching nearby stores.\\nIn order to do this, we'll add an \"],[11,\"code\",[]],[13],[0,\"isFindingStores\"],[14],[0,\" property to the\\ncomponent that the template can use to display a spinner.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"em\",[]],[13],[0,\"\\n  We'll use \"],[11,\"code\",[]],[13],[0,\"++\"],[14],[0,\" comments to highlight newly added code.\\n\"],[14],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-2.js\",\"better-syntax-2.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-1\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThis is certainly an improvement, but strange things start to happen if you\\nclick the \\\"Find Nearby Stores\\\" button many times in a row.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThe problem is that we're kicking off multiple concurrent attempts to fetch\\nnearby locations, when really we just want only one fetch to be running\\nat any given time.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 3: Preventing Concurrency\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nWe'd like to prevent another fetch from happening if one is already in\\nprogress. To do this, just need to add a check to see if\\n\"],[11,\"code\",[]],[13],[0,\"isFindingStores\"],[14],[0,\" is true, and return early if so.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-3.js\",\"better-syntax-3.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-2\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nNow it is safe to tap the \\\"Find Nearby Stores\\\" button. Are we done?\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nUnfortunately, no. There's an important corner case we haven't addressed yet:\\nif the component is destroyed (because the user navigated\\nto a different page) while the fetch is running, our code\\nwill throw an Error with the message\\n\"],[11,\"code\",[]],[13],[0,\"\\\"calling set on destroyed object\\\"\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nYou can\\nactually verify that this happening by opening your browser's\\nweb inspector, clicking \\\"Find Nearby Stores\\\" from the example\\nabove, and then quickly clicking \"],[6,[\"link-to\"],[\"docs.introduction\"],null,{\"statements\":[[0,\"this link\"]],\"locals\":[]},null],[0,\"\\nbefore the store results have come back.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 4: Handling \\\"set on destroyed object\\\" errors\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThe problem is that it's possible for our promise callback (the\\none that sets \"],[11,\"code\",[]],[13],[0,\"result\"],[14],[0,\" and \"],[11,\"code\",[]],[13],[0,\"isFindingStores\"],[14],[0,\")\\nto run after the component has been destroyed, and Ember (and React\\nand many others) will complain if you try and, well, call \"],[11,\"code\",[]],[13],[0,\"set()\"],[14],[0,\"\\non a destroyed object.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nFortunately, Ember let's us check if an object has been destroyed\\nvia the \"],[11,\"code\",[]],[13],[0,\"isDestroyed\"],[14],[0,\" flag, so we can just add a bit of\\ndefensive programming to our promise callback as follows:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-4.js\",\"better-syntax-4.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-3\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nNow if you click \\\"Find Nearby Stores\\\" and\\n\"],[6,[\"link-to\"],[\"docs.introduction\"],null,{\"statements\":[[0,\"navigate elsewhere\"]],\"locals\":[]},null],[0,\", you won't see\\nthat pesky error.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nNow, are we done?\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 5: Handle Promise Rejection\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nYou might have noticed that we don't have any error handling if\\neither the \"],[11,\"code\",[]],[13],[0,\"getCoords\"],[14],[0,\" or \"],[11,\"code\",[]],[13],[0,\"getNearbyStores\"],[14],[0,\"\\npromises reject with an error.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nEven if we were too lazy to build\\nan error banner or popup to indicate that something went wrong (and we are),\\nthe least we could do is make sure that our code gracefully\\nrecovers from such an error and doesn't wind up in a bad state.\\nAs it stands, if one of those promises rejected,\\n\"],[11,\"code\",[]],[13],[0,\"isFindingStores\"],[14],[0,\" would be stuck to \"],[11,\"code\",[]],[13],[0,\"true\"],[14],[0,\", and\\nthere'd be no way to try fetching again.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nLet's use a \"],[11,\"code\",[]],[13],[0,\"finally()\"],[14],[0,\" handler to make sure that\\n\"],[11,\"code\",[]],[13],[0,\"isFindingStores\"],[14],[0,\" always gets set to \"],[11,\"code\",[]],[13],[0,\"false\"],[14],[0,\",\\nregardless of success or failure. Unfortunately, this also\\nmeans we have to duplicate our \"],[11,\"code\",[]],[13],[0,\"isDestroyed\"],[14],[0,\" check.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-5.js\",\"better-syntax-5.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-4\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nAnd there you have it: a reasonably-production ready implementation\\nof finding nearby stores.\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/tutorial/index/template.hbs" } });
});
define("dummy/docs/tutorial/refactor/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U9NcMiBS", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Refactoring With Tasks\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nNow we're going to build the same functionality using\\nember-concurrency tasks, starting with the same bare minimum\\nimplementation as before, and making incremental improvements.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nFor reference, here is the bare minimum implementation that we\\nstarted with before (which only uses core Ember APIs):\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-1.js\",\"better-syntax-1.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-0\"]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 1: Bare Minimum Implementation (with Tasks)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nNow let's build the same thing with ember-concurrency tasks:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-7.js\",\"better-syntax-7.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-6\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nLet's take a moment to point out everything that has changed:\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  First, instead of using a \"],[11,\"code\",[]],[13],[0,\"findStores\"],[14],[0,\" \"],[11,\"em\",[]],[13],[0,\"action\"],[14],[0,\",\\n  we define a \"],[11,\"code\",[]],[13],[0,\"findStores\"],[14],[0,\" \"],[11,\"em\",[]],[13],[0,\"task\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Second, in the template, instead of using \"],[11,\"code\",[]],[13],[0,\"onclick=\"],[0,\"{{action 'findStores'}}\"],[14],[0,\",\\n  we use \"],[11,\"code\",[]],[13],[0,\"onclick=\"],[0,\"{{perform findStores}}\"],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Lastly, instead of using a Promise chain of \"],[11,\"code\",[]],[13],[0,\".then()\"],[14],[0,\" callbacks,\\n  we use the\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*\"],[13],[0,\"Generator Function Syntax\"],[14],[0,\"\\n  and the \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" keyword.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[6,[\"link-to\"],[\"docs.task-function-syntax\"],null,{\"statements\":[[0,\"We'll get into much greater detail\"]],\"locals\":[]},null],[0,\"\\n  about how this syntax is used, but for now, the most important thing to understand\\n  is that when you \"],[11,\"code\",[]],[13],[0,\"yield\"],[14],[0,\" a promise, the task will pause until that promise fulfills,\\n  and then continue executing with the resolved value of that promise.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Let's press onward with the refactor:\"],[14],[0,\"\\n\\n\"],[11,\"h5\",[]],[13],[0,\"Version 2: Add a Loading Spinner (with Tasks)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nRather than defining a separate boolean flag and manually tracking\\nthe state of the task, we can use the \"],[11,\"code\",[]],[13],[0,\"isRunning\"],[14],[0,\" property\\nexposed by the task to drive our loading spinner, which means we only\\nneed to make a change to the template code; the JavaScript can stay the same:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\",\"showCode\"],[\"better-syntax-8.js\",\"better-syntax-8.hbs\",false]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-7\"]],false],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 3: Preventing Concurrency (with Tasks)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nSo far so good, but we still haven't addressed the issue that clicking\\nthe button multiple times causes weird behavior due to multiple\\nfetch operations running at the same time.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nRather than putting an \"],[11,\"code\",[]],[13],[0,\"if\"],[14],[0,\" guard at the start of the task,\\nthe ember-concurrency way to prevent concurrency is to apply a\\n\"],[6,[\"link-to\"],[\"docs.task-concurrency\"],null,{\"statements\":[[0,\"Task Modifier\"]],\"locals\":[]},null],[0,\" to the task.\\nThe one we want to use is the \"],[11,\"code\",[]],[13],[0,\".drop()\"],[14],[0,\" modifier, which prevents\\nconcurrency by \\\"dropping\\\" any attempt to perform the task while it is\\nalready running.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\"],[\"better-syntax-9.js\",\"better-syntax-9.hbs\"]]],false],[0,\"\\n\"],[1,[26,[\"tutorial-8\"]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nNow when you button mash \\\"Find Nearby Stores\\\", you no longer get the weird\\nbehavior due to concurrent fetches.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 4: Handling \\\"set on destroyed object\\\" errors (with Tasks)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nWhat about those pesky \"],[11,\"code\",[]],[13],[0,\"\\\"set on destroyed object\\\"\"],[14],[0,\" errors?\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nGood news! Our code is already safe because ember-concurrency automatically\\ncancels tasks when their host object (e.g. a Component) is destroyed.\\nIn our example, if the \"],[11,\"code\",[]],[13],[0,\"findStores\"],[14],[0,\" task is paused\\nat the unresolved \"],[11,\"code\",[]],[13],[0,\"getNearbyStores\"],[14],[0,\" promise right when the user navigates\\naway, the component will be destroyed and the \"],[11,\"code\",[]],[13],[0,\"findStores\"],[14],[0,\" task will\\nstop right where it is and will never hit the line of code with the \"],[11,\"code\",[]],[13],[0,\"this.set()\"],[14],[0,\",\\nthus avoiding the \"],[11,\"code\",[]],[13],[0,\"\\\"set on destroyed object\\\"\"],[14],[0,\" error.\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThe ability to cancel a task in mid-execution is one of ember-concurrency's\\nmost powerful features, and it is the generator function syntax that\\nmakes cancelation possible.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Version 5: Handle Promise Rejection (with Tasks)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nWill a promise rejection put our task into an unrecoverable state?\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nIt turns out that, again, we don't need to change any code; if either\\n\"],[11,\"code\",[]],[13],[0,\"getCoords\"],[14],[0,\" or \"],[11,\"code\",[]],[13],[0,\"getNearbyStores\"],[14],[0,\" returned a rejecting promise,\\nthe \"],[11,\"code\",[]],[13],[0,\"findStores\"],[14],[0,\" task would stop execution where the error occurred, bubble\\nthe exception to the console (so that error reporters can catch it), but from there on\\nthe task can be immediately performed / retried again. So, we don't need to change any code.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Final Diff\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nJavaScript:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\",\"toggleDescription\"],[\"better-syntax-10.js\",\"better-syntax-6.js\",\"diff\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\nTemplate:\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-template-toggle\"],null,[[\"codeSnippet\",\"templateSnippet\",\"toggleDescription\"],[\"better-syntax-10.hbs\",\"better-syntax-6.hbs\",\"diff\"]]],false],[0,\"\\n\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[11,\"h3\",[]],[13],[0,\"Conclusion\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\nThis was a very successful refactor. We were able to remove a lot\\nof ugly boilerplate and defensive programming code, and what we're left\\nwith is very clean, concise, safe, and stress-free code.\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/tutorial/refactor/template.hbs" } });
});
define("dummy/docs/writing-tasks/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ievEhMAh", "block": "{\"statements\":[[11,\"h3\",[]],[13],[0,\"Writing Your First Task\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Step 1: Deciding where the Task will live\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Should you define a task on a Component? Or perhaps a Service?\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  This choice is important because \"],[11,\"strong\",[]],[13],[0,\"Tasks get automatically canceled\\n  when the object they live on is destroyed\"],[14],[0,\".\\n  So if you want the task to cancel when a component is unrendered, define\\n  it on a Component class, but if you need it to outlive a component's lifespan,\\n  it probably belongs on a Service or Controller.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Step 2: Implementing the task\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Once you've decided where you want a task to live, you can start implementing\\n  your task.\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"writing-tasks.js\"]]],false],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The next section on \"],[6,[\"link-to\"],[\"docs.task-function-syntax\"],null,{\"statements\":[[0,\"Task Function Syntax\"]],\"locals\":[]},null],[0,\" goes\\n  into greater detail about the generator function syntax and how you can use it\\n  to write tasks.\\n\"],[14],[0,\"\\n\\n\"],[11,\"h4\",[]],[13],[0,\"Step 3: Performing the task\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Now that you've implemented your Task, you'll need some way to actually\\n  perform it. You have three options:\\n\"],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    In JavaScript, get a reference to the task and call \"],[11,\"code\",[]],[13],[0,\"task.perform(...)\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    In your Handlebars template, use the \"],[11,\"code\",[]],[13],[0,\"perform\"],[14],[0,\" helper\\n    (e.g. \"],[11,\"code\",[]],[13],[0,\"(perform myTask)\"],[14],[0,\").\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"\\n    In JavaScript, specify the Ember Events that should cause the task to\\n    run using \"],[11,\"code\",[]],[13],[0,\"task(...).on(eventName)\"],[14],[0,\". You can use \"],[11,\"code\",[]],[13],[0,\".on('init')\"],[14],[0,\"\\n    to create a task the runs as soon as the object it lives on is initialized.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  The following example demonstrates all three variants:\\n\"],[14],[0,\"\\n\\n\"],[11,\"h3\",[]],[13],[0,\"Live Example\"],[14],[0,\"\\n\\n\"],[1,[26,[\"start-task-example\"]],false],[0,\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/docs/writing-tasks/template.hbs" } });
});
define('dummy/event_dispatcher', ['exports', 'ember-native-dom-event-dispatcher'], function (exports, _emberNativeDomEventDispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberNativeDomEventDispatcher.default;
    }
  });
});
define('dummy/experimental-prediction/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marked = [SHARED_TASK_FN].map(regeneratorRuntime.mark);

  var computed = Ember.computed;
  var Controller = Ember.Controller;


  function SHARED_TASK_FN(tracker) {
    return regeneratorRuntime.wrap(function SHARED_TASK_FN$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tracker.start();
            _context.prev = 1;
            _context.next = 4;
            return (0, _emberConcurrency.timeout)(1500);

          case 4:
            _context.prev = 4;

            tracker.end();
            return _context.finish(4);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[1,, 4, 7]]);
  }

  exports.default = Controller.extend({
    defaultTask: (0, _emberConcurrency.task)(SHARED_TASK_FN),
    restartableTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).restartable(),
    enqueuedTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).enqueue(),
    droppingTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).drop(),
    restartableTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).restartable(),
    enqueuedTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
    droppingTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).drop(),

    tasks: computed(function () {
      return [this.get('defaultTask'), this.get('restartableTask'), this.get('enqueuedTask'), this.get('droppingTask'), this.get('restartableTask3'), this.get('enqueuedTask3'), this.get('droppingTask3')];
    })
  });
});
define("dummy/experimental-prediction/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Gm8NEcO1", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[0,\"Experimental: all derivable state about a task\"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Because the \\\"buffering policy\\\" for a task is declaratively\\n    specified up front (via task modifiers like drop, enqueue),\\n    someone who wants to .perform a task can know up front whether\\n    perform()ing that task right now would 1) immediately execute\\n    the task instance, 2) immediately cancel (drop) the task\\n    instance, or 3) enqueue the task instance for later execution.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    This experiment is part of my attempt to squeeze out the maximal\\n    amount of derivable state from the declarative ember-concurrency\\n    API. Once we have all the derivable state we can coalesce\\n    into more reasonable APIs/patterns to expose to the user.\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"tasks\"]]],null,{\"statements\":[[0,\"    \"],[11,\"h4\",[]],[13],[1,[28,[\"task\",\"name\"]],false],[0,\", maxConcurrency=\"],[1,[28,[\"task\",\"_maxConcurrency\"]],false],[14],[0,\"\\n    \"],[11,\"ul\",[]],[13],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"isRunning: \"],[1,[33,[\"caps-bool\"],[[28,[\"task\",\"isRunning\"]]],null],false],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"concurrency: \"],[1,[28,[\"task\",\"concurrency\"]],false],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"nextPerformState: \"],[1,[28,[\"task\",\"nextPerformState\"]],false],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"performWillSucceed: \"],[1,[33,[\"caps-bool\"],[[28,[\"task\",\"performWillSucceed\"]]],null],false],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"performWillDrop: \"],[1,[33,[\"caps-bool\"],[[28,[\"task\",\"performWillDrop\"]]],null],false],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"performWillEnqueue: \"],[1,[33,[\"caps-bool\"],[[28,[\"task\",\"performWillEnqueue\"]]],null],false],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"performWillCancelPrevious: \"],[1,[33,[\"caps-bool\"],[[28,[\"task\",\"performWillCancelPrevious\"]]],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"concurrency-graph\"],null,[[\"task\"],[[28,[\"task\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"task\"]},null],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/experimental-prediction/template.hbs" } });
});
define('dummy/helpers-test/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var defer = Ember.RSVP.defer;
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    status: null,
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      var _len,
          args,
          _key,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              for (_len = _args.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              this.set('status', args.join('-'));
              _context.next = 5;
              return defer().promise;

            case 5:
              _context.prev = 5;

              this.set('status', 'canceled');
              return _context.finish(5);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0,, 5, 8]]);
    })),

    valueTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee2(value) {
      var expected;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              expected = "Set value option";

              if (!(value !== expected)) {
                _context2.next = 3;
                break;
              }

              throw new Error('value !== ' + expected);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })),

    returnValue: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', 10);

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })),

    maybeNullTask: null,
    someTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.set('status', 'someTask');

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })),

    actions: {
      setupTask: function setupTask() {
        this.set('maybeNullTask', this.get('someTask'));
      }
    }
  });
});
define("dummy/helpers-test/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1pvgPtAE", "block": "{\"statements\":[[11,\"h1\",[]],[13],[0,\"Helpers Test\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[15,\"class\",\"task-status\"],[13],[1,[26,[\"status\"]],false],[14],[0,\"\\n\\n\"],[6,[\"my-button\"],null,[[\"action\",\"class\"],[[33,[\"perform\"],[[28,[\"myTask\"]],1,2],null],\"perform-task\"]],{\"statements\":[[0,\"Perform\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"my-button\"],null,[[\"action\",\"class\"],[[33,[\"cancel-all\"],[[28,[\"myTask\"]],1,2],null],\"cancel-task\"]],{\"statements\":[[0,\"Cancel\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"my-button\"],null,[[\"action\",\"class\"],[[33,[\"perform\"],[[28,[\"returnValue\"]]],null],\"value-task\"]],{\"statements\":[[0,\"Return a Value\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"maybeNullTask\"]]],null],null],[15,\"class\",\"maybe-null-task\"],[13],[0,\"Maybe Null Task\"],[14],[0,\"\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"setupTask\"],null],null],[15,\"class\",\"setup-task\"],[13],[0,\"Setup Task\"],[14],[0,\"\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"valueTask\"]]],[[\"value\"],[\"target.innerHTML\"]]],null],[15,\"class\",\"set-value-option-task\"],[13],[0,\"Set value option\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/helpers-test/template.hbs" } });
});
define('dummy/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cancelHelper = cancelHelper;


  var CANCEL_REASON = "the 'cancel-all' template helper was invoked";

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember.default.assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _helpers.taskHelperClosure)('cancelAll', [cancelable, CANCEL_REASON]);
  }

  exports.default = _ember.default.Helper.helper(cancelHelper);
});
define("dummy/helpers/caps-bool", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.capsBool = capsBool;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function capsBool(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 1),
        bool = _ref2[0];

    return bool ? "YES" : "no";
  }

  exports.default = helper(capsBool);
});
define('dummy/helpers/color', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.colorString = colorString;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  var htmlSafe = Ember.String.htmlSafe;
  function colorString(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 1),
        color = _ref2[0];

    return new htmlSafe('color: ' + color + ';');
  }

  exports.default = helper(colorString);
});
define('dummy/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.performHelper = performHelper;
  function performHelper(args, hash) {
    return (0, _helpers.taskHelperClosure)('perform', args, hash);
  }

  exports.default = _ember.default.Helper.helper(performHelper);
});
define('dummy/helpers/pick-from', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pickFrom = pickFrom;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function pickFrom(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 2),
        list = _ref2[0],
        index = _ref2[1];

    return list[index % list.length];
  }

  exports.default = helper(pickFrom);
});
define('dummy/helpers/progress-style', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.progressStyleHelper = progressStyleHelper;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  var htmlSafe = Ember.String.htmlSafe;
  function progressStyleHelper(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 3),
        percent = _ref2[0],
        id = _ref2[1],
        colors = _ref2[2];

    var color = colors[id % colors.length];
    return new htmlSafe('width: ' + percent + '%; background-color: ' + color + ';');
  }

  exports.default = helper(progressStyleHelper);
});
define('dummy/helpers/scale', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.scale = scale;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function scale(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 3),
        value = _ref2[0],
        lowLimit = _ref2[1],
        highLimit = _ref2[2];

    var v = 100 * value / (highLimit + 1000 - lowLimit);

    // the 0.001 gets around the annoying fact that {{with falsy}}
    // behaves like {{if falsy}} :(
    return v + 0.001;
  }

  exports.default = helper(scale);
});
define('dummy/helpers/subtract', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.subtract = subtract;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function subtract(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return a - b;
  }

  exports.default = helper(subtract);
});
define('dummy/helpers/sum', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sum = sum;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function sum(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return a + b;
  }

  exports.default = helper(sum);
});
define('dummy/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref),
        task = _ref2[0],
        args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports.default = _ember.default.Helper.helper(taskHelper);
});
define('dummy/helpers/width', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.computeWidth = computeWidth;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function computeWidth(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 3),
        start = _ref2[0],
        end = _ref2[1],
        upper = _ref2[2];

    return end === Infinity ? upper - start : end - start;
  }

  exports.default = helper(computeWidth);
});
define('dummy/index/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    redirect: function redirect() {
      this.transitionTo('docs');
    }
  });
});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(_environment.default.APP.name, _environment.default.APP.version)
  };
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/ember-cli-fastclick', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var schedule = _ember.default.run.schedule;


  var EmberCliFastclickInitializer = {
    name: 'fastclick',

    initialize: function initialize() {
      schedule('afterRender', function () {
        FastClick.attach(document.body);
      });
    }
  };

  exports.default = EmberCliFastclickInitializer;
});
define('dummy/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend({
    location: _environment.default.locationType
  });

  Router.map(function () {
    this.route('docs', function () {
      this.route('introduction');
      this.route('installation');
      this.route('writing-tasks');

      this.route('tutorial', function () {
        this.route('discussion');
        this.route('refactor');
      });

      this.route('task-function-syntax');
      this.route('task-concurrency');
      this.route('task-concurrency-advanced');
      this.route('cancelation');
      this.route('error-vs-cancelation');
      this.route('child-tasks');
      this.route('task-groups');
      this.route('derived-state');
      this.route('events');
      this.route('testing-debugging');
      this.route('faq');
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
        this.route('task-groups');
        this.route('encapsulated-task');
        this.route('encapsulated-task-fun');
      });
      this.route('task-cancelation-help');
      this.route('404', { path: '*path' });
    });
    this.route('experimental-prediction');
    this.route('helpers-test');
    this.route('deprecation-test');
    this.route('testing-ergo', function () {
      this.route('foo');
      this.route('foo-settimeout');
      this.route('slow');
      this.route('timer-loop');
    });
    this.route('task-injection-test');
  });

  exports.default = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('dummy/services/fun', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Service = Ember.Service;
  exports.default = Service.extend({
    foo: 123
  });
});
define('dummy/services/notify', ['exports', 'ember-notify'], function (exports, _emberNotify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberNotify.default;
});
define("dummy/snippets", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "ajax-throttling.js": "function loopingAjaxTask(id, color) {\n  return task(function * () {\n    while (true) {\n      this.log(color, `Task ${id}: making AJAX request`);\n      yield this.get('ajaxTask').perform();\n      this.log(color, `Task ${id}: Done, sleeping.`);\n      yield timeout(2000);\n    }\n  }).on('init');\n}\n\nexport default Component.extend({\n  ajaxTask: task(function * () {\n    // simulate slow AJAX\n    yield timeout(2000 + 2000 * Math.random());\n    return {};\n  }).enqueue().maxConcurrency(3),\n\n  task0: loopingAjaxTask(0, '#0000FF'),\n  task1: loopingAjaxTask(1, '#8A2BE2'),\n  task2: loopingAjaxTask(2, '#A52A2A'),\n  task3: loopingAjaxTask(3, '#DC143C'),\n  task4: loopingAjaxTask(4, '#20B2AA'),\n  task5: loopingAjaxTask(5, '#FF1493'),\n  task6: loopingAjaxTask(6, '#228B22'),\n  task7: loopingAjaxTask(7, '#DAA520'),\n\n  log(color, message) {\n    let logs = this.logs || [];\n    logs.push({ color, message });\n    this.set('logs', logs.slice(-7));\n  },\n\n  logs: null,\n});",
    "ask-button.hbs": "  <button class={{if askQuestion.isIdle 'button-primary'}}\n    onclick={{perform askQuestion}}>\n        {{#if askQuestion.isIdle}}\n          Ask\n        {{else}}\n          Thinking...\n          {{fa-icon \"spinner\" spin=true}}\n        {{/if}}\n  </button>",
    "better-syntax-1.hbs": "  <button onclick={{action 'findStores'}}>\n    Find Nearby Stores\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-1.js": "export default TutorialComponent.extend({\n  result: null,\n  actions: {\n    findStores() {\n      let geolocation = this.get('geolocation');\n      let store = this.get('store');\n\n      geolocation.getCoords()\n        .then(coords => store.getNearbyStores(coords))\n        .then(result => {\n          this.set('result', result);\n        });\n    }\n  },\n});",
    "better-syntax-10.hbs": "  <button onclick={{perform findStores}}>\n    Find Nearby Stores\n    {{#if findStores.isRunning}}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-10.js": "export default TutorialComponent.extend({\n  result: null,\n  findStores: task(function * () {\n    let geolocation = this.get('geolocation');\n    let store = this.get('store');\n\n    let coords = yield geolocation.getCoords();\n    let result = yield store.getNearbyStores(coords);\n    this.set('result', result);\n  }).drop(),\n});",
    "better-syntax-2.hbs": "  <button onclick={{action 'findStores'}}>\n    Find Nearby Stores\n    {{#if isFindingStores}}\n      {{! ++ }}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-2.js": "export default TutorialComponent.extend({\n  result: null,\n  isFindingStores: false, // ++\n  actions: {\n    findStores() {\n      let geolocation = this.get('geolocation');\n      let store = this.get('store');\n\n      this.set('isFindingStores', true); // ++\n      geolocation.getCoords()\n        .then(coords => store.getNearbyStores(coords))\n        .then(result => {\n          this.set('result', result);\n          this.set('isFindingStores', false); // ++\n        });\n    }\n  },\n});",
    "better-syntax-3.hbs": "  <button onclick={{action 'findStores'}}>\n    Find Nearby Stores\n    {{#if isFindingStores}}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-3.js": "export default TutorialComponent.extend({\n  result: null,\n  isFindingStores: false,\n  actions: {\n    findStores() {\n      if (this.isFindingStores) { return; } // ++\n\n      let geolocation = this.get('geolocation');\n      let store = this.get('store');\n\n      this.set('isFindingStores', true);\n      geolocation.getCoords()\n        .then(coords => store.getNearbyStores(coords))\n        .then(result => {\n          this.set('result', result);\n          this.set('isFindingStores', false);\n        });\n    }\n  },\n});",
    "better-syntax-4.hbs": "  <button onclick={{action 'findStores'}}>\n    Find Nearby Stores\n    {{#if isFindingStores}}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-4.js": "export default TutorialComponent.extend({\n  result: null,\n  isFindingStores: false,\n  actions: {\n    findStores() {\n      if (this.isFindingStores) { return; }\n\n      let geolocation = this.get('geolocation');\n      let store = this.get('store');\n\n      this.set('isFindingStores', true);\n      geolocation.getCoords()\n        .then(coords => store.getNearbyStores(coords))\n        .then(result => {\n          if (this.isDestroyed) { return; } // ++\n          this.set('result', result);\n          this.set('isFindingStores', false);\n        });\n    }\n  },\n});",
    "better-syntax-5.hbs": "  <button onclick={{action 'findStores'}}>\n    Find Nearby Stores\n    {{#if isFindingStores}}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-5.js": "export default TutorialComponent.extend({\n  result: null,\n  isFindingStores: false,\n  actions: {\n    findStores() {\n      if (this.isFindingStores) { return; }\n\n      let geolocation = this.get('geolocation');\n      let store = this.get('store');\n\n      this.set('isFindingStores', true);\n      geolocation.getCoords()\n        .then(coords => store.getNearbyStores(coords))\n        .then(result => {\n          if (this.isDestroyed) { return; }\n          this.set('result', result);\n        })\n        .finally(() => {                      // ++\n          if (this.isDestroyed) { return; }   // ++\n          this.set('isFindingStores', false); // ++\n        });\n    }\n  },\n});",
    "better-syntax-6.hbs": "  <button onclick={{action 'findStores'}}>\n    Find Nearby Stores\n    {{#if isFindingStores}}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-6.js": "export default TutorialComponent.extend({\n  result: null,\n  isFindingStores: false,\n  actions: {\n    findStores() {\n      if (this.isFindingStores) { return; }\n\n      let geolocation = this.get('geolocation');\n      let store = this.get('store');\n\n      this.set('isFindingStores', true);\n      geolocation.getCoords()\n        .then(coords => store.getNearbyStores(coords))\n        .then(result => {\n          if (this.isDestroyed) { return; }\n          this.set('result', result);\n        })\n        .finally(() => {\n          if (this.isDestroyed) { return; }\n          this.set('isFindingStores', false);\n        });\n    }\n  },\n});",
    "better-syntax-7.hbs": "  <button onclick={{perform findStores}}> {{! ++ }}\n    Find Nearby Stores\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-7.js": "import { task } from 'ember-concurrency';\n\nexport default TutorialComponent.extend({\n  result: null,\n\n  findStores: task(function * () {\n    let geolocation = this.get('geolocation');\n    let store = this.get('store');\n\n    let coords = yield geolocation.getCoords();\n    let result = yield store.getNearbyStores(coords);\n    this.set('result', result);\n  }),\n});",
    "better-syntax-8.hbs": "  <button onclick={{perform findStores}}>\n    Find Nearby Stores\n    {{#if findStores.isRunning}}\n      {{! ++ }}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-8.js": "import { task } from 'ember-concurrency';\n\nexport default TutorialComponent.extend({\n  result: null,\n\n  findStores: task(function * () {\n    let geolocation = this.get('geolocation');\n    let store = this.get('store');\n\n    let coords = yield geolocation.getCoords();\n    let result = yield store.getNearbyStores(coords);\n    this.set('result', result);\n  }),\n});",
    "better-syntax-9.hbs": "  <button onclick={{perform findStores}}>\n    Find Nearby Stores\n    {{#if findStores.isRunning}}\n      {{fa-icon \"spinner\" spin=true}}\n    {{/if}}\n  </button>\n\n  {{#if result}}\n    {{#each result.stores as |s|}}\n      <li>\n        <strong>{{s.name}}</strong>:\n        {{s.distance}} miles away\n      </li>\n    {{/each}}\n  {{/if}}",
    "better-syntax-9.js": "import { task } from 'ember-concurrency';\n\nexport default TutorialComponent.extend({\n  result: null,\n\n  findStores: task(function * () {\n    let geolocation = this.get('geolocation');\n    let store = this.get('store');\n\n    let coords = yield geolocation.getCoords();\n    let result = yield store.getNearbyStores(coords);\n    this.set('result', result);\n  }).drop(), // ++\n});",
    "cancelation-template.hbs": "<h5>Running tasks: {{count}}</h5>\n\n<button {{action 'performTask'}}>Perform Task</button>\n{{#if count}}\n  <button {{action 'cancelAll'}}>Cancel All</button>\n{{/if}}\n{{#if mostRecent.isRunning}}\n  <button {{action 'cancelMostRecent'}}>Cancel Most Recent</button>\n{{/if}}",
    "cancelation.js": "const WAIT_HERE_FOREVER = defer().promise;\nexport default Controller.extend({\n  count: 0,\n  mostRecent: null,\n\n  myTask: task(function * () {\n    try {\n      this.incrementProperty('count');\n      yield WAIT_HERE_FOREVER;\n    } finally {\n      // finally blocks always get called,\n      // even when the task is being canceled\n      this.decrementProperty('count');\n    }\n  }),\n\n  actions: {\n    performTask() {\n      let task = this.get('myTask');\n      let taskInstance = task.perform();\n      this.set('mostRecent', taskInstance);\n    },\n\n    cancelAll() {\n      this.get('myTask').cancelAll();\n    },\n\n    cancelMostRecent() {\n      this.get('mostRecent').cancel();\n    },\n  }\n});",
    "caps-marquee.js": "  marqueeLoop: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      this.set('formattedText', text);\n      yield timeout(1500);\n      for (let i = 0; i < text.length; ++i) {\n        this.set('formattedText', capitalizeAt(text, i));\n        yield timeout(50);\n      }\n    }\n  }).on('init'),",
    "child-tasks-template.hbs": "<h5>{{status}}</h5>\n\n<ul>\n  <li>Parent Task:     {{parentTask.state}}</li>\n  <li>Child Task:      {{childTask.state}}</li>\n  <li>Grandchild Task: {{grandchildTask.state}}</li>\n</ul>\n\n<button onclick={{perform parentTask}}>\n  {{#if parentTask.isRunning}}\n    Restart Parent Task\n  {{else}}\n    Perform Parent Task\n  {{/if}}\n</button>",
    "child-tasks.js": "export default Controller.extend({\n  status: \"Waiting to start\",\n\n  parentTask: task(function * () {\n    this.set('status', \"1. Parent: one moment...\");\n    yield timeout(1000);\n    let value = yield this.get('childTask').perform();\n    this.set('status', `5. Parent: child says \"${value}\"`);\n    yield timeout(1000);\n    this.set('status', \"6. Done!\");\n  }).restartable(),\n\n  childTask: task(function * () {\n    this.set('status', \"2. Child: one moment...\");\n    yield timeout(1000);\n    let value = yield this.get('grandchildTask').perform();\n    this.set('status', `4. Child: grandchild says \"${value}\"`);\n    yield timeout(1000);\n    return \"What's up\";\n  }),\n\n  grandchildTask: task(function * () {\n    this.set('status', \"3. Grandchild: one moment...\");\n    yield timeout(1000);\n    return \"Hello\";\n  }),\n});",
    "completion-state-controller.js": "export default Controller.extend({\n  doStuff:            task(sharedFn),\n  doStuffDrop:        task(sharedFn).drop(),\n  doStuffEnqueue:     task(sharedFn).enqueue(),\n  doStuffRestartable: task(sharedFn).restartable(),\n\n  showLessCommon: false,\n\n  tasks: [\n    \"doStuff\",\n    \"doStuffDrop\",\n    \"doStuffEnqueue\",\n    \"doStuffRestartable\",\n  ],\n\n  taskProperties: computed('showLessCommon', function() {\n    return [\n      ...this.get('commonTaskProperties'),\n      ...(this.get('showLessCommon') ? this.get('lessCommonTaskProperties') : [])\n    ];\n  }),\n\n  commonTaskProperties: [\n    \"last\",\n    \"lastSuccessful\",\n    \"lastErrored\",\n  ],\n\n  lessCommonTaskProperties: [\n    \"lastComplete\",\n    \"lastPerformed\",\n    \"lastIncomplete\",\n    \"lastCanceled\",\n  ],\n\n  actions: {\n    performAll() {\n    }\n  }\n});",
    "count-up.js": "  countUp: task(function * () {\n    while (true) {\n      this.incrementProperty('count');\n      yield timeout(100);\n    }\n  }).on('init'),",
    "debounced-search-with-cancelation-template.hbs": "  <input type=\"text\" oninput={{perform searchRepo value=\"target.value\"}}\n         placeholder=\"Search GitHub...\" />\n\n  {{#if searchRepo.isRunning}}\n    {{fa-icon \"spinner\" spin=true}}\n  {{/if}}\n\n  <ul>\n    {{#each searchRepo.lastSuccessful.value as |repo|}}\n      <li>{{repo.full_name}}</li>\n    {{/each}}\n  </ul>",
    "debounced-search-with-cancelation.js": "const DEBOUNCE_MS = 250;\nexport default Controller.extend({\n  searchRepo: task(function * (term) {\n    if (isBlank(term)) { return []; }\n\n    // Pause here for DEBOUNCE_MS milliseconds. Because this\n    // task is `restartable`, if the user starts typing again,\n    // the current search will be canceled at this point and\n    // start over from the beginning. This is the\n    // ember-concurrency way of debouncing a task.\n    yield timeout(DEBOUNCE_MS);\n\n    let url = `https://api.github.com/search/repositories?q=${term}`;\n\n    // We yield an AJAX request and wait for it to complete. If the task\n    // is restarted before this request completes, the XHR request\n    // is aborted (open the inspector and see for yourself :)\n    let json = yield this.get('getJSON').perform(url);\n    return json.items.slice(0, 10);\n  }).restartable(),\n\n  getJSON: task(function * (url) {\n    let xhr;\n    try {\n      xhr = $.getJSON(url);\n      let result = yield xhr.promise();\n      return result;\n\n      // NOTE: could also write this as\n      // return yield xhr;\n      //\n      // either way, the important thing is to yield before returning\n      // so that the `finally` block doesn't run until after the\n      // promise resolves (or the task is canceled).\n    } finally {\n      xhr.abort();\n    }\n  }),\n});",
    "decorating-tasks-template-isIdle.hbs": "<p>\n  {{#each tasks as |task|}}\n    <button {{action task.perform}} class={{if task.isIdle 'button-primary'}}>\n      {{task.name}}\n    </button>\n  {{/each}}\n</p>",
    "decorating-tasks-template-performWillSucceed.hbs": "<p>\n  {{#each tasks as |task|}}\n    <button {{action task.perform}} class={{if task.performWillSucceed 'button-primary'}}>\n      {{task.name}}\n    </button>\n  {{/each}}\n</p>",
    "decorating-tasks.js": "function taskWithCooldown(taskPath, ms) {\n  return task(taskPath, function * (otherTask, ...args) {\n    // perform the task...\n    yield otherTask.perform(...args);\n\n    // ...and wait for cooldown timer.\n    yield timeout(ms);\n  }).drop();\n}\n\nexport default Controller.extend({\n  sharedTask: task(function * () {\n    yield timeout(1000);\n  }).drop(),\n\n  halfSecond: taskWithCooldown('sharedTask', 500),\n  oneSecond:  taskWithCooldown('sharedTask', 1000),\n  twoSeconds: taskWithCooldown('sharedTask', 2000),\n\n  tasks: computed(function() {\n    return [\n      this.get('halfSecond'),\n      this.get('oneSecond'),\n      this.get('twoSeconds')\n    ];\n  }),\n});",
    "detail-route.js": "export default Route.extend({\n  notify: service('notify'),\n\n  setupController(controller, model) {\n    this._super(...arguments);\n    this.get('pollServerForChanges').perform(model.id);\n  },\n\n  pollServerForChanges: task(function * (id) {\n    let notify = this.get('notify');\n    yield timeout(500);\n    try {\n      notify.info(`Thing ${id}: Starting to poll for changes`);\n      while (true) {\n        yield timeout(5000);\n        notify.info(`Thing ${id}: Polling now...`);\n      }\n    } finally {\n      notify.warning(`Thing ${id}: No longer polling for changes`);\n    }\n  }).cancelOn('deactivate').restartable(),\n});",
    "ember-install.sh": "ember install ember-concurrency\n",
    "encapsulated-task-controller.js": "import { task, timeout } from 'ember-concurrency';\n\nexport default Controller.extend({\n  uploadFile: task({\n    progress: 0,\n    url: null,\n    perform: function * (makeUrl) {\n      this.set('url', makeUrl());\n\n      while (this.progress < 100) {\n        yield timeout(100);\n        let newProgress = this.progress + Math.floor(Math.random() * 6) + 5;\n        this.set('progress', Math.min(100, newProgress));\n      }\n\n      return \"Success!\";\n    },\n  }).enqueue(),\n\n  makeRandomUrl() {\n    return `https://www.${randomWord()}.edu`;\n  }\n});",
    "encapsulated-task-fun-controller.js": "import { task, timeout, all } from 'ember-concurrency';\n\nfunction * sharedFn() {\n  yield timeout(Math.random() * 2000);\n  return randomWord();\n}\n\nexport default Controller.extend({\n  doStuff: task({\n    perform: function * () {\n      return all([\n        this.get('foo').perform(),\n        this.get('bar').perform(),\n        this.get('baz').perform(),\n      ]);\n    },\n\n    foo: task(sharedFn),\n    bar: task(sharedFn),\n    baz: task(sharedFn),\n  }).restartable(),\n});",
    "encapsulated-task-fun-template.hbs": "<p>\n  <button onclick={{perform doStuff}}>\n    Do Stuff\n  </button>\n</p>\n\n{{#with doStuff.last as |t|}}\n  <h5>value: {{t.value}}</h5>\n  <h5>foo:   {{t.foo.last.value}}</h5>\n  <h5>bar:   {{t.bar.last.value}}</h5>\n  <h5>baz:   {{t.baz.last.value}}</h5>\n{{/with}}",
    "encapsulated-task-template.hbs": "<p>\n  <button onclick={{perform uploadFile makeRandomUrl}}>\n    Start Upload\n  </button>\n</p>\n\n<h5>Queued Uploads: {{uploadFile.numQueued}}</h5>\n\n{{#if uploadFile.last}}\n  <h5>\n    Uploading to {{uploadFile.last.url}}:\n    {{uploadFile.last.progress}}%\n  </h5>\n{{/if}}\n\n{{#if uploadFile.lastSuccessful}}\n  <h5 style=\"color: green;\">\n    <strong>\n    Upload to {{uploadFile.lastSuccessful.url}}:\n    {{uploadFile.lastSuccessful.value}}\n    </strong>\n  </h5>\n{{/if}}\n",
    "encapsulated-task.js": "import { task } from 'ember-concurrency';\n\nexport default Component.extend({\n  outerFoo: 123,\n  regularTask: task(function * () {\n    console.log(this.outerFoo); // => 123\n\n    yield doSomeAsync();\n\n    // This prints undefined if encapsulatedTask hasn't yet\n    // been performed, otherwise it prints \"BAR\".\n    //\n    // This demonstrates how it's possible to reach in and read\n    // properties of encapsulated tasks from the outside, but\n    // encapsulated tasks don't have access to anything from\n    // the \"outside world\"\n    //\n    // `encapsulatedTask.last` refers to the most recently\n    // perform()ed instance of encapsulatedTask\n    console.log(this.get('encapsulatedTask.last.innerBar'));\n  }),\n\n  encapsulatedTask: task({\n    // `perform` must use generator function syntax\n    perform: function * (value) {\n      console.log(this.innerFoo); // => 456\n\n      yield doSomeAsync();\n\n      // there is no way to access `outerFoo` without\n      // it being explicitly passed in in some way\n\n      // set innerFoo to whatever was\n      this.set('innerFoo', value);\n    },\n\n    innerFoo: 456,\n    innerBar: \"BAR\",\n  })\n});\n\n",
    "error-vs-cancelation-template.hbs": "<button onclick={{perform myTask false}}>\n  Run to Completion\n</button>\n\n<button onclick={{perform myTask true}}>\n  Throw an Error\n</button>\n\n<ul>\n  <li>Task State: {{myTask.state}}</li>\n  <li>Completions: {{numCompletions}}</li>\n  <li>Errors: {{numErrors}}</li>\n  <li>Finally block runs: {{numFinallys}}</li>\n</ul>\n",
    "error-vs-cancelation.js": "export default Controller.extend({\n  numCompletions: 0,\n  numErrors: 0,\n  numFinallys: 0,\n\n  myTask: task(function * (doError) {\n    try {\n      yield timeout(1000);\n      if (doError) {\n        throw new Error(\"Boom\");\n      }\n    } catch(e) {\n      this.incrementProperty('numErrors');\n    } finally {\n      this.incrementProperty('numFinallys');\n    }\n    this.incrementProperty('numCompletions');\n  }).restartable(),\n});",
    "increment-button-task.js": "export default Controller.extend({\n  count: 0,\n  incrementBy: task(function * (inc) {\n    let speed = 400;\n    while (true) {\n      this.incrementProperty('count', inc);\n      yield timeout(speed);\n      speed = Math.max(50, speed * 0.8);\n    }\n  })\n});",
    "increment-button.js": "function sendPress() {\n  this.sendAction('press');\n}\n\nfunction sendRelease() {\n  this.sendAction('release');\n}\n\nexport default Component.extend({\n  tagName: 'button',\n\n  touchStart: sendPress,\n  mouseDown:  sendPress,\n  touchEnd:   sendRelease,\n  mouseLeave: sendRelease,\n  mouseUp:    sendRelease,\n});",
    "joining-tasks-2-template.hbs": "<p>\n  <button onclick={{perform parent 'all'}}>all()</button>\n  <button onclick={{perform parent 'race'}}>race()</button>\n</p>",
    "joining-tasks-2.js": "import { task, timeout, all, race } from 'ember-concurrency';\nconst methods = { all, race };\n\nexport default Controller.extend({\n  status: \"Waiting...\",\n  childTasks: null,\n\n  parent: task(function * (methodName) {\n    let allOrRace = methods[methodName];\n    let childTasks = [];\n\n    for (let id = 0; id < 5; ++id) {\n      childTasks.push(this.get('child').perform(id));\n    }\n\n    this.set('childTasks', childTasks);\n    this.set('status', \"Waiting for child tasks to complete...\");\n    let words = yield allOrRace(childTasks);\n    this.set('status', `Done: ${makeArray(words).join(', ')}`);\n  }).restartable(),\n\n  child: task({\n    percent: 0,\n    id: null,\n\n    perform: function * (id) {\n      this.set('id', id);\n      while (this.percent < 100) {\n        yield timeout(Math.random() * 100 + 100);\n        let newPercent = Math.min(100, Math.floor(this.percent + Math.random() * 20));\n        this.set('percent', newPercent);\n      }\n      return randomWord();\n    },\n  }).enqueue().maxConcurrency(3),\n\n  colors: [ '#ff8888', '#88ff88', '#8888ff' ],\n});",
    "joining-tasks-template.hbs": "<p>\n  <button onclick={{perform parent 'all'}}>all()</button>\n  <button onclick={{perform parent 'race'}}>race()</button>\n</p>",
    "joining-tasks.js": "import { task, timeout, all, race } from 'ember-concurrency';\nconst methods = { all, race };\n\nconst ProgressTracker = EmberObject.extend({\n  id: null,\n  percent: 0,\n  word: null,\n});\n\nexport default Controller.extend({\n  status: \"Waiting...\",\n  trackers: null,\n\n  parent: task(function * (methodName) {\n    let allOrRace = methods[methodName];\n    let trackers = [], childTasks = [];\n\n    for (let id = 0; id < 5; ++id) {\n      let tracker = ProgressTracker.create({ id });\n      trackers.push(tracker);\n      childTasks.push(this.get('child').perform(tracker));\n    }\n\n    this.set('trackers', trackers);\n    this.set('status', \"Waiting for child tasks to complete...\");\n    let words = yield allOrRace(childTasks);\n    this.set('status', `Done: ${makeArray(words).join(', ')}`);\n  }).restartable(),\n\n  child: task(function * (tracker) {\n    let percent = 0;\n    while (percent < 100) {\n      yield timeout(Math.random() * 100 + 100);\n      percent = Math.min(100, Math.floor(percent + Math.random() * 20));\n      tracker.set('percent', percent);\n    }\n    let word = randomWord();\n    tracker.set('word', word);\n    return word;\n  }).enqueue().maxConcurrency(3),\n\n  colors: [ '#ff8888', '#88ff88', '#8888ff' ],\n});",
    "loading-ui-controller.js": "export default Controller.extend({\n  askQuestion: task(function * () {\n    yield timeout(1000);\n    this.set('result', Math.random());\n  }).drop(),\n\n  result: null,\n});",
    "poll-loop-break-1.js": "  pollForChanges: task(function * () {\n    while(true) {\n      yield pollServerForChanges();\n      if (Ember.testing) { return; }\n      yield timeout(5000);\n    }\n  })\n",
    "poll-loop-classic.js": "  pollForChanges() {\n    if (this.isDestroyed) { return; }\n    pollServerForChanges().then(() => {\n      Ember.run.later(this, 'pollForChanges', 5000);\n    });\n  }\n",
    "poll-loop.js": "  pollForChanges: task(function * () {\n    while(true) {\n      yield pollServerForChanges();\n      yield timeout(5000);\n    }\n  })\n",
    "press-and-hold-buttons.hbs": "<p>\n  {{#press-and-hold-button\n    press=(perform incrementBy -1)\n    release=(cancel-all incrementBy)}}\n      --Decrease\n  {{/press-and-hold-button}}\n\n  {{#press-and-hold-button\n    press=(perform incrementBy 1)\n    release=(cancel-all incrementBy)}}\n      Increase++\n  {{/press-and-hold-button}}\n</p>",
    "scrambled-text.js": "  startScrambling: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      let pauseTime = 140;\n      while (pauseTime > 5) {\n        this.set('scrambledText', scramble(text));\n        yield timeout(pauseTime);\n        pauseTime = pauseTime * 0.95;\n      }\n      this.set('scrambledText', text);\n      yield timeout(1500);\n    }\n  }).on('init'),",
    "shared-tasks-concurrent.js": "export default Controller.extend({\n  restartableTask3: task(SHARED_TASK_FN).maxConcurrency(3).restartable(),\n  enqueuedTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueue(),\n  droppingTask3:    task(SHARED_TASK_FN).maxConcurrency(3).drop(),\n  keepLatestTask3:  task(SHARED_TASK_FN).maxConcurrency(3).keepLatest(),\n});",
    "shared-tasks.js": "export default Controller.extend({\n  defaultTask:     task(SHARED_TASK_FN),\n  restartableTask: task(SHARED_TASK_FN).restartable(),\n  enqueuedTask:    task(SHARED_TASK_FN).enqueue(),\n  droppingTask:    task(SHARED_TASK_FN).drop(),\n  keepLatestTask:  task(SHARED_TASK_FN).keepLatest(),\n});",
    "start-task-example-template.hbs": "  <button {{action 'performTask' \"one\"}}>\n    1. task.perform(...)\n  </button>\n\n  <button onclick={{perform myTask \"two\"}}>\n    2. (perform taskName)\n  </button>\n\n  <button {{action \"triggerFoo\" \"three\"}}>\n    3. .on('foo')\n  </button>\n\n  <input type=\"checkbox\"\n         onchange={{perform myTask value=\"target.checked\"}} />\n  4. Checkbox",
    "start-task-example.js": "import Component from '@ember/component';\nimport { task, timeout } from 'ember-concurrency';\n\nexport default Component.extend({\n  status: null,\n\n  myTask: task(function * (msg = \"init\") {\n    let status = `myTask.perform(${msg})...`;\n    this.set('status', status);\n\n    yield timeout(500);\n    this.set('status', `${status} Done`);\n  }).on('init', 'foo'),\n\n  actions: {\n    performTask(msg) {\n      // This demonstrates how you can .get() a reference\n      // to a task and then run it with .perform(), but\n      // ideally you should just invoke myTask directly\n      // from the template using the `perform` helper.\n      this.get('myTask').perform(msg);\n    },\n    triggerFoo(msg) {\n      this.trigger('foo', msg);\n    }\n  }\n});",
    "task-cancelation-example-1.js": "import Component from '@ember/component';\nexport default Component.extend({\n  queryServer: task(function * () {\n    yield timeout(10000);\n    return 123;\n  }),\n\n  actions: {\n    fetchResults() {\n      this.get('doStuff').perform().then((results) => {\n        this.set('results', results);\n      });\n    }\n  }\n});\n\n",
    "task-cancelation-example-2.js": "import Component from '@ember/component';\nimport { task, timeout, didCancel } from 'ember-concurrency';\n\nexport default Component.extend({\n  queryServer: task(function * () {\n    yield timeout(10000);\n    return 123;\n  }),\n\n  actions: {\n    fetchResults() {\n      this.get('doStuff').perform().then((results) => {\n        this.set('results', results);\n      }).catch((e) => {\n        if (!didCancel(e)) {\n          // re-throw the non-cancelation error\n          throw e;\n        }\n      });\n    }\n  }\n});\n\n",
    "task-cancelation-example-3.js": "import Component from '@ember/component';\nexport default Component.extend({\n  queryServer: task(function * () {\n    yield timeout(10000);\n    return 123;\n  }),\n\n  fetchResults: task(function * () {\n    let results = this.get('doStuff').perform();\n    this.set('results', results);\n  }),\n});\n\n",
    "task-function-syntax-1.js": "  waitAFewSeconds: task(function * () {\n    this.set('status', \"Gimme one second...\");\n    yield timeout(1000);\n    this.set('status', \"Gimme one more second...\");\n    yield timeout(1000);\n    this.set('status', \"OK, I'm done.\");\n  }),",
    "task-function-syntax-2.js": "  pickRandomNumbers: task(function * () {\n    let nums = [];\n    for (let i = 0; i < 3; i++) {\n      nums.push(Math.floor(Math.random() * 10));\n    }\n\n    this.set('status', `My favorite numbers: ${nums.join(', ')}`);\n  }),",
    "task-function-syntax-3.js": "  myTask: task(function * () {\n    this.set('status', `Thinking...`);\n    let promise = timeout(1000).then(() => 123);\n    let resolvedValue = yield promise;\n    this.set('status', `The value is ${resolvedValue}`);\n  }),",
    "task-function-syntax-4.js": "  myTask: task(function * () {\n    this.set('status', `Thinking...`);\n    try {\n      yield timeout(1000).then(() => {\n        throw \"Ahhhhh!!!!\";\n      });\n      this.set('status', `This does not get used!`);\n    } catch(e) {\n      this.set('status', `Caught value: ${e}`);\n    }\n  }),",
    "task-group-component.js": "export default Component.extend({\n  taskGroup: null, // passed-in\n\n  chores:        taskGroup().group('taskGroup'),\n  changeDiapers: task(shortPause).group('chores'),\n  doDishes:      task(shortPause).group('chores'),\n  mowTheLawn:    task(shortPause).group('chores'),\n\n  fun:           taskGroup().group('taskGroup'),\n  playGames:     task(shortPause).group('fun'),\n  dance:         task(shortPause).group('fun'),\n  sing:          task(shortPause).group('fun'),\n\n  tasks: computed(function() {\n    return [\n      this.get('changeDiapers'),\n      this.get('doDishes'),\n      this.get('mowTheLawn'),\n      this.get('playGames'),\n      this.get('dance'),\n      this.get('sing'),\n    ];\n  }),\n});",
    "task-groups-template.hbs": "{{#each tasks as |task|}}\n  <button class={{if task.isIdle 'clickable'}}\n          onclick={{perform task}}>{{task.name}}</button>\n{{/each}}\n\n<h5>Chores group state: {{chores.state}}</h5>\n\n<h5>\n  Most Recent Chore:\n  {{#with chores.last as |taskInstance|}}\n    {{taskInstance.task.name}} ({{taskInstance.state}})\n  {{/with}}\n</h5>",
    "task-groups.js": "import { task, taskGroup } from 'ember-concurrency';\n\nexport default Controller.extend({\n  chores: taskGroup().drop(),\n\n  mowLawn:       task(taskFn).group('chores'),\n  doDishes:      task(taskFn).group('chores'),\n  changeDiapers: task(taskFn).group('chores'),\n\n  tasks: computed(function() {\n    return [\n      this.get('mowLawn'),\n      this.get('doDishes'),\n      this.get('changeDiapers'),\n    ];\n  }),\n});",
    "waitForEvent-derived-state.hbs": "<h4>\n  {{#if waiter.isRunning}}\n    Please click somewhere...\n  {{else}}\n    Thanks!\n  {{/if}}\n</h4>",
    "waitForEvent-derived-state.js": "  waiterLoop: task(function * () {\n    while(true) {\n      yield this.get('waiter').perform();\n      yield timeout(1500);\n    }\n  }).on('init'),\n\n  waiter: task(function * () {\n    let event = yield waitForEvent($('body'), 'click');\n    return event;\n  }),",
    "waitForEvent.hbs": "<h4>\n  jqueryEvent: (x={{jQueryEvent.offsetX}}, y={{jQueryEvent.offsetX}})\n</h4>\n\n<h4>\n  emberEvent: (v={{emberEvent.v}})\n</h4>",
    "waitForEvent.js": "  jQueryEvent: null,\n  jQueryEventLoop: task(function * () {\n    let $body = $('body');\n    while(true) {\n      let event = yield waitForEvent($body, 'click');\n      this.set('jQueryEvent', event);\n      this.trigger('fooEvent', { v: Math.random() });\n    }\n  }).on('init'),\n\n  emberEvent: null,\n  emberEventedLoop: task(function * () {\n    while(true) {\n      let event = yield waitForEvent(this, 'fooEvent');\n      this.set('emberEvent', event);\n    }\n  }).on('init'),",
    "writing-tasks.js": "import Component from '@ember/component';\nimport { task } from 'ember-concurrency';\n\nexport default Component.extend({\n  myTask: task(function * () {\n    alert(\"hello!\");\n  })\n});\n\n"
  };
});
define('dummy/task-injection-test/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var service = Ember.inject.service;
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    users: null,

    myTask: (0, _emberConcurrency.task)({
      fun: service(),
      perform: regeneratorRuntime.mark(function perform() {
        var value;
        return regeneratorRuntime.wrap(function perform$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.get('subtask').perform();

              case 2:
                value = _context.sent;
                return _context.abrupt('return', this.get('fun.foo') + '-' + value);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, perform, this);
      }),

      subtask: (0, _emberConcurrency.task)({
        fun: service(),
        wat: 2,
        perform: regeneratorRuntime.mark(function perform() {
          return regeneratorRuntime.wrap(function perform$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', this.get('fun.foo') * this.wat);

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, perform, this);
        })
      })
    })
  });
});
define("dummy/task-injection-test/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6mzabxyd", "block": "{\"statements\":[[11,\"h1\",[]],[13],[0,\"Task injection test\"],[14],[0,\"\\n\\n\"],[11,\"button\",[]],[16,\"onclick\",[33,[\"perform\"],[[28,[\"myTask\"]]],null],null],[15,\"data-test-selector\",\"perform-task-w-injection-button\"],[13],[0,\"clickme\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[15,\"data-test-selector\",\"perform-task-result\"],[13],[1,[28,[\"myTask\",\"last\",\"value\"]],false],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/task-injection-test/template.hbs" } });
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3vKDCMgv", "block": "{\"statements\":[[1,[26,[\"source\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/code-snippet.hbs" } });
});
define('dummy/testing-ergo/foo-settimeout/controller', ['exports', 'ember-concurrency', 'ember-concurrency/utils'], function (exports, _emberConcurrency, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    isShowingButton: false,
    showButtonSoon: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.set('isShowingButton', false);
              _context.next = 3;
              return (0, _utils.rawTimeout)(500);

            case 3:
              this.set('isShowingButton', true);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define('dummy/testing-ergo/foo-settimeout/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    setupController: function setupController(controller) {
      controller.get('showButtonSoon').perform();
    }
  });
});
define("dummy/testing-ergo/foo-settimeout/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tQshzrXG", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isShowingButton\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"eventual-button\"],[13],[0,\"Eventual Button\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/testing-ergo/foo-settimeout/template.hbs" } });
});
define('dummy/testing-ergo/foo/controller', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    isShowingButton: false,
    showButtonSoon: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.set('isShowingButton', false);
              _context.next = 3;
              return (0, _emberConcurrency.timeout)(200);

            case 3:
              this.set('isShowingButton', true);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })),

    value: 0,
    actions: {
      setValue: function setValue() {
        this.set('value', 123);
      }
    }
  });
});
define('dummy/testing-ergo/foo/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    setupController: function setupController(controller) {
      controller.get('showButtonSoon').perform();
    }
  });
});
define("dummy/testing-ergo/foo/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zTbaN45+", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isShowingButton\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"eventual-button\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"setValue\"],null],null],[13],[0,\"Eventual Button\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"value=\"],[1,[26,[\"value\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"disappearing-content\"],[13],[0,\"Disappearing Content\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/testing-ergo/foo/template.hbs" } });
});
define("dummy/testing-ergo/loading/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lbs3Yuf0", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"loading-message\"],[13],[0,\"I am a loading route.\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/testing-ergo/loading/template.hbs" } });
});
define('dummy/testing-ergo/slow/route', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    model: function model() {
      return (0, _emberConcurrency.timeout)(200).then(function () {});
    }
  });
});
define("dummy/testing-ergo/slow/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qovS0DtF", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"slow-banner\"],[13],[0,\"Welcome to slow route.\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/testing-ergo/slow/template.hbs" } });
});
define('dummy/testing-ergo/timer-loop/controller', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    foo: 0
  });
});
define('dummy/testing-ergo/timer-loop/route', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    setupController: function setupController() {
      this.get('loopingTask').perform();
    },

    loopingTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!true) {
                _context.next = 6;
                break;
              }

              this.controller.incrementProperty('foo');
              _context.next = 4;
              return (0, _emberConcurrency.timeout)(200);

            case 4:
              _context.next = 0;
              break;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
  });
});
define("dummy/testing-ergo/timer-loop/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wKqQeazp", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"timer-loop-message\"],[13],[0,\"foo=\"],[1,[26,[\"foo\"]],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/testing-ergo/timer-loop/template.hbs" } });
});
define('dummy/utils', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.randomWord = randomWord;
  var WORDS = ['ember', 'tomster', 'swag', 'yolo', 'turbo', 'ajax'];
  function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-concurrency","version":"0.8.10"});
}
