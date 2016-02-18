"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        dom.setAttribute(el3, "class", "eight columns");
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
        var el5 = dom.createComment("");
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
        var el5 = dom.createComment("");
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
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [3, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [5, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["inline", "link-to", ["Home", "index"], [], ["loc", [null, [8, 8], [8, 34]]]], ["inline", "link-to", ["Docs", "docs"], [], ["loc", [null, [13, 8], [13, 33]]]], ["content", "outlet", ["loc", [null, [29, 0], [29, 10]]]], ["content", "ember-notify", ["loc", [null, [31, 0], [31, 16]]]]],
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
    })).maxConcurrency(3),

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
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["attribute", "style", ["subexpr", "color", [["get", "log.color", ["loc", [null, [3, 22], [3, 31]]]]], [], ["loc", [null, [3, 14], [3, 33]]]]], ["content", "log.message", ["loc", [null, [3, 34], [3, 49]]]]],
        locals: ["log"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.1",
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
      statements: [["block", "each", [["get", "logs", ["loc", [null, [2, 10], [2, 14]]]]], [], 0, null, ["loc", [null, [2, 2], [4, 11]]]]],
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["content", "formattedText", ["loc", [null, [1, 0], [1, 17]]]]],
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
          case 'hbs':
            return 'handlebars';
          case 'css':
            return 'css';
          case 'scss':
            return 'scss';
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
    endTime: Infinity,
    taskInstance: null,
    isCanceled: computed.oneWay('taskInstance.isCanceled'),
    state: computed('taskInstance.state', function () {
      return _ember['default'].String.capitalize(this.get('taskInstance.state'));
    })
  });

  var nextId = 0;

  exports['default'] = _ember['default'].Component.extend({
    task: null,
    trackers: null,
    timeElapsed: 0,
    startTime: null,

    lowerLimit: _ember['default'].computed('trackers.[]', function () {
      var v = Math.min.apply(Math, _toConsumableArray(this.get('trackers').mapBy('performTime')));
      return v;
    }),

    upperLimit: _ember['default'].computed.oneWay('timeElapsed'),

    colors: ['red', 'green', 'blue'],

    labelHeights: [40, 60, 80, 100, 120],

    ticker: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var now, defer;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            this.restart();

          case 1:
            if (!true) {
              context$1$0.next = 10;
              break;
            }

            now = +new Date();

            this.set('timeElapsed', now - this.startTime);

            defer = _ember['default'].RSVP.defer();

            window.requestAnimationFrame(defer.resolve);
            context$1$0.next = 8;
            return defer.promise;

          case 8:
            context$1$0.next = 1;
            break;

          case 10:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).on('init'),

    restart: function restart() {
      this.startTime = +new Date();
      this.set('timeElapsed', 0);
      this.set('trackers', _ember['default'].A());
    },

    actions: {
      startTask: function startTask() {
        var _this = this;

        var tracker = Tracker.create({
          id: nextId++,
          performTime: this.timeElapsed,
          start: function start() {
            tracker.set('startTime', _this.timeElapsed);
          },
          end: function end() {
            tracker.set('endTime', _this.timeElapsed);
          }
        });

        var task = this.get('task');
        var taskInstance = task.perform(tracker);
        tracker.set('taskInstance', taskInstance);

        this.get('trackers').pushObject(tracker);
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
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 22,
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
              dom.setAttribute(el1, "fill-opacity", "0.5");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1]);
              var morphs = new Array(3);
              morphs[0] = dom.createAttrMorph(element2, 'x');
              morphs[1] = dom.createAttrMorph(element2, 'width');
              morphs[2] = dom.createAttrMorph(element2, 'fill');
              return morphs;
            },
            statements: [["attribute", "x", ["concat", [["subexpr", "scale", [["subexpr", "subtract", [["get", "tracker.startTime", ["loc", [null, [16, 35], [16, 52]]]], ["get", "lowerLimit", ["loc", [null, [16, 53], [16, 63]]]]], [], ["loc", [null, [16, 25], [16, 64]]]], ["get", "lowerLimit", ["loc", [null, [16, 65], [16, 75]]]], ["get", "upperLimit", ["loc", [null, [16, 76], [16, 86]]]]], [], ["loc", [null, [16, 17], [16, 88]]]], "%"]]], ["attribute", "width", ["concat", [["subexpr", "scale", [["subexpr", "width", [["get", "tracker.startTime", ["loc", [null, [18, 36], [18, 53]]]], ["get", "tracker.endTime", ["loc", [null, [18, 54], [18, 69]]]], ["get", "upperLimit", ["loc", [null, [18, 70], [18, 80]]]]], [], ["loc", [null, [18, 29], [18, 81]]]], ["get", "lowerLimit", ["loc", [null, [18, 82], [18, 92]]]], ["get", "upperLimit", ["loc", [null, [18, 93], [18, 103]]]]], [], ["loc", [null, [18, 21], [18, 105]]]], "%"]]], ["attribute", "fill", ["get", "color", ["loc", [null, [20, 21], [20, 26]]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 24,
                  "column": 6
                },
                "end": {
                  "line": 35,
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
              var el1 = dom.createTextNode("\n        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("line");
              dom.setAttribute(el1, "y1", "20");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var element1 = dom.childAt(fragment, [3]);
              var morphs = new Array(10);
              morphs[0] = dom.createAttrMorph(element0, 'x');
              morphs[1] = dom.createAttrMorph(element0, 'y');
              morphs[2] = dom.createAttrMorph(element0, 'fill');
              morphs[3] = dom.createAttrMorph(element0, 'text-decoration');
              morphs[4] = dom.createAttrMorph(element0, 'font-style');
              morphs[5] = dom.createMorphAt(element0, 1, 1);
              morphs[6] = dom.createAttrMorph(element1, 'x1');
              morphs[7] = dom.createAttrMorph(element1, 'x2');
              morphs[8] = dom.createAttrMorph(element1, 'y2');
              morphs[9] = dom.createAttrMorph(element1, 'stroke');
              return morphs;
            },
            statements: [["attribute", "x", ["concat", [["subexpr", "sum", [0.5, ["get", "x", ["loc", [null, [25, 27], [25, 28]]]]], [], ["loc", [null, [25, 17], [25, 30]]]], "%"]]], ["attribute", "y", ["subexpr", "pick-from", [["get", "labelHeights", ["loc", [null, [26, 28], [26, 40]]]], ["get", "tracker.id", ["loc", [null, [26, 41], [26, 51]]]]], [], ["loc", [null, [26, 16], [26, 53]]]]], ["attribute", "fill", ["get", "color", ["loc", [null, [28, 21], [28, 26]]]]], ["attribute", "text-decoration", ["subexpr", "if", [["get", "tracker.isCanceled", ["loc", [null, [30, 35], [30, 53]]]], "line-through", "none"], [], ["loc", [null, [30, 30], [30, 77]]]]], ["attribute", "font-style", ["subexpr", "if", [["get", "tracker.startTime", ["loc", [null, [31, 30], [31, 47]]]], "normal", "italic"], [], ["loc", [null, [31, 25], [31, 67]]]]], ["content", "tracker.state", ["loc", [null, [32, 10], [32, 27]]]], ["attribute", "x1", ["concat", [["get", "x", ["loc", [null, [34, 20], [34, 21]]]], "%"]]], ["attribute", "x2", ["concat", [["get", "x", ["loc", [null, [34, 40], [34, 41]]]], "%"]]], ["attribute", "y2", ["subexpr", "pick-from", [["get", "labelHeights", ["loc", [null, [34, 61], [34, 73]]]], ["get", "tracker.id", ["loc", [null, [34, 74], [34, 84]]]]], [], ["loc", [null, [34, 49], [34, 86]]]]], ["attribute", "stroke", ["get", "color", ["loc", [null, [34, 96], [34, 101]]]]]],
            locals: ["x"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 4
              },
              "end": {
                "line": 36,
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
          statements: [["block", "if", [["get", "tracker.startTime", ["loc", [null, [15, 12], [15, 29]]]]], [], 0, null, ["loc", [null, [15, 6], [22, 13]]]], ["block", "with", [["subexpr", "scale", [["subexpr", "subtract", [["get", "tracker.performTime", ["loc", [null, [24, 31], [24, 50]]]], ["get", "lowerLimit", ["loc", [null, [24, 51], [24, 61]]]]], [], ["loc", [null, [24, 21], [24, 62]]]], ["get", "lowerLimit", ["loc", [null, [24, 63], [24, 73]]]], ["get", "upperLimit", ["loc", [null, [24, 74], [24, 84]]]]], [], ["loc", [null, [24, 14], [24, 85]]]]], [], 1, null, ["loc", [null, [24, 6], [35, 15]]]]],
          locals: ["color"],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 38,
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
        statements: [["block", "with", [["subexpr", "pick-from", [["get", "colors", ["loc", [null, [14, 23], [14, 29]]]], ["get", "tracker.id", ["loc", [null, [14, 30], [14, 40]]]]], [], ["loc", [null, [14, 12], [14, 41]]]]], [], 0, null, ["loc", [null, [14, 4], [36, 13]]]]],
        locals: ["tracker"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
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
        var el1 = dom.createTextNode("\n\n");
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
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var element4 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element3);
        morphs[1] = dom.createElementMorph(element4);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [6]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["startTask"], [], ["loc", [null, [1, 8], [1, 30]]]], ["element", "action", ["restart"], [], ["loc", [null, [2, 8], [2, 28]]]], ["block", "each", [["get", "trackers", ["loc", [null, [12, 8], [12, 16]]]]], [], 0, null, ["loc", [null, [12, 0], [38, 9]]]]],
      locals: [],
      templates: [child0]
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["content", "count", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/components/ember-notify/message', ['exports', 'ember-notify/components/ember-notify/message'], function (exports, _emberNotifyComponentsEmberNotifyMessage) {
  exports['default'] = _emberNotifyComponentsEmberNotifyMessage['default'];
});
define('dummy/components/ember-notify', ['exports', 'ember-notify/components/ember-notify'], function (exports, _emberNotifyComponentsEmberNotify) {
  exports['default'] = _emberNotifyComponentsEmberNotify['default'];
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
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
        morphs[1] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["content", "count", ["loc", [null, [1, 11], [1, 20]]]], ["element", "action", [["get", "countingTask.perform", ["loc", [null, [2, 17], [2, 37]]]]], [], ["loc", [null, [2, 8], [2, 39]]]]],
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["content", "count", ["loc", [null, [1, 11], [1, 20]]]], ["element", "action", ["startCounting"], [], ["loc", [null, [2, 8], [2, 34]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/components/nav-header/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: ''
  });
});
define("dummy/components/nav-header/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["inline", "link-to", [["get", "prevTopic.title", ["loc", [null, [4, 26], [4, 41]]]], ["get", "prevTopic.route", ["loc", [null, [4, 42], [4, 57]]]]], [], ["loc", [null, [4, 16], [4, 59]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["inline", "link-to", [["get", "nextTopic.title", ["loc", [null, [10, 22], [10, 37]]]], ["get", "nextTopic.route", ["loc", [null, [10, 38], [10, 53]]]]], [], ["loc", [null, [10, 12], [10, 55]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.1",
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
      statements: [["block", "if", [["get", "prevTopic", ["loc", [null, [2, 8], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 2], [6, 9]]]], ["block", "if", [["get", "nextTopic", ["loc", [null, [8, 8], [8, 17]]]]], [], 1, null, ["loc", [null, [8, 2], [12, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
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
define('dummy/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
    }
  });
});
define('dummy/components/power-select-multiple/options', ['exports', 'ember-power-select/components/power-select-multiple/options'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleOptions['default'];
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
define('dummy/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["content", "scrambledText", ["loc", [null, [1, 0], [1, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/components/start-task-example/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    init: function init() {
      this._super();
      this.set('messages', _ember['default'].A());
    },

    messages: null,

    // BEGIN-SNIPPET start-task-example
    myTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0(msg) {
      var m;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            m = {
              text: 'myTask invoked with the following: ' + (msg || "init") + '... '
            };

            this.messages.pushObject(m);
            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(500);

          case 4:
            _ember['default'].set(m, 'text', m.text + "Done");

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
        // ideally you should just invoke myTask.perform
        // directly from the template.
        this.get('myTask').perform(msg);
      },
      triggerFoo: function triggerFoo(msg) {
        this.trigger('foo', msg);
      }
    }
    // END-SNIPPET
  });
});
define("dummy/components/start-task-example/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 22,
              "column": 2
            }
          },
          "moduleName": "dummy/components/start-task-example/template.hbs"
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
        statements: [["content", "m.text", ["loc", [null, [21, 8], [21, 18]]]]],
        locals: ["m"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        var el3 = dom.createTextNode("\n    2. task.perform action\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    3. .on('foo')\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h6");
        var el2 = dom.createTextNode("Messages Received:");
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
        var morphs = new Array(6);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        morphs[4] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["performTask", "one"], [], ["loc", [null, [3, 10], [3, 40]]]], ["element", "action", [["get", "myTask.perform", ["loc", [null, [7, 19], [7, 33]]]], "two"], [], ["loc", [null, [7, 10], [7, 41]]]], ["element", "action", ["triggerFoo", "three"], [], ["loc", [null, [11, 10], [11, 41]]]], ["block", "each", [["get", "messages", ["loc", [null, [20, 10], [20, 18]]]]], [], 0, null, ["loc", [null, [20, 2], [22, 11]]]], ["inline", "code-snippet", [], ["name", "start-task-example.js"], ["loc", [null, [27, 0], [27, 45]]]], ["inline", "code-snippet", [], ["name", "start-task-example-template.hbs"], ["loc", [null, [31, 0], [31, 55]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
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
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["element", "action", ["cancelAll"], [], ["loc", [null, [42, 10], [42, 32]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["element", "action", ["cancelMostRecent"], [], ["loc", [null, [45, 10], [45, 39]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["inline", "link-to", ["Task Modifiers", "docs.task-concurrency"], [], ["loc", [null, [13, 7], [13, 59]]]], ["content", "count", ["loc", [null, [38, 19], [38, 28]]]], ["element", "action", ["performTask"], [], ["loc", [null, [40, 8], [40, 32]]]], ["block", "if", [["get", "count", ["loc", [null, [41, 6], [41, 11]]]]], [], 0, null, ["loc", [null, [41, 0], [43, 7]]]], ["block", "if", [["get", "mostRecent.isRunning", ["loc", [null, [44, 6], [44, 26]]]]], [], 1, null, ["loc", [null, [44, 0], [46, 7]]]], ["content", "myTask.concurrency", ["loc", [null, [53, 47], [53, 69]]]], ["inline", "code-snippet", [], ["name", "cancelation-template.hbs"], ["loc", [null, [57, 0], [57, 48]]]], ["inline", "code-snippet", [], ["name", "cancelation.js"], ["loc", [null, [58, 0], [58, 38]]]]],
      locals: [],
      templates: [child0, child1]
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
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        morphs[4] = dom.createElementMorph(element1);
        morphs[5] = dom.createMorphAt(element1, 1, 1);
        morphs[6] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        return morphs;
      },
      statements: [["content", "status", ["loc", [null, [14, 4], [14, 14]]]], ["content", "parentTask.state", ["loc", [null, [17, 23], [17, 43]]]], ["content", "childTask.state", ["loc", [null, [18, 23], [18, 42]]]], ["content", "grandchildTask.state", ["loc", [null, [19, 23], [19, 47]]]], ["element", "action", [["get", "parentTask.perform", ["loc", [null, [22, 17], [22, 35]]]]], [], ["loc", [null, [22, 8], [22, 37]]]], ["block", "if", [["get", "parentTask.isRunning", ["loc", [null, [23, 8], [23, 28]]]]], [], 0, 1, ["loc", [null, [23, 2], [27, 9]]]], ["inline", "code-snippet", [], ["name", "child-tasks.js"], ["loc", [null, [31, 0], [31, 38]]]], ["inline", "code-snippet", [], ["name", "child-tasks-template.hbs"], ["loc", [null, [32, 0], [32, 48]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("dummy/docs/controller", ["exports", "ember"], function (exports, _ember) {
  var computed = _ember["default"].computed;
  exports["default"] = _ember["default"].Controller.extend({
    appController: _ember["default"].inject.controller('application'),

    tableOfContents: [{ route: "docs", title: "Introduction" }, { route: "docs.getting-started", title: "Getting Started" }, { route: "docs.writing-tasks", title: "Writing Tasks" }, { route: "docs.task-concurrency", title: "Managing Task Concurrency" }, { route: "docs.task-concurrency-advanced", title: "Advanced Task Concurrency" }, { route: "docs.cancelation", title: "Cancelation" }, { route: "docs.lifetime", title: "Lifetime" }, { route: "docs.child-tasks", title: "Child Tasks" }, { title: "Examples", route: "docs.examples",
      children: [{ route: "docs.examples.loading-ui", title: "Loading UI" }, { route: "docs.examples.autocomplete", title: "Auto-Search + ember-power-select" }, { route: "docs.examples.increment-buttons", title: "Accelerating Increment Buttons" }, { route: "docs.examples.ajax-throttling", title: "AJAX Throttling" }, { route: "docs.examples.route-tasks", title: "Route Tasks" }, { route: "docs.examples.joining-tasks", title: "Awaiting Multiple Child Tasks" }]
    }],

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
define("dummy/docs/examples/ajax-throttling/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        var el2 = dom.createTextNode("\n  In the example belong, we render a component with 8 different\n  concurrently running tasks that each, within an infinite loop,\n  make (fake) AJAX requests. We've wrapped the code that actually\n  performs the (fake) AJAX request in a task, and we've annotated\n  that task with ");
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
      statements: [["content", "ajax-throttling-example", ["loc", [null, [21, 0], [21, 27]]]], ["inline", "code-snippet", [], ["name", "ajax-throttling.js"], ["loc", [null, [23, 0], [23, 42]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/docs/examples/autocomplete/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // Wrap the $.getJSON API so that it's cancelable.
  function cancelableGetJSON(url) {
    return (0, _emberConcurrency.createObservable)(function (publish) {
      var xhr = _ember['default'].$.getJSON(url);
      xhr.then(publish, publish.error);

      return function () {
        xhr.abort();
      };
    });
  }

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
            return cancelableGetJSON(url);

          case 7:
            json = context$1$0.sent;
            return context$1$0.abrupt('return', json.items);

          case 9:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable()
  });

  // END-SNIPPET
});

// Pause here for DEBOUNCE_MS milliseconds. Because this
// task is `.restartable()`, if the user starts typing again,
// the current search will be canceled at this point and
// start over from the beginning. This is the
// ember-concurrency way of debouncing a task.

// We yield an AJAX request and wait for it to complete. If the task
// is restarted before this request completes, the XHR request
// is aborted (open the inspector and see for yourself :)
define("dummy/docs/examples/autocomplete/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["content", "repo.full_name", ["loc", [null, [23, 4], [23, 22]]]]],
        locals: ["repo"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["block", "power-select", [], ["search", ["subexpr", "@mut", [["get", "searchRepo.perform", ["loc", [null, [20, 25], [20, 43]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [21, 27], [21, 35]]]]], [], []], "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "selected", ["loc", [null, [22, 40], [22, 48]]]]], [], ["loc", [null, [22, 35], [22, 49]]]]], [], ["loc", [null, [22, 27], [22, 50]]]]], 0, null, ["loc", [null, [20, 2], [24, 19]]]], ["inline", "code-snippet", [], ["name", "debounced-search-with-cancelation.js"], ["loc", [null, [30, 0], [30, 60]]]], ["inline", "code-snippet", [], ["name", "debounced-search-with-cancelation-template.hbs"], ["loc", [null, [34, 0], [34, 70]]]]],
      locals: [],
      templates: [child0]
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
            if (inc) {
              context$1$0.next = 2;
              break;
            }

            return context$1$0.abrupt('return');

          case 2:
            speed = 400;

          case 3:
            if (!true) {
              context$1$0.next = 10;
              break;
            }

            this.incrementProperty('count', inc);
            context$1$0.next = 7;
            return (0, _emberConcurrency.timeout)(speed);

          case 7:
            speed = Math.max(50, speed * 0.8);
            context$1$0.next = 3;
            break;

          case 10:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).restartable()
  });

  // END-SNIPPET
});
define("dummy/docs/examples/increment-buttons/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 2
            },
            "end": {
              "line": 29,
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
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 31,
              "column": 2
            },
            "end": {
              "line": 35,
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        var el3 = dom.createTextNode("\n    Tasks integrate with the template actions API: you can use\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("taskName.perform");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" in place of anywhere you\n    might want to use a classic Ember action name.\n  ");
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
      statements: [["content", "count", ["loc", [null, [19, 9], [19, 18]]]], ["block", "press-and-hold-button", [], ["press", ["subexpr", "action", [["get", "incrementBy.perform", ["loc", [null, [26, 18], [26, 37]]]], -1], [], ["loc", [null, [26, 10], [26, 41]]]], "release", ["subexpr", "action", [["get", "incrementBy.perform", ["loc", [null, [27, 20], [27, 39]]]], 0], [], ["loc", [null, [27, 12], [27, 42]]]]], 0, null, ["loc", [null, [25, 2], [29, 28]]]], ["block", "press-and-hold-button", [], ["press", ["subexpr", "action", [["get", "incrementBy.perform", ["loc", [null, [32, 18], [32, 37]]]], 1], [], ["loc", [null, [32, 10], [32, 40]]]], "release", ["subexpr", "action", [["get", "incrementBy.perform", ["loc", [null, [33, 20], [33, 39]]]], 0], [], ["loc", [null, [33, 12], [33, 42]]]]], 1, null, ["loc", [null, [31, 2], [35, 28]]]], ["inline", "code-snippet", [], ["name", "increment-button-task.js"], ["loc", [null, [41, 0], [41, 48]]]], ["inline", "code-snippet", [], ["name", "increment-button.js"], ["loc", [null, [45, 0], [45, 43]]]], ["inline", "code-snippet", [], ["name", "press-and-hold-buttons.hbs"], ["loc", [null, [49, 0], [49, 50]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("dummy/docs/examples/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
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
define('dummy/docs/examples/joining-tasks/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  var WORDS = ['ember', 'tomster', 'swag', 'yolo', 'turbo', 'ajax'];
  function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  var ProgressTracker = _ember['default'].Object.extend({
    id: null,
    percent: 0,
    word: null
  });

  // BEGIN-SNIPPET joining-tasks

  var methods = { all: _emberConcurrency.all, race: _emberConcurrency.race };

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
            word = randomWord();

            tracker.set('word', word);
            return context$1$0.abrupt('return', word);

          case 11:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })).maxConcurrency(3),

    colors: ['#ff8888', '#88ff88', '#8888ff']
  });

  // END-SNIPPET
});
define("dummy/docs/examples/joining-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
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
          statements: [["content", "tracker.word", ["loc", [null, [42, 14], [42, 30]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["attribute", "style", ["subexpr", "progress-style", [["get", "tracker.percent", ["loc", [null, [39, 55], [39, 70]]]], ["get", "tracker.id", ["loc", [null, [39, 71], [39, 81]]]], ["get", "colors", ["loc", [null, [39, 82], [39, 88]]]]], [], ["loc", [null, [39, 38], [39, 90]]]]], ["content", "tracker.percent", ["loc", [null, [40, 16], [40, 35]]]], ["block", "if", [["get", "tracker.word", ["loc", [null, [41, 12], [41, 24]]]]], [], 0, null, ["loc", [null, [41, 6], [43, 13]]]]],
        locals: ["tracker"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 17, 17, contextualElement);
        return morphs;
      },
      statements: [["content", "status", ["loc", [null, [28, 12], [28, 22]]]], ["element", "action", [["get", "parent.perform", ["loc", [null, [32, 19], [32, 33]]]], "all"], [], ["loc", [null, [32, 10], [32, 41]]]], ["element", "action", [["get", "parent.perform", ["loc", [null, [33, 19], [33, 33]]]], "race"], [], ["loc", [null, [33, 10], [33, 42]]]], ["block", "each", [["get", "trackers", ["loc", [null, [37, 8], [37, 16]]]]], [], 0, null, ["loc", [null, [37, 0], [46, 9]]]], ["inline", "code-snippet", [], ["name", "joining-tasks.js"], ["loc", [null, [48, 0], [48, 40]]]], ["inline", "code-snippet", [], ["name", "joining-tasks-template.hbs"], ["loc", [null, [49, 0], [49, 50]]]]],
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
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["content", "result", ["loc", [null, [25, 25], [25, 35]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["inline", "fa-icon", ["spinner"], ["spin", true], ["loc", [null, [37, 10], [37, 41]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        var el2 = dom.createTextNode("\n  Reigning in undesired concurrency is partly what ");
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
        var el2 = dom.createTextNode(" property of\n  a task, which is false when the task is running, and true otherwise. This eliminates\n  a lot of the boilerplate of setting a property at the beginning of some async operation,\n  and unsetting when the operation completes. Also, because the task in the example\n  below uses the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".drop()");
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
        morphs[3] = dom.createElementMorph(element0);
        morphs[4] = dom.createMorphAt(element0, 1, 1);
        morphs[5] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        return morphs;
      },
      statements: [["inline", "link-to", ["Managing Task Concurrency", "docs.task-concurrency"], [], ["loc", [null, [16, 7], [16, 70]]]], ["block", "if", [["get", "result", ["loc", [null, [25, 8], [25, 14]]]]], [], 0, null, ["loc", [null, [25, 2], [25, 43]]]], ["attribute", "class", ["subexpr", "if", [["get", "askQuestion.isIdle", ["loc", [null, [31, 21], [31, 39]]]], "button-primary"], [], ["loc", [null, [31, 16], [31, 58]]]]], ["element", "action", [["get", "askQuestion.perform", ["loc", [null, [32, 13], [32, 32]]]]], [], ["loc", [null, [32, 4], [32, 34]]]], ["block", "if", [["get", "askQuestion.isIdle", ["loc", [null, [33, 14], [33, 32]]]]], [], 1, 2, ["loc", [null, [33, 8], [38, 15]]]], ["inline", "code-snippet", [], ["name", "loading-ui-controller.js"], ["loc", [null, [43, 0], [43, 48]]]], ["inline", "code-snippet", [], ["name", "ask-button.hbs"], ["loc", [null, [45, 0], [45, 38]]]]],
      locals: [],
      templates: [child0, child1, child2]
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
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
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
          statements: [["content", "id", ["loc", [null, [28, 12], [28, 18]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["block", "link-to", ["docs.examples.route-tasks.detail", ["get", "id", ["loc", [null, [27, 50], [27, 52]]]]], [], 0, null, ["loc", [null, [27, 4], [29, 16]]]]],
        locals: ["id"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        var el4 = dom.createTextNode(".restartable()");
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
      statements: [["block", "each", [["get", "ids", ["loc", [null, [25, 10], [25, 13]]]]], [], 0, null, ["loc", [null, [25, 2], [31, 11]]]], ["inline", "code-snippet", [], ["name", "detail-route.js"], ["loc", [null, [57, 0], [57, 39]]]]],
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
define("dummy/docs/getting-started/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        "moduleName": "dummy/docs/getting-started/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Getting Started");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Within your ember-cli project, run the following:\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Then modify your ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("ember-cli-build.js");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (or ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Brocfile.js");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(")\n  as set ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("babel.includePolyfill");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to true to enable ES6 generator function\n  transpilation.\n");
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
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "ember-install.sh"], ["loc", [null, [7, 0], [7, 40]]]], ["inline", "code-snippet", [], ["name", "ember-app-config.js"], ["loc", [null, [15, 0], [15, 43]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/docs/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 72,
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
        var el2 = dom.createTextNode(" is a toolset that supplements\n  Ember's existing tools and conventions for handling concurrency and\n  asynchrony. The primary tool that ember-concurrency provides is\n  the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Task");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
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
        var el2 = dom.createTextNode("\n  To understand everything that ember-concurrency tasks afford you, here\n  is a reimplementation of the above example without using tasks:\n");
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
        var el3 = dom.createTextNode("\n    You have to stop the currently running operation before starting a new\n    operation in its place; in other words, you need to prevent accidental\n    concurrency\n  ");
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
        morphs[0] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 22, 22, contextualElement);
        return morphs;
      },
      statements: [["content", "intro-task", ["loc", [null, [19, 0], [19, 14]]]], ["inline", "code-snippet", [], ["name", "intro-task.js"], ["loc", [null, [21, 0], [21, 37]]]], ["content", "intro-task-oldschool", ["loc", [null, [48, 0], [48, 24]]]], ["inline", "code-snippet", [], ["name", "intro-task-oldschool.js"], ["loc", [null, [50, 0], [50, 47]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/docs/lifetime/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // BEGIN-SNIPPET lifetime
  exports['default'] = _ember['default'].Controller.extend({
    isDisplaying: false,

    togglingLoop: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            if (!true) {
              context$1$0.next = 6;
              break;
            }

            this.toggleProperty('isDisplaying');
            context$1$0.next = 4;
            return (0, _emberConcurrency.timeout)(1500);

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

  // END-SNIPPET
});
define("dummy/docs/lifetime/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 2
            },
            "end": {
              "line": 26,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/lifetime/template.hbs"
        },
        isEmpty: false,
        arity: 0,
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
        statements: [["content", "count-up", ["loc", [null, [25, 4], [25, 16]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 2
            },
            "end": {
              "line": 28,
              "column": 2
            }
          },
          "moduleName": "dummy/docs/lifetime/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ...\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        "moduleName": "dummy/docs/lifetime/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Task Lifetime");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Tasks are automatically canceled when their host object is destroyed.\n  This is particularly relevant for tasks that live on components: at\n  any point, a component might be unrendered as the user navigates\n  around the app.\n");
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
        var el2 = dom.createTextNode("\n  This simple example demonstrates that it is perfectly safe to use tasks\n  on components; the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("count-up");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" component is getting\n  rendered and then destroyed in a loop, yet its internal timer\n  that rapidly increments numbers is automatically and cleanly\n  torn down. No need to implement a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("willDestroy");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  hook, or manually cancel the task, or cancel timers.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("\n  Count-up:\n");
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
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 11, 11, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        return morphs;
      },
      statements: [["block", "if", [["get", "isDisplaying", ["loc", [null, [24, 8], [24, 20]]]]], [], 0, 1, ["loc", [null, [24, 2], [28, 9]]]], ["inline", "code-snippet", [], ["name", "lifetime.js"], ["loc", [null, [32, 0], [32, 35]]]], ["inline", "code-snippet", [], ["name", "lifetime-template.hbs"], ["loc", [null, [33, 0], [33, 45]]]], ["inline", "code-snippet", [], ["name", "count-up.js"], ["loc", [null, [34, 0], [34, 35]]]]],
      locals: [],
      templates: [child0, child1]
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
    droppingTask: (0, _emberConcurrency.task)(SHARED_TASK_FN).drop()
  });

  // END-SNIPPET
});

// simulate async work
define("dummy/docs/task-concurrency/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
        var el2 = dom.createTextNode("\n  Often, you want to guarantee that no more than one instance of a task\n  runs at the same time; for instance, if you have a task that saves\n  model state to the server, you probably don't want that task to run\n  concurrently — you want it to run sequentially, or you might\n  want to ignore attempts to perform the task. In practice,\n  enforcing these constraints is tricky and often results\n  in redundant, error-prone boilerplate, but ember-concurrency\n  makes it easy to reign in this undesired concurrency with the\n  modifiers described below.\n");
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
        var el2 = dom.createTextNode(".restartable()");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".restartable()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" modifier ensures that only one instance\n  of a task is running by canceling any currently-running tasks and starting\n  a new task instance immediately. Note how there is no task overlap,\n  and how currently running tasks get canceled\n  (");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "style", "text-decoration:line-through;");
        var el3 = dom.createTextNode(".perform()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is crossed out)\n  if a new task starts before a prior one completes.\n");
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
        var el3 = dom.createTextNode(" for\n    a practical example of .restartable()\n  ");
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
        var el2 = dom.createTextNode(".enqueue()");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".enqueue()");
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
        var el2 = dom.createTextNode(".drop()");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".drop()");
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
        var el4 = dom.createTextNode(".drop()");
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [22, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 30, 30, contextualElement);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [36, 1]), 1, 1);
        morphs[6] = dom.createMorphAt(fragment, 38, 38, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "shared-tasks.js"], ["loc", [null, [30, 0], [30, 39]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "defaultTask", ["loc", [null, [39, 25], [39, 36]]]]], [], []]], ["loc", [null, [39, 0], [39, 38]]]], ["inline", "link-to", ["Debounced Auto-Search", "docs.examples.autocomplete"], [], ["loc", [null, [55, 14], [55, 78]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "restartableTask", ["loc", [null, [61, 25], [61, 40]]]]], [], []]], ["loc", [null, [61, 0], [61, 42]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "enqueuedTask", ["loc", [null, [72, 25], [72, 37]]]]], [], []]], ["loc", [null, [72, 0], [72, 39]]]], ["inline", "link-to", ["Loading UI", "docs.examples.loading-ui"], [], ["loc", [null, [84, 18], [84, 69]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "droppingTask", ["loc", [null, [89, 25], [89, 37]]]]], [], []]], ["loc", [null, [89, 0], [89, 39]]]]],
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
    droppingTask3: (0, _emberConcurrency.task)(SHARED_TASK_FN).maxConcurrency(3).drop()
  });

  // END-SNIPPET
});

// simulate async work
define("dummy/docs/task-concurrency-advanced/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 57,
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
        var el2 = dom.createTextNode("Managing Task Concurrency (Advanced)");
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
        var el2 = dom.createTextNode(".restartable() with .maxConcurrency(3)");
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
        var el3 = dom.createTextNode("\n    TODO: while .restartable() is an excellent name when maxConcurrency\n    is 1, it poorly describes the behavior for values greater than 1.\n    A better name in this case might be .sliding(), as in sliding buffer.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode(".enqueue() with .maxConcurrency(3)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode(".drop() with .maxConcurrency(3)");
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
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "shared-tasks-concurrent.js"], ["loc", [null, [24, 0], [24, 50]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "restartableTask3", ["loc", [null, [32, 25], [32, 41]]]]], [], []]], ["loc", [null, [32, 0], [32, 43]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "enqueuedTask3", ["loc", [null, [45, 25], [45, 38]]]]], [], []]], ["loc", [null, [45, 0], [45, 40]]]], ["inline", "concurrency-graph", [], ["task", ["subexpr", "@mut", [["get", "droppingTask3", ["loc", [null, [49, 25], [49, 38]]]]], [], []]], ["loc", [null, [49, 0], [49, 40]]]]],
      locals: [],
      templates: []
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
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
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
            statements: [["content", "entry.title", ["loc", [null, [9, 38], [9, 53]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
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
          statements: [["block", "link-to", [["get", "entry.route", ["loc", [null, [9, 25], [9, 36]]]]], [], 0, null, ["loc", [null, [9, 14], [9, 65]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
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
          statements: [["content", "entry.title", ["loc", [null, [11, 14], [11, 29]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.1",
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
              statements: [["content", "child.title", ["loc", [null, [18, 40], [18, 55]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
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
            statements: [["block", "link-to", [["get", "child.route", ["loc", [null, [18, 27], [18, 38]]]]], [], 0, null, ["loc", [null, [18, 16], [18, 67]]]]],
            locals: ["child"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
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
          statements: [["block", "each", [["get", "entry.children", ["loc", [null, [16, 22], [16, 36]]]]], ["key", "route"], 0, null, ["loc", [null, [16, 14], [20, 23]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
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
        statements: [["block", "if", [["get", "entry.route", ["loc", [null, [8, 18], [8, 29]]]]], [], 0, 1, ["loc", [null, [8, 12], [12, 19]]]], ["block", "if", [["get", "entry.children", ["loc", [null, [14, 18], [14, 32]]]]], [], 2, null, ["loc", [null, [14, 12], [22, 19]]]]],
        locals: ["entry"],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
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
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(element2, 1, 1);
        morphs[2] = dom.createMorphAt(element2, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 5, 5);
        return morphs;
      },
      statements: [["block", "each", [["get", "tableOfContents", ["loc", [null, [6, 18], [6, 33]]]]], ["key", "route"], 0, null, ["loc", [null, [6, 10], [24, 19]]]], ["inline", "nav-header", [], ["nextTopic", ["subexpr", "@mut", [["get", "nextTopic", ["loc", [null, [30, 29], [30, 38]]]]], [], []], "prevTopic", ["subexpr", "@mut", [["get", "prevTopic", ["loc", [null, [30, 49], [30, 58]]]]], [], []]], ["loc", [null, [30, 6], [30, 60]]]], ["content", "outlet", ["loc", [null, [32, 6], [32, 16]]]], ["inline", "nav-header", [], ["nextTopic", ["subexpr", "@mut", [["get", "nextTopic", ["loc", [null, [34, 29], [34, 38]]]]], [], []], "prevTopic", ["subexpr", "@mut", [["get", "prevTopic", ["loc", [null, [34, 49], [34, 58]]]]], [], []]], ["loc", [null, [34, 6], [34, 60]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("dummy/docs/writing-tasks/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 49,
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
        var el2 = dom.createTextNode("Writing Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Step one of writing a task is deciding which object it'll live on —\n  an ember-concurrency task is scoped to the lifetime of the object it lives\n  on, such that when that host object is destroyed, the task is canceled. So if\n  you want the task to cancel when a component is unrendered, put it on a component.\n  If you want it to have a longer life span than a component, perhaps it belongs on\n  a service.\n");
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
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Starting a task");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  There are three ways to start a task:\n");
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
        var el3 = dom.createTextNode("\n    In your Handlebars template, use ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("nameOfTask.perform");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" in place of anywhere\n    you would normally use the name of an action.\n  ");
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
        var el1 = dom.createElement("h5");
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
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        return morphs;
      },
      statements: [["inline", "code-snippet", [], ["name", "writing-tasks.js"], ["loc", [null, [17, 0], [17, 40]]]], ["content", "start-task-example", ["loc", [null, [46, 0], [46, 22]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/helpers/color', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.colorString = colorString;

  function colorString(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 1);

    var color = _ref2[0];

    return new _ember['default'].Handlebars.SafeString('color: ' + color + ';');
  }

  exports['default'] = _ember['default'].Helper.helper(colorString);
});
define('dummy/helpers/ember-power-select-build-selection', ['exports', 'ember-power-select/helpers/ember-power-select-build-selection'], function (exports, _emberPowerSelectHelpersEmberPowerSelectBuildSelection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectBuildSelection['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectBuildSelection', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectBuildSelection.emberPowerSelectBuildSelection;
    }
  });
});
define('dummy/helpers/ember-power-select-option-classes', ['exports', 'ember-power-select/helpers/ember-power-select-option-classes'], function (exports, _emberPowerSelectHelpersEmberPowerSelectOptionClasses) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectOptionClasses['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectOptionClasses', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectOptionClasses.emberPowerSelectOptionClasses;
    }
  });
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
define('dummy/helpers/progress-style', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.progressStyleHelper = progressStyleHelper;

  function progressStyleHelper(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 3);

    var percent = _ref2[0];
    var id = _ref2[1];
    var colors = _ref2[2];

    var color = colors[id % colors.length];
    return new _ember['default'].Handlebars.SafeString('width: ' + percent + '%; background-color: ' + color + ';');
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
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _dummyConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('docs', function () {
      this.route('getting-started');
      this.route('writing-tasks');
      this.route('task-concurrency');
      this.route('task-concurrency-advanced');
      this.route('cancelation');
      this.route('child-tasks');
      this.route('lifetime');
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
      });
    });
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
define('dummy/services/notify', ['exports', 'ember-notify'], function (exports, _emberNotify) {
  exports['default'] = _emberNotify['default'];
});
define("dummy/snippets", ["exports"], function (exports) {
  exports["default"] = {
    "ajax-throttling.js": "function loopingAjaxTask(id, color) {\n  return task(function * () {\n    while (true) {\n      this.log(color, `Task ${id}: making AJAX request`);\n      yield this.get('ajaxTask').perform();\n      this.log(color, `Task ${id}: Done, sleeping.`);\n      yield timeout(2000);\n    }\n  }).on('init');\n}\n\nexport default Ember.Component.extend({\n  ajaxTask: task(function * () {\n    // simulate slow AJAX\n    yield timeout(2000 + 2000 * Math.random());\n    return {};\n  }).maxConcurrency(3),\n\n  task0: loopingAjaxTask(0, '#0000FF'),\n  task1: loopingAjaxTask(1, '#8A2BE2'),\n  task2: loopingAjaxTask(2, '#A52A2A'),\n  task3: loopingAjaxTask(3, '#DC143C'),\n  task4: loopingAjaxTask(4, '#20B2AA'),\n  task5: loopingAjaxTask(5, '#FF1493'),\n  task6: loopingAjaxTask(6, '#228B22'),\n  task7: loopingAjaxTask(7, '#DAA520'),\n\n  log(color, message) {\n    let logs = this.logs || [];\n    logs.push({ color, message });\n    this.set('logs', logs.slice(-7));\n  },\n\n  logs: null,\n});",
    "ask-button.hbs": "  <button class={{if askQuestion.isIdle 'button-primary'}}\n    {{action askQuestion.perform}}>\n        {{#if askQuestion.isIdle}}\n          Ask\n        {{else}}\n          Thinking...\n          {{fa-icon \"spinner\" spin=true}}\n        {{/if}}\n  </button>",
    "cancelation-template.hbs": "<h5>Running tasks: {{count}}</h5>\n\n<button {{action 'performTask'}}>Perform Task</button>\n{{#if count}}\n  <button {{action 'cancelAll'}}>Cancel All</button>\n{{/if}}\n{{#if mostRecent.isRunning}}\n  <button {{action 'cancelMostRecent'}}>Cancel Most Recent</button>\n{{/if}}",
    "cancelation.js": "const WAIT_HERE_FOREVER = Ember.RSVP.defer().promise;\nexport default Ember.Controller.extend({\n  count: 0,\n  mostRecent: null,\n\n  myTask: task(function * () {\n    try {\n      this.incrementProperty('count');\n      yield WAIT_HERE_FOREVER;\n    } finally {\n      // finally blocks always get called,\n      // even when the task is being canceled\n      this.decrementProperty('count');\n    }\n  }),\n\n  actions: {\n    performTask() {\n      let task = this.get('myTask');\n      let taskInstance = task.perform();\n      this.set('mostRecent', taskInstance);\n    },\n\n    cancelAll() {\n      this.get('myTask').cancelAll();\n    },\n\n    cancelMostRecent() {\n      this.get('mostRecent').cancel();\n    },\n  }\n});",
    "caps-marquee.js": "  marqueeLoop: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      this.set('formattedText', text);\n      yield timeout(1500);\n      for (let i = 0; i < text.length; ++i) {\n        this.set('formattedText', capitalizeAt(text, i));\n        yield timeout(50);\n      }\n    }\n  }).on('init'),",
    "child-tasks-template.hbs": "<h5>{{status}}</h5>\n\n<ul>\n  <li>Parent Task:     {{parentTask.state}}</li>\n  <li>Child Task:      {{childTask.state}}</li>\n  <li>Grandchild Task: {{grandchildTask.state}}</li>\n</ul>\n\n<button {{action parentTask.perform}}>\n  {{#if parentTask.isRunning}}\n    Restart Parent Task\n  {{else}}\n    Perform Parent Task\n  {{/if}}\n</button>",
    "child-tasks.js": "export default Ember.Controller.extend({\n  status: \"Waiting to start\",\n\n  parentTask: task(function * () {\n    this.set('status', \"1. Parent: one moment...\");\n    yield timeout(1000);\n    let value = yield this.get('childTask').perform();\n    this.set('status', `5. Parent: child says \"${value}\"`);\n    yield timeout(1000);\n    this.set('status', \"6. Done!\");\n  }).restartable(),\n\n  childTask: task(function * () {\n    this.set('status', \"2. Child: one moment...\");\n    yield timeout(1000);\n    let value = yield this.get('grandchildTask').perform();\n    this.set('status', `4. Child: grandchild says \"${value}\"`);\n    yield timeout(1000);\n    return \"What's up\";\n  }),\n\n  grandchildTask: task(function * () {\n    this.set('status', \"3. Grandchild: one moment...\");\n    yield timeout(1000);\n    return \"Hello\";\n  }),\n});",
    "count-up.js": "  countUp: task(function * () {\n    while (true) {\n      this.incrementProperty('count');\n      yield timeout(100);\n    }\n  }).on('init'),",
    "debounced-search-with-cancelation-template.hbs": "  {{#power-select search=searchRepo.perform\n                  selected=selected\n                  onchange=(action (mut selected)) as |repo|}}\n    {{repo.full_name}}\n  {{/power-select}}",
    "debounced-search-with-cancelation.js": "const DEBOUNCE_MS = 250;\nexport default Ember.Controller.extend({\n  searchRepo: task(function * (term) {\n    if (Ember.isBlank(term)) { return []; }\n\n    // Pause here for DEBOUNCE_MS milliseconds. Because this\n    // task is `.restartable()`, if the user starts typing again,\n    // the current search will be canceled at this point and\n    // start over from the beginning. This is the\n    // ember-concurrency way of debouncing a task.\n    yield timeout(DEBOUNCE_MS);\n\n    let url = `https://api.github.com/search/repositories?q=${term}`;\n\n    // We yield an AJAX request and wait for it to complete. If the task\n    // is restarted before this request completes, the XHR request\n    // is aborted (open the inspector and see for yourself :)\n    let json = yield cancelableGetJSON(url);\n    return json.items;\n  }).restartable(),\n});",
    "detail-route.js": "export default Ember.Route.extend({\n  notify: Ember.inject.service('notify'),\n\n  setupController(controller, model) {\n    this.get('pollServerForChanges').perform(model.id);\n  },\n\n  pollServerForChanges: task(function * (id) {\n    let notify = this.get('notify');\n    yield timeout(500);\n    try {\n      notify.info(`Thing ${id}: Starting to poll for changes`);\n      while (true) {\n        yield timeout(5000);\n        notify.info(`Thing ${id}: Polling now...`);\n      }\n    } finally {\n      notify.warning(`Thing ${id}: No longer polling for changes`);\n    }\n  }).cancelOn('deactivate').restartable(),\n});",
    "ember-app-config.js": "var app = new EmberApp({\n  babel: {\n    includePolyfill: true,\n\n    // you might need this too, depending on your version of babel\n    // browserPolyfill: true,\n  },\n});\n\n",
    "ember-install.sh": "ember install ember-concurrency\n",
    "increment-button-task.js": "export default Ember.Controller.extend({\n  count: 0,\n  incrementBy: task(function * (inc) {\n    if (!inc) { return; }\n\n    let speed = 400;\n    while (true) {\n      this.incrementProperty('count', inc);\n      yield timeout(speed);\n      speed = Math.max(50, speed * 0.8);\n    }\n  }).restartable(),\n});",
    "increment-button.js": "function sendPress() {\n  this.sendAction('press');\n}\n\nfunction sendRelease() {\n  this.sendAction('release');\n}\n\nexport default Ember.Component.extend({\n  tagName: 'button',\n\n  touchStart: sendPress,\n  mouseDown:  sendPress,\n  touchEnd:   sendRelease,\n  mouseLeave: sendRelease,\n  mouseUp:    sendRelease,\n});",
    "intro-task-oldschool.js": "import Ember from 'ember';\n\nexport default Ember.Component.extend({\n  count: 0,\n\n  startCounting() {\n    this.cancelTimer();\n    this.set('count', 0);\n    this.step();\n  },\n\n  step() {\n    if (this.count < 5) {\n      this.incrementProperty('count');\n      this.timerId = Ember.run.later(this, this.step, 300);\n    } else {\n      this.set('count', \"DONE!\");\n    }\n  },\n\n  willDestroy() {\n    this.cancelTimer();\n  },\n\n  cancelTimer() {\n    if (this.timerId) {\n      Ember.run.cancel(this.timerId);\n      this.timerId = null;\n    }\n  },\n\n  actions: {\n    startCounting() {\n      this.startCounting();\n    }\n  }\n});",
    "intro-task.js": "import Ember from 'ember';\nimport { task, timeout } from 'ember-concurrency';\n\nexport default Ember.Component.extend({\n  count: 0,\n\n  countingTask: task(function * () {\n    this.set('count', 0);\n    while (this.count < 5) {\n      this.incrementProperty('count');\n      yield timeout(300);\n    }\n    this.set('count', \"DONE!\");\n  }).restartable()\n});",
    "joining-tasks-template.hbs": "<p>\n  <button {{action parent.perform 'all'}}>all()</button>\n  <button {{action parent.perform 'race'}}>race()</button>\n</p>",
    "joining-tasks.js": "import { task, timeout, all, race } from 'ember-concurrency';\nconst methods = { all, race };\n\nexport default Ember.Controller.extend({\n  status: \"Waiting...\",\n  trackers: null,\n\n  parent: task(function * (methodName) {\n    let allOrRace = methods[methodName];\n    let trackers = [], childTasks = [];\n\n    for (let id = 0; id < 5; ++id) {\n      let tracker = ProgressTracker.create({ id });\n      trackers.push(tracker);\n      childTasks.push(this.get('child').perform(tracker));\n    }\n\n    this.set('trackers', trackers);\n    this.set('status', \"Waiting for child tasks to complete...\");\n    let words = yield allOrRace(childTasks);\n    this.set('status', `Done: ${Ember.makeArray(words).join(', ')}`);\n  }).restartable(),\n\n  child: task(function * (tracker) {\n    let percent = 0;\n    while (percent < 100) {\n      yield timeout(Math.random() * 100 + 100);\n      percent = Math.min(100, Math.floor(percent + Math.random() * 20));\n      tracker.set('percent', percent);\n    }\n    let word = randomWord();\n    tracker.set('word', word);\n    return word;\n  }).maxConcurrency(3),\n\n  colors: [ '#ff8888', '#88ff88', '#8888ff' ],\n});",
    "lifetime-template.hbs": "<h5>\n  Count-up:\n  {{#if isDisplaying}}\n    {{count-up}}\n  {{else}}\n    ...\n  {{/if}}\n</h5>",
    "lifetime.js": "export default Ember.Controller.extend({\n  isDisplaying: false,\n\n  togglingLoop: task(function * () {\n    while (true) {\n      this.toggleProperty('isDisplaying');\n      yield timeout(1500);\n    }\n  }).on('init'),\n});",
    "loading-ui-controller.js": "export default Ember.Controller.extend({\n  askQuestion: task(function * () {\n    yield timeout(1000);\n    this.set('result', Math.random());\n  }).drop(),\n\n  result: null,\n});",
    "press-and-hold-buttons.hbs": "<p>\n  {{#press-and-hold-button\n    press=(action incrementBy.perform -1)\n    release=(action incrementBy.perform 0)}}\n      --Decrease\n  {{/press-and-hold-button}}\n\n  {{#press-and-hold-button\n    press=(action incrementBy.perform 1)\n    release=(action incrementBy.perform 0)}}\n      Increase++\n  {{/press-and-hold-button}}\n</p>",
    "scrambled-text.js": "  startScrambling: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      let pauseTime = 140;\n      while (pauseTime > 5) {\n        this.set('scrambledText', scramble(text));\n        yield timeout(pauseTime);\n        pauseTime = pauseTime * 0.95;\n      }\n      this.set('scrambledText', text);\n      yield timeout(1500);\n    }\n  }).on('init'),",
    "shared-tasks-concurrent.js": "export default Ember.Controller.extend({\n  restartableTask3: task(SHARED_TASK_FN).maxConcurrency(3).restartable(),\n  enqueuedTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueue(),\n  droppingTask3:    task(SHARED_TASK_FN).maxConcurrency(3).drop(),\n});",
    "shared-tasks.js": "export default Ember.Controller.extend({\n  defaultTask:     task(SHARED_TASK_FN),\n  restartableTask: task(SHARED_TASK_FN).restartable(),\n  enqueuedTask:    task(SHARED_TASK_FN).enqueue(),\n  droppingTask:    task(SHARED_TASK_FN).drop(),\n});",
    "start-task-example-template.hbs": "  <button {{action 'performTask' \"one\"}}>\n    1. task.perform(...)\n  </button>\n\n  <button {{action myTask.perform \"two\"}}>\n    2. task.perform action\n  </button>\n\n  <button {{action \"triggerFoo\" \"three\"}}>\n    3. .on('foo')\n  </button>",
    "start-task-example.js": "  myTask: task(function * (msg) {\n    let m = {\n      text: `myTask invoked with the following: ${msg || \"init\"}... `\n    };\n    this.messages.pushObject(m);\n    yield timeout(500);\n    Ember.set(m, 'text', m.text + \"Done\");\n  }).on('init', 'foo'),\n\n  actions: {\n    performTask(msg) {\n      // This demonstrates how you can .get() a reference\n      // to a task and then run it with .perform(), but\n      // ideally you should just invoke myTask.perform\n      // directly from the template.\n      this.get('myTask').perform(msg);\n    },\n    triggerFoo(msg) {\n      this.trigger('foo', msg);\n    }\n  }",
    "writing-tasks.js": "import Ember from 'ember';\nimport { task } from 'ember-concurrency';\n\nexport default Ember.Component.extend({\n  myTask: task(function * () {\n    alert(\"hello!\");\n  })\n});\n\n"
  };
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
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
      statements: [["content", "source", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.1",
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
        "moduleName": "dummy/templates/index.hbs"
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
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "class", "centered");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" is an ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("Ember Addon");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" that enables\n      you to write concise, worry-free, cancelable, restartable, asynchronous tasks.\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3, "class", "centered");
        var el4 = dom.createTextNode("Basic Example");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "six columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "six columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("\n      Imagine writing the above using timers (or Promises):\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("You would need to use ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("callbacks");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("These callbacks would require some sort of ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("recursive call");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          to take the next \"step\"");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("You would need to implement ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("lifecycle hooks");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" to stop the animation\n          when the component is unrendered");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("You would need to ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("cancel timers");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" and in some cases add\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("code");
        var el6 = dom.createTextNode("if (this.isDestroyed)");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" guards to your callbacks\n          to prevent out-of-bounds errors (such as\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("em");
        var el6 = dom.createTextNode("\"Assertion Failed: calling set on destroyed object\"");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(")\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      By leveraging generator function syntax (");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("function *");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and the\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("yield");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" keyword), ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" lets you\n      write ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("extremely clear asynchronous code");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and takes care of all the messy stuff:\n      tearing down asynchronous tasks (and ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("canceling");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" them where possible, \n      e.g. ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("AJAX requests");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("), scoping asynchronous tasks to the lifetime\n      of the object they live on (e.g. Components), and preventing undesired\n      concurrency between tasks.\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("\n      But that's just the beginning...\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      Please take a look at the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" to discover all the ways\n      ember-concurrency can help.\n    ");
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 3]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(element2, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [13]), 1, 1);
        return morphs;
      },
      statements: [["inline", "caps-marquee", [], ["text", "ember-concurrency"], ["loc", [null, [14, 12], [14, 53]]]], ["inline", "code-snippet", [], ["name", "caps-marquee.js"], ["loc", [null, [16, 8], [16, 47]]]], ["inline", "scrambled-text", [], ["text", "ember-concurrency"], ["loc", [null, [19, 12], [19, 55]]]], ["inline", "code-snippet", [], ["name", "scrambled-text.js"], ["loc", [null, [21, 8], [21, 49]]]], ["inline", "link-to", ["documentation", "docs"], [], ["loc", [null, [57, 32], [57, 66]]]]],
      locals: [],
      templates: []
    };
  })());
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
  require("dummy/app")["default"].create({"name":"ember-concurrency","version":"0.5.6+84582961"});
}

/* jshint ignore:end */
