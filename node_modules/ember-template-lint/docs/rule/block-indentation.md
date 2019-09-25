## block-indentation

Good indentation is crucial for long-term maintenance of templates. For example, having blocks misaligned is a common cause of logic errors.

This rule **forbids** the following:

```hbs
{{#each foo as |bar|}}

  {{/each}}
```

```hbs
<div>
<p>{{t "greeting"}}</p>
</div>
```

```hbs
<div>
  <p>{{t 'Stuff here!'}}</p></div>
```

This rule **allows** the following:

```hbs
{{#my-component}}
  <div>
    <p>{{t "greeting"}}</p>
  </div>
{{/my-component}}
```

### Configuration

The following values are valid configuration:

  * boolean -- `true` indicates a 2 space indent, `false` indicates that the rule is disabled.
  * numeric -- the number of spaces to require for indentation
  * "tab" -- To indicate tab style indentation (1 char)

### Related Rules

  * [attribute-indentation](attribute-indentation.md)
