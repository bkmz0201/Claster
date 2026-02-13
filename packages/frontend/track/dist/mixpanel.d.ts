import type { Dict } from 'mixpanel-browser';
type Middleware = (name: string, properties?: Record<string, unknown>) => Record<string, unknown>;
export declare const mixpanel: {
    init(): void;
    register(props: Dict): void;
    reset(): void;
    track(event_name: string, properties?: Record<string, any>): void;
    middleware(cb: Middleware): () => void;
    opt_out_tracking(): void;
    opt_in_tracking(): void;
    has_opted_in_tracking(): void;
    has_opted_out_tracking(): void;
    identify(unique_id?: string): void;
    readonly people: import("mixpanel-browser").People;
    track_pageview(properties?: {
        location?: string;
    }): void;
};
export {};
//# sourceMappingURL=mixpanel.d.ts.map