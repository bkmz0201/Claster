import { nanoid } from 'nanoid';
import { AwarenessStorageBase } from '../../storage';
import { BroadcastChannelConnection } from './channel';
export class BroadcastChannelAwarenessStorage extends AwarenessStorageBase {
    static { this.identifier = 'BroadcastChannelAwarenessStorage'; }
    get channel() {
        return this.connection.inner;
    }
    constructor(options) {
        super();
        this.options = options;
        this.storageType = 'awareness';
        this.connection = new BroadcastChannelConnection({
            id: this.options.id,
        });
        this.subscriptions = new Map();
    }
    update(record, origin) {
        const subscribers = this.subscriptions.get(record.docId);
        if (subscribers) {
            subscribers.forEach(subscriber => subscriber.onUpdate(record, origin));
        }
        this.channel.postMessage({
            type: 'awareness-update',
            docId: record.docId,
            bin: record.bin,
            origin,
        });
        return Promise.resolve();
    }
    subscribeUpdate(id, onUpdate, onCollect) {
        const subscribers = this.subscriptions.get(id) ?? new Set();
        subscribers.forEach(subscriber => {
            subscriber
                .onCollect()
                .then(awareness => {
                if (awareness) {
                    onUpdate(awareness);
                }
            })
                .catch(error => {
                console.error('error in on collect awareness', error);
            });
        });
        const collectUniqueId = nanoid();
        const onChannelMessage = (message) => {
            if (message.data.type === 'awareness-update' &&
                message.data.docId === id) {
                onUpdate({
                    docId: message.data.docId,
                    bin: message.data.bin,
                }, message.data.origin);
            }
            if (message.data.type === 'awareness-collect' &&
                message.data.docId === id) {
                onCollect()
                    .then(awareness => {
                    if (awareness) {
                        this.channel.postMessage({
                            type: 'awareness-collect-feedback',
                            docId: message.data.docId,
                            bin: awareness.bin,
                            collectId: collectUniqueId,
                        });
                    }
                })
                    .catch(error => {
                    console.error('error in on collect awareness', error);
                });
            }
            if (message.data.type === 'awareness-collect-feedback' &&
                message.data.docId === id &&
                message.data.collectId === collectUniqueId) {
                onUpdate({
                    docId: message.data.docId,
                    bin: message.data.bin,
                });
            }
        };
        this.channel.addEventListener('message', onChannelMessage);
        this.channel.postMessage({
            type: 'awareness-collect',
            docId: id,
            collectId: collectUniqueId,
        });
        const subscriber = {
            onUpdate,
            onCollect,
        };
        subscribers.add(subscriber);
        this.subscriptions.set(id, subscribers);
        return () => {
            subscribers.delete(subscriber);
            this.channel.removeEventListener('message', onChannelMessage);
        };
    }
}
//# sourceMappingURL=awareness.js.map