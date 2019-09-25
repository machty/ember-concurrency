## require-valid-alt-text

Enforce that all elements that require alternative text have meaningful information to relay back to the end user. This is a critical component of accessibility for screenreader users in order for them to understand the content's purpose on the page. By default, this rule checks for alternative text on the following elements: `<img>`, `<area>`, `<input type="image">`, and `<object>`.

Enforce `img` alt attribute does not contain the word image, picture, or photo. Screenreaders already announce `img` elements as an image. There is no need to use words such as *image*, *photo*, and/or *picture*. The rule will first check if `aria-hidden` is true to determine whether to enforce the rule. If the image is hidden, then rule will always succeed.

This rule **forbids** the following:

### `<img>`

An `<img>` must have the `alt` attribute. It must have either meaningful text, or be an empty string. If it is an empty string, the `<img>` element tag must also have `role="presentation"` or `role="none"`.

The content of an `alt` attribute is used to calculate the machine-readable label of an element, whereas the text content is used to produce a label for the element. For this reason, adding a label to an icon can produce a confusing or duplicated label on a control that already has appropriate text content.

If it's not a meaningful image, it should have an empty alt attribute value and have the role of presentation or none.

`img` alt attribute does not contain the word image, picture, or photo. Screenreaders already announce `img` elements as an image. There is no need to use words such as *image*, *photo*, and/or *picture*.


This rule **forbids** the following:

```hbs
<img src="rwjblue.png">
<img src="foo" alt="Photo of foo being weird." />
<img src="bar" alt="Image of me at a bar!" />
<img src="baz" alt="Picture of baz fixing a bug." />
```

This rule **allows** the following:

```hbs
<img src="rwjblue.png" alt="A man standing in front of a room of people, giving a presentation about Ember.">
<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" /> // Will pass because it is hidden.
<img src="baz" alt="Baz taking a {{photo}}" /> // This is valid since photo is a variable name.
```

### `<object>`

Add alternative text to all embedded `<object>` elements using either inner text, setting the `title` prop, or using the `aria-label` or `aria-labelledby` props.

This rule **forbids** the following:

```hbs
<object width="128" height="256"></object>
```

This rule **allows** the following:

```hbs
<object width="128" height="256" title="Middle-sized"></object>
<object width="128" height="256" aria-label="Middle-sized"></object>
<object width="128" height="256" aria-labelledby="id-12345"></object>
```

### `<input type="image">`

All `<input type="image">` elements must have a non-empty `alt` prop set with a meaningful description of the image or have the `aria-label` or `aria-labelledby` props set.

This rule **forbids** the following:

```hbs
<input type="image">
```

This rule **allows** the following:

```hbs
<input type="image" alt="Select image to upload">
```

### `<area>`

All clickable `<area>` elements within an image map have an `alt`, `aria-label` or `aria-labelledby` prop that describes the purpose of the link.

This rule **forbids** the following:

```hbs
<area shape="poly" coords="113,24,211,0" href="inform.html">
```

This rule **allows** the following:

```hbs
<area shape="poly" coords="113,24,211,0" href="inform.html" alt="Inform">
```

### References

* See [WCAG Technique- using alt attributes on img elements](https://www.w3.org/TR/WCAG20-TECHS/H37.html)
* Ref [WCAG Criterion 1.1.1 - Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
* Red [HTML 5.2 spec - the img element](https://www.w3.org/TR/html5/semantics-embedded-content.html#the-img-element)
