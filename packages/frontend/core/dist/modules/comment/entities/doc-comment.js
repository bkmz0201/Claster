import { DocMode } from '@affine/graphql';
import { track } from '@affine/track';
import { InlineCommentManager } from '@blocksuite/affine/inlines/comment';
import { effect, Entity, fromPromise, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { catchError, filter, first, of, Subject, switchMap, tap, timer, } from 'rxjs';
import {} from '../../doc-display-meta';
import { GlobalContextService } from '../../global-context';
import { DocCommentStore } from './doc-comment-store';
import { findMentions } from './utils';
export class DocCommentEntity extends Entity {
    constructor(snapshotHelper, docDisplayMetaService) {
        super();
        this.snapshotHelper = snapshotHelper;
        this.docDisplayMetaService = docDisplayMetaService;
        this.store = this.framework.createEntity(DocCommentStore, {
            docId: this.props.docId,
            getDocMode: () => this.docMode$.value === 'edgeless' ? DocMode.edgeless : DocMode.page,
            getDocTitle: () => {
                return this.docDisplayMetaService.title$(this.props.docId).value;
            },
        });
        this.loading$ = new LiveData(false);
        this.comments$ = new LiveData([]);
        this.commentsInEditor$ = new LiveData([]);
        // Only one pending comment at a time (for new comments)
        this.pendingComment$ = new LiveData(null);
        // Only one pending reply at a time
        this.pendingReply$ = new LiveData(null);
        // Draft state for editing existing comment or reply (only one at a time)
        this.editingDraft$ = new LiveData(null);
        this.commentAdded$ = new Subject();
        this.commentResolved$ = new Subject();
        this.commentDeleted$ = new Subject();
        this.commentHighlighted$ = new LiveData(null);
        /**
         * Upload an attachment file for the draft/editing comment/reply.
         * @param file File to upload
         * @returns
         */
        this.uploadCommentAttachment = async (id, file, pending) => {
            // check if the given pending comment is the same as the current comment or reply
            const isPendingComment = pending.id === this.pendingComment$.value?.id;
            const isPendingReply = pending.id === this.pendingReply$.value?.id;
            const isEditingDraft = pending.id === this.editingDraft$.value?.id;
            if (!isPendingComment && !isPendingReply && !isEditingDraft) {
                throw new Error('Pending comment/reply not found');
            }
            const url = await this.store.uploadCommentAttachment(file);
            // todo: should be immutable
            pending.attachments.push({
                id,
                url,
                filename: file.name,
                mimeType: file.type,
                size: file.size,
            });
            if (isPendingComment) {
                this.pendingComment$.setValue(pending);
            }
            else if (isPendingReply) {
                this.pendingReply$.setValue(pending);
            }
            else if (isEditingDraft) {
                this.editingDraft$.setValue(pending);
            }
            return url;
        };
        this.revalidate = effect(switchMap(() => {
            return fromPromise(async () => {
                const allComments = [];
                let cursor = '';
                let firstResult = null;
                this.revalidateCommentsInEditor();
                // Fetch all pages of comments
                while (true) {
                    const result = await this.store.listComments({ after: cursor });
                    if (!firstResult) {
                        firstResult = result;
                        // Store the startCursor from the first page for polling
                        this.startCursor = result.startCursor;
                    }
                    allComments.push(...result.comments);
                    cursor = result.endCursor;
                    if (!result.hasNextPage) {
                        break;
                    }
                }
                return allComments;
            }).pipe(tap(allComments => {
                this.revalidateCommentsInEditor();
                // Update state with all comments
                this.comments$.setValue(allComments);
            }), onStart(() => this.loading$.setValue(true)), onComplete(() => this.loading$.setValue(false)), catchError(error => {
                console.error('Failed to fetch comments:', error);
                this.loading$.setValue(false);
                return of([]);
            }));
        }));
        this.revalidateCommentsInEditor = () => {
            this.commentsInEditor$.setValue(this.getCommentsInEditor());
        };
    }
    async addComment(selections, preview) {
        // check if there is a pending comment, reuse it
        let pendingComment = this.pendingComment$.value;
        const doc = pendingComment?.doc ?? (await this.snapshotHelper.createStore());
        if (!doc) {
            throw new Error('Failed to create doc');
        }
        const id = nanoid();
        pendingComment = {
            id,
            doc,
            preview,
            selections,
            attachments: [],
        };
        // Replace any existing pending comment (only one at a time)
        this.pendingComment$.setValue(pendingComment);
        return id;
    }
    /**
     * Add a reply to a comment.
     * If reply is provided, the content should @mention the user who is replying to.
     */
    async addReply(commentId, reply) {
        // check if there is a pending reply, reuse it
        let pendingReply = this.pendingReply$.value;
        const doc = pendingReply?.doc ?? (await this.snapshotHelper.createStore());
        if (!doc) {
            throw new Error('Failed to create doc');
        }
        const mention = reply?.user.id;
        if (mention) {
            // insert mention at the end of the paragraph
            const paragraph = doc.getModelsByFlavour('affine:paragraph').at(-1);
            if (paragraph) {
                paragraph.text?.insert(' ', paragraph.text.length, {
                    mention: {
                        member: mention,
                    },
                });
            }
        }
        const id = nanoid();
        pendingReply = {
            id,
            doc,
            commentId,
            attachments: [],
        };
        // Replace any existing pending reply (only one at a time)
        this.pendingReply$.setValue(pendingReply);
        return id;
    }
    dismissDraftComment() {
        this.pendingComment$.setValue(null);
    }
    dismissDraftReply() {
        this.pendingReply$.setValue(null);
    }
    /**
     * Start editing an existing comment or reply.
     * This will dismiss any previous editing draft so that only one can exist.
     */
    async startEdit(id, type, snapshot, attachments) {
        const doc = await this.snapshotHelper.createStore(snapshot);
        if (!doc) {
            throw new Error('Failed to create doc for editing');
        }
        this.editingDraft$.setValue({ id, type, doc, attachments });
    }
    /** Commit current editing draft (if any) */
    async commitEditing() {
        const draft = this.editingDraft$.value;
        if (!draft)
            return;
        const snapshot = this.snapshotHelper.getSnapshot(draft.doc);
        if (!snapshot) {
            throw new Error('Failed to get snapshot');
        }
        if (draft.type === 'comment') {
            await this.updateComment(draft.id, {
                snapshot,
                attachments: draft.attachments,
            });
        }
        else {
            await this.updateReply(draft.id, {
                snapshot,
                attachments: draft.attachments,
            });
        }
        track.$.commentPanel.$.editComment({
            type: draft.type === 'comment' ? 'root' : 'node',
        });
        this.editingDraft$.setValue(null);
        this.revalidate();
    }
    /** Dismiss current editing draft without saving */
    dismissDraftEditing() {
        this.editingDraft$.setValue(null);
    }
    get docMode$() {
        return this.framework.get(GlobalContextService).globalContext.docMode.$;
    }
    async commitComment(id) {
        const pendingComment = this.pendingComment$.value;
        if (!pendingComment || pendingComment.id !== id) {
            console.warn('Pending comment not found:', id);
            return;
        }
        const { doc, preview, attachments } = pendingComment;
        const snapshot = this.snapshotHelper.getSnapshot(doc);
        if (!snapshot) {
            throw new Error('Failed to get snapshot');
        }
        const mentions = findMentions(snapshot.blocks);
        const comment = await this.store.createComment({
            content: {
                snapshot,
                preview,
                mode: this.docMode$.value ?? 'page',
                attachments,
            },
            mentions,
        });
        const currentComments = this.comments$.value;
        this.comments$.setValue([...currentComments, comment]);
        this.commentAdded$.next({
            id: comment.id,
            selections: pendingComment.selections || [],
        });
        // for block's preview, it will be something like <Paragraph>
        // extract the block type from the preview
        const blockType = preview?.match(/<([^>]+)>/)?.[1];
        track.$.commentPanel.$.createComment({
            type: 'root',
            withAttachment: (attachments?.length ?? 0) > 0,
            withMention: mentions.length > 0,
            category: blockType
                ? blockType
                : (this.docMode$.value ?? 'page') === 'page'
                    ? 'Page'
                    : 'Note',
        });
        this.pendingComment$.setValue(null);
        this.revalidate();
    }
    async commitReply(id) {
        const pendingReply = this.pendingReply$.value;
        if (!pendingReply || pendingReply.id !== id) {
            console.warn('Pending reply not found:', id);
            return;
        }
        const { doc, attachments } = pendingReply;
        const snapshot = this.snapshotHelper.getSnapshot(doc);
        if (!snapshot) {
            throw new Error('Failed to get snapshot');
        }
        if (!pendingReply.commentId) {
            throw new Error('Pending reply has no commentId');
        }
        const mentions = findMentions(snapshot.blocks);
        const reply = await this.store.createReply(pendingReply.commentId, {
            content: {
                snapshot,
                attachments,
            },
            mentions,
        });
        const currentComments = this.comments$.value;
        const updatedComments = currentComments.map(comment => comment.id === pendingReply.commentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment);
        this.comments$.setValue(updatedComments);
        track.$.commentPanel.$.createComment({
            type: 'node',
            withAttachment: (attachments?.length ?? 0) > 0,
            withMention: mentions.length > 0,
            category: (this.docMode$.value ?? 'page') === 'page' ? 'Page' : 'Note',
        });
        this.pendingReply$.setValue(null);
        this.revalidate();
    }
    async deleteComment(id) {
        await this.store.deleteComment(id);
        const currentComments = this.comments$.value;
        this.comments$.setValue(currentComments.filter(c => c.id !== id));
        track.$.commentPanel.$.deleteComment({ type: 'root' });
        this.commentDeleted$.next(id);
        this.revalidate();
    }
    async deleteReply(replyId) {
        await this.store.deleteReply(replyId);
        const currentComments = this.comments$.value;
        const updatedComments = currentComments.map(comment => {
            return {
                ...comment,
                replies: comment.replies?.filter(r => r.id !== replyId),
            };
        });
        this.comments$.setValue(updatedComments);
        track.$.commentPanel.$.deleteComment({ type: 'node' });
        this.revalidate();
    }
    async updateComment(id, content) {
        await this.store.updateComment(id, { content });
        const currentComments = this.comments$.value;
        const updatedComments = currentComments.map(comment => comment.id === id ? { ...comment, content } : comment);
        this.comments$.setValue(updatedComments);
        this.revalidate();
    }
    async updateReply(id, content) {
        await this.store.updateReply(id, { content });
        const currentComments = this.comments$.value;
        const updatedComments = currentComments.map(comment => comment.id === id ? { ...comment, content } : comment);
        this.comments$.setValue(updatedComments);
        this.revalidate();
    }
    updatePendingComment(id, patch) {
        const pendingComment = this.pendingComment$.value;
        if (!pendingComment || pendingComment.id !== id) {
            throw new Error('Pending comment not found');
        }
        this.pendingComment$.setValue({ ...pendingComment, ...patch });
    }
    updatePendingReply(id, patch) {
        const pendingReply = this.pendingReply$.value;
        if (!pendingReply || pendingReply.id !== id) {
            throw new Error('Pending reply not found');
        }
        this.pendingReply$.setValue({ ...pendingReply, ...patch });
    }
    updateEditingDraft(id, patch) {
        const draft = this.editingDraft$.value;
        if (!draft || draft.id !== id) {
            throw new Error('Editing draft not found');
        }
        this.editingDraft$.setValue({ ...draft, ...patch });
    }
    async resolveComment(id, resolved) {
        try {
            await this.store.resolveComment(id, resolved);
            // Update local state
            const currentComments = this.comments$.value;
            const updatedComments = currentComments.map(comment => comment.id === id ? { ...comment, resolved } : comment);
            this.comments$.setValue(updatedComments);
            this.commentResolved$.next(id);
            track.$.commentPanel.$.resolveComment({
                type: resolved ? 'on' : 'off',
            });
            this.revalidate();
        }
        catch (error) {
            console.error('Failed to resolve comment:', error);
            throw error;
        }
    }
    highlightComment(id) {
        this.commentHighlighted$.next(id);
    }
    async getComments(type = 'all') {
        return new Promise(resolve => {
            this.revalidate();
            this.loading$
                .pipe(filter(loading => !loading), first())
                .subscribe(() => {
                resolve(this.comments$.value
                    .filter(comment => type === 'all'
                    ? true
                    : type === 'resolved'
                        ? comment.resolved
                        : !comment.resolved)
                    .map(comment => comment.id));
            });
        });
    }
    onCommentAdded(callback) {
        const subscription = this.commentAdded$.subscribe(({ id, selections }) => callback(id, selections));
        return () => subscription.unsubscribe();
    }
    onCommentResolved(callback) {
        const subscription = this.commentResolved$.subscribe(callback);
        return () => subscription.unsubscribe();
    }
    onCommentDeleted(callback) {
        const subscription = this.commentDeleted$.subscribe(callback);
        return () => subscription.unsubscribe();
    }
    onCommentHighlighted(callback) {
        const subscription = this.commentHighlighted$.subscribe(callback);
        return () => subscription.unsubscribe();
    }
    // Start polling comments every 30s
    // 1. when comments$ is empty, fetch all comments
    // 2. when comments$ is not empty, fetch changes (using end cursor)
    // 3. loop. when doc is not loaded, skip
    start() {
        if (this.pollingDisposable) {
            this.pollingDisposable();
        }
        // Initial load
        this.revalidate();
        this.revalidateCommentsInEditor();
        // Set up polling every 10 seconds
        const polling$ = timer(10000, 10000).pipe(switchMap(() => {
            // If we have comments, fetch changes; otherwise fetch all
            if (this.comments$.value.length > 0) {
                return fromPromise(async () => {
                    const res = await this.store.listCommentChanges({
                        after: this.startCursor,
                    });
                    return res;
                }).pipe(tap(result => {
                    if (result) {
                        this.handleCommentChanges(result);
                        this.startCursor = result.endCursor;
                    }
                }), catchError(error => {
                    console.error('Failed to fetch comment changes:', error);
                    return of(null);
                }));
            }
            else {
                return fromPromise(async () => {
                    const allComments = [];
                    let cursor = '';
                    let firstResult = null;
                    // Fetch all pages of comments
                    while (true) {
                        const result = await this.store.listComments({ after: cursor });
                        if (!firstResult) {
                            firstResult = result;
                            // Store the startCursor from the first page for future polling
                            this.startCursor = result.startCursor;
                        }
                        allComments.push(...result.comments);
                        cursor = result.endCursor;
                        if (!result.hasNextPage) {
                            break;
                        }
                    }
                    // Update state with all comments
                    this.comments$.setValue(allComments);
                    return allComments;
                }).pipe(tap(() => this.revalidateCommentsInEditor()), catchError(error => {
                    console.error('Failed to fetch comments:', error);
                    return of(null);
                }));
            }
        }));
        const subscription = polling$.subscribe();
        this.pollingDisposable = () => subscription.unsubscribe();
    }
    stop() {
        if (this.pollingDisposable) {
            this.pollingDisposable();
        }
    }
    handleCommentChanges(result) {
        const { changes } = result;
        if (!changes || changes.length === 0) {
            return;
        }
        const currentComments = [...this.comments$.value];
        let commentsUpdated = false;
        for (const change of changes) {
            const { id, action, comment, commentId } = change;
            if (commentId) {
                // This is a reply change - handle separately
                const reply = {
                    ...comment,
                    id: id,
                    commentId: commentId,
                };
                this.handleReplyChange(currentComments, action, reply, commentId);
                commentsUpdated = true;
            }
            else {
                // This is a top-level comment change
                switch (action) {
                    case 'update': {
                        // Update existing comment or add new comment if it doesn't exist
                        const updateIndex = currentComments.findIndex(c => c.id === id);
                        if (updateIndex !== -1) {
                            // Update existing comment
                            currentComments[updateIndex] = comment;
                            commentsUpdated = true;
                        }
                        else {
                            // Add new comment if it doesn't exist (create event)
                            currentComments.push(comment);
                            commentsUpdated = true;
                        }
                        break;
                    }
                    case 'delete': {
                        // Remove comment
                        const deleteIndex = currentComments.findIndex(c => c.id === id);
                        if (deleteIndex !== -1) {
                            currentComments.splice(deleteIndex, 1);
                            commentsUpdated = true;
                        }
                        break;
                    }
                    default:
                        console.warn('Unknown comment change action:', action);
                }
            }
        }
        // Update the comments list if any changes were made
        if (commentsUpdated) {
            this.comments$.setValue(currentComments);
        }
    }
    handleReplyChange(currentComments, action, reply, parentCommentId) {
        const parentIndex = currentComments.findIndex(c => c.id === parentCommentId);
        if (parentIndex === -1) {
            console.warn('Parent comment not found for reply:', parentCommentId);
            return;
        }
        const parentComment = currentComments[parentIndex];
        const replies = [...(parentComment.replies || [])];
        switch (action) {
            case 'update': {
                // Update existing reply or add new reply if it doesn't exist
                const updateIndex = replies.findIndex(r => r.id === reply.id);
                if (updateIndex !== -1) {
                    // Update existing reply
                    replies[updateIndex] = reply;
                    currentComments[parentIndex] = { ...parentComment, replies };
                }
                else {
                    // Add new reply if it doesn't exist (create event)
                    replies.push(reply);
                    currentComments[parentIndex] = { ...parentComment, replies };
                }
                break;
            }
            case 'delete': {
                // Remove reply
                const deleteIndex = replies.findIndex(r => r.id === reply.id);
                if (deleteIndex !== -1) {
                    replies.splice(deleteIndex, 1);
                    currentComments[parentIndex] = { ...parentComment, replies };
                }
                break;
            }
            default:
                console.warn('Unknown reply change action:', action);
        }
    }
    getCommentsInEditor() {
        const inlineCommentManager = this.props.std?.get(InlineCommentManager);
        if (!inlineCommentManager) {
            return [];
        }
        return inlineCommentManager.getCommentsInEditor();
    }
    dispose() {
        this.stop();
        this.commentAdded$.complete();
        this.commentResolved$.complete();
        this.commentDeleted$.complete();
        this.commentHighlighted$.complete();
        super.dispose();
    }
}
//# sourceMappingURL=doc-comment.js.map