import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem } from '@affine/component/ui/menu';
import { DefaultServerService } from '@affine/core/modules/cloud';
import { ServerFeature } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { ImportIcon, PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './index.css';
export const AddWorkspace = ({ onAddWorkspace, onNewWorkspace, }) => {
    const t = useI18n();
    const defaultServerService = useService(DefaultServerService);
    const enableLocalWorkspace = useLiveData(defaultServerService.server.config$.selector(c => c.features.includes(ServerFeature.LocalWorkspace) ||
        BUILD_CONFIG.isNative));
    return (_jsxs(_Fragment, { children: [BUILD_CONFIG.isElectron && (_jsx(MenuItem, { block: true, prefixIcon: _jsx(ImportIcon, {}), prefixIconClassName: styles.prefixIcon, onClick: onAddWorkspace, "data-testid": "add-workspace", className: styles.ItemContainer, children: _jsx("div", { className: styles.ItemText, children: t['com.affine.workspace.local.import']() }) })), _jsx(MenuItem, { block: true, prefixIcon: _jsx(PlusIcon, {}), prefixIconClassName: styles.prefixIcon, onClick: onNewWorkspace, "data-testid": "new-workspace", className: styles.ItemContainer, children: _jsx("div", { className: styles.ItemText, children: enableLocalWorkspace
                        ? t['com.affine.workspaceList.addWorkspace.create']()
                        : t['com.affine.workspaceList.addWorkspace.create-cloud']() }) })] }));
};
//# sourceMappingURL=index.js.map