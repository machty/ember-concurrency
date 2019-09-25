## deprecated-inline-view-helper

In Ember 1.12, support for invoking the inline View helper was deprecated.

This rule **forbids** the following:

```hbs
{{view 'this-is-bad'}}

{{view.also-bad}}

{{qux-qaz please=view.stop}}

{{#not-this please=view.stop}}{{/not-this}}

<div foo={{view.bar}}></div>
```

This rule **allows** the following:

```hbs
{{this-is-better}}

{{qux-qaz this=good}}

{{#ok-this yay=nice}}{{/ok-this}}

<div foo={{bar}}></div>
```

### References

* More information is available at the [Deprecation Guide](http://emberjs.com/deprecations/v1.x/#toc_ember-view).
