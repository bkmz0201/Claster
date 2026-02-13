import type { DocCreateOptions } from '@affine/core/modules/doc/types';
import { type NoteProps, type ParagraphProps, type RootBlockProps } from '@blocksuite/affine/model';
import type { SurfaceBlockProps } from '@blocksuite/affine/std/gfx';
import { type Store } from '@blocksuite/affine/store';
export interface DocProps {
    page?: Partial<RootBlockProps>;
    surface?: Partial<SurfaceBlockProps>;
    note?: Partial<NoteProps>;
    paragraph?: Partial<ParagraphProps>;
    onStoreLoad?: (doc: Store, props: {
        noteId: string;
        paragraphId: string;
        surfaceId: string;
    }) => void;
}
export declare function initDocFromProps(doc: Store, props?: DocProps, options?: DocCreateOptions): void;
//# sourceMappingURL=index.d.ts.map