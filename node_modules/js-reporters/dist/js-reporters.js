/**
 * JsReporters 1.2.1
 * https://github.com/js-reporters
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: Tue Jul 04 2017
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.JsReporters = factory());
}(this, (function () { 'use strict';

function interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var events = createCommonjsModule(function (module) {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function (n) {
    if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };

  EventEmitter.prototype.emit = function (type) {
    var er, handler, len, args, i, listeners;

    if (!this._events) this._events = {};

    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
      }
    }

    handler = this._events[type];

    if (isUndefined(handler)) return false;

    if (isFunction(handler)) {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++) {
        listeners[i].apply(this, args);
      }
    }

    return true;
  };

  EventEmitter.prototype.addListener = function (type, listener) {
    var m;

    if (!isFunction(listener)) throw TypeError('listener must be a function');

    if (!this._events) this._events = {};

    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

    if (!this._events[type])
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;else if (isObject(this._events[type]))
      // If we've already got an array, just append.
      this._events[type].push(listener);else
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];

    // Check for listener leak
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
        if (typeof console.trace === 'function') {
          // not supported in IE 10
          console.trace();
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.once = function (type, listener) {
    if (!isFunction(listener)) throw TypeError('listener must be a function');

    var fired = false;

    function g() {
      this.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }

    g.listener = listener;
    this.on(type, g);

    return this;
  };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function (type, listener) {
    var list, position, length, i;

    if (!isFunction(listener)) throw TypeError('listener must be a function');

    if (!this._events || !this._events[type]) return this;

    list = this._events[type];
    length = list.length;
    position = -1;

    if (list === listener || isFunction(list.listener) && list.listener === listener) {
      delete this._events[type];
      if (this._events.removeListener) this.emit('removeListener', type, listener);
    } else if (isObject(list)) {
      for (i = length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }

      if (this._events.removeListener) this.emit('removeListener', type, listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function (type) {
    var key, listeners;

    if (!this._events) return this;

    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
      if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }

    listeners = this._events[type];

    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      while (listeners.length) {
        this.removeListener(type, listeners[listeners.length - 1]);
      }
    }
    delete this._events[type];

    return this;
  };

  EventEmitter.prototype.listeners = function (type) {
    var ret;
    if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
    return ret;
  };

  EventEmitter.prototype.listenerCount = function (type) {
    if (this._events) {
      var evlistener = this._events[type];

      if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
    }
    return 0;
  };

  EventEmitter.listenerCount = function (emitter, type) {
    return emitter.listenerCount(type);
  };

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isObject(arg) {
    return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
  }

  function isUndefined(arg) {
    return arg === void 0;
  }
});

var EventEmitter = interopDefault(events);

function getAllTests(suite) {
  var childSuiteTests = suite.childSuites.map(function (childSuite) {
    return getAllTests(childSuite);
  }).reduce(function (allTests, a) {
    return allTests.concat(a);
  }, []);

  return suite.tests.concat(childSuiteTests);
}

function getRuntime(suite) {
  if (suite.status === 'skipped' || suite.status === undefined) {
    return undefined;
  }

  return getAllTests(suite).map(function (test) {
    return test.status === 'skipped' ? 0 : test.runtime;
  }).reduce(function (sum, testRuntime) {
    return sum + testRuntime;
  }, 0);
}

function getStatus(suite) {
  var passed = 0;
  var failed = 0;
  var skipped = 0;
  var todo = 0;
  var tests = getAllTests(suite);

  for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    // If a suite contains a test whose status is still undefined,
    // there is no final status for the suite as well.
    if (test.status === undefined) {
      return undefined;
    } else if (test.status === 'passed') {
      passed++;
    } else if (test.status === 'skipped') {
      skipped++;
    } else if (test.status === 'todo') {
      todo++;
    } else {
      failed++;
    }
  }

  if (failed > 0) {
    return 'failed';
  } else if (skipped > 0 && passed === 0) {
    return 'skipped';
  } else if (todo > 0 && passed === 0) {
    return 'todo';
  } else {
    return 'passed';
  }
}

function getSuiteStartTestCounts(suite) {
  var tests = getAllTests(suite);

  return {
    total: tests.length
  };
}

function getSuiteEndTestCounts(suite) {
  var tests = getAllTests(suite);

  return {
    passed: tests.filter(function (test) {
      return test.status === 'passed';
    }).length,
    failed: tests.filter(function (test) {
      return test.status === 'failed';
    }).length,
    skipped: tests.filter(function (test) {
      return test.status === 'skipped';
    }).length,
    todo: tests.filter(function (test) {
      return test.status === 'todo';
    }).length,
    total: tests.length
  };
}

var Assertion =
/**
 * @param {Boolean} passed
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @param {String|undefined} stack
 * @param {Boolean} todo
 */
