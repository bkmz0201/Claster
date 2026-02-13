import { type LinkedWidgetConfig } from '@blocksuite/affine/widgets/linked-doc';
import { Service } from '@toeverything/infra';
import { type WorkspaceServerService } from '../../cloud';
import type { WorkspaceDialogService } from '../../dialogs';
import type { DocsService } from '../../doc';
import type { DocDisplayMetaService } from '../../doc-display-meta';
import { type JournalService } from '../../journal';
import type { GuardService, MemberSearchService } from '../../permissions';
import type { DocGrantedUsersService } from '../../permissions/services/doc-granted-users';
import type { SearchMenuService } from '../../search-menu/services';
export declare class AtMenuConfigService extends Service {
    private readonly journalService;
    private readonly docDisplayMetaService;
    private readonly dialogService;
    private readonly docsService;
    private readonly searchMenuService;
    private readonly workspaceServerService;
    private readonly memberSearchService;
    private readonly guardService;
    private readonly docGrantedUsersService;
    constructor(journalService: JournalService, docDisplayMetaService: DocDisplayMetaService, dialogService: WorkspaceDialogService, docsService: DocsService, searchMenuService: SearchMenuService, workspaceServerService: WorkspaceServerService, memberSearchService: MemberSearchService, guardService: GuardService, docGrantedUsersService: DocGrantedUsersService);
    getConfig(): Partial<LinkedWidgetConfig>;
    private insertDoc;
    private readonly autoFocusedItemKey;
    private newDocMenuGroup;
    private journalGroup;
    private linkToDocGroup;
    private highlightFuseTitle;
    private memberGroup;
    private getMenusFn;
    private getMobileConfig;
}
//# sourceMappingURL=index.d.ts.map