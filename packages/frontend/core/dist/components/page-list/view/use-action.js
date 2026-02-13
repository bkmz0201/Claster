import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { DeleteIcon, FilterIcon } from '@blocksuite/icons/rc';
import { useMemo } from 'react';
export const useActions = ({ collection, openEdit, onDelete, }) => {
    const t = useI18n();
    return useMemo(() => {
        return [
            {
                icon: _jsx(FilterIcon, {}),
                name: 'edit',
                tooltip: t['com.affine.collection-bar.action.tooltip.edit'](),
                click: () => {
                    openEdit(collection);
                },
            },
            {
                icon: _jsx(DeleteIcon, { style: { color: 'var(--affine-error-color)' } }),
                name: 'delete',
                tooltip: t['com.affine.collection-bar.action.tooltip.delete'](),
                click: onDelete,
            },
        ];
    }, [t, onDelete, openEdit, collection]);
};
//# sourceMappingURL=use-action.js.map