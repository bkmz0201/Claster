import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthPageContainer } from '@affine/component/auth-components';
import { UserFriendlyError } from '@affine/error';
import { ErrorNames } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { Avatar } from '../../ui/avatar';
import * as styles from './styles.css';
export const JoinFailedPage = ({ inviteInfo, error, }) => {
    const userFriendlyError = UserFriendlyError.fromAny(error);
    const t = useI18n();
    return (_jsx(AuthPageContainer, { title: t['com.affine.fail-to-join-workspace.title'](), subtitle: userFriendlyError.name === ErrorNames.MEMBER_QUOTA_EXCEEDED ? (_jsxs("div", { className: styles.lineHeight, children: [_jsx(Trans, { i18nKey: 'com.affine.fail-to-join-workspace.description-1', components: {
                        1: (_jsx("div", { className: styles.avatarWrapper, children: _jsx(Avatar, { url: `data:image/png;base64,${inviteInfo?.workspace.avatar}`, name: inviteInfo?.workspace.name, size: 20, colorfulFallback: true }) })),
                        2: _jsx("span", { className: styles.inviteName }),
                    }, values: {
                        workspaceName: inviteInfo?.workspace.name,
                    } }), _jsx("div", { children: t['com.affine.fail-to-join-workspace.description-2']() })] })) : (_jsxs("div", { children: [t['error.' + userFriendlyError.name](), _jsx("br", {}), userFriendlyError.message] })) }));
};
//# sourceMappingURL=join-failed-page.js.map