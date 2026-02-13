import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthService } from '@affine/core/modules/cloud';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { AboutGroup } from './about';
import { AppearanceGroup } from './appearance';
import { ExperimentalFeatureSetting } from './experimental';
import { OthersGroup } from './others';
import * as styles from './style.css';
import { UserSubscription } from './subscription';
import { SwipeDialog } from './swipe-dialog';
import { UserProfile } from './user-profile';
import { UserUsage } from './user-usage';
const MobileSetting = () => {
    const session = useService(AuthService).session;
    useEffect(() => session.revalidate(), [session]);
    return (_jsxs("div", { className: styles.root, children: [_jsx(UserProfile, {}), _jsx(UserSubscription, {}), _jsx(UserUsage, {}), _jsx(AppearanceGroup, {}), _jsx(AboutGroup, {}), _jsx(ExperimentalFeatureSetting, {}), _jsx(OthersGroup, {})] }));
};
export const SettingDialog = ({ close, }) => {
    const t = useI18n();
    return (_jsx(SwipeDialog, { title: t['com.affine.mobile.setting.header-title'](), open: true, onOpenChange: () => close(), children: _jsx(MobileSetting, {}) }));
    // return (
    //   <ConfigModal
    //     title={t['com.affine.mobile.setting.header-title']()}
    //     open
    //     onOpenChange={() => close()}
    //     onBack={close}
    //   >
    //     <MobileSetting />
    //   </ConfigModal>
    // );
};
//# sourceMappingURL=index.js.map