function Assertion(passed, actual, expected, message, stack, todo) {
  classCallCheck(this, Assertion);

  this.passed = passed;
  this.actual = actual;
  this.expected = expected;
  this.message = message;
  this.stack = stack;
  this.todo = todo;
};

var TestStart =
/**
 * @param {String} name
 * @param {String} suiteName
 * @param {String[]} fullName
 */
function TestStart(name, suiteName, fullName) {
  classCallCheck(this, TestStart);

  this.name = name;
  this.suiteName = suiteName;
  this.fullName = fullName;
};

var TestEnd =
/**
 * @param {String} name
 * @param {String} suiteName
 * @param {String[]} fullName
 * @param {String} status
 * @param {Number} runtime
 * @param {Assertion[]} errors
 * @param {Assertion[]} assertions
 */
function TestEnd(name, suiteName, fullName, status, runtime, errors, assertions) {
  classCallCheck(this, TestEnd);

  this.name = name;
  this.suiteName = suiteName;
  this.fullName = fullName;
  this.status = status;
  this.runtime = runtime;
  this.errors = errors;
  this.assertions = assertions;
};

var SuiteStart =
/**
 * @param {String} name
 * @param {String[]} fullName
 * @param {Test[]} tests
 * @param {Suite[]} childSuites
 */
function SuiteStart(name, fullName, tests, childSuites, testCounts) {
  classCallCheck(this, SuiteStart);

  this.name = name;
  this.fullName = fullName;
  this.tests = tests;
  this.childSuites = childSuites;
  this.testCounts = getSuiteStartTestCounts(this);
};

var SuiteEnd =
/**
 * @param {String} name
 * @param {String[]} fullName
 * @param {Test[]} tests
 * @param {Suite[]} childSuites
 * @param {String} status
 * @param {Object} testCounts
 * @param {Number} testCounts.passed
 * @param {Number} testCounts.failed
 * @param {Number} testCounts.skipped
 * @param {Number} testCounts.total
 * @param {Number} runtime
 */
function SuiteEnd(name, fullName, tests, childSuites, status, testCounts, runtime) {
  classCallCheck(this, SuiteEnd);

  this.name = name;
  this.fullName = fullName;
  this.tests = tests;
  this.childSuites = childSuites;
  this.status = status || getStatus(this);
  this.testCounts = testCounts || getSuiteEndTestCounts(this);
  this.runtime = runtime || getRuntime(this);
};

