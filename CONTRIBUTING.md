# Contributing

This project uses `pnpm` as a package manager. If you're adding a new dependency, ensure that the `pnpm-lock.yaml` lockfile is updated and committed into your pull request.

## Addon Maintenance

### Installation

* `git clone` this repository
* `pnpm i`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `pnpm test:ember-compatibility` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).

### Releasing new versions / publishing to NPM

```
npx release-it
```

### Generate API Docs

TODO: use build pipeline.
* From addon root directory `pnpm docs:build`
* View built docs in `packages/test-app/public/api`

### Publishing Guides and API Docs

(Requires commit access.)

```
./node_modules/.bin/ember github-pages:commit
git push origin gh-pages:gh-pages
```
