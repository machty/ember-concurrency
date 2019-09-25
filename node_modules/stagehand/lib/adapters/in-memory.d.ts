import { Implementation, Remote, MessageEndpoint } from '..';
export declare function connectLocal<T>(handler: Implementation<T>): Promise<Remote<T>>;
export declare function endpointPair(): [MessageEndpoint, MessageEndpoint];
