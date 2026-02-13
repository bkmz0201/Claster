import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '../../ui/skeleton';
import { SettingHeader } from './setting-header';
import { SettingRow } from './setting-row';
import { SettingWrapper } from './wrapper';
export const WorkspaceDetailSkeleton = () => {
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: _jsx(Skeleton, {}), subtitle: _jsx(Skeleton, {}) }), Array.from({ length: 3 }, (_, index) => (_jsx(SettingWrapper, { title: _jsx(Skeleton, {}), children: _jsx(SettingRow, { name: _jsx(Skeleton, {}), desc: _jsx(Skeleton, {}), spreadCol: false }) }, index)))] }));
};
//# sourceMappingURL=workspace-detail-skeleton.js.map