import { getViewManager } from '@affine/core/blocksuite/manager/view';
import { DebugLogger } from '@affine/debug';
import { BlockStdScope } from '@blocksuite/affine/std';
import { useMemo } from 'react';
const logger = new DebugLogger('doc-info');
// todo(pengx17): use rc pool?
export function createBlockStdScope(doc) {
    logger.debug('createBlockStdScope', doc.id);
    const std = new BlockStdScope({
        store: doc,
        extensions: getViewManager().config.init().value.get('page'),
    });
    return std;
}
export function useBlockStdScope(doc) {
    return useMemo(() => createBlockStdScope(doc), [doc]);
}
//# sourceMappingURL=use-std.js.map