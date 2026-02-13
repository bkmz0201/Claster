import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { EditorService } from '@affine/core/modules/editor';
import { useInsidePeekView } from '@affine/core/modules/peek-view/view/modal-container';
import { extractEmojiIcon } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { Bound } from '@blocksuite/affine/global/gfx';
import {} from '@blocksuite/affine/model';
import { GfxControllerIdentifier } from '@blocksuite/affine/std/gfx';
import { ExpandFullIcon, ToggleDownIcon, ToggleRightIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyLinkButton, DocInfoButton } from './common';
import * as styles from './edgeless-block-header.css';
const EdgelessNoteToggleButton = ({ note }) => {
    const t = useI18n();
    const [collapsed, setCollapsed] = useState(note.props.edgeless.collapse);
    const editor = useService(EditorService).editor;
    const editorContainer = useLiveData(editor.editorContainer$);
    const gfx = editorContainer?.std.get(GfxControllerIdentifier);
    const { doc } = useService(DocService);
    const title = useLiveData(doc.title$);
    // only render emoji if it exists (mode or journal icon will not be rendered)
    const { emoji, rest: titleWithoutEmoji } = useMemo(() => extractEmojiIcon(title), [title]);
    useEffect(() => {
        return note.props.edgeless$.subscribe(({ collapse, collapsedHeight }) => {
            if (collapse &&
                collapsedHeight &&
                Math.abs(collapsedHeight - styles.headerHeight) < 1) {
                setCollapsed(true);
            }
            else {
                setCollapsed(false);
            }
        });
    }, [note.props.edgeless$]);
    useEffect(() => {
        if (!gfx)
            return;
        const { selection } = gfx;
        const dispose = selection.slots.updated.subscribe(() => {
            if (selection.has(note.id) && selection.editing) {
                note.store.transact(() => {
                    note.props.edgeless.collapse = false;
                });
            }
        });
        return () => dispose.unsubscribe();
    }, [gfx, note]);
    const toggle = useCallback(() => {
        track.edgeless.pageBlock.headerToolbar.toggle({
            type: collapsed ? 'expand' : 'collapse',
        });
        note.store.transact(() => {
            if (collapsed) {
                note.props.edgeless.collapse = false;
            }
            else {
                const bound = Bound.deserialize(note.props.xywh);
                bound.h = styles.headerHeight * (note.props.edgeless.scale ?? 1);
                note.props.xywh = bound.serialize();
                note.props.edgeless.collapse = true;
                note.props.edgeless.collapsedHeight = styles.headerHeight;
                gfx?.selection.clear();
            }
        });
    }, [collapsed, gfx, note]);
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, { className: styles.button, size: styles.iconSize, tooltip: t['com.affine.editor.edgeless-note-header.fold-page-block'](), "data-testid": "edgeless-note-toggle-button", onClick: toggle, children: collapsed ? _jsx(ToggleRightIcon, {}) : _jsx(ToggleDownIcon, {}) }), _jsx("div", { className: styles.titleContainer, "data-testid": "edgeless-note-title", children: collapsed && (_jsxs(_Fragment, { children: [emoji && _jsx("span", { children: emoji }), _jsx("span", { className: styles.noteTitle, children: titleWithoutEmoji })] })) })] }));
};
const OpenInPageButton = () => {
    const t = useI18n();
    const editor = useService(EditorService).editor;
    const openInPage = useCallback(() => {
        track.edgeless.pageBlock.headerToolbar.switchPageMode();
        editor.setMode('page');
    }, [editor]);
    return (_jsx(IconButton, { className: styles.button, size: styles.iconSize, tooltip: t['com.affine.editor.edgeless-note-header.open-in-page'](), "data-testid": "edgeless-note-view-in-page-button", onClick: openInPage, children: _jsx(ExpandFullIcon, {}) }));
};
const PageBlockInfoButton = ({ note }) => {
    const trackFn = useCallback(() => {
        track.edgeless.pageBlock.headerToolbar.openDocInfo();
    }, []);
    return (_jsx(DocInfoButton, { docId: note.store.id, trackFn: trackFn, "data-testid": "edgeless-note-info-button" }));
};
const NoteCopyLinkButton = ({ note }) => {
    const trackFn = useCallback(() => {
        track.edgeless.pageBlock.headerToolbar.copyBlockToLink();
    }, []);
    return (_jsx(CopyLinkButton, { pageId: note.store.id, blockId: note.id, mode: "edgeless", trackFn: trackFn, "data-testid": "edgeless-note-link-button" }));
};
export const EdgelessNoteHeader = ({ note }) => {
    const insidePeekView = useInsidePeekView();
    if (!note.isPageBlock())
        return null;
    return (_jsxs("div", { className: styles.header, "data-testid": "edgeless-page-block-header", children: [_jsx(EdgelessNoteToggleButton, { note: note }), _jsx(OpenInPageButton, {}), !insidePeekView && _jsx(PageBlockInfoButton, { note: note }), _jsx(NoteCopyLinkButton, { note: note })] }));
};
//# sourceMappingURL=edgeless-note-header.js.map