export const DEFAULT_STATE = {
  last: null,
  lastRunning: null,
  lastStarted: null,
  lastPerformed: null,
  lastSuccessful: null,
  lastComplete: null,
  lastErrored: null,
  lastCanceled: null,
  lastIncomplete: null,
  performCount: 0
};

if (Object.freeze) {
  Object.freeze(DEFAULT_STATE);
}
