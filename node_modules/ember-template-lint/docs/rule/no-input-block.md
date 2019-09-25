## no-input-block

Use of the block form of the handlebars `input` helper will result in an error at runtime.

This rule **forbids** the following:

```hbs
{{#input}}Some Content{{/input}}
```

This rule **allows** the following:

```hbs
{{input type="text" value=this.firstName disabled=this.entryNotAllowed size="50"}}
```
