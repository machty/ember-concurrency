# master

# 1.3.0

* Allow `null` value for inputEncoding and outputEncoding options

# 1.2.4

Changes

* Update `broccoli-kitchen-sink-helpers`
* Update `walk-sync`

Development Changes

* Update `broccoli-test-helpers`
* Update `istanbul`
* Update `minimatch`
* update `Mocha`

# 1.2.3

* Update `walk-sync` dependency.

# 1.2.2

* (Based on 1.2.0:) Fix file naming issue in caching code

# 1.2.1

* Temporarily revert to 1.1.0

# 1.2.0

* Replace with @caitp's cauliflower-filter implementation and @stefanpenner's tests

# 1.1.0

* Add `name` and `annotation` options

# 1.0.0

* Bump without change

# 0.2.0

* Derive from new broccoli-plugin base class. Notably, this means that
  subclasses always must call `Filter.call(this, inputTree)` in their
  constructors, instead of settings `this.inputTree = inputTree`.

# 0.1.14

* Improve performance by symlinking when possible

# 0.1.13

* Improve error message when `processString` isn't overridden in subclass

# 0.1.12

* Throw on undefined `inputTree`

# 0.1.11

* Update dependencies

# 0.1.10

* Do not override this.inputEncoding/this.outputEncoding if not provided

# 0.1.9

* Fix inputEncoding/outputEncoding defaults

# 0.1.8

* Add `inputEncoding` and `outputEncoding` options

# 0.1.7

* Update dependency to deal with symlinks correctly

# 0.1.6

* Copy instead of hardlinking

# 0.1.5

* Use new broccoli-writer base class

# 0.1.4

* Use broccoli-kitchen-sink-helpers instead of larger broccoli dependency

# 0.1.3

* Remove stray `console.log` O_O

# 0.1.2

* Augment error objects for better error reporting

# 0.1.1

* Update `broccoli` dependency

# 0.1.0

* Pass relativePath argument to `processFile`

# 0.0.1

* Initial release
