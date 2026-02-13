import { jsx as _jsx } from "react/jsx-runtime";
import { IconRenderer, IconType } from '@affine/component';
import * as litIcons from '@blocksuite/icons/lit';
import { html } from 'lit';
export const getDocIconComponent = (icon) => {
    const Icon = () => _jsx(IconRenderer, { data: icon });
    Icon.displayName = 'DocIcon';
    return Icon;
};
export const getDocIconComponentLit = (icon) => {
    return () => {
        if (icon.type === IconType.Emoji) {
            return html `<div class="icon">${icon.unicode}</div>`;
        }
        if (icon.type === IconType.AffineIcon) {
            return html `<div
        style="color: ${icon.color}; display: flex; align-items: center; justify-content: center;"
      >
        ${litIcons[`${icon.name}Icon`]()}
      </div>`;
        }
        return null;
    };
};
//# sourceMappingURL=icon.js.map