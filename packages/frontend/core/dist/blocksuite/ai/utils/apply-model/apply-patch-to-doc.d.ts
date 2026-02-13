import type { Store } from '@blocksuite/store';
import type { PatchOp } from './markdown-diff';
/**
 * Apply a list of PatchOp to the page doc (children of the first note block)
 * @param doc The page document Store
 * @param patch Array of PatchOp
 */
export declare function applyPatchToDoc(doc: Store, patch: PatchOp[]): Promise<void>;
//# sourceMappingURL=apply-patch-to-doc.d.ts.map