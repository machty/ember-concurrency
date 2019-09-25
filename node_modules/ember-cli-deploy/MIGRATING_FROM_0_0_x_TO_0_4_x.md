##Overview

`achambers/ember-cli-deploy`, `LevelBossMike/ember-deploy` and `tedconf/ember-cli-front-end-builds` are coming together to create the offical Ember CLI deployment tool, `ember-cli-deploy/ember-cli-deploy`.

Users upgrading from the `ember-cli-deploy` npm package `<= v0.0.6` to `>= v0.4.0` will need to follow the migration steps below as the core codebase of the package will be changing completely.

While we are trying our best to maintain backwards compatability for users of `<= v0.0.6`, this will only be temporary and users are strongly urged to migrate ASAP.

## Migrate config

Migrate your `<= v0.0.6` config from this:

```javascript
// config/deploy/staging.js

module.exports = {
  assets: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    bucket: 'staging-bucket',
    region: 'eu-west-1'
  },

  index: {
    host: 'staging-redis.example.com',
    port: '1234'
  }
};
```

```javascript
// config/deploy/production.js

module.exports = {
  assets: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    bucket: 'prod-bucket',
    region: 'eu-west-1'
  },

  index: {
    host: 'production-redis.example.com',
    port: '9876',
    password: process.env.REDIS_PASSWORD
  }
};
```

to this:

```javascript
// config/deploy.js

module.exports = {
  staging: {
    buildEnv: 'staging',
    store: {
      host: 'staging-redis.example.com',
      port: 1234
    },
    assets: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'staging-bucket'
      region: 'eu-west-1'
    }
  },

   production: {
    store: {
      host: 'production-redis.example.com',
      port: 9876,
      password: process.env.REDIS_PASSWORD
    },
    assets: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'prod-bucket'
      region: 'eu-west-1'
    }
  }
};
```

## Migrate adapters

Uninstall the now unsupported adapters:

```shell
$ npm uninstall ember-cli-deploy-redis-index-adapter --save-dev
```

And install the corresponding supported plugins:

```shell
$ npm install ember-deploy-redis --save-dev

$ npm install ember-deploy-s3 --save-dev
```

## Serving of index.html

Due to the way `v0.4.0` now stores the list of previous revisions, [achambers/fuzzy-wookie](https://github.com/achambers/fuzzy-wookie) is no longer compatible with ember-cli-deploy.

If you were using [achambers/fuzzy-wookie](https://github.com/achambers/fuzzy-wookie), please migrate to use [philipheinser/ember-lightning](https://github.com/philipheinser/ember-lightning) instead.

If you wrote your own server to serve the index.html, you will need to modify it in order for it to work with `v0.4.0`.  The breaking change is that instead of storing just `sha` in the list of previous revisions,ember-cli-deploy now stores `app-name:sha`.  Please make any changes necessary to your server to support this change.

## Unsupported commands

A number of commands became deprecated in `v0.4.0` and will become unsupported in future versions very soon.

- instead of `ember deploy:index` and `ember deploy:assets`, please use `ember deploy`
- instead of `ember activate`, please use `ember deploy:activate`
- instead of `ember deploy:versions`, please use `ember deploy:list`
