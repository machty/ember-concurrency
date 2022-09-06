# Contributing

This project uses `yarn` as a package manager. If you're adding a new dependency, ensure that the `yarn.lock` lockfile is updated and committed into your pull request.

## Addon Maintenance

### Installation

* `git clone` this repository
* `yarn install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `yarn test:ember-compatibility` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Releasing new versions / publishing to NPM

```
npx release-it
```

### Generate API Docs

TODO: use build pipeline.
* From addon root directory `yarn docs:build`
* View built docs in `tests/dummy/public/api`

### Publishing Guides and API Docs

(Requires commit access.)

```
./node_modules/.bin/ember github-pages:commit
git push origin gh-pages:gh-pages
```
