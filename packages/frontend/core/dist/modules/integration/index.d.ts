import type { Framework } from '@toeverything/infra';
import { IntegrationService } from './services/integration';
export { IntegrationService };
export { CalendarIntegration } from './entities/calendar';
export { CalendarSubscription } from './entities/calendar-subscription';
export type { CalendarEvent } from './type';
export { IntegrationTypeIcon } from './views/icon';
export { DocIntegrationPropertiesTable } from './views/properties-table';
export declare function configureIntegrationModule(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map