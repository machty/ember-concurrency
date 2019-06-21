const DESTROY_TAG = "__ec_disposer__";

export function cleanupOnDestroy(owner, object, methodName, cleanupMethodName, ...args) {
  let method = owner[methodName];
  if (!method) {
    return;
  }

  if (!method[DESTROY_TAG]) {
    let disposers = [];

    owner[methodName] = function() {
      for (let i = 0, l = disposers.length; i < l; i ++) {
        disposers[i]();
      }
      method.apply(owner, arguments);
    };
    owner[methodName][DESTROY_TAG] = disposers;
  }

  owner[methodName][DESTROY_TAG].push(() => {
    object[cleanupMethodName](...args);
  });
}
