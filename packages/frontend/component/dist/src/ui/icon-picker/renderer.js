import { jsx as _jsx } from "react/jsx-runtime";
import { AffineIconRenderer } from './renderer/affine-icon';
import { IconType } from './type';
export const IconRenderer = ({ data, fallback, }) => {
    if (!data) {
        return fallback ?? null;
    }
    if (data.type === IconType.Emoji && data.unicode) {
        return data.unicode;
    }
    if (data.type === IconType.AffineIcon && data.name) {
        return _jsx(AffineIconRenderer, { name: data.name, color: data.color });
    }
    if (data.type === IconType.Blob) {
        // Not supported yet
        return null;
    }
    return fallback ?? null;
};
//# sourceMappingURL=renderer.js.map