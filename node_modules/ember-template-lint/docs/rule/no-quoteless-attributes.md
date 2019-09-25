## no-quoteless-attributes

In HTML, all attribute values are considered strings, regardless of whether they are quoted or not.

The following two examples are _identical_ from the perspective of the browser:

```html
<div data-foo=asdf></div>
<div data-foo="asdf"></div>
```

This fact makes the following HTML very confusing:

```html
<input disabled=false>
```

In this case, the simple _presence_ of the `disabled` attribute means that the `<input>` is disabled and setting the value to `false` doesn't do the obvious thing.

This is just _one_ (of many) cases where the default "string" based parsing of attributes in HTML can trip folks up.

This rule attempts to make this situation _slightly_ better by at least ensuring that all attribute values are quoted. This obviously doesn't fix the :troll:y nature of HTML here but it does ensure that you still **see** the quotes (which should hopefully help remind you that these are strings and not values).

This rule **forbids** the following (note that `someValue` could have been intended either as a string or expression):

```html
<div data-foo=someValue></div>
```

This rule **allows** the following:

```html
<div data-foo="someValue"></div>
```

```hbs
<div data-foo={{someValue}}></div>
```
