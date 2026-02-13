import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Divider, IconButton, Menu, } from '@affine/component';
import { AuthService, ServerService, } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { Account } from './account';
import { AccountMenu } from './account-menu';
import { AIUsage } from './ai-usage';
import { CloudUsage } from './cloud-usage';
import * as styles from './index.css';
import { TeamList } from './team-list';
import { UnknownUserIcon } from './unknow-user';
export default function UserInfo() {
    const session = useService(AuthService).session;
    const account = useLiveData(session.account$);
    return account ? (_jsx(AuthorizedUserInfo, { account: account })) : (_jsx(UnauthorizedUserInfo, {}));
}
const menuContentOptions = {
    className: styles.operationMenu,
};
const AuthorizedUserInfo = ({ account }) => {
    return (_jsx(Menu, { items: _jsx(OperationMenu, {}), contentOptions: menuContentOptions, children: _jsx(IconButton, { "data-testid": "sidebar-user-avatar", variant: "plain", size: "20", style: { padding: 0 }, withoutHover: true, children: _jsx(Avatar, { size: 20, name: account.label, url: account.avatar }) }) }));
};
const UnauthorizedUserInfo = () => {
    const globalDialogService = useService(GlobalDialogService);
    const openSignInModal = useCallback(() => {
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    return (_jsx(IconButton, { onClick: openSignInModal, "data-testid": "sidebar-user-avatar", variant: "plain", size: "20", children: _jsx(UnknownUserIcon, {}) }));
};
const OperationMenu = () => {
    const serverService = useService(ServerService);
    const serverFeatures = useLiveData(serverService.server.features$);
    return (_jsxs(_Fragment, { children: [_jsx(Account, {}), _jsx(Divider, {}), _jsx(CloudUsage, {}), serverFeatures?.copilot ? _jsx(AIUsage, {}) : null, _jsx(Divider, {}), _jsx(TeamList, {}), _jsx(AccountMenu, {})] }));
};
//# sourceMappingURL=index.js.map