import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, IconButton, Menu, MenuItem, MenuSeparator, } from '@affine/component';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import { ArrowLeftBigIcon, CloudWorkspaceIcon, FavoriteIcon, PlusIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import { generateExplorerPropertyList } from '../explorer/properties';
import { WorkspacePropertyIcon, WorkspacePropertyName } from '../properties';
import { WorkspacePropertyTypes } from '../workspace-property-types';
import * as styles from './styles.css';
export const AddFilterMenu = ({ onAdd, onBack, }) => {
    const t = useI18n();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const workspaceProperties = useLiveData(workspacePropertyService.sortedProperties$);
    const explorerPropertyList = useMemo(() => generateExplorerPropertyList(workspaceProperties), [workspaceProperties]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.selectHeaderContainer, children: [onBack && (_jsx(IconButton, { onClick: onBack, children: _jsx(ArrowLeftBigIcon, {}) })), _jsx("div", { className: styles.variableSelectTitleStyle, children: t['com.affine.filter']() })] }), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(FavoriteIcon, { className: styles.filterTypeItemIcon }), onClick: () => {
                    onAdd({
                        type: 'system',
                        key: 'favorite',
                        method: 'is',
                        value: 'true',
                    });
                }, children: _jsx("span", { className: styles.filterTypeItemName, children: t['Favorited']() }) }, 'favorite'), _jsx(MenuItem, { prefixIcon: _jsx(CloudWorkspaceIcon, { className: styles.filterTypeItemIcon }), onClick: () => {
                    onAdd({
                        type: 'system',
                        key: 'shared',
                        method: 'is',
                        value: 'true',
                    });
                }, children: _jsx("span", { className: styles.filterTypeItemName, children: t['com.affine.filter.is-public']() }) }, 'shared'), explorerPropertyList.map(({ systemProperty, workspaceProperty }) => {
                if (systemProperty) {
                    const defaultFilter = 'defaultFilter' in systemProperty && systemProperty.defaultFilter;
                    if (!defaultFilter) {
                        return null;
                    }
                    return (_jsx(MenuItem, { prefixIcon: _jsx(systemProperty.icon, { className: styles.filterTypeItemIcon }), onClick: () => {
                            onAdd({
                                type: 'system',
                                key: systemProperty.type,
                                ...defaultFilter,
                            });
                        }, children: _jsx("span", { className: styles.filterTypeItemName, children: t.t(systemProperty.name) }) }, systemProperty.type));
                }
                else if (workspaceProperty) {
                    const type = WorkspacePropertyTypes[workspaceProperty.type];
                    const defaultFilter = type?.defaultFilter;
                    if (!defaultFilter) {
                        return null;
                    }
                    return (_jsx(MenuItem, { prefixIcon: _jsx(WorkspacePropertyIcon, { propertyInfo: workspaceProperty, className: styles.filterTypeItemIcon }), onClick: () => {
                            onAdd({
                                type: 'property',
                                key: workspaceProperty.id,
                                ...defaultFilter,
                            });
                        }, children: _jsx("span", { className: styles.filterTypeItemName, children: _jsx(WorkspacePropertyName, { propertyInfo: workspaceProperty }) }) }, workspaceProperty.id));
                }
                return null;
            })] }));
};
export const AddFilter = ({ onAdd, variant = 'icon-button', }) => {
    const t = useI18n();
    return (_jsx(Menu, { items: _jsx(AddFilterMenu, { onAdd: onAdd }), contentOptions: {
            className: styles.addFilterMenuContent,
        }, children: variant === 'icon-button' ? (_jsx(IconButton, { size: "16", children: _jsx(PlusIcon, {}) })) : (_jsx(Button, { prefix: _jsx(PlusIcon, {}), className: styles.addFilterButton, children: t['com.affine.filter.add-filter']() })) }));
};
//# sourceMappingURL=add-filter.js.map