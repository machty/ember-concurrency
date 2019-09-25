export type WaiterName = string;
export type Token = unknown;

export interface IWaiter {
  name: WaiterName;
  waitUntil(): boolean;
  debugInfo(): ITestWaiterDebugInfo[];
}

export interface ITestWaiter<T = Token> extends IWaiter {
  beginAsync(token?: T, label?: string): T;
  endAsync(token: T): void;
}

export interface ITestWaiterDebugInfo {
  stack: string | undefined;
  label: string | undefined;
}

export interface IPendingWaiterState {
  pending: number;
  waiters: {
    [waiterName: string]: ITestWaiterDebugInfo[] | true;
  };
}
