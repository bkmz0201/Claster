import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DocsService } from '@affine/core/modules/doc';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { SystemPropertyTypes } from '../../system-property-types';
import { WorkspacePropertyTypes } from '../../workspace-property-types';
import { DocExplorerContext } from '../context';
import { generateExplorerPropertyList } from '../properties';
import { listHide560, listHide750 } from './doc-list-item.css';
import * as styles from './properties.css';
const listInlinePropertyOrder = [
    'createdAt',
    'updatedAt',
    'createdBy',
    'updatedBy',
];
const cardInlinePropertyOrder = [
    'createdBy',
    'updatedBy',
    'createdAt',
    'updatedAt',
];
const useProperties = (view) => {
    const workspacePropertyService = useService(WorkspacePropertyService);
    const propertyList = useLiveData(workspacePropertyService.sortedProperties$);
    const explorerPropertyList = useMemo(() => {
        return generateExplorerPropertyList(propertyList);
    }, [propertyList]);
    const stackProperties = useMemo(() => explorerPropertyList
        .filter(property => (property.systemProperty &&
        property.systemProperty.showInDocList === 'stack') ||
        (property.workspaceProperty &&
            WorkspacePropertyTypes[property.workspaceProperty.type]
                .showInDocList === 'stack'))
        .filter(p => p.systemProperty?.type !== 'tags'), [explorerPropertyList]);
    const inlineProperties = useMemo(() => explorerPropertyList
        .filter(property => (property.systemProperty &&
        property.systemProperty.showInDocList === 'inline') ||
        (property.workspaceProperty &&
            WorkspacePropertyTypes[property.workspaceProperty.type]
                .showInDocList === 'inline'))
        .filter(p => p.systemProperty?.type !== 'tags')
        .sort((a, b) => {
        const orderList = view === 'list' ? listInlinePropertyOrder : cardInlinePropertyOrder;
        const aIndex = orderList.indexOf(a.systemProperty?.type ?? a.workspaceProperty?.type ?? '');
        const bIndex = orderList.indexOf(b.systemProperty?.type ?? b.workspaceProperty?.type ?? '');
        // Push un-recognised types to the tail instead of the head
        return ((aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
            (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex));
    }), [explorerPropertyList, view]);
    return useMemo(() => ({
        stackProperties,
        inlineProperties,
    }), [stackProperties, inlineProperties]);
};
export const ListViewProperties = ({ docId }) => {
    const contextValue = useContext(DocExplorerContext);
    const displayProperties = useLiveData(contextValue?.displayProperties$);
    const docsService = useService(DocsService);
    const doc = useLiveData(docsService.list.doc$(docId));
    const { stackProperties, inlineProperties } = useProperties('list');
    if (!doc) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: clsx(styles.stackContainer, listHide750), children: [_jsx("div", { className: styles.stackProperties, children: stackProperties.map(({ systemProperty, workspaceProperty }) => {
                            const displayKey = systemProperty
                                ? `system:${systemProperty.type}`
                                : workspaceProperty
                                    ? `property:${workspaceProperty.id}`
                                    : null;
                            if (!displayKey || !displayProperties?.includes(displayKey)) {
                                return null;
                            }
                            if (systemProperty && systemProperty.showInDocList) {
                                return (_jsx(SystemPropertyRenderer, { doc: doc, config: SystemPropertyTypes[systemProperty.type] }, systemProperty.type));
                            }
                            else if (workspaceProperty &&
                                WorkspacePropertyTypes[workspaceProperty.type]?.showInDocList) {
                                return (_jsx(WorkspacePropertyRenderer, { doc: doc, property: workspaceProperty, config: WorkspacePropertyTypes[workspaceProperty.type] }, workspaceProperty.id));
                            }
                            return null;
                        }) }), displayProperties?.includes('system:tags') ? (_jsx("div", { className: styles.stackProperties, children: _jsx(SystemPropertyRenderer, { doc: doc, config: SystemPropertyTypes.tags }) })) : null] }), inlineProperties.map(({ systemProperty, workspaceProperty }) => {
                const displayKeys = [
                    systemProperty ? `system:${systemProperty.type}` : null,
                    workspaceProperty ? `property:${workspaceProperty.id}` : null,
                ];
                if (!displayKeys.some(key => key && displayProperties?.includes(key))) {
                    return null;
                }
                if (systemProperty) {
                    return (_jsx(SystemPropertyRenderer, { doc: doc, config: SystemPropertyTypes[systemProperty.type] }, systemProperty.type));
                }
                else if (workspaceProperty) {
                    return (_jsx("div", { className: clsx(styles.inlineProperty, listHide560), children: _jsx(WorkspacePropertyRenderer, { doc: doc, property: workspaceProperty, config: WorkspacePropertyTypes[workspaceProperty.type] }) }, workspaceProperty.id));
                }
                return null;
            })] }));
};
export const CardViewProperties = ({ docId }) => {
    const contextValue = useContext(DocExplorerContext);
    const displayProperties = useLiveData(contextValue?.displayProperties$);
    const docsService = useService(DocsService);
    const doc = useLiveData(docsService.list.doc$(docId));
    const { stackProperties, inlineProperties } = useProperties('card');
    if (!doc) {
        return null;
    }
    return (_jsxs("div", { className: styles.cardProperties, children: [inlineProperties.map(({ systemProperty, workspaceProperty }) => {
                const displayKeys = [
                    systemProperty ? `system:${systemProperty.type}` : null,
                    workspaceProperty ? `property:${workspaceProperty.id}` : null,
                ];
                if (!displayKeys.some(key => key && displayProperties?.includes(key))) {
                    return null;
                }
                if (systemProperty) {
                    return (_jsx(SystemPropertyRenderer, { doc: doc, config: SystemPropertyTypes[systemProperty.type] }, systemProperty.type));
                }
                else if (workspaceProperty) {
                    return (_jsx("div", { className: styles.inlineProperty, children: _jsx(WorkspacePropertyRenderer, { doc: doc, property: workspaceProperty, config: WorkspacePropertyTypes[workspaceProperty.type] }) }, workspaceProperty.id));
                }
                return null;
            }), stackProperties.map(({ systemProperty, workspaceProperty }) => {
                const displayKeys = [
                    systemProperty ? `system:${systemProperty.type}` : null,
                    workspaceProperty ? `property:${workspaceProperty.id}` : null,
                ];
                if (!displayKeys.some(key => key && displayProperties?.includes(key))) {
                    return null;
                }
                if (systemProperty) {
                    return (_jsx(SystemPropertyRenderer, { doc: doc, config: SystemPropertyTypes[systemProperty.type] }, systemProperty.type));
                }
                else if (workspaceProperty) {
                    return (_jsx(WorkspacePropertyRenderer, { doc: doc, property: workspaceProperty, config: WorkspacePropertyTypes[workspaceProperty.type] }, workspaceProperty.id));
                }
                return null;
            }), displayProperties?.includes('system:tags') ? (_jsx(SystemPropertyRenderer, { doc: doc, config: SystemPropertyTypes.tags })) : null] }));
};
const SystemPropertyRenderer = ({ doc, config, }) => {
    if (!config.docListProperty) {
        return null;
    }
    return _jsx(config.docListProperty, { doc: doc });
};
const WorkspacePropertyRenderer = ({ property, doc, config, }) => {
    const customPropertyValue = useLiveData(doc.customProperty$(property.id));
    if (!config.docListProperty) {
        return null;
    }
    return (_jsx(config.docListProperty, { value: customPropertyValue, doc: doc, propertyInfo: property }));
};
//# sourceMappingURL=properties.js.map