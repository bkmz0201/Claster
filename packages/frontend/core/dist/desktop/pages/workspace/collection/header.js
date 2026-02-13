import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlexWrapper } from '@affine/component';
import { ExplorerDisplayMenuButton } from '@affine/core/components/explorer/display-menu';
import { ViewToggle } from '@affine/core/components/explorer/display-menu/view-toggle';
import { ExplorerNavigation } from '@affine/core/components/explorer/header/navigation';
import { Header } from '@affine/core/components/pure/header';
export const CollectionDetailHeader = ({ displayPreference, onDisplayPreferenceChange, }) => {
    return (_jsx(Header, { right: _jsxs(FlexWrapper, { gap: 16, children: [_jsx(ViewToggle, { view: displayPreference.view ?? 'list', onViewChange: view => {
                        onDisplayPreferenceChange({ ...displayPreference, view });
                    } }), _jsx(ExplorerDisplayMenuButton, { displayPreference: displayPreference, onDisplayPreferenceChange: onDisplayPreferenceChange })] }), left: _jsx(ExplorerNavigation, { active: "collections" }) }));
};
//# sourceMappingURL=header.js.map