import './page-detail-editor.css';
import type { AffineEditorContainer } from '../blocksuite/block-suite-editor';
declare global {
    var currentEditor: AffineEditorContainer | undefined;
}
export type OnLoadEditor = (editor: AffineEditorContainer) => (() => void) | void;
export interface PageDetailEditorProps {
    onLoad?: OnLoadEditor;
    readonly?: boolean;
}
export declare const PageDetailEditor: ({ onLoad, readonly, }: PageDetailEditorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=page-detail-editor.d.ts.map