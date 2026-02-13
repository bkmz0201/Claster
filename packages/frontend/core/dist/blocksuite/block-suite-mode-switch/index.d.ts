import type { DocMode } from '@blocksuite/affine/model';
export interface EditorModeSwitchProps {
    pageId: string;
    isPublic?: boolean;
    publicMode?: DocMode;
}
export declare const EditorModeSwitch: () => import("react/jsx-runtime").JSX.Element;
export interface PureEditorModeSwitchProps {
    mode?: DocMode;
    setMode?: (mode: DocMode) => void;
    hidePage?: boolean;
    hideEdgeless?: boolean;
}
export declare const PureEditorModeSwitch: ({ mode, setMode, hidePage, hideEdgeless, }: PureEditorModeSwitchProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map