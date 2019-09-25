var spawn = require( "spawnback" );

function extend( a, b ) {
	for ( var prop in b ) {
		a[ prop ] = b[ prop ];
	}

	return a;
}

function copy( obj ) {
	return extend( {}, obj );
}

function Repo( path ) {
	this.path = path;
}

Repo.parsePerson = (function() {
	var rPerson = /^(\S+)\s(.+)$/;
	return function( person ) {
		var matches = rPerson.exec( person );
		return {
			email: matches[ 1 ],
			name: matches[ 2 ]
		};
	};
})();

Repo.clone = function( options, callback ) {
	var dir = options.dir;
	var args = [ "clone", options.repo, dir ];
	options = copy( options );
	delete options.repo;
	delete options.dir;

	Object.keys( options ).forEach(function( option ) {
		args.push( "--" + option );

		var value = options[ option ];
		if ( value !== true ) {
			args.push( value );
		}
	});

	args.push(function( error ) {
		if ( error ) {
			return callback( error );
		}

		callback( null, new Repo( dir ) );
	});

	var repo = new Repo( process.cwd() );
	repo.exec.apply( repo, args );
};

Repo.isRepo = function( path, callback ) {
	var repo = new Repo( path );
	repo.isRepo( callback );
};

Repo.prototype.exec = function() {
	var args = [].slice.call( arguments );
	var callback = args.pop();
	spawn( "git", args, { cwd: this.path }, function( error, stdout ) {
		if ( error ) {
			return callback( error );
		}

		callback( null, stdout.trimRight() );
	});
};

Repo.prototype.activeDays = function( committish, callback ) {
	if ( !callback ) {
		callback = committish;
		committish = "master";
	}

	this.exec( "log", "--format=%at", committish, function( error, dates ) {
		if ( error ) {
			return callback( error );
		}

		var dateMap = {
			activeDays: 0,
			commits: 0,
			dates: {},
			years: {}
		};

		dates.split( "\n" ).sort().forEach(function( timestamp ) {
			var date = new Date( timestamp * 1000 );
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();

			date = year + "-" +
				(month < 10 ? "0" : "") + month + "-" +
				(day < 10 ? "0" : "") + day;

			if ( !dateMap.dates[ date ] ) {
				dateMap.dates[ date ] = 0;
			}
			dateMap.commits++;
			dateMap.dates[ date ]++;

			if ( !dateMap.years[ year ] ) {
				dateMap.years[ year ] = {
					activeDays: 0,
					commits: 0,
					months: {}
				};
			}
			dateMap.years[ year ].commits++;

			if ( !dateMap.years[ year ].months[ month ] ) {
				dateMap.years[ year ].months[ month ] = {
					activeDays: 0,
					commits: 0,
					days: {}
				};
			}
			dateMap.years[ year ].months[ month ].commits++;

			if ( !dateMap.years[ year ].months[ month ].days[ day ] ) {
				dateMap.years[ year ].months[ month ].days[ day ] = {
					commits: 0
				};
				dateMap.activeDays++;
				dateMap.years[ year ].activeDays++;
				dateMap.years[ year ].months[ month ].activeDays++;
			}
			dateMap.years[ year ].months[ month ].days[ day ].commits++;
		});

		callback( null, dateMap );
	});
};

Repo.prototype.age = function( callback ) {
	this.exec( "log", "--reverse", "--format=%cr", function( error, stdout ) {
		if ( error ) {
			return callback( error );
		}

		callback( null, stdout.split( "\n" )[ 0 ].replace( /\sago/, "" ) );
	});
};

Repo.prototype.authors = function( committish, callback ) {
	if ( !callback ) {
		callback = committish;
		committish = "master";
	}

	this.exec( "log", "--format=%aE %aN", committish, function( error, data ) {
		if ( error ) {
			return callback( error );
		}

		var authors = data.split( "\n" );
		var authorMap = {};
		var totalCommits = 0;

		authors.forEach(function( author ) {
			if ( !authorMap[ author ] ) {
				authorMap[ author ] = 0;
			}

			authorMap[ author ]++;
			totalCommits++;
		});

		authors = Object.keys( authorMap ).map(function( author ) {
			var commits = authorMap[ author ];
			return extend( Repo.parsePerson( author ), {
				commits: commits,
				commitsPercent: (commits * 100 / totalCommits).toFixed( 1 )
			});
		}).sort(function( a, b ) {
			return b.commits - a.commits;
		});

		callback( null, authors );
	});
};

