# glimmer-di [![Build Status](https://secure.travis-ci.org/glimmerjs/glimmer-di.svg?branch=master)](http://travis-ci.org/glimmerjs/glimmer-di)

Dependency injection for Glimmer applications.

## What is Dependency Injection?

Dependency injection is a pattern that increases the flexibility, testability
and consistency of your code.

The three key ideas are:

1. An object's dependencies (that is, the other objects it needs to do its job)
   should be provided to the object when it is created, rather than hard-coded.
2. A dependency may have multiple implementations, so long as each
   implementation adheres to an agreed-upon interface.
3. An object using a dependency shouldn't care where on the filesystem that
   dependency comes from.

Let's look at a short example that **does not** use dependency injection. We'll
write a hypothetical server that renders a short HTML document when an incoming
request is received:

```js
import HTTPServer from "./servers/http";

export default class HelloWorldServer {
  constructor() {
    let server = new HTTPServer({
      port: 80
    });

    server.on('request', req => {
      req.write("<html><body>Hello, world!</body></html>");
    });
  }
}
```

This is great, but there's one problem. As you can see, our Hello World server
is importing the HTTP library directly. If we want to support both HTTP and
HTTP/2 (or even something like a WebSocket), this code is not reusable.

We would have to either duplicate this code, or add some configuration options
to let the user tell us which protocol they want to use. Of course, that would
work today, but if we wanted to support HTTP/3 in the future, we'd have to come
back and add a new configuration option for every new protocol.

What if, instead of telling the server what protocol to use, we could instead
provide it with an object that encapsulated all of those concerns?

Instead of having our `HelloWorldServer` import and instantiate `HTTPServer`
directly, we can provide it with an object that we guarantee implements the same
interface. In this case, that means any object that emits a `'request'` event
and supports adding an event listener with the `on()` method.

Let's look at what that updated example might look like:

```js
export default class HelloWorldServer {
  constructor(server) {
    server.on('request', req => {
      req.write("<html><body>Hello, world!</body></html>");
    });
  }
}
```

Now we're no longer concerned with instantiating and configuring an HTTP server.
All we have to know is that whatever object gets passed to our class has an
`on()` method that lets us add an event listener.

Now, let's look at a few different ways we can use our newly improved Hello
World server.

```js
import HelloWorldServer from "./hello-world-server";
import HTTPServer from "./servers/http";
import HTTP2Server from "./servers/http2";
import WebSocketServer from "./servers/web-socket";

// HTTP 1
let httpServer = new HTTPServer({
  port: 80
});
new HelloWorldServer(httpServer);

// HTTP 2
let http2Server = new HTTP2Server({
  port: 4200
});
new HelloWorldServer(http2Server);

// WebSocket
let wsServer = new WebSocketServer();
new HelloWorldServer(wsServer);
```

With that one small change, we've dramatically improved the reusability and
flexibility of our Hello World server. It can now handle any protocol, even ones
that didn't exist when it was written, so long as they can be adapted to follow
the simple interface we've defined.

This idea may seem simple, but it has profound implications for managing the
complexity of your code as your application grows. And it means that you can
swap in different pieces of code easily depending on the environment.

For example, in unit tests we may want to swap in some stub objects to verify
some behavior. Dependency injection makes it easy and avoids having to override
global values.

We can also make it possible to run the same application on both Node.js and the
browser, by swapping in one piece of framework code when you have a full DOM
implementation and another implementation when you don't.

While dependency injection is just a simple pattern, it helps to have that
pattern formalized into code. That's exactly what this library does: implement
an incredibly lightweight version of dependency injection, with some utilities
to help us clean up after ourselves when we're done running the app.

## Containers and Registries

The two core parts of the Glimmer DI system are the `Registry` and the `Container`.

Here's how to remember the role of each:

1. The `Registry` is where you **register** code (that is, JavaScript classes).
2. The `Container` **contains** objects, and is where you request instances of
   registered classes.

If that sounds confusing, let's look at an example that should make it
clearer.

Let's say I have a class for a UI component that I want to make available to the
system. The first thing I would do is create a new `Registry` instance and tell
it about my class.

```js
import { Registry } from '@glimmer/di';
import ProfileComponent from './components/profile';

let registry = new Registry();
registry.register('component:profile', ProfileComponent);
```

You probably noticed the string that we're passing to the `register` method:
`'component:profile'`. This is what we call a _specifier_, which is a unique
identifier for a class. They take the form of `${type}:${name}`. In this case,
we have a UI component called `Profile` so its specifier would be
`'component:profile'`. If instead we had an blog post model, its specifier might
be `'model:blog-post'`.

So now we've told the `Registry` about our component. Let's get an instance of
that component now. To do that, we'll need to create a new `Container`, tell it
about our registry, and then ask it for the component we want:

