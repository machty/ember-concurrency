## deprecated-each-syntax

In Ember 2.0, support for using the `in` form of the `{{#each}}` helper
has been removed.

This rule **forbids** the following:

```hbs
{{#each post in posts}}
  <li>{{post.name}}</li>
{{/each}}
```

This rule **allows** the following:

```hbs
{{#each posts as |post|}}
  <li>{{post.name}}</li>
{{/each}}
```

### References

* More information is available at the [Deprecation Guide](http://emberjs.com/deprecations/v1.x/#toc_code-in-code-syntax-for-code-each-code).