Repo.prototype.blame = function( options, callback ) {
	var args = [ "blame", "-s" ];

	if ( options.committish ) {
		args.push( options.committish );
	}

	args.push( "--", options.path );

	var rBlame = /^(\^?\w+)(\s(\S+))?\s+(\d+)\)\s(.*)$/;

	args.push(function( error, blame ) {
		if ( error ) {
			return callback( error );
		}

		var lines = blame.split( /\r?\n/ );
		lines = lines.map(function( line ) {
			var matches = rBlame.exec( line );
			var commit = matches[ 1 ];
			var boundary = /^\^/.test( commit );

			if ( boundary ) {
				commit = commit.substring( 1 );
			}

			return {
				commit: matches[ 1 ],
				boundary: boundary,
				path: matches[ 3 ] || options.path,
				lineNumber: parseInt( matches[ 4 ], 10 ),
				content: matches[ 5 ]
			};
		});

		callback( null, lines );
	});

	this.exec.apply( this, args );
};

Repo.prototype.branches = function( callback ) {
	this.exec( "for-each-ref",
		"--format=" +
			"%(refname:short)%0a" +
			"%(authordate:rfc2822)%0a" +
			"%(authoremail) %(authorname)%0a" +
			"%(subject)%0a" +
			"%(objectname)%0a",
		"refs/heads",
	function( error, data ) {
		if ( error ) {
			return callback( error );
		}

		var branches = data.split( "\n\n" ).map(function( branch ) {
			var lines = branch.split( "\n" );
			var name = lines[ 0 ];
			var date = new Date( lines[ 1 ] );
			var author = Repo.parsePerson( lines[ 2 ] );
			var subject = lines[ 3 ];
			var sha = lines[ 4 ];

			return {
				name: name,
				sha: sha,
				date: date,
				subject: subject,
				author: author
			};
		}).sort(function( a, b ) {
			return b.date - a.date;
		});

		callback( null, branches );
	});
};

Repo.prototype.config = function( name, callback ) {
	this.exec( "config", "--get", name, function( error, stdout ) {
		if ( error ) {
			if ( /^Command failed:\s+$/.test( error.message ) ) {
				return callback( null, null );
			}

			return callback( error );
		}

		callback( null, stdout.trim() );
	});
};

Repo.prototype.currentBranch = function( callback ) {
	this.exec( "rev-parse", "--abbrev-ref", "HEAD", function( error, data ) {
		if ( error ) {
			return callback( error );
		}

		var branch = data === "HEAD" ? null : data;
		callback( null, branch );
	});
};

Repo.prototype.isRepo = function( callback ) {
	this.exec( "rev-parse", "--git-dir", function( error ) {
		if ( error ) {
			if ( error.message.indexOf( "Not a git repository" ) ) {
				return callback( null, false );
			}

			// If the path doesn't exist, don't return an error
			if ( error.code === "ENOENT" ) {
				return callback( null, false );
			}

			return callback( error );
		}

		callback( null, true );
	});
};

Repo.prototype.remotes = function( callback ) {
	this.exec( "remote", "-v", function( error, data ) {
		if ( error ) {
			return callback( error );
		}

		var remotes = data.split( "\n" );
		var rRemote = /^(\S+)\s(\S+)/;
		var remoteMap = {};

		remotes.forEach(function( remote ) {
			var matches = rRemote.exec( remote );

			// New repositories with no remotes will have `origin` but no URL
			if ( !matches ) {
				return;
			}

			var name = matches[ 1 ];
			var url = matches[ 2 ];

			remoteMap[ name ] = url;
		});

		remotes = Object.keys( remoteMap ).map(function( remote ) {
			return {
				name: remote,
				url: remoteMap[ remote ]
			};
		});

		callback( null, remotes );
	});
};

Repo.prototype.resolveCommittish = function( committish, callback ) {
	this.exec( "rev-parse", committish, callback );
};

Repo.prototype.tags = function( callback ) {
	this.exec( "for-each-ref",
		"--format=" +
			"%(refname:short)%0a" +
			"%(authordate)%(taggerdate)%0a" +
			"%(objectname)%0a",
		"refs/tags",
	function( error, data ) {
		if ( error ) {
			return callback( error );
		}

		if ( !data ) {
			return callback( null, [] );
		}

		var tags = data.split( "\n\n" ).map(function( tag ) {
			var lines = tag.split( "\n" );
			var name = lines[ 0 ];
			var date = new Date( lines[ 1 ] );
			var sha = lines[ 2 ];

			return {
				name: name,
				sha: sha,
				date: date
			};
		}).sort(function( a, b ) {
			return b.date - a.date;
		});

		callback( null, tags );
	});
};

module.exports = Repo;
