import { AutoReconnectConnection } from '../../connection';
export class BroadcastChannelConnection extends AutoReconnectConnection {
    constructor(opts) {
        super();
        this.opts = opts;
        this.channelName = `channel:${this.opts.id}`;
    }
    async doConnect() {
        return new BroadcastChannel(this.channelName);
    }
    doDisconnect(channel) {
        channel.close();
    }
}
//# sourceMappingURL=channel.js.map