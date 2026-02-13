import type { CommentChangeAction, PublicUserType } from '@affine/graphql';
import type { DocMode } from '@blocksuite/affine/model';
import type { BaseSelection, DocSnapshot, Store } from '@blocksuite/affine/store';
export type CommentId = string;
export type CommentAttachment = {
    id: string;
    url?: string;
    filename?: string;
    mimeType?: string;
    size?: number;
};
export interface BaseComment {
    id: CommentId;
    content?: DocCommentContent;
    createdAt: number;
    updatedAt: number;
    user: PublicUserType;
}
export interface DocComment extends BaseComment {
    resolved: boolean;
    mentions: string[];
    replies?: DocCommentReply[];
}
export type PendingComment = {
    id: CommentId;
    doc: Store;
    preview?: string;
    selections?: BaseSelection[];
    commentId?: CommentId;
    attachments: CommentAttachment[];
};
export interface DocCommentReply extends BaseComment {
    commentId: CommentId;
    mentions: string[];
}
export type DocCommentContent = {
    snapshot: DocSnapshot;
    attachments?: CommentAttachment[];
    mode?: DocMode;
    preview?: string;
};
export interface DocCommentListResult {
    comments: DocComment[];
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
}
export interface DocCommentChange {
    action: CommentChangeAction;
    comment: DocComment;
    id: CommentId;
    commentId?: CommentId;
}
export type DocCommentChangeListResult = {
    changes: DocCommentChange[];
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
};
//# sourceMappingURL=types.d.ts.map