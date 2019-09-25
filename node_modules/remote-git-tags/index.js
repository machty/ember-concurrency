'use strict';
const url = require('url');
const net = require('net');
const gitclient = require('git-fetch-pack');
const transport = require('git-transport-protocol');

module.exports = input => new Promise((resolve, reject) => {
	// Fix schemeless urls
	input = input.replace(/^(?!(?:https|git):\/\/)/, 'https://');

	const tcp = net.connect({
		host: url.parse(input).host,
		port: 9418
	});
	const client = gitclient(input);
	const tags = new Map();

	client.refs.on('data', ref => {
		const name = ref.name;

		if (/^refs\/tags/.test(name)) {
			// Strip off the indicator of dereferenced tags so we can
			// override the previous entry which points at the tag hash
			// and not the commit hash
			tags.set(name.split('/')[2].replace(/\^\{\}$/, ''), ref.hash);
		}
	});

	client
		.pipe(transport(tcp))
		.on('error', reject)
		.pipe(client)
		.on('error', reject)
		.once('end', () => {
			resolve(tags);
		});
});
