import { WorkspaceImpl } from '@affine/core/modules/workspace/impls/workspace';
import type { Store } from '@blocksuite/affine/store';
export declare const getCollection: () => WorkspaceImpl;
export type DocName = 'note' | 'pen' | 'shape' | 'flow' | 'text' | 'connector' | 'mindmap' | 'frame';
export declare function getDocByName(name: DocName): Promise<Store | undefined>;
//# sourceMappingURL=index.d.ts.map