import { type DocMode } from '@affine/graphql';
import { Entity } from '@toeverything/infra';
import type { DefaultServerService, WorkspaceServerService } from '../../cloud';
import type { WorkspaceService } from '../../workspace';
import type { DocComment, DocCommentChangeListResult, DocCommentContent, DocCommentListResult, DocCommentReply } from '../types';
export declare class DocCommentStore extends Entity<{
    docId: string;
    getDocMode: () => DocMode;
    getDocTitle: () => string;
}> {
    private readonly workspaceService;
    private readonly workspaceServerService;
    private readonly defaultServerService;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService, defaultServerService: DefaultServerService);
    private get serverService();
    private get graphqlService();
    private get currentWorkspaceId();
    listComments({ after, }: {
        after?: string;
    }): Promise<DocCommentListResult>;
    listCommentChanges({ after, }: {
        after?: string;
    }): Promise<DocCommentChangeListResult>;
    createComment(commentInput: {
        content: DocCommentContent;
        mentions?: string[];
    }): Promise<DocComment>;
    updateComment(commentId: string, commentInput: {
        content: DocCommentContent;
    }): Promise<void>;
    resolveComment(commentId: string, resolved?: boolean): Promise<boolean>;
    deleteComment(commentId: string): Promise<boolean>;
    createReply(commentId: string, replyInput: {
        content: DocCommentContent;
        mentions?: string[];
    }): Promise<DocCommentReply>;
    updateReply(replyId: string, replyInput: {
        content: DocCommentContent;
    }): Promise<void>;
    deleteReply(replyId: string): Promise<void>;
    /**
     * Upload a comment attachment blob and obtain the remote URL.
     * @param file File (image/blob) selected by user
     * @returns url string returned by server
     */
    uploadCommentAttachment: (file: File) => Promise<string>;
}
//# sourceMappingURL=doc-comment-store.d.ts.map