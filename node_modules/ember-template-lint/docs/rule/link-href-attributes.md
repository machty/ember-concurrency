## link-href-attributes

It's common to treat anchor tags as buttons. However, this is typically considered bad practice, as an anchor tag without an `href` is unfocusable which breaks accessibility.

This rule **forbids** the following:

```hbs
<a>I'm a fake link</a>
<a {{action 'handleClick'}}>I'm a fake link</a>
```

This rule **allows** the following:

```hbs
<a href="https://alink.com">I'm a real link</a>
```
