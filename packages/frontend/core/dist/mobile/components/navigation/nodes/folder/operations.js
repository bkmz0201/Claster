import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@affine/component';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
export const FavoriteFolderOperation = ({ id }) => {
    const t = useI18n();
    const compatibleFavoriteItemsAdapter = useService(CompatibleFavoriteItemsAdapter);
    const favorite = useLiveData(useMemo(() => {
        return compatibleFavoriteItemsAdapter.isFavorite$(id, 'folder');
    }, [compatibleFavoriteItemsAdapter, id]));
    return (_jsx(MenuItem, { prefixIcon: _jsx(IsFavoriteIcon, { favorite: favorite }), onClick: () => compatibleFavoriteItemsAdapter.toggle(id, 'folder'), children: favorite
            ? t['com.affine.rootAppSidebar.organize.folder-rm-favorite']()
            : t['com.affine.rootAppSidebar.organize.folder-add-favorite']() }));
};
//# sourceMappingURL=operations.js.map