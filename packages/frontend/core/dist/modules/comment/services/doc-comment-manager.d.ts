import type { BlockStdScope } from '@blocksuite/std';
import { Service } from '@toeverything/infra';
import { DocCommentEntity } from '../entities/doc-comment';
type DocId = string;
export declare class DocCommentManagerService extends Service {
    constructor();
    std: BlockStdScope | null;
    private readonly pool;
    get(docId: DocId): import("@toeverything/infra").RcRef<DocCommentEntity>;
}
export {};
//# sourceMappingURL=doc-comment-manager.d.ts.map