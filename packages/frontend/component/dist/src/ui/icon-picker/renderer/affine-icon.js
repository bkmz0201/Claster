import { jsx as _jsx } from "react/jsx-runtime";
import * as allIcons from '@blocksuite/icons/rc';
export const AffineIconRenderer = ({ name, ...props }) => {
    const Icon = allIcons[`${name}Icon`];
    if (!Icon) {
        return null;
    }
    return _jsx(Icon, { ...props });
};
//# sourceMappingURL=affine-icon.js.map