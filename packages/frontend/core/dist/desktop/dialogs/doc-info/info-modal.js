import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Divider, Menu, PropertyCollapsibleContent, PropertyCollapsibleSection, } from '@affine/component';
import { BacklinkGroups } from '@affine/core/blocksuite/block-suite-editor/bi-directional-link-panel';
import { CreatePropertyMenuItems } from '@affine/core/components/properties/menu/create-doc-property';
import { WorkspacePropertyRow } from '@affine/core/components/properties/table';
import { DocDatabaseBacklinkInfo } from '@affine/core/modules/doc-info';
import { DocLinksService } from '@affine/core/modules/doc-link';
import { GuardService } from '@affine/core/modules/permissions';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import * as styles from './info-modal.css';
import { LinksRow } from './links-row';
export const InfoTable = ({ onClose, docId, }) => {
    const t = useI18n();
    const { workspacePropertyService, guardService, docLinksService } = useServices({
        WorkspacePropertyService,
        GuardService,
        DocLinksService,
    });
    const canEditPropertyInfo = useLiveData(guardService.can$('Workspace_Properties_Update'));
    const canEditProperty = useLiveData(guardService.can$('Doc_Update', docId));
    const [newPropertyId, setNewPropertyId] = useState(null);
    const properties = useLiveData(workspacePropertyService.sortedProperties$);
    const links = useLiveData(docLinksService.links.links$);
    const backlinks = useLiveData(docLinksService.backlinks.backlinks$);
    const onBacklinkPropertyChange = useCallback((_row, cell, _value) => {
        track.$.docInfoPanel.databaseProperty.editProperty({
            type: cell.property.type$.value,
        });
    }, []);
    const onPropertyAdded = useCallback((property) => {
        setNewPropertyId(property.id);
        track.$.docInfoPanel.property.addProperty({
            type: property.type,
            control: 'at menu',
        });
    }, []);
    const onPropertyChange = useCallback((property, _value) => {
        track.$.docInfoPanel.property.editProperty({
            type: property.type,
        });
    }, []);
    const onPropertyInfoChange = useCallback((property, field, _value) => {
        track.$.docInfoPanel.property.editPropertyMeta({
            type: property.type,
            field,
        });
    }, []);
    useEffect(() => {
        docLinksService.backlinks.revalidateFromCloud();
    }, [docLinksService.backlinks]);
    return (_jsxs(_Fragment, { children: [_jsx(PropertyCollapsibleSection, { title: t.t('com.affine.workspace.properties'), children: _jsxs(PropertyCollapsibleContent, { className: styles.tableBodyRoot, collapseButtonText: ({ hide, isCollapsed }) => isCollapsed
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
                            }), children: [properties.map(property => (_jsx(WorkspacePropertyRow, { propertyInfo: property, readonly: !canEditProperty, propertyInfoReadonly: !canEditPropertyInfo, defaultOpenEditMenu: newPropertyId === property.id, onChange: value => onPropertyChange(property, value), onPropertyInfoChange: (...args) => onPropertyInfoChange(property, ...args) }, property.id))), !canEditPropertyInfo ? (_jsx(Button, { disabled: true, variant: "plain", prefix: _jsx(PlusIcon, {}), className: styles.addPropertyButton, children: t['com.affine.page-properties.add-property']() })) : (_jsx(Menu, { items: _jsx(CreatePropertyMenuItems, { onCreated: onPropertyAdded }), contentOptions: {
                                onClick(e) {
                                    e.stopPropagation();
                                },
                            }, children: _jsx(Button, { variant: "plain", prefix: _jsx(PlusIcon, {}), className: styles.addPropertyButton, children: t['com.affine.page-properties.add-property']() }) }))] }) }), _jsx(Divider, { size: "thinner" }), _jsx(DocDatabaseBacklinkInfo, { onChange: onBacklinkPropertyChange }), backlinks && backlinks.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(LinksRow, { count: backlinks.length, references: _jsx(BacklinkGroups, {}), onClick: onClose, label: t['com.affine.page-properties.backlinks']() }), _jsx(Divider, { size: "thinner" })] })) : null, links && links.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(LinksRow, { count: links.length, references: links, onClick: onClose, label: t['com.affine.page-properties.outgoing-links']() }), _jsx(Divider, { size: "thinner" })] })) : null] }));
};
//# sourceMappingURL=info-modal.js.map