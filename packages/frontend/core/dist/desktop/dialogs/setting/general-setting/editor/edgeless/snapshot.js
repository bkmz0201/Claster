import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { getViewManager } from '@affine/core/blocksuite/manager/view';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { EdgelessCRUDIdentifier } from '@blocksuite/affine/blocks/surface';
import { Bound } from '@blocksuite/affine/global/gfx';
import { ViewportElementExtension } from '@blocksuite/affine/shared/services';
import { BlockStdScope } from '@blocksuite/affine/std';
import { GfxControllerIdentifier, } from '@blocksuite/affine/std/gfx';
import { useFramework } from '@toeverything/infra';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { map, pairwise } from 'rxjs';
import { editorWrapper, snapshotContainer, snapshotLabel, snapshotSkeleton, snapshotTitle, } from '../style.css';
import { getDocByName } from './docs';
import { getFrameBlock } from './utils';
const boundMap = new Map();
export const EdgelessSnapshot = (props) => {
    const { title, docName, keyName, height = 180, getElements, firstUpdate, children, } = props;
    const wrapperRef = useRef(null);
    const docRef = useRef(null);
    const editorHostRef = useRef(null);
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const extensions = useMemo(() => {
        const manager = getViewManager()
            .config.init()
            .foundation(framework)
            .theme(framework)
            .database(framework)
            .linkedDoc(framework)
            .codeBlockPreview(framework).value;
        return manager
            .get('preview-edgeless')
            .concat([ViewportElementExtension('.setting-editor-snapshot')]);
    }, [framework]);
    const updateElements = useCallback(() => {
        const editorHost = editorHostRef.current;
        const doc = docRef.current;
        if (!editorHost || !doc)
            return;
        const crud = editorHost.std.get(EdgelessCRUDIdentifier);
        const elements = getElements(doc);
        const props = editorSetting.get(keyName);
        doc.readonly = false;
        elements.forEach(element => {
            crud.updateElement(element.id, props);
        });
        doc.readonly = true;
    }, [editorSetting, getElements, keyName]);
    const renderEditor = useCallback(async () => {
        if (!wrapperRef.current)
            return;
        const doc = await getDocByName(docName);
        if (!doc)
            return;
        const editorHost = new BlockStdScope({
            store: doc,
            extensions,
        }).render();
        docRef.current = doc;
        editorHostRef.current?.remove();
        editorHostRef.current = editorHost;
        if (firstUpdate) {
            firstUpdate(doc, editorHost);
        }
        else {
            updateElements();
        }
        // refresh viewport
        const gfx = editorHost.std.get(GfxControllerIdentifier);
        const disposable = editorHost.std.view.viewUpdated.subscribe(payload => {
            if (payload.type !== 'block' ||
                payload.method !== 'add' ||
                payload.view.model.flavour !== 'affine:page') {
                return;
            }
            doc.readonly = false;
            const frame = getFrameBlock(doc);
            if (frame && docName !== 'frame') {
                // docName with value 'frame' shouldn't be deleted, it is a part of frame settings
                boundMap.set(docName, Bound.deserialize(frame.xywh));
                doc.deleteBlock(frame);
            }
            const bound = boundMap.get(docName);
            bound && gfx.viewport.setViewportByBound(bound);
            doc.readonly = true;
            disposable.unsubscribe();
        });
        // append to dom node
        wrapperRef.current.append(editorHost);
    }, [docName, extensions, firstUpdate, updateElements]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        renderEditor();
        return () => editorHostRef.current?.remove();
    }, [renderEditor]);
    // observe editor settings change
    useEffect(() => {
        const sub = editorSetting.provider
            .watchAll()
            .pipe(map(settings => {
            if (typeof settings[keyName] === 'string') {
                return JSON.parse(settings[keyName]);
            }
            return keyName;
        }), pairwise())
            .subscribe(([prev, current]) => {
            if (!isEqual(prev, current)) {
                updateElements();
            }
        });
        return () => sub.unsubscribe();
    }, [editorSetting.provider, keyName, updateElements]);
    return (_jsxs("div", { className: clsx(snapshotContainer, 'setting-editor-snapshot'), children: [_jsx("div", { className: snapshotTitle, children: title }), _jsx("div", { className: snapshotLabel, children: title }), _jsx("div", { ref: wrapperRef, className: editorWrapper, style: { height }, children: _jsx(Skeleton, { className: snapshotSkeleton, variant: "rounded", height: '100%' }) }), children] }));
};
//# sourceMappingURL=snapshot.js.map