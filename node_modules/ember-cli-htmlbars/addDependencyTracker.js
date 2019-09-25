function addDependencyTracker(plugin, enableInvalidation) {
  if (plugin.prototype && plugin.prototype.transform) {
    // we don't track dependencies for legacy plugins.
    return plugin;
  }
  if (!enableInvalidation) {
    // Dependency invalidation isn't enabled, so no need to track.
    return plugin;
  }
  if (typeof plugin.getDependencies === "function") {
    // Don't add the dependency tracker if it's already added
    return plugin;
  }
  // This variable in our closure allows us to share dependencies from
  // the ast plugin that we can't access with the ast plugin generator that
  // we can access.
  let lastDependencies = {};
  let trackedPlugin = (env) => {
    let templateStackDepth = 0;
    let realPlugin = plugin(env);
    let visitor = realPlugin.visitor;
    let origProgram = visitor.Program;
    let origEnter, origExit, origKeys;
    if (origProgram) {
      if (typeof origProgram === "function") {
        origEnter = origProgram;
        origExit = undefined;
        origKeys = undefined;
      } else {
        origEnter = origProgram.enter;
        origExit = origProgram.exit;
        origKeys = origProgram.keys;
      }
    }
    // Ideally we'd use visitor.Template but we still support versions of
    // handlebars where the template node didn't exist yet. Templates can have
    // nested Program nodes. Since we can't rely on the Template node yet, we
    // have to keep a stack counter of Program nodes that we've seen so far.
    visitor.Program = {
      keys: origKeys,
      enter: (node) => {
        templateStackDepth++;
        if (templateStackDepth === 1) {
          if (realPlugin.resetDependencies) {
            realPlugin.resetDependencies(env.meta.moduleName);
          }
          delete lastDependencies[env.meta.moduleName];
        }
        if (origEnter) origEnter(node);
      },
      exit: (node) => {
        if (templateStackDepth === 1) {
          if (realPlugin.dependencies) {
            lastDependencies[env.meta.moduleName] = realPlugin.dependencies(env.meta.moduleName);
          }
        }
        if (origExit) origExit(node)
        templateStackDepth--;
      }
    };
    return realPlugin;
  };
  trackedPlugin.getDependencies = (relativePath) => {
    return lastDependencies[relativePath] || [];
  }
  return trackedPlugin;
}

module.exports = addDependencyTracker;