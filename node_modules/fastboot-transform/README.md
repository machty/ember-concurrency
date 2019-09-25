# fastboot-transform
Transforms a given broccoli tree, which contains files using browser APIs, to be FastBoot compliant.

# Usage
If your library here at `a/b/c.js` contains:
```js
window.foo = bar;
```

The above file is not compatible in FastBoot. Therefore, you will need to wrap it with:

```js
var fastboot-transform = require('fastboot-transform');

fastboot-transform(new Funnel('a/b/c.js'));
```

The result of the above is:
```js
if (typeof FastBoot === 'undefined') {
 window.foo = bar;
}
```
