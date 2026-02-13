import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Tooltip } from '@affine/component';
import { useCurrentServerService } from '@affine/core/components/providers/current-server-scope';
import { useI18n } from '@affine/i18n';
import { useLiveData } from '@toeverything/infra';
import { useLayoutEffect, useMemo, } from 'react';
import { PublicUserService } from '../services/public-user';
import * as styles from './public-user.css';
export const PublicUserLabel = ({ id, size = 20, showName = true, tooltip: NameTip, align = 'baseline', }) => {
    const serverService = useCurrentServerService();
    const publicUser = useMemo(() => {
        return serverService?.scope.get(PublicUserService);
    }, [serverService]);
    useLayoutEffect(() => {
        if (publicUser) {
            publicUser.revalidate(id);
        }
    }, [id, publicUser]);
    const user = useLiveData(publicUser?.publicUser$(id));
    const isLoading = useLiveData(publicUser?.isLoading$(id));
    const t = useI18n();
    if (isLoading && !user) {
        return _jsx("span", { className: styles.publicUserLabelLoading, children: "..." });
    }
    if (user?.removed) {
        return showName ? (_jsx("span", { className: styles.publicUserLabelRemoved, children: t['Unknown User']() })) : (_jsx(Avatar, { size: size, name: t['Unknown User'](), className: styles.publicUserLabelAvatar }));
    }
    return (_jsx(Tooltip, { content: NameTip ? (_jsx(NameTip, { userName: user?.name || t['Unknown User']() })) : null, children: _jsxs("span", { className: styles.publicUserLabel, style: { alignItems: align }, children: [_jsx(Avatar, { url: user?.avatar, name: user?.name ?? '', size: size, className: styles.publicUserLabelAvatar, "data-show-name": showName }), showName && user?.name] }) }));
};
//# sourceMappingURL=public-user.js.map