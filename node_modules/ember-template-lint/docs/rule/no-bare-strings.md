## no-bare-strings

In order to be able to internationalize your application, you will need to avoid using plain strings in your templates. Instead, you would need to use a template helper specializing in translation ([ember-intl](https://github.com/ember-intl/ember-intl) is the recommended project to use this for).

This rule **forbids** the following:

``` html
<h2>Some string here!</h2>
```

This rule **allows** the following:

``` html
{{! ember-intl example }}
<h2>{{t 'photos.banner' numPhotos=model.photos.length}}</h2>
```

### Configuration

 The following values are valid configuration:

   * boolean -- `true` for enabled / `false` for disabled
   * array -- an array of whitelisted strings
   * object -- An object with the following keys:
     * `whitelist` -- An array of whitelisted strings
     * `globalAttributes` -- An array of attributes to check on every element.
     * `elementAttributes` -- An object whose keys are tag names and value is an array of attributes to check for that tag name.

When the config value of `true` is used the following configuration is used:
 * `whitelist` - `(),.&+-=*/#%!?:[]{}`
 * `globalAttributes` - `title`, `aria-label`, `aria-placeholder`, `aria-roledescription`, `aria-valuetext`
 * `elementAttributes` - `{ img: ['alt'], input: ['placeholder'] }`
