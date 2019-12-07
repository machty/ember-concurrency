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

* `yarn test:all` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Generate Docs

TODO: use build pipeline.
* `npm install -g jsdoc`
* From addon root directory `./builddocs.sh`
* View built docs in `tests/dummy/public/api`
