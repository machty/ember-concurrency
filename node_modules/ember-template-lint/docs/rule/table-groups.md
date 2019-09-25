## table-groups

It is best practice to group table rows into one of:

* `thead`
* `tbody`
* `tfoot`

This helps avoid a very nuanced (and possibly deprecated in the future) feature of glimmer that auto-inserts these tags.

This rule **forbids** the following:

```hbs
<table>
  <tr>
    <td></td>
  </tr>
</table>
```

```hbs
<table>
  {{some-thing content=content}}
</table>
```

This rule **allows** the following:

```hbs
<table>
  <tbody>
    <tr>
      <td></td>
    </tr>
  </tbody>
</table>
```

```hbs
<table>
  <tbody>
    {{some-thing content=content}}
  </tbody>
</table>
```

```hbs
<table>
  {{some-component tagName="tbody"}}
</table>
```

If you have a component with one of the table groups specified as its `tagName`, you should disable the rule inline:

```hbs
<table>
  {{! template-lint-disable table-groups }}
  {{some-component-with-tagName-tbody}}
</table>
```
