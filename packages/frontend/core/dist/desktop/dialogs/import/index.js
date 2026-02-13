import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, IconButton, IconType, Modal } from '@affine/component';
import { getStoreManager } from '@affine/core/blocksuite/manager/store';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { GlobalDialogService, } from '@affine/core/modules/dialogs';
import { ExplorerIconService } from '@affine/core/modules/explorer-icon/services/explorer-icon';
import { OrganizeService } from '@affine/core/modules/organize';
import { UrlService } from '@affine/core/modules/url';
import { getAFFiNEWorkspaceSchema, WorkspaceService, } from '@affine/core/modules/workspace';
import { DebugLogger } from '@affine/debug';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { openFilesWith } from '@blocksuite/affine/shared/utils';
import { DocxTransformer, HtmlTransformer, MarkdownTransformer, NotionHtmlTransformer, ZipTransformer, } from '@blocksuite/affine/widgets/linked-doc';
import { ExportToHtmlIcon, ExportToMarkdownIcon, FileIcon, HelpIcon, NotionIcon, PageIcon, SaveIcon, ZipIcon, } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useMemo, useState, } from 'react';
import * as style from './styles.css';
const logger = new DebugLogger('import');
// Helper function to create folder structure using OrganizeService
function createFolderStructure(organizeService, hierarchy, parentFolderId = null, explorerIconService) {
    const docLinks = [];
    const rootFolder = organizeService.folderTree.rootFolder;
    function processHierarchyNode(node, currentParentId) {
        let currentFolderId = currentParentId;
        // If this node represents a folder (has children but no pageId), create it
        if (node.children.size > 0 && !node.pageId && node.name) {
            const parent = currentParentId
                ? organizeService.folderTree.folderNode$(currentParentId).value
                : rootFolder;
            if (parent) {
                const index = parent.indexAt('after');
                currentFolderId = parent.createFolder(node.name, index);
            }
        }
        // Process all children
        for (const child of node.children.values()) {
            if (child.pageId) {
                // This is a document, link it to the current folder
                if (currentFolderId) {
                    docLinks.push({ folderId: currentFolderId, docId: child.pageId });
                }
                // Set icon for the document if available
                if (child.icon && explorerIconService) {
                    logger.debug('=== Setting icon for document ===');
                    logger.debug('Document ID:', child.pageId);
                    logger.debug('Icon data:', child.icon);
                    try {
                        let iconData;
                        if (child.icon.type === 'emoji') {
                            iconData = {
                                type: IconType.Emoji,
                                unicode: child.icon.content,
                            };
                            logger.debug('Created emoji icon data:', iconData);
                        }
                        else if (child.icon.type === 'image') {
                            // For image icons, we'd need to handle blob conversion
                            // For now, let's skip image icons or convert them to default
                            // This could be enhanced later to download and convert images to blobs
                            logger.debug('Skipping image icon (not implemented):', child.icon.content);
                            iconData = undefined;
                        }
                        if (iconData) {
                            logger.debug('Calling explorerIconService.setIcon with:', {
                                where: 'doc',
                                id: child.pageId,
                                icon: iconData,
                            });
                            explorerIconService.setIcon({
                                where: 'doc',
                                id: child.pageId,
                                icon: iconData,
                            });
                            logger.debug('Icon set successfully for document:', child.pageId);
                        }
                        else {
                            logger.debug('No valid icon data to set');
                        }
                    }
                    catch (error) {
                        logger.error('Error setting icon for document:', child.pageId, error);
                        logger.warn('Failed to set icon for document:', child.pageId, error);
                    }
                }
                else {
                    if (!child.icon) {
                        logger.debug('No icon found for document:', child.pageId);
                    }
                    if (!explorerIconService) {
                        logger.debug('ExplorerIconService not available for document:', child.pageId);
                    }
                }
            }
            else if (child.children.size > 0) {
                // This is a subfolder, process it recursively
                processHierarchyNode(child, currentFolderId);
            }
        }
        return currentFolderId;
    }
    const rootFolderId = processHierarchyNode(hierarchy, parentFolderId);
    return { folderId: rootFolderId, docLinks };
}
const importOptions = [
    {
        key: 'markdown',
        label: 'com.affine.import.markdown-files',
        prefixIcon: (_jsx(ExportToMarkdownIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        testId: 'editor-option-menu-import-markdown-files',
        type: 'markdown',
    },
    {
        key: 'markdownZip',
        label: 'com.affine.import.markdown-with-media-files',
        prefixIcon: (_jsx(ZipIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixIcon: (_jsx(HelpIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixTooltip: 'com.affine.import.markdown-with-media-files.tooltip',
        testId: 'editor-option-menu-import-markdown-with-media',
        type: 'markdownZip',
    },
    {
        key: 'html',
        label: 'com.affine.import.html-files',
        prefixIcon: (_jsx(ExportToHtmlIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixIcon: (_jsx(HelpIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixTooltip: 'com.affine.import.html-files.tooltip',
        testId: 'editor-option-menu-import-html',
        type: 'html',
    },
    {
        key: 'notion',
        label: 'com.affine.import.notion',
        prefixIcon: _jsx(NotionIcon, { color: cssVar('black'), width: 20, height: 20 }),
        suffixIcon: (_jsx(HelpIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixTooltip: 'com.affine.import.notion.tooltip',
        testId: 'editor-option-menu-import-notion',
        type: 'notion',
    },
    {
        key: 'docx',
        label: 'com.affine.import.docx',
        prefixIcon: _jsx(FileIcon, { color: cssVar('black'), width: 20, height: 20 }),
        suffixIcon: (_jsx(HelpIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixTooltip: 'com.affine.import.docx.tooltip',
        testId: 'editor-option-menu-import-docx',
        type: 'docx',
    },
    {
        key: 'snapshot',
        label: 'com.affine.import.snapshot',
        prefixIcon: (_jsx(PageIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixIcon: (_jsx(HelpIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
        suffixTooltip: 'com.affine.import.snapshot.tooltip',
        testId: 'editor-option-menu-import-snapshot',
        type: 'snapshot',
    },
    BUILD_CONFIG.isElectron
        ? {
            key: 'dotaffinefile',
            label: 'com.affine.import.dotaffinefile',
            prefixIcon: (_jsx(SaveIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
            suffixIcon: (_jsx(HelpIcon, { color: cssVarV2('icon/primary'), width: 20, height: 20 })),
            suffixTooltip: 'com.affine.import.dotaffinefile.tooltip',
            testId: 'editor-option-menu-import-dotaffinefile',
            type: 'dotaffinefile',
        }
        : null,
].filter(v => v !== null);
const importConfigs = {
    markdown: {
        fileOptions: { acceptType: 'Markdown', multiple: true },
        importFunction: async (docCollection, files, _handleImportAffineFile, _organizeService, _explorerIconService) => {
            const docIds = [];
            for (const file of files) {
                const text = await file.text();
                const fileName = file.name.split('.').slice(0, -1).join('.');
                const docId = await MarkdownTransformer.importMarkdownToDoc({
                    collection: docCollection,
                    schema: getAFFiNEWorkspaceSchema(),
                    markdown: text,
                    fileName,
                    extensions: getStoreManager().config.init().value.get('store'),
                });
                if (docId)
                    docIds.push(docId);
            }
            return {
                docIds,
            };
        },
    },
    markdownZip: {
        fileOptions: { acceptType: 'Zip', multiple: false },
        importFunction: async (docCollection, files, _handleImportAffineFile, _organizeService, _explorerIconService) => {
            const file = files.length === 1 ? files[0] : null;
            if (!file) {
                throw new Error('Expected a single zip file for markdownZip import');
            }
            const docIds = await MarkdownTransformer.importMarkdownZip({
                collection: docCollection,
                schema: getAFFiNEWorkspaceSchema(),
                imported: file,
                extensions: getStoreManager().config.init().value.get('store'),
            });
            return {
                docIds,
            };
        },
    },
    html: {
        fileOptions: { acceptType: 'Html', multiple: true },
        importFunction: async (docCollection, files, _handleImportAffineFile, _organizeService, _explorerIconService) => {
            const docIds = [];
            for (const file of files) {
                const text = await file.text();
                const fileName = file.name.split('.').slice(0, -1).join('.');
                const docId = await HtmlTransformer.importHTMLToDoc({
                    collection: docCollection,
                    schema: getAFFiNEWorkspaceSchema(),
                    extensions: getStoreManager().config.init().value.get('store'),
                    html: text,
                    fileName,
                });
                if (docId)
                    docIds.push(docId);
            }
            return {
                docIds,
            };
        },
    },
    notion: {
        fileOptions: { acceptType: 'Zip', multiple: false },
        importFunction: async (docCollection, files, _handleImportAffineFile, organizeService, explorerIconService) => {
            const file = files.length === 1 ? files[0] : null;
            if (!file) {
                throw new Error('Expected a single zip file for notion import');
            }
            const { entryId, pageIds, isWorkspaceFile, folderHierarchy } = await NotionHtmlTransformer.importNotionZip({
                collection: docCollection,
                schema: getAFFiNEWorkspaceSchema(),
                imported: file,
                extensions: getStoreManager().config.init().value.get('store'),
            });
            let rootFolderId;
            // Create folder structure if hierarchy exists and OrganizeService is available
            if (folderHierarchy &&
                organizeService &&
                folderHierarchy.children.size > 0) {
                try {
                    const { folderId, docLinks } = createFolderStructure(organizeService, folderHierarchy, null, explorerIconService);
                    rootFolderId = folderId || undefined;
                    // Create links for all documents to their respective folders
                    for (const { folderId, docId } of docLinks) {
                        const folder = organizeService.folderTree.folderNode$(folderId).value;
                        if (folder) {
                            const index = folder.indexAt('after');
                            folder.createLink('doc', docId, index);
                        }
                    }
                }
                catch (error) {
                    logger.warn('Failed to create folder structure:', error);
                    // Continue with import even if folder creation fails
                }
            }
            return {
                docIds: pageIds,
                entryId,
                isWorkspaceFile,
                rootFolderId,
            };
        },
    },
    docx: {
        fileOptions: { acceptType: 'Docx', multiple: false },
        importFunction: async (docCollection, file) => {
            const files = Array.isArray(file) ? file : [file];
            const docIds = [];
            for (const file of files) {
                const docId = await DocxTransformer.importDocx({
                    collection: docCollection,
                    schema: getAFFiNEWorkspaceSchema(),
                    imported: file,
                    extensions: getStoreManager().config.init().value.get('store'),
                });
                if (docId)
                    docIds.push(docId);
            }
            return { docIds };
        },
    },
    snapshot: {
        fileOptions: { acceptType: 'Zip', multiple: false },
        importFunction: async (docCollection, files, _handleImportAffineFile, _organizeService, _explorerIconService) => {
            const file = files.length === 1 ? files[0] : null;
            if (!file) {
                throw new Error('Expected a single zip file for snapshot import');
            }
            const docIds = (await ZipTransformer.importDocs(docCollection, getAFFiNEWorkspaceSchema(), file))
                .filter(doc => doc !== undefined)
                .map(doc => doc.id);
            return {
                docIds,
            };
        },
    },
    dotaffinefile: {
        fileOptions: { acceptType: 'Skip', multiple: false },
        importFunction: async (_, __, handleImportAffineFile, _organizeService, _explorerIconService) => {
            await handleImportAffineFile();
            return {
                docIds: [],
                entryId: undefined,
                isWorkspaceFile: true,
            };
        },
    },
};
const ImportOptionItem = ({ label, prefixIcon, suffixIcon, suffixTooltip, type, onImport, ...props }) => {
    const t = useI18n();
    return (_jsxs("div", { className: style.importItem, onClick: () => onImport(type), ...props, children: [prefixIcon, _jsx("div", { className: style.importItemLabel, children: t[label]() }), suffixIcon && (_jsx(IconButton, { className: style.importItemSuffix, icon: suffixIcon, tooltip: suffixTooltip ? t[suffixTooltip]() : undefined }))] }));
};
const ImportOptions = ({ onImport, }) => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: style.importModalTitle, children: t['Import']() }), _jsx("div", { className: style.importModalContent, children: importOptions.map(({ key, label, prefixIcon, suffixIcon, suffixTooltip, testId, type, }) => (_jsx(ImportOptionItem, { prefixIcon: prefixIcon, suffixIcon: suffixIcon, suffixTooltip: suffixTooltip, label: label, type: type, onImport: onImport, "data-testid": testId }, key))) }), _jsxs("div", { className: style.importModalTip, children: [t['com.affine.import.modal.tip'](), ' ', _jsx("a", { className: style.link, href: BUILD_CONFIG.discordUrl, target: "_blank", rel: "noreferrer", children: "Discord" }), "."] })] }));
};
const ImportingStatus = () => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: style.importModalTitle, children: t['com.affine.import.status.importing.title']() }), _jsx("p", { className: style.importStatusContent, children: t['com.affine.import.status.importing.message']() })] }));
};
const SuccessStatus = ({ onComplete }) => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: style.importModalTitle, children: t['com.affine.import.status.success.title']() }), _jsxs("p", { className: style.importStatusContent, children: [t['com.affine.import.status.success.message'](), ' ', _jsx("a", { className: style.link, href: BUILD_CONFIG.discordUrl, target: "_blank", rel: "noreferrer", children: "Discord" }), "."] }), _jsx("div", { className: style.importModalButtonContainer, children: _jsx(Button, { onClick: onComplete, variant: "primary", children: t['Complete']() }) })] }));
};
const ErrorStatus = ({ error, onRetry, }) => {
    const t = useI18n();
    const urlService = useService(UrlService);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: style.importModalTitle, children: t['com.affine.import.status.failed.title']() }), _jsx("p", { className: style.importStatusContent, children: error || 'Unknown error occurred' }), _jsxs("div", { className: style.importModalButtonContainer, children: [_jsx(Button, { onClick: () => {
                            urlService.openPopupWindow(BUILD_CONFIG.discordUrl);
                        }, variant: "secondary", children: t['Feedback']() }), _jsx(Button, { onClick: onRetry, variant: "primary", children: t['Retry']() })] })] }));
};
export const ImportDialog = ({ close, }) => {
    const t = useI18n();
    const [status, setStatus] = useState('idle');
    const [importError, setImportError] = useState(null);
    const [importResult, setImportResult] = useState(null);
    const workspace = useService(WorkspaceService).workspace;
    const docCollection = workspace.docCollection;
    const organizeService = useService(OrganizeService);
    const explorerIconService = useService(ExplorerIconService);
    const globalDialogService = useService(GlobalDialogService);
    const { jumpToPage } = useNavigateHelper();
    const handleCreatedWorkspace = useCallback((payload) => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                if (payload.defaultDocId) {
                    jumpToPage(payload.metadata.id, payload.defaultDocId);
                }
                else {
                    jumpToPage(payload.metadata.id, 'all');
                }
                return new Promise(resolve => setTimeout(resolve, 150)); /* start transition after 150ms */
            });
        }
        else {
            if (payload.defaultDocId) {
                jumpToPage(payload.metadata.id, payload.defaultDocId);
            }
            else {
                jumpToPage(payload.metadata.id, 'all');
            }
        }
    }, [jumpToPage]);
    const handleImportAffineFile = useMemo(() => {
        return async () => {
            track.$.navigationPanel.workspaceList.createWorkspace({
                control: 'import',
            });
            return new Promise((resolve, reject) => {
                globalDialogService.open('import-workspace', undefined, payload => {
                    if (payload) {
                        handleCreatedWorkspace({ metadata: payload.workspace });
                        resolve(payload.workspace);
                    }
                    else {
                        reject(new Error('No workspace imported'));
                    }
                });
            });
        };
    }, [globalDialogService, handleCreatedWorkspace]);
    const handleImport = useAsyncCallback(async (type) => {
        setImportError(null);
        try {
            const importConfig = importConfigs[type];
            const { acceptType, multiple } = importConfig.fileOptions;
            const files = acceptType === 'Skip'
                ? []
                : await openFilesWith(acceptType, multiple);
            if (!files || (files.length === 0 && acceptType !== 'Skip')) {
                throw new Error(t['com.affine.import.status.failed.message.no-file-selected']());
            }
            if (acceptType !== 'Skip') {
                setStatus('importing');
                track.$.importModal.$.import({
                    type,
                    status: 'importing',
                });
            }
            const { docIds, entryId, isWorkspaceFile, rootFolderId } = await importConfig.importFunction(docCollection, files, handleImportAffineFile, organizeService, explorerIconService);
            setImportResult({ docIds, entryId, isWorkspaceFile, rootFolderId });
            setStatus('success');
            track.$.importModal.$.import({
                type,
                status: 'success',
                result: {
                    docCount: docIds.length,
                },
            });
            track.$.importModal.$.createDoc({
                control: 'import',
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setImportError(errorMessage);
            setStatus('error');
            track.$.importModal.$.import({
                type,
                status: 'failed',
                error: errorMessage || undefined,
            });
            logger.error('Failed to import', error);
        }
    }, [
        docCollection,
        explorerIconService,
        handleImportAffineFile,
        organizeService,
        t,
    ]);
    const handleComplete = useCallback(() => {
        close(importResult || undefined);
    }, [importResult, close]);
    const handleRetry = () => {
        setStatus('idle');
    };
    const statusComponents = {
        idle: _jsx(ImportOptions, { onImport: handleImport }),
        importing: _jsx(ImportingStatus, {}),
        success: _jsx(SuccessStatus, { onComplete: handleComplete }),
        error: _jsx(ErrorStatus, { error: importError, onRetry: handleRetry }),
    };
    return (_jsx(Modal, { open: true, onOpenChange: (open) => {
            if (!open) {
                close(importResult || undefined);
            }
        }, width: 480, contentOptions: {
            ['data-testid']: 'import-modal',
            style: {
                maxHeight: '85vh',
                maxWidth: '70vw',
                minHeight: '126px',
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                background: cssVarV2('layer/background/primary'),
            },
        }, closeButtonOptions: {
            className: style.closeButton,
        }, withoutCloseButton: status === 'importing', persistent: status === 'importing', children: _jsx("div", { className: style.importModalContainer, "data-testid": "import-dialog", children: statusComponents[status] }) }));
};
//# sourceMappingURL=index.js.map