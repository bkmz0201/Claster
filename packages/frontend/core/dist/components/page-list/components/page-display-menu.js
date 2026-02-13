import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Menu, MenuItem, MenuSeparator, MenuSub, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { ArrowDownSmallIcon, DoneIcon } from '@blocksuite/icons/rc';
import { useCallback, useMemo } from 'react';
import { useAllDocDisplayProperties } from '../use-all-doc-display-properties';
import * as styles from './page-display-menu.css';
export function getGroupOptions(t) {
    return [
        {
            value: 'createDate',
            label: t['Created'](),
        },
        {
            value: 'updatedDate',
            label: t['Updated'](),
        },
        {
            value: 'tag',
            label: t['com.affine.page.display.grouping.group-by-tag'](),
        },
        {
            value: 'favourites',
            label: t['com.affine.page.display.grouping.group-by-favourites'](),
        },
        {
            value: 'none',
            label: t['com.affine.page.display.grouping.no-grouping'](),
        },
    ];
}
export const PageDisplayMenu = () => {
    const t = useI18n();
    const [workspaceProperties, setProperties] = useAllDocDisplayProperties();
    const handleSelect = useCallback((value) => {
        setProperties('groupBy', value);
    }, [setProperties]);
    const handleSetDocDisplayProperties = useCallback((key) => {
        setProperties('displayProperties', {
            ...workspaceProperties.displayProperties,
            [key]: !workspaceProperties.displayProperties[key],
        });
    }, [setProperties, workspaceProperties.displayProperties]);
    const propertyOptions = useMemo(() => {
        return [
            {
                key: 'bodyNotes',
                onClick: () => handleSetDocDisplayProperties('bodyNotes'),
                label: t['com.affine.page.display.display-properties.body-notes'](),
            },
            {
                key: 'tags',
                onClick: () => handleSetDocDisplayProperties('tags'),
                label: t['Tags'](),
            },
            {
                key: 'createDate',
                onClick: () => handleSetDocDisplayProperties('createDate'),
                label: t['Created'](),
            },
            {
                key: 'updatedDate',
                onClick: () => handleSetDocDisplayProperties('updatedDate'),
                label: t['Updated'](),
            },
        ];
    }, [handleSetDocDisplayProperties, t]);
    const items = useMemo(() => {
        const groupOptions = getGroupOptions(t);
        const subItems = groupOptions.map(option => (_jsx(MenuItem, { onSelect: () => handleSelect(option.value), "data-active": workspaceProperties.groupBy === option.value, suffixIcon: workspaceProperties.groupBy === option.value ? (_jsx(DoneIcon, { fontSize: '20px' })) : null, className: styles.subMenuItem, "data-testid": `group-by-${option.value}`, children: _jsx("span", { children: option.label }) }, option.value)));
        const currentGroupType = groupOptions.find(option => option.value === workspaceProperties.groupBy)?.label;
        return (_jsxs(_Fragment, { children: [_jsx(MenuSub, { subContentOptions: {
                        alignOffset: -8,
                        sideOffset: 12,
                    }, triggerOptions: { className: styles.subMenuTrigger }, items: subItems, children: _jsxs("div", { className: styles.subMenuTriggerContent, "data-testid": "page-display-grouping-menuItem", children: [_jsx("span", { children: t['com.affine.page.display.grouping']() }), _jsx("span", { className: styles.currentGroupType, children: currentGroupType })] }) }), _jsx(MenuSeparator, {}), _jsx("div", { className: styles.listOption, children: t['com.affine.page.display.list-option']() }), _jsx("div", { className: styles.properties, children: t['com.affine.page.display.display-properties']() }), _jsx("div", { className: styles.propertiesWrapper, children: propertyOptions.map(option => (_jsx(Button, { className: styles.propertyButton, onClick: option.onClick, "data-active": !!workspaceProperties.displayProperties[option.key], "data-testid": `property-${option.key}`, children: option.label }, option.label))) })] }));
    }, [
        handleSelect,
        propertyOptions,
        t,
        workspaceProperties.displayProperties,
        workspaceProperties.groupBy,
    ]);
    return (_jsx(Menu, { items: items, contentOptions: {
            className: styles.menu,
            align: 'end',
        }, children: _jsx(Button, { suffix: _jsx(ArrowDownSmallIcon, {}), className: styles.headerDisplayButton, "data-testid": "page-display-menu-button", children: t['com.affine.page.display']() }) }));
};
//# sourceMappingURL=page-display-menu.js.map