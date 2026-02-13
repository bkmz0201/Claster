import { jsx as _jsx } from "react/jsx-runtime";
import { FavoritedIcon, FavoriteIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
export const IsFavoriteIcon = ({ favorite, style, ...props }) => {
    return favorite ? (_jsx(FavoritedIcon, { style: { color: cssVar('primaryColor'), ...style }, ...props })) : (_jsx(FavoriteIcon, { style: style, ...props }));
};
//# sourceMappingURL=favorite-icon.js.map