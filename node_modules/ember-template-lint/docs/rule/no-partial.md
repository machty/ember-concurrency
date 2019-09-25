## no-partial

Partials are a legacy hold over from the days in which Ember had little to no mechanism for sharing "template snippets". Today, we can use "contextual components" (and soon "named blocks"), which serves the original need for partials.

In addition to having a better solution for the original problem, there are also a number of issues with partials:

* The `partial` helper is essentially an `eval`, which means that Ember's template rendering system can make little to no optimizations
* The `partial` helper provides the partial template with unrestricted access to the local scope which leads to extreme confusion and "scope creep", as it's not clear what data/actions are coming in and out

This rule **forbids** the following:

```hbs
{{partial "foo"}}
```
