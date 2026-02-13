import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Loading, Menu, MenuItem, notify, Skeleton, useConfirmModal, } from '@affine/component';
import { Pagination, SettingHeader, } from '@affine/component/setting-components';
import { Avatar } from '@affine/component/ui/avatar';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { BackupService } from '@affine/core/modules/backup/services';
import { i18nTime, useI18n } from '@affine/i18n';
import track from '@affine/track';
import { DeleteIcon, LocalWorkspaceIcon, MoreVerticalIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import bytes from 'bytes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './styles.css';
const Empty = () => {
    const t = useI18n();
    return (_jsx("div", { className: styles.empty, children: t['com.affine.settings.workspace.backup.empty']() }));
};
const BlobAvatar = ({ blob, name, }) => {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (!blob)
            return;
        const url = URL.createObjectURL(new Blob([blob]));
        setUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [blob]);
    return (_jsx(Avatar, { colorfulFallback: true, name: name, rounded: 4, size: 32, url: url }));
};
const BackupWorkspaceItem = ({ item }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { openConfirmModal } = useConfirmModal();
    const backupService = useService(BackupService);
    const t = useI18n();
    const [importing, setImporting] = useState(false);
    const { jumpToPage } = useNavigateHelper();
    const handleImport = useAsyncCallback(async () => {
        setImporting(true);
        track.$.settingsPanel.archivedWorkspaces.recoverArchivedWorkspace();
        const workspaceId = await backupService.recoverBackupWorkspace(item.dbPath);
        if (!workspaceId) {
            setImporting(false);
            return;
        }
        notify.success({
            title: t['com.affine.settings.workspace.backup.import.success'](),
            actions: [
                {
                    key: 'open',
                    label: t['com.affine.settings.workspace.backup.import.success.action'](),
                    onClick: () => {
                        jumpToPage(workspaceId, 'all');
                    },
                    autoClose: false,
                },
            ],
        });
        setMenuOpen(false);
        setImporting(false);
    }, [backupService, item.dbPath, jumpToPage, t]);
    const handleDelete = useCallback((backupWorkspaceId) => {
        openConfirmModal({
            title: t['com.affine.workspaceDelete.title'](),
            children: t['com.affine.settings.workspace.backup.delete.warning'](),
            onConfirm: async () => {
                track.$.settingsPanel.archivedWorkspaces.deleteArchivedWorkspace();
                await backupService.deleteBackupWorkspace(backupWorkspaceId);
                notify.success({
                    title: t['com.affine.settings.workspace.backup.delete.success'](),
                });
            },
            confirmText: t['Confirm'](),
            cancelText: t['Cancel'](),
            confirmButtonOptions: {
                variant: 'error',
            },
        });
    }, [backupService, openConfirmModal, t]);
    return (_jsxs("div", { "data-testid": "backup-workspace-item", className: styles.listItem, onClick: () => setMenuOpen(v => !v), children: [_jsx(BlobAvatar, { blob: item.avatar, name: item.name }), _jsxs("div", { className: styles.listItemLeftLabel, children: [_jsx("div", { className: styles.listItemLeftLabelTitle, children: item.name }), _jsx("div", { className: styles.listItemLeftLabelDesc, children: bytes(item.fileSize) })] }), _jsxs("div", { className: styles.listItemRightLabel, children: [t['com.affine.settings.workspace.backup.delete-at']({
                        date: i18nTime(item.updatedAt, {
                            absolute: {
                                accuracy: 'day',
                            },
                        }),
                        time: i18nTime(item.updatedAt, {
                            absolute: {
                                accuracy: 'minute',
                                noDate: true,
                                noYear: true,
                            },
                        }),
                    }), _jsx(Menu, { rootOptions: {
                            open: menuOpen && !importing,
                            onOpenChange: setMenuOpen,
                            modal: true,
                        }, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { prefixIcon: _jsx(LocalWorkspaceIcon, {}), onClick: handleImport, children: t['com.affine.settings.workspace.backup.import']() }), _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), onClick: () => handleDelete(item.id), type: "danger", children: t['Delete']() })] }), contentOptions: { align: 'end' }, children: _jsx(IconButton, { disabled: importing, size: "20", children: importing ? _jsx(Loading, {}) : _jsx(MoreVerticalIcon, {}) }) })] })] }, item.id));
};
const PAGE_SIZE = 6;
export const BackupSettingPanel = () => {
    const t = useI18n();
    const backupService = useService(BackupService);
    useEffect(() => {
        backupService.revalidate();
    }, [backupService]);
    const isLoading = useLiveData(backupService.isLoading$);
    const backupWorkspaces = useLiveData(backupService.pageBackupWorkspaces$);
    const [pageNum, setPageNum] = useState(0);
    const innerElement = useMemo(() => {
        if (isLoading) {
            return (_jsx(Skeleton, { style: { margin: '2px', width: 'calc(100% - 4px)' }, height: 60, animation: "wave" }));
        }
        if (!backupWorkspaces) {
            return null;
        }
        return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.list, children: backupWorkspaces.items
                        .slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
                        .map(item => (_jsx(BackupWorkspaceItem, { item: item }, item.id))) }), backupWorkspaces.items.length > PAGE_SIZE && (_jsx("div", { className: styles.pagination, children: _jsx(Pagination, { totalCount: backupWorkspaces?.items.length ?? 0, countPerPage: PAGE_SIZE, pageNum: pageNum, onPageChange: (_, pageNum) => {
                            setPageNum(pageNum);
                        } }) }))] }));
    }, [isLoading, backupWorkspaces, pageNum]);
    const isEmpty = (backupWorkspaces?.items.length === 0 || !backupWorkspaces) && !isLoading;
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.settings.workspace.backup'](), subtitle: t['com.affine.settings.workspace.backup.subtitle'](), "data-testid": "backup-title" }), isEmpty ? (_jsx(Empty, {})) : (_jsx("div", { className: styles.listContainer, children: innerElement }))] }));
};
//# sourceMappingURL=index.js.map