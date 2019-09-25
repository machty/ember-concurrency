## no-element-event-actions

Using HTML element event properties such as `onclick` for Ember actions is not recommended for the following reasons:

* It doesn't work for SVGs (since there is no `onclick` property of `SVGElement`).
* It can lead to confusing and unexpected behavior when mixed with normal action usage. For a comprehensive explanation of why, read [Deep Dive on Ember Events].

The recommended alternative is the `on` modifier. `on` is available in Ember 3.11+ and by [polyfill](https://github.com/buschtoens/ember-on-modifier) for earlier versions.

This rule **forbids** the following:

```hbs
<button onclick={{action "submit"}}>Submit</button>
```

This rule **allows** the following:

```hbs
<button {{on 'click' this.submit}}>Submit</button>
```

### References

* [Documentation](https://guides.emberjs.com/release/templates/actions/) for template actions
* [Polyfill](https://github.com/buschtoens/ember-on-modifier) for the `on` modifier (needed below Ember 3.11)
* [Spec](http://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/fn?anchor=on) for the `on` modifier
* [Spec](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/action?anchor=action) for the `action` modifier
* [List of DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events)
* [Deep Dive on Ember Events]

[Deep Dive on Ember Events]: https://medium.com/square-corner-blog/deep-dive-on-ember-events-cf684fd3b808

### Related Rules

* [no-action-modifiers](no-action-modifiers.md)
