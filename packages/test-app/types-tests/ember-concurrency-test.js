"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable prettier/prettier */
require("ember-source/types");
require("ember-source/types/preview");
var component_1 = require("@ember/component");
var object_1 = require("@ember/object");
var evented_1 = require("@ember/object/evented");
var component_2 = require("@glimmer/component");
var ember_concurrency_1 = require("ember-concurrency");
var expect_type_1 = require("expect-type");
module('unit tests', function () {
    test('TaskGenerator', function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
    });
    test('TaskFunction', function () {
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
    });
    test('TaskFunctionArgs', function () {
        {
            var f = function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo, bar) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () { };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('TaskFunctionReturnType', function () {
        {
            var f = function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () { };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('TaskForTaskFunction', function () {
        {
            var f = function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo, bar) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo, bar) {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () { };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('TaskInstanceForTaskFunction', function () {
        {
            var f = function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo, bar) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function (foo, bar) {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var f = function () { };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('EncapsulatedTaskDescriptor', function () {
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
    });
    test('EncapsulatedTaskDescriptorArgs', function () {
        {
            var d = { foo: 'foo', perform: function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function (foo) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function (foo, bar) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function () { } };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('EncapsulatedTaskDescriptorReturnType', function () {
        {
            var d = { foo: 'foo', perform: function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                perform: function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { perform: function () { } };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('EncapsulatedTaskState', function () {
        {
            var d = {};
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo' };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', value: 123 };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { perform: function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                perform: function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                value: 123,
                perform: function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
    });
    test('TaskForEncapsulatedTaskDescriptor', function () {
        {
            var d = { foo: 'foo', perform: function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function (foo) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function (foo, bar) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                perform: function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                perform: function (foo, bar) {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function () { } };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('TaskInstanceForEncapsulatedTaskDescriptor', function () {
        {
            var d = { foo: 'foo', perform: function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function (foo) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function (foo, bar) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                perform: function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = {
                foo: 'foo',
                perform: function (foo, bar) {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            };
            (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
        }
        {
            var d = { foo: 'foo', perform: function () { } };
            // @ts-expect-error
            (0, expect_type_1.expectTypeOf)();
        }
    });
    test('Task', function () {
        // @ts-expect-error
        new Task(); // Task cannot be constructed
        // @ts-expect-error
        var Foo = /** @class */ (function (_super) {
            __extends(Foo, _super);
            function Foo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Foo;
        }(Task)); // Task cannot be subclassed
        var t;
        (0, expect_type_1.expectTypeOf)(t.isRunning).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(t.isQueued).toBeBoolean;
        (0, expect_type_1.expectTypeOf)(t.isIdle).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(t.state).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastRunning).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastPerformed).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastSuccessful).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastComplete).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastErrored).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastCanceled).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastIncomplete).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.performCount).toBeNumber();
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({});
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({ reason: 'why do you care' });
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({ resetState: true });
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({
            reason: 'why do you care',
            resetState: true
        });
        (0, expect_type_1.expectTypeOf)(t.cancelAll).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.cancelAll).returns.toEqualTypeOf();
        // @ts-expect-error
        t.cancelAll(null);
        // @ts-expect-error
        t.cancelAll({ wow: false });
        (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(true);
        (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(false, 2);
        (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
        // @ts-expect-error
        t.perform();
        // @ts-expect-error
        t.perform('not boolean');
        // @ts-expect-error
        t.perform(false, 'not number');
        // @ts-expect-error
        t.perform(false, 3, 'extra');
        (0, expect_type_1.expectTypeOf)(t.linked).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(t.linked).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.linked).returns.toEqualTypeOf(t);
        // @ts-expect-error
        t.linked(null);
        (0, expect_type_1.expectTypeOf)(t.unlinked).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(t.unlinked).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.unlinked).returns.toEqualTypeOf(t);
        // @ts-expect-error
        t.unlinked(null);
    });
    test('EncapsulatedTask', function () {
        // @ts-expect-error
        new EncapsulatedTask(); // EncapsulatedTask cannot be constructed
        // @ts-expect-error
        var Foo = /** @class */ (function (_super) {
            __extends(Foo, _super);
            function Foo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Foo;
        }(EncapsulatedTask)); // EncapsulatedTask cannot be subclassed
        var t;
        (0, expect_type_1.expectTypeOf)(t.isRunning).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(t.isQueued).toBeBoolean;
        (0, expect_type_1.expectTypeOf)(t.isIdle).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(t.state).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastRunning).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastPerformed).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastSuccessful).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastComplete).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastErrored).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastCanceled).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.lastIncomplete).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.performCount).toBeNumber();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (0, expect_type_1.expectTypeOf)(t.last.foo).not.toBeAny();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (0, expect_type_1.expectTypeOf)(t.last.foo).toBeString();
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({});
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({ reason: 'why do you care' });
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({ resetState: true });
        (0, expect_type_1.expectTypeOf)(t.cancelAll).toBeCallableWith({
            reason: 'why do you care',
            resetState: true
        });
        (0, expect_type_1.expectTypeOf)(t.cancelAll).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.cancelAll).returns.toEqualTypeOf();
        // @ts-expect-error
        t.cancelAll(null);
        // @ts-expect-error
        t.cancelAll({ wow: false });
        (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(true);
        (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(false, 2);
        (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
        // @ts-expect-error
        t.perform();
        // @ts-expect-error
        t.perform('not boolean');
        // @ts-expect-error
        t.perform(false, 'not number');
        // @ts-expect-error
        t.perform(false, 3, 'extra');
        (0, expect_type_1.expectTypeOf)(t.linked).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(t.linked).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.linked).returns.toEqualTypeOf(t);
        // @ts-expect-error
        t.linked(null);
        (0, expect_type_1.expectTypeOf)(t.unlinked).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(t.unlinked).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(t.unlinked).returns.toEqualTypeOf(t);
        // @ts-expect-error
        t.unlinked(null);
    });
    test('TaskGroup', function () {
        // @ts-expect-error
        new TaskGroup(); // TaskGroup cannot be constructed
        // @ts-expect-error
        var Foo = /** @class */ (function (_super) {
            __extends(Foo, _super);
            function Foo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Foo;
        }(TaskGroup)); // TaskGroup cannot be subclassed
        var tg;
        (0, expect_type_1.expectTypeOf)(tg.isRunning).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(tg.isQueued).toBeBoolean;
        (0, expect_type_1.expectTypeOf)(tg.isIdle).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(tg.state).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastRunning).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastPerformed).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastSuccessful).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastComplete).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastErrored).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastCanceled).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.lastIncomplete).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.performCount).toBeNumber();
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).toBeCallableWith();
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).toBeCallableWith({});
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).toBeCallableWith({ reason: 'why do you care' });
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).toBeCallableWith({ resetState: true });
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).toBeCallableWith({
            reason: 'why do you care',
            resetState: true
        });
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(tg.cancelAll).returns.toEqualTypeOf();
        // @ts-expect-error
        tg.cancelAll(null);
        // @ts-expect-error
        tg.cancelAll({ wow: false });
        // @ts-expect-error
        tg.perform();
    });
    test('TaskInstance', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Foo, t, chained, chained, chained;
        return __generator(this, function (_a) {
            // @ts-expect-error
            new TaskInstance(); // TaskInstance cannot be constructed
            Foo = /** @class */ (function (_super) {
                __extends(Foo, _super);
                // @ts-expect-error
                function Foo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Foo;
            }(TaskInstance));
            (0, expect_type_1.expectTypeOf)(t.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.error).toBeUnknown();
            (0, expect_type_1.expectTypeOf)(t.isSuccessful).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.isError).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.isCanceled).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.hasStarted).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.isFinished).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.isRunning).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.state).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.isDropped).toBeBoolean();
            (0, expect_type_1.expectTypeOf)(t.cancel).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t.cancel).toBeCallableWith('why do you care');
            (0, expect_type_1.expectTypeOf)(t.cancel).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.cancel).returns.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t).resolves.toBeString();
            (0, expect_type_1.expectTypeOf)(t.then).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t.then).toBeCallableWith(function () { });
            (0, expect_type_1.expectTypeOf)(t.then).toBeCallableWith(function () { }, function () { });
            (0, expect_type_1.expectTypeOf)(t.then).toBeCallableWith(function (v) { return (0, expect_type_1.expectTypeOf)(v).toBeString(); });
            (0, expect_type_1.expectTypeOf)(t.then).toBeCallableWith(function (v) { return (0, expect_type_1.expectTypeOf)(v).toBeString(); }, function (e) { return (0, expect_type_1.expectTypeOf)(e).toBeAny(); });
            {
                chained = t.then(function (v) { return v.length; });
                (0, expect_type_1.expectTypeOf)(chained).resolves.toBeNumber();
            }
            // @ts-expect-error
            t.then('not a function');
            t.then(function () { }, function () { }, 
            // @ts-expect-error
            function () { });
            (0, expect_type_1.expectTypeOf)(t["catch"]).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t["catch"]).toBeCallableWith(function () { });
            (0, expect_type_1.expectTypeOf)(t["catch"]).toBeCallableWith(function (e) { return (0, expect_type_1.expectTypeOf)(e).toBeAny(); });
            {
                chained = t["catch"](function () { return 'caught'; });
                (0, expect_type_1.expectTypeOf)(chained).resolves.toBeString();
            }
            // @ts-expect-error
            t["catch"]('not a function');
            t["catch"](function () { }, 
            // @ts-expect-error
            function () { });
            (0, expect_type_1.expectTypeOf)(t["finally"]).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t["finally"]).toBeCallableWith(function () { });
            {
                chained = t["finally"](function () { return 'finally'; });
                (0, expect_type_1.expectTypeOf)(chained).resolves.toBeString();
            }
            // @ts-expect-error
            t["finally"](function (v) { });
            return [2 /*return*/];
        });
    }); });
    test('TaskProperty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Foo, tp, O, o, t, i, t, i;
        return __generator(this, function (_a) {
            // @ts-expect-error
            new TaskProperty(); // TaskProperty cannot be constructed
            Foo = /** @class */ (function (_super) {
                __extends(Foo, _super);
                // @ts-expect-error
                function Foo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Foo;
            }(TaskProperty));
            (0, expect_type_1.expectTypeOf)(tp.on).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.on).toBeCallableWith('init');
            (0, expect_type_1.expectTypeOf)(tp.on).toBeCallableWith('init', 'didInsertElement');
            (0, expect_type_1.expectTypeOf)(tp.on).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.on).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.on(false);
            // @ts-expect-error
            tp.on('init', false);
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).toBeCallableWith('init');
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).toBeCallableWith('init', 'didInsertElement');
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.cancelOn(false);
            // @ts-expect-error
            tp.cancelOn('init', false);
            (0, expect_type_1.expectTypeOf)(tp.restartable).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.restartable).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.restartable).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.restartable('nope');
            (0, expect_type_1.expectTypeOf)(tp.enqueue).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.enqueue).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.enqueue).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.enqueue('nope');
            (0, expect_type_1.expectTypeOf)(tp.drop).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.drop).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.drop).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.drop('nope');
            (0, expect_type_1.expectTypeOf)(tp.keepLatest).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.keepLatest).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.keepLatest).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.keepLatest('nope');
            (0, expect_type_1.expectTypeOf)(tp.maxConcurrency).toBeCallableWith(5);
            (0, expect_type_1.expectTypeOf)(tp.maxConcurrency).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.maxConcurrency).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.maxConcurrency();
            // @ts-expect-error
            tp.maxConcurrency('nope');
            (0, expect_type_1.expectTypeOf)(tp.group).toBeCallableWith('foo');
            (0, expect_type_1.expectTypeOf)(tp.group).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.group).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.group();
            // @ts-expect-error
            tp.group(false);
            (0, expect_type_1.expectTypeOf)(tp.evented).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.evented).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.evented).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.evented('nope');
            (0, expect_type_1.expectTypeOf)(tp.debug).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.debug).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.debug).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.debug('nope');
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(function () { });
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(null);
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(function (s) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (0, expect_type_1.expectTypeOf)(s).toEqualTypeOf();
            });
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(function (s, t) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (0, expect_type_1.expectTypeOf)(s).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(t).toEqualTypeOf();
            });
            (0, expect_type_1.expectTypeOf)(tp.onState).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.onState).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.onState('nope');
            // @ts-expect-error
            tp.onState(undefined);
            O = object_1["default"].extend({
                tp: tp,
                foo: function () {
                    var t = this.get('tp');
                    (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
                    var i = this.get('tp').perform(true);
                    (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                    // @ts-expect-error
                    this.get('tp').perform();
                    // @ts-expect-error
                    this.get('tp').perform('nope');
                    // @ts-expect-error
                    this.get('tp').perform(true, 'nope');
                    // @ts-expect-error
                    this.get('tp').perform(false, 5, 'nope');
                },
                bar: function () {
                    var t = (0, object_1.get)(this, 'tp');
                    (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
                    var i = (0, object_1.get)(this, 'tp').perform(true);
                    (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform();
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform('nope');
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform(true, 'nope');
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform(false, 5, 'nope');
                }
            });
            {
                o = O.create();
                t = o.get('tp');
                (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                i = o.get('tp').perform(false, 5);
                (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                // @ts-expect-error
                o.get('tp').perform();
                // @ts-expect-error
                o.get('tp').perform('nope');
                // @ts-expect-error
                o.get('tp').perform(true, 'nope');
                // @ts-expect-error
                o.get('tp').perform(false, 5, 'nope');
            }
            {
                t = (0, object_1.get)(O.create(), 'tp');
                (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                i = t.perform(false, 5);
                (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                // @ts-expect-error
                t.perform();
                // @ts-expect-error
                t.perform('nope');
                // @ts-expect-error
                t.perform(true, 'nope');
                // @ts-expect-error
                t.perform(false, 5, 'nope');
            }
            return [2 /*return*/];
        });
    }); });
    test('EncapsulatedTaskProperty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Foo, tp, O, o, t, i, t, i;
        return __generator(this, function (_a) {
            // @ts-expect-error
            new EncapsulatedTaskProperty(); // EncapsulatedTaskProperty cannot be constructed
            Foo = /** @class */ (function (_super) {
                __extends(Foo, _super);
                // @ts-expect-error
                function Foo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Foo;
            }(EncapsulatedTaskProperty));
            (0, expect_type_1.expectTypeOf)(tp.on).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.on).toBeCallableWith('init');
            (0, expect_type_1.expectTypeOf)(tp.on).toBeCallableWith('init', 'didInsertElement');
            (0, expect_type_1.expectTypeOf)(tp.on).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.on).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.on(false);
            // @ts-expect-error
            tp.on('init', false);
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).toBeCallableWith('init');
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).toBeCallableWith('init', 'didInsertElement');
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.cancelOn).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.cancelOn(false);
            // @ts-expect-error
            tp.cancelOn('init', false);
            (0, expect_type_1.expectTypeOf)(tp.restartable).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.restartable).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.restartable).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.restartable('nope');
            (0, expect_type_1.expectTypeOf)(tp.enqueue).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.enqueue).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.enqueue).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.enqueue('nope');
            (0, expect_type_1.expectTypeOf)(tp.drop).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.drop).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.drop).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.drop('nope');
            (0, expect_type_1.expectTypeOf)(tp.keepLatest).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.keepLatest).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.keepLatest).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.keepLatest('nope');
            (0, expect_type_1.expectTypeOf)(tp.maxConcurrency).toBeCallableWith(5);
            (0, expect_type_1.expectTypeOf)(tp.maxConcurrency).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.maxConcurrency).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.maxConcurrency();
            // @ts-expect-error
            tp.maxConcurrency('nope');
            (0, expect_type_1.expectTypeOf)(tp.group).toBeCallableWith('foo');
            (0, expect_type_1.expectTypeOf)(tp.group).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.group).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.group();
            // @ts-expect-error
            tp.group(false);
            (0, expect_type_1.expectTypeOf)(tp.evented).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.evented).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.evented).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.evented('nope');
            (0, expect_type_1.expectTypeOf)(tp.debug).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tp.debug).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.debug).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.debug('nope');
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(function () { });
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(null);
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(function (s) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (0, expect_type_1.expectTypeOf)(s).toEqualTypeOf();
            });
            (0, expect_type_1.expectTypeOf)(tp.onState).toBeCallableWith(function (s, t) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (0, expect_type_1.expectTypeOf)(s).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(t).toEqualTypeOf();
            });
            (0, expect_type_1.expectTypeOf)(tp.onState).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tp.onState).returns.toEqualTypeOf(tp);
            // @ts-expect-error
            tp.onState('nope');
            // @ts-expect-error
            tp.onState(undefined);
            O = object_1["default"].extend({
                tp: tp,
                foo: function () {
                    var t = this.get('tp');
                    (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
                    var i = this.get('tp').perform(true);
                    (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
                    // @ts-expect-error
                    this.get('tp').perform();
                    // @ts-expect-error
                    this.get('tp').perform('nope');
                    // @ts-expect-error
                    this.get('tp').perform(true, 'nope');
                    // @ts-expect-error
                    this.get('tp').perform(false, 5, 'nope');
                },
                bar: function () {
                    var t = (0, object_1.get)(this, 'tp');
                    (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
                    var i = (0, object_1.get)(this, 'tp').perform(true);
                    (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform();
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform('nope');
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform(true, 'nope');
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tp').perform(false, 5, 'nope');
                }
            });
            {
                o = O.create();
                t = o.get('tp');
                (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                i = o.get('tp').perform(false, 5);
                (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
                (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
                // @ts-expect-error
                o.get('tp').perform();
                // @ts-expect-error
                o.get('tp').perform('nope');
                // @ts-expect-error
                o.get('tp').perform(true, 'nope');
                // @ts-expect-error
                o.get('tp').perform(false, 5, 'nope');
            }
            {
                t = (0, object_1.get)(O.create(), 'tp');
                (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
                (0, expect_type_1.expectTypeOf)(t.last).toEqualTypeOf();
                i = t.perform(false, 5);
                (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
                (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
                // @ts-expect-error
                t.perform();
                // @ts-expect-error
                t.perform('nope');
                // @ts-expect-error
                t.perform(true, 'nope');
                // @ts-expect-error
                t.perform(false, 5, 'nope');
            }
            return [2 /*return*/];
        });
    }); });
    test('TaskGroupProperty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Foo, tgp, O, o, tg, tg;
        return __generator(this, function (_a) {
            // @ts-expect-error
            new TaskGroupProperty(); // TaskGroupProperty cannot be constructed
            Foo = /** @class */ (function (_super) {
                __extends(Foo, _super);
                // @ts-expect-error
                function Foo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Foo;
            }(TaskGroupProperty));
            // @ts-expect-error
            tgp.on('init');
            // @ts-expect-error
            tgp.cancelOn('init');
            (0, expect_type_1.expectTypeOf)(tgp.restartable).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tgp.restartable).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tgp.restartable).returns.toEqualTypeOf(tgp);
            // @ts-expect-error
            tgp.restartable('nope');
            (0, expect_type_1.expectTypeOf)(tgp.enqueue).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tgp.enqueue).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tgp.enqueue).returns.toEqualTypeOf(tgp);
            // @ts-expect-error
            tgp.enqueue('nope');
            (0, expect_type_1.expectTypeOf)(tgp.drop).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tgp.drop).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tgp.drop).returns.toEqualTypeOf(tgp);
            // @ts-expect-error
            tgp.drop('nope');
            (0, expect_type_1.expectTypeOf)(tgp.keepLatest).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(tgp.keepLatest).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tgp.keepLatest).returns.toEqualTypeOf(tgp);
            // @ts-expect-error
            tgp.keepLatest('nope');
            (0, expect_type_1.expectTypeOf)(tgp.maxConcurrency).toBeCallableWith(5);
            (0, expect_type_1.expectTypeOf)(tgp.maxConcurrency).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(tgp.maxConcurrency).returns.toEqualTypeOf(tgp);
            // @ts-expect-error
            tgp.maxConcurrency();
            // @ts-expect-error
            tgp.maxConcurrency('nope');
            // @ts-expect-error
            tgp.group('nope');
            // @ts-expect-error
            tgp.evented();
            // @ts-expect-error
            tgp.debug();
            // @ts-expect-error
            tgp.onState();
            O = object_1["default"].extend({
                tgp: tgp,
                foo: function () {
                    var tg = this.get('tgp');
                    (0, expect_type_1.expectTypeOf)(tg).toMatchTypeOf();
                    (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
                    // @ts-expect-error
                    tg.perform();
                    // @ts-expect-error
                    this.get('tgp').perform();
                },
                bar: function () {
                    var tg = (0, object_1.get)(this, 'tgp');
                    (0, expect_type_1.expectTypeOf)(tg).toMatchTypeOf();
                    (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
                    // @ts-expect-error
                    tg.perform();
                    // @ts-expect-error
                    (0, object_1.get)(this, 'tgp').perform();
                }
            });
            {
                o = O.create();
                tg = o.get('tgp');
                (0, expect_type_1.expectTypeOf)(tg).toMatchTypeOf();
                (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
                // @ts-expect-error
                o.get('tgp').perform();
            }
            {
                tg = (0, object_1.get)(O.create(), 'tgp');
                (0, expect_type_1.expectTypeOf)(tg).toMatchTypeOf();
                (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
                // @ts-expect-error
                tg.perform();
            }
            return [2 /*return*/];
        });
    }); });
    test('task', function () {
        {
            var tp = (0, ember_concurrency_1.task)(function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform();
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toEqualTypeOf();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)(function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            });
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform();
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toBeString();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)(function (foo, bar) { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(true);
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(false, 5);
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform(true);
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toEqualTypeOf();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(true, 'nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(false, 5, 'nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)(function (foo, bar) {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'foo'];
                });
            });
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(true);
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(false, 5);
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform(false, 5);
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toEqualTypeOf();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(true, 'nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(false, 5, 'nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)({ foo: 'foo', perform: function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } });
            (0, expect_type_1.expectTypeOf)(tp).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform();
            (0, expect_type_1.expectTypeOf)(i).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
            (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)({
                foo: 'foo',
                perform: function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            });
            (0, expect_type_1.expectTypeOf)(tp).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith();
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform();
            (0, expect_type_1.expectTypeOf)(i).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toBeString();
            (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
            (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)({ foo: 'foo', perform: function (foo, bar) { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); } });
            (0, expect_type_1.expectTypeOf)(tp).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(true);
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(false, 5);
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform(true);
            (0, expect_type_1.expectTypeOf)(i).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
            (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(true, 'nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(false, 5, 'nope');
        }
        {
            var tp = (0, ember_concurrency_1.task)({
                foo: 'foo',
                perform: function (foo, bar) {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 'foo'];
                    });
                }
            });
            (0, expect_type_1.expectTypeOf)(tp).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(tp).toEqualTypeOf();
            var t = (0, object_1.get)({ tp: tp }, 'tp');
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(true);
            (0, expect_type_1.expectTypeOf)(t.perform).toBeCallableWith(false, 5);
            (0, expect_type_1.expectTypeOf)(t.perform).parameters.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(t.perform).returns.toEqualTypeOf();
            var i = (0, object_1.get)({ tp: tp }, 'tp').perform(false, 5);
            (0, expect_type_1.expectTypeOf)(i).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(i).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.value).toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i).resolves.toEqualTypeOf();
            (0, expect_type_1.expectTypeOf)(i.foo).not.toBeAny();
            (0, expect_type_1.expectTypeOf)(i.foo).toBeString();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform();
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform('nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(true, 'nope');
            // @ts-expect-error
            (0, object_1.get)({ tp: tp }, 'tp').perform(false, 5, 'nope');
        }
    });
    test('taskGroup', function () {
        {
            var tgp = (0, ember_concurrency_1.taskGroup)();
            (0, expect_type_1.expectTypeOf)(tgp).toEqualTypeOf();
            var tg = (0, object_1.get)({ tgp: tgp }, 'tgp');
            (0, expect_type_1.expectTypeOf)(tg).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            var value = tg.last.value;
            (0, expect_type_1.expectTypeOf)(value).toEqualTypeOf();
        }
        {
            var tgp = (0, ember_concurrency_1.taskGroup)();
            (0, expect_type_1.expectTypeOf)(tgp).toEqualTypeOf();
            var tg = (0, object_1.get)({ tgp: tgp }, 'tgp');
            (0, expect_type_1.expectTypeOf)(tg).toMatchTypeOf();
            (0, expect_type_1.expectTypeOf)(tg.last).toEqualTypeOf();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            var value = tg.last.value;
            (0, expect_type_1.expectTypeOf)(value).toEqualTypeOf();
        }
    });
    test('all', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, task, thenable, promise, result, result, result, result, result, result, result, result, result, result, result, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = 'foo';
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.all)([])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.all)([value])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.all)([task])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.all)([thenable])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.all)([promise])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.all)([value, task, thenable, promise])).resolves.toEqualTypeOf();
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([])];
                case 1:
                    result = _a.sent();
                    // @ts-expect-error
                    result[0];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([value])];
                case 2:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    // @ts-expect-error
                    result[1];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([value, task])];
                case 3:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    // @ts-expect-error
                    result[2];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([value, task, thenable])];
                case 4:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    // @ts-expect-error
                    result[3];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([value, task, thenable, promise])];
                case 5:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    // @ts-expect-error
                    result[4];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([value, task, thenable, promise, value])];
                case 6:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    // @ts-expect-error
                    result[5];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([value, task, thenable, promise, value, task])];
                case 7:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    // @ts-expect-error
                    result[6];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                        ])];
                case 8:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[6]).toBeNumber();
                    // @ts-expect-error
                    result[7];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                        ])];
                case 9:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[6]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    // @ts-expect-error
                    result[8];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                        ])];
                case 10:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[6]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toBeString();
                    // @ts-expect-error
                    result[9];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                        ])];
                case 11:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[6]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[9]).toBeBoolean();
                    // @ts-expect-error
                    result[10];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                        ])];
                case 12:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[6]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[9]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[10]).toBeNumber();
                    // @ts-expect-error
                    result[11];
                    return [4 /*yield*/, (0, ember_concurrency_1.all)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                        ])];
                case 13:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[1]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[2]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[5]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[6]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toBeString();
                    (0, expect_type_1.expectTypeOf)(result[9]).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result[10]).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result[11]).toEqualTypeOf();
                    // @ts-expect-error
                    result[12];
                    return [2 /*return*/];
            }
        });
    }); });
    test('allSettled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, task, thenable, promise, result, result, result, result, result, result, result, result, result, result, result, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = 'foo';
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.allSettled)([])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.allSettled)([value])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.allSettled)([task])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.allSettled)([thenable])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.allSettled)([promise])).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.allSettled)([value, task, thenable, promise])).resolves.toEqualTypeOf();
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([])];
                case 1:
                    result = _a.sent();
                    // @ts-expect-error
                    result[0];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([value])];
                case 2:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    // @ts-expect-error
                    result[1];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([value, task])];
                case 3:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    // @ts-expect-error
                    result[2];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([value, task, thenable])];
                case 4:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    // @ts-expect-error
                    result[3];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([value, task, thenable, promise])];
                case 5:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    // @ts-expect-error
                    result[4];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([value, task, thenable, promise, value])];
                case 6:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    // @ts-expect-error
                    result[5];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                        ])];
                case 7:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    // @ts-expect-error
                    result[6];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                        ])];
                case 8:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[6]).toEqualTypeOf();
                    // @ts-expect-error
                    result[7];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                        ])];
                case 9:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[6]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    // @ts-expect-error
                    result[8];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                        ])];
                case 10:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[6]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toEqualTypeOf();
                    // @ts-expect-error
                    result[9];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                        ])];
                case 11:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[6]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[9]).toEqualTypeOf();
                    // @ts-expect-error
                    result[10];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                        ])];
                case 12:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[6]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[9]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[10]).toEqualTypeOf();
                    // @ts-expect-error
                    result[11];
                    return [4 /*yield*/, (0, ember_concurrency_1.allSettled)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                        ])];
                case 13:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result[0]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[1]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[2]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[3]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[4]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[5]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[6]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[7]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[8]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[9]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[10]).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result[11]).toEqualTypeOf();
                    // @ts-expect-error
                    result[12];
                    return [2 /*return*/];
            }
        });
    }); });
    test('didCancel', function () { return __awaiter(void 0, void 0, void 0, function () {
        var t, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.didCancel).toBeCallableWith(null);
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.didCancel).toBeCallableWith(undefined);
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.didCancel).toBeCallableWith({});
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.didCancel).toBeCallableWith(new Error());
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.didCancel).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.didCancel).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.didCancel)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    t = void 0;
                    return [4 /*yield*/, t];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    // TODO: fix
                    // expect(e).toBeAny();
                    if ((0, ember_concurrency_1.didCancel)(e_1)) {
                        (0, expect_type_1.expectTypeOf)(e_1).not.toBeAny();
                        (0, expect_type_1.expectTypeOf)(e_1).toMatchTypeOf();
                        (0, expect_type_1.expectTypeOf)(e_1).toMatchTypeOf();
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test('hash', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, task, thenable, promise, result, result, result, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = 'foo';
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hash)({})).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hash)({ value: value })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hash)({ task: task })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hash)({ thenable: thenable })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hash)({ promise: promise })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hash)({ value: value, task: task, thenable: thenable, promise: promise })).resolves.toEqualTypeOf();
                    return [4 /*yield*/, (0, ember_concurrency_1.hash)({})];
                case 1:
                    result = _a.sent();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hash)({ value: value })];
                case 2:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toBeString();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hash)({ value: value, task: task })];
                case 3:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toBeString();
                    (0, expect_type_1.expectTypeOf)(result.task).toBeBoolean();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hash)({ value: value, task: task, thenable: thenable })];
                case 4:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toBeString();
                    (0, expect_type_1.expectTypeOf)(result.task).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result.thenable).toBeNumber();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hash)({ value: value, task: task, thenable: thenable, promise: promise })];
                case 5:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toBeString();
                    (0, expect_type_1.expectTypeOf)(result.task).toBeBoolean();
                    (0, expect_type_1.expectTypeOf)(result.thenable).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(result.promise).toEqualTypeOf();
                    // @ts-expect-error
                    result.nope;
                    return [2 /*return*/];
            }
        });
    }); });
    test('hashSettled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, task, thenable, promise, result, result, result, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = 'foo';
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hashSettled)({})).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hashSettled)({ value: value })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hashSettled)({ task: task })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hashSettled)({ thenable: thenable })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hashSettled)({ promise: promise })).resolves.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.hashSettled)({ value: value, task: task, thenable: thenable, promise: promise })).resolves.toEqualTypeOf();
                    return [4 /*yield*/, (0, ember_concurrency_1.hashSettled)({})];
                case 1:
                    result = _a.sent();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hashSettled)({ value: value })];
                case 2:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toEqualTypeOf();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hashSettled)({ value: value, task: task })];
                case 3:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result.task).toEqualTypeOf();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hashSettled)({ value: value, task: task, thenable: thenable })];
                case 4:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result.task).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result.thenable).toEqualTypeOf();
                    // @ts-expect-error
                    result.nope;
                    return [4 /*yield*/, (0, ember_concurrency_1.hashSettled)({ value: value, task: task, thenable: thenable, promise: promise })];
                case 5:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result.value).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result.task).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result.thenable).toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(result.promise).toEqualTypeOf();
                    // @ts-expect-error
                    result.nope;
                    return [2 /*return*/];
            }
        });
    }); });
    test('race', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, task, thenable, promise, result, result, result, result, result, result, result, result, result, result, result, result, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = 'foo';
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.race)([])).toEqualTypeOf(Promise.race([]));
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.race)([value])).toEqualTypeOf(Promise.race([value]));
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.race)([task])).toEqualTypeOf(Promise.race([task]));
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.race)([thenable])).toEqualTypeOf(Promise.race([thenable]));
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.race)([promise])).toEqualTypeOf(Promise.race([promise]));
                    (0, expect_type_1.expectTypeOf)((0, ember_concurrency_1.race)([value, task, thenable, promise])).toEqualTypeOf(Promise.race([value, task, thenable, promise]));
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([])];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toBeNever();
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value])];
                case 2:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toBeString();
                    (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value, task])];
                case 3:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value, task, thenable])];
                case 4:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value, task, thenable, promise])];
                case 5:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value, task, thenable, promise])];
                case 6:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value, task, thenable, promise, value])];
                case 7:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([value, task, thenable, promise, value, task])];
                case 8:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                        ])];
                case 9:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                        ])];
                case 10:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                        ])];
                case 11:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                        ])];
                case 12:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                        ])];
                case 13:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [4 /*yield*/, (0, ember_concurrency_1.race)([
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                            value,
                            task,
                            thenable,
                            promise,
                        ])];
                case 14:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    // @ts-expect-error
                    result.length;
                    return [2 /*return*/];
            }
        });
    }); });
    test('timeout', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.timeout).toBeCallableWith(500);
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.timeout).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.timeout).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.timeout)();
                    // @ts-expect-error
                    (0, ember_concurrency_1.timeout)('nope');
                    // @ts-expect-error
                    (0, ember_concurrency_1.timeout)(500, 'nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(500)];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [2 /*return*/];
            }
        });
    }); });
    test('rawTimeout', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.rawTimeout).toBeCallableWith(500);
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.rawTimeout).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.rawTimeout).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.rawTimeout)();
                    // @ts-expect-error
                    (0, ember_concurrency_1.rawTimeout)('nope');
                    // @ts-expect-error
                    (0, ember_concurrency_1.rawTimeout)(500, 'nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.rawTimeout)(500)];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [2 /*return*/];
            }
        });
    }); });
    test('animationFrame', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.animationFrame).toBeCallableWith();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.animationFrame).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.animationFrame).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.animationFrame)('nope');
                    // @ts-expect-error
                    (0, ember_concurrency_1.animationFrame)(500, 'nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.animationFrame)()];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [2 /*return*/];
            }
        });
    }); });
    test('waitForQueue', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForQueue).toBeCallableWith('afterRender');
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForQueue).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForQueue).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForQueue)();
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForQueue)(500);
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForQueue)('afterRender', 'nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.waitForQueue)('afterRender')];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [2 /*return*/];
            }
        });
    }); });
    test('waitForEvent', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).toBeCallableWith({
                        on: function (event, callback) { },
                        off: function (event, callback) { }
                    }, 'foo');
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).toBeCallableWith({
                        one: function (event, callback) { }
                    }, 'foo');
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).toBeCallableWith(object_1["default"].extend(evented_1["default"]).create(), 'foo');
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).toBeCallableWith({
                        addEventListener: function (event, callback) { },
                        removeEventListener: function (event, callback) { }
                    }, 'foo');
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).toBeCallableWith(document.body, 'click');
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForEvent).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForEvent)();
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForEvent)('nope');
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForEvent)(document.body, 'click', 'nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.waitForEvent)(document.body, 'click')];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [2 /*return*/];
            }
        });
    }); });
    test('waitForProperty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var obj, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    obj = { foo: 'foo' };
                    // TODO: fix
                    // expect(waitForProperty).toBeCallableWith(obj, 'foo', 'bar');
                    // expect(waitForProperty).toBeCallableWith(
                    //   obj,
                    //   'foo',
                    //   (v: unknown) => v === 'bar'
                    // );
                    // expect(waitForProperty).toBeCallableWith(
                    //   obj,
                    //   'foo',
                    //   (v: string) => v === 'bar'
                    // );
                    // expect(waitForProperty).parameters.toEqualTypeOf<
                    //   [object, string | number | symbol, unknown]
                    // >();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.waitForProperty).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForProperty)();
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForProperty)('nope');
                    // @ts-expect-error
                    (0, ember_concurrency_1.waitForProperty)(obj, 'foo', 'bar', 'nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.waitForProperty)(obj, 'foo', 'bar')];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [4 /*yield*/, (0, ember_concurrency_1.waitForProperty)(obj, 'foo', function (v) {
                            (0, expect_type_1.expectTypeOf)(v).toBeString();
                            return false;
                        })];
                case 2:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
                    return [2 /*return*/];
            }
        });
    }); });
    test('forever', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.forever).toBeCallableWith();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.forever).parameters.toEqualTypeOf();
                    (0, expect_type_1.expectTypeOf)(ember_concurrency_1.forever).returns.toEqualTypeOf();
                    // @ts-expect-error
                    (0, ember_concurrency_1.forever)('nope');
                    return [4 /*yield*/, (0, ember_concurrency_1.forever)()];
                case 1:
                    result = _a.sent();
                    (0, expect_type_1.expectTypeOf)(result).toBeNever();
                    return [2 /*return*/];
            }
        });
    }); });
    test('getModifier', function () {
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.getModifier).toBeCallableWith('foo');
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.getModifier).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.getModifier).returns.toEqualTypeOf();
        // @ts-expect-error
        (0, ember_concurrency_1.getModifier)();
        // @ts-expect-error
        (0, ember_concurrency_1.getModifier)(false);
        // @ts-expect-error
        (0, ember_concurrency_1.getModifier)(null);
        // @ts-expect-error
        (0, ember_concurrency_1.getModifier)(function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    });
    test('hasModifier', function () {
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.hasModifier).toBeCallableWith('foo');
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.hasModifier).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.hasModifier).returns.toEqualTypeOf();
        // @ts-expect-error
        (0, ember_concurrency_1.hasModifier)();
        // @ts-expect-error
        (0, ember_concurrency_1.hasModifier)(false);
        // @ts-expect-error
        (0, ember_concurrency_1.hasModifier)(null);
        // @ts-expect-error
        (0, ember_concurrency_1.hasModifier)(function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    });
    test('registerModifier', function () {
        var taskDef = function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 42];
            });
        };
        var encapDef = {
            perform: function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, 'boo!'];
                });
            }
        };
        var singleArgModifier = function (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        factory, modifierArgument) {
            factory.setTaskDefinition(taskDef);
            factory.setTaskDefinition(encapDef);
        };
        var arrayArgModifier = function (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        factory, arrayArg) {
            factory.setTaskDefinition(taskDef);
            factory.setTaskDefinition(encapDef);
        };
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.registerModifier).toBeCallableWith('foo', singleArgModifier);
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.registerModifier).toBeCallableWith('foo', arrayArgModifier);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.registerModifier).parameters.toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(ember_concurrency_1.registerModifier).returns.toEqualTypeOf();
        // @ts-expect-error
        (0, ember_concurrency_1.registerModifier)();
        // @ts-expect-error
        (0, ember_concurrency_1.registerModifier)('foo');
    });
});
module('integration tests', function () {
    test('classic ember', function () {
        component_1["default"].extend({
            // eslint-disable-next-line @typescript-eslint/no-inferrable-types
            myTask: (0, ember_concurrency_1.task)(function (immediately, ms) {
                var fetchPromise, response, safeResponse;
                if (ms === void 0) { ms = 500; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!immediately) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            fetchPromise = fetch('/api/data.json');
                            (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                            return [4 /*yield*/, fetchPromise];
                        case 3:
                            response = _a.sent();
                            (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                            return [4 /*yield*/, fetchPromise];
                        case 4:
                            safeResponse = _a.sent();
                            (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                            return [2 /*return*/, 'wow'];
                    }
                });
            }).restartable(),
            performMyTask: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var myTask, myTaskInstance, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                myTask = this.get('myTask');
                                (0, expect_type_1.expectTypeOf)(myTask).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTask).toMatchTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(true);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(false, 500);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).parameters.toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toEqualTypeOf();
                                myTaskInstance = myTask.perform(true);
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.value).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                return [4 /*yield*/, myTaskInstance];
                            case 1:
                                result = _a.sent();
                                (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(result).toBeString();
                                (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                                // @ts-expect-error
                                myTask.perform('nope');
                                // @ts-expect-error
                                myTask.perform(true, 'nope');
                                // @ts-expect-error
                                myTask.perform(false, 500, 'nope');
                                return [2 /*return*/];
                        }
                    });
                });
            }
        });
    });
    test('classic ember (encapsulated task)', function () {
        component_1["default"].extend({
            myTask: (0, ember_concurrency_1.task)({
                foo: 'foo',
                // eslint-disable-next-line @typescript-eslint/no-inferrable-types
                perform: function (immediately, ms) {
                    var fetchPromise, response, safeResponse;
                    if (ms === void 0) { ms = 500; }
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                (0, expect_type_1.expectTypeOf)(this).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(this.foo).toBeString();
                                if (!!immediately) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                fetchPromise = fetch('/api/data.json');
                                (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                return [4 /*yield*/, fetchPromise];
                            case 3:
                                response = _a.sent();
                                (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                return [4 /*yield*/, fetchPromise];
                            case 4:
                                safeResponse = _a.sent();
                                (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                return [2 /*return*/, 'wow'];
                        }
                    });
                }
            }).restartable(),
            performMyTask: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var myTask, myTaskInstance, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                myTask = this.get('myTask');
                                (0, expect_type_1.expectTypeOf)(myTask).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTask).toMatchTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask).toMatchTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toMatchTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(true);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(false, 500);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).parameters.toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toMatchTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toEqualTypeOf();
                                myTaskInstance = myTask.perform(true);
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.value).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.foo).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.foo).toBeString();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                return [4 /*yield*/, myTaskInstance];
                            case 1:
                                result = _a.sent();
                                (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(result).toBeString();
                                (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                                // @ts-expect-error
                                myTask.perform('nope');
                                // @ts-expect-error
                                myTask.perform(true, 'nope');
                                // @ts-expect-error
                                myTask.perform(false, 500, 'nope');
                                return [2 /*return*/];
                        }
                    });
                });
            }
        });
    });
    test('async arrow with first arg `this`', function () {
        var MyComponent = /** @class */ (function (_super) {
            __extends(MyComponent, _super);
            function MyComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.normalTask = (0, ember_concurrency_1.task)(_this, function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // expect(this).toEqualTypeOf<MyComponent>();
                                    (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                    (0, expect_type_1.expectTypeOf)(this.foo).toEqualTypeOf();
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                _this.restartable = (0, ember_concurrency_1.task)(_this, { restartable: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.enqueue = (0, ember_concurrency_1.task)(_this, { enqueue: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.drop = (0, ember_concurrency_1.task)(_this, { drop: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.keepLatest = (0, ember_concurrency_1.task)(_this, { keepLatest: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.evented = (0, ember_concurrency_1.task)(_this, { evented: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.debug = (0, ember_concurrency_1.task)(_this, { debug: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.onState = (0, ember_concurrency_1.task)(_this, { onState: function () { } }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.onStateNull = (0, ember_concurrency_1.task)(_this, { onState: null }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                // Note: these options work even when strictFunctionTypes is enabled, but
                // turning it on in this repo breaks other things in addon/index.d.ts
                _this.on = (0, ember_concurrency_1.task)(_this, { on: 'hi' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.cancelOn = (0, ember_concurrency_1.task)(_this, { cancelOn: 'bye' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.maxConcurrency = (0, ember_concurrency_1.task)(_this, { maxConcurrency: 1 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.group = (0, ember_concurrency_1.task)(_this, { group: 'foo' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.myTaskValue = 'or some default';
                _this.myTask = (0, ember_concurrency_1.task)(_this, { restartable: true }, 
                // TODO: Seems strange that this was necessary
                // eslint-disable-next-line @typescript-eslint/no-inferrable-types
                function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // expect(this).toEqualTypeOf<MyComponent>();
                                    (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                    (0, expect_type_1.expectTypeOf)(this.foo).toEqualTypeOf();
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                return _this;
            }
            MyComponent.prototype.performMyTask = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var myTask, myTaskInstance, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                myTask = this.myTask;
                                (0, expect_type_1.expectTypeOf)(myTask).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTask).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(true);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(false, 500);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).parameters.toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toEqualTypeOf();
                                myTaskInstance = myTask.perform(true);
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.value).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                return [4 /*yield*/, myTaskInstance];
                            case 1:
                                result = _a.sent();
                                (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(result).toBeString();
                                (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                                // @ts-expect-error
                                myTask.perform('nope');
                                // @ts-expect-error
                                myTask.perform(true, 'nope');
                                // @ts-expect-error
                                myTask.perform(false, 500, 'nope');
                                return [2 /*return*/];
                        }
                    });
                });
            };
            __decorate([
                ember_concurrency_1.taskGroup
            ], MyComponent.prototype, "foo");
            __decorate([
                (0, ember_concurrency_1.lastValue)('myTask')
            ], MyComponent.prototype, "myTaskValue");
            return MyComponent;
        }(component_2["default"]));
    });
    test('async arrow omitting `this`', function () {
        var MyComponent = /** @class */ (function (_super) {
            __extends(MyComponent, _super);
            function MyComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.normalTask = (0, ember_concurrency_1.task)(function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // expect(this).toEqualTypeOf<MyComponent>();
                                    (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                    (0, expect_type_1.expectTypeOf)(this.foo).toEqualTypeOf();
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                _this.restartable = (0, ember_concurrency_1.task)({ restartable: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.enqueue = (0, ember_concurrency_1.task)({ enqueue: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.drop = (0, ember_concurrency_1.task)({ drop: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.keepLatest = (0, ember_concurrency_1.task)({ keepLatest: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.evented = (0, ember_concurrency_1.task)({ evented: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.debug = (0, ember_concurrency_1.task)({ debug: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.onState = (0, ember_concurrency_1.task)({ onState: function () { } }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.onStateNull = (0, ember_concurrency_1.task)({ onState: null }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                // Note: these options work even when strictFunctionTypes is enabled, but
                // turning it on in this repo breaks other things in addon/index.d.ts
                _this.on = (0, ember_concurrency_1.task)({ on: 'hi' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.cancelOn = (0, ember_concurrency_1.task)({ cancelOn: 'bye' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.maxConcurrency = (0, ember_concurrency_1.task)({ maxConcurrency: 1 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.group = (0, ember_concurrency_1.task)({ group: 'foo' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.myTaskValue = 'or some default';
                _this.myTask = (0, ember_concurrency_1.task)({ restartable: true }, 
                // TODO: Seems strange that this was necessary
                // eslint-disable-next-line @typescript-eslint/no-inferrable-types
                function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // expect(this).toEqualTypeOf<MyComponent>();
                                    (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                    (0, expect_type_1.expectTypeOf)(this.foo).toEqualTypeOf();
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                return _this;
            }
            MyComponent.prototype.performMyTask = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var myTask, myTaskInstance, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                myTask = this.myTask;
                                (0, expect_type_1.expectTypeOf)(myTask).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTask).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(true);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(false, 500);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).parameters.toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toEqualTypeOf();
                                myTaskInstance = myTask.perform(true);
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.value).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                return [4 /*yield*/, myTaskInstance];
                            case 1:
                                result = _a.sent();
                                (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(result).toBeString();
                                (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                                // @ts-expect-error
                                myTask.perform('nope');
                                // @ts-expect-error
                                myTask.perform(true, 'nope');
                                // @ts-expect-error
                                myTask.perform(false, 500, 'nope');
                                return [2 /*return*/];
                        }
                    });
                });
            };
            __decorate([
                ember_concurrency_1.taskGroup
            ], MyComponent.prototype, "foo");
            __decorate([
                (0, ember_concurrency_1.lastValue)('myTask')
            ], MyComponent.prototype, "myTaskValue");
            return MyComponent;
        }(component_2["default"]));
    });
    test('async arrow with get', function () {
        var MyComponent = /** @class */ (function (_super) {
            __extends(MyComponent, _super);
            function MyComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.myTask = (0, ember_concurrency_1.task)({ restartable: true }, 
                // TODO: Seems strange that this was necessary
                // eslint-disable-next-line @typescript-eslint/no-inferrable-types
                function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                return _this;
            }
            MyComponent.prototype.performMyTask = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var myTask, myTaskInstance, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                myTask = (0, object_1.get)(this, 'myTask');
                                (0, expect_type_1.expectTypeOf)(myTask.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(true);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(false, 500);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).parameters.toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toEqualTypeOf();
                                myTaskInstance = myTask.perform(true);
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.value).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                return [4 /*yield*/, myTaskInstance];
                            case 1:
                                result = _a.sent();
                                (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(result).toBeString();
                                (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                                // @ts-expect-error
                                myTask.perform('nope');
                                // @ts-expect-error
                                myTask.perform(true, 'nope');
                                // @ts-expect-error
                                myTask.perform(false, 500, 'nope');
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return MyComponent;
        }(component_2["default"]));
    });
    test('async arrow dropTask and other alternative task fns', function () {
        var MyComponent = /** @class */ (function (_super) {
            __extends(MyComponent, _super);
            function MyComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.normalTask = (0, ember_concurrency_1.task)(function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // expect(this).toEqualTypeOf<MyComponent>();
                                    (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                    (0, expect_type_1.expectTypeOf)(this.foo).toEqualTypeOf();
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                _this.restartable = (0, ember_concurrency_1.restartableTask)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.restartable2 = (0, ember_concurrency_1.restartableTask)({ maxConcurrency: 2 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.enqueue = (0, ember_concurrency_1.enqueueTask)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.enqueue2 = (0, ember_concurrency_1.enqueueTask)({ maxConcurrency: 2 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.drop = (0, ember_concurrency_1.dropTask)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.drop2 = (0, ember_concurrency_1.dropTask)({ maxConcurrency: 2 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.keepLatest = (0, ember_concurrency_1.keepLatestTask)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.keepLatest2 = (0, ember_concurrency_1.keepLatestTask)({ maxConcurrency: 2 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.evented = (0, ember_concurrency_1.task)({ evented: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.debug = (0, ember_concurrency_1.task)({ debug: true }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.onState = (0, ember_concurrency_1.task)({ onState: function () { } }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.onStateNull = (0, ember_concurrency_1.task)({ onState: null }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                // Note: these options work even when strictFunctionTypes is enabled, but
                // turning it on in this repo breaks other things in addon/index.d.ts
                _this.on = (0, ember_concurrency_1.task)({ on: 'hi' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.cancelOn = (0, ember_concurrency_1.task)({ cancelOn: 'bye' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.maxConcurrency = (0, ember_concurrency_1.task)({ maxConcurrency: 1 }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.group = (0, ember_concurrency_1.task)({ group: 'foo' }, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); });
                _this.myTaskValue = 'or some default';
                _this.myTask = (0, ember_concurrency_1.task)(_this, { restartable: true }, 
                // TODO: Seems strange that this was necessary
                // eslint-disable-next-line @typescript-eslint/no-inferrable-types
                function (immediately, ms) {
                    if (ms === void 0) { ms = 500; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var fetchPromise, response, safeResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // expect(this).toEqualTypeOf<MyComponent>();
                                    (0, expect_type_1.expectTypeOf)(this.foo).not.toBeAny();
                                    (0, expect_type_1.expectTypeOf)(this.foo).toEqualTypeOf();
                                    if (!!immediately) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, ember_concurrency_1.timeout)(ms)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    fetchPromise = fetch('/api/data.json');
                                    (0, expect_type_1.expectTypeOf)(fetchPromise).resolves.toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 3:
                                    response = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(response).toEqualTypeOf();
                                    return [4 /*yield*/, fetchPromise];
                                case 4:
                                    safeResponse = _a.sent();
                                    (0, expect_type_1.expectTypeOf)(safeResponse).toEqualTypeOf();
                                    return [2 /*return*/, 'wow'];
                            }
                        });
                    });
                });
                return _this;
            }
            MyComponent.prototype.performMyTask = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var myTask, myTaskInstance, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                myTask = this.myTask;
                                (0, expect_type_1.expectTypeOf)(myTask).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTask).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTask.last).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(true);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).toBeCallableWith(false, 500);
                                (0, expect_type_1.expectTypeOf)(myTask.perform).parameters.toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTask.perform).returns.toEqualTypeOf();
                                myTaskInstance = myTask.perform(true);
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.isRunning).toBeBoolean();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance.value).toEqualTypeOf();
                                (0, expect_type_1.expectTypeOf)(myTaskInstance).toMatchTypeOf();
                                return [4 /*yield*/, myTaskInstance];
                            case 1:
                                result = _a.sent();
                                (0, expect_type_1.expectTypeOf)(result).not.toBeAny();
                                (0, expect_type_1.expectTypeOf)(result).toBeString();
                                (0, expect_type_1.expectTypeOf)(result.length).toBeNumber();
                                // @ts-expect-error
                                myTask.perform('nope');
                                // @ts-expect-error
                                myTask.perform(true, 'nope');
                                // @ts-expect-error
                                myTask.perform(false, 500, 'nope');
                                return [2 /*return*/];
                        }
                    });
                });
            };
            __decorate([
                ember_concurrency_1.taskGroup
            ], MyComponent.prototype, "foo");
            __decorate([
                (0, ember_concurrency_1.lastValue)('myTask')
            ], MyComponent.prototype, "myTaskValue");
            return MyComponent;
        }(component_2["default"]));
    });
});
