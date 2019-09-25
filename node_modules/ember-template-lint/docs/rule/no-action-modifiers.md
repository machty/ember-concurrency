## no-action-modifiers

This rule forbids the use of `{{action}}` modifiers on elements.

The recommended alternative is the `on` modifier. `on` is available in Ember 3.11+ and by [polyfill](https://github.com/buschtoens/ember-on-modifier) for earlier versions.

This rule **forbids** the following:

```hbs
<button {{action 'submit'}}>Submit</button>
```

This rule **allows** the following:

```hbs
<button {{on 'click' this.submit}}>Submit</button>
```

### Configuration

The following values are valid configuration:

  * boolean -- `true` for enabled / `false` for disabled
  * array -- an array of whitelisted element tag names, which will accept action modifiers

### References

* [Documentation](https://guides.emberjs.com/release/templates/actions/) for template actions
* [Polyfill](https://github.com/buschtoens/ember-on-modifier) for the `on` modifier (needed below Ember 3.11)
* [Spec](http://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/fn?anchor=on) for the `on` modifier
* [Spec](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/action?anchor=action) for the `action` modifier

### Related Rules

* [no-element-event-actions](no-element-event-actions.md)
