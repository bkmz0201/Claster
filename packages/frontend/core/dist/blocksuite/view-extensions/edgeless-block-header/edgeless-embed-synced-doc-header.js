import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, IconButton, Menu, MenuItem } from '@affine/component';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { stopPropagation } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { EmbedSyncedDocBlockComponent } from '@blocksuite/affine/blocks/embed-doc';
import { isPeekable, peek } from '@blocksuite/affine/components/peek';
import { ArrowDownSmallIcon, CenterPeekIcon, ExpandFullIcon, LinkedPageIcon, OpenInNewIcon, SplitViewIcon, ToggleDownIcon, ToggleRightIcon, } from '@blocksuite/icons/rc';
import { batch } from '@preact/signals-core';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyLinkButton, DocInfoButton } from './common';
import * as styles from './edgeless-block-header.css';
const ToggleButton = ({ model }) => {
    const [isFolded, setIsFolded] = useState(model.isFolded);
    const t = useI18n();
    useEffect(() => model.props.preFoldHeight$.subscribe(value => setIsFolded(!!value)), [model.props.preFoldHeight$]);
    const toggle = useCallback(() => {
        model.store.captureSync();
        batch(() => {
            const { x, y, w, h } = model.elementBound;
            if (model.isFolded) {
                model.props.xywh$.value = `[${x},${y},${w},${model.props.preFoldHeight$.peek() ?? 1}]`;
                model.props.preFoldHeight$.value = 0;
            }
            else {
                model.props.preFoldHeight$.value = h;
                model.props.xywh$.value = `[${x},${y},${w},${styles.headerHeight * (model.props.scale ?? 1)}]`;
            }
        });
    }, [model]);
    return (_jsx(IconButton, { "data-testid": "edgeless-embed-synced-doc-fold-button", "data-folded": isFolded, className: styles.button, size: styles.iconSize, onClick: toggle, tooltip: isFolded
            ? t['com.affine.editor.edgeless-embed-synced-doc-header.unfold']()
            : t['com.affine.editor.edgeless-embed-synced-doc-header.fold'](), icon: isFolded ? _jsx(ToggleRightIcon, {}) : _jsx(ToggleDownIcon, {}) }));
};
const Title = ({ model }) => {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const title = useLiveData(docDisplayMetaService.title$(model.props.pageId, {
        title: model.props.title,
        reference: true,
    }));
    return (_jsxs("div", { className: styles.titleContainer, "data-collapsed": !!model.props.preFoldHeight, "data-testid": "edgeless-embed-synced-doc-title", children: [_jsx("span", { className: styles.titleIcon, children: _jsx(LinkedPageIcon, {}) }), _jsx("span", { className: styles.embedSyncedDocTitle, children: title })] }));
};
const EmbedSyncedDocInfoButton = ({ model, }) => {
    return (_jsx(DocInfoButton, { docId: model.props.pageId, "data-testid": "edgeless-embed-synced-doc-info-button" }));
};
const EmbedSyncedDocCopyLinkButton = ({ model, }) => {
    return (_jsx(CopyLinkButton, { pageId: model.props.pageId, "data-testid": "edgeless-embed-synced-doc-copy-link-button" }));
};
const OpenButton = ({ std, model, }) => {
    const t = useI18n();
    const workbench = useService(WorkbenchService).workbench;
    const open = useCallback(() => {
        workbench.openDoc({
            docId: model.props.pageId,
        });
    }, [model.props.pageId, workbench]);
    return (_jsxs("div", { children: [_jsx(Button, { className: styles.button, variant: "plain", size: "custom", onClick: open, prefixStyle: {
                    width: `${styles.iconSize}px`,
                    height: `${styles.iconSize}px`,
                }, prefix: _jsx(ExpandFullIcon, {}), children: _jsx("span", { className: styles.buttonText, children: t['com.affine.editor.edgeless-embed-synced-doc-header.open']() }) }), _jsx(MoreMenu, { model: model, std: std })] }));
};
const MoreMenu = ({ model, std, }) => {
    const t = useI18n();
    const workbench = useService(WorkbenchService).workbench;
    const controls = useMemo(() => {
        return [
            {
                type: 'open-in-active-view',
                label: t['com.affine.peek-view-controls.open-doc'](),
                icon: _jsx(ExpandFullIcon, {}),
                onClick: () => {
                    workbench.openDoc(model.props.pageId);
                },
                enabled: true,
            },
            {
                type: 'open-in-center-peek',
                label: t['com.affine.peek-view-controls.open-doc-in-center-peek'](),
                icon: _jsx(CenterPeekIcon, {}),
                onClick: () => {
                    const block = std.view.getBlock(model.id);
                    if (!(block instanceof EmbedSyncedDocBlockComponent && isPeekable(block)))
                        return;
                    peek(block);
                },
                enabled: true,
            },
            {
                type: 'open-in-split-view',
                label: t['com.affine.peek-view-controls.open-doc-in-split-view'](),
                icon: _jsx(SplitViewIcon, {}),
                onClick: () => {
                    workbench.openDoc(model.props.pageId, { at: 'beside' });
                },
                enabled: BUILD_CONFIG.isElectron,
            },
            {
                type: 'open-in-new-tab',
                label: t['com.affine.peek-view-controls.open-doc-in-new-tab'](),
                icon: _jsx(OpenInNewIcon, {}),
                onClick: () => {
                    workbench.openDoc(model.props.pageId, {
                        at: 'new-tab',
                    });
                },
                enabled: true,
            },
        ].filter(({ enabled }) => enabled);
    }, [model.id, model.props.pageId, std.view, t, workbench]);
    return (_jsx(Menu, { items: controls.map(option => (_jsx(MenuItem, { type: "default", prefixIcon: option.icon, onClick: option.onClick, children: option.label }, option.type))), contentOptions: {
            align: 'center',
        }, children: _jsx(IconButton, { className: styles.button, size: styles.iconSize, icon: _jsx(ArrowDownSmallIcon, {}), onDoubleClickCapture: stopPropagation }) }));
};
export const EdgelessEmbedSyncedDocHeader = ({ model, std, }) => {
    return (_jsxs("div", { className: styles.header, onPointerDown: stopPropagation, children: [_jsx(ToggleButton, { model: model }), _jsx(Title, { model: model }), _jsx(OpenButton, { std: std, model: model }), _jsx(EmbedSyncedDocInfoButton, { model: model }), _jsx(EmbedSyncedDocCopyLinkButton, { model: model })] }));
};
//# sourceMappingURL=edgeless-embed-synced-doc-header.js.map