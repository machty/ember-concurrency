# remote-git-tags [![Build Status](https://travis-ci.org/sindresorhus/remote-git-tags.svg?branch=master)](https://travis-ci.org/sindresorhus/remote-git-tags)

> Get tags from a remote git repo

Like [`git ls-remote`](http://git-scm.com/docs/git-ls-remote.html), which doesn't require cloning the repo, but this is 100% JavaScript, meaning no dependency on the Git binary.

Really just some minor glue to [@chrisdickinson](https://github.com/chrisdickinson)'s awesome [work](https://github.com/search?utf8=%E2%9C%93&q=user%3Achrisdickinson+git-) on reimplementing Git in JavaScript.

I'm using this successfully against GitHub repos, but the underlaying modules are not that actively maintained, so I wouldn't recommend using this for production critical code.


## Install

```
$ npm install --save remote-git-tags
```


## Usage

```js
const remoteGitTags = require('remote-git-tags');

remoteGitTags('github.com/sindresorhus/remote-git-tags').then(tags => {
	console.log(tags);
	//=> Map {'v1.0.0' => '69e308412e2a5cffa692951f0274091ef23e0e32'}
});
```


## API

### remoteGitTags(url)

Returns a `Promise<Map>` with the Git tags as keys and their commit SHA as values.

#### url

Type: `string`

Git repo URL.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
