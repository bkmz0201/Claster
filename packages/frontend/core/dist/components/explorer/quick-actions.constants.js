import { QuickDelete, QuickDeletePermanently, QuickFavorite, QuickRestore, QuickSelect, QuickSplit, QuickTab, } from './docs-view/quick-actions';
const QUICK_ACTION_MAP = {
    quickFavorite: {
        name: 'com.affine.all-docs.quick-action.favorite',
        Component: QuickFavorite,
    },
    quickTrash: {
        name: 'com.affine.all-docs.quick-action.trash',
        Component: QuickDelete,
    },
    quickSplit: {
        name: 'com.affine.all-docs.quick-action.split',
        Component: QuickSplit,
        disabled: !BUILD_CONFIG.isElectron,
    },
    quickTab: {
        name: 'com.affine.all-docs.quick-action.tab',
        Component: QuickTab,
    },
    quickSelect: {
        name: 'com.affine.all-docs.quick-action.select',
        Component: QuickSelect,
    },
    quickDeletePermanently: {
        name: 'com.affine.all-docs.quick-action.delete-permanently',
        Component: QuickDeletePermanently,
        disabled: true, // can only be controlled in code
    },
    quickRestore: {
        name: 'com.affine.all-docs.quick-action.restore',
        Component: QuickRestore,
        disabled: true, // can only be controlled in code
    },
};
export const quickActions = Object.entries(QUICK_ACTION_MAP).map(([key, config]) => {
    return { key: key, ...config };
});
//# sourceMappingURL=quick-actions.constants.js.map