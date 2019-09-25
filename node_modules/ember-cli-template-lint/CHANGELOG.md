Changelog
=========

## v1.0.0-beta.3

- Support parallel babel configuration.
- Update ember-template-lint to 1.1.0.
- Update dependencies to latest versions.

## v1.0.0-beta.1

- Drop support for Node 4, 5, 7, and 9.
- Update ember-template-lint to 1.0.0-beta.2. Please review [ember-template-lint's CHANGELOG.md](https://github.com/ember-template-lint/ember-template-lint/blob/master/CHANGELOG.md) for a detailed list of changs.
- Update dependencies to latest versions.
- Ensure compatible with Broccoli 2.

## v0.7.6

- Update to latest version of `ember-template-lint` (see its [changelog](https://github.com/ember-template-lint/ember-template-lint/blob/master/CHANGELOG.md) for details).
- Fix blueprint to account for the `bare-string` -> `no-bare-string` deprecation.

## v0.7.5

- Fix test framework detection to allow prerelease versions.

## v0.7.4

- Fix issue with warning when no testing framework is detected.
- Update various dependencies.

## v0.7.3

- Fix another issue with new console output formatting.

## v0.7.2

- Update ember-template-lint to 0.8.1 to include a fix for console output formatting.

## v0.7.1

- Update dependencies.
- Update ember-template-lint to 0.8.0 which provides a much nicer ESLint-like console output.
- Add `.handlebars` extension to the list of files to process.

## v0.7.0

- Update to ember-template-lint @ 0.7.0. Read more about the changes between 0.6.x and 0.7.0 [here](https://github.com/rwjblue/ember-template-lint/releases/tag/v0.7.0).
- Update to new unified testing system.  This will result in a single test module for template linting related tests, which should make filtering your tests much easier.
- Drop support for Node < 4.

## v0.5.2

- Update test file generation to use proper file extension. This allows usage of the `Disable Linting` checkbox
  in the ember-cli test runner to properly suppress template linting tests.

## v0.5.1

- Ensure linting warnings honor the `--silent` flag.

## v0.5.0

- Update ember-template-lint to 0.6.0. Changes from 0.5.x are:
  - Add `invalid-interactive` to recommended rules.
  - Add `img-alt-attributes` to recommended rules.
  - Add `style-concatenation` to recommended rules.
  - Add `deprecated-inline-view-helper` to recommended rules.
  - Add `link-rel-noopener` to recommended rules.
  - Remove support for Node 0.10.
- Remove support for  Node 0.10 


## v0.4.12

- Update various internal dependencies.
- Fix caching related warning message when used with recent ember-cli-htmlbars versions.

## v0.4.11

- Fix typos in `ember template-lint:print-failing` command output.

## v0.4.10

- Cleanup error messages (prevent the message from being squashed onto the location info).

## v0.4.9

- Fix compatibility with Ember versions older than 2.1.0.

## v0.4.8

- Fix publishing issue (included `.tern-port` file in blueprint).

## v0.4.7

- Update underlying `ember-template-lint` to v0.5.10.
- Add ability to mark specific rules as pending for a module. Given the following `.template-lintrc.js` file, the `foo/bar/baz` module would have only its indentation related issues labeled as warnings:

```js
module.exports = {
  extends: 'recommended',
  pending: [
    { moduleId: 'foo/bar/baz', only: ['block-indentation']}
  ]
}
```

- Update `ember template-lint:print-failing` to emit rule specific pending list.

## v0.4.6

- Update ember-template-lint to v0.5.9 (mostly internal changes/fixes).
- Remove extra `htmlbars` dependency.

## v0.4.5

- Fix cosmetic issues with error message display:
  * Ensure that multiple errors are listed on separate lines.
  * Fix formatting when `error.line` / `error.column` are missing.
  * Fix formatting when `error.source` is missing.
  * Include rule name in all error messages.
- Ensure Node 0.10, 0.12, 4.x, 6.x are all tested in CI.

## v0.4.4

- Add warning when using `ember-cli-template-lint` with a localization framework (identified by `isLocalizationFramework`
  on the addon instance). When a localization framework is present, and the `bare-strings` rule is not listed in the
  `.template-lintrc.js` file, a warning will be issued saying:

```
The `bare-strings` rule must be configured when using a localization framework (`ember-i18n`). To prevent this warning, add the following to your `.template-lintrc.js`:

  rules: {
    'bare-strings\': true
  }
```

## v0.4.3

- Add `ember template-lint:print-failing` command to list all templates in `app/` that are currently failing. This command can be
  used to easily update the `pending` listing in `.template-lintrc.js` so that ember-cli-template-lint can be incorporated into a
  project immediately (ensuring new templates conform to rules, but providing time to fix older templates).
- Ensure that modules listed as `pending` in the `.template-lintrc.js` file do not trigger failed tests.

## v0.4.2

- Fix typo in default blueprint that triggers warnings on new installations.

## v0.4.1

- Error when used with ember-cli versions prior to 2.4.3.

## v0.4.0

- Migrate to using [ember-template-lint](https://github.com/rwjblue/ember-template-lint). All existing rules are supported and were migrated to ember-template-lint as the underlying linting engine. ember-cli-template-lint is now an ember-cli specific wrapper around ember-template-lint.
- Add `deprecate-each-syntax` rule. Prevents usage of `{{#each foo}}` (context shifting each) and `{{#each foo in bar}}`.
- Add `self-closing-void-elements` rule. Prevents closing void elements (`<input />` will error in favor of `<input>`). See [here](https://github.com/rwjblue/ember-template-lint/blob/master/lib/rules/lint-self-closing-void-elements.js#L24-L39) for a list.

## v0.3.5

- Update the `bare-strings` rule to allow the following configuration:
   * boolean -- `true` for enabled / `false` for disabled
   * array -- an array of whitelisted strings
   * object -- An object with the following keys:
     * `whitelist` -- An array of whitelisted strings
     * `globalAttributes` -- An array of attributes to check on every element.
     * `elementAttributes` -- An object whose keys are tag names and value is an array of attributes to check for that tag name.

- Change default `.template-lintrc.js` file value for `bare-strings` to be `true`, which defaults the configuration to:

```js
{
  whitelist: ['(', ')', ',', '.', '&', '+', '-', '=', '*', '/', '#', '%', '!', '?', ':', '[', ']', '{', '}'],
  globalAttributes: [ 'title' ],
  elementAttributes: { input: [ 'placeholder' ], img: [ 'alt' ]}
};
```

- Fix bug with `bare-strings` where an allowed whitelisted string would only be allowed once in a given string. i.e `&&` would have failed, even though `&` was a whitelisted string.

## v0.3.4

- Add support for TextNode/CommentNode location information. Now the `bare-strings` / `html-comments` rules include line and column info.
- Add `nested-interactive` rule. Usage of nested interactive content can lead to UX problems, accessibility problems, bugs and in some
  cases to DOM errors. You should not put interactive content elements nested inside other interactive content elements.

## v0.3.3

- Fix issue with per-template rule configuration.

## v0.3.2

- Fix issue with `block-indentation` rule when a given block starts on the same line as a previous item. i.e.:

```hbs
{{! good }}
{{#each foo as |bar|}}
  <span>{{bar.name}}:</span><span>{{bar.title}}</span>
{{/each}}
```

## v0.3.1

- Add `html-comments` rule which forbids the usage of HTML comments (other than `<!-- template-lint bare-strings=false -->` style control comments).

## v0.3.0

- Change default configuration so that no plugins are enabled (warns when `.template-lintrc.js` is not found).

## v0.2.13

- Add better default whitelist for `bare-strings` rule.

## v0.2.12

- Add blueprint that generate `.template-lintrc.js`.
- Deprecate using ember-cli-template-lint without a `.template-lintrc.js`.
