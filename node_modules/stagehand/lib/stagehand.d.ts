import { MessageEndpoint } from './index';
export default class Stagehand {
    private endpoint?;
    private commandCoordinator?;
    private handleRegistry;
    private implementation?;
    constructor(implementation?: {});
    isConnected(): boolean;
    listen(endpoint: MessageEndpoint): Promise<void>;
    connect(endpoint: MessageEndpoint): Promise<{
        name: string;
        methods: string[];
    }>;
    call(method: string, args: unknown[]): Promise<unknown>;
    disconnect(): Promise<void>;
    private startup;
    private shutdown;
    private rehydrateRemoteFunction;
    private executor;
}
