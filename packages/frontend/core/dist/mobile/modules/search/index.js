import { WorkspaceScope } from '@affine/core/modules/workspace';
import {} from '@toeverything/infra';
import { MobileSearchService } from './service/search';
export { MobileSearchService };
export function configureMobileSearchModule(framework) {
    framework.scope(WorkspaceScope).service(MobileSearchService);
}
//# sourceMappingURL=index.js.map