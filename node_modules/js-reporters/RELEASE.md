# Release Process

1. Update `CHANGELOG.md` using `git changelog` from the [`git-extras`](https://github.com/tj/git-extras) package
2. Commit changelog updates with message: `Changelog: Update for x.x.x release`
3. Update `package.json` version and tag it using `npm version x.x.x -m "Release: vx.x.x"`
4. Push the two new commits and tag to GitHub
5. Run `npm publish`
6. Publish a new [release on GitHub](https://github.com/js-reporters/js-reporters/releases) with the changelog update

That's all!
