import 'katex/dist/katex.min.css';
import { type EdgelessEditor, type PageEditor } from '@affine/core/blocksuite/editors';
import type { DocTitle } from '@blocksuite/affine/fragments/doc-title';
import type { Store } from '@blocksuite/affine/store';
import type React from 'react';
import { type DefaultOpenProperty } from '../../components/properties';
interface BlocksuiteEditorProps {
    page: Store;
    readonly?: boolean;
    shared?: boolean;
    defaultOpenProperty?: DefaultOpenProperty;
}
export declare const BlocksuiteDocEditor: React.ForwardRefExoticComponent<BlocksuiteEditorProps & {
    onClickBlank?: () => void;
    titleRef?: React.Ref<DocTitle>;
} & React.RefAttributes<PageEditor>>;
export declare const BlocksuiteEdgelessEditor: React.ForwardRefExoticComponent<BlocksuiteEditorProps & React.RefAttributes<EdgelessEditor>>;
export {};
//# sourceMappingURL=lit-adaper.d.ts.map