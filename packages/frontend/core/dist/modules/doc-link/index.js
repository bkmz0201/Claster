import {} from '@toeverything/infra';
import { DocScope } from '../doc/scopes/doc';
import { DocService } from '../doc/services/doc';
import { DocsService } from '../doc/services/docs';
import { DocsSearchService } from '../docs-search';
import { FeatureFlagService } from '../feature-flag';
import { WorkspaceScope, WorkspaceService } from '../workspace';
import { DocBacklinks } from './entities/doc-backlinks';
import { DocLinks } from './entities/doc-links';
import { DocLinksService } from './services/doc-links';
export { DocLinksService } from './services/doc-links';
export function configureDocLinksModule(framework) {
    framework
        .scope(WorkspaceScope)
        .scope(DocScope)
        .service(DocLinksService)
        .entity(DocBacklinks, [
        DocsSearchService,
        DocService,
        DocsService,
        FeatureFlagService,
        WorkspaceService,
    ])
        .entity(DocLinks, [DocsSearchService, DocService]);
}
//# sourceMappingURL=index.js.map