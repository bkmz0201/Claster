import type { CommentAttachment } from '@affine/core/modules/comment/types';
import { type DocSnapshot, Store } from '@blocksuite/affine/store';
interface EditorAttachment extends CommentAttachment {
    status?: 'uploading' | 'success' | 'error';
    file?: File;
    localUrl?: string;
}
interface CommentEditorProps {
    readonly?: boolean;
    doc?: Store;
    defaultSnapshot?: DocSnapshot;
    onChange?: (snapshot: DocSnapshot) => void;
    onCommit?: () => void;
    onCancel?: () => void;
    /**
     * upload comment attachment to the server
     * @param file
     * @returns remote url of the attachment
     */
    uploadCommentAttachment?: (id: string, file: File) => Promise<string>;
    autoFocus?: boolean;
    attachments?: EditorAttachment[];
    onAttachmentsChange?: (atts: EditorAttachment[]) => void;
}
export interface CommentEditorRef {
    getSnapshot: () => DocSnapshot | null | undefined;
    focus: () => void;
}
export declare const CommentEditor: import("react").ForwardRefExoticComponent<CommentEditorProps & import("react").RefAttributes<CommentEditorRef>>;
export {};
//# sourceMappingURL=index.d.ts.map