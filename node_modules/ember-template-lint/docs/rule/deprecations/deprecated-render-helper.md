## deprecated-render-helper

In Ember 2.6 and newer, support for using the `{{render}}` helper has been deprecated.

This rule **forbids** the following:

```hbs
{{render 'this-is-bad'}}

{{render 'also-bad' model}}
```

This rule **allows** the following:

```hbs
{{this-is-better}}

{{saul-goodman model=model}}
```

### References

* More information is available at the [Deprecation Guide](https://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper).
