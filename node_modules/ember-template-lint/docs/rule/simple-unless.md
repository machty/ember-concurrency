## simple-unless

This rule strongly advises against `{{unless}}` blocks in the following situations:

* With other block helpers (e.g. `{{else}}`, `{{else if}}`)
* With template helpers in the condition

Common solutions are to use an `{{if}}` block, or refactor potentially confusing logic within the template.

This rule **forbids** the following:

``` hbs
{{! `unless` condition has a template helper }}

{{unless (if true) "This is not recommended"}}
```

``` hbs
{{! `unless` statement has an `else` block }}

{{#unless bandwagoner}}
  Go Niners!
{{else}}
  Go Seahawks!
{{/unless}}
```

``` hbs
{{! conditional statement has an `else unless` block }}

{{#if condition}}
  Hello
{{else unless otherCondition}}
  World
{{/unless}}
```

This rule **allows** the following:

``` hbs
{{#if bandwagoner}}
  Go Blue Jays!
{{else}}
  Go Mariners!
{{/if}}
```

``` hbs
{{#unless condition}}
  Hello World
{{/unless}}
```

### Configuration

The following values are valid configuration:

  * boolean -- `true` for enabled / `false` for disabled
  * object --
    * `whitelist` -- array - `['or']` for specific helpers / `[]` for wildcard
    * `blacklist` -- array - `['or']` for specific helpers / `[]` for none
    * `maxHelpers` -- number - use -1 for no limit

### Related Rules

  * [no-negated-condition](no-negated-condition.md)
