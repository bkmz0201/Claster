import { getStoreManager } from '@affine/core/blocksuite/manager/store';
import { MarkdownTransformer } from '@blocksuite/affine/widgets/linked-doc';
import { Service } from '@toeverything/infra';
import { DocsService } from '../../doc';
import { getAFFiNEWorkspaceSchema, } from '../../workspace';
export class ImportClipperService extends Service {
    constructor(workspacesService) {
        super();
        this.workspacesService = workspacesService;
    }
    async importToWorkspace(workspaceMetadata, clipperInput) {
        const { workspace, dispose: disposeWorkspace } = this.workspacesService.open({
            metadata: workspaceMetadata,
        });
        await workspace.engine.doc.waitForDocReady(workspace.id); // wait for root doc ready
        const docId = await MarkdownTransformer.importMarkdownToDoc({
            collection: workspace.docCollection,
            schema: getAFFiNEWorkspaceSchema(),
            markdown: clipperInput.contentMarkdown,
            extensions: getStoreManager().config.init().value.get('store'),
        });
        const docsService = workspace.scope.get(DocsService);
        if (docId) {
            // only support page mode for now
            await docsService.changeDocTitle(docId, clipperInput.title);
            docsService.list.setPrimaryMode(docId, 'page');
            workspace.engine.doc.addPriority(workspace.id, 100);
            workspace.engine.doc.addPriority(docId, 100);
            await workspace.engine.doc.waitForSynced(workspace.id);
            await workspace.engine.doc.waitForSynced(docId);
            disposeWorkspace();
            return docId;
        }
        else {
            throw new Error('Failed to import doc');
        }
    }
    async importToNewWorkspace(flavour, workspaceName, clipperInput) {
        // oxlint-disable-next-line @typescript-eslint/no-non-null-assertion
        let docId;
        const { id: workspaceId } = await this.workspacesService.create(flavour, async (docCollection) => {
            docCollection.meta.initialize();
            docCollection.doc.getMap('meta').set('name', workspaceName);
            docId = await MarkdownTransformer.importMarkdownToDoc({
                collection: docCollection,
                schema: getAFFiNEWorkspaceSchema(),
                markdown: clipperInput.contentMarkdown,
                extensions: getStoreManager().config.init().value.get('store'),
            });
        });
        if (!docId) {
            throw new Error('Failed to import doc');
        }
        return { workspaceId, docId };
    }
}
//# sourceMappingURL=import.js.map