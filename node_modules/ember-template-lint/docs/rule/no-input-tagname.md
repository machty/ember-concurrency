## no-input-tagname

`{{input tagName=x}}` will result in obtuse errors. Typically, the input will simply fail to render, whether used in block form or inline. The only valid `tagName` for the input helper is `input`. For `textarea`, `button`, and other input-like elements, you should instead create a new component or better use the DOM!

This rule **forbids** the following:

```hbs
{{input tagName="foo"}}
{{input tagName=X}}
{{component "input" tagName="foo"}}
{{component "input" tagName=X}}
{{yield (component "input" tagName="foo")}}
{{yield (component "input" tagName=X)}}
```
