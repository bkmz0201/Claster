import { jsx as _jsx } from "react/jsx-runtime";
import { AffinePageReference, AffineSharedPageReference, } from '@affine/core/components/affine/reference-link';
import { DocService, DocsService } from '@affine/core/modules/doc';
import { EditorService } from '@affine/core/modules/editor';
import { toDocSearchParams } from '@affine/core/modules/navigation';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
import { patchForAudioEmbedView } from './audio/audio-view';
import { buildDocDisplayMetaExtension } from './display-meta';
import { patchDocModeService } from './doc-mode-service';
import { patchDocUrlExtensions } from './doc-url';
import { patchFileSizeLimitExtension } from './file-size-limit';
import { patchNotificationService } from './notification-service';
import { patchOpenDocExtension } from './open-doc';
import { patchQuickSearchService } from './quick-search-service';
import { patchReferenceRenderer, } from './reference-renderer';
import { patchSideBarService } from './side-bar-service';
const optionsSchema = z.object({
    // services
    framework: z.instanceof(FrameworkProvider),
    // react renderer
    reactToLit: z
        .function()
        .args(z.custom(), z.boolean().optional())
        .returns(z.custom()),
    confirmModal: z.object({
        openConfirmModal: z
            .function()
            .args(z.custom().optional(), z.any().optional()),
        closeConfirmModal: z.function(),
    }),
    scope: z.enum(['doc', 'workspace']).optional(),
});
export class AffineEditorViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-editor-view';
        this.schema = optionsSchema;
        this._getCustomReferenceRenderer = (framework) => {
            const workspaceService = framework.get(WorkspaceService);
            return function customReference(reference) {
                const data = reference.delta.attributes?.reference;
                if (!data)
                    return _jsx("span", {});
                const pageId = data.pageId;
                if (!pageId)
                    return _jsx("span", {});
                // title alias
                const title = data.title;
                const params = toDocSearchParams(data.params);
                if (workspaceService.workspace.openOptions.isSharedMode) {
                    return (_jsx(AffineSharedPageReference, { docCollection: workspaceService.workspace.docCollection, pageId: pageId, params: params, title: title }));
                }
                return (_jsx(AffinePageReference, { pageId: pageId, params: params, title: title }));
            };
        };
    }
    setup(context, options) {
        super.setup(context, options);
        if (!options) {
            return;
        }
        const { framework, reactToLit, confirmModal, scope = 'doc' } = options;
        const referenceRenderer = this._getCustomReferenceRenderer(framework);
        context
            .register([
            patchReferenceRenderer(reactToLit, referenceRenderer),
            patchNotificationService(confirmModal),
            patchOpenDocExtension(),
            patchSideBarService(framework),
            patchFileSizeLimitExtension(framework),
            buildDocDisplayMetaExtension(framework),
            patchForAudioEmbedView(reactToLit),
        ])
            .register(patchDocUrlExtensions(framework))
            .register(patchQuickSearchService(framework));
        if (scope === 'doc') {
            const docService = framework.get(DocService);
            const docsService = framework.get(DocsService);
            const editorService = framework.get(EditorService);
            context.register([
                patchDocModeService(docService, docsService, editorService),
            ]);
        }
    }
}
//# sourceMappingURL=editor-view.js.map