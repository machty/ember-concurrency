## require-iframe-title

### `<iframe>`

`<iframe>` elements must have a unique title property to indicate its content to the user.

This rule takes no arguments.

This rule **allows** the following:

```hbs
<iframe title="This is a unique title" />
<iframe title={{someValue}} />
```

This rule **forbids** the following:

```hbs
<iframe />
<iframe title="" />
```

### References

- [Deque University](https://dequeuniversity.com/rules/axe/1.1/frame-title)
- [Technique H65: Using the title attribute of the frame and iframe elements](https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/H64)
- [WCAG Success Criterion 2.4.1 - Bypass Blocks](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html)
- [WCAG Success Criterion 4.1.2 - Name, Role, Value](https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html)