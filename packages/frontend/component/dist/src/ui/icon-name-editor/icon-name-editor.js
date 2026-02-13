import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { Button } from '../button';
import { IconPicker } from '../icon-picker';
import { IconRenderer } from '../icon-picker/renderer';
import Input from '../input';
import { Menu } from '../menu';
import * as styles from './icon-name-editor.css';
export const IconEditor = ({ icon, closeAfterSelect, iconPlaceholder, triggerClassName, onIconChange, alignOffset, sideOffset = 4, triggerVariant, }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const handleSelect = useCallback((data) => {
        onIconChange?.(data);
        if (closeAfterSelect) {
            setIsPickerOpen(false);
        }
    }, [closeAfterSelect, onIconChange]);
    return (_jsx(Menu, { rootOptions: {
            open: isPickerOpen,
            onOpenChange: setIsPickerOpen,
            modal: true,
        }, contentOptions: {
            side: 'bottom',
            sideOffset,
            align: 'start',
            alignOffset,
            className: styles.emojiPickerPopover,
        }, items: _jsx("div", { onWheel: e => e.stopPropagation(), children: _jsx(IconPicker, { onSelect: handleSelect }) }), children: _jsx(Button, { variant: triggerVariant, className: clsx(styles.iconPicker, triggerClassName), "data-icon-type": icon?.type, "aria-label": icon ? 'Change Icon' : 'Select Icon', title: icon ? 'Change Icon' : 'Select Icon', contentClassName: styles.iconContent, children: _jsx(IconRenderer, { data: icon, fallback: iconPlaceholder }) }) }));
};
export const IconAndNameEditorContent = ({ name, namePlaceholder, inputTestId, onNameChange, onEnter, ...iconEditorProps }) => {
    return (_jsxs("div", { className: styles.contentRoot, children: [_jsx(IconEditor, { ...iconEditorProps, alignOffset: -4, sideOffset: 8, triggerClassName: styles.iconNamePickerIcon }), _jsx(Input, { placeholder: namePlaceholder, value: name, onChange: onNameChange, onEnter: onEnter, className: styles.input, autoSelect: true, autoFocus: true, "data-testid": inputTestId })] }));
};
export const IconAndNameEditorMenu = ({ open, onOpenChange, width = 300, icon: initialIcon, name: initialName, onIconChange, onNameChange, contentOptions, iconPlaceholder, skipIfNotChanged = true, inputTestId, closeAfterSelect, ...menuProps }) => {
    const [icon, setIcon] = useState(initialIcon);
    const [name, setName] = useState(initialName);
    const commit = useCallback(() => {
        if (icon !== initialIcon) {
            onIconChange?.(icon);
        }
        if (skipIfNotChanged) {
            if (name !== initialName)
                onNameChange?.(name);
        }
        else {
            onNameChange?.(name);
        }
    }, [
        icon,
        initialIcon,
        initialName,
        name,
        onIconChange,
        onNameChange,
        skipIfNotChanged,
    ]);
    const abort = useCallback(() => {
        setIcon(initialIcon);
        setName(initialName);
    }, [initialIcon, initialName]);
    const handleIconChange = useCallback((data) => {
        setIcon(data);
    }, []);
    const handleNameChange = useCallback((name) => {
        setName(name);
    }, []);
    const handleMenuOpenChange = useCallback((open) => {
        if (open) {
            setIcon(initialIcon);
            setName(initialName);
        }
        onOpenChange?.(open);
    }, [initialIcon, initialName, onOpenChange]);
    return (_jsx(Menu, { rootOptions: {
            modal: true,
            open,
            onOpenChange: handleMenuOpenChange,
            ...menuProps.rootOptions,
        }, contentOptions: {
            side: 'bottom',
            sideOffset: 4,
            align: 'start',
            onClick: e => e.stopPropagation(),
            role: 'rename-modal',
            style: { width },
            onPointerDownOutside: commit,
            onEscapeKeyDown: abort,
            ...contentOptions,
            className: clsx(styles.menuContent, contentOptions?.className),
        }, ...menuProps, items: _jsx(IconAndNameEditorContent, { icon: icon, name: name, iconPlaceholder: iconPlaceholder, closeAfterSelect: closeAfterSelect, onIconChange: handleIconChange, onNameChange: handleNameChange, inputTestId: inputTestId, onEnter: () => {
                commit();
                onOpenChange?.(false);
            } }) }));
};
//# sourceMappingURL=icon-name-editor.js.map