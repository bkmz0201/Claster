import { jsx as _jsx } from "react/jsx-runtime";
import { cssVar } from '@toeverything/theme';
import { useCallback, useEffect, useState } from 'react';
import Input from '../../ui/input';
import { Menu } from '../../ui/menu';
export const RenameModal = ({ onRename, currentName, open, width = 220, children, onOpenChange, }) => {
    const [value, setValue] = useState(currentName);
    const handleRename = useCallback(() => {
        onRename(value);
        onOpenChange(false);
    }, [onOpenChange, onRename, value]);
    const onKeyDown = useCallback((e) => {
        if (e.key !== 'Escape')
            return;
        if (currentName !== value)
            setValue(currentName);
        onOpenChange(false);
    }, [currentName, value, onOpenChange]);
    // Synchronize when the title is changed in the page header or title.
    useEffect(() => setValue(currentName), [currentName]);
    return (_jsx(Menu, { rootOptions: {
            modal: true,
            open: open,
            onOpenChange: onOpenChange,
        }, contentOptions: {
            side: 'left',
            onPointerDownOutside: handleRename,
            sideOffset: -12,
            onClick: e => e.stopPropagation(),
            style: { borderRadius: 10, padding: 8 },
            role: 'rename-modal',
        }, items: _jsx(Input, { inputStyle: {
                fontSize: cssVar('fontBase'),
            }, autoFocus: true, autoSelect: true, value: value, onChange: setValue, onEnter: handleRename, onKeyDown: onKeyDown, "data-testid": "rename-modal-input", style: { width, height: 34, borderRadius: 4 } }), children: children ?? _jsx("div", {}) }));
};
//# sourceMappingURL=index.js.map