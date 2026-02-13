import { jsx as _jsx } from "react/jsx-runtime";
import { ExplorerDisplayMenuButton } from '@affine/core/components/explorer/display-menu';
import { ExplorerNavigation } from '@affine/core/components/explorer/header/navigation';
import { Header } from '@affine/core/components/pure/header';
export const TagDetailHeader = ({ displayPreference, onDisplayPreferenceChange, }) => {
    return (_jsx(Header, { left: _jsx(ExplorerNavigation, { active: 'tags' }), right: _jsx(ExplorerDisplayMenuButton, { displayPreference: displayPreference, onDisplayPreferenceChange: onDisplayPreferenceChange }) }));
};
//# sourceMappingURL=header.js.map