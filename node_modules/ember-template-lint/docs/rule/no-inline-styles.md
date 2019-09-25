## no-inline-styles

Inline styles are not the best practice because they are hard to maintain and usually make the overall size of the project bigger. This rule forbids inline styles. Use CSS classes instead.

This rule **forbids** the following:

```hbs
<div style="width:900px"></div>
```

This rule **allows** the following:

```hbs
<div class="wide-element"></div>
```

```hbs
{{! only allowed when `allowDynamicStyles` is enabled }}
<div style={{html-safe (concat "background-image: url(" url ")")}}></div>
```

### Configuration

 The following values are valid configuration:

  * boolean - `true` to enable / `false` to disable
  * object -- An object with the following keys:
    * `allowDynamicStyles` -- Whether dynamically-generated inline styles should be allowed (defaults to `false`)

### Related Rules

* [style-concatenation](style-concatenation.md)
