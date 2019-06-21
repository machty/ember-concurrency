const DESTROY_TAG = "__ec_disposer__";

export function cleanupOnDestroy(owner, object, methodName, cleanupMethodName, arg) {
  let method = owner[methodName];

  if (!method || !method[DESTROY_TAG]) {
    let disposers = [];

    owner[methodName] = function() {
      disposers.forEach(d => d());
      if (method) {
        method.apply(owner, arguments);
      }
    };
    owner[methodName][DESTROY_TAG] = disposers;
  }

  owner[methodName][DESTROY_TAG].push(() => {
    object[cleanupMethodName](arg);
  });
}
