import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// credits: tab overlay impl inspired by Figma desktop
import { IconButton, Loading, useDraggable, useDropTarget, } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { CloseIcon, PlusIcon, RightSidebarIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { partition } from 'lodash-es';
import { Fragment, useEffect, useMemo, useState, } from 'react';
import { AppSidebarService } from '../../app-sidebar';
import { DesktopApiService } from '../../desktop-api';
import { resolveLinkToDoc } from '../../navigation';
import { iconNameToIcon } from '../../workbench/constants';
import { DesktopStateSynchronizer } from '../../workbench/services/desktop-state-synchronizer';
import { AppTabsHeaderService, } from '../services/app-tabs-header-service';
import * as styles from './styles.css';
const TabSupportType = new Set(['collection', 'tag', 'doc']);
const tabCanDrop = (tab) => ctx => {
    if (ctx.source.data.from?.at === 'app-header:tabs' &&
        ctx.source.data.from.tabId !== tab?.id) {
        return true;
    }
    if (ctx.source.data.entity?.type &&
        TabSupportType.has(ctx.source.data.entity?.type)) {
        return true;
    }
    return false;
};
const WorkbenchView = ({ workbench, view, activeViewIndex, tabsLength, viewIdx, tabActive, }) => {
    const tabsHeaderService = useService(AppTabsHeaderService);
    const onActivateView = useAsyncCallback(async (viewIdx) => {
        if (viewIdx === activeViewIndex && tabActive) {
            return;
        }
        await tabsHeaderService.activateView?.(workbench.id, viewIdx);
        if (tabActive) {
            track.$.appTabsHeader.$.tabAction({
                control: 'click',
                action: 'switchSplitView',
            });
        }
        else {
            track.$.appTabsHeader.$.tabAction({
                control: 'click',
                action: 'switchTab',
            });
        }
    }, [activeViewIndex, tabActive, tabsHeaderService, workbench.id]);
    const handleClick = useCatchEventCallback(async (e) => {
        e.stopPropagation();
        onActivateView(viewIdx);
    }, [onActivateView, viewIdx]);
    const handleAuxClick = useCatchEventCallback(async (e) => {
        if (e.button === 1) {
            await tabsHeaderService.closeTab?.(workbench.id);
            track.$.appTabsHeader.$.tabAction({
                control: 'midClick',
                action: 'close',
            });
        }
    }, [tabsHeaderService, workbench.id]);
    const onContextMenu = useAsyncCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = await tabsHeaderService.showContextMenu?.(workbench.id, viewIdx);
        switch (action?.type) {
            case 'open-in-split-view': {
                track.$.appTabsHeader.$.tabAction({
                    control: 'contextMenu',
                    action: 'openInSplitView',
                });
                break;
            }
            case 'separate-view': {
                track.$.appTabsHeader.$.tabAction({
                    control: 'contextMenu',
                    action: 'separateTabs',
                });
                break;
            }
            case 'pin-tab': {
                if (action.payload.shouldPin) {
                    track.$.appTabsHeader.$.tabAction({
                        control: 'contextMenu',
                        action: 'pin',
                    });
                }
                else {
                    track.$.appTabsHeader.$.tabAction({
                        control: 'contextMenu',
                        action: 'unpin',
                    });
                }
                break;
            }
            // fixme: when close tab the view may already be gc'ed
            case 'close-tab': {
                track.$.appTabsHeader.$.tabAction({
                    control: 'contextMenu',
                    action: 'close',
                });
                break;
            }
            default:
                break;
        }
    }, [tabsHeaderService, viewIdx, workbench.id]);
    const contentNode = useMemo(() => {
        return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.labelIcon, children: workbench.ready || !workbench.loaded ? (iconNameToIcon[view.iconName ?? 'allDocs']) : (_jsx(Loading, {})) }), !view.title ? null : (_jsx("div", { title: view.title, className: styles.splitViewLabelText, "data-padding-right": tabsLength > 1 && !workbench.pinned, children: view.title }))] }));
    }, [workbench, view, tabsLength]);
    return (_jsx("button", { "data-testid": "split-view-label", className: styles.splitViewLabel, "data-active": activeViewIndex === viewIdx && tabActive, onContextMenu: onContextMenu, onAuxClick: handleAuxClick, onClick: handleClick, children: contentNode }));
};
const WorkbenchTab = ({ workbench, active: tabActive, tabsLength, dnd, onDrop, }) => {
    useServiceOptional(DesktopStateSynchronizer);
    const tabsHeaderService = useService(AppTabsHeaderService);
    const activeViewIndex = workbench.activeViewIndex ?? 0;
    const handleCloseTab = useCatchEventCallback(async () => {
        await tabsHeaderService.closeTab?.(workbench.id);
        track.$.appTabsHeader.$.tabAction({
            control: 'xButton',
            action: 'close',
        });
    }, [tabsHeaderService, workbench.id]);
    const { dropTargetRef, closestEdge } = useDropTarget(() => ({
        closestEdge: {
            allowedEdges: ['left', 'right'],
        },
        onDrop,
        dropEffect: 'move',
        canDrop: dnd ? tabCanDrop(workbench) : false,
        isSticky: true,
        allowExternal: true,
    }), [dnd, onDrop, workbench]);
    const { dragRef } = useDraggable(() => {
        const urls = workbench.views.map(view => {
            const url = new URL(workbench.basename + (view.path?.pathname ?? ''), location.origin);
            url.search = view.path?.search ?? '';
            return url.toString();
        });
        let entity;
        for (const url of urls) {
            const maybeDocLink = resolveLinkToDoc(url);
            if (maybeDocLink && maybeDocLink.docId) {
                entity = {
                    type: 'doc',
                    id: maybeDocLink.docId,
                };
            }
        }
        return {
            canDrag: dnd,
            data: {
                from: {
                    at: 'app-header:tabs',
                    tabId: workbench.id,
                },
                entity,
            },
            dragPreviewPosition: 'pointer-outside',
            toExternalData: () => {
                return {
                    'text/uri-list': urls.join('\n'),
                };
            },
            onDragStart: () => {
                track.$.appTabsHeader.$.dragStart({
                    type: 'tab',
                });
            },
        };
    }, [dnd, workbench.basename, workbench.id, workbench.views]);
    return (_jsxs("div", { className: styles.tabWrapper, ref: node => {
            dropTargetRef.current = node;
            dragRef.current = node;
        }, children: [_jsxs("div", { "data-testid": "workbench-tab", "data-active": tabActive, "data-pinned": workbench.pinned, className: styles.tab, style: assignInlineVars({
                    [styles.tabMaxWidth]: `${Math.max(workbench.views.length * 52, workbench.pinned ? 64 : 200)}px`,
                }), children: [workbench.views.map((view, viewIdx) => {
                        return (_jsxs(Fragment, { children: [_jsx(WorkbenchView, { workbench: workbench, view: view, activeViewIndex: activeViewIndex, tabsLength: workbench.views.length, viewIdx: viewIdx, tabActive: tabActive, dnd: dnd }), viewIdx !== workbench.views.length - 1 ? (_jsx("div", { className: styles.splitViewSeparator })) : null] }, view.id));
                    }), _jsx("div", { className: styles.tabCloseButtonWrapper, children: tabsLength > 1 && !workbench.pinned ? (_jsx("button", { "data-testid": "close-tab-button", className: styles.tabCloseButton, onClick: handleCloseTab, children: _jsx(CloseIcon, {}) })) : null })] }, workbench.id), _jsx("div", { className: styles.dropIndicator, "data-edge": closestEdge })] }));
};
const useIsFullScreen = () => {
    const desktopApi = useServiceOptional(DesktopApiService);
    const [fullScreen, setFullScreen] = useState(false);
    useEffect(() => {
        desktopApi?.handler.ui
            .isFullScreen()
            .then(setFullScreen)
            .then(() => {
            desktopApi?.events.ui.onFullScreen(setFullScreen);
        })
            .catch(console.error);
    }, [desktopApi?.events.ui, desktopApi?.handler.ui]);
    return fullScreen;
};
export const AppTabsHeader = ({ style, mode = 'app', className, left, }) => {
    const t = useI18n();
    const appSidebarService = useService(AppSidebarService).sidebar;
    const sidebarWidth = useLiveData(appSidebarService.width$);
    const sidebarOpen = useLiveData(appSidebarService.open$);
    const sidebarResizing = useLiveData(appSidebarService.resizing$);
    const isMacosDesktop = BUILD_CONFIG.isElectron && environment.isMacOs;
    const isWindowsDesktop = BUILD_CONFIG.isElectron && environment.isWindows;
    const fullScreen = useIsFullScreen();
    const desktopApi = useService(DesktopApiService);
    const tabsHeaderService = useService(AppTabsHeaderService);
    const tabs = useLiveData(tabsHeaderService.tabsStatus$);
    const [pinned, unpinned] = partition(tabs, tab => tab.pinned);
    const onAddTab = useAsyncCallback(async () => {
        await tabsHeaderService.onAddTab?.();
        track.$.appTabsHeader.$.tabAction({
            control: 'click',
            action: 'openInNewTab',
        });
    }, [tabsHeaderService]);
    const onToggleRightSidebar = useAsyncCallback(async () => {
        await tabsHeaderService.onToggleRightSidebar?.();
    }, [tabsHeaderService]);
    useEffect(() => {
        if (mode === 'app') {
            desktopApi.handler.ui.pingAppLayoutReady().catch(console.error);
        }
    }, [mode, desktopApi]);
    const onDrop = useAsyncCallback(async (data, targetId) => {
        const edge = data.closestEdge ?? 'right';
        targetId = targetId ?? tabs.at(-1)?.id;
        if (!targetId || edge === 'top' || edge === 'bottom') {
            return;
        }
        if (data.source.data.from?.at === 'app-header:tabs') {
            if (targetId === data.source.data.from.tabId) {
                return;
            }
            track.$.appTabsHeader.$.tabAction({
                control: 'dnd',
                action: 'moveTab',
            });
            return await tabsHeaderService.moveTab?.(data.source.data.from.tabId, targetId, edge);
        }
        if (data.source.data.entity?.type === 'doc') {
            track.$.appTabsHeader.$.tabAction({
                control: 'dnd',
                action: 'openInNewTab',
                type: 'doc',
            });
            return await tabsHeaderService.onAddDocTab?.(data.source.data.entity.id, targetId, edge);
        }
        if (data.source.data.entity?.type === 'tag') {
            track.$.appTabsHeader.$.tabAction({
                type: 'tag',
                control: 'dnd',
                action: 'openInNewTab',
            });
            return await tabsHeaderService.onAddTagTab?.(data.source.data.entity.id, targetId, edge);
        }
        if (data.source.data.entity?.type === 'collection') {
            track.$.appTabsHeader.$.tabAction({
                type: 'collection',
                control: 'dnd',
                action: 'openInNewTab',
            });
            return await tabsHeaderService.onAddCollectionTab?.(data.source.data.entity.id, targetId, edge);
        }
    }, [tabs, tabsHeaderService]);
    const { dropTargetRef: spacerDropTargetRef, draggedOver } = useDropTarget(() => ({
        onDrop,
        dropEffect: 'move',
        canDrop: tabCanDrop(),
    }), [onDrop]);
    const trafficLightOffset = isMacosDesktop && !fullScreen ? 70 : 0;
    return (_jsxs("div", { className: clsx(styles.root, className), style: style, "data-mode": mode, "data-is-windows": isWindowsDesktop, children: [_jsx("div", { style: {
                    transition: sidebarResizing ? 'none' : undefined,
                    paddingLeft: 12 + trafficLightOffset,
                    width: sidebarOpen ? sidebarWidth : 120 + trafficLightOffset,
                    // minus 16 to account for the padding on the right side of the header (for box shadow)
                    marginRight: sidebarOpen ? -16 : 0,
                }, className: styles.headerLeft, children: left }), _jsxs("div", { className: styles.tabs, children: [pinned.map(tab => {
                        return (_jsx(WorkbenchTab, { dnd: mode === 'app', tabsLength: pinned.length, workbench: tab, onDrop: data => onDrop(data, tab.id), active: tab.active }, tab.id));
                    }), pinned.length > 0 && unpinned.length > 0 && (_jsx("div", { className: styles.pinSeparator })), unpinned.map(tab => {
                        return (_jsx(WorkbenchTab, { dnd: mode === 'app', tabsLength: tabs.length, workbench: tab, onDrop: data => onDrop(data, tab.id), active: tab.active }, tab.id));
                    })] }), _jsx("div", { className: styles.spacer, ref: spacerDropTargetRef, "data-dragged-over": draggedOver, children: _jsx(IconButton, { size: 22.86, onClick: onAddTab, tooltip: t['com.affine.multi-tab.new-tab'](), tooltipShortcut: ['$mod', 'T'], "data-testid": "add-tab-view-button", style: { width: 32, height: 32 }, icon: _jsx(PlusIcon, {}) }) }), _jsx(IconButton, { size: "24", onClick: onToggleRightSidebar, children: _jsx(RightSidebarIcon, {}) }), isWindowsDesktop && (_jsx("div", { className: styles.windowsAppControlsPlaceholder }))] }));
};
//# sourceMappingURL=app-tabs-header.js.map