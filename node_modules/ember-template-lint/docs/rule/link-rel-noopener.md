## link-rel-noopener

When you want to link to an external page from your app, it is very common to use `<a href="url" target="_blank"></a>`
to make the browser open this link in a new tab.

However, this practice has [performance problems](https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/)
and also opens a door to some security attacks because the opened page can redirect the opener app
to a malicious clone to perform phishing on your users.

Adding `rel="noopener noreferrer"` closes that door and avoids javascript in the opened tab to block the main
thread in the opener. Also note that Firefox versions prior 52 do not implement `noopener`, so `rel="noreferrer"` should be used instead ([see Firefox issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1222516)).

This rule **forbids** the following:

```hbs
<a href="https://i.seem.secure.com" target="_blank">I'm a bait</a>
```

This rule **allows** the following:

```hbs
<a href="https://i.seem.secure.com" target="_blank" rel="noopener noreferrer">I'm a bait</a>
```

### Configuration

The following values are valid configuration:

  * string -- `strict` for enabled and validating both noopener `and` noreferrer
  * boolean `true` to maintain backwards compatibility with previous versions of `ember-template-lint` that validate noopener `or` noreferrer
  If you are supporting Firefox, you should use `strict`.

### References

* [Link type "noreferrer"](https://html.spec.whatwg.org/multipage/semantics.html#link-type-noreferrer) spec
