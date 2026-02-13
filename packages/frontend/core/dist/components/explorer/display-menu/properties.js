import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Divider } from '@affine/component';
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { WorkspacePropertyName } from '../../properties';
import { WorkspacePropertyTypes } from '../../workspace-property-types';
import { generateExplorerPropertyList } from '../properties';
import * as styles from './properties.css';
export const DisplayProperties = ({ displayPreference, onDisplayPreferenceChange, }) => {
    const t = useI18n();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const propertyList = useLiveData(workspacePropertyService.sortedProperties$);
    const explorerPropertyList = useMemo(() => {
        return generateExplorerPropertyList(propertyList);
    }, [propertyList]);
    const displayProperties = displayPreference.displayProperties;
    const showIcon = displayPreference.showDocIcon ?? false;
    const showBody = displayPreference.showDocPreview ?? false;
    const handleDisplayPropertiesChange = useCallback((displayProperties) => {
        onDisplayPreferenceChange({ ...displayPreference, displayProperties });
    }, [displayPreference, onDisplayPreferenceChange]);
    const handlePropertyClick = useCallback((key) => {
        handleDisplayPropertiesChange(displayProperties && displayProperties.includes(key)
            ? displayProperties.filter(k => k !== key)
            : [...(displayProperties || []), key]);
    }, [displayProperties, handleDisplayPropertiesChange]);
    const toggleIcon = useCallback(() => {
        onDisplayPreferenceChange({
            ...displayPreference,
            showDocIcon: !showIcon,
        });
    }, [displayPreference, onDisplayPreferenceChange, showIcon]);
    const toggleBody = useCallback(() => {
        onDisplayPreferenceChange({
            ...displayPreference,
            showDocPreview: !showBody,
        });
    }, [displayPreference, onDisplayPreferenceChange, showBody]);
    return (_jsxs("div", { className: styles.root, children: [_jsx("section", { className: styles.sectionLabel, children: t['com.affine.all-docs.display.properties']() }), _jsx("div", { className: styles.properties, children: explorerPropertyList
                    .filter(p => p.systemProperty)
                    .map(property => {
                    return (_jsx(PropertyRenderer, { property: property, displayProperties: displayProperties ?? [], handlePropertyClick: handlePropertyClick }, property.systemProperty?.type ??
                        property.workspaceProperty?.id));
                }) }), _jsx("div", { className: styles.properties, children: explorerPropertyList
                    .filter(p => !p.systemProperty)
                    .map(property => {
                    return (_jsx(PropertyRenderer, { property: property, displayProperties: displayProperties ?? [], handlePropertyClick: handlePropertyClick }, property.systemProperty?.type ??
                        property.workspaceProperty?.id));
                }) }), displayPreference.view === 'list' ? (_jsxs(_Fragment, { children: [_jsx(Divider, { space: 4, size: "thinner" }), _jsx("section", { className: styles.sectionLabel, children: t['com.affine.all-docs.display.list-view']() }), _jsxs("div", { className: styles.properties, children: [_jsx(Button, { className: styles.property, "data-show": showIcon, onClick: toggleIcon, children: t['com.affine.all-docs.display.list-view.icon']() }), _jsx(Button, { className: styles.property, "data-show": showBody, onClick: toggleBody, children: t['com.affine.all-docs.display.list-view.body']() })] })] })) : null] }));
};
const PropertyRenderer = ({ property, displayProperties, handlePropertyClick, }) => {
    const t = useI18n();
    const { systemProperty, workspaceProperty } = property;
    const key = systemProperty
        ? `system:${systemProperty.type}`
        : workspaceProperty
            ? `property:${workspaceProperty?.id}`
            : null;
    const activeKey = systemProperty
        ? `system:${systemProperty.type}`
        : workspaceProperty
            ? `property:${workspaceProperty?.id}`
            : null;
    const isActive = activeKey && displayProperties.includes(activeKey);
    const showInDocList = systemProperty?.showInDocList ||
        (workspaceProperty &&
            WorkspacePropertyTypes[workspaceProperty.type]?.showInDocList);
    if (!key || !showInDocList) {
        return null;
    }
    return (_jsx(Button, { "data-show": isActive, onClick: () => {
            track.allDocs.header.displayMenu.editDisplayMenu({
                control: 'displayProperties',
                type: systemProperty?.type ?? 'custom-property',
            });
            handlePropertyClick(key);
        }, className: styles.property, "data-key": key, children: workspaceProperty ? (_jsx(WorkspacePropertyName, { propertyInfo: workspaceProperty })) : systemProperty ? (t.t(systemProperty.name)) : null }, key));
};
//# sourceMappingURL=properties.js.map