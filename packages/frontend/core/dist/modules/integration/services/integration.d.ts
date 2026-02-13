import { LiveData, Service } from '@toeverything/infra';
import { CalendarIntegration } from '../entities/calendar';
import { ReadwiseIntegration } from '../entities/readwise';
import { IntegrationWriter } from '../entities/writer';
export declare class IntegrationService extends Service {
    writer: IntegrationWriter;
    readwise: ReadwiseIntegration;
    calendar: CalendarIntegration;
    constructor();
    importing$: LiveData<boolean>;
}
//# sourceMappingURL=integration.d.ts.map