import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Divider, Menu, PropertyCollapsibleContent, PropertyCollapsibleSection, Scrollable, } from '@affine/component';
import { useGuard } from '@affine/core/components/guard';
import { WorkspacePropertyRow, } from '@affine/core/components/properties';
import { CreatePropertyMenuItems } from '@affine/core/components/properties/menu/create-doc-property';
import { LinksRow } from '@affine/core/desktop/dialogs/doc-info/links-row';
import { TimeRow } from '@affine/core/desktop/dialogs/doc-info/time-row';
import { DocDatabaseBacklinkInfo } from '@affine/core/modules/doc-info';
import { DocLinksService } from '@affine/core/modules/doc-link';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { Suspense, useCallback, useEffect, useState } from 'react';
import * as styles from './doc-info.css';
export const DocInfoSheet = ({ docId, }) => {
    const { workspacePropertyService, docLinksService } = useServices({
        WorkspacePropertyService,
        DocLinksService,
    });
    const t = useI18n();
    const canEditPropertyInfo = useGuard('Workspace_Properties_Update');
    const canEditProperty = useGuard('Doc_Update', docId);
    const links = useLiveData(docLinksService.links.links$);
    const backlinks = useLiveData(docLinksService.backlinks.backlinks$);
    const [newPropertyId, setNewPropertyId] = useState(null);
    const onPropertyAdded = useCallback((property) => {
        setNewPropertyId(property.id);
    }, []);
    useEffect(() => {
        docLinksService.backlinks.revalidateFromCloud();
    }, [docLinksService.backlinks]);
    const properties = useLiveData(workspacePropertyService.sortedProperties$);
    return (_jsxs(Scrollable.Root, { className: styles.scrollableRoot, children: [_jsx(Scrollable.Viewport, { "data-testid": "doc-info-menu", children: _jsxs(Suspense, { children: [_jsx(TimeRow, { docId: docId, className: styles.timeRow }), _jsx(Divider, { size: "thinner" }), _jsx(PropertyCollapsibleSection, { title: t.t('com.affine.workspace.properties'), children: _jsxs(PropertyCollapsibleContent, { className: styles.tableBodyRoot, collapseButtonText: ({ hide, isCollapsed }) => isCollapsed
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
                                        }), children: [properties.map(property => (_jsx(WorkspacePropertyRow, { propertyInfo: property, defaultOpenEditMenu: newPropertyId === property.id, propertyInfoReadonly: !canEditPropertyInfo, readonly: !canEditProperty }, property.id))), !canEditPropertyInfo ? (_jsx(Button, { variant: "plain", prefix: _jsx(PlusIcon, {}), className: styles.addPropertyButton, children: t['com.affine.page-properties.add-property']() })) : (_jsx(Menu, { items: _jsx(CreatePropertyMenuItems, { onCreated: onPropertyAdded }), contentOptions: {
                                            onClick(e) {
                                                e.stopPropagation();
                                            },
                                        }, children: _jsx(Button, { variant: "plain", prefix: _jsx(PlusIcon, {}), className: styles.addPropertyButton, children: t['com.affine.page-properties.add-property']() }) }))] }) }), _jsx(Divider, { size: "thinner" }), _jsx(DocDatabaseBacklinkInfo, {}), backlinks && backlinks.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(LinksRow, { className: styles.linksRow, references: backlinks, count: backlinks.length, label: t['com.affine.page-properties.backlinks']() }), _jsx(Divider, { size: "thinner" })] })) : null, links && links.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(LinksRow, { className: styles.linksRow, references: links, count: links.length, label: t['com.affine.page-properties.outgoing-links']() }), _jsx(Divider, { size: "thinner" })] })) : null] }) }), _jsx(Scrollable.Scrollbar, { className: styles.scrollBar })] }));
};
//# sourceMappingURL=doc-info.js.map