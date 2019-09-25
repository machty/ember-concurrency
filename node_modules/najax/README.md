# najax

[![Travis CI](https://travis-ci.org/najaxjs/najax.svg?branch=master)](https://travis-ci.org/najaxjs/najax)
[![Dependency Status](https://david-dm.org/najaxjs/najax.svg)](https://david-dm.org/najaxjs/najax)
[![devDependency Status](https://david-dm.org/najaxjs/najax/dev-status.svg)](https://david-dm.org/najaxjs/najax#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


jQuery ajax-stye http requests in node

jQuery ajax is stupid simple. This project provides a lightweight wrapper for the nodejs http request object that enables jquery ajax style syntax when making serverside requests to other webpages in node.js

In addition to najax.get, , handles ssl and makes some reasonable assumptions based on inputs and everything can be overridden by passing an options object.

## Getting Started
Install the module with: `npm install najax`

```javascript
var najax = $ = require('najax')
$.get('http://www.google.com', callback)
najax('http://www.google.com', { type: 'POST' }, callback)
najax({ url: 'http://www.google.com', type: 'POST', success: callback })
najax({ url: 'http://www.google.com', type: 'POST' })
  .success(callback)
  .error(errorHandler)

$.get, $.post, $.put, $.delete...
```

## Run unit tests
- npm install && npm test

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [standardjs](https://github.com/feross/standard).
