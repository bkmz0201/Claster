import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLiveData } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import semver from 'semver';
const rules = [
    {
        min: '0.23.0',
        tip: (receivedVersion, requiredVersion) => (_jsxs("div", { children: [_jsxs("p", { style: {
                        color: cssVarV2('status/error'),
                        fontSize: 14,
                        lineHeight: '22px',
                    }, children: ["Your server version", ' ', _jsx("b", { style: { fontWeight: 600 }, children: receivedVersion }), " is not compatible with current client. Please upgrade your server to", ' ', _jsx("b", { style: { fontWeight: 600 }, children: requiredVersion }), " or higher to use this client."] }), _jsxs("div", { style: { marginTop: '12px', color: cssVarV2.text.primary }, children: [_jsx("span", { style: { fontWeight: 500 }, children: "Instructions:" }), _jsx("br", {}), _jsx("a", { style: {
                                whiteSpace: 'break-spaces',
                                wordBreak: 'break-all',
                                fontSize: 12,
                                lineHeight: '16px',
                            }, children: "https://docs.affine.pro/self-host-affine/install/upgrade" })] })] })),
    },
];
/**
 * Return the error tip if the server version is not meet the requirement
 */
export const useSelfhostLoginVersionGuard = (server) => {
    const serverVersion = useLiveData(server.config$.selector(c => c.version)) ?? '0.0.0';
    for (const rule of rules) {
        if (semver.lt(serverVersion, rule.min)) {
            return rule.tip(serverVersion, rule.min);
        }
    }
    return null;
};
//# sourceMappingURL=use-selfhost-login-version-guard.js.map