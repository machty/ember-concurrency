[<img align='right' alt='Build Status' src='https://travis-ci.org/aexmachina/ember-notify.png'>](https://travis-ci.org/aexmachina/ember-notify)

# ember-notify

`ember-notify` displays wee little notification messages down the bottom of your Ember.js app.

### Compatibility

ember-notify is compatible with the following presentation frameworks:

- Zurb Foundation 6 (default)
- Zurb Foundation 5: `{{ember-notify messageStyle='foundation-5'}}`
- Thoughtbot Refills: `{{ember-notify messageStyle='refills'}}`
- Twitter Bootstrap: `{{ember-notify messageStyle='bootstrap'}}`
- Semantic-UI: `{{ember-notify messageStyle='semantic-ui'}}`
- UIKit: `{{ember-notify messageStyle='uikit'}}`

The CSS animations are inspired by CSS from [alertify.js](http://fabien-d.github.io/alertify.js/). You can also customize the positioning and animations by overriding the default `ember-notify` CSS class. For usage, see the [animations example](#custom-animations).

## Usage

1. Add `{{ember-notify}}` to one of your templates, usually in `application.hbs`
2. Inject the `notify` service
3. Display messages using the `info`, `success`, `warning`, `alert` and `error` methods

### Examples

```js
import {
  Component,
  inject
} from 'ember';
export default Component.extend({
  notify: inject.service('notify'),
  actions: {
    sayHello() {
      this.get('notify').info('Hello there!');
    }
  }
});
```

By default the notifications close after 2.5 seconds, although you can control this in your template:

```handlebars
{{ember-notify closeAfter=4000}}
```

Or you can control when each message is closed:

```js
var notify = this.get('notify');
var message = notify.alert('You can control how long it\'s displayed', {
  closeAfter: 10000 // or set to null to disable auto-hiding
});
```

...and you can hide messages programmatically:

```js
message.set('visible', false);
```

You can specify raw HTML:

```js
notify.info({html: '<div class="my-div">Hooray!</div>'});
```

Rounded corners, if that's your thing:

```js
notify.alert('This one\'s got rounded corners.', {
  radius: true
});
```

Include custom `classNames` on your message:

```js
notify.alert('Custom CSS class', {
  classNames: ['my-class']
})
```

### Initializer

If you prefer not to call `Ember.inject.service('notify')` you can use an initializer:

```js
// app/initializers/ember-notify.js
export {default} from 'ember-notify/initializer';
```

### Multiple Containers

If you want to have separate notifications and control where they're inserted into the DOM you can
have multiple `{{ember-notify}}` components, but only one of them can be accessed using the injected service.
The others you will need to provide a `source` property, so secondary containers should be used as follows:

```hbs
{{ember-notify source=someProperty}}
```

```js
import Notify from 'ember-notify';

export default Ember.Component.extend({
  someProperty: Notify.property(), // or this.set('someProperty', Notify.create())
  actions: {
    clicked: function() {
      this.get('someProperty').success('Hello from the controller');
    }
  }
});
```
### Custom message template
You can pass a block with template you wanna be used for each message (instead of using the default one). It may look like this:
```hbs
  {{#ember-notify as |message close|}}
    <a {{action close}} class='close'>close from block</a>
    <span class='message-from-block'>{{message.text}}</span>
  {{/ember-notify}}
```
Two arguments are passed to the block: `message` object, and `close` action. Make sure
you are using *Closure Actions* syntax passing the action (e. g. `<a {{action close}}` or
`{{your-component close=(action close)`.

### Custom Animations

By default, the `ember-notify` message window will appear from the bottom right corner of the
screen.  You may want to control the postioning or animations. To do so, you need to pass a CSS
class name using the `classPrefix` option. This will render the top level `ember-notify` element
with the class you pass in.

```hbs
<!-- gives class="ember-view ember-notify-cn custom-notify"> to top level element-->
{{ember-notify classPrefix="custom-notify"}}

```
Then you need to add custom styling for each of the elements within the `ember-notify` structure.
The following snippet summarizes rules needed for a custom look. For a complete example that you can drop into your project, see [examples/custom-position-animations.css](examples/custom-position-animations.css)
```css
/* main container */
.custom-notify {
	position: fixed;
	top: 10px;
	right: 0;
	left: 0;
}
/* message box */
.custom-notify .callout {
	position: relative;
	overflow: hidden;
}
/* classes applied for animating in/out */
.custom-notify .ember-notify-show {}
.custom-notify .ember-notify-hide {}
```

### Usage in Tests

The scheduler that shows and hides the messages is disabled by default when Ember is running tests
to avoid slowing down the tests. You can override this behaviour by setting `Notify.testing = true`.

```js
import Notify from 'ember-notify';
Notify.testing = true;
```

## Installation

This module is an ember-cli addon, so installation is easy as pie.

```sh
npm install ember-notify --save-dev
```

### Upgrading from a previous version

See [the CHANGELOG](https://github.com/aexmachina/ember-notify/blob/master/CHANGELOG.md).

## Browser Compatibility

Some users have reported issues with IE8, so this is currently not supported.
