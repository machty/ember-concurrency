## no-negated-condition

It can be hard to reason about negated conditions:

* `if (not condition)`
* `unless (not condition)`

Negated conditions can often be avoided or simplified by:

* Flipping `if (not condition) ... else ...` to `if .... else ...`
* Replacing `if (not condition)` with `unless`
* Replacing `unless (not condition)` with `if`

This rule **forbids** the following:

```hbs
{{#if (not condition)}}
  ...
{{/if}}
```

```hbs
{{#if (not condition)}}
  ...
{{else}}
  ...
{{/if}}
```

```hbs
{{#unless (not condition)}}
  ...
{{/unless}}
```

And similar examples with non-block forms like:

```hbs
<img class={{if (not condition) "some-class" "other-class"}}>
```

```hbs
{{input class=(if (not condition) "some-class" "other-class")}}
```

This rule **allows** the following:

```hbs
{{#if condition}}
  ...
{{/if}}
```

```hbs
{{#if condition}}
  ...
{{else}}
  ...
{{/if}}
```

```hbs
{{#unless condition}}
  ...
{{/unless}}
```

And similar examples with non-block forms like:

```hbs
<img class={{if condition "some-class" "other-class"}}>
```

```hbs
{{input class=(if condition "some-class" "other-class")}}
```

### Related Rules

* [simple-unless](simple-unless.md)

### References

* [no-negated-condition](https://eslint.org/docs/rules/no-negated-condition) from eslint
