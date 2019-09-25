import { MessageEndpoint, Implementation } from '..';
export declare function launch<T>(implementation: Implementation<T>): Promise<import("../stagehand").default>;
export declare function connect<T>(worker: Worker): Promise<import("..").Remote<T>>;
export declare function endpointForWorker(worker: Worker): MessageEndpoint;
export declare function endpointForParent(): MessageEndpoint;
