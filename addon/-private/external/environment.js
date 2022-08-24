export class Environment {
  assert() {}

  async(callback) {
    Promise.resolve().then(callback);
  }

  reportUncaughtRejection() {
    this.async((error) => {
      throw error;
    });
  }

  defer() {
    let deferable = {
      promise: null,
      resolve: null,
      reject: null,
    };

    let promise = new Promise((resolve, reject) => {
      deferable.resolve = resolve;
      deferable.reject = reject;
    });

    deferable.promise = promise;

    return deferable;
  }

  globalDebuggingEnabled() {
    return false;
  }
}

export const DEFAULT_ENVIRONMENT = new Environment();
