import { jsx as _jsx } from "react/jsx-runtime";
import { ExplorerNavigation } from '@affine/core/components/explorer/header/navigation';
import { Header } from '@affine/core/components/pure/header';
export const AllTagHeader = () => {
    return _jsx(Header, { left: _jsx(ExplorerNavigation, { active: 'tags' }) });
};
//# sourceMappingURL=header.js.map