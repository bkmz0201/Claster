import {} from '@toeverything/infra';
import { WorkspacesService } from '../workspace';
import { ImportClipperService } from './services/import';
export { ImportClipperService } from './services/import';
export function configureImportClipperModule(framework) {
    framework.service(ImportClipperService, [WorkspacesService]);
}
//# sourceMappingURL=index.js.map