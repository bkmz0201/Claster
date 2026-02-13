import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SafeArea, Skeleton } from '@affine/component';
import { WorkspaceSelector } from '../workspace-selector';
const SectionTitleFallback = () => {
    return (_jsx("div", { style: { padding: '0 16px' }, children: _jsx(Skeleton, { animation: "wave", style: { height: 16, borderRadius: 4, width: 93 } }) }));
};
const sectionRows = [127, 238, 191, 102];
const Section = () => {
    return (_jsxs("div", { style: { marginBottom: 32 }, children: [_jsx(SectionTitleFallback, {}), _jsx("div", { style: {
                    padding: '0 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    marginTop: 24,
                }, children: sectionRows.map((width, i) => {
                    return (_jsxs("div", { style: { display: 'flex', gap: 16, alignItems: 'center' }, children: [_jsx(Skeleton, { animation: "wave", style: { width: 23, height: 23, borderRadius: 4 } }), _jsx(Skeleton, { animation: "wave", style: { width, height: 16, borderRadius: 4 } })] }, i));
                }) })] }));
};
export const AppFallback = () => {
    return (_jsxs(SafeArea, { top: true, bottom: true, style: { height: '100dvh', overflow: 'hidden' }, children: [_jsxs("div", { style: {
                    padding: 10,
                    paddingTop: 0,
                    display: 'flex',
                    justifyContent: 'end',
                    gap: 10,
                }, children: [_jsx(Skeleton, { animation: "wave", style: { width: 28, height: 28, borderRadius: 4 } }), _jsx(Skeleton, { animation: "wave", style: { width: 28, height: 28, borderRadius: 4 } })] }), _jsx("div", { style: { padding: '4px 16px' }, children: _jsx(WorkspaceSelector, {}) }), _jsx("div", { style: { padding: '10px 16px 15px' }, children: _jsx(Skeleton, { animation: "wave", style: { height: 44, borderRadius: 10 } }) }), _jsx(SectionTitleFallback, {}), _jsx("div", { style: { padding: '16px 16px 32px 16px', display: 'flex', gap: 10 }, children: [1, 2, 3].map(i => (_jsx(Skeleton, { animation: "wave", style: { width: 172, height: 210, borderRadius: 12 } }, i))) }), _jsx(Section, {}), _jsx(Section, {})] }));
};
//# sourceMappingURL=index.js.map