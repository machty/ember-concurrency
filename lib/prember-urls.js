/* eslint-env node */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function urls(distDir, visit) {
  return visit('/docs/introduction').then(page => {
    return page.html();
  }).then(html => {
    var dom = new JSDOM(html);
    var urls = ['/'];
    for (let aTag of [...dom.window.document.querySelectorAll('.side-menu a')]) {
      if (aTag.href) {
        urls.push(aTag.href);
      }
    }
    return urls;
  });
}
