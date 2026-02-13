import { jsx as _jsx } from "react/jsx-runtime";
import { INTEGRATION_ICON_MAP } from '../constant';
export const IntegrationTypeIcon = ({ type, ...props }) => {
    const Icon = INTEGRATION_ICON_MAP[type];
    return _jsx(Icon, { ...props });
};
//# sourceMappingURL=icon.js.map