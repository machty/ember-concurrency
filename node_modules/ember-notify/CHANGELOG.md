# Changelog

## v5.0

- The default theme is now compatible with Foundation 6. If you want to use Foundation 5 then use `{{ember-notify messageStyle='foundation-5'}}`

## v4.0

- The `notify` property is no longer injected into routes and controllers by default. You should now
  use `notify: Ember.inject.service()`
- The `Notify` helper exported from the `ember-notify` package can no longer be used to send messages -
  you need to use the service
- The property names have changed from `message` and `raw` to `text` and `html`
- The `info`, `success`, `warning`, `alert` and `error` methods no longer return
  a Promise, they return a `Message` instance


## v3.0

v3.0 uses a component + helper architecture that removes several hacks in previous versions.

### BREAKING CHANGES

- ember-cli is now required for v3.0. Projects that don't use ember-cli will need to stay on the v2.0 branch
- You now need to add `{{ember-notify}}` to one of your templates, usually in `application.hbs`
- Bootstrap styling is now selected using the `messageStyle` property on the component: `{{ember-notify messageStyle='bootstrap'}}`
- If you were using `message.send('close')`, this will need to be changed to `message.set('visible', false)`
