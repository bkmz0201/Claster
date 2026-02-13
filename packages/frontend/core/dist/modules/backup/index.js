import {} from '@toeverything/infra';
import { DesktopApiService } from '../desktop-api';
import { WorkspacesService } from '../workspace';
import { BackupService } from './services';
export function configureDesktopBackupModule(framework) {
    framework.service(BackupService, [DesktopApiService, WorkspacesService]);
}
//# sourceMappingURL=index.js.map