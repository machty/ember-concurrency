var source = require('../globals-docs.json'),
    fs = require('fs'),
    queue = require('queue-async'),
    got = require('got');

function mdc(obj, name) {
    return new Promise(function(resolve) {
        got('https://www.google.com/search?btnI&q=' + encodeURIComponent(name + ' site: developer.mozilla.org')).on('redirect', function(res) {
            if (res.headers.location) {
                var url = res.headers.location.replace('/en-US', '');
                console.log('req %s', name);
                console.log('%s -> %s', name, url);
                obj[name] = url
            } else {
                console.log('no location for %s', name);
            }
            resolve()
        });
    })


}

var promises = [];

for (var k in source.browser) {
    if (typeof source.browser[k] === 'string' && source.browser[k] === "https://developer.mozilla.org/") {
        promises.push(mdc(source.browser, k));
    }
}

Promise.all(promises).then(function() {
    fs.writeFileSync('globals-docs.json', JSON.stringify(source, null, 2));
});
