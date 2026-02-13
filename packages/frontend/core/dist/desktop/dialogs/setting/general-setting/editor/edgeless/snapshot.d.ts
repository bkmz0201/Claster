import type { EditorSettingSchema } from '@affine/core/modules/editor-setting';
import type { EditorHost } from '@blocksuite/affine/std';
import { type GfxPrimitiveElementModel } from '@blocksuite/affine/std/gfx';
import type { Block, Store } from '@blocksuite/affine/store';
import { type DocName } from './docs';
interface Props {
    title: string;
    docName: DocName;
    keyName: keyof EditorSettingSchema;
    height?: number;
    getElements: (doc: Store) => Array<Block | GfxPrimitiveElementModel>;
    firstUpdate?: (doc: Store, editorHost: EditorHost) => void;
    children?: React.ReactElement;
}
export declare const EdgelessSnapshot: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=snapshot.d.ts.map