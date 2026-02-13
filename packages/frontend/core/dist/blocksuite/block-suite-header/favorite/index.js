import { jsx as _jsx } from "react/jsx-runtime";
import { FavoriteTag } from '@affine/core/components/page-list';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { toast } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
export const useFavorite = (pageId) => {
    const t = useI18n();
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const favorite = useLiveData(favAdapter.isFavorite$(pageId, 'doc'));
    const toggleFavorite = useCallback(() => {
        favAdapter.toggle(pageId, 'doc');
        toast(favorite
            ? t['com.affine.toastMessage.removedFavorites']()
            : t['com.affine.toastMessage.addedFavorites']());
    }, [favorite, pageId, t, favAdapter]);
    return { favorite, toggleFavorite };
};
export const FavoriteButton = ({ pageId }) => {
    const { favorite, toggleFavorite } = useFavorite(pageId);
    const handleFavorite = useCallback(() => {
        track.$.header.actions.toggleFavorite();
        toggleFavorite();
    }, [toggleFavorite]);
    return (_jsx(FavoriteTag, { "data-testid": "pin-button", active: !!favorite, onClick: handleFavorite }));
};
//# sourceMappingURL=index.js.map