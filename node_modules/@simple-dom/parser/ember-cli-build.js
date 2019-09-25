const build = require('../../../lib/build');

module.exports = function(options) {
  const ui = options.project.ui;
  const workspace = build.normalizeWorkspacePath(__dirname);
  ui.writeInfoLine(`Building ${workspace}/dist`);
  const src = build.funnelSrc(workspace);
  const compiled = build.compileSrc(src, {
    // force node resolution to use declarations
    paths: undefined,
    baseUrl: undefined,
  });
  return build.packageDist(compiled, workspace, true);
}
