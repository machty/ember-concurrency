## no-unused-block-params

This rule forbids unused block parameters except when they are needed to access a later parameter.

This rule **forbids** the following (unused parameters):

``` hbs
{{#each users as |user index|}}
  {{user.name}}
{{/each}}
```

This rule **allows** the following:

Allowed (used parameters):

``` hbs
{{#each users as |user|}}
  {{user.name}}
{{/each}}
```

``` hbs
{{#each users as |user index|}}
  {{index}} {{user.name}}
{{/each}}
```

Allowed (later parameter used):

``` hbs
{{#each users as |user index|}}
  {{index}}
{{/each}}
```
