/* eslint-env node */
'use strict';

const Rule = require('./base');

/*
  Don't allow dot(s) at the end of a Path expression.

  Bad

  {{contact.contact_name.}}

  {{#if contact.contact_name.}}
    {{displayName}}
  {{/if}}

  {{if contact.contact_name..}}
    {{displayName}}
  {{/if}}


  Good

  {{contact.contact_name}}

  {{#if contact.contact_name}}
    {{displayName}}
  {{/if}}

  {{if contact.contact_name}}
    {{displayName}}
  {{/if}}
*/

module.exports = class NoTrailingDotOnPathExpression extends Rule {
  // glimmer-vm now asserts on this condition, this rule will be removed during
  // the next major version bump...
  visitor() {
    return {};
  }
};
