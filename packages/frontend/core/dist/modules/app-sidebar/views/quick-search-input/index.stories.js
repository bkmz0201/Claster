import { jsx as _jsx } from "react/jsx-runtime";
import { QuickSearchInput } from './index';
export default {
    title: 'Components/AppSidebar/QuickSearchInput',
    component: QuickSearchInput,
};
export const Default = () => {
    return (_jsx("main", { style: { width: '240px' }, children: _jsx(QuickSearchInput, { onClick: () => alert('opened') }) }));
};
//# sourceMappingURL=index.stories.js.map