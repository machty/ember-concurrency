## no-shadowed-elements

This rule prevents ambiguity in situations where a yielded block param which starts with a lower case letter is also
used within the block itself as an element name.

This rule **forbids** the following:

```hbs
<FooBar as |div|>
  <div></div>
</FooBar>
```
This rule **allows** the following:

```hbs
{{#foo-bar as |Baz|}}
  <Baz />
{{/foo-bar}}

<FooBar as |Baz|>
  <Baz />
</FooBar>

{{#with foo=(component "blah-zorz") as |Div|}}
  <Div></Div>
{{/with}}

<Foo as |bar|>
  <bar.baz />
</Foo>
```
