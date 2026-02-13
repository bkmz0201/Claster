import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, DragHandle, observeResize, useDraggable, } from '@affine/component';
import { FavoriteButton } from '@affine/core/blocksuite/block-suite-header/favorite';
import { InfoButton } from '@affine/core/blocksuite/block-suite-header/info';
import { JournalWeekDatePicker } from '@affine/core/blocksuite/block-suite-header/journal/date-picker';
import { JournalTodayButton } from '@affine/core/blocksuite/block-suite-header/journal/today-button';
import { PageHeaderMenuButton } from '@affine/core/blocksuite/block-suite-header/menu';
import { DetailPageHeaderPresentButton } from '@affine/core/blocksuite/block-suite-header/present/detail-header-present-button';
import { BlocksuiteHeaderTitle } from '@affine/core/blocksuite/block-suite-header/title';
import { EditorModeSwitch } from '@affine/core/blocksuite/block-suite-mode-switch';
import { useRegisterCopyLinkCommands } from '@affine/core/components/hooks/affine/use-register-copy-link-commands';
import { HeaderDivider } from '@affine/core/components/pure/header';
import { DocService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { EditorService } from '@affine/core/modules/editor';
import { JournalService } from '@affine/core/modules/journal';
import { SharePageButton } from '@affine/core/modules/share-menu';
import { TemplateDocService } from '@affine/core/modules/template-doc';
import { ViewIcon, ViewTitle } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, memo, useCallback, useEffect, useRef, useState, } from 'react';
import * as styles from './detail-page-header.css';
import { useDetailPageHeaderResponsive } from './use-header-responsive';
const Header = forwardRef(({ children, style, className }, ref) => {
    return (_jsx("div", { "data-testid": "header", style: style, className: className, ref: ref, children: children }));
});
Header.displayName = 'forwardRef(Header)';
const TemplateMark = memo(function TemplateMark({ className, ...props }) {
    const t = useI18n();
    const doc = useService(DocService).doc;
    const templateDocService = useService(TemplateDocService);
    const isTemplate = useLiveData(templateDocService.list.isTemplate$(doc.id));
    if (!isTemplate)
        return null;
    return (_jsx("div", { className: clsx(styles.templateMark, className), ...props, children: t['Template']() }));
});
export function JournalPageHeader({ page, workspace }) {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        return observeResize(container, entry => {
            setContainerWidth(entry.contentRect.width);
        });
    }, []);
    const { hideShare, hideToday } = useDetailPageHeaderResponsive(containerWidth);
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const i18n = useI18n();
    const title = i18n.t(useLiveData(docDisplayMetaService.title$(page.id)));
    return (_jsxs(Header, { className: styles.header, ref: containerRef, children: [_jsx(ViewTitle, { title: title }), _jsx(ViewIcon, { icon: "journal" }), _jsx(EditorModeSwitch, {}), _jsx("div", { className: styles.journalWeekPicker, children: _jsx(JournalWeekDatePicker, { page: page }) }), _jsx(TemplateMark, { className: styles.journalTemplateMark }), hideToday ? null : _jsx(JournalTodayButton, {}), _jsx(HeaderDivider, {}), _jsx(PageHeaderMenuButton, { isJournal: true, page: page, containerWidth: containerWidth }), page && !hideShare ? (_jsx(SharePageButton, { workspace: workspace, page: page })) : null] }));
}
export function NormalPageHeader({ page, workspace }) {
    const titleInputHandleRef = useRef(null);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        return observeResize(container, entry => {
            setContainerWidth(entry.contentRect.width);
        });
    }, []);
    const { hideCollect, hideShare, hidePresent, showDivider } = useDetailPageHeaderResponsive(containerWidth);
    const onRename = useCallback(() => {
        setTimeout(() => titleInputHandleRef.current?.triggerEdit(), 500 /* wait for menu animation end */);
    }, []);
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const i18n = useI18n();
    const title = i18n.t(useLiveData(docDisplayMetaService.title$(page.id)));
    const editor = useService(EditorService).editor;
    const currentMode = useLiveData(editor.mode$);
    return (_jsxs(Header, { className: styles.header, ref: containerRef, children: [_jsx(ViewTitle, { title: title }), _jsx(ViewIcon, { icon: currentMode ?? 'page' }), _jsx(EditorModeSwitch, {}), _jsx(BlocksuiteHeaderTitle, { inputHandleRef: titleInputHandleRef }), _jsx(TemplateMark, {}), _jsxs("div", { className: styles.iconButtonContainer, children: [hideCollect ? null : (_jsxs(_Fragment, { children: [_jsx(FavoriteButton, { pageId: page?.id }), _jsx(InfoButton, { docId: page.id })] })), _jsx(PageHeaderMenuButton, { rename: onRename, page: page, containerWidth: containerWidth })] }), _jsx("div", { className: styles.spacer }), !hidePresent ? _jsx(DetailPageHeaderPresentButton, {}) : null, page && !hideShare ? (_jsx(SharePageButton, { workspace: workspace, page: page })) : null, showDivider ? (_jsx(Divider, { orientation: "vertical", style: { height: 20, marginLeft: 4 } })) : null] }));
}
export function DetailPageHeader(props) {
    const { page, workspace, onDragging } = props;
    const journalService = useService(JournalService);
    const isJournal = !!useLiveData(journalService.journalDate$(page.id));
    const isInTrash = page.meta?.trash;
    useRegisterCopyLinkCommands({
        workspaceMeta: workspace.meta,
        docId: page.id,
    });
    const { dragRef, dragging, CustomDragPreview } = useDraggable(() => {
        return {
            data: {
                from: {
                    at: 'doc-detail:header',
                    docId: page.id,
                },
                entity: {
                    type: 'doc',
                    id: page.id,
                },
            },
            canDrag: args => {
                // hack for preventing drag when editing the page title
                const editingElement = args.element.contains(document.activeElement) &&
                    document.activeElement?.tagName === 'INPUT';
                return !editingElement;
            },
            onDragStart: () => {
                track.$.header.$.dragStart();
            },
            dragPreviewPosition: 'pointer-outside',
        };
    }, [page.id]);
    const inner = isJournal && !isInTrash ? (_jsx(JournalPageHeader, { ...props })) : (_jsx(NormalPageHeader, { ...props }));
    useEffect(() => {
        onDragging?.(dragging);
    }, [dragging, onDragging]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.root, ref: dragRef, "data-dragging": dragging, children: [_jsx(DragHandle, { dragging: dragging, className: styles.dragHandle }), inner] }), _jsx(CustomDragPreview, { children: _jsx("div", { className: styles.dragPreview, children: inner }) })] }));
}
//# sourceMappingURL=detail-page-header.js.map