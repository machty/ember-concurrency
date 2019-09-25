/// <reference types="node" />
import { MessageEndpoint, Handler } from '..';
import { ChildProcess } from 'child_process';
import { StagehandOptions } from '../stagehand';
export declare function launch<T>(handler: Handler<T>, options?: StagehandOptions): import("../stagehand").default;
export declare function connect<T>(child: ChildProcess, options?: StagehandOptions): Promise<import("..").Remote<T>>;
export declare function endpointForParentProcess(): MessageEndpoint;
export declare function endpointForChildProcess(child: ChildProcess): MessageEndpoint;
