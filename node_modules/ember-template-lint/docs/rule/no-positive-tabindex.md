## no-positive-tabindex

### `<* tabindex>`

Avoid positive tabIndex property values to synchronize the flow of the page with keyboard tab order.

This rule takes no arguments.

This rule **allows** the following:

```hbs
<span tabindex="0">foo</span>
<span tabindex="-1">bar</span>
<span tabindex={{0}}>baz</span>
```

This rule **forbids** the following:

```hbs
<span tabindex="5">foo</span>
<span tabindex="3">bar</span>
<span tabindex={{dynamicValue}}>zoo</span>
<span tabindex="1">baz</span>
<span tabindex="2">never really sure what goes after baz</span>
```

### References
1. [AX_FOCUS_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03)
1. [w3.org/TR/wai-aria-practices/#kbd_general_between](https://www.w3.org/TR/wai-aria-practices/#kbd_general_between)
1. [w3.org/TR/2009/WD-wai-aria-practices-20090224/#focus_tabindex](https://www.w3.org/TR/2009/WD-wai-aria-practices-20090224/#focus_tabindex)