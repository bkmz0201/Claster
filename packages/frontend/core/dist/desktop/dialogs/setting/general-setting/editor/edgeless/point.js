import { jsx as _jsx } from "react/jsx-runtime";
import { cssVarV2 } from '@toeverything/theme/v2';
export const Point = ({ color, size = 8, }) => {
    return (_jsx("div", { style: {
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            border: `1px solid ${cssVarV2('layer/insideBorder/blackBorder')}`,
        } }));
};
//# sourceMappingURL=point.js.map