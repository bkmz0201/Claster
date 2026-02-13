import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SafeArea, useThemeColorV2 } from '@affine/component';
import { AppTabs } from '../../components';
import { NavigationPanelCollections, NavigationPanelFavorites, NavigationPanelOrganize, NavigationPanelTags, } from '../../components/navigation';
import { HomeHeader, RecentDocs } from '../../views';
export const Component = () => {
    useThemeColorV2('layer/background/mobile/primary');
    return (_jsxs(_Fragment, { children: [_jsx(HomeHeader, {}), _jsx(RecentDocs, {}), _jsx(SafeArea, { bottom: true, children: _jsxs("div", { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 32,
                        padding: '0 8px 32px 8px',
                    }, children: [_jsx(NavigationPanelFavorites, {}), _jsx(NavigationPanelOrganize, {}), _jsx(NavigationPanelCollections, {}), _jsx(NavigationPanelTags, {})] }) }), _jsx(AppTabs, {})] }));
};
//# sourceMappingURL=home.js.map