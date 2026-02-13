import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropIndicator, IconButton, Menu, Tooltip, useDraggable, useDropTarget, } from '@affine/component';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import { MoreHorizontalIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useGuard } from '../../guard';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../../workspace-property-types';
import { WorkspacePropertyIcon } from '../icons/workspace-property-icon';
import { EditWorkspacePropertyMenuItems } from '../menu/edit-doc-property';
import * as styles from './styles.css';
const PropertyItem = ({ propertyInfo, defaultOpenEditMenu, onPropertyInfoChange, }) => {
    const t = useI18n();
    const workspaceService = useService(WorkspaceService);
    const workspacePropertyService = useService(WorkspacePropertyService);
    const [moreMenuOpen, setMoreMenuOpen] = useState(defaultOpenEditMenu);
    const canEditPropertyInfo = useGuard('Workspace_Properties_Update');
    const typeInfo = isSupportedWorkspacePropertyType(propertyInfo.type)
        ? WorkspacePropertyTypes[propertyInfo.type]
        : undefined;
    const handleClick = useCallback(() => {
        setMoreMenuOpen(true);
    }, []);
    const { dragRef } = useDraggable(() => ({
        canDrag: canEditPropertyInfo,
        data: {
            entity: {
                type: 'custom-property',
                id: propertyInfo.id,
            },
            from: {
                at: 'doc-property:manager',
                workspaceId: workspaceService.workspace.id,
            },
        },
    }), [propertyInfo, workspaceService, canEditPropertyInfo]);
    const { dropTargetRef, closestEdge } = useDropTarget(() => ({
        canDrop(data) {
            return (!!canEditPropertyInfo &&
                data.source.data.entity?.type === 'custom-property' &&
                data.source.data.from?.at === 'doc-property:manager' &&
                data.source.data.from?.workspaceId ===
                    workspaceService.workspace.id &&
                data.source.data.entity.id !== propertyInfo.id);
        },
        closestEdge: {
            allowedEdges: ['top', 'bottom'],
        },
        isSticky: true,
        onDrop(data) {
            if (data.source.data.entity?.type !== 'custom-property') {
                return;
            }
            const propertyId = data.source.data.entity.id;
            const edge = data.closestEdge;
            if (edge !== 'bottom' && edge !== 'top') {
                return;
            }
            workspacePropertyService.updatePropertyInfo(propertyId, {
                index: workspacePropertyService.indexAt(edge === 'bottom' ? 'after' : 'before', propertyInfo.id),
            });
        },
    }), [
        workspacePropertyService,
        propertyInfo,
        workspaceService,
        canEditPropertyInfo,
    ]);
    return (_jsx(Tooltip, { content: t.t(typeInfo?.description || propertyInfo.type), side: "left", children: _jsxs("div", { className: styles.itemContainer, ref: elem => {
                dropTargetRef.current = elem;
                dragRef.current = elem;
            }, onClick: handleClick, "data-testid": "doc-property-manager-item", children: [_jsx(WorkspacePropertyIcon, { className: styles.itemIcon, propertyInfo: propertyInfo }), _jsx("span", { className: styles.itemName, children: propertyInfo.name ||
                        (typeInfo?.name ? t.t(typeInfo.name) : t['unnamed']()) }), _jsx("span", { className: styles.itemVisibility, children: propertyInfo.show === 'hide-when-empty'
                        ? t['com.affine.page-properties.property.hide-when-empty']()
                        : propertyInfo.show === 'always-hide'
                            ? t['com.affine.page-properties.property.always-hide']()
                            : t['com.affine.page-properties.property.always-show']() }), _jsx(Menu, { rootOptions: {
                        open: moreMenuOpen,
                        onOpenChange: setMoreMenuOpen,
                        modal: true,
                    }, items: _jsx(EditWorkspacePropertyMenuItems, { propertyId: propertyInfo.id, onPropertyInfoChange: onPropertyInfoChange, readonly: !canEditPropertyInfo }), children: _jsx(IconButton, { size: 20, iconClassName: styles.itemMore, children: _jsx(MoreHorizontalIcon, {}) }) }), _jsx(DropIndicator, { edge: closestEdge, noTerminal: true })] }) }));
};
export const WorkspacePropertyManager = ({ className, defaultOpenEditMenuPropertyId, onPropertyInfoChange, ...props }) => {
    const workspacePropertyService = useService(WorkspacePropertyService);
    const properties = useLiveData(workspacePropertyService.sortedProperties$);
    return (_jsx("div", { className: clsx(styles.container, className), ...props, children: properties.map(propertyInfo => (_jsx(PropertyItem, { propertyInfo: propertyInfo, defaultOpenEditMenu: defaultOpenEditMenuPropertyId === propertyInfo.id, onPropertyInfoChange: (...args) => onPropertyInfoChange?.(propertyInfo, ...args) }, propertyInfo.id))) }));
};
//# sourceMappingURL=index.js.map