import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Menu, MenuItem, MenuTrigger } from '@affine/component';
import { getSelectedNodes, useSharingUrl, } from '@affine/core/components/hooks/affine/use-share-url';
import { EditorService } from '@affine/core/modules/editor';
import { useI18n } from '@affine/i18n';
import { BlockIcon, EdgelessIcon, PageIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import * as styles from './copy-link-button.css';
export const CopyLinkButton = ({ workspaceId, secondary, }) => {
    const t = useI18n();
    const editor = useService(EditorService).editor;
    const currentMode = useLiveData(editor.mode$);
    const editorContainer = useLiveData(editor.editorContainer$);
    const { blockIds, elementIds } = useMemo(() => getSelectedNodes(editorContainer?.host || null, currentMode), [editorContainer, currentMode]);
    const { onClickCopyLink } = useSharingUrl({
        workspaceId,
        pageId: editor.doc.id,
    });
    const onCopyPageLink = useCallback(() => {
        onClickCopyLink('page');
    }, [onClickCopyLink]);
    const onCopyEdgelessLink = useCallback(() => {
        onClickCopyLink('edgeless');
    }, [onClickCopyLink]);
    const onCopyBlockLink = useCallback(() => {
        onClickCopyLink(currentMode, blockIds, elementIds);
    }, [onClickCopyLink, currentMode, blockIds, elementIds]);
    const onCopyLink = useCallback(() => {
        onClickCopyLink();
    }, [onClickCopyLink]);
    return (_jsxs("div", { className: clsx(styles.copyLinkContainerStyle, { secondary: secondary }), children: [_jsxs(Button, { className: styles.copyLinkButtonStyle, onClick: onCopyLink, withoutHover: true, variant: secondary ? 'secondary' : 'primary', children: [_jsx("span", { className: clsx(styles.copyLinkLabelStyle, {
                            secondary: secondary,
                        }), children: t['com.affine.share-menu.copy']() }), BUILD_CONFIG.isDesktopEdition && (_jsx("span", { className: clsx(styles.copyLinkShortcutStyle, {
                            secondary: secondary,
                        }), children: environment.isMacOs ? '⌘ + ⌥ + C' : 'Ctrl + Shift + C' }))] }), _jsx(Menu, { contentOptions: {
                    align: 'end',
                }, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { prefixIcon: _jsx(PageIcon, {}), onSelect: onCopyPageLink, "data-testid": "share-link-menu-copy-page", children: t['com.affine.share-menu.copy.page']() }), _jsx(MenuItem, { prefixIcon: _jsx(EdgelessIcon, {}), onSelect: onCopyEdgelessLink, "data-testid": "share-link-menu-copy-edgeless", children: t['com.affine.share-menu.copy.edgeless']() }), _jsx(MenuItem, { prefixIcon: _jsx(BlockIcon, {}), onSelect: onCopyBlockLink, disabled: blockIds.length + elementIds.length === 0, children: t['com.affine.share-menu.copy.block']() })] }), children: _jsx(MenuTrigger, { variant: secondary ? 'secondary' : 'primary', className: clsx(styles.copyLinkTriggerStyle, {
                        secondary: secondary,
                    }), "data-testid": "share-menu-copy-link-button", suffixStyle: { width: 20, height: 20 }, withoutHover: true }) })] }));
};
//# sourceMappingURL=copy-link-button.js.map