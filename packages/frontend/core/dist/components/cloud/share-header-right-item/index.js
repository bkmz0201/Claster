import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthService } from '@affine/core/modules/cloud';
import { useLiveData, useService } from '@toeverything/infra';
import { ImportTemplateButton } from './import-template';
import { PresentButton } from './present';
import { SignIn } from './sign-in';
import * as styles from './styles.css';
import { PublishPageUserAvatar } from './user-avatar';
const ShareHeaderRightItem = ({ publishMode, isTemplate, templateName, snapshotUrl, }) => {
    const loginStatus = useLiveData(useService(AuthService).session.status$);
    const authenticated = loginStatus === 'authenticated';
    return (_jsx("div", { className: styles.rightItemContainer, children: isTemplate ? (_jsx(ImportTemplateButton, { name: templateName ?? '', snapshotUrl: snapshotUrl ?? '' })) : (_jsxs(_Fragment, { children: [authenticated ? null : _jsx(SignIn, {}), publishMode === 'edgeless' ? _jsx(PresentButton, {}) : null, authenticated ? (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.headerDivider, "data-authenticated": true, "data-is-edgeless": publishMode === 'edgeless' }), _jsx(PublishPageUserAvatar, {})] })) : null] })) }));
};
export default ShareHeaderRightItem;
//# sourceMappingURL=index.js.map