var MochaAdapter = function (_EventEmitter) {
  inherits(MochaAdapter, _EventEmitter);

  function MochaAdapter(mocha) {
    classCallCheck(this, MochaAdapter);

    var _this = possibleConstructorReturn(this, (MochaAdapter.__proto__ || Object.getPrototypeOf(MochaAdapter)).call(this));

    _this.mocha = mocha;
    _this.origReporter = mocha._reporter;

    mocha.reporter(function (runner) {
      _this.runner = runner;

      // eslint-disable-next-line no-unused-vars
      var origReporterInstance = new (_this.origReporter.bind(_this.mocha, _this.runner))();

      runner.on('start', _this.onStart.bind(_this));
      runner.on('suite', _this.onSuite.bind(_this));
      runner.on('test', _this.onTest.bind(_this));
      runner.on('pending', _this.onPending.bind(_this));
      runner.on('fail', _this.onFail.bind(_this));
      runner.on('test end', _this.onTestEnd.bind(_this));
      runner.on('suite end', _this.onSuiteEnd.bind(_this));
      runner.on('end', _this.onEnd.bind(_this));
    });
    return _this;
  }

  createClass(MochaAdapter, [{
    key: 'convertToSuiteStart',
    value: function convertToSuiteStart(mochaSuite) {
      return new SuiteStart(mochaSuite.title, this.buildSuiteFullName(mochaSuite), mochaSuite.tests.map(this.convertTest.bind(this)), mochaSuite.suites.map(this.convertToSuiteStart.bind(this)));
    }
  }, {
    key: 'convertToSuiteEnd',
    value: function convertToSuiteEnd(mochaSuite) {
      return new SuiteEnd(mochaSuite.title, this.buildSuiteFullName(mochaSuite), mochaSuite.tests.map(this.convertTest.bind(this)), mochaSuite.suites.map(this.convertToSuiteEnd.bind(this)));
    }
  }, {
    key: 'convertTest',
    value: function convertTest(mochaTest) {
      var suiteName;
      var fullName;

      if (!mochaTest.parent.root) {
        suiteName = mochaTest.parent.title;
        fullName = this.buildSuiteFullName(mochaTest.parent);
        // Add also the test name.
        fullName.push(mochaTest.title);
      } else {
        fullName = [mochaTest.title];
      }

      // If the test has the errors attached a "test end" must be emitted, else
      // a "test start".
      if (mochaTest.errors !== undefined) {
        var status = mochaTest.state === undefined ? 'skipped' : mochaTest.state;
        var errors = [];

        mochaTest.errors.forEach(function (error) {
          errors.push(new Assertion(false, error.actual, error.expected, error.message || error.toString(), error.stack));
        });

        // Test end, for the assertions property pass an empty array.
        return new TestEnd(mochaTest.title, suiteName, fullName, status, mochaTest.duration, errors, errors);
      }

      // Test start.
      return new TestStart(mochaTest.title, suiteName, fullName);
    }

    /**
     * Builds an array with the names of nested suites.
     */

  }, {
    key: 'buildSuiteFullName',
    value: function buildSuiteFullName(mochaSuite) {
      var fullName = [];
      var parent = mochaSuite.parent;

      if (!mochaSuite.root) {
        fullName.push(mochaSuite.title);
      }

      while (parent && !parent.root) {
        fullName.unshift(parent.title);
        parent = parent.parent;
      }

      return fullName;
    }
  }, {
    key: 'onStart',
    value: function onStart() {
      var globalSuiteStart = this.convertToSuiteStart(this.runner.suite);
      globalSuiteStart.name = undefined;

      this.emit('runStart', globalSuiteStart);
    }
  }, {
    key: 'onSuite',
    value: function onSuite(mochaSuite) {
      if (!mochaSuite.root) {
        this.emit('suiteStart', this.convertToSuiteStart(mochaSuite));
      }
    }
  }, {
    key: 'onTest',
    value: function onTest(mochaTest) {
      this.errors = [];

      this.emit('testStart', this.convertTest(mochaTest));
    }

    /**
     * Emits the start of pending tests, because Mocha does not emit skipped tests
     * on its "test" event.
     */

  }, {
    key: 'onPending',
    value: function onPending(mochaTest) {
      this.emit('testStart', this.convertTest(mochaTest));
    }
  }, {
    key: 'onFail',
    value: function onFail(test, error) {
      this.errors.push(error);
    }
  }, {
    key: 'onTestEnd',
    value: function onTestEnd(mochaTest) {
      // Save the errors on Mocha's test object, because when the suite that
      // contains this test is emitted on the "suiteEnd" event, it should contain
      // also this test with all its details (errors, status, runtime). Runtime
      // and status are already attached to the test, but the errors don't.
      mochaTest.errors = this.errors;

      this.emit('testEnd', this.convertTest(mochaTest));
    }
  }, {
    key: 'onSuiteEnd',
    value: function onSuiteEnd(mochaSuite) {
      if (!mochaSuite.root) {
        this.emit('suiteEnd', this.convertToSuiteEnd(mochaSuite));
      }
    }
  }, {
    key: 'onEnd',
    value: function onEnd() {
      var globalSuiteEnd = this.convertToSuiteEnd(this.runner.suite);
      globalSuiteEnd.name = undefined;

      this.emit('runEnd', globalSuiteEnd);
    }
  }]);
  return MochaAdapter;
}(EventEmitter);

/**
 * Limitations:
 *  - Errors in afterAll are ignored.
 */

