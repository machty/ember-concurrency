## Overview

The pipeline approach in 0.5.x requires some modifications to ember-cli-deploy plugins and a few to deploy configuration scripts.

## Plugin users

- Add the following dependencies: `ember-cli-deploy-build` and `ember-cli-deploy-revision-data`
- Change your config/deploy.js to return a function instead of an object, for each `environment` setting:
    - `ENV["%INDEX_ADAPTER_NAME%"] = { /* plugin config goes here */ }`
    - `ENV["%ASSETS_ADAPTER_NAME%"] = { /* plugin config goes here */ }`

## Plugin authors
Depending on what type of adapters you're publishing, you'll have to make different amendments.

### For all adapters

1. update package.json keywords to include the keyword "ember-cli-deploy-plugin"
2. `npm install ember-cli-deploy-plugin --save` and subclass the new https://github.com/lukemelia/ember-cli-deploy-plugin for all your adapters.
3. implement `createDeployPlugin` in index.js and return an extended `ember-cli-deploy-plugin` from there.
4. listen to hooks to actually upload stuff, most notably upload (index and assets adapter) and activate (index adapter)
5. instruct your users to update their config (see above)
6. instruct your users to install ember-cli-deploy-build (see above)
7. replace console.log statements to this.log to play nicely with the formatting in ember-cli-deploy

### For index/store adapters:
1. instruct your users to install ember-cli-deploy-revision-data (see above)
2. mind you that the revision key is now under context.revisionData.revisionKey (provided ember-cli-deploy-revision-data is installed) and it doesn't include your project name yet.
```javascript
_key: function(context) {
	var revisionKey = context.commandOptions.revision || context.revisionData.revisionKey.substr(0, 8);
	return context.project.name() + ':' + revisionKey;
}
```
3. mind you that you won't be passed the contents of index.html to your upload function, instead you will have to read the file using the filesystem package,
```javascript
var path      = require('path');
var fs        = require('fs');
var readFile  = denodeify(fs.readFile);

upload: function() {
	readFile(path.join(context.distDir, "index.html"))
	.then(function(buffer) {
		return buffer.toString();
	}).then(function(indexContents) {
		// do uploady stuff with contents here
	});
}
```

### For asset adapters:
1. if you have a hard reference to "tmp/asset-sync", replace that with context.distDir.
