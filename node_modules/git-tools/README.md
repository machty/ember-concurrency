# node-git-tools

Tools for parsing data out of git repositories.

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).

## About

The goal of node-git-tools is to provide a set of tools that can be used to
easily write custom git commands or other scripts that are tightly integrated
with git.

I expect the API to grow over time and will happily entertain any feature
requests. If there is anything you'd like added, just file an issue.

## Installation

```sh
npm install git-tools
```

## Usage

```js
var Repo = require( "git-tools" );
var repo = new Repo( "path/to/repo" );
repo.authors(function( error, authors ) {
	console.log( authors );
});
```



## API

### Repo.clone( options, callback )

Clones a repository and returns the new `Repo` instance.

* `options` (Object): Options for cloning the repository.
  * `repo` (String): The repository to clone from.
  * `path` (String): The path to clone into.
  * extra: Additional options can be provided, as documented below.
* `callback` (Function; `function( error, repo )`): Function to invoke after cloning the repository.
  * `repo` (Object): A new `Repo` instance for the cloned repository.

This function accepts arbitrary options to pass to `git clone`.
For example, to create a bare repository:

```js
Repo.clone({
	repo: "git://github.com/scottgonzalez/node-git-tools.git",
	dir: "/tmp/git-tools",
	bare: true
});
```

Or to create a repo with limited history:

```js
Repo.clone({
	repo: "git://github.com/scottgonzalez/node-git-tools.git",
	dir: "/tmp/git-tools",
	depth: 5
});
```



### Repo.isRepo( path, callback )

Determines if the specified path is a git repository.

* `path` (String): The path to check.
* `callback` (Function; `function( error, isRepo )`): Function to invoke after determining if the path is a git repository.
  * `isRepo` (Boolean): Whether the path is a git repository.

*Note: This is equivalent to creating a `Repo` instance with `path` and calling `isRepo()` on the instance.*



### activeDays( [committish], callback )

Gets the number of active days (unique days of authorship). Includes activity
by day, month, year, and the entire history.

* `committish` (String; default: `"master"`): Committish range to analyze.
* `callback` (Function; `function( error, activeDays )`): Function to invoke after getting active days.
  * `activeDays` (Object): Summary of active days.

The `activeDays` object has the following form:

```js
{
	activeDays: Number,
	commits: Number,
	dates: {
		"YYYY-MM-DD": Number( commits ),
		...
	},
	years: {
		"YYYY": {
			activeDays: Number,
			commits: Number,
			months: {
				"M": {
					activeDays: Number,
					commits: Number,
					days: {
						"D": {
							commits: Number
						},
						...
					}
				},
				...
			}
		},
		...
	}
}
```



### age( callback )

Gets the age of the repository.

* `callback` (Function; `function( error, age )`): Function to invoke after getting the age.
  * `age` (String): The age of the repository.



### authors( [committish], callback )

Gets all authors, sorted by number of commits.

* `committish` (String; default: `"master"`): Committish range to analyze.
* `callback` (Function; `function( error, authors )`): Function to invoke after getting authors.
  * `authors` (Array): All authors, sorted by number of commits.

Each author object contains the following properties:

* `email` (String): Author's email address.
* `name` (String): Author's name.
* `commits` (Number): Number of commits.
* `commitsPercent` (Number): Percentage of commits.



### blame( options, callback )

Determine what revision and author last modified each line of a file.

* `options` (Object): Options for the blame.
  * `path` (String): The path to the file to run the blame for.
  * `committish` (String; default: `"HEAD"`): Revision or range to blame against.
* `callback` (Function; `function( error, blame )`): Function to invoke after blaming the file.
  * `blame` (Array): Commit information for each line.

Each blame item contains the following properties:

* `commit`: SHA of commit that most recently modified the line.
* `boundary`: Boolean indicating whether the commit is a boundary for the range.
* `path`: Path to the file at the time of the most recent modification to the line.
* `lineNumber`: Line number within the file.
* `content`: Contents of the line.



### branches( callback )

Gets all branches in order of most recent commit.

* `callback` (Function; `function( error, branches )`): Function to invoke after getting branches.
  * `branches` (Array): All branches, sorted by most recent commit date.

Each branch object contains the following properties:

* `name` (String): Branch name.
* `sha` (String): SHA-1 of most recent commit.
* `date` (Date): Author date of most recent commit.
* `subject` (String): Subject (first line) of most recent commit.
* `author` (Object): Author of most recent commit.
  * `email` (String): Author's email address.
  * `name` (String): Author's name.



### config( name, callback )

Gets the value of a configuration option.

* `name` (String): The name of the configuration option.
* `callback` (Function; `function( error, value )`): Function to invoke after getting the configuration option.
  * `value` (String|null): The value for the configuration option, or `null` if no value is set.



### currentBranch( callback )

Gets the name of the currently checked out branch, if any.

* `callback` (Function; `function( error, branch )`): Function to invoke after getting the branch.
  * `branch` (String|null): Branch name, or `null` if in detached HEAD state.



### isRepo( callback )

Determines if the specified path is a git repository.

* `callback` (Function; `function( error, isRepo )`): Function to invoke after determining if the path is a git repository.
  * `isRepo` (Boolean): Whether the path is a git repository.



### remotes( callback )

Gets all remote repositories.

* `callback` (Function; `function( error, remotes )`): Function to invoke after getting the remotes.
  * `remotes` (Array): All remote repositories.

Each remote object contains the following properties:

* `name` (String): Remote name.
* `url` (String): URL for the remote repository.



### resolveCommittish( committish, callback )

Resolves a committish to a SHA1.

* `committish` (String): Any committish to resolve.
* `callback` (Function; `function( error, sha )`): Function to invoke after resolving the comittish.
  * `sha`: SHA1 of the resolved committish.



### tags( callback )

Gets all tags in reverse chronological order.

Lightweight tags are sorted by author date and annotated tags are sorted by tagger date.

* `callback` (Function; `function( error, tags )`): Function to invoke after getting tags.
  * `tags` (Array): All tags, sorted by date.

Each tag object contains the following properties:

* `name` (String): Tag name.
* `sha` (String): SHA-1 for the tag. For lightweight tags, this is the SHA-1 of the commit.
* `date` (Date): Author date for ligthweight tags, tagger date for annotated tags.



## License

Copyright 2013 Scott González. Released under the terms of the MIT license.

---

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).
