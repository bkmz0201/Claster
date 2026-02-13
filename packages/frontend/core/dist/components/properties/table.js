import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Menu, PropertyCollapsibleContent, PropertyCollapsibleSection, PropertyName, PropertyRoot, useDraggable, useDropTarget, } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { DocDatabaseBacklinkInfo } from '@affine/core/modules/doc-info';
import { DocIntegrationPropertiesTable } from '@affine/core/modules/integration';
import { ViewService, WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { PlusIcon, PropertyIcon, ToggleDownIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { useGuard } from '../guard';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../workspace-property-types';
import { WorkspacePropertyIcon } from './icons/workspace-property-icon';
import { CreatePropertyMenuItems } from './menu/create-doc-property';
import { EditWorkspacePropertyMenuItems } from './menu/edit-doc-property';
import { WorkspacePropertyName } from './name';
import * as styles from './table.css';
// Info
// ─────────────────────────────────────────────────
export const WorkspacePropertiesTableHeader = ({ className, style, open, onOpenChange, }) => {
    const handleCollapse = useCallback(() => {
        track.doc.inlineDocInfo.$.toggle();
        onOpenChange(!open);
    }, [onOpenChange, open]);
    const t = useI18n();
    return (_jsxs(Collapsible.Trigger, { style: style, role: "button", onClick: handleCollapse, children: [_jsxs("div", { className: clsx(styles.tableHeader, className), children: [_jsx("div", { className: clsx(!open ? styles.pageInfoDimmed : null), children: t['com.affine.page-properties.page-info']() }), _jsx("div", { className: styles.tableHeaderCollapseButtonWrapper, "data-testid": "page-info-collapse", children: _jsx(ToggleDownIcon, { className: styles.collapsedIcon, "data-collapsed": !open }) })] }), _jsx("div", { className: styles.tableHeaderDivider })] }));
};
export const WorkspacePropertyRow = ({ propertyInfo, defaultOpenEditMenu, onChange, propertyInfoReadonly, readonly, onPropertyInfoChange, }) => {
    const docService = useService(DocService);
    const workspacePropertyService = useService(WorkspacePropertyService);
    const customPropertyValue = useLiveData(docService.doc.customProperty$(propertyInfo.id));
    const typeInfo = isSupportedWorkspacePropertyType(propertyInfo.type)
        ? WorkspacePropertyTypes[propertyInfo.type]
        : undefined;
    const hide = propertyInfo.show === 'always-hide';
    const hideEmpty = propertyInfo.show === 'hide-when-empty';
    const ValueRenderer = typeInfo && 'value' in typeInfo ? typeInfo.value : undefined;
    const handleChange = useCallback((value, skipCommit) => {
        if (!skipCommit) {
            if (typeof value !== 'string') {
                throw new Error('only allow string value');
            }
            docService.doc.record.setCustomProperty(propertyInfo.id, value);
        }
        onChange?.(value);
    }, [docService, onChange, propertyInfo]);
    const docId = docService.doc.id;
    const { dragRef } = useDraggable(() => ({
        canDrag: !propertyInfoReadonly,
        data: {
            entity: {
                type: 'custom-property',
                id: propertyInfo.id,
            },
            from: {
                at: 'doc-property:table',
                docId: docId,
            },
        },
    }), [docId, propertyInfo.id, propertyInfoReadonly]);
    const { dropTargetRef, closestEdge } = useDropTarget(() => ({
        closestEdge: {
            allowedEdges: ['bottom', 'top'],
        },
        canDrop: data => {
            return (!propertyInfoReadonly &&
                data.source.data.entity?.type === 'custom-property' &&
                data.source.data.entity.id !== propertyInfo.id &&
                data.source.data.from?.at === 'doc-property:table' &&
                data.source.data.from?.docId === docId);
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
    }), [docId, workspacePropertyService, propertyInfo.id, propertyInfoReadonly]);
    if (!ValueRenderer || typeof ValueRenderer !== 'function')
        return null;
    return (_jsxs(PropertyRoot, { ref: el => {
            dragRef.current = el;
            dropTargetRef.current = el;
        }, dropIndicatorEdge: closestEdge, hideEmpty: hideEmpty, hide: hide, "data-property-info-readonly": propertyInfoReadonly, "data-readonly": readonly, "data-testid": "doc-property-row", "data-info-id": propertyInfo.id, children: [_jsx(PropertyName, { defaultOpenMenu: defaultOpenEditMenu, icon: _jsx(WorkspacePropertyIcon, { propertyInfo: propertyInfo }), name: _jsx(WorkspacePropertyName, { propertyInfo: propertyInfo }), menuItems: _jsx(EditWorkspacePropertyMenuItems, { propertyId: propertyInfo.id, onPropertyInfoChange: onPropertyInfoChange, readonly: propertyInfoReadonly }), "data-testid": "doc-property-name" }), _jsx(ValueRenderer, { propertyInfo: propertyInfo, onChange: handleChange, value: customPropertyValue, readonly: readonly })] }));
};
// 🏷️ Tags     (⋅ xxx) (⋅ yyy)
// #️⃣ Number   123456
// +  Add a property
const WorkspaceWorkspacePropertiesTableBody = forwardRef(({ className, style, defaultOpen, onChange, onPropertyAdded, onPropertyInfoChange, ...props }, ref) => {
    const t = useI18n();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const workbenchService = useService(WorkbenchService);
    const viewService = useServiceOptional(ViewService);
    const docService = useService(DocService);
    const properties = useLiveData(workspacePropertyService.sortedProperties$);
    const [addMoreCollapsed, setAddMoreCollapsed] = useState(true);
    const [newPropertyId, setNewPropertyId] = useState(null);
    const canEditProperty = useGuard('Doc_Update', docService.doc.id);
    const canEditPropertyInfo = useGuard('Workspace_Properties_Update');
    const handlePropertyAdded = useCallback((property) => {
        setNewPropertyId(property.id);
        onPropertyAdded?.(property);
    }, [onPropertyAdded]);
    const handleCollapseChange = useCallback(() => {
        setNewPropertyId(null);
    }, []);
    return (_jsx(PropertyCollapsibleSection, { ref: ref, className: clsx(styles.tableBodyRoot, className), style: style, title: t.t('com.affine.workspace.properties'), defaultCollapsed: !defaultOpen, onCollapseChange: handleCollapseChange, ...props, children: _jsxs(PropertyCollapsibleContent, { collapsible: true, collapsed: addMoreCollapsed, onCollapseChange: setAddMoreCollapsed, className: styles.tableBodySortable, collapseButtonText: ({ hide, isCollapsed }) => isCollapsed
                ? hide === 1
                    ? t['com.affine.page-properties.more-property.one']({
                        count: hide.toString(),
                    })
                    : t['com.affine.page-properties.more-property.more']({
                        count: hide.toString(),
                    })
                : hide === 1
                    ? t['com.affine.page-properties.hide-property.one']({
                        count: hide.toString(),
                    })
                    : t['com.affine.page-properties.hide-property.more']({
                        count: hide.toString(),
                    }), children: [properties.map(property => (_jsx(WorkspacePropertyRow, { propertyInfo: property, defaultOpenEditMenu: newPropertyId === property.id, onChange: value => onChange?.(property, value), readonly: !canEditProperty, propertyInfoReadonly: !canEditPropertyInfo, onPropertyInfoChange: (...args) => onPropertyInfoChange?.(property, ...args) }, property.id))), _jsxs("div", { className: styles.actionContainer, children: [!canEditPropertyInfo ? (_jsx(Button, { variant: "plain", prefix: _jsx(PlusIcon, {}), className: styles.propertyActionButton, "data-testid": "add-property-button", disabled: !canEditPropertyInfo, children: t['com.affine.page-properties.add-property']() })) : (_jsx(Menu, { items: _jsx(CreatePropertyMenuItems, { at: "after", onCreated: handlePropertyAdded }), contentOptions: {
                                onClick(e) {
                                    e.stopPropagation();
                                },
                            }, children: _jsx(Button, { variant: "plain", prefix: _jsx(PlusIcon, {}), className: styles.propertyActionButton, "data-testid": "add-property-button", children: t['com.affine.page-properties.add-property']() }) })), viewService ? (_jsx(Button, { variant: "plain", prefix: _jsx(PropertyIcon, {}), className: clsx(styles.propertyActionButton, styles.propertyConfigButton), onClick: () => {
                                viewService.view.activeSidebarTab('properties');
                                workbenchService.workbench.openSidebar();
                            }, children: t['com.affine.page-properties.config-properties']() })) : null] })] }) }));
});
WorkspaceWorkspacePropertiesTableBody.displayName = 'PagePropertiesTableBody';
const WorkspacePropertiesTableInner = ({ defaultOpenProperty, onPropertyAdded, onPropertyChange, onPropertyInfoChange, onDatabasePropertyChange, className, }) => {
    const [expanded, setExpanded] = useState(!!defaultOpenProperty);
    const defaultOpen = useMemo(() => {
        return defaultOpenProperty?.type === 'database'
            ? [
                {
                    databaseBlockId: defaultOpenProperty.databaseId,
                    rowId: defaultOpenProperty.databaseRowId,
                    docId: defaultOpenProperty.docId,
                },
            ]
            : [];
    }, [defaultOpenProperty]);
    return (_jsx("div", { className: clsx(styles.root, className), children: _jsxs(Collapsible.Root, { open: expanded, onOpenChange: setExpanded, children: [_jsx(WorkspacePropertiesTableHeader, { style: { width: '100%' }, open: expanded, onOpenChange: setExpanded }), _jsxs(Collapsible.Content, { children: [_jsx(DocIntegrationPropertiesTable, { divider: _jsx("div", { className: styles.tableHeaderDivider }) }), _jsx(WorkspaceWorkspacePropertiesTableBody, { defaultOpen: !defaultOpenProperty || defaultOpenProperty.type === 'workspace', onPropertyAdded: onPropertyAdded, onChange: onPropertyChange, onPropertyInfoChange: onPropertyInfoChange }), _jsx("div", { className: styles.tableHeaderDivider }), _jsx(DocDatabaseBacklinkInfo, { onChange: onDatabasePropertyChange, defaultOpen: defaultOpen })] })] }) }));
};
// this is the main component that renders the page properties table at the top of the page below
// the page title
export const WorkspacePropertiesTable = (props) => {
    return _jsx(WorkspacePropertiesTableInner, { ...props });
};
//# sourceMappingURL=table.js.map