var JasmineAdapter = function (_EventEmitter) {
  inherits(JasmineAdapter, _EventEmitter);

  function JasmineAdapter(jasmine) {
    classCallCheck(this, JasmineAdapter);

    var _this = possibleConstructorReturn(this, (JasmineAdapter.__proto__ || Object.getPrototypeOf(JasmineAdapter)).call(this));

    _this.jasmine = jasmine;
    // NodeJS/browser
    _this.env = jasmine.env || jasmine.getEnv();
    _this.suites = {};
    _this.tests = {};

    var reporter = {
      jasmineStarted: _this.onJasmineStarted.bind(_this),
      specDone: _this.onSpecDone.bind(_this),
      specStarted: _this.onSpecStarted.bind(_this),
      suiteStarted: _this.onSuiteStarted.bind(_this),
      suiteDone: _this.onSuiteDone.bind(_this),
      jasmineDone: _this.onJasmineDone.bind(_this)
    };

    // For NodeJS env use the "addReporter" function from the node package.
    if (_this.jasmine.addReporter) {
      _this.jasmine.addReporter(reporter);
    } else {
      // For browser env use the "addReporter" function from the jasmine-core.
      _this.env.addReporter(reporter);
    }
    return _this;
  }

  createClass(JasmineAdapter, [{
    key: 'createAssertion',
    value: function createAssertion(expectation) {
      var stack = expectation.stack !== '' ? expectation.stack : undefined;

      return new Assertion(expectation.passed, expectation.actual, expectation.expected, expectation.message, stack);
    }
  }, {
    key: 'saveTestDetails',
    value: function saveTestDetails(jasmineSpec) {
      var _this2 = this;

      var test = this.tests[jasmineSpec.id];

      test.errors = [];
      test.assertions = [];

      jasmineSpec.failedExpectations.forEach(function (expectation) {
        test.errors.push(_this2.createAssertion(expectation));
        test.assertions.push(_this2.createAssertion(expectation));
      });

      jasmineSpec.passedExpectations.forEach(function (expectation) {
        test.assertions.push(_this2.createAssertion(expectation));
      });

      if (jasmineSpec.status === 'pending') {
        test.status = 'skipped';
      } else {
        test.status = jasmineSpec.status;
        test.runtime = new Date() - this.startTime;
      }
    }
  }, {
    key: 'isJasmineGlobalSuite',
    value: function isJasmineGlobalSuite(suite) {
      return suite.description === 'Jasmine__TopLevel__Suite';
    }

    /**
     * Jasmine provides details about childSuites and tests only in the structure
     * returned by "this.env.topSuite()".
     *
     * This function creates the global suite for the runStart event, as also
     * saves the created suites and tests compliant with the CRI standard in an
     * object using as key their unique ids provided by Jasmine.
     */

  }, {
    key: 'createGlobalSuite',
    value: function createGlobalSuite(jasmineSuite, fullName) {
      var _this3 = this;

      var childSuites = [];
      var tests = [];
      var isGlobalSuite = this.isJasmineGlobalSuite(jasmineSuite);

      if (!isGlobalSuite) {
        fullName.push(jasmineSuite.description);
      }

      jasmineSuite.children.forEach(function (child) {
        if (child.id.indexOf('suite') === 0) {
          childSuites.push(_this3.createGlobalSuite(child, fullName));
        } else {
          var test = void 0;
          var suiteName = !isGlobalSuite ? jasmineSuite.description : undefined;

          fullName.push(child.description);

          test = new TestEnd(child.description, suiteName, fullName.slice());

          fullName.pop();

          tests.push(test);
          _this3.tests[child.id] = test;
        }
      });

      var name = !isGlobalSuite ? jasmineSuite.description : undefined;
      var suite = new SuiteStart(name, fullName.slice(), tests, childSuites);

      this.suites[jasmineSuite.id] = suite;

      fullName.pop();

      return suite;
    }
  }, {
    key: 'onJasmineStarted',
    value: function onJasmineStarted() {
      this.globalSuite = this.createGlobalSuite(this.env.topSuite(), []);
      this.emit('runStart', createSuiteStart(this.globalSuite));
    }
  }, {
    key: 'onSpecStarted',
    value: function onSpecStarted(details) {
      this.startTime = new Date();
      this.emit('testStart', createTestStart(this.tests[details.id]));
    }
  }, {
    key: 'onSpecDone',
    value: function onSpecDone(details) {
      this.saveTestDetails(details);
      this.emit('testEnd', createTestEnd(this.tests[details.id]));
    }
  }, {
    key: 'onSuiteStarted',
    value: function onSuiteStarted(details) {
      this.emit('suiteStart', createSuiteStart(this.suites[details.id]));
    }
  }, {
    key: 'onSuiteDone',
    value: function onSuiteDone(details) {
      this.emit('suiteEnd', createSuiteEnd(this.suites[details.id]));
    }
  }, {
    key: 'onJasmineDone',
    value: function onJasmineDone() {
      this.emit('runEnd', createSuiteEnd(this.globalSuite));
    }
  }]);
  return JasmineAdapter;
}(EventEmitter);

/* global QUnit, mocha, jasmine */

/**
 * Auto registers the adapter for the respective testing framework and
 * returns the runner for event listening.
 */
function autoRegister() {
  var runner;

  if (QUnit) {
    runner = new QUnitAdapter(QUnit);
  } else if (mocha) {
    runner = new MochaAdapter(mocha);
  } else if (jasmine) {
    runner = new JasmineAdapter(jasmine);
  } else {
    throw new Error('Failed to register js-reporters adapater. Supported ' + 'frameworks are: QUnit, Mocha, Jasmine');
  }

  return runner;
}

