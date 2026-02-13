import { AutoReconnectConnection } from '../../connection';
export interface BroadcastChannelConnectionOptions {
    id: string;
}
export declare class BroadcastChannelConnection extends AutoReconnectConnection<BroadcastChannel> {
    private readonly opts;
    readonly channelName: string;
    constructor(opts: BroadcastChannelConnectionOptions);
    doConnect(): Promise<BroadcastChannel>;
    doDisconnect(channel: BroadcastChannel): void;
}
//# sourceMappingURL=channel.d.ts.map