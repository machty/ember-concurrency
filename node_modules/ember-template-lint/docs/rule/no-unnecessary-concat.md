## no-unnecessary-concat

This rule forbids unnecessary use of quotes (`""`) around expressions like `{{myValue}}`.

This rule **forbids** the following:

```hbs
<span class="{{if errors.length 'text-danger' 'text-grey'}}">

<img src="{{customSrc}}" alt="{{customAlt}}">

<label for="{{concat elementId "-date"}}">
```
This rule **allows** the following:

```hbs
<span class={{if errors.length 'text-danger' 'text-grey'}}>

<img src={{customSrc}} alt={{customAlt}}>

<label for={{concat elementId "-date"}}>
```

### Migration

Use regexp find-and-replace to fix existing violations of this rule:

| Before | After |
| --- | --- |
| `="{{([^}]+)}}"` | `={{$1}}` |
