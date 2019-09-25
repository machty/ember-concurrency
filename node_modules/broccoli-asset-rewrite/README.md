# broccoli-asset-rewrite

[![CircleCI](https://img.shields.io/circleci/project/rickharrison/broccoli-asset-rewrite.svg)](https://circleci.com/gh/rickharrison/broccoli-asset-rewrite)
[![codecov.io](https://codecov.io/github/rickharrison/broccoli-asset-rewrite/coverage.svg?branch=master&precision=2)](https://codecov.io/github/rickharrison/broccoli-asset-rewrite?branch=master)
[![npm](https://img.shields.io/npm/v/broccoli-asset-rewrite.svg)](https://www.npmjs.com/package/broccoli-asset-rewrite)

[Broccoli](https://github.com/broccolijs/broccoli) plugin to rewrite a source node from an asset map.

Turns

```
<script src="assets/appname.js">
background: url('/images/foo.png');
```

Into

```
<script src="https://subdomain.cloudfront.net/assets/appname-342b0f87ea609e6d349c7925d86bd597.js">
background: url('https://subdomain.cloudfront.net/images/foo-735d6c098496507e26bb40ecc8c1394d.png');
```

## Installation

```js
npm install broccoli-asset-rewrite --save-dev
```

## Usage

The asset map should have keys of the original names and values of the new names.

```js
var AssetRewrite = require('broccoli-asset-rewrite');

var generatedMap = {
  'assets/appname.css': 'assets/appname-d1d59e0fdcfc183415ab0b72a4f78d9c.css',
  'assets/appname.js': 'assets/appname-ed50537fcd5a71113cf79908f49e854d.js',
  'assets/vendor.css': 'assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css',
  'logo.png': 'logo-c4ab8191636f0a520d1f7f7a82c455a3.png'
};

var assetNode = new AssetRewrite(node, {
  assetMap: generatedMap,
  replaceExtensions: ['html', 'js', 'css'],
  prepend: 'https://subdomain.cloudfront.net/'
});
```

## Options

  - `assetMap` - Default: `{}` - The asset map to rewrite source from.
  - `replaceExtensions` - Default: `['html', 'css']` - The file types to replace source code with new checksum file names.
  - `prepend` - Default: `''` - A string to prepend to all of the assets. Useful for CDN urls like `https://subdomain.cloudfront.net/`
  - `ignore` - Default: `[]` - Ignore files from being rewritten.
  - `annotation` - Default: null - A human-readable description for this plugin instance.

[![ghit.me](https://ghit.me/badge.svg?repo=rickharrison/broccoli-asset-rewrite)](https://ghit.me/repo/rickharrison/broccoli-asset-rewrite)
