import FunctionHandleRegistry from './function-handle-registry';
import { MessageEndpoint } from '.';
/**
 * Coordinates command/response pairs across a given `MessageEndpoint`, returning
 * a promise for each outgoing command and dispatching incoming ones to a given
 * executor.
 */
export default class CommandCoordinator<Commands> {
    private endpoint;
    private handleRegistry;
    private executor;
    private nextSeq;
    private pendingCommands;
    constructor(endpoint: MessageEndpoint, handleRegistry: FunctionHandleRegistry, executor: Commands);
    sendCommand<Name extends keyof Commands>(name: Name, ...args: CommandParams<Commands[Name]>): Promise<CommandReturn<Commands[Name]>>;
    private messageReceived;
    private dispatchResponse;
    private dispatchCommand;
    private sendMessage;
    private pendingDeferred;
    private isResponse;
    private isCommand;
}
declare type CommandParams<T> = T extends (...params: infer Params) => any ? Params : never;
declare type CommandReturn<T> = T extends (...params: any[]) => infer Return ? Return : never;
export {};
