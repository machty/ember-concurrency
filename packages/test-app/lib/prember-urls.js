/* eslint-env node */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// eslint-disable-next-line no-unused-vars
module.exports = function urls({ distDir, visit }) {
  return visit('/docs/introduction')
    .then((page) => {
      return page.html();
    })
    .then((html) => {
      let dom = new JSDOM(html);
      let urls = ['/'];
      for (let aTag of [
        ...dom.window.document.querySelectorAll('.side-menu a'),
      ]) {
        if (aTag.href) {
          urls.push(aTag.href);
        }
      }
      return urls;
    });
};