function createSuiteStart(suite) {
  return new SuiteStart(suite.name, suite.fullName.slice(), suite.tests.map(createTestStart), suite.childSuites.map(createSuiteStart));
}

function createSuiteEnd(suite) {
  return new SuiteEnd(suite.name, suite.fullName.slice(), suite.tests.map(createTestEnd), suite.childSuites.map(createSuiteEnd));
}

function createTestStart(test) {
  return new TestStart(test.name, test.suiteName, test.fullName.slice());
}

function createTestEnd(test) {
  return new TestEnd(test.name, test.suiteName, test.fullName.slice(), test.status, test.runtime, test.errors.slice(), test.assertions.slice());
}

var QUnitAdapter = function (_EventEmitter) {
  inherits(QUnitAdapter, _EventEmitter);

  function QUnitAdapter(QUnit) {
    classCallCheck(this, QUnitAdapter);

    var _this = possibleConstructorReturn(this, (QUnitAdapter.__proto__ || Object.getPrototypeOf(QUnitAdapter)).call(this));

    _this.QUnit = QUnit;
    _this.tests = {};
    _this.delim = ' > ';

    QUnit.begin(_this.onBegin.bind(_this));
    QUnit.testStart(_this.onTestStart.bind(_this));
    QUnit.log(_this.onLog.bind(_this));
    QUnit.testDone(_this.onTestDone.bind(_this));
    QUnit.done(_this.onDone.bind(_this));
    return _this;
  }

  createClass(QUnitAdapter, [{
    key: 'convertModule',
    value: function convertModule(qunitModule) {
      var _this2 = this;

      var fullName = qunitModule.name.split(this.delim).filter(function (value) {
        return value !== '';
      });
      var childSuites = [];

      return new SuiteStart(qunitModule.name, fullName.slice(), qunitModule.tests.map(function (qunitTest) {
        var indexStart = qunitModule.name.lastIndexOf(_this2.delim);

        indexStart = indexStart === -1 ? 0 : indexStart + _this2.delim.length;
        fullName.push(qunitTest.name);

        var suiteName = qunitModule.name.substring(indexStart);
        var test = new TestEnd(qunitTest.name, suiteName, fullName.slice());

        _this2.tests[qunitTest.testId] = test;
        fullName.pop();

        return test;
      }), childSuites);
    }
  }, {
    key: 'saveTestDetails',
    value: function saveTestDetails(qunitTest) {
      var test = this.tests[qunitTest.testId];

      test.errors = this.errors;
      test.assertions = this.assertions;

      if (qunitTest.failed > 0) {
        test.status = 'failed';
      } else if (qunitTest.skipped) {
        test.status = 'skipped';
      } else {
        test.status = 'passed';
      }

      // Workaround for QUnit skipped tests runtime which is a Number.
      if (test.status !== 'skipped') {
        test.runtime = qunitTest.runtime;
      } else {
        test.runtime = undefined;
      }
    }
  }, {
    key: 'createGlobalSuite',
    value: function createGlobalSuite() {
      var _this3 = this;

      var topLevelSuites = [];
      var globalSuite;
      var modules;

      // Access QUnit internals to get all suites and tests, working around
      // missing event data.

      // Create the global suite first.
      if (this.QUnit.config.modules.length > 0 && this.QUnit.config.modules[0].name === '') {
        globalSuite = this.convertModule(this.QUnit.config.modules[0]);
        globalSuite.name = undefined;

        // The suiteName of global tests must be undefined.
        globalSuite.tests.forEach(function (test) {
          test.suiteName = undefined;
        });

        modules = this.QUnit.config.modules.slice(1);
      } else {
        globalSuite = new SuiteStart(undefined, [], [], []);
        modules = this.QUnit.config.modules;
      }

      // Build a list with all suites.
      var suites = modules.map(this.convertModule.bind(this));

      // Iterate through the whole suites and check if they have composed names,
      // like "suiteName1 > suiteName2 > ... > suiteNameN".
      //
      // If a suite has a composed name, its name will be the last in the sequence
      // and its parent name will be the one right before it. Search the parent
      // suite after its name and then add the suite with the composed name to the
      // childSuites.
      //
      // If a suite does not have a composed name, add it to the topLevelSuites,
      // this means that this suite is the direct child of the global suite.
      suites.forEach(function (suite) {
        var indexEnd = suite.name.lastIndexOf(_this3.delim);

        if (indexEnd !== -1) {
          // Find the ' > ' characters that appears before the parent name.
          var indexStart = suite.name.substring(0, indexEnd).lastIndexOf(_this3.delim);
          // If it is -1, the parent suite name starts at 0, else escape
          // this characters ' > '.
          indexStart = indexStart === -1 ? 0 : indexStart + _this3.delim.length;

          var parentSuiteName = suite.name.substring(indexStart, indexEnd);

          // Keep only the name of the suite itself.
          suite.name = suite.name.substring(indexEnd + _this3.delim.length);

          suites.forEach(function (parentSuite) {
            if (parentSuite.name === parentSuiteName) {
              parentSuite.childSuites.push(suite);
            }
          });
        } else {
          topLevelSuites.push(suite);
        }
      });

      globalSuite.childSuites = topLevelSuites;

      return globalSuite;
    }
  }, {
    key: 'createAssertion',
    value: function createAssertion(qunitTest) {
      return new Assertion(qunitTest.result, qunitTest.actual, qunitTest.expected, qunitTest.message, qunitTest.source || undefined);
    }
  }, {
    key: 'emitData',
    value: function emitData(suite) {
      var _this4 = this;

      suite.tests.forEach(function (test) {
        _this4.emit('testStart', createTestStart(test));
        _this4.emit('testEnd', createTestEnd(test));
      });

      suite.childSuites.forEach(function (childSuite) {
        _this4.emit('suiteStart', createSuiteStart(childSuite));
        _this4.emitData(childSuite);
        _this4.emit('suiteEnd', createSuiteEnd(childSuite));
      });
    }
  }, {
    key: 'onBegin',
    value: function onBegin() {
      this.globalSuite = this.createGlobalSuite();
    }
  }, {
    key: 'onTestStart',
    value: function onTestStart(details) {
      this.errors = [];
      this.assertions = [];
    }
  }, {
    key: 'onLog',
    value: function onLog(details) {
      if (!details.result) {
        this.errors.push(this.createAssertion(details));
      }

      this.assertions.push(this.createAssertion(details));
    }
  }, {
    key: 'onTestDone',
    value: function onTestDone(details) {
      this.saveTestDetails(details);
    }
  }, {
    key: 'onDone',
    value: function onDone() {
      this.emit('runStart', createSuiteStart(this.globalSuite));
      this.emitData(this.globalSuite);
      this.emit('runEnd', createSuiteEnd(this.globalSuite));
    }
  }]);
  return QUnitAdapter;
}(EventEmitter);

