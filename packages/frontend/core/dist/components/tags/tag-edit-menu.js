import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, Menu, MenuItem, MenuSeparator, Scrollable, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { DeleteIcon, DoneIcon, TagsIcon } from '@blocksuite/icons/rc';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConfigModal } from '../mobile';
import { TagItem } from './tag';
import * as styles from './tag-edit-menu.css';
const DesktopTagEditMenu = ({ tag, onTagDelete, children, jumpToTag, colors, onTagChange, }) => {
    const t = useI18n();
    const menuProps = useMemo(() => {
        const updateTagName = (name) => {
            if (name.trim() === '') {
                return;
            }
            onTagChange('name', name);
        };
        return {
            contentOptions: {
                onClick(e) {
                    e.stopPropagation();
                },
            },
            items: (_jsxs(_Fragment, { children: [_jsx(Input, { defaultValue: tag.name, onBlur: e => {
                            updateTagName(e.currentTarget.value);
                        }, onKeyDown: e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                updateTagName(e.currentTarget.value);
                            }
                            e.stopPropagation();
                        }, placeholder: t['Untitled']() }), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", onClick: () => {
                            tag?.id ? onTagDelete(tag.id) : null;
                        }, children: t['Delete']() }), jumpToTag ? (_jsx(MenuItem, { prefixIcon: _jsx(TagsIcon, {}), onClick: () => {
                            jumpToTag(tag.id);
                        }, children: t['com.affine.page-properties.tags.open-tags-page']() })) : null, _jsx(MenuSeparator, {}), _jsx(Scrollable.Root, { children: _jsxs(Scrollable.Viewport, { className: styles.menuItemList, children: [colors.map(({ name, value: color }) => (_jsx(MenuItem, { checked: tag.color === color, prefixIcon: _jsx("div", { className: styles.tagColorIconWrapper, children: _jsx("div", { className: styles.tagColorIcon, style: {
                                                backgroundColor: color,
                                            } }) }), onClick: () => {
                                        onTagChange('color', color);
                                    }, children: name }, color))), _jsx(Scrollable.Scrollbar, { className: styles.menuItemListScrollbar })] }) })] })),
        };
    }, [tag, t, jumpToTag, colors, onTagChange, onTagDelete]);
    return _jsx(Menu, { ...menuProps, children: children });
};
const MobileTagEditMenu = ({ tag, onTagDelete, children, colors, onTagChange, }) => {
    const [open, setOpen] = useState(false);
    const t = useI18n();
    const [localTag, setLocalTag] = useState({ ...tag });
    useEffect(() => {
        if (localTag.name !== tag.name) {
            setLocalTag({ ...tag });
        }
    }, [tag, localTag.name]);
    const handleTriggerClick = useCallback(e => {
        e.stopPropagation();
        setOpen(true);
    }, []);
    const handleOnDone = () => {
        setOpen(false);
        if (localTag.name.trim() !== tag.name) {
            onTagChange('name', localTag.name);
        }
        if (localTag.color !== tag.color) {
            onTagChange('color', localTag.color);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ConfigModal, { open: open, onOpenChange: setOpen, title: _jsx(TagItem, { mode: "list-tag", tag: tag }), onDone: handleOnDone, children: [_jsx(Input, { inputStyle: {
                            height: 46,
                            padding: '12px',
                        }, autoSelect: false, className: styles.mobileTagEditInput, value: localTag.name, onChange: e => {
                            setLocalTag({ ...localTag, name: e });
                        }, placeholder: t['Untitled']() }), _jsx(ConfigModal.RowGroup, { title: t['Colors'](), children: colors.map(({ name, value: color }) => (_jsxs(ConfigModal.Row, { onClick: () => {
                                setLocalTag({ ...localTag, color });
                            }, children: [_jsx("div", { className: styles.tagColorIconWrapper, children: _jsx("div", { className: styles.tagColorIcon, style: {
                                            backgroundColor: color,
                                        } }) }), name, _jsx("div", { className: styles.spacer }), _jsx(DoneIcon, { className: styles.tagColorIconSelect, "data-selected": localTag.color === color })] }, color))) }), _jsx(ConfigModal.RowGroup, { children: _jsxs(ConfigModal.Row, { className: styles.mobileTagEditDeleteRow, onClick: () => {
                                onTagDelete(tag.id);
                            }, children: [_jsx(DeleteIcon, {}), t['Delete']()] }) })] }), _jsx("div", { onClick: handleTriggerClick, className: styles.mobileTagEditTrigger, children: children })] }));
};
export const TagEditMenu = BUILD_CONFIG.isMobileEdition
    ? MobileTagEditMenu
    : DesktopTagEditMenu;
//# sourceMappingURL=tag-edit-menu.js.map