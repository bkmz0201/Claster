import { Entity } from '@toeverything/infra';
import type { TagService } from '../../tag';
import { type WorkspaceService } from '../../workspace';
export declare class IntegrationWriter extends Entity {
    private readonly workspaceService;
    private readonly tagService;
    constructor(workspaceService: WorkspaceService, tagService: TagService);
    writeDoc(options: {
        /**
         * Title of the doc
         */
        title?: string;
        /**
         * Markdown string
         */
        content: string;
        /**
         * Comment of the markdown content
         */
        comment?: string | null;
        /**
         * Doc id, if not provided, a new doc will be created
         */
        docId?: string;
        /**
         * Update strategy, default is `override`
         */
        updateStrategy?: 'override' | 'append';
        /**
         * Tags to apply to the doc
         */
        tags?: string[];
    }): Promise<string>;
    applyTags(docId: string, tags?: string[]): Promise<void>;
}
//# sourceMappingURL=writer.d.ts.map