var childProcess = require( "child_process" );

module.exports = function(/* command, args, options, callback */) {
	var args = [].slice.call( arguments );
	var callback = args.pop();
	var stdout = "";
	var stderr = "";
	var child = childProcess.spawn.apply( childProcess, args );
	var hadError = false;

	child.on( "error", function( error ) {
		hadError = true;
		callback( error );
	});

	child.stdout.on( "data", function( data ) {
		stdout += data;
	});

	child.stderr.on( "data", function( data ) {
		stderr += data;
	});

	child.on( "close", function( code ) {
		if ( hadError ) {
			return;
		}

		var error;
		if ( code ) {
			error = new Error( stderr );
			error.code = code;
			return callback( error );
		}

		callback( null, stdout, stderr );
	});

	return child;
};
