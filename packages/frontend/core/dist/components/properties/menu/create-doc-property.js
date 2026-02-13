import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MenuItem, MenuSeparator } from '@affine/component';
import { WorkspacePropertyService, } from '@affine/core/modules/workspace-property';
import { generateUniqueNameInSequence } from '@affine/core/utils/unique-name';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../../workspace-property-types';
import * as styles from './create-doc-property.css';
export const CreatePropertyMenuItems = ({ at = 'before', onCreated, }) => {
    const t = useI18n();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const properties = useLiveData(workspacePropertyService.properties$);
    const onAddProperty = useCallback((option) => {
        if (!isSupportedWorkspacePropertyType(option.type)) {
            return;
        }
        const typeDefined = WorkspacePropertyTypes[option.type];
        const nameExists = properties.some(meta => meta.name === option.name);
        const allNames = properties
            .map(meta => meta.name)
            .filter((name) => name !== null && name !== undefined);
        const name = nameExists
            ? generateUniqueNameInSequence(option.name, allNames)
            : option.name;
        const uniqueId = typeDefined.uniqueId;
        const newProperty = workspacePropertyService.createProperty({
            id: uniqueId,
            name,
            type: option.type,
            index: workspacePropertyService.indexAt(at),
            isDeleted: false,
        });
        onCreated?.(newProperty);
    }, [at, onCreated, workspacePropertyService, properties]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { role: "heading", className: styles.menuHeader, children: t['com.affine.page-properties.create-property.menu.header']() }), _jsx(MenuSeparator, {}), Object.entries(WorkspacePropertyTypes).map(([type, info]) => {
                const name = t.t(info.name);
                const uniqueId = info.uniqueId;
                const isUniqueExist = properties.some(meta => meta.id === uniqueId);
                const Icon = info.icon;
                return (_jsx(MenuItem, { prefixIcon: _jsx(Icon, {}), disabled: isUniqueExist, onClick: () => {
                        onAddProperty({
                            name: name,
                            type: type,
                        });
                    }, "data-testid": "create-property-menu-item", "data-property-type": type, children: _jsxs("div", { className: styles.propertyItem, children: [name, isUniqueExist && (_jsx("span", { children: t['com.affine.page-properties.create-property.added']() }))] }) }, type));
            })] }));
};
//# sourceMappingURL=create-doc-property.js.map