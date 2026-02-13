import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import { ConfigModal } from '@affine/core/components/mobile';
import { DefaultInlineManagerExtension } from '@blocksuite/affine/inlines/preset';
import { RichText } from '@blocksuite/affine/rich-text';
import { TextIcon } from '@blocksuite/icons/rc';
import { useLiveData } from '@toeverything/infra';
import { useEffect, useRef, useState } from 'react';
import { useBlockStdScope } from '../../../use-std';
import * as styles from './rich-text.css';
// todo(@pengx17): handle markdown/keyboard shortcuts
const renderRichText = ({ doc, std, text, }) => {
    const inlineManager = std.get(DefaultInlineManagerExtension.identifier);
    if (!inlineManager) {
        return null;
    }
    const richText = new RichText();
    richText.yText = text;
    richText.undoManager = doc.history.undoManager;
    richText.readonly = doc.readonly;
    richText.attributesSchema = inlineManager.getSchema();
    richText.attributeRenderer = inlineManager.getRenderer();
    return richText;
};
const RichTextInput = ({ cell, dataSource, onChange, style, }) => {
    const std = useBlockStdScope(dataSource.doc);
    const text = useLiveData(cell.value$);
    const ref = useRef(null);
    // todo(@pengx17): following is a workaround to y.Text that it is got renewed when the cell is updated externally. however it breaks the cursor position.
    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = '';
            const richText = renderRichText({ doc: dataSource.doc, std, text });
            const listener = () => {
                onChange(text);
            };
            if (richText) {
                richText.addEventListener('change', listener);
                ref.current.append(richText);
                return () => {
                    richText.removeEventListener('change', listener);
                    richText.remove();
                };
            }
        }
        return () => { };
    }, [dataSource.doc, onChange, std, text]);
    return _jsx("div", { className: styles.richTextInput, ref: ref, style: style });
};
const DesktopRichTextCell = ({ cell, dataSource, onChange, rowId, }) => {
    return (_jsx(PropertyValue, { children: _jsx(RichTextInput, { cell: cell, dataSource: dataSource, onChange: onChange, rowId: rowId }) }));
};
const MobileRichTextCell = ({ cell, dataSource, onChange, rowId, }) => {
    const [open, setOpen] = useState(false);
    const name = useLiveData(cell.property.name$);
    return (_jsxs(_Fragment, { children: [_jsx(PropertyValue, { onClick: () => setOpen(true) }), _jsx(ConfigModal, { onBack: () => setOpen(false), open: open, onOpenChange: setOpen, title: _jsxs(_Fragment, { children: [_jsx(TextIcon, {}), name] }), children: _jsx(ConfigModal.RowGroup, { children: _jsx(RichTextInput, { cell: cell, dataSource: dataSource, onChange: onChange, rowId: rowId, style: { padding: 12 } }) }) }), _jsx(RichTextInput, { cell: cell, dataSource: dataSource, onChange: onChange, rowId: rowId })] }));
};
export const RichTextCell = BUILD_CONFIG.isMobileEdition
    ? MobileRichTextCell
    : DesktopRichTextCell;
//# sourceMappingURL=rich-text.js.map