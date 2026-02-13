import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Menu } from '@affine/component';
import { SettingHeader } from '@affine/component/setting-components';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspacePropertyManager } from '@affine/core/components/properties/manager';
import { CreatePropertyMenuItems } from '@affine/core/components/properties/menu/create-doc-property';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { Trans, useI18n } from '@affine/i18n';
import track from '@affine/track';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './styles.css';
const WorkspaceSettingPropertiesMain = () => {
    const t = useI18n();
    const onCreated = useCallback((property) => {
        track.$.settingsPanel.workspace.addProperty({
            type: property.type,
            control: 'at menu',
        });
    }, []);
    const onPropertyInfoChange = useCallback((property, field) => {
        track.$.settingsPanel.workspace.editPropertyMeta({
            type: property.type,
            field,
        });
    }, []);
    return (_jsxs("div", { className: styles.main, children: [_jsx("div", { className: styles.listHeader, children: _jsx(Menu, { items: _jsx(CreatePropertyMenuItems, { onCreated: onCreated }), children: _jsx(Button, { variant: "primary", children: t['com.affine.settings.workspace.properties.add_property']() }) }) }), _jsx(WorkspacePropertyManager, { onPropertyInfoChange: onPropertyInfoChange })] }));
};
export const WorkspaceSettingProperties = () => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const workspaceInfo = useWorkspaceInfo(workspace);
    const title = workspaceInfo?.name || 'untitled';
    if (workspace === null) {
        return null;
    }
    return (_jsxs(FrameworkScope, { scope: workspace.scope, children: [_jsx(SettingHeader, { title: t['com.affine.settings.workspace.properties.header.title'](), subtitle: _jsxs(Trans, { values: {
                        name: title,
                    }, i18nKey: "com.affine.settings.workspace.properties.header.subtitle", children: ["Manage workspace ", _jsx("strong", { children: "name" }), " properties"] }) }), _jsx(WorkspaceSettingPropertiesMain, {})] }));
};
//# sourceMappingURL=index.js.map