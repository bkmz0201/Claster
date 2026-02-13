import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { JournalService } from '@affine/core/modules/journal';
import { PeekViewService } from '@affine/core/modules/peek-view/services/peek-view';
import { useInsidePeekView } from '@affine/core/modules/peek-view/view/modal-container';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { track } from '@affine/track';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState, } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles.css';
function AffinePageReferenceInner({ pageId, params, title, Icon: UserIcon, }) {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const docsService = useService(DocsService);
    let referenceWithMode = null;
    let referenceToNode = false;
    if (params) {
        const m = params.get('mode');
        if (m && (m === 'page' || m === 'edgeless')) {
            referenceWithMode = m;
        }
        referenceToNode = params.has('blockIds') || params.has('elementIds');
    }
    const Icon = useLiveData(LiveData.computed(get => {
        if (UserIcon) {
            return UserIcon;
        }
        return get(docDisplayMetaService.icon$(pageId, {
            mode: referenceWithMode ?? undefined,
            reference: true,
            referenceToNode,
            title,
        }));
    }));
    const notFound = !useLiveData(docsService.list.doc$(pageId));
    title = useLiveData(docDisplayMetaService.title$(pageId, { title, reference: true }));
    return (_jsxs("span", { className: notFound ? styles.notFound : '', children: [_jsx(Icon, { className: styles.pageReferenceIcon }), _jsx("span", { className: "affine-reference-title", children: title })] }));
}
export function AffinePageReference({ pageId, params, title, className, Icon, onClick: userOnClick, }) {
    const journalService = useService(JournalService);
    const isJournal = !!useLiveData(journalService.journalDate$(pageId));
    const ref = useRef(null);
    const [refreshKey, setRefreshKey] = useState(() => nanoid());
    const peekView = useService(PeekViewService).peekView;
    const isInPeekView = useInsidePeekView();
    const onClick = useCallback((e) => {
        userOnClick?.(e);
        if (e.defaultPrevented) {
            return;
        }
        if (isJournal) {
            track.doc.editor.pageRef.navigate({
                to: 'journal',
            });
        }
        if (e.shiftKey && ref.current) {
            e.preventDefault();
            e.stopPropagation();
            peekView
                .open({
                element: ref.current,
            })
                .catch(console.error);
        }
        if (isInPeekView) {
            peekView.close();
        }
        // update refresh key
        setRefreshKey(nanoid());
        return;
    }, [isInPeekView, isJournal, peekView, userOnClick]);
    const query = useMemo(() => {
        // A block/element reference link
        let str = params?.toString() ?? '';
        if (str.length)
            str += '&';
        str += `refreshKey=${refreshKey}`;
        return '?' + str;
    }, [params, refreshKey]);
    return (_jsx(WorkbenchLink, { ref: ref, to: `/${pageId}${query}`, onClick: onClick, className: clsx(styles.pageReferenceLink, className), children: _jsx(AffinePageReferenceInner, { pageId: pageId, params: params, title: title, Icon: Icon }) }));
}
export function AffineSharedPageReference({ pageId, docCollection, params, title, Icon, onClick: userOnClick, }) {
    const journalService = useService(JournalService);
    const isJournal = !!useLiveData(journalService.journalDate$(pageId));
    const ref = useRef(null);
    const [refreshKey, setRefreshKey] = useState(() => nanoid());
    const onClick = useCallback((e) => {
        userOnClick?.(e);
        if (e.defaultPrevented) {
            return;
        }
        if (isJournal) {
            track.doc.editor.pageRef.navigate({
                to: 'journal',
            });
        }
        // update refresh key
        setRefreshKey(nanoid());
        // Prevent blocksuite link clicked behavior
        e.stopPropagation();
        return;
    }, [isJournal, userOnClick]);
    const query = useMemo(() => {
        // A block/element reference link
        let str = params?.toString() ?? '';
        if (str.length)
            str += '&';
        str += `refreshKey=${refreshKey}`;
        return '?' + str;
    }, [params, refreshKey]);
    return (_jsx(Link, { ref: ref, to: `/workspace/${docCollection.id}/${pageId}${query}`, onClick: onClick, className: styles.pageReferenceLink, children: _jsx(AffinePageReferenceInner, { pageId: pageId, params: params, title: title, Icon: Icon }) }));
}
//# sourceMappingURL=index.js.map