## no-debugger

The `{{debugger}}` helper is equivalent to a JavaScript `debugger` statement. This will halt execution if the browser developer tools are open. That is undesirable in a production environment.

This rule **forbids** the following:

```hbs
{{debugger}}
```

### References

* Ember's template [Development Helpers](https://guides.emberjs.com/release/templates/development-helpers/) guide
* Ember's template [debugger](https://www.emberjs.com/api/ember/release/classes/Ember.Templates.helpers/methods/if?anchor=debugger) helper documentation
