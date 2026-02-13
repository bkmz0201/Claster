import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, notify } from '@affine/component';
import { copyTextToClipboard } from '@affine/core/utils/clipboard';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { CloseIcon, ExpandFullIcon, InformationIcon, LinkIcon, OpenInNewIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { clsx } from 'clsx';
import { useCallback, useEffect, useMemo, } from 'react';
import { ServerService } from '../../cloud';
import { WorkspaceDialogService } from '../../dialogs';
import { DocsService } from '../../doc/services/docs';
import { toDocSearchParams } from '../../navigation';
import { WorkbenchService } from '../../workbench';
import { PeekViewService } from '../services/peek-view';
import * as styles from './peek-view-controls.css';
const filterByEnabled = (props) => props.enabled;
export const ControlButton = ({ icon, nameKey, name, onClick, }) => {
    const handleClick = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
    }, [onClick]);
    return (_jsx(IconButton, { variant: "solid", tooltip: name, "data-testid": "peek-view-control", "data-action-name": nameKey, size: "20", onClick: handleClick, icon: icon, className: styles.button }));
};
export const DefaultPeekViewControls = ({ className, ...rest }) => {
    const peekView = useService(PeekViewService).peekView;
    const t = useI18n();
    const controls = useMemo(() => {
        return [
            {
                nameKey: 'close',
                name: t['com.affine.peek-view-controls.close'](),
                icon: _jsx(CloseIcon, {}),
                onClick: () => peekView.close(),
                enabled: true,
            },
        ].filter(filterByEnabled);
    }, [peekView, t]);
    return (_jsx("div", { ...rest, className: clsx(styles.root, className), children: controls.map(option => (_jsx(ControlButton, { ...option }, option.nameKey))) }));
};
export const DocPeekViewControls = ({ docRef, className, ...rest }) => {
    const peekView = useService(PeekViewService).peekView;
    const workbench = useService(WorkbenchService).workbench;
    const t = useI18n();
    const workspaceDialogService = useService(WorkspaceDialogService);
    const serverService = useService(ServerService);
    const docsService = useService(DocsService);
    const controls = useMemo(() => {
        return [
            {
                nameKey: 'close',
                name: t['com.affine.peek-view-controls.close'](),
                icon: _jsx(CloseIcon, {}),
                onClick: () => peekView.close(),
                enabled: true,
            },
            {
                nameKey: 'open',
                name: t['com.affine.peek-view-controls.open-doc'](),
                icon: _jsx(ExpandFullIcon, {}),
                onClick: () => {
                    workbench.openDoc(docRef);
                    peekView.close(false);
                },
                enabled: true,
            },
            {
                nameKey: 'new-tab',
                name: t['com.affine.peek-view-controls.open-doc-in-new-tab'](),
                icon: _jsx(OpenInNewIcon, {}),
                onClick: () => {
                    workbench.openDoc(docRef, { at: 'new-tab' });
                    peekView.close(false);
                },
                enabled: true,
            },
            {
                nameKey: 'split-view',
                name: t['com.affine.peek-view-controls.open-doc-in-split-view'](),
                icon: _jsx(SplitViewIcon, {}),
                onClick: () => {
                    workbench.openDoc(docRef, { at: 'beside' });
                    peekView.close(false);
                },
                enabled: BUILD_CONFIG.isElectron,
            },
            {
                nameKey: 'copy-link',
                name: t['com.affine.peek-view-controls.copy-link'](),
                icon: _jsx(LinkIcon, {}),
                onClick: async () => {
                    const preferredMode = docsService.list.getPrimaryMode(docRef.docId);
                    const search = toDocSearchParams({
                        mode: docRef.mode || preferredMode,
                        blockIds: docRef.blockIds,
                        elementIds: docRef.elementIds,
                        xywh: docRef.xywh,
                    });
                    const url = new URL(workbench.basename$.value + '/' + docRef.docId, serverService.server.baseUrl);
                    if (search?.size)
                        url.search = search.toString();
                    await copyTextToClipboard(url.toString());
                    notify.success({ title: t['Copied link to clipboard']() });
                },
                enabled: true,
            },
            {
                nameKey: 'info',
                name: t['com.affine.peek-view-controls.open-info'](),
                icon: _jsx(InformationIcon, {}),
                onClick: () => {
                    workspaceDialogService.open('doc-info', { docId: docRef.docId });
                },
                enabled: true,
            },
        ].filter(filterByEnabled);
    }, [
        t,
        peekView,
        workbench,
        docRef,
        docsService.list,
        serverService.server.baseUrl,
        workspaceDialogService,
    ]);
    return (_jsx("div", { ...rest, className: clsx(styles.root, className), children: controls.map(option => (_jsx(ControlButton, { ...option }, option.nameKey))) }));
};
export const AttachmentPeekViewControls = ({ docRef, className, ...rest }) => {
    const { docId, blockIds: [blockId] = [], filetype: type } = docRef;
    const peekView = useService(PeekViewService).peekView;
    const workbench = useService(WorkbenchService).workbench;
    const t = useI18n();
    const controls = useMemo(() => {
        const controls = [
            {
                nameKey: 'close',
                name: t['com.affine.peek-view-controls.close'](),
                icon: _jsx(CloseIcon, {}),
                onClick: () => peekView.close(),
                enabled: true,
            },
        ];
        if (!type)
            return controls;
        return [
            ...controls,
            // TODO(@fundon): needs to be implemented on mobile
            {
                nameKey: 'open',
                name: t['com.affine.peek-view-controls.open-attachment'](),
                icon: _jsx(ExpandFullIcon, {}),
                onClick: () => {
                    workbench.openAttachment(docId, blockId);
                    peekView.close(false);
                    track.$.attachment.$.openAttachmentInFullscreen({ type });
                },
                enabled: BUILD_CONFIG.isDesktopEdition,
            },
            {
                nameKey: 'new-tab',
                name: t['com.affine.peek-view-controls.open-attachment-in-new-tab'](),
                icon: _jsx(OpenInNewIcon, {}),
                onClick: () => {
                    workbench.openAttachment(docId, blockId, { at: 'new-tab' });
                    peekView.close(false);
                    track.$.attachment.$.openAttachmentInNewTab({ type });
                },
                enabled: true,
            },
            {
                nameKey: 'split-view',
                name: t['com.affine.peek-view-controls.open-attachment-in-split-view'](),
                icon: _jsx(SplitViewIcon, {}),
                onClick: () => {
                    workbench.openAttachment(docId, blockId, { at: 'beside' });
                    peekView.close(false);
                    track.$.attachment.$.openAttachmentInSplitView({ type });
                },
                enabled: BUILD_CONFIG.isElectron,
            },
        ].filter(filterByEnabled);
    }, [t, peekView, workbench, docId, blockId, type]);
    useEffect(() => {
        if (type === undefined)
            return;
        track.$.attachment.$.openAttachmentInPeekView({ type });
    }, [type]);
    return (_jsx("div", { ...rest, className: clsx(styles.root, className), children: controls.map(option => (_jsx(ControlButton, { ...option }, option.nameKey))) }));
};
//# sourceMappingURL=peek-view-controls.js.map