import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserPlanButton } from '@affine/core/components/affine/auth/user-plan-button';
import * as styles from './index.css';
export const UserAccountItem = ({ email, onClick, }) => {
    return (_jsxs("div", { className: styles.userAccountContainer, children: [_jsx("div", { className: styles.leftContainer, children: _jsx("div", { className: styles.userEmail, children: email }) }), _jsx(UserPlanButton, { onClick: onClick })] }));
};
//# sourceMappingURL=index.js.map