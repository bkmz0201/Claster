import { LiveData } from '@toeverything/infra';
import { createContext } from 'react';
const DefaultDisplayPreference = {
    view: 'list',
    displayProperties: [
        'system:createdAt',
        'system:updatedAt',
        'system:createdBy',
        'system:tags',
    ],
    orderBy: {
        type: 'system',
        key: 'updatedAt',
        desc: true,
    },
    groupBy: {
        type: 'system',
        key: 'updatedAt',
    },
    showDocIcon: true,
    showDocPreview: true,
    quickFavorite: true,
    showDragHandle: true,
    showMoreOperation: true,
};
export const DocExplorerContext = createContext({});
export const createDocExplorerContext = (initialState) => {
    const displayPreference$ = new LiveData({
        ...DefaultDisplayPreference,
        ...initialState,
    });
    return {
        groups$: new LiveData([]),
        collapsedGroups$: new LiveData([]),
        selectMode$: new LiveData(false),
        selectedDocIds$: new LiveData([]),
        prevCheckAnchorId$: new LiveData(null),
        displayPreference$: displayPreference$,
        showDragHandle$: displayPreference$.selector(displayPreference => displayPreference.showDragHandle),
        view$: displayPreference$.selector(displayPreference => displayPreference.view),
        groupBy$: displayPreference$.selector(displayPreference => displayPreference.groupBy),
        orderBy$: displayPreference$.selector(displayPreference => displayPreference.orderBy),
        displayProperties$: displayPreference$.selector(displayPreference => displayPreference.displayProperties),
        showDocIcon$: displayPreference$.selector(displayPreference => displayPreference.showDocIcon),
        showDocPreview$: displayPreference$.selector(displayPreference => displayPreference.showDocPreview),
        quickFavorite$: displayPreference$.selector(displayPreference => displayPreference.quickFavorite),
        quickSelect$: displayPreference$.selector(displayPreference => displayPreference.quickSelect),
        quickSplit$: displayPreference$.selector(displayPreference => displayPreference.quickSplit),
        quickTrash$: displayPreference$.selector(displayPreference => displayPreference.quickTrash),
        quickTab$: displayPreference$.selector(displayPreference => displayPreference.quickTab),
        showMoreOperation$: displayPreference$.selector(displayPreference => displayPreference.showMoreOperation),
        quickDeletePermanently$: displayPreference$.selector(displayPreference => displayPreference.quickDeletePermanently),
        quickRestore$: displayPreference$.selector(displayPreference => displayPreference.quickRestore),
    };
};
//# sourceMappingURL=context.js.map