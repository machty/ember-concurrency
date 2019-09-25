interface DOMElement {}
interface Promise<T> {}
declare class Registry {}
declare class Transition {}
declare namespace Handlebars { class SafeString {} }
declare class JQuery {}


declare module 'ember' {
  export namespace Ember {
    /**
     * Define an assertion that will throw an exception if the condition is not met. Ember build tools will remove any calls to `Ember.assert()` when doing a production build. Example:
     */
    function assert(desc: string, test: boolean);
    /**
     * Display a warning with the provided message. Ember build tools will remove any calls to `Ember.warn()` when doing a production build.
     */
    function warn(message: string, test: boolean);
    /**
     * Display a debug notice. Ember build tools will remove any calls to `Ember.debug()` when doing a production build.
     */
    function debug(message: string);
    /**
     * Display a deprecation warning with the provided message and a stack trace (Chrome and Firefox only). Ember build tools will remove any calls to `Ember.deprecate()` when doing a production build.
     */
    function deprecate(message: string, test: boolean, options: {});
    /**
     * Alias an old, deprecated method with its new counterpart.
     */
    function deprecateFunc(message: string, func: Function): Function;
    /**
     * Run a function meant for debugging. Ember build tools will remove any calls to `Ember.runInDebug()` when doing a production build.
     */
    function runInDebug(func: Function);
    /**
     * Identical to `Object.create()`. Implements if not available natively.
     */
    function create();
    /**
     * Array polyfills to support ES5 features in older browsers.
     */
    var ArrayPolyfills: any;
    /**
     * Debug parameter you can turn on. This will log all bindings that fire to the console. This should be disabled in production code. Note that you can also enable this from the console or temporarily.
     */
    var LOG_BINDINGS: boolean;
    /**
     * Global helper method to create a new binding. Just pass the root object along with a `to` and `from` path to create and connect the binding.
     */
    function bind(obj: {}, to: string, from: string): Binding;
    function oneWay(obj: {}, to: string, from: string): Binding;
    /**
     * Returns the cached value for a property, if one exists. This can be useful for peeking at the value of a computed property that is generated lazily, without accidentally causing it to be created.
     */
    function cacheFor(obj: {}, key: string): {};
    var VERSION: string;
    /**
     * Standard environmental variables. You can define these in a global `EmberENV` variable before loading Ember to control various configuration settings.
     */
    var ENV: {};
    /**
     * Determines whether Ember should enhance some built-in object prototypes to provide a more friendly API. If enabled, a few methods will be added to `Function`, `String`, and `Array`. `Object.prototype` will not be enhanced, which is the one that causes most trouble for people.
     */
    var EXTEND_PROTOTYPES: boolean;
    /**
     * Determines whether Ember logs a full stack trace during deprecation warnings
     */
    var LOG_STACKTRACE_ON_DEPRECATION: boolean;
    /**
     * Determines whether Ember should add ECMAScript 5 Array shims to older browsers.
     */
    var SHIM_ES5: boolean;
    /**
     * Determines whether Ember logs info about version of used libraries
     */
    var LOG_VERSION: boolean;
    /**
     * Add an event listener
     */
    function addListener(obj: any, eventName: string, target: {}|Function, method: Function|string, once: boolean);
    /**
     * Remove an event listener
     */
    function removeListener(obj: any, eventName: string, target: {}|Function, method: Function|string);
    /**
     * Send an event. The execution of suspended listeners is skipped, and once listeners are removed. A listener without a target is executed on the passed object. If an array of actions is not passed, the actions stored on the passed object are invoked.
     */
    function sendEvent(obj: any, eventName: string, params: Ember.Array, actions: Ember.Array): void;
    /**
     * Define a property as a function that should be executed when a specified event or events are triggered.
     */
    function on(eventNames: string, func: Function): void;
    /**
     * To get multiple properties at once, call `Ember.getProperties` with an object followed by a list of strings or an array:
     */
    function getProperties(obj: {}, ...list: string[]): {};
    /**
     * A value is blank if it is empty or a whitespace string.
     */
    function isBlank(obj: {}): boolean;
    /**
     * Verifies that a value is `null` or an empty string, empty array, or empty function.
     */
    function isEmpty(obj: {}): boolean;
    /**
     * Returns true if the passed value is null or undefined. This avoids errors from JSLint complaining about use of ==, which can be technically confusing.
     */
    function isNone(obj: {}): boolean;
    /**
     * A value is present if it not `isBlank`.
     */
    function isPresent(obj: {}): boolean;
    /**
     * Returns all of the keys defined on an object or hash. This is useful when inspecting objects for debugging. On browsers that support it, this uses the native `Object.keys` implementation.
     */
    function keys(obj: {}): Ember.Array;
    /**
     * Merge the contents of two objects together into the first object.
     */
    function merge(original: {}, updates: {}): {};
    function mixin(obj: any, mixins: any): void;
    /**
     * Denotes a required property for a mixin
     */
    function required();
    /**
     * Makes a method available via an additional name.
     */
    function aliasMethod(methodName: string): Descriptor;
    /**
     * Specify a method that observes property changes.
     */
    function observer(propertyNames: string, func: Function): void;
    /**
     * Specify a method that observes property changes.
     */
    function immediateObserver(propertyNames: string, func: Function): void;
    /**
     * When observers fire, they are called with the arguments `obj`, `keyName`.
     */
    function beforeObserver(propertyNames: string, func: Function): void;
    function addObserver(obj: any, path: string, targetOrMethod: {}|Function, method: Function|string);
    function removeObserver(obj: any, path: string, target: {}|Function, method: Function|string);
    function addBeforeObserver(obj: any, path: string, target: {}|Function, method: Function|string);
    function removeBeforeObserver(obj: any, path: string, target: {}|Function, method: Function|string);
    /**
     * This function is called just before an object property is about to change. It will notify any before observers and prepare caches among other things.
     */
    function propertyWillChange(obj: {}, keyName: string): void;
    /**
     * This function is called just after an object property has changed. It will notify any observers and clear caches among other things.
     */
    function propertyDidChange(obj: {}, keyName: string): void;
    /**
     * Make a series of property changes together in an exception-safe way.
     */
    function changeProperties(callback: Function, binding: any);
    /**
     * Gets the value of a property on an object. If the property is computed, the function will be invoked. If the property is not defined but the object implements the `unknownProperty` method then that will be invoked.
     */
    function get(obj: {}, keyName: string): {};
    /**
     * Sets the value of a property on an object, respecting computed properties and notifying observers and other listeners of the change. If the property is not defined but the object implements the `setUnknownProperty` method then that will be invoked as well.
     */
    function set(obj: {}, keyName: string, value: {}): {};
    /**
     * Error-tolerant form of `Ember.set`. Will not blow up if any part of the chain is `undefined`, `null`, or destroyed.
     */
    function trySet(obj: {}, path: string, value: {});
    /**
     * Set a list of properties on an object. These properties are set inside a single `beginPropertyChanges` and `endPropertyChanges` batch, so observers will be buffered.
     */
    function setProperties(obj: any, properties: {}): void;
    /**
     * Returns true if the passed object is an array or Array-like.
     */
    function isArray(obj: {}): boolean;
    /**
     * Forces the passed object to be part of an array. If the object is already an array or array-like, it will return the object. Otherwise, it will add the object to an array. If obj is `null` or `undefined`, it will return an empty array.
     */
    function makeArray(obj: {}): Ember.Array;
    /**
     * Checks to see if the `methodName` exists on the `obj`.
     */
    function canInvoke(obj: {}, methodName: string): boolean;
    /**
     * Checks to see if the `methodName` exists on the `obj`, and if it does, invokes it with the arguments passed.
     */
    function tryInvoke(obj: {}, methodName: string, args: Ember.Array): any;
    /**
     * Provides try/finally functionality, while working around Safari's double finally bug.
     */
    function tryFinally(tryable: Function, finalizer: Function, binding: {}): any;
    /**
     * Provides try/catch/finally functionality, while working around Safari's double finally bug.
     */
    function tryCatchFinally(tryable: Function, catchable: Function, finalizer: Function, binding: {}): any;
    /**
     * Returns a consistent type for the passed item.
     */
    function typeOf(item: {}): string;
    /**
     * Convenience method to inspect an object. This method will attempt to convert the object into a useful string description.
     */
    function inspect(obj: {}): string;
    /**
     * Tears down the meta on an object so that it can be garbage collected. Multiple calls will have no effect.
     */
    function destroy(obj: {}): void;
    /**
     * Creates a computed property which operates on dependent arrays and is updated with "one at a time" semantics. When items are added or removed from the dependent array(s) an array computed only operates on the change instead of re-evaluating the entire array. This should return an array, if you'd like to use "one at a time" semantics and compute some value other then an array look at `Ember.reduceComputed`.
     */
    function arrayComputed(...dependentKeys: string[]): ComputedProperty;
    function arrayComputed(options: {}): ComputedProperty;
    /**
     * Creates a computed property which operates on dependent arrays and is updated with "one at a time" semantics. When items are added or removed from the dependent array(s) a reduce computed only operates on the change instead of re-evaluating the entire array.
     */
    function reduceComputed(...dependentKeys: string[]): ComputedProperty;
    function reduceComputed(options: {}): ComputedProperty;
    /**
     * Detects when a specific package of Ember (e.g. 'Ember.Handlebars') has fully loaded and is available for extension.
     */
    function onLoad(name: string, callback: Function);
    /**
     * Called when an Ember.js package (e.g Ember.Handlebars) has finished loading. Triggers any callbacks registered for this event.
     */
    function runLoadHooks(name: string, object: {});
    /**
     * Creates an `Ember.NativeArray` from an Array like object. Does not modify the original object. Ember.A is not needed if `Ember.EXTEND_PROTOTYPES` is `true` (the default value). However, it is recommended that you use Ember.A when creating addons for ember or when you can not guarantee that `Ember.EXTEND_PROTOTYPES` will be `true`.
     */
    function A(): NativeArray;
    /**
     * Defines the hash of localized strings for the current language. Used by the `Ember.String.loc()` helper. To localize, add string values to this hash.
     */
    var STRINGS: {};
    /**
     * This will compare two javascript values of possibly different types. It will tell you which one is greater than the other by returning:
     */
    function compare(v: {}, w: {}): number;
    /**
     * Creates a clone of the passed object. This function can take just about any type of object and create a clone of it, including primitive values (which are not actually cloned because they are immutable).
     */
    function copy(obj: {}, deep: boolean): {};
    /**
     * Compares two objects, returning true if they are logically equal. This is a deeper comparison than a simple triple equal. For sets it will compare the internal objects. For any other object that implements `isEqual()` it will respect that method.
     */
    function isEqual(a: {}, b: {}): boolean;
    /**
     * Global hash of shared templates. This will automatically be populated by the build tools so that you can store your Handlebars templates in separate files that get loaded into JavaScript at buildtime.
     */
    var TEMPLATES: {};
    /**
     * Alias for jQuery
     */
    function $();
    export namespace Handlebars {
      /**
       * DEPRECATED: 
       * Lookup both on root and on window. If the path starts with a keyword, the corresponding object will be looked up in the template's data hash and used to resolve the path.
       */
      function get(root: {}, path: string, options: {});
      /**
       * DEPRECATED: 
       * A helper function used by `registerBoundHelper`. Takes the provided Handlebars helper function fn and returns it in wrapped bound helper form.
       */
      function makeBoundHelper(function: Function, dependentKeys: string);
      /**
       * Register a bound handlebars helper. Bound helpers behave similarly to regular handlebars helpers, with the added ability to re-render when the underlying data changes.
       */
      function registerBoundHelper(name: string, function: Function, dependentKeys: string);
      export class helpers {
        /**
         * `bind-attr` allows you to create a binding between DOM element attributes and Ember objects. For example:
         */
        'bind-attr'(options: {}): string;
        /**
         * DEPRECATED: 
         * See `bind-attr`
         */
        bindAttr(context: Function, options: {}): string;
        /**
         * DEPRECATED: Use `{{each}}` helper instead.
         * `{{collection}}` is a `Ember.Handlebars` helper for adding instances of `Ember.CollectionView` to a template. See [Ember.CollectionView](/api/classes/Ember.CollectionView.html) for additional information on how a `CollectionView` functions.
         */
        collection();
        /**
         * The `{{component}}` helper lets you add instances of `Ember.Component` to a template. See [Ember.Component](/api/classes/Ember.Component.html) for additional information on how a `Component` functions.
         */
        component();
        /**
         * Execute the `debugger` statement in the current template's context.
         */
        debugger(property: string);
        /**
         * The `{{#each}}` helper loops over elements in a collection. It is an extension of the base Handlebars `{{#each}}` helper.
         */
        each(name: string, path: string, options: {});
        if();
        unless();
        /**
         * The `{{input}}` helper inserts an HTML `<input>` tag into the template, with a `type` value of either `text` or `checkbox`. If no `type` is provided, `text` will be the default value applied. The attributes of `{{input}}` match those of the native HTML tag as closely as possible for these two types. ## Use as text field An `{{input}}` with no `type` or a `type` of `text` will render an HTML text input. The following HTML attributes can be set via the helper:
         */
        input(options: {});
        /**
         * Calls [Ember.String.loc](/api/classes/Ember.String.html#method_loc) with the provided string.
         */
        loc(str: string);
        /**
         * `log` allows you to output the value of variables in the current rendering context. `log` also accepts primitive types such as strings or numbers.
         */
        log(property: string);
        /**
         * The `partial` helper renders another template without changing the template context:
         */
        partial(partialName: string);
        /**
         * DEPRECATED: 
         */
        template(templateName: string);
        /**
         * `{{textarea}}` inserts a new instance of `<textarea>` tag into the template. The attributes of `{{textarea}}` match those of the native HTML tags as closely as possible.
         */
        textarea(options: {});
        /**
         * `unbound` allows you to output a property without binding. *Important:* The output will not be updated if the property changes. Use with caution.
         */
        unbound(property: string): string;
        /**
         * `{{view}}` inserts a new instance of an `Ember.View` into a template passing its options to the `Ember.View`'s `create` method and using the supplied block as the view's own template.
         */
        view();
        /**
         * Use the `{{with}}` helper when you want to aliases the to a new name. It's helpful for semantic clarity and to retain default scope or to reference from another `{{with}}` block.
         */
        with(context: Function, options: {}): string;
        /**
         * `{{yield}}` denotes an area of a template that will be rendered inside of another template. It has two main uses:
         */
        yield(options: {}): string;
        /**
         * The `{{action}}` helper provides a useful shortcut for registering an HTML element within a template for a single DOM event and forwarding that interaction to the template's controller or specified `target` option.
         */
        action(actionName: string, context: {}, options: {});
        /**
         * The `{{link-to}}` helper renders a link to the supplied `routeName` passing an optionally supplied model to the route as its `model` context of the route. The block for `{{link-to}}` becomes the innerHTML of the rendered element:
         */
        'link-to'(routeName: string, context: {}, options: {}): string;
        /**
         * DEPRECATED: 
         * See [link-to](/api/classes/Ember.Handlebars.helpers.html#method_link-to)
         */
        linkTo(routeName: string, context: {}): string;
        /**
         * The `outlet` helper is a placeholder that the router will fill in with the appropriate template based on the current state of the application.
         */
        outlet(property: string): string;
        /**
         * This is a sub-expression to be used in conjunction with the link-to helper. It will supply url query parameters to the target route.
         */
        'query-params'(hash: {}): string;
        /**
         * Calling ``{{render}}`` from within a template will insert another template that matches the provided name. The inserted template will access its properties on its own controller (rather than the controller of the parent template).
         */
        render(name: string, context: {}, options: {}): string;
      }
    }
    export namespace HTMLBars {
      export class Helper {
      }
    }
    export namespace Test {
      /**
       * Loads a route, sets up any controllers, and renders any templates associated with the route as though a real user had triggered the route change while using your app.
       */
      function visit(url: string): RSVP.Promise<any>;
      /**
       * Clicks an element and triggers any actions triggered by the element's `click` event.
       */
      function click(selector: string): RSVP.Promise<any>;
      /**
       * Unchecks a checkbox. Ensures the absence of the `checked` attribute
       */
      function check(selector: string): RSVP.Promise<any>;
      /**
       * Simulates a key event, e.g. `keypress`, `keydown`, `keyup` with the desired keyCode
       */
      function keyEvent(selector: string, type: string, keyCode: number): RSVP.Promise<any>;
      /**
       * Fills in an input element with some text.
       */
      function fillIn(selector: string, text: string): RSVP.Promise<any>;
      /**
       * Finds an element in the context of the app's container element. A simple alias for `app.$(selector)`.
       */
      function find(selector: string): {};
      /**
       * Like `find`, but throws an error if the element selector returns no results.
       */
      function findWithAssert(selector: string): {};
      /**
       * Causes the run loop to process any pending events. This is used to ensure that any async operations from other helpers (or your assertions) have been processed.
       */
      function wait(value: {}): RSVP.Promise<any>;
      /**
       * Returns the currently active route name.
       */
      function currentRouteName(): {};
      /**
       * Returns the current path.
       */
      function currentPath(): {};
      /**
       * Returns the current URL.
       */
      function currentURL(): {};
      /**
       * Pauses the current test - this is useful for debugging while testing or for test-driving. It allows you to inspect the state of your application at any point.
       */
      function pauseTest(): {};
      /**
       * Triggers the given DOM event on the element identified by the provided selector.
       */
      function triggerEvent(selector: string, context: string, type: string, options: {}): RSVP.Promise<any>;
      /**
       * This hook defers the readiness of the application, so that you can start the app when your tests are ready to run. It also sets the router's location to 'none', so that the window's location will not be modified (preventing both accidental leaking of state between tests and interference with your testing framework).
       */
      function setupForTesting();
      /**
       * `registerHelper` is used to register a test helper that will be injected when `App.injectTestHelpers` is called.
       */
      function registerHelper(name: string, helperMethod: Function, options: {});
      /**
       * `registerAsyncHelper` is used to register an async test helper that will be injected when `App.injectTestHelpers` is called.
       */
      function registerAsyncHelper(name: string, helperMethod: Function);
      /**
       * Remove a previously added helper method.
       */
      function unregisterHelper(name: string);
      /**
       * Used to register callbacks to be fired whenever `App.injectTestHelpers` is called.
       */
      function onInjectHelpers(callback: Function);
      /**
       * This returns a thenable tailored for testing.  It catches failed `onSuccess` callbacks and invokes the `Ember.Test.adapter.exception` callback in the last chained then.
       */
      function promise(resolver: Function);
      /**
       * Used to allow ember-testing to communicate with a specific testing framework.
       */
      var adapter: any;
      /**
       * Replacement for `Ember.RSVP.resolve` The only difference is this uses an instance of `Ember.Test.Promise`
       */
      function resolve(The: any);
      /**
       * This allows ember-testing to play nicely with other asynchronous events, such as an application that is waiting for a CSS3 transition or an IndexDB transaction.
       */
      function registerWaiter(context: {}, callback: Function);
      /**
       * `unregisterWaiter` is used to unregister a callback that was registered with `registerWaiter`.
       */
      function unregisterWaiter(context: {}, callback: Function);
      /**
       * This property contains the testing helpers for the current application. These are created once you call `injectTestHelpers` on your `Ember.Application` instance. The included helpers are also available on the `window` object by default, but can be used from this object on the individual application also.
       */
      var testHelpers: {};
      /**
       * This property indicates whether or not this application is currently in testing mode. This is set when `setupForTesting` is called on the current application.
       */
      var testing: boolean;
      /**
       * This will be used as the container to inject the test helpers into. By default the helpers are injected into `window`.
       */
      var helperContainer: {};
      /**
       * This injects the test helpers into the `helperContainer` object. If an object is provided it will be used as the helperContainer. If `helperContainer` is not set it will default to `window`. If a function of the same name has already been defined it will be cached (so that it can be reset if the helper is removed with `unregisterHelper` or `removeTestHelpers`).
       */
      function injectTestHelpers();
      /**
       * This removes all helpers that have been registered, and resets and functions that were overridden by the helpers.
       */
      function removeTestHelpers();
      /**
       * The primary purpose of this class is to create hooks that can be implemented by an adapter for various test frameworks.
       */
      export class Adapter {
        /**
         * This callback will be called whenever an async operation is about to start.
         */
        asyncStart();
        /**
         * This callback will be called whenever an async operation has completed.
         */
        asyncEnd();
        /**
         * Override this method with your testing framework's false assertion. This function is called whenever an exception occurs causing the testing promise to fail.
         */
        exception(error: string);
      }
      /**
       * This class implements the methods defined by Ember.Test.Adapter for the QUnit testing framework.
       */
      export class QUnitAdapter extends Adapter {
      }
    }
    /**
     * `Ember.ControllerMixin` provides a standard interface for all classes that compose Ember's controller layer: `Ember.Controller`, `Ember.ArrayController`, and `Ember.ObjectController`.
     */
    export class ControllerMixin implements ActionHandler {
      /**
       * An array of other controller objects available inside instances of this controller via the `controllers` property:
       */
      needs: Ember.Array;
      /**
       * DEPRECATED: Use `needs` instead
       */
      controllerFor();
      /**
       * Stores the instances of other controllers available from within this controller. Any controller listed by name in the `needs` property will be accessible by name through this property.
       */
      controllers: {};
      /**
       * Defines which query parameters the controller accepts. If you give the names ['category','page'] it will bind the values of these query parameters to the variables `this.category` and `this.page`
       */
      queryParams: any;
      /**
       * Transition the application into another route. The route may be either a single route or route path:
       */
      transitionToRoute(name: string, ...models: any[]);
      transitionToRoute(name: string, options: {});
      /**
       * DEPRECATED: 
       */
      transitionTo();
      /**
       * Transition into another route while replacing the current URL, if possible. This will replace the current history entry instead of adding a new one. Beside that, it is identical to `transitionToRoute` in all other respects.
       */
      replaceRoute(name: string, ...models: any[]);
      /**
       * DEPRECATED: 
       */
      replaceWith();
      /**
       * The object to which actions from the view should be sent.
       */
      target: any;
      /**
       * The controller's current model. When retrieving or modifying a controller's model, this property should be used instead of the `content` property.
       */
      model: any;
      /**
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * Triggers a named action on the `ActionHandler`. Any parameters supplied after the `actionName` string will be passed as arguments to the action target function.
       */
      send(actionName: string, context: any);
    }
    /**
     * An instance of `Ember.Application` is the starting point for every Ember application. It helps to instantiate, initialize and coordinate the many objects that make up your app.
     */
    export class Application extends Namespace {
      /**
       * The application instance's container. The container stores all of the instance-specific state for this application run.
       */
      container: Container;
      /**
       * The registry for this application instance. It should use the `applicationRegistry` as a fallback.
       */
      registry: Registry;
      /**
       * The DOM events for which the event dispatcher should listen.
       */
      customEvents: {};
      /**
       * The root DOM element of the Application. This can be specified as an element or a [jQuery-compatible selector string](http://api.jquery.com/category/selectors/).
       */
      rootElement: DOMElement;
      /**
       * The `Ember.EventDispatcher` responsible for delegating events to this application's views.
       */
      eventDispatcher: EventDispatcher;
      /**
       * Use this to defer readiness until some condition is true.
       */
      deferReadiness();
      /**
       * Call `advanceReadiness` after any asynchronous setup logic has completed. Each call to `deferReadiness` must be matched by a call to `advanceReadiness` or the application will never become ready and routing will not begin.
       */
      advanceReadiness();
      /**
       * Registers a factory that can be used for dependency injection (with `App.inject`) or for service lookup. Each factory is registered with a full name including two parts: `type:name`.
       */
      register(fullName: string, factory: Function, options: {});
      /**
       * Define a dependency injection onto a specific factory or all factories of a type.
       */
      inject(factoryNameOrType: string, property: string, injectionName: string);
      /**
       * Reset the application. This is typically used only in tests. It cleans up the application in the following order:
       */
      reset();
      /**
       * Set this to provide an alternate class to `Ember.DefaultResolver`
       */
      resolver: any;
      /**
       * Initializer receives an object which has the following attributes: `name`, `before`, `after`, `initialize`. The only required attribute is `initialize, all others are optional.
       */
      initializer(initializer: {});
    }
    /**
     * The DefaultResolver defines the default lookup rules to resolve container lookups before consulting the container for registered items:
     */
    export class DefaultResolver extends Object {
      /**
       * This will be set to the Application instance when it is created.
       */
      namespace: any;
      /**
       * This method is called via the container's resolver method. It parses the provided `fullName` and then looks up and returns the appropriate template or class.
       */
      resolve(fullName: string): {};
      /**
       * Convert the string name of the form 'type:name' to a Javascript object with the parsed aspects of the name broken out.
       */
      parseName(fullName: string);
      /**
       * Returns a human-readable description for a fullName. Used by the Application namespace in assertions to describe the precise name of the class that Ember is looking for, rather than container keys.
       */
      lookupDescription(fullName: string);
      /**
       * Given a parseName object (output from `parseName`), apply the conventions expected by `Ember.Router`
       */
      useRouterNaming(parsedName: {});
      /**
       * Look up the template in Ember.TEMPLATES
       */
      resolveTemplate(parsedName: {});
      /**
       * Lookup the view using `resolveOther`
       */
      resolveView(parsedName: {});
      /**
       * Lookup the controller using `resolveOther`
       */
      resolveController(parsedName: {});
      /**
       * Lookup the route using `resolveOther`
       */
      resolveRoute(parsedName: {});
      /**
       * Lookup the model on the Application namespace
       */
      resolveModel(parsedName: {});
      /**
       * Look up the specified object (from parsedName) on the appropriate namespace (usually on the Application)
       */
      resolveHelper(parsedName: {});
      /**
       * Look up the specified object (from parsedName) on the appropriate namespace (usually on the Application)
       */
      resolveOther(parsedName: {});
    }
    /**
     * The `ContainerDebugAdapter` helps the container and resolver interface with tools that debug Ember such as the [Ember Extension](https://github.com/tildeio/ember-extension) for Chrome and Firefox.
     */
    export class ContainerDebugAdapter extends Object {
      /**
       * The container of the application being debugged. This property will be injected on creation.
       */
      container: any;
      /**
       * The resolver instance of the application being debugged. This property will be injected on creation.
       */
      resolver: any;
      /**
       * Returns true if it is possible to catalog a list of available classes in the resolver for a given type.
       */
      canCatalogEntriesByType(type: string): boolean;
      /**
       * Returns the available classes a given type.
       */
      catalogEntriesByType(type: string): Ember.Array;
    }
    /**
     * The `DataAdapter` helps a data persistence library interface with tools that debug Ember such as the [Ember Extension](https://github.com/tildeio/ember-extension) for Chrome and Firefox.
     */
    export class DataAdapter {
      /**
       * The container of the application being debugged. This property will be injected on creation.
       */
      container: any;
      /**
       * The container-debug-adapter which is used to list all models.
       */
      containerDebugAdapter: any;
      /**
       * Specifies how records can be filtered. Records returned will need to have a `filterValues` property with a key for every name in the returned array.
       */
      getFilters(): Ember.Array;
      /**
       * Fetch the model types and observe them for changes.
       */
      watchModelTypes(typesAdded: Function, typesUpdated: Function): Function;
      /**
       * Fetch the records of a given type and observe them for changes.
       */
      watchRecords(recordsAdded: Function, recordsUpdated: Function, recordsRemoved: Function): Function;
    }
    /**
     * Defines string helper methods including string formatting and localization. Unless `Ember.EXTEND_PROTOTYPES.String` is `false` these methods will also be added to the `String.prototype` as well.
     */
    export class String {
      /**
       * Mark a string as safe for unescaped output with Handlebars. If you return HTML from a Handlebars helper, use this function to ensure Handlebars does not escape the HTML.
       */
      static htmlSafe(): Handlebars.SafeString;
      /**
       * Apply formatting options to the string. This will look for occurrences of "%@" in your string and substitute them with the arguments you pass into this method. If you want to control the specific order of replacement, you can add a number after the key as well to indicate which argument you want to insert.
       */
      fmt(str: string, formats: Ember.Array): string;
      /**
       * Formats the passed string, but first looks up the string in the localized strings hash. This is a convenient way to localize text. See `Ember.String.fmt()` for more information on formatting.
       */
      loc(str: string, formats: Ember.Array): string;
      /**
       * Splits a string into separate units separated by spaces, eliminating any empty strings in the process. This is a convenience method for split that is mostly useful when applied to the `String.prototype`.
       */
      w(str: string): Ember.Array;
      /**
       * Converts a camelized string into all lower case separated by underscores.
       */
      decamelize(str: string): string;
      /**
       * Replaces underscores, spaces, or camelCase with dashes.
       */
      dasherize(str: string): string;
      /**
       * Returns the lowerCamelCase form of a string.
       */
      camelize(str: string): string;
      /**
       * Returns the UpperCamelCase form of a string.
       */
      classify(str: string): string;
      /**
       * More general than decamelize. Returns the lower\_case\_and\_underscored form of a string.
       */
      underscore(str: string): string;
      /**
       * Returns the Capitalized form of a string
       */
      capitalize(str: string): string;
    }
    export class platform {
      /**
       * Set to true if the platform supports native getters and setters.
       */
      hasPropertyAccessors: any;
      /**
       * Identical to `Object.defineProperty()`. Implements as much functionality as possible if not available natively.
       */
      defineProperty(obj: {}, keyName: string, desc: {}): void;
    }
    /**
     * An `Ember.Binding` connects the properties of two objects so that whenever the value of one property changes, the other property will be changed also.
     */
    export class Binding {
      /**
       * This copies the Binding so it can be connected to another object.
       */
      copy(): Binding;
      /**
       * This will set `from` property path to the specified value. It will not attempt to resolve this property path to an actual object until you connect the binding.
       */
      from(path: string): Binding;
      /**
       * This will set the `to` property path to the specified value. It will not attempt to resolve this property path to an actual object until you connect the binding.
       */
      to(path: string|any[]): Binding;
      /**
       * Creates a new Binding instance and makes it apply in a single direction. A one-way binding will relay changes on the `from` side object (supplied as the `from` argument) the `to` side, but not the other way around. This means that if you change the "to" side directly, the "from" side may have a different value.
       */
      oneWay(from: string, flag: boolean): Binding;
      toString(): string;
      /**
       * Attempts to connect this binding instance so that it can receive and relay changes. This method will raise an exception if you have not set the from/to properties yet.
       */
      connect(obj: {}): Binding;
      /**
       * Disconnects the binding instance. Changes will no longer be relayed. You will not usually need to call this method.
       */
      disconnect(obj: {}): Binding;
    }
    /**
     * A computed property transforms an object's function into a property.
     */
    export class ComputedProperty extends Descriptor {
      /**
       * DEPRECATED: All computed properties are cacheble by default. Use `volatile()` instead to opt-out to caching.
       * Properties are cacheable by default. Computed property will automatically cache the return value of your function until one of the dependent keys changes.
       */
      cacheable(aFlag: boolean): ComputedProperty;
      /**
       * Call on a computed property to set it into non-cached mode. When in this mode the computed property will not automatically cache the return value.
       */
      volatile(): ComputedProperty;
      /**
       * Call on a computed property to set it into read-only mode. When in this mode the computed property will throw an error when set.
       */
      readOnly(): ComputedProperty;
      /**
       * Sets the dependent keys on this computed property. Pass any number of arguments containing key paths that this computed property depends on.
       */
      property(path: string): ComputedProperty;
      /**
       * In some cases, you may want to annotate computed properties with additional metadata about how they function or what values they operate on. For example, computed property functions may close over variables that are then no longer available for introspection.
       */
      meta(meta: {});
      /**
       * Access the value of the function backing the computed property. If this property has already been cached, return the cached result. Otherwise, call the function passing the property name as an argument.
       */
      get(keyName: string): {};
      /**
       * Set the value of a computed property. If the function that backs your computed property does not accept arguments then the default action for setting would be to define the property on the current object, and set the value of the property to the value being set.
       */
      set(keyName: string, newValue: {}, oldValue: string): {};
    }
    /**
     * This helper returns a new property descriptor that wraps the passed computed property function. You can use this helper to define properties with mixins or via `Ember.defineProperty()`.
     */
    export class computed {
      /**
       * A computed property that returns true if the value of the dependent property is null, an empty string, empty array, or empty function.
       */
      empty(dependentKey: string): ComputedProperty;
      /**
       * A computed property that returns true if the value of the dependent property is NOT null, an empty string, empty array, or empty function.
       */
      notEmpty(dependentKey: string): ComputedProperty;
      /**
       * A computed property that returns true if the value of the dependent property is null or undefined. This avoids errors from JSLint complaining about use of ==, which can be technically confusing.
       */
      none(dependentKey: string): ComputedProperty;
      /**
       * A computed property that returns the inverse boolean value of the original value for the dependent property.
       */
      not(dependentKey: string): ComputedProperty;
      /**
       * A computed property that converts the provided dependent property into a boolean value.
       */
      bool(dependentKey: string): ComputedProperty;
      /**
       * A computed property which matches the original value for the dependent property against a given RegExp, returning `true` if they values matches the RegExp and `false` if it does not.
       */
      match(dependentKey: string, regexp: RegExp): ComputedProperty;
      /**
       * A computed property that returns true if the provided dependent property is equal to the given value.
       */
      equal(dependentKey: string, value: string|number|{}): ComputedProperty;
      /**
       * A computed property that returns true if the provided dependent property is greater than the provided value.
       */
      gt(dependentKey: string, value: number): ComputedProperty;
      /**
       * A computed property that returns true if the provided dependent property is greater than or equal to the provided value.
       */
      gte(dependentKey: string, value: number): ComputedProperty;
      /**
       * A computed property that returns true if the provided dependent property is less than the provided value.
       */
      lt(dependentKey: string, value: number): ComputedProperty;
      /**
       * A computed property that returns true if the provided dependent property is less than or equal to the provided value.
       */
      lte(dependentKey: string, value: number): ComputedProperty;
      /**
       * A computed property that performs a logical `and` on the original values for the provided dependent properties.
       */
      and(dependentKey: string): ComputedProperty;
      /**
       * A computed property which performs a logical `or` on the original values for the provided dependent properties.
       */
      or(dependentKey: string): ComputedProperty;
      /**
       * DEPRECATED: Use `Ember.computed.or` instead.
       * A computed property that returns the first truthy value from a list of dependent properties.
       */
      any(dependentKey: string): ComputedProperty;
      /**
       * A computed property that returns the array of values for the provided dependent properties.
       */
      collect(dependentKey: string): ComputedProperty;
      /**
       * Creates a new property that is an alias for another property on an object. Calls to `get` or `set` this property behave as though they were called on the original property.
       */
      alias(dependentKey: string): ComputedProperty;
      /**
       * Where `computed.alias` aliases `get` and `set`, and allows for bidirectional data flow, `computed.oneWay` only provides an aliased `get`. The `set` will not mutate the upstream property, rather causes the current property to become the value set. This causes the downstream property to permanently diverge from the upstream property.
       */
      oneWay(dependentKey: string): ComputedProperty;
      /**
       * This is a more semantically meaningful alias of `computed.oneWay`, whose name is somewhat ambiguous as to which direction the data flows.
       */
      reads(dependentKey: string): ComputedProperty;
      /**
       * Where `computed.oneWay` provides oneWay bindings, `computed.readOnly` provides a readOnly one way binding. Very often when using `computed.oneWay` one does not also want changes to propagate back up, as they will replace the value.
       */
      readOnly(dependentKey: string): ComputedProperty;
      /**
       * DEPRECATED: Use `Ember.computed.oneWay` or custom CP with default instead.
       * A computed property that acts like a standard getter and setter, but returns the value at the provided `defaultPath` if the property itself has not been set to a value
       */
      defaultTo(defaultPath: string): ComputedProperty;
      /**
       * Creates a new property that is an alias for another property on an object. Calls to `get` or `set` this property behave as though they were called on the original property, but also print a deprecation warning.
       */
      deprecatingAlias(dependentKey: string): ComputedProperty;
      /**
       * A computed property that returns the sum of the value in the dependent array.
       */
      sum(dependentKey: string): ComputedProperty;
      /**
       * A computed property that calculates the maximum value in the dependent array. This will return `-Infinity` when the dependent array is empty.
       */
      max(dependentKey: string): ComputedProperty;
      /**
       * A computed property that calculates the minimum value in the dependent array. This will return `Infinity` when the dependent array is empty.
       */
      min(dependentKey: string): ComputedProperty;
      /**
       * Returns an array mapped via the callback
       */
      map(dependentKey: string, callback: Function): ComputedProperty;
      /**
       * Returns an array mapped to the specified key.
       */
      mapBy(dependentKey: string, propertyKey: string): ComputedProperty;
      /**
       * DEPRECATED: Use `Ember.computed.mapBy` instead
       */
      mapProperty(dependentKey: any, propertyKey: any);
      /**
       * Filters the array by the callback.
       */
      filter(dependentKey: string, callback: Function): ComputedProperty;
      /**
       * Filters the array by the property and value
       */
      filterBy(dependentKey: string, propertyKey: string, value: any): ComputedProperty;
      /**
       * DEPRECATED: Use `Ember.computed.filterBy` instead
       */
      filterProperty(dependentKey: any, propertyKey: any, value: any);
      /**
       * A computed property which returns a new array with all the unique elements from one or more dependent arrays.
       */
      uniq(propertyKey: string): ComputedProperty;
      /**
       * Alias for [Ember.computed.uniq](/api/#method_computed_uniq).
       */
      union(propertyKey: string): ComputedProperty;
      /**
       * A computed property which returns a new array with all the duplicated elements from two or more dependent arrays.
       */
      intersect(propertyKey: string): ComputedProperty;
      /**
       * A computed property which returns a new array with all the properties from the first dependent array that are not in the second dependent array.
       */
      setDiff(setAProperty: string, setBProperty: string): ComputedProperty;
      /**
       * A computed property which returns a new array with all the properties from the first dependent array sorted based on a property or sort function.
       */
      sort(dependentKey: string, sortDefinition: string): ComputedProperty;
    }
    /**
     * Hash of enabled Canary features. Add to this before creating your application.
     */
    export class FEATURES {
      /**
       * Test that a feature is enabled. Parsed by Ember's build tools to leave experimental features out of beta/stable builds.
       */
      isEnabled(feature: string): boolean;
    }
    /**
     * Defines some convenience methods for working with Enumerables. `Ember.EnumerableUtils` uses `Ember.ArrayPolyfills` when necessary.
     */
    export class EnumerableUtils {
      /**
       * Calls the map function on the passed object with a specified callback. This uses `Ember.ArrayPolyfill`'s-map method when necessary.
       */
      map(obj: {}, callback: Function, thisArg: {}): Ember.Array;
      /**
       * Calls the forEach function on the passed object with a specified callback. This uses `Ember.ArrayPolyfill`'s-forEach method when necessary.
       */
      forEach(obj: {}, callback: Function, thisArg: {});
      /**
       * Calls the filter function on the passed object with a specified callback. This uses `Ember.ArrayPolyfill`'s-filter method when necessary.
       */
      filter(obj: {}, callback: Function, thisArg: {}): Ember.Array;
      /**
       * Calls the indexOf function on the passed object with a specified callback. This uses `Ember.ArrayPolyfill`'s-indexOf method when necessary.
       */
      indexOf(obj: {}, callback: Function, index: {});
      /**
       * Returns an array of indexes of the first occurrences of the passed elements on the passed object.
       */
      indexesOf(obj: {}, elements: Ember.Array): Ember.Array;
      /**
       * Adds an object to an array. If the array already includes the object this method has no effect.
       */
      addObject(array: Ember.Array, item: {}): void;
      /**
       * Removes an object from an array. If the array does not contain the passed object this method has no effect.
       */
      removeObject(array: Ember.Array, item: {}): void;
      /**
       * Replaces objects in an array with the passed objects.
       */
      replace(array: Ember.Array, idx: number, amt: number, objects: Ember.Array): Ember.Array;
      /**
       * Calculates the intersection of two arrays. This method returns a new array filled with the records that the two passed arrays share with each other. If there is no intersection, an empty array will be returned.
       */
      intersection(array1: Ember.Array, array2: Ember.Array): Ember.Array;
    }
    /**
     * A subclass of the JavaScript Error object for use in Ember.
     */
    export class Error {
    }
    /**
     * Read-only property that returns the result of a container lookup.
     */
    export class InjectedProperty extends Descriptor {
    }
    /**
     * The purpose of the Ember Instrumentation module is to provide efficient, general-purpose instrumentation for Ember.
     */
    export class Instrumentation {
      /**
       * Notifies event's subscribers, calls `before` and `after` hooks.
       */
      instrument(name: string, payload: {}, callback: Function, binding: {});
      /**
       * Subscribes to a particular event or instrumented block of code.
       */
      subscribe(pattern: string, object: {}): Subscriber;
      /**
       * Unsubscribes from a particular event or instrumented block of code.
       */
      unsubscribe(subscriber: {});
      /**
       * Resets `Ember.Instrumentation` by flushing list of subscribers.
       */
      reset();
    }
    /**
     * Inside Ember-Metal, simply uses the methods from `imports.console`. Override this to provide more robust logging functionality.
     */
    export class Logger {
      /**
       * Logs the arguments to the console. You can pass as many arguments as you want and they will be joined together with a space.
       */
      log(args: any);
      /**
       * Prints the arguments to the console with a warning icon. You can pass as many arguments as you want and they will be joined together with a space.
       */
      warn(args: any);
      /**
       * Prints the arguments to the console with an error icon, red text and a stack trace. You can pass as many arguments as you want and they will be joined together with a space.
       */
      error(args: any);
      /**
       * Logs the arguments to the console. You can pass as many arguments as you want and they will be joined together with a space.
       */
      info(args: any);
      /**
       * Logs the arguments to the console in blue text. You can pass as many arguments as you want and they will be joined together with a space.
       */
      debug(args: any);
      /**
       * If the value passed into `Ember.Logger.assert` is not truthy it will throw an error with a stack trace.
       */
      assert(bool: boolean);
    }
    /**
     * This class is used internally by Ember and Ember Data. Please do not use it at this time. We plan to clean it up and add many tests soon.
     */
    export class OrderedSet {
      static create(): OrderedSet;
      clear();
      add(obj: any, guid: any): OrderedSet;
      /**
       * DEPRECATED: 
       */
      remove(obj: any, _guid: any): boolean;
      delete(obj: any, _guid: any): boolean;
      isEmpty(): boolean;
      has(obj: any): boolean;
      forEach(fn: Function, self: any);
      toArray(): Ember.Array;
      copy(): OrderedSet;
    }
    /**
     * A Map stores values indexed by keys. Unlike JavaScript's default Objects, the keys of a Map can be any JavaScript object.
     */
    export class Map {
      static create();
      /**
       * This property will change as the number of objects in the map changes.
       */
      size: number;
      /**
       * Retrieve the value associated with a given key.
       */
      get(key: any): any;
      /**
       * Adds a value to the map. If a value for the given key has already been provided, the new value will replace the old value.
       */
      set(key: any, value: any): Map;
      /**
       * DEPRECATED: see delete
      Removes a value from the map for an associated key.
       */
      remove(key: any): boolean;
      /**
       * Removes a value from the map for an associated key.
       */
      delete(key: any): boolean;
      /**
       * Check whether a key is present.
       */
      has(key: any): boolean;
      /**
       * Iterate over all the keys and values. Calls the function once for each key, passing in value, key, and the map being iterated over, in that order.
       */
      forEach(callback: Function, self: any);
      clear();
      copy(): Map;
    }
    export class MapWithDefault extends Map {
      static create(options: any): MapWithDefault|Map;
      /**
       * Retrieve the value associated with a given key.
       */
      get(key: any): any;
      copy(): MapWithDefault;
    }
    /**
     * The `Ember.Mixin` class allows you to create mixins, whose properties can be added to other classes. For instance,
     */
    export class Mixin {
      static create(args: any);
      reopen(args: any);
      apply(obj: any): void;
      detect(obj: any): boolean;
    }
    /**
     * Objects of this type can implement an interface to respond to requests to get and set. The default implementation handles simple properties.
     */
    export class Descriptor {
    }
    /**
     * Runs the passed target and method inside of a RunLoop, ensuring any deferred actions including bindings and views updates are flushed at the end.
     */
    export class run {
      /**
       * If no run-loop is present, it creates a new one. If a run loop is present it will queue itself to run on the existing run-loops action queue.
       */
      join(target: {}, method: Function|string, ...args: any[]): {};
      /**
       * Allows you to specify which context to call the specified function in while adding the execution of that function to the Ember run loop. This ability makes this method a great way to asynchronously integrate third-party libraries into your Ember application.
       */
      bind(target: {}, method: Function|string, ...args: any[]): Function;
      /**
       * Begins a new RunLoop. Any deferred actions invoked after the begin will be buffered until you invoke a matching call to `run.end()`. This is a lower-level way to use a RunLoop instead of using `run()`.
       */
      begin(): void;
      /**
       * Ends a RunLoop. This must be called sometime after you call `run.begin()` to flush any deferred actions. This is a lower-level way to use a RunLoop instead of using `run()`.
       */
      end(): void;
      /**
       * Array of named queues. This array determines the order in which queues are flushed at the end of the RunLoop. You can define your own queues by simply adding the queue name to this array. Normally you should not need to inspect or modify this property.
       */
      queues: Ember.Array;
      /**
       * Adds the passed target/method and any optional arguments to the named queue to be executed at the end of the RunLoop. If you have not already started a RunLoop when calling this method one will be started for you automatically.
       */
      schedule(queue: string, target: {}, method: string|Function, ...args: any[]): void;
      /**
       * Immediately flushes any events scheduled in the 'sync' queue. Bindings use this queue so this method is a useful way to immediately force all bindings in the application to sync.
       */
      sync(): void;
      /**
       * Invokes the passed target/method and optional arguments after a specified period of time. The last parameter of this method must always be a number of milliseconds.
       */
      later(target: {}, method: Function|string, ...args: any[]): any;
      later(target: {}, method: Function|string, wait: number): any;
      /**
       * Schedule a function to run one time during the current RunLoop. This is equivalent to calling `scheduleOnce` with the "actions" queue.
       */
      once(target: {}, method: Function|string, ...args: any[]): {};
      /**
       * Schedules a function to run one time in a given queue of the current RunLoop. Calling this method with the same queue/target/method combination will have no effect (past the initial call).
       */
      scheduleOnce(queue: string, target: {}, method: Function|string, ...args: any[]): {};
      /**
       * Schedules an item to run from within a separate run loop, after control has been returned to the system. This is equivalent to calling `run.later` with a wait time of 1ms.
       */
      next(target: {}, method: Function|string, ...args: any[]): {};
      /**
       * Cancels a scheduled item. Must be a value returned by `run.later()`, `run.once()`, `run.next()`, `run.debounce()`, or `run.throttle()`.
       */
      cancel(timer: {}): boolean;
      /**
       * Delay calling the target method until the debounce period has elapsed with no additional debounce calls. If `debounce` is called again before the specified time has elapsed, the timer is reset and the entire period must pass again before the target method is called.
       */
      debounce(target: {}, method: Function|string, ...args: any[]): Ember.Array;
      debounce(target: {}, method: Function|string, wait: number, immediate: boolean): Ember.Array;
      /**
       * Ensure that the target method is never called more frequently than the specified spacing period. The target method is called immediately.
       */
      throttle(target: {}, method: Function|string, ...args: any[]): Ember.Array;
      throttle(target: {}, method: Function|string, spacing: number, immediate: boolean): Ember.Array;
    }
    /**
     * Ember.Location returns an instance of the correct implementation of the `location` API.
     */
    export class Location {
      /**
       * DEPRECATED: Use the container to lookup the location implementation that you
       need.
       * This is deprecated in favor of using the container to lookup the location implementation as desired.
       */
      create(options: {}): {};
      /**
       * DEPRECATED: Register your custom location implementation with the
      container directly.
       * This is deprecated in favor of using the container to register the location implementation as desired.
       */
      registerImplementation(name: string, implementation: {});
    }
    /**
     * Ember.AutoLocation will select the best location option based off browser support with the priority order: history, hash, none.
     */
    export class AutoLocation {
      /**
       * Selects the best location option based off browser support and returns an instance of that Location class.
       */
      create();
    }
    /**
     * `Ember.HashLocation` implements the location API using the browser's hash. At present, it relies on a `hashchange` event existing in the browser.
     */
    export class HashLocation extends Object {
    }
    /**
     * Ember.HistoryLocation implements the location API using the browser's history.pushState API.
     */
    export class HistoryLocation extends Object {
      /**
       * Will be pre-pended to path upon state change
       */
      rootURL: any;
    }
    /**
     * Ember.NoneLocation does not interact with the browser. It is useful for testing, or when you need to manage state with your Router, but temporarily don't want it to muck with the URL (for example when you embed your application in a larger page).
     */
    export class NoneLocation extends Object {
    }
    /**
     * The `Ember.Route` class is used to define individual routes. Refer to the [routing guide](http://emberjs.com/guides/routing/) for documentation.
     */
    export class Route extends Object implements ActionHandler, Evented {
      /**
       * Configuration hash for this route's queryParams. The possible configuration options and their defaults are as follows (assuming a query param whose URL key is `page`):
       */
      queryParams: {};
      /**
       * Retrieves parameters, for current route using the state.params variable and getQueryParamsFor, using the supplied routeName.
       */
      paramsFor(name: string);
      /**
       * Serializes the query parameter key
       */
      serializeQueryParamKey(controllerPropertyName: string);
      /**
       * Serializes value of the query parameter based on defaultValueType
       */
      serializeQueryParam(value: {}, urlKey: string, defaultValueType: string);
      /**
       * Deserializes value of the query parameter based on defaultValueType
       */
      deserializeQueryParam(value: {}, urlKey: string, defaultValueType: string);
      /**
       * A hook you can use to reset controller values either when the model changes or the route is exiting.
       */
      resetController(controller: Controller, isExiting: boolean, transition: {});
      /**
       * The name of the view to use by default when rendering this routes template.
       */
      viewName: string;
      /**
       * The name of the template to use by default when rendering this routes template.
       */
      templateName: string;
      /**
       * The name of the controller to associate with this route.
       */
      controllerName: string;
      /**
       * The controller associated with this route.
       */
      controller: Controller;
      /**
       * DEPRECATED: Please use `actions` instead.
       */
      events();
      /**
       * This hook is executed when the router completely exits this route. It is not executed when the model for the route changes.
       */
      deactivate();
      /**
       * This hook is executed when the router enters the route. It is not executed when the model for the route changes.
       */
      activate();
      /**
       * Transition the application into another route. The route may be either a single route or route path:
       */
      transitionTo(name: string, ...models: any[]): Transition;
      transitionTo(name: string, options: {}): Transition;
      /**
       * Perform a synchronous transition into another route without attempting to resolve promises, update the URL, or abort any currently active asynchronous transitions (i.e. regular transitions caused by `transitionTo` or URL changes).
       */
      intermediateTransitionTo(name: string, ...models: any[]);
      /**
       * Refresh the model on this route and any child routes, firing the `beforeModel`, `model`, and `afterModel` hooks in a similar fashion to how routes are entered when transitioning in from other route. The current route params (e.g. `article_id`) will be passed in to the respective model hooks, and if a different model is returned, `setupController` and associated route hooks will re-fire as well.
       */
      refresh(): Transition;
      /**
       * Transition into another route while replacing the current URL, if possible. This will replace the current history entry instead of adding a new one. Beside that, it is identical to `transitionTo` in all other respects. See 'transitionTo' for additional information regarding multiple models.
       */
      replaceWith(name: string, ...models: any[]): Transition;
      /**
       * Sends an action to the router, which will delegate it to the currently active route hierarchy per the bubbling rules explained under `actions`.
       */
      send(name: string, ...args: any[]);
      /**
       * This hook is the first of the route entry validation hooks called when an attempt is made to transition into a route or one of its children. It is called before `model` and `afterModel`, and is appropriate for cases when:
       */
      beforeModel(transition: Transition): Promise<any>;
      /**
       * This hook is called after this route's model has resolved. It follows identical async/promise semantics to `beforeModel` but is provided the route's resolved model in addition to the `transition`, and is therefore suited to performing logic that can only take place after the model has already resolved.
       */
      afterModel(resolvedModel: {}, transition: Transition): Promise<any>;
      /**
       * A hook you can implement to optionally redirect to another route.
       */
      redirect(model: {}, transition: Transition);
      /**
       * A hook you can implement to convert the URL into the model for this route.
       */
      model(params: {}, transition: Transition): {}|Promise<any>;
      findModel(type: string, value: {});
      /**
       * Store property provides a hook for data persistence libraries to inject themselves.
       */
      store(store: {});
      /**
       * A hook you can implement to convert the route's model into parameters for the URL.
       */
      serialize(model: {}, params: Ember.Array): {};
      /**
       * A hook you can use to setup the controller for the current route.
       */
      setupController(controller: Controller, model: {});
      /**
       * Returns the controller for a particular route or name.
       */
      controllerFor(name: string): Controller;
      /**
       * Generates a controller for a route.
       */
      generateController(name: string, model: {});
      /**
       * Returns the model of a parent (or any ancestor) route in a route hierarchy.  During a transition, all routes must resolve a model object, and if a route needs access to a parent route's model in order to resolve a model (or just reuse the model from a parent), it can call `this.modelFor(theNameOfParentRoute)` to retrieve it.
       */
      modelFor(name: string): {};
      /**
       * A hook you can use to render the template for the current route.
       */
      renderTemplate(controller: {}, model: {});
      /**
       * `render` is used to render a template into a region of another template (indicated by an `{{outlet}}`). `render` is used both during the entry phase of routing (via the `renderTemplate` hook) and later in response to user interaction.
       */
      render(name: string, options: {});
      /**
       * Disconnects a view that has been rendered into an outlet.
       */
      disconnectOutlet(options: {}|string);
      /**
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * Subscribes to a named event with given function.
       */
      on(name: string, target: {}, method: Function): void;
      /**
       * Subscribes a function to a named event and then cancels the subscription after the first time the event is triggered. It is good to use ``one`` when you only care about the first time an event has taken place.
       */
      one(name: string, target: {}, method: Function): void;
      /**
       * Triggers a named event for the object. Any additional arguments will be passed as parameters to the functions that are subscribed to the event.
       */
      trigger(name: string, ...args: any[]);
      /**
       * Cancels subscription for given name, target, and method.
       */
      off(name: string, target: {}, method: Function): void;
      /**
       * Checks to see if object has any subscriptions for named event.
       */
      has(name: string): boolean;
    }
    /**
     * The `Ember.Router` class manages the application state and URLs. Refer to the [routing guide](http://emberjs.com/guides/routing/) for documentation.
     */
    export class Router extends Object implements Evented {
      /**
       * The `location` property determines the type of URL's that your application will use.
       */
      location: any;
      /**
       * Represents the URL of the root of the application, often '/'. This prefix is assumed on all routes defined on this router.
       */
      rootURL: any;
      /**
       * Represents the current URL.
       */
      url(): string;
      /**
       * The `Router.map` function allows you to define mappings from URLs to routes and resources in your application. These mappings are defined within the supplied callback function using `this.resource` and `this.route`.
       */
      map(callback: any);
      /**
       * Subscribes to a named event with given function.
       */
      on(name: string, target: {}, method: Function): void;
      /**
       * Subscribes a function to a named event and then cancels the subscription after the first time the event is triggered. It is good to use ``one`` when you only care about the first time an event has taken place.
       */
      one(name: string, target: {}, method: Function): void;
      /**
       * Triggers a named event for the object. Any additional arguments will be passed as parameters to the functions that are subscribed to the event.
       */
      trigger(name: string, ...args: any[]);
      /**
       * Cancels subscription for given name, target, and method.
       */
      off(name: string, target: {}, method: Function): void;
      /**
       * Checks to see if object has any subscriptions for named event.
       */
      has(name: string): boolean;
    }
    /**
     * `Ember.LinkView` renders an element whose `click` event triggers a transition of the application's instance of `Ember.Router` to a supplied route by name.
     */
    export class LinkView extends View {
      /**
       * Used to determine when this LinkView is active.
       */
      currentWhen: any;
      /**
       * Sets the `title` attribute of the `LinkView`'s HTML element.
       */
      title: any;
      /**
       * Sets the `rel` attribute of the `LinkView`'s HTML element.
       */
      rel: any;
      /**
       * Sets the `tabindex` attribute of the `LinkView`'s HTML element.
       */
      tabindex: any;
      /**
       * Sets the `target` attribute of the `LinkView`'s HTML element.
       */
      target: any;
      /**
       * The CSS class to apply to `LinkView`'s element when its `active` property is `true`.
       */
      activeClass: string;
      /**
       * The CSS class to apply to `LinkView`'s element when its `loading` property is `true`.
       */
      loadingClass: string;
      /**
       * The CSS class to apply to a `LinkView`'s element when its `disabled` property is `true`.
       */
      disabledClass: string;
      /**
       * Determines whether the `LinkView` will trigger routing via the `replaceWith` routing strategy.
       */
      replace: boolean;
      /**
       * By default the `{{link-to}}` helper will bind to the `href` and `title` attributes. It's discouraged that you override these defaults, however you can push onto the array if needed.
       */
      attributeBindings: Ember.Array;
      /**
       * By default the `{{link-to}}` helper will bind to the `active`, `loading`, and `disabled` classes. It is discouraged to override these directly.
       */
      classNameBindings: Ember.Array;
      /**
       * By default the `{{link-to}}` helper responds to the `click` event. You can override this globally by setting this property to your custom event name.
       */
      eventName: string;
      /**
       * An overridable method called when LinkView objects are instantiated.
       */
      init();
      /**
       * Accessed as a classname binding to apply the `LinkView`'s `disabledClass` CSS `class` to the element when the link is disabled. When `true` interactions with the element will not trigger route changes.
       */
      disabled: any;
      /**
       * Accessed as a classname binding to apply the `LinkView`'s `activeClass` CSS `class` to the element when the link is active.
       */
      active: any;
      /**
       * Accessed as a classname binding to apply the `LinkView`'s `loadingClass` CSS `class` to the element when the link is loading.
       */
      loading: any;
      /**
       * Sets the element's `href` attribute to the url for the `LinkView`'s targeted route.
       */
      href: any;
      /**
       * The default href value to use while a link-to is loading. Only applies when tagName is 'a'
       */
      loadingHref: string;
    }
    /**
     * A computed property whose dependent keys are arrays and which is updated with "one at a time" semantics.
     */
    export class ReduceComputedProperty extends ComputedProperty {
    }
    /**
     * `Ember.ArrayController` provides a way for you to publish a collection of objects so that you can easily bind to the collection from a Handlebars `#each` helper, an `Ember.CollectionView`, or other controllers.
     */
    export class ArrayController extends ArrayProxy implements SortableMixin, ControllerMixin {
      /**
       * A string containing the controller name used to wrap items.
       */
      itemController: string;
      /**
       * Return the name of the controller to wrap items, or `null` if items should be returned directly.  The default implementation simply returns the `itemController` property, but subclasses can override this method to return different controllers for different objects.
       */
      lookupItemController(object: {}): string;
      /**
       * Specifies which properties dictate the `arrangedContent`'s sort order.
       */
      sortProperties: Ember.Array;
      /**
       * Specifies the `arrangedContent`'s sort direction. Sorts the content in ascending order by default. Set to `false` to use descending order.
       */
      sortAscending: boolean;
      /**
       * The function used to compare two values. You can override this if you want to do custom comparisons. Functions must be of the type expected by Array#sort, i.e.,
       */
      sortFunction: Function;
      /**
       * Overrides the default `arrangedContent` from `ArrayProxy` in order to sort by `sortFunction`. Also sets up observers for each `sortProperty` on each item in the content Array.
       */
      arrangedContent: any;
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      addObject(object: {}): {};
      /**
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      removeObject(object: {}): {};
      /**
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * This property will trigger anytime the enumerable's content changes. You can observe this property to be notified of changes to the enumerable's content.
       */
      '[]': Ember.Array;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
      /**
       * An array of other controller objects available inside instances of this controller via the `controllers` property:
       */
      needs: Ember.Array;
      /**
       * DEPRECATED: Use `needs` instead
       */
      controllerFor();
      /**
       * Stores the instances of other controllers available from within this controller. Any controller listed by name in the `needs` property will be accessible by name through this property.
       */
      controllers: {};
      /**
       * Defines which query parameters the controller accepts. If you give the names ['category','page'] it will bind the values of these query parameters to the variables `this.category` and `this.page`
       */
      queryParams: any;
      /**
       * Transition the application into another route. The route may be either a single route or route path:
       */
      transitionToRoute(name: string, ...models: any[]);
      transitionToRoute(name: string, options: {});
      /**
       * DEPRECATED: 
       */
      transitionTo();
      /**
       * Transition into another route while replacing the current URL, if possible. This will replace the current history entry instead of adding a new one. Beside that, it is identical to `transitionToRoute` in all other respects.
       */
      replaceRoute(name: string, ...models: any[]);
      /**
       * DEPRECATED: 
       */
      replaceWith();
      /**
       * The object to which actions from the view should be sent.
       */
      target: any;
      /**
       * The controller's current model. When retrieving or modifying a controller's model, this property should be used instead of the `content` property.
       */
      model: any;
      /**
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * Triggers a named action on the `ActionHandler`. Any parameters supplied after the `actionName` string will be passed as arguments to the action target function.
       */
      send(actionName: string, context: any);
    }
    export class Controller extends Object implements ControllerMixin {
      /**
       * An array of other controller objects available inside instances of this controller via the `controllers` property:
       */
      needs: Ember.Array;
      /**
       * DEPRECATED: Use `needs` instead
       */
      controllerFor();
      /**
       * Stores the instances of other controllers available from within this controller. Any controller listed by name in the `needs` property will be accessible by name through this property.
       */
      controllers: {};
      /**
       * Defines which query parameters the controller accepts. If you give the names ['category','page'] it will bind the values of these query parameters to the variables `this.category` and `this.page`
       */
      queryParams: any;
      /**
       * Transition the application into another route. The route may be either a single route or route path:
       */
      transitionToRoute(name: string, ...models: any[]);
      transitionToRoute(name: string, options: {});
      /**
       * DEPRECATED: 
       */
      transitionTo();
      /**
       * Transition into another route while replacing the current URL, if possible. This will replace the current history entry instead of adding a new one. Beside that, it is identical to `transitionToRoute` in all other respects.
       */
      replaceRoute(name: string, ...models: any[]);
      /**
       * DEPRECATED: 
       */
      replaceWith();
      /**
       * The object to which actions from the view should be sent.
       */
      target: any;
      /**
       * The controller's current model. When retrieving or modifying a controller's model, this property should be used instead of the `content` property.
       */
      model: any;
      /**
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * Triggers a named action on the `ActionHandler`. Any parameters supplied after the `actionName` string will be passed as arguments to the action target function.
       */
      send(actionName: string, context: any);
    }
    /**
     * Namespace for injection helper methods.
     */
    export class inject {
      /**
       * Creates a property that lazily looks up another controller in the container. Can only be used when defining another controller.
       */
      controller(name: string): InjectedProperty;
      /**
       * Creates a property that lazily looks up a service in the container. There are no restrictions as to what objects a service can be injected into.
       */
      service(name: string): InjectedProperty;
    }
    /**
     * DEPRECATED: 
     * `Ember.ObjectController` is part of Ember's Controller layer. It is intended to wrap a single object, proxying unhandled attempts to `get` and `set` to the underlying model object, and to forward unhandled action attempts to its `target`.
     */
    export class ObjectController extends ObjectProxy implements ControllerMixin {
      /**
       * DEPRECATED: 
       * An array of other controller objects available inside instances of this controller via the `controllers` property:
       */
      needs: Ember.Array;
      /**
       * DEPRECATED: Use `needs` instead
       */
      controllerFor();
      /**
       * DEPRECATED: 
       * Stores the instances of other controllers available from within this controller. Any controller listed by name in the `needs` property will be accessible by name through this property.
       */
      controllers: {};
      /**
       * DEPRECATED: 
       * Defines which query parameters the controller accepts. If you give the names ['category','page'] it will bind the values of these query parameters to the variables `this.category` and `this.page`
       */
      queryParams: any;
      /**
       * DEPRECATED: 
       * Transition the application into another route. The route may be either a single route or route path:
       */
      transitionToRoute(name: string, ...models: any[]);
      transitionToRoute(name: string, options: {});
      /**
       * DEPRECATED: 
       */
      transitionTo();
      /**
       * DEPRECATED: 
       * Transition into another route while replacing the current URL, if possible. This will replace the current history entry instead of adding a new one. Beside that, it is identical to `transitionToRoute` in all other respects.
       */
      replaceRoute(name: string, ...models: any[]);
      /**
       * DEPRECATED: 
       */
      replaceWith();
      /**
       * DEPRECATED: 
       * The object to which actions from the view should be sent.
       */
      target: any;
      /**
       * DEPRECATED: 
       * The controller's current model. When retrieving or modifying a controller's model, this property should be used instead of the `content` property.
       */
      model: any;
      /**
       * DEPRECATED: 
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * DEPRECATED: 
       * Triggers a named action on the `ActionHandler`. Any parameters supplied after the `actionName` string will be passed as arguments to the action target function.
       */
      send(actionName: string, context: any);
    }
    /**
     * `Ember.ProxyMixin` forwards all properties not defined by the proxy itself to a proxied `content` object.  See Ember.ObjectProxy for more details.
     */
    export class ProxyMixin {
      /**
       * The object whose properties will be forwarded.
       */
      content: {};
    }
    /**
     * The `Ember.ActionHandler` mixin implements support for moving an `actions` property to an `_actions` property at extend time, and adding `_actions` to the object's mergedProperties list.
     */
    export class ActionHandler {
      /**
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * Triggers a named action on the `ActionHandler`. Any parameters supplied after the `actionName` string will be passed as arguments to the action target function.
       */
      send(actionName: string, context: any);
    }
    /**
     * This mixin implements Observer-friendly Array-like behavior. It is not a concrete implementation, but it can be used up by other classes that want to appear like arrays.
     */
    export class Array implements Enumerable {
      /**
       * Your array must support the `length` property. Your replace methods should set this property whenever it changes.
       */
      length: number;
      /**
       * Returns the object at the given `index`. If the given `index` is negative or is greater or equal than the array length, returns `undefined`.
       */
      objectAt(idx: number): any;
      /**
       * This returns the objects at the specified indexes, using `objectAt`.
       */
      objectsAt(indexes: Ember.Array): Ember.Array;
      /**
       * This is the handler for the special array content property. If you get this property, it will return this. If you set this property to a new array, it will replace the current content.
       */
      '[]': any;
      /**
       * Returns a new array that is a slice of the receiver. This implementation uses the observable array methods to retrieve the objects for the new slice.
       */
      slice(beginIndex: Integer, endIndex: Integer): Ember.Array;
      /**
       * Returns the index of the given object's first occurrence. If no `startAt` argument is given, the starting location to search is 0. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      indexOf(object: {}, startAt: number): number;
      /**
       * Returns the index of the given object's last occurrence. If no `startAt` argument is given, the search starts from the last position. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      lastIndexOf(object: {}, startAt: number): number;
      /**
       * Adds an array observer to the receiving array. The array observer object normally must implement two methods:
       */
      addArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Removes an array observer from the object if the observer is current registered. Calling this method multiple times with the same object will have no effect.
       */
      removeArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasArrayObservers: boolean;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just before the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just after the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * Returns a special object that can be used to observe individual properties on the array. Just get an equivalent property on this object and it will return an enumerable that maps automatically to the named key on the member objects.
       */
      '@each': any;
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
    }
    /**
     * Implements some standard methods for comparing objects. Add this mixin to any class you create that can compare its instances.
     */
    export class Comparable {
      /**
       * Override to return the result of the comparison of the two parameters. The compare method should return:
       */
      compare(a: {}, b: {}): Integer;
    }
    /**
     * Implements some standard methods for copying an object. Add this mixin to any object you create that can create a copy of itself. This mixin is added automatically to the built-in array.
     */
    export class Copyable {
      /**
       * Override to return a copy of the receiver. Default implementation raises an exception.
       */
      copy(deep: boolean): {};
      /**
       * If the object implements `Ember.Freezable`, then this will return a new copy if the object is not frozen and the receiver if the object is frozen.
       */
      frozenCopy(): {};
    }
    export class Deferred {
      /**
       * Add handlers to be called when the Deferred object is resolved or rejected.
       */
      then(resolve: Function, reject: Function);
      /**
       * Resolve a Deferred object and call any `doneCallbacks` with the given args.
       */
      resolve();
      /**
       * Reject a Deferred object and call any `failCallbacks` with the given args.
       */
      reject();
    }
    /**
     * This mixin defines the common interface implemented by enumerable objects in Ember. Most of these methods follow the standard Array iteration API defined up to JavaScript 1.8 (excluding language-specific features that cannot be emulated in older versions of JavaScript).
     */
    export class Enumerable {
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * This property will trigger anytime the enumerable's content changes. You can observe this property to be notified of changes to the enumerable's content.
       */
      '[]': Ember.Array;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
    }
    /**
     * This mixin allows for Ember objects to subscribe to and emit events.
     */
    export class Evented {
      /**
       * Subscribes to a named event with given function.
       */
      on(name: string, target: {}, method: Function): void;
      /**
       * Subscribes a function to a named event and then cancels the subscription after the first time the event is triggered. It is good to use ``one`` when you only care about the first time an event has taken place.
       */
      one(name: string, target: {}, method: Function): void;
      /**
       * Triggers a named event for the object. Any additional arguments will be passed as parameters to the functions that are subscribed to the event.
       */
      trigger(name: string, ...args: any[]);
      /**
       * Cancels subscription for given name, target, and method.
       */
      off(name: string, target: {}, method: Function): void;
      /**
       * Checks to see if object has any subscriptions for named event.
       */
      has(name: string): boolean;
    }
    /**
     * The `Ember.Freezable` mixin implements some basic methods for marking an object as frozen. Once an object is frozen it should be read only. No changes may be made the internal state of the object.
     */
    export class Freezable {
      /**
       * Set to `true` when the object is frozen. Use this property to detect whether your object is frozen or not.
       */
      isFrozen: boolean;
      /**
       * Freezes the object. Once this method has been called the object should no longer allow any properties to be edited.
       */
      freeze(): {};
    }
    /**
     * This mixin defines the API for modifying array-like objects. These methods can be applied only to a collection that keeps its items in an ordered set. It builds upon the Array mixin and adds methods to modify the array. Concrete implementations of this class include ArrayProxy and ArrayController.
     */
    export class MutableArray implements Ember.Array, MutableEnumerable {
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      replace(idx: number, amt: number, objects: Ember.Array);
      /**
       * Remove all elements from the array. This is useful if you want to reuse an existing array without having to recreate it.
       */
      clear(): Ember.Array;
      /**
       * This will use the primitive `replace()` method to insert an object at the specified index.
       */
      insertAt(idx: number, object: {}): Ember.Array;
      /**
       * Remove an object at the specified index using the `replace()` primitive method. You can pass either a single index, or a start and a length.
       */
      removeAt(start: number, len: number): Ember.Array;
      /**
       * Push the object onto the end of the array. Works just like `push()` but it is KVO-compliant.
       */
      pushObject(obj: any): void;
      /**
       * Add the objects in the passed numerable to the end of the array. Defers notifying observers of the change until all objects are added.
       */
      pushObjects(objects: Enumerable): Ember.Array;
      /**
       * Pop object from array or nil if none are left. Works just like `pop()` but it is KVO-compliant.
       */
      popObject(): void;
      /**
       * Shift an object from start of array or nil if none are left. Works just like `shift()` but it is KVO-compliant.
       */
      shiftObject(): void;
      /**
       * Unshift an object to start of array. Works just like `unshift()` but it is KVO-compliant.
       */
      unshiftObject(obj: any): void;
      /**
       * Adds the named objects to the beginning of the array. Defers notifying observers until all objects have been added.
       */
      unshiftObjects(objects: Enumerable): Ember.Array;
      /**
       * Reverse objects in the array. Works just like `reverse()` but it is KVO-compliant.
       */
      reverseObjects(): Ember.Array;
      /**
       * Replace all the receiver's content with content of the argument. If argument is an empty array receiver will be cleared.
       */
      setObjects(objects: Ember.Array): Ember.Array;
      /**
       * Remove all occurrences of an object in the array.
       */
      removeObject(obj: any): Ember.Array;
      /**
       * Push the object onto the end of the array if it is not already present in the array.
       */
      addObject(obj: any): Ember.Array;
      /**
       * Your array must support the `length` property. Your replace methods should set this property whenever it changes.
       */
      length: number;
      /**
       * Returns the object at the given `index`. If the given `index` is negative or is greater or equal than the array length, returns `undefined`.
       */
      objectAt(idx: number): any;
      /**
       * This returns the objects at the specified indexes, using `objectAt`.
       */
      objectsAt(indexes: Ember.Array): Ember.Array;
      /**
       * This is the handler for the special array content property. If you get this property, it will return this. If you set this property to a new array, it will replace the current content.
       */
      '[]': any;
      /**
       * Returns a new array that is a slice of the receiver. This implementation uses the observable array methods to retrieve the objects for the new slice.
       */
      slice(beginIndex: Integer, endIndex: Integer): Ember.Array;
      /**
       * Returns the index of the given object's first occurrence. If no `startAt` argument is given, the starting location to search is 0. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      indexOf(object: {}, startAt: number): number;
      /**
       * Returns the index of the given object's last occurrence. If no `startAt` argument is given, the search starts from the last position. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      lastIndexOf(object: {}, startAt: number): number;
      /**
       * Adds an array observer to the receiving array. The array observer object normally must implement two methods:
       */
      addArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Removes an array observer from the object if the observer is current registered. Calling this method multiple times with the same object will have no effect.
       */
      removeArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasArrayObservers: boolean;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just before the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just after the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * Returns a special object that can be used to observe individual properties on the array. Just get an equivalent property on this object and it will return an enumerable that maps automatically to the named key on the member objects.
       */
      '@each': any;
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
      /**
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
    }
    /**
     * This mixin defines the API for modifying generic enumerables. These methods can be applied to an object regardless of whether it is ordered or unordered.
     */
    export class MutableEnumerable implements Enumerable {
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      addObject(object: {}): {};
      /**
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      removeObject(object: {}): {};
      /**
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * This property will trigger anytime the enumerable's content changes. You can observe this property to be notified of changes to the enumerable's content.
       */
      '[]': Ember.Array;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
    }
    /**
     * ## Overview
     */
    export class Observable {
      /**
       * Retrieves the value of a property from the object.
       */
      get(keyName: string): {};
      /**
       * To get the values of multiple properties at once, call `getProperties` with a list of strings or an array:
       */
      getProperties(...list: string[]): {};
      /**
       * Sets the provided key or path to the value.
       */
      set(keyName: string, value: {}): Observable;
      /**
       * Sets a list of properties at once. These properties are set inside a single `beginPropertyChanges` and `endPropertyChanges` batch, so observers will be buffered.
       */
      setProperties(hash: {}): Observable;
      /**
       * Begins a grouping of property changes.
       */
      beginPropertyChanges(): Observable;
      /**
       * Ends a grouping of property changes.
       */
      endPropertyChanges(): Observable;
      /**
       * Notify the observer system that a property is about to change.
       */
      propertyWillChange(keyName: string): Observable;
      /**
       * Notify the observer system that a property has just changed.
       */
      propertyDidChange(keyName: string): Observable;
      /**
       * Convenience method to call `propertyWillChange` and `propertyDidChange` in succession.
       */
      notifyPropertyChange(keyName: string): Observable;
      /**
       * Adds an observer on a property.
       */
      addObserver(key: string, target: {}, method: string|Function);
      /**
       * Remove an observer you have previously registered on this object. Pass the same key, target, and method you passed to `addObserver()` and your target will no longer receive notifications.
       */
      removeObserver(key: string, target: {}, method: string|Function);
      /**
       * Returns `true` if the object currently has observers registered for a particular key. You can use this method to potentially defer performing an expensive action until someone begins observing a particular property on the object.
       */
      hasObserverFor(key: string): boolean;
      /**
       * Retrieves the value of a property, or a default value in the case that the property returns `undefined`.
       */
      getWithDefault(keyName: string, defaultValue: {}): {};
      /**
       * Set the value of a property to the current value plus some amount.
       */
      incrementProperty(keyName: string, increment: number): number;
      /**
       * Set the value of a property to the current value minus some amount.
       */
      decrementProperty(keyName: string, decrement: number): number;
      /**
       * Set the value of a boolean property to the opposite of its current value.
       */
      toggleProperty(keyName: string): {};
      /**
       * Returns the cached value of a computed property, if it exists. This allows you to inspect the value of a computed property without accidentally invoking it if it is intended to be generated lazily.
       */
      cacheFor(keyName: string): {};
    }
    /**
     * A low level mixin making ObjectProxy, ObjectController or ArrayController's promise aware.
     */
    export class PromiseProxyMixin {
      /**
       * If the proxied promise is rejected this will contain the reason provided.
       */
      reason: any;
      /**
       * Once the proxied promise has settled this will become `false`.
       */
      isPending: any;
      /**
       * Once the proxied promise has settled this will become `true`.
       */
      isSettled: any;
      /**
       * Will become `true` if the proxied promise is rejected.
       */
      isRejected: any;
      /**
       * Will become `true` if the proxied promise is fulfilled.
       */
      isFulfilled: any;
      /**
       * The promise whose fulfillment value is being proxied by this object.
       */
      promise: any;
      /**
       * An alias to the proxied promise's `then`.
       */
      then(callback: Function): RSVP.Promise<any>;
      /**
       * An alias to the proxied promise's `catch`.
       */
      catch(callback: Function): RSVP.Promise<any>;
      /**
       * An alias to the proxied promise's `finally`.
       */
      finally(callback: Function): RSVP.Promise<any>;
    }
    /**
     * `Ember.SortableMixin` provides a standard interface for array proxies to specify a sort order and maintain this sorting when objects are added, removed, or updated without changing the implicit order of their underlying model array:
     */
    export class SortableMixin implements MutableEnumerable {
      /**
       * Specifies which properties dictate the `arrangedContent`'s sort order.
       */
      sortProperties: Ember.Array;
      /**
       * Specifies the `arrangedContent`'s sort direction. Sorts the content in ascending order by default. Set to `false` to use descending order.
       */
      sortAscending: boolean;
      /**
       * The function used to compare two values. You can override this if you want to do custom comparisons. Functions must be of the type expected by Array#sort, i.e.,
       */
      sortFunction: Function;
      /**
       * Overrides the default `arrangedContent` from `ArrayProxy` in order to sort by `sortFunction`. Also sets up observers for each `sortProperty` on each item in the content Array.
       */
      arrangedContent: any;
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      addObject(object: {}): {};
      /**
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      removeObject(object: {}): {};
      /**
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * This property will trigger anytime the enumerable's content changes. You can observe this property to be notified of changes to the enumerable's content.
       */
      '[]': Ember.Array;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
    }
    /**
     * `Ember.TargetActionSupport` is a mixin that can be included in a class to add a `triggerAction` method with semantics similar to the Handlebars `{{action}}` helper. In normal Ember usage, the `{{action}}` helper is usually the best choice. This mixin is most often useful when you are doing more complex event handling in View objects.
     */
    export class TargetActionSupport extends Mixin {
      /**
       * Send an `action` with an `actionContext` to a `target`. The action, actionContext and target will be retrieved from properties of the object. For example:
       */
      triggerAction(opts: {}): boolean;
    }
    /**
     * An ArrayProxy wraps any other object that implements `Ember.Array` and/or `Ember.MutableArray,` forwarding all requests. This makes it very useful for a number of binding use cases or other cases where being able to swap out the underlying array is useful.
     */
    export class ArrayProxy extends Object implements MutableArray {
      /**
       * The content array. Must be an object that implements `Ember.Array` and/or `Ember.MutableArray.`
       */
      content: Ember.Array;
      /**
       * The array that the proxy pretends to be. In the default `ArrayProxy` implementation, this and `content` are the same. Subclasses of `ArrayProxy` can override this property to provide things like sorting and filtering.
       */
      arrangedContent: any;
      /**
       * Should actually retrieve the object at the specified index from the content. You can override this method in subclasses to transform the content item to something new.
       */
      objectAtContent(idx: number): {};
      /**
       * Should actually replace the specified objects on the content array. You can override this method in subclasses to transform the content item into something new.
       */
      replaceContent(idx: number, amt: number, objects: Ember.Array): void;
      /**
       * Override to implement content array `willChange` observer.
       */
      contentArrayWillChange(contentArray: Ember.Array, start: number, removeCount: number, addCount: number);
      /**
       * Override to implement content array `didChange` observer.
       */
      contentArrayDidChange(contentArray: Ember.Array, start: number, removeCount: number, addCount: number);
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      replace(idx: number, amt: number, objects: Ember.Array);
      /**
       * Remove all elements from the array. This is useful if you want to reuse an existing array without having to recreate it.
       */
      clear(): Ember.Array;
      /**
       * This will use the primitive `replace()` method to insert an object at the specified index.
       */
      insertAt(idx: number, object: {}): Ember.Array;
      /**
       * Remove an object at the specified index using the `replace()` primitive method. You can pass either a single index, or a start and a length.
       */
      removeAt(start: number, len: number): Ember.Array;
      /**
       * Push the object onto the end of the array. Works just like `push()` but it is KVO-compliant.
       */
      pushObject(obj: any): void;
      /**
       * Add the objects in the passed numerable to the end of the array. Defers notifying observers of the change until all objects are added.
       */
      pushObjects(objects: Enumerable): Ember.Array;
      /**
       * Pop object from array or nil if none are left. Works just like `pop()` but it is KVO-compliant.
       */
      popObject(): void;
      /**
       * Shift an object from start of array or nil if none are left. Works just like `shift()` but it is KVO-compliant.
       */
      shiftObject(): void;
      /**
       * Unshift an object to start of array. Works just like `unshift()` but it is KVO-compliant.
       */
      unshiftObject(obj: any): void;
      /**
       * Adds the named objects to the beginning of the array. Defers notifying observers until all objects have been added.
       */
      unshiftObjects(objects: Enumerable): Ember.Array;
      /**
       * Reverse objects in the array. Works just like `reverse()` but it is KVO-compliant.
       */
      reverseObjects(): Ember.Array;
      /**
       * Replace all the receiver's content with content of the argument. If argument is an empty array receiver will be cleared.
       */
      setObjects(objects: Ember.Array): Ember.Array;
      /**
       * Remove all occurrences of an object in the array.
       */
      removeObject(obj: any): Ember.Array;
      /**
       * Push the object onto the end of the array if it is not already present in the array.
       */
      addObject(obj: any): Ember.Array;
      /**
       * Your array must support the `length` property. Your replace methods should set this property whenever it changes.
       */
      length: number;
      /**
       * Returns the object at the given `index`. If the given `index` is negative or is greater or equal than the array length, returns `undefined`.
       */
      objectAt(idx: number): any;
      /**
       * This returns the objects at the specified indexes, using `objectAt`.
       */
      objectsAt(indexes: Ember.Array): Ember.Array;
      /**
       * This is the handler for the special array content property. If you get this property, it will return this. If you set this property to a new array, it will replace the current content.
       */
      '[]': any;
      /**
       * Returns a new array that is a slice of the receiver. This implementation uses the observable array methods to retrieve the objects for the new slice.
       */
      slice(beginIndex: Integer, endIndex: Integer): Ember.Array;
      /**
       * Returns the index of the given object's first occurrence. If no `startAt` argument is given, the starting location to search is 0. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      indexOf(object: {}, startAt: number): number;
      /**
       * Returns the index of the given object's last occurrence. If no `startAt` argument is given, the search starts from the last position. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      lastIndexOf(object: {}, startAt: number): number;
      /**
       * Adds an array observer to the receiving array. The array observer object normally must implement two methods:
       */
      addArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Removes an array observer from the object if the observer is current registered. Calling this method multiple times with the same object will have no effect.
       */
      removeArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasArrayObservers: boolean;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just before the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just after the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * Returns a special object that can be used to observe individual properties on the array. Just get an equivalent property on this object and it will return an enumerable that maps automatically to the named key on the member objects.
       */
      '@each': any;
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
      /**
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
    }
    export class CoreObject {
      /**
       * An overridable method called when objects are instantiated. By default, does nothing unless it is overridden during class definition.
       */
      init();
      /**
       * Defines the properties that will be concatenated from the superclass (instead of overridden).
       */
      concatenatedProperties: Ember.Array;
      /**
       * Destroyed object property flag.
       */
      isDestroyed: any;
      /**
       * Destruction scheduled flag. The `destroy()` method has been called.
       */
      isDestroying: any;
      /**
       * Destroys an object by setting the `isDestroyed` flag and removing its metadata, which effectively destroys observers and bindings.
       */
      destroy(): {};
      /**
       * Override to implement teardown.
       */
      willDestroy();
      /**
       * Returns a string representation which attempts to provide more information than Javascript's `toString` typically does, in a generic way for all Ember objects.
       */
      toString(): string;
      /**
       * Creates a new subclass.
       */
      static extend(mixins: Mixin, args: {});
      /**
       * Equivalent to doing `extend(arguments).create()`. If possible use the normal `create` method instead.
       */
      static createWithMixins(args: any);
      /**
       * Creates an instance of a class. Accepts either no arguments, or an object containing values to initialize the newly instantiated object with.
       */
      static create(args: any);
      /**
       * Augments a constructor's prototype with additional properties and functions:
       */
      reopen();
      /**
       * Augments a constructor's own properties and functions:
       */
      reopenClass();
      /**
       * In some cases, you may want to annotate computed properties with additional metadata about how they function or what values they operate on. For example, computed property functions may close over variables that are then no longer available for introspection.
       */
      static metaForProperty(key: string);
      /**
       * Iterate over each computed property for the class, passing its name and any associated metadata (see `metaForProperty`) to the callback.
       */
      static eachComputedProperty(callback: Function, binding: {});
      /**
       * Returns a hash of property names and container names that injected properties will lookup on the container lazily.
       */
      _lazyInjections(): {};
    }
    /**
     * This is the object instance returned when you get the `@each` property on an array. It uses the unknownProperty handler to automatically create EachArray instances for property names.
     */
    export class EachProxy extends Object {
      /**
       * You can directly access mapped properties by simply requesting them. The `unknownProperty` handler will generate an EachArray of each item.
       */
      unknownProperty(keyName: string, value: any);
    }
    /**
     * A Namespace is an object usually used to contain other objects or methods such as an application or framework. Create a namespace anytime you want to define one of these new containers.
     */
    export class Namespace extends Object {
    }
    /**
     * The NativeArray mixin contains the properties needed to make the native Array support Ember.MutableArray and all of its dependent APIs. Unless you have `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Array` set to false, this will be applied automatically. Otherwise you can apply the mixin at anytime by calling `Ember.NativeArray.activate`.
     */
    export class NativeArray implements MutableArray, Observable, Copyable {
      /**
       * Activates the mixin on the Array.prototype if not already applied. Calling this method more than once is safe. This will be called when ember is loaded unless you have `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Array` set to `false`.
       */
      static activate(): void;
      /**
       * __Required.__ You must implement this method to apply this mixin.
       */
      replace(idx: number, amt: number, objects: Ember.Array);
      /**
       * Remove all elements from the array. This is useful if you want to reuse an existing array without having to recreate it.
       */
      clear(): Ember.Array;
      /**
       * This will use the primitive `replace()` method to insert an object at the specified index.
       */
      insertAt(idx: number, object: {}): Ember.Array;
      /**
       * Remove an object at the specified index using the `replace()` primitive method. You can pass either a single index, or a start and a length.
       */
      removeAt(start: number, len: number): Ember.Array;
      /**
       * Push the object onto the end of the array. Works just like `push()` but it is KVO-compliant.
       */
      pushObject(obj: any): void;
      /**
       * Add the objects in the passed numerable to the end of the array. Defers notifying observers of the change until all objects are added.
       */
      pushObjects(objects: Enumerable): Ember.Array;
      /**
       * Pop object from array or nil if none are left. Works just like `pop()` but it is KVO-compliant.
       */
      popObject(): void;
      /**
       * Shift an object from start of array or nil if none are left. Works just like `shift()` but it is KVO-compliant.
       */
      shiftObject(): void;
      /**
       * Unshift an object to start of array. Works just like `unshift()` but it is KVO-compliant.
       */
      unshiftObject(obj: any): void;
      /**
       * Adds the named objects to the beginning of the array. Defers notifying observers until all objects have been added.
       */
      unshiftObjects(objects: Enumerable): Ember.Array;
      /**
       * Reverse objects in the array. Works just like `reverse()` but it is KVO-compliant.
       */
      reverseObjects(): Ember.Array;
      /**
       * Replace all the receiver's content with content of the argument. If argument is an empty array receiver will be cleared.
       */
      setObjects(objects: Ember.Array): Ember.Array;
      /**
       * Remove all occurrences of an object in the array.
       */
      removeObject(obj: any): Ember.Array;
      /**
       * Push the object onto the end of the array if it is not already present in the array.
       */
      addObject(obj: any): Ember.Array;
      /**
       * Your array must support the `length` property. Your replace methods should set this property whenever it changes.
       */
      length: number;
      /**
       * Returns the object at the given `index`. If the given `index` is negative or is greater or equal than the array length, returns `undefined`.
       */
      objectAt(idx: number): any;
      /**
       * This returns the objects at the specified indexes, using `objectAt`.
       */
      objectsAt(indexes: Ember.Array): Ember.Array;
      /**
       * This is the handler for the special array content property. If you get this property, it will return this. If you set this property to a new array, it will replace the current content.
       */
      '[]': any;
      /**
       * Returns a new array that is a slice of the receiver. This implementation uses the observable array methods to retrieve the objects for the new slice.
       */
      slice(beginIndex: Integer, endIndex: Integer): Ember.Array;
      /**
       * Returns the index of the given object's first occurrence. If no `startAt` argument is given, the starting location to search is 0. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      indexOf(object: {}, startAt: number): number;
      /**
       * Returns the index of the given object's last occurrence. If no `startAt` argument is given, the search starts from the last position. If it's negative, will count backward from the end of the array. Returns -1 if no match is found.
       */
      lastIndexOf(object: {}, startAt: number): number;
      /**
       * Adds an array observer to the receiving array. The array observer object normally must implement two methods:
       */
      addArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Removes an array observer from the object if the observer is current registered. Calling this method multiple times with the same object will have no effect.
       */
      removeArrayObserver(target: {}, opts: {}): Ember.Array;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasArrayObservers: boolean;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just before the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * If you are implementing an object that supports `Ember.Array`, call this method just after the array content changes to notify any observers and invalidate any related properties. Pass the starting index of the change as well as a delta of the amounts to change.
       */
      arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
      /**
       * Returns a special object that can be used to observe individual properties on the array. Just get an equivalent property on this object and it will return an enumerable that maps automatically to the named key on the member objects.
       */
      '@each': any;
      /**
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
      /**
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
      /**
       * Retrieves the value of a property from the object.
       */
      get(keyName: string): {};
      /**
       * To get the values of multiple properties at once, call `getProperties` with a list of strings or an array:
       */
      getProperties(...list: string[]): {};
      /**
       * Sets the provided key or path to the value.
       */
      set(keyName: string, value: {}): Observable;
      /**
       * Sets a list of properties at once. These properties are set inside a single `beginPropertyChanges` and `endPropertyChanges` batch, so observers will be buffered.
       */
      setProperties(hash: {}): Observable;
      /**
       * Begins a grouping of property changes.
       */
      beginPropertyChanges(): Observable;
      /**
       * Ends a grouping of property changes.
       */
      endPropertyChanges(): Observable;
      /**
       * Notify the observer system that a property is about to change.
       */
      propertyWillChange(keyName: string): Observable;
      /**
       * Notify the observer system that a property has just changed.
       */
      propertyDidChange(keyName: string): Observable;
      /**
       * Convenience method to call `propertyWillChange` and `propertyDidChange` in succession.
       */
      notifyPropertyChange(keyName: string): Observable;
      /**
       * Adds an observer on a property.
       */
      addObserver(key: string, target: {}, method: string|Function);
      /**
       * Remove an observer you have previously registered on this object. Pass the same key, target, and method you passed to `addObserver()` and your target will no longer receive notifications.
       */
      removeObserver(key: string, target: {}, method: string|Function);
      /**
       * Returns `true` if the object currently has observers registered for a particular key. You can use this method to potentially defer performing an expensive action until someone begins observing a particular property on the object.
       */
      hasObserverFor(key: string): boolean;
      /**
       * Retrieves the value of a property, or a default value in the case that the property returns `undefined`.
       */
      getWithDefault(keyName: string, defaultValue: {}): {};
      /**
       * Set the value of a property to the current value plus some amount.
       */
      incrementProperty(keyName: string, increment: number): number;
      /**
       * Set the value of a property to the current value minus some amount.
       */
      decrementProperty(keyName: string, decrement: number): number;
      /**
       * Set the value of a boolean property to the opposite of its current value.
       */
      toggleProperty(keyName: string): {};
      /**
       * Returns the cached value of a computed property, if it exists. This allows you to inspect the value of a computed property without accidentally invoking it if it is intended to be generated lazily.
       */
      cacheFor(keyName: string): {};
      /**
       * Override to return a copy of the receiver. Default implementation raises an exception.
       */
      copy(deep: boolean): {};
      /**
       * If the object implements `Ember.Freezable`, then this will return a new copy if the object is not frozen and the receiver if the object is frozen.
       */
      frozenCopy(): {};
    }
    /**
     * `Ember.Object` is the main base class for all Ember objects. It is a subclass of `Ember.CoreObject` with the `Ember.Observable` mixin applied. For details, see the documentation for each of these.
     */
    export class Object extends CoreObject implements Observable {
      /**
       * Retrieves the value of a property from the object.
       */
      get(keyName: string): {};
      /**
       * To get the values of multiple properties at once, call `getProperties` with a list of strings or an array:
       */
      getProperties(...list: string[]): {};
      /**
       * Sets the provided key or path to the value.
       */
      set(keyName: string, value: {}): Observable;
      /**
       * Sets a list of properties at once. These properties are set inside a single `beginPropertyChanges` and `endPropertyChanges` batch, so observers will be buffered.
       */
      setProperties(hash: {}): Observable;
      /**
       * Begins a grouping of property changes.
       */
      beginPropertyChanges(): Observable;
      /**
       * Ends a grouping of property changes.
       */
      endPropertyChanges(): Observable;
      /**
       * Notify the observer system that a property is about to change.
       */
      propertyWillChange(keyName: string): Observable;
      /**
       * Notify the observer system that a property has just changed.
       */
      propertyDidChange(keyName: string): Observable;
      /**
       * Convenience method to call `propertyWillChange` and `propertyDidChange` in succession.
       */
      notifyPropertyChange(keyName: string): Observable;
      /**
       * Adds an observer on a property.
       */
      addObserver(key: string, target: {}, method: string|Function);
      /**
       * Remove an observer you have previously registered on this object. Pass the same key, target, and method you passed to `addObserver()` and your target will no longer receive notifications.
       */
      removeObserver(key: string, target: {}, method: string|Function);
      /**
       * Returns `true` if the object currently has observers registered for a particular key. You can use this method to potentially defer performing an expensive action until someone begins observing a particular property on the object.
       */
      hasObserverFor(key: string): boolean;
      /**
       * Retrieves the value of a property, or a default value in the case that the property returns `undefined`.
       */
      getWithDefault(keyName: string, defaultValue: {}): {};
      /**
       * Set the value of a property to the current value plus some amount.
       */
      incrementProperty(keyName: string, increment: number): number;
      /**
       * Set the value of a property to the current value minus some amount.
       */
      decrementProperty(keyName: string, decrement: number): number;
      /**
       * Set the value of a boolean property to the opposite of its current value.
       */
      toggleProperty(keyName: string): {};
      /**
       * Returns the cached value of a computed property, if it exists. This allows you to inspect the value of a computed property without accidentally invoking it if it is intended to be generated lazily.
       */
      cacheFor(keyName: string): {};
    }
    /**
     * `Ember.ObjectProxy` forwards all properties not defined by the proxy itself to a proxied `content` object.
     */
    export class ObjectProxy {
    }
    export class Service extends Object {
    }
    /**
     * DEPRECATED: 
     * An unordered collection of objects.
     */
    export class Set extends CoreObject implements MutableEnumerable, Copyable, Freezable {
      /**
       * DEPRECATED: 
       * This property will change as the number of objects in the set changes.
       */
      length: number;
      /**
       * DEPRECATED: 
       * Clears the set. This is useful if you want to reuse an existing set without having to recreate it.
       */
      clear(): Set;
      /**
       * DEPRECATED: 
       * Returns true if the passed object is also an enumerable that contains the same objects as the receiver.
       */
      isEqual(obj: Set): boolean;
      /**
       * DEPRECATED: 
       * Adds an object to the set. Only non-`null` objects can be added to a set and those can only be added once. If the object is already in the set or the passed value is null this method will have no effect.
       */
      add(obj: {}): Set;
      /**
       * DEPRECATED: 
       * Removes the object from the set if it is found. If you pass a `null` value or an object that is already not in the set, this method will have no effect. This is an alias for `Ember.MutableEnumerable.removeObject()`.
       */
      remove(obj: {}): Set;
      /**
       * DEPRECATED: 
       * Removes the last element from the set and returns it, or `null` if it's empty.
       */
      pop(): {};
      /**
       * DEPRECATED: 
       * Inserts the given object on to the end of the set. It returns the set itself.
       */
      push(): Set;
      /**
       * DEPRECATED: 
       * Removes the last element from the set and returns it, or `null` if it's empty.
       */
      shift(): {};
      /**
       * DEPRECATED: 
       * Inserts the given object on to the end of the set. It returns the set itself.
       */
      unshift(): Set;
      /**
       * DEPRECATED: 
       * Adds each object in the passed enumerable to the set.
       */
      addEach(objects: Enumerable): Set;
      /**
       * DEPRECATED: 
       * Removes each object in the passed enumerable to the set.
       */
      removeEach(objects: Enumerable): Set;
      /**
       * DEPRECATED: 
       * __Required.__ You must implement this method to apply this mixin.
       */
      addObject(object: {}): {};
      /**
       * DEPRECATED: 
       * Adds each object in the passed enumerable to the receiver.
       */
      addObjects(objects: Enumerable): {};
      /**
       * DEPRECATED: 
       * __Required.__ You must implement this method to apply this mixin.
       */
      removeObject(object: {}): {};
      /**
       * DEPRECATED: 
       * Removes each object in the passed enumerable from the receiver.
       */
      removeObjects(objects: Enumerable): {};
      /**
       * DEPRECATED: 
       * Implement this method to make your class enumerable.
       */
      nextObject(index: number, previousObject: {}, context: {}): {};
      /**
       * DEPRECATED: 
       * Helper method returns the first object from a collection. This is usually used by bindings and other parts of the framework to extract a single object if the enumerable contains only one item.
       */
      firstObject: any;
      /**
       * DEPRECATED: 
       * Helper method returns the last object from a collection. If your enumerable contains only one object, this method should always return that object. If your enumerable is empty, this method should return `undefined`.
       */
      lastObject: any;
      /**
       * DEPRECATED: 
       * Returns `true` if the passed object can be found in the receiver. The default version will iterate through the enumerable until the object is found. You may want to override this with a more efficient version.
       */
      contains(obj: {}): boolean;
      /**
       * DEPRECATED: 
       * Iterates through the enumerable, calling the passed function on each item. This method corresponds to the `forEach()` method defined in JavaScript 1.6.
       */
      forEach(callback: Function, target: {}): {};
      /**
       * DEPRECATED: 
       * Alias for `mapBy`
       */
      getEach(key: string): Ember.Array;
      /**
       * DEPRECATED: 
       * Sets the value on the named property for each member. This is more efficient than using other methods defined on this helper. If the object implements Ember.Observable, the value will be changed to `set(),` otherwise it will be set directly. `null` objects are skipped.
       */
      setEach(key: string, value: {}): {};
      /**
       * DEPRECATED: 
       * Maps all of the items in the enumeration to another value, returning a new array. This method corresponds to `map()` defined in JavaScript 1.6.
       */
      map(callback: Function, target: {}): Ember.Array;
      /**
       * DEPRECATED: 
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapBy(key: string): Ember.Array;
      /**
       * DEPRECATED: Use `mapBy` instead
       * Similar to map, this specialized function returns the value of the named property on all items in the enumeration.
       */
      mapProperty(key: string): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns an array with all of the items in the enumeration that the passed function returns true for. This method corresponds to `filter()` defined in JavaScript 1.6.
       */
      filter(callback: Function, target: {}): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns an array with all of the items in the enumeration where the passed function returns true. This method is the inverse of filter().
       */
      reject(callback: Function, target: {}): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterBy(key: string, value: any): Ember.Array;
      /**
       * DEPRECATED: Use `filterBy` instead
       * Returns an array with just the items with the matched property. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      filterProperty(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectBy(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: Use `rejectBy` instead
       * Returns an array with the items that do not have truthy values for key.  You can pass an optional second argument with the target value.  Otherwise this will match any property that evaluates to false.
       */
      rejectProperty(key: string, value: string): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns the first item in the array for which the callback returns true. This method works similar to the `filter()` method defined in JavaScript 1.6 except that it will stop working on the array once a match is found.
       */
      find(callback: Function, target: {}): {};
      /**
       * DEPRECATED: 
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findBy(key: string, value: string): {};
      /**
       * DEPRECATED: Use `findBy` instead
       * Returns the first item with a property matching the passed value. You can pass an optional second argument with the target value. Otherwise this will match any property that evaluates to `true`.
       */
      findProperty(key: string, value: string): {};
      /**
       * DEPRECATED: 
       * Returns `true` if the passed function returns true for every item in the enumeration. This corresponds with the `every()` method in JavaScript 1.6.
       */
      every(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isEvery` instead
       */
      everyProperty(key: string, value: string): boolean;
      /**
       * DEPRECATED: 
       * Returns `true` if the passed property resolves to `true` for all items in the enumerable. This method is often simpler/faster than using a callback.
       */
      isEvery(key: string, value: string): boolean;
      /**
       * DEPRECATED: 
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      any(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: Use `any` instead
       * Returns `true` if the passed function returns true for any item in the enumeration. This corresponds with the `some()` method in JavaScript 1.6.
       */
      some(callback: Function, target: {}): boolean;
      /**
       * DEPRECATED: 
       * Returns `true` if the passed property resolves to `true` for any item in the enumerable. This method is often simpler/faster than using a callback.
       */
      isAny(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      anyBy(key: string, value: string): boolean;
      /**
       * DEPRECATED: Use `isAny` instead
       */
      someProperty(key: string, value: string): boolean;
      /**
       * DEPRECATED: 
       * This will combine the values of the enumerator into a single value. It is a useful way to collect a summary value from an enumeration. This corresponds to the `reduce()` method defined in JavaScript 1.8.
       */
      reduce(callback: Function, initialValue: {}, reducerProperty: string): {};
      /**
       * DEPRECATED: 
       * Invokes the named method on every object in the receiver that implements it. This method corresponds to the implementation in Prototype 1.6.
       */
      invoke(methodName: string, ...args: any[]): Ember.Array;
      /**
       * DEPRECATED: 
       * Simply converts the enumerable into a genuine array. The order is not guaranteed. Corresponds to the method implemented by Prototype.
       */
      toArray(): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns a copy of the array with all `null` and `undefined` elements removed.
       */
      compact(): Ember.Array;
      /**
       * DEPRECATED: 
       * Returns a new enumerable that excludes the passed value. The default implementation returns an array regardless of the receiver type unless the receiver does not contain the value.
       */
      without(value: {}): Enumerable;
      /**
       * DEPRECATED: 
       * Returns a new enumerable that contains only unique values. The default implementation returns an array regardless of the receiver type.
       */
      uniq(): Enumerable;
      /**
       * DEPRECATED: 
       * This property will trigger anytime the enumerable's content changes. You can observe this property to be notified of changes to the enumerable's content.
       */
      '[]': Ember.Array;
      /**
       * DEPRECATED: 
       * Registers an enumerable observer. Must implement `Ember.EnumerableObserver` mixin.
       */
      addEnumerableObserver(target: {}, opts: {}): void;
      /**
       * DEPRECATED: 
       * Removes a registered enumerable observer.
       */
      removeEnumerableObserver(target: {}, opts: {}): void;
      /**
       * DEPRECATED: 
       * Becomes true whenever the array currently has observers watching changes on the array.
       */
      hasEnumerableObservers: boolean;
      /**
       * DEPRECATED: 
       * Invoke this method just before the contents of your enumerable will change. You can either omit the parameters completely or pass the objects to be removed or added if available or just a count.
       */
      enumerableContentWillChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * DEPRECATED: 
       * Invoke this method when the contents of your enumerable has changed. This will notify any observers watching for content changes. If you are implementing an ordered enumerable (such as an array), also pass the start and end values where the content changed so that it can be used to notify range observers.
       */
      enumerableContentDidChange(removing: Enumerable|number, adding: Enumerable|number);
      /**
       * DEPRECATED: 
       * Converts the enumerable into an array and sorts by the keys specified in the argument.
       */
      sortBy(property: string): Ember.Array;
      /**
       * DEPRECATED: 
       * Override to return a copy of the receiver. Default implementation raises an exception.
       */
      copy(deep: boolean): {};
      /**
       * DEPRECATED: 
       * If the object implements `Ember.Freezable`, then this will return a new copy if the object is not frozen and the receiver if the object is frozen.
       */
      frozenCopy(): {};
      /**
       * DEPRECATED: 
       * Set to `true` when the object is frozen. Use this property to detect whether your object is frozen or not.
       */
      isFrozen: boolean;
      /**
       * DEPRECATED: 
       * Freezes the object. Once this method has been called the object should no longer allow any properties to be edited.
       */
      freeze(): {};
    }
    /**
     * An `Ember.SubArray` tracks an array in a way similar to, but more specialized than, `Ember.TrackedArray`.  It is useful for keeping track of the indexes of items within a filtered array.
     */
    export class SubArray {
      /**
       * Track that an item was added to the tracked array.
       */
      addItem(index: number, match: boolean): number;
      /**
       * Track that an item was removed from the tracked array.
       */
      removeItem(index: number): number;
    }
    /**
     * An `Ember.TrackedArray` tracks array operations.  It's useful when you want to lazily compute the indexes of items in an array after they've been shifted by subsequent operations.
     */
    export class TrackedArray {
      /**
       * Track that `newItems` were added to the tracked array at `index`.
       */
      addItems(index: any, newItems: any);
      /**
       * Track that `count` items were removed at `index`.
       */
      removeItems(index: any, count: any);
      /**
       * Apply all operations, reducing them to retain:n, for `n`, the number of items in the array.
       */
      apply(callback: Function);
    }
    /**
     * `TextSupport` is a shared mixin used by both `Ember.TextField` and `Ember.TextArea`. `TextSupport` adds a number of methods that allow you to specify a controller action to invoke when a certain event is fired on your text field or textarea. The specifed controller action would get the current value of the field passed in as the only argument unless the value of the field is empty. In that case, the instance of the field itself is passed in as the only argument.
     */
    export class TextSupport extends Mixin implements TargetActionSupport {
      /**
       * A list of properties of the view to apply as attributes. If the property is a string value, the value of that string will be applied as the attribute.
       */
      attributeBindings: any;
      /**
       * Standard CSS class names to apply to the view's outer element. This property automatically inherits any class names defined by the view's superclasses as well.
       */
      classNames: Ember.Array;
      /**
       * A list of properties of the view to apply as class names. If the property is a string value, the value of that string will be applied as a class name.
       */
      classNameBindings: Ember.Array;
      /**
       * Used to identify this view during debugging
       */
      instrumentDisplay: string;
      /**
       * Removes all children from the `parentView`.
       */
      removeAllChildren(): View;
      /**
       * DEPRECATED: 
       * Return the nearest ancestor whose parent is an instance of `klass`.
       */
      nearestChildOf(klass: any): void;
      /**
       * DEPRECATED: 
       * Return the nearest ancestor that is an instance of the provided class.
       */
      nearestInstanceOf(klass: any): void;
      /**
       * Called on your view when it should push strings of HTML into a `Ember.RenderBuffer`. Most users will want to override the `template` or `templateName` properties instead of this method.
       */
      render(buffer: RenderBuffer);
      /**
       * The action to be sent when the user presses the return key.
       */
      action: string;
      /**
       * The event that should send the action.
       */
      onEvent: string;
      /**
       * Whether the `keyUp` event that triggers an `action` to be sent continues propagating to other views.
       */
      bubbles: boolean;
      /**
       * Allows you to specify a controller action to invoke when either the `enter` key is pressed or, in the case of the field being a textarea, when a newline is inserted. To use this method, give your field an `insert-newline` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      insertNewline(event: Event);
      /**
       * Allows you to specify a controller action to invoke when the escape button is pressed. To use this method, give your field an `escape-press` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      cancel(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a field receives focus. To use this method, give your field a `focus-in` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      focusIn(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a field loses focus. To use this method, give your field a `focus-out` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      focusOut(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key is pressed. To use this method, give your field a `key-press` attribute. The value of that attribute should be the name of the action in your controller you that wish to invoke.
       */
      keyPress(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key-up event is fired. To use this method, give your field a `key-up` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      keyUp(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key-down event is fired. To use this method, give your field a `key-down` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      keyDown(event: Event);
      /**
       * Send an `action` with an `actionContext` to a `target`. The action, actionContext and target will be retrieved from properties of the object. For example:
       */
      triggerAction(opts: {}): boolean;
    }
    /**
     * `Ember.ViewTargetActionSupport` is a mixin that can be included in a view class to add a `triggerAction` method with semantics similar to the Handlebars `{{action}}` helper. It provides intelligent defaults for the action's target: the view's controller; and the context that is sent with the action: the view's context.
     */
    export class ViewTargetActionSupport extends TargetActionSupport {
      /**
       * Removes the child view from the parent view.
       */
      removeChild(view: View): View;
      /**
       * Instantiates a view to be added to the childViews array during view initialization. You generally will not call this method directly unless you are overriding `createChildViews()`. Note that this method will automatically configure the correct settings on the new view instance to act as a child of the parent.
       */
      createChildView(viewClass: any|string, attrs: {}): View;
      /**
       * The object from which templates should access properties.
       */
      context: {};
      /**
       * The controller managing this view. If this property is set, it will be made available for use by the template.
       */
      controller: {};
      target: any;
      actionContext: any;
    }
    /**
     * `Ember.EventDispatcher` handles delegating browser events to their corresponding `Ember.Views.` For example, when you click on a view, `Ember.EventDispatcher` ensures that that view's `mouseDown` method gets called.
     */
    export class EventDispatcher extends Object {
      /**
       * If `false`, the view will appear hidden in DOM.
       */
      isVisible: boolean;
      /**
       * The set of events names (and associated handler function names) to be setup and dispatched by the `EventDispatcher`. Custom events can added to this list at setup time, generally via the `Ember.Application.customEvents` hash. Only override this default set to prevent the EventDispatcher from listening on some events all together.
       */
      events: {};
      /**
       * It enables events to be dispatched to the view's `eventManager.` When present, this object takes precedence over handling of events on the view itself.
       */
      canDispatchToEventManager: boolean;
    }
    /**
     * The internal class used to create text inputs when the `{{input}}` helper is used with `type` of `checkbox`.
     */
    export class Checkbox extends View {
      /**
       * `Ember.RenderBuffer` gathers information regarding the view and generates the final representation. `Ember.RenderBuffer` will generate HTML which can be pushed to the DOM.
       */
      renderBuffer(tagName: string);
      /**
       * Array of class names which will be applied in the class attribute.
       */
      classes: Ember.Array;
      /**
       * The id in of the element, to be applied in the id attribute.
       */
      elementId: string;
      /**
       * A hash keyed on the name of the attribute and whose value will be applied to that attribute. For example, if you wanted to apply a `data-view="Foo.bar"` property to an element, you would set the elementAttributes hash to `{'data-view':'Foo.bar'}`.
       */
      elementAttributes: {};
      /**
       * A hash keyed on the name of the properties and whose value will be applied to that property. For example, if you wanted to apply a `checked=true` property to an element, you would set the elementProperties hash to `{'checked':true}`.
       */
      elementProperties: {};
      /**
       * The tagname of the element an instance of `Ember.RenderBuffer` represents.
       */
      elementTag: string;
      /**
       * A hash keyed on the name of the style attribute and whose value will be applied to that attribute. For example, if you wanted to apply a `background-color:black;` style to an element, you would set the elementStyle hash to `{'background-color':'black'}`.
       */
      elementStyle: {};
      /**
       * Adds a string of HTML to the `RenderBuffer`.
       */
      push(string: string);
      /**
       * Adds a class to the buffer, which will be rendered to the class attribute.
       */
      addClass(className: string);
      /**
       * Sets the elementID to be used for the element.
       */
      id(id: string);
      /**
       * Adds an attribute which will be rendered to the element.
       */
      attr(name: string, value: string): RenderBuffer|string;
      /**
       * Remove an attribute from the list of attributes to render.
       */
      removeAttr(name: string);
      /**
       * Adds a property which will be rendered to the element.
       */
      prop(name: string, value: string): RenderBuffer|string;
      /**
       * Remove an property from the list of properties to render.
       */
      removeProp(name: string);
      /**
       * Adds a style to the style attribute which will be rendered to the element.
       */
      style(name: string, value: string);
      element(): DOMElement;
      /**
       * Generates the HTML content for this buffer.
       */
      string(): string;
    }
    /**
     * `Ember.CollectionView` is an `Ember.View` descendent responsible for managing a collection (an array or array-like object) by maintaining a child view object and associated DOM representation for each item in the array and ensuring that child views and their associated rendered HTML are updated when items in the array are added, removed, or replaced.
     */
    export class CollectionView extends ContainerView {
      /**
       * A list of items to be displayed by the `Ember.CollectionView`.
       */
      content: Ember.Array;
      /**
       * An optional view to display if content is set to an empty array.
       */
      emptyView: View;
      itemViewClass: View;
      /**
       * Setup a CollectionView
       */
      init();
      /**
       * Removes the content and content observers.
       */
      destroy();
      /**
       * Called when a mutation to the underlying content array will occur.
       */
      arrayWillChange(content: Ember.Array, start: number, removed: number);
      /**
       * Called when a mutation to the underlying content array occurs.
       */
      arrayDidChange(content: Ember.Array, start: number, removed: number, added: number);
      /**
       * Instantiates a view to be added to the childViews array during view initialization. You generally will not call this method directly unless you are overriding `createChildViews()`. Note that this method will automatically configure the correct settings on the new view instance to act as a child of the parent.
       */
      createChildView(viewClass: any, attrs: {}): View;
      /**
       * A map of parent tags to their default child tags. You can add additional parent tags if you want collection views that use a particular parent tag to default to a child tag.
       */
      static CONTAINER_MAP: {};
    }
    /**
     * An `Ember.Component` is a view that is completely isolated. Properties accessed in its templates go to the view object and actions are targeted at the view object. There is no access to the surrounding context or outer controller; all contextual information must be passed in.
     */
    export class Component extends View {
      /**
       * DEPRECATED: 
       * A components template property is set by passing a block during its invocation. It is executed within the parent context.
       */
      template: any;
      /**
       * DEPRECATED: 
       * Specifying a components `templateName` is deprecated without also providing the `layout` or `layoutName` properties.
       */
      templateName: any;
      /**
       * If the component is currently inserted into the DOM of a parent view, this property will point to the controller of the parent view.
       */
      targetObject: Controller;
      /**
       * Triggers a named action on the controller context where the component is used if this controller has registered for notifications of the action.
       */
      sendAction(action: string, context: any);
    }
    /**
     * A `ContainerView` is an `Ember.View` subclass that implements `Ember.MutableArray` allowing programmatic management of its child views.
     */
    export class ContainerView extends View {
    }
    /**
     * `Ember.CoreView` is an abstract class that exists to give view-like behavior to both Ember's main view class `Ember.View` and other classes that don't need the fully functionaltiy of `Ember.View`.
     */
    export class CoreView extends Object implements Evented, ActionHandler {
      /**
       * If the view is currently inserted into the DOM of a parent view, this property will point to the parent of the view.
       */
      parentView: View;
      /**
       * Override the default event firing from `Ember.Evented` to also call methods with the given name.
       */
      trigger(name: string);
      /**
       * Subscribes to a named event with given function.
       */
      on(name: string, target: {}, method: Function): void;
      /**
       * Subscribes a function to a named event and then cancels the subscription after the first time the event is triggered. It is good to use ``one`` when you only care about the first time an event has taken place.
       */
      one(name: string, target: {}, method: Function): void;
      /**
       * Cancels subscription for given name, target, and method.
       */
      off(name: string, target: {}, method: Function): void;
      /**
       * Checks to see if object has any subscriptions for named event.
       */
      has(name: string): boolean;
      /**
       * The collection of functions, keyed by name, available on this `ActionHandler` as action targets.
       */
      actions: {};
      /**
       * Triggers a named action on the `ActionHandler`. Any parameters supplied after the `actionName` string will be passed as arguments to the action target function.
       */
      send(actionName: string, context: any);
    }
    export class _Metamorph {
    }
    export class _MetamorphView extends View implements _Metamorph {
    }
    /**
     * The `Ember.Select` view class renders a [select](https://developer.mozilla.org/en/HTML/Element/select) HTML element, allowing the user to choose from a list of options.
     */
    export class Select extends View {
      /**
       * The `multiple` attribute of the select element. Indicates whether multiple options can be selected.
       */
      multiple: boolean;
      /**
       * The `disabled` attribute of the select element. Indicates whether the element is disabled from interactions.
       */
      disabled: boolean;
      /**
       * The `required` attribute of the select element. Indicates whether a selected option is required for form validation.
       */
      required: boolean;
      /**
       * The list of options.
       */
      content: Ember.Array;
      /**
       * When `multiple` is `false`, the element of `content` that is currently selected, if any.
       */
      selection: {};
      /**
       * In single selection mode (when `multiple` is `false`), value can be used to get the current selection's value or set the selection by its value.
       */
      value: string;
      /**
       * If given, a top-most dummy option will be rendered to serve as a user prompt.
       */
      prompt: string;
      /**
       * The path of the option labels. See [content](/api/classes/Ember.Select.html#property_content).
       */
      optionLabelPath: string;
      /**
       * The path of the option values. See [content](/api/classes/Ember.Select.html#property_content).
       */
      optionValuePath: string;
      /**
       * The path of the option group. When this property is used, `content` should be sorted by `optionGroupPath`.
       */
      optionGroupPath: string;
      /**
       * The view class for optgroup.
       */
      groupView: View;
      /**
       * The view class for option.
       */
      optionView: View;
    }
    /**
     * The internal class used to create textarea element when the `{{textarea}}` helper is used.
     */
    export class TextArea extends Component implements TextSupport {
      /**
       * A list of properties of the view to apply as attributes. If the property is a string value, the value of that string will be applied as the attribute.
       */
      attributeBindings: any;
      /**
       * Standard CSS class names to apply to the view's outer element. This property automatically inherits any class names defined by the view's superclasses as well.
       */
      classNames: Ember.Array;
      /**
       * A list of properties of the view to apply as class names. If the property is a string value, the value of that string will be applied as a class name.
       */
      classNameBindings: Ember.Array;
      /**
       * Used to identify this view during debugging
       */
      instrumentDisplay: string;
      /**
       * Removes all children from the `parentView`.
       */
      removeAllChildren(): View;
      /**
       * DEPRECATED: 
       * Return the nearest ancestor whose parent is an instance of `klass`.
       */
      nearestChildOf(klass: any): void;
      /**
       * DEPRECATED: 
       * Return the nearest ancestor that is an instance of the provided class.
       */
      nearestInstanceOf(klass: any): void;
      /**
       * Called on your view when it should push strings of HTML into a `Ember.RenderBuffer`. Most users will want to override the `template` or `templateName` properties instead of this method.
       */
      render(buffer: RenderBuffer);
      /**
       * The action to be sent when the user presses the return key.
       */
      action: string;
      /**
       * The event that should send the action.
       */
      onEvent: string;
      /**
       * Whether the `keyUp` event that triggers an `action` to be sent continues propagating to other views.
       */
      bubbles: boolean;
      /**
       * Allows you to specify a controller action to invoke when either the `enter` key is pressed or, in the case of the field being a textarea, when a newline is inserted. To use this method, give your field an `insert-newline` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      insertNewline(event: Event);
      /**
       * Allows you to specify a controller action to invoke when the escape button is pressed. To use this method, give your field an `escape-press` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      cancel(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a field receives focus. To use this method, give your field a `focus-in` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      focusIn(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a field loses focus. To use this method, give your field a `focus-out` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      focusOut(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key is pressed. To use this method, give your field a `key-press` attribute. The value of that attribute should be the name of the action in your controller you that wish to invoke.
       */
      keyPress(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key-up event is fired. To use this method, give your field a `key-up` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      keyUp(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key-down event is fired. To use this method, give your field a `key-down` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      keyDown(event: Event);
      /**
       * Send an `action` with an `actionContext` to a `target`. The action, actionContext and target will be retrieved from properties of the object. For example:
       */
      triggerAction(opts: {}): boolean;
    }
    /**
     * The internal class used to create text inputs when the `{{input}}` helper is used with `type` of `text`. See [Handlebars.helpers.input](/api/classes/Ember.Handlebars.helpers.html#method_input)  for usage details. ## Layout and LayoutName properties Because HTML `input` elements are self closing `layout` and `layoutName` properties will not be applied. See [Ember.View](/api/classes/Ember.View.html)'s layout section for more information.
     */
    export class TextField extends Component implements TextSupport {
      /**
       * The `value` attribute of the input element. As the user inputs text, this property is updated live.
       */
      value: string;
      /**
       * The `type` attribute of the input element.
       */
      type: string;
      /**
       * The `size` of the text field in characters.
       */
      size: string;
      /**
       * The `pattern` attribute of input element.
       */
      pattern: string;
      /**
       * The `min` attribute of input element used with `type="number"` or `type="range"`.
       */
      min: string;
      /**
       * The `max` attribute of input element used with `type="number"` or `type="range"`.
       */
      max: string;
      /**
       * A list of properties of the view to apply as attributes. If the property is a string value, the value of that string will be applied as the attribute.
       */
      attributeBindings: any;
      /**
       * Standard CSS class names to apply to the view's outer element. This property automatically inherits any class names defined by the view's superclasses as well.
       */
      classNames: Ember.Array;
      /**
       * A list of properties of the view to apply as class names. If the property is a string value, the value of that string will be applied as a class name.
       */
      classNameBindings: Ember.Array;
      /**
       * Used to identify this view during debugging
       */
      instrumentDisplay: string;
      /**
       * Removes all children from the `parentView`.
       */
      removeAllChildren(): View;
      /**
       * DEPRECATED: 
       * Return the nearest ancestor whose parent is an instance of `klass`.
       */
      nearestChildOf(klass: any): void;
      /**
       * DEPRECATED: 
       * Return the nearest ancestor that is an instance of the provided class.
       */
      nearestInstanceOf(klass: any): void;
      /**
       * Called on your view when it should push strings of HTML into a `Ember.RenderBuffer`. Most users will want to override the `template` or `templateName` properties instead of this method.
       */
      render(buffer: RenderBuffer);
      /**
       * The action to be sent when the user presses the return key.
       */
      action: string;
      /**
       * The event that should send the action.
       */
      onEvent: string;
      /**
       * Whether the `keyUp` event that triggers an `action` to be sent continues propagating to other views.
       */
      bubbles: boolean;
      /**
       * Allows you to specify a controller action to invoke when either the `enter` key is pressed or, in the case of the field being a textarea, when a newline is inserted. To use this method, give your field an `insert-newline` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      insertNewline(event: Event);
      /**
       * Allows you to specify a controller action to invoke when the escape button is pressed. To use this method, give your field an `escape-press` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      cancel(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a field receives focus. To use this method, give your field a `focus-in` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      focusIn(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a field loses focus. To use this method, give your field a `focus-out` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      focusOut(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key is pressed. To use this method, give your field a `key-press` attribute. The value of that attribute should be the name of the action in your controller you that wish to invoke.
       */
      keyPress(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key-up event is fired. To use this method, give your field a `key-up` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      keyUp(event: Event);
      /**
       * Allows you to specify a controller action to invoke when a key-down event is fired. To use this method, give your field a `key-down` attribute. The value of that attribute should be the name of the action in your controller that you wish to invoke.
       */
      keyDown(event: Event);
      /**
       * Send an `action` with an `actionContext` to a `target`. The action, actionContext and target will be retrieved from properties of the object. For example:
       */
      triggerAction(opts: {}): boolean;
    }
    /**
     * `Ember.View` is the class in Ember responsible for encapsulating templates of HTML content, combining templates with data to render as sections of a page's DOM, and registering and responding to user-initiated events.
     */
    export class View extends CoreView {
      static isView: boolean;
      /**
       * The name of the template to lookup if no template is provided.
       */
      templateName: string;
      /**
       * The name of the layout to lookup if no layout is provided.
       */
      layoutName: string;
      /**
       * The template used to render the view. This should be a function that accepts an optional context parameter and returns a string of HTML that will be inserted into the DOM relative to its parent view.
       */
      template: Function;
      /**
       * A view may contain a layout. A layout is a regular template but supersedes the `template` property during rendering. It is the responsibility of the layout template to retrieve the `template` property from the view (or alternatively, call `Handlebars.helpers.yield`, `{{yield}}`) to render it in the correct location.
       */
      layout: Function;
      /**
       * Return the nearest ancestor that is an instance of the provided class or mixin.
       */
      nearestOfType(klass: Class,Mixin): void;
      /**
       * Return the nearest ancestor that has a given property.
       */
      nearestWithProperty(property: string): void;
      /**
       * Renders the view again. This will work regardless of whether the view is already in the DOM or not. If the view is in the DOM, the rendering process will be deferred to give bindings a chance to synchronize.
       */
      rerender();
      /**
       * Returns the current DOM element for the view.
       */
      element: DOMElement;
      /**
       * Returns a jQuery object for this view's element. If you pass in a selector string, this method will return a jQuery object, using the current element as its buffer.
       */
      $(selector: string): JQuery;
      /**
       * Appends the view's element to the specified parent element.
       */
      appendTo(A: string|DOMElement|jQuery): View;
      /**
       * Replaces the content of the specified parent element with this view's element. If the view does not have an HTML representation yet, the element will be generated automatically.
       */
      replaceIn(target: string|DOMElement|jQuery): View;
      /**
       * Appends the view's element to the document body. If the view does not have an HTML representation yet the element will be generated automatically.
       */
      append(): View;
      /**
       * Removes the view's element from the element to which it is attached.
       */
      remove(): View;
      /**
       * The HTML `id` of the view's element in the DOM. You can provide this value yourself but it must be unique (just as in HTML):
       */
      elementId: string;
      /**
       * Attempts to discover the element in the parent element. The default implementation looks for an element with an ID of `elementId` (or the view's guid if `elementId` is null). You can override this method to provide your own form of lookup. For example, if you want to discover your element using a CSS class name instead of an ID.
       */
      findElementInParentElement(parentElement: DOMElement): DOMElement;
      /**
       * Creates a DOM representation of the view and all of its child views by recursively calling the `render()` method.
       */
      createElement(): View;
      /**
       * Destroys any existing element along with the element for any child views as well. If the view does not currently have a element, then this method will do nothing.
       */
      destroyElement(): View;
      /**
       * Tag name for the view's outer element. The tag name is only used when an element is first created. If you change the `tagName` for an element, you must destroy and recreate the view element.
       */
      tagName: string;
      /**
       * The WAI-ARIA role of the control represented by this view. For example, a button may have a role of type 'button', or a pane may have a role of type 'alertdialog'. This property is used by assistive software to help visually challenged users navigate rich web applications.
       */
      ariaRole: string;
      /**
       * Removes the view from its `parentView`, if one is found. Otherwise does nothing.
       */
      removeFromParent(): View;
      /**
       * You must call `destroy` on a view to destroy the view (and all of its child views). This will remove the view from any parent node, then make sure that the DOM element managed by the view can be released by the memory manager.
       */
      destroy();
      /**
       * Global views hash
       */
      static views: {};
    }
  }
  export namespace A Suite can be used to define a reusable set of unit tests that can be
applied to any object {
    export namespace   Suites are most useful for defining tests that
work against a mixin or plugin API {
      export namespace   Developers implementing objects that
use the mixin or support the API can then run these tests against their
own code to verify compliance {
        export namespace 

To define a suite, you need to define the tests themselves as well as a
callback API implementers can use to tie your tests to their specific class {
          export namespace 

## Defining a Callback API

To define the callback API, just extend this class and add your properties
or methods that must be provided {
            export namespace   Use Ember {
              export namespace required() placeholders for
any properties that implementers must define themselves {
                export namespace 

## Defining Unit Tests

To add unit tests, use the suite {
                  export namespace module() or suite {
                    export namespace test() methods instead
of a regular module() or test() method when defining your tests {
                      export namespace   This will
add the tests to the suite {
                        export namespace 

## Using a Suite

To use a Suite to test your own objects, extend the suite subclass and
define any required methods {
                          export namespace   Then call run() on the new subclass {
                            export namespace   This
will create an instance of your class and then defining the unit tests {
                              export class  extends Ember.Object {
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * A lightweight container used to instantiate and cache objects.
   */
  export class Container {
    cache: InheritingDict;
    factoryCache: InheritingDict;
    validationCache: InheritingDict;
    /**
     * Given a fullName return a corresponding instance.
     */
    lookup(fullName: string, options: {}): any;
    /**
     * Given a fullName return the corresponding factory.
     */
    lookupFactory(fullName: string): any;
    /**
     * A depth first traversal, destroying the container, its descendant containers and all their managed objects.
     */
    destroy();
    /**
     * Clear either the entire cache or just the cache for a particular key.
     */
    reset(fullName: string);
  }
  /**
   * A lightweight registry used to store factory and option information keyed by type.
   */
  export class Registry {
    /**
     * A backup registry for resolving registrations when no matches can be found.
     */
    fallback: Registry;
    resolver: function;
    registrations: InheritingDict;
    /**
     * Creates a container based on this registry.
     */
    container(options: {}): Container;
    /**
     * Registers a factory for later injection.
     */
    register(fullName: string, factory: Function, options: {});
    /**
     * Unregister a fullName
     */
    unregister(fullName: string);
    /**
     * Given a fullName return the corresponding factory.
     */
    resolve(fullName: string): Function;
    /**
     * A hook that can be used to describe how the resolver will attempt to find the factory.
     */
    describe(fullName: string): string;
    /**
     * A hook to enable custom fullName normalization behaviour
     */
    normalizeFullName(fullName: string): string;
    /**
     * normalize a fullName based on the applications conventions
     */
    normalize(fullName: string): string;
    makeToString(factory: any, fullName: string): Function;
    /**
     * Given a fullName check if the container is aware of its factory or singleton instance.
     */
    has(fullName: string): boolean;
    /**
     * Allow registering options for all factories of a type.
     */
    optionsForType(type: string, options: {});
    options(fullName: string, options: {});
    /**
     * Defines injection rules.
     */
    injection(factoryName: string, property: string, injectionName: string);
    /**
     * Defines factory injection rules.
     */
    factoryInjection(factoryName: string, property: string, injectionName: string);
  }
  /**
   * Wraps an Handlebars helper with an HTMLBars helper for backwards compatibility.
   */
  export class HandlebarsCompatibleHelper {
  }
  export interface String {
    /**
     * Mark a string as being safe for unescaped output with Handlebars.
     */
    htmlSafe(): Handlebars.SafeString;
    /**
     * See [Ember.String.fmt](/api/classes/Ember.String.html#method_fmt).
     */
    fmt();
    /**
     * See [Ember.String.w](/api/classes/Ember.String.html#method_w).
     */
    w();
    /**
     * See [Ember.String.loc](/api/classes/Ember.String.html#method_loc).
     */
    loc();
    /**
     * See [Ember.String.camelize](/api/classes/Ember.String.html#method_camelize).
     */
    camelize();
    /**
     * See [Ember.String.decamelize](/api/classes/Ember.String.html#method_decamelize).
     */
    decamelize();
    /**
     * See [Ember.String.dasherize](/api/classes/Ember.String.html#method_dasherize).
     */
    dasherize();
    /**
     * See [Ember.String.underscore](/api/classes/Ember.String.html#method_underscore).
     */
    underscore();
    /**
     * See [Ember.String.classify](/api/classes/Ember.String.html#method_classify).
     */
    classify();
    /**
     * See [Ember.String.capitalize](/api/classes/Ember.String.html#method_capitalize).
     */
    capitalize();
  }
  /**
   * Helper class that allows you to register your library with Ember.
   */
  export class Libraries {
  }
  export class Backburner {
  }
  export interface Function {
    /**
     * The `property` extension of Javascript's Function prototype is available when `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Function` is `true`, which is the default.
     */
    property();
    /**
     * The `observes` extension of Javascript's Function prototype is available when `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Function` is true, which is the default.
     */
    observes();
    /**
     * The `observesImmediately` extension of Javascript's Function prototype is available when `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Function` is true, which is the default.
     */
    observesImmediately();
    /**
     * The `observesBefore` extension of Javascript's Function prototype is available when `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Function` is true, which is the default.
     */
    observesBefore();
    /**
     * The `on` extension of Javascript's Function prototype is available when `Ember.EXTEND_PROTOTYPES` or `Ember.EXTEND_PROTOTYPES.Function` is true, which is the default.
     */
    on();
  }
  /**
   * An HTMLBars AST transformation that replaces all instances of
   */
  export class TransformEachInToHash {
  }
  /**
   * An HTMLBars AST transformation that replaces all instances of
   */
  export class TransformWithAsToHash {
  }
  export default Ember
}
