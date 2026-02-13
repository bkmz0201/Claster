import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Divider, observeIntersection, Skeleton, useLitPortalFactory, } from '@affine/component';
import { getViewManager } from '@affine/core/blocksuite/manager/view';
import { patchReferenceRenderer, } from '@affine/core/blocksuite/view-extensions/editor-view/reference-renderer';
import { useGuard } from '@affine/core/components/guard';
import { useEnableAI } from '@affine/core/components/hooks/affine/use-enable-ai';
import { DocService } from '@affine/core/modules/doc';
import { DocLinksService, } from '@affine/core/modules/doc-link';
import { toDocSearchParams } from '@affine/core/modules/navigation/utils';
import { GlobalSessionStateService } from '@affine/core/modules/storage';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { ToggleDownIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { LiveData, useFramework, useLiveData, useServices, } from '@toeverything/infra';
import { debounce } from 'lodash-es';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { AffinePageReference, AffineSharedPageReference, } from '../../components/affine/reference-link';
import { LitTextRenderer } from '../ai/components/text-renderer';
import * as styles from './bi-directional-link-panel.css';
const PREFIX = 'bi-directional-link-panel-collapse:';
const useBiDirectionalLinkPanelCollapseState = (docId, linkDocId) => {
    const { globalSessionStateService } = useServices({
        GlobalSessionStateService,
    });
    const path = linkDocId ? docId + ':' + linkDocId : docId;
    const [open, setOpen] = useState(globalSessionStateService.globalSessionState.get(PREFIX + path) ?? false);
    const wrappedSetOpen = useCallback((open) => {
        setOpen(open);
        globalSessionStateService.globalSessionState.set(PREFIX + path, open);
    }, [path, globalSessionStateService]);
    return [open, wrappedSetOpen];
};
const CollapsibleSection = ({ title, children, length, docId, linkDocId, }) => {
    const [open, setOpen] = useBiDirectionalLinkPanelCollapseState(docId, linkDocId);
    const handleToggle = useCallback(() => {
        setOpen(!open);
        track.doc.biDirectionalLinksPanel.$.toggle({
            type: open ? 'collapse' : 'expand',
        });
    }, [open, setOpen]);
    return (_jsxs(Collapsible.Root, { open: open, onOpenChange: handleToggle, children: [_jsxs(Collapsible.Trigger, { className: styles.link, children: [title, length ? (_jsx(ToggleDownIcon, { className: styles.collapsedIcon, "data-collapsed": !open })) : null] }), _jsx(Collapsible.Content, { children: children })] }));
};
const usePreviewExtensions = () => {
    const [reactToLit, portals] = useLitPortalFactory();
    const framework = useFramework();
    const { workspaceService } = useServices({
        WorkspaceService,
    });
    const referenceRenderer = useMemo(() => {
        return function customReference(reference) {
            const data = reference.delta.attributes?.reference;
            if (!data)
                return _jsx("span", {});
            const pageId = data.pageId;
            if (!pageId)
                return _jsx("span", {});
            const params = toDocSearchParams(data.params);
            if (workspaceService.workspace.openOptions.isSharedMode) {
                return (_jsx(AffineSharedPageReference, { docCollection: workspaceService.workspace.docCollection, pageId: pageId, params: params }));
            }
            return _jsx(AffinePageReference, { pageId: pageId, params: params });
        };
    }, [workspaceService]);
    const enableAI = useEnableAI();
    const extensions = useMemo(() => {
        const manager = getViewManager()
            .config.init()
            .foundation(framework)
            .ai(enableAI, framework)
            .theme(framework)
            .database(framework)
            .iconPicker(framework)
            .linkedDoc(framework)
            .paragraph(enableAI)
            .linkPreview(framework)
            .codeBlockPreview(framework).value;
        const specs = manager.get('preview-page');
        return [...specs, patchReferenceRenderer(reactToLit, referenceRenderer)];
    }, [reactToLit, referenceRenderer, framework, enableAI]);
    return [extensions, portals];
};
export const BacklinkGroups = () => {
    const [extensions, portals] = usePreviewExtensions();
    const { workspaceService, docService } = useServices({
        WorkspaceService,
        DocService,
    });
    const { docLinksService } = useServices({
        DocLinksService,
    });
    const backlinkGroups = useLiveData(docLinksService.backlinks.backlinks$.map(links => {
        if (links === undefined) {
            return undefined;
        }
        // group by docId
        const groupedLinks = links.reduce((acc, link) => {
            acc[link.docId] = [...(acc[link.docId] || []), link];
            return acc;
        }, {});
        return Object.entries(groupedLinks).map(([docId, links]) => ({
            docId,
            title: links[0].title, // title should be the same for all blocks
            links,
        }));
    }));
    useEffect(() => {
        docLinksService.backlinks.revalidateFromCloud();
    }, [docLinksService]);
    const textRendererOptions = useMemo(() => {
        const docLinkBaseURLMiddleware = ({ adapterConfigs, }) => {
            adapterConfigs.set('docLinkBaseUrl', `/workspace/${workspaceService.workspace.id}`);
        };
        return {
            customHeading: true,
            extensions,
            additionalMiddlewares: [docLinkBaseURLMiddleware],
        };
    }, [extensions, workspaceService.workspace.id]);
    return (_jsxs(_Fragment, { children: [backlinkGroups === undefined ? (_jsx(Skeleton, {})) : (backlinkGroups.map(linkGroup => (_jsx(CollapsibleSection, { title: _jsx(AffinePageReference, { pageId: linkGroup.docId, onClick: () => {
                        track.doc.biDirectionalLinksPanel.backlinkTitle.navigate();
                    } }), length: linkGroup.links.length, docId: docService.doc.id, linkDocId: linkGroup.docId, children: _jsx(LinkPreview, { textRendererOptions: textRendererOptions, linkGroup: linkGroup }) }, linkGroup.docId)))), portals.map(p => (_jsx(Fragment, { children: p.portal }, p.id)))] }));
};
const BacklinkLinks = () => {
    const t = useI18n();
    const [visibility, setVisibility] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        return observeIntersection(container, debounce(entry => {
            setVisibility(entry.isIntersecting);
        }, 500, {
            trailing: true,
        }));
    }, []);
    const { docLinksService } = useServices({
        DocLinksService,
    });
    const backlinks = useLiveData(docLinksService.backlinks.backlinks$);
    useEffect(() => {
        if (visibility) {
            docLinksService.backlinks.revalidateFromCloud();
        }
    }, [docLinksService, visibility]);
    const backlinkCount = backlinks?.length;
    return (_jsxs("div", { className: styles.linksContainer, ref: containerRef, children: [_jsxs("div", { className: styles.linksTitles, children: [t['com.affine.page-properties.backlinks'](), ' ', backlinkCount !== undefined ? `· ${backlinkCount}` : ''] }), _jsx(BacklinkGroups, {})] }));
};
export const LinkPreview = ({ linkGroup, textRendererOptions, }) => {
    const canAccess = useGuard('Doc_Read', linkGroup.docId);
    const t = useI18n();
    if (!canAccess) {
        return (_jsx("span", { className: styles.notFound, children: t['com.affine.share-menu.option.permission.no-access']() }));
    }
    return (_jsx("div", { className: styles.linkPreviewContainer, children: linkGroup.links.map(link => {
            if (!link.markdownPreview) {
                return null;
            }
            const searchParams = new URLSearchParams();
            const displayMode = link.displayMode || 'page';
            searchParams.set('mode', displayMode);
            let blockId = link.blockId;
            if (link.parentFlavour === 'affine:database' && link.parentBlockId) {
                // if parentBlockFlavour is 'affine:database',
                // we will fallback to the database block instead
                blockId = link.parentBlockId;
            }
            else if (displayMode === 'edgeless' && link.noteBlockId) {
                // if note has displayMode === 'edgeless' && has noteBlockId,
                // set noteBlockId as blockId
                blockId = link.noteBlockId;
            }
            searchParams.set('blockIds', blockId);
            const to = {
                pathname: '/' + linkGroup.docId,
                search: '?' + searchParams.toString(),
                hash: '',
            };
            // if this backlink has no noteBlock && displayMode is edgeless, we will render
            // the link as a page link
            const edgelessLink = displayMode === 'edgeless' && !link.noteBlockId;
            return (_jsx(WorkbenchLink, { to: to, className: styles.linkPreview, onClick: () => {
                    track.doc.biDirectionalLinksPanel.backlinkPreview.navigate();
                }, children: edgelessLink ? (_jsxs(_Fragment, { children: ["[Edgeless]", _jsx(AffinePageReference, { pageId: linkGroup.docId, params: searchParams }, link.blockId)] })) : (_jsx(LitTextRenderer, { className: styles.linkPreviewRenderer, answer: link.markdownPreview, options: textRendererOptions })) }, link.blockId));
        }) }));
};
export const BiDirectionalLinkPanel = () => {
    const { docLinksService, docService } = useServices({
        DocLinksService,
        DocService,
    });
    const t = useI18n();
    const [show, setShow] = useBiDirectionalLinkPanelCollapseState(docService.doc.id);
    const links = useLiveData(show ? docLinksService.links.links$ : new LiveData([]));
    const handleClickShow = useCallback(() => {
        setShow(!show);
        track.doc.biDirectionalLinksPanel.$.toggle({
            type: show ? 'collapse' : 'expand',
        });
    }, [show, setShow]);
    return (_jsxs("div", { className: styles.container, children: [!show && _jsx(Divider, { size: "thinner" }), _jsxs("div", { className: styles.titleLine, children: [_jsx("div", { className: styles.title, children: "Bi-Directional Links" }), _jsx(Button, { className: styles.showButton, onClick: handleClickShow, children: show
                            ? t['com.affine.editor.bi-directional-link-panel.hide']()
                            : t['com.affine.editor.bi-directional-link-panel.show']() })] }), show && (_jsxs(_Fragment, { children: [_jsx(Divider, { size: "thinner" }), _jsx(BacklinkLinks, {}), _jsxs("div", { className: styles.linksContainer, children: [_jsxs("div", { className: styles.linksTitles, children: [t['com.affine.page-properties.outgoing-links'](), " \u00B7", ' ', links.length] }), links.map((link, i) => (_jsx("div", { className: styles.link, children: _jsx(AffinePageReference, { pageId: link.docId, params: link.params }) }, `${link.docId}-${link.params?.toString()}-${i}`)))] })] }))] }));
};
//# sourceMappingURL=bi-directional-link-panel.js.map