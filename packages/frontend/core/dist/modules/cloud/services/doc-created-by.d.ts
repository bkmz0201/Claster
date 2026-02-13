import { Service } from '@toeverything/infra';
import { type DocRecord } from '../../doc';
import type { DocCreateOptions } from '../../doc/types';
import type { WorkspaceServerService } from './workspace-server';
export declare class DocCreatedByService extends Service {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    onDocCreated(event: {
        doc: DocRecord;
        docCreateOptions: DocCreateOptions;
    }): void;
}
//# sourceMappingURL=doc-created-by.d.ts.map