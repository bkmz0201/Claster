import { Service } from '@toeverything/infra';
import type { ServerService } from './server';
export declare class EventSourceService extends Service {
    private readonly serverService;
    constructor(serverService: ServerService);
    eventSource: (url: string, eventSourceInitDict?: EventSourceInit) => EventSource;
}
//# sourceMappingURL=eventsource.d.ts.map