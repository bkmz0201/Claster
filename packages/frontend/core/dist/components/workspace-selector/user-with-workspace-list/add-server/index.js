import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, MenuItem } from '@affine/component';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { ItemContainer, ItemText, prefixIcon, } from '../add-workspace/index.css';
import { addServerDividerWrapper } from './index.css';
export const AddServer = () => {
    const t = useI18n();
    const globalDialogService = useService(GlobalDialogService);
    const onAddServer = useCallback(() => {
        globalDialogService.open('sign-in', { step: 'addSelfhosted' });
    }, [globalDialogService]);
    if (!BUILD_CONFIG.isNative) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: addServerDividerWrapper, children: _jsx(Divider, { size: "thinner" }) }), _jsx(MenuItem, { block: true, prefixIcon: _jsx(PlusIcon, {}), prefixIconClassName: prefixIcon, onClick: onAddServer, "data-testid": "new-server", className: ItemContainer, children: _jsx("div", { className: ItemText, children: t['com.affine.workspaceList.addServer']() }) })] }));
};
//# sourceMappingURL=index.js.map