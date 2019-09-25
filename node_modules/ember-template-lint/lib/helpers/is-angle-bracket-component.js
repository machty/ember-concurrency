'use strict';

function isDynamicComponent(scope, element) {
  let open = element.tag.charAt(0);

  let isLocal = scope.isLocal(element);
  let isNamedArgument = open === '@';
  let isThisPath = element.tag.indexOf('this.') === 0;
  return isLocal || isNamedArgument || isThisPath;
}

module.exports = function isAngleBracketComponent(scope, element) {
  let open = element.tag.charAt(0);
  let isPath = element.tag.indexOf('.') > -1;

  let isUpperCase = open === open.toUpperCase() && open !== open.toLowerCase();

  return (isUpperCase && !isPath) || isDynamicComponent(scope, element);
};
