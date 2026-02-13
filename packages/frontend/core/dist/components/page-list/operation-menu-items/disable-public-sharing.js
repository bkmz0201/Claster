import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { ShareIcon } from '@blocksuite/icons/rc';
export const DisablePublicSharing = (props) => {
    const t = useI18n();
    return (_jsx(MenuItem, { type: "danger", prefixIcon: _jsx(ShareIcon, {}), ...props, children: t['Disable Public Sharing']() }));
};
//# sourceMappingURL=disable-public-sharing.js.map