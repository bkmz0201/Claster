import type { FrameworkProvider } from '.';
import type { Service } from './components/service';
export interface FrameworkEvent<T> {
    id: string;
    _type: T;
}
export declare function createEvent<T>(id: string): FrameworkEvent<T>;
export type FrameworkEventType<T> = T extends FrameworkEvent<infer E> ? E : never;
export declare class EventBus {
    private readonly parent?;
    private listeners;
    constructor(provider: FrameworkProvider, parent?: EventBus | undefined);
    get root(): EventBus;
    on<T>(event: FrameworkEvent<T>, listener: (event: T) => void): () => void;
    private off;
    emit<T>(event: FrameworkEvent<T>, payload: T): void;
    dispose(): void;
}
interface EventHandler {
    event: FrameworkEvent<any>;
    handler: (payload: any) => void;
}
export declare const EventHandler: import("./types").Identifier<EventHandler> & ((variant: import("./types").ComponentVariant) => import("./types").Identifier<EventHandler>);
export declare const OnEvent: <E extends FrameworkEvent<any>, C extends abstract new (...args: any) => any, I = InstanceType<C>>(e: E, pick: I extends Service ? (i: I) => (e: FrameworkEventType<E>) => void : never) => (target: C) => C;
export {};
//# sourceMappingURL=event.d.ts.map