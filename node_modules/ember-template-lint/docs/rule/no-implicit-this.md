## no-implicit-this

This rule aides in the migration path for [emberjs/rfcs#308](https://github.com/emberjs/rfcs/pull/308).

### Motivation

Currently, the way to access properties on a components class is `{{greeting}}`
from a template. This works because the component class is one of the objects
we resolve against during the evaluation of the expression.

The first problem with this approach is that the `{{greeting}}` syntax is
ambiguous, as it could be referring to a local variable (block param), a helper
with no arguments, a closed over component, or a property on the component
class.

#### Exemplar

Consider the following example where the ambiguity can cause issues:

You have a component class that looks like the following component and
template:

```js
import Component from '@ember/component';
import computed from '@ember/computed';

export default Component.extend({
  formatName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  });
});
```

```hbs
<h1>Hello {{formatName}}!</h1>
```

Given `{ firstName: 'Chad', lastName: 'Hietala' }`, Ember will render the
following:

```html
<h1>Hello Chad Hietala!</h1>
```

Now some time goes on and someone adds a `formatName` helper at
`app/helpers/formatName.js` that looks like the following:

```js
export default function formatName([firstName, lastName]) {
  return `${firstName} ${lastName}`;
}
```

Due to the fact that helpers take precedence over property lookups, our
`{{formatName}}` now resolves to a helper. When the helper runs it doesn't have
any arguments so our template now renders the following:

```html
<h1>Hello !</h1>
```

This can be a refactoring hazard and can often lead to confusion for readers of
the template. Upon encountering `{{greeting}}` in a component's template, the
reader has to check all of these places: first, you need to scan the
surrounding lines for block params with that name; next, you check in the
helpers folder to see if there is a helper with that name (it could also be
coming from an addon!); finally, you check the component's JavaScript class to
look for a (computed) property.

Like
[RFC#0276](https://github.com/emberjs/rfcs/blob/master/text/0276-named-args.md)
made argument usage explicit through the `@` prefix, the `this` prefix will
resolve the ambiguity and greatly improve clarity, especially in big projects
with a lot of files (and uses a lot of addons).

As an aside, the ambiguity that causes confusion for human readers is also a
problem for the compiler. While it is not the main goal of this proposal,
resolving this ambiguity also helps the rendering system. Currently, the
"runtime" template compiler has to perform a helper lookup for every
`{{greeting}}` in each template. It will be able to skip this resolution
process and perform other optimizations (such as reusing the internal
[reference](https://github.com/glimmerjs/glimmer-vm/blob/master/guides/04-references.md)
object and caches) with this addition.

Furthermore, by enforcing the `this` prefix, tooling like the [Ember Language
Server](https://github.com/emberwatch/ember-language-server) does not need to
know about fallback resolution rules. This makes common features like ["Go To
Definition"](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition)
much easier to implement since we have semantics that mean "property on class".

### Configuration

 The following values are valid configuration:

  * boolean - `true` to enable / `false` to disable
  * object -- An object with the following keys:
    * `allow` -- An array of component / helper names for that may be called
      without arguments (string or regular expression)
