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
cd packages/ember-concurrency
pnpm build
npx release-it
```

### Publishing Guides and API Docs

The [docs site](https://www.ember-concurrency.com) is built and deployed when merging to master. See [docs.yml](./.github/workflows/deploy-docs.yml).
