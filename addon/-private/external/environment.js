export class Environment {
  assert(message, test) {
    if (!test) {
      throw new Error(message);
    }
  }

  async(callback) {
    setTimeout(callback, 1);
  }

  reportUncaughtRejection(error) {
    Promise.reject(error);
  }

  defer() {
    return Promise.defer();
  }
}
