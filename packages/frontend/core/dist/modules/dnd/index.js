import {} from '@toeverything/infra';
import { DocsService } from '../doc';
import { EditorSettingService } from '../editor-setting';
import { WorkspaceScope, WorkspaceService } from '../workspace';
import { DndService } from './services';
export function configureDndModule(framework) {
    framework
        .scope(WorkspaceScope)
        .service(DndService, [DocsService, WorkspaceService, EditorSettingService]);
}
//# sourceMappingURL=index.js.map