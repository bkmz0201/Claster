import { Service } from '@toeverything/infra';
export class EventSourceService extends Service {
    constructor(serverService) {
        super();
        this.serverService = serverService;
        this.eventSource = (url, eventSourceInitDict) => {
            return new EventSource(new URL(url, this.serverService.server.baseUrl), eventSourceInitDict);
        };
    }
}
//# sourceMappingURL=eventsource.js.map