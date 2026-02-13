import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserWarning, LocalDemoTips } from '@affine/component/affine-banner';
import { Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { useEnableCloud } from '../components/hooks/affine/use-enable-cloud';
import { AuthService } from '../modules/cloud';
import { GlobalDialogService } from '../modules/dialogs';
const minimumChromeVersion = 106;
const shouldShowWarning = (() => {
    if (BUILD_CONFIG.isElectron) {
        // even though desktop has compatibility issues,
        //  we don't want to show the warning
        return false;
    }
    if (BUILD_CONFIG.isMobileEdition) {
        return true;
    }
    if (environment.isChrome && environment.chromeVersion) {
        return environment.chromeVersion < minimumChromeVersion;
    }
    return false;
})();
const OSWarningMessage = () => {
    const t = useI18n();
    const notChrome = !environment.isChrome;
    const notGoodVersion = environment.isChrome &&
        environment.chromeVersion &&
        environment.chromeVersion < minimumChromeVersion;
    // TODO(@L-Sun): remove this message when mobile version is able to edit.
    if (environment.isMobile) {
        return _jsx("span", { children: t['com.affine.top-tip.mobile']() });
    }
    if (notChrome) {
        return (_jsx("span", { children: _jsxs(Trans, { i18nKey: "recommendBrowser", children: ["We recommend the ", _jsx("strong", { children: "Chrome" }), " browser for an optimal experience."] }) }));
    }
    else if (notGoodVersion) {
        return _jsx("span", { children: t['upgradeBrowser']() });
    }
    return null;
};
export const TopTip = ({ pageId, workspace, }) => {
    const loginStatus = useLiveData(useService(AuthService).session.status$);
    const isLoggedIn = loginStatus === 'authenticated';
    const [showWarning, setShowWarning] = useState(shouldShowWarning);
    const [showLocalDemoTips, setShowLocalDemoTips] = useState(true);
    const confirmEnableCloud = useEnableCloud();
    const globalDialogService = useService(GlobalDialogService);
    const onLogin = useCallback(() => {
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    if (!BUILD_CONFIG.isElectron &&
        showLocalDemoTips &&
        workspace.flavour === 'local') {
        return (_jsx(LocalDemoTips, { isLoggedIn: isLoggedIn, onLogin: onLogin, onEnableCloud: () => confirmEnableCloud(workspace, { openPageId: pageId }), onClose: () => {
                setShowLocalDemoTips(false);
            } }));
    }
    return (_jsx(BrowserWarning, { show: showWarning, message: _jsx(OSWarningMessage, {}), onClose: () => {
            setShowWarning(false);
        } }));
};
//# sourceMappingURL=top-tip.js.map