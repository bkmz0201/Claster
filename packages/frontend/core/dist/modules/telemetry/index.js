import {} from '@toeverything/infra';
import { ServersService } from '../cloud';
import { GlobalContextService } from '../global-context';
import { TelemetryService } from './services/telemetry';
export function configureTelemetryModule(framework) {
    framework.service(TelemetryService, [GlobalContextService, ServersService]);
}
//# sourceMappingURL=index.js.map