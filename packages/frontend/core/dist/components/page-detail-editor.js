import { jsx as _jsx } from "react/jsx-runtime";
import './page-detail-editor.css';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useEffect } from 'react';
import { BlockSuiteEditor } from '../blocksuite/block-suite-editor';
import { DocService } from '../modules/doc';
import { EditorService } from '../modules/editor';
import { EditorSettingService } from '../modules/editor-setting';
import * as styles from './page-detail-editor.css';
export const PageDetailEditor = ({ onLoad, readonly, }) => {
    const editor = useService(EditorService).editor;
    const mode = useLiveData(editor.mode$);
    const defaultOpenProperty = useLiveData(editor.defaultOpenProperty$);
    const doc = useService(DocService).doc;
    const pageWidth = useLiveData(doc.properties$.selector(p => p.pageWidth));
    const isSharedMode = editor.isSharedMode;
    const editorSetting = useService(EditorSettingService).editorSetting;
    const settings = useLiveData(editorSetting.settings$.selector(s => ({
        fontFamily: s.fontFamily,
        customFontFamily: s.customFontFamily,
        fullWidthLayout: s.fullWidthLayout,
    })));
    const fullWidthLayout = pageWidth
        ? pageWidth === 'fullWidth'
        : settings.fullWidthLayout;
    useEffect(() => {
        editor.doc.blockSuiteDoc.readonly = readonly ?? false;
    }, [editor, readonly]);
    return (_jsx(BlockSuiteEditor, { className: clsx(styles.editor, {
            'full-screen': !isSharedMode && fullWidthLayout,
            'is-public': isSharedMode,
        }), mode: mode, defaultOpenProperty: defaultOpenProperty, page: editor.doc.blockSuiteDoc, shared: isSharedMode, readonly: readonly, onEditorReady: onLoad }));
};
//# sourceMappingURL=page-detail-editor.js.map