var index$2 = createCommonjsModule(function (module) {
	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};
});

var index$3 = interopDefault(index$2);

var require$$4 = Object.freeze({
	default: index$3
});

var index$4 = createCommonjsModule(function (module) {
	'use strict';

	function assembleStyles() {
		var styles = {
			modifiers: {
				reset: [0, 0],
				bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
				dim: [2, 22],
				italic: [3, 23],
				underline: [4, 24],
				inverse: [7, 27],
				hidden: [8, 28],
				strikethrough: [9, 29]
			},
			colors: {
				black: [30, 39],
				red: [31, 39],
				green: [32, 39],
				yellow: [33, 39],
				blue: [34, 39],
				magenta: [35, 39],
				cyan: [36, 39],
				white: [37, 39],
				gray: [90, 39]
			},
			bgColors: {
				bgBlack: [40, 49],
				bgRed: [41, 49],
				bgGreen: [42, 49],
				bgYellow: [43, 49],
				bgBlue: [44, 49],
				bgMagenta: [45, 49],
				bgCyan: [46, 49],
				bgWhite: [47, 49]
			}
		};

		// fix humans
		styles.colors.grey = styles.colors.gray;

		Object.keys(styles).forEach(function (groupName) {
			var group = styles[groupName];

			Object.keys(group).forEach(function (styleName) {
				var style = group[styleName];

				styles[styleName] = group[styleName] = {
					open: '\x1B[' + style[0] + 'm',
					close: '\x1B[' + style[1] + 'm'
				};
			});

			Object.defineProperty(styles, groupName, {
				value: group,
				enumerable: false
			});
		});

		return styles;
	}

	Object.defineProperty(module, 'exports', {
		enumerable: true,
		get: assembleStyles
	});
});

var index$5 = interopDefault(index$4);

var require$$3 = Object.freeze({
	default: index$5
});

var index$8 = createCommonjsModule(function (module) {
	'use strict';

	module.exports = function () {
		return (/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g
		);
	};
});

var index$9 = interopDefault(index$8);

var require$$0 = Object.freeze({
	default: index$9
});

