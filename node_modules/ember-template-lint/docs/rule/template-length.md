## template-length

Some ember shops try to put some guard-rails on the length of templates for the following reasons:

- Templates that are extremely long are often a sign that code should be
  factored into several different components. Be aware that sometimes breaking
  a template up just because it's long in order to fix a linting violation can
  potentially make the code harder to reason about: splitting up a single
  logical unit into multiple files simply because it is "long" roughly means that
  to find where some HTML snippet is you have to solve a murder mystery. So while
  this check is helpful to help with sanity-checking, `{{! template-lint-disable template-length }}`
  might be the right answer if a long template does in fact represent a logical unit.

- Templates that are extremely short might be better off inlined into the
  component itself rather than existing as a separate `.hbs` file.

### Configuration

This rule is configured with a boolean, or a string value:

* boolean -- `true` for enabled (defaults of max: 200 / min: 5) / `false` for disabling this rule
* object --
  * max {number} - the longest a template should be without failing a test (assuming the
    right thing to do would be to split the template up into pieces).
  * min {number} - the shortest a template should be without failing a test (assuming the
    right thing to do would be to inline the template.
