import { DebugLogger } from '@affine/debug';
import { stableHash } from '../../utils';
import { SUB_COMPONENTS } from './consts';
import { createIdentifier } from './identifier';
export function createEvent(id) {
    return { id, _type: {} };
}
const logger = new DebugLogger('affine:event-bus');
export class EventBus {
    constructor(provider, parent) {
        this.parent = parent;
        this.listeners = {};
        const handlers = provider.getAll(EventHandler, {
            sameScope: true,
        });
        for (const handler of handlers.values()) {
            this.on(handler.event, handler.handler);
        }
    }
    get root() {
        return this.parent?.root ?? this;
    }
    on(event, listener) {
        if (!this.listeners[event.id]) {
            this.listeners[event.id] = [];
        }
        this.listeners[event.id].push(listener);
        const off = this.parent?.on(event, listener);
        return () => {
            off?.();
            this.off(event.id, listener);
        };
    }
    off(eventId, listener) {
        if (!this.listeners[eventId]) {
            return;
        }
        this.listeners[eventId] = this.listeners[eventId].filter(l => l !== listener);
    }
    emit(event, payload) {
        logger.debug('Emitting event', event.id, payload);
        const listeners = this.listeners[event.id];
        if (!listeners) {
            return;
        }
        listeners.forEach(listener => {
            try {
                listener(payload);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    dispose() {
        for (const eventId of Object.keys(this.listeners)) {
            for (const listener of this.listeners[eventId]) {
                this.parent?.off(eventId, listener);
            }
        }
        this.listeners = {};
    }
}
export const EventHandler = createIdentifier('EventHandler');
export const OnEvent = (e, pick) => {
    return (target) => {
        const handlers = target[SUB_COMPONENTS] ?? [];
        target[SUB_COMPONENTS] = [
            ...handlers,
            {
                identifier: EventHandler(target.name + stableHash(e) + stableHash(pick)),
                factory: provider => {
                    return {
                        event: e,
                        handler: (payload) => {
                            const i = provider.get(target);
                            pick(i).apply(i, [payload]);
                        },
                    };
                },
            },
        ];
        return target;
    };
};
//# sourceMappingURL=event.js.map