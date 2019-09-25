# master

* **Breaking change**: This plugin now requires users to explicitly specify which Sass implementation to use when `requiring()` the module. For example:

  ```js
  var compileSass = require('broccoli-sass-source-maps')(require('sass'));
  ```

* Remove `imagePath` from options documentation. Support for this was removed from node-sass/libsass
* Add `functions` to options documentation. See https://github.com/sass/node-sass#functions--v300---experimental (Note that if losing `image-url` from sass is a problem for you, you can now implement it yourself as a custom function)

# 0.6.4

* Upgrade to node-sass 3.0.0-beta.5

# 0.6.3

* Upgrade to node-sass 3.0.0-beta.4

# 0.6.2

* Upgrade to node-sass 3.0.0-alpha.1

# 0.6.1

* Update node-sass dependency

# 0.6.0

* Upgrade to node-sass 3.0.0-pre

# 0.5.0

* Look for main `.scss` file only in the first input tree (load path)

# 0.4.0

* Upgrade to node-sass 2.0.1
* Remove defective source map support; we may bring it back later

# 0.3.3

* Upgrade to node-sass ^1.1.4

# 0.3.2

* Fix broken release

# 0.3.1

* Upgrade to node-sass ^1.0.3

# 0.3.0

* Upgrade to node-sass ^1.0.1

# 0.2.4

* Fix path handling issue

# 0.2.3

* Cache Sass output using broccoli-caching-writer

# 0.2.2

* Add support for `precision` option

# 0.2.1

* Guard against passing a tree instead of array

# 0.2.0

* Upgrade to node-sass ^0.9.2

# 0.1.4

* Upgrade to node-sass 0.8.5 and make source maps work

# 0.1.3

* Use new broccoli-writer base class

# 0.1.2

* Update package description

# 0.1.1

* Add missing cleanup method

# 0.1.0

* Initial working implementation

# 0.0.1

* Initial placeholder release
