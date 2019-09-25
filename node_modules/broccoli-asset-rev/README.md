# broccoli-asset-rev

[![Build Status](https://circleci.com/gh/rickharrison/broccoli-asset-rev.svg?style=shield)](https://circleci.com/gh/rickharrison/broccoli-asset-rev)
[![codecov.io](https://codecov.io/github/rickharrison/broccoli-asset-rev/coverage.svg?branch=master&precision=2)](https://codecov.io/github/rickharrison/broccoli-asset-rev?branch=master)
[![npm](https://img.shields.io/npm/v/broccoli-asset-rev.svg)](https://www.npmjs.com/package/broccoli-asset-rev)

[Broccoli](https://github.com/broccolijs/broccoli) plugin to add fingerprint checksums to your files and update the source to reflect the new filenames.

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
npm install broccoli-asset-rev --save-dev
```

## Usage

```js
var AssetRev = require('broccoli-asset-rev');

var assetNode = new AssetRev(node, {
  extensions: ['js', 'css', 'png', 'jpg', 'gif'],
  exclude: ['fonts/169929'],
  replaceExtensions: ['html', 'js', 'css'],
  prepend: 'https://subdomain.cloudfront.net/'
});
```

## Options

  - `extensions` - Default: `['js', 'css', 'png', 'jpg', 'gif', 'map']` - The file types to add md5 checksums.
  - `exclude` - Default: `[]` - An array of globs. If a filename contains any item in the exclude array, it will not be fingerprinted.
  - `replaceExtensions` - Default: `['html', 'css', 'js']` - The file types to replace source code with new checksum file names.
  - `prepend` - Default: `''` - A string to prepend to all of the assets. Useful for CDN urls like `https://subdomain.cloudfront.net/`
  - `generateRailsManifest` - Default: none - If true, will generate a `manifest.json` to be used by Sprockets for the Rails Asset Pipeline. The manifest will be fingerprinted by default but this can be avoided by adding `'manifest.json'` to the `exclude` list.
  - `railsManifestPath` - Default: `'assets/manifest-HASH.json'` - The path in the destination folder to store the Rails manifest. Only for the default value, `HASH` will be replace with the fingerprint of the file.
  - `customHash` - Default: none - If set, overrides the md5 checksum calculation with the result of calling `customHash(buffer, pathToFile)`. If it is not a `function`, `customHash` is used as the hash value. If it is set to `null`, fingerprinting is skipped and only prepending occurs.
  - `generateAssetMap` - Default: false. If true, will generate a `assetMap.json` file in a `assets` directory on the output node. This file contains a mapping of the original asset name to the fingerprinted asset, like the following:
  - `assetMapPath` - Default: `'assets/assetMap-HASH.json'` - The path in the destination folder to store the `assetMap.json` in. Only for the default value, `HASH` will be replace with the fingerprint of the file.

```js
{
	assets: {
		css/file1.css: css/file1-sdaa7d6a87d6ada78ds.css,
		images/image1.png: images/image1-sdaa7d6a87d6ada78ds.css,
	}
}
```
  - `fingerprintAssetMap` - Default: false. If true, will fingerprint `assetMap.json`.
  - `ignore` - Default: `[]` - An array of strings.  If a filename contains any item in the ignore array, the contents of the file will not be processed for fingerprinting.
  - `annotation` - Default: null. A human-readable description for this plugin instance.

## Default settings

The default [settings](https://github.com/rickharrison/broccoli-asset-rev/blob/master/lib/default-options.js) are available if needed in your application or addon via:
`var broccoliAssetRevDefaults = require( 'broccoli-asset-rev/lib/default-options' );`

## Ember CLI addon usage

```js
var app = new EmberApp({
  fingerprint: {
    exclude: ['fonts/169929'],
    prepend: 'https://sudomain.cloudfront.net/'
  }
});
```

## Ember CLI addon options

  - `enabled` - Default: `app.env === 'production'` - Boolean. Enables fingerprinting if true. **True by default if current environment is production.**
  - `exclude` - Default: `[]` - An array of globs. If a filename contains any item in the exclude array, it will not be fingerprinted.
  - `extensions` - Default: `['js', 'css', 'png', 'jpg', 'gif', 'map']` - The file types to add md5 checksums.
  - `prepend` - Default: `''` - A string to prepend to all of the assets. Useful for CDN urls like `https://subdomain.cloudfront.net/`
  - `replaceExtensions` - Default: `['html', 'css', 'js']` - The file types to replace source code with new checksum file names.

[![ghit.me](https://ghit.me/badge.svg?repo=rickharrison/broccoli-asset-rev)](https://ghit.me/repo/rickharrison/broccoli-asset-rev)
