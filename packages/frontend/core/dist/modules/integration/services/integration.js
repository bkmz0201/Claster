import { LiveData, Service } from '@toeverything/infra';
import { CalendarIntegration } from '../entities/calendar';
import { ReadwiseIntegration } from '../entities/readwise';
import { IntegrationWriter } from '../entities/writer';
export class IntegrationService extends Service {
    constructor() {
        super();
        this.writer = this.framework.createEntity(IntegrationWriter);
        this.readwise = this.framework.createEntity(ReadwiseIntegration, {
            writer: this.writer,
        });
        this.calendar = this.framework.createEntity(CalendarIntegration);
        this.importing$ = LiveData.computed(get => {
            return get(this.readwise.importing$);
        });
    }
}
//# sourceMappingURL=integration.js.map