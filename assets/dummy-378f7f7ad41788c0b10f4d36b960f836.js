"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember-resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _dummyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _dummyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
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
        "revision": "Ember@2.2.0",
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
define("dummy/components/channel-actions/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "dummy/components/channel-actions/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  not blocking\n");
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
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "dummy/components/channel-actions/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  BLOCKING\n");
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
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "dummy/components/channel-actions/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Channel Actions");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("hello: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "button-group");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
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
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "button-group");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        dom.setAttribute(el3, "class", "button");
        var el4 = dom.createTextNode("Button 1");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        dom.setAttribute(el3, "class", "button");
        var el4 = dom.createTextNode("Button 2");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        dom.setAttribute(el3, "class", "button");
        var el4 = dom.createTextNode("Button 3");
        dom.appendChild(el3, el4);
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
        var element0 = dom.childAt(fragment, [4]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        return morphs;
      },
      statements: [["content", "foo", ["loc", [null, [3, 10], [3, 17]]]], ["inline", "action-button", [], ["text", "wat", "action", ["subexpr", "@mut", [["get", "borf", ["loc", [null, [6, 36], [6, 40]]]]], [], []]], ["loc", [null, [6, 2], [6, 42]]]], ["inline", "action-button", [], ["text", "genAction", "action", ["subexpr", "@mut", [["get", "genAction", ["loc", [null, [7, 42], [7, 51]]]]], [], []]], ["loc", [null, [7, 2], [7, 53]]]], ["block", "if", [["get", "sharedActionsChannel.hasTakers", ["loc", [null, [10, 6], [10, 36]]]]], [], 0, 1, ["loc", [null, [10, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
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
define('dummy/components/color-square/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    attributeBindings: 'style',
    style: _ember['default'].computed('color', function () {
      var color = this.get('color');
      return 'width: 100px; height: 100px; background-color: ' + color;
    }),

    color: 'red',

    init: function init() {
      this._super();
      if (this.get('autoStart')) {
        this.get('colorAlternator').start();
      }
    },

    colorAlternator: (0, _emberConcurrency.process)(regeneratorRuntime.mark(function callee$0$0() {
      var colors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, color;

      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            colors = ['red', 'blue', 'green'];

          case 1:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$1$0.prev = 4;
            _iterator = colors[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$1$0.next = 14;
              break;
            }

            color = _step.value;

            this.set('color', color);
            context$1$0.next = 11;
            return (0, _emberConcurrency.sleep)(this.get('ms'));

          case 11:
            _iteratorNormalCompletion = true;
            context$1$0.next = 6;
            break;

          case 14:
            context$1$0.next = 20;
            break;

          case 16:
            context$1$0.prev = 16;
            context$1$0.t0 = context$1$0['catch'](4);
            _didIteratorError = true;
            _iteratorError = context$1$0.t0;

          case 20:
            context$1$0.prev = 20;
            context$1$0.prev = 21;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 23:
            context$1$0.prev = 23;

            if (!_didIteratorError) {
              context$1$0.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return context$1$0.finish(23);

          case 27:
            return context$1$0.finish(20);

          case 28:
            context$1$0.next = 1;
            break;

          case 30:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[4, 16, 20, 28], [21,, 23, 27]]);
    })),

    click: function click() {
      var process = this.get('colorAlternator');
      if (process.isRunning) {
        process.kill();
      } else {
        process.start();
      }
    }
  });
});
define("dummy/components/color-square/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "dummy/components/color-square/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	RUNNING\n");
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
          "revision": "Ember@2.2.0",
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
          "moduleName": "dummy/components/color-square/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	stopped\n");
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
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/components/color-square/template.hbs"
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
      statements: [["block", "if", [["get", "colorAlternator.isRunning", ["loc", [null, [1, 6], [1, 31]]]]], [], 0, 1, ["loc", [null, [1, 0], [5, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('dummy/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
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
        "revision": "Ember@2.2.0",
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
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 2
            },
            "end": {
              "line": 20,
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
        statements: [["content", "m.text", ["loc", [null, [19, 8], [19, 18]]]]],
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
        "revision": "Ember@2.2.0",
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
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n    2. task.perform action\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
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
      statements: [["element", "action", ["performTask", "one"], [], ["loc", [null, [3, 10], [3, 40]]]], ["element", "action", [["get", "myTask.perform", ["loc", [null, [6, 19], [6, 33]]]], "two"], [], ["loc", [null, [6, 10], [6, 41]]]], ["element", "action", ["triggerFoo", "three"], [], ["loc", [null, [9, 10], [9, 41]]]], ["block", "each", [["get", "messages", ["loc", [null, [18, 10], [18, 18]]]]], [], 0, null, ["loc", [null, [18, 2], [20, 11]]]], ["inline", "code-snippet", [], ["name", "start-task-example.js"], ["loc", [null, [25, 0], [25, 45]]]], ["inline", "code-snippet", [], ["name", "start-task-example-template.hbs"], ["loc", [null, [29, 0], [29, 55]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('dummy/components/x-music/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    playMusic: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function callee$0$0() {
      var i, AudioContext, context, beepOscillator, beepGain, bps, halfTimeout;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i++ < 6)) {
              context$1$0.next = 7;
              break;
            }

            this.set('value', i);
            context$1$0.next = 5;
            return (0, _emberConcurrency.sleep)(150);

          case 5:
            context$1$0.next = 1;
            break;

          case 7:
            AudioContext = window.AudioContext || window.webkitAudioContext;

            if (AudioContext) {
              context$1$0.next = 11;
              break;
            }

            console.error("AudioContext not detected... perhaps web audio api not supported?");
            return context$1$0.abrupt('return');

          case 11:
            context = undefined, beepOscillator = undefined;
            context$1$0.prev = 12;

            context = new AudioContext();
            beepOscillator = context.createOscillator();
            beepOscillator.frequency.value = 300;

            beepGain = context.createGain();

            beepGain.gain.value = 0;

            beepOscillator.connect(beepGain);
            beepOscillator.type = 'triangle';
            beepGain.connect(context.destination);

            beepOscillator.start(0);

            bps = this.get('bpm') / 60.0;
            halfTimeout = 1 / bps / 2 * 1000;
            context$1$0.next = 26;
            return (0, _emberConcurrency.sleep)(Math.random() * 1000);

          case 26:
            // main
            beepOscillator.frequency.value = 100 + Math.random() * 600;
            beepGain.gain.setTargetAtTime(0.5, context.currentTime, 0.01);
            this.set('isPlaying', true);
            context$1$0.next = 31;
            return (0, _emberConcurrency.sleep)(halfTimeout);

          case 31:

            beepGain.gain.setTargetAtTime(0, context.currentTime, 0.01);
            this.set('isPlaying', false);
            context$1$0.next = 35;
            return (0, _emberConcurrency.sleep)(halfTimeout);

          case 35:
            context$1$0.next = 26;
            break;

          case 37:
            context$1$0.prev = 37;

            if (context) {
              context.close();
            }

            if (beepOscillator) {
              beepOscillator.stop();
            }
            return context$1$0.finish(37);

          case 41:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[12,, 37, 41]]);
    })).autoStart(),

    isPlaying: false
  });
});

// sleep randomly so that multiple x-musics don't annoying start at the same time.
define("dummy/components/x-music/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "dummy/components/x-music/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ♪\n  ♪\n  ♪\n");
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
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/components/x-music/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Saxamaphone:\n");
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
      statements: [["block", "if", [["get", "isPlaying", ["loc", [null, [2, 6], [2, 15]]]]], [], 0, null, ["loc", [null, [2, 0], [6, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('dummy/components/x-task/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Component.extend({
    group: null,
    task: (0, _emberConcurrency.task)('group', regeneratorRuntime.mark(function callee$0$0() {
      var i;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i++ < 6)) {
              context$1$0.next = 7;
              break;
            }

            this.set('value', i);
            context$1$0.next = 5;
            return (0, _emberConcurrency.sleep)(150);

          case 5:
            context$1$0.next = 1;
            break;

          case 7:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this);
    })),

    cssClass: _ember['default'].computed('task.isRunning', 'task.isPerformable', function () {
      if (this.get('task.isRunning')) {
        return 'running';
      } else if (!this.get('task.isPerformable')) {
        return 'disabled';
      } else {
        return 'ready';
      }
    }),

    value: 0
  });
});
define("dummy/components/x-task/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "modifiers",
          "modifiers": ["action"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/components/x-task/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\nPerform me ");
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
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(element0, 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["btn ", ["get", "cssClass", ["loc", [null, [1, 18], [1, 26]]]]]]], ["element", "action", [["get", "task.perform", ["loc", [null, [1, 39], [1, 51]]]], 123], [], ["loc", [null, [1, 30], [1, 57]]]], ["content", "value", ["loc", [null, [2, 11], [2, 20]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/components/yielding-promises/component', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  var delay = function delay(ms) {
    return new _ember['default'].RSVP.Promise(function (r) {
      _ember['default'].run.later(r, ms);
    });
  };

  exports['default'] = _ember['default'].Component.extend({
    status: "Ready",

    numInvocations: 0,

    promiseHandler: (0, _emberConcurrency.process)(regeneratorRuntime.mark(function callee$0$0(promise) {
      var value;
      return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.prev = 0;

            this.set('status', "Resolving a promise...");
            context$1$0.next = 4;
            return promise;

          case 4:
            value = context$1$0.sent;

            this.set('status', 'OK, promise resolved with ' + value);
            context$1$0.next = 11;
            break;

          case 8:
            context$1$0.prev = 8;
            context$1$0.t0 = context$1$0['catch'](0);

            this.set('status', 'Oh no, it rejected with a value of ' + context$1$0.t0);

          case 11:
            context$1$0.prev = 11;

            this.incrementProperty('numInvocations');
            return context$1$0.finish(11);

          case 14:
          case 'end':
            return context$1$0.stop();
        }
      }, callee$0$0, this, [[0, 8, 11, 14]]);
    })),

    actions: {
      doFulfillPromise: function doFulfillPromise() {
        var promise = delay(1000).then(function () {
          return "HOORAY";
        });
        this.get('promiseHandler').start(promise);
      },
      doRejectPromise: function doRejectPromise() {
        var promise = delay(1000).then(function () {
          return _ember['default'].RSVP.Promise.reject("ERROR");
        });
        this.get('promiseHandler').start(promise);
      }
    }
  });
});
define("dummy/components/yielding-promises/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/components/yielding-promises/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Status: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Fulfill");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Reject");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("I have resolved ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" promise(s)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "status", ["loc", [null, [1, 11], [1, 21]]]], ["element", "action", ["doFulfillPromise"], [], ["loc", [null, [3, 9], [3, 38]]]], ["element", "action", ["doRejectPromise"], [], ["loc", [null, [4, 9], [4, 37]]]], ["content", "numInvocations", ["loc", [null, [7, 19], [7, 37]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/controllers/tasks', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {
  exports['default'] = _ember['default'].Controller.extend({
    taskGroup0: (0, _emberConcurrency.task)(),
    taskGroup1: (0, _emberConcurrency.task)()
  });
});
define("dummy/docs/controller", ["exports", "ember"], function (exports, _ember) {
  var computed = _ember["default"].computed;
  exports["default"] = _ember["default"].Controller.extend({
    appController: _ember["default"].inject.controller('application'),

    tableOfContents: [{ route: "docs", title: "Introduction" },

    //{ route: "docs.loops",   title: "Loops"},

    { title: "Examples", route: "docs.examples",
      children: [{ route: "docs.examples.starting-a-task", title: "Starting a Task" }, { route: "docs.examples.autocomplete", title: "Auto-Search + ember-power-select" }]
    }],

    //{ route: 'transition-map', title: 'Transition Map',
    //children: [
    //{route: 'transition-map.route-constraints', title: 'Matching by route & model'},
    //{route: 'transition-map.value-constraints', title: 'Matching by value'},
    //{route: 'transition-map.dom-constraints', title: 'Matching by DOM context'},
    //{route: 'transition-map.initial-constraints', title: 'Matching initial renders'},
    //{route: 'transition-map.choosing-transitions', title: 'Choosing transition animations'},
    //{route: 'transition-map.debugging-constraints', title: 'Debugging transition matching'}
    //]
    //},
    //{ route: 'transitions', title: 'Transitions',
    //children: [
    //{route: 'transitions.predefined', title: "Predefined transitions"},
    //{route: 'transitions.explode', title: "explode"},
    //{route: 'transitions.defining', title: 'Defining custom transitions'},
    //{route: 'transitions.primitives', title: 'Animation Primitives'}
    //]
    //},
    //{ route: 'modal-documentation', title: 'Modal Dialogs',
    //children: [
    //{route: 'modal-documentation.modal', title: 'modal()'},
    //{route: 'modal-documentation.component', title: 'Modal Components'},
    //{route: 'modal-documentation.animation', title: 'Customizing Animation'}
    //]
    //}
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
          current = this.get('application.currentRouteName'),
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
define('dummy/docs/examples/autocomplete/controller', ['exports', 'ember', 'ember-concurrency'], function (exports, _ember, _emberConcurrency) {

  // Wrap the $.getJSON API so that it's cancellable.
  function cancellableGetJSON(url) {
    return (0, _emberConcurrency.createObservable)(function (publish) {
      var xhr = _ember['default'].$.getJSON(url);
      xhr.then(publish, publish.error);

      return function () {
        xhr.abort();
      };
    });
  }

  // BEGIN-SNIPPET debounced-search-with-cancellation
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
            return cancellableGetJSON(url);

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
// the current search will be cancelled at this point and
// start over from the beginning. This is the
// ember-concurrency way of debouncing a task.

// We yield AJAX request and wait for it to complete. If the task
// is restarted before this request completes, the XHR request
// is aborted (open the inspector and see for yourself :)
define("dummy/docs/examples/autocomplete/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
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
        "revision": "Ember@2.2.0",
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
      statements: [["block", "power-select", [], ["search", ["subexpr", "@mut", [["get", "searchRepo.perform", ["loc", [null, [20, 25], [20, 43]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [21, 27], [21, 35]]]]], [], []], "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "selected", ["loc", [null, [22, 40], [22, 48]]]]], [], ["loc", [null, [22, 35], [22, 49]]]]], [], ["loc", [null, [22, 27], [22, 50]]]]], 0, null, ["loc", [null, [20, 2], [24, 19]]]], ["inline", "code-snippet", [], ["name", "debounced-search-with-cancellation.js"], ["loc", [null, [30, 0], [30, 61]]]], ["inline", "code-snippet", [], ["name", "debounced-search-with-cancellation-template.hbs"], ["loc", [null, [34, 0], [34, 71]]]]],
      locals: [],
      templates: [child0]
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
        "revision": "Ember@2.2.0",
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
define("dummy/docs/examples/starting-a-task/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/docs/examples/starting-a-task/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
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
        var el3 = dom.createTextNode("\n    In your Handlebars template, pass ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("nameOfTask.perform");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" to the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("action");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    helper or into components as actions. This is the most direct and preferable way to\n    invoke a task, but keep in mind that for this to work you must ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("not");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" declare\n    the hash in the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("actions");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" hash.\n  ");
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        return morphs;
      },
      statements: [["content", "start-task-example", ["loc", [null, [30, 0], [30, 22]]]]],
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
        "revision": "Ember@2.2.0",
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
        var el2 = dom.createTextNode(" is a toolset that supplements\n  Ember's existing tools and conventions for handling concurrency and\n  asynchrony.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Motivation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "http://emberjs.com/api/classes/RSVP.Promise.html");
        var el3 = dom.createTextNode("Promises");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  are a powerful tool for expressing fault-tolerant, asynchronous operations.\n  (If you are unfamiliar or inexperienced with Promises, you\n  should familiarize yourself with them first before considering\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("ember-concurrency");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" in your projects.) But while Ember\n  provides many promise-friendly APIs to help you build your apps,\n  even careful, idiomatic use of Promises in Ember apps leaves room for\n  a slew of concurrency / async-related bugs and leaks to sneak in.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("WORK IN PROGRESS");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\nBoth ember-concurrency and these docs are a work in progress; while I\nwork to fill out these docs, please check out some of the examples on\nthe left.\n\n");
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
define("dummy/docs/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 12
                },
                "end": {
                  "line": 9,
                  "column": 51
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
            statements: [["content", "entry.title", ["loc", [null, [9, 36], [9, 51]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 10
              },
              "end": {
                "line": 10,
                "column": 10
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
          statements: [["block", "link-to", [["get", "entry.route", ["loc", [null, [9, 23], [9, 34]]]]], [], 0, null, ["loc", [null, [9, 12], [9, 63]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 10
              },
              "end": {
                "line": 12,
                "column": 10
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
          statements: [["content", "entry.title", ["loc", [null, [11, 12], [11, 27]]]]],
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
                "revision": "Ember@2.2.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 18,
                    "column": 14
                  },
                  "end": {
                    "line": 18,
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
              statements: [["content", "child.title", ["loc", [null, [18, 38], [18, 53]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 16,
                  "column": 12
                },
                "end": {
                  "line": 20,
                  "column": 12
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
              var el1 = dom.createTextNode("            ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("li");
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n            ");
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
            statements: [["block", "link-to", [["get", "child.route", ["loc", [null, [18, 25], [18, 36]]]]], [], 0, null, ["loc", [null, [18, 14], [18, 65]]]]],
            locals: ["child"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 10
              },
              "end": {
                "line": 22,
                "column": 10
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
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("ul");
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
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "entry.children", ["loc", [null, [16, 20], [16, 34]]]]], ["key", "route"], 0, null, ["loc", [null, [16, 12], [20, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 24,
              "column": 8
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
          var el1 = dom.createTextNode("        ");
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
          var el2 = dom.createTextNode("        ");
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
        statements: [["block", "if", [["get", "entry.route", ["loc", [null, [8, 16], [8, 27]]]]], [], 0, 1, ["loc", [null, [8, 10], [12, 17]]]], ["block", "if", [["get", "entry.children", ["loc", [null, [14, 16], [14, 30]]]]], [], 2, null, ["loc", [null, [14, 10], [22, 17]]]]],
        locals: ["entry"],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
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
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "docs row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "three columns");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "side-menu");
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "nine columns");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
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
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "tableOfContents", ["loc", [null, [6, 16], [6, 31]]]]], ["key", "route"], 0, null, ["loc", [null, [6, 8], [24, 17]]]], ["content", "outlet", ["loc", [null, [30, 4], [30, 14]]]]],
      locals: [],
      templates: [child0]
    };
  })());
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
define('dummy/helpers/hash', ['exports', 'ember-hash-helper-polyfill/helpers/hash'], function (exports, _emberHashHelperPolyfillHelpersHash) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberHashHelperPolyfillHelpersHash['default'];
    }
  });
  Object.defineProperty(exports, 'hash', {
    enumerable: true,
    get: function get() {
      return _emberHashHelperPolyfillHelpersHash.hash;
    }
  });
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
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _dummyConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('docs', function () {
      this.route('examples', function () {
        this.route('autocomplete');
        this.route('starting-a-task');
      });
    });

    //this.route('ajax');
    //this.route('color');
    //this.route('yielding');
    //this.route('tasks');
    //this.route('music');
    //this.route('auto-complete');
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
define("dummy/snippets", ["exports"], function (exports) {
  exports["default"] = {
    "caps-marquee.js": "  marqueeLoop: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      this.set('formattedText', text);\n      yield timeout(1500);\n      for (let i = 0; i < text.length; ++i) {\n        this.set('formattedText', capitalizeAt(text, i));\n        yield timeout(50);\n      }\n    }\n  }).on('init'),",
    "debounced-search-with-cancellation-template.hbs": "  {{#power-select search=searchRepo.perform\n                  selected=selected\n                  onchange=(action (mut selected)) as |repo|}}\n    {{repo.full_name}}\n  {{/power-select}}",
    "debounced-search-with-cancellation.js": "const DEBOUNCE_MS = 250;\nexport default Ember.Controller.extend({\n  searchRepo: task(function * (term) {\n    if (Ember.isBlank(term)) { return []; }\n\n    // Pause here for DEBOUNCE_MS milliseconds. Because this\n    // task is `.restartable()`, if the user starts typing again,\n    // the current search will be cancelled at this point and\n    // start over from the beginning. This is the\n    // ember-concurrency way of debouncing a task.\n    yield timeout(DEBOUNCE_MS);\n\n    let url = `https://api.github.com/search/repositories?q=${term}`;\n\n    // We yield AJAX request and wait for it to complete. If the task\n    // is restarted before this request completes, the XHR request\n    // is aborted (open the inspector and see for yourself :)\n    let json = yield cancellableGetJSON(url);\n    return json.items;\n  }).restartable(),\n});",
    "sample-template.hbs": "<p>\nhere is some code\n</p>\n",
    "scrambled-text.js": "  startScrambling: task(function * () {\n    let text = this.get('text');\n    while (true) {\n      let pauseTime = 140;\n      while (pauseTime > 5) {\n        this.set('scrambledText', scramble(text));\n        yield timeout(pauseTime);\n        pauseTime = pauseTime * 0.95;\n      }\n      this.set('scrambledText', text);\n      yield timeout(1500);\n    }\n  }).on('init'),",
    "start-task-example-template.hbs": "  <button {{action 'performTask' \"one\"}}>\n    1. task.perform(...)\n  </button>\n  <button {{action myTask.perform \"two\"}}>\n    2. task.perform action\n  </button>\n  <button {{action \"triggerFoo\" \"three\"}}>\n    3. .on('foo')\n  </button>",
    "start-task-example.js": "  myTask: task(function * (msg) {\n    let m = {\n      text: `myTask invoked with the following: ${msg || \"init\"}... `\n    };\n    this.messages.pushObject(m);\n    yield timeout(500);\n    Ember.set(m, 'text', m.text + \"Done\");\n  }).on('init', 'foo'),\n\n  actions: {\n    performTask(msg) {\n      // This demonstrates how you can .get() a reference\n      // to a task and then run it with .perform(), but\n      // ideally you should just invoke myTask.perform\n      // directly from the template.\n      this.get('myTask').perform(msg);\n    },\n    triggerFoo(msg) {\n      this.trigger('foo', msg);\n    }\n  }"
  };
});
define("dummy/templates/ajax", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/templates/ajax.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("async-await (ish) flow, with cancellation");
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "ajax-progress", ["loc", [null, [3, 0], [3, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/application.hbs"
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
        dom.setAttribute(el3, "class", "six columns");
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
        dom.setAttribute(el3, "class", "two columns");
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
        dom.setAttribute(el3, "class", "two columns");
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
        dom.setAttribute(el3, "class", "two columns");
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [3, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [5, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "link-to", ["Home", "index"], [], ["loc", [null, [8, 8], [8, 34]]]], ["inline", "link-to", ["Docs", "docs"], [], ["loc", [null, [13, 8], [13, 33]]]], ["content", "outlet", ["loc", [null, [24, 0], [24, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/auto-complete", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/templates/auto-complete.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("auto-complete");
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "auto-complete", ["loc", [null, [3, 0], [3, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/color", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/templates/color.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Squares (click to start/stop)");
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
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        return morphs;
      },
      statements: [["inline", "color-square", [], ["ms", 900, "autoStart", true], ["loc", [null, [3, 0], [3, 38]]]], ["inline", "color-square", [], ["ms", 400], ["loc", [null, [4, 0], [4, 23]]]], ["inline", "color-square", [], ["ms", 650, "autoStart", true], ["loc", [null, [5, 0], [5, 38]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "revision": "Ember@2.2.0",
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
        var el4 = dom.createTextNode(" that enables you to:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "four columns");
        var el5 = dom.createTextNode("\n        Use an ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("Async/Await-like syntax");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" to easily express complex,\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("cancellable");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(", and ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("restartable");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" tasks.\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "four columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("Say goodbye to error-prone boilerplate");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" for managing asynchrony, including:\n        timer cancellation, deactivate & willDestroy hooks,\n        isDestroyed checks, and others.\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "four columns");
        var el5 = dom.createTextNode("\n        Loop over streams of ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("Ember.Evented");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" events\n        (and optionally ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("Rx.Observables");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("), with\n        built-in ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("backpressure");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" support, and no\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("Callback Hell");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("™.\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
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
        var el4 = dom.createTextNode("\n      Imagine writing the above using timers:\n    ");
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
        var el4 = dom.createTextNode(" let's you\n      write ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("extremely clear asynchronous code");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and takes care of all the messy stuff:\n      tearing down asynchronous tasks (and ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("cancelling");
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
        var el4 = dom.createTextNode("\n      Please take a look at the documentation to discover all the ways\n      ember-concurrency can help.\n    ");
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
        var element0 = dom.childAt(fragment, [0, 3, 3]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(element2, 3, 3);
        return morphs;
      },
      statements: [["inline", "caps-marquee", [], ["text", "ember-concurrency"], ["loc", [null, [29, 12], [29, 53]]]], ["inline", "code-snippet", [], ["name", "caps-marquee.js"], ["loc", [null, [31, 8], [31, 47]]]], ["inline", "scrambled-text", [], ["text", "ember-concurrency"], ["loc", [null, [34, 12], [34, 55]]]], ["inline", "code-snippet", [], ["name", "scrambled-text.js"], ["loc", [null, [36, 8], [36, 49]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/music", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/music.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("music");
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
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        return morphs;
      },
      statements: [["inline", "x-music", [], ["bpm", 120], ["loc", [null, [3, 0], [3, 19]]]], ["inline", "x-music", [], ["bpm", 143], ["loc", [null, [4, 0], [4, 19]]]], ["inline", "x-music", [], ["bpm", 300], ["loc", [null, [5, 0], [5, 19]]]], ["inline", "x-music", [], ["bpm", 50], ["loc", [null, [6, 0], [6, 18]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/tasks", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/templates/tasks.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Tasks");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("grouped to taskGroup0");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("grouped to taskGroup1");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        return morphs;
      },
      statements: [["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup0", ["loc", [null, [5, 15], [5, 25]]]]], [], []]], ["loc", [null, [5, 0], [5, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup0", ["loc", [null, [6, 15], [6, 25]]]]], [], []]], ["loc", [null, [6, 0], [6, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup0", ["loc", [null, [7, 15], [7, 25]]]]], [], []]], ["loc", [null, [7, 0], [7, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup0", ["loc", [null, [8, 15], [8, 25]]]]], [], []]], ["loc", [null, [8, 0], [8, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup1", ["loc", [null, [12, 15], [12, 25]]]]], [], []]], ["loc", [null, [12, 0], [12, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup1", ["loc", [null, [13, 15], [13, 25]]]]], [], []]], ["loc", [null, [13, 0], [13, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup1", ["loc", [null, [14, 15], [14, 25]]]]], [], []]], ["loc", [null, [14, 0], [14, 27]]]], ["inline", "x-task", [], ["group", ["subexpr", "@mut", [["get", "taskGroup1", ["loc", [null, [15, 15], [15, 25]]]]], [], []]], ["loc", [null, [15, 0], [15, 27]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("dummy/templates/yielding", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
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
        "moduleName": "dummy/templates/yielding.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Yielding promises that fulfill/reject");
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "yielding-promises", ["loc", [null, [3, 0], [3, 21]]]]],
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

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-concurrency","version":"0.4.7+410fa1d8"});
}

/* jshint ignore:end */