```js
import { Container } from '@glimmer/di';

// Create the container and pass in the registry we previously created.
let container = new Container(registry);
let component = container.lookup('component:profile');
```

Now our `component` variable contains an instance of the previously-registered
profile component.

### Singletons

One important thing to note is that (by default) every time you call the
`lookup` method, you'll get the same instance of the component:

```js
let component1 = container.lookup('component:profile');
let component2 = container.lookup('component:profile');

component1 === component2; // => true
```

But that's not the behavior we want: in an app, you need to be able to create
many instances of the same component.

In this case, we want to change the default behavior and tell the registry that
we should always get a _new_ instance when we call
`lookup('component:profile')`:

```js
registry.registerOption('component:profile', 'singleton', false);
```

Here, we've set the `singleton` option to `false` for this component. We could
have also configured this setting back when we originally registered the component:

```js
registry.register('component:profile', ProfileComponent, {
  singleton: false
});
```

Now if we lookup multiple components, we'll get a different instance each time:

```js
let component3 = container.lookup('component:profile');
let component4 = container.lookup('component:profile');

component3 === component4; // => false
```

### Injections

So far, this doesn't seem to offer any benefits over just instantiating the
class ourselves whenever we need a new instance. Let's look at one of the killer
features: injections.

An _injection_ is a rule that tells the container to automatically give one object
access to another.

For example, let's imagine we have a centralized data store that we want to make
available to all of our components, so they can retrieve model data over the
network. Without worrying about how components get created in our framework, we
just want to say: "every time a new component is instantiated, make sure it has
access to the data store."

We can set this up automatically with an injection. First, let's register the
data store with the registry:

```js
import DataStore from "./data/store";

registry.register('store:main', DataStore);
```

Because we want components to share a single store instance, note that we didn't
disable the default `singleton` setting. For the whole app, there will be just
one store.

(If there's only one instance of a particular type in an app, we often call it
`main`. In this case, because there's one store and it's a singleton, its
specifier is `store:main`. There's nothing special about this name, though; it's
just a common convention.)

Next, we'll create a rule that tells the registry that new components should be
provided with the data store instance:

```js
registry.registerInjection('component', 'store', 'store:main');
```

Let's look at each of these arguments to `registerInjection`. Each one helps define part
of the injection rule. In this case, it means:

1. For every new `component` created,
2. Set its `store` property to
3. The instance of `store:main`

In other words, every time `container.lookup('component:profile')` gets called,
something like this is happening under the hood:

```js
let store = container.lookup('store:main');
return ProfileComponent.create({ store });
```

The nice thing about injections is that we can set up a rule once and not worry
about the details of where and how instances actually get created. This
separation of concerns allows for less brittle code.

You've also now seen why specifiers contain information about both name and
type. Injections let us specify rules that apply to all instances of a
component, say, without having to repeat that rule for every component in the
system.

## Resolvers: Mapping to the File System

So far, we've always had to tell the `Registry` about a class before we're able
to get an instance from the `Container`. But if we're being good developers, and
organizing our code well and being consistent in our naming, shouldn't our app
be able to find our classes automatically?

That's exactly what the `Resolver` helps us do. With a resolver, we can define
rules that map specifiers (like `component:profile`) on to module names (like
`app/components/profile.js`).

A simple `Resolver` implements a single method, `retrieve()`, which takes a
specifier and returns the associated class.

Lets write a resolver that will load the component class using CommonJS instead of
having to eagerly register every component in our app:

```js
class Resolver {
  retrieve(specifier) {
    let [type, name] = specifier.split(':');

    if (type !== 'component') { throw new Error("Unsupported type"); }
    return require(`./app/${type}s/${name}.js`);
  }
}

let registry = new Registry();
let resolver = new Resolver();
let container2 = new Container(registry, resolver);

// Make sure components aren't singletons
registry.registerOption('component', 'singleton', false);

// Requires and instantiates `./app/components/admin-page.js`:
let adminPage = container2.lookup('component:admin-page');
```

Note that `retrieve()` *must* return synchronously. Your module loader therefore
must return synchronously, as it does in this CommonJS example. If you're using an
asynchronous module loader, you'll need to make sure modules are loaded before you
start instantiating objects.

As a general rule, this package is designed to be synchronous to achieve maximum
performance; it is your responsibility to ensure that code is ready before it is
needed.

One last thing: you may have noticed that the container in this example has both
a registry and a resolver. The container will look for classes in both, but the
registry always takes precedence. If the registry is empty, the container will
fall back to asking the resolver for its help.

## Acknowledgements

Thanks to [Monegraph](http://monegraph.com) and
[Cerebris](http://www.cerebris.com) for funding the initial development of this
library.

## License

MIT License.
