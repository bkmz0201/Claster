export { DocsSearchService } from './services/docs-search';
import {} from '@toeverything/infra';
import { DocsService } from '../doc';
import { WorkspaceScope, WorkspaceService } from '../workspace';
import { DocsSearchService } from './services/docs-search';
export function configureDocsSearchModule(framework) {
    framework
        .scope(WorkspaceScope)
        .service(DocsSearchService, [WorkspaceService, DocsService]);
}
//# sourceMappingURL=index.js.map