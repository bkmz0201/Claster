import { getStoreManager } from '@affine/core/blocksuite/manager/store';
import { MarkdownTransformer } from '@blocksuite/affine/widgets/linked-doc';
import { Entity } from '@toeverything/infra';
import { getAFFiNEWorkspaceSchema, } from '../../workspace';
export class IntegrationWriter extends Entity {
    constructor(workspaceService, tagService) {
        super();
        this.workspaceService = workspaceService;
        this.tagService = tagService;
    }
    async writeDoc(options) {
        const { title, content, comment, docId, tags, updateStrategy = 'override', } = options;
        const workspace = this.workspaceService.workspace;
        let markdown = comment ? `${content}\n\n---\n\n${comment}` : content;
        let finalDocId;
        if (!docId) {
            const newDocId = await MarkdownTransformer.importMarkdownToDoc({
                collection: workspace.docCollection,
                schema: getAFFiNEWorkspaceSchema(),
                markdown,
                fileName: title,
                extensions: getStoreManager().config.init().value.get('store'),
            });
            if (!newDocId)
                throw new Error('Failed to create a new doc');
            finalDocId = newDocId;
        }
        else {
            const collection = workspace.docCollection;
            const doc = collection.getDoc(docId)?.getStore();
            if (!doc)
                throw new Error('Doc not found');
            if (updateStrategy === 'override') {
                const pageBlock = doc.getBlocksByFlavour('affine:page')[0];
                // remove all children of the page block
                pageBlock.model.children.forEach(child => {
                    doc.deleteBlock(child);
                });
                // add a new note block
                const noteBlockId = doc.addBlock('affine:note', {}, pageBlock.id);
                // import the markdown to the note block
                await MarkdownTransformer.importMarkdownToBlock({
                    doc,
                    blockId: noteBlockId,
                    markdown,
                    extensions: getStoreManager().config.init().value.get('store'),
                });
            }
            else if (updateStrategy === 'append') {
                const pageBlockId = doc.getBlocksByFlavour('affine:page')[0]?.id;
                const blockId = doc.addBlock('affine:note', {}, pageBlockId);
                await MarkdownTransformer.importMarkdownToBlock({
                    doc,
                    blockId,
                    markdown: `---\n${markdown}`,
                    extensions: getStoreManager().config.init().value.get('store'),
                });
            }
            else {
                throw new Error('Invalid update strategy');
            }
            finalDocId = doc.id;
        }
        await this.applyTags(finalDocId, tags);
        return finalDocId;
    }
    async applyTags(docId, tags) {
        if (!tags?.length)
            return;
        tags.forEach(tag => {
            this.tagService.tagList.tagByTagId$(tag).value?.tag(docId);
        });
    }
}
//# sourceMappingURL=writer.js.map