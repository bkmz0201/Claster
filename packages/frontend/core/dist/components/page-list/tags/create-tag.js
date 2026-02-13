import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input, Menu, toast } from '@affine/component';
import { TagService } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './create-tag.css';
const TagIcon = ({ color, large }) => (_jsx("div", { className: clsx(styles.tagColorIcon, {
        ['large']: large,
    }), style: { backgroundColor: color } }));
export const CreateOrEditTag = ({ open, onOpenChange, tagMeta, }) => {
    const tagService = useService(TagService);
    const tagList = tagService.tagList;
    const tagOptions = useLiveData(tagList.tagMetas$);
    const tag = useLiveData(tagList.tagByTagId$(tagMeta?.id));
    const t = useI18n();
    const [menuOpen, setMenuOpen] = useState(false);
    const [tagName, setTagName] = useState(tagMeta?.name || '');
    const handleChangeName = useCallback((value) => {
        setTagName(value);
    }, []);
    const [tagIcon, setTagIcon] = useState(tagMeta?.color || tagService.randomTagColor());
    const handleChangeIcon = useCallback((value) => {
        setTagIcon(value);
    }, []);
    const tags = useMemo(() => {
        return tagService.tagColors.map(([name, color]) => {
            return {
                name: name,
                color: color,
                onClick: () => {
                    handleChangeIcon(color);
                    setMenuOpen(false);
                },
            };
        });
    }, [handleChangeIcon, tagService.tagColors]);
    const items = useMemo(() => {
        const tagItems = tags.map(item => {
            return (_jsx("div", { onClick: item.onClick, className: clsx(styles.tagItem, {
                    ['active']: item.color === tagIcon,
                }), children: _jsx(TagIcon, { color: item.color, large: true }) }, item.color));
        });
        return _jsx("div", { className: styles.tagItemsWrapper, children: tagItems });
    }, [tagIcon, tags]);
    const onClose = useCallback(() => {
        if (!tagMeta) {
            handleChangeIcon(tagService.randomTagColor());
            setTagName('');
        }
        onOpenChange(false);
    }, [handleChangeIcon, onOpenChange, tagMeta, tagService]);
    const onConfirm = useCallback(() => {
        if (!tagName?.trim())
            return;
        if (tagOptions.some(tag => tag.name === tagName.trim() && tag.id !== tagMeta?.id)) {
            return toast(t['com.affine.tags.create-tag.toast.exist']());
        }
        if (!tagMeta) {
            tagList.createTag(tagName.trim(), tagIcon);
            toast(t['com.affine.tags.create-tag.toast.success']());
            onClose();
            return;
        }
        tag?.rename(tagName.trim());
        tag?.changeColor(tagIcon);
        toast(t['com.affine.tags.edit-tag.toast.success']());
        onClose();
        return;
    }, [onClose, t, tag, tagIcon, tagMeta, tagName, tagOptions, tagList]);
    const handlePropagation = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);
    useEffect(() => {
        if (!open)
            return;
        if (menuOpen)
            return;
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open, onOpenChange, menuOpen, onClose]);
    useEffect(() => {
        setTagName(tagMeta?.name || '');
        setTagIcon(tagMeta?.color || tagService.randomTagColor());
    }, [tagMeta?.color, tagMeta?.name, tagService]);
    if (!open) {
        return null;
    }
    return (_jsxs("div", { className: styles.createTagWrapper, "data-show": open, "data-testid": "edit-tag-modal", onClick: handlePropagation, children: [_jsx(Menu, { rootOptions: {
                    open: menuOpen,
                    onOpenChange: setMenuOpen,
                }, items: items, children: _jsx(Button, { className: styles.menuBtn, children: _jsx(TagIcon, { color: tagIcon }) }) }), _jsx(Input, { placeholder: t['com.affine.tags.create-tag.placeholder'](), inputStyle: { fontSize: 'var(--affine-font-xs)' }, onEnter: onConfirm, value: tagName, onChange: handleChangeName, autoFocus: true, "data-testid": "edit-tag-input" }), _jsx(Button, { className: styles.cancelBtn, onClick: onClose, children: t['Cancel']() }), _jsx(Button, { variant: "primary", onClick: onConfirm, disabled: !tagName, "data-testid": "save-tag", children: tagMeta ? t['Save']() : t['Create']() })] }));
};
//# sourceMappingURL=create-tag.js.map