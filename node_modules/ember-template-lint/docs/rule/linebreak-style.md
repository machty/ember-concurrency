## linebreak-style

Having consistent linebreaks is important to make sure that the source code is rendered correctly in editors.

### Configuration

This rule is configured with a boolean, or a string value:

* boolean -- `true` for enforcing consistency (all `CRLF` or all `LF` not both in a single file)
* string -- `system` for the current platforms default line ending / `unix` for LF linebreaks / `windows` for CRLF linebreaks
