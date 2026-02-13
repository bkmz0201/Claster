import type { DocTitle } from '@blocksuite/affine/fragments/doc-title';
import type { DocMode, RootBlockModel } from '@blocksuite/affine/model';
import type { BlockStdScope, EditorHost } from '@blocksuite/affine/std';
import type { Store } from '@blocksuite/affine/store';
import type { HTMLAttributes } from 'react';
import type { DefaultOpenProperty } from '../../components/properties';
export interface AffineEditorContainer extends HTMLElement {
    page: Store;
    doc: Store;
    docTitle: DocTitle;
    host?: EditorHost;
    model: RootBlockModel | null;
    updateComplete: Promise<boolean>;
    mode: DocMode;
    origin: HTMLDivElement;
    std: BlockStdScope;
}
export interface EditorProps extends HTMLAttributes<HTMLDivElement> {
    page: Store;
    mode: DocMode;
    shared?: boolean;
    readonly?: boolean;
    defaultOpenProperty?: DefaultOpenProperty;
    onEditorReady?: (editor: AffineEditorContainer) => (() => void) | void;
}
export declare const BlockSuiteEditor: (props: EditorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=blocksuite-editor.d.ts.map