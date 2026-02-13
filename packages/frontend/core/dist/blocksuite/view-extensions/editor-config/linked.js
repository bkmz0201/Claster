import { AtMenuConfigService } from '@affine/core/modules/at-menu-config/services';
import {} from '@toeverything/infra';
export function createLinkedWidgetConfig(framework) {
    const service = framework.getOptional(AtMenuConfigService);
    if (!service)
        return;
    return service.getConfig();
}
//# sourceMappingURL=linked.js.map