var index$6 = createCommonjsModule(function (module) {
	'use strict';

	var ansiRegex = interopDefault(require$$0)();

	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};
});

var index$7 = interopDefault(index$6);

var require$$2 = Object.freeze({
	default: index$7
});

var index$10 = createCommonjsModule(function (module) {
  'use strict';

  var ansiRegex = interopDefault(require$$0);
  var re = new RegExp(ansiRegex().source); // remove the `g` flag
  module.exports = re.test.bind(re);
});

var index$11 = interopDefault(index$10);

var require$$1 = Object.freeze({
  default: index$11
});

var index$12 = createCommonjsModule(function (module) {
	'use strict';

	var argv = process.argv;

	var terminator = argv.indexOf('--');
	var hasFlag = function hasFlag(flag) {
		flag = '--' + flag;
		var pos = argv.indexOf(flag);
		return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
	};

	module.exports = function () {
		if ('FORCE_COLOR' in process.env) {
			return true;
		}

		if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
			return false;
		}

		if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
			return true;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}

		if (process.platform === 'win32') {
			return true;
		}

		if ('COLORTERM' in process.env) {
			return true;
		}

		if (process.env.TERM === 'dumb') {
			return false;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}

		return false;
	}();
});

var index$13 = interopDefault(index$12);

var require$$0$1 = Object.freeze({
	default: index$13
});

var index$1 = createCommonjsModule(function (module) {
	'use strict';

	var escapeStringRegexp = interopDefault(require$$4);
	var ansiStyles = interopDefault(require$$3);
	var stripAnsi = interopDefault(require$$2);
	var hasAnsi = interopDefault(require$$1);
	var supportsColor = interopDefault(require$$0$1);
	var defineProps = Object.defineProperties;
	var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

	function Chalk(options) {
		// detect mode if not set manually
		this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
	}

	// use bright blue on Windows as the normal blue color is illegible
	if (isSimpleWindowsTerm) {
		ansiStyles.blue.open = '\x1B[94m';
	}

	var styles = function () {
		var ret = {};

		Object.keys(ansiStyles).forEach(function (key) {
			ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

			ret[key] = {
				get: function get() {
					return build.call(this, this._styles.concat(key));
				}
			};
		});

		return ret;
	}();

	var proto = defineProps(function chalk() {}, styles);

	function build(_styles) {
		var builder = function builder() {
			return applyStyle.apply(builder, arguments);
		};

		builder._styles = _styles;
		builder.enabled = this.enabled;
		// __proto__ is used because we must return a function, but there is
		// no way to create a function with a different prototype.
		/* eslint-disable no-proto */
		builder.__proto__ = proto;

		return builder;
	}

	function applyStyle() {
		// support varags, but simply cast to string in case there's only one arg
		var args = arguments;
		var argsLen = args.length;
		var str = argsLen !== 0 && String(arguments[0]);

		if (argsLen > 1) {
			// don't slice `arguments`, it prevents v8 optimizations
			for (var a = 1; a < argsLen; a++) {
				str += ' ' + args[a];
			}
		}

		if (!this.enabled || !str) {
			return str;
		}

		var nestedStyles = this._styles;
		var i = nestedStyles.length;

		// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
		// see https://github.com/chalk/chalk/issues/58
		// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
		var originalDim = ansiStyles.dim.open;
		if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
			ansiStyles.dim.open = '';
		}

		while (i--) {
			var code = ansiStyles[nestedStyles[i]];

			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			str = code.open + str.replace(code.closeRe, code.open) + code.close;
		}

		// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
		ansiStyles.dim.open = originalDim;

		return str;
	}

	function init() {
		var ret = {};

		Object.keys(styles).forEach(function (name) {
			ret[name] = {
				get: function get() {
					return build.call(this, [name]);
				}
			};
		});

		return ret;
	}

	defineProps(Chalk.prototype, init());

	module.exports = new Chalk();
	module.exports.styles = ansiStyles;
	module.exports.hasColor = hasAnsi;
	module.exports.stripColor = stripAnsi;
	module.exports.supportsColor = supportsColor;
});

var chalk = interopDefault(index$1);

