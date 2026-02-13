import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Loading, Scrollable } from '@affine/component';
import { EditorLoading } from '@affine/component/page-detail-skeleton';
import { Button, IconButton } from '@affine/component/ui/button';
import { Modal, useConfirmModal } from '@affine/component/ui/modal';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { EditorService } from '@affine/core/modules/editor';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceQuotaService } from '@affine/core/modules/quota';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { i18nTime, Trans, useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { CloseIcon, ToggleRightIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLiveData, useService } from '@toeverything/infra';
import { atom, useAtom } from 'jotai';
import { Fragment, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useState, } from 'react';
import { encodeStateAsUpdate } from 'yjs';
import { BlockSuiteEditor } from '../../../blocksuite/block-suite-editor';
import { PureEditorModeSwitch } from '../../../blocksuite/block-suite-mode-switch';
import { pageHistoryModalAtom } from '../../atoms/page-history';
import { useGuard } from '../../guard';
import { AffineErrorBoundary } from '../affine-error-boundary';
import { historyListGroupByDay, useDocSnapshotList, useRestorePage, useSnapshotPage, } from './data';
import { EmptyHistoryShape } from './empty-history-shape';
import * as styles from './styles.css';
const contentOptions = {
    ['data-testid']: 'page-history-modal',
    onPointerDownOutside: e => {
        e.preventDefault();
    },
    style: {
        padding: 0,
        maxWidth: 944,
        backgroundColor: 'var(--affine-background-primary-color)',
        overflow: 'hidden',
    },
};
const ModalContainer = ({ onOpenChange, open, children, }) => {
    return (_jsx(Modal, { open: open, onOpenChange: onOpenChange, width: "calc(100% - 64px)", height: "80%", withoutCloseButton: true, contentOptions: contentOptions, children: children }));
};
const HistoryEditorPreview = ({ ts, historyList, snapshotPage, onModeChange, mode, title, }) => {
    const onModeChangeWithTrack = useCallback((mode) => {
        track.$.docHistory.$.switchPageMode({ mode });
        onModeChange(mode);
    }, [onModeChange]);
    const content = useMemo(() => {
        return (_jsxs("div", { className: styles.previewContent, children: [_jsxs("div", { className: styles.previewHeader, children: [_jsx(PureEditorModeSwitch, { mode: mode, setMode: onModeChangeWithTrack }), _jsx("div", { className: styles.previewHeaderTitle, children: title }), _jsx("div", { className: styles.previewHeaderTimestamp, children: ts
                                ? i18nTime(ts, {
                                    absolute: { accuracy: 'minute', noDate: true },
                                })
                                : null })] }), snapshotPage ? (_jsx(AffineErrorBoundary, { children: _jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { className: "affine-page-viewport", children: _jsx(BlockSuiteEditor, { className: styles.editor, mode: mode, page: snapshotPage, readonly: true }) }), _jsx(Scrollable.Scrollbar, {})] }) })) : (_jsx("div", { className: styles.loadingContainer, children: _jsx(Loading, { size: 24 }) }))] }));
    }, [mode, onModeChangeWithTrack, snapshotPage, title, ts]);
    return (_jsx("div", { className: styles.previewWrapper, children: historyList.map((_item, i) => {
            const historyIndex = historyList.findIndex(h => h.timestamp === ts);
            const distance = i - historyIndex;
            const flag = distance > 20
                ? '> 20'
                : distance < -20
                    ? '< -20'
                    : distance.toString();
            return (_jsx("div", { "data-distance": flag, className: styles.previewContainer, children: historyIndex === i ? content : null }, i));
        }) }));
};
const planPromptClosedAtom = atom(false);
const PlanPrompt = () => {
    const workspaceQuotaService = useService(WorkspaceQuotaService);
    useEffect(() => {
        workspaceQuotaService.quota.revalidate();
    }, [workspaceQuotaService]);
    const workspaceQuota = useLiveData(workspaceQuotaService.quota.quota$);
    const isProWorkspace = useMemo(() => {
        return workspaceQuota
            ? workspaceQuota.humanReadable.name.toLowerCase() !== 'free'
            : null;
    }, [workspaceQuota]);
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    useEffect(() => {
        // revalidate permission
        permissionService.permission.revalidate();
    }, [permissionService]);
    const [planPromptClosed, setPlanPromptClosed] = useAtom(planPromptClosedAtom);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const closeFreePlanPrompt = useCallback(() => {
        setPlanPromptClosed(true);
    }, [setPlanPromptClosed]);
    const onClickUpgrade = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'plans',
            scrollAnchor: 'cloudPricingPlan',
        });
        track.$.docHistory.$.viewPlans();
    }, [workspaceDialogService]);
    const t = useI18n();
    const planTitle = useMemo(() => {
        return (_jsxs("div", { className: styles.planPromptTitle, children: [isProWorkspace !== null
                    ? !isProWorkspace
                        ? t['com.affine.history.confirm-restore-modal.plan-prompt.limited-title']()
                        : t['com.affine.history.confirm-restore-modal.plan-prompt.title']()
                    : '' /* TODO(@catsjuice): loading UI */, _jsx(IconButton, { onClick: closeFreePlanPrompt, children: _jsx(CloseIcon, {}) })] }));
    }, [closeFreePlanPrompt, isProWorkspace, t]);
    const planDescription = useMemo(() => {
        if (!isProWorkspace) {
            return (_jsxs(_Fragment, { children: [_jsxs(Trans, { i18nKey: "com.affine.history.confirm-restore-modal.free-plan-prompt.description", children: ["With the workspace creator's Free account, every member can access up to ", _jsx("b", { children: "7 days" }), " of version history."] }), isOwner ? (_jsx("span", { className: styles.planPromptUpdateButton, onClick: onClickUpgrade, children: t['com.affine.history.confirm-restore-modal.pro-plan-prompt.upgrade']() })) : null] }));
        }
        else {
            return (_jsxs(Trans, { i18nKey: "com.affine.history.confirm-restore-modal.pro-plan-prompt.description", children: ["With the workspace creator's Pro account, every member enjoys the privilege of accessing up to ", _jsx("b", { children: "30 days" }), " of version history."] }));
        }
    }, [isOwner, isProWorkspace, onClickUpgrade, t]);
    return !planPromptClosed ? (_jsx("div", { className: styles.planPromptWrapper, children: _jsxs("div", { className: styles.planPrompt, children: [planTitle, planDescription] }) })) : null;
};
const PageHistoryList = ({ historyList, onLoadMore, loadingMore, activeVersion, onVersionChange, }) => {
    const t = useI18n();
    const historyListByDay = useMemo(() => {
        return historyListGroupByDay(historyList);
    }, [historyList]);
    const [collapsedMap, setCollapsedMap] = useState({});
    useLayoutEffect(() => {
        if (historyList.length > 0 && !activeVersion) {
            onVersionChange(historyList[0].timestamp);
        }
    }, [activeVersion, historyList, onVersionChange]);
    return (_jsxs("div", { className: styles.historyList, children: [_jsx("div", { className: styles.historyListHeader, children: t['com.affine.history.version-history']() }), _jsxs(Scrollable.Root, { className: styles.historyListScrollable, children: [_jsxs(Scrollable.Viewport, { className: styles.historyListScrollableInner, children: [_jsx(PlanPrompt, {}), historyListByDay.map(([day, list], i) => {
                                const collapsed = collapsedMap[i];
                                const isLastGroup = i === historyListByDay.length - 1;
                                return (_jsxs(Collapsible.Root, { open: !collapsed, className: styles.historyItemGroup, children: [_jsxs(Collapsible.Trigger, { role: "button", onClick: () => setCollapsedMap(prev => ({ ...prev, [i]: !collapsed })), className: styles.historyItemGroupTitle, children: [_jsx("div", { "data-testid": "page-list-group-header-collapsed-button", className: styles.collapsedIconContainer, children: _jsx(ToggleRightIcon, { className: styles.collapsedIcon, "data-collapsed": !!collapsed }) }), day] }), _jsx(Collapsible.Content, { className: styles.historyItemGroupContent, children: list.map((history, idx) => {
                                                const isLastItem = idx === list.length - 1;
                                                return (_jsxs(Fragment, { children: [_jsxs("div", { className: styles.historyItem, "data-testid": "version-history-item", onClick: e => {
                                                                e.stopPropagation();
                                                                onVersionChange(history.timestamp);
                                                            }, "data-active": activeVersion === history.timestamp, children: [_jsxs("span", { className: styles.historyItemTimestamp, children: [i18nTime(history.timestamp, {
                                                                            absolute: { noDate: true, accuracy: 'minute' },
                                                                        }), activeVersion === history.timestamp ? (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u00B7" }), _jsx("div", { className: styles.historyItemCurrent, children: t['current']() })] })) : null] }), _jsxs("div", { className: styles.historyItemNameWrapper, children: [_jsx(Avatar, { className: styles.historyItemAvatar, url: history.editor?.avatarUrl ?? '', name: history.editor?.name ?? '', size: 22 }), _jsx("span", { className: styles.historyItemName, children: history.editor?.name ?? t['unnamed']() })] })] }), isLastGroup && isLastItem && onLoadMore ? (_jsx(Button, { variant: "plain", loading: loadingMore, disabled: loadingMore, className: styles.historyItemLoadMore, onClick: onLoadMore, children: t['com.affine.history.confirm-restore-modal.load-more']() })) : null] }, history.timestamp));
                                            }) })] }, day));
                            })] }), _jsx(Scrollable.Scrollbar, {})] })] }));
};
const EmptyHistoryPrompt = () => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.emptyHistoryPrompt, "data-testid": "empty-history-prompt", children: [_jsx(EmptyHistoryShape, {}), _jsx("div", { className: styles.emptyHistoryPromptTitle, children: t['com.affine.history.empty-prompt.title']() }), _jsx("div", { className: styles.emptyHistoryPromptDescription, children: t['com.affine.history.empty-prompt.description']() })] }));
};
const PageHistoryManager = ({ docCollection, pageId, onClose, }) => {
    const workspaceId = docCollection.id;
    const [activeVersion, setActiveVersion] = useState();
    const pageDocId = useMemo(() => {
        return docCollection.getDoc(pageId)?.spaceDoc.guid ?? pageId;
    }, [pageId, docCollection]);
    const { openConfirmModal } = useConfirmModal();
    const snapshotPage = useSnapshotPage(docCollection, pageDocId, activeVersion);
    const t = useI18n();
    const { onRestore, isMutating } = useRestorePage(docCollection, pageId);
    const handleRestore = useMemo(() => async () => {
        if (!activeVersion || !snapshotPage) {
            return;
        }
        const snapshot = encodeStateAsUpdate(snapshotPage.spaceDoc);
        await onRestore(activeVersion, new Uint8Array(snapshot));
        // close the modal after restore
        onClose();
    }, [activeVersion, onClose, onRestore, snapshotPage]);
    const editor = useService(EditorService).editor;
    const [mode, setMode] = useState(editor.mode$.value);
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const i18n = useI18n();
    const title = useLiveData(docDisplayMetaService.title$(pageId));
    const canEdit = useGuard('Doc_Update', pageDocId);
    const onConfirmRestore = useCallback(() => {
        openConfirmModal({
            title: t['com.affine.history.restore-current-version'](),
            description: t['com.affine.history.confirm-restore-modal.hint'](),
            cancelText: t['Cancel'](),
            contentOptions: {
                ['data-testid']: 'confirm-restore-history-modal',
                style: { padding: '20px 26px' },
            },
            confirmText: t['com.affine.history.confirm-restore-modal.restore'](),
            confirmButtonOptions: {
                variant: 'primary',
                ['data-testid']: 'confirm-restore-history-button',
            },
            onConfirm: handleRestore,
        });
    }, [handleRestore, openConfirmModal, t]);
    const [historyList, loadMore, loadingMore] = useDocSnapshotList(workspaceId, pageDocId);
    return (_jsxs("div", { className: styles.root, children: [_jsxs("div", { className: styles.modalContent, "data-empty": !activeVersion, children: [_jsx(HistoryEditorPreview, { ts: activeVersion, historyList: historyList, snapshotPage: snapshotPage, mode: mode, onModeChange: setMode, title: i18n.t(title) }), _jsx(PageHistoryList, { historyList: historyList, onLoadMore: loadMore, loadingMore: loadingMore, activeVersion: activeVersion, onVersionChange: setActiveVersion })] }), !activeVersion ? (_jsx("div", { className: styles.modalContent, children: _jsx(EmptyHistoryPrompt, {}) })) : null, _jsxs("div", { className: styles.historyFooter, children: [_jsx(Button, { onClick: onClose, children: t['com.affine.history.back-to-page']() }), _jsx("div", { className: styles.spacer }), _jsx(Button, { variant: "primary", onClick: onConfirmRestore, disabled: isMutating || !activeVersion || !canEdit, children: t['com.affine.history.restore-current-version']() })] })] }));
};
export const PageHistoryModal = ({ onOpenChange, open, pageId, docCollection: workspace, }) => {
    const onClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);
    return (_jsx(ModalContainer, { onOpenChange: onOpenChange, open: open, children: _jsx(Suspense, { fallback: _jsx(EditorLoading, {}), children: _jsx(PageHistoryManager, { onClose: onClose, pageId: pageId, docCollection: workspace }) }) }));
};
export const GlobalPageHistoryModal = () => {
    const [{ open, pageId }, setState] = useAtom(pageHistoryModalAtom);
    const workspace = useService(WorkspaceService).workspace;
    const handleOpenChange = useCallback((open) => {
        track.$.docHistory.$[open ? 'open' : 'close']();
        setState(prev => ({
            ...prev,
            open,
        }));
    }, [setState]);
    return (_jsx(PageHistoryModal, { open: open, onOpenChange: handleOpenChange, pageId: pageId, docCollection: workspace.docCollection }));
};
//# sourceMappingURL=history-modal.js.map