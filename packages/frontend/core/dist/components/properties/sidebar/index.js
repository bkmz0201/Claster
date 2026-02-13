import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, IconButton, Tooltip } from '@affine/component';
import { WorkspacePropertyService, } from '@affine/core/modules/workspace-property';
import { generateUniqueNameInSequence } from '@affine/core/utils/unique-name';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { PlusIcon } from '@blocksuite/icons/rc';
import { Content as CollapsibleContent, Root as CollapsibleRoot, } from '@radix-ui/react-collapsible';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { useGuard } from '../../guard';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../../workspace-property-types';
import { WorkspacePropertyManager } from '../manager';
import { AddWorkspacePropertySidebarSection, WorkspacePropertyListSidebarSection, } from './section';
import * as styles from './styles.css';
export const WorkspacePropertySidebar = () => {
    const t = useI18n();
    const [newPropertyId, setNewPropertyId] = useState();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const properties = useLiveData(workspacePropertyService.properties$);
    const canEditPropertyInfo = useGuard('Workspace_Properties_Update');
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
        const newProperty = workspacePropertyService.createProperty({
            id: typeDefined.uniqueId,
            name,
            type: option.type,
            index: workspacePropertyService.indexAt('after'),
            isDeleted: false,
        });
        setNewPropertyId(newProperty.id);
        track.doc.sidepanel.property.addProperty({
            control: 'property list',
            type: option.type,
        });
    }, [workspacePropertyService, properties]);
    const onPropertyInfoChange = useCallback((property, field) => {
        track.doc.sidepanel.property.editPropertyMeta({
            type: property.type,
            field,
        });
    }, []);
    return (_jsxs("div", { className: styles.container, children: [_jsxs(CollapsibleRoot, { defaultOpen: true, children: [_jsx(WorkspacePropertyListSidebarSection, {}), _jsx(CollapsibleContent, { children: _jsx(WorkspacePropertyManager, { className: styles.manager, defaultOpenEditMenuPropertyId: newPropertyId, onPropertyInfoChange: onPropertyInfoChange }) })] }), _jsx("div", { className: styles.divider, children: _jsx(Divider, {}) }), _jsxs(CollapsibleRoot, { defaultOpen: true, children: [_jsx(AddWorkspacePropertySidebarSection, {}), _jsx(CollapsibleContent, { children: _jsx("div", { className: styles.AddListContainer, children: Object.entries(WorkspacePropertyTypes).map(([key, value]) => {
                                const Icon = value.icon;
                                const name = t.t(value.name);
                                const isUniqueExist = properties.some(meta => meta.id === value.uniqueId);
                                return (_jsx(Tooltip, { content: t.t(value.description || value.name), side: "left", children: _jsxs("div", { className: styles.itemContainer, onClick: () => {
                                            if (!canEditPropertyInfo) {
                                                return;
                                            }
                                            onAddProperty({
                                                type: key,
                                                name,
                                            });
                                        }, "data-disabled": isUniqueExist || !canEditPropertyInfo, children: [_jsx(Icon, { className: styles.itemIcon }), _jsx("span", { className: styles.itemName, children: t.t(value.name) }), isUniqueExist ? (_jsx("span", { className: styles.itemAdded, children: "Added" })) : (_jsx(IconButton, { size: 20, iconClassName: styles.itemAdd, children: _jsx(PlusIcon, {}) }))] }) }, key));
                            }) }) })] })] }));
};
//# sourceMappingURL=index.js.map