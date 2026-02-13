import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useThemeColorV2 } from '@affine/component';
import { AppTabs } from '../../../components';
import { AllDocsHeader, TagList } from '../../../views';
export const Component = () => {
    useThemeColorV2('layer/background/mobile/primary');
    return (_jsxs(_Fragment, { children: [_jsx(AllDocsHeader, {}), _jsx(AppTabs, {}), _jsx(TagList, {})] }));
};
//# sourceMappingURL=index.js.map