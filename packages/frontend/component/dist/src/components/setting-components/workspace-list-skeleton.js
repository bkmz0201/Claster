import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FlexWrapper } from '../../ui/layout';
import { Skeleton } from '../../ui/skeleton';
export const WorkspaceListItemSkeleton = () => {
    return (_jsxs(FlexWrapper, { alignItems: "center", style: { padding: '0 24px', height: 30, marginBottom: 4 }, children: [_jsx(Skeleton, { variant: "circular", width: 14, height: 14, style: { marginRight: 10 } }), _jsx(Skeleton, { variant: "rectangular", height: 16, width: 0, style: { flexGrow: 1 } })] }));
};
export const WorkspaceListSkeleton = () => {
    return (_jsx(_Fragment, { children: Array.from({ length: 5 }, (_, index) => (_jsx(WorkspaceListItemSkeleton, {}, index))) }));
};
//# sourceMappingURL=workspace-list-skeleton.js.map