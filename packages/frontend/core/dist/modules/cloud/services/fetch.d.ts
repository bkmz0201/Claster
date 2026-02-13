import { Service } from '@toeverything/infra';
import type { ServerService } from './server';
export type FetchInit = RequestInit & {
    timeout?: number;
};
export declare class FetchService extends Service {
    private readonly serverService;
    constructor(serverService: ServerService);
    rxFetch: (input: string, init?: RequestInit & {
        priority?: "auto" | "low" | "high";
    } & {
        traceEvent?: string;
    }) => import("rxjs").Observable<Response>;
    /**
     * fetch with custom custom timeout and error handling.
     */
    fetch: (input: string, init?: FetchInit) => Promise<Response>;
}
//# sourceMappingURL=fetch.d.ts.map