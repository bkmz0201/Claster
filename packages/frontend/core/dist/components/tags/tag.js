import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon } from '@blocksuite/icons/rc';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useCallback } from 'react';
import * as styles from './tag.css';
export const TagItem = ({ tag, idx, mode, focused, onRemoved, style, maxWidth, }) => {
    const { name, color, id } = tag;
    const handleRemove = useCallback(e => {
        e.stopPropagation();
        onRemoved?.();
    }, [onRemoved]);
    return (_jsx("div", { className: styles.tag, "data-idx": idx, "data-tag-id": id, "data-tag-value": name, title: name, style: {
            ...style,
            ...assignInlineVars({
                [styles.tagColorVar]: color,
            }),
        }, children: _jsxs("div", { style: { maxWidth: maxWidth }, "data-focused": focused, className: clsx({
                [styles.tagInlineMode]: mode === 'inline-tag',
                [styles.tagListItemMode]: mode === 'list-tag',
                [styles.tagLabelMode]: mode === 'db-label',
            }), children: [mode !== 'db-label' ? _jsx("div", { className: styles.tagIndicator }) : null, _jsx("div", { className: styles.tagLabel, children: name }), onRemoved ? (_jsx("div", { "data-testid": "remove-tag-button", className: styles.tagRemove, onClick: handleRemove, children: _jsx(CloseIcon, {}) })) : null] }) }));
};
//# sourceMappingURL=tag.js.map