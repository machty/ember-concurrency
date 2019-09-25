/* eslint-env node */

const Plugin = require('broccoli-plugin');
const FastBoot = require('fastboot');
const fs = require('fs');
const denodeify = require('denodeify');
const writeFile = denodeify(fs.writeFile);
const readFile = denodeify(fs.readFile);
const mkdirp = denodeify(require('mkdirp'));
const path = require('path');
const chalk = require('chalk');
const express = require('express')
const { URL } = require('url');
const port = 7784;

// We need to have some origin for the purpose of serving redirects
// and static assets

class Prerender extends Plugin {
  constructor(builtAppTree, { urls, indexFile, emptyFile }, ui, plugins, rootURL) {
    super([builtAppTree], { name: 'prember', needsCache: false });
    this.urls = urls || [];
    this.indexFile = indexFile || 'index.html';
    this.emptyFile = emptyFile || '_empty.html';
    this.ui = ui;
    this.plugins = plugins;
    this.rootURL = rootURL;
    this.port = port;
    this.host = `localhost:${port}`;

  }

  async listUrls(app, host) {
    let visit = async (url) => {
      return this._visit(app, host, url);
    };

    if (typeof this.urls === 'function') {
      this.urls = await this.urls(this.inputPaths[0], visit);
    }

    for (let plugin of this.plugins) {
      this.urls = this.urls.concat(await plugin(this.inputPaths[0], visit));
    }

    return this.urls;
  }

  async build() {
    let pkg;
    try {
      pkg = require(path.join(this.inputPaths[0], 'package.json'));
    } catch(err) {
      throw new Error(`Unable to load package.json from within your built application. Did you forget to add ember-cli-fastboot to your app? ${err}`)
    }

    /* Move the original "empty" index.html HTML file to an
       out-of-the-way place, and rewrite the fastboot manifest to
       point at it. This ensures that:

       (1) even if you have prerendered the contents of your homepage,
           causing the empty "index.html" to get replaced with actual
           content, we still keep a copy of the original empty
           index.html file that can be used to serve URLs that don't
           have a prerendered version. You wouldn't want a flash of
           your homepage content to appear on every non-prerendered
           route.

       (2) if you choose to run the prerendered app inside a fastboot
           server for some reason (this happens in development by
           default), fastboot will still work correctly because it can
           find the empty index.html file.
    */

    let htmlFile = await readFile(path.join(this.inputPaths[0], pkg.fastboot.manifest.htmlFile), 'utf8');
    await writeFile(path.join(this.outputPath, this.emptyFile), htmlFile);
    pkg.fastboot.manifest.htmlFile = this.emptyFile;




    await writeFile(path.join(this.outputPath, 'package.json'), JSON.stringify(pkg));

    let app = new FastBoot({
      distPath: this.inputPaths[0]
    });

    express()
      .use(express.static(this.inputPaths[0]))
      .listen(this.port);

    let hadFailures = false;

    for (let url of await this.listUrls(app, this.host)) {
      try {
        hadFailures = (!await this._prerender(app, this.host, url)) || hadFailures;
      } catch (err) {
        hadFailures = true;
        this.ui.writeLine(`pre-render ${url} ${chalk.red('failed with exception')}: ${err}`);
      }
    }

    if (hadFailures) {
      throw new Error("Some pre-rendered URLs had failures");
    }
  }

  async _visit(app, host, url) {
    let opts = {
      request: {
        url,
        headers: {
          host,
          'x-broccoli': {
            outputPath: this.inputPaths[0]
          }
        }
      }
    };
    return await app.visit(url, opts);
  }

  async _prerender(app, host, url) {
    let page = await this._visit(app, host, url);
    if (page.statusCode === 200) {
      let html = await page.html();
      await this._writeFile(url, html);
      this.ui.writeLine(`pre-render ${url} ${chalk.green('200 OK')}`);
      return true;
    } else if (page.statusCode >= 300 && page.statusCode < 400){
      let location = page.headers.headers.location[0];
      let redirectTo = new URL(location, `http://${host}${this.rootURL}`).pathname;
      let html = `<meta http-equiv="refresh" content="0;url=${redirectTo}"><link rel="canonical" href="${redirectTo}" />`;
      await this._writeFile(url, html);
      this.ui.writeLine(`pre-render ${url} ${chalk.yellow(page.statusCode)} ${location}`);
      return true;
    } else {
      this.ui.writeLine(`pre-render ${url} ${chalk.red(page.statusCode)}`);
    }
  }

  async _writeFile(url, html) {
    let filename = path.join(this.outputPath, url.replace(this.rootURL, '/'), this.indexFile);
    await mkdirp(path.dirname(filename));
    await writeFile(filename, html);
  }
}

module.exports = Prerender;
