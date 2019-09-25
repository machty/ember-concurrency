## no-invalid-interactive

Adding interactivity to an element that is not naturally interactive content leads to a very poor experience for
users of assistive technology (i.e. screen readers). In order to ensure that screen readers can provide useful information to their users, we should add an appropriate `role` attribute when the underlying element would not have made that role obvious.

This rule **forbids** the following:

```hbs
<div {{action 'foo'}}></div>
```

This rule **allows** the following:

```hbs
<div role="button" {{action "foo"}}></div>
```

### Configuration

The following values are valid configuration (same as the `no-nested-interactive` rule above):

  * boolean -- `true` indicates all whitelist test will run, `false` indicates that the rule is disabled.
  * object - Containing the following values:
    * `ignoredTags` - An array of element tag names that should be whitelisted. Default to `[]`.
    * `ignoreTabindex` - When `true` tabindex will be ignored. Defaults to `false`.
    * `ignoreUsemapAttribute` - When `true` ignores the `usemap` attribute on `img` and `object` elements. Defaults `false`.
    * `additionalInteractiveTags` - An array of element tag names that should also be considered as interactive. Defaults to `[]`.
