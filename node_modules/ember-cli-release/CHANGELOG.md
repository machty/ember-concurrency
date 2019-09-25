# Changelog

### v1.0.0-beta.2 (June 18, 2016)

* Fixed deprecation warning (@thomblake)
* Fixed output typos (@elwayman02)

### v1.0.0-beta.1 (January 17, 2016)

* Fixed issue with not being able to specify `pubish` option in config

### v1.0.0-beta.0 (December 29, 2015)

* Added ability to specify custom tagging strategy
* Added support for SemVer prerelease versions
* Added support for NPM publish

### v0.2.8 (October 19, 2015)

* Hook argument readme clarification (@rwjblue)
* Removed require of ember-cli classes
* Added `init` hook

### v0.2.7 (September 24, 2015)

* Prevent untracked files from being added to the release commit

### v0.2.6 (August 21, 2015)

* Ensure trailing newline when rewriting manifest files (@mmun)

### v0.2.5 (July 13, 2015)

* Fixed `SilentError` deprecation warning (@rwjblue)

### v0.2.4 (July 5, 2015)

* Added `afterPush` hook
* Added `beforeCommit` hook (@lukemelia, @chrislopresto)
* Fixed issue with config file not being loaded (@lukemelia, @chrislopresto)
* Added ability to specify manifest files

### v0.2.3 (April 20, 2015)

* Fixed issue with main blueprint when installing from within an addon

### v0.2.2 (April 14, 2015)

* Fixed issue with push success messages not printing

### v0.2.1 (April 13, 2015)

* Commit changes to working tree before tagging
* Replace versions in bower.json and package.json
* Added ability to specify options in a config file

### v0.2.0 (March 11, 2015)

* Create lightweight tags by default, changed `--message` option to `--annotation`
* Fixed issue with `currentTag` git method not reporting lightweight tags

### v0.1.1 (March 11, 2015)

* Updated git-tools to v0.4.1
* Fixed issue with quotes in tag message
* Removed unused addon files/directories

### v0.1.0 (March 10, 2015)

* Initial release
