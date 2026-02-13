import { ChatPanel } from '@affine/core/blocksuite/ai';
import type { AffineEditorContainer } from '@affine/core/blocksuite/block-suite-editor';
export interface SidebarTabProps {
    editor: AffineEditorContainer | null;
    onLoad?: ((component: HTMLElement) => void) | null;
}
export declare const EditorChatPanel: import("react").ForwardRefExoticComponent<SidebarTabProps & import("react").RefAttributes<ChatPanel>>;
//# sourceMappingURL=chat.d.ts.map