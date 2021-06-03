export const TYPE_CANCELLED = 'CANCELLED';
export const TYPE_STARTED = 'STARTED';
export const TYPE_QUEUED = 'QUEUED';

export const STARTED = { type: TYPE_STARTED };
export const QUEUED = { type: TYPE_QUEUED };

export const makeCancelState = (reason) => ({ type: TYPE_CANCELLED, reason });
