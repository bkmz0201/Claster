import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { FavoritedIcon, FavoriteIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import Lottie from 'lottie-react';
import { forwardRef, useCallback, useState } from 'react';
import favoritedAnimation from './favorited-animation/data.json';
export const FavoriteTag = forwardRef(({ active, onClick, ...props }, ref) => {
    const [playAnimation, setPlayAnimation] = useState(false);
    const t = useI18n();
    const handleClick = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.(e);
        setPlayAnimation(!active);
    }, [active, onClick]);
    return (_jsx(IconButton, { tooltip: active ? t['Favorited']() : t['Favorite'](), tooltipOptions: { side: 'top' }, ref: ref, onClick: handleClick, size: "20", ...props, children: active ? (playAnimation ? (_jsx(Lottie, { loop: false, animationData: favoritedAnimation, onComplete: () => setPlayAnimation(false), style: { width: '20px', height: '20px' } })) : (_jsx(FavoritedIcon, { color: cssVar('primaryColor'), "data-testid": "favorited-icon" }))) : (_jsx(FavoriteIcon, {})) }));
});
FavoriteTag.displayName = 'FavoriteTag';
//# sourceMappingURL=favorite-tag.js.map