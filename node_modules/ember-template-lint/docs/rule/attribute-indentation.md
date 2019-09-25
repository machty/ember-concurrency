## attribute-indentation

This rule requires the positional params, attributes, and block params of the helper/component to be indented by moving them to multiple lines when the open invocation has more than 80 characters (configurable).

### Forbidden

Non-Block form
``` hbs

  {{employee-details firstName=firstName lastName=lastName age=age avatarUrl=avatarUrl}}
```

Block form
``` hbs

  {{#employee-details firstName=firstName lastName=lastName age=age avatarUrl=avatarUrl as |employee|}}
    {{employee.fullName}}
  {{/employee-details}}
```

Non-Block form (HTML)
``` hbs

  <input disabled id="firstName" value={{firstName}} class="input-field first-name" type="text">
```

Block form (HTML)
``` hbs

  <a href="https://www.emberjs.com" class="emberjs-home link" rel="noopener" target="_blank">Ember JS</a>
```

### Allowed

Non-Block form
``` hbs

  {{employee-details
    firstName=firstName
    lastName=lastName
    age=age
    avatarUrl=avatarUrl
  }}
```

Non-Block form (open invocation < 80 characters)
``` hbs

  {{employee-details firstName=firstName lastName=lastName}}
```

Non-Block form with Helper
```hbs
  {{if
    (or logout.isRunning (not session.isAuthenticated))
    "Logging Out..."
    "Log Out"
  }}
```

Non-Block form with Helper unfolded
```hbs
  {{if
    (or
      logout.isRunning
      (not session.isAuthenticated)
    )
    "Logging Out..."
    "Log Out"
  }}
```

Non-Block form (HTML)
``` hbs

  <input
    disabled
    id="firstName"
    value={{firstName}}
    class="input-field first-name"
    type="text"
  >
```

Block form
``` hbs

  {{#employee-details
    firstName=firstName
    lastName=lastName
    age=age
    avatarUrl=avatarUrl
  as |employee|
  }}
    {{employee.fullName}}
  {{/employee-details}}
```

Block form (open invocation < 80 characters)
``` hbs

  {{#employee-details firstName=firstName lastName=lastName as |employee|}}
    {{employee.fullName}}
  {{/employee-details}}
```

Block form (HTML)
``` html

  <a
    href="https://www.emberjs.com"
    class="emberjs-home link"
    rel="noopener"
    target="_blank"
  >
    Ember JS
  </a>
```

### Configuration
  * boolean - `true` - Enables the rule to be enforced when the opening invocation has more than 80 characters or when it spans multiple lines.
  * object - { 'indentation': n spaces } - Indentation length for attributes (defaults to `2`).
  * object - { 'open-invocation-max-len': n characters } - Maximum length of the opening invocation.
  * object - { 'process-elements': `true` } - Also validate the indentation of HTML/SVG elements.
  * object - { 'element-open-end': `new-line`|`last-attribute` } - Enforce the position of the closing brace `>` to be on a new line or next to the last attribute (defaults to `new-line`).
  * object - { 'mustache-open-end': `new-line`|`last-attribute` } - Enforce the position of the closing braces `}}` to be on a new line or next to the last attribute (defaults to `new-line`).

### Related Rules

* [block-indentation](block-indentation.md)
