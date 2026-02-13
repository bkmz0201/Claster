import type { Store } from '@blocksuite/affine/store';
import { Scope } from '@toeverything/infra';
import type { DocRecord } from '../entities/record';
export declare class DocScope extends Scope<{
    docId: string;
    record: DocRecord;
    blockSuiteDoc: Store;
}> {
}
//# sourceMappingURL=doc.d.ts.map