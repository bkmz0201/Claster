import { jsx as _jsx } from "react/jsx-runtime";
import { AuthPageContainer, } from '@affine/component/auth-components';
import { Trans, useI18n } from '@affine/i18n';
import { Avatar } from '../../ui/avatar';
import * as styles from './styles.css';
export const FailedToSendPage = ({ user, inviteInfo, }) => {
    const t = useI18n();
    return (_jsx(AuthPageContainer, { title: t['com.affine.failed-to-send-request.title'](), subtitle: _jsx("div", { className: styles.lineHeight, children: _jsx(Trans, { i18nKey: "com.affine.failed-to-send-request.description", components: {
                    1: (_jsx("div", { className: styles.avatarWrapper, children: _jsx(Avatar, { url: `data:image/png;base64,${inviteInfo.workspace.avatar}`, name: inviteInfo.workspace.name, size: 20, colorfulFallback: true }) })),
                    2: _jsx("span", { className: styles.inviteName }),
                    3: _jsx("span", { className: styles.inviteName }),
                }, values: {
                    workspaceName: inviteInfo.workspace.name,
                    userEmail: user?.email,
                } }) }) }));
};
//# sourceMappingURL=failed-to-send-page.js.map