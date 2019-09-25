## no-extra-mut-helper-argument

A common mistake when using the Ember handlebars template `mut(attr)` helper is to pass an extra `value` parameter to it when only `attr` should be passed. Instead, the `value` should be passed outside of `mut`.

This rule **forbids** the following:

```hbs
{{my-component click=(action (mut isClicked true))}}
```

This rule **allows** the following:

```hbs
{{my-component click=(action (mut isClicked) true)}}
```

### References

* See the [documentation](https://emberjs.com/api/ember/release/classes/Ember.Templates.helpers/methods/mut?anchor=mut) for the Ember handlebars template `mut` helper
