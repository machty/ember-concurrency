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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "dummy/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container navbar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "ten columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "one columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "nav-bar-link-outer");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "/api");
        var el6 = dom.createTextNode("API");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "one columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "nav-bar-link-outer");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "https://github.com/machty/ember-concurrency");
        dom.setAttribute(el5, "target", "_blank");
        var el6 = dom.createTextNode("GitHub");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [19, 0], [19, 10]]], 0, 0, 0, 0], ["content", "ember-notify", ["loc", [null, [21, 0], [21, 16]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "dummy/components/ajax-throttling-example/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "style", ["subexpr", "color", [["get", "log.color", ["loc", [null, [3, 22], [3, 31]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [3, 33]]], 0, 0], 0, 0, 0, 0], ["content", "log.message", ["loc", [null, [3, 34], [3, 49]]], 0, 0, 0, 0]],
        locals: ["log"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "dummy/components/ajax-throttling-example/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "logs", ["loc", [null, [2, 10], [2, 14]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [4, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/components/caps-marquee/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "formattedText", ["loc", [null, [1, 0], [1, 17]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "dummy/components/concurrency-graph/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("Cancel All");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element4);
          return morphs;
        },
        statements: [["element", "action", ["cancelAll"], ["target", ["get", "task", ["loc", [null, [4, 38], [4, 42]]], 0, 0, 0, 0]], ["loc", [null, [4, 10], [4, 44]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 18,
                  "column": 6
                },
                "end": {
                  "line": 26,
                  "column": 6
                }
              },
              "moduleName": "dummy/components/concurrency-graph/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("rect");
              dom.setAttribute(el1, "height", "20px");
              dom.setAttribute(el1, "stroke", "black");
              dom.setAttribute(el1, "fill-opacity", "0.3");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element3 = dom.childAt(fragment, [1]);
              var morphs = new Array(4);
              morphs[0] = dom.createAttrMorph(element3, 'x');
              morphs[1] = dom.createAttrMorph(element3, 'y');
              morphs[2] = dom.createAttrMorph(element3, 'width');
              morphs[3] = dom.createAttrMorph(element3, 'fill');
              return morphs;
            },
            statements: [["attribute", "x", ["concat", [["subexpr", "scale", [["subexpr", "subtract", [["get", "tracker.startTime", ["loc", [null, [19, 35], [19, 52]]], 0, 0, 0, 0], ["get", "lowerLimit", ["loc", [null, [19, 53], [19, 63]]], 0, 0, 0, 0]], [], ["loc", [null, [19, 25], [19, 64]]], 0, 0], ["get", "lowerLimit", ["loc", [null, [19, 65], [19, 75]]], 0, 0, 0, 0], ["get", "upperLimit", ["loc", [null, [19, 76], [19, 86]]], 0, 0, 0, 0]], [], ["loc", [null, [19, 17], [19, 88]]], 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "y", ["subexpr", "pick-from", [["get", "labelHeights", ["loc", [null, [20, 28], [20, 40]]], 0, 0, 0, 0], ["get", "tracker.id", ["loc", [null, [20, 41], [20, 51]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [20, 53]]], 0, 0], 0, 0, 0, 0], ["attribute", "width", ["concat", [["subexpr", "scale", [["subexpr", "width", [["get", "tracker.startTime", ["loc", [null, [22, 36], [22, 53]]], 0, 0, 0, 0], ["get", "tracker.endTime", ["loc", [null, [22, 54], [22, 69]]], 0, 0, 0, 0], ["get", "upperLimit", ["loc", [null, [22, 70], [22, 80]]], 0, 0, 0, 0]], [], ["loc", [null, [22, 29], [22, 81]]], 0, 0], ["get", "lowerLimit", ["loc", [null, [22, 82], [22, 92]]], 0, 0, 0, 0], ["get", "upperLimit", ["loc", [null, [22, 93], [22, 103]]], 0, 0, 0, 0]], [], ["loc", [null, [22, 21], [22, 105]]], 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "fill", ["get", "color", ["loc", [null, [24, 21], [24, 26]]], 0, 0, 0, 0], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 38,
                    "column": 8
                  },
                  "end": {
                    "line": 40,
                    "column": 8
                  }
                },
                "moduleName": "dummy/components/concurrency-graph/template.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("line");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element1 = dom.childAt(fragment, [1]);
                var morphs = new Array(5);
                morphs[0] = dom.createAttrMorph(element1, 'x1');
                morphs[1] = dom.createAttrMorph(element1, 'y1');
                morphs[2] = dom.createAttrMorph(element1, 'x2');
                morphs[3] = dom.createAttrMorph(element1, 'y2');
                morphs[4] = dom.createAttrMorph(element1, 'stroke');
                return morphs;
              },
              statements: [["attribute", "x1", ["concat", [["get", "x", ["loc", [null, [39, 22], [39, 23]]], 0, 0, 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "y1", ["get", "y", ["loc", [null, [39, 33], [39, 34]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "x2", ["concat", [["get", "x", ["loc", [null, [39, 43], [39, 44]]], 0, 0, 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "y2", ["subexpr", "sum", [20, ["get", "y", ["loc", [null, [39, 61], [39, 62]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [39, 64]]], 0, 0], 0, 0, 0, 0], ["attribute", "stroke", ["get", "color", ["loc", [null, [39, 74], [39, 79]]], 0, 0, 0, 0], 0, 0, 0, 0]],
              locals: ["y"],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 28,
                  "column": 6
                },
                "end": {
                  "line": 41,
                  "column": 6
                }
              },
              "moduleName": "dummy/components/concurrency-graph/template.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("text");
              dom.setAttribute(el1, "font-family", "Raleway");
              dom.setAttribute(el1, "font-size", "14");
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1]);
              var morphs = new Array(7);
              morphs[0] = dom.createAttrMorph(element2, 'x');
              morphs[1] = dom.createAttrMorph(element2, 'y');
              morphs[2] = dom.createAttrMorph(element2, 'fill');
              morphs[3] = dom.createAttrMorph(element2, 'text-decoration');
              morphs[4] = dom.createAttrMorph(element2, 'font-style');
              morphs[5] = dom.createMorphAt(element2, 1, 1);
              morphs[6] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["attribute", "x", ["concat", [["subexpr", "sum", [0.5, ["get", "x", ["loc", [null, [29, 27], [29, 28]]], 0, 0, 0, 0]], [], ["loc", [null, [29, 17], [29, 30]]], 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "y", ["subexpr", "sum", [15, ["subexpr", "pick-from", [["get", "labelHeights", ["loc", [null, [30, 36], [30, 48]]], 0, 0, 0, 0], ["get", "tracker.id", ["loc", [null, [30, 49], [30, 59]]], 0, 0, 0, 0]], [], ["loc", [null, [30, 25], [30, 60]]], 0, 0]], [], ["loc", [null, [null, null], [30, 62]]], 0, 0], 0, 0, 0, 0], ["attribute", "fill", ["get", "color", ["loc", [null, [32, 21], [32, 26]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "text-decoration", ["subexpr", "if", [["get", "tracker.isCanceled", ["loc", [null, [34, 35], [34, 53]]], 0, 0, 0, 0], "line-through", "none"], [], ["loc", [null, [null, null], [34, 77]]], 0, 0], 0, 0, 0, 0], ["attribute", "font-style", ["subexpr", "if", [["get", "tracker.startTime", ["loc", [null, [35, 30], [35, 47]]], 0, 0, 0, 0], "normal", "italic"], [], ["loc", [null, [null, null], [35, 67]]], 0, 0], 0, 0, 0, 0], ["content", "tracker.state", ["loc", [null, [36, 10], [36, 27]]], 0, 0, 0, 0], ["block", "with", [["subexpr", "pick-from", [["get", "labelHeights", ["loc", [null, [38, 27], [38, 39]]], 0, 0, 0, 0], ["get", "tracker.id", ["loc", [null, [38, 40], [38, 50]]], 0, 0, 0, 0]], [], ["loc", [null, [38, 16], [38, 51]]], 0, 0]], [], 0, null, ["loc", [null, [38, 8], [40, 17]]]]],
            locals: ["x"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 4
              },
              "end": {
                "line": 42,
                "column": 4
              }
            },
            "moduleName": "dummy/components/concurrency-graph/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "tracker.hasStarted", ["loc", [null, [18, 12], [18, 30]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [18, 6], [26, 13]]]], ["block", "with", [["subexpr", "scale", [["subexpr", "subtract", [["get", "tracker.performTime", ["loc", [null, [28, 31], [28, 50]]], 0, 0, 0, 0], ["get", "lowerLimit", ["loc", [null, [28, 51], [28, 61]]], 0, 0, 0, 0]], [], ["loc", [null, [28, 21], [28, 62]]], 0, 0], ["get", "lowerLimit", ["loc", [null, [28, 63], [28, 73]]], 0, 0, 0, 0], ["get", "upperLimit", ["loc", [null, [28, 74], [28, 84]]], 0, 0, 0, 0]], [], ["loc", [null, [28, 14], [28, 85]]], 0, 0]], [], 1, null, ["loc", [null, [28, 6], [41, 15]]]]],
          locals: ["color"],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 44,
              "column": 0
            }
          },
          "moduleName": "dummy/components/concurrency-graph/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("g");
          dom.setAttribute(el1, "height", "20px");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "with", [["subexpr", "pick-from", [["get", "colors", ["loc", [null, [17, 23], [17, 29]]], 0, 0, 0, 0], ["get", "tracker.id", ["loc", [null, [17, 30], [17, 40]]], 0, 0, 0, 0]], [], ["loc", [null, [17, 12], [17, 41]]], 0, 0]], [], 0, null, ["loc", [null, [17, 4], [42, 13]]]]],
        locals: ["tracker"],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 46,
              "column": 0
            },
            "end": {
              "line": 48,
              "column": 0
            }
          },
          "moduleName": "dummy/components/concurrency-graph/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("line");
          dom.setAttribute(el1, "y1", "0");
          dom.setAttribute(el1, "y2", "100");
          dom.setAttribute(el1, "stroke", "black");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'x1');
          morphs[1] = dom.createAttrMorph(element0, 'x2');
          return morphs;
        },
        statements: [["attribute", "x1", ["concat", [["get", "x", ["loc", [null, [47, 14], [47, 15]]], 0, 0, 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "x2", ["concat", [["get", "x", ["loc", [null, [47, 33], [47, 34]]], 0, 0, 0, 0], "%"], 0, 0, 0, 0, 0], 0, 0, 0, 0]],
        locals: ["x"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 53,
            "column": 0
          }
        },
        "moduleName": "dummy/components/concurrency-graph/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("task.perform()");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Clear Timeline");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("style");
        dom.setAttribute(el1, "type", "text/css");
        var el2 = dom.createTextNode("\ng:hover {\n  stroke-width: 3px;\n  font-weight: 700;\n}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el1 = dom.createElement("svg");
        dom.setAttribute(el1, "style", "width: 100%; padding: 5px;");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [0]);
        var element6 = dom.childAt(fragment, [2]);
        var element7 = dom.childAt(fragment, [8]);
        var morphs = new Array(5);
        morphs[0] = dom.createElementMorph(element5);
        morphs[1] = dom.createElementMorph(element6);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(element7, 1, 1);
        morphs[4] = dom.createMorphAt(element7, 3, 3);
        return morphs;
      },
      statements: [["element", "action", ["startTask"], [], ["loc", [null, [1, 8], [1, 30]]], 0, 0], ["element", "action", ["restart"], [], ["loc", [null, [2, 8], [2, 28]]], 0, 0], ["block", "if", [["get", "task.isRunning", ["loc", [null, [3, 6], [3, 20]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 0], [5, 7]]]], ["block", "each", [["get", "trackers", ["loc", [null, [15, 8], [15, 16]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [15, 0], [44, 9]]]], ["block", "with", [["subexpr", "scale", [["get", "timeElapsed", ["loc", [null, [46, 15], [46, 26]]], 0, 0, 0, 0], ["get", "lowerLimit", ["loc", [null, [46, 27], [46, 37]]], 0, 0, 0, 0], ["get", "upperLimit", ["loc", [null, [46, 38], [46, 48]]], 0, 0, 0, 0]], [], ["loc", [null, [46, 8], [46, 49]]], 0, 0]], [], 2, null, ["loc", [null, [46, 0], [48, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/components/count-up/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "count", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/components/github-edit/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1, "class", "icon-pencil");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "dummy/components/intro-task-oldschool/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Count: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Start Over");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["content", "count", ["loc", [null, [1, 11], [1, 20]]], 0, 0, 0, 0], ["element", "action", ["startCounting"], [], ["loc", [null, [2, 8], [2, 34]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "dummy/components/intro-task/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Count: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Start Over");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element0, 'onclick');
        return morphs;
      },
      statements: [["content", "count", ["loc", [null, [1, 11], [1, 20]]], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "countingTask", ["loc", [null, [2, 26], [2, 38]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [2, 40]]], 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 16
              },
              "end": {
                "line": 4,
                "column": 59
              }
            },
            "moduleName": "dummy/components/nav-header/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "prevTopic.title", ["loc", [null, [4, 16], [4, 59]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "dummy/components/nav-header/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "u-pull-left");
          var el2 = dom.createTextNode("\n      Previous: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", [["get", "prevTopic.route", ["loc", [null, [4, 42], [4, 57]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 16], [4, 59]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 55
              }
            },
            "moduleName": "dummy/components/nav-header/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "nextTopic.title", ["loc", [null, [10, 12], [10, 55]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "dummy/components/nav-header/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "u-pull-right");
          var el2 = dom.createTextNode("\n      Next: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", [["get", "nextTopic.route", ["loc", [null, [10, 38], [10, 53]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [10, 12], [10, 55]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "dummy/components/nav-header/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["block", "if", [["get", "prevTopic", ["loc", [null, [2, 8], [2, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [6, 9]]]], ["block", "if", [["get", "nextTopic", ["loc", [null, [8, 8], [8, 17]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [8, 2], [12, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/components/scrambled-text/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "scrambledText", ["loc", [null, [1, 0], [1, 17]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "dummy/components/start-task-example/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    1. task.perform(...)\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    2. (perform taskName)\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    3. .on('foo')\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2, "type", "checkbox");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  4. Checkbox\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Status: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [2]);
        var element2 = dom.childAt(element0, [4]);
        var element3 = dom.childAt(element0, [6]);
        var element4 = dom.childAt(element0, [8]);
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createAttrMorph(element2, 'onclick');
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createAttrMorph(element4, 'onchange');
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[5] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["performTask", "one"], [], ["loc", [null, [3, 10], [3, 40]]], 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [7, 28], [7, 34]]], 0, 0, 0, 0], "two"], [], ["loc", [null, [null, null], [7, 42]]], 0, 0], 0, 0, 0, 0], ["element", "action", ["triggerFoo", "three"], [], ["loc", [null, [11, 10], [11, 41]]], 0, 0], ["attribute", "onchange", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [16, 28], [16, 34]]], 0, 0, 0, 0]], ["value", "target.checked"], ["loc", [null, [null, null], [16, 59]]], 0, 0], 0, 0, 0, 0], ["content", "status", ["loc", [null, [21, 12], [21, 22]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "start-task-example.js"], ["loc", [null, [25, 0], [25, 45]]], 0, 0], ["inline", "code-snippet", [], ["name", "start-task-example-template.hbs"], ["loc", [null, [29, 0], [29, 55]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "dummy/components/task-function-syntax-1/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Wait A Few Seconds");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element1, 'onclick');
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "waitAFewSeconds", ["loc", [null, [2, 28], [2, 43]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [2, 45]]], 0, 0], 0, 0, 0, 0], ["content", "status", ["loc", [null, [3, 2], [3, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "dummy/components/task-function-syntax-2/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Pick Random Number");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element1, 'onclick');
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "pickRandomNumbers", ["loc", [null, [2, 28], [2, 45]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [2, 47]]], 0, 0], 0, 0, 0, 0], ["content", "status", ["loc", [null, [3, 2], [3, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "dummy/components/task-function-syntax-3/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Perform myTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element1, 'onclick');
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [2, 28], [2, 34]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [2, 36]]], 0, 0], 0, 0, 0, 0], ["content", "status", ["loc", [null, [3, 2], [3, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "dummy/components/task-function-syntax-4/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Perform myTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element1, 'onclick');
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [2, 28], [2, 34]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [2, 36]]], 0, 0], 0, 0, 0, 0], ["content", "status", ["loc", [null, [3, 2], [3, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 4
            },
            "end": {
              "line": 28,
              "column": 4
            }
          },
          "moduleName": "dummy/components/task-group-example/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1, 1]);
          var morphs = new Array(6);
          morphs[0] = dom.createAttrMorph(element1, 'onclick');
          morphs[1] = dom.createAttrMorph(element1, 'class');
          morphs[2] = dom.createMorphAt(element1, 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
          return morphs;
        },
        statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "task", ["loc", [null, [20, 36], [20, 40]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [20, 42]]], 0, 0], 0, 0, 0, 0], ["attribute", "class", ["subexpr", "if", [["get", "task.isIdle", ["loc", [null, [20, 54], [20, 65]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [20, 84]]], 0, 0], 0, 0, 0, 0], ["content", "task.name", ["loc", [null, [21, 12], [21, 25]]], 0, 0, 0, 0], ["content", "task.state", ["loc", [null, [24, 12], [24, 26]]], 0, 0, 0, 0], ["content", "task.group.name", ["loc", [null, [25, 12], [25, 31]]], 0, 0, 0, 0], ["content", "task.group.state", ["loc", [null, [26, 12], [26, 32]]], 0, 0, 0, 0]],
        locals: ["task"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 32,
            "column": 0
          }
        },
        "moduleName": "dummy/components/task-group-example/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(": ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("\n  Cancel ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1, "class", "u-full-width");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Perform");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("State");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Group");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Group State");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(fragment, [2]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(element2, 0, 0);
        morphs[1] = dom.createMorphAt(element2, 2, 2);
        morphs[2] = dom.createAttrMorph(element3, 'onclick');
        morphs[3] = dom.createAttrMorph(element3, 'class');
        morphs[4] = dom.createMorphAt(element3, 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [4, 3]), 1, 1);
        return morphs;
      },
      statements: [["content", "taskGroup.name", ["loc", [null, [1, 4], [1, 22]]], 0, 0, 0, 0], ["content", "taskGroup.state", ["loc", [null, [1, 24], [1, 43]]], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "cancel-all", [["get", "taskGroup", ["loc", [null, [3, 29], [3, 38]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [3, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "class", ["subexpr", "if", [["get", "taskGroup.isRunning", ["loc", [null, [3, 52], [3, 71]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [3, 90]]], 0, 0], 0, 0, 0, 0], ["content", "taskGroup.name", ["loc", [null, [4, 9], [4, 27]]], 0, 0, 0, 0], ["block", "each", [["get", "tasks", ["loc", [null, [17, 12], [17, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [17, 4], [28, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "dummy/data-test/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Loading\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 8,
              "column": 2
            }
          },
          "moduleName": "dummy/data-test/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Load\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 2
            },
            "end": {
              "line": 14,
              "column": 2
            }
          },
          "moduleName": "dummy/data-test/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "u.username", ["loc", [null, [13, 8], [13, 22]]], 0, 0, 0, 0]],
        locals: ["u"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "dummy/data-test/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Ember Data Test");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "data-test-selector", "load-data-button");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "data-test-selector", "loaded-users");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'onclick');
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [3, 26], [3, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [3, 34]]], 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "myTask.isRunning", ["loc", [null, [4, 8], [4, 24]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [4, 2], [8, 9]]]], ["block", "each", [["get", "users", ["loc", [null, [12, 10], [12, 15]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [12, 2], [14, 11]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "dummy/deprecation-test/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Deprecation test");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "class", "deprecated-button");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", [["get", "myTask.perform", ["loc", [null, [3, 43], [3, 57]]], 0, 0, 0, 0]], [], ["loc", [null, [3, 34], [3, 59]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 7
            },
            "end": {
              "line": 13,
              "column": 59
            }
          },
          "moduleName": "dummy/docs/cancelation/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Modifiers");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 41,
              "column": 0
            },
            "end": {
              "line": 43,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/cancelation/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("Cancel All");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "action", ["cancelAll"], [], ["loc", [null, [42, 10], [42, 32]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 0
            },
            "end": {
              "line": 46,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/cancelation/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("Cancel Most Recent");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["cancelMostRecent"], [], ["loc", [null, [45, 10], [45, 39]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 60,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/cancelation/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Cancelation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" tasks can be canceled either\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("explicitly");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (by calling one of the cancel methods\n  on a task or task instance) or ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("implicitly");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (based on\n  how the task is configured, or because the task's host object\n  was destroyed).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Generally speaking, it is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("much");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" better to configure your tasks properly\n  (via ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(")\n  such that they'll be implicitly/automatically canceled at\n  the right time, but there are still some cases where\n  explicit cancelation is the only option.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Explicit Cancelation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  There are two ways to explicitly cancel a task:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Call ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("task.cancelAll()");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" on the Task object —\n    this will cancel all running or enqueued Task Instances for that\n    task.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Call ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("taskInstance.cancel()");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" on a Task Instance\n    (the object returned from a prior call to ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("task.perform()");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(")\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Running tasks: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Perform Task");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    Tip: You can also use the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".concurrency");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" property to get\n    the current number of running task instances for a given task,\n    e.g. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("{{myTask.concurrency}}");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [16]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [4]), 3, 3);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [14]), 1, 1);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 19, 19, contextualElement);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [21, 1]), 5, 5);
        morphs[6] = dom.createMorphAt(fragment, 23, 23, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 25, 25, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["docs.task-concurrency"], [], 0, null, ["loc", [null, [13, 7], [13, 59]]]], ["content", "count", ["loc", [null, [38, 19], [38, 28]]], 0, 0, 0, 0], ["element", "action", ["performTask"], [], ["loc", [null, [40, 8], [40, 32]]], 0, 0], ["block", "if", [["get", "count", ["loc", [null, [41, 6], [41, 11]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [41, 0], [43, 7]]]], ["block", "if", [["get", "mostRecent.isRunning", ["loc", [null, [44, 6], [44, 26]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [44, 0], [46, 7]]]], ["content", "myTask.concurrency", ["loc", [null, [53, 47], [53, 69]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "cancelation-template.hbs"], ["loc", [null, [57, 0], [57, 48]]], 0, 0], ["inline", "code-snippet", [], ["name", "cancelation.js"], ["loc", [null, [58, 0], [58, 38]]], 0, 0]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 2
            },
            "end": {
              "line": 25,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/child-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Restart Parent Task\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 2
            },
            "end": {
              "line": 27,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/child-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Perform Parent Task\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/child-tasks/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Child Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Tasks can call other tasks by ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("ing the\n  result of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("anotherTask.perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". When this happens,\n  the Parent task will wait for the Child task to complete before\n  proceeding. If the Parent task is canceled, the Child task will\n  automatically be canceled as well.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Parent Task:     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Child Task:      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Grandchild Task: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var element1 = dom.childAt(fragment, [10]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [6]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[4] = dom.createAttrMorph(element1, 'onclick');
        morphs[5] = dom.createMorphAt(element1, 1, 1);
        morphs[6] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        return morphs;
      },
      statements: [["content", "status", ["loc", [null, [14, 4], [14, 14]]], 0, 0, 0, 0], ["content", "parentTask.state", ["loc", [null, [17, 23], [17, 43]]], 0, 0, 0, 0], ["content", "childTask.state", ["loc", [null, [18, 23], [18, 42]]], 0, 0, 0, 0], ["content", "grandchildTask.state", ["loc", [null, [19, 23], [19, 47]]], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "parentTask", ["loc", [null, [22, 26], [22, 36]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [22, 38]]], 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "parentTask.isRunning", ["loc", [null, [23, 8], [23, 28]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [23, 2], [27, 9]]]], ["inline", "code-snippet", [], ["name", "child-tasks.js"], ["loc", [null, [31, 0], [31, 38]]], 0, 0], ["inline", "code-snippet", [], ["name", "child-tasks-template.hbs"], ["loc", [null, [32, 0], [32, 48]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 108,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/derived-state/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Derived State");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  One of the core goals of ember-concurrency is to provide as much\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Derived State");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" as possible; for example, instead\n  of requiring you to set and then later unset your own ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("isRunning");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  flag at the beginning and end of a task, ember-concurrency gives you\n  an ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".isRunning");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(") property for free so that\n  you don't have to manage your own state (which is a common source of bugs\n  and boilerplate).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ember-concurrency gives you the concept of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Tasks");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", and\n  when you ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" a Task, it produces a\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Task Instance");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", which represents a single execution\n  of that task. Both of these objects expose a lot of derived state,\n  which is described below.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Less commonly-used properties are ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("italicized");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". Also, keep in\n  mind that there are ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "/api");
        var el3 = dom.createTextNode("API docs");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" for everything described below.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Properties on ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "/api/Task.html");
        var el3 = dom.createTextNode("Task");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" objects");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("isRunning");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(":\n    true when there is at least one instance of the task running, false otherwise.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("isIdle");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the opposite of ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("isRunning");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("em");
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("concurrency");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": an integer representing the number of currently\n    running task instances. If you're using a task modifier like\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("drop/enqueue/restartable");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" (without specifying ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("maxConcurrency");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(")\n    this number will never be greater than 1. This property is mostly useful for\n    debugging.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("em");
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("state");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": a string description of the task's state; can\n    either by \"running\" or \"idle\". Useful for debugging.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Accessing Task Instances from the Task object");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Tasks also expose properties for accessing specific\n  Task Instances (which are created every time you call ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  on a task).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("last");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the last Task Instance that started executing.\n    This property will never point to a ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("drop");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("ped Task Instance,\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("lastSuccessful");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the last Task Instance that ran to completion\n    (it returned a value that wasn't a rejecting promise).\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  In addition to these properties, keep in mind that at any point you can\n  also just save the TaskInstance returned from ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  to some property for later access in case the above properties don't\n  hit your use cases (but please open a GitHub issue if you find yourself\n  doing this often because this might suggest room for improvement in\n  ember-concurrency's API).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Properties on ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "/api/TaskInstance.html");
        var el3 = dom.createTextNode("Task Instances");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("value");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the value returned from the task function. Is\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("null");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" before a value is returned, and remains null\n    if the task never completes (throws an error or is canceled).\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("error");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the error/exception thrown from the task function\n    (might also be the value of a rejected promise that was yielded).\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("Note: until ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "https://github.com/machty/ember-concurrency/issues/40");
        var el5 = dom.createTextNode("this issue");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      is resolved, unless you write code to explicitly ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode(".catch()");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      an error thrown from a performed task, this error will bubble\n      to the browser (so error reporters like Bugsnag will see it).\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Put the two together...");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Given a task named ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("myTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", if you need to display a success banner\n  with the value returned from the most recent execution of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("myTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  you can simply reference ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("{{myTask.last.value}}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". If want this banner\n  to persist until the next time the task runs to completion, you can\n  just change it to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("{{myTask.lastSuccessful.value}}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". There are other\n  combinations as well that might better suit your UI needs.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 6
            },
            "end": {
              "line": 15,
              "column": 73
            }
          },
          "moduleName": "dummy/docs/error-vs-cancelation/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Function Syntax docs");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 51,
              "column": 4
            },
            "end": {
              "line": 51,
              "column": 56
            }
          },
          "moduleName": "dummy/docs/error-vs-cancelation/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Modifiers");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 91,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/error-vs-cancelation/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Errors vs Cancelation (try/catch/finally)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  When you ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield aPromise");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  your task function will pause execution until one of three things happens:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("The promise fulfills, and your task will continue executing from that point.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("The promise rejects, and your task will automatically `throw` an error from that point.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Something causes the task to be canceled, which has the behavior described below.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  demonstrates how you can use standard JavaScript ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("try/catch");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" blocks\n  to catch exceptions thrown when you yield a rejecting promise, but\n  what about cancelation?\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Prior to version 0.7.0 of ember-concurrency, cancelations were treated as\n  exceptions that you could catch within ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("catch(e) {}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" blocks,\n  but since 0.7.0, cancelation is treated as a\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://github.com/domenic/cancelable-promise/blob/master/Third%20State.md");
        var el3 = dom.createTextNode("Third State");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  — in other words, instead of treating cancelation like a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("kind");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" of exception,\n  we treat it like a third and separate way to resume/terminate execution of a task\n  from a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", alongside fulfillment and rejection.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Specifically, this means that if a task is canceled while it is paused on a\n  yield, the task will essentially return from that point,\n  it will skip any ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("catch(e) {}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" blocks it is in, but it ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("will");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  execute any ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("finally {}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" blocks. The benefit of this behavior is that:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("finally");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" blocks will always run and can be used for cleanup logic *");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    You don't have to distinguish between cancelation and thrown exceptions\n    in your ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("catch");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" blocks (which you'd annoyingly have to do\n    if cancelation were considered just another type of error).\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    * While ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("finally");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" blocks are nice for cleanup logic, make\n    sure you're leveraging the power of\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".isRunning / .isIdle");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    task properties as much as possible so that you're not manually re-implementing\n    a lot of the implicit state that ember-concurrency provides you for free, e.g.\n    you should should avoid manually toggling the visibility of a loading spinner within\n    a task if you could accomplish the same thing using the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".isRunning");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    property on a task.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Both of the buttons below will (re)start ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("myTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" when clicked.\n  If you click the buttons quickly, it will cause the currently running task\n  to cancel from the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" where it is paused. Notice how\n  cancelations don't increment the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("numErrors");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property because\n  cancelations skip the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("catch");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" block.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("\n  Run to Completion\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("\n  Throw an Error\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Task State: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Completions: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Errors: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Finally block runs: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [20]);
        var element1 = dom.childAt(fragment, [22]);
        var element2 = dom.childAt(fragment, [24]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [6]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [14, 1]), 3, 3);
        morphs[2] = dom.createAttrMorph(element0, 'onclick');
        morphs[3] = dom.createAttrMorph(element1, 'onclick');
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[6] = dom.createMorphAt(dom.childAt(element2, [5]), 1, 1);
        morphs[7] = dom.createMorphAt(dom.childAt(element2, [7]), 1, 1);
        morphs[8] = dom.createMorphAt(fragment, 27, 27, contextualElement);
        morphs[9] = dom.createMorphAt(fragment, 29, 29, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["docs.task-function-syntax"], [], 0, null, ["loc", [null, [15, 6], [15, 73]]]], ["block", "link-to", ["docs.task-concurrency"], [], 1, null, ["loc", [null, [51, 4], [51, 56]]]], ["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [71, 26], [71, 32]]], 0, 0, 0, 0], false], [], ["loc", [null, [null, null], [71, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [75, 26], [75, 32]]], 0, 0, 0, 0], true], [], ["loc", [null, [null, null], [75, 39]]], 0, 0], 0, 0, 0, 0], ["content", "myTask.state", ["loc", [null, [80, 18], [80, 34]]], 0, 0, 0, 0], ["content", "numCompletions", ["loc", [null, [81, 19], [81, 37]]], 0, 0, 0, 0], ["content", "numErrors", ["loc", [null, [82, 14], [82, 27]]], 0, 0, 0, 0], ["content", "numFinallys", ["loc", [null, [83, 26], [83, 41]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "error-vs-cancelation-template.hbs"], ["loc", [null, [88, 0], [88, 57]]], 0, 0], ["inline", "code-snippet", [], ["name", "error-vs-cancelation.js"], ["loc", [null, [89, 0], [89, 47]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("dummy/docs/examples/ajax-throttling/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/ajax-throttling/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Example: AJAX Throttling");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Limiting the number of simultaneous AJAX requests\n  (or the number of any kind of global, shared resource)\n  can be accomplished using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".maxConcurrency()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" task modifier.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  In the example below, we render a component with 8 different\n  concurrently running tasks that each, within an infinite loop,\n  make (fake) AJAX requests. We've wrapped the code that actually\n  performs the (fake) AJAX request in a task, and we've annotated\n  that task with ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".maxConcurrency(3)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to ensure that\n  no more than 3 AJAX requests can be run at a time (so that\n  we don't overload the browser).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        return morphs;
      },
      statements: [["content", "ajax-throttling-example", ["loc", [null, [21, 0], [21, 27]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "ajax-throttling.js"], ["loc", [null, [23, 0], [23, 42]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 24,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/examples/autocomplete/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "repo.full_name", ["loc", [null, [23, 4], [23, 22]]], 0, 0, 0, 0]],
        locals: ["repo"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/autocomplete/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Auto-Search + ember-power-select + debouncing");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This example improves upon\n  the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "http://www.ember-power-select.com/cookbook/debounce-searches");
        var el3 = dom.createTextNode("Debounced Search");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  example in the ember-power-select docs, which, while reasonably succinct,\n  involves somewhat confusing usage of the\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "http://emberjs.com/api/classes/Ember.run.html#method_debounce");
        var el4 = dom.createTextNode("Ember.run.debounce API");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  and doesn't cancel previous AJAX requests when a new search begins.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  (Please mind the GitHub API quota :)\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        return morphs;
      },
      statements: [["block", "power-select", [], ["search", ["subexpr", "perform", [["get", "searchRepo", ["loc", [null, [20, 34], [20, 44]]], 0, 0, 0, 0]], [], ["loc", [null, [20, 25], [20, 45]]], 0, 0], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [21, 27], [21, 35]]], 0, 0, 0, 0]], [], [], 0, 0], "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "selected", ["loc", [null, [22, 40], [22, 48]]], 0, 0, 0, 0]], [], ["loc", [null, [22, 35], [22, 49]]], 0, 0]], [], ["loc", [null, [22, 27], [22, 50]]], 0, 0]], 0, null, ["loc", [null, [20, 2], [24, 19]]]], ["inline", "code-snippet", [], ["name", "debounced-search-with-cancelation.js"], ["loc", [null, [30, 0], [30, 60]]], 0, 0], ["inline", "code-snippet", [], ["name", "debounced-search-with-cancelation-template.hbs"], ["loc", [null, [34, 0], [34, 70]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 141,
                    "column": 12
                  },
                  "end": {
                    "line": 143,
                    "column": 12
                  }
                },
                "moduleName": "dummy/docs/examples/completion-state/template.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("              ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "completion-status completion-success");
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                return morphs;
              },
              statements: [["content", "v", ["loc", [null, [142, 64], [142, 69]]], 0, 0, 0, 0]],
              locals: ["v"],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 146,
                    "column": 12
                  },
                  "end": {
                    "line": 148,
                    "column": 12
                  }
                },
                "moduleName": "dummy/docs/examples/completion-state/template.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("              ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "completion-status completion-error");
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                return morphs;
              },
              statements: [["content", "v", ["loc", [null, [147, 62], [147, 67]]], 0, 0, 0, 0]],
              locals: ["v"],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 135,
                  "column": 8
                },
                "end": {
                  "line": 151,
                  "column": 8
                }
              },
              "moduleName": "dummy/docs/examples/completion-state/template.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("tr");
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createTextNode("\n            ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("strong");
              var el4 = dom.createTextNode("myTask.");
              dom.appendChild(el3, el4);
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n          ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("          ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("          ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(3);
              morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
              morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
              return morphs;
            },
            statements: [["content", "tp", ["loc", [null, [138, 27], [138, 33]]], 0, 0, 0, 0], ["block", "with", [["subexpr", "get", [["get", "task", ["loc", [null, [141, 25], [141, 29]]], 0, 0, 0, 0], ["subexpr", "concat", [["get", "tp", ["loc", [null, [141, 38], [141, 40]]], 0, 0, 0, 0], ".value"], [], ["loc", [null, [141, 30], [141, 50]]], 0, 0]], [], ["loc", [null, [141, 20], [141, 51]]], 0, 0]], [], 0, null, ["loc", [null, [141, 12], [143, 21]]]], ["block", "with", [["subexpr", "get", [["get", "task", ["loc", [null, [146, 25], [146, 29]]], 0, 0, 0, 0], ["subexpr", "concat", [["get", "tp", ["loc", [null, [146, 38], [146, 40]]], 0, 0, 0, 0], ".error"], [], ["loc", [null, [146, 30], [146, 50]]], 0, 0]], [], ["loc", [null, [146, 20], [146, 51]]], 0, 0]], [], 1, null, ["loc", [null, [146, 12], [148, 21]]]]],
            locals: ["tp"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 108,
                "column": 2
              },
              "end": {
                "line": 155,
                "column": 2
              }
            },
            "moduleName": "dummy/docs/examples/completion-state/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h5");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("button");
            var el3 = dom.createTextNode("\n        Run to Completion\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("button");
            var el3 = dom.createTextNode("\n        Run until Error\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("button");
            var el3 = dom.createTextNode("\n        Cancel\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("table");
            dom.setAttribute(el1, "class", "u-full-width completion-state-table");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("thead");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("th");
            var el5 = dom.createTextNode("Completion Property");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("th");
            var el5 = dom.createTextNode(".value");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("th");
            var el5 = dom.createTextNode(".error");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tbody");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [3]);
            var element2 = dom.childAt(element1, [1]);
            var element3 = dom.childAt(element1, [3]);
            var element4 = dom.childAt(element1, [5]);
            var morphs = new Array(8);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            morphs[1] = dom.createAttrMorph(element2, 'onclick');
            morphs[2] = dom.createAttrMorph(element2, 'class');
            morphs[3] = dom.createAttrMorph(element3, 'onclick');
            morphs[4] = dom.createAttrMorph(element3, 'class');
            morphs[5] = dom.createAttrMorph(element4, 'onclick');
            morphs[6] = dom.createAttrMorph(element4, 'class');
            morphs[7] = dom.createMorphAt(dom.childAt(fragment, [5, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "task.name", ["loc", [null, [109, 8], [109, 21]]], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "task", ["loc", [null, [112, 32], [112, 36]]], 0, 0, 0, 0], false], [], ["loc", [null, [null, null], [112, 44]]], 0, 0], 0, 0, 0, 0], ["attribute", "class", ["subexpr", "if", [["get", "task.isIdle", ["loc", [null, [113, 19], [113, 30]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [113, 49]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "task", ["loc", [null, [116, 32], [116, 36]]], 0, 0, 0, 0], true], [], ["loc", [null, [null, null], [116, 43]]], 0, 0], 0, 0, 0, 0], ["attribute", "class", ["subexpr", "if", [["get", "task.isIdle", ["loc", [null, [117, 19], [117, 30]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [117, 49]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "cancel-all", [["get", "task", ["loc", [null, [120, 35], [120, 39]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [120, 41]]], 0, 0], 0, 0, 0, 0], ["attribute", "class", ["subexpr", "if", [["get", "task.isRunning", ["loc", [null, [121, 19], [121, 33]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [121, 52]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "taskProperties", ["loc", [null, [135, 16], [135, 30]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [135, 8], [151, 17]]]]],
          locals: ["task"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 107,
              "column": 0
            },
            "end": {
              "line": 156,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/completion-state/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "with", [["subexpr", "get", [["get", "this", ["loc", [null, [108, 15], [108, 19]]], 0, 0, 0, 0], ["get", "taskName", ["loc", [null, [108, 20], [108, 28]]], 0, 0, 0, 0]], [], ["loc", [null, [108, 10], [108, 29]]], 0, 0]], [], 0, null, ["loc", [null, [108, 2], [155, 11]]]]],
        locals: ["taskName"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 158,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/completion-state/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Beta: Completion State");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("\n    INCUBATING FEATURE: we definitely want this feature but there are\n    a few things to sort out before it's shipped (and @machty would\n    appreciate feedback :)\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    Outstanding Issue 1: right now taskInstances expose .value and .error,\n    which allows for idiomatic myTask.last.value, etc., but it's not clear\n    whether cancelations should should show up within .error, or some other\n    property name.\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    Outstanding Issue 2: erroring tasks still bubble exceptions to the top\n    unless you manually do myTask.perform().then(..., ...), which opts you\n    into handling errors yourself. This opt-in behavior makes sense, but\n    now that we expose .error as a template-bindable property, and now that\n    we're advertising Completion State as idiomatic ember-concurrency usage,\n    there should be some way to opt-in/out of these errors bubbling to the top.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  If you want to display the result of a task (e.g. displaying a success\n  or \"Try Again\" banner), generally speaking, you have two options:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".set");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" the success or error result to some property from within the task");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Use the Completion State properties automatically supplied by the Task object,\n      as described below.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("TaskInstance.value and TaskInstance.error");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The value returned from ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("someTask.perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is\n  a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("TaskInstance");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" — a single execution of that task.\n  When a TaskInstance finishes running, it will set one of two\n  properties, depending on whether it ran to completion, was canceled,\n  or an error was thrown:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".value");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the value returned from the task");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".error");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": the error thrown from the task or a TaskCancelation error");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Assuming you've saved the TaskInstance returned from a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  to some property that the template can see, you could use\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".value");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" or ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".error");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to display success or error\n  banners, e.g. when a form is submitted. But while there may be some use\n  cases that require manually stashing the TaskInstance, Task objects\n  already expose properties that give you access to that TaskInstance\n  so that you don't have to stash it yourself.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("TaskInstance properties on the Task object");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The Task object, in addition to exposing helpful properties like\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("isRunning");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", exposes a handful\n  of properties to point to TaskInstances that have been performed.\n  Because there are many different use cases for when to display and hide\n  success and error UI, there cannot just be one single property to\n  rule them all, but the following list has been ordered by the\n  most common task instances you'd want to use.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("last");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": this points to the most recent TaskInstance that\n    started running (so any ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("drop");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("ped task instances won't show up here,\n    and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("enqueue");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("d task instances will only show up once they start\n    running). ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask.last.value");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask.last.error");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    start off null when the task instance starts running, and then get set\n    when the task instance returns/throws/is canceled.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("lastSuccessful");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": this gets set when the task\n    runs to completion, i.e. it returned a value.\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask.lastSuccessful.value");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" is the value returned from\n    the most recent ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask.perform");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("lastErrored");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(": this gets set when the task\n    threw an error (or yielded a promise that rejected).\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask.lastErrored.error");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" is the error of the\n    the most recent ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask.perform");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    The other less common properties available are\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("lastComplete");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("lastPerformed");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(",\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("lastIncomplete");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("lastCanceled");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Show less common properties\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [24]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 26, 26, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "checkbox", "checked", ["subexpr", "@mut", [["get", "showLessCommon", ["loc", [null, [104, 34], [104, 48]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [104, 2], [104, 50]]], 0, 0], ["block", "each", [["get", "tasks", ["loc", [null, [107, 8], [107, 13]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [107, 0], [156, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 2
            },
            "end": {
              "line": 44,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/examples/decorating-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createElementMorph(element1);
          morphs[2] = dom.createMorphAt(element1, 1, 1);
          return morphs;
        },
        statements: [["attribute", "class", ["subexpr", "if", [["get", "task.isIdle", ["loc", [null, [41, 47], [41, 58]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [41, 77]]], 0, 0], 0, 0, 0, 0], ["element", "action", [["get", "task.perform", ["loc", [null, [41, 21], [41, 33]]], 0, 0, 0, 0]], [], ["loc", [null, [41, 12], [41, 35]]], 0, 0], ["content", "task.name", ["loc", [null, [42, 6], [42, 19]]], 0, 0, 0, 0]],
        locals: ["task"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 62,
              "column": 2
            },
            "end": {
              "line": 66,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/examples/decorating-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createElementMorph(element0);
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "class", ["subexpr", "if", [["get", "task.performWillSucceed", ["loc", [null, [63, 47], [63, 70]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [63, 89]]], 0, 0], 0, 0, 0, 0], ["element", "action", [["get", "task.perform", ["loc", [null, [63, 21], [63, 33]]], 0, 0, 0, 0]], [], ["loc", [null, [63, 12], [63, 35]]], 0, 0], ["content", "task.name", ["loc", [null, [64, 6], [64, 19]]], 0, 0, 0, 0]],
        locals: ["task"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 74,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/decorating-tasks/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Decorating (or Composing) Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Sometimes you'll want to write a task that simply runs\n  another task, but with some added behavior. One example\n  is a button with a cooldown period after the underyling\n  task has finished running. In such a case, it might be\n  tempting to put the cooldown timer on the underlying\n  task, but if the underlying task is shared between many\n  consumers that ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("don't");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" require that cooldown time,\n  then you'd be foisting your cooldown needs on everyone\n  else who might depend on that shared resource.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ember-concurrency task are composable, such that it's\n  easy to write tasks that decorate another task with added\n  behavior, as shown in the example below:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Shared Task: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The following buttons use the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property of Task\n  to stylize the buttons as clickable. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is false only\n  when the task is actively running, which explains why, when clicking\n  buttons in the top row, only the one you click is stylized as inactive,\n  while the others still look clickable (because they both perform different\n  tasks). In fact, clicking these active-looking\n  buttons while ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("sharedTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is still running will result in those\n  clicks being ignored since the both ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("sharedTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and the tasks\n  with cooldown applied, are configured to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" performs while\n  they're running.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The buttons below use ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".performWillSucceed");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" instead of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  to stylize the buttons as clickable. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".performWillSucceed");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is true\n  when the state of the task is such that calling ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" on it\n  will immediately execute (rather than being dropped or enqueued). While ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  only takes into considering whether the specified task is running,\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".performWillSucceed");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" takes into consideration whether the linked task\n  (via the string arg path to the task) can be performed at this time.\n  This explains why the buttons below ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("all");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are stylized as unclickable when\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("anyone");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is performing ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("sharedTask");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [12]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [17]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 22, 22, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        return morphs;
      },
      statements: [["content", "sharedTask.state", ["loc", [null, [23, 17], [23, 37]]], 0, 0, 0, 0], ["block", "each", [["get", "tasks", ["loc", [null, [40, 10], [40, 15]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [40, 2], [44, 11]]]], ["block", "each", [["get", "tasks", ["loc", [null, [62, 10], [62, 15]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [62, 2], [66, 11]]]], ["inline", "code-snippet", [], ["name", "decorating-tasks.js"], ["loc", [null, [70, 0], [70, 43]]], 0, 0], ["inline", "code-snippet", [], ["name", "decorating-tasks-template-isIdle.hbs"], ["loc", [null, [71, 0], [71, 60]]], 0, 0], ["inline", "code-snippet", [], ["name", "decorating-tasks-template-performWillSucceed.hbs"], ["loc", [null, [72, 0], [72, 72]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 0
            },
            "end": {
              "line": 22,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/encapsulated-task-fun/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h5");
          var el2 = dom.createTextNode("value: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h5");
          var el2 = dom.createTextNode("foo:   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h5");
          var el2 = dom.createTextNode("bar:   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h5");
          var el2 = dom.createTextNode("baz:   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(fragment, [7]), 1, 1);
          return morphs;
        },
        statements: [["content", "t.value", ["loc", [null, [18, 13], [18, 24]]], 0, 0, 0, 0], ["content", "t.foo.last.value", ["loc", [null, [19, 13], [19, 33]]], 0, 0, 0, 0], ["content", "t.bar.last.value", ["loc", [null, [20, 13], [20, 33]]], 0, 0, 0, 0], ["content", "t.baz.last.value", ["loc", [null, [21, 13], [21, 33]]], 0, 0, 0, 0]],
        locals: ["t"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/encapsulated-task-fun/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Experimental: EncapsulatedTasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Normally, you define tasks by passing a generator function to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task(...)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n  Sometimes though, blah blah blah here is an example.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    Do Stuff\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'onclick');
        morphs[1] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "doStuff", ["loc", [null, [12, 28], [12, 35]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [12, 37]]], 0, 0], 0, 0, 0, 0], ["block", "with", [["get", "doStuff.last", ["loc", [null, [17, 8], [17, 20]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [17, 0], [22, 9]]]], ["inline", "code-snippet", [], ["name", "encapsulated-task-fun-controller.js"], ["loc", [null, [25, 0], [25, 59]]], 0, 0], ["inline", "code-snippet", [], ["name", "encapsulated-task-fun-template.hbs"], ["loc", [null, [26, 0], [26, 58]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 56,
              "column": 0
            },
            "end": {
              "line": 61,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/encapsulated-task/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h5");
          var el2 = dom.createTextNode("\n    Uploading to ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(":\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("%\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["content", "uploadFile.last.url", ["loc", [null, [58, 17], [58, 40]]], 0, 0, 0, 0], ["content", "uploadFile.last.progress", ["loc", [null, [59, 4], [59, 32]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 63,
              "column": 0
            },
            "end": {
              "line": 70,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/encapsulated-task/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h5");
          dom.setAttribute(el1, "style", "color: green;");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("\n    Upload to ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(":\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["content", "uploadFile.lastSuccessful.url", ["loc", [null, [66, 14], [66, 47]]], 0, 0, 0, 0], ["content", "uploadFile.lastSuccessful.value", ["loc", [null, [67, 4], [67, 39]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 77,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/encapsulated-task/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Experimental: Encapsulated Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Normally, you define tasks by passing a generator function to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task(...)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n  Often though, you want to be able to expose additional state of the task,\n  e.g. you might want to show the percentage progress of an ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("uploadFile");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" task,\n  but unless you're using the techniques describes below there's no good\n  place to expose that data to the template other than to set some properties\n  on the host object, but then you lose a lot of the benefits of encapsulation\n  in the process.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  In cases like these, you can use Encapsulated Tasks, which behave just\n  like regular tasks, except that they don't have access to the object\n  they're attached to, but rather can only set properties (or emit events)\n  on themselves. Defining Encapsulated Tasks is easy: instead of passing\n  a generator function directly to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task(...)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", you pass an\n  object with a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" method.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n\n\n\n\n  pass an object with a\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" method to the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task(...)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" function\n\n\n  instead of passing\n  a generator function to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task(...)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", you pass an object\n  with a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" method.\n\n  , which are objects with\n  a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" method and other state that you can use in the\n  place of the generator function you normally supply to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n  When you use a EncapsulatedTask, the value of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("this");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" in the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  generator function is the EncapsulatedTask object, which means it's a good place to\n  set encapsulated values specific to that running task instance.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    Start Upload\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Queued Uploads: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [12, 1]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[1] = dom.createAttrMorph(element2, 'onclick');
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [14]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 21, 21, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 23, 23, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "encapsulated-task.js"], ["loc", [null, [22, 0], [22, 44]]], 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "uploadFile", ["loc", [null, [49, 28], [49, 38]]], 0, 0, 0, 0], ["get", "makeRandomUrl", ["loc", [null, [49, 39], [49, 52]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [49, 54]]], 0, 0], 0, 0, 0, 0], ["content", "uploadFile.numQueued", ["loc", [null, [54, 20], [54, 44]]], 0, 0, 0, 0], ["block", "if", [["get", "uploadFile.last", ["loc", [null, [56, 6], [56, 21]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [56, 0], [61, 7]]]], ["block", "if", [["get", "uploadFile.lastSuccessful", ["loc", [null, [63, 6], [63, 31]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [63, 0], [70, 7]]]], ["inline", "code-snippet", [], ["name", "encapsulated-task-controller.js"], ["loc", [null, [74, 0], [74, 55]]], 0, 0], ["inline", "code-snippet", [], ["name", "encapsulated-task-template.hbs"], ["loc", [null, [75, 0], [75, 54]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 2
            },
            "end": {
              "line": 28,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/examples/increment-buttons/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      --Decrease\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 2
            },
            "end": {
              "line": 34,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/examples/increment-buttons/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      Increase++\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 50,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/increment-buttons/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Accelerating Increment / Decrement Buttons");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This example demonstrates a few different concepts:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Tricky time-based operations like acceleration are simplified\n      by the sequential style of task functions");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    You can use ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("(perform taskName)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" in place of anywhere you\n    might want to use a classic Ember action.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Num: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("(Hold down the buttons to accelerate.)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("JavaScript (task)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("JavaScript (button component)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [12]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(fragment, 17, 17, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 21, 21, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 25, 25, contextualElement);
        return morphs;
      },
      statements: [["content", "count", ["loc", [null, [18, 9], [18, 18]]], 0, 0, 0, 0], ["block", "press-and-hold-button", [], ["press", ["subexpr", "perform", [["get", "incrementBy", ["loc", [null, [25, 19], [25, 30]]], 0, 0, 0, 0], -1], [], ["loc", [null, [25, 10], [25, 34]]], 0, 0], "release", ["subexpr", "cancel-all", [["get", "incrementBy", ["loc", [null, [26, 24], [26, 35]]], 0, 0, 0, 0]], [], ["loc", [null, [26, 12], [26, 36]]], 0, 0]], 0, null, ["loc", [null, [24, 2], [28, 28]]]], ["block", "press-and-hold-button", [], ["press", ["subexpr", "perform", [["get", "incrementBy", ["loc", [null, [31, 19], [31, 30]]], 0, 0, 0, 0], 1], [], ["loc", [null, [31, 10], [31, 33]]], 0, 0], "release", ["subexpr", "cancel-all", [["get", "incrementBy", ["loc", [null, [32, 24], [32, 35]]], 0, 0, 0, 0]], [], ["loc", [null, [32, 12], [32, 36]]], 0, 0]], 1, null, ["loc", [null, [30, 2], [34, 28]]]], ["inline", "code-snippet", [], ["name", "increment-button-task.js"], ["loc", [null, [40, 0], [40, 48]]], 0, 0], ["inline", "code-snippet", [], ["name", "increment-button.js"], ["loc", [null, [44, 0], [44, 43]]], 0, 0], ["inline", "code-snippet", [], ["name", "press-and-hold-buttons.hbs"], ["loc", [null, [48, 0], [48, 50]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("dummy/docs/examples/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/index/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Examples");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  What better way to familiarize yourself with\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" than to check out\n  the slew of examples on the left?\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Also, if you can't find the example or answer you're looking for,\n  please ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://github.com/machty/ember-concurrency/issues");
        var el3 = dom.createTextNode("open an issue");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  or ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://twitter.com/machty");
        var el3 = dom.createTextNode("ping @machty on Twitter");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and\n  he'll cook one up for you :).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 27
            },
            "end": {
              "line": 4,
              "column": 100
            }
          },
          "moduleName": "dummy/docs/examples/joining-tasks-2/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Awaiting Multiple Child Tasks");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 6
              },
              "end": {
                "line": 25,
                "column": 6
              }
            },
            "moduleName": "dummy/docs/examples/joining-tasks-2/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        Word: ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "ti.value", ["loc", [null, [24, 14], [24, 26]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/joining-tasks-2/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "progress-outer");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "progress-inner");
          var el3 = dom.createTextNode("\n      Progress: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("%\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["attribute", "style", ["subexpr", "progress-style", [["get", "ti.percent", ["loc", [null, [21, 55], [21, 65]]], 0, 0, 0, 0], ["get", "ti.id", ["loc", [null, [21, 66], [21, 71]]], 0, 0, 0, 0], ["get", "colors", ["loc", [null, [21, 72], [21, 78]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [21, 80]]], 0, 0], 0, 0, 0, 0], ["content", "ti.percent", ["loc", [null, [22, 16], [22, 30]]], 0, 0, 0, 0], ["block", "if", [["get", "ti.value", ["loc", [null, [23, 12], [23, 20]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [23, 6], [25, 13]]]]],
        locals: ["ti"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/joining-tasks-2/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Awaiting Multiple Child Tasks (or, cancelable Promise.all, Promise.race)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This is a rewrite of the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  example, using encapsulated-tasks and completion state on task objects.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Status: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("all()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("race()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [8]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [6]), 1, 1);
        morphs[2] = dom.createAttrMorph(element2, 'onclick');
        morphs[3] = dom.createAttrMorph(element3, 'onclick');
        morphs[4] = dom.createMorphAt(fragment, 11, 11, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["docs.examples.joining-tasks"], [], 0, null, ["loc", [null, [4, 27], [4, 100]]]], ["content", "status", ["loc", [null, [10, 12], [10, 22]]], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "parent", ["loc", [null, [14, 28], [14, 34]]], 0, 0, 0, 0], "all"], [], ["loc", [null, [null, null], [14, 42]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "parent", ["loc", [null, [15, 28], [15, 34]]], 0, 0, 0, 0], "race"], [], ["loc", [null, [null, null], [15, 43]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "childTasks", ["loc", [null, [19, 8], [19, 18]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [19, 0], [28, 9]]]], ["inline", "code-snippet", [], ["name", "joining-tasks-2.js"], ["loc", [null, [30, 0], [30, 42]]], 0, 0], ["inline", "code-snippet", [], ["name", "joining-tasks-2-template.hbs"], ["loc", [null, [31, 0], [31, 52]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 41,
                "column": 6
              },
              "end": {
                "line": 43,
                "column": 6
              }
            },
            "moduleName": "dummy/docs/examples/joining-tasks/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        Word: ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "tracker.word", ["loc", [null, [42, 14], [42, 30]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 0
            },
            "end": {
              "line": 46,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/joining-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "progress-outer");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "progress-inner");
          var el3 = dom.createTextNode("\n      Progress: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("%\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["attribute", "style", ["subexpr", "progress-style", [["get", "tracker.percent", ["loc", [null, [39, 55], [39, 70]]], 0, 0, 0, 0], ["get", "tracker.id", ["loc", [null, [39, 71], [39, 81]]], 0, 0, 0, 0], ["get", "colors", ["loc", [null, [39, 82], [39, 88]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [39, 90]]], 0, 0], 0, 0, 0, 0], ["content", "tracker.percent", ["loc", [null, [40, 16], [40, 35]]], 0, 0, 0, 0], ["block", "if", [["get", "tracker.word", ["loc", [null, [41, 12], [41, 24]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [41, 6], [43, 13]]]]],
        locals: ["tracker"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 51,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/joining-tasks/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Awaiting Multiple Child Tasks (or, cancelable Promise.all, Promise.race)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" provides Task-aware variants of\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all");
        var el3 = dom.createTextNode("Promise.all");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race");
        var el3 = dom.createTextNode("Promise.race");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  which can be used in cases where a parent task wants to wait\n  for multiple child tasks to run to completion (or throw an error)\n  before continuing onward. The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  variants both have the added benefit that if the parent task is canceled (or restarts),\n  all of the child tasks will be automatically canceled. Similarly,\n  in the case of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("all()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  if any of the child tasks throws an error, all other child tasks\n  are immediately canceled.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The example below can be started (or restarted) using either\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("all()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to wait for all child tasks to run to completion,\n  or ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("race()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to wait for the first. Note that how, in both cases,\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".maxConcurrency(3)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ensures that only 3 progress tasks\n  run at a time, but if you restart the task while it's running, it immediately\n  starts 3 tasks after canceling the previous ones.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Status: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("all()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("race()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [10]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[1] = dom.createAttrMorph(element2, 'onclick');
        morphs[2] = dom.createAttrMorph(element3, 'onclick');
        morphs[3] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 17, 17, contextualElement);
        return morphs;
      },
      statements: [["content", "status", ["loc", [null, [28, 12], [28, 22]]], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "parent", ["loc", [null, [32, 28], [32, 34]]], 0, 0, 0, 0], "all"], [], ["loc", [null, [null, null], [32, 42]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "parent", ["loc", [null, [33, 28], [33, 34]]], 0, 0, 0, 0], "race"], [], ["loc", [null, [null, null], [33, 43]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "trackers", ["loc", [null, [37, 8], [37, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [37, 0], [46, 9]]]], ["inline", "code-snippet", [], ["name", "joining-tasks.js"], ["loc", [null, [48, 0], [48, 40]]], 0, 0], ["inline", "code-snippet", [], ["name", "joining-tasks-template.hbs"], ["loc", [null, [49, 0], [49, 50]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 7
            },
            "end": {
              "line": 16,
              "column": 70
            }
          },
          "moduleName": "dummy/docs/examples/loading-ui/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Managing Task Concurrency");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 2
            },
            "end": {
              "line": 25,
              "column": 36
            }
          },
          "moduleName": "dummy/docs/examples/loading-ui/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(" Answer: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "result", ["loc", [null, [25, 25], [25, 35]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 8
            },
            "end": {
              "line": 35,
              "column": 8
            }
          },
          "moduleName": "dummy/docs/examples/loading-ui/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          Ask\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 8
            },
            "end": {
              "line": 38,
              "column": 8
            }
          },
          "moduleName": "dummy/docs/examples/loading-ui/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          Thinking...\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "fa-icon", ["spinner"], ["spin", true], ["loc", [null, [37, 10], [37, 41]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 47,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/loading-ui/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Loading UI While a Task is Running");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Reining in undesired concurrency is partly what ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  has to offer. The other part is making it easy to build UI around\n  asynchronous tasks.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  For simple cases where you just need to display a loading dialog or disable a button\n  while a task is running, you can make use of the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".isIdle");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property of\n  a task. This property is false when the task is running, and true otherwise. This eliminates\n  a lot of the boilerplate of setting a property at the beginning of some async operation,\n  and unsetting when the operation completes. Also, because the task in the example\n  below uses the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" modifier\n  (see ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("),\n  there's no need to write a guard at the beginning of the task to return early if\n  the task is already running.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  What is the meaning of life?\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [10, 2]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [4]), 5, 5);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[2] = dom.createAttrMorph(element0, 'class');
        morphs[3] = dom.createAttrMorph(element0, 'onclick');
        morphs[4] = dom.createMorphAt(element0, 1, 1);
        morphs[5] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["docs.task-concurrency"], [], 0, null, ["loc", [null, [16, 7], [16, 70]]]], ["block", "if", [["get", "result", ["loc", [null, [25, 8], [25, 14]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [25, 2], [25, 43]]]], ["attribute", "class", ["subexpr", "if", [["get", "askQuestion.isIdle", ["loc", [null, [31, 21], [31, 39]]], 0, 0, 0, 0], "button-primary"], [], ["loc", [null, [null, null], [31, 58]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "askQuestion", ["loc", [null, [32, 22], [32, 33]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [32, 35]]], 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "askQuestion.isIdle", ["loc", [null, [33, 14], [33, 32]]], 0, 0, 0, 0]], [], 2, 3, ["loc", [null, [33, 8], [38, 15]]]], ["inline", "code-snippet", [], ["name", "loading-ui-controller.js"], ["loc", [null, [43, 0], [43, 48]]], 0, 0], ["inline", "code-snippet", [], ["name", "ask-button.hbs"], ["loc", [null, [45, 0], [45, 38]]], 0, 0]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 57,
                  "column": 8
                },
                "end": {
                  "line": 61,
                  "column": 8
                }
              },
              "moduleName": "dummy/docs/examples/modal-fun/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "u-pull-left");
              var el2 = dom.createTextNode("\n            ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("button");
              var el3 = dom.createTextNode("Prev");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element1, 'onclick');
              return morphs;
            },
            statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "modal.prev", ["loc", [null, [59, 38], [59, 48]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [59, 50]]], 0, 0], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 63,
                  "column": 8
                },
                "end": {
                  "line": 67,
                  "column": 8
                }
              },
              "moduleName": "dummy/docs/examples/modal-fun/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "u-pull-right");
              var el2 = dom.createTextNode("\n            ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("button");
              var el3 = dom.createTextNode("Next");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element0, 'onclick');
              return morphs;
            },
            statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "modal.next", ["loc", [null, [65, 38], [65, 48]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [65, 50]]], 0, 0], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 45,
                "column": 2
              },
              "end": {
                "line": 70,
                "column": 2
              }
            },
            "moduleName": "dummy/docs/examples/modal-fun/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "fun-modal-container");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "row");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "u-pull-right");
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("button");
            var el5 = dom.createTextNode("Close");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("h1");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("p");
            var el3 = dom.createTextNode("Wat wat wat");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "row");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var element3 = dom.childAt(element2, [1, 1, 1]);
            var element4 = dom.childAt(element2, [7]);
            var morphs = new Array(4);
            morphs[0] = dom.createAttrMorph(element3, 'onclick');
            morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 0, 0);
            morphs[2] = dom.createMorphAt(element4, 1, 1);
            morphs[3] = dom.createMorphAt(element4, 3, 3);
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "cancel-all", [["get", "modal.task", ["loc", [null, [49, 39], [49, 49]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [49, 51]]], 0, 0], 0, 0, 0, 0], ["content", "modal.currentState.title", ["loc", [null, [53, 10], [53, 38]]], 0, 0, 0, 0], ["block", "if", [["get", "modal.prev", ["loc", [null, [57, 14], [57, 24]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [57, 8], [61, 15]]]], ["block", "if", [["get", "modal.next", ["loc", [null, [63, 14], [63, 24]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [63, 8], [67, 15]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 0
            },
            "end": {
              "line": 71,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/modal-fun/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "modal-dialog", [], [], 0, null, ["loc", [null, [45, 2], [70, 19]]]]],
        locals: ["modal"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 78,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/modal-fun/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Experimental: Modals");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Bear with me here.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This is an experiment combining many different concepts of ember-concurrency,\n  some old, some new/unrelease.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  State machines generally operate on the principle that you can\n  only be in a single (possible nested) state at a time.\n  Given that ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" makes it possible/easy\n  to constrain the concurrency of tasks (and between tasks using\n  task groups), what's the fundamental difference between a state\n  in a state machine vs a task that can't run at the same time\n  as sibling tasks? Answer: not a whole lot!\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The following ember-concurrency concepts are used to implement\n  the example below:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Using taskGroups to group tasks (states) that shouldn't\n    be allowed to run at the same time.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("POJO tasks / encapsulated tasks / stateful tasks / whatever we end up calling them");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    Accessing the most recent performed task (entered state) via nameOfTask.last*\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    Open Wizard\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [12, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element5, 'onclick');
        morphs[1] = dom.createAttrMorph(element5, 'class');
        morphs[2] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 17, 17, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 19, 19, contextualElement);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "openWizard", ["loc", [null, [38, 28], [38, 38]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [38, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "class", ["subexpr", "if", [["get", "openWizard.isIdle", ["loc", [null, [39, 21], [39, 38]]], 0, 0, 0, 0], "clickable"], [], ["loc", [null, [null, null], [39, 52]]], 0, 0], 0, 0, 0, 0], ["block", "with", [["get", "openWizard.lastRunning", ["loc", [null, [44, 8], [44, 30]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [44, 0], [71, 9]]]], ["inline", "code-snippet", [], ["name", "modal-fun-controller.js"], ["loc", [null, [75, 0], [75, 47]]], 0, 0], ["inline", "code-snippet", [], ["name", "modal-fun-template.hbs"], ["loc", [null, [76, 0], [76, 46]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 5
            },
            "end": {
              "line": 21,
              "column": 41
            }
          },
          "moduleName": "dummy/docs/examples/observables/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["content", "v.message", ["loc", [null, [21, 28], [21, 41]]], 0, 0, 0, 0]],
        locals: ["v"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/observables/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Experimental: Observables");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" integrates with Observables\n  and lets you apply the same concurrency constraints to\n  subscriptions to Observables that you could apply to a task —\n  just as you can configure a Task to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" new\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("s while the task is already running, so can\n  you configure the subscription to an async sequence of events\n  (the Observable) to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" events while the\n  previous event is being handled (or use any other task modifier\n  you like).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Nested loop of Observable range of numbers");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Compute Stuff");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("pre");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Subscribing to Observable of Evented events");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Status: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Trigger Foo");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var element1 = dom.childAt(fragment, [18]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element0, 'onclick');
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [10]), 0, 0);
        morphs[2] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [16]), 1, 1);
        morphs[4] = dom.createElementMorph(element1);
        morphs[5] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "computeStuff", ["loc", [null, [19, 26], [19, 38]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [19, 40]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "values", ["loc", [null, [21, 13], [21, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [21, 5], [21, 50]]]], ["inline", "code-snippet", [], ["name", "observables-timetable.js"], ["loc", [null, [23, 0], [23, 48]]], 0, 0], ["content", "fooStatus", ["loc", [null, [27, 12], [27, 25]]], 0, 0, 0, 0], ["element", "action", ["triggerFoo"], [], ["loc", [null, [29, 8], [29, 31]]], 0, 0], ["inline", "code-snippet", [], ["name", "observables-evented.js"], ["loc", [null, [31, 0], [31, 46]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
      this._super.apply(this, arguments);
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 4
              },
              "end": {
                "line": 29,
                "column": 4
              }
            },
            "moduleName": "dummy/docs/examples/route-tasks/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      Thing ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "id", ["loc", [null, [28, 12], [28, 18]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 2
            },
            "end": {
              "line": 31,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/examples/route-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["docs.examples.route-tasks.detail", ["get", "id", ["loc", [null, [27, 50], [27, 52]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [27, 4], [29, 16]]]]],
        locals: ["id"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 59,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/route-tasks/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Tasks on Ember.Route (and other long-lived objects)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" tasks are scoped to the lifetime of\n  the object they live on, so if that object is destroyed, all of the\n  tasks attached to it are canceled.  This is very convenient when\n  writing tasks on object with finite lifetimes, like Components, but certain Ember objects, like\n  Routes (and Controllers), are never actually destroyed, but even\n  if you can't rely on object destruction to cancel a task,\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" makes it easy to run\n  tasks between lifecycle events other than ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("init");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("destroy");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Try clicking the links below. As the URL changes, you should see\n  notifications about the server polling status changing. If you\n  leave this route (by going to another page on this site), you'll\n  see that the polling task is being properly canceled.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    We use the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "https://github.com/aexmachina/ember-notify");
        var el4 = dom.createTextNode("ember-notify");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Ember Addon\n    to display notifications using the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("notify");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" service it provides.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("setupController");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" kicks off the task with the current model id\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    The ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("pollServerForChanges");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" task polls the server in a loop,\n    and uses the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("finally");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" block to notify when it is being canceled.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    We use ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("restartable");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" to ensure that only one instance of the\n    task is running at a time, hence any time ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("setupController");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    performs the task, any prior instances are canceled.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    We use ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".cancelOn('deactivate')");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" to make sure the task cancels\n    when the user leaves the route.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        return morphs;
      },
      statements: [["block", "each", [["get", "ids", ["loc", [null, [25, 10], [25, 13]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [25, 2], [31, 11]]]], ["inline", "code-snippet", [], ["name", "detail-route.js"], ["loc", [null, [57, 0], [57, 39]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 10
            },
            "end": {
              "line": 5,
              "column": 62
            }
          },
          "moduleName": "dummy/docs/examples/task-groups/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Modifiers");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 22
            },
            "end": {
              "line": 14,
              "column": 74
            }
          },
          "moduleName": "dummy/docs/examples/task-groups/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Modifiers");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 59,
              "column": 0
            },
            "end": {
              "line": 61,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/examples/task-groups/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "task-group-example", [], ["taskGroup", ["subexpr", "@mut", [["get", "group", ["loc", [null, [60, 33], [60, 38]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [60, 2], [60, 40]]], 0, 0]],
        locals: ["group"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 64,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/examples/task-groups/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Task Groups (beta)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  To constrain the concurrency of a single task,\n  you use ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  but what if you want to ensure that\n  two (or more) separate tasks don't run at the same time?\n  In these cases, you use ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Task Groups");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(":\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Declare a task group via ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("nameOfGroup: taskGroup()");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    Apply any desired ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    to that task group (just as you would with a normal task).\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    Append ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".group('nameOfGroup')");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" to any tasks you want to\n    be considered part of the group.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Whereas using a modifier like ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" on a single task\n  prevents that single task from running concurrently, using\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" on a Task Group ensures that only one\n  task in that Task Group can be running at any given time.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Cancelation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Additionally, just as you can ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("cancelAll");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" running\n  instances of a task, the Task Group object exposes the\n  same ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("cancelAll");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" method (and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("cancel-all");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  template helper) which will cancel any running task instances\n  that belong to that group.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Nested Task Groups");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Task Groups can be ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode(".group()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("ed to other\n  Task Groups, forming a hierarchy with Tasks at the leaves.\n  In such a hierarchy, all Tasks will share the concurrency\n  constraints of the root task group\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Examples");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The following examples demonstrate nested task groups\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [4, 3]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 22, 22, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["docs.task-concurrency"], [], 0, null, ["loc", [null, [5, 10], [5, 62]]]], ["block", "link-to", ["docs.task-concurrency"], [], 1, null, ["loc", [null, [14, 22], [14, 74]]]], ["inline", "code-snippet", [], ["name", "task-groups.js"], ["loc", [null, [55, 0], [55, 38]]], 0, 0], ["inline", "code-snippet", [], ["name", "task-group-component.js"], ["loc", [null, [56, 0], [56, 47]]], 0, 0], ["block", "each", [["get", "taskGroups", ["loc", [null, [59, 8], [59, 18]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [59, 0], [61, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("dummy/docs/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 96,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/index/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Introduction");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is a small but powerful library that supplements\n  Ember's existing tools and conventions for handling concurrency and\n  asynchrony.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  For a high-level view of what ember-concurrency can do for your app,\n  check out this article:\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://medium.com/@machty/ember-concurrency-the-solution-to-so-many-problems-you-never-knew-you-had-cce6d7731ba9#.e6r0iv44u");
        var el3 = dom.createTextNode("\n    ember-concurrency: the solution to so many problems you never knew you had");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n  If you'd prefer a video introduction to the ideas and concepts behind ember-concurrency,\n  check out the video below from the\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://twitter.com/EmberMeetup");
        var el3 = dom.createTextNode("Ember Global Meetup");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  (");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "http://alexmatchneer.com/ember-concurrency-global-meetup-slides/");
        var el3 = dom.createTextNode("slides available here");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("):\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "style", "text-align: center");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("iframe");
        dom.setAttribute(el2, "src", "https://player.vimeo.com/video/162329769");
        dom.setAttribute(el2, "width", "500");
        dom.setAttribute(el2, "height", "281");
        dom.setAttribute(el2, "frameborder", "0");
        dom.setAttribute(el2, "webkitallowfullscreen", "");
        dom.setAttribute(el2, "mozallowfullscreen", "");
        dom.setAttribute(el2, "allowfullscreen", "");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Key Ideas / Goals");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("It should be easy to write ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("cancelable");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" asynchronous operations (this is hard to do with Promises).");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("It should be easy to prevent two or more async operations from happening at the same time (this is hard to do with Promises and Observables).");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("Minimize boilerplate");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("maximize implicit state");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" so that common UI tasks like\n      displaying loading spinners or styling inactive buttons require as little code as possible.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("The API should feel familiar and \"at home\" for Ember developers.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" enables you to write ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Tasks");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", which are asynchronous,\n  cancelable operations that are bound to the lifetime of the object they live on,\n  which means when the host object is destroyed (e.g. a component is unrendered),\n  the task is automatically canceled. Here is an example of a task:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The example above demonstrates a few things:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    Tasks are implemented using\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*");
        var el4 = dom.createTextNode("ES6 Generator Function syntax");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    and the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("yield");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" keyword\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    This syntax enables writing async code in a synchronous looking manner\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    It is trivial to restart a task without having to manually cancel the previous task.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Without Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  If you were to rewrite the above example without using tasks,\n  it would look something like this:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  As you can see, it takes a surprising amount of code to handle\n  all of the corner cases when dealing with async code:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    You have to stop the currently running operation before starting a new\n    operation in its place; in other words, you need to constrain concurrency\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    You have to stop the operation when the parent object is destroyed\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    You have to break down each step of the asynchronous operation into\n    individually cancelable units\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 28, 28, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 30, 30, contextualElement);
        return morphs;
      },
      statements: [["content", "intro-task", ["loc", [null, [44, 0], [44, 14]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "intro-task.js"], ["loc", [null, [46, 0], [46, 37]]], 0, 0], ["content", "intro-task-oldschool", ["loc", [null, [73, 0], [73, 24]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "intro-task-oldschool.js"], ["loc", [null, [75, 0], [75, 47]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/docs/installation/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/installation/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Installation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Within your ember-cli project folder, run the following:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "ember-install.sh"], ["loc", [null, [7, 0], [7, 40]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 61,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/task-concurrency-advanced/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Using ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".maxConcurrency(N)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The examples on the previous page limit the concurrency of a task to 1 — only\n  one instance of a task can run at a time. Most of the time, this\n  is exactly what you want.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  There are some cases, however, when you might want to limit\n  the number of concurrently running task instances to a number greater\n  than 1.  In such cases, you can use the task modifier\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".maxConcurrency(n)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to opt into a specific maximum\n  concurrency other than 1.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The examples below use the same task modifiers as the ones on the previous\n  page, but with ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".maxConcurrency(3)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" applied to them: they each\n  allow 3 running instances before enqueuing, canceling, or dropping\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("s.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("restartable with .maxConcurrency(3)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  When concurrency exceeds maxConcurrency, the oldest running task is canceled.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    TODO: while restartable is an excellent name when maxConcurrency\n    is 1, it poorly describes the behavior for values greater than 1.\n    A better name in this case might be .sliding(), as in sliding buffer.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("enqueue with .maxConcurrency(3)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("drop with .maxConcurrency(3)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode(".keepLatest() with .maxConcurrency(3)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    Thanks to ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "https://github.com/ef4");
        var el4 = dom.createTextNode("Edward Faulkner");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" for providing\n    a starting point for the graphs :)\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 28, 28, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "shared-tasks-concurrent.js"], ["loc", [null, [24, 0], [24, 50]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "restartableTask3", ["loc", [null, [32, 25], [32, 41]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [32, 0], [32, 43]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "enqueuedTask3", ["loc", [null, [45, 25], [45, 38]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [45, 0], [45, 40]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "droppingTask3", ["loc", [null, [49, 25], [49, 38]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [49, 0], [49, 40]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "keepLatestTask3", ["loc", [null, [53, 25], [53, 40]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [53, 0], [53, 42]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 54,
              "column": 14
            },
            "end": {
              "line": 54,
              "column": 78
            }
          },
          "moduleName": "dummy/docs/task-concurrency/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Debounced Auto-Search");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 83,
              "column": 18
            },
            "end": {
              "line": 83,
              "column": 69
            }
          },
          "moduleName": "dummy/docs/task-concurrency/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Loading UI");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 108,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/task-concurrency/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Managing Task Concurrency");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  By default, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" tasks run concurrently\n  — if you call ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("myTask.perform(); myTask.perform();");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  two instances of the task will run at the same time (unless the object\n  they live on is destroyed, in which case they'll be canceled).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Often, you want to guarantee that no more than one instance of a task\n  runs at the same time; for instance, if you have a task that saves\n  model state to the server, you probably don't want that task to run\n  concurrently — you want it to run sequentially, or you might\n  want to ignore attempts to perform the task if it's already running.\n  Manually enforcing these constraints is tricky and often results\n  in redundant, error-prone boilerplate, but ember-concurrency\n  makes it easy to rein in this undesired concurrency with the\n  modifiers described below.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Examples");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  All of the examples below run the same task function (which\n  just pauses for a moment and then completes), but with\n  different task modifiers applied:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Default Behavior: Tasks Run Concurrently");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Tap the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task.perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" button a few times. Note how\n  the lifetimes of each task overlap, and each task runs to completion.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("restartable");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("restartable");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" modifier ensures that only one instance\n  of a task is running by canceling any currently-running tasks and starting\n  a new task instance immediately. Note how there is no task overlap,\n  and how currently running tasks get canceled\n  if a new task starts before a prior one completes.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    Check out ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" for\n    a practical example of restartable\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("enqueue");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("enqueue");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" modifier ensures that only one instance\n  of a task is running be maintaining a queue of pending tasks and\n  running them sequentially. Note how there is no task overlap, but no\n  tasks are canceled either.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("drop");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" modifier drops tasks that are ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("ed\n  while another is already running. Dropped tasks' functions are never even called.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    Check out the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" example for a common\n    use case for ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("drop");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode(".keepLatest()");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".keepLatest()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" will drop all but the most recent intermediate ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  which is enqueued to run later.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    Use case: you poll the server in a loop, but during the server request,\n    you get some other indication (say, via websockets) that the data is stale\n    and you need to query the server again when the initial request completed.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [22, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 30, 30, contextualElement);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [36, 1]), 1, 1);
        morphs[6] = dom.createMorphAt(fragment, 38, 38, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 46, 46, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "shared-tasks.js"], ["loc", [null, [30, 0], [30, 39]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "defaultTask", ["loc", [null, [39, 25], [39, 36]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [39, 0], [39, 38]]], 0, 0], ["block", "link-to", ["docs.examples.autocomplete"], [], 0, null, ["loc", [null, [54, 14], [54, 78]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "restartableTask", ["loc", [null, [60, 25], [60, 40]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [60, 0], [60, 42]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "enqueuedTask", ["loc", [null, [71, 25], [71, 37]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [71, 0], [71, 39]]], 0, 0], ["block", "link-to", ["docs.examples.loading-ui"], [], 1, null, ["loc", [null, [83, 18], [83, 69]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "droppingTask", ["loc", [null, [88, 25], [88, 37]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [88, 0], [88, 39]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "keepLatestTask", ["loc", [null, [106, 25], [106, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [106, 0], [106, 41]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("dummy/docs/task-function-syntax/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 76,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/task-function-syntax/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Task Function Syntax");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  When a task is performed, it runs the code in the task function\n  you passed into ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("task()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". This function must\n  be a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*");
        var el3 = dom.createTextNode("generator function");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  — it must use the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("function *");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" syntax, and cannot\n  be just a regular JavaScript function.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This example demonstrates how, in ember-concurrency, generator\n  functions behave ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("just like regular functions");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". Anything you can\n  do in a regular function, you can do in a generator function.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" keyword");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Much of the power of Tasks is unleashed once you start making\n  use of the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" keyword within generator functions.\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" keyword, when used with a promise, lets you\n  pause execution of your task function until that promise resolves, at\n  which point the task function will continue running from where it\n  had paused.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This example demonstrates how you can ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield timeout(1000)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  to pause execution for 1000 ms (one second). The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("timeout()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  helper function, which ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" provides,\n  simply returns a promise that resolves after the specified number of milliseconds.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  When you ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" a promise, the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" expression\n  evaluates to the resolved value of the promise. In other words, you can\n  set a variable equal to a yielded promise, and when the promise resolves,\n  the task function will resume and the value stored into that variable will\n  be the resolved value of the promise.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  If you ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" a promise that rejects, the task function will\n  throw the rejected value (likely an exception object) from the point in\n  task function where the rejecting promise was yielded. This means you can\n  use ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("try {} catch(e) {} finally {}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" blocks, just as you would\n  for code that runs synchronously.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The behavior of yielding promises within task generator functions\n  is designed to closely follow the behavior of the proposed\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://github.com/tc39/ecmascript-asyncawait");
        var el3 = dom.createTextNode("async/await");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  syntax, but instead of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("async function");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", you use\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("function *");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", and instead of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("await");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", you\n  use ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("yield");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 22, 22, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 28, 28, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 30, 30, contextualElement);
        return morphs;
      },
      statements: [["content", "task-function-syntax-2", ["loc", [null, [17, 0], [17, 26]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "task-function-syntax-2.js"], ["loc", [null, [19, 0], [19, 49]]], 0, 0], ["content", "task-function-syntax-1", ["loc", [null, [39, 0], [39, 26]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "task-function-syntax-1.js"], ["loc", [null, [41, 0], [41, 49]]], 0, 0], ["content", "task-function-syntax-3", ["loc", [null, [51, 0], [51, 26]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "task-function-syntax-3.js"], ["loc", [null, [53, 0], [53, 49]]], 0, 0], ["content", "task-function-syntax-4", ["loc", [null, [63, 0], [63, 26]]], 0, 0, 0, 0], ["inline", "code-snippet", [], ["name", "task-function-syntax-4.js"], ["loc", [null, [65, 0], [65, 49]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 8
            },
            "end": {
              "line": 4,
              "column": 60
            }
          },
          "moduleName": "dummy/docs/task-groups/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Modifiers");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 0
            },
            "end": {
              "line": 39,
              "column": 0
            }
          },
          "moduleName": "dummy/docs/task-groups/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'onclick');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["subexpr", "if", [["get", "task.isIdle", ["loc", [null, [37, 21], [37, 32]]], 0, 0, 0, 0], "clickable"], [], ["loc", [null, [null, null], [37, 46]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "perform", [["get", "task", ["loc", [null, [38, 28], [38, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [38, 34]]], 0, 0], 0, 0, 0, 0], ["content", "task.name", ["loc", [null, [38, 35], [38, 48]]], 0, 0, 0, 0]],
        locals: ["task"],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 45,
              "column": 2
            },
            "end": {
              "line": 47,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/task-groups/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" (");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(")\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["content", "taskInstance.task.name", ["loc", [null, [46, 4], [46, 30]]], 0, 0, 0, 0], ["content", "taskInstance.state", ["loc", [null, [46, 32], [46, 54]]], 0, 0, 0, 0]],
        locals: ["taskInstance"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 54,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/task-groups/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Task Groups");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  While ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  prevent a single task from running concurrently, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Task Groups");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  make it possible to prevent ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("multiple tasks");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" from running at the same time.\n  Using Task Groups is a two-step process:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Define the task group property, e.g. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("nameOfGroup: taskGroup()");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("For each task in the group, use ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".group()");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" to associate\n      the task with the group, e.g. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("myTask: task(...).group('nameOfGroup')");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Once you define a task as part of a task group, you can no longer use\n  other task modifiers like ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" or ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("restartable()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  on that task; instead, just apply those task modifiers to the task group property instead,\n  as demonstrated in the example below.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  In this example, we group related \"chores\" tasks and by using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".drop()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  modifier on the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("taskGroup");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property we ensure that only one\n  chore task runs at a time. In addition to preventing concurrency between multiple\n  tasks, this example also demonstrates how having access to both the\n  state of the task group, as well as its individual members,\n  makes it very easy to build out common UI patterns, such as active/idle states\n  of related buttons in a button bar.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Chores group state: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("\n  Most Recent Chore:\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [14]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [16]), 1, 1);
        morphs[4] = dom.createMorphAt(fragment, 19, 19, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 21, 21, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["docs.task-concurrency"], [], 0, null, ["loc", [null, [4, 8], [4, 60]]]], ["block", "each", [["get", "tasks", ["loc", [null, [36, 8], [36, 13]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [36, 0], [39, 9]]]], ["content", "chores.state", ["loc", [null, [41, 24], [41, 40]]], 0, 0, 0, 0], ["block", "with", [["get", "chores.last", ["loc", [null, [45, 10], [45, 21]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [45, 2], [47, 11]]]], ["inline", "code-snippet", [], ["name", "task-groups.js"], ["loc", [null, [51, 0], [51, 38]]], 0, 0], ["inline", "code-snippet", [], ["name", "task-groups-template.hbs"], ["loc", [null, [52, 0], [52, 48]]], 0, 0]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("dummy/docs/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 14
                },
                "end": {
                  "line": 9,
                  "column": 53
                }
              },
              "moduleName": "dummy/docs/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "entry.title", ["loc", [null, [9, 38], [9, 53]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 12
              }
            },
            "moduleName": "dummy/docs/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["block", "link-to", [["get", "entry.route", ["loc", [null, [9, 25], [9, 36]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [9, 14], [9, 65]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 12
              },
              "end": {
                "line": 12,
                "column": 12
              }
            },
            "moduleName": "dummy/docs/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "entry.title", ["loc", [null, [11, 14], [11, 29]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 18,
                    "column": 16
                  },
                  "end": {
                    "line": 18,
                    "column": 55
                  }
                },
                "moduleName": "dummy/docs/template.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["content", "child.title", ["loc", [null, [18, 40], [18, 55]]], 0, 0, 0, 0]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 16,
                  "column": 14
                },
                "end": {
                  "line": 20,
                  "column": 14
                }
              },
              "moduleName": "dummy/docs/template.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("li");
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
              return morphs;
            },
            statements: [["block", "link-to", [["get", "child.route", ["loc", [null, [18, 27], [18, 38]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [18, 16], [18, 67]]]]],
            locals: ["child"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 12
              },
              "end": {
                "line": 22,
                "column": 12
              }
            },
            "moduleName": "dummy/docs/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("ul");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("            ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "entry.children", ["loc", [null, [16, 22], [16, 36]]], 0, 0, 0, 0]], ["key", "route"], 0, null, ["loc", [null, [16, 14], [20, 23]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 10
            },
            "end": {
              "line": 24,
              "column": 10
            }
          },
          "moduleName": "dummy/docs/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["block", "if", [["get", "entry.route", ["loc", [null, [8, 18], [8, 29]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [8, 12], [12, 19]]]], ["block", "if", [["get", "entry.children", ["loc", [null, [14, 18], [14, 32]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [14, 12], [22, 19]]]]],
        locals: ["entry"],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 39,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "docs row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "three columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "side-menu");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "nine columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var element2 = dom.childAt(element1, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(element2, 1, 1);
        morphs[2] = dom.createMorphAt(element2, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 5, 5);
        morphs[4] = dom.createMorphAt(element2, 7, 7);
        return morphs;
      },
      statements: [["block", "each", [["get", "tableOfContents", ["loc", [null, [6, 18], [6, 33]]], 0, 0, 0, 0]], ["key", "route"], 0, null, ["loc", [null, [6, 10], [24, 19]]]], ["inline", "nav-header", [], ["nextTopic", ["subexpr", "@mut", [["get", "nextTopic", ["loc", [null, [30, 29], [30, 38]]], 0, 0, 0, 0]], [], [], 0, 0], "prevTopic", ["subexpr", "@mut", [["get", "prevTopic", ["loc", [null, [30, 49], [30, 58]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [30, 6], [30, 60]]], 0, 0], ["content", "github-edit", ["loc", [null, [31, 6], [31, 21]]], 0, 0, 0, 0], ["content", "outlet", ["loc", [null, [33, 6], [33, 16]]], 0, 0, 0, 0], ["inline", "nav-header", [], ["nextTopic", ["subexpr", "@mut", [["get", "nextTopic", ["loc", [null, [35, 29], [35, 38]]], 0, 0, 0, 0]], [], [], 0, 0], "prevTopic", ["subexpr", "@mut", [["get", "prevTopic", ["loc", [null, [35, 49], [35, 58]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [35, 6], [35, 60]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("dummy/docs/testing-debugging/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 124,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/testing-debugging/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Testing");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Ember doesn't yet have strong conventions for testing\n  long-term timers and polling loops, and since many of the use cases\n  that ember-concurrency addresses involves heavy use of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("timeout()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(",\n  and often times within a (possibly infinite) loop, it can be difficult\n  to figure out how to test code that makes heavy use of such things\n  within ember-concurrency tasks.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("\n    NOTE: this is an area of active development within the Ember community,\n    particularly amongst ember-concurrency users; in due time we will probably\n    have more official API (possibly in the form of another addon) to help\n    make testing time more manageable, but in the meantime, this page documents\n    some common approaches to testing time with present-day tooling.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("The Problem");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Consider the following (common) pattern for polling a server for changes:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The above example uses ember-concurrency tasks; to demonstrate that these\n  issues aren't limited to ember-concurrency tasks, here is how the same\n  logic might be written without ember-concurrency:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Both of these cases involve a \"poll loop\": on every iteration, do something asynchronous,\n  then pause for some period of time, then repeat.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  If, within an acceptance test, you ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("visit()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("ed the page that\n  causes this loop to start, your acceptance test case would \"hang\" and eventually\n  fail with a QUnit test timeout. The reason this happens is that the Ember testing\n  tools are aware of all timers created via ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Ember.run.later");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (and\n  ember-concurrency's ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("timeout()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" helper internally uses ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Ember.run.later");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("),\n  and will wait for all timers to \"settle\" before allowing the test to proceed.\n  But if you have a timer within a loop, the timers will never settle, and hence\n  your test will hang.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The solution, one way or another, is to \"break\" the timer loop when in a testing environment.\n  Here are all the ways to do that, each with their own problems / tradeoffs:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Insert ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Ember.testing");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" checks in your code");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This is sufficient when it's satisfactory to just test a single\n  iteration of a loop, but a) it won't test that the task continues\n  to loop, and b) it's unfortunate to have to riddle your actual\n  code with testing logic.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Use ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Ember.run.cancelTimers");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" in your test case");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This is the approach used by the ember-concurrency\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://github.com/machty/ember-concurrency/blob/72f70b6c327f5242ca623d61ea0595b5f9093896/tests/helpers/start-app.js#L17-L19");
        var el3 = dom.createTextNode("documentation site tests");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(";\n  since any of the pages on this docs site might demonstrate a live\n  ember-concurrency task with a timer loop, all of the acceptance tests\n  automatically cancel all outstanding timers after 500ms to effectively\n  stop all tasks wherever they're paused.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("No loops, but long timers");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  If you're testing code that just uses long timers, but not necessarily loops,\n  you might still run into the problem of test cases that take too long to complete,\n  or might hit the QUnit timeout. A common solution to this problem is to use much\n  smaller millisecond timer values in a testing environment. You can either do this\n  by checking ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Ember.testing");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" wherever you set a timer, or, more elegantly, you can\n  define common timer values in a config file, import the timer values\n  wherever you need to set a timer, and in test environments, the config\n  file specifies much smaller values so that the timers elapse more quickly.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("The Future");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The above solutions leave much to be desired. Hopefully a definitive solution\n  that produces clear, deterministic, consistent results will emerge from the\n  community. There are some ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://gist.github.com/machty/574457b1f2d993cc5959a1d6d6c74e5b");
        var el3 = dom.createTextNode("ideas");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  floating around, and if you're interested in contributing to the discussion\n  please join the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("#e-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" channel on the Ember Community Slack.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Also, if you're finding success with a testing approach that wasn't mentioned here,\n  please open a GitHub issue with your ideas or open a Pull Request to add\n  additional docs to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "https://github.com/machty/ember-concurrency/blob/master/tests/dummy/app/docs/testing-debugging/template.hbs");
        var el3 = dom.createTextNode("this page");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Debugging");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "http://vanderwijk.info/blog/how-disable-es6-transpilation-emberjs-in-order-have-better-debugging-experience/");
        var el3 = dom.createTextNode("This article");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  provides some nice ideas as to how to improve the debugging experience within ember-concurrency:\n  in particular, by blacklisting \"regenerator\" in your app's Babel configuration,\n  you can avoid Ember transpiling your task generator functions into a somewhat\n  unrecognizable format. Just keep in mind that you should probably only enable\n  this configuration in a development environment, and that whatever browser\n  you're testing on needs to have a spec-compliant implementation of generator\n  functions (Chrome's implementation only became spec-compliant around June, 2016).\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "poll-loop.js"], ["loc", [null, [28, 0], [28, 36]]], 0, 0], ["inline", "code-snippet", [], ["name", "poll-loop-classic.js"], ["loc", [null, [36, 0], [36, 44]]], 0, 0], ["inline", "code-snippet", [], ["name", "poll-loop-break-1.js"], ["loc", [null, [61, 0], [61, 44]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/docs/writing-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 22
            },
            "end": {
              "line": 27,
              "column": 84
            }
          },
          "moduleName": "dummy/docs/writing-tasks/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Task Function Syntax");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 63,
            "column": 0
          }
        },
        "moduleName": "dummy/docs/writing-tasks/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Writing Your First Task");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Step 1: Deciding where the Task will live");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Should you define a task on a Component? Or perhaps a Service?\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  This choice is important because ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Tasks get automatically canceled\n  when the object they live on is destroyed");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n  So if you want the task to cancel when a component is unrendered, define\n  it on a Component class, but if you need it to outlive a component's lifespan,\n  it probably belongs on a Service or Controller.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Step 2: Implementing the task");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Once you've decided where you want a task to live, you can start implementing\n  your task.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The next section on ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" goes\n  into greater detail about the generator function syntax and how you can use it\n  to write tasks.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Step 3: Performing the task");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Now that you've implemented your Task, you'll need some way to actually\n  perform it. You have three options:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    In JavaScript, get a reference to the task and call ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("task.perform(...)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    In your Handlebars template, use the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("perform");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" helper\n    (e.g. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("(perform myTask)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(").\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n    In JavaScript, specify the Ember Events that should cause the task to\n    run using ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("task(...).on(eventName)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(". You can use ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode(".on('init')");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    to create a task the runs as soon as the object it lives on is initialized.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The following example demonstrates all three variants:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Live Example");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [14]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 26, 26, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "writing-tasks.js"], ["loc", [null, [24, 0], [24, 40]]], 0, 0], ["block", "link-to", ["docs.task-function-syntax"], [], 0, null, ["loc", [null, [27, 22], [27, 84]]]], ["content", "start-task-example", ["loc", [null, [60, 0], [60, 22]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 32,
              "column": 2
            }
          },
          "moduleName": "dummy/experimental-prediction/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(", maxConcurrency=");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("isRunning: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("concurrency: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("nextPerformState: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("performWillSucceed: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("performWillDrop: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("performWillEnqueue: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("performWillCancelPrevious: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [3]);
          var morphs = new Array(10);
          morphs[0] = dom.createMorphAt(element0, 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]), 1, 1);
          morphs[5] = dom.createMorphAt(dom.childAt(element1, [7]), 1, 1);
          morphs[6] = dom.createMorphAt(dom.childAt(element1, [9]), 1, 1);
          morphs[7] = dom.createMorphAt(dom.childAt(element1, [11]), 1, 1);
          morphs[8] = dom.createMorphAt(dom.childAt(element1, [13]), 1, 1);
          morphs[9] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["content", "task.name", ["loc", [null, [21, 8], [21, 21]]], 0, 0, 0, 0], ["content", "task._maxConcurrency", ["loc", [null, [21, 38], [21, 62]]], 0, 0, 0, 0], ["inline", "caps-bool", [["get", "task.isRunning", ["loc", [null, [23, 33], [23, 47]]], 0, 0, 0, 0]], [], ["loc", [null, [23, 21], [23, 49]]], 0, 0], ["content", "task.concurrency", ["loc", [null, [24, 23], [24, 43]]], 0, 0, 0, 0], ["content", "task.nextPerformState", ["loc", [null, [25, 28], [25, 53]]], 0, 0, 0, 0], ["inline", "caps-bool", [["get", "task.performWillSucceed", ["loc", [null, [26, 42], [26, 65]]], 0, 0, 0, 0]], [], ["loc", [null, [26, 30], [26, 67]]], 0, 0], ["inline", "caps-bool", [["get", "task.performWillDrop", ["loc", [null, [27, 39], [27, 59]]], 0, 0, 0, 0]], [], ["loc", [null, [27, 27], [27, 61]]], 0, 0], ["inline", "caps-bool", [["get", "task.performWillEnqueue", ["loc", [null, [28, 42], [28, 65]]], 0, 0, 0, 0]], [], ["loc", [null, [28, 30], [28, 67]]], 0, 0], ["inline", "caps-bool", [["get", "task.performWillCancelPrevious", ["loc", [null, [29, 49], [29, 79]]], 0, 0, 0, 0]], [], ["loc", [null, [29, 37], [29, 81]]], 0, 0], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "task", ["loc", [null, [31, 29], [31, 33]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [31, 4], [31, 35]]], 0, 0]],
        locals: ["task"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "dummy/experimental-prediction/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Experimental: all derivable state about a task");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    Because the \"buffering policy\" for a task is declaratively\n    specified up front (via task modifiers like drop, enqueue),\n    someone who wants to .perform a task can know up front whether\n    perform()ing that task right now would 1) immediately execute\n    the task instance, 2) immediately cancel (drop) the task\n    instance, or 3) enqueue the task instance for later execution.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    This experiment is part of my attempt to squeeze out the maximal\n    amount of derivable state from the declarative ember-concurrency\n    API. Once we have all the derivable state we can coalesce\n    into more reasonable APIs/patterns to expose to the user.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 7, 7);
        return morphs;
      },
      statements: [["block", "each", [["get", "tasks", ["loc", [null, [20, 10], [20, 15]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [20, 2], [32, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
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
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 73
            }
          },
          "moduleName": "dummy/helpers-test/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Perform");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 72
            }
          },
          "moduleName": "dummy/helpers-test/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Cancel");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 80
            }
          },
          "moduleName": "dummy/helpers-test/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Return a Value");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "dummy/helpers-test/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Helpers Test");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "task-status");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "class", "set-value-option-task");
        var el2 = dom.createTextNode("Set value option");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [10]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[4] = dom.createAttrMorph(element0, 'onclick');
        return morphs;
      },
      statements: [["content", "status", ["loc", [null, [3, 23], [3, 33]]], 0, 0, 0, 0], ["block", "my-button", [], ["action", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [5, 32], [5, 38]]], 0, 0, 0, 0], 1, 2], [], ["loc", [null, [5, 20], [5, 43]]], 0, 0], "class", "perform-task"], 0, null, ["loc", [null, [5, 0], [5, 87]]]], ["block", "my-button", [], ["action", ["subexpr", "cancel-all", [["get", "myTask", ["loc", [null, [6, 32], [6, 38]]], 0, 0, 0, 0], 1, 2], [], ["loc", [null, [6, 20], [6, 43]]], 0, 0], "class", "cancel-task"], 1, null, ["loc", [null, [6, 0], [6, 86]]]], ["block", "my-button", [], ["action", ["subexpr", "perform", [["get", "returnValue", ["loc", [null, [7, 32], [7, 43]]], 0, 0, 0, 0]], [], ["loc", [null, [7, 20], [7, 44]]], 0, 0], "class", "value-task"], 2, null, ["loc", [null, [7, 0], [7, 94]]]], ["attribute", "onclick", ["subexpr", "perform", [["get", "valueTask", ["loc", [null, [9, 26], [9, 35]]], 0, 0, 0, 0]], ["value", "target.innerHTML"], ["loc", [null, [null, null], [9, 62]]], 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
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

      var value = _dummyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_dummyConfigEnvironment['default'].modulePrefix);
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
    "detail-route.js": "export default Ember.Route.extend({\n  notify: Ember.inject.service('notify'),\n\n  setupController(controller, model) {\n    this._super(...arguments);\n    this.get('pollServerForChanges').perform(model.id);\n  },\n\n  pollServerForChanges: task(function * (id) {\n    let notify = this.get('notify');\n    yield timeout(500);\n    try {\n      notify.info(`Thing ${id}: Starting to poll for changes`);\n      while (true) {\n        yield timeout(5000);\n        notify.info(`Thing ${id}: Polling now...`);\n      }\n    } finally {\n      notify.warning(`Thing ${id}: No longer polling for changes`);\n    }\n  }).cancelOn('deactivate').restartable(),\n});",
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
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "dummy/task-injection-test/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Task injection test");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "data-test-selector", "perform-task-w-injection-button");
        var el2 = dom.createTextNode("clickme");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "data-test-selector", "perform-task-result");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'onclick');
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [4]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "onclick", ["subexpr", "perform", [["get", "myTask", ["loc", [null, [3, 26], [3, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [3, 34]]], 0, 0], 0, 0, 0, 0], ["content", "myTask.last.value", ["loc", [null, [5, 44], [5, 65]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/code-snippet.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "source", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
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
  require("dummy/app")["default"].create({"name":"ember-concurrency","version":"0.7.16+5be8835a"});
}

/* jshint ignore:end */
