## eol-last

Require or disallow newline at the end of files.

Enforce either (without newline at end):

```hbs
<div>test</div>
```

or this (with newline at end):

```hbs
<div>test</div>
{{! newline would be here }}
```

### Configuration

The following values are valid configuration:

  * string -- "always" enforces that files end with a newline, "never" enforces that files do not end with a newline

### Related Rules

* [eol-last](https://eslint.org/docs/rules/eol-last) from eslint
