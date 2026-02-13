import type { BaseSelection, DocSnapshot, Store } from '@blocksuite/affine/store';
import type { BlockStdScope } from '@blocksuite/std';
import { Entity, LiveData } from '@toeverything/infra';
import { type DocDisplayMetaService } from '../../doc-display-meta';
import type { SnapshotHelper } from '../services/snapshot-helper';
import type { CommentAttachment, CommentId, DocComment, DocCommentContent, DocCommentReply, PendingComment } from '../types';
type DisposeCallback = () => void;
type EditingDraft = {
    id: CommentId;
    type: 'comment' | 'reply';
    doc: Store;
    attachments: CommentAttachment[];
};
export declare class DocCommentEntity extends Entity<{
    docId: string;
    std: BlockStdScope | null;
}> {
    private readonly snapshotHelper;
    private readonly docDisplayMetaService;
    constructor(snapshotHelper: SnapshotHelper, docDisplayMetaService: DocDisplayMetaService);
    private readonly store;
    loading$: LiveData<boolean>;
    comments$: LiveData<DocComment[]>;
    commentsInEditor$: LiveData<string[]>;
    readonly pendingComment$: LiveData<PendingComment | null>;
    readonly pendingReply$: LiveData<PendingComment | null>;
    readonly editingDraft$: LiveData<EditingDraft | null>;
    private readonly commentAdded$;
    private readonly commentResolved$;
    private readonly commentDeleted$;
    readonly commentHighlighted$: LiveData<string | null>;
    private pollingDisposable?;
    private startCursor?;
    addComment(selections?: BaseSelection[], preview?: string): Promise<string>;
    /**
     * Add a reply to a comment.
     * If reply is provided, the content should @mention the user who is replying to.
     */
    addReply(commentId: string, reply?: DocCommentReply): Promise<string>;
    dismissDraftComment(): void;
    dismissDraftReply(): void;
    /**
     * Start editing an existing comment or reply.
     * This will dismiss any previous editing draft so that only one can exist.
     */
    startEdit(id: CommentId, type: 'comment' | 'reply', snapshot: DocSnapshot, attachments: CommentAttachment[]): Promise<void>;
    /** Commit current editing draft (if any) */
    commitEditing(): Promise<void>;
    /** Dismiss current editing draft without saving */
    dismissDraftEditing(): void;
    get docMode$(): LiveData<import("@blocksuite/affine-model").DocMode | null | undefined>;
    commitComment(id: string): Promise<void>;
    commitReply(id: string): Promise<void>;
    deleteComment(id: string): Promise<void>;
    deleteReply(replyId: string): Promise<void>;
    /**
     * Upload an attachment file for the draft/editing comment/reply.
     * @param file File to upload
     * @returns
     */
    uploadCommentAttachment: (id: string, file: File, pending: PendingComment | EditingDraft) => Promise<string>;
    updateComment(id: string, content: DocCommentContent): Promise<void>;
    updateReply(id: string, content: DocCommentContent): Promise<void>;
    updatePendingComment(id: string, patch: Partial<PendingComment>): void;
    updatePendingReply(id: string, patch: Partial<PendingComment>): void;
    updateEditingDraft(id: string, patch: Partial<EditingDraft>): void;
    resolveComment(id: CommentId, resolved: boolean): Promise<void>;
    highlightComment(id: CommentId | null): void;
    getComments(type?: 'resolved' | 'unresolved' | 'all'): Promise<CommentId[]>;
    onCommentAdded(callback: (id: CommentId, selections: BaseSelection[]) => void): DisposeCallback;
    onCommentResolved(callback: (id: CommentId) => void): DisposeCallback;
    onCommentDeleted(callback: (id: CommentId) => void): DisposeCallback;
    onCommentHighlighted(callback: (id: CommentId | null) => void): DisposeCallback;
    start(): void;
    stop(): void;
    private handleCommentChanges;
    private handleReplyChange;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    private readonly revalidateCommentsInEditor;
    private getCommentsInEditor;
    dispose(): void;
}
export {};
//# sourceMappingURL=doc-comment.d.ts.map