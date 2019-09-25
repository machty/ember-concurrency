/// <reference types="node" />
import { MessageEndpoint, Implementation } from '..';
import { ChildProcess } from 'child_process';
export declare function launch<T>(handler: Implementation<T>): Promise<import("../stagehand").default>;
export declare function connect<T>(child: ChildProcess): Promise<import("..").Remote<T>>;
export declare function endpointForParentProcess(): MessageEndpoint;
export declare function endpointForChildProcess(child: ChildProcess): MessageEndpoint;
