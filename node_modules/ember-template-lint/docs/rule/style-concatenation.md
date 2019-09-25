## style-concatenation

Ember has a runtime warning that says:

> Binding style attributes may introduce cross-site scripting vulnerabilities; please ensure that values being bound are properly escaped.

This warning can only be avoided by marking the bound value with `Ember.String.htmlSafe`. While we can't always detect statically if you're providing a safe string, we can detect and forbid common cases where it's impossible that you're doing so.

Common cases which do not propagate `htmlSafe` include:

* Implied string concatenation using quotes
* The `concat` helper

This rule **forbids** the following:

```hbs
<div style="background-image: url({{url}})">
```

```hbs
<div style="{{background-image url}}">
```

```hbs
<div style={{concat knownSafeStyle1 ";" knownSafeStyle2}}>
```

This rule **allows** the following:

```hbs
<div style={{html-safe (concat "background-image: url(" url ")")}}>
```

```hbs
<div style={{background-image url}}>

{{! Presumably, `background-image` is a helper which returns an `htmlSafe` style string. }}
```

```hbs
<div style={{html-safe (concat knownSafeStyle1 ";" knownSafeStyle2)}}>
```

### References

* See the [Binding Style Attributes](https://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes) Ember deprecation documentation
* See the [documentation](https://www.emberjs.com/api/ember/release/functions/@ember%2Ftemplate/htmlSafe) for Ember's `htmlSafe` function
* See the [documentation](https://www.emberjs.com/api/ember/release/classes/Ember.Templates.helpers/methods/concat?anchor=concat) for Ember's `concat` handlebars template helper
* See the [documentation](https://github.com/romulomachado/ember-cli-string-helpers#html-safe) for the `html-safe` handlebars template helper from the `ember-cli-string-helpers` addon

### Related Rules

* [no-inline-styles](no-inline-styles.md)
