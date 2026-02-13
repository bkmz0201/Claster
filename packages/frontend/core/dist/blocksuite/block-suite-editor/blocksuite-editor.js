import { jsx as _jsx } from "react/jsx-runtime";
import { EditorLoading } from '@affine/component/page-detail-skeleton';
import { ServerService } from '@affine/core/modules/cloud';
import { EditorSettingService, fontStyleOptions, } from '@affine/core/modules/editor-setting';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { WorkspaceService } from '@affine/core/modules/workspace';
import track from '@affine/track';
import { appendParagraphCommand } from '@blocksuite/affine/blocks/paragraph';
import { DisposableGroup } from '@blocksuite/affine/global/disposable';
import { IS_LINUX } from '@blocksuite/affine/global/env';
import { customImageProxyMiddleware, ImageProxyService, } from '@blocksuite/affine/shared/adapters';
import { focusBlockEnd } from '@blocksuite/affine/shared/commands';
import { getLastNoteBlock } from '@blocksuite/affine/shared/utils';
import { Slot } from '@radix-ui/react-slot';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BlocksuiteDocEditor, BlocksuiteEdgelessEditor } from './lit-adaper';
import * as styles from './styles.css';
const BlockSuiteEditorImpl = ({ mode, page, className, shared, readonly, style, onEditorReady, defaultOpenProperty, ...props }) => {
    const rootRef = useRef(null);
    const docRef = useRef(null);
    const docTitleRef = useRef(null);
    const edgelessRef = useRef(null);
    const featureFlags = useService(FeatureFlagService).flags;
    const enableEditorRTL = useLiveData(featureFlags.enable_editor_rtl.$);
    const editorSetting = useService(EditorSettingService).editorSetting;
    const server = useService(ServerService).server;
    const { enableMiddleClickPaste } = useLiveData(editorSetting.settings$.selector(s => ({
        enableMiddleClickPaste: s.enableMiddleClickPaste,
    })));
    /**
     * mimic an AffineEditorContainer using proxy
     */
    const affineEditorContainerProxy = useMemo(() => {
        const api = {
            get page() {
                return page;
            },
            get doc() {
                return page;
            },
            get docTitle() {
                return docTitleRef.current;
            },
            get host() {
                return ((mode === 'page'
                    ? docRef.current?.host
                    : edgelessRef.current?.host) ?? null);
            },
            get model() {
                return page.root;
            },
            get updateComplete() {
                return mode === 'page'
                    ? docRef.current?.updateComplete
                    : edgelessRef.current?.updateComplete;
            },
            get mode() {
                return mode;
            },
            get origin() {
                return rootRef.current;
            },
            get std() {
                return mode === 'page' ? docRef.current?.std : edgelessRef.current?.std;
            },
        };
        const proxy = new Proxy(api, {
            has(_, prop) {
                return (Reflect.has(api, prop) ||
                    (rootRef.current ? Reflect.has(rootRef.current, prop) : false));
            },
            get(_, prop) {
                if (Reflect.has(api, prop)) {
                    return api[prop];
                }
                if (rootRef.current && Reflect.has(rootRef.current, prop)) {
                    const maybeFn = Reflect.get(rootRef.current, prop);
                    if (typeof maybeFn === 'function') {
                        return maybeFn.bind(rootRef.current);
                    }
                    else {
                        return maybeFn;
                    }
                }
                return undefined;
            },
        });
        return proxy;
    }, [mode, page]);
    const handleClickPageModeBlank = useCallback(() => {
        if (shared || readonly || page.readonly)
            return;
        const std = affineEditorContainerProxy.host?.std;
        if (!std) {
            return;
        }
        const note = getLastNoteBlock(page);
        if (note) {
            const lastBlock = note.lastChild();
            if (lastBlock &&
                lastBlock.flavour === 'affine:paragraph' &&
                lastBlock.text?.length === 0) {
                const focusBlock = std.view.getBlock(lastBlock.id) ?? undefined;
                std.command.exec(focusBlockEnd, {
                    focusBlock,
                    force: true,
                });
                return;
            }
        }
        std.command.exec(appendParagraphCommand);
    }, [affineEditorContainerProxy.host?.std, page, readonly, shared]);
    useEffect(() => {
        const editorContainer = rootRef.current;
        if (editorContainer) {
            const handleMiddleClick = (e) => {
                if (e.target instanceof HTMLElement &&
                    (e.target.closest('affine-reference') ||
                        e.target.closest('affine-link'))) {
                    return;
                }
                if (!enableMiddleClickPaste && IS_LINUX && e.button === 1) {
                    e.preventDefault();
                }
            };
            editorContainer.addEventListener('pointerup', handleMiddleClick, {
                capture: true,
            });
            editorContainer.addEventListener('auxclick', handleMiddleClick, {
                capture: true,
            });
            return () => {
                editorContainer?.removeEventListener('pointerup', handleMiddleClick, {
                    capture: true,
                });
                editorContainer?.removeEventListener('auxclick', handleMiddleClick, {
                    capture: true,
                });
            };
        }
        return;
    }, [enableMiddleClickPaste]);
    useEffect(() => {
        const editor = affineEditorContainerProxy;
        globalThis.currentEditor = editor;
        const disposableGroup = new DisposableGroup();
        let canceled = false;
        // provide image proxy endpoint to blocksuite
        const imageProxyUrl = new URL(BUILD_CONFIG.imageProxyUrl, server.baseUrl).toString();
        editor.std.clipboard.use(customImageProxyMiddleware(imageProxyUrl));
        page.get(ImageProxyService).setImageProxyURL(imageProxyUrl);
        editor.updateComplete
            .then(() => {
            if (onEditorReady && !canceled) {
                const dispose = onEditorReady(editor);
                if (dispose) {
                    disposableGroup.add(dispose);
                }
            }
        })
            .catch(error => {
            console.error('Error updating editor', error);
        });
        return () => {
            canceled = true;
            disposableGroup.dispose();
        };
    }, [affineEditorContainerProxy, onEditorReady, page, server]);
    return (_jsx("div", { ...props, "data-testid": `editor-${page.id}`, dir: enableEditorRTL ? 'rtl' : 'ltr', className: clsx(`editor-wrapper ${mode}-mode`, styles.docEditorRoot, className), style: style, "data-affine-editor-container": true, ref: rootRef, children: mode === 'page' ? (_jsx(BlocksuiteDocEditor, { shared: shared, page: page, ref: docRef, readonly: readonly, titleRef: docTitleRef, onClickBlank: handleClickPageModeBlank, defaultOpenProperty: defaultOpenProperty })) : (_jsx(BlocksuiteEdgelessEditor, { shared: shared, page: page, ref: edgelessRef })) }));
};
export const BlockSuiteEditor = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [longerLoading, setLongerLoading] = useState(false);
    const [loadStartTime] = useState(Date.now());
    const workspaceService = useService(WorkspaceService);
    const editorSetting = useService(EditorSettingService).editorSetting;
    const settings = useLiveData(editorSetting.settings$.selector(s => ({
        fontFamily: s.fontFamily,
        customFontFamily: s.customFontFamily,
        fullWidthLayout: s.fullWidthLayout,
    })));
    const fontFamily = useMemo(() => {
        const fontStyle = fontStyleOptions.find(option => option.key === settings.fontFamily);
        if (!fontStyle) {
            return cssVar('fontSansFamily');
        }
        const customFontFamily = settings.customFontFamily;
        return customFontFamily && fontStyle.key === 'Custom'
            ? `${customFontFamily}, ${fontStyle.value}`
            : fontStyle.value;
    }, [settings.customFontFamily, settings.fontFamily]);
    useEffect(() => {
        if (props.page.root) {
            setIsLoading(false);
            return;
        }
        const disposable = props.page.slots.rootAdded.subscribe(() => {
            disposable.unsubscribe();
            setIsLoading(false);
            setLongerLoading(false);
        });
        return () => {
            disposable.unsubscribe();
        };
    }, [loadStartTime, props.page]);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                setLongerLoading(true);
            }
        }, 20 * 1000);
        const reportErrorTimer = setTimeout(() => {
            if (isLoading) {
                track.doc.$.$.loadDoc({
                    workspaceId: props.page.workspace.id,
                    docId: props.page.id,
                    time: Date.now() - loadStartTime,
                    success: false,
                });
            }
        }, 60 * 1000);
        return () => {
            clearTimeout(timer);
            clearTimeout(reportErrorTimer);
        };
    }, [isLoading, loadStartTime, props.page]);
    useEffect(() => {
        workspaceService.workspace.engine.doc
            .waitForDocLoaded(props.page.id)
            .then(() => {
            track.doc.$.$.loadDoc({
                workspaceId: props.page.workspace.id,
                docId: props.page.id,
                time: Date.now() - loadStartTime,
                success: true,
            });
        })
            .catch(() => {
            track.doc.$.$.loadDoc({
                workspaceId: props.page.workspace.id,
                docId: props.page.id,
                time: Date.now() - loadStartTime,
                success: false,
            });
        });
    }, [loadStartTime, props.page, workspaceService]);
    return (_jsx(Slot, { style: { '--affine-font-family': fontFamily }, children: isLoading ? (_jsx(EditorLoading, { longerLoading: longerLoading })) : (_jsx(BlockSuiteEditorImpl, { ...props }, props.page.id)) }));
};
//# sourceMappingURL=blocksuite-editor.js.map