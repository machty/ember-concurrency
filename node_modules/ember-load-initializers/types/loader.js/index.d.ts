export {}

declare global {
  interface Window {

    requirejs: {
      _eak_seen: {
        [s: string]: any
      }
    }
  }
}
