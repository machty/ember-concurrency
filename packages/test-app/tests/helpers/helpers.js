import { setOnerror } from '@ember/-internals/error-handling';

export function makeAsyncError(hooks) {
  hooks.afterEach(() => setOnerror(null));
  return () => new window.Promise((r) => setOnerror(r));
}
