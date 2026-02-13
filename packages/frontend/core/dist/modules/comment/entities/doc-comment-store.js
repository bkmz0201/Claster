import { createCommentMutation, createReplyMutation, deleteCommentMutation, deleteReplyMutation, listCommentChangesQuery, listCommentsQuery, resolveCommentMutation, updateCommentMutation, updateReplyMutation, uploadCommentAttachmentMutation, } from '@affine/graphql';
import { Entity } from '@toeverything/infra';
import { GraphQLService } from '../../cloud/services/graphql';
import { findMentions } from './utils';
// Helper functions for normalizing backend responses
const normalizeUser = (user) => ({
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
});
const normalizeReply = (reply) => ({
    id: reply.id,
    commentId: reply.commentId,
    content: reply.content,
    createdAt: new Date(reply.createdAt).getTime(),
    updatedAt: new Date(reply.updatedAt).getTime(),
    user: normalizeUser(reply.user),
    mentions: findMentions(reply.content.snapshot.blocks),
});
const normalizeComment = (comment) => ({
    id: comment.id,
    content: comment.content ? comment.content : undefined,
    resolved: comment.resolved,
    createdAt: new Date(comment.createdAt).getTime(),
    updatedAt: new Date(comment.updatedAt).getTime(),
    user: comment.user
        ? normalizeUser(comment.user)
        : {
            id: '',
            name: '',
            avatarUrl: '',
        },
    mentions: comment.content
        ? findMentions(comment.content.snapshot.blocks)
        : [],
    replies: comment.replies?.map(normalizeReply) ?? [],
});
export class DocCommentStore extends Entity {
    constructor(workspaceService, workspaceServerService, defaultServerService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.defaultServerService = defaultServerService;
        /**
         * Upload a comment attachment blob and obtain the remote URL.
         * @param file File (image/blob) selected by user
         * @returns url string returned by server
         */
        this.uploadCommentAttachment = async (file) => {
            const graphql = this.graphqlService;
            if (!graphql) {
                throw new Error('GraphQL service not found');
            }
            const res = await graphql.gql({
                timeout: 180_000,
                query: uploadCommentAttachmentMutation,
                variables: {
                    workspaceId: this.currentWorkspaceId,
                    docId: this.props.docId,
                    attachment: file,
                },
            });
            return res.uploadCommentAttachment;
        };
    }
    get serverService() {
        return (this.workspaceServerService.server || this.defaultServerService.server);
    }
    get graphqlService() {
        return this.serverService?.scope.get(GraphQLService);
    }
    get currentWorkspaceId() {
        return this.workspaceService.workspace.id;
    }
    async listComments({ after, }) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        const response = await graphql.gql({
            query: listCommentsQuery,
            variables: {
                pagination: {
                    after,
                },
                workspaceId: this.currentWorkspaceId,
                docId: this.props.docId,
            },
        });
        const comments = response.workspace?.comments;
        if (!comments) {
            return {
                comments: [],
                hasNextPage: false,
                startCursor: '',
                endCursor: '',
            };
        }
        return {
            comments: comments.edges.map(edge => normalizeComment(edge.node)),
            hasNextPage: comments.pageInfo.hasNextPage,
            startCursor: comments.pageInfo.startCursor || '',
            endCursor: comments.pageInfo.endCursor || '',
        };
    }
    // pool every 30s
    async listCommentChanges({ after, }) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        const response = await graphql.gql({
            query: listCommentChangesQuery,
            variables: {
                pagination: {
                    after,
                },
                workspaceId: this.currentWorkspaceId,
                docId: this.props.docId,
            },
        });
        const commentChanges = response.workspace?.commentChanges;
        if (!commentChanges) {
            return {
                changes: [],
                startCursor: '',
                endCursor: after ?? '',
                hasNextPage: false,
            };
        }
        return {
            changes: commentChanges.edges.map(edge => ({
                id: edge.node.id,
                action: edge.node.action,
                comment: normalizeComment(edge.node.item),
                commentId: edge.node.commentId || undefined,
            })),
            startCursor: commentChanges.pageInfo.startCursor || '',
            endCursor: commentChanges.pageInfo.endCursor || '',
            hasNextPage: commentChanges.pageInfo.hasNextPage,
        };
    }
    async createComment(commentInput) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        const mentions = commentInput.mentions;
        const response = await graphql.gql({
            query: createCommentMutation,
            variables: {
                input: {
                    workspaceId: this.currentWorkspaceId,
                    docId: this.props.docId,
                    docMode: this.props.getDocMode(),
                    docTitle: this.props.getDocTitle(),
                    content: commentInput.content,
                    mentions,
                },
            },
        });
        const comment = response.createComment;
        return normalizeComment(comment);
    }
    async updateComment(commentId, commentInput) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        await graphql.gql({
            query: updateCommentMutation,
            variables: {
                input: {
                    id: commentId,
                    content: commentInput.content,
                },
            },
        });
    }
    async resolveComment(commentId, resolved = true) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        const response = await graphql.gql({
            query: resolveCommentMutation,
            variables: {
                input: {
                    id: commentId,
                    resolved,
                },
            },
        });
        return response.resolveComment;
    }
    async deleteComment(commentId) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        const response = await graphql.gql({
            query: deleteCommentMutation,
            variables: {
                id: commentId,
            },
        });
        return response.deleteComment;
    }
    async createReply(commentId, replyInput) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        const response = await graphql.gql({
            query: createReplyMutation,
            variables: {
                input: {
                    commentId,
                    content: replyInput.content,
                    docMode: this.props.getDocMode(),
                    docTitle: this.props.getDocTitle(),
                    mentions: replyInput.mentions,
                },
            },
        });
        return normalizeReply(response.createReply);
    }
    async updateReply(replyId, replyInput) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        await graphql.gql({
            query: updateReplyMutation,
            variables: {
                input: {
                    id: replyId,
                    content: replyInput.content,
                },
            },
        });
    }
    async deleteReply(replyId) {
        const graphql = this.graphqlService;
        if (!graphql) {
            throw new Error('GraphQL service not found');
        }
        await graphql.gql({
            query: deleteReplyMutation,
            variables: {
                id: replyId,
            },
        });
    }
}
//# sourceMappingURL=doc-comment-store.js.map