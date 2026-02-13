import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import 'katex/dist/katex.min.css';
import { useConfirmModal, useLitPortalFactory } from '@affine/component';
import { LitDocEditor, LitDocTitle, LitEdgelessEditor, } from '@affine/core/blocksuite/editors';
import { getViewManager } from '@affine/core/blocksuite/manager/view';
import { useEnableAI } from '@affine/core/components/hooks/affine/use-enable-ai';
import { ServerService } from '@affine/core/modules/cloud';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { JournalService } from '@affine/core/modules/journal';
import { useInsidePeekView } from '@affine/core/modules/peek-view';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { ServerFeature } from '@affine/graphql';
import track from '@affine/track';
import { useFramework, useLiveData, useService, useServices, } from '@toeverything/infra';
import { forwardRef, Fragment, useCallback, useEffect, useMemo, useRef, } from 'react';
import { WorkspacePropertiesTable, } from '../../components/properties';
import { BiDirectionalLinkPanel } from './bi-directional-link-panel';
import { DocIconPicker } from './doc-icon-picker';
import { BlocksuiteEditorJournalDocTitle } from './journal-doc-title';
import { StarterBar } from './starter-bar';
import * as styles from './styles.css';
const usePatchSpecs = (mode, shared) => {
    const [reactToLit, portals] = useLitPortalFactory();
    const { workspaceService, featureFlagService } = useServices({
        WorkspaceService,
        FeatureFlagService,
    });
    const isCloud = workspaceService.workspace.flavour !== 'local';
    const framework = useFramework();
    const confirmModal = useConfirmModal();
    const enableAI = useEnableAI();
    const isInPeekView = useInsidePeekView();
    const enableTurboRenderer = useLiveData(featureFlagService.flags.enable_turbo_renderer.$);
    const enablePDFEmbedPreview = useLiveData(featureFlagService.flags.enable_pdf_embed_preview.$);
    const serverService = useService(ServerService);
    const serverConfig = useLiveData(serverService.server.config$);
    // comment may not be supported by the server
    const enableComment = isCloud && serverConfig.features.includes(ServerFeature.Comment) && !shared;
    const patchedSpecs = useMemo(() => {
        const manager = getViewManager()
            .config.init()
            .foundation(framework)
            .ai(enableAI, framework)
            .theme(framework)
            .editorConfig(framework)
            .editorView({
            framework,
            reactToLit,
            confirmModal,
        })
            .cloud(framework, isCloud)
            .turboRenderer(enableTurboRenderer)
            .pdf(enablePDFEmbedPreview, reactToLit)
            .edgelessBlockHeader({
            framework,
            isInPeekView,
            reactToLit,
        })
            .database(framework)
            .linkedDoc(framework)
            .paragraph(enableAI)
            .mobile(framework)
            .electron(framework)
            .linkPreview(framework)
            .codeBlockPreview(framework)
            .iconPicker(framework)
            .comment(enableComment, framework).value;
        if (BUILD_CONFIG.isMobileEdition) {
            if (mode === 'page') {
                return manager.get('mobile-page');
            }
            else {
                return manager.get('mobile-edgeless');
            }
        }
        else {
            return manager.get(mode);
        }
    }, [
        confirmModal,
        enableAI,
        enablePDFEmbedPreview,
        enableTurboRenderer,
        enableComment,
        framework,
        isInPeekView,
        isCloud,
        mode,
        reactToLit,
    ]);
    return [
        patchedSpecs,
        useMemo(() => (_jsx(_Fragment, { children: portals.map(p => (_jsx(Fragment, { children: p.portal }, p.id))) })), [portals]),
    ];
};
export const BlocksuiteDocEditor = forwardRef(function BlocksuiteDocEditor({ page, shared, onClickBlank, titleRef: externalTitleRef, defaultOpenProperty, readonly, }, ref) {
    const titleRef = useRef(null);
    const docRef = useRef(null);
    const journalService = useService(JournalService);
    const isJournal = !!useLiveData(journalService.journalDate$(page.id));
    const editorSettingService = useService(EditorSettingService);
    const onDocRef = useCallback((el) => {
        docRef.current = el;
        if (ref) {
            if (typeof ref === 'function') {
                ref(el);
            }
            else {
                ref.current = el;
            }
        }
    }, [ref]);
    const onTitleRef = useCallback((el) => {
        titleRef.current = el;
        if (externalTitleRef) {
            if (typeof externalTitleRef === 'function') {
                externalTitleRef(el);
            }
            else {
                externalTitleRef.current = el;
            }
        }
    }, [externalTitleRef]);
    const [specs, portals] = usePatchSpecs('page', shared);
    const displayBiDirectionalLink = useLiveData(editorSettingService.editorSetting.settings$.selector(s => s.displayBiDirectionalLink));
    const displayDocInfo = useLiveData(editorSettingService.editorSetting.settings$.selector(s => s.displayDocInfo));
    const onPropertyChange = useCallback((property) => {
        track.doc.inlineDocInfo.property.editProperty({
            type: property.type,
        });
    }, []);
    const onPropertyAdded = useCallback((property) => {
        track.doc.inlineDocInfo.property.addProperty({
            type: property.type,
            control: 'at menu',
        });
    }, []);
    const onDatabasePropertyChange = useCallback((_row, cell) => {
        track.doc.inlineDocInfo.databaseProperty.editProperty({
            type: cell.property.type$.value,
        });
    }, []);
    const onPropertyInfoChange = useCallback((property, field) => {
        track.doc.inlineDocInfo.property.editPropertyMeta({
            type: property.type,
            field,
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.affineDocViewport, children: [!BUILD_CONFIG.isMobileEdition ? (_jsx(DocIconPicker, { docId: page.id, readonly: readonly || shared })) : null, !isJournal ? (_jsx(LitDocTitle, { doc: page, ref: onTitleRef })) : (_jsx(BlocksuiteEditorJournalDocTitle, { page: page })), !shared && displayDocInfo ? (_jsx("div", { className: styles.docPropertiesTableContainer, children: _jsx(WorkspacePropertiesTable, { className: styles.docPropertiesTable, onDatabasePropertyChange: onDatabasePropertyChange, onPropertyChange: onPropertyChange, onPropertyAdded: onPropertyAdded, onPropertyInfoChange: onPropertyInfoChange, defaultOpenProperty: defaultOpenProperty }) })) : null, _jsx(LitDocEditor, { className: styles.docContainer, ref: onDocRef, doc: page, specs: specs }), _jsx("div", { className: styles.docEditorGap, "data-testid": "page-editor-blank", onClick: onClickBlank }), !readonly && !BUILD_CONFIG.isMobileEdition && (_jsx(StarterBar, { doc: page })), !shared && displayBiDirectionalLink ? (_jsx(BiDirectionalLinkPanel, {})) : null] }), portals] }));
});
export const BlocksuiteEdgelessEditor = forwardRef(function BlocksuiteEdgelessEditor({ page }, ref) {
    const [specs, portals] = usePatchSpecs('edgeless');
    const editorRef = useRef(null);
    const onDocRef = useCallback((el) => {
        editorRef.current = el;
        if (ref) {
            if (typeof ref === 'function') {
                ref(el);
            }
            else {
                ref.current = el;
            }
        }
    }, [ref]);
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.updateComplete
                .then(() => {
                // make sure editor can get keyboard events on showing up
                editorRef.current
                    ?.querySelector('affine-edgeless-root')
                    ?.click();
            })
                .catch(console.error);
        }
    }, []);
    return (_jsxs("div", { className: styles.affineEdgelessDocViewport, children: [_jsx(LitEdgelessEditor, { ref: onDocRef, doc: page, specs: specs }), portals] }));
});
//# sourceMappingURL=lit-adaper.js.map