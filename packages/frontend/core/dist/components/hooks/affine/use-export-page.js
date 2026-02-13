import { notify } from '@affine/component';
import { pushGlobalLoadingEventAtom, resolveGlobalLoadingEventAtom, } from '@affine/component/global-loading';
import { EditorService } from '@affine/core/modules/editor';
import { getAFFiNEWorkspaceSchema } from '@affine/core/modules/workspace/global-schema';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { ExportManager } from '@blocksuite/affine/blocks/surface';
import { docLinkBaseURLMiddleware, embedSyncedDocMiddleware, HtmlAdapterFactoryIdentifier, MarkdownAdapterFactoryIdentifier, titleMiddleware, } from '@blocksuite/affine/shared/adapters';
import { printToPdf } from '@blocksuite/affine/shared/utils';
import { Transformer } from '@blocksuite/affine/store';
import { createAssetsArchive, download, HtmlTransformer, MarkdownTransformer, PdfTransformer, ZipTransformer, } from '@blocksuite/affine/widgets/linked-doc';
import { useLiveData, useService } from '@toeverything/infra';
import { useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useAsyncCallback } from '../affine-async-hooks';
async function exportDoc(doc, std, config) {
    const transformer = new Transformer({
        schema: getAFFiNEWorkspaceSchema(),
        blobCRUD: doc.workspace.blobSync,
        docCRUD: {
            create: (id) => doc.workspace.createDoc(id).getStore({ id }),
            get: (id) => doc.workspace.getDoc(id)?.getStore({ id }) ?? null,
            delete: (id) => doc.workspace.removeDoc(id),
        },
        middlewares: [
            docLinkBaseURLMiddleware(doc.workspace.id),
            titleMiddleware(doc.workspace.meta.docMetas),
            embedSyncedDocMiddleware('content'),
        ],
    });
    const adapterFactory = std.store.provider.get(config.identifier);
    const adapter = adapterFactory.get(transformer);
    const result = (await adapter.fromDoc(doc));
    if (!result || (!result.file && !result.assetsIds.length)) {
        return;
    }
    const docTitle = doc.meta?.title || 'Untitled';
    const contentBlob = new Blob([result.file], { type: config.contentType });
    let downloadBlob;
    let name;
    if (result.assetsIds.length > 0) {
        if (!transformer.assets) {
            throw new Error('No assets found');
        }
        const zip = await createAssetsArchive(transformer.assets, result.assetsIds);
        await zip.file(config.indexFileName, contentBlob);
        downloadBlob = await zip.generate();
        name = `${docTitle}.zip`;
    }
    else {
        downloadBlob = contentBlob;
        name = `${docTitle}${config.fileExtension}`;
    }
    download(downloadBlob, name);
}
async function exportToHtml(doc, std) {
    if (!std) {
        // If std is not provided, we use the default export method
        await HtmlTransformer.exportDoc(doc);
    }
    else {
        await exportDoc(doc, std, {
            identifier: HtmlAdapterFactoryIdentifier,
            fileExtension: '.html',
            contentType: 'text/html',
            indexFileName: 'index.html',
        });
    }
}
async function exportToMarkdown(doc, std) {
    if (!std) {
        // If std is not provided, we use the default export method
        await MarkdownTransformer.exportDoc(doc);
    }
    else {
        await exportDoc(doc, std, {
            identifier: MarkdownAdapterFactoryIdentifier,
            fileExtension: '.md',
            contentType: 'text/plain',
            indexFileName: 'index.md',
        });
    }
}
async function exportHandler({ page, type, editorContainer, }) {
    const editorRoot = document.querySelector('editor-host');
    track.$.sharePanel.$.export({
        type,
    });
    switch (type) {
        case 'html':
            await exportToHtml(page, editorRoot?.std);
            return;
        case 'markdown':
            await exportToMarkdown(page, editorRoot?.std);
            return;
        case 'snapshot':
            await ZipTransformer.exportDocs(page.workspace, getAFFiNEWorkspaceSchema(), [page]);
            return;
        case 'pdf':
            await printToPdf(editorContainer);
            return;
        case 'png': {
            await editorRoot?.std.get(ExportManager).exportPng();
            return;
        }
        case 'pdf-export': {
            await PdfTransformer.exportDoc(page);
            return;
        }
    }
}
export const useExportPage = () => {
    const editor = useService(EditorService).editor;
    const editorContainer = useLiveData(editor.editorContainer$);
    const blocksuiteDoc = editor.doc.blockSuiteDoc;
    const pushGlobalLoadingEvent = useSetAtom(pushGlobalLoadingEventAtom);
    const resolveGlobalLoadingEvent = useSetAtom(resolveGlobalLoadingEventAtom);
    const t = useI18n();
    const onClickHandler = useAsyncCallback(async (type) => {
        if (editorContainer === null)
            return;
        // editor container is wrapped by a proxy, we need to get the origin
        const originEditorContainer = editorContainer
            .origin;
        const globalLoadingID = nanoid();
        pushGlobalLoadingEvent({
            key: globalLoadingID,
        });
        try {
            await exportHandler({
                page: blocksuiteDoc,
                type,
                editorContainer: originEditorContainer,
            });
            notify.success({
                title: t['com.affine.export.success.title'](),
                message: t['com.affine.export.success.message'](),
            });
        }
        catch (err) {
            console.error(err);
            notify.error({
                title: t['com.affine.export.error.title'](),
                message: t['com.affine.export.error.message'](),
            });
        }
        finally {
            resolveGlobalLoadingEvent(globalLoadingID);
        }
    }, [
        blocksuiteDoc,
        editorContainer,
        pushGlobalLoadingEvent,
        resolveGlobalLoadingEvent,
        t,
    ]);
    return onClickHandler;
};
//# sourceMappingURL=use-export-page.js.map