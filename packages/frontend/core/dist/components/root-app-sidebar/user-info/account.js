import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from '@affine/component';
import { AuthService } from '@affine/core/modules/cloud';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './index.css';
export const Account = () => {
    const account = useLiveData(useService(AuthService).session.account$);
    if (!account) {
        // TODO(@JimmFly): loading ui
        return null;
    }
    return (_jsxs("div", { "data-testid": "user-info-card", className: styles.account, children: [_jsx(Avatar, { size: 28, rounded: 50, name: account.label, url: account.avatar }), _jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.name, title: account.label, content: account.label, children: account.label }), _jsx("div", { className: styles.email, title: account.email, content: account.email, children: account.email })] })] }));
};
//# sourceMappingURL=account.js.map