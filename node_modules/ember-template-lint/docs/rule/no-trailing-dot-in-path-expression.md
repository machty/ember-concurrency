## no-trailing-dot-in-path-expression

This rule doesn't allow trailing dot(s) on a path expression. Since the trailing dot is treated as a separate path expression which represents the context associated to the template.

For instance:

```hbs
{{! application.hbs }}

<span class={{if contact. 'bg-success'}}>{{contact.name}}</span>
```

is interpreted as

```hbs
{{! application.hbs }}

<span class={{if contact . 'bg-success'}}>{{contact.name}}</span>
```

hence results in

```html
<span class="<my-app@controller:application::ember223>">John</span>
```

This rule **forbids** the following:

```hbs

{{contact.contact_name.}}

{{#if contact.contact_name.}}
  {{displayName}}
{{/if}}

{{if. contact.contact_name}}
  {{displayName}}
{{/if}}

{{contact-details contact=(hash. name=name. age=age)}}
```

This rule **allows** the following:

```hbs

{{contact.contact_name}}

{{#if contact.contact_name}}
  {{displayName}}
{{/if}}

{{if contact.contact_name}}
  {{displayName}}
{{/if}}

{{contact-details contact=(hash name=name age=age)}}
```
