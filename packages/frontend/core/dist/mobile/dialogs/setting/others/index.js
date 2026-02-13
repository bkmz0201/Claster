import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';
import { DeleteAccount } from './delete-account';
import { hotTag } from './index.css';
export const OthersGroup = () => {
    const t = useI18n();
    return (_jsxs(SettingGroup, { title: t['com.affine.mobile.setting.others.title'](), children: [_jsx(RowLayout, { label: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [t['com.affine.mobile.setting.others.discord'](), _jsx("div", { className: hotTag, children: "Hot" })] }), href: "https://discord.com/invite/whd5mjYqVw" }), _jsx(RowLayout, { label: t['com.affine.mobile.setting.others.github'](), href: "https://github.com/toeverything/AFFiNE" }), _jsx(RowLayout, { label: t['com.affine.mobile.setting.others.website'](), href: "https://affine.pro/" }), _jsx(RowLayout, { label: t['com.affine.mobile.setting.others.privacy'](), href: "https://affine.pro/privacy" }), _jsx(RowLayout, { label: t['com.affine.mobile.setting.others.terms'](), href: "https://affine.pro/terms" }), _jsx(DeleteAccount, {})] }));
};
//# sourceMappingURL=index.js.map