var TapReporter = function () {
  function TapReporter(runner) {
    classCallCheck(this, TapReporter);

    this.testCount = 0;

    runner.on('runStart', this.onRunStart.bind(this));
    runner.on('testEnd', this.onTestEnd.bind(this));
    runner.on('runEnd', this.onRunEnd.bind(this));
  }

  createClass(TapReporter, [{
    key: 'onRunStart',
    value: function onRunStart(globalSuite) {
      console.log('TAP version 13');
    }
  }, {
    key: 'onTestEnd',
    value: function onTestEnd(test) {
      var _this = this;

      this.testCount = this.testCount + 1;

      if (test.status === 'passed') {
        console.log('ok ' + this.testCount + ' ' + test.fullName.join(' > '));
      } else if (test.status === 'skipped') {
        console.log(chalk.yellow('ok ' + this.testCount + ' # SKIP ' + test.fullName.join(' > ')));
      } else if (test.status === 'todo') {
        console.log(chalk.cyan('not ok ' + this.testCount + ' # TODO ' + test.fullName.join(' > ')));
        test.errors.forEach(function (error) {
          return _this.logError(error, 'todo');
        });
      } else {
        console.log(chalk.red('not ok ' + this.testCount + ' ' + test.fullName.join(' > ')));
        test.errors.forEach(function (error) {
          return _this.logError(error);
        });
      }
    }
  }, {
    key: 'onRunEnd',
    value: function onRunEnd(globalSuite) {
      console.log('1..' + globalSuite.testCounts.total);
      console.log('# pass ' + globalSuite.testCounts.passed);
      console.log(chalk.yellow('# skip ' + globalSuite.testCounts.skipped));
      console.log(chalk.cyan('# todo ' + globalSuite.testCounts.todo));
      console.log(chalk.red('# fail ' + globalSuite.testCounts.failed));
    }
  }, {
    key: 'logError',
    value: function logError(error, severity) {
      console.log('  ---');
      console.log('  message: "' + (error.message || 'failed') + '"');
      console.log('  severity: ' + (severity || 'failed'));

      if (error.hasOwnProperty('actual')) {
        var actualStr = error.actual !== undefined ? JSON.stringify(error.actual, null, 2) : 'undefined';
        console.log('  actual: ' + actualStr);
      }

      if (error.hasOwnProperty('expected')) {
        var expectedStr = error.expected !== undefined ? JSON.stringify(error.expected, null, 2) : 'undefined';
        console.log('  expected: ' + expectedStr);
      }

      if (error.stack) {
        console.log('  stack: ' + error.stack);
      }

      console.log('  ...');
    }
  }], [{
    key: 'init',
    value: function init(runner) {
      return new TapReporter(runner);
    }
  }]);
  return TapReporter;
}();

// TODO: finish grouping once suiteStart is implemented
var hasGrouping = 'group' in console && 'groupEnd' in console;

var ConsoleReporter = function () {
  function ConsoleReporter(runner) {
    classCallCheck(this, ConsoleReporter);

    runner.on('runStart', this.onRunStart);
    runner.on('suiteStart', this.onSuiteStart);
    runner.on('testStart', this.onTestStart);
    runner.on('testEnd', this.onTestEnd);
    runner.on('suiteEnd', this.onSuiteEnd);
    runner.on('runEnd', this.onRunEnd);
  }

  createClass(ConsoleReporter, [{
    key: 'onRunStart',
    value: function onRunStart(suite) {
      console.log('runStart', suite);
    }
  }, {
    key: 'onSuiteStart',
    value: function onSuiteStart(suite) {
      if (hasGrouping) {
        console.group(suite.name);
      }
      console.log('suiteStart', suite);
    }
  }, {
    key: 'onTestStart',
    value: function onTestStart(test) {
      console.log('testStart', test);
    }
  }, {
    key: 'onTestEnd',
    value: function onTestEnd(test) {
      console.log('testEnd', test);
    }
  }, {
    key: 'onSuiteEnd',
    value: function onSuiteEnd(suite) {
      console.log('suiteEnd', suite);
      if (hasGrouping) {
        console.groupEnd();
      }
    }
  }, {
    key: 'onRunEnd',
    value: function onRunEnd(globalSuite) {
      console.log('runEnd', globalSuite);
    }
  }], [{
    key: 'init',
    value: function init(runner) {
      return new ConsoleReporter(runner);
    }
  }]);
  return ConsoleReporter;
}();

var index = {
  QUnitAdapter: QUnitAdapter,
  JasmineAdapter: JasmineAdapter,
  MochaAdapter: MochaAdapter,
  TapReporter: TapReporter,
  ConsoleReporter: ConsoleReporter,
  Assertion: Assertion,
  TestStart: TestStart,
  TestEnd: TestEnd,
  SuiteStart: SuiteStart,
  SuiteEnd: SuiteEnd,
  createSuiteStart: createSuiteStart,
  createTestStart: createTestStart,
  createTestEnd: createTestEnd,
  createSuiteEnd: createSuiteEnd,
  autoRegister: autoRegister
};

return index;

})));