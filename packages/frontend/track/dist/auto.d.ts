import type { CallableEventsChain, EventsUnion } from './types';
interface TrackFn {
    (event: string, props: Record<string, any>): void;
}
export declare function makeTracker(trackFn: TrackFn): CallableEventsChain;
/**
 * listen on clicking on all subtree elements and auto track events if defined
 *
 * @example
 *
 * ```html
 * <button
 *   data-event-chain='$.cmdk.settings.changeLanguage'
 *   data-event-arg='cn'
 *   <!-- or -->
 *   data-event-args-foo='bar'
 * />
 * ```
 */
export declare function enableAutoTrack(root: HTMLElement, trackFn: TrackFn): () => void;
declare module 'react' {
    interface HTMLAttributes<T> {
        'data-event-props'?: EventsUnion;
        'data-event-arg'?: string;
        'data-event-args-control'?: string;
    }
}
export {};
//# sourceMappingURL=auto.d.ts.map