import type { ReactToLit } from '@affine/component';
import type { AffineReference } from '@blocksuite/affine/inlines/reference';
import type { ExtensionType } from '@blocksuite/affine/store';
export type ReferenceReactRenderer = (reference: AffineReference) => React.ReactElement;
export declare function patchReferenceRenderer(reactToLit: ReactToLit, reactRenderer: ReferenceReactRenderer): ExtensionType;
//# sourceMappingURL=reference-renderer.d.ts.map