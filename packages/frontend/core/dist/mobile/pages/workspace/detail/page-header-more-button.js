import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, notify, toast, useConfirmModal } from '@affine/component';
import { MenuSeparator, MenuSub, MobileMenu, MobileMenuItem, } from '@affine/component/ui/menu';
import { useFavorite } from '@affine/core/blocksuite/block-suite-header/favorite';
import { Guard, useGuard } from '@affine/core/components/guard';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { DocInfoSheet } from '@affine/core/mobile/components';
import { MobileTocMenu } from '@affine/core/mobile/components/toc-menu';
import { DocService } from '@affine/core/modules/doc';
import { EditorService } from '@affine/core/modules/editor';
import { ViewService } from '@affine/core/modules/workbench/services/view';
import { preventDefault } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, EdgelessIcon, InformationIcon, MoreHorizontalIcon, PageIcon, TocIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { JournalConflictsMenuItem } from './menu/journal-conflicts';
import { JournalTodayActivityMenuItem } from './menu/journal-today-activity';
import { EditorModeSwitch } from './menu/mode-switch';
import * as styles from './page-header-more-button.css';
export const PageHeaderMenuButton = () => {
    const t = useI18n();
    const doc = useService(DocService).doc;
    const docId = doc?.id;
    const canEdit = useGuard('Doc_Update', docId);
    const editorService = useService(EditorService);
    const editorContainer = useLiveData(editorService.editor.editorContainer$);
    const [open, setOpen] = useState(false);
    const location = useLiveData(useService(ViewService).view.location$);
    const isInTrash = useLiveData(editorService.editor.doc.meta$.map(meta => meta.trash));
    const primaryMode = useLiveData(editorService.editor.doc.primaryMode$);
    const title = useLiveData(editorService.editor.doc.title$);
    const { favorite, toggleFavorite } = useFavorite(docId);
    const { openConfirmModal } = useConfirmModal();
    const handleSwitchMode = useCallback(() => {
        const mode = primaryMode === 'page' ? 'edgeless' : 'page';
        // TODO(@JimmFly): remove setMode when there has view mode switch
        editorService.editor.setMode(mode);
        editorService.editor.doc.setPrimaryMode(mode);
        track.$.header.docOptions.switchPageMode({
            mode,
        });
        notify.success({
            title: primaryMode === 'page'
                ? t['com.affine.toastMessage.defaultMode.edgeless.title']()
                : t['com.affine.toastMessage.defaultMode.page.title'](),
            message: primaryMode === 'page'
                ? t['com.affine.toastMessage.defaultMode.edgeless.message']()
                : t['com.affine.toastMessage.defaultMode.page.message'](),
        });
    }, [primaryMode, editorService, t]);
    const handleMenuOpenChange = useCallback((open) => {
        if (open) {
            track.$.header.docOptions.open();
        }
        setOpen(open);
    }, []);
    useEffect(() => {
        // when the location is changed, close the menu
        handleMenuOpenChange(false);
    }, [handleMenuOpenChange, location.pathname]);
    const handleToggleFavorite = useCallback(() => {
        track.$.header.docOptions.toggleFavorite();
        toggleFavorite();
    }, [toggleFavorite]);
    const handleMoveToTrash = useCallback(() => {
        if (!doc) {
            return;
        }
        openConfirmModal({
            title: t['com.affine.moveToTrash.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: doc.title$.value,
            }),
            confirmText: t['com.affine.moveToTrash.confirmModal.confirm'](),
            cancelText: t['com.affine.moveToTrash.confirmModal.cancel'](),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm() {
                doc.moveToTrash();
                track.$.navigationPanel.docs.deleteDoc({
                    control: 'button',
                });
                toast(t['com.affine.toastMessage.movedTrash']());
                // navigate back
                history.back();
            },
        });
    }, [doc, openConfirmModal, t]);
    const EditMenu = (_jsxs(_Fragment, { children: [_jsx(EditorModeSwitch, {}), _jsx(JournalTodayActivityMenuItem, { suffix: _jsx(MenuSeparator, {}) }), _jsx(MobileMenuItem, { prefixIcon: primaryMode === 'page' ? _jsx(EdgelessIcon, {}) : _jsx(PageIcon, {}), "data-testid": "editor-option-menu-mode-switch", onSelect: handleSwitchMode, disabled: !canEdit, children: primaryMode === 'page'
                    ? t['com.affine.editorDefaultMode.edgeless']()
                    : t['com.affine.editorDefaultMode.page']() }), _jsx(MobileMenuItem, { "data-testid": "editor-option-menu-favorite", onSelect: handleToggleFavorite, prefixIcon: _jsx(IsFavoriteIcon, { favorite: favorite }), children: favorite
                    ? t['com.affine.favoritePageOperation.remove']()
                    : t['com.affine.favoritePageOperation.add']() }), _jsx(MenuSeparator, {}), _jsx(MenuSub, { triggerOptions: {
                    prefixIcon: _jsx(InformationIcon, {}),
                    onClick: preventDefault,
                }, title: title ?? t['unnamed'](), items: _jsx(DocInfoSheet, { docId: docId }), children: _jsx("span", { children: t['com.affine.page-properties.page-info.view']() }) }), _jsx(MobileMenu, { title: t['com.affine.header.menu.toc'](), items: _jsx("div", { className: styles.outlinePanel, children: _jsx(MobileTocMenu, { editor: editorContainer?.host ?? null }) }), children: _jsx(MobileMenuItem, { prefixIcon: _jsx(TocIcon, {}), onClick: preventDefault, children: _jsx("span", { children: t['com.affine.header.option.view-toc']() }) }) }), _jsx(JournalConflictsMenuItem, {}), _jsx(Guard, { docId: docId, permission: "Doc_Trash", children: canMoveToTrash => (_jsx(MobileMenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", disabled: !canMoveToTrash, onSelect: handleMoveToTrash, children: t['com.affine.moveToTrash.title']() })) })] }));
    if (isInTrash) {
        return null;
    }
    return (_jsx(MobileMenu, { items: EditMenu, contentOptions: {
            align: 'center',
        }, rootOptions: {
            open,
            onOpenChange: handleMenuOpenChange,
        }, children: _jsx(IconButton, { size: 24, "data-testid": "detail-page-header-more-button", className: styles.iconButton, children: _jsx(MoreHorizontalIcon, {}) }) }));
};
//# sourceMappingURL=page-header-more-button.js.map