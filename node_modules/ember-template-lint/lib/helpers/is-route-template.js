var path = require('path');

/*
  Eventually we will want to use `ember-resolver` to definitively resolve whether a template
  belongs to a route or not. However, `ember-resolver` is not ready for node-land use yet.
  Until then, this simple util abstracts away our hackier solution in which we eliminate
  paths that aren't routes. While this approach is lossy, it at least catches most the cases.

  An unfortunate consequence of this is that for now you cannot have routes with names that
   begin with a dash (`-`) or have `components/` in the name that have outlets in them without
   adding in an override for this rule to the file.
 */
module.exports = function isRouteTemplate(moduleName) {
  if (typeof moduleName !== 'string') {
    return true; // we have no idea what this is
  }

  var baseName = path.basename(moduleName);
  var isPartial = baseName.indexOf('-') === 0;

  return (
    !isPartial &&
    // check that this is not a component template - [^/]+ is the app's module name
    // which we don't know here
    !/^[^/]+\/templates\/components\//.test(moduleName) && // classic component
    !/^[^/]+\/components\//.test(moduleName) // co-located component template
  );
};
